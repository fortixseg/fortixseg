const APP_CONFIG = {
  brandName: "FortixSeg",
  subtitle: "Treinamentos em Segurança do Trabalho",
  contactEmail: "fortixseg@gmail.com",
  certificateCode: "FS-NR35-2026-000123"
};

const courses = [
  {
    id: "nr35",
    code: "NR 35",
    title: "NR 35 - Trabalho em Altura",
    hours: 8,
    price: 149.90,
    category: "Trabalho em altura",
    accent: "linear-gradient(145deg, #1f6674, #081310)",
    audience: "Profissionais que executam atividades acima de 2 metros com risco de queda.",
    objective: "Apresentar conceitos, responsabilidades e medidas de prevenção para atividades em altura.",
    lessons: 7,
    syllabus: ["Conceitos de trabalho em altura", "Análise de risco", "Equipamentos de proteção", "Responsabilidades", "Condições impeditivas", "Procedimentos de emergência", "Avaliação final"]
  },
  {
    id: "nr12",
    code: "NR 12",
    title: "NR 12 - Segurança no Trabalho em Máquinas e Equipamentos",
    hours: 8,
    price: 179.90,
    category: "Máquinas e equipamentos",
    accent: "linear-gradient(145deg, #8b5b18, #13170f)",
    audience: "Operadores, mantenedores e profissionais expostos a máquinas e equipamentos.",
    objective: "Reforçar práticas seguras de operação, inspeção e prevenção de acidentes.",
    lessons: 8,
    syllabus: ["Princípios da NR 12", "Zonas de perigo", "Proteções fixas e móveis", "Dispositivos de parada", "Procedimentos de trabalho", "Inspeções", "Sinalização", "Avaliação final"]
  },
  {
    id: "nr10",
    code: "NR 10",
    title: "NR 10 - Segurança em Instalações e Serviços em Eletricidade",
    hours: 40,
    price: 249.90,
    category: "Segurança elétrica",
    accent: "linear-gradient(145deg, #0b6090, #15130c)",
    audience: "Profissionais que atuam direta ou indiretamente com instalações elétricas.",
    objective: "Desenvolver percepção de risco e medidas de controle em serviços com eletricidade.",
    lessons: 12,
    syllabus: ["Riscos elétricos", "Medidas de controle", "Desenergização", "Aterramento", "Proteção coletiva", "Proteção individual", "Documentação", "Emergências"]
  },
  {
    id: "nr33",
    code: "NR 33",
    title: "NR 33 - Segurança e Saúde em Espaços Confinados",
    hours: 16,
    price: 199.90,
    category: "Espaços confinados",
    accent: "linear-gradient(145deg, #4b5057, #090b0a)",
    audience: "Trabalhadores autorizados e equipes envolvidas com espaços confinados.",
    objective: "Orientar sobre reconhecimento, avaliação e controle dos riscos em espaços confinados.",
    lessons: 9,
    syllabus: ["Definições", "Reconhecimento de riscos", "Atmosferas perigosas", "Permissão de entrada", "Monitoramento", "Equipamentos", "Comunicação", "Resgate", "Avaliação final"]
  },
  {
    id: "epi",
    code: "EPI",
    title: "Uso Correto de EPIs",
    hours: 4,
    price: 59.90,
    category: "Proteção individual",
    accent: "linear-gradient(145deg, #c06e24, #17303a)",
    audience: "Profissionais que utilizam Equipamentos de Proteção Individual em suas atividades.",
    objective: "Promover seleção, uso, conservação e inspeção adequados dos EPIs.",
    lessons: 5,
    syllabus: ["Conceito de EPI", "Responsabilidades", "Seleção correta", "Ajuste e conservação", "Avaliação final"]
  },
  {
    id: "integracao",
    code: "INT",
    title: "Integração de Segurança",
    hours: 4,
    price: 79.90,
    category: "Integração",
    accent: "linear-gradient(145deg, #22704b, #111b17)",
    audience: "Novos colaboradores, terceiros e profissionais em processo de integração.",
    objective: "Apresentar fundamentos de prevenção, condutas seguras e resposta a emergências.",
    lessons: 5,
    syllabus: ["Cultura de segurança", "Regras gerais", "Riscos ocupacionais", "Emergências", "Avaliação final"]
  },
  {
    id: "nr01",
    code: "NR 01",
    title: "NR 01 - GRO/PGR Introdutório",
    hours: 4,
    price: 89.90,
    category: "Gerenciamento de riscos",
    accent: "linear-gradient(145deg, #32636f, #17241d)",
    audience: "Gestores, profissionais de SST e lideranças envolvidas com gerenciamento de riscos.",
    objective: "Introduzir conceitos de GRO, PGR, inventário de riscos e plano de ação.",
    lessons: 6,
    syllabus: ["Visão geral da NR 01", "GRO", "PGR", "Inventário de riscos", "Plano de ação", "Avaliação final"]
  },
  {
    id: "loto",
    code: "LOTO",
    title: "LOTO - Bloqueio e Etiquetagem",
    hours: 4,
    price: 99.90,
    category: "Controle de energias",
    accent: "linear-gradient(145deg, #a53d32, #242417)",
    audience: "Profissionais de operação e manutenção expostos a energias perigosas.",
    objective: "Apresentar o processo de bloqueio, etiquetagem e verificação de energia zero.",
    lessons: 6,
    syllabus: ["Energias perigosas", "Preparação do bloqueio", "Dispositivos LOTO", "Verificação de energia zero", "Retirada do bloqueio", "Avaliação final"]
  }
];

const quizQuestions = [
  {
    question: "O que é uma análise de risco?",
    options: ["Uma inspeção apenas visual", "Um processo para identificar perigos e definir controles", "Um documento de compra de EPI", "Uma lista de presença"],
    answer: 1
  },
  {
    question: "Qual EPI é usado para proteção contra queda?",
    options: ["Protetor auricular", "Respirador semifacial", "Cinturão de segurança tipo paraquedista", "Luva de raspa"],
    answer: 2
  },
  {
    question: "Quando o certificado deve ser liberado?",
    options: ["Antes das aulas", "Após conclusão e aprovação", "No momento do cadastro", "Sem avaliação"],
    answer: 1
  },
  {
    question: "Qual a nota mínima de aprovação nesta demonstração?",
    options: ["50%", "60%", "70%", "100%"],
    answer: 2
  },
  {
    question: "O treinamento deve possuir registro de conclusão?",
    options: ["Sim", "Não", "Somente se impresso", "Apenas para empresas"],
    answer: 0
  }
];

const defaultEmployees = [
  { name: "Carlos Lima", course: "NR 35", progress: "75%", status: "Em andamento", certificate: false },
  { name: "Ana Souza", course: "Uso Correto de EPIs", progress: "100%", status: "Concluído", certificate: true },
  { name: "Marcos Silva", course: "NR 12", progress: "40%", status: "Em andamento", certificate: false }
];

const trainingPackages = [
  {
    id: "pkg-integracao",
    code: "PCT 01",
    title: "Integração Essencial",
    price: 199.90,
    hours: 12,
    featured: true,
    badge: "Mais indicado para novos colaboradores",
    description: "Ideal para admissão, terceiros e integração inicial de segurança.",
    courses: ["Integração de Segurança", "Uso Correto de EPIs", "Percepção de Riscos", "Proteção contra Incêndio - Noções", "Abandono de Área e Emergência"]
  },
  {
    id: "pkg-chao-fabrica",
    code: "PCT 02",
    title: "Chão de Fábrica",
    price: 349.90,
    hours: 24,
    featured: true,
    badge: "Mais vendido para indústria",
    description: "Treinamentos essenciais para operadores, auxiliares, produção e manutenção industrial.",
    courses: ["NR-12 Introdutório", "LOTO - Bloqueio e Etiquetagem", "APR - Análise Preliminar de Risco", "Permissão de Trabalho", "Proteção de Mãos e Dedos", "Movimentação Manual de Cargas", "Produtos Químicos e FDS/FISPQ"]
  },
  {
    id: "pkg-administrativo",
    code: "PCT 03",
    title: "Administrativo Seguro",
    price: 249.90,
    hours: 18,
    featured: false,
    badge: "Ideal para administrativo",
    description: "Capacitação para escritórios, RH, áreas administrativas e trabalho remoto.",
    courses: ["Ergonomia em Escritório - NR-17", "Home Office Seguro e Ergonomia", "Prevenção de Acidentes no Ambiente Administrativo", "Assédio Moral e Sexual no Trabalho", "Saúde Mental e Segurança Psicológica", "Noções de Primeiros Socorros", "Evacuação de Emergência"]
  },
  {
    id: "pkg-lideranca",
    code: "PCT 04",
    title: "Liderança em Segurança",
    price: 449.90,
    hours: 28,
    featured: true,
    badge: "Maior valor corporativo",
    description: "Formação para líderes, supervisores, coordenadores e gestores de área.",
    courses: ["SST para Lideranças", "Responsabilidade da Liderança em Segurança", "Como Conduzir DDS Eficaz", "Investigação e Análise de Acidentes", "Gestão de Indicadores de Segurança", "Cultura de Segurança e Comportamento Seguro", "Gestão de Contratadas em SST"]
  },
  {
    id: "pkg-manutencao",
    code: "PCT 05",
    title: "Manutenção Segura",
    price: 399.90,
    hours: 26,
    featured: false,
    badge: "Para manutenção industrial",
    description: "Indicado para mecânicos, eletricistas, técnicos e equipes de manutenção.",
    courses: ["Riscos com Eletricidade para Não Eletricistas", "NR-12 para Manutenção", "LOTO - Bloqueio e Etiquetagem", "Trabalho a Quente - Noções", "Ferramentas Manuais e Elétricas", "Segurança com Ar Comprimido", "APR e Permissão de Trabalho"]
  },
  {
    id: "pkg-rh-sst",
    code: "PCT 06",
    title: "RH e Gestão SST",
    price: 299.90,
    hours: 20,
    featured: false,
    badge: "Para RH, DP e SESMT",
    description: "Voltado para RH, DP, SESMT e responsáveis por treinamentos e documentos.",
    courses: ["Gestão de Treinamentos Obrigatórios", "Controle de Certificados e Validades", "Noções de eSocial SST", "Como Montar Matriz de Treinamentos", "Gestão de Documentos de SST", "Terceiros e Documentação de Segurança", "LGPD aplicada a dados de colaboradores"]
  }
];

const discountTiers = [
  { min: 1, max: 5, label: "1 a 5 colaboradores", discount: 0, note: "preço normal" },
  { min: 6, max: 20, label: "6 a 20 colaboradores", discount: 0.10, note: "10% de desconto" },
  { min: 21, max: 50, label: "21 a 50 colaboradores", discount: 0.15, note: "15% de desconto" },
  { min: 51, max: 100, label: "51 a 100 colaboradores", discount: 0.20, note: "20% de desconto" },
  { min: 101, max: Infinity, label: "Acima de 100 colaboradores", discount: null, note: "sob proposta" }
];

let cart = readStorage("fortixsegCart", []);
let employees = readStorage("fortixsegEmployees", defaultEmployees);
let certificateUnlocked = readStorage("fortixsegCertificateUnlocked", true);
let studentProgress = Number(readStorage("fortixsegStudentProgress", 75));
let lastQuizGrade = Number(readStorage("fortixsegQuizGrade", 80));
let toastTimer;
let apiOnline = false;
let portalInitialized = false;
const portalData = { student: null, company: null, admin: null };
let adminCourseCatalog = [];
let currentUser = null;
let lastOrderStatus = null;
let activeCourseFilter = "Todos";

document.addEventListener("DOMContentLoaded", init);

function init() {
  setBrand();
  renderCourses(courses);
  renderTrainingPackages();
  renderCourseSelects();
  renderCart();
  renderEmployees();
  renderQuiz();
  updateStudentState();
  bindNavigation();
  bindModals();
  bindForms();
  initPortalWorkspaces();
  bindInterface();
  initVirtualAssistant();
  syncCourseCatalog();

  document.getElementById("currentYear").textContent = new Date().getFullYear();
  document.getElementById("certificateDate").textContent = new Intl.DateTimeFormat("pt-BR").format(new Date());
  document.getElementById("certificateGrade").textContent = `${lastQuizGrade}%`;

  const initialPage = location.hash.replace("#", "") || "home";
  navigate(document.querySelector(`[data-page="${initialPage}"]`) ? initialPage : "home", false);
  restoreAuthSession(initialPage);
}

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function setBrand() {
  document.title = `${APP_CONFIG.brandName} | ${APP_CONFIG.subtitle}`;
  document.querySelectorAll("[data-brand]").forEach((element) => {
    element.textContent = APP_CONFIG.brandName;
  });
  document.querySelectorAll("[data-subtitle]").forEach((element) => {
    element.textContent = APP_CONFIG.subtitle;
  });
  document.querySelectorAll("[data-email]").forEach((element) => {
    element.textContent = APP_CONFIG.contactEmail;
    element.href = `mailto:${APP_CONFIG.contactEmail}`;
  });
}

async function apiRequest(path, options = {}) {
  const { timeoutMs = 8000, ...requestOptions } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(path, {
      ...requestOptions,
      credentials: "same-origin",
      headers: {
        ...(requestOptions.body ? { "Content-Type": "application/json" } : {}),
        ...(requestOptions.headers || {})
      },
      signal: controller.signal
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(data.error || "A API não respondeu corretamente.");
      error.statusCode = response.status;
      error.code = data.code || "";
      throw error;
    }
    apiOnline = true;
    return data;
  } finally {
    clearTimeout(timer);
  }
}

function getProtectedPageRoles(pageName) {
  return {
    student: ["student", "admin"],
    lesson: ["student", "admin"],
    "certificate-view": ["student", "company", "admin"],
    "company-dashboard": ["company", "admin"],
    admin: ["admin"]
  }[pageName] || null;
}

function getPortalPageForRole(role) {
  if (role === "student") return "student";
  if (role === "company") return "company-dashboard";
  if (role === "admin") return "admin";
  return "home";
}

