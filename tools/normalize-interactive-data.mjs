import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const file = resolve("data", "interactive-courses.json");
const courses = JSON.parse(readFileSync(file, "utf8"));

const NR35_TERMS = [
  "nr 35",
  "nr-35",
  "trabalho em altura",
  "altura",
  "queda",
  "cinturao",
  "talabarte",
  "ancoragem",
  "linha de vida",
  "fator de queda",
  "guarda corpo",
  "permissao de trabalho",
  "analise de risco",
  "resgate",
  "condicao impeditiva",
  "epi",
  "epc"
];

function isNoisyTitle(value) {
  const text = String(value || "").trim();
  return !text || /^-*\s*\d+\s+of\s+\d+\s*-*$/i.test(text) || /^p[aá]gina\s+\d+$/i.test(text) || text.length < 4;
}

function cleanText(value, fallbackTitle) {
  const text = String(value || "")
    .replace(/--\s*\d+\s+of\s+\d+\s*--/gi, "")
    .replace(/\bpage\s+\d+\s+of\s+\d+\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  if (text.length >= 35 && !/^conte[uú]do de apoio gerado pelo template/i.test(text)) return text;

  return `Conteúdo de apoio gerado pelo template. Revise a página correspondente da apostila antes de publicar a aula "${fallbackTitle}".`;
}

for (const course of courses) {
  const rawTitle = String(course.title || "");
  if (/^nr\s*-?\s*35$/i.test(rawTitle) || /^nr35$/i.test(rawTitle)) {
    course.title = course.detectedLabel || "NR-35 - Trabalho em Altura";
  }

  for (const module of course.modules || []) {
    (module.lessons || []).forEach((lesson, index) => {
      const previousTitle = lesson.title;
      const fallback = module.topics?.[index] || module.topics?.[0] || module.title || "Aula interativa";
      const wasNoisy = isNoisyTitle(previousTitle);

      if (wasNoisy) lesson.title = fallback;
      lesson.extractedText = cleanText(lesson.extractedText, lesson.title);

      if (wasNoisy || /--\s*\d+\s+of\s+\d+\s*--/i.test(lesson.summary || "")) {
        lesson.summary = `Nesta aula, o aluno revisa ${String(lesson.title).toLowerCase()} dentro do módulo ${String(module.title || "do treinamento").toLowerCase()}, conectando regra, risco e prática segura.`;
      }

      if (lesson.quickQuestion?.prompt && wasNoisy) {
        lesson.quickQuestion.prompt = String(lesson.quickQuestion.prompt).replaceAll(previousTitle, lesson.title);
      }
    });
  }

  if (course.detectedTemplate === "nr35") {
    normalizeNr35Lessons(course);
  }

  polishCourseText(course);
  course.stats = summarize(course);
}

writeFileSync(file, JSON.stringify(courses, null, 2), "utf8");

console.log(JSON.stringify({
  updated: courses.length,
  firstTitle: courses[0]?.title,
  firstLesson: courses[0]?.modules?.[0]?.lessons?.[0]?.title
}));

function normalizeNr35Lessons(course) {
  let total = 0;
  for (const module of course.modules || []) {
    if (/avalia/i.test(normalizeForSearch(module.title))) {
      module.lessons = [];
      continue;
    }

    const kept = [];
    for (const lesson of module.lessons || []) {
      const text = `${lesson.title || ""} ${lesson.extractedText || ""}`;
      if (isRelevantNr35(text)) kept.push(lesson);
      if (kept.length >= 4) break;
    }

    if (!kept.length) {
      const topic = module.topics?.[0] || module.title || "Aula interativa";
      kept.push({
        id: `lesson-${Math.random().toString(36).slice(2, 10)}`,
        title: topic,
        sourcePage: 1,
        pageImageUrl: course.pdf?.url ? `${course.pdf.url}#page=1` : "",
        pagePreviewType: "pdf-page",
        extractedText: cleanText("", topic),
        summary: `Nesta aula, o aluno revisa ${String(topic).toLowerCase()} dentro do módulo ${String(module.title || "do treinamento").toLowerCase()}, conectando regra, risco e prática segura.`,
        attentionCard: "Atenção: atividades em altura devem ser planejadas, autorizadas e interrompidas quando houver condição insegura.",
        practiceCard: "Na prática: antes de executar a tarefa, confira AR/PT, ponto de ancoragem, EPIs e comunicação com a equipe.",
        checklist: [
          "Atividade possui AR/PT quando aplicável",
          "EPIs foram inspecionados antes do uso",
          "Ponto de ancoragem foi definido e validado",
          "Equipe conhece condutas de emergência"
        ],
        quickQuestion: {
          id: `q-${Math.random().toString(36).slice(2, 10)}`,
          prompt: `Qual é a melhor conduta ao identificar risco durante "${topic}"?`,
          alternatives: ["Continuar a atividade", "Parar, comunicar e revisar os controles", "Ignorar se for rápido", "Remover o EPI para ganhar tempo"],
          correctIndex: 1,
          explanation: "Em trabalho em altura, risco sem controle exige parada, comunicação e revisão das medidas antes de continuar."
        },
        completedButtonLabel: "Concluir aula"
      });
    }

    module.lessons = kept.map((lesson, index) => ({
      ...lesson,
      title: module.topics?.[index] || (!isNoisyTitle(lesson.title) && !isLoosePdfSentence(lesson.title) ? lesson.title : module.topics?.[0] || module.title || "Aula interativa")
    }));

    const existingTitles = new Set((module.lessons || []).map((lesson) => normalizeForSearch(lesson.title)));
    for (const topic of (module.topics || []).slice(0, 4)) {
      if (module.lessons.length >= 4 || existingTitles.has(normalizeForSearch(topic))) continue;
      const reference = module.lessons[0] || {};
      module.lessons.push({
        id: `lesson-${Math.random().toString(36).slice(2, 10)}`,
        title: topic,
        sourcePage: reference.sourcePage || 1,
        pageImageUrl: reference.pageImageUrl || (course.pdf?.url ? `${course.pdf.url}#page=1` : ""),
        pagePreviewType: "pdf-page",
        extractedText: cleanText("", topic),
        summary: `Nesta aula, o aluno revisa ${String(topic).toLowerCase()} dentro do módulo ${String(module.title || "do treinamento").toLowerCase()}, conectando regra, risco e prática segura.`,
        attentionCard: "Atenção: atividades em altura devem ser planejadas, autorizadas e interrompidas quando houver condição insegura.",
        practiceCard: "Na prática: antes de executar a tarefa, confira AR/PT, ponto de ancoragem, EPIs e comunicação com a equipe.",
        checklist: ["Riscos principais foram revisados", "Medidas de controle foram conferidas", "Dúvidas foram comunicadas ao responsável"],
        quickQuestion: {
          id: `q-${Math.random().toString(36).slice(2, 10)}`,
          prompt: `Qual é a melhor conduta ao identificar risco durante "${topic}"?`,
          alternatives: ["Continuar a atividade", "Parar, comunicar e revisar os controles", "Ignorar se for rápido", "Remover o EPI para ganhar tempo"],
          correctIndex: 1,
          explanation: "Em trabalho em altura, risco sem controle exige parada, comunicação e revisão das medidas antes de continuar."
        },
        completedButtonLabel: "Concluir aula"
      });
      existingTitles.add(normalizeForSearch(topic));
    }
    total += kept.length;
  }

  if (total < 7) {
    for (const module of course.modules || []) {
      if (/avalia/i.test(normalizeForSearch(module.title))) continue;
      const existing = new Set((module.lessons || []).map((lesson) => normalizeForSearch(lesson.title)));
      for (const topic of module.topics || []) {
        if (existing.has(normalizeForSearch(topic))) continue;
        module.lessons = module.lessons || [];
        module.lessons.push({
          id: `lesson-${Math.random().toString(36).slice(2, 10)}`,
          title: topic,
          sourcePage: module.lessons[0]?.sourcePage || 1,
          pageImageUrl: module.lessons[0]?.pageImageUrl || (course.pdf?.url ? `${course.pdf.url}#page=1` : ""),
          pagePreviewType: "pdf-page",
          extractedText: cleanText("", topic),
          summary: `Nesta aula, o aluno revisa ${String(topic).toLowerCase()} dentro do módulo ${String(module.title || "do treinamento").toLowerCase()}, conectando regra, risco e prática segura.`,
          attentionCard: "Atenção: atividades em altura devem ser planejadas, autorizadas e interrompidas quando houver condição insegura.",
          practiceCard: "Na prática: antes de executar a tarefa, confira AR/PT, ponto de ancoragem, EPIs e comunicação com a equipe.",
          checklist: ["Riscos principais foram revisados", "Medidas de controle foram conferidas", "Dúvidas foram comunicadas ao responsável"],
          quickQuestion: {
            id: `q-${Math.random().toString(36).slice(2, 10)}`,
            prompt: `Qual é a melhor conduta ao identificar risco durante "${topic}"?`,
            alternatives: ["Continuar a atividade", "Parar, comunicar e revisar os controles", "Ignorar se for rápido", "Remover o EPI para ganhar tempo"],
            correctIndex: 1,
            explanation: "Em trabalho em altura, risco sem controle exige parada, comunicação e revisão das medidas antes de continuar."
          },
          completedButtonLabel: "Concluir aula"
        });
        total += 1;
        if (total >= 7) return;
      }
    }
  }
}

function isRelevantNr35(text) {
  const haystack = normalizeForSearch(text);
  const hasSignal = NR35_TERMS.some((term) => haystack.includes(term));
  const otherNrHeader = /\bnr\s*(0?1|0?5|0?6|10|11|12|17|18|20|23|26|33)\b/.test(haystack);
  return hasSignal || !otherNrHeader;
}

function isLoosePdfSentence(value) {
  const text = String(value || "").trim();
  return /^[a-záàâãéêíóôõúç]/i.test(text) && /[;,]$/.test(text)
    || /^[a-z]\)/i.test(text)
    || /^nr\s*35\s*[–-]\s*trabalho em altura$/i.test(text)
    || text.length > 88;
}

