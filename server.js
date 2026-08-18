import { createServer } from "node:http";
import { createHmac, pbkdf2Sync, randomUUID, timingSafeEqual } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { basename, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { buildCertificatePdf } from "./lib/certificates.js";
import { generateInteractiveCourseFromPdf, summarizeCourse } from "./lib/interactive-generator.js";
import { isDatabaseEnabled, loadDatabaseState, saveDatabaseState } from "./lib/persistence.js";
import { createBlobReadUrl, deleteBlobResource, isBlobStorageEnabled, uploadBlobResource } from "./lib/storage.js";

const ROOT_DIR = resolve(fileURLToPath(new URL(".", import.meta.url)));
const MODULE_FILE = fileURLToPath(import.meta.url);
const ENV = typeof process === "undefined" ? {} : process.env;
const IS_SERVERLESS_RUNTIME = Boolean(ENV.VERCEL || ENV.AWS_LAMBDA_FUNCTION_NAME || ENV.LAMBDA_TASK_ROOT);
if (!IS_SERVERLESS_RUNTIME) {
  loadEnv(resolve(ROOT_DIR, ".env"));
}

const PORT = Number(ENV.PORT) || 3001;
const OPENAI_MODEL = ENV.OPENAI_MODEL || "gpt-5.4-mini";
const PUBLIC_BASE_URL = normalizePublicUrl(ENV.PUBLIC_BASE_URL);
const REQUEST_TIMEOUT_MS = 15_000;
const DATA_DIR = resolve(ROOT_DIR, "data");
const COURSE_DATA_FILE = resolve(DATA_DIR, "courses.json");
const APP_DATA_FILE = resolve(DATA_DIR, "app-data.json");
const INTERACTIVE_COURSE_DATA_FILE = resolve(DATA_DIR, "interactive-courses.json");
const COURSE_UPLOAD_DIR = resolve(ROOT_DIR, "assets", "uploads", "courses");
const INTERACTIVE_UPLOAD_DIR = resolve(ROOT_DIR, "assets", "uploads", "interactive");
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;
const SESSION_SECRET = ENV.FORTIXSEG_SESSION_SECRET || ENV.AUTH_TOKEN_SECRET || randomUUID();
const IS_DIRECT_RUN = Boolean(process.argv[1]) && resolve(process.argv[1]) === MODULE_FILE;

const DEFAULT_COURSE_CATALOG = {
  nr35: {
    id: "nr35", code: "NR 35", title: "NR 35 - Trabalho em Altura", hours: 8, price: 149.90,
    category: "Trabalho em altura", audience: "Profissionais que executam atividades acima de 2 metros com risco de queda.",
    objective: "Apresentar conceitos, responsabilidades e medidas de prevenção para atividades em altura.",
    syllabus: ["Conceitos de trabalho em altura", "Análise de risco", "Equipamentos de proteção", "Responsabilidades", "Condições impeditivas", "Procedimentos de emergência", "Avaliação final"],
    resources: [{ id: "nr35-pdf-base", type: "pdf", name: "Apostila NR 35", url: "/assets/apostila-nr35-demonstrativa.pdf", mimeType: "application/pdf", size: 0 }]
  },
  nr12: { id: "nr12", code: "NR 12", title: "NR 12 - Segurança no Trabalho em Máquinas e Equipamentos", hours: 8, price: 179.90 },
  nr10: { id: "nr10", code: "NR 10", title: "NR 10 - Segurança em Instalações e Serviços em Eletricidade", hours: 40, price: 249.90 },
  nr33: { id: "nr33", code: "NR 33", title: "NR 33 - Segurança e Saúde em Espaços Confinados", hours: 16, price: 199.90 },
  epi: { id: "epi", code: "EPI", title: "Uso Correto de EPIs", hours: 4, price: 59.90 },
  integracao: { id: "integracao", code: "INT", title: "Integração de Segurança", hours: 4, price: 79.90 },
  nr01: { id: "nr01", code: "NR 01", title: "NR 01 - GRO/PGR Introdutório", hours: 4, price: 89.90 },
  loto: { id: "loto", code: "LOTO", title: "LOTO - Bloqueio e Etiquetagem", hours: 4, price: 99.90 }
};

const CHECKOUT_PACKAGE_CATALOG = {
  "pkg-integracao": { id: "pkg-integracao", title: "Integracao Essencial", hours: 12, price: 199.90 },
  "pkg-chao-fabrica": { id: "pkg-chao-fabrica", title: "Chao de Fabrica", hours: 24, price: 349.90 },
  "pkg-administrativo": { id: "pkg-administrativo", title: "Administrativo Seguro", hours: 18, price: 249.90 },
  "pkg-lideranca": { id: "pkg-lideranca", title: "Lideranca em Seguranca", hours: 28, price: 449.90 },
  "pkg-manutencao": { id: "pkg-manutencao", title: "Manutencao Segura", hours: 26, price: 399.90 },
  "pkg-rh-sst": { id: "pkg-rh-sst", title: "RH e Gestao SST", hours: 20, price: 299.90 }
};

const CHECKOUT_DISCOUNT_TIERS = [
  { min: 1, max: 5, discount: 0 },
  { min: 6, max: 20, discount: 0.10 },
  { min: 21, max: 50, discount: 0.15 },
  { min: 51, max: 100, discount: 0.20 }
];

const PACKAGE_RELEASE_MAP = {
  "pkg-integracao": ["integracao", "epi"],
  "pkg-chao-fabrica": ["nr12", "loto"],
  "pkg-administrativo": ["nr01", "epi"],
  "pkg-lideranca": ["nr35", "nr01"],
  "pkg-manutencao": ["nr12", "loto"],
  "pkg-rh-sst": ["nr01", "integracao"]
};

const QUIZ_ANSWER_KEY = [1, 2, 1, 2, 0];

let courseCatalog = loadCourseCatalog();
let interactiveCourses = loadInteractiveCourses();
let appState = loadAppData();
let companyEmployees = loadInitialCompanyEmployees();
let runtimeStateIssue = "";
const runtimeStateReady = initializeRuntimeState().catch((error) => {
  runtimeStateIssue = cleanText(error?.message || "Falha ao inicializar estado da aplicação.", 240);
  console.error(`Falha ao inicializar runtime: ${runtimeStateIssue}`);
});

const ASSISTANT_INSTRUCTIONS = `
Você é o atendente virtual oficial da FortixSeg, empresa de treinamentos online em Segurança do Trabalho.
Responda sempre em português do Brasil, com clareza, cordialidade e no máximo 120 palavras.
Use somente as informações fornecidas neste contexto. Não invente clientes, reconhecimento oficial, garantias legais ou regras regulatórias.
Os cursos são 100% online. O certificado digital é liberado após conclusão e aprovação com nota mínima de 70%. Cada curso define sua política de tentativas.
Cursos e pacotes: há catálogo individual para chão de fábrica, administrativo, manutenção, liderança, RH/SESMT, DDS e NRs. Pacotes empresariais: Integração Essencial (R$ 199,90 por colaborador), Chão de Fábrica (R$ 349,90), Administrativo Seguro (R$ 249,90), Liderança em Segurança (R$ 449,90), Manutenção Segura (R$ 399,90) e RH e Gestão SST (R$ 299,90).
Descontos empresariais: 1 a 5 colaboradores preço normal; 6 a 20 com 10%; 21 a 50 com 15%; 51 a 100 com 20%; acima de 100 sob proposta.
Para empresas, há compra em lote, dashboard com colaboradores ativos, cursos em andamento, certificados emitidos, vencimentos próximos, gráficos de conformidade, situação da equipe, matrículas por curso, relatórios e controle de vencimentos.
A área do aluno possui painel, cursos, apostilas em PDF, avaliações, certificados, dados e suporte. A área admin permite cadastrar cursos, alterar preços, editar conteúdo programático, nota mínima, tentativas, publicação e anexar PDFs.
NR-10, NR-33 e NR-35 podem exigir etapa prática/presencial, autorização formal ou avaliação complementar conforme atividade, risco e procedimento da empresa.
Pagamentos são finalizados no ambiente seguro do Mercado Pago quando a integração estiver configurada no servidor.
Se perguntarem sobre erro de checkout na Vercel, explique que a funcao api/checkout-preference.js precisa estar publicada e MERCADO_PAGO_ACCESS_TOKEN precisa estar configurado nas variaveis de ambiente do projeto. Se perguntarem sobre Netlify, explique que netlify/functions/checkout-preference.cjs permanece como compatibilidade. Se perguntarem sobre IA, explique que OPENAI_API_KEY ativa a IA real e, sem ela, o atendimento local continua funcionando.
Contato oficial: fortixseg@gmail.com.
Nunca solicite CPF, senha, número de cartão, código de segurança ou outros dados sensíveis pelo chat.
Em dúvida técnica ou legal específica, diga que a equipe humana deve confirmar pelo contato oficial.
`;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf"
};

const rateLimits = new Map();