function canAccessPage(pageName) {
  const allowedRoles = getProtectedPageRoles(pageName);
  if (!allowedRoles) return true;
  return Boolean(currentUser && allowedRoles.includes(currentUser.role));
}

function applyAuthState() {
  const isAuthenticated = Boolean(currentUser);
  document.querySelectorAll("[data-auth]").forEach((button) => {
    button.classList.toggle("hidden", isAuthenticated);
  });

  const homeTarget = getPortalPageForRole(currentUser?.role);
  document.querySelectorAll("[data-auth-home-target]").forEach((button) => {
    button.classList.toggle("hidden", !isAuthenticated);
    if (isAuthenticated) button.dataset.nav = homeTarget;
  });

  if (currentUser) {
    setTopbarIdentity("#page-student .app-topbar h1", `Olá, ${currentUser.name || "Aluno"}`);
    setTopbarIdentity("#page-company-dashboard .app-topbar h1", currentUser.companyName || currentUser.name || "Portal corporativo");
    setTopbarIdentity("#page-admin .app-topbar h1", `Administração - ${currentUser.name || "FortixSeg"}`);
  }
}

function setTopbarIdentity(selector, text) {
  const element = document.querySelector(selector);
  if (element && text) element.textContent = text;
}

async function restoreAuthSession(initialPage = "home") {
  try {
    const data = await apiRequest("/api/auth/session", { timeoutMs: 5000 });
    currentUser = data.user || null;
    applyAuthState();
    if (currentUser && canAccessPage(initialPage)) {
      navigate(initialPage, false);
    }
  } catch {
    currentUser = null;
    applyAuthState();
    if (getProtectedPageRoles(initialPage)) {
      navigate("home", false);
    }
  } finally {
    handlePaymentReturn();
  }
}

async function hydratePortalData(pageName) {
  try {
    if (pageName === "student") {
      const [dashboard, library] = await Promise.all([
        apiRequest("/api/student/dashboard"),
        apiRequest("/api/student/library")
      ]);
      dashboard.library = library.resources || [];
      applyStudentDashboard(dashboard);
    } else if (pageName === "company-dashboard") {
      applyCompanyDashboard(await apiRequest("/api/company/dashboard"));
    } else if (pageName === "admin") {
      applyAdminDashboard(await apiRequest("/api/admin/dashboard"));
    }
  } catch (error) {
    if (error.statusCode === 401) {
      currentUser = null;
      applyAuthState();
      showToast("Sua sessão expirou. Entre novamente para continuar.");
      navigate("home");
      return;
    }
    apiOnline = false;
    const studentStatus = document.getElementById("studentApiStatus");
    if (studentStatus) studentStatus.textContent = "Modo local";
  }
}

async function syncCourseCatalog() {
  try {
    const data = await apiRequest("/api/courses");
    const remoteIds = new Set(data.courses?.map((course) => course.id) || []);
    for (let index = courses.length - 1; index >= 0; index -= 1) {
      if (courses[index].apiManaged && !remoteIds.has(courses[index].id)) courses.splice(index, 1);
    }
    data.courses?.forEach((remoteCourse) => {
      const localCourse = courses.find((course) => course.id === remoteCourse.id);
      if (localCourse) {
        Object.assign(localCourse, remoteCourse, { apiManaged: true });
      } else {
        courses.push({
          ...remoteCourse,
          apiManaged: true,
          accent: "linear-gradient(145deg, #2d6f43, #081310)",
          lessons: remoteCourse.lessons || Math.max(1, remoteCourse.syllabus?.length || 1),
          syllabus: remoteCourse.syllabus || [],
          audience: remoteCourse.audience || "Profissionais e empresas.",
          objective: remoteCourse.objective || "Capacitar o participante conforme o conteúdo programático."
        });
      }
    });
    renderCourses(courses);
    renderCourseSelects();
  } catch {
    apiOnline = false;
  }
}

function applyStudentDashboard(data) {
  portalData.student = data;
  const metrics = data.metrics || {};
  const firstAction = data.nextActions?.[0];
  if (data.profile?.name) setTopbarIdentity("#page-student .app-topbar h1", `Olá, ${data.profile.name}`);
  const activeCourse = data.courses?.find((course) => course.status === "Em andamento") || data.courses?.[0];
  const availableCertificate = data.certificates?.[0] || null;
  setText("studentEnrolledMetric", metrics.enrolledCourses ?? 2);
  setText("completedCoursesMetric", metrics.completedCourses ?? 0);
  setText("studentCertificatesMetric", metrics.certificates ?? 0);
  setText("averageProgressMetric", `${metrics.averageProgress ?? 0}%`);
  setText("studentNextActionTitle", firstAction?.title || "Continuar NR 35");
  setText("studentNextActionText", firstAction?.description || "Retome o curso de onde parou.");
  setText("studentSupportSla", data.support?.sla || "Até 1 dia útil");
  setText("studentApiStatus", "API sincronizada");

  studentProgress = Number(activeCourse?.progress) || 0;
  lastQuizGrade = availableCertificate?.grade ?? lastQuizGrade;
  certificateUnlocked = Boolean(availableCertificate);
  updateStudentState();
  updateCertificateView(availableCertificate, activeCourse, data.profile);
  syncStudentLibraryView();
}

function applyCompanyDashboard(data) {
  portalData.company = data;
  const metrics = data.metrics || {};
  if (data.company?.name) setTopbarIdentity("#page-company-dashboard .app-topbar h1", data.company.name);
  setText("activeEmployeesMetric", metrics.activeEmployees ?? 128);
  setText("companyCoursesMetric", metrics.coursesInProgress ?? 32);
  setText("companyCertificatesMetric", metrics.certificates ?? 96);
  setText("companyExpiringMetric", metrics.expiringSoon ?? 18);
  setText("companyComplianceRate", `${metrics.complianceRate ?? 78}%`);
  setText("companySeatsAvailable", metrics.seatsAvailable ?? 42);
  setText("companyAlertTitle", `${metrics.expiringSoon ?? 18} vencimentos`);
  setText("companyAlertText", data.alerts?.[0]?.title || "Certificados próximos do prazo de reciclagem.");

  if (Array.isArray(data.employees)) {
    employees = [...data.employees];
    writeStorage("fortixsegEmployees", employees);
    renderEmployees();
  }
  const seatBody = document.getElementById("companySeatBalanceBody");
  if (seatBody) seatBody.innerHTML = buildCompanySeatRows();
  const progressBody = document.getElementById("companyProgressBody");
  if (progressBody) progressBody.innerHTML = buildCompanyProgressRows();
  const certificateBody = document.getElementById("companyCertificateBody");
  if (certificateBody) certificateBody.innerHTML = buildCompanyCertificateRows();
}

function applyAdminDashboard(data) {
  portalData.admin = data;
  const metrics = data.metrics || {};
  setText("adminStudentsMetric", formatNumber(metrics.students ?? 25000));
  setText("adminCompaniesMetric", formatNumber(metrics.companies ?? 1000));
  setText("adminCoursesMetric", formatNumber(metrics.courses ?? 50));
  setText("adminCertificatesMetric", formatNumber(metrics.certificates ?? 150000));

  updateApiStatus("apiServerStatus", data.apiStatus?.server === "online" ? "Online" : "Indisponível", data.apiStatus?.server === "online");
  updateApiStatus("apiOpenAiStatus", data.apiStatus?.openai === "configurado" ? "Configurada" : "Pendente", data.apiStatus?.openai === "configurado");
  updateApiStatus("apiMercadoPagoStatus", data.apiStatus?.mercadoPago === "configurado" ? "Configurado" : "Pendente", data.apiStatus?.mercadoPago === "configurado");
  updateApiStatus("apiDatabaseStatus", data.apiStatus?.database === "json-local" ? "JSON local" : "Conectado", data.apiStatus?.database !== "demo-local");

  const studentsBody = document.getElementById("adminStudentsTableBody");
  if (studentsBody && Array.isArray(data.recentStudents)) {
    studentsBody.innerHTML = data.recentStudents.map((student) => `
      <tr><td>${escapeHtml(student.name)}</td><td>${escapeHtml(student.course)}</td><td><span class="table-status ${student.status === "Concluído" ? "complete" : "progress"}">${escapeHtml(student.status)}</span></td><td>${escapeHtml(student.date)}</td></tr>
    `).join("");
  }

  const paymentsBody = document.getElementById("adminPaymentsTableBody");
  if (paymentsBody && Array.isArray(data.recentPayments)) {
    paymentsBody.innerHTML = data.recentPayments.map((payment) => `
      <tr><td>${escapeHtml(payment.client)}</td><td>${escapeHtml(payment.course)}</td><td>${formatCurrency(payment.value)}</td><td><span class="table-status ${payment.status === "Aprovado" ? "complete" : "pending"}">${escapeHtml(payment.status)}</span></td></tr>
    `).join("");
  }
}