function normalizeForSearch(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function summarize(course) {
  const lessons = (course.modules || []).reduce((total, module) => total + (module.lessons?.length || 0), 0);
  return {
    modules: course.modules?.length || 0,
    lessons,
    questions: course.finalAssessment?.questions?.length || 0
  };
}

function polishCourseText(value) {
  if (Array.isArray(value)) {
    value.forEach(polishCourseText);
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [key, current] of Object.entries(value)) {
    if (typeof current === "string") value[key] = polishPortuguese(current);
    else polishCourseText(current);
  }
}

function polishPortuguese(value) {
  return String(value || "")
    .replace(/\bCondicao\b/g, "Condição")
    .replace(/\bcondicao\b/g, "condição")
    .replace(/\bIntemperies\b/g, "Intempéries")
    .replace(/\bintemperies\b/g, "intempéries")
    .replace(/\beditaveis\b/g, "editáveis")
    .replace(/\baplicavel\b/g, "aplicável")
    .replace(/\bconteudo\b/g, "conteúdo")
    .replace(/\bConteudo\b/g, "Conteúdo")
    .replace(/\bpratica\b/g, "prática")
    .replace(/\bPratica\b/g, "Prática")
    .replace(/\bmodulo\b/g, "módulo")
    .replace(/\bModulo\b/g, "Módulo")
    .replace(/\bAtencao\b/g, "Atenção")
    .replace(/\bcomunicacao\b/g, "comunicação")
    .replace(/\brevisao\b/g, "revisão")
    .replace(/\bresponsavel\b/g, "responsável")
    .replace(/\bavaliacao\b/g, "avaliação")
    .replace(/\bprevencao\b/g, "prevenção");
}