export async function handleRequest(request, response) {
  const requestId = randomUUID();
  response.setHeader("X-Request-Id", requestId);
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  try {
    await runtimeStateReady;
    const url = new URL(request.url || "/", `http://${request.headers.host || `localhost:${PORT}`}`);

    if (request.method === "GET" && url.pathname === "/api/health") {
      return sendJson(response, 200, {
        ok: true,
        mercadoPagoConfigured: Boolean(ENV.MERCADO_PAGO_ACCESS_TOKEN),
        openAIConfigured: Boolean(ENV.OPENAI_API_KEY),
        model: OPENAI_MODEL,
        runtimeStateIssue: runtimeStateIssue || undefined
      });
    }

    if (request.method === "GET" && url.pathname === "/api/courses") {
      return sendJson(response, 200, { courses: await serializeCourseList(Object.values(courseCatalog).filter((course) => course.status === "published")) });
    }

    if (request.method === "GET" && url.pathname === "/api/admin/courses") {
      const session = requireRole(request, response, ["admin"]);
      if (!session) return;
      return sendJson(response, 200, { courses: await serializeCourseList(Object.values(courseCatalog), { includeDrafts: true }) });
    }

    if (request.method === "GET" && url.pathname === "/api/admin/interactive-courses") {
      const session = requireRole(request, response, ["admin"]);
      if (!session) return;
      return sendJson(response, 200, { courses: interactiveCourses.map(serializeInteractiveCourseSummary) });
    }

    if (request.method === "POST" && url.pathname === "/api/admin/interactive-courses/generate") {
      const session = requireRole(request, response, ["admin"]);
      if (!session) return;
      return await handleInteractiveCourseGenerate(request, response);
    }

    const adminInteractiveRegenerateMatch = url.pathname.match(/^\/api\/admin\/interactive-courses\/([^/]+)\/regenerate$/);
    if (adminInteractiveRegenerateMatch && request.method === "POST") {
      const session = requireRole(request, response, ["admin"]);
      if (!session) return;
      return await handleInteractiveCourseRegenerate(request, response, decodeURIComponent(adminInteractiveRegenerateMatch[1]));
    }

    const adminInteractiveMatch = url.pathname.match(/^\/api\/admin\/interactive-courses\/([^/]+)(?:\/(publish|unpublish))?$/);
    if (adminInteractiveMatch && request.method === "GET" && !adminInteractiveMatch[2]) {
      const session = requireRole(request, response, ["admin"]);
      if (!session) return;
      return handleInteractiveCourseGet(response, decodeURIComponent(adminInteractiveMatch[1]));
    }
    if (adminInteractiveMatch && request.method === "PUT" && !adminInteractiveMatch[2]) {
      const session = requireRole(request, response, ["admin"]);
      if (!session) return;
      return await handleInteractiveCourseUpdate(request, response, decodeURIComponent(adminInteractiveMatch[1]));
    }
    if (adminInteractiveMatch && request.method === "DELETE" && !adminInteractiveMatch[2]) {
      const session = requireRole(request, response, ["admin"]);
      if (!session) return;
      return await handleInteractiveCourseDelete(response, decodeURIComponent(adminInteractiveMatch[1]));
    }
    if (adminInteractiveMatch && request.method === "POST" && adminInteractiveMatch[2]) {
      const session = requireRole(request, response, ["admin"]);
      if (!session) return;
      return handleInteractiveCoursePublish(response, decodeURIComponent(adminInteractiveMatch[1]), adminInteractiveMatch[2] === "publish");
    }

    if (request.method === "POST" && url.pathname === "/api/admin/courses") {
      const session = requireRole(request, response, ["admin"]);
      if (!session) return;
      return await handleAdminCourseCreate(request, response);
    }

    const resourceMatch = url.pathname.match(/^\/api\/admin\/courses\/([^/]+)\/resources(?:\/([^/]+))?$/);
    if (resourceMatch && request.method === "POST" && !resourceMatch[2]) {
      const session = requireRole(request, response, ["admin"]);
      if (!session) return;
      return await handleAdminCourseResourceUpload(request, response, decodeURIComponent(resourceMatch[1]));
    }
    if (resourceMatch && request.method === "DELETE" && resourceMatch[2]) {
      const session = requireRole(request, response, ["admin"]);
      if (!session) return;
      return handleAdminCourseResourceDelete(response, decodeURIComponent(resourceMatch[1]), decodeURIComponent(resourceMatch[2]));
    }

    const adminCourseMatch = url.pathname.match(/^\/api\/admin\/courses\/([^/]+)$/);
    if (adminCourseMatch && request.method === "PUT") {
      const session = requireRole(request, response, ["admin"]);
      if (!session) return;
      return await handleAdminCourseUpdate(request, response, decodeURIComponent(adminCourseMatch[1]));
    }
    if (adminCourseMatch && request.method === "DELETE") {
      const session = requireRole(request, response, ["admin"]);
      if (!session) return;
      return handleAdminCourseDelete(response, decodeURIComponent(adminCourseMatch[1]));
    }

    if (request.method === "POST" && url.pathname === "/api/auth/register") {
      return await handleRegister(request, response);
    }

    if (request.method === "POST" && (url.pathname === "/api/auth/login" || url.pathname === "/api/auth/demo")) {
      return await handleLogin(request, response);
    }

    if (request.method === "POST" && url.pathname === "/api/proposals") {
      return await handleProposal(request, response);
    }

    if (request.method === "POST" && url.pathname === "/api/contact") {
      return await handleContact(request, response);
    }

    if (request.method === "GET" && url.pathname === "/api/student/dashboard") {
      const session = requireRole(request, response, ["student", "admin"]);
      if (!session) return;
      return sendJson(response, 200, await buildStudentDashboard(session));
    }

    if (request.method === "GET" && url.pathname === "/api/student/library") {
      const session = requireRole(request, response, ["student", "admin"]);
      if (!session) return;
      return sendJson(response, 200, await buildStudentLibrary(session));
    }

    if (request.method === "GET" && url.pathname === "/api/student/interactive-courses") {
      const session = requireRole(request, response, ["student", "admin"]);
      if (!session) return;
      return sendJson(response, 200, buildStudentInteractiveCourses(session));
    }

    const studentInteractiveLessonMatch = url.pathname.match(/^\/api\/student\/interactive-courses\/([^/]+)\/lessons\/([^/]+)\/complete$/);
    if (studentInteractiveLessonMatch && request.method === "POST") {
      const session = requireRole(request, response, ["student", "admin"]);
      if (!session) return;
      return await handleStudentInteractiveLessonComplete(response, session, decodeURIComponent(studentInteractiveLessonMatch[1]), decodeURIComponent(studentInteractiveLessonMatch[2]));
    }

    const studentInteractiveAssessmentMatch = url.pathname.match(/^\/api\/student\/interactive-courses\/([^/]+)\/assessment$/);
    if (studentInteractiveAssessmentMatch && request.method === "POST") {
      const session = requireRole(request, response, ["student", "admin"]);
      if (!session) return;
      return await handleStudentInteractiveAssessment(request, response, session, decodeURIComponent(studentInteractiveAssessmentMatch[1]));
    }

    if (request.method === "GET" && url.pathname === "/api/student/certificates/current") {
      const session = requireRole(request, response, ["student", "admin"]);
      if (!session) return;
      return sendJson(response, 200, await buildCurrentCertificateResponse(session));
    }

    if (request.method === "GET" && url.pathname === "/api/student/certificates/current.pdf") {
      const session = requireRole(request, response, ["student", "admin"]);
      if (!session) return;
      return await handleCertificatePdf(response, session, url.searchParams.get("courseId"));
    }

    if (request.method === "POST" && url.pathname === "/api/student/profile") {
      const session = requireRole(request, response, ["student", "admin"]);
      if (!session) return;
      return await handleStudentProfile(request, response, session);
    }

    if (request.method === "POST" && url.pathname === "/api/student/support") {
      const session = requireRole(request, response, ["student", "admin"]);
      if (!session) return;
      return await handleStudentSupport(request, response, session);
    }

    if (request.method === "POST" && url.pathname === "/api/student/assessment") {
      const session = requireRole(request, response, ["student", "admin"]);
      if (!session) return;
      return await handleStudentAssessment(request, response, session);
    }

    if (request.method === "GET" && url.pathname === "/api/company/dashboard") {
      const session = requireRole(request, response, ["company", "admin"]);
      if (!session) return;
      return sendJson(response, 200, buildCompanyDashboard(session));
    }

    if (request.method === "POST" && url.pathname === "/api/company/employees") {
      const session = requireRole(request, response, ["company", "admin"]);
      if (!session) return;
      return await handleCompanyEmployeeAdd(request, response, session);
    }

    if (request.method === "POST" && url.pathname === "/api/company/settings") {
      const session = requireRole(request, response, ["company", "admin"]);
      if (!session) return;
      return await handleCompanySettings(request, response, session);
    }

    if (request.method === "GET" && url.pathname === "/api/affiliate/dashboard") {
      const session = requireRole(request, response, ["affiliate", "admin"]);
      if (!session) return;
      return sendJson(response, 200, buildAffiliateDashboard(session));
    }

    if (request.method === "POST" && url.pathname === "/api/affiliate/settings") {
      const session = requireRole(request, response, ["affiliate", "admin"]);
      if (!session) return;
      return await handleAffiliateSettings(request, response, session);
    }

    if (request.method === "GET" && url.pathname === "/api/admin/dashboard") {
      const session = requireRole(request, response, ["admin"]);
      if (!session) return;
      return sendJson(response, 200, buildAdminDashboard(session));
    }

    if (request.method === "GET" && url.pathname === "/api/admin/users") {
      const session = requireRole(request, response, ["admin"]);
      if (!session) return;
      return sendJson(response, 200, handleAdminUsersList());
    }

    if (request.method === "POST" && url.pathname === "/api/admin/users") {
      const session = requireRole(request, response, ["admin"]);
      if (!session) return;
      return await handleAdminUserCreate(request, response);
    }

    const adminUserMatch = url.pathname.match(/^\/api\/admin\/users\/([^/]+)$/);
    if (adminUserMatch && request.method === "PATCH") {
      const session = requireRole(request, response, ["admin"]);
      if (!session) return;
      return await handleAdminUserStatus(request, response, session, decodeURIComponent(adminUserMatch[1]));
    }

    if (request.method === "POST" && url.pathname === "/api/admin/settings") {
      const session = requireRole(request, response, ["admin"]);
      if (!session) return;
      return await handleAdminSettings(request, response, session);
    }

    if (request.method === "GET" && url.pathname === "/api/certificates/validate") {
      return sendJson(response, 200, validateDemoCertificate(url.searchParams.get("code")));
    }

    if (request.method === "POST" && url.pathname === "/api/assistant") {
      if (!allowRequest(request, "assistant", 25, 10 * 60_000)) {
        return sendJson(response, 429, { error: "Muitas perguntas em pouco tempo. Aguarde um instante." });
      }
      return await handleAssistant(request, response);
    }

    if (request.method === "POST" && (url.pathname === "/api/checkout/preference" || url.pathname === "/api/checkout-preference")) {
      if (!allowRequest(request, "checkout", 12, 10 * 60_000)) {
        return sendJson(response, 429, { error: "Muitas tentativas de checkout. Aguarde um instante." });
      }
      return await handleCheckout(request, response);
    }

    if (request.method === "POST" && url.pathname === "/api/mercado-pago/webhook") {
      return await handleMercadoPagoWebhook(request, response, url);
    }

    if (request.method === "GET" || request.method === "HEAD") {
      return serveStatic(request, response, url.pathname);
    }

    return sendJson(response, 404, { error: "Rota não encontrada." });
  } catch (error) {
    console.error(`[${requestId}]`, error.message);
    return sendJson(response, error.statusCode || 500, {
      error: error.statusCode ? error.message : "Erro interno do servidor.",
      requestId
    });
  }
}

if (IS_DIRECT_RUN) {
  const server = createServer(handleRequest);
  server.listen(PORT, "127.0.0.1", () => {
    console.log(`FortixSeg disponível em http://127.0.0.1:${PORT}`);
  });
}

function loadCourseCatalog() {
  let source = DEFAULT_COURSE_CATALOG;
  if (existsSync(COURSE_DATA_FILE)) {
    try {
      const stored = JSON.parse(readTextFile(COURSE_DATA_FILE));
      if (stored && typeof stored === "object") source = stored;
    } catch (error) {
      console.error(`Não foi possível ler o catálogo persistido: ${error.message}`);
    }
  }

  return Object.fromEntries(Object.entries(source).map(([id, course]) => [id, normalizeCourse(course, id)]));
}

function saveCourseCatalog() {
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(COURSE_DATA_FILE, JSON.stringify(courseCatalog, null, 2), "utf8");
}

function loadInteractiveCourses() {
  if (!existsSync(INTERACTIVE_COURSE_DATA_FILE)) return [];
  try {
    const parsed = JSON.parse(readTextFile(INTERACTIVE_COURSE_DATA_FILE));
    return Array.isArray(parsed) ? parsed.map(normalizeInteractiveCourse).filter(Boolean) : [];
  } catch (error) {
    console.error(`Nao foi possivel ler cursos interativos: ${error.message}`);
    return [];
  }
}

function saveInteractiveCourses() {
  if (IS_SERVERLESS_RUNTIME) return;
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(INTERACTIVE_COURSE_DATA_FILE, JSON.stringify(interactiveCourses.map(normalizeInteractiveCourse).filter(Boolean), null, 2), "utf8");
}

function loadAppData() {
  let source = {};
  if (existsSync(APP_DATA_FILE)) {
    try {
      const parsed = JSON.parse(readTextFile(APP_DATA_FILE));
      if (parsed && typeof parsed === "object") source = parsed;
    } catch (error) {
      console.error(`Não foi possível ler o estado da aplicação: ${error.message}`);
    }
  }

  return {
    ...source,
    proposals: Array.isArray(source.proposals) ? source.proposals : [],
    contactMessages: Array.isArray(source.contactMessages) ? source.contactMessages : [],
    supportTickets: Array.isArray(source.supportTickets) ? source.supportTickets : [],
    assessmentResults: Array.isArray(source.assessmentResults) ? source.assessmentResults : [],
    users: Array.isArray(source.users) ? source.users.map(normalizeUserRecord).filter(Boolean) : [],
    registrations: Array.isArray(source.registrations) ? source.registrations : [],
    enrollments: Array.isArray(source.enrollments) ? source.enrollments : [],
    orders: Array.isArray(source.orders) ? source.orders : [],
    studentProfiles: source.studentProfiles && typeof source.studentProfiles === "object" ? source.studentProfiles : {},
    companySettings: source.companySettings && typeof source.companySettings === "object" ? source.companySettings : {},
    affiliateSettings: source.affiliateSettings && typeof source.affiliateSettings === "object" ? source.affiliateSettings : {},
    adminSettings: source.adminSettings && typeof source.adminSettings === "object" ? source.adminSettings : {},
    companyEmployees: source.companyEmployees && typeof source.companyEmployees === "object" ? source.companyEmployees : {},
    certificates: Array.isArray(source.certificates) ? source.certificates : [],
    interactiveProgress: source.interactiveProgress && typeof source.interactiveProgress === "object" ? source.interactiveProgress : {}
  };
}

function saveAppData() {
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(APP_DATA_FILE, JSON.stringify(appState, null, 2), "utf8");
}

function readTextFile(filePath) {
  return readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
}

async function initializeRuntimeState() {
  if (isDatabaseEnabled()) {
    try {
      const persisted = await loadDatabaseState({
        defaultCourseCatalog: courseCatalog,
        defaultAppData: appState,
        defaultInteractiveCourses: interactiveCourses
      });
      if (persisted) {
        courseCatalog = Object.fromEntries(
          Object.entries(persisted.courseCatalog || {}).map(([id, course]) => [id, normalizeCourse(course, id)])
        );
        appState = loadAppDataFromSource(persisted.appData);
        interactiveCourses = Array.isArray(persisted.interactiveCourses)
          ? persisted.interactiveCourses.map(normalizeInteractiveCourse).filter(Boolean)
          : interactiveCourses;
      }
    } catch (error) {
      console.error(`Não foi possível carregar dados do banco: ${error.message}`);
    }
  }

  ensureSeedUsers();
  companyEmployees = loadInitialCompanyEmployees();
  try {
    await persistRuntimeState();
  } catch (error) {
    runtimeStateIssue = cleanText(error?.message || "Falha ao persistir estado inicial.", 240);
    console.error(`Não foi possível persistir estado inicial: ${runtimeStateIssue}`);
  }
}

function loadAppDataFromSource(source = {}) {
  return {
    ...loadAppData(),
    ...source,
    proposals: Array.isArray(source.proposals) ? source.proposals : [],
    contactMessages: Array.isArray(source.contactMessages) ? source.contactMessages : [],
    supportTickets: Array.isArray(source.supportTickets) ? source.supportTickets : [],
    assessmentResults: Array.isArray(source.assessmentResults) ? source.assessmentResults : [],
    users: Array.isArray(source.users) ? source.users.map(normalizeUserRecord).filter(Boolean) : [],
    registrations: Array.isArray(source.registrations) ? source.registrations : [],
    enrollments: Array.isArray(source.enrollments) ? source.enrollments : [],
    orders: Array.isArray(source.orders) ? source.orders : [],
    studentProfiles: source.studentProfiles && typeof source.studentProfiles === "object" ? source.studentProfiles : {},
    companySettings: source.companySettings && typeof source.companySettings === "object" ? source.companySettings : {},
    affiliateSettings: source.affiliateSettings && typeof source.affiliateSettings === "object" ? source.affiliateSettings : {},
    adminSettings: source.adminSettings && typeof source.adminSettings === "object" ? source.adminSettings : {},
    companyEmployees: source.companyEmployees && typeof source.companyEmployees === "object" ? source.companyEmployees : {},
    certificates: Array.isArray(source.certificates) ? source.certificates : [],
    interactiveProgress: source.interactiveProgress && typeof source.interactiveProgress === "object" ? source.interactiveProgress : {}
  };
}

async function persistRuntimeState() {
  try {
    if (!IS_SERVERLESS_RUNTIME) {
      saveCourseCatalog();
      saveAppData();
      saveInteractiveCourses();
    }
    if (isDatabaseEnabled()) {
      await saveDatabaseState({
        courseCatalog,
        appData: appState,
        interactiveCourses: interactiveCourses.map(normalizeInteractiveCourse).filter(Boolean)
      });
    }
  } catch (error) {
    runtimeStateIssue = cleanText(error?.message || "Falha ao salvar estado da aplicacao.", 240);
    console.error(`Nao foi possivel persistir estado da aplicacao: ${runtimeStateIssue}`);
  }
}

