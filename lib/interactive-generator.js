import { randomUUID } from "node:crypto";

const DETECTION_RULES = [
  {
    key: "nr35",
    label: "NR-35 - Trabalho em Altura",
    keywords: ["nr-35", "nr 35", "trabalho em altura", "queda", "cinturão", "cinturão", "talabarte", "ancoragem", "linha de vida", "fator de queda"]
  },
  {
    key: "nr33",
    label: "NR-33 - Espaco Confinado",
    keywords: ["nr-33", "nr 33", "espaco confinado", "espaço confinado", "pet", "vigia", "atmosfera", "resgatista", "entrada"]
  },
  {
    key: "nr10",
    label: "NR-10 - Segurança em Eletricidade",
    keywords: ["nr-10", "nr 10", "eletricidade", "choque", "sep", "desenergizacao", "desenergização", "bloqueio elétrico", "risco elétrico"]
  },
  {
    key: "epi",
    label: "EPI / NR-06",
    keywords: ["nr-06", "nr 06", "epi", "equipamento de proteção individual", "equipamento de proteção individual", "ca", "certificado de aprovacao"]
  },
  {
    key: "integração",
    label: "Integração de Segurança",
    keywords: ["integração", "integração", "segurança", "segurança", "regras gerais", "normas internas", "conduta segura"]
  }
];

const GENERIC_TEMPLATE = {
  key: "sst-genérico",
  label: "SST Genérico",
  code: "SST",
  title: "Treinamento Interativo de Segurança do Trabalho",
  category: "Segurança do Trabalho",
  hours: 4,
  minimumGrade: 70,
  modules: [
    { title: "Introdução ao treinamento", topics: ["Objetivo do treinamento", "Aplicacao na rotina", "Principais conceitos"] },
    { title: "Riscos e controles", topics: ["Identificacao de riscos", "Medidas preventivas", "Condutas seguras"] },
    { title: "Procedimentos e boas práticas", topics: ["Regras operacionais", "Checklist de segurança", "Comunicação de desvios"] },
    { title: "Avaliação final", topics: ["Prova final"] }
  ],
  questions: [
    question("Qual é o principal objetivo de um treinamento de segurança?", ["Substituir procedimentos da empresa", "Orientar condutas seguras e prevenir acidentes", "Eliminar a necessidade de supervisao", "Dispensar o uso de EPIs"], 1),
    question("Quando um risco deve ser comunicado?", ["Somente após acidente", "Apenas no fim do turno", "Assim que for identificado", "Somente se houver testemunha"], 2),
    question("O certificado deve ser liberado quando?", ["Antes da aula", "Apos conclusao e aprovacao", "Sem avaliação", "Somente por pedido verbal"], 1)
  ]
};

const NR35_TEMPLATE = {
  key: "nr35",
  label: "NR-35 - Trabalho em Altura",
  code: "NR 35",
  title: "NR-35 - Trabalho em Altura",
  category: "Trabalho em altura",
  hours: 8,
  minimumGrade: 70,
  modules: [
    { title: "Introdução e objetivo da NR-35", topics: ["Objetivo da NR-35", "O que é trabalho em altura", "Onde ocorrem acidentes por queda"] },
    { title: "Normas e responsabilidades", topics: ["Normas aplicáveis", "Responsabilidades do empregador", "Responsabilidades do trabalhador", "EPI e responsabilidades"] },
    { title: "Acidentes típicos e condições inseguras", topics: ["Acidentes típicos", "Ato inseguro", "Condição insegura", "Exemplos visuais de risco"] },
    { title: "Condições impeditivas e riscos adicionais", topics: ["Condições impeditivas", "Riscos elétricos", "Trabalho a quente", "Explosividade", "Confinamento", "Intempéries", "Riscos mecânicos"] },
    { title: "Medidas de proteção contra quedas", topics: ["Hierarquia de controle", "Eliminar o risco", "EPC", "EPI", "Recursos tecnológicos", "Linha de vida", "Guarda-corpo"] },
    { title: "EPI para trabalho em altura", topics: ["Cinturão tipo paraquedista", "Inspeção do cinturão", "Talabarte", "Demais EPIs", "Fator de queda", "Ancoragem correta"] },
    { title: "AR, PT e emergência", topics: ["Análise de Risco", "Definições de risco e perigo", "Planejamento", "Permissão de Trabalho", "Emergência e salvamento", "Condutas em emergência"] },
    { title: "Avaliação final", topics: ["Prova final com 20 perguntas editáveis"] }
  ],
  questions: [
    question("Segundo a regra geral da NR-35, trabalho em altura envolve atividade acima de qual referencia com risco de queda?", ["1 metro", "2 metros", "3 metros", "5 metros"], 1),
    question("Antes de iniciar a atividade em altura, o que deve ser verificado?", ["Somente o horario de termino", "As condições, riscos e medidas de controle", "A cor do capacete", "A marca do equipamento"], 1),
    question("Qual equipamento é essencial para proteção individual contra queda?", ["Cinturão tipo paraquedista", "Protetor auricular apenas", "Luva de algodao apenas", "Mascara descartavel"], 0),
    question("O talabarte deve ser usado de forma que reduza principalmente qual risco?", ["Ruido", "Queda e impacto", "Calor ambiental", "Iluminacao"], 1),
    question("O que a ancoragem precisa oferecer?", ["Apenas facilidade de acesso", "Resistencia e posicionamento adequados", "Cor padronizada", "Uso opcional"], 1),
    question("Uma condicao impeditiva significa:", ["Situacao que permite acelerar a tarefa", "Situacao que impede ou suspende a atividade por segurança", "Documento de compra", "Tipo de treinamento"], 1),
    question("A Permissão de Trabalho serve para:", ["Autorizar e controlar atividade com riscos definidos", "Substituir a análise de risco", "Dispensar supervisao", "Comprar equipamentos"], 0),
    question("A Análise de Risco deve identificar:", ["Somente custo", "Perigos, riscos e controles", "Apenas o nome da equipe", "Somente a carga horaria"], 1),
    question("Guarda-corpo e linha de vida sao exemplos de:", ["Medidas de proteção contra quedas", "Documentos fiscais", "Ferramentas de escritorio", "Procedimentos de venda"], 0),
    question("Em emergência, a equipe deve:", ["Improvisar sem comunicar", "Seguir o plano de emergência e acionar apoio", "Abandonar registros", "Remover o EPI primeiro"], 1),
    question("O trabalhador tem responsabilidade de:", ["Ignorar condições inseguras", "Cumprir procedimentos e comunicar riscos", "Modificar equipamentos sem autorizacao", "Trabalhar sem treinamento"], 1),
    question("O empregador deve garantir:", ["Apenas prazo de entrega", "Treinamento, medidas de controle e condições seguras", "Apenas uniforme", "Atividade sem planejamento"], 1),
    question("Fator de queda esta relacionado a:", ["Distancia potencial de queda e sistema de retencao", "Temperatura do ambiente", "Volume de producao", "Preco do EPI"], 0),
    question("Cinturão e talabarte devem ser:", ["Inspecionados antes do uso", "Usados mesmo danificados", "Compartilhados sem controle", "Guardados molhados"], 0),
    question("Risco elétrico em altura deve ser tratado como:", ["Risco adicional", "Risco sem importancia", "Somente problema administrativo", "Fator comercial"], 0),
    question("Trabalho a quente em altura exige:", ["Planejamento e controles especificos", "Apenas pressa", "Somente assinatura do aluno", "Dispensa de EPI"], 0),
    question("Intemperies podem gerar:", ["Condicao impeditiva ou risco adicional", "Aumento automatico de segurança", "Dispensa de análise", "Certificado imediato"], 0),
    question("EPC significa:", ["Equipamento de Proteção Coletiva", "Envio de Produto Comercial", "Equipe de Producao Continua", "Entrada Padrao de Curso"], 0),
    question("O certificado deve ser liberado:", ["Apos conclusao e aprovacao", "Antes da prova", "Sem registro", "Sem conteudo"], 0),
    question("A revisao tecnica do treinamento serve para:", ["Confirmar aderencia do conteudo antes da publicacao", "Apagar o PDF", "Eliminar checklist", "Impedir o aluno de estudar"], 0)
  ]
};

