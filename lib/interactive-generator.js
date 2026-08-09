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

export async function generateInteractiveCourseFromPdf({ bytes, originalName, storedUrl, storedPathname, options = {} }) {
  const extraction = await safeExtractPdfPages(bytes);
  const pages = extraction.pages;
  const allText = pages.map((page) => page.text).join("\n\n");
  const detected = detectTemplate(allText || originalName);
  const templateSource = TEMPLATE_BY_KEY[detected.key] || GENERIC_TEMPLATE;
  const relevantPages = selectRelevantPagesForTemplate(templateSource, pages);
  const estimatedPages = extraction.totalPages || estimatePdfPageCount(bytes) || pages.length || templateSource.modules.length;
  const now = new Date().toISOString();
  const title = cleanString(options.title) || templateSource.title;
  const id = slugify(`${templateSource.code}-${title}-${Date.now()}`) || `interactive-${randomUUID()}`;
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
    hours: numberOr(options.hours, templateSource.hours),
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
      extractionError: extraction.error
    },
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
    modules: buildModules(templateSource, relevantPages, storedUrl),
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
  return {
    modules: course.modules?.length || 0,
    lessons,
    questions: course.finalAssessment?.questions?.length || 0
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
    const info = await parser.getInfo({ parsePageInfo: true }).catch(() => ({ total: 0 }));
    const total = Math.min(Number(info?.total) || 0, 80);
    const pages = [];
    if (total) {
      for (let pageNumber = 1; pageNumber <= total; pageNumber += 1) {
        const result = await parser.getText({ partial: [pageNumber] }).catch(() => ({ text: "" }));
        const text = normalizePdfText(result?.text || "");
        if (isUsefulPdfPage(text)) pages.push({ pageNumber, text });
      }
    }
    if (pages.length) return pages;
    const result = await parser.getText().catch(() => ({ text: "" }));
    return splitExtractedTextIntoPages(result?.text || "");
  } finally {
    await parser.destroy().catch(() => {});
  }
}

async function safeExtractPdfPages(bytes) {
  try {
    const pages = await extractPdfPages(bytes);
    return {
      status: pages.length ? "text-extracted" : "template-fallback",
      pages,
      totalPages: pages.length || estimatePdfPageCount(bytes),
      error: ""
    };
  } catch (error) {
    return {
      status: "template-fallback",
      pages: [],
      totalPages: estimatePdfPageCount(bytes),
      error: cleanString(error?.message || "Falha ao extrair texto do PDF").slice(0, 240)
    };
  }
}

function estimatePdfPageCount(bytes) {
  try {
    const text = Buffer.from(bytes).toString("latin1");
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

function buildModules(templateSource, pages, pdfUrl) {
  const sourcePages = enrichPdfPages(pages.length ? pages : buildFallbackPages(templateSource));
  const contentModules = templateSource.modules.map((module, moduleIndex) => {
    const isAssessmentModule = /avaliacao/i.test(normalizeForSearch(module.title));
    return {
      id: `module-${moduleIndex + 1}`,
      title: module.title,
      topics: module.topics,
      lessons: isAssessmentModule
        ? []
        : (module.topics || []).map((topic, topicIndex) => {
            const page = pickBestPageForTopic(sourcePages, topic, module.title, moduleIndex, topicIndex, templateSource);
            return buildLesson({
              page,
              module,
              title: topic,
              pdfUrl,
              lessonIndex: topicIndex + 1,
              templateKey: templateSource.key
            });
          })
    };
  });

  const usedPages = new Set(contentModules.flatMap((module) => (module.lessons || []).map((lesson) => lesson.sourcePage)));
  const extraPages = sourcePages
    .filter((page) => !usedPages.has(page.pageNumber))
    .filter((page) => isUsefulPdfPage(page.text))
    .slice(0, 10);

  for (const page of extraPages) {
    const target = pickModule(contentModules.filter((module) => module.lessons), page.text, page.pageNumber - 1);
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
  }

  return contentModules;
}

function enrichPdfPages(pages) {
  return (pages || [])
    .map((page, index) => ({
      pageNumber: Number(page.pageNumber || index + 1),
      text: normalizePdfText(page.text || "")
    }))
    .filter((page) => page.text)
    .slice(0, 80);
}

function pickBestPageForTopic(pages, topic, moduleTitle, moduleIndex, topicIndex, templateSource) {
  const candidates = (pages || []).map((page) => ({
    page,
    score: scorePageForTopicMatch(page.text, topic, moduleTitle, templateSource)
  }));
  const best = candidates.sort((a, b) => b.score - a.score)[0];
  if (best?.score > 0) {
    return {
      pageNumber: best.page.pageNumber,
      text: extractFocusedSnippet(best.page.text, topic, moduleTitle)
    };
  }
  const fallback = pages[(moduleIndex + topicIndex) % Math.max(1, pages.length)];
  return {
    pageNumber: fallback?.pageNumber || moduleIndex + 1,
    text: fallback?.text
      ? extractFocusedSnippet(fallback.text, topic, moduleTitle)
      : `${topic}. Conteudo organizado pelo template ${templateSource.label} para revisao tecnica antes da publicacao.`
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
  if (!normalized) return "";
  const paragraphs = normalized
    .split(/\n\s*\n+|(?<=[.!?])\s+(?=[A-ZÀ-ÿ0-9])/)
    .map((item) => cleanString(item))
    .filter((item) => item.length >= 35);
  if (!paragraphs.length) return normalized.slice(0, 1400);
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

  return relevant.slice(0, 28);
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
    .filter((module) => !/avaliacao/i.test(normalizeForSearch(module.title)))
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
  const text = page.text || "";
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
  if (!clean || clean.length < 80 || /template .* revisao tecnica/i.test(normalizeForSearch(clean))) return "";
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
  return /[a-zA-ZÀ-ÿ]{4,}/.test(cleaned);
}

function isUsefulTitleLine(line) {
  const cleaned = cleanString(line);
  if (cleaned.length < 12 || cleaned.length > 90) return false;
  if (/^-*\s*\d+\s+of\s+\d+\s*-*$/i.test(cleaned)) return false;
  if (/^(sumário|conteúdo|material demonstrativo|fortixseg)$/i.test(normalizeForSearch(cleaned))) return false;
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