function normalizeUserRecord(user) {
  if (!user?.email) return null;
  return {
    id: cleanText(user.id || `user-${randomUUID()}`, 120),
    role: ["student", "company", "affiliate", "admin"].includes(user.role) ? user.role : "student",
    email: cleanText(user.email, 160).toLowerCase(),
    name: cleanText(user.name || "Usuário FortixSeg", 160),
    companyName: cleanText(user.companyName, 160),
    responsibleName: cleanText(user.responsibleName, 160),
    phone: cleanText(user.phone, 40),
    document: cleanText(user.document, 24),
    status: cleanText(user.status || "active", 40),
    passwordHash: cleanText(user.passwordHash, 256),
    passwordSalt: cleanText(user.passwordSalt, 120),
    createdAt: user.createdAt || new Date().toISOString(),
    updatedAt: user.updatedAt || new Date().toISOString(),
    lastLoginAt: user.lastLoginAt || ""
  };
}

function ensureSeedUsers() {
  const seeds = [
    {
      email: String(ENV.FORTIXSEG_STUDENT_EMAIL || "aluno@teste.com").toLowerCase(),
      password: String(ENV.FORTIXSEG_STUDENT_PASSWORD || "123456"),
      role: "student",
      name: "Joao da Silva",
      phone: "(11) 99999-0001",
      document: "00000000000"
    },
    {
      email: String(ENV.FORTIXSEG_COMPANY_EMAIL || "empresa@teste.com").toLowerCase(),
      password: String(ENV.FORTIXSEG_COMPANY_PASSWORD || "123456"),
      role: "company",
      name: "Empresa Exemplo Ltda.",
      companyName: "Empresa Exemplo Ltda.",
      responsibleName: "Responsavel da Empresa",
      phone: "(11) 99999-0002",
      document: "00000000000100"
    },
    {
      email: String(ENV.FORTIXSEG_AFFILIATE_EMAIL || "afiliado@teste.com").toLowerCase(),
      password: String(ENV.FORTIXSEG_AFFILIATE_PASSWORD || "123456"),
      role: "affiliate",
      name: "Afiliado FortixSeg",
      phone: "(11) 99999-0003",
      document: "00000000000"
    },
    {
      email: String(ENV.FORTIXSEG_ADMIN_EMAIL || "").toLowerCase(),
      password: String(ENV.FORTIXSEG_ADMIN_PASSWORD || ""),
      role: "admin",
      name: "Administrador FortixSeg"
    }
  ];

  const nextUsers = [...appState.users];
  for (const seed of seeds) {
    if (!seed.email || !seed.password) continue;
    const existing = nextUsers.find((item) => item.email === seed.email);
    if (existing) {
      const refreshed = createUserRecord({ ...seed, id: existing.id });
      Object.assign(existing, {
        role: refreshed.role,
        name: refreshed.name,
        companyName: seed.companyName || existing.companyName,
        responsibleName: seed.responsibleName || existing.responsibleName,
        phone: seed.phone || existing.phone,
        document: seed.document || existing.document,
        status: "active",
        passwordSalt: refreshed.passwordSalt,
        passwordHash: refreshed.passwordHash,
        updatedAt: new Date().toISOString()
      });
      continue;
    }
    nextUsers.push(createUserRecord(seed));
  }
  appState.users = nextUsers;
}

function loadInitialCompanyEmployees() {
  const existingGroups = Object.values(appState.companyEmployees || {}).find((value) => Array.isArray(value) && value.length);
  if (existingGroups) return existingGroups.map(normalizeEmployeeRecord);
  return [];
}

function normalizeEmployeeRecord(employee) {
  return {
    name: cleanText(employee?.name, 120),
    cpf: cleanText(employee?.cpf, 20),
    email: cleanText(employee?.email, 160),
    course: cleanText(employee?.course, 80),
    progress: cleanText(employee?.progress || "0%", 20),
    status: cleanText(employee?.status || "Não iniciado", 40),
    certificate: Boolean(employee?.certificate)
  };
}