const TEMPLATE_BY_KEY = {
  nr35: NR35_TEMPLATE,
  nr33: template("nr33", "NR 33", "NR-33 - Espaco Confinado", "Espaco Confinado", ["Conceitos de espaco confinado", "PET", "Vigia e trabalhador autorizado", "Atmosfera e monitoramento", "Emergência e resgate"]),
  nr10: template("nr10", "NR 10", "NR-10 - Segurança em Eletricidade", "Eletricidade", ["Riscos elétricos", "Choque elétrico", "Desenergizacao", "SEP", "Medidas de controle", "Emergência"]),
  epi: template("epi", "EPI", "Uso Correto de EPIs", "Equipamentos de Proteção", ["Conceitos de EPI", "Responsabilidades", "Inspeção e conservacao", "Uso correto", "Troca e higienizacao"]),
  integração: template("integração", "INT", "Integração de Segurança", "Integração", ["Regras gerais", "Percepcao de riscos", "Conduta segura", "Emergência", "Comunicacao de desvios"]),
  "sst-genérico": GENERIC_TEMPLATE
};

const PDF_EXTRACTION_TIMEOUT_MS = Number(process.env.PDF_EXTRACTION_TIMEOUT_MS) || (process.env.VERCEL ? 22_000 : 35_000);
const PDF_MAX_PAGE_SCAN = Number(process.env.PDF_MAX_PAGE_SCAN) || (process.env.VERCEL ? 80 : 120);
const IS_SERVERLESS_PDF_RUNTIME = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.LAMBDA_TASK_ROOT);
const PDF_FAST_TEXT_LIMIT = Number(process.env.PDF_FAST_TEXT_LIMIT) || (IS_SERVERLESS_PDF_RUNTIME ? 220_000 : 1_200_000);
const PDF_SERVERLESS_TEMPLATE_ONLY_BYTES = Number(process.env.PDF_SERVERLESS_TEMPLATE_ONLY_BYTES) || 4_800_000;
const PDF_FULL_PARSE_MAX_BYTES = Number(process.env.PDF_FULL_PARSE_MAX_BYTES) || (IS_SERVERLESS_PDF_RUNTIME ? 4_800_000 : 20_000_000);
const PDF_PAGE_COUNT_SCAN_LIMIT = Number(process.env.PDF_PAGE_COUNT_SCAN_LIMIT) || (IS_SERVERLESS_PDF_RUNTIME ? 300_000 : 3_000_000);

export async function generateInteractiveCourseFromPdf({ bytes, originalName, storedUrl, storedPathname, options = {} }) {
  const extraction = await safeExtractPdfPages(bytes);
  const pages = extraction.pages;
  const allText = pages.map((page) => page.text).join("\n\n");
  const detectionText = [
    originalName || "",
    options.title || "",
    options.code || "",
    options.category || "",
    `${options.hours || ""} horas`,
    allText || ""
  ].join("\n");
  const detected = detectTemplate(detectionText);
  const templateSource = TEMPLATE_BY_KEY[detected.key] || GENERIC_TEMPLATE;
  const inferred = inferTrainingMetadata(detectionText, originalName, templateSource);
  const relevantPages = selectRelevantPagesForTemplate(templateSource, pages);
  const estimatedPages = extraction.totalPages || estimatePdfPageCount(bytes) || pages.length || templateSource.modules.length;
  const now = new Date().toISOString();
  const title = cleanString(options.title) || inferred.title || templateSource.title;
  const id = slugify(`${templateSource.code}-${title}-${Date.now()}`) || `interactive-${randomUUID()}`;
  const modules = buildModules(templateSource, relevantPages, storedUrl, estimatedPages);
  const course = {
    id,
    title,
    code: cleanString(options.code) || templateSource.code,
    category: cleanString(options.category) || templateSource.category,
    status: "draft",
    source: "pdf-template",
    detectedTemplate: detected.key,
    detectedLabel: detected.label,
    confidence: detected.confidence,
    hours: numberOr(options.hours, inferred.hours || templateSource.hours),
    minimumGrade: numberOr(options.minimumGrade, templateSource.minimumGrade),
    attempts: numberOr(options.attempts, 3),
    responsible: cleanString(options.responsible) || "Responsavel tecnico a definir",
    generatedAt: now,
    updatedAt: now,
    pdf: {
      id: `pdf-${randomUUID()}`,
      name: cleanString(originalName) || "material.pdf",
      url: storedUrl,
      pathname: storedPathname,
      mimeType: "application/pdf",
      size: bytes.length,
      pages: estimatedPages,
      extractionStatus: extraction.status,
      extractionError: extraction.error,
      detectedTitle: inferred.title,
      detectedHours: inferred.hours,
      searchablePages: pages.length,
      relevantPages: relevantPages.length,
      textCharacters: allText.length
    },
    sourceDocument: buildSourceDocument({
      originalName,
      bytes,
      pages,
      relevantPages,
      estimatedPages,
      storedUrl,
      storedPathname,
      extraction
    }),
    analysis: buildAnalysisSummary({
      templateSource,
      detected,
      inferred,
      pages,
      relevantPages,
      modules,
      extraction,
      estimatedPages
    }),
    review: {
      required: true,
      status: "pending",
      notes: [
        "Revisao tecnica obrigatoria antes de publicar o treinamento.",
        ...(extraction.status === "template-fallback"
          ? ["O texto do PDF nao foi extraido automaticamente. O curso foi criado pelo template identificado e deve ser revisado com atencao."]
          : [])
      ]
    },
    modules,
    finalAssessment: {
      minimumGrade: numberOr(options.minimumGrade, templateSource.minimumGrade),
      attempts: numberOr(options.attempts, 3),
      questions: templateSource.questions
    }
  };
  course.stats = summarizeCourse(course);
  return course;
}

