import { createServer } from "node:http";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { basename, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT_DIR = resolve(fileURLToPath(new URL(".", import.meta.url)));
const ENV = typeof process === "undefined" ? {} : process.env;
loadEnv(resolve(ROOT_DIR, ".env"));

const PORT = Number(ENV.PORT) || 3000;
const OPENAI_MODEL = ENV.OPENAI_MODEL || "gpt-5.4-mini";
const PUBLIC_BASE_URL = normalizePublicUrl(ENV.PUBLIC_BASE_URL);
const REQUEST_TIMEOUT_MS = 15_000;
const DATA_DIR = resolve(ROOT_DIR, "data");
const COURSE_DATA_FILE = resolve(DATA_DIR, "courses.json");
const COURSE_UPLOAD_DIR = resolve(ROOT_DIR, "assets", "uploads", "courses");

const DEFAULT_COURSE_CATALOG = {
  nr35: {
    id: "nr35", code: "NR 35", title: "NR 35 - Trabalho em Altura", hours: 8, price: 149.90,
    category: "Trabalho em altura", audience: "Profissionais que executam atividades acima de 2 metros com risco de queda.",
    objective: "Apresentar conceitos, responsabilidades e medidas de prevenção para atividades em altura.",
    syllabus: ["Conceitos de trabalho em altura", "Análise de risco", "Equipamentos de proteção", "Responsabilidades", "Condições impeditivas", "Procedimentos de emergência", "Avaliação final"],
    resources: [{ id: "nr35-pdf-demo", type: "pdf", name: "Apostila demonstrativa NR 35", url: "/assets/apostila-nr35-demonstrativa.pdf", mimeType: "application/pdf", size: 0 }]
  },
  nr12: { id: "nr12", code: "NR 12", title: "NR 12 - Segurança no Trabalho em Máquinas e Equipamentos", hours: 8, price: 179.90 },
  nr10: { id: "nr10", code: "NR 10", title: "NR 10 - Segurança em Instalações e Serviços em Eletricidade", hours: 40, price: 249.90 },
  nr33: { id: "nr33", code: "NR 33", title: "NR 33 - Segurança e Saúde em Espaços Confinados", hours: 16, price: 199.90 },
  epi: { id: "epi", code: "EPI", title: "Uso Correto de EPIs", hours: 4, price: 59.90 },
  integracao: { id: "integracao", code: "INT", title: "Integração de Segurança", hours: 4, price: 79.90 },
  nr01: { id: "nr01", code: "NR 01", title: "NR 01 - GRO/PGR Introdutório", hours: 4, price: 89.90 },
  loto: { id: "loto", code: "LOTO", title: "LOTO - Bloqueio e Etiquetagem", hours: 4, price: 99.90 }
};

let courseCatalog = loadCourseCatalog();

const DEMO_LOGINS = Object.freeze({
  "aluno@teste.com": { password: "123456", role: "student", name: "João da Silva" },
  "empresa@teste.com": { password: "123456", role: "company", name: "Amcor" },
  "admin@teste.com": { password: "123456", role: "admin", name: "Administrador FortixSeg" }
});

let companyEmployees = [
  { name: "Carlos Lima", course: "NR 35", progress: "75%", status: "Em andamento", certificate: false },
  { name: "Ana Souza", course: "Uso Correto de EPIs", progress: "100%", status: "Concluído", certificate: true },
  { name: "Marcos Silva", course: "NR 12", progress: "40%", status: "Em andamento", certificate: false }
];

const ASSISTANT_INSTRUCTIONS = `
Você é o atendente virtual oficial da FortixSeg, empresa de treinamentos online em Segurança do Trabalho.
Responda sempre em português do Brasil, com clareza, cordialidade e no máximo 120 palavras.
Use somente as informações fornecidas neste contexto. Não invente clientes, reconhecimento oficial, garantias legais ou regras regulatórias.
Os cursos são 100% online. O certificado digital é liberado após conclusão e aprovação com nota mínima de 70%. A demonstração oferece 3 tentativas.
Cursos e pacotes: há catálogo individual para chão de fábrica, administrativo, manutenção, liderança, RH/SESMT, DDS e NRs. Pacotes empresariais: Integração Essencial (R$ 199,90 por colaborador), Chão de Fábrica (R$ 349,90), Administrativo Seguro (R$ 249,90), Liderança em Segurança (R$ 449,90), Manutenção Segura (R$ 399,90) e RH e Gestão SST (R$ 299,90).
Descontos empresariais: 1 a 5 colaboradores preço normal; 6 a 20 com 10%; 21 a 50 com 15%; 51 a 100 com 20%; acima de 100 sob proposta.
Para empresas, há compra em lote, dashboard com colaboradores ativos, cursos em andamento, certificados emitidos, vencimentos próximos, gráficos de conformidade, situação da equipe, matrículas por curso, relatórios e controle de vencimentos.
A área do aluno possui painel, cursos, aulas, avaliações, certificados, dados e suporte. A área admin permite cadastrar cursos, alterar preços, editar conteúdo programático, nota mínima, tentativas, publicação e anexar PDFs ou vídeos.
NR-10, NR-33 e NR-35 podem exigir etapa prática/presencial, autorização formal ou avaliação complementar conforme atividade, risco e procedimento da empresa.
Pagamentos são finalizados no ambiente seguro do Mercado Pago quando a integração estiver configurada no servidor.
Se perguntarem sobre erro de checkout no Netlify, explique que a função netlify/functions/checkout-preference.cjs precisa ser publicada e MERCADO_PAGO_ACCESS_TOKEN precisa estar nas variáveis de ambiente. Se perguntarem sobre IA, explique que OPENAI_API_KEY ativa a IA real e, sem ela, o atendimento local continua funcionando.
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
  ".pdf": "application/pdf",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".ogv": "video/ogg"
};

const rateLimits = new Map();

const server = createServer(async (request, response) => {
  const requestId = randomUUID();
  response.setHeader("X-Request-Id", requestId);
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  try {
    const url = new URL(request.url || "/", `http://${request.headers.host || `localhost:${PORT}`}`);

    if (request.method === "GET" && url.pathname === "/api/health") {
      return sendJson(response, 200, {
        ok: true,
        mercadoPagoConfigured: Boolean(ENV.MERCADO_PAGO_ACCESS_TOKEN),
        openAIConfigured: Boolean(ENV.OPENAI_API_KEY),
        model: OPENAI_MODEL
      });
    }

    if (request.method === "GET" && url.pathname === "/api/courses") {
      return sendJson(response, 200, { courses: Object.values(courseCatalog).filter((course) => course.status === "published") });
    }

    if (request.method === "GET" && url.pathname === "/api/admin/courses") {
      return sendJson(response, 200, { courses: Object.values(courseCatalog) });
    }

    if (request.method === "POST" && url.pathname === "/api/admin/courses") {
      return await handleAdminCourseCreate(request, response);
    }

    const resourceMatch = url.pathname.match(/^\/api\/admin\/courses\/([^/]+)\/resources(?:\/([^/]+))?$/);
    if (resourceMatch && request.method === "POST" && !resourceMatch[2]) {
      return await handleAdminCourseResourceUpload(request, response, decodeURIComponent(resourceMatch[1]));
    }
    if (resourceMatch && request.method === "DELETE" && resourceMatch[2]) {
      return handleAdminCourseResourceDelete(response, decodeURIComponent(resourceMatch[1]), decodeURIComponent(resourceMatch[2]));
    }

    const adminCourseMatch = url.pathname.match(/^\/api\/admin\/courses\/([^/]+)$/);
    if (adminCourseMatch && request.method === "PUT") {
      return await handleAdminCourseUpdate(request, response, decodeURIComponent(adminCourseMatch[1]));
    }
    if (adminCourseMatch && request.method === "DELETE") {
      return handleAdminCourseDelete(response, decodeURIComponent(adminCourseMatch[1]));
    }

    if (request.method === "POST" && url.pathname === "/api/auth/demo") {
      return await handleDemoLogin(request, response);
    }

    if (request.method === "GET" && url.pathname === "/api/student/dashboard") {
      return sendJson(response, 200, buildStudentDashboard());
    }

    if (request.method === "GET" && url.pathname === "/api/student/library") {
      return sendJson(response, 200, buildStudentLibrary());
    }

    if (request.method === "GET" && url.pathname === "/api/company/dashboard") {
      return sendJson(response, 200, buildCompanyDashboard());
    }

    if (request.method === "POST" && url.pathname === "/api/company/employees") {
      return await handleCompanyEmployeeAdd(request, response);
    }

    if (request.method === "GET" && url.pathname === "/api/admin/dashboard") {
      return sendJson(response, 200, buildAdminDashboard());
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

    if (request.method === "POST" && url.pathname === "/api/checkout/preference") {
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
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`FortixSeg disponível em http://127.0.0.1:${PORT}`);
});

