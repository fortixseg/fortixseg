const APP_CONFIG = {
  brandName: "FortixSeg",
  subtitle: "Treinamentos em Segurança do Trabalho",
  contactEmail: "fortixseg@gmail.com",
  certificateCode: ""
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

const COURSE_CATEGORY_ACCENTS = {
  "Chão de fábrica": "linear-gradient(145deg, #26322c, #08100c 68%)",
  "Administrativo": "linear-gradient(145deg, #315f6e, #f5f7f5 150%)",
  "Liderança": "linear-gradient(145deg, #1b4f3a, #08100c 72%)",
  "RH/SESMT": "linear-gradient(145deg, #3b5369, #08100c 72%)",
  "Manutenção": "linear-gradient(145deg, #7a5c22, #11160f 72%)",
  "Logística": "linear-gradient(145deg, #224f68, #08100c 72%)",
  "DDS": "linear-gradient(145deg, #2f6f2b, #0a140f 72%)",
  "NRs": "linear-gradient(145deg, #226c3f, #08100c 72%)"
};

const courseCatalogRows = [
  ["integ-chao", "INT", "Integração de Segurança", "Chão de fábrica", 4, 79.90],
  ["epi", "EPI", "Uso Correto de EPIs", "Chão de fábrica", 4, 59.90],
  ["percepcao-riscos", "RISCO", "Percepção de Riscos", "Chão de fábrica", 4, 69.90],
  ["apr", "APR", "APR - Análise Preliminar de Risco", "Chão de fábrica", 4, 89.90],
  ["pt", "PT", "Permissão de Trabalho - PT", "Chão de fábrica", 4, 99.90],
  ["loto", "LOTO", "LOTO - Bloqueio e Etiquetagem", "Chão de fábrica", 4, 99.90],
  ["nr12-introdutorio", "NR 12", "NR-12 Introdutório", "NRs", 8, 179.90],
  ["nr12-operadores", "NR 12", "NR-12 para Operadores", "Chão de fábrica", 8, 199.90],
  ["nr12-manutencao", "NR 12", "NR-12 para Manutenção", "Manutenção", 8, 219.90],
  ["nr35", "NR 35", "NR-35 Trabalho em Altura - Teórico", "NRs", 8, 149.90],
  ["nr33-nocoes", "NR 33", "NR-33 Espaço Confinado - Noções", "NRs", 8, 169.90],
  ["nr10", "NR 10", "NR-10 Básico Teórico", "NRs", 40, 249.90],
  ["risco-eletrico-nao-eletricistas", "ELE", "Riscos com Eletricidade para Não Eletricistas", "Chão de fábrica", 4, 89.90],
  ["ferramentas-manuais", "FER", "Ferramentas Manuais com Segurança", "Manutenção", 2, 49.90],
  ["ferramentas-eletricas", "FER", "Ferramentas Elétricas Portáteis", "Manutenção", 4, 79.90],
  ["movimentacao-cargas", "CARGAS", "Movimentação Manual de Cargas", "Chão de fábrica", 4, 69.90],
  ["ergonomia-posto", "NR 17", "Ergonomia no Posto de Trabalho - NR-17", "Chão de fábrica", 4, 79.90],
  ["incendio-nocoes", "INC", "Proteção contra Incêndio - Noções", "Chão de fábrica", 4, 69.90],
  ["produtos-quimicos", "NR 26", "Produtos Químicos e FDS/FISPQ - NR-26", "Chão de fábrica", 4, 89.90],
  ["ar-comprimido", "AR", "Segurança com Ar Comprimido", "Manutenção", 2, 59.90],
  ["solda-corte", "SOLDA", "Segurança em Solda e Corte - Noções", "Manutenção", 4, 99.90],
  ["ponte-rolante", "PONTE", "Ponte Rolante - Teórico", "Logística", 8, 159.90],
  ["talhas-icamento", "TALHAS", "Talhas e Dispositivos de Içamento", "Logística", 4, 89.90],
  ["empilhadeira-reciclagem", "EMP", "Empilhadeira - Reciclagem Teórica", "Logística", 8, 149.90],
  ["paleteira-eletrica", "PAL", "Paleteira Elétrica - Noções de Segurança", "Logística", 4, 79.90],
  ["prensas", "PRENSA", "Segurança em Prensas", "Chão de fábrica", 4, 119.90],
  ["maos-dedos", "MAOS", "Proteção de Mãos e Dedos", "Chão de fábrica", 2, 49.90],
  ["quase-acidente", "QA", "Quase Acidente e Comportamento Seguro", "Chão de fábrica", 2, 49.90],
  ["cinco-s-seguranca", "5S", "5S com Foco em Segurança", "Chão de fábrica", 4, 69.90],
  ["ordem-limpeza", "5S", "Ordem, Limpeza e Organização Segura", "Chão de fábrica", 2, 39.90],
  ["trabalho-quente", "TQ", "Trabalho a Quente - Noções", "Manutenção", 4, 89.90],
  ["contratadas", "CONT", "Segurança para Contratadas", "RH/SESMT", 4, 99.90],
  ["integ-adm", "ADM", "Integração de Segurança para Administrativo", "Administrativo", 4, 69.90],
  ["ergonomia-escritorio", "NR 17", "Ergonomia em Escritório - NR-17", "Administrativo", 4, 79.90],
  ["home-office", "HOME", "Home Office Seguro e Ergonomia", "Administrativo", 2, 49.90],
  ["acidentes-adm", "ADM", "Prevenção de Acidentes no Ambiente Administrativo", "Administrativo", 2, 49.90],
  ["primeiros-socorros", "PS", "Noções de Primeiros Socorros", "Administrativo", 4, 89.90],
  ["evacuacao-emergencia", "EVAC", "Evacuação de Emergência e Abandono de Área", "Administrativo", 2, 49.90],
  ["assedio", "RH", "Assédio Moral e Sexual no Trabalho", "Administrativo", 4, 79.90],
  ["cipa-assedio", "NR 05", "NR-05 CIPA e Prevenção ao Assédio", "Administrativo", 8, 129.90],
  ["saude-mental", "PSICO", "Saúde Mental e Segurança Psicológica", "Administrativo", 4, 89.90],
  ["lgpd-rh-sst", "LGPD", "LGPD para RH e Segurança do Trabalho", "Administrativo", 4, 89.90],
  ["comunicacao-riscos", "COM", "Comunicação de Riscos", "Administrativo", 2, 49.90],
  ["direcao-defensiva", "FROTA", "Direção Defensiva para Frota Leve", "Administrativo", 4, 89.90],
  ["escadas-portateis", "ESC", "Uso Seguro de Escadas Portáteis", "Administrativo", 2, 49.90],
  ["almoxarifado", "ALM", "Organização Segura de Almoxarifado", "Administrativo", 4, 69.90],
  ["ler-dort", "LER", "Qualidade de Vida e Prevenção de LER/DORT", "Administrativo", 4, 79.90],
  ["sst-liderancas", "LID", "SST para Lideranças", "Liderança", 4, 119.90],
  ["responsabilidade-lideranca", "LID", "Responsabilidade da Liderança em Segurança", "Liderança", 4, 119.90],
  ["gro-pgr", "GRO", "Gestão de Riscos Ocupacionais - GRO/PGR", "Liderança", 8, 179.90],
  ["dds-eficaz", "DDS", "Como Conduzir DDS Eficaz", "Liderança", 2, 69.90],
  ["investigacao-acidentes", "INV", "Investigação e Análise de Acidentes", "Liderança", 8, 199.90],
  ["tratamento-quase-acidentes", "QA", "Tratamento de Quase Acidentes", "Liderança", 4, 99.90],
  ["indicadores-seguranca", "KPI", "Gestão de Indicadores de Segurança", "Liderança", 4, 129.90],
  ["auditoria-comportamental", "AUD", "Auditoria Comportamental de Segurança", "Liderança", 4, 129.90],
  ["pt-emitentes", "PT", "Permissão de Trabalho para Emitentes e Aprovadores", "Liderança", 4, 129.90],
  ["gestao-contratadas", "CONT", "Gestão de Contratadas em SST", "Liderança", 4, 129.90],
  ["gestao-reciclagens", "TREIN", "Gestão de Treinamentos e Reciclagens", "Liderança", 4, 99.90],
  ["pae", "PAE", "Plano de Atendimento a Emergências - PAE", "Liderança", 4, 119.90],
  ["cultura-seguranca", "CULT", "Cultura de Segurança e Comportamento Seguro", "Liderança", 4, 99.90],
  ["comunicacao-supervisores", "COM", "Comunicação de Segurança para Supervisores", "Liderança", 2, 69.90],
  ["documentos-sst", "DOC", "Gestão de Documentos de SST", "RH/SESMT", 4, 99.90],
  ["controle-certificados", "CERT", "Controle de Certificados e Validades", "RH/SESMT", 2, 69.90],
  ["esocial-sst", "eSOC", "Noções de eSocial SST", "RH/SESMT", 4, 119.90],
  ["novos-colaboradores", "INT", "Integração de Novos Colaboradores", "RH/SESMT", 4, 79.90],
  ["treinamentos-obrigatorios", "TREIN", "Gestão de Treinamentos Obrigatórios", "RH/SESMT", 4, 99.90],
  ["nr01-rh", "NR 01", "NR-01 para RH e Gestores", "RH/SESMT", 4, 99.90],
  ["matriz-treinamentos", "MATRIZ", "Como Montar Matriz de Treinamentos", "RH/SESMT", 4, 119.90],
  ["evidencias-auditoria", "AUD", "Organização de Evidências para Auditoria", "RH/SESMT", 4, 119.90],
  ["terceiros-documentacao", "TERC", "Terceiros e Documentação de Segurança", "RH/SESMT", 4, 119.90],
  ["lgpd-colaboradores", "LGPD", "LGPD aplicada a Dados de Colaboradores", "RH/SESMT", 4, 89.90],
  ["dds-altura", "DDS", "DDS - Trabalho em Altura", "DDS", 0.5, 19.90],
  ["dds-epi", "DDS", "DDS - Uso Correto de EPIs", "DDS", 0.5, 19.90],
  ["dds-maos", "DDS", "DDS - Proteção das Mãos", "DDS", 0.5, 19.90],
  ["dds-quase-acidente", "DDS", "DDS - Quase Acidente", "DDS", 0.5, 19.90],
  ["dds-ordem-limpeza", "DDS", "DDS - Ordem e Limpeza", "DDS", 0.5, 19.90],
  ["dds-risco-eletrico", "DDS", "DDS - Risco Elétrico", "DDS", 0.5, 19.90],
  ["dds-quimicos", "DDS", "DDS - Produtos Químicos", "DDS", 0.5, 19.90],
  ["dds-ergonomia", "DDS", "DDS - Ergonomia", "DDS", 0.5, 19.90],
  ["dds-cargas", "DDS", "DDS - Movimentação de Cargas", "DDS", 0.5, 19.90],
  ["dds-bloqueio", "DDS", "DDS - Bloqueio de Energia", "DDS", 0.5, 19.90],
  ["dds-escadas", "DDS", "DDS - Escadas Portáteis", "DDS", 0.5, 19.90],
  ["dds-comunicacao-acidentes", "DDS", "DDS - Comunicação de Acidentes", "DDS", 0.5, 19.90],
  ["dds-comportamento", "DDS", "DDS - Comportamento Seguro", "DDS", 0.5, 19.90],
  ["dds-ferramentas", "DDS", "DDS - Uso de Ferramentas", "DDS", 0.5, 19.90],
  ["dds-transito-interno", "DDS", "DDS - Trânsito Interno", "DDS", 0.5, 19.90]
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

upsertCourseCatalog(courseCatalogRows);
courses.forEach(enrichCourseDefaults);

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
    question: "Qual a nota mínima de aprovação do curso?",
    options: ["50%", "60%", "70%", "100%"],
    answer: 2
  },
  {
    question: "O treinamento deve possuir registro de conclusão?",
    options: ["Sim", "Não", "Somente se impresso", "Apenas para empresas"],
    answer: 0
  }
];

