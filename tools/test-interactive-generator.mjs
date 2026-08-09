import { readFileSync } from "node:fs";
import { basename } from "node:path";
import { generateInteractiveCourseFromPdf } from "../lib/interactive-generator.js";

const pdfPath = process.argv[2] || "assets/apostila-nr35-demonstrativa.pdf";
const bytes = readFileSync(pdfPath);
const course = await generateInteractiveCourseFromPdf({
  bytes,
  originalName: basename(pdfPath),
  storedUrl: "/assets/apostila-nr35-demonstrativa.pdf",
  storedPathname: pdfPath,
  options: {
    title: "Teste Gerado por PDF",
    responsible: "Responsavel tecnico de teste"
  }
});

console.log(JSON.stringify({
  title: course.title,
  detectedTemplate: course.detectedTemplate,
  detectedLabel: course.detectedLabel,
  extractionStatus: course.pdf.extractionStatus,
  extractionError: course.pdf.extractionError,
  pdfPages: course.pdf.pages,
  modules: course.modules.length,
  lessons: course.modules.reduce((total, module) => total + module.lessons.length, 0),
  questions: course.finalAssessment.questions.length,
  firstLesson: course.modules[0]?.lessons[0]?.title,
  firstChecklist: course.modules[0]?.lessons[0]?.checklist?.slice(0, 2)
}, null, 2));