function updateApiStatus(id, text, isOk) {
  const element = document.getElementById(id);
  if (!element) return;
  element.textContent = text;
  element.classList.toggle("ok", isOk);
  element.classList.toggle("pending", !isOk);
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function initPortalWorkspaces() {
  if (portalInitialized) return;
  portalInitialized = true;

  const configs = {
    student: {
      pageId: "page-student",
      eyebrow: "Área do aluno",
      views: [
        ["dashboard", "Meu painel", "Meu painel"],
        ["courses", "Meus cursos", "Meus cursos"],
        ["lessons", "Aulas", "Biblioteca de aulas"],
        ["assessments", "Avaliações", "Avaliações"],
        ["certificates", "Meus certificados", "Meus certificados"],
        ["profile", "Meus dados", "Meus dados"],
        ["support", "Suporte", "Suporte"]
      ]
    },
    company: {
      pageId: "page-company-dashboard",
      eyebrow: "Portal corporativo",
      views: [
        ["dashboard", "Dashboard", "Dashboard corporativo"],
        ["employees", "Colaboradores", "Colaboradores"],
        ["purchase", "Comprar cursos", "Comprar cursos"],
        ["progress", "Cursos em andamento", "Cursos em andamento"],
        ["certificates", "Certificados", "Certificados da equipe"],
        ["reports", "Relatórios", "Relatórios"],
        ["expirations", "Vencimentos", "Vencimentos"],
        ["settings", "Configurações", "Configurações"]
      ]
    },
    admin: {
      pageId: "page-admin",
      eyebrow: "Painel administrativo",
      views: [
        ["dashboard", "Dashboard", "Visão geral da plataforma"],
        ["courses", "Cursos", "Gestão de cursos"],
        ["students", "Alunos", "Gestão de alunos"],
        ["companies", "Empresas", "Gestão de empresas"],
        ["certificates", "Certificados", "Certificados emitidos"],
        ["payments", "Pagamentos", "Pagamentos"],
        ["reports", "Relatórios", "Relatórios administrativos"],
        ["settings", "Configurações", "Configurações"]
      ]
    }
  };

  Object.entries(configs).forEach(([portal, config]) => setupPortalWorkspace(portal, config));
  document.addEventListener("click", handlePortalClick);
  document.addEventListener("submit", handlePortalSubmit);
  document.addEventListener("input", handlePortalInput);
  renderCompanyEmployeeDirectory();
}

function setupPortalWorkspace(portal, config) {
  const page = document.getElementById(config.pageId);
  const main = page?.querySelector(".app-main");
  const topbar = main?.querySelector(".app-topbar");
  if (!page || !main || !topbar || main.querySelector(`[data-portal-view="${portal}:dashboard"]`)) return;

  const dashboardView = document.createElement("div");
  dashboardView.className = "portal-view active";
  dashboardView.dataset.portalView = `${portal}:dashboard`;
  [...main.children].filter((child) => child !== topbar).forEach((child) => dashboardView.appendChild(child));
  main.appendChild(dashboardView);

  config.views.slice(1).forEach(([key, , title]) => {
    main.insertAdjacentHTML("beforeend", portalViewTemplate(portal, key, title));
  });

  const buttons = [...page.querySelectorAll(".app-sidebar nav > button")];
  config.views.forEach(([key, , title], index) => {
    const button = buttons[index];
    if (!button) return;
    button.removeAttribute("data-show-certificate");
    button.dataset.portal = portal;
    button.dataset.portalTarget = key;
    button.dataset.portalTitle = title;
  });

  topbar.dataset.portalEyebrow = config.eyebrow;
}

function portalViewTemplate(portal, key, title) {
  const templates = {
    student: studentPortalTemplate,
    company: companyPortalTemplate,
    admin: adminPortalTemplate
  };
  return `<div class="portal-view" data-portal-view="${portal}:${key}">${templates[portal](key, title)}</div>`;
}

function portalHeading(kicker, title, description, action = "") {
  return `
    <div class="portal-view-heading">
      <div><span>${escapeHtml(kicker)}</span><h2>${escapeHtml(title)}</h2><p>${escapeHtml(description)}</p></div>
      ${action}
    </div>
  `;
}

function studentPortalTemplate(key, title) {
  if (key === "courses") return `
    ${portalHeading("Formação em andamento", title, "Acompanhe progresso, aulas e materiais de cada treinamento.")}
    <div class="portal-card-grid">
      ${courses.slice(0, 2).map((course, index) => `
        <article class="portal-course-card">
          <div class="portal-course-cover" style="--course-bg:${course.accent}"><span>${escapeHtml(course.code)}</span></div>
          <div><span class="course-status ${index ? "complete" : ""}">${index ? "Concluído" : "Em andamento"}</span><h3>${escapeHtml(course.title)}</h3><p>${course.hours} horas · Online · ${course.lessons} aulas</p><div class="progress-track"><i style="width:${index ? 100 : studentProgress}%"></i></div><button class="button ${index ? "button-secondary" : "button-primary"}" type="button" data-portal-action="${index ? "certificate" : "continue-course"}">${index ? "Ver certificado" : "Continuar curso"}</button></div>
        </article>
      `).join("")}
    </div>`;

  if (key === "lessons") return `
    ${portalHeading("Central de conteúdo", title, "Vídeos, apostilas e materiais complementares organizados por módulo.")}
    <div class="learning-library">
      <aside class="resource-list" aria-label="Materiais do curso">
        <button class="active" type="button" data-portal-resource="video" data-resource-title="Introdução ao trabalho em altura"><span>Vídeo</span><strong>01. Introdução e conceitos</strong><small>12 min · concluído</small></button>
        <button type="button" data-portal-resource="video" data-resource-title="Análise de risco"><span>Vídeo</span><strong>02. Análise de risco</strong><small>18 min · concluído</small></button>
        <button type="button" data-portal-resource="video" data-resource-title="Equipamentos de proteção"><span>Vídeo</span><strong>03. Equipamentos de proteção</strong><small>22 min · em andamento</small></button>
        <button type="button" data-portal-resource="pdf" data-resource-title="Apostila NR 35"><span>PDF</span><strong>Apostila demonstrativa NR 35</strong><small>Material para consulta</small></button>
      </aside>
      <section class="media-viewer" id="studentMediaViewer">
        <div class="media-viewer-header"><span>Vídeo da aula</span><h3>Introdução ao trabalho em altura</h3></div>
        <div class="video-stage"><button type="button" data-portal-action="play-demo" aria-label="Reproduzir demonstração">▶</button><strong>Player preparado para vídeo protegido</strong><small>Integração futura: storage privado e URL assinada</small></div>
      </section>
    </div>`;

  if (key === "assessments") return `
    ${portalHeading("Desempenho", title, "Consulte tentativas, notas e avaliações disponíveis.")}
    <div class="portal-card-grid compact">
      <article class="portal-data-card"><span>NR 35</span><h3>Avaliação final</h3><p>Nota mínima: 70% · 3 tentativas</p><strong class="status-copy">Disponível</strong><button class="button button-primary" type="button" data-portal-action="open-quiz">Fazer avaliação</button></article>
      <article class="portal-data-card"><span>Uso Correto de EPIs</span><h3>Avaliação concluída</h3><p>Melhor nota registrada</p><strong class="grade-copy">${lastQuizGrade}%</strong><button class="button button-secondary" type="button" data-portal-action="certificate">Ver certificado</button></article>
    </div>`;

  if (key === "certificates") return `
    ${portalHeading("Documentos", title, "Certificados liberados após conclusão e aprovação.")}
    <div class="portal-list-card"><div><span class="document-mark">PDF</span><div><strong>Uso Correto de EPIs</strong><small>4 horas · Código FS-EPI-2026-000122</small></div></div><button class="button button-secondary" type="button" data-portal-action="certificate">Visualizar</button></div>
    <div class="portal-list-card locked"><div><span class="document-mark">NR</span><div><strong>NR 35 - Trabalho em Altura</strong><small>Certificado liberado após aprovação</small></div></div><span class="table-status pending">Pendente</span></div>`;

  if (key === "profile") return `
    ${portalHeading("Conta", title, "Mantenha seus dados de contato atualizados.")}
    <form class="portal-form" id="studentProfileForm"><div class="form-grid"><label class="field full"><span>Nome completo</span><input name="name" value="João da Silva" required></label><label class="field"><span>CPF</span><input name="cpf" value="000.000.000-00" required></label><label class="field"><span>Telefone</span><input name="phone" value="(11) 99999-0000" required></label><label class="field full"><span>E-mail</span><input name="email" type="email" value="aluno@teste.com" required></label></div><button class="button button-primary" type="submit">Salvar alterações</button></form>`;

  return `
    ${portalHeading("Atendimento", title, "Envie sua dúvida para a equipe de suporte FortixSeg.")}
    <form class="portal-form" id="studentSupportForm"><div class="form-grid"><label class="field full"><span>Assunto</span><select name="subject"><option>Acesso ao curso</option><option>Conteúdo e aulas</option><option>Avaliação</option><option>Certificado</option></select></label><label class="field full"><span>Mensagem</span><textarea name="message" rows="6" required></textarea></label></div><button class="button button-primary" type="submit">Abrir solicitação</button></form>`;
}

function companyPortalTemplate(key, title) {
  if (key === "employees") return `
    ${portalHeading("Gestão de pessoas", title, "Cadastre, filtre e acompanhe os colaboradores vinculados.", '<button class="button button-primary" type="button" data-portal-action="add-employee">Adicionar colaborador</button>')}
    <div class="portal-toolbar"><label class="search-field"><input id="companyEmployeeSearch" type="search" placeholder="Buscar colaborador ou curso"></label><span id="companyEmployeeCount">${employees.length} colaboradores</span></div>
    <div class="dashboard-section portal-table-section"><div class="table-wrap"><table><thead><tr><th>Nome</th><th>Curso</th><th>Progresso</th><th>Status</th><th>Certificado</th></tr></thead><tbody id="companyEmployeeDirectoryBody"></tbody></table></div></div>`;

  if (key === "purchase") return `
    ${portalHeading("Licenças corporativas", title, "Escolha o treinamento e adicione vagas ao carrinho da empresa.")}
    <form class="portal-form" id="companyPortalBulkForm"><div class="form-grid"><label class="field full"><span>Curso</span><select id="companyPortalBulkCourse" required>${courses.map((course) => `<option value="${course.id}">${escapeHtml(course.title)} · ${formatCurrency(course.price)}</option>`).join("")}</select></label><label class="field"><span>Quantidade de vagas</span><input id="companyPortalBulkQuantity" type="number" min="1" max="500" value="10" required></label><label class="field"><span>Centro de custo</span><input name="costCenter" placeholder="Ex.: Operações"></label></div><div class="purchase-summary"><span>Estimativa</span><strong id="companyBulkEstimate">${formatCurrency(courses[0].price * 10)}</strong></div><button class="button button-primary" type="submit">Adicionar ao carrinho corporativo</button></form><div class="dashboard-section portal-table-section"><div class="table-wrap"><table><thead><tr><th>Curso</th><th>Compradas</th><th>Alocadas</th><th>Disponíveis</th></tr></thead><tbody id="companySeatBalanceBody">${buildCompanySeatRows()}</tbody></table></div></div>`;

  if (key === "progress") return `
    ${portalHeading("Acompanhamento", title, "Monitore matrículas e identifique quem precisa de apoio.")}
    <div class="dashboard-section portal-table-section"><div class="table-wrap"><table><thead><tr><th>Colaborador</th><th>Curso</th><th>Progresso</th><th>Status</th><th>Último acesso</th></tr></thead><tbody id="companyProgressBody">${buildCompanyProgressRows()}</tbody></table></div></div>`;

  if (key === "certificates") return `
    ${portalHeading("Documentos da equipe", title, "Consulte certificados emitidos e códigos de validação.")}
    <div class="dashboard-section portal-table-section"><div class="table-wrap"><table><thead><tr><th>Colaborador</th><th>Curso</th><th>Emissão</th><th>Código</th><th>Ação</th></tr></thead><tbody id="companyCertificateBody">${buildCompanyCertificateRows()}</tbody></table></div></div>`;

  if (key === "reports") return `
    ${portalHeading("Indicadores", title, "Gere arquivos para conferência interna e auditorias.")}
    <div class="portal-card-grid compact"><article class="portal-data-card"><span>Relatório operacional</span><h3>Colaboradores e progresso</h3><p>Exportação CSV com matrícula, curso e situação.</p><button class="button button-primary" type="button" data-portal-action="export-company-report">Exportar CSV</button></article><article class="portal-data-card"><span>Resumo executivo</span><h3>Conformidade da equipe</h3><p>78% dentro do ciclo esperado · 18 vencimentos próximos.</p><button class="button button-secondary" type="button" data-portal-action="print-report">Imprimir resumo</button></article></div>`;

  if (key === "expirations") return `
    ${portalHeading("Reciclagens", title, "Antecipe vencimentos e organize novas turmas.")}
    <div class="dashboard-section portal-table-section"><div class="table-wrap"><table><thead><tr><th>Colaborador</th><th>Curso</th><th>Vencimento</th><th>Prazo</th><th>Ação</th></tr></thead><tbody><tr><td>Rafael Gomes</td><td>NR 35</td><td>18/07/2026</td><td><span class="table-status pending">13 dias</span></td><td><button class="certificate-link" type="button" data-portal-action="renew-course" data-course-id="nr35">Reciclar</button></td></tr><tr><td>Luciana Prado</td><td>NR 10</td><td>02/08/2026</td><td><span class="table-status progress">28 dias</span></td><td><button class="certificate-link" type="button" data-portal-action="renew-course" data-course-id="nr10">Reciclar</button></td></tr></tbody></table></div></div>`;

  return `
    ${portalHeading("Conta corporativa", title, "Configure alertas e preferências operacionais.")}
    <form class="portal-form" id="companySettingsForm"><div class="form-grid"><label class="field full"><span>Razão social</span><input name="company" value="Empresa Exemplo Ltda." required></label><label class="field"><span>E-mail responsável</span><input name="email" type="email" value="empresa@teste.com" required></label><label class="field"><span>Alerta de vencimento</span><select name="expiryAlert"><option>60 dias antes</option><option>30 dias antes</option><option>15 dias antes</option></select></label><label class="field full"><span>Receber resumo semanal</span><select name="weekly"><option>Sim</option><option>Não</option></select></label></div><button class="button button-primary" type="submit">Salvar configurações</button></form>`;
}

function adminPortalTemplate(key, title) {
  if (key === "courses") return adminCourseManagerTemplate(title);
  if (key === "students") return `${portalHeading("Usuários", title, "Acompanhe cadastros, cursos e situação acadêmica.")}<div class="dashboard-section portal-table-section"><div class="table-wrap"><table><thead><tr><th>Aluno</th><th>Curso</th><th>Status</th><th>Último acesso</th></tr></thead><tbody><tr><td>Mariana Costa</td><td>NR 35</td><td><span class="table-status progress">Em andamento</span></td><td>Hoje</td></tr><tr><td>Paulo Mendes</td><td>NR 10</td><td><span class="table-status complete">Concluído</span></td><td>03/07/2026</td></tr></tbody></table></div></div>`;
  if (key === "companies") return `${portalHeading("Contas B2B", title, "Visualize empresas, colaboradores e consumo de licenças.")}<div class="portal-card-grid compact"><article class="portal-data-card"><span>Empresa Exemplo Ltda.</span><h3>128 colaboradores</h3><p>42 vagas disponíveis · 78% de conformidade</p><strong class="status-copy">Ativa</strong></article><article class="portal-data-card"><span>Atlas Serviços</span><h3>76 colaboradores</h3><p>18 vagas disponíveis · 84% de conformidade</p><strong class="status-copy">Ativa</strong></article></div>`;
  if (key === "certificates") return `${portalHeading("Rastreabilidade", title, "Consulte documentos emitidos e validações públicas.")}<div class="portal-card-grid compact"><article class="portal-data-card"><span>Total emitido</span><h3>150.000 certificados</h3><p>Códigos únicos registrados na demonstração.</p><button class="button button-secondary" type="button" data-nav="certificates">Abrir validador</button></article><article class="portal-data-card"><span>Hoje</span><h3>184 emissões</h3><p>12 aguardando processamento.</p><strong class="status-copy">Operação normal</strong></article></div>`;
  if (key === "payments") return `${portalHeading("Financeiro", title, "Acompanhe transações e o estado da integração.")}<div class="dashboard-section portal-table-section"><div class="table-wrap"><table><thead><tr><th>Cliente</th><th>Pedido</th><th>Valor</th><th>Status</th></tr></thead><tbody><tr><td>Juliana Rocha</td><td>NR 35</td><td>R$ 149,90</td><td><span class="table-status complete">Aprovado</span></td></tr><tr><td>Atlas Serviços</td><td>NR 12 - 20 vagas</td><td>R$ 3.598,00</td><td><span class="table-status complete">Aprovado</span></td></tr><tr><td>Eduardo Nunes</td><td>NR 10</td><td>R$ 249,90</td><td><span class="table-status pending">Pendente</span></td></tr></tbody></table></div></div>`;
  if (key === "reports") return `${portalHeading("Dados", title, "Exporte uma visão consolidada da operação.")}<div class="portal-card-grid compact"><article class="portal-data-card"><span>Operação</span><h3>Resumo da plataforma</h3><p>Alunos, empresas, certificados e pagamentos.</p><button class="button button-primary" type="button" data-portal-action="export-admin-report">Exportar CSV</button></article><article class="portal-data-card"><span>Integrações</span><h3>Saúde da API</h3><p>Servidor online; OpenAI e Mercado Pago dependem das credenciais.</p><button class="button button-secondary" type="button" data-portal-action="refresh-admin">Atualizar status</button></article></div>`;
  return `${portalHeading("Sistema", title, "Preferências visuais e operacionais da administração.")}<form class="portal-form" id="adminSettingsForm"><div class="form-grid"><label class="field full"><span>Nome da plataforma</span><input name="brand" value="FortixSeg" required></label><label class="field"><span>E-mail de suporte</span><input name="supportEmail" type="email" value="fortixseg@gmail.com" required></label><label class="field"><span>Nota mínima</span><input name="minimumGrade" type="number" min="0" max="100" value="70" required></label><label class="field full"><span>Modo de manutenção</span><select name="maintenance"><option>Desativado</option><option>Ativado</option></select></label></div><button class="button button-primary" type="submit">Salvar configurações</button></form>`;
}

function adminCourseManagerTemplate(title) {
  return `
    ${portalHeading("Catálogo e conteúdo", title, "Crie cursos completos, altere preços e gerencie PDFs e vídeos.", '<button class="button button-primary" type="button" data-portal-action="admin-new-course">Novo curso</button>')}
    <div class="admin-course-manager">
      <section class="admin-course-list-panel">
        <div class="portal-toolbar admin-course-toolbar">
          <label class="search-field"><input id="adminCourseSearch" type="search" placeholder="Buscar curso, código ou categoria"></label>
          <select id="adminCourseStatusFilter" aria-label="Filtrar por status"><option value="all">Todos</option><option value="published">Publicados</option><option value="draft">Rascunhos</option></select>
        </div>
        <div class="admin-course-list" id="adminCourseList"><div class="portal-empty-state">Carregando catálogo...</div></div>
      </section>

      <section class="admin-course-editor hidden" id="adminCourseEditor">
        <form id="adminCourseForm">
          <div class="admin-editor-heading"><div><span>Editor de curso</span><h3 id="adminCourseEditorTitle">Novo curso</h3></div><button class="icon-button admin-editor-close" type="button" data-portal-action="admin-cancel-course" aria-label="Fechar editor">×</button></div>
          <div class="form-grid">
            <label class="field full"><span>Nome do curso</span><input name="title" maxlength="180" required></label>
            <label class="field"><span>Código</span><input name="code" maxlength="30" placeholder="Ex.: NR 35" required></label>
            <label class="field"><span>Categoria</span><input name="category" maxlength="80" placeholder="Ex.: Trabalho em altura" required></label>
            <label class="field"><span>Carga horária</span><input name="hours" type="number" min="1" max="500" value="8" required></label>
            <label class="field"><span>Preço</span><input name="price" type="number" min="0" step="0.01" value="149.90" required></label>
            <label class="field"><span>Status</span><select name="status"><option value="published">Publicado</option><option value="draft">Rascunho</option></select></label>
            <label class="field"><span>Quantidade de aulas</span><input name="lessons" type="number" min="1" max="200" value="7" required></label>
            <label class="field"><span>Nota mínima (%)</span><input name="minimumGrade" type="number" min="0" max="100" value="70" required></label>
            <label class="field"><span>Tentativas</span><input name="attempts" type="number" min="1" max="10" value="3" required></label>
            <label class="field full"><span>Público-alvo</span><textarea name="audience" rows="3" required></textarea></label>
            <label class="field full"><span>Objetivo</span><textarea name="objective" rows="3" required></textarea></label>
            <label class="field full"><span>Conteúdo programático</span><textarea name="syllabus" rows="8" placeholder="Digite um tópico por linha" required></textarea><small>Um tópico por linha. Eles serão exibidos na página do curso.</small></label>
          </div>

          <div class="admin-resource-manager">
            <div><span>Biblioteca do curso</span><h4>PDFs e vídeos</h4><p>PDF, MP4, WebM ou OGV. Nesta demonstração, cada arquivo pode ter até 12 MB.</p></div>
            <label class="admin-upload-field"><input id="adminCourseFiles" type="file" accept="application/pdf,video/mp4,video/webm,video/ogg" multiple><span>Selecionar arquivos</span></label>
            <div class="admin-file-selection" id="adminCourseFileSelection" aria-live="polite"></div>
            <div class="admin-resource-list" id="adminCourseResourceList"><p>Nenhum material adicionado.</p></div>
          </div>

          <div class="admin-editor-actions">
            <button class="button button-primary" type="submit" id="adminCourseSaveButton">Salvar curso</button>
            <button class="button button-secondary" type="button" data-portal-action="admin-cancel-course">Cancelar</button>
            <button class="button button-danger hidden" type="button" id="adminCourseDeleteButton" data-portal-action="admin-delete-course">Excluir curso</button>
            <span id="adminCourseSaveStatus" aria-live="polite"></span>
          </div>
        </form>
      </section>
    </div>
  `;
}

function activatePortalView(button) {
  const portal = button.dataset.portal;
  const key = button.dataset.portalTarget;
  const page = button.closest(".app-page");
  if (!portal || !key || !page) return;

  page.querySelectorAll(".portal-view").forEach((view) => {
    view.classList.toggle("active", view.dataset.portalView === `${portal}:${key}`);
  });
  page.querySelectorAll(".app-sidebar nav > button").forEach((item) => item.classList.toggle("active", item === button));

  const topbar = page.querySelector(".app-topbar");
  const title = topbar?.querySelector("h1");
  const eyebrow = topbar?.querySelector("div > span");
  if (title) title.textContent = button.dataset.portalTitle || button.textContent.trim();
  if (eyebrow) eyebrow.textContent = topbar.dataset.portalEyebrow || "Portal FortixSeg";

  if (portal === "company" && key === "employees") renderCompanyEmployeeDirectory();
  if (portal === "admin" && key === "courses") loadAdminCourseCatalog();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function handlePortalClick(event) {
  const portalButton = event.target.closest("[data-portal-target]");
  if (portalButton) {
    activatePortalView(portalButton);
    return;
  }

  const resourceButton = event.target.closest("[data-portal-resource]");
  if (resourceButton) {
    void showStudentResource(resourceButton);
    return;
  }

  const actionButton = event.target.closest("[data-portal-action]");
  if (!actionButton) return;
  const action = actionButton.dataset.portalAction;

  if (action === "continue-course") navigate("lesson");
  if (action === "certificate") navigate("certificate-view");
  if (action === "add-employee") openModal("employeeModal");
  if (action === "play-demo") {
    actionButton.textContent = "❚❚";
    showToast("Player demonstrativo iniciado. O vídeo real será entregue por storage protegido.");
  }
  if (action === "open-quiz") {
    navigate("lesson");
    setTimeout(() => {
      const panel = document.getElementById("quizPanel");
      panel?.classList.remove("hidden");
      panel?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  }
  if (action === "export-company-report") exportCompanyReport();
  if (action === "export-admin-report") exportAdminReport();
  if (action === "print-report") window.print();
  if (action === "renew-course") {
    addToCart(actionButton.dataset.courseId || "nr35", 1, true);
    openCart();
  }
  if (action === "admin-new-course") openAdminCourseEditor();
  if (action === "admin-edit-course") openAdminCourseEditor(actionButton.dataset.courseId);
  if (action === "admin-cancel-course") closeAdminCourseEditor();
  if (action === "admin-delete-course") deleteAdminCourse();
  if (action === "admin-delete-resource") deleteAdminCourseResource(actionButton.dataset.courseId, actionButton.dataset.resourceId);
  if (action === "refresh-admin") {
    hydratePortalData("admin");
    showToast("Status das integrações atualizado.");
  }
}

function syncStudentLibraryView() {
  const resourceList = document.querySelector('[data-portal-view="student:lessons"] .resource-list');
  if (!resourceList || !Array.isArray(portalData.student?.library) || !portalData.student.library.length) return;
  resourceList.innerHTML = portalData.student.library.map((resource, index) => `
    <button ${index === 0 ? 'class="active"' : ""} type="button"
      data-portal-resource="${escapeHtml(resource.type || "pdf")}"
      data-resource-title="${escapeHtml(resource.title || resource.name || "Material do curso")}"
      data-resource-url="${escapeHtml(resource.accessUrl || resource.url || "")}">
      <span>${resource.type === "video" ? "Vídeo" : "PDF"}</span>
      <strong>${escapeHtml(resource.title || resource.name || "Material do curso")}</strong>
      <small>${escapeHtml(resource.status || "Disponível")}</small>
    </button>
  `).join("");
}

async function showStudentResource(button) {
  document.querySelectorAll(".resource-list button").forEach((item) => item.classList.toggle("active", item === button));
  const viewer = document.getElementById("studentMediaViewer");
  if (!viewer) return;
  const title = button.dataset.resourceTitle || "Material do curso";
  let accessUrl = button.dataset.resourceUrl || "";

  try {
    if (accessUrl.startsWith("/api/resources/")) {
      const data = await apiRequest(accessUrl);
      accessUrl = data.resource?.accessUrl || "";
    }
  } catch (error) {
    showToast(error.message || "Não foi possível abrir este material.");
    return;
  }

  if (button.dataset.portalResource === "pdf") {
    viewer.innerHTML = `
      <div class="media-viewer-header"><span>Material PDF</span><h3>${escapeHtml(title)}</h3></div>
      <iframe class="pdf-viewer" src="${escapeHtml((accessUrl || "assets/apostila-nr35-demonstrativa.pdf"))}#toolbar=1" title="${escapeHtml(title)}"></iframe>
      <a class="button button-secondary media-download" href="${escapeHtml(accessUrl || "assets/apostila-nr35-demonstrativa.pdf")}" target="_blank" rel="noopener">Abrir PDF em nova guia</a>
    `;
    return;
  }

  viewer.innerHTML = `
    <div class="media-viewer-header"><span>Vídeo da aula</span><h3>${escapeHtml(title)}</h3></div>
    <div class="video-stage"><button type="button" data-portal-action="play-demo" aria-label="Reproduzir demonstração">▶</button><strong>${accessUrl ? "Abrir vídeo protegido" : "Player preparado para vídeo protegido"}</strong><small>${accessUrl ? "O link é assinado e expira automaticamente." : "Integração futura: storage privado e URL assinada"}</small></div>
    ${accessUrl ? `<a class="button button-secondary media-download" href="${escapeHtml(accessUrl)}" target="_blank" rel="noopener">Abrir vídeo</a>` : ""}
  `;
}

function handlePortalSubmit(event) {
  const form = event.target;
  if (form.id === "adminCourseForm") {
    event.preventDefault();
    saveAdminCourse(form);
    return;
  }
  if (form.id === "studentProfileForm") {
    event.preventDefault();
    writeStorage("fortixsegStudentProfile", Object.fromEntries(new FormData(form).entries()));
    showToast("Dados do aluno atualizados.");
  }
  if (form.id === "studentSupportForm") {
    event.preventDefault();
    const tickets = readStorage("fortixsegSupportTickets", []);
    tickets.push({ ...Object.fromEntries(new FormData(form).entries()), createdAt: new Date().toISOString() });
    writeStorage("fortixsegSupportTickets", tickets);
    form.reset();
    showToast("Solicitação de suporte registrada.");
  }
  if (form.id === "companyPortalBulkForm") {
    event.preventDefault();
    addToCart(document.getElementById("companyPortalBulkCourse").value, Number(document.getElementById("companyPortalBulkQuantity").value), true);
    openCart();
  }
  if (form.id === "companySettingsForm") {
    event.preventDefault();
    writeStorage("fortixsegCompanySettings", Object.fromEntries(new FormData(form).entries()));
    showToast("Configurações da empresa salvas.");
  }
  if (form.id === "adminSettingsForm") {
    event.preventDefault();
    writeStorage("fortixsegAdminSettings", Object.fromEntries(new FormData(form).entries()));
    showToast("Configurações administrativas salvas.");
  }
}

function handlePortalInput(event) {
  if (["adminCourseSearch", "adminCourseStatusFilter"].includes(event.target.id)) {
    renderAdminCourseList(
      document.getElementById("adminCourseSearch")?.value || "",
      document.getElementById("adminCourseStatusFilter")?.value || "all"
    );
  }
  if (event.target.id === "adminCourseFiles") {
    renderSelectedAdminFiles(event.target.files);
  }
  if (event.target.id === "companyEmployeeSearch") {
    renderCompanyEmployeeDirectory(event.target.value);
  }
  if (["companyPortalBulkCourse", "companyPortalBulkQuantity"].includes(event.target.id)) {
    const course = courses.find((item) => item.id === document.getElementById("companyPortalBulkCourse")?.value);
    const quantity = Number(document.getElementById("companyPortalBulkQuantity")?.value || 0);
    setText("companyBulkEstimate", formatCurrency((course?.price || 0) * quantity));
  }
}

async function loadAdminCourseCatalog() {
  const list = document.getElementById("adminCourseList");
  if (!list) return;
  list.innerHTML = '<div class="portal-empty-state">Carregando catálogo...</div>';

  try {
    const data = await apiRequest("/api/admin/courses");
    adminCourseCatalog = data.courses || [];
    renderAdminCourseList();
  } catch (error) {
    if (error.statusCode === 401 || error.statusCode === 403) {
      showToast(error.message || "Acesso administrativo indisponível.");
      adminCourseCatalog = [];
      renderAdminCourseList();
      return;
    }
    apiOnline = false;
    adminCourseCatalog = courses.map((course) => ({
      ...course,
      status: "published",
      minimumGrade: 70,
      attempts: 3,
      resources: []
    }));
    renderAdminCourseList();
    showToast("Servidor administrativo indisponível. O catálogo está em modo de consulta.");
  }
}

function renderAdminCourseList(query = "", status = "all") {
  const list = document.getElementById("adminCourseList");
  if (!list) return;
  const normalizedQuery = normalizeText(query);
  const filtered = adminCourseCatalog.filter((course) => {
    const matchesQuery = !normalizedQuery || normalizeText(`${course.code} ${course.title} ${course.category}`).includes(normalizedQuery);
    return matchesQuery && (status === "all" || course.status === status);
  });

  list.innerHTML = filtered.map((course) => {
    const topicCount = course.syllabus?.length || 0;
    const resourceCount = course.resources?.length || 0;
    const statusLabel = course.status === "draft" ? "Rascunho" : "Publicado";
    return `
      <article class="admin-course-item">
        <div class="admin-course-item-main">
          <span class="course-status ${course.status === "draft" ? "draft" : "published"}">${statusLabel}</span>
          <h4>${escapeHtml(course.title)}</h4>
          <p>${escapeHtml(course.code)} · ${course.hours}h · ${topicCount} tópicos · ${resourceCount} materiais</p>
        </div>
        <div class="admin-course-item-side">
          <strong>${formatCurrency(course.price)}</strong>
          <button class="button button-secondary" type="button" data-portal-action="admin-edit-course" data-course-id="${escapeHtml(course.id)}">Editar</button>
        </div>
      </article>
    `;
  }).join("") || '<div class="portal-empty-state"><strong>Nenhum curso encontrado.</strong><span>Ajuste os filtros ou cadastre um novo treinamento.</span></div>';
}

function openAdminCourseEditor(courseId = "") {
  const editor = document.getElementById("adminCourseEditor");
  const form = document.getElementById("adminCourseForm");
  if (!editor || !form) return;
  const course = adminCourseCatalog.find((item) => item.id === courseId);

  form.reset();
  form.dataset.courseId = course?.id || "";
  setAdminFormValue(form, "title", course?.title || "");
  setAdminFormValue(form, "code", course?.code || "");
  setAdminFormValue(form, "category", course?.category || "Segurança do Trabalho");
  setAdminFormValue(form, "hours", course?.hours ?? 8);
  setAdminFormValue(form, "price", course?.price ?? 149.9);
  setAdminFormValue(form, "status", course?.status || "published");
  setAdminFormValue(form, "lessons", course?.lessons ?? 7);
  setAdminFormValue(form, "minimumGrade", course?.minimumGrade ?? 70);
  setAdminFormValue(form, "attempts", course?.attempts ?? 3);
  setAdminFormValue(form, "audience", course?.audience || "");
  setAdminFormValue(form, "objective", course?.objective || "");
  setAdminFormValue(form, "syllabus", (course?.syllabus || []).join("\n"));

  setText("adminCourseEditorTitle", course ? `Editar ${course.code}` : "Novo curso");
  setText("adminCourseSaveButton", course ? "Salvar alterações" : "Criar curso");
  setText("adminCourseSaveStatus", "");
  document.getElementById("adminCourseDeleteButton")?.classList.toggle("hidden", !course);
  renderAdminCourseResources(course);
  renderSelectedAdminFiles([]);
  editor.classList.remove("hidden");
  editor.scrollIntoView({ behavior: "smooth", block: "start" });
  setTimeout(() => form.elements.namedItem("title")?.focus(), 250);
}

function closeAdminCourseEditor() {
  const editor = document.getElementById("adminCourseEditor");
  const form = document.getElementById("adminCourseForm");
  editor?.classList.add("hidden");
  form?.reset();
  if (form) form.dataset.courseId = "";
}

function setAdminFormValue(form, name, value) {
  const field = form.elements.namedItem(name);
  if (field) field.value = value;
}

function renderAdminCourseResources(course) {
  const container = document.getElementById("adminCourseResourceList");
  if (!container) return;
  const resources = course?.resources || [];
  container.innerHTML = resources.map((resource) => `
    <article class="admin-resource-item">
      <span class="admin-resource-type ${resource.type}">${resource.type === "video" ? "Vídeo" : "PDF"}</span>
      <div><strong>${escapeHtml(resource.name)}</strong><small>${formatFileSize(resource.size)}</small></div>
      <a class="icon-button" href="${escapeHtml(resource.storage === "blob-private" ? `/api/resources/${encodeURIComponent(course.id)}/${encodeURIComponent(resource.id)}/access?redirect=1` : resource.url)}" target="_blank" rel="noopener" aria-label="Abrir ${escapeHtml(resource.name)}" title="Abrir material">↗</a>
      <button class="icon-button danger" type="button" data-portal-action="admin-delete-resource" data-course-id="${escapeHtml(course.id)}" data-resource-id="${escapeHtml(resource.id)}" aria-label="Excluir ${escapeHtml(resource.name)}" title="Excluir material">×</button>
    </article>
  `).join("") || "<p>Nenhum material adicionado. Salve o curso com arquivos selecionados para iniciar a biblioteca.</p>";
}

function renderSelectedAdminFiles(fileList) {
  const container = document.getElementById("adminCourseFileSelection");
  if (!container) return;
  const files = Array.from(fileList || []);
  container.innerHTML = files.length
    ? `<strong>${files.length} ${files.length === 1 ? "arquivo selecionado" : "arquivos selecionados"}</strong>${files.map((file) => `<span>${escapeHtml(file.name)} · ${formatFileSize(file.size)}</span>`).join("")}`
    : "";
}

async function saveAdminCourse(form) {
  const saveButton = document.getElementById("adminCourseSaveButton");
  const status = document.getElementById("adminCourseSaveStatus");
  const files = Array.from(document.getElementById("adminCourseFiles")?.files || []);
  const existingId = form.dataset.courseId;
  const values = Object.fromEntries(new FormData(form).entries());
  const payload = {
    ...values,
    hours: Number(values.hours),
    price: Number(values.price),
    lessons: Number(values.lessons),
    minimumGrade: Number(values.minimumGrade),
    attempts: Number(values.attempts),
    syllabus: String(values.syllabus || "").split(/\r?\n/).map((item) => item.trim()).filter(Boolean)
  };

  if (!payload.syllabus.length) {
    showToast("Adicione pelo menos um tópico ao conteúdo programático.");
    form.elements.namedItem("syllabus")?.focus();
    return;
  }
  if (files.some((file) => file.size > 12_000_000)) {
    showToast("Cada arquivo deve ter no máximo 12 MB nesta demonstração.");
    return;
  }

  saveButton.disabled = true;
  if (status) status.textContent = existingId ? "Salvando alterações..." : "Criando curso...";

  try {
    const method = existingId ? "PUT" : "POST";
    const path = existingId ? `/api/admin/courses/${encodeURIComponent(existingId)}` : "/api/admin/courses";
    const result = await apiRequest(path, { method, body: JSON.stringify(payload), timeoutMs: 15_000 });
    const courseId = result.course.id;
    let uploaded = 0;

    for (const file of files) {
      if (status) status.textContent = `Enviando ${file.name}...`;
      await uploadAdminCourseResource(courseId, file);
      uploaded += 1;
    }

    await loadAdminCourseCatalog();
    await syncCourseCatalog();
    openAdminCourseEditor(courseId);
    showToast(`${existingId ? "Curso atualizado" : "Curso criado"} com sucesso${uploaded ? ` e ${uploaded} ${uploaded === 1 ? "material enviado" : "materiais enviados"}` : ""}.`);
  } catch (error) {
    if (status) status.textContent = error.message || "Não foi possível salvar o curso.";
    showToast(error.message || "Não foi possível salvar o curso.");
  } finally {
    saveButton.disabled = false;
  }
}

async function uploadAdminCourseResource(courseId, file) {
  const allowedTypes = ["application/pdf", "video/mp4", "video/webm", "video/ogg"];
  if (!allowedTypes.includes(file.type)) throw new Error(`Formato não permitido: ${file.name}`);
  const data = await fileToDataUrl(file);
  return apiRequest(`/api/admin/courses/${encodeURIComponent(courseId)}/resources`, {
    method: "POST",
    body: JSON.stringify({ name: file.name, data }),
    timeoutMs: 90_000
  });
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error(`Não foi possível ler ${file.name}.`));
    reader.readAsDataURL(file);
  });
}

async function deleteAdminCourse() {
  const form = document.getElementById("adminCourseForm");
  const courseId = form?.dataset.courseId;
  const course = adminCourseCatalog.find((item) => item.id === courseId);
  if (!course || !window.confirm(`Excluir o curso "${course.title}"? Esta ação removerá o curso do catálogo.`)) return;

  try {
    await apiRequest(`/api/admin/courses/${encodeURIComponent(courseId)}`, { method: "DELETE" });
    closeAdminCourseEditor();
    await loadAdminCourseCatalog();
    await syncCourseCatalog();
    showToast("Curso excluído do catálogo.");
  } catch (error) {
    showToast(error.message || "Não foi possível excluir o curso.");
  }
}

async function deleteAdminCourseResource(courseId, resourceId) {
  const course = adminCourseCatalog.find((item) => item.id === courseId);
  const resource = course?.resources?.find((item) => item.id === resourceId);
  if (!resource || !window.confirm(`Excluir o material "${resource.name}"?`)) return;

  try {
    await apiRequest(`/api/admin/courses/${encodeURIComponent(courseId)}/resources/${encodeURIComponent(resourceId)}`, { method: "DELETE" });
    await loadAdminCourseCatalog();
    openAdminCourseEditor(courseId);
    showToast("Material removido do curso.");
  } catch (error) {
    showToast(error.message || "Não foi possível remover o material.");
  }
}

function formatFileSize(bytes) {
  const size = Number(bytes) || 0;
  if (!size) return "Tamanho não informado";
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`;
  return `${(size / 1024 / 1024).toFixed(1).replace(".", ",")} MB`;
}

function renderCompanyEmployeeDirectory(query = "") {
  const body = document.getElementById("companyEmployeeDirectoryBody");
  if (!body) return;
  const normalizedQuery = normalizeText(query);
  const filtered = employees.filter((employee) => !normalizedQuery || normalizeText(`${employee.name} ${employee.course} ${employee.status}`).includes(normalizedQuery));
  body.innerHTML = filtered.map((employee) => `
    <tr><td>${escapeHtml(employee.name)}</td><td>${escapeHtml(employee.course)}</td><td>${escapeHtml(employee.progress)}</td><td><span class="table-status ${employee.status === "Concluído" ? "complete" : employee.status === "Não iniciado" ? "pending" : "progress"}">${escapeHtml(employee.status)}</span></td><td>${employee.certificate ? '<button class="certificate-link" type="button" data-portal-action="certificate">Visualizar</button>' : "-"}</td></tr>
  `).join("") || `<tr><td colspan="5">Nenhum colaborador encontrado.</td></tr>`;
  setText("companyEmployeeCount", `${filtered.length} ${filtered.length === 1 ? "colaborador" : "colaboradores"}`);
}

function buildCompanySeatRows() {
  const balances = portalData.company?.seatBalances || [];
  if (!balances.length) return `<tr><td colspan="4">Nenhuma vaga corporativa comprada ainda.</td></tr>`;
  return balances.map((balance) => `
    <tr>
      <td>${escapeHtml(balance.title)}</td>
      <td>${formatNumber(balance.purchased)}</td>
      <td>${formatNumber(balance.assigned)}</td>
      <td><span class="table-status ${balance.available > 0 ? "complete" : "pending"}">${formatNumber(balance.available)}</span></td>
    </tr>
  `).join("");
}

function buildCompanyProgressRows() {
  const companyEmployees = portalData.company?.employees || employees;
  if (!companyEmployees.length) return `<tr><td colspan="5">Nenhum colaborador matriculado.</td></tr>`;
  return companyEmployees.map((employee) => `
    <tr>
      <td>${escapeHtml(employee.name)}</td>
      <td>${escapeHtml(employee.course)}</td>
      <td>${escapeHtml(employee.progress)}</td>
      <td><span class="table-status ${employee.status === "Concluído" ? "complete" : employee.status === "Não iniciado" ? "pending" : "progress"}">${escapeHtml(employee.status)}</span></td>
      <td>${escapeHtml(formatCompanyDate(employee.lastAccessAt))}</td>
    </tr>
  `).join("");
}

function buildCompanyCertificateRows() {
  const certificatedEmployees = (portalData.company?.employees || employees).filter((employee) => employee.certificate);
  if (!certificatedEmployees.length) return `<tr><td colspan="5">Nenhum certificado emitido para a equipe.</td></tr>`;
  return certificatedEmployees.map((employee) => `
    <tr>
      <td>${escapeHtml(employee.name)}</td>
      <td>${escapeHtml(employee.course)}</td>
      <td>${escapeHtml(formatCompanyDate(employee.completedAt || employee.updatedAt))}</td>
      <td>${escapeHtml(employee.certificateCode || "Pendente")}</td>
      <td><button class="certificate-link" type="button" data-nav="certificates">Validar</button></td>
    </tr>
  `).join("");
}

function formatCompanyDate(value) {
  if (!value) return "Sem registro";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Sem registro";
  return new Intl.DateTimeFormat("pt-BR").format(date);
}

function exportCompanyReport() {
  const rows = [["Nome", "Curso", "Progresso", "Status"], ...employees.map((employee) => [employee.name, employee.course, employee.progress, employee.status])];
  downloadCsv("fortixseg-relatorio-colaboradores.csv", rows);
}

function exportAdminReport() {
  const rows = [["Indicador", "Valor"], ["Alunos", "25000"], ["Empresas", "1000"], ["Cursos", "50"], ["Certificados", "150000"]];
  downloadCsv("fortixseg-relatorio-administrativo.csv", rows);
}

function downloadCsv(filename, rows) {
  const csv = `\uFEFF${rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(";")).join("\n")}`;
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast("Relatório gerado com sucesso.");
}

function bindNavigation() {
  document.addEventListener("click", (event) => {
    const navTarget = event.target.closest("[data-nav]");
    if (navTarget) {
      navigate(navTarget.dataset.nav);
    }
  });

  window.addEventListener("hashchange", () => {
    const target = location.hash.replace("#", "") || "home";
    if (document.querySelector(`[data-page="${target}"]`)) {
      navigate(target, false);
    }
  });
}

function navigate(pageName, updateHash = true) {
  if (!canAccessPage(pageName)) {
    if (!currentUser) {
      showToast("Faça login para acessar esta área.");
      openAuth("login");
      pageName = "home";
    } else {
      showToast("Sua conta não tem permissão para acessar esta área.");
      pageName = getPortalPageForRole(currentUser.role);
    }
  }

  document.querySelectorAll(".page").forEach((page) => page.classList.remove("active"));
  const targetPage = document.querySelector(`[data-page="${pageName}"]`);
  if (!targetPage) return;

  targetPage.classList.add("active");
  document.querySelectorAll(".main-nav [data-nav]").forEach((button) => {
    button.classList.toggle("active", button.dataset.nav === pageName);
  });

  closeMobileMenu();
  closeCart();
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (updateHash) {
    history.pushState(null, "", `#${pageName}`);
  }

  hydratePortalData(pageName);
}