function normalizeCourse(input, fallbackId = "") {
  const id = slugify(input.id || fallbackId || input.code || input.title || `curso-${Date.now()}`);
  const syllabusSource = Array.isArray(input.syllabus) ? input.syllabus : String(input.syllabus || "").split(/\r?\n/);
  return {
    id,
    code: cleanText(input.code || id.toUpperCase(), 30),
    title: cleanText(input.title || "Curso sem título", 180),
    category: cleanText(input.category || "Segurança do Trabalho", 80),
    hours: clampNumber(input.hours, 1, 500, 4),
    price: clampNumber(input.price, 0, 100000, 0),
    modality: "Online",
    status: input.status === "draft" ? "draft" : "published",
    audience: cleanText(input.audience || "Profissionais e empresas que buscam capacitação em Segurança do Trabalho.", 600),
    objective: cleanText(input.objective || "Capacitar o participante conforme o conteúdo programático definido.", 600),
    lessons: Math.round(clampNumber(input.lessons, 1, 200, Math.max(1, syllabusSource.length))),
    minimumGrade: Math.round(clampNumber(input.minimumGrade, 0, 100, 70)),
    attempts: Math.round(clampNumber(input.attempts, 1, 10, 3)),
    syllabus: syllabusSource.map((item) => cleanText(item, 240)).filter(Boolean).slice(0, 80),
    resources: Array.isArray(input.resources) ? input.resources.map(normalizeResource).filter(Boolean) : [],
    createdAt: input.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

function normalizeResource(resource) {
  if (!resource || (!resource.url && !resource.pathname)) return null;
  return {
    id: cleanText(resource.id || randomUUID(), 100),
    type: "pdf",
    name: cleanText(resource.name || "Material do curso", 180),
    url: cleanText(resource.url, 500),
    pathname: cleanText(resource.pathname, 500),
    storage: cleanText(resource.storage, 40),
    mimeType: cleanText(resource.mimeType || "application/octet-stream", 100),
    size: Number(resource.size) || 0,
    createdAt: resource.createdAt || new Date().toISOString()
  };
}

function normalizeInteractiveCourse(course) {
  if (!course?.id || !course?.title) return null;
  const modules = Array.isArray(course.modules) ? course.modules.map((module, moduleIndex) => ({
    id: cleanText(module.id || `module-${moduleIndex + 1}`, 80),
    title: cleanText(module.title || `Modulo ${moduleIndex + 1}`, 180),
    topics: Array.isArray(module.topics) ? module.topics.map((topic) => cleanText(topic, 180)).filter(Boolean) : [],
    sourcePages: Array.isArray(module.sourcePages) ? module.sourcePages.map(Number).filter((value) => Number.isFinite(value)).slice(0, 80) : [],
    sourceWordCount: Number(module.sourceWordCount) || 0,
    structureConfidence: Number(module.structureConfidence) || 0,
    topicDetails: Array.isArray(module.topicDetails) ? module.topicDetails.map(normalizeInteractiveTopic).filter(Boolean) : [],
    lessons: Array.isArray(module.lessons) ? module.lessons.map((lesson, lessonIndex) => normalizeInteractiveLesson(lesson, lessonIndex)).filter(Boolean) : []
  })) : [];
  const normalized = {
    ...course,
    id: slugify(course.id),
    title: cleanText(course.title, 180),
    code: cleanText(course.code || "SST", 30),
    category: cleanText(course.category || "Seguranca do Trabalho", 80),
    status: course.status === "published" ? "published" : "draft",
    source: "pdf-template",
    detectedTemplate: cleanText(course.detectedTemplate || "sst-generico", 40),
    detectedLabel: cleanText(course.detectedLabel || "SST Generico", 120),
    confidence: Number(course.confidence) || 0,
    hours: clampNumber(course.hours, 1, 500, 4),
    minimumGrade: Math.round(clampNumber(course.minimumGrade, 0, 100, 70)),
    attempts: Math.round(clampNumber(course.attempts, 1, 10, 3)),
    responsible: cleanText(course.responsible || "Responsavel tecnico a definir", 160),
    generatedAt: course.generatedAt || new Date().toISOString(),
    updatedAt: course.updatedAt || new Date().toISOString(),
    pdf: {
      id: cleanText(course.pdf?.id || `pdf-${randomUUID()}`, 100),
      name: cleanText(course.pdf?.name || "material.pdf", 180),
      url: cleanText(course.pdf?.url, 500),
      pathname: cleanText(course.pdf?.pathname, 500),
      mimeType: "application/pdf",
      size: Number(course.pdf?.size) || 0,
      pages: Number(course.pdf?.pages) || 0,
      extractionStatus: cleanText(course.pdf?.extractionStatus || "unknown", 40),
      extractionError: cleanText(course.pdf?.extractionError || "", 240),
      detectedTitle: cleanText(course.pdf?.detectedTitle || "", 180),
      detectedHours: Number(course.pdf?.detectedHours) || 0,
      searchablePages: Number(course.pdf?.searchablePages) || 0,
      relevantPages: Number(course.pdf?.relevantPages) || 0,
      textCharacters: Number(course.pdf?.textCharacters) || 0,
      storage: cleanText(course.pdf?.storage || "", 40)
    },
    sourceDocument: normalizeInteractiveSourceDocument(course.sourceDocument || {}),
    analysis: normalizeInteractiveAnalysis(course.analysis || {}),
    review: course.review && typeof course.review === "object" ? course.review : { required: true, status: "pending", notes: [] },
    modules,
    finalAssessment: {
      minimumGrade: Math.round(clampNumber(course.finalAssessment?.minimumGrade ?? course.minimumGrade, 0, 100, 70)),
      attempts: Math.round(clampNumber(course.finalAssessment?.attempts ?? course.attempts, 1, 10, 3)),
      questions: Array.isArray(course.finalAssessment?.questions) ? course.finalAssessment.questions.map(normalizeInteractiveQuestion).filter(Boolean) : []
    }
  };
  normalized.stats = summarizeCourse(normalized);
  return normalized;
}

function normalizeInteractiveSourceDocument(source) {
  return {
    filename: cleanText(source.filename || "", 180),
    size: Number(source.size) || 0,
    url: cleanText(source.url || "", 500),
    pathname: cleanText(source.pathname || "", 500),
    totalPages: Number(source.totalPages) || 0,
    searchablePages: Number(source.searchablePages) || 0,
    relevantPages: Array.isArray(source.relevantPages) ? source.relevantPages.map(Number).filter((value) => Number.isFinite(value)).slice(0, 120) : [],
    searchability: cleanText(source.searchability || "", 60),
    extractionStatus: cleanText(source.extractionStatus || "", 60),
    extractionError: cleanText(source.extractionError || "", 240)
  };
}

function normalizeInteractiveAnalysis(analysis) {
  return {
    model: cleanText(analysis.model || "", 60),
    modelLabel: cleanText(analysis.modelLabel || "", 160),
    confidence: Number(analysis.confidence) || 0,
    detectedTitle: cleanText(analysis.detectedTitle || "", 180),
    detectedHours: Number(analysis.detectedHours) || 0,
    structureStrategy: cleanText(analysis.structureStrategy || "", 600),
    modules: Number(analysis.modules) || 0,
    lessons: Number(analysis.lessons) || 0,
    topics: Number(analysis.topics) || 0,
    questions: Number(analysis.questions) || 0,
    sourcePages: Number(analysis.sourcePages) || 0,
    searchablePages: Number(analysis.searchablePages) || 0,
    relevantPages: Number(analysis.relevantPages) || 0,
    coveragePercent: Math.round(clampNumber(analysis.coveragePercent, 0, 100, 0)),
    criticalConcepts: Array.isArray(analysis.criticalConcepts) ? analysis.criticalConcepts.map((item) => cleanText(item, 120)).filter(Boolean).slice(0, 24) : [],
    warnings: Array.isArray(analysis.warnings) ? analysis.warnings.map((item) => cleanText(item, 240)).filter(Boolean).slice(0, 8) : []
  };
}

function normalizeInteractiveTopic(topic) {
  if (!topic?.title) return null;
  return {
    id: cleanText(topic.id || `topic-${randomUUID()}`, 100),
    title: cleanText(topic.title, 180),
    sourcePages: Array.isArray(topic.sourcePages) ? topic.sourcePages.map(Number).filter((value) => Number.isFinite(value)).slice(0, 20) : [],
    sourcePreview: cleanText(topic.sourcePreview || "", 600),
    wordCount: Number(topic.wordCount) || 0,
    contentType: cleanText(topic.contentType || "Texto", 60),
    keyPoints: Array.isArray(topic.keyPoints) ? topic.keyPoints.map((item) => cleanText(item, 180)).filter(Boolean).slice(0, 8) : [],
    summary: cleanText(topic.summary || "", 800)
  };
}

function normalizeInteractiveLesson(lesson, lessonIndex = 0) {
  if (!lesson) return null;
  return {
    id: cleanText(lesson.id || `lesson-${randomUUID()}`, 100),
    title: cleanText(lesson.title || `Aula ${lessonIndex + 1}`, 180),
    sourcePage: Number(lesson.sourcePage) || lessonIndex + 1,
    pageImageUrl: cleanText(lesson.pageImageUrl, 500),
    pagePreviewType: cleanText(lesson.pagePreviewType || "pdf-page", 40),
    extractedText: cleanText(lesson.extractedText, 8000),
    summary: cleanText(lesson.summary, 800),
    attentionCard: cleanText(lesson.attentionCard, 800),
    practiceCard: cleanText(lesson.practiceCard, 800),
    checklist: Array.isArray(lesson.checklist) ? lesson.checklist.map((item) => cleanText(item, 180)).filter(Boolean).slice(0, 12) : [],
    quickQuestion: normalizeInteractiveQuestion(lesson.quickQuestion),
    completedButtonLabel: cleanText(lesson.completedButtonLabel || "Concluir aula", 80)
  };
}

function normalizeInteractiveQuestion(question) {
  if (!question?.prompt) return null;
  const alternatives = Array.isArray(question.alternatives) ? question.alternatives.map((item) => cleanText(item, 240)).filter(Boolean).slice(0, 6) : [];
  if (alternatives.length < 2) return null;
  return {
    id: cleanText(question.id || `q-${randomUUID()}`, 100),
    prompt: cleanText(question.prompt, 500),
    alternatives,
    correctIndex: Math.min(alternatives.length - 1, Math.max(0, Number(question.correctIndex) || 0)),
    explanation: cleanText(question.explanation || "Resposta conferida conforme o conteudo do treinamento.", 600)
  };
}

async function serializeCourseList(courses, options = {}) {
  const serialized = [];
  for (const course of courses) {
    if (!options.includeDrafts && course.status !== "published") continue;
    serialized.push(await serializeCourse(course));
  }
  return serialized;
}

async function serializeCourse(course) {
  const resources = [];
  for (const resource of course.resources || []) {
    resources.push(await serializeResource(resource));
  }
  return { ...course, resources };
}

async function serializeResource(resource) {
  const url = resource.storage === "blob-private"
    ? await createBlobReadUrl(resource)
    : cleanText(resource.url || "", 500);
  return {
    ...resource,
    url
  };
}

async function handleAdminCourseCreate(request, response) {
  const body = await readJsonBody(request, 200_000);
  const id = slugify(body.id || body.code || body.title);
  if (!id || !cleanText(body.title, 180)) return sendJson(response, 400, { error: "Informe o nome e o código do curso." });
  if (courseCatalog[id]) return sendJson(response, 409, { error: "Já existe um curso com esse identificador." });

  const course = normalizeCourse({ ...body, id, resources: [] }, id);
  courseCatalog[id] = course;
  await persistRuntimeState();
  return sendJson(response, 201, { course: await serializeCourse(course) });
}

async function handleAdminCourseUpdate(request, response, courseId) {
  const current = courseCatalog[courseId];
  if (!current) return sendJson(response, 404, { error: "Curso não encontrado." });
  const body = await readJsonBody(request, 200_000);
  const course = normalizeCourse({ ...current, ...body, id: courseId, resources: current.resources }, courseId);
  courseCatalog[courseId] = course;
  await persistRuntimeState();
  return sendJson(response, 200, { course: await serializeCourse(course) });
}

async function handleAdminCourseDelete(response, courseId) {
  if (!courseCatalog[courseId]) return sendJson(response, 404, { error: "Curso não encontrado." });
  const hasEnrollments = appState.enrollments.some((item) => item.courseId === courseId);
  if (hasEnrollments) {
    courseCatalog[courseId].status = "draft";
    courseCatalog[courseId].updatedAt = new Date().toISOString();
    await persistRuntimeState();
    return sendJson(response, 200, { archived: true, id: courseId, message: "Curso arquivado porque já possui matrículas." });
  }
  delete courseCatalog[courseId];
  await persistRuntimeState();
  return sendJson(response, 200, { deleted: true, id: courseId });
}

async function handleAdminCourseResourceUpload(request, response, courseId) {
  const course = courseCatalog[courseId];
  if (!course) return sendJson(response, 404, { error: "Curso não encontrado." });
  const body = await readJsonBody(request, 18_000_000);
  const match = String(body.data || "").match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return sendJson(response, 400, { error: "Arquivo inválido." });

  const mimeType = match[1].toLowerCase();
  const allowed = {
    "application/pdf": { type: "pdf", extension: ".pdf" }
  };
  const fileType = allowed[mimeType];
  if (!fileType) return sendJson(response, 415, { error: "Por enquanto, envie somente arquivos PDF." });

  const bytes = Buffer.from(match[2], "base64");
  if (!bytes.length || bytes.length > 12_000_000) return sendJson(response, 413, { error: "O arquivo deve ter no máximo 12 MB." });

  const baseName = slugify(basename(cleanText(body.name, 180), extname(cleanText(body.name, 180)))) || "material";
  const fileName = `${Date.now()}-${baseName}${fileType.extension}`;
  let resource;

  if (isBlobStorageEnabled()) {
    const uploaded = await uploadBlobResource({
      pathname: `courses/${slugify(courseId)}/${fileName}`,
      bytes,
      mimeType
    });
    resource = normalizeResource({
      id: randomUUID(),
      type: fileType.type,
      name: cleanText(body.name || fileName, 180),
      url: uploaded.storage === "blob-public" ? uploaded.url : "",
      pathname: uploaded.pathname,
      storage: uploaded.storage,
      mimeType,
      size: bytes.length
    });
  } else if (!IS_SERVERLESS_RUNTIME) {
    const safeCourseId = slugify(courseId);
    const uploadDir = resolve(COURSE_UPLOAD_DIR, safeCourseId);
    if (!uploadDir.startsWith(`${COURSE_UPLOAD_DIR}${sep}`)) return sendJson(response, 403, { error: "Destino de upload inválido." });
    mkdirSync(uploadDir, { recursive: true });
    const filePath = resolve(uploadDir, fileName);
    writeFileSync(filePath, bytes);
    resource = normalizeResource({
      id: randomUUID(),
      type: fileType.type,
      name: cleanText(body.name || fileName, 180),
      url: `/assets/uploads/courses/${safeCourseId}/${fileName}`,
      mimeType,
      size: bytes.length
    });
  } else {
    return sendJson(response, 501, {
      error: "Upload de PDF em producao precisa do storage configurado. Configure BLOB_READ_WRITE_TOKEN e COURSE_STORAGE_MODE=blob-public na Vercel."
    });
  }

  course.resources.push(resource);
  course.updatedAt = new Date().toISOString();
  await persistRuntimeState();
  return sendJson(response, 201, { resource: await serializeResource(resource), course: await serializeCourse(course) });
}

async function handleAdminCourseResourceDelete(response, courseId, resourceId) {
  const course = courseCatalog[courseId];
  if (!course) return sendJson(response, 404, { error: "Curso não encontrado." });
  const resource = course.resources.find((item) => item.id === resourceId);
  if (!resource) return sendJson(response, 404, { error: "Material não encontrado." });

  course.resources = course.resources.filter((item) => item.id !== resourceId);
  if (resource.storage === "blob-private" || resource.storage === "blob-public") {
    await deleteBlobResource(resource);
  } else if (resource.url.startsWith("/assets/uploads/courses/")) {
    const filePath = resolve(ROOT_DIR, resource.url.replace(/^\/+/, ""));
    if (filePath.startsWith(`${COURSE_UPLOAD_DIR}${sep}`) && existsSync(filePath)) unlinkSync(filePath);
  }
  await persistRuntimeState();
  return sendJson(response, 200, { deleted: true, course: await serializeCourse(course) });
}

async function handleInteractiveCourseGenerate(request, response) {
  const body = await readJsonBody(request, 30_000_000);
  const action = String(body.action || "").toLowerCase();
  if (action === "delete") return await handleInteractiveCourseDelete(response, body.courseId);
  if (action === "regenerate") return await handleInteractiveCourseRegenerate(request, response, body.courseId, body);
  if (action === "publish" || action === "unpublish") return await handleInteractiveCoursePublish(response, body.courseId, action === "publish");

  const match = String(body.data || "").match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return sendJson(response, 400, { error: "Envie um PDF valido para gerar o treinamento." });

  const mimeType = match[1].toLowerCase();
  if (mimeType !== "application/pdf") return sendJson(response, 415, { error: "Por enquanto, o gerador aceita somente PDF." });

  const bytes = Buffer.from(match[2], "base64");
  if (!bytes.length || bytes.length > 20_000_000) return sendJson(response, 413, { error: "O PDF deve ter no maximo 20 MB no MVP." });
  if (bytes.subarray(0, 4).toString("utf8") !== "%PDF") return sendJson(response, 400, { error: "O arquivo enviado nao parece ser um PDF valido." });

  const baseName = slugify(basename(cleanText(body.name, 180), extname(cleanText(body.name, 180)))) || "treinamento";
  const draftKey = `${Date.now()}-${baseName}`;
  const fileName = `${baseName}.pdf`;
  let storedUrl = "";
  let storedPathname = "";
  let storageMode = "none";

  try {
    if (isBlobStorageEnabled()) {
      const uploaded = await uploadBlobResource({
        pathname: `interactive/${draftKey}/${fileName}`,
        bytes,
        mimeType
      });
      storedUrl = uploaded.storage === "blob-public" ? uploaded.url : "";
      storedPathname = uploaded.pathname;
      storageMode = uploaded.storage;
    } else if (!IS_SERVERLESS_RUNTIME) {
      const uploadDir = resolve(INTERACTIVE_UPLOAD_DIR, draftKey);
      if (!uploadDir.startsWith(`${INTERACTIVE_UPLOAD_DIR}${sep}`)) return sendJson(response, 403, { error: "Destino de upload invalido." });
      mkdirSync(uploadDir, { recursive: true });
      const filePath = resolve(uploadDir, fileName);
      writeFileSync(filePath, bytes);
      storedUrl = `/assets/uploads/interactive/${draftKey}/${fileName}`;
      storedPathname = filePath;
      storageMode = "local-file";
    }
  } catch (error) {
    return sendJson(response, 500, {
      error: "Nao foi possivel armazenar o PDF.",
      details: cleanText(error.message, 240)
    });
  }

  let generated;
  try {
    generated = await generateInteractiveCourseFromPdf({
      bytes,
      originalName: body.originalName || body.name || fileName,
      storedUrl,
      storedPathname,
      options: {
        title: body.title,
        code: body.code,
        category: body.category,
        hours: body.hours,
        minimumGrade: body.minimumGrade,
        attempts: body.attempts,
        responsible: body.responsible
      }
    });
  } catch (error) {
    return sendJson(response, 422, { error: "Nao foi possivel extrair o texto do PDF.", details: cleanText(error.message, 240) });
  }

  const existingIds = new Set(interactiveCourses.map((course) => course.id));
  while (existingIds.has(generated.id)) generated.id = `${generated.id}-${String(randomUUID()).slice(0, 6)}`;
  const course = normalizeInteractiveCourse(generated);
  course.pdf.storage = storageMode;
  if (IS_SERVERLESS_RUNTIME && storageMode === "none") {
    course.review.notes = [
      ...(course.review.notes || []),
      "PDF processado para gerar o treinamento, mas nao foi salvo permanentemente porque o Vercel Blob ainda nao esta configurado."
    ];
  }
  interactiveCourses.unshift(course);
  await persistRuntimeState();
  return sendJson(response, 201, { course, courses: interactiveCourses.map(serializeInteractiveCourseSummary) });
}

async function handleInteractiveCourseRegenerate(request, response, courseId, bodyOverride = null) {
  const safeCourseId = slugify(courseId);
  const index = interactiveCourses.findIndex((course) => course.id === safeCourseId);
  if (index < 0) return sendJson(response, 404, { error: "Treinamento interativo nao encontrado." });

  const existing = interactiveCourses[index];
  const body = bodyOverride || await readJsonBody(request, 30_000_000);
  const match = String(body.data || "").match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return sendJson(response, 400, { error: "Envie um PDF valido para atualizar o treinamento." });

  const mimeType = match[1].toLowerCase();
  if (mimeType !== "application/pdf") return sendJson(response, 415, { error: "Por enquanto, o gerador aceita somente PDF." });

  const bytes = Buffer.from(match[2], "base64");
  if (!bytes.length || bytes.length > 20_000_000) return sendJson(response, 413, { error: "O PDF deve ter no maximo 20 MB no MVP." });
  if (bytes.subarray(0, 4).toString("utf8") !== "%PDF") return sendJson(response, 400, { error: "O arquivo enviado nao parece ser um PDF valido." });

  const baseName = slugify(basename(cleanText(body.name, 180), extname(cleanText(body.name, 180)))) || "treinamento";
  const draftKey = `${Date.now()}-${baseName}`;
  const fileName = `${baseName}.pdf`;
  let storedUrl = "";
  let storedPathname = "";
  let storageMode = "none";

  try {
    if (isBlobStorageEnabled()) {
      const uploaded = await uploadBlobResource({
        pathname: `interactive/${draftKey}/${fileName}`,
        bytes,
        mimeType
      });
      storedUrl = uploaded.storage === "blob-public" ? uploaded.url : "";
      storedPathname = uploaded.pathname;
      storageMode = uploaded.storage;
    } else if (!IS_SERVERLESS_RUNTIME) {
      const uploadDir = resolve(INTERACTIVE_UPLOAD_DIR, draftKey);
      if (!uploadDir.startsWith(`${INTERACTIVE_UPLOAD_DIR}${sep}`)) return sendJson(response, 403, { error: "Destino de upload invalido." });
      mkdirSync(uploadDir, { recursive: true });
      const filePath = resolve(uploadDir, fileName);
      writeFileSync(filePath, bytes);
      storedUrl = `/assets/uploads/interactive/${draftKey}/${fileName}`;
      storedPathname = filePath;
      storageMode = "local-file";
    }
  } catch (error) {
    return sendJson(response, 500, {
      error: "Nao foi possivel armazenar o PDF.",
      details: cleanText(error.message, 240)
    });
  }

  let generated;
  try {
    generated = await generateInteractiveCourseFromPdf({
      bytes,
      originalName: body.originalName || body.name || fileName,
      storedUrl,
      storedPathname,
      options: {
        title: body.title || existing.title,
        code: body.code || existing.code,
        category: body.category || existing.category,
        hours: body.hours || existing.hours,
        minimumGrade: body.minimumGrade || existing.minimumGrade,
        attempts: body.attempts || existing.attempts,
        responsible: body.responsible || existing.responsible
      }
    });
  } catch (error) {
    return sendJson(response, 422, { error: "Nao foi possivel extrair o texto do PDF.", details: cleanText(error.message, 240) });
  }

  const course = normalizeInteractiveCourse({
    ...generated,
    id: existing.id,
    status: "draft",
    generatedAt: existing.generatedAt,
    updatedAt: new Date().toISOString(),
    review: {
      ...(generated.review || {}),
      status: "pending",
      notes: [
        "Treinamento atualizado por novo PDF. Revise antes de publicar.",
        ...((generated.review || {}).notes || [])
      ]
    }
  });
  course.pdf.storage = storageMode;
  interactiveCourses[index] = course;
  await persistRuntimeState();
  return sendJson(response, 200, { course, courses: interactiveCourses.map(serializeInteractiveCourseSummary) });
}

function handleInteractiveCourseGet(response, courseId) {
  const course = findInteractiveCourse(courseId);
  if (!course) return sendJson(response, 404, { error: "Treinamento interativo nao encontrado." });
  return sendJson(response, 200, { course });
}

async function handleInteractiveCourseUpdate(request, response, courseId) {
  const safeCourseId = slugify(courseId);
  const index = interactiveCourses.findIndex((course) => course.id === safeCourseId);
  if (index < 0) return sendJson(response, 404, { error: "Treinamento interativo nao encontrado." });
  const body = await readJsonBody(request, 1_500_000);
  const nextCourse = normalizeInteractiveCourse({
    ...interactiveCourses[index],
    ...body.course,
    id: interactiveCourses[index].id,
    status: body.course?.status === "published" ? "published" : interactiveCourses[index].status,
    updatedAt: new Date().toISOString()
  });
  interactiveCourses[index] = nextCourse;
  await persistRuntimeState();
  return sendJson(response, 200, { course: nextCourse, courses: interactiveCourses.map(serializeInteractiveCourseSummary) });
}

async function handleInteractiveCourseDelete(response, courseId) {
  const safeCourseId = slugify(courseId);
  const before = interactiveCourses.length;
  interactiveCourses = interactiveCourses.filter((course) => course.id !== safeCourseId);
  if (interactiveCourses.length === before) return sendJson(response, 404, { error: "Treinamento interativo nao encontrado." });
  await persistRuntimeState();
  return sendJson(response, 200, { courses: interactiveCourses.map(serializeInteractiveCourseSummary) });
}

async function handleInteractiveCoursePublish(response, courseId, publish) {
  const course = findInteractiveCourse(courseId);
  if (!course) return sendJson(response, 404, { error: "Treinamento interativo nao encontrado." });
  course.status = publish ? "published" : "draft";
  course.review = {
    ...(course.review || {}),
    status: publish ? "approved" : "pending",
    publishedAt: publish ? new Date().toISOString() : ""
  };
  course.updatedAt = new Date().toISOString();
  course.stats = summarizeCourse(course);
  await persistRuntimeState();
  return sendJson(response, 200, { course, courses: interactiveCourses.map(serializeInteractiveCourseSummary) });
}

function serializeInteractiveCourseSummary(course) {
  return {
    id: course.id,
    title: course.title,
    code: course.code,
    category: course.category,
    status: course.status,
    detectedTemplate: course.detectedTemplate,
    detectedLabel: course.detectedLabel,
    confidence: course.confidence,
    hours: course.hours,
    minimumGrade: course.minimumGrade,
    attempts: course.attempts,
    responsible: course.responsible,
    generatedAt: course.generatedAt,
    updatedAt: course.updatedAt,
    pdf: course.pdf,
    stats: course.stats || summarizeCourse(course),
    review: course.review || {}
  };
}

function findInteractiveCourse(courseId) {
  const id = slugify(courseId);
  return interactiveCourses.find((course) => course.id === id) || null;
}

function slugify(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

function clampNumber(value, minimum, maximum, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(maximum, Math.max(minimum, number)) : fallback;
}

async function handleLogin(request, response) {
  const body = await readJsonBody(request);
  const email = cleanText(body.email, 160).toLowerCase();
  const password = String(body.password ?? "");
  const user = findUserByEmail(email);

  if (!user || !verifyPassword(password, user.passwordSalt, user.passwordHash) || user.status !== "active") {
    return sendJson(response, 401, { error: "E-mail ou senha inválidos." });
  }

  user.lastLoginAt = new Date().toISOString();
  user.updatedAt = user.lastLoginAt;
  await persistRuntimeState();

  return sendJson(response, 200, {
    user: {
      id: user.id,
      email,
      name: user.name,
      role: user.role
    },
    token: createSessionToken(email, user)
  });
}

async function handleRegister(request, response) {
  const body = await readJsonBody(request, 80_000);
  const requestedType = cleanText(body.accountType || body.type || "candidate", 30);
  const accountType = ["company", "affiliate", "admin"].includes(requestedType) ? requestedType : "candidate";
  const roleByType = {
    candidate: "student",
    company: "company",
    affiliate: "affiliate",
    admin: "admin"
  };
  const role = roleByType[accountType] || "student";
  const email = cleanText(body.email, 160).toLowerCase();
  const password = String(body.password ?? "");
  const confirmation = String(body.confirmPassword ?? "");
  const names = {
    company: body.companyName || body.companyResponsible || "Empresa cadastrada",
    affiliate: body.affiliateName || "Afiliado cadastrado",
    admin: body.adminName || "Administrador cadastrado",
    candidate: body.fullName || "Aluno cadastrado"
  };
  const name = cleanText(names[accountType], 160);

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return sendJson(response, 400, { error: "Informe nome e e-mail válido." });
  }

  if (password.length < 6 || password !== confirmation) {
    return sendJson(response, 400, { error: "A senha deve ter no mínimo 6 caracteres e a confirmação deve ser igual." });
  }

  if (accountType === "admin") {
    const expectedCode = String(ENV.FORTIXSEG_ADMIN_REGISTRATION_CODE || "FORTIX-ADMIN-2026");
    if (String(body.adminCode || "") !== expectedCode) {
      return sendJson(response, 403, { error: "Código de liberação administrativa inválido." });
    }
  }

  if (findUserByEmail(email)) {
    return sendJson(response, 409, { error: "Já existe uma conta com esse e-mail." });
  }

  const registrationContact = extractRegistrationContact(body, accountType);

  const user = createUserRecord({
    email,
    password,
    role,
    name,
    companyName: registrationContact.companyName,
    responsibleName: registrationContact.responsibleName,
    phone: registrationContact.phone,
    document: registrationContact.document
  });
  appState.users.unshift(user);
  appState.registrations.unshift({
    id: `registration-${randomUUID()}`,
    role,
    email,
    name,
    createdAt: new Date().toISOString()
  });
  await persistRuntimeState();

  return sendJson(response, 201, {
    user: {
      id: user.id,
      email,
      name: user.name,
      role: user.role
    },
    token: createSessionToken(email, user)
  });
}

function extractRegistrationContact(body, accountType) {
  const normalizedType = ["candidate", "company", "affiliate", "admin"].includes(accountType) ? accountType : "candidate";
  const byType = {
    candidate: {
      phone: body.phoneCandidate || body.phone,
      document: body.cpf || body.document
    },
    company: {
      companyName: body.companyName,
      responsibleName: body.companyResponsible,
      phone: body.phoneCompany || body.phone,
      document: body.companyCnpj || body.cnpj || body.document
    },
    affiliate: {
      phone: body.affiliatePhone || body.phone,
      document: body.affiliateDocument || body.document
    },
    admin: {
      phone: body.adminPhone || body.phone,
      document: body.adminDocument || body.document
    }
  };

  const source = byType[normalizedType] || byType.candidate;
  return {
    companyName: cleanText(source.companyName, 160),
    responsibleName: cleanText(source.responsibleName, 160),
    phone: cleanText(source.phone, 40),
    document: cleanText(source.document, 24)
  };
}

async function handleProposal(request, response) {
  const body = await readJsonBody(request, 120_000);
  const proposal = {
    id: `proposal-${randomUUID()}`,
    company: cleanText(body.company, 160),
    cnpj: cleanText(body.cnpj, 24),
    responsible: cleanText(body.responsible, 160),
    email: cleanText(body.email, 160).toLowerCase(),
    phone: cleanText(body.phone, 40),
    employees: Math.round(clampNumber(body.employees, 1, 100000, 0)),
    message: cleanText(body.message, 3000),
    createdAt: new Date().toISOString(),
    source: "site"
  };

  if (!proposal.company || !proposal.responsible || !proposal.email || !proposal.phone || !proposal.employees) {
    return sendJson(response, 400, { error: "Preencha empresa, responsável, e-mail, telefone e quantidade de colaboradores." });
  }

  appState.proposals.unshift(proposal);
  appState.proposals = appState.proposals.slice(0, 500);
  await persistRuntimeState();
  return sendJson(response, 201, { success: true, proposalId: proposal.id });
}

async function handleContact(request, response) {
  const body = await readJsonBody(request, 120_000);
  const message = {
    id: `contact-${randomUUID()}`,
    name: cleanText(body.name, 160),
    email: cleanText(body.email, 160).toLowerCase(),
    phone: cleanText(body.phone, 40),
    subject: cleanText(body.subject, 180),
    message: cleanText(body.message, 3000),
    createdAt: new Date().toISOString(),
    source: "site"
  };

  if (!message.name || !message.email || !message.message) {
    return sendJson(response, 400, { error: "Preencha nome, e-mail e mensagem." });
  }

  appState.contactMessages.unshift(message);
  appState.contactMessages = appState.contactMessages.slice(0, 1000);
  await persistRuntimeState();
  return sendJson(response, 201, { success: true, contactId: message.id });
}

function createSessionToken(email, user) {
  const payload = Buffer.from(JSON.stringify({
    userId: user.id,
    email,
    name: user.name,
    role: user.role,
    exp: Date.now() + SESSION_TTL_MS
  })).toString("base64url");
  return `${payload}.${signSessionPayload(payload)}`;
}

function signSessionPayload(payload) {
  return createHmac("sha256", SESSION_SECRET).update(payload).digest("base64url");
}

function parseSessionToken(token) {
  const [payload, signature] = String(token || "").split(".");
  if (!payload || !signature) return null;

  const expected = signSessionPayload(payload);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (signatureBuffer.length !== expectedBuffer.length || !timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null;
  }

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!session?.email || !session?.role || Number(session.exp) < Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}

function getRequestSession(request) {
  const authorization = request.headers.authorization || "";
  const match = String(authorization).match(/^Bearer\s+(.+)$/i);
  return match ? parseSessionToken(match[1]) : null;
}

function getStateUserKey(session) {
  return slugify(session?.userId || session?.email || session?.role || "anonymous");
}

function requireRole(request, response, roles) {
  const session = getRequestSession(request);
  if (!session) {
    sendJson(response, 401, { error: "Faça login novamente para continuar." });
    return null;
  }
  if (!roles.includes(session.role)) {
    sendJson(response, 403, { error: "Seu perfil não tem permissão para esta ação." });
    return null;
  }
  const user = findSessionUser(session);
  if (!user) {
    sendJson(response, 401, { error: "Sessão inválida. Faça login novamente." });
    return null;
  }
  if (user.status !== "active") {
    sendJson(response, 403, { error: "Usuário desativado. Fale com o administrador." });
    return null;
  }
  return session;
}

async function handleStudentProfile(request, response, session) {
  const body = await readJsonBody(request, 80_000);
  const key = getStateUserKey(session);
  const profile = {
    name: cleanText(body.name, 160),
    cpf: cleanText(body.cpf, 24),
    phone: cleanText(body.phone, 40),
    email: cleanText(body.email, 160).toLowerCase(),
    updatedAt: new Date().toISOString()
  };

  if (!profile.name || !profile.email) {
    return sendJson(response, 400, { error: "Nome e e-mail são obrigatórios." });
  }

  appState.studentProfiles[key] = profile;
  const user = findSessionUser(session);
  if (user) {
    user.name = profile.name;
    user.email = profile.email;
    user.phone = profile.phone;
    user.document = profile.cpf;
    user.updatedAt = profile.updatedAt;
  }
  await persistRuntimeState();
  return sendJson(response, 200, { success: true, profile });
}

async function handleStudentSupport(request, response, session) {
  const body = await readJsonBody(request, 80_000);
  const ticket = {
    id: `ticket-${randomUUID()}`,
    userEmail: session.email,
    userName: session.name || "Aluno",
    subject: cleanText(body.subject, 180),
    message: cleanText(body.message, 3000),
    status: "open",
    createdAt: new Date().toISOString()
  };

  if (!ticket.subject || !ticket.message) {
    return sendJson(response, 400, { error: "Assunto e mensagem são obrigatórios." });
  }

  appState.supportTickets.unshift(ticket);
  appState.supportTickets = appState.supportTickets.slice(0, 1000);
  await persistRuntimeState();
  return sendJson(response, 201, { success: true, ticket });
}

async function handleStudentAssessment(request, response, session) {
  const body = await readJsonBody(request, 80_000);
  const answers = Array.isArray(body.answers) ? body.answers : [];
  const correct = QUIZ_ANSWER_KEY.reduce((total, answer, index) => total + (Number(answers[index]) === answer ? 1 : 0), 0);
  const grade = Math.round((correct / QUIZ_ANSWER_KEY.length) * 100);
  const approved = grade >= 70;
  const courseId = slugify(body.courseId || "nr35") || "nr35";
  const assessment = {
    id: `assessment-${randomUUID()}`,
    userEmail: session.email,
    courseId,
    answers: answers.map((value) => Number(value)),
    grade,
    approved,
    createdAt: new Date().toISOString()
  };

  appState.assessmentResults.unshift(assessment);
  appState.assessmentResults = appState.assessmentResults.slice(0, 2000);
  const user = findSessionUser(session);
  const enrollment = ensureEnrollmentForUser(user?.id, courseId);
  enrollment.attemptsUsed = Number(enrollment.attemptsUsed || 0) + 1;
  enrollment.bestGrade = Math.max(Number(enrollment.bestGrade) || 0, grade);
  enrollment.progress = approved ? 100 : Math.max(Number(enrollment.progress) || 0, 75);
  enrollment.lessonsCompleted = approved ? enrollment.lessonsTotal : Math.max(Number(enrollment.lessonsCompleted) || 0, Math.max(1, enrollment.lessonsTotal - 2));
  enrollment.status = approved ? "completed" : "in_progress";
  enrollment.updatedAt = new Date().toISOString();
  enrollment.lastAccessAt = enrollment.updatedAt;

  let certificate = null;
  if (approved) {
    certificate = ensureCertificateForUser(session, courseId, grade, user?.id);
    enrollment.certificateId = certificate.id;
  }

  await persistRuntimeState();
  return sendJson(response, 200, {
    success: true,
    grade,
    approved,
    certificate,
    certificateUnlocked: approved
  });
}

async function handleCompanySettings(request, response, session) {
  const body = await readJsonBody(request, 80_000);
  const key = getStateUserKey(session);
  const settings = {
    company: cleanText(body.company, 160),
    email: cleanText(body.email, 160).toLowerCase(),
    expiryAlert: cleanText(body.expiryAlert, 40),
    weekly: cleanText(body.weekly, 20),
    updatedAt: new Date().toISOString()
  };

  if (!settings.company || !settings.email) {
    return sendJson(response, 400, { error: "Razão social e e-mail são obrigatórios." });
  }

  appState.companySettings[key] = settings;
  await persistRuntimeState();
  return sendJson(response, 200, { success: true, settings });
}

async function handleAffiliateSettings(request, response, session) {
  const body = await readJsonBody(request, 80_000);
  const key = getStateUserKey(session);
  const settings = {
    name: cleanText(body.name, 160),
    email: cleanText(body.email, 160).toLowerCase(),
    phone: cleanText(body.phone, 40),
    pix: cleanText(body.pix, 160),
    updatedAt: new Date().toISOString()
  };

  if (!settings.name || !settings.email) {
    return sendJson(response, 400, { error: "Nome e e-mail são obrigatórios." });
  }

  appState.affiliateSettings[key] = settings;
  await persistRuntimeState();
  return sendJson(response, 200, { success: true, settings });
}

async function handleAdminSettings(request, response, session) {
  const body = await readJsonBody(request, 80_000);
  const key = getStateUserKey(session);
  const settings = {
    brand: cleanText(body.brand, 120),
    supportEmail: cleanText(body.supportEmail, 160).toLowerCase(),
    minimumGrade: Math.round(clampNumber(body.minimumGrade, 0, 100, 70)),
    maintenance: cleanText(body.maintenance, 20),
    updatedAt: new Date().toISOString()
  };

  if (!settings.brand || !settings.supportEmail) {
    return sendJson(response, 400, { error: "Nome da plataforma e e-mail de suporte são obrigatórios." });
  }

  appState.adminSettings[key] = settings;
  await persistRuntimeState();
  return sendJson(response, 200, { success: true, settings });
}

function handleAdminUsersList() {
  const users = [...appState.users]
    .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")))
    .map(serializeAdminUser);

  return {
    users,
    metrics: {
      total: users.length,
      students: users.filter((user) => user.role === "student").length,
      companies: users.filter((user) => user.role === "company").length,
      affiliates: users.filter((user) => user.role === "affiliate").length,
      admins: users.filter((user) => user.role === "admin").length
    }
  };
}

async function handleAdminUserCreate(request, response) {
  const body = await readJsonBody(request, 80_000);
  const role = ["student", "company", "affiliate", "admin"].includes(body.role) ? body.role : "student";
  const email = cleanText(body.email, 160).toLowerCase();
  const password = String(body.password || "");
  const name = cleanText(body.name || body.companyName || body.responsibleName, 160);

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return sendJson(response, 400, { error: "Informe nome e e-mail válido." });
  }
  if (password.length < 6) {
    return sendJson(response, 400, { error: "A senha precisa ter no mínimo 6 caracteres." });
  }
  if (findUserByEmail(email)) {
    return sendJson(response, 409, { error: "Já existe uma conta com esse e-mail." });
  }

  const user = createUserRecord({
    role,
    email,
    password,
    name,
    companyName: role === "company" ? cleanText(body.companyName || name, 160) : "",
    responsibleName: role === "company" ? cleanText(body.responsibleName || name, 160) : "",
    phone: cleanText(body.phone, 40),
    document: cleanText(body.document, 24)
  });
  appState.users.unshift(user);
  appState.registrations.unshift({
    id: `registration-${randomUUID()}`,
    role,
    email,
    name,
    createdAt: new Date().toISOString(),
    source: "admin"
  });

  const courseId = slugify(body.courseId);
  if (role === "student" && courseId && courseCatalog[courseId]) {
    ensureEnrollmentForUser(user.id, courseId);
  }

  await persistRuntimeState();
  return sendJson(response, 201, { user: serializeAdminUser(user), users: handleAdminUsersList().users });
}

async function handleAdminUserStatus(request, response, session, userId) {
  const body = await readJsonBody(request, 20_000);
  const user = findUserById(userId);
  if (!user) return sendJson(response, 404, { error: "Usuário não encontrado." });

  const status = body.status === "inactive" ? "inactive" : "active";
  if (user.id === session.userId && status === "inactive") {
    return sendJson(response, 400, { error: "Você não pode desativar o próprio usuário administrativo." });
  }

  user.status = status;
  user.updatedAt = new Date().toISOString();
  await persistRuntimeState();
  return sendJson(response, 200, { user: serializeAdminUser(user), users: handleAdminUsersList().users });
}

function serializeAdminUser(user) {
  return {
    id: user.id,
    role: user.role,
    roleLabel: {
      student: "Aluno",
      company: "Empresa",
      affiliate: "Afiliado",
      admin: "Admin"
    }[user.role] || user.role,
    name: user.name,
    email: user.email,
    companyName: user.companyName || "",
    phone: user.phone || "",
    document: user.document || "",
    status: user.status || "active",
    createdAt: user.createdAt || "",
    lastLoginAt: user.lastLoginAt || ""
  };
}

async function handleCompanyEmployeeAdd(request, response, session) {
  const body = await readJsonBody(request);
  const course = courseCatalog[cleanText(body.courseId, 40)] || courseCatalog.nr35 || Object.values(courseCatalog)[0];
  if (!course) return sendJson(response, 400, { error: "Nenhum curso disponível para matrícula." });
  const employee = {
    name: cleanText(body.name, 120),
    cpf: cleanText(body.cpf, 20),
    email: cleanText(body.email, 160),
    course: course.code,
    progress: "0%",
    status: "Não iniciado",
    certificate: false
  };

  if (!employee.name || !employee.email) {
    return sendJson(response, 400, { error: "Nome e e-mail do colaborador são obrigatórios." });
  }

  const key = getStateUserKey(session);
  const currentEmployees = Array.isArray(appState.companyEmployees[key]) ? appState.companyEmployees[key] : loadInitialCompanyEmployees();
  appState.companyEmployees[key] = [employee, ...currentEmployees].slice(0, 300);
  companyEmployees = appState.companyEmployees[key];
  await persistRuntimeState();
  return sendJson(response, 201, buildCompanyDashboard(session));
}

async function buildStudentDashboard(session) {
  const user = findSessionUser(session);
  const enrollments = appState.enrollments
    .filter((item) => item.userId === user?.id)
    .map((item) => ({ ...item, course: courseCatalog[item.courseId] }))
    .filter((item) => item.course);
  const certificates = getUserCertificates(user?.id, session.email);
  const completed = enrollments.filter((item) => item.status === "completed").length;
  const inProgress = enrollments.find((item) => item.status !== "completed") || enrollments[0];
  const averageProgress = enrollments.length
    ? Math.round(enrollments.reduce((total, item) => total + (Number(item.progress) || 0), 0) / enrollments.length)
    : 0;
  const latestCertificate = certificates[0] || null;

  return {
    source: isDatabaseEnabled() ? "api-database" : "api-local",
    profile: {
      name: user?.name || session.name || "Aluno",
      email: user?.email || session.email,
      activeCourse: inProgress?.course?.title || latestCertificate?.courseTitle || "Nenhum curso ativo"
    },
    metrics: {
      enrolledCourses: enrollments.length,
      completedCourses: completed,
      certificates: certificates.length,
      averageProgress
    },
    nextActions: [
      {
        title: inProgress ? `Continuar ${inProgress.course.title}` : "Adicionar novos treinamentos",
        description: inProgress
          ? `${inProgress.lessonsCompleted || 0} de ${inProgress.lessonsTotal || inProgress.course.lessons} aulas concluídas.`
          : "Seu próximo curso será liberado após matrícula confirmada.",
        status: inProgress ? "Prioridade" : "Pendente"
      },
      {
        title: "Avaliação final",
        description: inProgress
          ? `Nota mínima ${inProgress.course.minimumGrade}% em até ${inProgress.course.attempts} tentativas.`
          : "Disponível quando houver curso ativo.",
        status: inProgress ? "Disponível" : "Aguardando matrícula"
      },
      {
        title: latestCertificate ? "Certificado liberado" : "Certificado pendente",
        description: latestCertificate
          ? `Código ${latestCertificate.code}`
          : "Liberado automaticamente após aprovação mínima.",
        status: latestCertificate ? "Disponível" : "Bloqueado"
      }
    ],
    courses: enrollments.map((item) => ({
      id: item.course.id,
      code: item.course.code,
      title: item.course.title,
      progress: Number(item.progress) || 0,
      status: item.status === "completed" ? "Concluído" : item.status === "in_progress" ? "Em andamento" : "Não iniciado",
      lessonsCompleted: Number(item.lessonsCompleted) || 0,
      lessonsTotal: Number(item.lessonsTotal) || item.course.lessons
    })),
    latestCertificate: latestCertificate ? buildCertificateView(latestCertificate) : null,
    support: {
      sla: "Até 1 dia útil",
      channel: "fortixseg@gmail.com"
    }
  };
}

async function buildStudentLibrary(session) {
  const user = findSessionUser(session);
  const enrollments = appState.enrollments.filter((item) => item.userId === user?.id);
  const resources = [];
  for (const enrollment of enrollments) {
    const course = courseCatalog[enrollment.courseId];
    if (!course) continue;
    for (const resource of course.resources || []) {
      const serialized = await serializeResource(resource);
      resources.push({
        id: serialized.id,
        type: serialized.type,
        title: serialized.name,
        mimeType: serialized.mimeType,
        url: serialized.url,
        status: "Disponível",
        courseId: course.id,
        courseTitle: course.title
      });
    }
  }
  return {
    source: isDatabaseEnabled() ? "api-database" : "api-local",
    courseId: enrollments[0]?.courseId || "",
    resources
  };
}

function buildStudentInteractiveCourses(session) {
  const user = findSessionUser(session);
  const userKey = getStateUserKey(session);
  const published = interactiveCourses.filter((course) => course.status === "published");
  return {
    courses: published.map((course) => serializeInteractiveCourseForStudent(course, getInteractiveProgress(userKey, course.id))),
    certificates: getUserCertificates(user?.id, session.email).map(buildCertificateView)
  };
}

function serializeInteractiveCourseForStudent(course, progress) {
  const lessons = course.modules.flatMap((module) => module.lessons.map((lesson) => ({ ...lesson, moduleId: module.id, moduleTitle: module.title })));
  const completed = new Set(progress.completedLessons || []);
  const firstPending = lessons.find((lesson) => !completed.has(lesson.id));
  return {
    ...course,
    modules: course.modules.map((module) => ({
      ...module,
      lessons: module.lessons.map((lesson) => ({
        ...lesson,
        completed: completed.has(lesson.id),
        locked: isLessonLocked(lessons, completed, lesson.id)
      }))
    })),
    progress: {
      completedLessons: completed.size,
      totalLessons: lessons.length,
      percent: lessons.length ? Math.round((completed.size / lessons.length) * 100) : 0,
      currentLessonId: firstPending?.id || lessons[0]?.id || "",
      assessmentUnlocked: lessons.length > 0 && completed.size >= lessons.length,
      bestGrade: Number(progress.bestGrade) || 0,
      passed: Boolean(progress.passed),
      certificateId: progress.certificateId || ""
    }
  };
}

function isLessonLocked(lessons, completed, lessonId) {
  const index = lessons.findIndex((lesson) => lesson.id === lessonId);
  if (index <= 0) return false;
  return !completed.has(lessons[index - 1].id);
}

async function handleStudentInteractiveLessonComplete(response, session, courseId, lessonId) {
  const course = findInteractiveCourse(courseId);
  if (!course || course.status !== "published") return sendJson(response, 404, { error: "Curso interativo nao encontrado ou nao publicado." });
  const lessons = course.modules.flatMap((module) => module.lessons);
  if (!lessons.some((lesson) => lesson.id === lessonId)) return sendJson(response, 404, { error: "Aula nao encontrada." });
  const userKey = getStateUserKey(session);
  const progress = getInteractiveProgress(userKey, course.id);
  if (!progress.completedLessons.includes(lessonId)) progress.completedLessons.push(lessonId);
  progress.updatedAt = new Date().toISOString();
  await persistRuntimeState();
  return sendJson(response, 200, { course: serializeInteractiveCourseForStudent(course, progress) });
}

async function handleStudentInteractiveAssessment(request, response, session, courseId) {
  const course = findInteractiveCourse(courseId);
  if (!course || course.status !== "published") return sendJson(response, 404, { error: "Curso interativo nao encontrado ou nao publicado." });
  const user = findSessionUser(session);
  const userKey = getStateUserKey(session);
  const progress = getInteractiveProgress(userKey, course.id);
  const totalLessons = course.modules.flatMap((module) => module.lessons).length;
  if (totalLessons && progress.completedLessons.length < totalLessons) {
    return sendJson(response, 403, { error: "Conclua todas as aulas antes de fazer a avaliacao final." });
  }

  const body = await readJsonBody(request, 80_000);
  const answers = Array.isArray(body.answers) ? body.answers.map((value) => Number(value)) : [];
  const questions = course.finalAssessment?.questions || [];
  if (!questions.length) return sendJson(response, 400, { error: "Este treinamento ainda nao possui prova final." });

  const correct = questions.reduce((total, question, index) => total + (answers[index] === Number(question.correctIndex) ? 1 : 0), 0);
  const grade = Math.round((correct / questions.length) * 100);
  progress.attemptsUsed = Number(progress.attemptsUsed || 0) + 1;
  progress.bestGrade = Math.max(Number(progress.bestGrade) || 0, grade);
  progress.passed = progress.bestGrade >= Number(course.minimumGrade || course.finalAssessment.minimumGrade || 70);
  progress.updatedAt = new Date().toISOString();

  let certificate = null;
  if (progress.passed) {
    certificate = ensureInteractiveCertificateForUser(session, course, progress.bestGrade, user?.id);
    progress.certificateId = certificate.id;
  }
  await persistRuntimeState();
  return sendJson(response, 200, {
    grade,
    correct,
    total: questions.length,
    passed: progress.passed,
    certificate: certificate ? buildCertificateView(certificate) : null,
    course: serializeInteractiveCourseForStudent(course, progress)
  });
}

function getInteractiveProgress(userKey, courseId) {
  if (!appState.interactiveProgress[userKey]) appState.interactiveProgress[userKey] = {};
  if (!appState.interactiveProgress[userKey][courseId]) {
    appState.interactiveProgress[userKey][courseId] = {
      completedLessons: [],
      attemptsUsed: 0,
      bestGrade: 0,
      passed: false,
      certificateId: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }
  return appState.interactiveProgress[userKey][courseId];
}

function ensureInteractiveCertificateForUser(session, course, grade, userId = "") {
  const existing = appState.certificates.find((item) => (item.userId === userId || item.userEmail === session.email) && item.courseId === course.id);
  if (existing) {
    existing.grade = Math.max(Number(existing.grade) || 0, grade);
    existing.updatedAt = new Date().toISOString();
    return existing;
  }
  const certificate = {
    id: `certificate-${randomUUID()}`,
    code: buildCertificateCode(course.code || "FS"),
    userId,
    userEmail: session.email,
    studentName: session.name || "Aluno",
    courseId: course.id,
    courseTitle: course.title,
    hours: `${course.hours || 0} horas`,
    grade,
    completedAt: formatDate(new Date().toISOString()),
    issuedAt: new Date().toISOString(),
    status: "Valido"
  };
  appState.certificates.unshift(certificate);
  appState.certificates = appState.certificates.slice(0, 5000);
  return certificate;
}

function buildCompanyDashboard(session) {
  const user = findSessionUser(session);
  const key = getStateUserKey(session);
  const employees = Array.isArray(appState.companyEmployees[key]) ? appState.companyEmployees[key] : loadInitialCompanyEmployees();
  companyEmployees = employees;
  const activeEmployees = employees.length;
  const completed = employees.filter((item) => item.status === "Concluído").length;
  const inProgress = employees.filter((item) => item.status === "Em andamento").length;
  const pending = Math.max(0, activeEmployees - completed - inProgress);
  const complianceRate = activeEmployees ? Math.round((completed / activeEmployees) * 100) : 0;
  return {
    source: isDatabaseEnabled() ? "api-database" : "api-local",
    company: {
      name: user?.companyName || user?.name || "Empresa",
      document: user?.document || "00.000.000/0001-00",
      plan: "Corporativo"
    },
    metrics: {
      activeEmployees,
      coursesInProgress: inProgress,
      certificates: employees.filter((item) => item.certificate).length,
      expiringSoon: pending,
      seatsAvailable: Math.max(0, 500 - activeEmployees),
      complianceRate
    },
    alerts: [
      { title: `${pending} colaboradores aguardam início ou reciclagem`, severity: pending ? "warning" : "success" },
      { title: `${inProgress} colaboradores estão em andamento`, severity: "info" },
      { title: `${completed} certificados concluídos no ambiente atual`, severity: "success" }
    ],
    employees
  };
}

function buildAffiliateDashboard(session = {}) {
  const user = findSessionUser(session);
  const key = getStateUserKey(session);
  const settings = appState.affiliateSettings[key] || {};
  const coupon = `FTX${String((user?.id || session.email || "0000").replace(/[^a-z0-9]/gi, "")).slice(-6).toUpperCase() || "0000"}`;
  const orders = appState.orders.filter((order) => cleanText(order.affiliateCode, 60) === coupon);
  const approvedOrders = orders.filter((order) => order.status === "approved");
  const commission = approvedOrders.reduce((total, order) => total + ((Number(order.totalAmount) || 0) * 0.1), 0);
  return {
    source: isDatabaseEnabled() ? "api-database" : "api-local",
    profile: {
      name: settings.name || user?.name || session.name || "Afiliado",
      email: settings.email || user?.email || session.email || "",
      plan: "Afiliado"
    },
    coupon,
    referralLink: `${PUBLIC_BASE_URL || "http://127.0.0.1:3001"}/?ref=${coupon.toLowerCase()}`,
    nextPayout: approvedOrders.length ? "A definir" : "",
    metrics: {
      clicks: 0,
      leads: orders.length,
      sales: approvedOrders.length,
      commission: Number(commission.toFixed(2))
    },
    referrals: orders.map((order) => ({
      name: findUserById(order.userId)?.name || order.customerName || "Lead",
      product: order.items?.map((item) => item.title).join(", ") || "Pedido",
      value: Number(order.totalAmount) || 0,
      status: order.status === "approved" ? "Aprovado" : "Pendente",
      commission: Number(((Number(order.totalAmount) || 0) * 0.1).toFixed(2))
    }))
  };
}

function buildAdminDashboard() {
  const students = appState.users.filter((user) => user.role === "student").length;
  const companies = appState.users.filter((user) => user.role === "company").length;
  const recentStudents = appState.enrollments.slice(0, 5).map((enrollment) => {
    const user = findUserById(enrollment.userId);
    const course = courseCatalog[enrollment.courseId];
    return {
      name: user?.name || "Aluno",
      course: course?.code || enrollment.courseId,
      status: enrollment.status === "completed" ? "Concluído" : "Em andamento",
      date: formatDate(enrollment.updatedAt || enrollment.createdAt)
    };
  });
  const recentPayments = appState.orders.slice(0, 5).map((order) => ({
    client: findUserById(order.userId)?.name || order.customerName || "Cliente",
    course: order.items?.map((item) => item.title).join(", ") || "Pedido",
    value: Number(order.totalAmount) || 0,
    status: order.status === "approved" ? "Aprovado" : order.status === "paid" ? "Pago" : "Pendente"
  }));
  return {
    source: isDatabaseEnabled() ? "api-database" : "api-local",
    metrics: {
      students,
      companies,
      courses: Object.keys(courseCatalog).length,
      certificates: appState.certificates.length
    },
    apiStatus: {
      server: "online",
      openai: ENV.OPENAI_API_KEY ? "configurado" : "pendente",
      mercadoPago: ENV.MERCADO_PAGO_ACCESS_TOKEN ? "configurado" : "pendente",
      database: isDatabaseEnabled() ? "postgres" : "local-file"
    },
    recentStudents,
    recentPayments
  };
}

function ensureCertificateForUser(session, courseId, grade, userId = "") {
  const normalizedCourseId = slugify(courseId || "nr35") || "nr35";
  const existing = appState.certificates.find((item) => (item.userId === userId || item.userEmail === session.email) && item.courseId === normalizedCourseId);
  if (existing) {
    existing.grade = Math.max(Number(existing.grade) || 0, grade);
    existing.updatedAt = new Date().toISOString();
    return existing;
  }

  const course = courseCatalog[normalizedCourseId] || DEFAULT_COURSE_CATALOG[normalizedCourseId] || DEFAULT_COURSE_CATALOG.nr35;
  const certificate = {
    id: `certificate-${randomUUID()}`,
    code: buildCertificateCode(course?.code || "FS"),
    userId,
    userEmail: session.email,
    studentName: session.name || "Aluno",
    courseId: normalizedCourseId,
    courseTitle: course?.title || "Curso FortixSeg",
    hours: `${course?.hours || 0} horas`,
    grade,
    completedAt: formatDate(new Date().toISOString()),
    issuedAt: new Date().toISOString(),
    status: "Válido"
  };

  appState.certificates.unshift(certificate);
  appState.certificates = appState.certificates.slice(0, 5000);
  return certificate;
}

function buildCertificateCode(courseCode) {
  const normalized = String(courseCode || "FS").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z0-9]+/g, "").toUpperCase() || "FS";
  const year = new Date().getFullYear();
  const sequence = String(appState.certificates.length + 1).padStart(6, "0");
  return `FS-${normalized}-${year}-${sequence}`;
}

