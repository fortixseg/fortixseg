(function bootstrapFortixTrainingStudioHost() {
  const originalFetch = window.fetch.bind(window);

  window.fetch = function fortixTrainingStudioFetch(input, init = {}) {
    const url = typeof input === "string" ? input : input?.url || "";
    if (url.startsWith("/api/projects")) {
      const token = localStorage.getItem("fortixsegApiToken");
      if (token) {
        const headers = new Headers(init.headers || {});
        headers.set("Authorization", `Bearer ${token}`);
        init = { ...init, headers };
      }
    }
    return originalFetch(input, init);
  };

  function openUploadWhenReady() {
    if (typeof window.newTraining === "function") {
      window.newTraining();
      return;
    }
    setTimeout(openUploadWhenReady, 50);
  }

  window.addEventListener("message", (event) => {
    if (event.data?.type === "fortix:training-studio-open-upload") {
      openUploadWhenReady();
    }
  });

  window.addEventListener("load", () => {
    openUploadWhenReady();
  });
})();
