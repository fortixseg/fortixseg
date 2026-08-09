try {
  const mod = await import("pdf-parse/node");
  console.log("PDF_PARSE_NODE_OK", Object.keys(mod).join(","));
} catch (error) {
  console.error("PDF_PARSE_NODE_ERROR");
  console.error(error);
  process.exit(1);
}
