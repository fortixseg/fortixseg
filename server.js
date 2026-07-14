import { createServer } from "node:http";
import { createHmac, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { basename, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT_DIR = resolve(fileURLToPath(new URL(".", import.meta.url)));
const ENV = typeof process === "undefined" ? {} : process.env;
loadEnv(resolve(ROOT_DIR, ".env"));
const IS_VERCEL = Boolean(ENV.VERCEL);

const PORT = Number(ENV.PORT) || 3000;
const OPENAI_MODEL = ENV.OPENAI_MODEL || "gpt-5.4-mini";
const PUBLIC_BASE_URL = normalizePublicUrl(ENV.PUBLIC_BASE_URL);
const REQUEST_TIMEOUT_MS = 15_000;
const DATA_DIR = IS_VERCEL ? resolve("/tmp", "fortixseg-data") : resolve(ROOT_DIR, "data");
const COURSE_DATA_FILE = resolve(DATA_DIR, "courses.json");
const APP_DATA_FILE = resolve(DATA_DIR, "app-data.json");
const BUNDLED_DATA_DIR = resolve(ROOT_DIR, "data");
const COURSE_UPLOAD_DIR = IS_VERCEL
  ? resolve("/tmp", "fortixseg-uploads", "courses")
  : resolve(ROOT_DIR, "assets", "uploads", "courses");
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const AUTH_COOKIE_NAME = "fortixseg_auth";
const JWT_SECRET = ENV.APP_JWT_SECRET || ENV.APP_SESSION_SECRET || "fortixseg-dev-secret";

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
let appData = loadAppData();

const ASSISTANT_INSTRUCTIONS = `
Você é o atendente virtual oficial da FortixSeg, empresa de treinamentos online em Segurança do Trabalho.
Responda sempre em português do Brasil, com clareza, cordialidade e no máximo 120 palavras.
Use somente as informações fornecidas neste contexto. Não invente clientes, reconhecimento oficial, garantias legais ou regras regulatórias.
Os cursos são 100% online. O certificado digital é liberado após conclusão e aprovação com nota mínima de 70%. A demonstração oferece 3 tentativas.
Cursos: NR 35 (8h, R$ 149,90), NR 12 (8h, R$ 179,90), NR 10 (40h, R$ 249,90), NR 33 (16h, R$ 199,90), Uso Correto de EPIs (4h, R$ 59,90), Integração de Segurança (4h, R$ 79,90), NR 01 GRO/PGR Introdutório (4h, R$ 89,90) e LOTO (4h, R$ 99,90).
Para empresas, há compra em lote, acompanhamento de progresso, certificados centralizados, relatórios e controle de vencimentos.
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
      const auth = requireRole(request, response, ["admin"]);
      if (!auth) return;
      return await handleAdminCourseCreate(request, response);
    }

    const resourceMatch = url.pathname.match(/^\/api\/admin\/courses\/([^/]+)\/resources(?:\/([^/]+))?$/);
    if (resourceMatch && request.method === "POST" && !resourceMatch[2]) {
      const auth = requireRole(request, response, ["admin"]);
      if (!auth) return;
      return await handleAdminCourseResourceUpload(request, response, decodeURIComponent(resourceMatch[1]));
    }
    if (resourceMatch && request.method === "DELETE" && resourceMatch[2]) {
      const auth = requireRole(request, response, ["admin"]);
      if (!auth) return;
      return handleAdminCourseResourceDelete(response, decodeURIComponent(resourceMatch[1]), decodeURIComponent(resourceMatch[2]));
    }

    const adminCourseMatch = url.pathname.match(/^\/api\/admin\/courses\/([^/]+)$/);
    if (adminCourseMatch && request.method === "PUT") {
      const auth = requireRole(request, response, ["admin"]);
      if (!auth) return;
      return await handleAdminCourseUpdate(request, response, decodeURIComponent(adminCourseMatch[1]));
    }
    if (adminCourseMatch && request.method === "DELETE") {
      const auth = requireRole(request, response, ["admin"]);
      if (!auth) return;
      return handleAdminCourseDelete(response, decodeURIComponent(adminCourseMatch[1]));
    }

    if (request.method === "POST" && (url.pathname === "/api/auth/login" || url.pathname === "/api/auth/demo")) {
      return await handleLogin(request, response);
    }

    if (request.method === "POST" && url.pathname === "/api/auth/register") {
      return await handleRegister(request, response);
    }

    if (request.method === "GET" && url.pathname === "/api/auth/session") {
      return handleSession(request, response);
    }

    if (request.method === "POST" && url.pathname === "/api/auth/logout") {
      return handleLogout(request, response);
    }

    if (request.method === "GET" && url.pathname === "/api/student/dashboard") {
      const auth = requireRole(request, response, ["student", "admin"]);
      if (!auth) return;
      return sendJson(response, 200, buildStudentDashboard(auth.user));
    }

    if (request.method === "GET" && url.pathname === "/api/student/library") {
      const auth = requireRole(request, response, ["student", "admin"]);
      if (!auth) return;
      return sendJson(response, 200, buildStudentLibrary(auth.user));
    }

    if (request.method === "POST" && url.pathname === "/api/student/progress") {
      const auth = requireRole(request, response, ["student", "admin"]);
      if (!auth) return;
      return await handleStudentProgress(request, response, auth.user);
    }

    if (request.method === "POST" && url.pathname === "/api/student/assessment") {
      const auth = requireRole(request, response, ["student", "admin"]);
      if (!auth) return;
      return await handleStudentAssessment(request, response, auth.user);
    }

    if (request.method === "GET" && url.pathname === "/api/company/dashboard") {
      const auth = requireRole(request, response, ["company", "admin"]);
      if (!auth) return;
      return sendJson(response, 200, buildCompanyDashboard(auth.user));
    }

    if (request.method === "POST" && url.pathname === "/api/company/employees") {
      const auth = requireRole(request, response, ["company", "admin"]);
      if (!auth) return;
      return await handleCompanyEmployeeAdd(request, response, auth.user);
    }

    if (request.method === "GET" && url.pathname === "/api/admin/dashboard") {
      const auth = requireRole(request, response, ["admin"]);
      if (!auth) return;
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

    if (request.method === "GET" && url.pathname === "/api/orders/resolve") {
      const auth = requireRole(request, response, ["student", "company", "admin"]);
      if (!auth) return;
      return handleOrderResolve(request, response, auth.user, url);
    }

    const orderMatch = url.pathname.match(/^\/api\/orders\/([^/]+)$/);
    if (orderMatch && request.method === "GET") {
      const auth = requireRole(request, response, ["student", "company", "admin"]);
      if (!auth) return;
      return handleOrderGet(response, auth.user, decodeURIComponent(orderMatch[1]));
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
  ensureWritableSeed(COURSE_DATA_FILE, resolve(BUNDLED_DATA_DIR, "courses.json"));
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

function loadAppData() {
  const fallback = createDefaultAppData();
  ensureWritableSeed(APP_DATA_FILE, resolve(BUNDLED_DATA_DIR, "app-data.json"));
  if (!existsSync(APP_DATA_FILE)) {
    saveAppData(fallback);
    return fallback;
  }

  try {
    const stored = JSON.parse(readFileSync(APP_DATA_FILE, "utf8"));
    const users = Array.isArray(stored.users) ? stored.users.map(normalizeStoredUser).filter(Boolean) : fallback.users;
    const companyEmployees = normalizeCompanyEmployees(stored.companyEmployees, fallback.companyEmployees);
    const registrations = Array.isArray(stored.registrations) ? stored.registrations : [];
    const enrollments = Array.isArray(stored.enrollments) ? stored.enrollments.map(normalizeEnrollment).filter(Boolean) : fallback.enrollments;
    const orders = Array.isArray(stored.orders) ? stored.orders.map(normalizeOrder).filter(Boolean) : fallback.orders;
    const certificates = Array.isArray(stored.certificates) ? stored.certificates.map(normalizeCertificate).filter(Boolean) : fallback.certificates;
    return { users, companyEmployees, registrations, enrollments, orders, certificates };
  } catch (error) {
    console.error(`Não foi possível ler a base local da aplicação: ${error.message}`);
    return fallback;
  }
}

function saveAppData(nextAppData = appData) {
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(APP_DATA_FILE, JSON.stringify(nextAppData, null, 2), "utf8");
}

function ensureWritableSeed(targetFile, bundledFile) {
  if (!IS_VERCEL || existsSync(targetFile) || !existsSync(bundledFile)) return;
  mkdirSync(resolve(targetFile, ".."), { recursive: true });
  writeFileSync(targetFile, readFileSync(bundledFile, "utf8"), "utf8");
}

function createDefaultAppData() {
  const demoPassword = hashPassword("123456");
  const createdAt = new Date().toISOString();
  const demoEnrollments = [
    normalizeEnrollment({
      id: "enrollment-nr35-demo",
      userId: "user-student-demo",
      courseId: "nr35",
      progress: 75,
      status: "in_progress",
      lessonsCompleted: 5,
      attemptsUsed: 0,
      bestGrade: 0,
      createdAt,
      updatedAt: createdAt,
      lastAccessAt: createdAt
    }),
    normalizeEnrollment({
      id: "enrollment-epi-demo",
      userId: "user-student-demo",
      courseId: "epi",
      progress: 100,
      status: "completed",
      lessonsCompleted: 5,
      attemptsUsed: 1,
      bestGrade: 80,
      createdAt,
      updatedAt: createdAt,
      lastAccessAt: createdAt
    })
  ].filter(Boolean);
  const demoCertificate = normalizeCertificate({
    id: "certificate-epi-demo",
    code: "FS-EPI-2026-000122",
    userId: "user-student-demo",
    courseId: "epi",
    studentName: "João da Silva",
    grade: 80,
    issuedAt: createdAt,
    status: "valid"
  });
  if (demoEnrollments[1] && demoCertificate) demoEnrollments[1].certificateId = demoCertificate.id;

  return {
    users: [
      {
        id: "user-student-demo",
        role: "student",
        email: "aluno@teste.com",
        name: "João da Silva",
        phone: "(11) 99999-0000",
        document: "000.000.000-00",
        status: "active",
        passwordHash: demoPassword.hash,
        passwordSalt: demoPassword.salt,
        createdAt,
        updatedAt: createdAt
      },
      {
        id: "user-company-demo",
        role: "company",
        email: "empresa@teste.com",
        name: "Empresa Exemplo Ltda.",
        companyName: "Empresa Exemplo Ltda.",
        responsibleName: "Empresa Exemplo Ltda.",
        phone: "(11) 98888-0000",
        document: "00.000.000/0001-00",
        status: "active",
        passwordHash: demoPassword.hash,
        passwordSalt: demoPassword.salt,
        createdAt,
        updatedAt: createdAt
      },
      {
        id: "user-admin-demo",
        role: "admin",
        email: "admin@teste.com",
        name: "Administrador FortixSeg",
        status: "active",
        passwordHash: demoPassword.hash,
        passwordSalt: demoPassword.salt,
        createdAt,
        updatedAt: createdAt
      }
    ],
    companyEmployees: {
      "user-company-demo": [
        normalizeCompanyEmployee({ id: "company-employee-1", name: "Carlos Lima", email: "carlos.lima@empresa.com", cpf: "000.000.000-01", courseId: "nr35", progress: 75, status: "Em andamento", certificate: false, lastAccessAt: createdAt }),
        normalizeCompanyEmployee({ id: "company-employee-2", name: "Ana Souza", email: "ana.souza@empresa.com", cpf: "000.000.000-02", courseId: "epi", progress: 100, status: "Concluído", certificate: true, certificateCode: "FS-EPI-2026-000122", completedAt: createdAt, lastAccessAt: createdAt }),
        normalizeCompanyEmployee({ id: "company-employee-3", name: "Marcos Silva", email: "marcos.silva@empresa.com", cpf: "000.000.000-03", courseId: "nr12", progress: 40, status: "Em andamento", certificate: false, lastAccessAt: createdAt })
      ]
    },
    registrations: [],
    enrollments: demoEnrollments,
    orders: [],
    certificates: demoCertificate ? [demoCertificate] : []
  };
}

function normalizeCompanyEmployees(input, fallback = {}) {
  const source = input && typeof input === "object" ? input : fallback;
  return Object.fromEntries(
    Object.entries(source || {}).map(([companyId, employees]) => [
      companyId,
      Array.isArray(employees) ? employees.map(normalizeCompanyEmployee).filter(Boolean) : []
    ])
  );
}

function normalizeCompanyEmployee(input) {
  if (!input?.name || !input?.courseId) return null;
  const course = courseCatalog[cleanText(input.courseId, 80)] || null;
  const progressNumber = Math.round(clampNumber(input.progress, 0, 100, 0));
  return {
    id: cleanText(input.id || `company-employee-${randomUUID()}`, 120),
    name: cleanText(input.name, 120),
    cpf: cleanText(input.cpf, 20),
    email: cleanText(input.email, 160),
    courseId: cleanText(input.courseId, 80),
    course: cleanText(input.course || course?.code || course?.title || "Curso", 180),
    progress: `${progressNumber}%`,
    progressValue: progressNumber,
    status: cleanText(input.status || (progressNumber >= 100 ? "Concluído" : progressNumber > 0 ? "Em andamento" : "Não iniciado"), 40),
    certificate: Boolean(input.certificate),
    certificateCode: cleanText(input.certificateCode, 80),
    completedAt: input.completedAt || "",
    createdAt: input.createdAt || new Date().toISOString(),
    updatedAt: input.updatedAt || new Date().toISOString(),
    lastAccessAt: input.lastAccessAt || ""
  };
}

function normalizeStoredUser(user) {
  if (!user?.id || !user?.email || !user?.passwordHash || !user?.passwordSalt) return null;
  return {
    id: cleanText(user.id, 80),
    role: normalizeRole(user.role),
    email: cleanText(user.email, 160).toLowerCase(),
    name: cleanText(user.name || user.companyName || "Usuário FortixSeg", 160),
    companyName: cleanText(user.companyName, 160),
    responsibleName: cleanText(user.responsibleName, 160),
    phone: cleanText(user.phone, 40),
    document: cleanText(user.document, 40),
    status: user.status === "inactive" ? "inactive" : "active",
    passwordHash: cleanText(user.passwordHash, 256),
    passwordSalt: cleanText(user.passwordSalt, 256),
    createdAt: user.createdAt || new Date().toISOString(),
    updatedAt: user.updatedAt || new Date().toISOString(),
    lastLoginAt: user.lastLoginAt || ""
  };
}

function normalizeEnrollment(input) {
  if (!input?.userId || !input?.courseId) return null;
  const course = courseCatalog[input.courseId];
  const lessonsTotal = course?.lessons || Math.max(1, course?.syllabus?.length || 1);
  const progress = Math.round(clampNumber(input.progress, 0, 100, 0));
  const lessonsCompleted = Math.round(clampNumber(input.lessonsCompleted, 0, lessonsTotal, Math.round((progress / 100) * lessonsTotal)));
  const status = progress >= 100 ? "completed" : progress > 0 ? "in_progress" : "not_started";
  return {
    id: cleanText(input.id || `enrollment-${randomUUID()}`, 100),
    userId: cleanText(input.userId, 80),
    courseId: cleanText(input.courseId, 80),
    progress,
    status: input.status === "completed" ? "completed" : input.status === "not_started" ? "not_started" : status,
    lessonsCompleted,
    lessonsTotal,
    attemptsUsed: Math.round(clampNumber(input.attemptsUsed, 0, 50, 0)),
    bestGrade: Math.round(clampNumber(input.bestGrade, 0, 100, 0)),
    certificateId: cleanText(input.certificateId, 100),
    createdAt: input.createdAt || new Date().toISOString(),
    updatedAt: input.updatedAt || new Date().toISOString(),
    lastAccessAt: input.lastAccessAt || ""
  };
}

function normalizeOrder(input) {
  if (!input?.id || !input?.userId) return null;
  return {
    id: cleanText(input.id, 100),
    userId: cleanText(input.userId, 80),
    role: normalizeRole(input.role),
    type: input.type === "company" ? "company" : "student",
    status: ["approved", "pending", "failed", "cancelled"].includes(input.status) ? input.status : "pending",
    items: Array.isArray(input.items) ? input.items.map((item) => ({
      courseId: cleanText(item.courseId, 80),
      title: cleanText(item.title, 180),
      quantity: Math.round(clampNumber(item.quantity, 1, 500, 1)),
      unitPrice: clampNumber(item.unitPrice, 0, 100000, 0),
      corporate: Boolean(item.corporate)
    })) : [],
    totalAmount: clampNumber(input.totalAmount, 0, 1000000, 0),
    externalReference: cleanText(input.externalReference, 120),
    paymentProvider: cleanText(input.paymentProvider, 40),
    paymentId: cleanText(input.paymentId, 120),
    providerStatus: cleanText(input.providerStatus, 80),
    lastWebhookAt: input.lastWebhookAt || "",
    releasedAt: input.releasedAt || "",
    createdAt: input.createdAt || new Date().toISOString(),
    updatedAt: input.updatedAt || new Date().toISOString(),
    approvedAt: input.approvedAt || ""
  };
}

function normalizeCertificate(input) {
  if (!input?.id || !input?.userId || !input?.courseId || !input?.code) return null;
  const course = courseCatalog[input.courseId];
  return {
    id: cleanText(input.id, 100),
    code: cleanText(input.code, 80).toUpperCase(),
    userId: cleanText(input.userId, 80),
    courseId: cleanText(input.courseId, 80),
    studentName: cleanText(input.studentName, 160),
    courseTitle: cleanText(input.courseTitle || course?.title, 180),
    hours: cleanText(input.hours || `${course?.hours || 0} horas`, 60),
    grade: Math.round(clampNumber(input.grade, 0, 100, 0)),
    issuedAt: input.issuedAt || new Date().toISOString(),
    status: input.status === "revoked" ? "revoked" : "valid"
  };
}

function hashPassword(password, salt = randomUUID()) {
  const hash = scryptSync(password, salt, 64).toString("hex");
  return { salt, hash };
}

function verifyPassword(password, user) {
  if (!user?.passwordHash || !user?.passwordSalt) return false;
  const { hash } = hashPassword(password, user.passwordSalt);
  return timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(user.passwordHash, "hex"));
}

function normalizeRole(role) {
  return ["student", "company", "admin"].includes(role) ? role : "student";
}

function base64UrlEncode(value) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signJwt(user) {
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresAt = issuedAt + Math.floor(SESSION_TTL_MS / 1000);
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64UrlEncode(JSON.stringify({
    sub: user.id,
    role: user.role,
    email: user.email,
    iat: issuedAt,
    exp: expiresAt
  }));
  const signature = createHmac("sha256", JWT_SECRET).update(`${header}.${payload}`).digest("base64url");
  return `${header}.${payload}.${signature}`;
}

function verifyJwt(token) {
  const [header, payload, signature] = String(token || "").split(".");
  if (!header || !payload || !signature) return null;
  const expectedSignature = createHmac("sha256", JWT_SECRET).update(`${header}.${payload}`).digest("base64url");
  if (expectedSignature.length !== signature.length) return null;
  if (!timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature))) return null;

  try {
    const decoded = JSON.parse(base64UrlDecode(payload));
    const expiresAt = Number(decoded.exp);
    if (!Number.isFinite(expiresAt) || expiresAt * 1000 <= Date.now()) return null;
    return decoded;
  } catch {
    return null;
  }
}

function parseCookies(request) {
  return Object.fromEntries(
    String(request.headers.cookie || "")
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const separator = part.indexOf("=");
        return separator === -1
          ? [part, ""]
          : [part.slice(0, separator), decodeURIComponent(part.slice(separator + 1))];
      })
  );
}

function getAuthToken(request) {
  const authorization = String(request.headers.authorization || "").trim();
  if (authorization.toLowerCase().startsWith("bearer ")) return authorization.slice(7).trim();
  const cookies = parseCookies(request);
  if (cookies[AUTH_COOKIE_NAME]) return cleanText(cookies[AUTH_COOKIE_NAME], 2000);
  return cleanText(request.headers["x-auth-token"], 2000);
}

function getAuthContext(request) {
  const token = getAuthToken(request);
  if (!token) return null;
  const payload = verifyJwt(token);
  if (!payload?.sub) return null;
  const user = appData.users.find((item) => item.id === payload.sub && item.status === "active");
  if (!user) return null;
  return { token, payload, user };
}

function requireRole(request, response, roles) {
  const auth = getAuthContext(request);
  if (!auth) {
    clearAuthCookie(response);
    sendJson(response, 401, { error: "Sessão inválida ou expirada.", code: "AUTH_REQUIRED" });
    return null;
  }
  if (!roles.includes(auth.user.role)) {
    sendJson(response, 403, { error: "Você não tem permissão para acessar este recurso.", code: "FORBIDDEN" });
    return null;
  }
  return auth;
}

function serializeUser(user) {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    companyName: user.companyName || "",
    responsibleName: user.responsibleName || "",
    phone: user.phone || "",
    document: user.document || "",
    status: user.status
  };
}

function setAuthCookie(response, token) {
  response.setHeader("Set-Cookie", `${AUTH_COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Path=/; Max-Age=${Math.floor(SESSION_TTL_MS / 1000)}; SameSite=Lax`);
}

function clearAuthCookie(response) {
  response.setHeader("Set-Cookie", `${AUTH_COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`);
}

function listUserEnrollments(userId) {
  return appData.enrollments.filter((enrollment) => enrollment.userId === userId);
}

function listUserCertificates(userId) {
  return appData.certificates.filter((certificate) => certificate.userId === userId && certificate.status === "valid");
}

function listUserOrders(userId) {
  return appData.orders.filter((order) => order.userId === userId);
}

function listCompanyEmployees(companyUserId) {
  return Array.isArray(appData.companyEmployees[companyUserId]) ? appData.companyEmployees[companyUserId] : [];
}

function calculateCompanySeatBalances(companyUserId) {
  const balances = new Map();
  const orders = listUserOrders(companyUserId).filter((order) => order.type === "company" && order.status === "approved");
  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (!item.corporate) return;
      const current = balances.get(item.courseId) || { courseId: item.courseId, title: item.title, purchased: 0, assigned: 0, available: 0 };
      current.purchased += item.quantity;
      balances.set(item.courseId, current);
    });
  });

  listCompanyEmployees(companyUserId).forEach((employee) => {
    const current = balances.get(employee.courseId) || {
      courseId: employee.courseId,
      title: courseCatalog[employee.courseId]?.title || employee.course,
      purchased: 0,
      assigned: 0,
      available: 0
    };
    current.assigned += 1;
    balances.set(employee.courseId, current);
  });

  return [...balances.values()]
    .map((balance) => ({ ...balance, available: Math.max(0, balance.purchased - balance.assigned) }))
    .sort((left, right) => left.title.localeCompare(right.title));
}

function getAvailableSeatsForCourse(companyUserId, courseId) {
  return calculateCompanySeatBalances(companyUserId).find((balance) => balance.courseId === courseId)?.available || 0;
}

function findOrderById(orderId) {
  return appData.orders.find((order) => order.id === orderId) || null;
}

function findOrderByExternalReference(externalReference) {
  if (!externalReference) return null;
  return appData.orders.find((order) => order.externalReference === externalReference) || null;
}

function findOrderByPaymentId(paymentId) {
  if (!paymentId) return null;
  return appData.orders.find((order) => order.paymentId === paymentId) || null;
}

function canAccessOrder(user, order) {
  return user.role === "admin" || order.userId === user.id;
}

function getEnrollment(userId, courseId) {
  return appData.enrollments.find((enrollment) => enrollment.userId === userId && enrollment.courseId === courseId) || null;
}

function ensureEnrollment(userId, courseId, seed = {}) {
  const existing = getEnrollment(userId, courseId);
  if (existing) return existing;
  const enrollment = normalizeEnrollment({
    id: `enrollment-${randomUUID()}`,
    userId,
    courseId,
    ...seed,
    createdAt: seed.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  appData.enrollments.push(enrollment);
  return enrollment;
}

function nextCertificateCode(courseId) {
  const course = courseCatalog[courseId];
  const prefix = cleanText(course?.code || courseId || "CURSO", 20).replace(/\s+/g, "").toUpperCase();
  const year = new Date().getFullYear();
  const count = appData.certificates.filter((certificate) => certificate.courseId === courseId).length + 1;
  return `FS-${prefix}-${year}-${String(count).padStart(6, "0")}`;
}

function issueCertificate(user, enrollment, grade) {
  const existing = enrollment.certificateId
    ? appData.certificates.find((certificate) => certificate.id === enrollment.certificateId && certificate.status === "valid")
    : null;
  if (existing) return existing;

  const course = courseCatalog[enrollment.courseId];
  const certificate = normalizeCertificate({
    id: `certificate-${randomUUID()}`,
    code: nextCertificateCode(enrollment.courseId),
    userId: user.id,
    courseId: enrollment.courseId,
    studentName: user.name,
    courseTitle: course?.title,
    hours: `${course?.hours || 0} horas`,
    grade,
    issuedAt: new Date().toISOString(),
    status: "valid"
  });
  appData.certificates.push(certificate);
  enrollment.certificateId = certificate.id;
  enrollment.updatedAt = new Date().toISOString();
  return certificate;
}

function buildStudentCourseRecord(enrollment) {
  const course = courseCatalog[enrollment.courseId];
  if (!course) return null;
  return {
    id: course.id,
    code: course.code,
    title: course.title,
    progress: enrollment.progress,
    status: enrollment.progress >= 100 ? "Concluído" : enrollment.progress > 0 ? "Em andamento" : "Não iniciado",
    lessonsCompleted: enrollment.lessonsCompleted,
    lessonsTotal: enrollment.lessonsTotal
  };
}

function buildStudentCertificateRecord(certificate) {
  return {
    id: certificate.id,
    student: certificate.studentName,
    code: certificate.code,
    courseId: certificate.courseId,
    course: certificate.courseTitle,
    hours: certificate.hours,
    completedAt: new Intl.DateTimeFormat("pt-BR").format(new Date(certificate.issuedAt)),
    grade: certificate.grade,
    status: certificate.status === "valid" ? "Válido" : "Revogado"
  };
}

function persistAppData() {
  appData.enrollments = appData.enrollments.map(normalizeEnrollment).filter(Boolean);
  appData.orders = appData.orders.map(normalizeOrder).filter(Boolean);
  appData.certificates = appData.certificates.map(normalizeCertificate).filter(Boolean);
  saveAppData();
}

function applyApprovedOrder(order, user) {
  order.status = "approved";
  order.approvedAt = order.approvedAt || new Date().toISOString();
  order.updatedAt = new Date().toISOString();
  order.releasedAt = order.releasedAt || new Date().toISOString();

  if (order.type === "student") {
    order.items.forEach((item) => {
      const enrollment = ensureEnrollment(user.id, item.courseId, { progress: 0, status: "not_started", lessonsCompleted: 0 });
      enrollment.updatedAt = new Date().toISOString();
    });
  }
}

function applyOrderStatus(order, user, status, providerStatus = "") {
  order.providerStatus = cleanText(providerStatus || status, 80);
  order.updatedAt = new Date().toISOString();
  if (status === "approved") {
    applyApprovedOrder(order, user);
    return;
  }
  if (status === "pending") {
    order.status = "pending";
    return;
  }
  if (status === "failed" || status === "cancelled") {
    order.status = status;
  }
}

function serializeOrder(order) {
  return {
    id: order.id,
    userId: order.userId,
    type: order.type,
    status: order.status,
    providerStatus: order.providerStatus || order.status,
    items: order.items,
    totalAmount: order.totalAmount,
    externalReference: order.externalReference,
    paymentProvider: order.paymentProvider,
    paymentId: order.paymentId,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    approvedAt: order.approvedAt,
    releasedAt: order.releasedAt
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

async function handleLogin(request, response) {
  const body = await readJsonBody(request);
  const email = cleanText(body.email, 160).toLowerCase();
  const password = String(body.password ?? "");
  const user = appData.users.find((item) => item.email === email && item.status === "active");

  if (!user || !verifyPassword(password, user)) {
    return sendJson(response, 401, { error: "E-mail ou senha inválidos." });
  }

  user.lastLoginAt = new Date().toISOString();
  user.updatedAt = new Date().toISOString();
  saveAppData();
  setAuthCookie(response, signJwt(user));
  return sendJson(response, 200, {
    user: serializeUser(user)
  });
}

async function handleRegister(request, response) {
  const body = await readJsonBody(request, 120_000);
  const accountType = body.accountType === "company" ? "company" : "candidate";
  const role = accountType === "company" ? "company" : "student";
  const email = cleanText(body.email, 160).toLowerCase();
  const password = String(body.password ?? "");
  const name = accountType === "company"
    ? cleanText(body.companyName || body.companyResponsible || "Empresa sem nome", 160)
    : cleanText(body.fullName || "Aluno FortixSeg", 160);

  if (!email || !password || password.length < 6 || !name) {
    return sendJson(response, 400, { error: "Preencha nome, e-mail e senha com pelo menos 6 caracteres." });
  }
  if (appData.users.some((item) => item.email === email)) {
    return sendJson(response, 409, { error: "Já existe uma conta com esse e-mail." });
  }

  const passwordData = hashPassword(password);
  const now = new Date().toISOString();
  const user = normalizeStoredUser({
    id: `user-${role}-${randomUUID()}`,
    role,
    email,
    name,
    companyName: accountType === "company" ? cleanText(body.companyName || name, 160) : "",
    responsibleName: accountType === "company" ? cleanText(body.companyResponsible || name, 160) : "",
    phone: cleanText(accountType === "company" ? body.phoneCompany : body.phoneCandidate, 40),
    document: cleanText(accountType === "company" ? body.companyCnpj : body.cpf, 40),
    status: "active",
    passwordHash: passwordData.hash,
    passwordSalt: passwordData.salt,
    createdAt: now,
    updatedAt: now
  });

  appData.users.push(user);
  appData.registrations.unshift({
    id: `registration-${randomUUID()}`,
    role,
    email: user.email,
    name: user.name,
    createdAt: now
  });
  if (role === "company" && !appData.companyEmployees[user.id]) {
    appData.companyEmployees[user.id] = [];
  }
  saveAppData();
  setAuthCookie(response, signJwt(user));
  return sendJson(response, 201, { user: serializeUser(user) });
}

function handleSession(request, response) {
  const auth = getAuthContext(request);
  if (!auth) {
    clearAuthCookie(response);
    return sendJson(response, 401, { error: "Sessão inválida ou expirada.", code: "AUTH_REQUIRED" });
  }
  return sendJson(response, 200, { user: serializeUser(auth.user) });
}

function handleLogout(request, response) {
  clearAuthCookie(response);
  return sendJson(response, 200, { ok: true });
}

async function handleCompanyEmployeeAdd(request, response, user) {
  const body = await readJsonBody(request);
  const courseId = cleanText(body.courseId, 40);
  const course = courseCatalog[courseId] || courseCatalog.nr35 || Object.values(courseCatalog)[0];
  if (!course) return sendJson(response, 400, { error: "Nenhum curso disponível para matrícula." });
  const employeeName = cleanText(body.name, 120);
  const employeeEmail = cleanText(body.email, 160).toLowerCase();
  const employeeCpf = cleanText(body.cpf, 20);

  if (!employeeName || !employeeEmail) {
    return sendJson(response, 400, { error: "Nome e e-mail do colaborador são obrigatórios." });
  }

  const availableSeats = getAvailableSeatsForCourse(user.id, course.id);
  if (availableSeats < 1) {
    return sendJson(response, 409, { error: "Não há vagas corporativas disponíveis para este curso." });
  }

  const currentEmployees = listCompanyEmployees(user.id);
  if (currentEmployees.some((employee) => employee.email === employeeEmail && employee.courseId === course.id)) {
    return sendJson(response, 409, { error: "Esse colaborador já está matriculado neste curso." });
  }

  const employee = normalizeCompanyEmployee({
    id: `company-employee-${randomUUID()}`,
    name: employeeName,
    cpf: employeeCpf,
    email: employeeEmail,
    courseId: course.id,
    course: course.code,
    progress: 0,
    status: "Não iniciado",
    certificate: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  appData.companyEmployees[user.id] = [employee, ...currentEmployees].slice(0, 200);
  saveAppData();
  return sendJson(response, 201, buildCompanyDashboard(user));
}

function buildStudentDashboard(user) {
  const enrollments = listUserEnrollments(user.id)
    .map(buildStudentCourseRecord)
    .filter(Boolean)
    .sort((left, right) => right.progress - left.progress || left.title.localeCompare(right.title));
  const certificates = listUserCertificates(user.id).map(buildStudentCertificateRecord);
  const activeCourse = enrollments.find((course) => course.progress > 0 && course.progress < 100) || enrollments[0] || null;
  const completedCourses = enrollments.filter((course) => course.progress >= 100).length;
  const averageProgress = enrollments.length
    ? Math.round(enrollments.reduce((sum, course) => sum + course.progress, 0) / enrollments.length)
    : 0;
  return {
    source: "api-local",
    profile: {
      name: user.name,
      email: user.email,
      activeCourse: activeCourse?.title || "Nenhum curso ativo"
    },
    metrics: {
      enrolledCourses: enrollments.length,
      completedCourses,
      certificates: certificates.length,
      averageProgress
    },
    nextActions: [
      activeCourse
        ? { title: `Continuar ${activeCourse.code}`, description: `${activeCourse.lessonsCompleted} de ${activeCourse.lessonsTotal} aulas concluídas.`, status: "Prioridade" }
        : { title: "Escolher um curso", description: "Selecione um treinamento no catálogo e conclua a matrícula.", status: "Pendente" },
      { title: "Avaliação final", description: "Liberada quando o curso atingir 100% de progresso.", status: activeCourse?.progress >= 100 ? "Disponível" : "Pendente" },
      { title: "Certificados", description: certificates.length ? `${certificates.length} certificado(s) já liberado(s).` : "Liberados automaticamente após aprovação mínima de 70%.", status: certificates.length ? "Disponível" : "Bloqueado" }
    ],
    courses: enrollments,
    certificates,
    support: {
      sla: "Até 1 dia útil",
      channel: "fortixseg@gmail.com"
    }
  };
}

function buildStudentLibrary(user) {
  const enrollment = listUserEnrollments(user.id)
    .sort((left, right) => right.progress - left.progress)
    .find((item) => item.progress < 100) || listUserEnrollments(user.id)[0];
  const course = enrollment ? courseCatalog[enrollment.courseId] : courseCatalog.nr35;
  const lessonsTotal = course?.lessons || Math.max(1, course?.syllabus?.length || 1);
  const resources = [
    { id: `${course.id}-video-01`, type: "video", title: `Introdução ao ${course.code}`, duration: "12 min", status: enrollment?.progress > 10 ? "Concluído" : "Disponível", delivery: "signed-url-future" },
    { id: `${course.id}-video-02`, type: "video", title: "Análise de risco", duration: "18 min", status: enrollment?.progress > 45 ? "Concluído" : enrollment?.progress > 15 ? "Em andamento" : "Disponível", delivery: "signed-url-future" }
  ];
  if (Array.isArray(course?.resources)) {
    course.resources.forEach((resource) => {
      resources.push({
        id: resource.id,
        type: resource.type,
        title: resource.name,
        mimeType: resource.mimeType,
        url: resource.url,
        status: "Disponível"
      });
    });
  }
  return {
    source: "api-local",
    courseId: course?.id || "nr35",
    courseTitle: course?.title || "NR 35 - Trabalho em Altura",
    lessonsTotal,
    resources
  };
}

function buildCompanyDashboard(user) {
  const companyEmployees = listCompanyEmployees(user.id);
  const companyOrders = listUserOrders(user.id).filter((order) => order.type === "company" && order.status === "approved");
  const seatBalances = calculateCompanySeatBalances(user.id);
  const seatsPurchased = seatBalances.reduce((sum, seat) => sum + seat.purchased, 0);
  const completedEmployees = companyEmployees.filter((employee) => employee.status === "Concluído").length;
  const coursesInProgress = companyEmployees.filter((employee) => employee.status === "Em andamento").length;
  const certificates = companyEmployees.filter((employee) => employee.certificate).length;
  const seatsAvailable = seatBalances.reduce((sum, seat) => sum + seat.available, 0);
  const activeEmployees = 125 + companyEmployees.length;
  return {
    source: "api-local",
    company: {
      name: user.companyName || user.name,
      document: user.document || "00.000.000/0001-00",
      plan: "Corporativo"
    },
    metrics: {
      activeEmployees,
      coursesInProgress,
      certificates,
      expiringSoon: Math.max(0, certificates ? Math.round(certificates * 0.2) : 0),
      seatsAvailable,
      complianceRate: companyEmployees.length ? Math.round((completedEmployees / companyEmployees.length) * 100) : 0
    },
    alerts: [
      { title: `${Math.max(0, certificates ? Math.round(certificates * 0.2) : 0)} certificados vencem em até 60 dias`, severity: "warning" },
      { title: `${coursesInProgress} colaboradores estão em andamento`, severity: "success" },
      { title: `${seatsAvailable} vagas disponíveis para novas matrículas`, severity: "info" }
    ],
    employees: companyEmployees,
    seatBalances,
    recentOrders: companyOrders.slice(-5).reverse().map(serializeOrder)
  };
}

function buildAdminDashboard() {
  const students = appData.users.filter((user) => user.role === "student");
  const companies = appData.users.filter((user) => user.role === "company");
  const recentOrders = [...appData.orders]
    .sort((left, right) => Date.parse(right.updatedAt) - Date.parse(left.updatedAt))
    .slice(0, 5);
  return {
    source: "api-local",
    metrics: {
      students: students.length,
      companies: companies.length,
      courses: Object.keys(courseCatalog).length,
      certificates: appData.certificates.filter((certificate) => certificate.status === "valid").length
    },
    apiStatus: {
      server: "online",
      openai: ENV.OPENAI_API_KEY ? "configurado" : "pendente",
      mercadoPago: ENV.MERCADO_PAGO_ACCESS_TOKEN ? "configurado" : "pendente",
      database: "json-local"
    },
    recentStudents: students.slice(-3).reverse().map((user) => ({
      name: user.name,
      course: "NR 35",
      status: "Em andamento",
      date: new Intl.DateTimeFormat("pt-BR").format(new Date(user.createdAt))
    })),
    recentPayments: recentOrders.map((order) => {
      const user = appData.users.find((item) => item.id === order.userId);
      return {
        client: user?.companyName || user?.name || "Cliente",
        course: order.items.map((item) => item.title).join(", "),
        value: order.totalAmount,
        status: order.status === "approved" ? "Aprovado" : order.status === "pending" ? "Pendente" : "Falhou"
      };
    })
  };
}

function validateDemoCertificate(rawCode) {
  const code = cleanText(rawCode, 80).toUpperCase();
  const certificate = appData.certificates.find((item) => item.code === code && item.status === "valid");
  if (!certificate) return { valid: false, message: "Certificado não encontrado." };
  return {
    valid: true,
    certificate: {
      code: certificate.code,
      student: certificate.studentName,
      course: certificate.courseTitle,
      hours: certificate.hours,
      completedAt: new Intl.DateTimeFormat("pt-BR").format(new Date(certificate.issuedAt)),
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

async function handleStudentProgress(request, response, user) {
  const body = await readJsonBody(request, 32_000);
  const courseId = cleanText(body.courseId, 80);
  const enrollment = getEnrollment(user.id, courseId);
  if (!enrollment) return sendJson(response, 404, { error: "Matrícula não encontrada para este curso." });

  const course = courseCatalog[courseId];
  const nextProgress = Math.round(clampNumber(body.progress, 0, 100, Math.min(100, enrollment.progress + 10)));
  enrollment.progress = Math.max(enrollment.progress, nextProgress);
  enrollment.lessonsCompleted = Math.round(clampNumber(body.lessonsCompleted, 0, enrollment.lessonsTotal, Math.max(enrollment.lessonsCompleted, Math.round((enrollment.progress / 100) * enrollment.lessonsTotal))));
  enrollment.status = enrollment.progress >= 100 ? "completed" : enrollment.progress > 0 ? "in_progress" : "not_started";
  enrollment.lastAccessAt = new Date().toISOString();
  enrollment.updatedAt = new Date().toISOString();
  if (course && enrollment.lessonsCompleted > enrollment.lessonsTotal) {
    enrollment.lessonsCompleted = enrollment.lessonsTotal;
  }
  persistAppData();
  return sendJson(response, 200, { enrollment: buildStudentCourseRecord(enrollment), dashboard: buildStudentDashboard(user) });
}

async function handleStudentAssessment(request, response, user) {
  const body = await readJsonBody(request, 32_000);
  const courseId = cleanText(body.courseId, 80);
  const grade = Math.round(clampNumber(body.grade, 0, 100, 0));
  const enrollment = getEnrollment(user.id, courseId);
  if (!enrollment) return sendJson(response, 404, { error: "Matrícula não encontrada para este curso." });

  enrollment.attemptsUsed += 1;
  enrollment.bestGrade = Math.max(enrollment.bestGrade, grade);
  enrollment.lastAccessAt = new Date().toISOString();
  enrollment.updatedAt = new Date().toISOString();
  let certificate = null;

  if (grade >= 70) {
    enrollment.progress = 100;
    enrollment.lessonsCompleted = enrollment.lessonsTotal;
    enrollment.status = "completed";
    certificate = issueCertificate(user, enrollment, grade);
  }

  persistAppData();
  return sendJson(response, 200, {
    approved: grade >= 70,
    grade,
    attemptsUsed: enrollment.attemptsUsed,
    certificate: certificate ? buildStudentCertificateRecord(certificate) : null,
    dashboard: buildStudentDashboard(user)
  });
}

function handleOrderGet(response, user, orderId) {
  const order = findOrderById(orderId);
  if (!order) return sendJson(response, 404, { error: "Pedido não encontrado." });
  if (!canAccessOrder(user, order)) return sendJson(response, 403, { error: "Você não pode acessar este pedido.", code: "FORBIDDEN" });
  return sendJson(response, 200, { order: serializeOrder(order) });
}

async function handleOrderResolve(request, response, user, url) {
  const externalReference = cleanText(url.searchParams.get("external_reference"), 120);
  const paymentId = cleanText(url.searchParams.get("payment_id"), 120);
  const paymentStatus = cleanText(url.searchParams.get("status"), 80).toLowerCase();
  if (!externalReference && !paymentId) return sendJson(response, 400, { error: "Informe external_reference ou payment_id." });
  let order = findOrderByExternalReference(externalReference) || findOrderByPaymentId(paymentId);
  if (!order) return sendJson(response, 404, { error: "Pedido não encontrado." });
  if (!canAccessOrder(user, order)) return sendJson(response, 403, { error: "Você não pode acessar este pedido.", code: "FORBIDDEN" });

  if (paymentId && !order.paymentId) order.paymentId = paymentId;
  if (paymentStatus) {
    const normalized = normalizeMercadoPagoStatus(paymentStatus);
    applyOrderStatus(order, user, normalized.localStatus, normalized.providerStatus);
    persistAppData();
  }

  return sendJson(response, 200, {
    order: serializeOrder(order),
    dashboard: user.role === "company" ? buildCompanyDashboard(user) : user.role === "student" ? buildStudentDashboard(user) : null
  });
}

async function handleCheckout(request, response) {
  const auth = getAuthContext(request);
  if (!auth) return sendJson(response, 401, { error: "Faça login para concluir a compra.", code: "AUTH_REQUIRED" });

  const accessToken = ENV.MERCADO_PAGO_ACCESS_TOKEN;
  const body = await readJsonBody(request);
  if (!Array.isArray(body.items) || body.items.length === 0 || body.items.length > 20) {
    return sendJson(response, 400, { error: "Carrinho inválido." });
  }

  const items = body.items.map((item) => {
    const courseId = cleanText(item?.courseId, 32);
    const course = courseCatalog[courseId];
    const quantity = Number(item?.quantity);
    const corporate = Boolean(item?.corporate);
    if (!course || !Number.isInteger(quantity) || quantity < 1 || quantity > 500) {
      const error = new Error("Item ou quantidade inválida no carrinho.");
      error.statusCode = 400;
      throw error;
    }
    if (corporate && !["company", "admin"].includes(auth.user.role)) {
      const error = new Error("Somente contas empresariais podem comprar vagas corporativas.");
      error.statusCode = 403;
      throw error;
    }
    return {
      courseId,
      title: course.title,
      description: `Treinamento online - ${course.hours} horas`,
      quantity,
      currency_id: "BRL",
      unit_price: course.price,
      corporate
    };
  });

  const now = new Date().toISOString();
  const order = normalizeOrder({
    id: `order-${randomUUID()}`,
    userId: auth.user.id,
    role: auth.user.role,
    type: items.some((item) => item.corporate) ? "company" : "student",
    status: accessToken ? "pending" : "approved",
    items: items.map((item) => ({
      courseId: item.courseId,
      title: item.title,
      quantity: item.quantity,
      unitPrice: item.unit_price,
      corporate: item.corporate
    })),
    totalAmount: items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0),
    externalReference: `fortixseg-${randomUUID()}`,
    paymentProvider: accessToken ? "mercado_pago" : "demo_local",
    createdAt: now,
    updatedAt: now,
    approvedAt: accessToken ? "" : now
  });
  appData.orders.push(order);

  const preference = {
    items: items.map((item) => ({
      id: item.courseId,
      title: item.title,
      description: item.description,
      quantity: item.quantity,
      currency_id: item.currency_id,
      unit_price: item.unit_price
    })),
    external_reference: order.externalReference,
    statement_descriptor: "FORTIXSEG",
    metadata: {
      brand: "FortixSeg",
      order_id: order.id,
      course_ids: items.map((item) => item.courseId).join(",")
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

  if (!accessToken) {
    applyApprovedOrder(order, auth.user);
    order.providerStatus = "demo_local";
    persistAppData();
    return sendJson(response, 200, {
      mode: "demo_local",
      orderId: order.id,
      dashboard: auth.user.role === "company" ? buildCompanyDashboard(auth.user) : buildStudentDashboard(auth.user)
    });
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

  order.paymentId = cleanText(data.id, 120);
  order.providerStatus = "preference_created";
  order.updatedAt = new Date().toISOString();
  persistAppData();
  return sendJson(response, 200, { id: data.id, checkoutUrl, orderId: order.id, mode: "mercado_pago" });
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

  const eventType = cleanText(body.type, 40) || "desconhecido";
  if (eventType !== "payment" || !dataId) {
    console.log(`Webhook Mercado Pago ignorado: tipo=${eventType}, id=${dataId || "sem-id"}`);
    return sendJson(response, 200, { received: true, ignored: true });
  }

  const payment = await fetchMercadoPagoPayment(dataId);
  const order = findOrderByExternalReference(cleanText(payment.external_reference, 120)) || findOrderByPaymentId(dataId);
  if (!order) {
    console.warn(`Pagamento ${dataId} recebido sem pedido local correspondente.`);
    return sendJson(response, 202, { received: true, matched: false });
  }

  const user = appData.users.find((item) => item.id === order.userId);
  if (!user) return sendJson(response, 404, { error: "Usuário do pedido não encontrado." });

  order.paymentId = cleanText(payment.id, 120) || order.paymentId;
  order.lastWebhookAt = new Date().toISOString();
  const normalized = normalizeMercadoPagoStatus(payment.status);
  applyOrderStatus(order, user, normalized.localStatus, normalized.providerStatus);
  persistAppData();
  console.log(`Webhook Mercado Pago processado: pedido=${order.id}, pagamento=${dataId}, status=${order.status}`);
  return sendJson(response, 200, { received: true });
}

function normalizeMercadoPagoStatus(status) {
  const providerStatus = cleanText(status, 80).toLowerCase();
  if (["approved", "authorized", "success"].includes(providerStatus)) return { localStatus: "approved", providerStatus };
  if (["pending", "in_process", "in_mediation"].includes(providerStatus)) return { localStatus: "pending", providerStatus };
  if (["failure", "rejected"].includes(providerStatus)) return { localStatus: "failed", providerStatus };
  if (["cancelled", "refunded", "charged_back"].includes(providerStatus)) return { localStatus: "cancelled", providerStatus };
  return { localStatus: "failed", providerStatus: providerStatus || "unknown" };
}

async function fetchMercadoPagoPayment(paymentId) {
  const accessToken = ENV.MERCADO_PAGO_ACCESS_TOKEN;
  if (!accessToken) {
    const error = new Error("Mercado Pago não configurado.");
    error.statusCode = 503;
    throw error;
  }

  const apiResponse = await fetchWithTimeout(`https://api.mercadopago.com/v1/payments/${encodeURIComponent(paymentId)}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  });
  return await parseApiResponse(apiResponse, "Mercado Pago");
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

  let filePath = resolve(ROOT_DIR, relativePath);
  if (relativePath.startsWith("assets/uploads/courses/")) {
    const uploadRelativePath = relativePath.replace(/^assets\/uploads\/courses\//, "");
    filePath = resolve(COURSE_UPLOAD_DIR, uploadRelativePath);
    if (filePath !== COURSE_UPLOAD_DIR && !filePath.startsWith(`${COURSE_UPLOAD_DIR}${sep}`)) {
      return sendJson(response, 403, { error: "Acesso negado." });
    }
  } else if (filePath !== ROOT_DIR && !filePath.startsWith(`${ROOT_DIR}${sep}`)) {
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
