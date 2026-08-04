import PDFDocument from "pdfkit";
import QRCode from "qrcode";

function collectBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

export async function buildCertificatePdf({ certificate, verificationUrl, issuerName = "FortixSeg" }) {
  const document = new PDFDocument({ size: "A4", margin: 48 });
  const bufferPromise = collectBuffer(document);
  const qrDataUrl = await QRCode.toDataURL(verificationUrl, { margin: 1, width: 180 });
  const qrBase64 = qrDataUrl.split(",")[1];
  const qrBuffer = Buffer.from(qrBase64, "base64");

  document.rect(24, 24, 547, 794).lineWidth(2).stroke("#0B6B36");
  document.fontSize(14).fillColor("#0B6B36").text("CERTIFICADO DIGITAL", 48, 56, { align: "center" });
  document.moveDown(1);
  document.fontSize(28).fillColor("#111111").text(certificate.studentName, { align: "center" });
  document.moveDown(0.5);
  document.fontSize(14).fillColor("#333333").text("concluiu com aproveitamento o treinamento", { align: "center" });
  document.moveDown(0.5);
  document.fontSize(24).fillColor("#0B6B36").text(certificate.courseTitle, { align: "center" });
  document.moveDown(1);
  document.fontSize(13).fillColor("#222222");
  document.text(`Carga horária: ${certificate.hours}`, { align: "center" });
  document.text(`Nota final: ${certificate.grade}%`, { align: "center" });
  document.text(`Código de validação: ${certificate.code}`, { align: "center" });
  document.text(`Emitido em: ${new Intl.DateTimeFormat("pt-BR").format(new Date(certificate.issuedAt))}`, { align: "center" });
  document.moveDown(2);
  document.fontSize(11).fillColor("#555555").text("Valide este certificado pelo QR Code ou pela URL abaixo:", { align: "center" });
  document.moveDown(0.5);
  document.fillColor("#0B6B36").text(verificationUrl, { align: "center", link: verificationUrl, underline: true });
  document.image(qrBuffer, 206, 470, { fit: [180, 180], align: "center" });
  document.fontSize(11).fillColor("#555555").text(`Emitido por ${issuerName}`, 48, 700, { align: "center" });
  document.end();

  return bufferPromise;
}