export async function generateInteractiveCourseFromExtractedPages({ pages = [], originalName, storedUrl = "", storedPathname = "", options = {} }) {
  const normalizedPages = pages
    .map((page, index) => ({
      pageNumber: Number(page.pageNumber || page.page || index + 1),
      text: normalizePdfText(page.text || "")
    }))
    .filter((page) => page.pageNumber > 0 && isUsefulPdfPage(page.text))
    .slice(0, PDF_MAX_PAGE_SCAN);
  const extraction = {
    status: normalizedPages.length ? "browser-text-extracted" : "template-fallback",
    pages: normalizedPages,
    totalPages: Number(options.totalPages || pages.length || normalizedPages.length || 0),
    error: normalizedPages.length ? "" : "Texto extraido no navegador nao trouxe conteudo suficiente; template aplicado."
  };
  const allText = normalizedPages.map((page) => page.text).join("\n\n");
  const detectionText = [
    originalName || "",
    options.title || "",
    options.code || "",
    options.category || "",
    `${options.hours || ""} horas`,
    allText || ""
  ].join("\n");
  const detected = detectTemplate(detectionText);
  const templateSource = TEMPLATE_BY_KEY[detected.key] || GENERIC_TEMPLATE;
  const inferred = inferTrainingMetadata(detectionText, originalName, templateSource);
  const relevantPages = selectRelevantPagesForTemplate(templateSource, normalizedPages);
  const estimatedPages = extraction.totalPages || normalizedPages.length || templateSource.modules.length;
  const now = new Date().toISOString();
  const title = cleanString(options.title) || inferred.title || templateSource.title;
  const id = slugify(`${templateSource.code}-${title}-${Date.now()}`) || `interactive-${randomUUID()}`;
  const modules = buildModules(templateSource, relevantPages, storedUrl, estimatedPages);
  const sourceSize = Number(options.sourceSize || options.originalSize || allText.length || 0);
  const course = {
    id,
    title,
    code: cleanString(options.code) || templateSource.code,
    category: cleanString(options.category) || templateSource.category,
    status: "draft",
    source: "pdf-browser-text",
    detectedTemplate: detected.key,
    detectedLabel: detected.label,
    confidence: detected.confidence,
    hours: numberOr(options.hours, inferred.hours || templateSource.hours),
    minimumGrade: numberOr(options.minimumGrade, templateSource.minimumGrade),
    attempts: numberOr(options.attempts, 3),
    responsible: cleanString(options.responsible) || "Responsavel tecnico a definir",
    generatedAt: now,
    updatedAt: now,
    pdf: {
      id: `pdf-${randomUUID()}`,
      name: cleanString(originalName) || "material.pdf",
      url: storedUrl,
      pathname: storedPathname,
      mimeType: "application/pdf",
      size: sourceSize,
      pages: estimatedPages,
      extractionStatus: extraction.status,
      extractionError: extraction.error,
      detectedTitle: inferred.title,
      detectedHours: inferred.hours,
      searchablePages: normalizedPages.length,
      relevantPages: relevantPages.length,
      textCharacters: allText.length
    },
    sourceDocument: buildSourceDocument({
      originalName,
      bytes: { length: sourceSize },
      pages: normalizedPages,
      relevantPages,
      estimatedPages,
      storedUrl,
      storedPathname,
      extraction
    }),
    analysis: buildAnalysisSummary({
      templateSource,
      detected,
      inferred,
      pages: normalizedPages,
      relevantPages,
      modules,
      extraction,
      estimatedPages
    }),
    review: {
      required: true,
      status: "pending",
      notes: [
        "Revisao tecnica obrigatoria antes de publicar o treinamento.",
        "PDF grande processado por extracao de texto no navegador para evitar limite de payload da Vercel."
      ]
    },
    modules,
    finalAssessment: {
      minimumGrade: numberOr(options.minimumGrade, templateSource.minimumGrade),
      attempts: numberOr(options.attempts, 3),
      questions: templateSource.questions
    }
  };
  course.stats = summarizeCourse(course);
  return course;
}

export function summarizeCourse(course) {
  const lessons = (course.modules || []).reduce((total, module) => total + (module.lessons?.length || 0), 0);
  const topics = (course.modules || []).reduce((total, module) => total + (module.topicDetails?.length || module.topics?.length || 0), 0);
  return {
    modules: course.modules?.length || 0,
    lessons,
    topics,
    questions: course.finalAssessment?.questions?.length || 0
  };
}

function buildSourceDocument({ originalName, bytes, pages, relevantPages, estimatedPages, storedUrl, storedPathname, extraction }) {
  return {
    filename: cleanString(originalName) || "material.pdf",
    size: bytes.length,
    url: storedUrl,
    pathname: storedPathname,
    totalPages: estimatedPages,
    searchablePages: pages.length,
    relevantPages: relevantPages.map((page) => page.pageNumber).filter(Boolean).slice(0, 80),
    searchability: pages.length > 0 ? "text-selectable" : "template-fallback",
    extractionStatus: extraction.status,
    extractionError: extraction.error || ""
  };
}

function buildAnalysisSummary({ templateSource, detected, inferred, pages, relevantPages, modules, extraction, estimatedPages }) {
  const lessons = modules.flatMap((module) => module.lessons || []);
  const criticalConcepts = [
    ...new Set(modules.flatMap((module) => [
      module.title,
      ...(module.topics || [])
    ]).filter(Boolean))
  ].slice(0, 18);
  const coveragePercent = estimatedPages
    ? Math.max(10, Math.min(100, Math.round((relevantPages.length / Math.max(estimatedPages, 1)) * 100)))
    : 0;
  return {
    model: templateSource.key,
    modelLabel: templateSource.label,
    confidence: detected.confidence,
    detectedTitle: inferred.title,
    detectedHours: inferred.hours || templateSource.hours,
    structureStrategy: extraction.status === "text-extracted" || extraction.status === "text-sampled"
      ? "Texto extraido do PDF, classificado por palavras-chave e encaixado em templates FortixSeg."
      : "Template aplicado por tema detectado; revise o conteudo tecnico antes de publicar.",
    modules: modules.length,
    lessons: lessons.length,
    topics: modules.reduce((total, module) => total + (module.topicDetails?.length || module.topics?.length || 0), 0),
    questions: templateSource.questions.length,
    sourcePages: estimatedPages,
    searchablePages: pages.length,
    relevantPages: relevantPages.length,
    coveragePercent,
    criticalConcepts,
    warnings: [
      ...(extraction.status === "template-fallback" ? ["O PDF parece ter pouco texto selecionavel; o treinamento foi criado com mais apoio do template."] : []),
      ...(extraction.status === "text-sampled" ? ["PDF lido em modo rapido para evitar travamento em producao. Revise a estrutura antes de publicar."] : []),
      ...(relevantPages.length < 3 ? ["Poucas paginas relevantes foram identificadas automaticamente."] : [])
    ]
  };
}

function template(key, code, title, category, topics) {
  return {
    key,
    label: title,
    code,
    title,
    category,
    hours: key === "nr10" ? 40 : key === "nr33" ? 16 : 4,
    minimumGrade: 70,
    modules: [
      { title: "Introdução e objetivos", topics: topics.slice(0, 2) },
      { title: "Riscos e responsabilidades", topics: topics.slice(2, 4) },
      { title: "Procedimentos e controles", topics: topics.slice(4) },
      { title: "Avaliação final", topics: ["Prova final editavel"] }
    ],
    questions: [
      question("Qual é o objetivo principal deste treinamento?", ["Registrar presenca apenas", "Orientar riscos, procedimentos e condutas seguras", "Substituir a gestao de SST", "Dispensar avaliação"], 1),
      question("Quando uma condicao insegura deve ser comunicada?", ["Imediatamente", "Somente no fim do mes", "Apenas se houver acidente", "Nunca"], 0),
      question("O certificado deve ser emitido quando?", ["Antes da aula", "Apos conclusao e aprovacao", "Sem avaliação", "Sem registro"], 1)
    ]
  };
}