const defaultEmployees = [];

const companyAnalytics = {
  "30": {
    title: "Últimos 30 dias",
    delta: "+4 p.p.",
    trend: [{ label: "Sem 1", value: 74 }, { label: "Sem 2", value: 75 }, { label: "Sem 3", value: 77 }, { label: "Sem 4", value: 78 }],
    status: [{ label: "Conformes", value: 78, color: "#2fa31f" }, { label: "Em andamento", value: 14, color: "#19708c" }, { label: "Atenção", value: 8, color: "#d28a1b" }],
    courses: [{ label: "NR 35", value: 42 }, { label: "NR 12", value: 31 }, { label: "EPI", value: 29 }, { label: "NR 10", value: 26 }]
  },
  "90": {
    title: "Últimos 90 dias",
    delta: "+8 p.p.",
    trend: [{ label: "Abril", value: 70 }, { label: "Maio", value: 74 }, { label: "Junho", value: 78 }],
    status: [{ label: "Conformes", value: 78, color: "#2fa31f" }, { label: "Em andamento", value: 14, color: "#19708c" }, { label: "Atenção", value: 8, color: "#d28a1b" }],
    courses: [{ label: "NR 35", value: 42 }, { label: "NR 12", value: 31 }, { label: "EPI", value: 29 }, { label: "NR 10", value: 26 }]
  },
  "365": {
    title: "Últimos 12 meses",
    delta: "+17 p.p.",
    trend: [{ label: "Ago", value: 61 }, { label: "Out", value: 65 }, { label: "Dez", value: 68 }, { label: "Fev", value: 72 }, { label: "Abr", value: 75 }, { label: "Jun", value: 78 }],
    status: [{ label: "Conformes", value: 78, color: "#2fa31f" }, { label: "Em andamento", value: 14, color: "#19708c" }, { label: "Atenção", value: 8, color: "#d28a1b" }],
    courses: [{ label: "NR 35", value: 118 }, { label: "NR 12", value: 92 }, { label: "EPI", value: 84 }, { label: "NR 10", value: 68 }]
  }
};

let cart = readStorage("fortixsegCart", []);
let employees = readStorage("fortixsegEmployees", defaultEmployees);
let certificateUnlocked = readStorage("fortixsegCertificateUnlocked", false);
let studentProgress = Number(readStorage("fortixsegStudentProgress", 0));
let lastQuizGrade = Number(readStorage("fortixsegQuizGrade", 0));
let toastTimer;
let apiOnline = false;
let portalInitialized = false;
const portalData = { student: null, company: null, affiliate: null, admin: null };
let adminCourseCatalog = [];
let companyAnalyticsPeriod = "90";
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
  renderCompanyAnalytics(companyAnalyticsPeriod);
  bindInterface();
  initVirtualAssistant();
  syncCourseCatalog();

  document.getElementById("currentYear").textContent = new Date().getFullYear();
  document.getElementById("certificateDate").textContent = new Intl.DateTimeFormat("pt-BR").format(new Date());
  document.getElementById("certificateGrade").textContent = `${lastQuizGrade}%`;

  const initialPage = location.hash.replace("#", "") || "home";
  navigate(document.querySelector(`[data-page="${initialPage}"]`) ? initialPage : "home", false);
  handlePaymentReturn();
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

function upsertCourseCatalog(rows) {
  rows.forEach((row) => {
    const [id, code, title, category, hours, price] = row;
    const existing = courses.find((course) => course.id === id);
    const patch = {
      id,
      code,
      title,
      category,
      hours,
      price,
      accent: COURSE_CATEGORY_ACCENTS[category] || "linear-gradient(145deg, #2d6f43, #081310)",
      audience: category === "DDS" ? "Equipes que precisam de reforços rápidos e recorrentes de segurança." : `Profissionais e equipes da categoria ${category}.`,
      objective: "Capacitar o participante com conteúdo objetivo, registro de conclusão e avaliação de aprendizagem.",
      lessons: Math.max(1, Math.ceil(Number(hours) || 1)),
      syllabus: [
        "Conceitos principais do tema",
        "Riscos e medidas de controle",
        "Boas práticas aplicadas à rotina",
        "Registro de conclusão",
        "Avaliação final"
      ]
    };
    if (existing) {
      Object.assign(existing, {
        id,
        code,
        title,
        category,
        hours,
        price,
        accent: patch.accent,
        audience: existing.audience || patch.audience,
        objective: existing.objective || patch.objective,
        lessons: existing.lessons || patch.lessons,
        syllabus: Array.isArray(existing.syllabus) && existing.syllabus.length ? existing.syllabus : patch.syllabus
      });
    } else {
      courses.push(patch);
    }
  });
}

function enrichCourseDefaults(course) {
  course.category = normalizeCourseCategory(course.category);
  course.accent = COURSE_CATEGORY_ACCENTS[course.category] || course.accent || "linear-gradient(145deg, #2d6f43, #081310)";
  course.modality = "Online";
  course.lessons = course.lessons || Math.max(1, Math.ceil(Number(course.hours) || 1));
  course.syllabus = Array.isArray(course.syllabus) && course.syllabus.length ? course.syllabus : ["Conceitos principais", "Aplicação na rotina", "Avaliação final"];
  course.audience = course.audience || `Profissionais e equipes da categoria ${course.category}.`;
  course.objective = course.objective || "Capacitar o participante com conteúdo objetivo e avaliação final.";
  course.legalNotice = requiresNrLegalNotice(course);
}

function normalizeCourseCategory(category) {
  const normalized = String(category || "").trim();
  if (/trabalho em altura|espaços confinados|segurança elétrica|gerenciamento de riscos|máquinas|maquinas/i.test(normalized)) return "NRs";
  if (/integração|proteção individual|controle de energias/i.test(normalized)) return "Chão de fábrica";
  return normalized || "Chão de fábrica";
}