function validateDemoCertificate(rawCode) {
  const code = cleanText(rawCode, 80).toUpperCase();
  const stored = appState.certificates.find((item) => String(item.code || "").toUpperCase() === code);
  if (stored) {
    return {
      valid: true,
      certificate: buildCertificateView(stored)
    };
  }
  return { valid: false, message: "Certificado não encontrado." };
}

function createUserRecord(input) {
  const passwordSalt = randomUUID();
  const createdAt = new Date().toISOString();
  return normalizeUserRecord({
    id: input.id || `user-${slugify(input.role || "student")}-${randomUUID()}`,
    role: input.role || "student",
    email: input.email,
    name: input.name,
    companyName: input.companyName,
    responsibleName: input.responsibleName,
    phone: input.phone,
    document: input.document,
    status: "active",
    passwordSalt,
    passwordHash: hashPassword(String(input.password || ""), passwordSalt),
    createdAt,
    updatedAt: createdAt,
    lastLoginAt: ""
  });
}

function hashPassword(password, salt) {
  return pbkdf2Sync(password, salt, 120000, 64, "sha512").toString("hex");
}

function verifyPassword(password, salt, hash) {
  if (!password || !salt || !hash) return false;
  return hashPassword(password, salt) === hash;
}

function findUserByEmail(email) {
  return appState.users.find((user) => user.email === cleanText(email, 160).toLowerCase()) || null;
}