function renderCourses(list) {
  const featured = document.getElementById("featuredCourses");
  const catalog = document.getElementById("courseCatalog");
  const query = document.getElementById("courseSearch")?.value || "";
  const filtered = filterCourses(list, query, activeCourseFilter);

  if (featured) featured.innerHTML = list.slice(0, 4).map(courseCardTemplate).join("");
  if (catalog) {
    if (activeCourseFilter === "Pacotes") {
      catalog.innerHTML = trainingPackages.map((item) => packageCardTemplate(item, false)).join("");
    } else {
      catalog.innerHTML = filtered.length
        ? filtered.map(courseCardTemplate).join("")
        : `<p class="empty-filter">Nenhum treinamento encontrado para este filtro.</p>`;
    }
  }
  const count = document.getElementById("courseResultCount");
  const total = activeCourseFilter === "Pacotes" ? trainingPackages.length : filtered.length;
  if (count) count.textContent = `${total} ${total === 1 ? "treinamento disponível" : "treinamentos disponíveis"}`;
  renderCourseFilters();
}

function courseCardTemplate(course) {
  return `
    <article class="course-card ${course.legalNotice ? "course-card-regulatory" : ""}">
      <!-- TODO: substituir este placeholder por imagem real do curso ${escapeHtml(course.code)} -->
      <div class="course-visual" style="--course-bg:${course.accent}">
        <strong class="course-code">${escapeHtml(course.code)}</strong>
        <span class="course-category">${escapeHtml(course.category)}</span>
      </div>
      <div class="course-body">
        <h3>${escapeHtml(course.title)}</h3>
        <div class="course-meta"><span>${formatHours(course.hours)}</span><span>Modalidade online</span></div>
        ${course.legalNotice ? `<p class="course-legal-note">Pode exigir etapa prática/presencial ou autorização complementar conforme atividade e norma aplicável.</p>` : ""}
        <div class="course-price"><span>Investimento</span><strong>${formatCurrency(course.price)}</strong></div>
        <div class="course-actions">
          <button class="button button-secondary" type="button" data-course-details="${course.id}">Ver Curso</button>
          <button class="button button-primary" type="button" data-course-buy="${course.id}">Comprar</button>
        </div>
      </div>
    </article>
  `;
}