function question(prompt, alternatives, correctIndex) {
  return {
    id: `q-${randomUUID()}`,
    prompt,
    alternatives,
    correctIndex,
    explanation: "A resposta correta reforca o procedimento seguro e a rastreabilidade do treinamento."
  };
}

async function extractPdfPages(bytes) {
  await import("@napi-rs/canvas").catch(() => {});
  const { PDFParse } = await import("pdf-parse");
  const parser = new PDFParse({ data: bytes });
  try {
    const info = await withTimeout(parser.getInfo({ parsePageInfo: true }).catch(() => ({ total: 0 })), 5_000, "Tempo limite ao ler informacoes do PDF.");
    const totalPages = Number(info?.total) || estimatePdfPageCount(bytes) || 0;
    const total = Math.min(totalPages, PDF_MAX_PAGE_SCAN);
    const pages = [];
    if (total) {
      for (let pageNumber = 1; pageNumber <= total; pageNumber += 1) {
        const result = await withTimeout(parser.getText({ partial: [pageNumber] }).catch(() => ({ text: "" })), 3_000, "Tempo limite ao ler pagina do PDF.");
        const text = normalizePdfText(result?.text || "");
        if (isUsefulPdfPage(text)) pages.push({ pageNumber, text });
      }
    }
    if (pages.length) return { pages, totalPages: totalPages || pages.length };
    const result = await withTimeout(parser.getText().catch(() => ({ text: "" })), 8_000, "Tempo limite ao extrair texto do PDF.");
    const fallbackPages = splitExtractedTextIntoPages(result?.text || "");
    return { pages: fallbackPages, totalPages: totalPages || fallbackPages.length || estimatePdfPageCount(bytes) };
  } finally {
    await parser.destroy().catch(() => {});
  }
}

async function safeExtractPdfPages(bytes) {
  const fastExtraction = fastExtractPdfPages(bytes);
  if (IS_SERVERLESS_PDF_RUNTIME || bytes.length > PDF_FULL_PARSE_MAX_BYTES) {
    return fastExtraction;
  }
  try {
    const extracted = await withTimeout(extractPdfPages(bytes), PDF_EXTRACTION_TIMEOUT_MS, "A leitura do PDF demorou demais; template aplicado automaticamente.");
    const pages = Array.isArray(extracted) ? extracted : extracted.pages || [];
    const totalPages = Number(extracted?.totalPages) || pages.length || estimatePdfPageCount(bytes);
    if (!pages.length && fastExtraction.pages.length) return fastExtraction;
    return {
      status: pages.length ? "text-extracted" : "template-fallback",
      pages,
      totalPages,
      error: ""
    };
  } catch (error) {
    if (fastExtraction.pages.length) {
      return {
        ...fastExtraction,
        error: "Extração completa ignorada; usado modo rápido para evitar timeout."
      };
    }
    return {
      status: "template-fallback",
      pages: [],
      totalPages: estimatePdfPageCount(bytes),
      error: cleanString(error?.message || "Falha ao extrair texto do PDF").slice(0, 240)
    };
  }
}

function fastExtractPdfPages(bytes) {
  const totalPages = estimatePdfPageCount(bytes);
  if (IS_SERVERLESS_PDF_RUNTIME && bytes.length > PDF_SERVERLESS_TEMPLATE_ONLY_BYTES) {
    return {
      status: "template-fallback",
      pages: [],
      totalPages,
      error: "PDF grande para extração completa na Vercel; template aplicado automaticamente para gerar o rascunho sem travar."
    };
  }
  const raw = bufferToLatinText(bytes, PDF_FAST_TEXT_LIMIT);
  const text = normalizePdfText(extractReadablePdfText(raw));
  const pages = splitFastTextIntoPages(text, totalPages);
  return {
    status: pages.length ? "text-sampled" : "template-fallback",
    pages,
    totalPages: totalPages || pages.length,
    error: pages.length
      ? "Modo rápido aplicado para gerar o treinamento sem travar a publicação."
      : "Pouco texto selecionável encontrado no modo rápido; template aplicado automaticamente."
  };
}

function bufferToLatinText(bytes, limit) {
  const slice = bytes.length > limit ? bytes.subarray(0, limit) : bytes;
  return Buffer.from(slice).toString("latin1");
}

function extractReadablePdfText(raw) {
  const chunks = [];
  const literalPattern = /\((?:\\.|[^\\)]){3,}\)/g;
  const tjPattern = /\[(.*?)\]\s*TJ/gs;
  let match;

  while ((match = literalPattern.exec(raw)) && chunks.length < 1800) {
    const value = decodePdfLiteral(match[0].slice(1, -1));
    if (isLikelyReadableChunk(value)) chunks.push(value);
  }

  while ((match = tjPattern.exec(raw)) && chunks.length < 2400) {
    const value = [...match[1].matchAll(/\((?:\\.|[^\\)]){2,}\)/g)]
      .map((item) => decodePdfLiteral(item[0].slice(1, -1)))
      .join(" ");
    if (isLikelyReadableChunk(value)) chunks.push(value);
  }

  const metadata = [...raw.matchAll(/\/(?:Title|Subject|Keywords)\s*\(([^)]{3,260})\)/gi)]
    .map((item) => decodePdfLiteral(item[1]))
    .filter(isLikelyReadableChunk);

  return [...metadata, ...chunks].join("\n");
}

function decodePdfLiteral(value) {
  return String(value || "")
    .replace(/\\([nrtbf()\\])/g, (_, char) => {
      const map = { n: "\n", r: "\r", t: "\t", b: "\b", f: "\f", "(": "(", ")": ")", "\\": "\\" };
      return map[char] || char;
    })
    .replace(/\\([0-7]{1,3})/g, (_, octal) => String.fromCharCode(parseInt(octal, 8)))
    .replace(/\s+/g, " ")
    .trim();
}

function isLikelyReadableChunk(value) {
  const text = cleanString(value);
  if (text.length < 3 || text.length > 500) return false;
  const letters = (text.match(/[a-zA-ZÀ-ÿ]/g) || []).length;
  if (letters < Math.max(3, Math.floor(text.length * 0.35))) return false;
  return !isGarbledPdfText(text);
}