function findUserById(userId) {
  return appState.users.find((user) => user.id === userId) || null;
}

function findSessionUser(session) {
  return findUserById(session?.userId) || findUserByEmail(session?.email);
}

function ensureEnrollmentForUser(userId, courseId) {
  let enrollment = appState.enrollments.find((item) => item.userId === userId && item.courseId === courseId);
  if (enrollment) return enrollment;
  const course = courseCatalog[courseId] || DEFAULT_COURSE_CATALOG[courseId] || DEFAULT_COURSE_CATALOG.nr35;
  const now = new Date().toISOString();
  enrollment = {
    id: `enrollment-${randomUUID()}`,
    userId,
    courseId,
    progress: 0,
    status: "not_started",
    lessonsCompleted: 0,
    lessonsTotal: Number(course.lessons) || 1,
    attemptsUsed: 0,
    bestGrade: 0,
    certificateId: "",
    createdAt: now,
    updatedAt: now,
    lastAccessAt: ""
  };
  appState.enrollments.unshift(enrollment);
  return enrollment;
}

function getUserCertificates(userId, email) {
  return appState.certificates
    .filter((item) => item.userId === userId || item.userEmail === email)
    .sort((left, right) => String(right.issuedAt || "").localeCompare(String(left.issuedAt || "")));
}