function loadCourseCatalog() {
  let source = DEFAULT_COURSE_CATALOG;
  if (existsSync(COURSE_DATA_FILE)) {
    try {
      const stored = JSON.parse(readFileSync(COURSE_DATA_FILE, "utf8"));
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
  if (!resource || !resource.url) return null;
  return {
    id: cleanText(resource.id || randomUUID(), 100),
    type: resource.type === "video" ? "video" : "pdf",
    name: cleanText(resource.name || "Material do curso", 180),
    url: cleanText(resource.url, 500),
    mimeType: cleanText(resource.mimeType || "application/octet-stream", 100),
    size: Number(resource.size) || 0,
    createdAt: resource.createdAt || new Date().toISOString()
  };
}

async function handleAdminCourseCreate(request, response) {
  const body = await readJsonBody(request, 200_000);
  const id = slugify(body.id || body.code || body.title);
  if (!id || !cleanText(body.title, 180)) return sendJson(response, 400, { error: "Informe o nome e o código do curso." });
  if (courseCatalog[id]) return sendJson(response, 409, { error: "Já existe um curso com esse identificador." });

  // TODO: exigir autenticação administrativa real e registrar auditoria.
  const course = normalizeCourse({ ...body, id, resources: [] }, id);
  courseCatalog[id] = course;
  saveCourseCatalog();
  return sendJson(response, 201, { course });
}

async function handleAdminCourseUpdate(request, response, courseId) {
  const current = courseCatalog[courseId];
  if (!current) return sendJson(response, 404, { error: "Curso não encontrado." });
  const body = await readJsonBody(request, 200_000);
  const course = normalizeCourse({ ...current, ...body, id: courseId, resources: current.resources }, courseId);
  courseCatalog[courseId] = course;
  saveCourseCatalog();
  return sendJson(response, 200, { course });
}

function handleAdminCourseDelete(response, courseId) {
  if (!courseCatalog[courseId]) return sendJson(response, 404, { error: "Curso não encontrado." });
  delete courseCatalog[courseId];
  saveCourseCatalog();
  // TODO: impedir exclusão quando houver matrículas e arquivar o curso em produção.
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
    "application/pdf": { type: "pdf", extension: ".pdf" },
    "video/mp4": { type: "video", extension: ".mp4" },
    "video/webm": { type: "video", extension: ".webm" },
    "video/ogg": { type: "video", extension: ".ogv" }
  };
  const fileType = allowed[mimeType];
  if (!fileType) return sendJson(response, 415, { error: "Use PDF, MP4, WebM ou OGV." });

  const bytes = Buffer.from(match[2], "base64");
  if (!bytes.length || bytes.length > 12_000_000) return sendJson(response, 413, { error: "O arquivo demonstrativo deve ter no máximo 12 MB." });

  const safeCourseId = slugify(courseId);
  const uploadDir = resolve(COURSE_UPLOAD_DIR, safeCourseId);
  if (!uploadDir.startsWith(`${COURSE_UPLOAD_DIR}${sep}`)) return sendJson(response, 403, { error: "Destino de upload inválido." });
  mkdirSync(uploadDir, { recursive: true });
  const baseName = slugify(basename(cleanText(body.name, 180), extname(cleanText(body.name, 180)))) || "material";
  const fileName = `${Date.now()}-${baseName}${fileType.extension}`;
  const filePath = resolve(uploadDir, fileName);
  writeFileSync(filePath, bytes);

  const resource = normalizeResource({
    id: randomUUID(),
    type: fileType.type,
    name: cleanText(body.name || fileName, 180),
    url: `/assets/uploads/courses/${safeCourseId}/${fileName}`,
    mimeType,
    size: bytes.length
  });
  course.resources.push(resource);
  course.updatedAt = new Date().toISOString();
  saveCourseCatalog();
  return sendJson(response, 201, { resource, course });
}

function handleAdminCourseResourceDelete(response, courseId, resourceId) {
  const course = courseCatalog[courseId];
  if (!course) return sendJson(response, 404, { error: "Curso não encontrado." });
  const resource = course.resources.find((item) => item.id === resourceId);
  if (!resource) return sendJson(response, 404, { error: "Material não encontrado." });

  course.resources = course.resources.filter((item) => item.id !== resourceId);
  if (resource.url.startsWith("/assets/uploads/courses/")) {
    const filePath = resolve(ROOT_DIR, resource.url.replace(/^\/+/, ""));
    if (filePath.startsWith(`${COURSE_UPLOAD_DIR}${sep}`) && existsSync(filePath)) unlinkSync(filePath);
  }
  saveCourseCatalog();
  return sendJson(response, 200, { deleted: true, course });
}

function slugify(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

function clampNumber(value, minimum, maximum, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(maximum, Math.max(minimum, number)) : fallback;
}

async function handleDemoLogin(request, response) {
  const body = await readJsonBody(request);
  const email = cleanText(body.email, 160).toLowerCase();
  const password = String(body.password ?? "");
  const user = DEMO_LOGINS[email];

  // TODO: substituir login demonstrativo por Supabase Auth com sessão JWT.
  if (!user || user.password !== password) {
    return sendJson(response, 401, { error: "E-mail ou senha inválidos." });
  }

  return sendJson(response, 200, {
    user: {
      email,
      name: user.name,
      role: user.role
    },
    token: `demo-${user.role}-${Date.now()}`
  });
}

async function handleCompanyEmployeeAdd(request, response) {
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

  // TODO: salvar colaborador no PostgreSQL vinculado à empresa autenticada.
  companyEmployees = [employee, ...companyEmployees].slice(0, 30);
  return sendJson(response, 201, buildCompanyDashboard());
}

function buildStudentDashboard() {
  return {
    source: "api-demo",
    profile: {
      name: "João da Silva",
      email: "aluno@teste.com",
      activeCourse: "NR 35 - Trabalho em Altura"
    },
    metrics: {
      enrolledCourses: 2,
      completedCourses: 1,
      certificates: 1,
      averageProgress: 65
    },
    nextActions: [
      { title: "Continuar NR 35", description: "Módulo 03: Equipamentos de proteção contra quedas.", status: "Prioridade" },
      { title: "Avaliação final", description: "Disponível após marcar todas as aulas como concluídas.", status: "Pendente" },
      { title: "Certificado NR 35", description: "Liberado automaticamente após aprovação mínima de 70%.", status: "Bloqueado" }
    ],
    courses: [
      { id: "nr35", code: "NR 35", title: "NR 35 - Trabalho em Altura", progress: 75, status: "Em andamento", lessonsCompleted: 5, lessonsTotal: 7 },
      { id: "epi", code: "EPI", title: "Uso Correto de EPIs", progress: 100, status: "Concluído", lessonsCompleted: 5, lessonsTotal: 5 }
    ],
    support: {
      sla: "Até 1 dia útil",
      channel: "fortixseg@gmail.com"
    }
  };
}

function buildStudentLibrary() {
  return {
    source: "api-demo",
    courseId: "nr35",
    resources: [
      { id: "nr35-video-01", type: "video", title: "Introdução ao trabalho em altura", duration: "12 min", status: "Concluído", delivery: "signed-url-future" },
      { id: "nr35-video-02", type: "video", title: "Análise de risco", duration: "18 min", status: "Concluído", delivery: "signed-url-future" },
      { id: "nr35-video-03", type: "video", title: "Equipamentos de proteção", duration: "22 min", status: "Em andamento", delivery: "signed-url-future" },
      { id: "nr35-pdf-01", type: "pdf", title: "Apostila demonstrativa NR 35", mimeType: "application/pdf", url: "/assets/apostila-nr35-demonstrativa.pdf" }
    ]
  };
}

function buildCompanyDashboard() {
  const activeEmployees = 125 + companyEmployees.length;
  return {
    source: "api-demo",
    company: {
      name: "Amcor",
      document: "00.000.000/0001-00",
      plan: "Corporativo"
    },
    metrics: {
      activeEmployees,
      coursesInProgress: 32,
      certificates: 96,
      expiringSoon: 18,
      seatsAvailable: 42,
      complianceRate: 78
    },
    alerts: [
      { title: "18 certificados vencem em até 60 dias", severity: "warning" },
      { title: "12 colaboradores estão acima de 70% de progresso", severity: "success" },
      { title: "42 vagas disponíveis para novas matrículas", severity: "info" }
    ],
    employees: companyEmployees
  };
}

function buildAdminDashboard() {
  return {
    source: "api-demo",
    metrics: {
      students: 25000,
      companies: 1000,
      courses: 50,
      certificates: 150000
    },
    apiStatus: {
      server: "online",
      openai: ENV.OPENAI_API_KEY ? "configurado" : "pendente",
      mercadoPago: ENV.MERCADO_PAGO_ACCESS_TOKEN ? "configurado" : "pendente",
      database: "demo-local"
    },
    recentStudents: [
      { name: "Mariana Costa", course: "NR 35", status: "Em andamento", date: "04/07/2026" },
      { name: "Paulo Mendes", course: "NR 10", status: "Concluído", date: "03/07/2026" },
      { name: "Renata Alves", course: "LOTO", status: "Em andamento", date: "03/07/2026" }
    ],
    recentPayments: [
      { client: "Juliana Rocha", course: "NR 35", value: 149.90, status: "Aprovado" },
      { client: "Marelli", course: "NR 12 - 20 vagas", value: 3598.00, status: "Aprovado" },
      { client: "Eduardo Nunes", course: "NR 10", value: 249.90, status: "Pendente" }
    ]
  };
}

function validateDemoCertificate(rawCode) {
  const code = cleanText(rawCode, 80).toUpperCase();
  if (code !== "FS-NR35-2026-000123") {
    return { valid: false, message: "Certificado não encontrado." };
  }

  return {
    valid: true,
    certificate: {
      code,
      student: "João da Silva",
      course: "NR 35 - Trabalho em Altura",
      hours: "8 horas",
      completedAt: "20/05/2026",
      status: "Válido"
    }
  };
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

  const body = await readJsonBody(request);
  if (!Array.isArray(body.items) || body.items.length === 0 || body.items.length > 20) {
    return sendJson(response, 400, { error: "Carrinho inválido." });
  }

  const items = body.items.map((item) => {
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
    // TODO: validar pacotes, descontos e preços no PostgreSQL antes de criar a preferência real.
    return {
      id: productId,
      title,
      description: hours ? `${kind} - ${hours} horas` : kind,
      quantity,
      currency_id: "BRL",
      unit_price: Number(price.toFixed(2))
    };
  });

  const preference = {
    items,
    external_reference: `fortixseg-${randomUUID()}`,
    statement_descriptor: "FORTIXSEG",
    metadata: {
      brand: "FortixSeg",
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

  const apiResponse = await fetchWithTimeout("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(preference)
  });

  const data = await parseApiResponse(apiResponse, "Mercado Pago");
  const useSandbox = String(ENV.MERCADO_PAGO_USE_SANDBOX).toLowerCase() === "true";
  const checkoutUrl = useSandbox && data.sandbox_init_point ? data.sandbox_init_point : data.init_point;
  if (!checkoutUrl) throw new Error("O Mercado Pago não retornou o endereço do checkout.");

  // TODO: salvar a ordem e o external_reference no PostgreSQL antes de liberar o checkout.
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

  // TODO: consultar o pagamento no Mercado Pago, salvar o evento com idempotência
  // e liberar o curso somente após confirmar o status approved no servidor.
  console.log(`Webhook Mercado Pago validado: tipo=${cleanText(body.type, 40) || "desconhecido"}, id=${dataId || "sem-id"}`);
  return sendJson(response, 200, { received: true });
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
  response.statusCode = 200;
  response.setHeader("Content-Type", MIME_TYPES[extname(filePath).toLowerCase()] || "application/octet-stream");
  response.setHeader("Cache-Control", relativePath === "index.html" ? "no-cache" : "public, max-age=3600");
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