function isGarbledPdfText(value) {
  const text = cleanString(value);
  if (!text) return true;
  const sample = text.slice(0, 1200);
  const letters = (sample.match(/[a-zA-ZÀ-ÿ]/g) || []).length;
  const vowels = (sample.match(/[aeiouáàâãéêíóôõúüAEIOUÁÀÂÃÉÊÍÓÔÕÚÜ]/g) || []).length;
  const digits = (sample.match(/\d/g) || []).length;
  const spaces = (sample.match(/\s/g) || []).length;
  const expectedPunctuation = (sample.match(/[.,;:!?%/()ºª°"'-]/g) || []).length;
  const readable = letters + digits + spaces + expectedPunctuation;
  const strange = Math.max(0, sample.length - readable);
  const words = sample.split(/\s+/).filter(Boolean);
  const weirdWords = words.filter((word) => {
    const cleanWord = word.replace(/^[^\wÀ-ÿ]+|[^\wÀ-ÿ]+$/g, "");
    if (cleanWord.length < 5) return false;
    const wordLetters = (cleanWord.match(/[a-zA-ZÀ-ÿ]/g) || []).length;
    const wordVowels = (cleanWord.match(/[aeiouáàâãéêíóôõúüAEIOUÁÀÂÃÉÊÍÓÔÕÚÜ]/g) || []).length;
    const wordStrange = (cleanWord.match(/[^a-zA-ZÀ-ÿ0-9]/g) || []).length;
    return wordLetters >= 4 && (wordVowels === 0 || wordStrange >= 2);
  }).length;

  if (sample.length >= 40 && strange / sample.length > 0.16) return true;
  if (letters >= 30 && vowels / letters < 0.18) return true;
  if (words.length >= 8 && weirdWords / words.length > 0.28) return true;
  if (/[�□■�]{2,}/.test(sample)) return true;
  return false;
}

function splitFastTextIntoPages(text, totalPages) {
  const normalized = normalizePdfText(text);
  if (!normalized || normalized.length < 40) return [];
  const blocks = normalized.split(/\n\s*\n+|(?<=\.)\s+(?=[A-ZÀ-Ú][a-zà-ú])/).filter((block) => block.trim().length > 60);
  const usefulBlocks = (blocks.length ? blocks : [normalized]).slice(0, Math.min(36, Math.max(8, totalPages || 12)));
  return usefulBlocks.map((block, index) => ({
    pageNumber: totalPages ? Math.min(totalPages, index + 1) : index + 1,
    text: block
  })).filter((page) => isUsefulPdfPage(page.text));
}

function estimatePdfPageCount(bytes) {
  try {
    const slice = bytes.length > PDF_PAGE_COUNT_SCAN_LIMIT ? bytes.subarray(0, PDF_PAGE_COUNT_SCAN_LIMIT) : bytes;
    const text = Buffer.from(slice).toString("latin1");
    const matches = text.match(/\/Type\s*\/Page\b/g);
    if (matches?.length) return Math.min(300, matches.length);
  } catch {
    return 0;
  }
  return 0;
}

function splitExtractedTextIntoPages(text) {
  const normalized = normalizePdfText(text);
  if (!normalized) return [];
  const blocks = normalized.split(/\n\s*\n+/).filter((block) => block.trim().length > 80);
  return (blocks.length ? blocks : [normalized]).slice(0, 80).map((block, index) => ({ pageNumber: index + 1, text: block }));
}

function withTimeout(promise, timeoutMs, message) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(message)), timeoutMs);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

function inferTrainingMetadata(text, originalName, templateSource) {
  const sourceText = normalizePdfText(text).slice(0, 30_000);
  const fileTitle = cleanFileTitle(originalName);
  return {
    title: inferTrainingTitle(sourceText, fileTitle, templateSource),
    hours: inferTrainingHours(sourceText)
  };
}

function inferTrainingTitle(text, fileTitle, templateSource) {
  const lines = normalizePdfText(text)
    .split("\n")
    .map((line) => cleanString(line))
    .filter(Boolean)
    .slice(0, 80);
  const candidates = [
    ...lines.filter(isLikelyTrainingTitle),
    fileTitle
  ].filter(Boolean);
  const best = candidates
    .map((title) => title
      .replace(/\.[a-z0-9]{2,5}$/i, "")
      .replace(/\s*[-|]\s*(apostila|material|pdf|treinamento)$/i, "")
      .trim())
    .find((title) => title.length >= 6 && title.length <= 180);
  return best || templateSource.title;
}

function inferTrainingHours(text) {
  const plain = normalizeForSearch(text).slice(0, 25_000);
  const patterns = [
    /carga\s*horaria[^0-9]{0,40}(\d{1,3})(?:[,.](\d{1,2}))?\s*(?:h|hora|horas)?/i,
    /duracao[^0-9]{0,40}(\d{1,3})(?:[,.](\d{1,2}))?\s*(?:h|hora|horas)?/i,
    /(\d{1,3})(?:[,.](\d{1,2}))?\s*(?:h|horas?)\s*(?:de\s*)?(?:curso|treinamento|capacitacao)/i,
    /(?:curso|treinamento|capacitacao)[^0-9]{0,40}(\d{1,3})(?:[,.](\d{1,2}))?\s*(?:h|hora|horas)/i
  ];
  for (const pattern of patterns) {
    const match = plain.match(pattern);
    if (!match) continue;
    const hours = Number(`${match[1]}.${match[2] || 0}`);
    if (Number.isFinite(hours) && hours >= 1 && hours <= 120) return hours;
  }
  return 0;
}

function cleanFileTitle(originalName) {
  return cleanString(String(originalName || "")
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\b(final|revisado|oficial|apostila|material|pdf|202\d)\b/gi, " "))
    .slice(0, 180);
}

function isLikelyTrainingTitle(line) {
  const plain = normalizeForSearch(line);
  if (line.length < 6 || line.length > 180) return false;
  if (/^(sumario|conteudo|indice|pagina|fortixseg|material demonstrativo)$/i.test(plain)) return false;
  if (/\bnr\s*-?\s*\d{1,2}\b/.test(plain)) return true;
  if (/(trabalho em altura|espaco confinado|eletricidade|epi|integracao|seguranca do trabalho|bloqueio|etiquetagem)/.test(plain)) return true;
  return false;
}

function detectTemplate(text) {
  const haystack = normalizeForSearch(text);
  let best = { key: "sst-genérico", label: GENERIC_TEMPLATE.label, score: 0 };
  for (const rule of DETECTION_RULES) {
    const terms = [rule.key, ...(rule.keywords || [])];
    const score = terms.reduce((total, keyword) => total + (haystack.includes(normalizeForSearch(keyword)) ? 1 : 0), 0);
    if (score > best.score) best = { key: rule.key, label: rule.label, score };
  }
  return {
    ...best,
    confidence: Math.min(0.98, Number((best.score / 4).toFixed(2))) || 0.25
  };
}