function buildCertificateView(certificate) {
  return {
    code: certificate.code,
    student: certificate.studentName || certificate.student || "Aluno",
    course: certificate.courseTitle || certificate.course || "Curso FortixSeg",
    hours: certificate.hours || "Carga horária não informada",
    grade: Number(certificate.grade) || 0,
    completedAt: certificate.completedAt || formatDate(certificate.issuedAt),
    status: certificate.status || "Válido"
  };
}

async function buildCurrentCertificateResponse(session) {
  const user = findSessionUser(session);
  const certificate = getUserCertificates(user?.id, session.email)[0];
  if (!certificate) return { certificate: null };
  return {
    certificate: buildCertificateView(certificate),
    downloadPath: "/api/student/certificates/current.pdf"
  };
}

async function handleCertificatePdf(response, session, requestedCourseId = "") {
  const user = findSessionUser(session);
  const certificates = getUserCertificates(user?.id, session.email);
  const certificate = requestedCourseId
    ? certificates.find((item) => item.courseId === slugify(requestedCourseId))
    : certificates[0];
  if (!certificate) {
    return sendJson(response, 404, { error: "Nenhum certificado disponível para download." });
  }
  const verificationUrl = `${PUBLIC_BASE_URL || "http://127.0.0.1:3001"}/?certificate=${encodeURIComponent(certificate.code)}#certificates`;
  const pdf = await buildCertificatePdf({
    certificate: {
      studentName: certificate.studentName || session.name || "Aluno",
      courseTitle: certificate.courseTitle || "Curso FortixSeg",
      hours: certificate.hours,
      grade: certificate.grade,
      code: certificate.code,
      issuedAt: certificate.issuedAt
    },
    verificationUrl
  });
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/pdf");
  response.setHeader("Content-Disposition", `attachment; filename=\"certificado-${certificate.code}.pdf\"`);
  response.end(pdf);
}