function renderCourseFilters() {
  const holder = document.getElementById("courseFilters");
  if (!holder) return;

  const categories = ["Todos", "Trabalho em altura", "Máquinas e equipamentos", "Segurança elétrica", "Espaços confinados", "Proteção individual", "Integração", "Gerenciamento de riscos", "Controle de energias", "Pacotes"];
  holder.innerHTML = categories.map((category) => `
    <button class="${category === activeCourseFilter ? "active" : ""}" type="button" data-course-filter="${escapeHtml(category)}">
      ${escapeHtml(category)}
    </button>
  `).join("");
}

function filterCourses(list, query, category) {
  const normalizedQuery = normalizeText(query || "");
  return list.filter((course) => {
    const matchesCategory = category === "Todos" || course.category === category;
    const haystack = normalizeText(`${course.code} ${course.title} ${course.category}`);
    return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
  });
}

function renderTrainingPackages() {
  const homeFeatured = document.getElementById("homePackageGrid");
  const homeCompact = document.getElementById("homePackageCompactGrid");
  const companyGrid = document.getElementById("companyPackageGrid");
  const discountList = document.querySelectorAll("[data-discount-tiers]");

  if (homeFeatured) {
    homeFeatured.innerHTML = trainingPackages
      .filter((item) => item.featured)
      .map((item) => packageCardTemplate(item, true))
      .join("");
  }

  if (homeCompact) {
    homeCompact.innerHTML = trainingPackages
      .filter((item) => !item.featured)
      .map((item) => packageCardTemplate(item, false))
      .join("");
  }

  if (companyGrid) {
    companyGrid.innerHTML = trainingPackages.map((item) => packageCardTemplate(item, item.featured)).join("");
  }

  discountList.forEach((element) => {
    element.innerHTML = discountTiers.map((tier) => `
      <article>
        <strong>${escapeHtml(tier.label)}</strong>
        <span>${escapeHtml(tier.note)}</span>
      </article>
    `).join("");
  });
}