function requiresNrLegalNotice(course) {
  return /\bNR\s?[-]?\s?(10|33|35)\b/i.test(`${course.code} ${course.title}`);
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
  const token = localStorage.getItem("fortixsegApiToken");
  const headers = {
    ...(requestOptions.body ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(requestOptions.headers || {})
  };

  try {
    const response = await fetch(path, {
      ...requestOptions,
      headers,
      signal: controller.signal
    });
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    if (!response.ok) throw new Error(data.error || data.message || text || "A API não respondeu corretamente.");
    apiOnline = true;
    return data;
  } catch (error) {
    if (error?.name === "SyntaxError") {
      throw new Error("A API retornou uma resposta inválida.");
    }
    throw error;
  } finally {
    clearTimeout(timer);
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
    } else if (pageName === "affiliate") {
      applyAffiliateDashboard(await apiRequest("/api/affiliate/dashboard"));
    } else if (pageName === "admin") {
      applyAdminDashboard(await apiRequest("/api/admin/dashboard"));
    }
  } catch {
    apiOnline = false;
    const studentStatus = document.getElementById("studentApiStatus");
    if (studentStatus) studentStatus.textContent = "API indisponível";
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
  setText("studentEnrolledMetric", metrics.enrolledCourses ?? 2);
  setText("completedCoursesMetric", Math.max(metrics.completedCourses ?? 1, studentProgress === 100 ? 2 : 1));
  setText("studentCertificatesMetric", Math.max(metrics.certificates ?? 0, certificateUnlocked ? 1 : 0));
  setText("averageProgressMetric", `${studentProgress === 100 ? 100 : metrics.averageProgress ?? 65}%`);
  setText("studentNextActionTitle", firstAction?.title || "Continuar NR 35");
  setText("studentNextActionText", firstAction?.description || "Retome o curso de onde parou.");
  setText("studentSupportSla", data.support?.sla || "Até 1 dia útil");
  setText("studentApiStatus", "API sincronizada");

  const activeCourse = data.courses?.find((course) => course.status === "Em andamento");
  if (activeCourse && studentProgress < 100) {
    studentProgress = Math.max(studentProgress, Number(activeCourse.progress) || 0);
    updateStudentState();
  }

  const certificate = data.latestCertificate;
  if (certificate) {
    APP_CONFIG.certificateCode = certificate.code || APP_CONFIG.certificateCode;
    certificateUnlocked = true;
    setText("certificateStudentName", certificate.student || "João da Silva");
    setText("certificateCourseTitle", certificate.course || "NR 35 - Trabalho em Altura");
    setText("certificateHours", certificate.hours || "8 horas");
    setText("certificateDate", certificate.completedAt || "04/07/2026");
    setText("certificateGrade", `${certificate.grade || 80}%`);
    setText("certificateCodeDisplay", certificate.code || APP_CONFIG.certificateCode);
    setText("certificateValidationCopy", "Validação digital ativa");
    writeStorage("fortixsegCertificateUnlocked", true);
  }
}

function applyCompanyDashboard(data) {
  portalData.company = data;
  const metrics = data.metrics || {};
  setText("activeEmployeesMetric", metrics.activeEmployees ?? 128);
  setText("companyCoursesMetric", metrics.coursesInProgress ?? 32);
  setText("companyCertificatesMetric", metrics.certificates ?? 96);
  setText("companyExpiringMetric", metrics.expiringSoon ?? 18);
  setText("companyComplianceRate", `${metrics.complianceRate ?? 78}%`);
  setText("companySeatsAvailable", metrics.seatsAvailable ?? 42);
  setText("companyAlertTitle", `${metrics.expiringSoon ?? 18} vencimentos`);
  setText("companyAlertText", data.alerts?.[0]?.title || "Certificados próximos do prazo de reciclagem.");

  if (Array.isArray(data.employees)) {
    const combined = [...data.employees];
    employees.forEach((employee) => {
      if (!combined.some((item) => item.name === employee.name)) combined.push(employee);
    });
    employees = combined;
    writeStorage("fortixsegEmployees", employees);
    renderEmployees();
  }

  renderCompanyAnalytics(companyAnalyticsPeriod);
}

function applyAffiliateDashboard(data) {
  portalData.affiliate = data;
  const metrics = data.metrics || {};
  setText("affiliateClicksMetric", formatNumber(metrics.clicks ?? 428));
  setText("affiliateLeadsMetric", formatNumber(metrics.leads ?? 62));
  setText("affiliateSalesMetric", formatNumber(metrics.sales ?? 18));
  setText("affiliateCommissionMetric", formatCurrency(metrics.commission ?? 1248.70));
  setText("affiliateCoupon", data.coupon || "FORTIX10");
  setText("affiliateLink", data.referralLink || "fortixseg.com.br/?ref=fortix10");
  setText("affiliateNextPayout", data.nextPayout || "05/08/2026");

  const referralsBody = document.getElementById("affiliateReferralTableBody");
  if (referralsBody && Array.isArray(data.referrals)) {
    referralsBody.innerHTML = data.referrals.map((referral) => `
      <tr><td>${escapeHtml(referral.name)}</td><td>${escapeHtml(referral.product)}</td><td>${formatCurrency(referral.value)}</td><td><span class="table-status ${referral.status === "Aprovado" ? "complete" : "pending"}">${escapeHtml(referral.status)}</span></td><td>${formatCurrency(referral.commission)}</td></tr>
    `).join("");
  }
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
  updateApiStatus(
    "apiDatabaseStatus",
    data.apiStatus?.database === "postgres" ? "Postgres conectado" : data.apiStatus?.database === "local-file" ? "Arquivo local" : "Conectado",
    data.apiStatus?.database === "postgres"
  );

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
    affiliate: {
      pageId: "page-affiliate",
      eyebrow: "Portal do afiliado",
      views: [
        ["dashboard", "Dashboard", "Vendas e comissões"],
        ["link", "Meu link", "Link e cupom"],
        ["referrals", "Indicações", "Indicações"],
        ["commissions", "Comissões", "Comissões"],
        ["materials", "Materiais", "Materiais de divulgação"],
        ["settings", "Dados bancários", "Dados bancários"]
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
  document.addEventListener("keydown", handlePortalKeydown);
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

  if (!topbar.querySelector("[data-portal-menu-toggle]")) {
    topbar.insertAdjacentHTML("afterbegin", `
      <button class="portal-menu-toggle" type="button" data-portal-menu-toggle aria-label="Abrir navegação" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    `);
  }

  const shell = page.querySelector(".app-shell");
  if (shell && !shell.querySelector("[data-portal-menu-close]")) {
    shell.insertAdjacentHTML("beforeend", '<button class="portal-sidebar-backdrop" type="button" data-portal-menu-close aria-label="Fechar navegação"></button>');
  }
}

function renderCompanyAnalytics(period = "90") {
  const data = companyAnalytics[period] || companyAnalytics["90"];
  const trendChart = document.getElementById("companyComplianceChart");
  const statusDonut = document.getElementById("companyStatusDonut");
  const statusLegend = document.getElementById("companyStatusLegend");
  const courseChart = document.getElementById("companyCourseChart");
  if (!trendChart || !statusDonut || !statusLegend || !courseChart) return;

  companyAnalyticsPeriod = period;
  document.querySelectorAll("[data-company-period]").forEach((button) => {
    const active = button.dataset.companyPeriod === period;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  setText("companyTrendTitle", data.title);
  setText("companyTrendDelta", data.delta);

  trendChart.innerHTML = data.trend.map((item, index) => `
    <button class="company-column ${index === data.trend.length - 1 ? "active" : ""}" type="button" data-company-trend-index="${index}" aria-label="${escapeHtml(item.label)}: ${item.value}% de conformidade">
      <strong>${item.value}%</strong>
      <i><b style="height:${item.value}%"></b></i>
      <span>${escapeHtml(item.label)}</span>
    </button>
  `).join("");

  const firstStop = data.status[0].value;
  const secondStop = firstStop + data.status[1].value;
  statusDonut.style.background = `conic-gradient(${data.status[0].color} 0 ${firstStop}%, ${data.status[1].color} ${firstStop}% ${secondStop}%, ${data.status[2].color} ${secondStop}% 100%)`;
  statusDonut.setAttribute("aria-label", data.status.map((item) => `${item.value}% ${item.label.toLowerCase()}`).join(", "));
  statusLegend.innerHTML = data.status.map((item, index) => `
    <button class="${index === 0 ? "active" : ""}" type="button" data-company-status-index="${index}">
      <i style="background:${item.color}"></i><span>${escapeHtml(item.label)}</span><strong>${item.value}%</strong>
    </button>
  `).join("");

  const courseTotal = data.courses.reduce((total, item) => total + item.value, 0);
  const courseMaximum = Math.max(...data.courses.map((item) => item.value), 1);
  setText("companyCourseTotal", `${courseTotal} matrículas`);
  courseChart.innerHTML = data.courses.map((item, index) => `
    <button class="company-horizontal-bar ${index === 0 ? "active" : ""}" type="button" data-company-course-index="${index}" aria-label="${escapeHtml(item.label)}: ${item.value} colaboradores">
      <span><strong>${escapeHtml(item.label)}</strong><small>${item.value}</small></span>
      <i><b style="width:${Math.round((item.value / courseMaximum) * 100)}%"></b></i>
    </button>
  `).join("");

  selectCompanyTrend(data.trend.length - 1);
  selectCompanyStatus(0);
  selectCompanyCourse(0);
}

function selectCompanyTrend(index) {
  const data = companyAnalytics[companyAnalyticsPeriod] || companyAnalytics["90"];
  const selected = data.trend[index];
  if (!selected) return;
  document.querySelectorAll("[data-company-trend-index]").forEach((button) => {
    const active = Number(button.dataset.companyTrendIndex) === index;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  setText("companySelectedPeriod", `${selected.label} - ${selected.value}% de conformidade`);
}

function selectCompanyStatus(index) {
  const data = companyAnalytics[companyAnalyticsPeriod] || companyAnalytics["90"];
  const selected = data.status[index];
  if (!selected) return;
  document.querySelectorAll("[data-company-status-index]").forEach((button) => {
    const active = Number(button.dataset.companyStatusIndex) === index;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  setText("companyDonutValue", `${selected.value}%`);
  setText("companyDonutLabel", selected.label);
}

function selectCompanyCourse(index) {
  const data = companyAnalytics[companyAnalyticsPeriod] || companyAnalytics["90"];
  const selected = data.courses[index];
  if (!selected) return;
  document.querySelectorAll("[data-company-course-index]").forEach((button) => {
    const active = Number(button.dataset.companyCourseIndex) === index;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  setText("companySelectedCourse", `${selected.label} - ${selected.value} colaboradores`);
}

function togglePortalNavigation(page, force) {
  if (!page) return;
  const open = typeof force === "boolean" ? force : !page.classList.contains("portal-nav-open");
  document.querySelectorAll(".app-page.portal-nav-open").forEach((item) => {
    if (item !== page) item.classList.remove("portal-nav-open");
  });
  page.classList.toggle("portal-nav-open", open);
  const toggle = page.querySelector("[data-portal-menu-toggle]");
  toggle?.setAttribute("aria-expanded", String(open));
  toggle?.setAttribute("aria-label", open ? "Fechar navegação" : "Abrir navegação");
  document.body.classList.toggle("no-scroll", open);
}

function closePortalNavigation(page = document.querySelector(".app-page.portal-nav-open")) {
  if (page) togglePortalNavigation(page, false);
}

function handlePortalKeydown(event) {
  if (event.key === "Escape") closePortalNavigation();
}

function portalViewTemplate(portal, key, title) {
  const templates = {
    student: studentPortalTemplate,
    company: companyPortalTemplate,
    affiliate: affiliatePortalTemplate,
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
  const studentProfile = portalData.student?.profile || {};
  const studentLibrary = Array.isArray(portalData.student?.library) ? portalData.student.library : [];
  const primaryResource = studentLibrary.find((resource) => resource.type === "pdf") || studentLibrary[0];
  const resourceUrl = primaryResource?.url || "assets/apostila-nr35-demonstrativa.pdf";
  const resourceTitle = primaryResource?.title || "Apostila NR 35";

  if (key === "courses") return `
    ${portalHeading("Formação em andamento", title, "Acompanhe progresso, aulas e materiais de cada treinamento.")}
    <div class="portal-card-grid">
      ${courses.slice(0, 2).map((course, index) => `
        <article class="portal-course-card">
          <div class="portal-course-cover" style="--course-bg:${course.accent}"><span>${escapeHtml(course.code)}</span></div>
          <div><span class="course-status ${index ? "complete" : ""}">${index ? "Concluído" : "Em andamento"}</span><h3>${escapeHtml(course.title)}</h3><p>${course.hours} horas - Online - ${course.lessons} aulas</p><div class="progress-track"><i style="width:${index ? 100 : studentProgress}%"></i></div><button class="button ${index ? "button-secondary" : "button-primary"}" type="button" data-portal-action="${index ? "certificate" : "continue-course"}">${index ? "Ver certificado" : "Continuar curso"}</button></div>
        </article>
      `).join("")}
    </div>`;

  if (key === "lessons") return `
    ${portalHeading("Central de conteúdo", title, "Apostilas em PDF e materiais complementares organizados por módulo.")}
    <div class="learning-library">
      <aside class="resource-list" aria-label="Materiais do curso">
        ${studentLibrary.length ? studentLibrary.map((resource, index) => `
          <button class="${index === 0 ? "active" : ""}" type="button" data-portal-resource="${escapeHtml(resource.type || "pdf")}" data-resource-title="${escapeHtml(resource.title)}" data-resource-url="${escapeHtml(resource.url || resourceUrl)}"><span>${escapeHtml((resource.type || "pdf").toUpperCase())}</span><strong>${escapeHtml(resource.title)}</strong><small>${escapeHtml(resource.courseTitle || "Material principal do treinamento")}</small></button>
        `).join("") : `<button class="active" type="button" data-portal-resource="pdf" data-resource-title="${escapeHtml(resourceTitle)}" data-resource-url="${escapeHtml(resourceUrl)}"><span>PDF</span><strong>${escapeHtml(resourceTitle)}</strong><small>Material principal do treinamento</small></button>`}
        <button type="button" data-portal-resource="pdf" data-resource-title="Conteúdo programático"><span>PDF</span><strong>Conteúdo programático</strong><small>Estrutura do curso e tópicos</small></button>
        <button type="button" data-portal-resource="pdf" data-resource-title="Material complementar"><span>PDF</span><strong>Material complementar</strong><small>Consulta e revisão antes da avaliação</small></button>
      </aside>
      <section class="media-viewer" id="studentMediaViewer">
        <div class="media-viewer-header"><span>Material PDF</span><h3>${escapeHtml(resourceTitle)}</h3></div>
        <iframe class="pdf-viewer" src="${escapeHtml(resourceUrl)}#toolbar=1" title="${escapeHtml(resourceTitle)}"></iframe>
        <a class="button button-secondary media-download" href="${escapeHtml(resourceUrl)}" target="_blank" rel="noopener">Abrir PDF em nova guia</a>
      </section>
    </div>`;

  if (key === "assessments") return `
    ${portalHeading("Desempenho", title, "Consulte tentativas, notas e avaliações disponíveis.")}
    <div class="portal-card-grid compact">
      <article class="portal-data-card"><span>NR 35</span><h3>Avaliação final</h3><p>Nota mínima: 70% - 3 tentativas</p><strong class="status-copy">Disponível</strong><button class="button button-primary" type="button" data-portal-action="open-quiz">Fazer avaliação</button></article>
      <article class="portal-data-card"><span>Uso Correto de EPIs</span><h3>Avaliação concluída</h3><p>Melhor nota registrada</p><strong class="grade-copy">${lastQuizGrade}%</strong><button class="button button-secondary" type="button" data-portal-action="certificate">Ver certificado</button></article>
    </div>`;

  if (key === "certificates") return `
    ${portalHeading("Documentos", title, "Certificados liberados após conclusão e aprovação.")}
    <div class="portal-list-card"><div><span class="document-mark">PDF</span><div><strong>Uso Correto de EPIs</strong><small>4 horas - Código FS-EPI-2026-000122</small></div></div><button class="button button-secondary" type="button" data-portal-action="certificate">Visualizar</button></div>
    <div class="portal-list-card locked"><div><span class="document-mark">NR</span><div><strong>NR 35 - Trabalho em Altura</strong><small>Certificado liberado após aprovação</small></div></div><span class="table-status pending">Pendente</span></div>`;

  if (key === "profile") return `
    ${portalHeading("Conta", title, "Mantenha seus dados de contato atualizados.")}
    <form class="portal-form" id="studentProfileForm"><div class="form-grid"><label class="field full"><span>Nome completo</span><input name="name" value="${escapeHtml(studentProfile.name || currentSession?.user?.name || "")}" required></label><label class="field"><span>CPF</span><input name="cpf" value="${escapeHtml(currentSession?.user?.document || "")}" required></label><label class="field"><span>Telefone</span><input name="phone" value="${escapeHtml(currentSession?.user?.phone || "")}" required></label><label class="field full"><span>E-mail</span><input name="email" type="email" value="${escapeHtml(studentProfile.email || currentSession?.user?.email || "")}" required></label></div><button class="button button-primary" type="submit">Salvar alterações</button></form>`;

  return `
    ${portalHeading("Atendimento", title, "Envie sua dúvida para a equipe de suporte FortixSeg.")}
    <form class="portal-form" id="studentSupportForm"><div class="form-grid"><label class="field full"><span>Assunto</span><select name="subject"><option>Acesso ao curso</option><option>Conteúdo e aulas</option><option>Avaliação</option><option>Certificado</option></select></label><label class="field full"><span>Mensagem</span><textarea name="message" rows="6" required></textarea></label></div><button class="button button-primary" type="submit">Abrir solicitação</button></form>`;
}

function companyPortalTemplate(key, title) {
  const companyData = portalData.company || {};
  const companyName = companyData.company?.name || currentSession?.user?.companyName || currentSession?.user?.name || "";
  const companyEmail = currentSession?.user?.email || "";
  const companyEmployees = Array.isArray(companyData.employees) ? companyData.employees : employees;
  const completedEmployees = companyEmployees.filter((item) => item.status === "Concluído");
  const pendingEmployees = companyEmployees.filter((item) => item.status !== "Concluído");

  if (key === "employees") return `
    ${portalHeading("Gestão de pessoas", title, "Cadastre, filtre e acompanhe os colaboradores vinculados.", '<button class="button button-primary" type="button" data-portal-action="add-employee">Adicionar colaborador</button>')}
    <div class="portal-toolbar"><label class="search-field"><input id="companyEmployeeSearch" type="search" placeholder="Buscar colaborador ou curso"></label><span id="companyEmployeeCount">${employees.length} colaboradores</span></div>
    <div class="dashboard-section portal-table-section"><div class="table-wrap"><table><thead><tr><th>Nome</th><th>Curso</th><th>Progresso</th><th>Status</th><th>Certificado</th></tr></thead><tbody id="companyEmployeeDirectoryBody"></tbody></table></div></div>`;

  if (key === "purchase") return `
    ${portalHeading("Licenças corporativas", title, "Escolha o treinamento e adicione vagas ao carrinho da empresa.")}
    <form class="portal-form" id="companyPortalBulkForm"><div class="form-grid"><label class="field full"><span>Curso</span><select id="companyPortalBulkCourse" required>${courses.map((course) => `<option value="${course.id}">${escapeHtml(course.title)} - ${formatCurrency(course.price)}</option>`).join("")}</select></label><label class="field"><span>Quantidade de vagas</span><input id="companyPortalBulkQuantity" type="number" min="1" max="500" value="10" required></label><label class="field"><span>Centro de custo</span><input name="costCenter" placeholder="Ex.: Operações"></label></div><div class="purchase-summary"><span>Estimativa</span><strong id="companyBulkEstimate">${formatCurrency(courses[0].price * 10)}</strong></div><button class="button button-primary" type="submit">Adicionar ao carrinho corporativo</button></form>`;

  if (key === "progress") return `
    ${portalHeading("Acompanhamento", title, "Monitore matrículas e identifique quem precisa de apoio.")}
    <div class="dashboard-section portal-table-section"><div class="table-wrap"><table><thead><tr><th>Colaborador</th><th>Curso</th><th>Aulas</th><th>Progresso</th><th>Status</th></tr></thead><tbody>${companyEmployees.length ? companyEmployees.map((employee) => `<tr><td>${escapeHtml(employee.name)}</td><td>${escapeHtml(employee.course || "-")}</td><td>${escapeHtml(employee.progress === "100%" ? "Curso concluído" : "Em execução")}</td><td><span class="table-status ${employee.status === "Concluído" ? "complete" : employee.status === "Em andamento" ? "progress" : "pending"}">${escapeHtml(employee.progress || "0%")}</span></td><td>${escapeHtml(employee.status || "Não iniciado")}</td></tr>`).join("") : `<tr><td colspan="5">Nenhum colaborador cadastrado até o momento.</td></tr>`}</tbody></table></div></div>`;

  if (key === "certificates") return `
    ${portalHeading("Documentos da equipe", title, "Consulte certificados emitidos e códigos de validação.")}
    <div class="dashboard-section portal-table-section"><div class="table-wrap"><table><thead><tr><th>Colaborador</th><th>Curso</th><th>Situação</th><th>Código</th><th>Ação</th></tr></thead><tbody>${completedEmployees.length ? completedEmployees.map((employee) => `<tr><td>${escapeHtml(employee.name)}</td><td>${escapeHtml(employee.course || "-")}</td><td><span class="table-status complete">Emitido</span></td><td>${escapeHtml(employee.certificateCode || "Disponível no painel do aluno")}</td><td><button class="certificate-link" type="button" data-portal-action="certificate">Visualizar</button></td></tr>`).join("") : `<tr><td colspan="5">Nenhum certificado emitido para esta empresa ainda.</td></tr>`}</tbody></table></div></div>`;

  if (key === "reports") return `
    ${portalHeading("Indicadores", title, "Gere arquivos para conferência interna e auditorias.")}
    <div class="portal-card-grid compact"><article class="portal-data-card"><span>Relatório operacional</span><h3>Colaboradores e progresso</h3><p>Exportação CSV com matrícula, curso e situação.</p><button class="button button-primary" type="button" data-portal-action="export-company-report">Exportar CSV</button></article><article class="portal-data-card"><span>Resumo executivo</span><h3>Conformidade da equipe</h3><p>${escapeHtml(String(companyData.metrics?.complianceRate ?? 0))}% dentro do ciclo esperado.</p><button class="button button-secondary" type="button" data-portal-action="print-report">Imprimir resumo</button></article></div>`;

  if (key === "expirations") return `
    ${portalHeading("Reciclagens", title, "Antecipe vencimentos e organize novas turmas.")}
    <div class="dashboard-section portal-table-section"><div class="table-wrap"><table><thead><tr><th>Colaborador</th><th>Curso</th><th>Situação</th><th>Prazo</th><th>Ação</th></tr></thead><tbody>${pendingEmployees.length ? pendingEmployees.map((employee) => `<tr><td>${escapeHtml(employee.name)}</td><td>${escapeHtml(employee.course || "-")}</td><td><span class="table-status pending">${escapeHtml(employee.status || "Pendente")}</span></td><td>A definir</td><td><button class="certificate-link" type="button" data-portal-action="renew-course" data-course-id="nr35">Reciclar</button></td></tr>`).join("") : `<tr><td colspan="5">Nenhum vencimento ou reciclagem pendente no momento.</td></tr>`}</tbody></table></div></div>`;

  return `
    ${portalHeading("Conta corporativa", title, "Configure alertas e preferências operacionais.")}
    <form class="portal-form" id="companySettingsForm"><div class="form-grid"><label class="field full"><span>Razão social</span><input name="company" value="${escapeHtml(companyName)}" required></label><label class="field"><span>E-mail responsável</span><input name="email" type="email" value="${escapeHtml(companyEmail)}" required></label><label class="field"><span>Alerta de vencimento</span><select name="expiryAlert"><option>60 dias antes</option><option>30 dias antes</option><option>15 dias antes</option></select></label><label class="field full"><span>Receber resumo semanal</span><select name="weekly"><option>Sim</option><option>Não</option></select></label></div><button class="button button-primary" type="submit">Salvar configurações</button></form>`;
}

function affiliatePortalTemplate(key, title) {
  const affiliateData = portalData.affiliate || {};
  const affiliateProfile = affiliateData.profile || {};
  const affiliateCoupon = affiliateData.coupon || "Seu cupom será gerado após o primeiro acesso";
  const affiliateLink = affiliateData.referralLink || `${window.location.origin}/`;
  const affiliateMetrics = affiliateData.metrics || {};
  const affiliateReferrals = Array.isArray(affiliateData.referrals) ? affiliateData.referrals : [];

  if (key === "link") return `
    ${portalHeading("Rastreamento", title, "Use seu link e cupom para divulgar os treinamentos e acompanhar vendas atribuídas.")}
    <div class="portal-card-grid compact">
      <article class="portal-data-card"><span>Link principal</span><h3>${escapeHtml(affiliateLink)}</h3><p>Compartilhe em WhatsApp, Instagram, LinkedIn ou proposta comercial.</p><button class="button button-secondary" type="button" data-copy-text="${escapeHtml(affiliateLink)}">Copiar link</button></article>
      <article class="portal-data-card"><span>Cupom</span><h3>${escapeHtml(affiliateCoupon)}</h3><p>Código exclusivo para rastrear origem da venda.</p><button class="button button-secondary" type="button" data-copy-text="${escapeHtml(affiliateCoupon)}">Copiar cupom</button></article>
    </div>`;

  if (key === "referrals") return `
    ${portalHeading("Funil comercial", title, "Veja indicações, produtos de interesse e situação de cada venda.")}
    <div class="dashboard-section portal-table-section"><div class="table-wrap"><table><thead><tr><th>Lead</th><th>Produto</th><th>Valor</th><th>Status</th><th>Comissão</th></tr></thead><tbody>${affiliateReferrals.length ? affiliateReferrals.map((referral) => `<tr><td>${escapeHtml(referral.name)}</td><td>${escapeHtml(referral.product)}</td><td>${formatCurrency(referral.value)}</td><td><span class="table-status ${referral.status === "Aprovado" ? "complete" : "pending"}">${escapeHtml(referral.status)}</span></td><td>${formatCurrency(referral.commission)}</td></tr>`).join("") : `<tr><td colspan="5">Nenhuma indicação registrada até o momento.</td></tr>`}</tbody></table></div></div>`;

  if (key === "commissions") return `
    ${portalHeading("Financeiro do afiliado", title, "Acompanhe valores aprovados, em análise e previsão de pagamento.")}
    <div class="portal-card-grid compact"><article class="portal-data-card"><span>Aprovado</span><h3>${formatCurrency(affiliateMetrics.commission ?? 0)}</h3><p>Comissões liberadas após confirmação do pagamento.</p><strong class="status-copy">Próximo pagamento: ${escapeHtml(affiliateData.nextPayout || "A definir")}</strong></article><article class="portal-data-card"><span>Leads ativos</span><h3>${formatNumber(affiliateMetrics.leads ?? 0)}</h3><p>Indicações em acompanhamento comercial.</p><strong class="status-copy">${formatNumber(affiliateMetrics.sales ?? 0)} vendas aprovadas</strong></article></div>`;

  if (key === "materials") return `
    ${portalHeading("Divulgação", title, "Materiais de apoio para apresentar treinamentos, pacotes e diferenciais da plataforma.")}
    <div class="portal-card-grid compact"><article class="portal-data-card"><span>PDF comercial</span><h3>Apresentação FortixSeg</h3><p>Use para explicar pacotes, área do aluno e certificado com QR Code.</p><button class="button button-secondary" type="button" data-nav="courses">Ver catálogo</button></article><article class="portal-data-card"><span>Argumento de venda</span><h3>Pacotes para empresas</h3><p>Integração, chão de fábrica, manutenção, liderança e RH/SESMT.</p><button class="button button-secondary" type="button" data-nav="companies">Ver empresas</button></article></div>`;

  return `
    ${portalHeading("Conta do afiliado", title, "Atualize seus dados de contato e recebimento de comissão.")}
    <form class="portal-form" id="affiliateSettingsForm"><div class="form-grid"><label class="field full"><span>Nome do afiliado</span><input name="name" value="${escapeHtml(affiliateProfile.name || currentSession?.user?.name || "")}" required></label><label class="field"><span>E-mail</span><input name="email" type="email" value="${escapeHtml(affiliateProfile.email || currentSession?.user?.email || "")}" required></label><label class="field"><span>Telefone</span><input name="phone" value="${escapeHtml(currentSession?.user?.phone || "")}" required></label><label class="field full"><span>Chave Pix</span><input name="pix" placeholder="Informe a chave Pix para repasse"></label></div><button class="button button-primary" type="submit">Salvar dados</button></form>`;
}

function adminPortalTemplate(key, title) {
  if (key === "courses") return adminCourseManagerTemplate(title);
  if (key === "students") return `${portalHeading("Usuários", title, "Acompanhe cadastros, cursos e situação acadêmica.")}<div class="dashboard-section portal-table-section"><div class="table-wrap"><table><thead><tr><th>Aluno</th><th>Curso</th><th>Status</th><th>Última atualização</th></tr></thead><tbody>${(portalData.admin?.recentStudents || []).length ? (portalData.admin.recentStudents || []).map((student) => `<tr><td>${escapeHtml(student.name)}</td><td>${escapeHtml(student.course)}</td><td><span class="table-status ${student.status === "Concluído" ? "complete" : "progress"}">${escapeHtml(student.status)}</span></td><td>${escapeHtml(student.date)}</td></tr>`).join("") : `<tr><td colspan="4">Nenhuma movimentação acadêmica registrada ainda.</td></tr>`}</tbody></table></div></div>`;
  if (key === "companies") return `${portalHeading("Contas B2B", title, "Visualize empresas, colaboradores e consumo de licenças.")}<div class="portal-card-grid compact"><article class="portal-data-card"><span>Empresas ativas</span><h3>${formatNumber(portalData.admin?.metrics?.companies ?? 0)}</h3><p>Contas corporativas cadastradas na plataforma.</p><strong class="status-copy">Operação ativa</strong></article><article class="portal-data-card"><span>Alunos ativos</span><h3>${formatNumber(portalData.admin?.metrics?.students ?? 0)}</h3><p>Usuários com acesso liberado no ambiente.</p><strong class="status-copy">Base sincronizada</strong></article></div>`;
  if (key === "certificates") return `${portalHeading("Rastreabilidade", title, "Consulte documentos emitidos e validações públicas.")}<div class="portal-card-grid compact"><article class="portal-data-card"><span>Total emitido</span><h3>${formatNumber(portalData.admin?.metrics?.certificates ?? 0)} certificados</h3><p>Códigos únicos registrados na plataforma.</p><button class="button button-secondary" type="button" data-nav="certificates">Abrir validador</button></article><article class="portal-data-card"><span>Catálogo</span><h3>${formatNumber(portalData.admin?.metrics?.courses ?? 0)} cursos</h3><p>Treinamentos publicados e prontos para matrícula.</p><strong class="status-copy">Operação normal</strong></article></div>`;
  if (key === "payments") return `${portalHeading("Financeiro", title, "Acompanhe transações e o estado da integração.")}<div class="dashboard-section portal-table-section"><div class="table-wrap"><table><thead><tr><th>Cliente</th><th>Pedido</th><th>Valor</th><th>Status</th></tr></thead><tbody>${(portalData.admin?.recentPayments || []).length ? (portalData.admin.recentPayments || []).map((payment) => `<tr><td>${escapeHtml(payment.client)}</td><td>${escapeHtml(payment.course)}</td><td>${formatCurrency(payment.value)}</td><td><span class="table-status ${payment.status === "Aprovado" || payment.status === "Pago" ? "complete" : "pending"}">${escapeHtml(payment.status)}</span></td></tr>`).join("") : `<tr><td colspan="4">Nenhum pagamento registrado até o momento.</td></tr>`}</tbody></table></div></div>`;
  if (key === "reports") return `${portalHeading("Dados", title, "Exporte uma visão consolidada da operação.")}<div class="portal-card-grid compact"><article class="portal-data-card"><span>Operação</span><h3>Resumo da plataforma</h3><p>Alunos, empresas, certificados e pagamentos.</p><button class="button button-primary" type="button" data-portal-action="export-admin-report">Exportar CSV</button></article><article class="portal-data-card"><span>Integrações</span><h3>Saúde da API</h3><p>Servidor online; OpenAI e Mercado Pago dependem das credenciais.</p><button class="button button-secondary" type="button" data-portal-action="refresh-admin">Atualizar status</button></article></div>`;
  return `${portalHeading("Sistema", title, "Preferências visuais e operacionais da administração.")}<form class="portal-form" id="adminSettingsForm"><div class="form-grid"><label class="field full"><span>Nome da plataforma</span><input name="brand" value="FortixSeg" required></label><label class="field"><span>E-mail de suporte</span><input name="supportEmail" type="email" value="fortixseg@gmail.com" required></label><label class="field"><span>Nota mínima</span><input name="minimumGrade" type="number" min="0" max="100" value="70" required></label><label class="field full"><span>Modo de manutenção</span><select name="maintenance"><option>Desativado</option><option>Ativado</option></select></label></div><button class="button button-primary" type="submit">Salvar configurações</button></form>`;
}

function adminCourseManagerTemplate(title) {
  return `
    ${portalHeading("Catálogo e conteúdo", title, "Crie cursos completos, altere preços e gerencie apostilas em PDF.", '<button class="button button-primary" type="button" data-portal-action="admin-new-course">Novo curso</button>')}
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
            <div><span>Biblioteca do curso</span><h4>Apostilas em PDF</h4><p>Envie somente arquivos PDF. Cada arquivo pode ter até 12 MB.</p></div>
            <label class="admin-upload-field"><input id="adminCourseFiles" type="file" accept="application/pdf" multiple><span>Selecionar PDFs</span></label>
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
  closePortalNavigation(page);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function handlePortalClick(event) {
  const menuToggle = event.target.closest("[data-portal-menu-toggle]");
  if (menuToggle) {
    togglePortalNavigation(menuToggle.closest(".app-page"));
    return;
  }

  if (event.target.closest("[data-portal-menu-close]")) {
    closePortalNavigation();
    return;
  }

  const periodButton = event.target.closest("[data-company-period]");
  if (periodButton) {
    renderCompanyAnalytics(periodButton.dataset.companyPeriod);
    return;
  }

  const trendButton = event.target.closest("[data-company-trend-index]");
  if (trendButton) {
    selectCompanyTrend(Number(trendButton.dataset.companyTrendIndex));
    return;
  }

  const statusButton = event.target.closest("[data-company-status-index]");
  if (statusButton) {
    selectCompanyStatus(Number(statusButton.dataset.companyStatusIndex));
    return;
  }

  const courseButton = event.target.closest("[data-company-course-index]");
  if (courseButton) {
    selectCompanyCourse(Number(courseButton.dataset.companyCourseIndex));
    return;
  }

  const portalButton = event.target.closest("[data-portal-target]");
  if (portalButton) {
    activatePortalView(portalButton);
    return;
  }

  const resourceButton = event.target.closest("[data-portal-resource]");
  if (resourceButton) {
    showStudentResource(resourceButton);
    return;
  }

  const copyButton = event.target.closest("[data-copy-text]");
  if (copyButton) {
    copyToClipboard(copyButton.dataset.copyText);
    return;
  }

  const actionButton = event.target.closest("[data-portal-action]");
  if (!actionButton) return;
  const action = actionButton.dataset.portalAction;

  if (action === "continue-course") navigate("lesson");
  if (action === "certificate") navigate("certificate-view");
  if (action === "add-employee") openModal("employeeModal");
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

async function copyToClipboard(value) {
  const text = String(value || "");
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    showToast("Copiado para a área de transferência.");
  } catch {
    showToast(text);
  }
}

function showStudentResource(button) {
  document.querySelectorAll(".resource-list button").forEach((item) => item.classList.toggle("active", item === button));
  const viewer = document.getElementById("studentMediaViewer");
  if (!viewer) return;
  const title = button.dataset.resourceTitle || "Material do curso";
  const url = button.dataset.resourceUrl || "assets/apostila-nr35-demonstrativa.pdf";

  viewer.innerHTML = `
    <div class="media-viewer-header"><span>Material PDF</span><h3>${escapeHtml(title)}</h3></div>
    <iframe class="pdf-viewer" src="${escapeHtml(url)}#toolbar=1" title="${escapeHtml(title)}"></iframe>
    <a class="button button-secondary media-download" href="${escapeHtml(url)}" target="_blank" rel="noopener">Abrir PDF em nova guia</a>
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
    void submitStudentProfileForm(form);
  }
  if (form.id === "studentSupportForm") {
    event.preventDefault();
    void submitStudentSupportForm(form);
  }
  if (form.id === "companyPortalBulkForm") {
    event.preventDefault();
    addToCart(document.getElementById("companyPortalBulkCourse").value, Number(document.getElementById("companyPortalBulkQuantity").value), true);
    openCart();
  }
  if (form.id === "companySettingsForm") {
    event.preventDefault();
    void submitCompanySettingsForm(form);
  }
  if (form.id === "affiliateSettingsForm") {
    event.preventDefault();
    void submitAffiliateSettingsForm(form);
  }
  if (form.id === "adminSettingsForm") {
    event.preventDefault();
    void submitAdminSettingsForm(form);
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
  } catch {
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
          <p>${escapeHtml(course.code)} - ${course.hours}h - ${topicCount} tópicos - ${resourceCount} materiais</p>
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
      <span class="admin-resource-type pdf">PDF</span>
      <div><strong>${escapeHtml(resource.name)}</strong><small>${formatFileSize(resource.size)}</small></div>
      <a class="icon-button" href="${escapeHtml(resource.url)}" target="_blank" rel="noopener" aria-label="Abrir ${escapeHtml(resource.name)}" title="Abrir material">↗</a>
      <button class="icon-button danger" type="button" data-portal-action="admin-delete-resource" data-course-id="${escapeHtml(course.id)}" data-resource-id="${escapeHtml(resource.id)}" aria-label="Excluir ${escapeHtml(resource.name)}" title="Excluir material">×</button>
    </article>
  `).join("") || "<p>Nenhum material adicionado. Salve o curso com arquivos selecionados para iniciar a biblioteca.</p>";
}

function renderSelectedAdminFiles(fileList) {
  const container = document.getElementById("adminCourseFileSelection");
  if (!container) return;
  const files = Array.from(fileList || []);
  container.innerHTML = files.length
    ? `<strong>${files.length} ${files.length === 1 ? "arquivo selecionado" : "arquivos selecionados"}</strong>${files.map((file) => `<span>${escapeHtml(file.name)} - ${formatFileSize(file.size)}</span>`).join("")}`
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
  if (files.some((file) => file.type !== "application/pdf")) {
    showToast("Por enquanto, anexe somente arquivos PDF ao curso.");
    return;
  }
  if (files.some((file) => file.size > 12_000_000)) {
    showToast("Cada arquivo deve ter no máximo 12 MB.");
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
  const allowedTypes = ["application/pdf"];
  if (!allowedTypes.includes(file.type)) throw new Error(`Formato não permitido: ${file.name}. Envie somente PDF.`);
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
  const currentUser = readStorage("fortixsegCurrentUser", null);
  const pageAccess = {
    student: ["student", "admin"],
    lesson: ["student", "admin"],
    "company-dashboard": ["company", "admin"],
    affiliate: ["affiliate", "admin"],
    admin: ["admin"]
  };
  const allowedRoles = pageAccess[pageName];
  const hasApiToken = Boolean(localStorage.getItem("fortixsegApiToken"));

  if (allowedRoles && (!currentUser || !allowedRoles.includes(currentUser.role) || (pageName === "admin" && !hasApiToken))) {
    pageName = "home";
    openAuth("login");
    showToast("Faça login com o perfil correto para acessar essa área.");
  }

  document.querySelectorAll(".page").forEach((page) => page.classList.remove("active"));
  const targetPage = document.querySelector(`[data-page="${pageName}"]`);
  if (!targetPage) return;

  targetPage.classList.add("active");
  const hasSession = Boolean(currentUser);
  const portalModePages = ["student", "company-dashboard", "affiliate", "admin", "lesson"];
  const portalMode = portalModePages.includes(pageName) || (pageName === "certificate-view" && hasSession);
  document.body.classList.toggle("portal-mode", portalMode);
  closePortalNavigation();
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

function renderCourseFilters() {
  const holder = document.getElementById("courseFilters");
  if (!holder) return;

  const categories = ["Todos", "Chão de fábrica", "Administrativo", "Liderança", "RH/SESMT", "Manutenção", "Logística", "DDS", "NRs", "Pacotes"];
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

function packageCardTemplate(pkg, featured = false) {
  const listItems = pkg.courses.slice(0, featured ? 7 : 5).map((course) => `<li>${escapeHtml(course)}</li>`).join("");
  const remaining = pkg.courses.length > (featured ? 7 : 5) ? `<li>+${pkg.courses.length - (featured ? 7 : 5)} treinamento(s) incluso(s)</li>` : "";

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
      <button class="button button-primary button-block" type="button" data-package-buy="${escapeHtml(pkg.id)}">Comprar pacote</button>
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
    const packageButton = event.target.closest("[data-package-buy]");
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
      const packageId = packageButton.dataset.packageBuy;
      const quantityInput = packageButton.closest(".package-card")?.querySelector(`[data-package-quantity="${packageId}"]`);
      const quantity = Math.max(1, Number(quantityInput?.value) || 1);
      addPackageToCart(packageId, quantity);
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
      closePortalNavigation();
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
  const matchedPackage = trainingPackages.find((pkg) => {
    const compactCode = normalizeText(pkg.code).replace(/\s+/g, "");
    return compactQuestion.includes(compactCode) || question.includes(normalizeText(pkg.title));
  });
  const matchedCourse = courses.find((course) => {
    const compactCode = normalizeText(course.code).replace(/\s+/g, "");
    return compactQuestion.includes(compactCode) || question.includes(normalizeText(course.title));
  });

  if (matchedPackage) {
    return {
      text: `${matchedPackage.title} custa ${formatCurrency(matchedPackage.price)} por colaborador, possui ${formatHours(matchedPackage.hours)} de carga total e inclui treinamentos como ${matchedPackage.courses.slice(0, 3).join(", ")}. O carrinho aplica desconto automático por quantidade.`,
      actions: [
        { label: "Ver pacotes", type: "companies" },
        { label: "Solicitar proposta", type: "proposal" }
      ]
    };
  }

  if (matchedCourse) {
    return {
      text: `${matchedCourse.title} possui ${formatHours(matchedCourse.hours)}, é online e custa ${formatCurrency(matchedCourse.price)}. O certificado digital é liberado após conclusão e aprovação com nota mínima de 70%.${matchedCourse.legalNotice ? " Para NR-10, NR-33 e NR-35, pode haver etapa prática/presencial conforme atividade e procedimento da empresa." : ""}`,
      actions: [
        { label: "Ver detalhes", type: "course", value: matchedCourse.id },
        { label: "Comprar", type: "buy", value: matchedCourse.id }
      ]
    };
  }

  if (includesAny(question, ["desconto", "descontos", "quantidade", "colaboradores", "turma", "vagas"])) {
    return {
      text: "Os pacotes empresariais têm desconto automático por quantidade: 6 a 20 colaboradores recebem 10%, 21 a 50 recebem 15%, 51 a 100 recebem 20% e acima de 100 fica sob proposta.",
      actions: [
        { label: "Ver pacotes", type: "companies" },
        { label: "Solicitar proposta", type: "proposal" }
      ]
    };
  }

  if (includesAny(question, ["curso", "treinamento", "preco", "valor", "catalogo", "nr "])) {
    return {
      text: "A FortixSeg possui catálogo completo para chão de fábrica, administrativo, manutenção, liderança, RH/SESMT, DDS e NRs. Há cursos individuais a partir de R$ 19,90 e pacotes empresariais por colaborador.",
      actions: [{ label: "Abrir catálogo", type: "courses" }]
    };
  }

  if (includesAny(question, ["certificado", "qr code", "validar", "validade", "codigo"])) {
    return {
      text: "O certificado digital é liberado após conclusão das aulas e aprovação na avaliação. Ele possui código único e QR Code para consulta pública na página de validação.",
      actions: [{ label: "Validar certificado", type: "certificates" }]
    };
  }

  if (includesAny(question, ["empresa", "empresarial", "empresariais", "pacote", "pacotes", "colaborador", "equipe", "lote", "relatorio", "vencimento", "proposta"])) {
    return {
      text: "Para empresas, há pacotes prontos como Integração Essencial, Chão de Fábrica, Liderança, Manutenção e RH/SESMT, com descontos por quantidade e painel para acompanhar progresso, certificados e vencimentos.",
      actions: [
        { label: "Soluções para empresas", type: "companies" },
        { label: "Solicitar proposta", type: "contact" }
      ]
    };
  }

  if (includesAny(question, ["dashboard", "painel", "graficos", "gráfico", "indicador", "indicadores", "relatorios", "relatórios"])) {
    return {
      text: "A área da empresa mostra colaboradores ativos, cursos em andamento, certificados emitidos, vencimentos próximos, gráficos de conformidade, situação da equipe, matrículas por curso e relatórios para acompanhamento.",
      actions: [
        { label: "Ver página Empresas", type: "companies" },
        { label: "Entrar como empresa", type: "login" }
      ]
    };
  }

  if (includesAny(question, ["pdf", "apostila", "aula", "material", "upload", "conteudo programatico", "conteúdo programático"])) {
    return {
      text: "Nesta fase, a plataforma está preparada para cursos com apostilas em PDF, conteúdo programático e avaliação. No painel admin é possível cadastrar curso, preço, aulas, programa e anexar PDFs.",
      actions: [
        { label: "Entrar como admin", type: "login" },
        { label: "Ver catálogo", type: "courses" }
      ]
    };
  }

  if (includesAny(question, ["admin", "administrador", "adicionar curso", "alterar preco", "alterar preço", "subir curso", "cadastrar curso"])) {
    return {
      text: "O painel admin permite cadastrar cursos, alterar preços, editar conteúdo programático, definir nota mínima, tentativas, status de publicação e anexar PDFs. O acesso admin deve usar a senha configurada no servidor.",
      actions: [{ label: "Entrar", type: "login" }]
    };
  }

  if (includesAny(question, ["aluno", "candidato", "meus cursos", "aulas", "meus certificados", "area do aluno", "área do aluno"])) {
    return {
      text: "A área do aluno possui painel, cursos matriculados, aulas, avaliações, certificados, dados e suporte. O certificado aparece após conclusão e aprovação.",
      actions: [{ label: "Entrar", type: "login" }]
    };
  }

  if (includesAny(question, ["nr10", "nr 10", "nr33", "nr 33", "nr35", "nr 35", "pratica", "prática", "presencial"])) {
    return {
      text: "Os treinamentos de NR-10, NR-33 e NR-35 podem exigir etapa prática/presencial, autorização formal ou avaliação complementar conforme atividade, risco e procedimento da empresa. A plataforma deixa essa observação nos cursos regulatórios.",
      actions: [{ label: "Ver cursos", type: "courses" }]
    };
  }

  if (includesAny(question, ["avaliacao", "prova", "nota", "aprovacao", "tentativa", "reprovado"])) {
    return {
      text: "A avaliação final verifica o aprendizado do curso. A nota mínima é 70%, com até 3 tentativas. Se a nota for menor, você pode revisar o conteúdo e tentar novamente.",
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
      text: "Com o servidor configurado, o carrinho cria uma compra segura no Mercado Pago e redireciona para o checkout. A FortixSeg não solicita dados de cartão pelo chat ou formulários do site.",
      actions: [{ label: "Ver cursos", type: "courses" }]
    };
  }

  if (includesAny(question, ["vercel", "netlify", "funcao", "função", "erro checkout", "nao abre checkout", "não abre checkout", "api", "integracao", "integração", "openai", "ia"])) {
    return {
      text: "Para checkout real na Vercel, a funcao api/checkout-preference.js precisa estar publicada e a variavel MERCADO_PAGO_ACCESS_TOKEN precisa estar configurada no painel. Para IA real, configure OPENAI_API_KEY no servidor; sem isso, o atendimento usa a base local.",
      actions: [{ label: "Abrir contato", type: "contact" }]
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
  if (type === "proposal") {
    closeAssistant();
    scrollToProposalForm();
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
  document.getElementById("forgotPassword").addEventListener("click", () => showToast("Solicite a redefinição de senha ao suporte até o fluxo automático ser liberado."));

  document.querySelectorAll("[data-account-type]").forEach((button) => {
    button.addEventListener("click", () => switchAccountType(button.dataset.accountType));
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
  const normalizedType = ["candidate", "company", "affiliate", "admin"].includes(type) ? type : "candidate";
  document.getElementById("accountType").value = normalizedType;
  document.getElementById("candidateFields").classList.toggle("hidden", normalizedType !== "candidate");
  document.getElementById("companyFields").classList.toggle("hidden", normalizedType !== "company");
  document.getElementById("affiliateFields")?.classList.toggle("hidden", normalizedType !== "affiliate");
  document.getElementById("adminFields")?.classList.toggle("hidden", normalizedType !== "admin");

  const emailLabels = {
    company: "E-mail corporativo",
    affiliate: "E-mail do afiliado",
    admin: "E-mail do administrador",
    candidate: "E-mail"
  };
  document.getElementById("registerEmailLabel").textContent = emailLabels[normalizedType] || "E-mail";

  document.querySelectorAll("[data-account-type]").forEach((button) => {
    button.classList.toggle("active", button.dataset.accountType === normalizedType);
  });

  document.querySelectorAll("[data-required-candidate]").forEach((input) => {
    input.required = normalizedType === "candidate";
  });
  document.querySelectorAll("[data-required-company]").forEach((input) => {
    input.required = normalizedType === "company";
  });
  document.querySelectorAll("[data-required-affiliate]").forEach((input) => {
    input.required = normalizedType === "affiliate";
  });
  document.querySelectorAll("[data-required-admin]").forEach((input) => {
    input.required = normalizedType === "admin";
  });
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
            <span>${formatHours(course.hours)}</span>
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
          ${course.legalNotice ? `<p class="course-legal-note">Observação: este treinamento pode exigir etapa prática/presencial, autorização formal ou avaliação complementar conforme atividade, norma aplicável e procedimento da empresa.</p>` : ""}
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
  const course = getCourseById(courseId);
  if (!course) return;

  const key = corporate ? `corporate-${courseId}` : courseId;
  const existing = cart.find((item) => item.key === key);
  if (existing) {
    existing.quantity += quantity;
    existing.title = course.title;
    existing.unitPrice = course.price;
    existing.kind = "course";
  } else {
    cart.push({ key, courseId, quantity, corporate, kind: "course", title: course.title, unitPrice: course.price });
  }

  writeStorage("fortixsegCart", cart);
  renderCart();
  closeAllModals();
  showToast(`${course.title} adicionado ao carrinho.`);
}

function addPackageToCart(packageId, quantity = 1) {
  const pkg = getPackageById(packageId);
  if (!pkg) return;

  const safeQuantity = Math.max(1, Math.min(500, Number(quantity) || 1));
  const key = `package-${packageId}`;
  const existing = cart.find((item) => item.key === key);
  if (existing) {
    existing.quantity += safeQuantity;
    existing.title = pkg.title;
    existing.unitPrice = pkg.price;
    existing.kind = "package";
  } else {
    cart.push({ key, packageId, quantity: safeQuantity, type: "package", kind: "package", title: pkg.title, unitPrice: pkg.price });
  }

  writeStorage("fortixsegCart", cart);
  renderCart();
  showToast(`${pkg.title} adicionado para ${safeQuantity} colaborador(es).`);
}

function removeFromCart(key) {
  cart = cart.filter((item) => item.key !== key);
  writeStorage("fortixsegCart", cart);
  renderCart();
}

function getCourseById(courseId) {
  return courses.find((item) => item.id === courseId);
}

function getPackageById(packageId) {
  return trainingPackages.find((item) => item.id === packageId);
}

function getDiscountTier(quantity) {
  const total = Number(quantity) || 1;
  return discountTiers.find((tier) => total >= tier.min && total <= tier.max) || discountTiers[0];
}

function getCartLine(item) {
  if (item.packageId || item.type === "package") {
    const product = getPackageById(item.packageId);
    if (!product) return null;

    const tier = getDiscountTier(item.quantity);
    const hasProposalPrice = tier.discount === null;
    const discount = Number(tier.discount) || 0;
    const effectiveUnitPrice = hasProposalPrice ? product.price : product.price * (1 - discount);

    return {
      item,
      product,
      type: "package",
      code: product.code,
      title: product.title,
      label: `${item.quantity} colaborador${item.quantity > 1 ? "es" : ""}`,
      unitPrice: product.price,
      effectiveUnitPrice,
      subtotal: hasProposalPrice ? null : effectiveUnitPrice * item.quantity,
      tier,
      proposal: hasProposalPrice
    };
  }

  const product = getCourseById(item.courseId);
  if (!product) return null;
  return {
    item,
    product,
    type: "course",
    code: product.code,
    title: product.title,
    label: item.corporate ? `${item.quantity} vagas corporativas` : `${item.quantity} unidade${item.quantity > 1 ? "s" : ""}`,
    unitPrice: product.price,
    effectiveUnitPrice: product.price,
    subtotal: product.price * item.quantity,
    tier: null,
    proposal: false
  };
}

function renderCart() {
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cartCount").textContent = itemCount;

  const itemsContainer = document.getElementById("cartItems");
  const lines = cart.map(getCartLine).filter(Boolean);
  if (!lines.length) {
    itemsContainer.innerHTML = `<div class="empty-cart"><div><strong>Seu carrinho está vazio</strong><p>Adicione cursos ou pacotes para continuar.</p></div></div>`;
  } else {
    itemsContainer.innerHTML = lines.map((line) => {
      const discountNote = line.type === "package" && line.tier
        ? `<span class="cart-discount">${escapeHtml(line.tier.note)}</span>`
        : "";
      const subtotal = line.proposal ? "Sob proposta" : formatCurrency(line.subtotal);
      return `
        <article class="cart-item">
          <span class="cart-item-code">${escapeHtml(line.code)}</span>
          <div>
            <strong>${escapeHtml(line.title)}</strong>
            <small>${escapeHtml(line.label)} - ${formatCurrency(line.unitPrice)} cada</small>
            ${discountNote}
            <span class="cart-subtotal">Subtotal: ${subtotal}</span>
          </div>
          <button type="button" data-remove-cart="${escapeHtml(line.item.key)}">Remover</button>
        </article>
      `;
    }).join("");
  }

  const total = lines.reduce((sum, line) => sum + (Number(line.subtotal) || 0), 0);
  const hasProposalLine = lines.some((line) => line.proposal);
  document.getElementById("cartTotal").textContent = hasProposalLine ? (total ? `${formatCurrency(total)} + proposta` : "Sob proposta") : formatCurrency(total);
  document.getElementById("checkoutButton").disabled = lines.length === 0;
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
  const lines = cart.map(getCartLine).filter(Boolean);
  if (lines.some((line) => line.proposal)) {
    closeCart();
    scrollToProposalForm();
    showToast("Para mais de 100 colaboradores, solicite uma proposta personalizada.");
    return;
  }

  const button = document.getElementById("checkoutButton");
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = "Preparando checkout...";

  try {
    const data = await apiRequest("/api/checkout-preference", {
      method: "POST",
      body: JSON.stringify({ items: cart })
    });
    const checkoutTarget = data.checkoutUrl || data.init_point || data.sandbox_init_point;
    if (!checkoutTarget) throw new Error("Checkout indisponível.");
    const checkoutUrl = new URL(checkoutTarget);
    if (checkoutUrl.protocol !== "https:") throw new Error("Endereço de checkout inválido.");
    window.location.assign(checkoutUrl.href);
  } catch (error) {
    const status = Number(error.status) || 0;
    let message = "Não foi possível abrir o checkout do Mercado Pago. Confira a credencial de teste e tente novamente.";
    if (status === 404 || status === 405) {
      message = "A funcao de checkout nao foi publicada na Vercel. Inclua a pasta api e faca um novo deploy.";
    } else if (status === 503 || error.code === "MERCADO_PAGO_NOT_CONFIGURED" || /configurado|not configured/i.test(error.message)) {
      message = "Falta configurar MERCADO_PAGO_ACCESS_TOKEN nas variaveis de ambiente da Vercel e fazer novo deploy.";
    } else if (/Failed to fetch|fetch|URL scheme|NetworkError/i.test(error.message)) {
      message = "O site nao conseguiu falar com a funcao de checkout. Verifique o deploy da Vercel e tente novamente.";
    }
    showToast(message);
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

function handlePaymentReturn() {
  const payment = new URLSearchParams(location.search).get("payment");
  if (payment === "success") {
    showToast("Pagamento recebido. A confirmação será validada com o Mercado Pago.");
  } else if (payment === "pending") {
    showToast("Pagamento pendente. O acesso será liberado após a confirmação.");
  } else if (payment === "failure") {
    showToast("O pagamento não foi concluído. Você pode tentar novamente.");
  }
}

function bindForms() {
  document.getElementById("loginForm").addEventListener("submit", handleLogin);
  document.getElementById("registerForm").addEventListener("submit", handleRegister);
  document.getElementById("proposalForm").addEventListener("submit", (event) => {
    event.preventDefault();
    void submitProposalForm(event.target);
  });
  document.getElementById("contactForm").addEventListener("submit", (event) => {
    event.preventDefault();
    void submitContactForm(event.target);
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
  localStorage.removeItem("fortixsegApiToken");

  try {
    const session = await apiRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    localStorage.setItem("fortixsegApiToken", session.token);
    localStorage.setItem("fortixsegCurrentUser", JSON.stringify({ email, role: session.user.role, apiOnline: true }));
    closeAllModals();
    event.target.reset();
    navigate(getHomePageForRole(session.user.role));
    showToast("Login realizado com sucesso.");
  } catch (error) {
    apiOnline = false;
    showToast(error.message || "E-mail ou senha inválidos.");
  }
}

function getHomePageForRole(role) {
  const pages = {
    student: "student",
    company: "company-dashboard",
    affiliate: "affiliate",
    admin: "admin"
  };
  return pages[role] || "student";
}

async function handleRegister(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const password = formData.get("password");
  const confirmation = formData.get("confirmPassword");
  const accountType = document.getElementById("accountType").value;
  const payload = {
    accountType,
    ...Object.fromEntries(formData.entries())
  };

  if (password !== confirmation) {
    showToast("As senhas informadas não são iguais.");
    return;
  }

  try {
    const session = await apiRequest("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    localStorage.setItem("fortixsegApiToken", session.token);
    localStorage.setItem("fortixsegCurrentUser", JSON.stringify({
      email: session.user.email,
      role: session.user.role,
      apiOnline: true
    }));

    event.target.reset();
    switchAccountType("candidate");
    closeAllModals();
    navigate(getHomePageForRole(session.user.role));
    showToast("Conta criada com sucesso. Você já está logado.");
  } catch (error) {
    apiOnline = false;
    showToast(error.message || "Não foi possível criar a conta.");
  }
}

function logout() {
  localStorage.removeItem("fortixsegCurrentUser");
  localStorage.removeItem("fortixsegApiToken");
  navigate("home");
  showToast("Sessão encerrada.");
}

function completeLesson() {
  studentProgress = Math.max(studentProgress, 85);
  writeStorage("fortixsegStudentProgress", studentProgress);
  updateStudentState();
  showToast("Aula marcada como concluída. Seu progresso foi atualizado.");
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
  const answers = quizQuestions.map((_, index) => Number(formData.get(`question-${index}`)));

  try {
    const data = await apiRequest("/api/student/assessment", {
      method: "POST",
      body: JSON.stringify({ courseId: "nr35", answers })
    });
    applyQuizOutcome(data.grade, data.approved);
    return;
  } catch {
    apiOnline = false;
  }

  let correct = 0;
  quizQuestions.forEach((question, index) => {
    if (answers[index] === question.answer) correct += 1;
  });
  const grade = Math.round((correct / quizQuestions.length) * 100);
  applyQuizOutcome(grade, grade >= 70);
}

function applyQuizOutcome(grade, approved) {
  lastQuizGrade = grade;
  writeStorage("fortixsegQuizGrade", grade);

  if (approved) {
    certificateUnlocked = true;
    studentProgress = 100;
    writeStorage("fortixsegCertificateUnlocked", true);
    writeStorage("fortixsegStudentProgress", 100);
  }

  updateStudentState();
  const result = document.getElementById("quizResult");
  result.classList.remove("hidden", "failed");
  result.classList.toggle("failed", !approved);
  result.innerHTML = approved
    ? `<h3>Aprovado. Seu certificado está disponível.</h3><p>Nota final: ${grade}%. O documento já pode ser acessado na área do aluno.</p><button class="button button-primary" type="button" data-show-certificate>Ver certificado</button>`
    : `<h3>Reprovado. Revise o conteúdo e tente novamente.</h3><p>Nota final: ${grade}%. A nota mínima é 70%.</p>`;

  const certificateButton = result.querySelector("[data-show-certificate]");
  if (certificateButton) certificateButton.addEventListener("click", () => navigate("certificate-view"));
  result.scrollIntoView({ behavior: "smooth", block: "center" });
}

async function submitProposalForm(form) {
  const payload = Object.fromEntries(new FormData(form).entries());
  try {
    await apiRequest("/api/proposals", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    form.reset();
    showToast("Solicitação enviada com sucesso. Nossa equipe entrará em contato.");
  } catch (error) {
    showToast(error.message || "Não foi possível enviar a solicitação de proposta.");
  }
}

async function submitContactForm(form) {
  const payload = Object.fromEntries(new FormData(form).entries());
  try {
    await apiRequest("/api/contact", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    form.reset();
    showToast("Mensagem enviada com sucesso. Retornaremos em breve.");
  } catch (error) {
    showToast(error.message || "Não foi possível enviar sua mensagem.");
  }
}

async function submitStudentProfileForm(form) {
  const payload = Object.fromEntries(new FormData(form).entries());
  try {
    await apiRequest("/api/student/profile", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  } catch {
    writeStorage("fortixsegStudentProfile", payload);
  }
  showToast("Dados do aluno atualizados.");
}

async function submitStudentSupportForm(form) {
  const payload = Object.fromEntries(new FormData(form).entries());
  try {
    await apiRequest("/api/student/support", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  } catch {
    const tickets = readStorage("fortixsegSupportTickets", []);
    tickets.push({ ...payload, createdAt: new Date().toISOString() });
    writeStorage("fortixsegSupportTickets", tickets);
  }
  form.reset();
  showToast("Solicitação de suporte registrada.");
}

async function submitCompanySettingsForm(form) {
  const payload = Object.fromEntries(new FormData(form).entries());
  try {
    await apiRequest("/api/company/settings", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  } catch {
    writeStorage("fortixsegCompanySettings", payload);
  }
  showToast("Configurações da empresa salvas.");
}

async function submitAffiliateSettingsForm(form) {
  const payload = Object.fromEntries(new FormData(form).entries());
  try {
    await apiRequest("/api/affiliate/settings", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  } catch {
    writeStorage("fortixsegAffiliateSettings", payload);
  }
  showToast("Dados do afiliado salvos.");
}

async function submitAdminSettingsForm(form) {
  const payload = Object.fromEntries(new FormData(form).entries());
  try {
    await apiRequest("/api/admin/settings", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  } catch {
    writeStorage("fortixsegAdminSettings", payload);
  }
  showToast("Configurações administrativas salvas.");
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
  document.getElementById("averageProgressMetric").textContent = studentProgress === 100 ? "100%" : "65%";
  document.getElementById("studentCertificatesMetric").textContent = certificateUnlocked ? "1" : "0";
  document.getElementById("completedCoursesMetric").textContent = studentProgress === 100 ? "2" : "1";
  document.getElementById("certificateGrade").textContent = `${lastQuizGrade}%`;
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
  renderCertificateValidation(result, { valid: false, message: "Não foi possível validar o certificado agora." });
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
    </div>
  `;
}

function printCertificate() {
  const token = localStorage.getItem("fortixsegApiToken");
  if (!token) {
    showToast("Faça login para baixar o certificado.");
    return;
  }

  fetch("/api/student/certificates/current.pdf", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(async (response) => {
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Não foi possível gerar o PDF.");
      }
      return response.blob();
    })
    .then((blob) => {
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `certificado-${APP_CONFIG.certificateCode}.pdf`;
      document.body.append(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
    })
    .catch((error) => {
      showToast(error.message || "Não foi possível baixar o certificado.");
    });
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
    employees = data.employees || [employee, ...employees];
    applyCompanyDashboard(data);
  } catch {
    employees.push(employee);
  }

  writeStorage("fortixsegEmployees", employees);
  renderEmployees();
  event.target.reset();
  closeAllModals();
  showToast("Colaborador adicionado com sucesso.");
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

function formatHours(value) {
  const hours = Number(value);
  if (!Number.isFinite(hours) || hours <= 0) return "0 hora";
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  const formatted = Number.isInteger(hours) ? String(hours) : hours.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
  return `${formatted} ${hours === 1 ? "hora" : "horas"}`;
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
// TODO: implementar storage protegido para PDFs em produção
// TODO: criar logs de acesso conforme requisitos do treinamento EAD
// TODO: integrar banco PostgreSQL e políticas de acesso