function buildModules(templateSource, pages, pdfUrl, totalPages = 0) {
  const sourcePages = enrichPdfPages(pages.length ? pages : buildFallbackPages(templateSource));
  const contentPages = sourcePages.filter((page) => !isAgendaOrCoverPage(page.text));
  const contentModules = templateSource.modules.map((module, moduleIndex) => {
    const isAssessmentModule = normalizeForSearch(module.title).includes("avaliacao");
    const lessons = isAssessmentModule
      ? []
      : (module.topics || []).map((topic, topicIndex) => {
          const page = pickBestPageForTopic(contentPages.length ? contentPages : sourcePages, topic, module.title, moduleIndex, topicIndex, templateSource);
          return buildLesson({
            page,
            module,
            title: topic,
            pdfUrl,
            lessonIndex: topicIndex + 1,
            templateKey: templateSource.key
          });
        });
    return {
      id: `module-${moduleIndex + 1}`,
      title: module.title,
      topics: module.topics,
      sourcePages: uniqueNumbers(lessons.map((lesson) => lesson.sourcePage)),
      sourceWordCount: countWords(lessons.map((lesson) => lesson.extractedText).join(" ")),
      structureConfidence: lessons.length ? estimateModuleConfidence(lessons, module, templateSource) : 0,
      topicDetails: buildTopicDetails(module, lessons),
      lessons
    };
  });

  const usedPages = new Set(contentModules.flatMap((module) => (module.lessons || []).map((lesson) => lesson.sourcePage)));
  const extraPages = sourcePages
    .filter((page) => !usedPages.has(page.pageNumber))
    .filter((page) => isUsefulPdfPage(page.text))
    .slice(0, 10);

  for (const page of extraPages) {
    const target = pickModule(contentModules.filter((module) => module.lessons?.length), page.text, page.pageNumber - 1);
    if (!target || target.lessons.length >= 6) continue;
    const title = pickLessonTitle(target, page.text, target.lessons.length);
    target.lessons.push(buildLesson({
      page,
      module: target,
      title,
      pdfUrl,
      lessonIndex: target.lessons.length + 1,
      templateKey: templateSource.key
    }));
    refreshModuleSourceMetadata(target, templateSource);
  }

  contentModules.forEach((module) => refreshModuleSourceMetadata(module, templateSource));
  applySequentialDisplayPages(contentModules, sourcePages, totalPages);
  return contentModules;
}

function refreshModuleSourceMetadata(module, templateSource) {
  module.sourcePages = uniqueNumbers((module.lessons || []).map((lesson) => lesson.sourcePage));
  module.sourceWordCount = countWords((module.lessons || []).map((lesson) => lesson.extractedText).join(" "));
  module.structureConfidence = estimateModuleConfidence(module.lessons || [], module, templateSource);
  module.topicDetails = buildTopicDetails(module, module.lessons || []);
}

function applySequentialDisplayPages(modules, sourcePages, totalPages) {
  const contentModules = (modules || []).filter((module) => !normalizeForSearch(module.title).includes("avaliacao"));
  const total = Math.max(
    Number(totalPages) || 0,
    ...sourcePages.map((page) => Number(page.pageNumber) || 0),
    ...contentModules.flatMap((module) => module.sourcePages || [])
  );
  if (!contentModules.length || !total) return;

  const searchablePages = sourcePages
    .filter((page) => !isAgendaOrCoverPage(page.text))
    .sort((a, b) => Number(a.pageNumber) - Number(b.pageNumber));
  const starts = [1];
  let cursor = 2;

  for (let index = 1; index < contentModules.length; index += 1) {
    const module = contentModules[index];
    const anchor = findModuleStartPage(module, searchablePages, cursor);
    const fallback = Math.floor((total / contentModules.length) * index) + 1;
    const start = Math.max(cursor, Math.min(total, anchor || fallback));
    starts.push(start);
    cursor = start + 1;
  }

  for (let index = 0; index < contentModules.length; index += 1) {
    const start = starts[index] || 1;
    const end = index < contentModules.length - 1 ? Math.max(start, (starts[index + 1] || total + 1) - 1) : total;
    contentModules[index].displayPages = rangeNumbers(start, end);
  }
}