function packageCardTemplate(pkg, featured = false) {
  const limit = featured ? 7 : 5;
  const listItems = pkg.courses.slice(0, limit).map((course) => `<li>${escapeHtml(course)}</li>`).join("");
  const remaining = pkg.courses.length > limit ? `<li>+${pkg.courses.length - limit} treinamento(s) incluso(s)</li>` : "";

  return `
    <article class="package-card ${featured ? "package-card-featured" : ""}">
      <div class="package-card-top">
        <span class="package-code">${escapeHtml(pkg.code)}</span>
        <strong>${escapeHtml(pkg.badge)}</strong>
      </div>
      <h3>${escapeHtml(pkg.title)}</h3>
      <p>${escapeHtml(pkg.description)}</p>
      <div class="package-price">
        <strong>${formatCurrency(pkg.price)}</strong>
        <span>por colaborador</span>
      </div>
      <div class="package-hours">${formatHours(pkg.hours)} de carga total</div>
      <ul class="package-course-list">${listItems}${remaining}</ul>
      <label class="package-quantity">
        <span>Colaboradores</span>
        <input type="number" min="1" max="500" value="10" data-package-quantity="${escapeHtml(pkg.id)}">
      </label>
      <button class="button button-primary button-block" type="button" data-package-interest="${escapeHtml(pkg.id)}">Solicitar este pacote</button>
    </article>
  `;
}

function renderCourseSelects() {
  const options = courses.map((course) => `<option value="${course.id}">${escapeHtml(course.title)}</option>`).join("");
  document.getElementById("bulkCourse").innerHTML = options;
  document.getElementById("employeeCourse").innerHTML = options;
}

function bindInterface() {
  document.addEventListener("click", (event) => {
    const detailButton = event.target.closest("[data-course-details]");
    const buyButton = event.target.closest("[data-course-buy]");
    const packageButton = event.target.closest("[data-package-interest]");
    const filterButton = event.target.closest("[data-course-filter]");
    const proposalButton = event.target.closest("[data-proposal-jump]");
    const removeButton = event.target.closest("[data-remove-cart]");

    if (detailButton) {
      openCourseModal(detailButton.dataset.courseDetails);
      return;
    }
    if (buyButton) {
      addToCart(buyButton.dataset.courseBuy);
      return;
    }
    if (packageButton) {
      const packageId = packageButton.dataset.packageInterest;
      const quantityInput = packageButton.closest(".package-card")?.querySelector(`[data-package-quantity="${packageId}"]`);
      const quantity = Math.max(1, Number(quantityInput?.value) || 1);
      preparePackageProposal(packageId, quantity);
      return;
    }
    if (filterButton) {
      activeCourseFilter = filterButton.dataset.courseFilter;
      renderCourses(courses);
      return;
    }
    if (proposalButton) {
      scrollToProposalForm();
      return;
    }
    if (removeButton) removeFromCart(removeButton.dataset.removeCart);
  });

  document.getElementById("courseSearch").addEventListener("input", () => renderCourses(courses));

  document.getElementById("menuToggle").addEventListener("click", toggleMobileMenu);
  document.getElementById("cartButton").addEventListener("click", openCart);
  document.getElementById("closeCartButton").addEventListener("click", closeCart);
  document.getElementById("drawerBackdrop").addEventListener("click", closeCart);
  document.getElementById("checkoutButton").addEventListener("click", checkout);
  document.getElementById("continueCourseButton").addEventListener("click", () => navigate("lesson"));
  document.getElementById("completeLessonButton").addEventListener("click", completeLesson);
  document.getElementById("openQuizButton").addEventListener("click", () => {
    document.getElementById("quizPanel").classList.remove("hidden");
    document.getElementById("quizPanel").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  document.getElementById("addEmployeeButton").addEventListener("click", () => openModal("employeeModal"));
  document.getElementById("printCertificateButton").addEventListener("click", printCertificate);
  document.getElementById("validateCertificateButton").addEventListener("click", () => {
    navigate("certificates");
    document.getElementById("certificateCode").value = APP_CONFIG.certificateCode;
    validateCertificate(APP_CONFIG.certificateCode);
  });

  document.querySelectorAll("[data-show-certificate]").forEach((button) => {
    button.addEventListener("click", () => {
      if (certificateUnlocked) {
        navigate("certificate-view");
      } else {
        showToast("Conclua a avaliação com nota mínima de 70% para liberar o certificado.");
      }
    });
  });

  document.querySelectorAll("[data-logout]").forEach((button) => {
    button.addEventListener("click", logout);
  });

  document.querySelectorAll(".faq-item button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const isOpen = item.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllModals();
      closeCart();
      closeMobileMenu();
      closeAssistant();
    }
  });
}

function initVirtualAssistant() {
  const launcher = document.getElementById("assistantLauncher");
  const closeButton = document.getElementById("assistantClose");
  const form = document.getElementById("assistantForm");
  const suggestions = document.getElementById("assistantSuggestions");
  const messages = document.getElementById("assistantMessages");

  launcher.addEventListener("click", () => {
    const isOpen = document.getElementById("assistantPanel").classList.contains("open");
    if (isOpen) closeAssistant();
    else openAssistant();
  });

  closeButton.addEventListener("click", closeAssistant);

  document.querySelectorAll("[data-open-assistant]").forEach((button) => {
    button.addEventListener("click", openAssistant);
  });

  suggestions.addEventListener("click", (event) => {
    const suggestion = event.target.closest("[data-assistant-question]");
    if (suggestion) submitAssistantQuestion(suggestion.dataset.assistantQuestion);
  });

  messages.addEventListener("click", (event) => {
    const action = event.target.closest("[data-assistant-action]");
    if (action) handleAssistantAction(action.dataset.assistantAction, action.dataset.assistantValue);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("assistantInput");
    const question = input.value.trim();
    if (!question) return;
    input.value = "";
    submitAssistantQuestion(question);
  });
}

function openAssistant() {
  const panel = document.getElementById("assistantPanel");
  const launcher = document.getElementById("assistantLauncher");
  panel.classList.add("open");
  panel.setAttribute("aria-hidden", "false");
  launcher.setAttribute("aria-expanded", "true");
  launcher.querySelector(".assistant-notification").classList.add("hidden");
  setTimeout(() => document.getElementById("assistantInput").focus(), 100);
}

function closeAssistant() {
  const panel = document.getElementById("assistantPanel");
  const launcher = document.getElementById("assistantLauncher");
  if (!panel || !launcher) return;
  panel.classList.remove("open");
  panel.setAttribute("aria-hidden", "true");
  launcher.setAttribute("aria-expanded", "false");
}

async function submitAssistantQuestion(question) {
  const input = document.getElementById("assistantInput");
  const history = getAssistantHistory();
  const localResponse = getAssistantResponse(question);
  addAssistantMessage(question, "user");
  input.disabled = true;

  const typing = document.createElement("div");
  typing.className = "assistant-typing";
  typing.innerHTML = "<i></i><i></i><i></i>";
  document.getElementById("assistantMessages").appendChild(typing);
  scrollAssistantToBottom();

  try {
    const remoteResponse = await requestAssistantReply(question, history);
    typing.remove();
    addAssistantMessage(remoteResponse.reply, "bot", localResponse.actions);
    setAssistantStatus("IA conectada");
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 420));
    typing.remove();
    addAssistantMessage(localResponse.text, "bot", localResponse.actions);
    setAssistantStatus("Atendimento local");
  } finally {
    input.disabled = false;
    input.focus();
  }
}

function getAssistantHistory() {
  return [...document.querySelectorAll("#assistantMessages .assistant-message")].slice(-6).map((message) => ({
    role: message.classList.contains("user") ? "user" : "assistant",
    content: message.querySelector("p")?.textContent?.trim() || ""
  })).filter((message) => message.content);
}

async function requestAssistantReply(question, history) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 14_000);
  try {
    const response = await fetch("/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, history }),
      signal: controller.signal
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.reply) throw new Error(data.error || "Atendimento por IA indisponível.");
    return data;
  } finally {
    clearTimeout(timer);
  }
}

function setAssistantStatus(text) {
  const status = document.getElementById("assistantStatus");
  if (!status) return;
  const dot = status.querySelector("i");
  status.replaceChildren(dot || document.createElement("i"), document.createTextNode(` ${text}`));
}

function addAssistantMessage(text, sender, actions = []) {
  const messages = document.getElementById("assistantMessages");
  const message = document.createElement("div");
  message.className = `assistant-message ${sender}`;

  const label = document.createElement("span");
  label.className = "assistant-message-label";
  label.textContent = sender === "bot" ? "FortixSeg" : "Você";

  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  message.append(label, paragraph);

  if (actions.length) {
    const actionRow = document.createElement("div");
    actionRow.className = "assistant-message-actions";
    actions.forEach((action) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = action.label;
      button.dataset.assistantAction = action.type;
      if (action.value) button.dataset.assistantValue = action.value;
      actionRow.appendChild(button);
    });
    message.appendChild(actionRow);
  }

  messages.appendChild(message);
  scrollAssistantToBottom();
}

