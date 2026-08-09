try {
  await import("@napi-rs/canvas");
  console.log("CANVAS_OK");
} catch (error) {
  console.error("CANVAS_ERROR");
  console.error(error);
  process.exit(1);
}
