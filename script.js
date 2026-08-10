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
    title: "Ultimos 30 dias",
    delta: "+4 p.p.",
    trend: [{ label: "Sem 1", value: 74 }, { label: "Sem 2", value: 75 }, { label: "Sem 3", value: 77 }, { label: "Sem 4", value: 78 }],
    status: [{ label: "Conformes", value: 78, color: "#2fa31f" }, { label: "Em andamento", value: 14, color: "#19708c" }, { label: "Atenção", value: 8, color: "#d28a1b" }],
    courses: [{ label: "NR 35", value: 42 }, { label: "NR 12", value: 31 }, { label: "EPI", value: 29 }, { label: "NR 10", value: 26 }]
  },
  "90": {
    title: "Ultimos 90 dias",
    delta: "+8 p.p.",
    trend: [{ label: "Abril", value: 70 }, { label: "Maio", value: 74 }, { label: "Junho", value: 78 }],
    status: [{ label: "Conformes", value: 78, color: "#2fa31f" }, { label: "Em andamento", value: 14, color: "#19708c" }, { label: "Atenção", value: 8, color: "#d28a1b" }],
    courses: [{ label: "NR 35", value: 42 }, { label: "NR 12", value: 31 }, { label: "EPI", value: 29 }, { label: "NR 10", value: 26 }]
  },
  "365": {
    title: "Ultimos 12 meses",
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
let currentSession = normalizeStoredSession(readStorage("fortixsegCurrentUser", null));
let adminCourseCatalog = [];
let adminUsers = [];
let adminInteractiveCourses = [];
let selectedInteractiveCourse = null;
let studentInteractiveCourses = [];
let activeInteractiveCourseId = "";
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

function normalizeStoredSession(value) {
  if (!value) return null;
  if (value.user) return value;
  return {
    user: {
      email: value.email || "",
      role: value.role || "student",
      name: value.name || value.email || "Usuário"
    },
    token: localStorage.getItem("fortixsegApiToken") || ""
  };
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
  if (window.location.protocol === "file:") {
    throw new Error("Abra a plataforma pelo servidor local, exemplo: http://127.0.0.1:3001. Abrir o arquivo direto bloqueia login, admin e pagamento.");
  }
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
    let data = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { error: text || "Resposta invalida da API." };
    }
    if (!response.ok) {
      const apiError = new Error(data.error || data.message || text || "A API nao respondeu corretamente.");
      apiError.status = response.status;
      throw apiError;
    }
    apiOnline = true;
    return data;
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error("A API demorou para responder. Confira se o servidor local esta rodando.");
    }
    if (/failed to fetch|networkerror|load failed/i.test(error?.message || "")) {
      throw new Error("Nao consegui conectar ao servidor. Abra pelo endereco do npm start e confira se a API esta ativa.");
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

async function hydratePortalData(pageName) {
  try {
    if (pageName === "student") {
      const [dashboard, library, interactive] = await Promise.all([
        apiRequest("/api/student/dashboard"),
        apiRequest("/api/student/library"),
        apiRequest("/api/student/interactive-courses")
      ]);
      dashboard.library = library.resources || [];
      dashboard.interactiveCourses = interactive.courses || [];
      dashboard.interactiveCertificates = interactive.certificates || [];
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
  studentInteractiveCourses = Array.isArray(data.interactiveCourses) ? data.interactiveCourses : [];
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

  renderStudentInteractiveCourses();
  if (activeInteractiveCourseId) renderStudentInteractiveLearning(activeInteractiveCourseId);
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
  if (element) element.textContent = repairMojibake(value);
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
        ["dashboard", "Dashboard", "Visao geral da plataforma"],
        ["courses", "Cursos", "Gestao de cursos"],
        ["generator", "Gerador de Treinamentos", "Gerador de Treinamentos"],
        ["students", "Alunos", "Gestao de alunos"],
        ["companies", "Empresas", "Gestao de empresas"],
        ["certificates", "Certificados", "Certificados emitidos"],
        ["payments", "Pagamentos", "Pagamentos"],
        ["reports", "Relatorios", "Relatorios administrativos"],
        ["settings", "Configuracoes", "Configuracoes"]
      ]
    }
  };

  document.addEventListener("click", handlePortalClick);
  document.addEventListener("submit", handlePortalSubmit);
  document.addEventListener("input", handlePortalInput);
  document.addEventListener("keydown", handlePortalKeydown);
  Object.entries(configs).forEach(([portal, config]) => setupPortalWorkspace(portal, config));
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
  config.views.forEach(([key, label, title], index) => {
    const button = buttons[index];
    if (!button) return;
    button.removeAttribute("data-show-certificate");
    if (label) button.textContent = label;
    button.dataset.portal = portal;
    button.dataset.portalTarget = key;
    button.dataset.portalTitle = title;
    button.addEventListener("click", () => activatePortalView(button));
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
    <div id="studentInteractiveCourses" class="student-interactive-courses"></div>
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
    <section id="studentInteractiveLearning" class="student-interactive-learning hidden"></section>
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
  if (key === "generator") return adminPdfGeneratorTemplateV2(title);
  if (key === "students") return adminUserManagerTemplate(title);
  if (key === "students") return `${portalHeading("Usuários", title, "Acompanhe cadastros, cursos e situação acadêmica.")}<div class="dashboard-section portal-table-section"><div class="table-wrap"><table><thead><tr><th>Aluno</th><th>Curso</th><th>Status</th><th>Última atualização</th></tr></thead><tbody>${(portalData.admin?.recentStudents || []).length ? (portalData.admin.recentStudents || []).map((student) => `<tr><td>${escapeHtml(student.name)}</td><td>${escapeHtml(student.course)}</td><td><span class="table-status ${student.status === "Concluído" ? "complete" : "progress"}">${escapeHtml(student.status)}</span></td><td>${escapeHtml(student.date)}</td></tr>`).join("") : `<tr><td colspan="4">Nenhuma movimentação acadêmica registrada ainda.</td></tr>`}</tbody></table></div></div>`;
  if (key === "companies") return `${portalHeading("Contas B2B", title, "Visualize empresas, colaboradores e consumo de licenças.")}<div class="portal-card-grid compact"><article class="portal-data-card"><span>Empresas ativas</span><h3>${formatNumber(portalData.admin?.metrics?.companies ?? 0)}</h3><p>Contas corporativas cadastradas na plataforma.</p><strong class="status-copy">Operação ativa</strong></article><article class="portal-data-card"><span>Alunos ativos</span><h3>${formatNumber(portalData.admin?.metrics?.students ?? 0)}</h3><p>Usuários com acesso liberado no ambiente.</p><strong class="status-copy">Base sincronizada</strong></article></div>`;
  if (key === "certificates") return `${portalHeading("Rastreabilidade", title, "Consulte documentos emitidos e validações públicas.")}<div class="portal-card-grid compact"><article class="portal-data-card"><span>Total emitido</span><h3>${formatNumber(portalData.admin?.metrics?.certificates ?? 0)} certificados</h3><p>Códigos únicos registrados na plataforma.</p><button class="button button-secondary" type="button" data-nav="certificates">Abrir validador</button></article><article class="portal-data-card"><span>Catálogo</span><h3>${formatNumber(portalData.admin?.metrics?.courses ?? 0)} cursos</h3><p>Treinamentos publicados e prontos para matrícula.</p><strong class="status-copy">Operação normal</strong></article></div>`;
  if (key === "payments") return `${portalHeading("Financeiro", title, "Acompanhe transações e o estado da integração.")}<div class="dashboard-section portal-table-section"><div class="table-wrap"><table><thead><tr><th>Cliente</th><th>Pedido</th><th>Valor</th><th>Status</th></tr></thead><tbody>${(portalData.admin?.recentPayments || []).length ? (portalData.admin.recentPayments || []).map((payment) => `<tr><td>${escapeHtml(payment.client)}</td><td>${escapeHtml(payment.course)}</td><td>${formatCurrency(payment.value)}</td><td><span class="table-status ${payment.status === "Aprovado" || payment.status === "Pago" ? "complete" : "pending"}">${escapeHtml(payment.status)}</span></td></tr>`).join("") : `<tr><td colspan="4">Nenhum pagamento registrado até o momento.</td></tr>`}</tbody></table></div></div>`;
  if (key === "reports") return `${portalHeading("Dados", title, "Exporte uma visão consolidada da operação.")}<div class="portal-card-grid compact"><article class="portal-data-card"><span>Operação</span><h3>Resumo da plataforma</h3><p>Alunos, empresas, certificados e pagamentos.</p><button class="button button-primary" type="button" data-portal-action="export-admin-report">Exportar CSV</button></article><article class="portal-data-card"><span>Integrações</span><h3>Saúde da API</h3><p>Servidor online; OpenAI e Mercado Pago dependem das credenciais.</p><button class="button button-secondary" type="button" data-portal-action="refresh-admin">Atualizar status</button></article></div>`;
  return `${portalHeading("Sistema", title, "Preferências visuais e operacionais da administração.")}<form class="portal-form" id="adminSettingsForm"><div class="form-grid"><label class="field full"><span>Nome da plataforma</span><input name="brand" value="FortixSeg" required></label><label class="field"><span>E-mail de suporte</span><input name="supportEmail" type="email" value="fortixseg@gmail.com" required></label><label class="field"><span>Nota mínima</span><input name="minimumGrade" type="number" min="0" max="100" value="70" required></label><label class="field full"><span>Modo de manutenção</span><select name="maintenance"><option>Desativado</option><option>Ativado</option></select></label></div><button class="button button-primary" type="submit">Salvar configurações</button></form>`;
}

function adminPdfGeneratorTemplate(title) {
  return `
    ${portalHeading("Gerador de Treinamentos", title, "Suba uma apostila em PDF, gere um treinamento interativo por regras e publique somente depois da revisão técnica.", '<button class="button button-secondary" type="button" data-portal-action="admin-refresh-interactive">Atualizar lista</button>')}
    <div class="admin-generator-layout">
      <section class="admin-generator-panel">
        <div class="dashboard-heading"><div><span>Novo treinamento interativo</span><h2>Criar treinamento interativo</h2><p class="generator-helper">Envie a apostila em PDF e o sistema cria módulos, aulas, checklists e avaliação em rascunho para você revisar.</p></div></div>
        <form class="portal-form compact-form" id="interactivePdfGeneratorForm">
          <div class="form-grid">
            <label class="field full"><span>Nome do treinamento</span><input name="title" maxlength="260" placeholder="Ex.: NR-35 - Trabalho em Altura"></label>
            <label class="field"><span>Categoria</span><input name="category" maxlength="90" value="Segurança do Trabalho"></label>
            <label class="field"><span>Carga horaria</span><input name="hours" type="number" min="1" max="120" placeholder="Detectar automaticamente"></label>
            <label class="field"><span>Nota mínima (%)</span><input name="minimumGrade" type="number" min="0" max="100" value="70"></label>
            <label class="field full"><span>Responsável técnico</span><input name="responsible" maxlength="180" placeholder="Nome e qualificação do responsável"></label>
          </div>
          <label class="admin-upload-field generator-upload">
            <input id="interactivePdfFile" type="file" accept="application/pdf" required>
            <span>Arraste ou selecione a apostila em PDF</span>
            <small>PDF até 20 MB. O sistema usa templates e palavras-chave, sem OpenAI nesta fase.</small>
          </label>
          <div class="admin-file-selection" id="interactivePdfSelection" aria-live="polite"></div>
          <div class="generator-template-note">
            <strong>Templates ativos</strong>
            <span>NR-35, NR-33, NR-10, EPI/NR-06, Integração e SST genérico.</span>
          </div>
          <button class="button button-primary" type="submit" id="interactiveGenerateButton">Gerar treinamento em rascunho</button>
          <span id="interactiveGeneratorStatus" aria-live="polite"></span>
        </form>
      </section>

      <section class="admin-generated-list-panel">
        <div class="dashboard-heading"><div><span>Treinamentos gerados</span><h2>Rascunhos e publicados</h2></div></div>
        <div id="adminInteractiveCourseList" class="admin-interactive-course-list">
          <div class="portal-empty-state">Carregando treinamentos...</div>
        </div>
      </section>
    </div>

    <section class="interactive-review-panel hidden" id="interactiveCourseReviewPanel">
      <div class="interactive-review-header">
        <div>
          <span id="interactiveReviewStatus">Rascunho</span>
          <h3 id="interactiveReviewTitle">Revisão do treinamento gerado</h3>
          <p id="interactiveReviewMeta">Revise módulos, aulas, checklists e prova antes de publicar.</p>
        </div>
        <div class="interactive-review-actions">
          <button class="button button-secondary" type="button" data-portal-action="admin-preview-interactive">Pré-visualizar como aluno</button>
          <button class="button button-primary" type="button" data-portal-action="admin-publish-interactive">Publicar treinamento</button>
        </div>
      </div>
      <div class="interactive-review-grid">
        <div class="interactive-module-review" id="interactiveModuleReview"></div>
        <aside class="interactive-review-side" id="interactiveReviewSummary"></aside>
      </div>
      <form class="portal-form" id="interactiveCourseReviewForm">
        <details class="interactive-json-details">
          <summary>Editor avançado do treinamento</summary>
          <label class="field full"><span>JSON do treinamento gerado</span><textarea id="interactiveCourseJsonEditor" name="courseJson" rows="16" spellcheck="false"></textarea><small>Use somente para ajustes finos de títulos, aulas, perguntas ou checklists. O JSON inválido não será salvo.</small></label>
        </details>
        <div class="admin-editor-actions">
          <button class="button button-primary" type="submit">Salvar revisão</button>
          <button class="button button-secondary" type="button" data-portal-action="admin-download-interactive-pdf">Baixar PDF original</button>
          <span id="interactiveReviewSaveStatus" aria-live="polite"></span>
        </div>
      </form>
    </section>
    <section class="admin-interactive-preview-panel hidden" id="interactiveAdminPreviewPanel" aria-live="polite"></section>
  `;
}

function adminPdfGeneratorTemplateV2(title) {
  const steps = [
    ["upload", "1", "Upload"],
    ["analysis", "2", "Analise"],
    ["structure", "3", "Estrutura"],
    ["preview", "4", "Preview"],
    ["review", "5", "Revisao"],
    ["publication", "6", "Publicacao"]
  ];
  return `
    ${portalHeading("Gerador de Treinamentos", title, "Suba uma apostila em PDF, confira a estrutura criada automaticamente e publique somente depois da revisao tecnica.", '<button class="button button-secondary" type="button" data-portal-action="admin-refresh-interactive">Atualizar lista</button>')}
    <div class="interactive-wizard-shell">
      <div class="interactive-stepper" id="interactiveWizardStepper">
        ${steps.map(([key, number, label]) => `<button class="interactive-step ${key === "upload" ? "is-active" : ""}" type="button" data-portal-action="admin-wizard-step" data-step="${key}"><span>${number}</span><strong>${label}</strong></button>`).join("")}
      </div>

      <section class="interactive-stage is-active" data-interactive-stage="upload">
        <div class="interactive-stage-heading">
          <div><span>Novo treinamento interativo</span><h2>Upload do PDF</h2><p>Envie a apostila. O sistema identifica o tema, cria modulos, aulas, checklists e prova em rascunho.</p></div>
          <small>Sem OpenAI nesta fase: regras, palavras-chave e templates FortixSeg.</small>
        </div>
        <form class="portal-form compact-form interactive-upload-form" id="interactivePdfGeneratorForm">
          <div class="form-grid">
            <label class="field full"><span>Nome do treinamento</span><input name="title" maxlength="260" placeholder="Ex.: NR-35 - Trabalho em Altura"></label>
            <label class="field"><span>Categoria</span><input name="category" maxlength="90" value="Segurança do Trabalho"></label>
            <label class="field"><span>Carga horaria</span><input name="hours" type="number" min="1" max="120" placeholder="Detectar automaticamente"></label>
            <label class="field"><span>Nota mínima (%)</span><input name="minimumGrade" type="number" min="0" max="100" value="70"></label>
            <label class="field full"><span>Responsável técnico</span><input name="responsible" maxlength="180" placeholder="Nome e qualificação do responsável"></label>
          </div>
          <label class="admin-upload-field generator-upload interactive-dropzone" data-interactive-dropzone>
            <input id="interactivePdfFile" type="file" accept="application/pdf" required>
            <strong>Arraste e solte o PDF aqui</strong>
            <span>ou clique para selecionar do computador</span>
            <small>Formato aceito: PDF. O gerador detecta tema, titulo e carga horaria quando essas informacoes aparecem no material.</small>
          </label>
          <div class="admin-file-selection interactive-file-selection" id="interactivePdfSelection" aria-live="polite"></div>
          <div class="generator-template-note">
            <strong>Templates ativos</strong>
            <span>NR-35, NR-33, NR-10, EPI/NR-06, Integração e SST generico. Se o PDF nao bater com nenhum, o sistema cria um treinamento SST base para revisao.</span>
          </div>
          <div class="admin-editor-actions">
            <button class="button button-primary" type="submit" id="interactiveGenerateButton">Enviar e analisar PDF</button>
            <span id="interactiveGeneratorStatus" aria-live="polite"></span>
          </div>
        </form>
      </section>

      <section class="interactive-stage" data-interactive-stage="analysis" id="interactiveAnalysisPanel">
        <div class="portal-empty-state"><strong>Aguardando PDF.</strong><span>Depois do envio, a analise aparece aqui.</span></div>
      </section>

      <section class="interactive-stage" data-interactive-stage="structure" id="interactiveStructurePanel">
        <div class="portal-empty-state"><strong>Estrutura ainda nao gerada.</strong><span>Envie um PDF para visualizar modulos e aulas encontrados.</span></div>
      </section>

      <section class="interactive-stage" data-interactive-stage="preview" id="interactivePreviewPanel">
        <div class="portal-empty-state"><strong>Preview indisponivel.</strong><span>Gere ou abra um treinamento para revisar a experiencia do aluno sem sair do admin.</span></div>
      </section>

      <section class="interactive-stage" data-interactive-stage="review">
        <section class="interactive-review-panel hidden" id="interactiveCourseReviewPanel">
          <div class="interactive-review-header">
            <div>
              <span id="interactiveReviewStatus">Rascunho</span>
              <h3 id="interactiveReviewTitle">Revisao do treinamento gerado</h3>
              <p id="interactiveReviewMeta">Revise modulos, aulas, checklists e prova antes de publicar.</p>
            </div>
            <div class="interactive-review-actions">
              <button class="button button-secondary" type="button" data-portal-action="admin-go-preview">Ver preview interno</button>
              <button class="button button-primary" type="button" data-portal-action="admin-go-publication">Ir para publicacao</button>
            </div>
          </div>
          <div class="interactive-review-grid">
            <div class="interactive-module-review" id="interactiveModuleReview"></div>
            <aside class="interactive-review-side" id="interactiveReviewSummary"></aside>
          </div>
          <form class="portal-form" id="interactiveCourseReviewForm">
            <details class="interactive-json-details">
              <summary>Editor avancado do treinamento</summary>
              <label class="field full"><span>JSON do treinamento gerado</span><textarea id="interactiveCourseJsonEditor" name="courseJson" rows="16" spellcheck="false"></textarea><small>Use para ajustes finos de titulos, aulas, perguntas ou checklists. JSON invalido nao sera salvo.</small></label>
            </details>
            <div class="admin-editor-actions">
              <button class="button button-primary" type="submit">Salvar revisao</button>
              <button class="button button-secondary" type="button" data-portal-action="admin-download-interactive-pdf">Baixar PDF original</button>
              <span id="interactiveReviewSaveStatus" aria-live="polite"></span>
            </div>
          </form>
        </section>
      </section>

      <section class="interactive-stage" data-interactive-stage="publication" id="interactivePublishPanel">
        <div class="portal-empty-state"><strong>Publicacao aguardando revisao.</strong><span>Quando o treinamento estiver pronto, a checagem final aparece aqui.</span></div>
      </section>
    </div>

    <section class="admin-generated-list-panel interactive-generated-library">
      <div class="dashboard-heading"><div><span>Treinamentos gerados</span><h2>Rascunhos e publicados</h2><p>Abra, publique, refaca com novo PDF ou exclua treinamentos gerados.</p></div></div>
      <div id="adminInteractiveCourseList" class="admin-interactive-course-list">
        <div class="portal-empty-state">Carregando treinamentos...</div>
      </div>
    </section>
    <section class="admin-interactive-preview-panel hidden" id="interactiveAdminPreviewPanel" aria-live="polite"></section>
  `;
}

function adminUserManagerTemplate(title) {
  return `
    ${portalHeading("Usuários e acessos", title, "Cadastre aluno, empresa, afiliado ou administrador e acompanhe os acessos criados.")}
    <div class="admin-user-manager">
      <section class="admin-user-form-panel">
        <div class="dashboard-heading"><div><span>Novo acesso</span><h2>Criar usuário</h2></div></div>
        <form class="portal-form compact-form" id="adminUserForm">
          <div class="form-grid">
            <label class="field"><span>Tipo</span><select name="role" required><option value="student">Aluno</option><option value="company">Empresa</option><option value="affiliate">Afiliado</option><option value="admin">Administrador</option></select></label>
            <label class="field"><span>Nome / responsável</span><input name="name" maxlength="160" required></label>
            <label class="field"><span>E-mail</span><input name="email" type="email" maxlength="160" required></label>
            <label class="field"><span>Senha inicial</span><input name="password" type="password" minlength="6" value="123456" required></label>
            <label class="field"><span>Telefone</span><input name="phone" maxlength="40" placeholder="(00) 00000-0000"></label>
            <label class="field"><span>CPF/CNPJ</span><input name="document" maxlength="24"></label>
            <label class="field full"><span>Empresa vinculada</span><input name="companyName" maxlength="160" placeholder="Opcional para empresa ou aluno corporativo"></label>
            <label class="field full"><span>Curso inicial do aluno</span><select name="courseId"><option value="">Não matricular agora</option>${courses.map((course) => `<option value="${escapeHtml(course.id)}">${escapeHtml(course.title)}</option>`).join("")}</select></label>
          </div>
          <button class="button button-primary" type="submit" id="adminUserSaveButton">Criar usuário</button>
          <span id="adminUserSaveStatus" aria-live="polite"></span>
        </form>
      </section>
      <section class="admin-user-list-panel">
        <div class="portal-toolbar admin-course-toolbar">
          <label class="search-field"><input id="adminUserSearch" type="search" placeholder="Buscar nome, e-mail, documento"></label>
          <select id="adminUserRoleFilter" aria-label="Filtrar por tipo"><option value="all">Todos</option><option value="student">Alunos</option><option value="company">Empresas</option><option value="affiliate">Afiliados</option><option value="admin">Admins</option></select>
        </div>
        <div class="admin-user-list" id="adminUserList"><div class="portal-empty-state">Carregando usuários...</div></div>
      </section>
    </div>
  `;
}

function adminCourseManagerTemplate(title) {
  return `
    ${portalHeading("Catalogo e conteudo", title, "Crie cursos completos, altere precos e gerencie apostilas em PDF.", '<button class="button button-primary" type="button" data-portal-action="admin-new-course">Novo curso</button>')}
    <div class="admin-course-manager" id="adminCourseManager">
      <section class="admin-course-list-panel">
        <div class="portal-toolbar admin-course-toolbar">
          <label class="search-field"><input id="adminCourseSearch" type="search" placeholder="Buscar curso, codigo ou categoria"></label>
          <select id="adminCourseStatusFilter" aria-label="Filtrar por status"><option value="all">Todos</option><option value="published">Publicados</option><option value="draft">Rascunhos</option></select>
        </div>
        <div class="admin-course-list" id="adminCourseList"><div class="portal-empty-state">Carregando catálogo...</div></div>
      </section>

      <section class="admin-course-editor hidden" id="adminCourseEditor">
        <form id="adminCourseForm">
          <div class="admin-editor-heading"><div><span>Editor de curso</span><h3 id="adminCourseEditorTitle">Novo curso</h3></div><button class="icon-button admin-editor-close" type="button" data-portal-action="admin-cancel-course" aria-label="Fechar editor">x</button></div>
          <div class="form-grid">
            <label class="field full"><span>Nome do curso</span><input name="title" maxlength="180" required></label>
            <label class="field"><span>Codigo</span><input name="code" maxlength="30" placeholder="Ex.: NR 35" required></label>
            <label class="field"><span>Categoria</span><input name="category" maxlength="80" placeholder="Ex.: Trabalho em altura" required></label>
            <label class="field"><span>Carga horaria</span><input name="hours" type="number" min="1" max="500" value="8" required></label>
            <label class="field"><span>Preco</span><input name="price" type="number" min="0" step="0.01" value="149.90" required></label>
            <label class="field"><span>Status</span><select name="status"><option value="published">Publicado</option><option value="draft">Rascunho</option></select></label>
            <label class="field"><span>Quantidade de aulas</span><input name="lessons" type="number" min="1" max="200" value="7" required></label>
            <label class="field"><span>Nota minima (%)</span><input name="minimumGrade" type="number" min="0" max="100" value="70" required></label>
            <label class="field"><span>Tentativas</span><input name="attempts" type="number" min="1" max="10" value="3" required></label>
            <label class="field full"><span>Publico-alvo</span><textarea name="audience" rows="3" required></textarea></label>
            <label class="field full"><span>Objetivo</span><textarea name="objective" rows="3" required></textarea></label>
            <label class="field full"><span>Conteudo programatico</span><textarea name="syllabus" rows="8" placeholder="Digite um topico por linha" required></textarea><small>Um topico por linha. Eles serao exibidos na pagina do curso.</small></label>
          </div>

          <div class="admin-resource-manager">
            <div><span>Biblioteca do curso</span><h4>Apostilas em PDF</h4><p>Envie somente arquivos PDF. Cada arquivo pode ter ate 12 MB.</p></div>
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
  page.querySelectorAll(".app-sidebar nav > button").forEach((item) => {
    item.classList.toggle("active", item.dataset.portal === portal && item.dataset.portalTarget === key);
  });

  const topbar = page.querySelector(".app-topbar");
  const title = topbar?.querySelector("h1");
  const eyebrow = topbar?.querySelector("div > span");
  if (title) title.textContent = button.dataset.portalTitle || button.textContent.trim();
  if (eyebrow) eyebrow.textContent = topbar.dataset.portalEyebrow || "Portal FortixSeg";

  if (portal === "company" && key === "employees") renderCompanyEmployeeDirectory();
  if (portal === "admin" && key === "courses") loadAdminCourseCatalog();
  if (portal === "admin" && key === "generator") loadAdminInteractiveCourses();
  if (portal === "admin" && key === "students") loadAdminUsers();
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

  const adminPreviewLessonButton = event.target.closest("[data-admin-preview-lesson]");
  if (adminPreviewLessonButton) {
    renderInteractivePreviewPanel(selectedInteractiveCourse, adminPreviewLessonButton.dataset.adminPreviewLesson);
    setInteractiveWizardStep("preview");
    return;
  }

  const actionButton = event.target.closest("[data-portal-action]");
  if (!actionButton) return;
  event.preventDefault();
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
  if (action === "admin-new-course") {
    const page = actionButton.closest(".app-page") || document.getElementById("page-admin");
    const coursesButton = page?.querySelector('[data-portal="admin"][data-portal-target="courses"]');
    if (coursesButton) activatePortalView(coursesButton);
    setTimeout(() => openAdminCourseEditor(), 40);
  }
  if (action === "admin-edit-course") openAdminCourseEditor(actionButton.dataset.courseId);
  if (action === "admin-cancel-course") closeAdminCourseEditor();
  if (action === "admin-delete-course") deleteAdminCourse(actionButton.dataset.courseId || "");
  if (action === "admin-delete-resource") deleteAdminCourseResource(actionButton.dataset.courseId, actionButton.dataset.resourceId);
  if (action === "admin-toggle-user") toggleAdminUser(actionButton.dataset.userId, actionButton.dataset.userStatus);
  if (action === "admin-refresh-interactive") loadAdminInteractiveCourses();
  if (action === "admin-edit-interactive") loadInteractiveCourseForReview(actionButton.dataset.courseId);
  if (action === "admin-delete-interactive") deleteInteractiveCourse(actionButton.dataset.courseId);
  if (action === "admin-wizard-step") setInteractiveWizardStep(actionButton.dataset.step || "upload");
  if (action === "admin-go-preview") {
    if (!selectedInteractiveCourse) return showToast("Abra um treinamento gerado primeiro.");
    renderInteractivePreviewPanel(selectedInteractiveCourse, actionButton.dataset.adminPreviewLesson || "");
    setInteractiveWizardStep("preview");
  }
  if (action === "admin-go-review") {
    if (!selectedInteractiveCourse) return showToast("Abra um treinamento gerado primeiro.");
    renderInteractiveCourseReview(selectedInteractiveCourse);
    setInteractiveWizardStep("review");
  }
  if (action === "admin-go-publication") {
    if (!selectedInteractiveCourse) return showToast("Abra um treinamento gerado primeiro.");
    renderInteractivePublishPanel(selectedInteractiveCourse);
    setInteractiveWizardStep("publication");
  }
  if (action === "admin-preview-interactive") {
    if (!selectedInteractiveCourse) return showToast("Abra um treinamento gerado primeiro.");
    renderInteractivePreviewPanel(selectedInteractiveCourse, actionButton.dataset.lessonId || "");
    setInteractiveWizardStep("preview");
  }
  if (action === "admin-close-interactive-preview") closeAdminInteractivePreview();
  if (action === "admin-publish-interactive") publishInteractiveCourse(actionButton.dataset.courseId || selectedInteractiveCourse?.id, true);
  if (action === "admin-unpublish-interactive") publishInteractiveCourse(actionButton.dataset.courseId, false);
  if (action === "admin-download-interactive-pdf") downloadSelectedInteractivePdf();
  if (action === "student-open-interactive-course") openStudentInteractiveCourse(actionButton.dataset.courseId, actionButton.dataset.lessonId);
  if (action === "student-complete-interactive-lesson") completeInteractiveLesson(actionButton.dataset.courseId, actionButton.dataset.lessonId);
  if (action === "student-submit-interactive-assessment") submitInteractiveAssessment(actionButton.dataset.courseId);
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

function renderStudentInteractiveCourses() {
  const container = document.getElementById("studentInteractiveCourses");
  if (!container) return;
  studentInteractiveCourses = studentInteractiveCourses.map(ensureStudentInteractiveShape);
  container.innerHTML = `
    <div class="student-interactive-heading">
      <div><span>Treinamentos interativos</span><h3>Aulas publicadas para você</h3></div>
      <small>${studentInteractiveCourses.length} treinamento${studentInteractiveCourses.length === 1 ? "" : "s"} disponível${studentInteractiveCourses.length === 1 ? "" : "is"}</small>
    </div>
    ${studentInteractiveCourses.length ? `
      <div class="portal-card-grid interactive-course-grid">
        ${studentInteractiveCourses.map((course) => {
          const progress = course.progress || {};
          return `
            <article class="portal-course-card interactive-student-card">
              <div class="portal-course-cover" style="--course-bg:linear-gradient(145deg, #14391d, #07100d)"><span>${escapeHtml(course.code || "SST")}</span></div>
              <div>
                <span class="course-status ${progress.passed ? "complete" : "progress"}">${progress.passed ? "Concluído" : progress.percent ? "Em andamento" : "Disponível"}</span>
                <h3>${escapeHtml(getInteractiveCourseDisplayTitle(course))}</h3>
                <p>${escapeHtml(course.detectedLabel || course.category || "Segurança do Trabalho")} - ${course.hours || 0}h - ${progress.totalLessons || 0} aulas</p>
                <div class="progress-track"><i style="width:${Math.min(100, progress.percent || 0)}%"></i></div>
                <button class="button button-primary" type="button" data-portal-action="student-open-interactive-course" data-course-id="${escapeHtml(course.id)}">${progress.percent ? "Continuar treinamento" : "Iniciar treinamento"}</button>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    ` : '<div class="portal-empty-state"><strong>Nenhum treinamento interativo publicado ainda.</strong><span>Quando a equipe publicar um treinamento, ele aparecerá aqui.</span></div>'}
  `;
}

function ensureStudentInteractiveShape(course) {
  const modules = Array.isArray(course?.modules) ? course.modules : [];
  const flat = modules.flatMap((module) => (module.lessons || []).map((lesson) => ({ ...lesson, moduleId: module.id, moduleTitle: module.title })));
  const completedCount = flat.filter((lesson) => lesson.completed).length;
  const progress = {
    completedLessons: Number(course?.progress?.completedLessons ?? completedCount),
    totalLessons: Number(course?.progress?.totalLessons ?? flat.length),
    percent: Number(course?.progress?.percent ?? (flat.length ? Math.round((completedCount / flat.length) * 100) : 0)),
    currentLessonId: course?.progress?.currentLessonId || flat.find((lesson) => !lesson.completed)?.id || flat[0]?.id || "",
    assessmentUnlocked: Boolean(course?.progress?.assessmentUnlocked ?? (flat.length > 0 && completedCount >= flat.length)),
    bestGrade: Number(course?.progress?.bestGrade || 0),
    passed: Boolean(course?.progress?.passed),
    certificateId: course?.progress?.certificateId || ""
  };
  let order = 0;
  return {
    ...course,
    progress,
    modules: modules.map((module) => ({
      ...module,
      lessons: (module.lessons || []).map((lesson) => {
        const completed = Boolean(lesson.completed);
        const locked = typeof lesson.locked === "boolean" ? lesson.locked : order > 0;
        order += 1;
        return { ...lesson, completed, locked };
      })
    }))
  };
}

function flattenInteractiveLessons(course) {
  return (course?.modules || []).flatMap((module, moduleIndex) => (module.lessons || []).map((lesson, lessonIndex) => ({
    ...lesson,
    moduleId: module.id,
    moduleTitle: module.title,
    moduleIndex,
    lessonIndex
  })));
}

function cloneInteractiveCourseForPreview(course) {
  const clone = JSON.parse(JSON.stringify(course || {}));
  const preview = ensureStudentInteractiveShape(clone);
  preview.progress = {
    ...preview.progress,
    percent: preview.progress?.percent || 0,
    completedLessons: preview.progress?.completedLessons || 0,
    totalLessons: preview.progress?.totalLessons || flattenInteractiveLessons(preview).length,
    assessmentUnlocked: true
  };
  preview.modules = (preview.modules || []).map((module) => ({
    ...module,
    lessons: (module.lessons || []).map((lesson) => ({
      ...lesson,
      locked: false
    }))
  }));
  return preview;
}

function getInteractiveCurrentLesson(course, preferredLessonId = "", allowLocked = false) {
  const lessons = flattenInteractiveLessons(course);
  const canOpen = (lesson) => allowLocked || !lesson.locked;
  return (
    lessons.find((lesson) => lesson.id === preferredLessonId && canOpen(lesson)) ||
    lessons.find((lesson) => lesson.id === course?.progress?.currentLessonId && canOpen(lesson)) ||
    lessons.find((lesson) => canOpen(lesson)) ||
    lessons[0] ||
    null
  );
}

function buildPdfFrameUrl(url) {
  const value = String(url || "");
  if (!value) return "";
  return value.includes("#") ? `${value}&toolbar=1&view=FitH` : `${value}#toolbar=1&view=FitH`;
}

function isNoisyInteractiveTitle(value) {
  const text = String(value || "").trim();
  return !text || /^-*\s*\d+\s+of\s+\d+\s*-*$/i.test(text) || /^p[aá]gina\s+\d+$/i.test(text) || text.length < 4;
}

function getInteractiveCourseDisplayTitle(course) {
  const title = String(course?.title || "").trim();
  if (!title || /^nr\s*-?\s*35$/i.test(title) || /^nr35$/i.test(title)) {
    return course?.detectedLabel || course?.code || "Treinamento interativo";
  }
  return title;
}

function getInteractiveLessonDisplayTitle(course, lesson) {
  if (!isNoisyInteractiveTitle(lesson?.title)) return lesson.title;
  const module = (course?.modules || []).find((item) => item.id === lesson?.moduleId) || (course?.modules || [])[lesson?.moduleIndex || 0];
  return module?.topics?.[lesson?.lessonIndex || 0] || module?.topics?.[0] || module?.title || "Aula interativa";
}

function cleanInteractivePdfText(value, fallbackTitle) {
  const text = String(value || "")
    .replace(/--\s*\d+\s+of\s+\d+\s*--/gi, "")
    .replace(/\bpage\s+\d+\s+of\s+\d+\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
  if (!text || text.length < 35) {
    return `Esta aula foi organizada a partir do template do treinamento. Revise o material de apoio e confirme o conteúdo técnico de "${fallbackTitle}" antes da publicação final.`;
  }
  return text;
}

function resolveInteractiveSummary(course, lesson, displayTitle) {
  if (isNoisyInteractiveTitle(lesson?.title) || /--\s*\d+\s+of\s+\d+\s*--/i.test(lesson?.summary || "")) {
    const module = (course?.modules || []).find((item) => item.id === lesson?.moduleId);
    return `Nesta aula, o aluno revisa ${displayTitle.toLowerCase()} dentro do módulo ${module?.title?.toLowerCase() || "do treinamento"}, conectando regra, risco e prática segura.`;
  }
  return lesson?.summary || "Entender o conteúdo essencial e aplicar as medidas de segurança no trabalho.";
}

function openStudentInteractiveCourse(courseId, lessonId = "") {
  if (!courseId) return;
  if (!studentInteractiveCourses.some((course) => course.id === courseId) && selectedInteractiveCourse?.id === courseId) {
    replaceStudentInteractiveCourse(selectedInteractiveCourse);
  }
  activeInteractiveCourseId = courseId;
  const page = document.getElementById("page-student");
  if (!page?.classList.contains("active")) navigate("student");
  setTimeout(() => {
    const lessonsButton = document.querySelector('#page-student [data-portal="student"][data-portal-target="lessons"]');
    if (lessonsButton) activatePortalView(lessonsButton);
    renderStudentInteractiveLearning(courseId, lessonId);
  }, 80);
}

function renderStudentInteractiveLearning(courseId = activeInteractiveCourseId, preferredLessonId = "") {
  const container = document.getElementById("studentInteractiveLearning");
  if (!container) return;
  const courseIndex = studentInteractiveCourses.findIndex((item) => item.id === courseId);
  if (courseIndex < 0) {
    container.classList.add("hidden");
    document.querySelector("#page-student .learning-library")?.classList.remove("hidden");
    return;
  }
  const course = ensureStudentInteractiveShape(studentInteractiveCourses[courseIndex]);
  studentInteractiveCourses[courseIndex] = course;
  activeInteractiveCourseId = course.id;
  const current = getInteractiveCurrentLesson(course, preferredLessonId, false);
  if (!current) {
    container.innerHTML = '<div class="portal-empty-state">Este treinamento ainda não possui aulas.</div>';
    container.classList.remove("hidden");
    return;
  }
  document.querySelector("#page-student .learning-library")?.classList.add("hidden");
  container.classList.remove("hidden");
  container.innerHTML = renderInteractiveLearningShell(course, current, { mode: "student" });
}

function renderInteractiveLearningShell(course, current, options = {}) {
  const isPreview = options.mode === "preview";
  const finalAssessment = course.finalAssessment || {};
  const pdfUrl = current.pageImageUrl || course.pdf?.url || "";
  const pdfFrameUrl = buildPdfFrameUrl(pdfUrl);
  const pdfDownloadUrl = course.pdf?.url || pdfUrl || "#";
  const currentTitle = getInteractiveLessonDisplayTitle(course, current);
  const currentSummary = resolveInteractiveSummary(course, current, currentTitle);
  const currentText = cleanInteractivePdfText(current.extractedText, currentTitle);
  const sourcePageLabel = current.sourcePage ? `Pagina ${current.sourcePage} do PDF` : "Pagina do PDF nao identificada";
  const extractionLabel = course.pdf?.extractionStatus === "text-extracted" ? "Texto extraido do PDF" : "Aula montada por template";
  const backButton = isPreview
    ? `<button class="certificate-link back-to-courses" type="button" data-portal-action="admin-close-interactive-preview">Voltar para revisao</button>`
    : `<button class="certificate-link back-to-courses" type="button" data-portal="student" data-portal-target="courses" data-portal-title="Meus cursos">Voltar para meus cursos</button>`;
  const completeButton = isPreview
    ? `<button class="button button-primary" type="button" disabled>Previa sem alterar progresso</button>`
    : `<button class="button button-primary" type="button" data-portal-action="student-complete-interactive-lesson" data-course-id="${escapeHtml(course.id)}" data-lesson-id="${escapeHtml(current.id)}">${current.completed ? "Aula concluida" : "Concluir aula"}</button>`;

  return `
    <div class="interactive-student-shell ${isPreview ? "admin-preview-shell" : ""}">
      <aside class="interactive-student-sidebar">
        ${repairMojibake(backButton)}
        <h3>${escapeHtml(getInteractiveCourseDisplayTitle(course))}</h3>
        <div class="progress-track"><i style="width:${Math.min(100, course.progress.percent || 0)}%"></i></div>
        <small>Progresso: ${course.progress.percent || 0}% - ${course.progress.completedLessons || 0}/${course.progress.totalLessons || 0} aulas</small>
        <div class="interactive-module-nav">
          ${(course.modules || []).map((module, moduleIndex) => `
            <article>
              <strong>Modulo ${moduleIndex + 1}<span>${escapeHtml(module.title)}</span></strong>
              ${(module.lessons || []).map((lesson, lessonIndex) => `
                <button class="${lesson.id === current.id ? "active" : ""} ${lesson.completed ? "complete" : ""}" type="button" ${!isPreview && lesson.locked ? "disabled" : isPreview ? `data-admin-preview-lesson="${escapeHtml(lesson.id)}"` : `data-portal-action="student-open-interactive-course" data-course-id="${escapeHtml(course.id)}" data-lesson-id="${escapeHtml(lesson.id)}"`}>
                  <span>${lesson.completed ? "OK" : lesson.locked ? "--" : ">"}</span>
                  ${moduleIndex + 1}.${lessonIndex + 1} ${escapeHtml(getInteractiveLessonDisplayTitle(course, { ...lesson, moduleId: module.id, moduleIndex, lessonIndex }))}
                </button>
              `).join("")}
            </article>
          `).join("")}
        </div>
      </aside>
      <section class="interactive-student-content">
        <div class="interactive-lesson-card">
          ${isPreview ? `<div class="preview-mode-banner"><strong>Prévia do aluno</strong><span>Você continua logado como administrador. Esta tela não altera progresso, nota ou certificado.</span></div>` : ""}
          <div class="interactive-lesson-top">
            <div><span>${escapeHtml(current.moduleTitle || "Módulo")}</span><h3>${escapeHtml(currentTitle)}</h3></div>
            <strong class="course-status ${current.completed ? "complete" : "progress"}">${current.completed ? "Concluída" : "Em andamento"}</strong>
          </div>
          <div class="interactive-lesson-meta">
            <span>${escapeHtml(extractionLabel)}</span>
            <span>${escapeHtml(sourcePageLabel)}</span>
            <span>${escapeHtml(`${course.hours || 0}h de carga horária`)}</span>
          </div>
          <section class="lesson-objective"><strong>Objetivo da aula</strong><p>${escapeHtml(currentSummary)}</p></section>
          <section class="lesson-pdf-text"><strong>Texto principal da aula</strong><p>${escapeHtml(currentText)}</p></section>
          <div class="interactive-tip-grid">
            <article class="practice-card"><span>Na prática</span><p>${escapeHtml(current.practiceCard || "Aplique o conteúdo em uma situação real antes de concluir a aula.")}</p></article>
            <article class="attention-card"><span>Atenção</span><p>${escapeHtml(current.attentionCard || "Revise os riscos e confirme as medidas de controle antes da atividade.")}</p></article>
          </div>
          ${renderInteractiveChecklist(current)}
          ${renderQuickQuestion(current, currentTitle)}
          <div class="interactive-lesson-actions">
            <a class="button button-secondary" href="${escapeHtml(pdfDownloadUrl)}" target="_blank" rel="noopener">Abrir apostila PDF</a>
            ${repairMojibake(completeButton)}
          </div>
        </div>
        <aside class="interactive-pdf-support">
          <div class="interactive-support-header">
            <div><span>Material de apoio</span><strong>Página ${escapeHtml(String(current.sourcePage || "-"))} da apostila</strong></div>
            <div class="interactive-pdf-actions">
              <a class="button button-secondary" href="${escapeHtml(pdfDownloadUrl)}" target="_blank" rel="noopener">Abrir em nova guia</a>
            </div>
          </div>
          ${pdfFrameUrl ? `<iframe class="pdf-viewer" src="${escapeHtml(pdfFrameUrl)}" title="Página do PDF"></iframe>` : `<div class="portal-empty-state">PDF indisponível para visualização.</div>`}
          ${isPreview ? "" : `<textarea rows="5" maxlength="300" placeholder="Notas pessoais sobre esta aula..."></textarea>`}
        </aside>
        ${renderInteractiveAssessment(course, finalAssessment, { preview: isPreview })}
      </section>
    </div>
  `;
}

function renderInteractiveChecklist(lesson) {
  const items = Array.isArray(lesson.checklist) ? lesson.checklist : [];
  if (!items.length) return "";
  return `
    <section class="interactive-checklist">
      <strong>Checklist da aula</strong>
      ${items.map((item, index) => `<label><input type="checkbox"><span>${index + 1}. ${escapeHtml(item)}</span></label>`).join("")}
    </section>
  `;
}

function renderQuickQuestion(lesson, displayTitle = "") {
  const question = lesson.quickQuestion || {};
  const alternatives = Array.isArray(question.alternatives) ? question.alternatives : [];
  if (!question.prompt || !alternatives.length) return "";
  const prompt = displayTitle && lesson.title ? String(question.prompt).replaceAll(lesson.title, displayTitle) : question.prompt;
  return `
    <section class="interactive-quick-question">
      <strong>Questão rápida</strong>
      <p>${escapeHtml(prompt)}</p>
      ${alternatives.map((alternative, index) => `
        <label><input type="radio" name="quick-${escapeHtml(lesson.id)}"><span>${String.fromCharCode(65 + index)}) ${escapeHtml(alternative)}</span></label>
      `).join("")}
      <details><summary>Ver resposta</summary><p>${escapeHtml(alternatives[question.correctIndex] || alternatives[0])}</p><small>${escapeHtml(question.explanation || "Resposta baseada no template do treinamento.")}</small></details>
    </section>
  `;
}

function renderInteractiveAssessment(course, assessment, options = {}) {
  const questions = Array.isArray(assessment?.questions) ? assessment.questions : [];
  if (!questions.length) return "";
  if (options.preview) {
    const previewQuestions = questions.slice(0, 5);
    return `
      <section class="interactive-assessment preview-assessment">
        <div class="interactive-lesson-top"><div><span>Prévia da prova final</span><h3>Avaliação automática</h3></div><strong>${questions.length} questões · Nota mínima: ${course.minimumGrade || assessment.minimumGrade || 70}%</strong></div>
        <p>Na conta do aluno, a avaliação fica liberada após a conclusão de todas as aulas. Abaixo está uma amostra das perguntas geradas para revisão técnica.</p>
        ${previewQuestions.map((question, index) => `
          <fieldset>
            <legend>${index + 1}. ${escapeHtml(question.prompt)}</legend>
            ${(question.alternatives || []).map((alternative, optionIndex) => `
              <label><input type="radio" disabled ${optionIndex === question.correctIndex ? "checked" : ""}><span>${String.fromCharCode(65 + optionIndex)}) ${escapeHtml(alternative)}</span></label>
            `).join("")}
          </fieldset>
        `).join("")}
      </section>
    `;
  }
  if (!course.progress.assessmentUnlocked) {
    return `<section class="interactive-assessment locked"><h3>Avaliação final bloqueada</h3><p>Conclua todas as aulas para liberar a prova final.</p></section>`;
  }
  return `
    <section class="interactive-assessment">
      <div class="interactive-lesson-top"><div><span>Prova final</span><h3>Avaliação automática</h3></div><strong>Nota mínima: ${course.minimumGrade || assessment.minimumGrade || 70}%</strong></div>
      <form id="interactiveAssessmentForm" data-course-id="${escapeHtml(course.id)}" data-questions="${questions.length}">
        ${questions.map((question, index) => `
          <fieldset>
            <legend>${index + 1}. ${escapeHtml(question.prompt)}</legend>
            ${(question.alternatives || []).map((alternative, optionIndex) => `
              <label><input type="radio" name="assessment-${index}" value="${optionIndex}"><span>${String.fromCharCode(65 + optionIndex)}) ${escapeHtml(alternative)}</span></label>
            `).join("")}
          </fieldset>
        `).join("")}
        <button class="button button-primary" type="button" data-portal-action="student-submit-interactive-assessment" data-course-id="${escapeHtml(course.id)}">Finalizar avaliação</button>
      </form>
      ${course.progress.bestGrade ? `<p class="status-copy">Melhor nota registrada: ${course.progress.bestGrade}% ${course.progress.passed ? "· Certificado demonstrativo liberado" : ""}</p>` : ""}
    </section>
  `;
}

async function completeInteractiveLesson(courseId, lessonId) {
  if (!courseId || !lessonId) return;
  try {
    const data = await apiRequest(`/api/student/interactive-courses/${encodeURIComponent(courseId)}/lessons/${encodeURIComponent(lessonId)}/complete`, {
      method: "POST",
      timeoutMs: 15_000
    });
    replaceStudentInteractiveCourse(data.course);
    renderStudentInteractiveCourses();
    renderStudentInteractiveLearning(courseId);
    showToast("Aula concluída. Próxima aula liberada.");
  } catch (error) {
    showToast(error.message || "Não foi possível concluir a aula.");
  }
}

async function submitInteractiveAssessment(courseId) {
  const form = document.getElementById("interactiveAssessmentForm");
  if (!form) return;
  const total = Number(form.dataset.questions || 0);
  const answers = [];
  for (let index = 0; index < total; index += 1) {
    const selected = form.querySelector(`input[name="assessment-${index}"]:checked`);
    if (!selected) {
      showToast("Responda todas as perguntas antes de finalizar.");
      return;
    }
    answers.push(Number(selected.value));
  }
  try {
    const data = await apiRequest(`/api/student/interactive-courses/${encodeURIComponent(courseId)}/assessment`, {
      method: "POST",
      body: JSON.stringify({ answers }),
      timeoutMs: 20_000
    });
    replaceStudentInteractiveCourse(data.course);
    if (data.certificate) {
      certificateUnlocked = true;
      APP_CONFIG.certificateCode = data.certificate.code || APP_CONFIG.certificateCode;
      writeStorage("fortixsegCertificateUnlocked", true);
    }
    renderStudentInteractiveCourses();
    renderStudentInteractiveLearning(courseId);
    showToast(data.passed ? `Aprovado com ${data.grade}%. Certificado liberado.` : `Nota ${data.grade}%. Revise o conteúdo e tente novamente.`);
  } catch (error) {
    showToast(error.message || "Não foi possível finalizar a avaliação.");
  }
}

function replaceStudentInteractiveCourse(course) {
  if (!course?.id) return;
  const shaped = ensureStudentInteractiveShape(course);
  const index = studentInteractiveCourses.findIndex((item) => item.id === shaped.id);
  if (index >= 0) studentInteractiveCourses[index] = shaped;
  else studentInteractiveCourses.unshift(shaped);
}

function handlePortalSubmit(event) {
  const form = event.target;
  if (form.id === "adminCourseForm") {
    event.preventDefault();
    saveAdminCourse(form);
    return;
  }
  if (form.id === "interactivePdfGeneratorForm") {
    event.preventDefault();
    void generateInteractiveCourseFromPdfForm(form);
    return;
  }
  if (form.id === "interactiveCourseReviewForm") {
    event.preventDefault();
    void saveInteractiveCourseReview(form);
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
  if (form.id === "adminUserForm") {
    event.preventDefault();
    void saveAdminUser(form);
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
  if (event.target.classList.contains("admin-course-quick-pdf")) {
    void uploadAdminCoursePdfDirect(event.target.dataset.courseId, event.target.files?.[0]);
    event.target.value = "";
  }
  if (event.target.classList.contains("interactive-course-replace-pdf")) {
    void regenerateInteractiveCourseFromPdf(event.target.dataset.courseId, event.target.files?.[0]);
    event.target.value = "";
  }
  if (event.target.id === "interactivePdfFile") {
    renderSelectedInteractivePdf(event.target.files?.[0]);
  }
  if (event.target.id === "companyEmployeeSearch") {
    renderCompanyEmployeeDirectory(event.target.value);
  }
  if (["companyPortalBulkCourse", "companyPortalBulkQuantity"].includes(event.target.id)) {
    const course = courses.find((item) => item.id === document.getElementById("companyPortalBulkCourse")?.value);
    const quantity = Number(document.getElementById("companyPortalBulkQuantity")?.value || 0);
    setText("companyBulkEstimate", formatCurrency((course?.price || 0) * quantity));
  }
  if (["adminUserSearch", "adminUserRoleFilter"].includes(event.target.id)) {
    renderAdminUserList(
      document.getElementById("adminUserSearch")?.value || "",
      document.getElementById("adminUserRoleFilter")?.value || "all"
    );
  }
}

function setInteractiveWizardStep(stepKey = "upload") {
  const order = ["upload", "analysis", "structure", "preview", "review", "publication"];
  const activeIndex = Math.max(0, order.indexOf(stepKey));
  document.querySelectorAll(".interactive-step").forEach((step) => {
    const index = order.indexOf(step.dataset.step || "");
    step.classList.toggle("is-active", index === activeIndex);
    step.classList.toggle("is-complete", index >= 0 && index < activeIndex);
  });
  document.querySelectorAll("[data-interactive-stage]").forEach((stage) => {
    stage.classList.toggle("is-active", stage.dataset.interactiveStage === order[activeIndex]);
  });
  document.querySelector("[data-interactive-stage].is-active")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getInteractiveLessons(course) {
  return (course?.modules || []).flatMap((module, moduleIndex) =>
    (module.lessons || []).map((lesson, lessonIndex) => ({ ...lesson, module, moduleIndex, lessonIndex }))
  );
}

function getInteractiveQualityGate(course) {
  const lessons = getInteractiveLessons(course);
  const questions = course?.finalAssessment?.questions || [];
  const issues = [];
  if (!course?.title) issues.push({ type: "error", text: "Titulo do treinamento ausente." });
  if (!(course?.modules || []).length) issues.push({ type: "error", text: "Nenhum modulo foi criado." });
  if (!lessons.length) issues.push({ type: "error", text: "Nenhuma aula foi criada." });
  if (!questions.length) issues.push({ type: "error", text: "Avaliacao final sem perguntas." });
  if (questions.some((question) => !Array.isArray(question.alternatives) || question.alternatives.length < 2)) {
    issues.push({ type: "warning", text: "Existem perguntas com poucas alternativas." });
  }
  if (course?.pdf?.extractionStatus !== "text-extracted") {
    issues.push({ type: "warning", text: "Texto do PDF nao foi extraido totalmente. Revisao tecnica recomendada." });
  }
  if (!course?.pdf?.url) issues.push({ type: "warning", text: "PDF sem link permanente neste ambiente. Em producao, configure storage." });
  if (!issues.some((item) => item.type === "error")) {
    issues.unshift({ type: "ok", text: "Estrutura minima pronta para publicacao apos revisao." });
  }
  return issues;
}

function renderInteractiveAnalysisPanel(state = "idle", course = null, message = "") {
  const panel = document.getElementById("interactiveAnalysisPanel");
  if (!panel) return;
  if (state === "error") {
    panel.innerHTML = `
      <div class="interactive-stage-heading">
        <div><span>Analise do conteudo</span><h2>Nao foi possivel gerar agora</h2><p>${escapeHtml(message || "O processamento do PDF falhou. Confira o arquivo e tente novamente.")}</p></div>
        <small>Erro</small>
      </div>
      <div class="interactive-quality-card danger">
        <strong>O que fazer</strong>
        <ul>
          <li>Use um PDF com texto selecionavel, nao apenas imagem escaneada.</li>
          <li>Se o arquivo for muito grande, compacte ou teste no VPS para evitar limite de tempo.</li>
          <li>Nomes grandes de arquivo sao encurtados automaticamente; titulo e carga horaria podem ser detectados pelo texto.</li>
        </ul>
      </div>
      <div class="admin-editor-actions">
        <button class="button button-secondary" type="button" data-portal-action="admin-wizard-step" data-step="upload">Voltar ao upload</button>
      </div>
    `;
    return;
  }
  const done = Boolean(course);
  const pdf = course?.pdf || {};
  const steps = [
    ["PDF validado", state !== "idle"],
    ["Texto extraido ou template aplicado", done],
    ["Tema identificado", done],
    ["Modulos, aulas e avaliacao criados", done]
  ];
  panel.innerHTML = `
    <div class="interactive-stage-heading">
      <div><span>Analise do conteudo</span><h2>${done ? "Analise concluida" : "Analisando PDF..."}</h2><p>${escapeHtml(message || "O sistema esta lendo o PDF e aplicando os templates FortixSeg.")}</p></div>
      <small>${done ? escapeHtml(course.detectedLabel || "Modelo SST") : "Processando"}</small>
    </div>
    <div class="interactive-analysis-grid">
      <article class="interactive-analysis-card">
        <span>Arquivo fonte</span>
        <strong>${escapeHtml(pdf.name || "PDF em processamento")}</strong>
        <p>${escapeHtml(pdf.pages ? `${pdf.pages} paginas identificadas` : "Paginas serao estimadas apos a leitura.")}</p>
      </article>
      <article class="interactive-analysis-card">
        <span>Modelo</span>
        <strong>${escapeHtml(course?.detectedLabel || "Aguardando identificacao")}</strong>
        <p>Confianca: ${Math.round(Number(course?.confidence || 0) * 100)}%</p>
      </article>
      <article class="interactive-analysis-card">
        <span>Resultado</span>
        <strong>${done ? "Rascunho criado" : "Gerando rascunho"}</strong>
        <p>${escapeHtml(done ? `${course.stats?.modules || 0} modulos, ${course.stats?.lessons || 0} aulas e ${course.stats?.questions || 0} questoes` : "Aguarde alguns segundos.")}</p>
      </article>
    </div>
    <div class="interactive-progress-list">
      ${steps.map(([label, complete]) => `<div class="${complete ? "complete" : ""}"><span>${complete ? "OK" : "..."}</span><strong>${label}</strong></div>`).join("")}
    </div>
    ${done ? '<div class="admin-editor-actions"><button class="button button-primary" type="button" data-portal-action="admin-wizard-step" data-step="structure">Ver estrutura identificada</button></div>' : ""}
  `;
}

function renderInteractiveStructurePanel(course) {
  const panel = document.getElementById("interactiveStructurePanel");
  if (!panel || !course) return;
  const modules = course.modules || [];
  const tags = [course.detectedLabel, course.category, course.code, course.pdf?.extractionStatus === "text-extracted" ? "texto extraido" : "template"].filter(Boolean);
  panel.innerHTML = `
    <div class="interactive-stage-heading">
      <div><span>Estrutura identificada</span><h2>${escapeHtml(getInteractiveCourseDisplayTitle(course))}</h2><p>Confira como o PDF virou modulos, aulas e pontos de revisao antes de abrir o preview.</p></div>
      <small>${escapeHtml(course.status === "published" ? "Publicado" : "Rascunho")}</small>
    </div>
    <div class="interactive-structure-layout">
      <aside class="interactive-analysis-card">
        <span>Resumo da analise</span>
        <strong>${course.stats?.modules || modules.length} modulos</strong>
        <p>${course.stats?.lessons || getInteractiveLessons(course).length} aulas interativas</p>
        <p>${course.stats?.questions || course.finalAssessment?.questions?.length || 0} perguntas na prova final</p>
        <div class="interactive-tag-list">${tags.map((tag) => `<small>${escapeHtml(tag)}</small>`).join("")}</div>
      </aside>
      <div class="interactive-structure-tree">
        ${modules.map((module, moduleIndex) => `
          <article>
            <header><span>${moduleIndex + 1}</span><strong>${escapeHtml(module.title)}</strong><small>${module.lessons?.length || 0} aulas</small></header>
            ${(module.lessons || []).map((lesson, lessonIndex) => `
              <button type="button" data-portal-action="admin-go-preview" data-admin-preview-lesson="${escapeHtml(lesson.id)}">
                <span>${moduleIndex + 1}.${lessonIndex + 1}</span>
                <strong>${escapeHtml(getInteractiveLessonDisplayTitle(course, { ...lesson, moduleId: module.id, moduleIndex, lessonIndex }))}</strong>
                <small>Origem: pagina ${escapeHtml(String(lesson.sourcePage || "-"))}</small>
              </button>
            `).join("")}
          </article>
        `).join("")}
      </div>
    </div>
    <div class="admin-editor-actions">
      <button class="button button-secondary" type="button" data-portal-action="admin-wizard-step" data-step="upload">Enviar outro PDF</button>
      <button class="button button-primary" type="button" data-portal-action="admin-go-preview">Continuar para preview</button>
    </div>
  `;
}

function renderInteractivePreviewPanelLegacy(course, lessonId = "") {
  const panel = document.getElementById("interactivePreviewPanel");
  if (!panel || !course) return;
  const lessons = getInteractiveLessons(course);
  const current = lessons.find((lesson) => lesson.id === lessonId) || lessons[0];
  if (!current) {
    panel.innerHTML = '<div class="portal-empty-state">Este treinamento ainda nao possui aulas.</div>';
    return;
  }
  const question = current.quickQuestion || {};
  panel.innerHTML = `
    <div class="interactive-stage-heading">
      <div><span>Preview do treinamento</span><h2>Como a aula ficara para o aluno</h2><p>Preview interno do admin. Voce continua logado como administrador.</p></div>
      <small>Modulo ${current.moduleIndex + 1} · Aula ${current.lessonIndex + 1}</small>
    </div>
    <div class="interactive-preview-admin">
      <aside class="interactive-preview-nav">
        ${(course.modules || []).map((module, moduleIndex) => `
          <article>
            <strong>Modulo ${moduleIndex + 1}<span>${escapeHtml(module.title)}</span></strong>
            ${(module.lessons || []).map((lesson, lessonIndex) => `
              <button class="${lesson.id === current.id ? "active" : ""}" type="button" data-admin-preview-lesson="${escapeHtml(lesson.id)}">
                <span>${moduleIndex + 1}.${lessonIndex + 1}</span>${escapeHtml(getInteractiveLessonDisplayTitle(course, { ...lesson, moduleId: module.id, moduleIndex, lessonIndex }))}
              </button>
            `).join("")}
          </article>
        `).join("")}
      </aside>
      <article class="interactive-preview-lesson">
        <span>${escapeHtml(current.module?.title || "Modulo")}</span>
        <h3>${escapeHtml(getInteractiveLessonDisplayTitle(course, current))}</h3>
        <p class="lesson-source-chip">Origem no PDF: pagina ${escapeHtml(String(current.sourcePage || "-"))}</p>
        <div class="lesson-objective"><strong>Objetivo da aula</strong><p>${escapeHtml(current.summary || current.objective || "Resumo gerado pelo template para revisao tecnica.")}</p></div>
        <div class="interactive-tip-grid">
          <div class="practice-card"><span>Na pratica</span><p>${escapeHtml(current.practiceCard || "Aplicar o procedimento na rotina, conferindo riscos, controles e responsabilidades antes da atividade.")}</p></div>
          <div class="attention-card"><span>Atencao</span><p>${escapeHtml(current.attentionCard || "Interrompa a atividade se houver condicao insegura ou falta de autorizacao.")}</p></div>
        </div>
        <div class="interactive-checklist"><strong>Checklist da aula</strong>${(current.checklist || []).map((item) => `<label><input type="checkbox"> <span>${escapeHtml(item)}</span></label>`).join("") || "<p>Nenhum checklist gerado para esta aula.</p>"}</div>
        <div class="interactive-quick-question"><strong>Questao rapida</strong><p>${escapeHtml(question.prompt || "Pergunta rapida sera revisada antes da publicacao.")}</p>${(question.alternatives || []).map((answer, index) => `<label><input type="radio" disabled ${index === question.correctIndex ? "checked" : ""}> <span>${escapeHtml(answer)}</span></label>`).join("")}</div>
      </article>
      <aside class="interactive-preview-pdf">
        <span>Material de apoio</span>
        <strong>${escapeHtml(course.pdf?.name || "PDF original")}</strong>
        <p>O aluno vera a apostila como apoio, sem quebrar a leitura da aula.</p>
        ${course.pdf?.url ? `<a class="button button-secondary" href="${escapeHtml(course.pdf.url)}" target="_blank" rel="noopener">Abrir PDF original</a>` : `<small>PDF sem link permanente neste ambiente.</small>`}
        <div class="pdf-page-placeholder"><strong>Pagina ${escapeHtml(String(current.sourcePage || "-"))}</strong><span>Preview visual do PDF sera trocado por renderizacao de pagina na fase com storage definitivo.</span></div>
      </aside>
    </div>
    <div class="admin-editor-actions">
      <button class="button button-secondary" type="button" data-portal-action="admin-go-review">Continuar para revisao</button>
      <button class="button button-primary" type="button" data-portal-action="admin-go-publication">Ir para publicacao</button>
    </div>
  `;
}

function renderInteractivePreviewPanel(course, lessonId = "") {
  const panel = document.getElementById("interactivePreviewPanel");
  if (!panel || !course) return;
  const lessons = getInteractiveLessons(course);
  const current = lessons.find((lesson) => lesson.id === lessonId) || lessons[0];
  if (!current) {
    panel.innerHTML = '<div class="portal-empty-state">Este treinamento ainda nao possui aulas.</div>';
    return;
  }

  const question = current.quickQuestion || {};
  const currentTitle = getInteractiveLessonDisplayTitle(course, current);
  const currentSummary = resolveInteractiveSummary(course, current, currentTitle);
  const cleanText = cleanInteractivePdfText(current.extractedText, currentTitle);
  const previewText = cleanText.length > 1100 ? `${cleanText.slice(0, 1100).trim()}...` : cleanText;
  const currentIndex = Math.max(0, lessons.findIndex((lesson) => lesson.id === current.id));
  const progressPercent = Math.max(8, Math.round(((currentIndex + 1) / Math.max(lessons.length, 1)) * 100));
  const nextLesson = lessons[currentIndex + 1];
  const pdfUrl = current.pageImageUrl || course.pdf?.url || "";
  const pdfFrameUrl = buildPdfFrameUrl(pdfUrl);

  panel.innerHTML = `
    <div class="interactive-stage-heading">
      <div><span>Preview do treinamento</span><h2>Simulacao da area do aluno</h2><p>Veja como o aluno vai consumir esta aula. Esta previa nao desloga o admin e nao altera progresso real.</p></div>
      <small>Modulo ${current.moduleIndex + 1} - Aula ${current.lessonIndex + 1}</small>
    </div>
    <div class="student-preview-simulator">
      <header class="student-preview-topbar">
        <div>
          <span>Curso interativo</span>
          <strong>${escapeHtml(getInteractiveCourseDisplayTitle(course))}</strong>
          <small>${escapeHtml(course.detectedLabel || course.category || "Treinamento SST")} - ${escapeHtml(String(course.hours || 0))}h - Nota minima ${escapeHtml(String(course.minimumGrade || 70))}%</small>
        </div>
        <div class="student-preview-progress" style="--progress:${progressPercent}%">
          <strong>${progressPercent}%</strong>
          <span>${currentIndex + 1}/${lessons.length} aulas na simulacao</span>
        </div>
      </header>
      <div class="student-preview-layout">
        <aside class="student-preview-sidebar">
          <div class="student-preview-sidebar-head"><span>Modulos do curso</span><strong>Ordem das aulas</strong></div>
          ${(course.modules || []).map((module, moduleIndex) => `
            <article>
              <strong>Modulo ${moduleIndex + 1}<span>${escapeHtml(module.title)}</span></strong>
              ${(module.lessons || []).map((lesson, lessonIndex) => `
                <button class="${lesson.id === current.id ? "active" : ""}" type="button" data-admin-preview-lesson="${escapeHtml(lesson.id)}">
                  <span>${moduleIndex + 1}.${lessonIndex + 1}</span>${escapeHtml(getInteractiveLessonDisplayTitle(course, { ...lesson, moduleId: module.id, moduleIndex, lessonIndex }))}
                </button>
              `).join("")}
            </article>
          `).join("")}
        </aside>
        <main class="student-preview-main">
          <div class="student-preview-lesson-card">
            <div class="interactive-lesson-top">
              <div><span>${escapeHtml(current.module?.title || "Modulo")}</span><h3>${escapeHtml(currentTitle)}</h3></div>
              <strong class="course-status progress">Em andamento</strong>
            </div>
            <div class="interactive-lesson-meta">
              <span>Origem: pagina ${escapeHtml(String(current.sourcePage || "-"))} do PDF</span>
              <span>${escapeHtml(course.pdf?.extractionStatus === "text-extracted" ? "Texto extraido" : "Template aplicado")}</span>
              <span>Preview do admin</span>
            </div>
            <section class="lesson-objective"><strong>Objetivo da aula</strong><p>${escapeHtml(currentSummary)}</p></section>
            <section class="lesson-pdf-text"><strong>Texto principal gerado a partir do PDF</strong><p>${escapeHtml(previewText)}</p></section>
            <div class="interactive-tip-grid">
              <article class="practice-card"><span>Na pratica</span><p>${escapeHtml(current.practiceCard || "Aplique o procedimento na rotina, conferindo riscos, controles e responsabilidades antes da atividade.")}</p></article>
              <article class="attention-card"><span>Atencao</span><p>${escapeHtml(current.attentionCard || "Interrompa a atividade se houver condicao insegura ou falta de autorizacao.")}</p></article>
            </div>
            <div class="student-preview-bottom-grid">
              <section class="interactive-checklist"><strong>Checklist da aula</strong>${(current.checklist || []).map((item) => `<label><input type="checkbox"> <span>${escapeHtml(item)}</span></label>`).join("") || "<p>Nenhum checklist gerado para esta aula.</p>"}</section>
              <section class="interactive-quick-question"><strong>Questao rapida</strong><p>${escapeHtml(question.prompt || "Pergunta rapida sera revisada antes da publicacao.")}</p>${(question.alternatives || []).map((answer, index) => `<label><input type="radio" disabled ${index === question.correctIndex ? "checked" : ""}> <span>${escapeHtml(answer)}</span></label>`).join("")}<small>${escapeHtml(question.explanation || "Resposta e explicacao ficam disponiveis para revisao tecnica.")}</small></section>
            </div>
            <div class="interactive-lesson-actions">
              <button class="button button-secondary" type="button" data-portal-action="admin-go-review">Voltar para revisao</button>
              ${nextLesson ? `<button class="button button-secondary" type="button" data-admin-preview-lesson="${escapeHtml(nextLesson.id)}">Ver proxima aula</button>` : ""}
              <button class="button button-primary" type="button" disabled>Concluir aula - simulacao</button>
            </div>
          </div>
        </main>
        <aside class="student-preview-material">
          <div>
            <span>Material de apoio</span>
            <strong>${escapeHtml(course.pdf?.name || "PDF original")}</strong>
            <p>O PDF fica como apoio lateral para o aluno consultar sem sair da aula.</p>
          </div>
          ${course.pdf?.url ? `<a class="button button-secondary" href="${escapeHtml(course.pdf.url)}" target="_blank" rel="noopener">Abrir PDF original</a>` : `<small>PDF processado sem link permanente neste ambiente. Configure storage para manter o arquivo em producao.</small>`}
          ${pdfFrameUrl ? `<iframe class="pdf-viewer compact" src="${escapeHtml(pdfFrameUrl)}" title="Preview do PDF"></iframe>` : `<div class="pdf-page-placeholder"><strong>Pagina ${escapeHtml(String(current.sourcePage || "-"))}</strong><span>Preview visual do PDF sera exibido quando o arquivo tiver URL permanente.</span></div>`}
        </aside>
      </div>
    </div>
    <div class="admin-editor-actions">
      <button class="button button-secondary" type="button" data-portal-action="admin-go-review">Continuar para revisao</button>
      <button class="button button-primary" type="button" data-portal-action="admin-go-publication">Ir para publicacao</button>
    </div>
  `;
}

function renderInteractivePublishPanel(course) {
  const panel = document.getElementById("interactivePublishPanel");
  if (!panel || !course) return;
  const gate = getInteractiveQualityGate(course);
  const hasError = gate.some((item) => item.type === "error");
  panel.innerHTML = `
    <div class="interactive-stage-heading">
      <div><span>Publicar treinamento</span><h2>${hasError ? "Ajustes obrigatorios antes de publicar" : "Treinamento pronto para publicacao"}</h2><p>Confira as informacoes finais. Ao publicar, o treinamento aparece na area do aluno.</p></div>
      <small>${escapeHtml(course.status === "published" ? "Publicado" : "Rascunho")}</small>
    </div>
    <div class="interactive-publication-grid">
      <article class="interactive-analysis-card">
        <span>Resumo do treinamento</span>
        <strong>${escapeHtml(getInteractiveCourseDisplayTitle(course))}</strong>
        <p>${course.stats?.modules || 0} modulos - ${course.stats?.lessons || 0} aulas - ${course.stats?.questions || 0} questoes</p>
        <p>Carga horaria: ${escapeHtml(String(course.hours || 0))}h - Nota minima: ${escapeHtml(String(course.minimumGrade || 70))}%</p>
      </article>
      <article class="interactive-analysis-card">
        <span>Arquivo fonte</span>
        <strong>${escapeHtml(course.pdf?.name || "PDF original")}</strong>
        <p>${escapeHtml(course.pdf?.pages ? `${course.pdf.pages} paginas` : "Paginas estimadas")} - ${escapeHtml(course.pdf?.extractionStatus || "template")}</p>
      </article>
      <article class="interactive-quality-card">
        <span>Checklist de qualidade</span>
        ${gate.map((item) => `<p class="${escapeHtml(item.type)}"><strong>${item.type === "ok" ? "OK" : item.type === "error" ? "!" : "i"}</strong>${escapeHtml(item.text)}</p>`).join("")}
      </article>
    </div>
    <div class="admin-editor-actions">
      <button class="button button-secondary" type="button" data-portal-action="admin-go-review">Voltar para revisao</button>
      <button class="button button-primary" type="button" data-portal-action="admin-publish-interactive" data-course-id="${escapeHtml(course.id)}" ${hasError ? "disabled" : ""}>Publicar treinamento</button>
    </div>
  `;
}

function renderInteractiveWizardCourse(course, preferredStep = "structure") {
  if (!course) return;
  renderInteractiveAnalysisPanel("done", course, "PDF analisado e treinamento criado em rascunho.");
  renderInteractiveStructurePanel(course);
  renderInteractivePreviewPanel(course);
  renderInteractiveCourseReview(course);
  renderInteractivePublishPanel(course);
  setInteractiveWizardStep(preferredStep);
}

function renderSelectedInteractivePdf(file) {
  const container = document.getElementById("interactivePdfSelection");
  if (!container) return;
  if (!file) {
    container.innerHTML = "";
    return;
  }
  const valid = file.type === "application/pdf" || /\.pdf$/i.test(file.name);
  container.innerHTML = `
    <div class="interactive-file-card ${valid ? "valid" : "invalid"}">
      <span>${valid ? "PDF selecionado" : "Arquivo invalido"}</span>
      <strong>${escapeHtml(file.name)}</strong>
      <small>${formatFileSize(file.size)} - ${valid ? "pronto para analise" : "envie somente PDF"}</small>
    </div>
  `;
}

function normalizePdfUploadName(fileName) {
  const base = String(fileName || "material-treinamento.pdf")
    .replace(/\.pdf$/i, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
  return `${base || "material-treinamento"}.pdf`;
}

function getInteractivePdfMaxBytes() {
  return 20_000_000;
}

function getPdfGenerationErrorMessage(error) {
  const message = error?.message || "";
  if (/demorou|timeout|timed out|504|invocation|function/i.test(message)) {
    return "A analise demorou demais neste ambiente. Tente um PDF menor ou com texto selecionavel. Se for PDF grande, o ideal e usar VPS ou storage externo.";
  }
  if (/413|grande|too large|payload/i.test(message)) {
    return "O PDF ficou grande para enviar pela Vercel. Tente um arquivo menor ou compacte o PDF antes de gerar o treinamento.";
  }
  return message || "Nao foi possivel gerar o treinamento.";
}

async function generateInteractiveCourseFromPdfForm(form) {
  const fileInput = document.getElementById("interactivePdfFile");
  const file = fileInput?.files?.[0];
  const button = document.getElementById("interactiveGenerateButton");
  const status = document.getElementById("interactiveGeneratorStatus");
  const originalButtonText = button?.textContent || "Enviar e analisar PDF";
  if (!file) {
    showToast("Selecione um PDF para gerar o treinamento.");
    fileInput?.focus();
    return;
  }
  if (!(file.type === "application/pdf" || /\.pdf$/i.test(file.name))) {
    showToast("O gerador aceita somente PDF.");
    return;
  }
  const maxBytes = getInteractivePdfMaxBytes();
  if (file.size > maxBytes) {
    showToast(`O PDF deve ter no maximo ${formatFileSize(maxBytes)} neste MVP.`);
    return;
  }

  const values = Object.fromEntries(new FormData(form).entries());
  if (button) {
    button.disabled = true;
    button.textContent = "Analisando PDF...";
  }
  setInteractiveWizardStep("analysis");
  renderInteractiveAnalysisPanel("reading", null, "Validando arquivo e extraindo texto do PDF...");
  if (status) status.textContent = "Lendo PDF e montando treinamento...";
  try {
    const data = await fileToDataUrl(file);
    const safeName = normalizePdfUploadName(file.name);
    renderInteractiveAnalysisPanel("generating", null, "PDF validado. Identificando tema, modulos, aulas e perguntas...");
    const result = await apiRequest("/api/admin/interactive-courses/generate", {
      method: "POST",
      body: JSON.stringify({
        ...values,
        name: safeName,
        originalName: file.name,
        data,
        hours: values.hours ? Number(values.hours) : null,
        minimumGrade: Number(values.minimumGrade || 70)
      }),
      timeoutMs: 90_000
    });
    adminInteractiveCourses = result.courses || [];
    selectedInteractiveCourse = result.course;
    renderAdminInteractiveCourseList();
    renderInteractiveWizardCourse(selectedInteractiveCourse, "structure");
    form.reset();
    renderSelectedInteractivePdf(null);
    const extractionStatus = selectedInteractiveCourse?.pdf?.extractionStatus;
    const extractionMessage = extractionStatus === "text-extracted"
      ? "Texto do PDF extraido e treinamento gerado em rascunho."
      : "Treinamento gerado por template. Revise o conteudo antes de publicar.";
    if (status) status.textContent = extractionMessage;
    showToast(extractionMessage);
  } catch (error) {
    const friendlyMessage = getPdfGenerationErrorMessage(error);
    renderInteractiveAnalysisPanel("error", null, friendlyMessage);
    if (status) status.textContent = friendlyMessage;
    showToast(friendlyMessage);
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = originalButtonText;
    }
  }
}

async function loadAdminInteractiveCourses() {
  const list = document.getElementById("adminInteractiveCourseList");
  if (!list) return;
  list.innerHTML = '<div class="portal-empty-state">Carregando treinamentos gerados...</div>';
  try {
    const data = await apiRequest("/api/admin/interactive-courses", { timeoutMs: 15_000 });
    adminInteractiveCourses = data.courses || [];
    renderAdminInteractiveCourseList();
  } catch (error) {
    adminInteractiveCourses = [];
    list.innerHTML = `<div class="portal-empty-state"><strong>Não foi possível carregar o gerador.</strong><span>${escapeHtml(error.message || "Confira se o servidor está rodando.")}</span></div>`;
  }
}

function renderAdminInteractiveCourseList() {
  const list = document.getElementById("adminInteractiveCourseList");
  if (!list) return;
  list.innerHTML = adminInteractiveCourses.map((course) => {
    const stats = course.stats || {};
    const statusLabel = course.status === "published" ? "Publicado" : "Rascunho";
    return `
      <article class="admin-interactive-course-card ${course.status === "published" ? "published" : "draft"}">
        <div>
          <span class="course-status ${course.status === "published" ? "published" : "draft"}">${statusLabel}</span>
          <h4>${escapeHtml(getInteractiveCourseDisplayTitle(course))}</h4>
          <p>${escapeHtml(course.detectedLabel || course.category)} - ${stats.modules || 0} módulos - ${stats.lessons || 0} aulas - ${stats.questions || 0} questões</p>
          <small>Gerado em ${escapeHtml(formatDate(course.generatedAt))} · Modelo: ${escapeHtml(course.detectedTemplate || "sst")}</small>
        </div>
        <div class="admin-interactive-actions">
          <button class="button button-secondary" type="button" data-portal-action="admin-edit-interactive" data-course-id="${escapeHtml(course.id)}">Editar</button>
          <label class="button button-secondary interactive-replace-button">Subir novo PDF<input class="interactive-course-replace-pdf" type="file" accept="application/pdf" data-course-id="${escapeHtml(course.id)}"></label>
          ${course.status === "published"
            ? `<button class="button button-secondary" type="button" data-portal-action="admin-unpublish-interactive" data-course-id="${escapeHtml(course.id)}">Voltar para rascunho</button>`
            : `<button class="button button-primary" type="button" data-portal-action="admin-publish-interactive" data-course-id="${escapeHtml(course.id)}">Publicar</button>`}
          <button class="button button-danger" type="button" data-portal-action="admin-delete-interactive" data-course-id="${escapeHtml(course.id)}">Excluir</button>
        </div>
      </article>
    `;
  }).join("") || '<div class="portal-empty-state"><strong>Nenhum treinamento gerado ainda.</strong><span>Suba um PDF para criar o primeiro rascunho interativo.</span></div>';
}

async function loadInteractiveCourseForReview(courseId) {
  if (!courseId) return;
  try {
    const data = await apiRequest(`/api/admin/interactive-courses/${encodeURIComponent(courseId)}`, { timeoutMs: 15_000 });
    selectedInteractiveCourse = data.course;
    renderInteractiveWizardCourse(selectedInteractiveCourse, "review");
  } catch (error) {
    showToast(error.message || "Não foi possível abrir a revisão.");
  }
}

function renderInteractiveCourseReview(course) {
  const panel = document.getElementById("interactiveCourseReviewPanel");
  if (!panel || !course) return;
  const modules = Array.isArray(course.modules) ? course.modules : [];
  const stats = course.stats || {};
  panel.classList.remove("hidden");
  setText("interactiveReviewStatus", course.status === "published" ? "Publicado" : "Rascunho");
  setText("interactiveReviewTitle", getInteractiveCourseDisplayTitle(course) || "Treinamento gerado");
  setText("interactiveReviewMeta", `${course.code || "SST"} · ${course.hours || 0}h · ${course.detectedLabel || "Modelo SST"} · ${stats.lessons || 0} aulas`);

  const moduleContainer = document.getElementById("interactiveModuleReview");
  if (moduleContainer) {
    moduleContainer.innerHTML = modules.map((module, moduleIndex) => `
      <article class="interactive-module-card">
        <header><span>Módulo ${moduleIndex + 1}</span><strong>${escapeHtml(module.title)}</strong><small>${module.lessons?.length || 0} aulas</small></header>
        <div>
          ${(module.lessons || []).map((lesson, lessonIndex) => `
            <button class="interactive-lesson-row" type="button" data-portal-action="admin-preview-interactive" data-lesson-id="${escapeHtml(lesson.id)}">
              <span>${moduleIndex + 1}.${lessonIndex + 1}</span>
              <strong>${escapeHtml(getInteractiveLessonDisplayTitle(course, { ...lesson, moduleId: module.id, moduleIndex, lessonIndex }))}</strong>
              <small>Página ${escapeHtml(String(lesson.sourcePage || "-"))} · Prévia</small>
            </button>
          `).join("")}
        </div>
      </article>
    `).join("") || '<div class="portal-empty-state">Nenhum módulo gerado.</div>';
  }

  const summary = document.getElementById("interactiveReviewSummary");
  if (summary) {
    const extractionStatus = course.pdf?.extractionStatus === "text-extracted" ? "Texto extraido" : "Template aplicado";
    const storageLabel = course.pdf?.storage === "blob-public" || course.pdf?.storage === "blob-private"
      ? "PDF salvo na nuvem"
      : course.pdf?.storage === "local-file"
        ? "PDF salvo localmente"
        : "PDF sem storage permanente";
    summary.innerHTML = `
      <article><span>Resumo do treinamento</span><strong>${stats.modules || 0}</strong><small>módulos</small></article>
      <article><span>Aulas</span><strong>${stats.lessons || 0}</strong><small>interativas</small></article>
      <article><span>Prova final</span><strong>${stats.questions || 0}</strong><small>questões editáveis</small></article>
      <article><span>Leitura do PDF</span><strong>${escapeHtml(extractionStatus)}</strong><small>${escapeHtml(course.pdf?.extractionError || "Pronto para revisao")}</small></article>
      <article><span>Armazenamento</span><strong>${escapeHtml(storageLabel)}</strong><small>${escapeHtml(course.pdf?.pages ? `${course.pdf.pages} pagina${course.pdf.pages === 1 ? "" : "s"}` : "Paginas estimadas")}</small></article>
      <article><span>PDF anexado</span><strong>${escapeHtml(course.pdf?.name || "material.pdf")}</strong><small>${escapeHtml(formatFileSize(course.pdf?.size || 0))}</small></article>
      <a class="button button-secondary" href="${escapeHtml(course.pdf?.url || "#")}" target="_blank" rel="noopener">Abrir PDF original</a>
    `;
  }

  const editor = document.getElementById("interactiveCourseJsonEditor");
  if (editor) editor.value = JSON.stringify(course, null, 2);
  panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function saveInteractiveCourseReview(form) {
  if (!selectedInteractiveCourse?.id) {
    showToast("Abra um treinamento gerado antes de salvar.");
    return;
  }
  const status = document.getElementById("interactiveReviewSaveStatus");
  const editor = document.getElementById("interactiveCourseJsonEditor");
  let course;
  try {
    course = JSON.parse(editor?.value || "{}");
  } catch {
    showToast("O JSON da revisão está inválido.");
    if (status) status.textContent = "JSON inválido. Corrija antes de salvar.";
    return;
  }
  if (status) status.textContent = "Salvando revisão...";
  try {
    const data = await apiRequest(`/api/admin/interactive-courses/${encodeURIComponent(selectedInteractiveCourse.id)}`, {
      method: "PUT",
      body: JSON.stringify({ course }),
      timeoutMs: 30_000
    });
    selectedInteractiveCourse = data.course;
    adminInteractiveCourses = data.courses || adminInteractiveCourses;
    renderAdminInteractiveCourseList();
    renderInteractiveWizardCourse(selectedInteractiveCourse, "review");
    if (status) status.textContent = "Revisão salva.";
    showToast("Revisão salva com sucesso.");
  } catch (error) {
    if (status) status.textContent = error.message || "Não foi possível salvar.";
    showToast(error.message || "Não foi possível salvar a revisão.");
  }
}

async function publishInteractiveCourse(courseId, publish) {
  const safeCourseId = String(courseId || "").trim();
  if (!safeCourseId) {
    showToast("Selecione um treinamento gerado.");
    return;
  }
  try {
    const action = publish ? "publish" : "unpublish";
    showToast(publish ? "Publicando treinamento..." : "Voltando treinamento para rascunho...");
    const data = await apiRequest(`/api/admin/interactive-courses/${encodeURIComponent(safeCourseId)}/${action}`, {
      method: "POST",
      timeoutMs: 20_000
    });
    selectedInteractiveCourse = data.course;
    adminInteractiveCourses = data.courses || adminInteractiveCourses;
    renderAdminInteractiveCourseList();
    renderInteractiveWizardCourse(selectedInteractiveCourse, publish ? "publication" : "review");
    await hydratePortalData("student");
    showToast(publish ? "Treinamento publicado na área do aluno." : "Treinamento voltou para rascunho.");
  } catch (error) {
    showToast(error.message || "Não foi possível alterar o status.");
  }
}

async function deleteInteractiveCourse(courseId) {
  if (!courseId) {
    showToast("Selecione um treinamento para excluir.");
    return;
  }
  const course = adminInteractiveCourses.find((item) => item.id === courseId) || selectedInteractiveCourse;
  const label = getInteractiveCourseDisplayTitle(course) || "este treinamento";
  if (!confirm(`Excluir ${label}? Esta acao remove o rascunho/publicacao do gerador.`)) return;
  try {
    const data = await apiRequest("/api/admin/interactive-courses/generate", {
      method: "POST",
      body: JSON.stringify({ action: "delete", courseId }),
      timeoutMs: 20_000
    });
    adminInteractiveCourses = data.courses || [];
    if (selectedInteractiveCourse?.id === courseId) selectedInteractiveCourse = null;
    renderAdminInteractiveCourseList();
    setInteractiveWizardStep("upload");
    document.getElementById("interactiveStructurePanel").innerHTML = '<div class="portal-empty-state"><strong>Treinamento excluido.</strong><span>Envie um novo PDF para gerar outro rascunho.</span></div>';
    showToast("Treinamento excluido.");
  } catch (error) {
    showToast(error.message || "Nao foi possivel excluir o treinamento.");
  }
}

async function regenerateInteractiveCourseFromPdf(courseId, file) {
  if (!courseId || !file) return;
  if (!(file.type === "application/pdf" || /\.pdf$/i.test(file.name))) {
    showToast("Envie somente PDF.");
    return;
  }
  if (file.size > 20_000_000) {
    showToast("O PDF deve ter no maximo 20 MB neste MVP.");
    return;
  }
  const existing = adminInteractiveCourses.find((item) => item.id === courseId) || selectedInteractiveCourse;
  try {
    showToast("Regerando treinamento com novo PDF...");
    setInteractiveWizardStep("analysis");
    renderInteractiveAnalysisPanel("reading", existing, "Recebendo novo PDF para atualizar o rascunho.");
    const dataUrl = await fileToDataUrl(file);
    const safeName = normalizePdfUploadName(file.name);
    const data = await apiRequest("/api/admin/interactive-courses/generate", {
      method: "POST",
      body: JSON.stringify({
        action: "regenerate",
        courseId,
        name: safeName,
        originalName: file.name,
        data: dataUrl,
        title: existing?.title || "",
        category: existing?.category || "Segurança do Trabalho",
        hours: Number(existing?.hours || 0) || null,
        minimumGrade: Number(existing?.minimumGrade || 70),
        responsible: existing?.responsible || ""
      }),
      timeoutMs: 120_000
    });
    selectedInteractiveCourse = data.course;
    adminInteractiveCourses = data.courses || adminInteractiveCourses;
    renderAdminInteractiveCourseList();
    renderInteractiveWizardCourse(selectedInteractiveCourse, "structure");
    showToast("Treinamento atualizado com novo PDF.");
  } catch (error) {
    const friendlyMessage = getPdfGenerationErrorMessage(error);
    renderInteractiveAnalysisPanel("error", null, friendlyMessage);
    showToast(friendlyMessage);
  }
}

function downloadSelectedInteractivePdf() {
  if (!selectedInteractiveCourse?.pdf?.url) {
    showToast("Este treinamento ainda não possui PDF anexado.");
    return;
  }
  window.open(selectedInteractiveCourse.pdf.url, "_blank", "noopener");
}

function previewInteractiveCourseAsStudent(lessonId = "") {
  if (!selectedInteractiveCourse) {
    showToast("Abra um treinamento gerado para pré-visualizar.");
    return;
  }
  renderAdminInteractivePreview(selectedInteractiveCourse, lessonId);
}

function renderAdminInteractivePreview(course, lessonId = "") {
  const panel = document.getElementById("interactiveAdminPreviewPanel");
  if (!panel || !course) return;
  const previewCourse = cloneInteractiveCourseForPreview(course);
  const current = getInteractiveCurrentLesson(previewCourse, lessonId, true);
  if (!current) {
    panel.innerHTML = '<div class="portal-empty-state">Este treinamento ainda não possui aulas para prévia.</div>';
    panel.classList.remove("hidden");
    return;
  }
  panel.innerHTML = `
    <div class="admin-preview-top">
      <div>
        <span>Pré-visualização do treinamento</span>
        <h3>Como o aluno verá este conteúdo</h3>
        <p>Revise leitura, ordem das aulas, PDF de apoio, checklists e perguntas antes de publicar.</p>
      </div>
      <button class="button button-secondary" type="button" data-portal-action="admin-close-interactive-preview">Fechar prévia</button>
    </div>
    ${renderInteractiveLearningShell(previewCourse, current, { mode: "preview" })}
  `;
  panel.classList.remove("hidden");
  panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeAdminInteractivePreview() {
  const panel = document.getElementById("interactiveAdminPreviewPanel");
  if (!panel) return;
  panel.classList.add("hidden");
  panel.innerHTML = "";
  document.getElementById("interactiveCourseReviewPanel")?.scrollIntoView({ behavior: "smooth", block: "start" });
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

async function loadAdminUsers() {
  const list = document.getElementById("adminUserList");
  if (!list) return;
  list.innerHTML = '<div class="portal-empty-state">Carregando usuários...</div>';

  try {
    const data = await apiRequest("/api/admin/users");
    adminUsers = data.users || [];
    renderAdminUserList();
  } catch (error) {
    adminUsers = [];
    list.innerHTML = `<div class="portal-empty-state"><strong>Não foi possível carregar usuários.</strong><span>${escapeHtml(error.message || "Confira o login administrativo.")}</span></div>`;
  }
}

function renderAdminUserList(query = "", role = "all") {
  const list = document.getElementById("adminUserList");
  if (!list) return;
  const normalizedQuery = normalizeText(query);
  const filtered = adminUsers.filter((user) => {
    const matchesQuery = !normalizedQuery || normalizeText(`${user.name} ${user.email} ${user.document} ${user.companyName}`).includes(normalizedQuery);
    return matchesQuery && (role === "all" || user.role === role);
  });

  list.innerHTML = filtered.map((user) => `
    <article class="admin-user-card">
      <div>
        <span class="course-status ${user.role === "admin" ? "draft" : "published"}">${escapeHtml(user.roleLabel || user.role)}</span>
        <h4>${escapeHtml(user.name || "Usuário sem nome")}</h4>
        <p>${escapeHtml(user.email)}${user.companyName ? ` - ${escapeHtml(user.companyName)}` : ""}</p>
      </div>
      <div>
        <strong>${escapeHtml(user.status === "inactive" ? "Desativado" : "Ativo")}</strong>
        <small>${escapeHtml(user.lastLoginAt ? `Ultimo acesso: ${formatDate(user.lastLoginAt)}` : "Ainda sem login")}</small>
        <button class="button button-secondary" type="button" data-portal-action="admin-toggle-user" data-user-id="${escapeHtml(user.id)}" data-user-status="${escapeHtml(user.status || "active")}">${user.status === "inactive" ? "Reativar" : "Desativar"}</button>
      </div>
    </article>
  `).join("") || '<div class="portal-empty-state"><strong>Nenhum usuário encontrado.</strong><span>Cadastre um novo acesso pelo formulário ao lado.</span></div>';
}

async function saveAdminUser(form) {
  const saveButton = document.getElementById("adminUserSaveButton");
  const status = document.getElementById("adminUserSaveStatus");
  const values = Object.fromEntries(new FormData(form).entries());

  saveButton.disabled = true;
  if (status) status.textContent = "Criando usuário...";
  try {
    await apiRequest("/api/admin/users", {
      method: "POST",
      body: JSON.stringify(values),
      timeoutMs: 15_000
    });
    form.reset();
    setAdminFormValue(form, "password", "123456");
    await loadAdminUsers();
    await hydratePortalData("admin");
    if (status) status.textContent = "Usuário criado com sucesso.";
    showToast("Usuário criado com sucesso.");
  } catch (error) {
    if (status) status.textContent = error.message || "Não foi possível criar o usuário.";
    showToast(error.message || "Não foi possível criar o usuário.");
  } finally {
    saveButton.disabled = false;
  }
}

async function toggleAdminUser(userId, currentStatus) {
  const nextStatus = currentStatus === "inactive" ? "active" : "inactive";
  try {
    await apiRequest(`/api/admin/users/${encodeURIComponent(userId)}`, {
      method: "PATCH",
      body: JSON.stringify({ status: nextStatus }),
      timeoutMs: 15_000
    });
    await loadAdminUsers();
    await hydratePortalData("admin");
    showToast(nextStatus === "active" ? "Usuário reativado." : "Usuário desativado.");
  } catch (error) {
    showToast(error.message || "Não foi possível alterar o usuário.");
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
    const resourceLabel = resourceCount
      ? `${resourceCount} ${resourceCount === 1 ? "PDF anexado" : "PDFs anexados"}`
      : "Nenhum PDF anexado";
    const uploadInputId = `adminCourseQuickPdf-${escapeHtml(course.id)}`;
    return `
      <article class="admin-course-item">
        <div class="admin-course-item-main">
          <span class="course-status ${course.status === "draft" ? "draft" : "published"}">${statusLabel}</span>
          <h4>${escapeHtml(course.title)}</h4>
          <p>${escapeHtml(course.code)} - ${course.hours}h - ${topicCount} topicos - ${resourceCount} materiais</p>
          <span class="admin-course-resource-summary">${resourceLabel}</span>
        </div>
        <div class="admin-course-item-side">
          <strong>${formatCurrency(course.price)}</strong>
          <div class="admin-course-actions">
            <button class="button button-secondary" type="button" data-portal-action="admin-edit-course" data-course-id="${escapeHtml(course.id)}">Editar</button>
            <label class="button button-secondary admin-course-upload-button" for="${uploadInputId}">
              Subir PDF
              <input id="${uploadInputId}" class="admin-course-quick-pdf" type="file" accept="application/pdf" data-course-id="${escapeHtml(course.id)}">
            </label>
            <button class="button button-danger admin-course-delete-inline" type="button" data-portal-action="admin-delete-course" data-course-id="${escapeHtml(course.id)}">Excluir</button>
          </div>
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
  document.getElementById("adminCourseManager")?.classList.add("editor-open");
  editor.classList.remove("hidden");
  editor.scrollIntoView({ behavior: "smooth", block: "start" });
  setTimeout(() => form.elements.namedItem("title")?.focus(), 250);
}

function closeAdminCourseEditor() {
  const editor = document.getElementById("adminCourseEditor");
  const form = document.getElementById("adminCourseForm");
  editor?.classList.add("hidden");
  document.getElementById("adminCourseManager")?.classList.remove("editor-open");
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
      <a class="icon-button" href="${escapeHtml(resource.url)}" target="_blank" rel="noopener" aria-label="Abrir ${escapeHtml(resource.name)}" title="Abrir material">PDF</a>
      <button class="icon-button danger" type="button" data-portal-action="admin-delete-resource" data-course-id="${escapeHtml(course.id)}" data-resource-id="${escapeHtml(resource.id)}" aria-label="Excluir ${escapeHtml(resource.name)}" title="Excluir material">x</button>
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

async function uploadAdminCoursePdfDirect(courseId, file) {
  const course = adminCourseCatalog.find((item) => item.id === courseId);
  if (!course || !file) return;
  if (file.type !== "application/pdf") {
    showToast("Envie somente arquivos PDF.");
    return;
  }
  if (file.size > 12_000_000) {
    showToast("O PDF deve ter no maximo 12 MB.");
    return;
  }

  try {
    showToast(`Enviando PDF para ${course.code}...`);
    await uploadAdminCourseResource(courseId, file);
    await loadAdminCourseCatalog();
    await syncCourseCatalog();
    const form = document.getElementById("adminCourseForm");
    if (form?.dataset.courseId === courseId) openAdminCourseEditor(courseId);
    showToast("PDF anexado ao treinamento.");
  } catch (error) {
    showToast(error.message || "Nao foi possivel anexar o PDF ao treinamento.");
  }
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error(`Não foi possível ler ${file.name}.`));
    reader.readAsDataURL(file);
  });
}

async function deleteAdminCourse(courseId = "") {
  const form = document.getElementById("adminCourseForm");
  const targetCourseId = courseId || form?.dataset.courseId;
  const course = adminCourseCatalog.find((item) => item.id === targetCourseId);
  if (!course || !window.confirm(`Excluir o curso "${course.title}"? Esta ação removerá o curso do catálogo.`)) return;

  try {
    const result = await apiRequest(`/api/admin/courses/${encodeURIComponent(targetCourseId)}`, { method: "DELETE" });
    if (form?.dataset.courseId === targetCourseId) closeAdminCourseEditor();
    await loadAdminCourseCatalog();
    await syncCourseCatalog();
    showToast(result.archived ? "Curso arquivado como rascunho porque ja possui matriculas." : "Curso excluido do catalogo.");
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
  const storedSession = normalizeStoredSession(readStorage("fortixsegCurrentUser", null));
  const currentUser = storedSession?.user || null;
  currentSession = storedSession;
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

function bindPress(target, handler) {
  if (!target) return;

  let lastPointerTime = 0;
  const onPress = (event) => {
    if (event.type === "click" && Date.now() - lastPointerTime < 450) return;
    if (event.type === "pointerup") {
      lastPointerTime = Date.now();
      event.preventDefault();
    }
    handler(event);
  };

  target.addEventListener("pointerup", onPress);
  target.addEventListener("click", onPress);
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

  bindPress(document.getElementById("menuToggle"), () => openAuth("login"));
  bindPress(document.getElementById("cartButton"), openCart);
  bindPress(document.getElementById("closeCartButton"), closeCart);
  bindPress(document.getElementById("drawerBackdrop"), closeCart);
  bindPress(document.getElementById("checkoutButton"), checkout);
  bindPress(document.getElementById("continueCourseButton"), () => navigate("lesson"));
  bindPress(document.getElementById("completeLessonButton"), completeLesson);
  bindPress(document.getElementById("openQuizButton"), () => {
    document.getElementById("quizPanel").classList.remove("hidden");
    document.getElementById("quizPanel").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  bindPress(document.getElementById("addEmployeeButton"), () => openModal("employeeModal"));
  bindPress(document.getElementById("printCertificateButton"), printCertificate);
  bindPress(document.getElementById("validateCertificateButton"), () => {
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
    bindPress(button, () => openAuth(button.dataset.auth));
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

window.fortixsegOpenAuth = (mode = "login") => openAuth(mode);

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

window.fortixsegOpenCart = () => openCart();

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
      message = "A rota de checkout não está publicada no servidor. Envie a pasta api/server para o deploy e reinicie.";
    } else if (status === 503 || error.code === "MERCADO_PAGO_NOT_CONFIGURED" || /configurado|not configured/i.test(error.message)) {
      message = "Falta configurar MERCADO_PAGO_ACCESS_TOKEN nas variáveis do servidor e reiniciar/publicar novamente.";
    } else if (/Failed to fetch|fetch|URL scheme|NetworkError/i.test(error.message)) {
      message = "O site não conseguiu falar com a função de checkout. Confira se o servidor está rodando e tente novamente.";
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
    currentSession = { user: session.user, token: session.token };
    localStorage.setItem("fortixsegApiToken", session.token);
    localStorage.setItem("fortixsegCurrentUser", JSON.stringify(currentSession));
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
    currentSession = { user: session.user, token: session.token };
    localStorage.setItem("fortixsegApiToken", session.token);
    localStorage.setItem("fortixsegCurrentUser", JSON.stringify(currentSession));

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
  currentSession = null;
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
    <div class="status-seal">OK</div>
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

function formatDate(value) {
  if (!value) return "Data não informada";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("pt-BR").format(date);
}

function formatNumber(value) {
  return new Intl.NumberFormat("pt-BR").format(Number(value) || 0);
}

function normalizeText(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function escapeHtml(value) {
  return repairMojibake(String(value))
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function repairMojibake(value) {
  return repairCommonPortugueseEncoding(String(value || ""));
}

function repairCommonPortugueseEncoding(value) {
  const replacements = [
    ["\u00c3\u00a1", "\u00e1"], ["\u00c3\u00a0", "\u00e0"], ["\u00c3\u00a2", "\u00e2"], ["\u00c3\u00a3", "\u00e3"],
    ["\u00c3\u00a9", "\u00e9"], ["\u00c3\u00aa", "\u00ea"], ["\u00c3\u00ad", "\u00ed"], ["\u00c3\u00b3", "\u00f3"],
    ["\u00c3\u00b4", "\u00f4"], ["\u00c3\u00b5", "\u00f5"], ["\u00c3\u00ba", "\u00fa"], ["\u00c3\u00a7", "\u00e7"],
    ["\u00c3\u0081", "\u00c1"], ["\u00c3\u0089", "\u00c9"], ["\u00c3\u009a", "\u00da"], ["\u00c3\u0087", "\u00c7"],
    ["\u00c2\u00b7", "\u00b7"], ["\u00e2\u0086\u0090", "\u2190"], ["\u00e2\u009c\u0093", "\u2713"],
    ["\u00e2\u0097\u008b", "\u25cb"], ["\u00e2\u0096\u00b6", "\u25b6"], ["\u00e2\u0080\u00a2", "\u2022"]
  ];
  return replacements.reduce((text, [broken, fixed]) => text.replaceAll(broken, fixed), value);
}

// TODO: buscar cursos no banco de dados
// TODO: salvar progresso real do aluno
// TODO: criar Área do aluno real com Supabase
// TODO: criar Área da empresa real
// TODO: criar Painel admin real
// TODO: implementar storage protegido para PDFs em produção
// TODO: criar logs de acesso conforme requisitos do treinamento EAD
// TODO: integrar banco PostgreSQL e políticas de acesso