function getAssistantResponse(rawQuestion) {
  const question = normalizeText(rawQuestion);
  const compactQuestion = question.replace(/\s+/g, "");
  const matchedCourse = courses.find((course) => {
    const compactCode = normalizeText(course.code).replace(/\s+/g, "");
    return compactQuestion.includes(compactCode) || question.includes(normalizeText(course.title));
  });

  if (matchedCourse) {
    return {
      text: `${matchedCourse.title} possui ${matchedCourse.hours} horas, é 100% online e custa ${formatCurrency(matchedCourse.price)}. O certificado digital é liberado após conclusão e aprovação com nota mínima de 70%.`,
      actions: [
        { label: "Ver detalhes", type: "course", value: matchedCourse.id },
        { label: "Comprar", type: "buy", value: matchedCourse.id }
      ]
    };
  }

  if (includesAny(question, ["curso", "treinamento", "preco", "valor", "catalogo", "nr "])) {
    return {
      text: "A FortixSeg possui treinamentos de NR 35, NR 12, NR 10, NR 33, EPIs, Integração de Segurança, NR 01 e LOTO. Os valores vão de R$ 59,90 a R$ 249,90.",
      actions: [{ label: "Abrir catálogo", type: "courses" }]
    };
  }

  if (includesAny(question, ["certificado", "qr code", "validar", "validade", "codigo"])) {
    return {
      text: "O certificado digital é liberado após a conclusão das aulas e aprovação na avaliação. Ele possui código único e QR Code para consulta pública. A nota mínima é 70%.",
      actions: [{ label: "Validar certificado", type: "certificates" }]
    };
  }

  if (includesAny(question, ["empresa", "colaborador", "equipe", "lote", "relatorio", "vencimento", "proposta"])) {
    return {
      text: "Para empresas, a plataforma permite comprar vagas em lote, cadastrar colaboradores, acompanhar progresso, centralizar certificados, consultar relatórios e controlar vencimentos.",
      actions: [
        { label: "Soluções para empresas", type: "companies" },
        { label: "Solicitar proposta", type: "contact" }
      ]
    };
  }

  if (includesAny(question, ["avaliacao", "prova", "nota", "aprovacao", "tentativa", "reprovado"])) {
    return {
      text: "A avaliação final verifica o aprendizado do curso. A nota mínima demonstrativa é 70%, com até 3 tentativas. Se a nota for menor, você pode revisar o conteúdo e tentar novamente.",
      actions: [{ label: "Como funciona", type: "how" }]
    };
  }

  if (includesAny(question, ["entrar", "login", "acesso", "cadastro", "conta", "senha", "esqueci"])) {
    return {
      text: "Você pode entrar ou criar sua conta pelo menu superior. Existem acessos separados para aluno, empresa e administração. Para recuperar uma senha, use a opção disponível na tela de login.",
      actions: [
        { label: "Entrar", type: "login" },
        { label: "Criar conta", type: "register" }
      ]
    };
  }

  if (includesAny(question, ["pagamento", "pagar", "pix", "cartao", "boleto", "checkout", "carrinho", "mercado pago"])) {
    return {
      text: "Nesta versão o carrinho e o checkout são demonstrativos. A integração real de pagamento será feita com o Mercado Pago antes da publicação comercial.",
      actions: [{ label: "Ver cursos", type: "courses" }]
    };
  }

  if (includesAny(question, ["online", "celular", "telefone", "tablet", "onde", "quando", "acessar"])) {
    return {
      text: "Os treinamentos são online e podem ser acessados pelo computador, tablet ou celular. Você estuda no seu ritmo e acompanha o progresso pela área do aluno.",
      actions: [{ label: "Como funciona", type: "how" }]
    };
  }

  if (includesAny(question, ["contato", "email", "e-mail", "atendente", "humano", "suporte", "ajuda", "falar"])) {
    return {
      text: `Você pode falar com a FortixSeg pelo e-mail ${APP_CONFIG.contactEmail} ou enviar uma mensagem pelo formulário de contato. Não envie CPF, senha ou dados de pagamento pelo chat.`,
      actions: [{ label: "Abrir contato", type: "contact" }]
    };
  }

  if (includesAny(question, ["oi", "ola", "bom dia", "boa tarde", "boa noite", "tudo bem"])) {
    return {
      text: "Olá! Estou pronto para ajudar. Você pode perguntar sobre um curso específico, preço, certificado, avaliação, acesso ou solução para empresas.",
      actions: [
        { label: "Ver cursos", type: "courses" },
        { label: "Certificados", type: "certificates" }
      ]
    };
  }

  return {
    text: `Ainda não encontrei uma resposta exata para essa dúvida. Posso ajudar com cursos, certificados, empresas, acesso e pagamentos. Para uma orientação específica, use o formulário de contato ou escreva para ${APP_CONFIG.contactEmail}.`,
    actions: [{ label: "Falar com a equipe", type: "contact" }]
  };
}

function handleAssistantAction(type, value) {
  if (type === "course") {
    closeAssistant();
    openCourseModal(value);
    return;
  }
  if (type === "buy") {
    closeAssistant();
    addToCart(value);
    openCart();
    return;
  }
  if (type === "login" || type === "register") {
    closeAssistant();
    openAuth(type);
    return;
  }

  const pageActions = {
    courses: "courses",
    certificates: "certificates",
    companies: "companies",
    contact: "contact",
    how: "how"
  };
  if (pageActions[type]) {
    closeAssistant();
    navigate(pageActions[type]);
  }
}

function includesAny(text, terms) {
  return terms.some((term) => text.includes(term));
}

function scrollAssistantToBottom() {
  const messages = document.getElementById("assistantMessages");
  requestAnimationFrame(() => {
    messages.scrollTop = messages.scrollHeight;
  });
}

// TODO: conectar o assistente virtual a um backend de IA com base de conhecimento revisada

function bindModals() {
  document.querySelectorAll("[data-auth]").forEach((button) => {
    button.addEventListener("click", () => openAuth(button.dataset.auth));
  });

  document.querySelectorAll("[data-close-modal]").forEach((element) => {
    element.addEventListener("click", closeAllModals);
  });

  document.getElementById("loginTab").addEventListener("click", () => switchAuthPanel("login"));
  document.getElementById("registerTab").addEventListener("click", () => switchAuthPanel("register"));
  document.getElementById("forgotPassword").addEventListener("click", () => showToast("Recuperação demonstrativa. Em breve, um link seria enviado por e-mail."));

  document.querySelectorAll("[data-account-type]").forEach((button) => {
    button.addEventListener("click", () => switchAccountType(button.dataset.accountType));
  });

  document.querySelectorAll("[data-demo-login]").forEach((button) => {
    button.addEventListener("click", () => fillDemoLogin(button.dataset.demoLogin));
  });
}

function openModal(id) {
  closeAllModals();
  const modal = document.getElementById(id);
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closeAllModals() {
  document.querySelectorAll(".modal.open").forEach((modal) => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  });
  if (!document.getElementById("cartDrawer").classList.contains("open")) {
    document.body.classList.remove("no-scroll");
  }
}

function openAuth(mode) {
  switchAuthPanel(mode);
  openModal("authModal");
}

function switchAuthPanel(mode) {
  const loginMode = mode === "login";
  document.getElementById("loginPanel").classList.toggle("active", loginMode);
  document.getElementById("registerPanel").classList.toggle("active", !loginMode);
  document.getElementById("loginTab").classList.toggle("active", loginMode);
  document.getElementById("registerTab").classList.toggle("active", !loginMode);
}

function switchAccountType(type) {
  document.getElementById("accountType").value = type;
  document.getElementById("candidateFields").classList.toggle("hidden", type !== "candidate");
  document.getElementById("companyFields").classList.toggle("hidden", type !== "company");
  document.getElementById("registerEmailLabel").textContent = type === "company" ? "E-mail corporativo" : "E-mail";

  document.querySelectorAll("[data-account-type]").forEach((button) => {
    button.classList.toggle("active", button.dataset.accountType === type);
  });

  document.querySelectorAll("[data-required-candidate]").forEach((input) => {
    input.required = type === "candidate";
  });
  document.querySelectorAll("[data-required-company]").forEach((input) => {
    input.required = type === "company";
  });
}

function fillDemoLogin(role) {
  const emails = {
    student: "aluno@teste.com",
    company: "empresa@teste.com",
    admin: "admin@teste.com"
  };
  document.getElementById("loginEmail").value = emails[role];
  document.getElementById("loginPassword").value = "123456";
}

function openCourseModal(courseId) {
  const course = courses.find((item) => item.id === courseId);
  if (!course) return;

  document.getElementById("courseModalContent").innerHTML = `
    <div class="course-modal-grid">
      <div class="course-modal-visual" style="--course-bg:${course.accent}">
        <strong>${escapeHtml(course.code)}</strong>
        <span>Treinamento online com avaliação</span>
      </div>
      <div>
        <div class="course-detail-head">
          <span>Detalhes do curso</span>
          <h2 id="courseModalTitle">${escapeHtml(course.title)}</h2>
          <div class="detail-meta">
            <span>${course.hours} horas</span>
            <span>Modalidade: Online</span>
            <span>${course.lessons} aulas</span>
            <span>Nota mínima: 70%</span>
            <span>Tentativas: 3</span>
          </div>
        </div>
        <div class="detail-copy">
          <h3>Público-alvo</h3>
          <p>${escapeHtml(course.audience)}</p>
          <h3>Objetivo</h3>
          <p>${escapeHtml(course.objective)}</p>
          <h3>Conteúdo programático</h3>
          <ul>${course.syllabus.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          <p><strong>Certificado digital após aprovação na avaliação final.</strong></p>
        </div>
        <div class="detail-purchase">
          <div><span>Investimento</span><strong>${formatCurrency(course.price)}</strong></div>
          <button class="button button-primary" type="button" data-course-buy="${course.id}">Comprar agora</button>
        </div>
      </div>
    </div>
  `;
  openModal("courseModal");
}

function addToCart(courseId, quantity = 1, corporate = false) {
  const course = courses.find((item) => item.id === courseId);
  if (!course) return;

  const key = corporate ? `corporate-${courseId}` : courseId;
  const existing = cart.find((item) => item.key === key);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ key, courseId, quantity, corporate });
  }

  writeStorage("fortixsegCart", cart);
  renderCart();
  closeAllModals();
  showToast(`${course.title} adicionado ao carrinho.`);
}

function getPackageById(packageId) {
  return trainingPackages.find((item) => item.id === packageId);
}

function preparePackageProposal(packageId, quantity = 1) {
  const pkg = getPackageById(packageId);
  if (!pkg) return;

  scrollToProposalForm();
  setTimeout(() => {
    const form = document.getElementById("proposalForm");
    const employeesField = form?.elements?.namedItem("employees");
    const messageField = form?.elements?.namedItem("message");
    if (employeesField) employeesField.value = String(quantity);
    if (messageField) {
      messageField.value = `Tenho interesse no pacote ${pkg.code} - ${pkg.title} para ${quantity} colaborador${quantity > 1 ? "es" : ""}.`;
    }
  }, 140);

  showToast("Pacote selecionado. Preencha os dados para solicitar a proposta.");
}

function removeFromCart(key) {
  cart = cart.filter((item) => item.key !== key);
  writeStorage("fortixsegCart", cart);
  renderCart();
}

function renderCart() {
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cartCount").textContent = itemCount;

  const itemsContainer = document.getElementById("cartItems");
  if (!cart.length) {
    itemsContainer.innerHTML = `<div class="empty-cart"><div><strong>Seu carrinho está vazio</strong><p>Adicione um curso para continuar.</p></div></div>`;
  } else {
    itemsContainer.innerHTML = cart.map((item) => {
      const course = courses.find((entry) => entry.id === item.courseId);
      const label = item.corporate ? `${item.quantity} vagas corporativas` : `${item.quantity} unidade${item.quantity > 1 ? "s" : ""}`;
      return `
        <article class="cart-item">
          <span class="cart-item-code">${escapeHtml(course.code)}</span>
          <div><strong>${escapeHtml(course.title)}</strong><small>${label} · ${formatCurrency(course.price)} cada</small></div>
          <button type="button" data-remove-cart="${escapeHtml(item.key)}">Remover</button>
        </article>
      `;
    }).join("");
  }

  const total = cart.reduce((sum, item) => {
    const course = courses.find((entry) => entry.id === item.courseId);
    return sum + course.price * item.quantity;
  }, 0);
  document.getElementById("cartTotal").textContent = formatCurrency(total);
  document.getElementById("checkoutButton").disabled = cart.length === 0;
}

function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartDrawer").setAttribute("aria-hidden", "false");
  document.getElementById("drawerBackdrop").classList.add("open");
  document.body.classList.add("no-scroll");
}

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartDrawer").setAttribute("aria-hidden", "true");
  document.getElementById("drawerBackdrop").classList.remove("open");
  if (!document.querySelector(".modal.open")) {
    document.body.classList.remove("no-scroll");
  }
}

async function checkout() {
  if (!cart.length) return;
  if (!currentUser) {
    showToast("Faça login para concluir a compra.");
    openAuth("login");
    return;
  }
  const button = document.getElementById("checkoutButton");
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = "Preparando checkout...";

  try {
    const data = await apiRequest("/api/checkout/preference", {
      method: "POST",
      body: JSON.stringify({
        items: cart.map(({ courseId, quantity, corporate }) => ({ courseId, quantity, corporate }))
      })
    });
    if (data.mode === "demo_local") {
      cart = [];
      writeStorage("fortixsegCart", cart);
      writeStorage("fortixsegLastOrderId", data.orderId || "");
      renderCart();
      closeCart();
      if (data.dashboard && currentUser?.role === "student") applyStudentDashboard(data.dashboard);
      if (data.dashboard && currentUser?.role === "company") applyCompanyDashboard(data.dashboard);
      navigate(getPortalPageForRole(currentUser.role));
      showToast("Pedido confirmado em modo local. As matrículas foram atualizadas.");
      return;
    }
    if (!data.checkoutUrl) throw new Error("Checkout indisponível.");
    if (data.orderId) writeStorage("fortixsegLastOrderId", data.orderId);
    const checkoutUrl = new URL(data.checkoutUrl);
    if (checkoutUrl.protocol !== "https:") throw new Error("Endereço de checkout inválido.");
    window.location.assign(checkoutUrl.href);
  } catch (error) {
    const isConfiguration = /configurado|Failed to fetch|fetch|URL scheme/i.test(error.message);
    showToast(isConfiguration
      ? "Checkout em modo demonstrativo. Configure o Mercado Pago no servidor para cobrar."
      : "Não foi possível abrir o checkout. Tente novamente em instantes.");
  } finally {
    button.textContent = originalText;
    button.disabled = cart.length === 0;
  }
}

function scrollToProposalForm() {
  navigate("companies");
  setTimeout(() => {
    const form = document.getElementById("proposalForm");
    form?.scrollIntoView({ behavior: "smooth", block: "center" });
    form?.querySelector("input")?.focus({ preventScroll: true });
  }, 120);
}