function formatDate(value) {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(value || Date.now()));
}

async function handleAssistant(request, response) {
  if (!ENV.OPENAI_API_KEY) {
    return sendJson(response, 503, { code: "OPENAI_NOT_CONFIGURED", error: "Atendimento por IA não configurado." });
  }

  const body = await readJsonBody(request);
  const question = cleanText(body.question, 300);
  const history = Array.isArray(body.history)
    ? body.history.slice(-6).map((item) => ({
        role: item?.role === "assistant" ? "assistant" : "user",
        content: cleanText(item?.content, 300)
      })).filter((item) => item.content)
    : [];

  if (!question) {
    return sendJson(response, 400, { error: "Digite uma pergunta." });
  }

  const apiResponse = await fetchWithTimeout("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${ENV.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      instructions: ASSISTANT_INSTRUCTIONS,
      input: [...history, { role: "user", content: question }],
      max_output_tokens: 350,
      store: false
    })
  });

  const data = await parseApiResponse(apiResponse, "OpenAI");
  const reply = extractResponseText(data);
  if (!reply) throw new Error("A OpenAI não retornou uma resposta de texto.");

  return sendJson(response, 200, { reply, provider: "openai", model: OPENAI_MODEL });
}

async function handleCheckout(request, response) {
  const accessToken = ENV.MERCADO_PAGO_ACCESS_TOKEN;
  if (!accessToken) {
    return sendJson(response, 503, { code: "MERCADO_PAGO_NOT_CONFIGURED", error: "Mercado Pago não configurado." });
  }

  const session = getRequestSession(request);
  const user = session ? findSessionUser(session) : null;
  const body = await readJsonBody(request);
  if (!Array.isArray(body.items) || body.items.length === 0 || body.items.length > 20) {
    return sendJson(response, 400, { error: "Carrinho inválido." });
  }

  const items = body.items.map((item) => {
    if (item?.packageId || item?.type === "package" || item?.kind === "package") {
      const packageId = slugify(item?.packageId || item?.id || item?.key);
      const product = CHECKOUT_PACKAGE_CATALOG[packageId];
      const quantity = Number(item?.quantity);
      const tier = CHECKOUT_DISCOUNT_TIERS.find((entry) => quantity >= entry.min && quantity <= entry.max);
      if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 500 || !tier) {
        const error = new Error(tier ? "Pacote inválido no carrinho." : "Para mais de 100 colaboradores, solicite uma proposta personalizada.");
        error.statusCode = 400;
        throw error;
      }
      return {
        id: product.id,
        title: product.title,
        kind: "package",
        description: `Pacote empresarial - ${product.hours} horas`,
        quantity,
        currency_id: "BRL",
        unit_price: Number((product.price * (1 - tier.discount)).toFixed(2))
      };
    }

    const productId = slugify(item?.courseId || item?.packageId || item?.id || item?.title);
    const course = courseCatalog[productId];
    const submittedTitle = cleanText(item?.title, 180);
    const submittedUnitPrice = Number(item?.unitPrice);
    const quantity = Number(item?.quantity);
    const title = course?.title || submittedTitle;
    const price = Number(course?.price ?? submittedUnitPrice);
    const hours = Number(course?.hours) || 0;
    const kind = item?.packageId || item?.kind === "package" ? "Pacote empresarial" : "Treinamento online";
    if (!productId || !title || !Number.isInteger(quantity) || quantity < 1 || quantity > 500 || !Number.isFinite(price) || price <= 0 || price > 100000) {
      const error = new Error("Item ou quantidade inválida no carrinho.");
      error.statusCode = 400;
      throw error;
    }
    return {
      id: productId,
      title,
      kind: "course",
      description: hours ? `${kind} - ${hours} horas` : kind,
      quantity,
      currency_id: "BRL",
      unit_price: Number(price.toFixed(2))
    };
  });

  const now = new Date().toISOString();
  const externalReference = `fortixseg-${randomUUID()}`;
  const order = {
    id: `order-${randomUUID()}`,
    userId: user?.id || "",
    customerName: user?.name || cleanText(body.customerName, 160),
    customerEmail: user?.email || cleanText(body.customerEmail, 160).toLowerCase(),
    role: user?.role || "guest",
    type: user?.role === "company" ? "company" : "student",
    status: "pending",
    items: items.map((item) => ({
      courseId: item.kind === "course" ? item.id : "",
      packageId: item.kind === "package" ? item.id : "",
      kind: item.kind,
      title: item.title,
      quantity: item.quantity,
      unitPrice: item.unit_price
    })),
    totalAmount: Number(items.reduce((total, item) => total + (item.unit_price * item.quantity), 0).toFixed(2)),
    externalReference,
    paymentProvider: "mercado_pago",
    paymentId: "",
    providerStatus: "preference_created",
    lastWebhookAt: "",
    releasedAt: "",
    createdAt: now,
    updatedAt: now,
    approvedAt: ""
  };
  appState.orders.unshift(order);
  appState.orders = appState.orders.slice(0, 5000);
  await persistRuntimeState();

  const preference = {
    items,
    external_reference: externalReference,
    statement_descriptor: "FORTIXSEG",
    metadata: {
      brand: "FortixSeg",
      order_id: order.id,
      course_ids: items.map((item) => item.id).join(",")
    }
  };

  if (PUBLIC_BASE_URL) {
    preference.back_urls = {
      success: `${PUBLIC_BASE_URL}/?payment=success#home`,
      failure: `${PUBLIC_BASE_URL}/?payment=failure#home`,
      pending: `${PUBLIC_BASE_URL}/?payment=pending#home`
    };
    preference.auto_return = "approved";
    preference.notification_url = `${PUBLIC_BASE_URL}/api/mercado-pago/webhook`;
  }

  let data;
  try {
    const apiResponse = await fetchWithTimeout("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(preference)
    });
    data = await parseApiResponse(apiResponse, "Mercado Pago");
  } catch (error) {
    order.providerStatus = "preference_error";
    order.updatedAt = new Date().toISOString();
    await persistRuntimeState();
    return sendJson(response, 502, {
      error: "Nao foi possivel criar o checkout no Mercado Pago agora.",
      details: cleanText(error.message, 240)
    });
  }

  const useSandbox = String(ENV.MERCADO_PAGO_USE_SANDBOX).toLowerCase() === "true";
  const checkoutUrl = useSandbox ? data.sandbox_init_point : data.init_point;
  if (!checkoutUrl) throw new Error("O Mercado Pago não retornou o endereço do checkout.");

  order.providerStatus = "checkout_open";
  order.paymentPreferenceId = cleanText(data.id, 120);
  order.updatedAt = new Date().toISOString();
  await persistRuntimeState();
  return sendJson(response, 200, { id: data.id, checkoutUrl });
}

async function handleMercadoPagoWebhook(request, response, url) {
  const secret = ENV.MERCADO_PAGO_WEBHOOK_SECRET;
  if (!secret) {
    return sendJson(response, 503, { error: "Segredo do webhook não configurado." });
  }

  const body = await readJsonBody(request);
  const dataId = cleanText(url.searchParams.get("data.id") || body?.data?.id, 120).toLowerCase();
  const signature = request.headers["x-signature"];
  const requestId = request.headers["x-request-id"];

  if (!verifyMercadoPagoSignature(signature, requestId, dataId, secret)) {
    return sendJson(response, 401, { error: "Assinatura do webhook inválida." });
  }

  const accessToken = ENV.MERCADO_PAGO_ACCESS_TOKEN;
  if (!accessToken) {
    return sendJson(response, 503, { error: "Mercado Pago não configurado." });
  }

  const paymentId = dataId || cleanText(body.id, 120);
  if (!paymentId) {
    return sendJson(response, 400, { error: "Webhook sem identificador de pagamento." });
  }

  const paymentResponse = await fetchWithTimeout(`https://api.mercadopago.com/v1/payments/${encodeURIComponent(paymentId)}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  });
  const payment = await parseApiResponse(paymentResponse, "Mercado Pago");
  const externalReference = cleanText(payment.external_reference || payment.metadata?.external_reference, 160);
  const order = appState.orders.find((item) => item.externalReference === externalReference);
  if (!order) {
    return sendJson(response, 404, { error: "Pedido não encontrado para este pagamento." });
  }

  order.paymentId = cleanText(String(payment.id || paymentId), 120);
  order.providerStatus = cleanText(payment.status || payment.status_detail || "received", 80);
  order.lastWebhookAt = new Date().toISOString();
  order.updatedAt = order.lastWebhookAt;

  if (payment.status === "approved") {
    finalizeApprovedOrder(order);
  }

  await persistRuntimeState();
  return sendJson(response, 200, { received: true });
}

function finalizeApprovedOrder(order) {
  if (!order) return;
  if (order.status !== "approved") {
    order.status = "approved";
    order.approvedAt = order.approvedAt || new Date().toISOString();
  }
  if (!order.releasedAt) {
    releaseOrderEnrollments(order);
    order.releasedAt = new Date().toISOString();
  }
  order.updatedAt = new Date().toISOString();
}

function releaseOrderEnrollments(order) {
  if (!order?.userId) return;
  for (const item of order.items || []) {
    const courseIds = item.kind === "package"
      ? (PACKAGE_RELEASE_MAP[item.packageId] || [])
      : [item.courseId].filter(Boolean);
    for (const courseId of courseIds) {
      ensureEnrollmentForUser(order.userId, courseId);
    }
  }
}

function verifyMercadoPagoSignature(xSignature, xRequestId, dataId, secret) {
  if (!xSignature || !secret) return false;
  const parts = Object.fromEntries(String(xSignature).split(",").map((part) => part.trim().split("=")));
  if (!parts.ts || !parts.v1 || !/^[a-f0-9]{64}$/i.test(parts.v1)) return false;

  let manifest = "";
  if (dataId) manifest += `id:${dataId};`;
  if (xRequestId) manifest += `request-id:${xRequestId};`;
  manifest += `ts:${parts.ts};`;

  const expected = createHmac("sha256", secret).update(manifest).digest("hex");
  return timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(parts.v1, "hex"));
}

function serveStatic(request, response, pathname) {
  let relativePath;
  try {
    relativePath = decodeURIComponent(pathname === "/" ? "index.html" : pathname.replace(/^\/+/, ""));
  } catch {
    return sendJson(response, 400, { error: "Caminho inválido." });
  }

  const filePath = resolve(ROOT_DIR, relativePath);
  if (filePath !== ROOT_DIR && !filePath.startsWith(`${ROOT_DIR}${sep}`)) {
    return sendJson(response, 403, { error: "Acesso negado." });
  }
  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    return sendJson(response, 404, { error: "Arquivo não encontrado." });
  }

  const content = readFileSync(filePath);
  const extension = extname(filePath).toLowerCase();
  const noStoreExtensions = new Set([".html", ".css", ".js", ".json"]);
  response.statusCode = 200;
  response.setHeader("Content-Type", MIME_TYPES[extension] || "application/octet-stream");
  response.setHeader("Cache-Control", noStoreExtensions.has(extension) ? "no-store" : "public, max-age=3600");
  response.end(request.method === "HEAD" ? undefined : content);
}

function allowRequest(request, bucket, limit, windowMs) {
  const forwarded = String(request.headers["x-forwarded-for"] || "").split(",")[0].trim();
  const ip = forwarded || request.socket.remoteAddress || "unknown";
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const record = rateLimits.get(key);
  if (!record || now - record.startedAt >= windowMs) {
    rateLimits.set(key, { count: 1, startedAt: now });
    return true;
  }
  record.count += 1;
  return record.count <= limit;
}

function readJsonBody(request, maxBytes = 32_000) {
  return new Promise((resolveBody, rejectBody) => {
    let size = 0;
    const chunks = [];
    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > maxBytes) {
        const error = new Error("Requisição muito grande.");
        error.statusCode = 413;
        rejectBody(error);
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => {
      try {
        resolveBody(chunks.length ? JSON.parse(Buffer.concat(chunks).toString("utf8")) : {});
      } catch {
        const error = new Error("JSON inválido.");
        error.statusCode = 400;
        rejectBody(error);
      }
    });
    request.on("error", rejectBody);
  });
}

async function fetchWithTimeout(url, options) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function parseApiResponse(response, provider) {
  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }
  if (!response.ok) {
    const detail = cleanText(data?.error?.message || data?.message || data?.error, 240);
    throw new Error(`${provider} recusou a solicitação${detail ? `: ${detail}` : "."}`);
  }
  return data;
}

function extractResponseText(data) {
  if (typeof data.output_text === "string") return data.output_text.trim();
  for (const output of data.output || []) {
    for (const content of output.content || []) {
      if (content.type === "output_text" && typeof content.text === "string") return content.text.trim();
    }
  }
  return "";
}

function cleanText(value, maxLength) {
  return String(value ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function normalizePublicUrl(value) {
  if (!value) return "";
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || ["localhost", "127.0.0.1"].includes(url.hostname)) return "";
    return url.origin + url.pathname.replace(/\/+$/, "");
  } catch {
    return "";
  }
}

function sendJson(response, statusCode, body) {
  if (response.writableEnded) return;
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.end(JSON.stringify(body));
}

function loadEnv(filePath) {
  if (!existsSync(filePath)) return;
  const content = readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator < 1) continue;
    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in ENV)) ENV[key] = value;
  }
}
