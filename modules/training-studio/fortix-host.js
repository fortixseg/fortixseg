(function bootstrapFortixTrainingStudioHost() {
  const originalFetch = window.fetch.bind(window);
  let renderWrapped = false;

  async function normalizeApiResponse(response) {
    const raw = await response.text();
    let data = raw ? raw : null;

    if (raw) {
      try {
        data = JSON.parse(raw);
      } catch {
        data = response.ok ? { detail: raw } : { detail: raw || `HTTP ${response.status}` };
      }
    }

    if (!data || typeof data !== "object") {
      data = { detail: data || (response.ok ? "OK" : `HTTP ${response.status}`) };
    }

    const headers = new Headers(response.headers);
    headers.set("Content-Type", "application/json; charset=utf-8");

    return new Response(JSON.stringify(data), {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }

  window.fetch = async function fortixTrainingStudioFetch(input, init = {}) {
    const url = typeof input === "string" ? input : input?.url || "";
    if (url.startsWith("/api/projects")) {
      const token = localStorage.getItem("fortixsegApiToken");
      if (token) {
        const headers = new Headers(init.headers || {});
        headers.set("Authorization", `Bearer ${token}`);
        init = { ...init, headers };
      }
      const response = await originalFetch(input, init);
      return normalizeApiResponse(response);
    }
    return originalFetch(input, init);
  };

  function postResize() {
    const height = Math.max(
      document.documentElement.scrollHeight,
      document.body?.scrollHeight || 0,
      700
    );
    window.parent?.postMessage({ type: "fortix:training-resize", height }, "*");
  }

  function installResizeBridge() {
    if (window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(() => postResize());
      resizeObserver.observe(document.documentElement);
      if (document.body) resizeObserver.observe(document.body);
    }

    const mutationObserver = new MutationObserver(() => requestAnimationFrame(postResize));
    mutationObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true
    });

    window.addEventListener("resize", postResize);
    postResize();
  }

  function wrapRenderForResize() {
    if (renderWrapped || typeof window.render !== "function") return;
    const originalRender = window.render;
    window.render = function fortixRenderWithResize(...args) {
      const result = originalRender.apply(this, args);
      requestAnimationFrame(postResize);
      setTimeout(postResize, 80);
      return result;
    };
    renderWrapped = true;
  }

  function openUploadWhenReady() {
    if (typeof window.newTraining === "function") {
      wrapRenderForResize();
      window.newTraining();
      requestAnimationFrame(postResize);
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
    installResizeBridge();
    wrapRenderForResize();
    openUploadWhenReady();
  });
})();