function findModuleStartPage(module, pages, minPage) {
  const hints = moduleStartHints(module);
  if (hints.length) {
    const hinted = pages.find((page) => {
      if (Number(page.pageNumber) < minPage) return false;
      const haystack = normalizeForSearch(page.text);
      return hints.some((hint) => haystack.includes(hint));
    });
    if (hinted) return Number(hinted.pageNumber) || 0;
  }

  const candidates = pages
    .filter((page) => Number(page.pageNumber) >= minPage)
    .map((page) => ({
      page,
      score: scorePageForModuleStart(page.text, module)
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => Number(a.page.pageNumber) - Number(b.page.pageNumber) || b.score - a.score);
  return Number(candidates[0]?.page?.pageNumber) || 0;
}

function moduleStartHints(module) {
  const title = normalizeForSearch(module?.title || "");
  if (title.includes("normas") || title.includes("responsabilidades")) {
    return ["normas e regulamentos", "nr 1 disposicoes", "cabe ao empregador", "responsabilidades do empregador"].map(normalizeForSearch);
  }
  if (title.includes("acidentes")) {
    return ["acidentes tipicos", "principais causas de acidentes", "ato inseguro", "condicao insegura"].map(normalizeForSearch);
  }
  if (title.includes("condicoes impeditivas") || title.includes("riscos adicionais")) {
    return ["condicoes impeditivas", "riscos potenciais inerentes", "riscos adicionais"].map(normalizeForSearch);
  }
  if (title.includes("medidas de protecao")) {
    return ["medidas de protecao contra quedas", "prioridades no controle de risco", "eliminar o risco"].map(normalizeForSearch);
  }
  if (title.includes("epi")) {
    return ["epi equipamento de protecao individual para trabalho em altura", "cinturao de seguranca tipo paraquedista", "talabarte de seguranca"].map(normalizeForSearch);
  }
  if (title.includes("ar") || title.includes("pt") || title.includes("emergencia")) {
    return ["ar analise de risco", "analise de risco", "pt permissao de trabalho", "emergencia e salvamento"].map(normalizeForSearch);
  }
  return [];
}

function scorePageForModuleStart(text, module) {
  const haystack = normalizeForSearch(text);
  const terms = [
    module.title,
    ...(module.topics || []),
    ...String(module.title || "").split(/\s+/).filter((word) => word.length > 5)
  ].filter(Boolean);
  return terms.reduce((total, term) => {
    const normalized = normalizeForSearch(term);
    if (!normalized || normalized.length < 4) return total;
    return total + (haystack.includes(normalized) ? 1 : 0);
  }, 0);
}

function isAgendaOrCoverPage(text) {
  const normalized = normalizeForSearch(text);
  if (!normalized) return true;
  if (normalized.length < 40) return true;
  if (normalized.includes("roteiro") && /(introducao|normas|acidentes|condicoes|riscos|permissao|emergencia)/.test(normalized)) return true;
  return false;
}

function rangeNumbers(start, end) {
  const safeStart = Math.max(1, Number(start) || 1);
  const safeEnd = Math.max(safeStart, Number(end) || safeStart);
  return Array.from({ length: safeEnd - safeStart + 1 }, (_, index) => safeStart + index).slice(0, 120);
}

function buildTopicDetails(module, lessons) {
  return (lessons || []).map((lesson, index) => ({
    id: `topic-${module.id || "module"}-${index + 1}`,
    title: lesson.title,
    sourcePages: [lesson.sourcePage].filter(Boolean),
    sourcePreview: cleanString(lesson.extractedText).slice(0, 260),
    wordCount: countWords(lesson.extractedText),
    contentType: inferLessonContentType(lesson.title, lesson.extractedText),
    keyPoints: (lesson.checklist || []).slice(0, 4),
    summary: lesson.summary
  }));
}

function inferLessonContentType(title, text) {
  const haystack = normalizeForSearch(`${title} ${text}`);
  if (/(checklist|verifique|inspec|itens?|lista)/.test(haystack)) return "Checklist";
  if (/(definicao|conceito|objetivo|norma|requisito)/.test(haystack)) return "Conceito";
  if (/(risco|perigo|acidente|condicao insegura|ato inseguro)/.test(haystack)) return "Risco";
  if (/(procedimento|permissao|planejamento|emergencia|resgate)/.test(haystack)) return "Procedimento";
  return "Texto";
}

function estimateModuleConfidence(lessons, module, templateSource) {
  if (!lessons?.length) return 0;
  const scores = lessons.map((lesson) => scorePageForTopicMatch(lesson.extractedText, lesson.title, module.title, templateSource));
  const average = scores.reduce((total, value) => total + value, 0) / scores.length;
  return Math.min(0.98, Math.max(0.35, Number((average / 5).toFixed(2))));
}

function uniqueNumbers(values) {
  return [...new Set((values || []).map(Number).filter((value) => Number.isFinite(value) && value > 0))].sort((a, b) => a - b);
}

function countWords(value) {
  return normalizePdfText(value).split(/\s+/).filter((word) => /[a-zA-ZÀ-ÿ0-9]/.test(word)).length;
}

function enrichPdfPages(pages) {
  return (pages || [])
    .map((page, index) => ({
      pageNumber: Number(page.pageNumber || index + 1),
      text: normalizePdfText(page.text || "")
    }))
    .filter((page) => isUsefulPdfPage(page.text))
    .slice(0, 80);
}

function pickBestPageForTopic(pages, topic, moduleTitle, moduleIndex, topicIndex, templateSource) {
  const candidates = (pages || []).map((page) => ({
    page,
    score: scorePageForTopicMatch(page.text, topic, moduleTitle, templateSource)
  }));
  const best = candidates.sort((a, b) => b.score - a.score)[0];
  if (best?.score > 0) {
    const snippet = extractFocusedSnippet(best.page.text, topic, moduleTitle);
    if (!snippet) return buildTemplatePage(topic, templateSource, best.page.pageNumber || moduleIndex + 1);
    return {
      pageNumber: best.page.pageNumber,
      text: snippet
    };
  }
  const fallback = pages[(moduleIndex + topicIndex) % Math.max(1, pages.length)];
  const fallbackSnippet = fallback?.text ? extractFocusedSnippet(fallback.text, topic, moduleTitle) : "";
  return {
    pageNumber: fallback?.pageNumber || moduleIndex + 1,
    text: fallbackSnippet || buildTemplatePage(topic, templateSource, fallback?.pageNumber || moduleIndex + 1).text
  };
}

function buildTemplatePage(topic, templateSource, pageNumber) {
  return {
    pageNumber,
    text: `${topic}. Conteudo estruturado pelo template ${templateSource.label} porque o texto extraido do PDF nao estava legivel o suficiente. Revise e complemente antes da publicacao.`
  };
}

function scorePageForTopicMatch(text, topic, moduleTitle, templateSource) {
  const haystack = normalizeForSearch(text);
  const terms = [
    topic,
    moduleTitle,
    ...(String(topic).split(/\s+/).filter((word) => word.length > 4)),
    ...(DETECTION_RULES.find((rule) => rule.key === templateSource.key)?.keywords || [])
  ];
  return terms
    .filter(Boolean)
    .reduce((total, term) => total + (haystack.includes(normalizeForSearch(term)) ? 1 : 0), 0);
}

function extractFocusedSnippet(text, topic, moduleTitle) {
  const normalized = normalizePdfText(text);
  if (!normalized || isGarbledPdfText(normalized)) return "";
  const paragraphs = normalized
    .split(/\n\s*\n+|(?<=[.!?])\s+(?=[A-ZÀ-ÿ0-9])/)
    .map((item) => cleanString(item))
    .filter((item) => item.length >= 35 && !isGarbledPdfText(item));
  if (!paragraphs.length) return "";
  const topicNeedle = normalizeForSearch(topic);
  const moduleNeedle = normalizeForSearch(moduleTitle);
  const scored = paragraphs.map((paragraph, index) => {
    const haystack = normalizeForSearch(paragraph);
    let score = 0;
    if (haystack.includes(topicNeedle)) score += 5;
    if (haystack.includes(moduleNeedle)) score += 2;
    for (const word of topicNeedle.split(/\s+/).filter((item) => item.length > 4)) {
      if (haystack.includes(word)) score += 1;
    }
    return { paragraph, index, score };
  });
  const best = scored.sort((a, b) => b.score - a.score || a.index - b.index)[0];
  const start = Math.max(0, best.index - 1);
  return paragraphs.slice(start, start + 3).join("\n\n").slice(0, 1800);
}

function selectRelevantPagesForTemplate(templateSource, pages) {
  if (!Array.isArray(pages) || !pages.length) return [];
  if (!templateSource || templateSource.key === GENERIC_TEMPLATE.key) return pages.slice(0, 36);
  if (templateSource.key === "nr35") return pages.slice(0, 80);

  const scored = pages.map((page) => ({
    page,
    score: scorePageForTemplate(templateSource, page.text || "")
  }));

  let relevant = scored
    .filter((item) => item.score >= 2)
    .filter((item) => !isClearlyAnotherNrPage(templateSource.key, item.page.text || ""))
    .map((item) => item.page);

  if (relevant.length < 7) {
    relevant = scored
      .filter((item) => item.score >= 1)
      .filter((item) => !isClearlyAnotherNrPage(templateSource.key, item.page.text || ""))
      .map((item) => item.page);
  }

  if (relevant.length < 5) {
    relevant = pages.filter((page) => !isClearlyAnotherNrPage(templateSource.key, page.text || ""));
  }

  return relevant.slice(0, 80);
}

function scorePageForTemplate(templateSource, text) {
  const haystack = normalizeForSearch(text);
  const templateTerms = [
    templateSource.title,
    templateSource.label,
    templateSource.code,
    ...(templateSource.modules || []).flatMap((module) => [module.title, ...(module.topics || [])])
  ];
  const ruleTerms = DETECTION_RULES.find((rule) => rule.key === templateSource.key)?.keywords || [];
  const extraTerms = templateSource.key === "nr35"
    ? ["altura", "queda", "cinturao", "talabarte", "ancoragem", "linha de vida", "fator de queda", "guarda corpo", "permissao de trabalho", "analise de risco", "resgate", "condicao impeditiva", "epi", "epc"]
    : [];
  return [...templateTerms, ...ruleTerms, ...extraTerms]
    .filter(Boolean)
    .reduce((total, term) => total + (haystack.includes(normalizeForSearch(term)) ? 1 : 0), 0);
}

function isClearlyAnotherNrPage(templateKey, text) {
  const haystack = normalizeForSearch(text);
  if (templateKey === "nr35") {
    const hasNr35Signal = ["nr 35", "nr-35", "trabalho em altura", "altura", "queda", "cinturao", "talabarte", "ancoragem"].some((term) => haystack.includes(term));
    const otherNrHeader = /\bnr\s*(0?1|0?5|0?6|10|11|12|17|18|20|23|26|33)\b/.test(haystack);
    return otherNrHeader && !hasNr35Signal;
  }
  return false;
}

function buildFallbackPages(templateSource) {
  return templateSource.modules
    .filter((module) => !normalizeForSearch(module.title).includes("avaliacao"))
    .flatMap((module, moduleIndex) => module.topics.map((topic, topicIndex) => ({
      pageNumber: moduleIndex + 1,
      text: `${topic}. Este bloco foi criado a partir do template ${templateSource.label} porque o PDF possui pouco texto extraivel. Revise o conteudo antes de publicar.`,
      topicIndex
    })));
}

function pickModule(modules, text, index) {
  const haystack = normalizeForSearch(text);
  let best = { module: modules[index % Math.max(1, modules.length)], score: 0 };
  for (const module of modules) {
    const score = [module.title, ...(module.topics || [])].reduce((total, value) => total + (haystack.includes(normalizeForSearch(value)) ? 1 : 0), 0);
    if (score > best.score) best = { module, score };
  }
  return best.module;
}

function pickLessonTitle(module, text, index) {
  const haystack = normalizeForSearch(text);
  const matchedTopic = (module.topics || []).find((topic) => haystack.includes(normalizeForSearch(topic)));
  if (matchedTopic) return matchedTopic;
  const firstLine = normalizePdfText(text).split("\n").find((line) => isUsefulTitleLine(line));
  return firstLine || `${index + 1}. ${module.topics?.[index % Math.max(1, module.topics.length)] || module.title}`;
}

function buildLesson({ page, module, title, pdfUrl, lessonIndex, templateKey }) {
  const sourceText = normalizePdfText(page.text || "");
  const text = sourceText && !isGarbledPdfText(sourceText)
    ? sourceText
    : `${title}. Conteudo estruturado pelo template para revisao tecnica antes da publicacao.`;
  return {
    id: `lesson-${randomUUID()}`,
    title: cleanString(title).slice(0, 120) || `Aula ${lessonIndex}`,
    sourcePage: page.pageNumber || lessonIndex,
    pageImageUrl: pdfUrl ? `${pdfUrl}#page=${page.pageNumber || lessonIndex}` : "",
    pagePreviewType: "pdf-page",
    extractedText: text,
    summary: buildSummary(title, module.title, templateKey, text),
    attentionCard: buildAttention(title, templateKey),
    practiceCard: buildPractice(title, templateKey),
    checklist: extractChecklist(text, templateKey, title),
    quickQuestion: buildQuickQuestion(title, templateKey),
    completedButtonLabel: "Concluir aula"
  };
}

function buildSummary(title, moduleTitle, templateKey, text = "") {
  const extracted = buildExtractedSummary(text);
  if (extracted) return extracted;
  if (templateKey === "nr35") {
    return `Nesta aula, o aluno revisa ${title.toLowerCase()} dentro do contexto de trabalho em altura, conectando regra, risco e prática segura.`;
  }
  return `Nesta aula, o aluno revisa ${title.toLowerCase()} dentro do modulo ${moduleTitle.toLowerCase()}, com foco em aplicação prática e prevencao.`;
}

function buildExtractedSummary(text) {
  const clean = normalizePdfText(text);
  if (!clean || clean.length < 80 || isGarbledPdfText(clean) || /template .* revisao tecnica/i.test(normalizeForSearch(clean))) return "";
  const sentence = clean
    .split(/(?<=[.!?])\s+/)
    .map((item) => cleanString(item))
    .find((item) => item.length >= 60 && item.length <= 260);
  if (sentence) return sentence;
  return clean.slice(0, 220);
}

function buildAttention(title, templateKey) {
  if (templateKey === "nr35") {
    return `Atencao: atividades em altura devem ser planejadas, autorizadas e interrompidas quando houver condicao insegura.`;
  }
  return `Atencao: valide o procedimento da empresa e registre evidencias de treinamento antes de liberar o certificado.`;
}

function buildPractice(title, templateKey) {
  if (templateKey === "nr35") {
    return `Na prática: antes de executar a tarefa, confira AR/PT, ponto de ancoragem, EPIs e comunicação com a equipe.`;
  }
  return `Na prática: transforme este conteudo em checklist, DDS ou orientacao direta para a rotina de trabalho.`;
}

function buildQuickQuestion(title, templateKey) {
  if (templateKey === "nr35") {
    return {
      prompt: `Qual é a melhor conduta ao identificar risco durante "${title}"?`,
      alternatives: ["Continuar a atividade", "Parar, comunicar e revisar os controles", "Ignorar se for rapido", "Remover o EPI para ganhar tempo"],
      correctIndex: 1,
      explanation: "Em trabalho em altura, risco sem controle exige parada, comunicação e revisao das medidas antes de continuar."
    };
  }
  return {
    prompt: `Qual é a postura correta ao aplicar "${title}"?`,
    alternatives: ["Seguir o procedimento e registrar a conclusao", "Pular a avaliação", "Improvisar sem comunicar", "Dispensar medidas preventivas"],
    correctIndex: 0,
    explanation: "O treinamento precisa orientar procedimento, prática segura e rastreabilidade."
  };
}

function extractChecklist(text, templateKey, title) {
  const lines = normalizePdfText(text).split("\n");
  const extracted = lines
    .map((line) => line.replace(/^[-*•\u2022]\s*/, "").replace(/^\d+[.)-]?\s*/, "").trim())
    .filter((line) => line.length >= 12 && line.length <= 130)
    .filter((line, index, source) => source.indexOf(line) === index)
    .slice(0, 6);
  if (extracted.length >= 3) return extracted;
  if (templateKey === "nr35") {
    return [
      "Atividade possui AR/PT quando aplicavel",
      "EPIs foram inspecionados antes do uso",
      "Ponto de ancoragem foi definido e validado",
      "Equipe conhece condutas de emergência"
    ];
  }
  return [
    `Procedimento de ${title.toLowerCase()} foi revisado`,
    "Riscos principais foram comunicados",
    "Medidas de controle foram registradas",
    "Duvidas foram encaminhadas ao responsavel"
  ];
}

function normalizePdfText(text) {
  return String(text || "")
    .replace(/\r/g, "\n")
    .replace(/--\s*\d+\s+of\s+\d+\s*--/gi, "\n")
    .replace(/\bpage\s+\d+\s+of\s+\d+\b/gi, "\n")
    .replace(/^\s*\d+\s+of\s+\d+\s*$/gim, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function isUsefulPdfPage(text) {
  const cleaned = normalizePdfText(text);
  if (cleaned.length < 35) return false;
  if (/^-*\s*\d+\s+of\s+\d+\s*-*$/i.test(cleaned)) return false;
  if (isGarbledPdfText(cleaned)) return false;
  return /[a-zA-ZÀ-ÿ]{4,}/.test(cleaned);
}

function isUsefulTitleLine(line) {
  const cleaned = cleanString(line);
  if (cleaned.length < 12 || cleaned.length > 90) return false;
  if (/^-*\s*\d+\s+of\s+\d+\s*-*$/i.test(cleaned)) return false;
  if (/^(sumário|conteúdo|material demonstrativo|fortixseg)$/i.test(normalizeForSearch(cleaned))) return false;
  if (isGarbledPdfText(cleaned)) return false;
  if (!/[a-zA-ZÀ-ÿ]{4,}/.test(cleaned)) return false;
  return true;
}

function normalizeForSearch(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function cleanString(value) {
  return String(value || "").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
}

function slugify(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function numberOr(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}