async function handlePaymentReturn() {
  const payment = new URLSearchParams(location.search).get("payment");
  const externalReference = new URLSearchParams(location.search).get("external_reference");
  const paymentId = new URLSearchParams(location.search).get("payment_id");
  if (payment || externalReference || paymentId) {
    try {
      if (currentUser && (externalReference || paymentId)) {
        const params = new URLSearchParams();
        if (externalReference) params.set("external_reference", externalReference);
        if (paymentId) params.set("payment_id", paymentId);
        if (payment) params.set("status", payment);
        const result = await apiRequest(`/api/orders/resolve?${params.toString()}`, { timeoutMs: 10_000 });
        lastOrderStatus = result.order?.status || payment;
        if (result.dashboard && currentUser.role === "student") applyStudentDashboard(result.dashboard);
        if (result.dashboard && currentUser.role === "company") applyCompanyDashboard(result.dashboard);
      }
    } catch {}

    if ((lastOrderStatus || payment) === "approved" || payment === "success") {
      showToast("Pagamento aprovado. Seu pedido foi atualizado.");
    } else if ((lastOrderStatus || payment) === "pending") {
      showToast("Pagamento pendente. O pedido continua aguardando confirmação.");
    } else {
      showToast("O pagamento não foi concluído. Você pode tentar novamente.");
    }
    const cleanUrl = `${location.pathname}${location.hash || "#home"}`;
    history.replaceState(null, "", cleanUrl);
  }
}

function bindForms() {
  document.getElementById("loginForm").addEventListener("submit", handleLogin);
  document.getElementById("registerForm").addEventListener("submit", handleRegister);
  document.getElementById("proposalForm").addEventListener("submit", (event) => {
    event.preventDefault();
    event.target.reset();
    showToast("Solicitação enviada com sucesso. Nossa equipe entrará em contato.");
  });
  document.getElementById("contactForm").addEventListener("submit", (event) => {
    event.preventDefault();
    event.target.reset();
    showToast("Mensagem enviada com sucesso. Retornaremos em breve.");
  });
  document.getElementById("validationForm").addEventListener("submit", (event) => {
    event.preventDefault();
    validateCertificate(document.getElementById("certificateCode").value);
  });
  document.getElementById("employeeForm").addEventListener("submit", handleEmployeeAdd);
  document.getElementById("bulkPurchaseForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const courseId = document.getElementById("bulkCourse").value;
    const quantity = Number(document.getElementById("bulkQuantity").value);
    addToCart(courseId, quantity, true);
    openCart();
  });
  document.getElementById("quizForm").addEventListener("submit", gradeQuiz);
}

async function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value;
  try {
    const session = await apiRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    currentUser = session.user;
    applyAuthState();
    closeAllModals();
    event.target.reset();
    navigate(getPortalPageForRole(session.user.role));
    showToast("Login realizado com sucesso.");
  } catch (error) {
    apiOnline = false;
    currentUser = null;
    applyAuthState();
    showToast(error.message || "Não foi possível entrar com este usuário.");
    return;
  }
}

async function handleRegister(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const password = formData.get("password");
  const confirmation = formData.get("confirmPassword");

  if (password !== confirmation) {
    showToast("As senhas informadas não são iguais.");
    return;
  }

  try {
    const payload = Object.fromEntries(formData.entries());
    payload.accountType = document.getElementById("accountType").value;
    const result = await apiRequest("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
      timeoutMs: 12_000
    });
    currentUser = result.user;
    applyAuthState();
    closeAllModals();
    event.target.reset();
    switchAccountType("candidate");
    switchAuthPanel("login");
    navigate(getPortalPageForRole(result.user.role));
    showToast("Conta criada com sucesso.");
  } catch (error) {
    showToast(error.message || "Não foi possível criar a conta.");
  }
}

async function logout() {
  try {
    await apiRequest("/api/auth/logout", { method: "POST" });
  } catch {}
  currentUser = null;
  applyAuthState();
  navigate("home");
  showToast("Sessão encerrada.");
}

async function completeLesson() {
  if (!currentUser || !portalData.student?.courses?.length) return;
  const activeCourse = portalData.student.courses.find((course) => course.status === "Em andamento") || portalData.student.courses[0];
  try {
    const result = await apiRequest("/api/student/progress", {
      method: "POST",
      body: JSON.stringify({
        courseId: activeCourse.id,
        progress: Math.max(85, Number(activeCourse.progress || 0))
      })
    });
    applyStudentDashboard(result.dashboard);
    showToast("Aula marcada como concluída. Seu progresso foi atualizado.");
  } catch (error) {
    showToast(error.message || "Não foi possível registrar o progresso.");
  }
}

function renderQuiz() {
  document.getElementById("quizForm").innerHTML = `
    ${quizQuestions.map((question, questionIndex) => `
      <fieldset class="quiz-question">
        <h3>${questionIndex + 1}. ${escapeHtml(question.question)}</h3>
        <div class="quiz-options">
          ${question.options.map((option, optionIndex) => `
            <label>
              <input type="radio" name="question-${questionIndex}" value="${optionIndex}" required>
              <span>${escapeHtml(option)}</span>
            </label>
          `).join("")}
        </div>
      </fieldset>
    `).join("")}
    <button class="button button-primary" type="submit">Finalizar avaliação</button>
  `;
}

async function gradeQuiz(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  let correct = 0;

  quizQuestions.forEach((question, index) => {
    if (Number(formData.get(`question-${index}`)) === question.answer) correct += 1;
  });

  const grade = Math.round((correct / quizQuestions.length) * 100);
  const activeCourse = portalData.student?.courses?.find((course) => course.status === "Em andamento") || portalData.student?.courses?.[0];
  const result = document.getElementById("quizResult");
  try {
    const assessment = await apiRequest("/api/student/assessment", {
      method: "POST",
      body: JSON.stringify({ courseId: activeCourse?.id || "nr35", grade })
    });
    const approved = Boolean(assessment.approved);
    lastQuizGrade = assessment.grade;
    applyStudentDashboard(assessment.dashboard);
    result.classList.remove("hidden", "failed");
    result.classList.toggle("failed", !approved);
    result.innerHTML = approved
      ? `<h3>Aprovado. Seu certificado está disponível.</h3><p>Nota final: ${assessment.grade}%. O documento já pode ser acessado na área do aluno.</p><button class="button button-primary" type="button" data-show-certificate>Ver certificado</button>`
      : `<h3>Reprovado. Revise o conteúdo e tente novamente.</h3><p>Nota final: ${assessment.grade}%. A nota mínima é 70%.</p>`;
    const certificateButton = result.querySelector("[data-show-certificate]");
    if (certificateButton) certificateButton.addEventListener("click", () => navigate("certificate-view"));
    result.scrollIntoView({ behavior: "smooth", block: "center" });
  } catch (error) {
    showToast(error.message || "Não foi possível registrar o resultado da avaliação.");
  }
}

function updateStudentState() {
  const progressLabel = document.getElementById("studentProgressLabel");
  const progressBar = document.getElementById("studentProgressBar");
  const lessonText = document.getElementById("lessonProgressText");
  const lessonBar = document.getElementById("lessonProgressBar");
  if (progressLabel) progressLabel.textContent = `${studentProgress}%`;
  if (progressBar) progressBar.style.width = `${studentProgress}%`;
  if (lessonText) lessonText.textContent = `${studentProgress}%`;
  if (lessonBar) lessonBar.style.width = `${studentProgress}%`;
  if (!portalData.student) {
    document.getElementById("averageProgressMetric").textContent = studentProgress === 100 ? "100%" : "65%";
    document.getElementById("studentCertificatesMetric").textContent = certificateUnlocked ? "1" : "0";
    document.getElementById("completedCoursesMetric").textContent = studentProgress === 100 ? "2" : "1";
  }
  document.getElementById("certificateGrade").textContent = `${lastQuizGrade}%`;
}

function updateCertificateView(certificate, activeCourse, profile) {
  const studentName = certificate?.student || profile?.name || currentUser?.name || "João da Silva";
  const courseTitle = certificate?.course || activeCourse?.title || "NR 35 - Trabalho em Altura";
  const hours = certificate?.hours || `${courses.find((course) => course.id === activeCourse?.id)?.hours || 8} horas`;
  const code = certificate?.code || APP_CONFIG.certificateCode;
  const completedAt = certificate?.completedAt || new Intl.DateTimeFormat("pt-BR").format(new Date());
  const codeBlock = document.querySelector(".certificate-code strong");
  const studentHeading = document.querySelector(".certificate-border h1");
  const courseHeading = document.querySelector(".certificate-border h2");
  const hoursField = document.querySelector(".certificate-meta span:first-child");
  if (studentHeading) studentHeading.textContent = studentName;
  if (courseHeading) courseHeading.textContent = courseTitle;
  if (hoursField) hoursField.innerHTML = `<b>Carga horária</b>${escapeHtml(hours)}`;
  if (codeBlock) codeBlock.textContent = code;
  setText("certificateDate", completedAt);
  setText("certificateGrade", `${certificate?.grade ?? lastQuizGrade}%`);
  document.body.dataset.certificatePdfUrl = certificate?.pdfUrl || "";
}

async function validateCertificate(rawCode) {
  const code = rawCode.trim().toUpperCase();
  const result = document.getElementById("validationResult");

  try {
    const data = await apiRequest(`/api/certificates/validate?code=${encodeURIComponent(code)}`);
    renderCertificateValidation(result, data);
    return;
  } catch {
    apiOnline = false;
  }

  // TODO: validar certificado no backend
  // TODO: gerar QR Code real
  // TODO: armazenar certificados em storage seguro
  if (code === APP_CONFIG.certificateCode) {
    renderCertificateValidation(result, {
      valid: true,
      certificate: { student: "João da Silva", course: "NR 35 - Trabalho em Altura", hours: "8 horas", completedAt: "20/05/2026", status: "Válido" }
    });
  } else {
    renderCertificateValidation(result, { valid: false, message: "Certificado não encontrado." });
  }
}

function renderCertificateValidation(result, data) {
  if (!data.valid) {
    result.className = "validation-result invalid";
    result.innerHTML = `<div class="status-seal">!</div><div><h2>${escapeHtml(data.message || "Certificado não encontrado.")}</h2><p>Verifique o código informado e tente novamente.</p></div>`;
    return;
  }

  const certificate = data.certificate;
  result.className = "validation-result";
  result.innerHTML = `
    <div class="status-seal">✓</div>
    <div>
      <h2>Certificado válido</h2>
      <p><strong>Aluno:</strong> ${escapeHtml(certificate.student)}</p>
      <p><strong>Curso:</strong> ${escapeHtml(certificate.course)}</p>
      <p><strong>Carga horária:</strong> ${escapeHtml(certificate.hours)}</p>
      <p><strong>Conclusão:</strong> ${escapeHtml(certificate.completedAt)}</p>
      <p><strong>Status:</strong> ${escapeHtml(certificate.status)}</p>
      ${certificate.pdfUrl ? `<p><a class="button button-secondary" href="${escapeHtml(certificate.pdfUrl)}" target="_blank" rel="noopener">Abrir PDF do certificado</a></p>` : ""}
    </div>
  `;
}

function printCertificate() {
  const pdfUrl = document.body.dataset.certificatePdfUrl;
  if (pdfUrl) {
    window.open(pdfUrl, "_blank", "noopener");
    return;
  }
  window.print();
}

async function handleEmployeeAdd(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const course = courses.find((item) => item.id === formData.get("course"));
  const employee = {
    name: formData.get("name"),
    cpf: formData.get("cpf"),
    email: formData.get("email"),
    course: course.code,
    progress: "0%",
    status: "Não iniciado",
    certificate: false
  };

  try {
    const data = await apiRequest("/api/company/employees", {
      method: "POST",
      body: JSON.stringify({
        name: employee.name,
        cpf: employee.cpf,
        email: employee.email,
        courseId: course.id
      })
    });
    applyCompanyDashboard(data);
    event.target.reset();
    closeAllModals();
    showToast("Colaborador adicionado com sucesso.");
  } catch (error) {
    showToast(error.message || "Não foi possível adicionar o colaborador.");
  }
}

function renderEmployees() {
  document.getElementById("employeeTableBody").innerHTML = employees.map((employee) => `
    <tr>
      <td>${escapeHtml(employee.name)}</td>
      <td>${escapeHtml(employee.course)}</td>
      <td>${escapeHtml(employee.progress)}</td>
      <td><span class="table-status ${employee.status === "Concluído" ? "complete" : "progress"}">${escapeHtml(employee.status)}</span></td>
      <td>${employee.certificate ? `<button class="certificate-link" type="button" data-show-certificate>Ver certificado</button>` : "-"}</td>
    </tr>
  `).join("");

  document.getElementById("activeEmployeesMetric").textContent = 125 + employees.length;
  setText("companyEmployeeCount", `${employees.length} ${employees.length === 1 ? "colaborador" : "colaboradores"}`);
  document.querySelectorAll("#employeeTableBody [data-show-certificate]").forEach((button) => {
    button.addEventListener("click", () => navigate("certificate-view"));
  });
  renderCompanyEmployeeDirectory(document.getElementById("companyEmployeeSearch")?.value || "");
}

function toggleMobileMenu() {
  const nav = document.getElementById("mainNav");
  const auth = document.getElementById("mobileAuth");
  const open = nav.classList.toggle("open");
  auth.classList.toggle("open", open);
  document.getElementById("menuToggle").setAttribute("aria-expanded", String(open));
}

function closeMobileMenu() {
  document.getElementById("mainNav").classList.remove("open");
  document.getElementById("mobileAuth").classList.remove("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", "false");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function formatNumber(value) {
  return new Intl.NumberFormat("pt-BR").format(Number(value) || 0);
}

function normalizeText(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// TODO: buscar cursos no banco de dados
// TODO: salvar progresso real do aluno
// TODO: criar Área do aluno real com Supabase
// TODO: criar Área da empresa real
// TODO: criar Painel admin real
// TODO: implementar upload e streaming protegido de vídeos
// TODO: criar logs de acesso conforme requisitos do treinamento EAD
// TODO: integrar banco PostgreSQL e políticas de acesso
