import("../server.js")
  .then((module) => {
    console.log("IMPORT_OK", Object.keys(module).join(","));
  })
  .catch((error) => {
    console.error("IMPORT_ERROR");
    console.error(error);
    process.exit(1);
  });
