const { randomUUID } = require("node:crypto");
const { existsSync, readFileSync } = require("node:fs");
const { resolve } = require("node:path");

const DEFAULT_COURSES = {
  nr35: { id: "nr35", title: "NR 35 - Trabalho em Altura", hours: 8, price: 149.9 },
  nr12: { id: "nr12", title: "NR 12 - Segurança no Trabalho em Máquinas e Equipamentos", hours: 8, price: 179.9 },
  nr10: { id: "nr10", title: "NR 10 - Segurança em Instalações e Serviços em Eletricidade", hours: 40, price: 249.9 },
  nr33: { id: "nr33", title: "NR 33 - Segurança e Saúde em Espaços Confinados", hours: 16, price: 199.9 },
  epi: { id: "epi", title: "Uso Correto de EPIs", hours: 4, price: 59.9 },
  integracao: { id: "integracao", title: "Integração de Segurança", hours: 4, price: 79.9 },
  nr01: { id: "nr01", title: "NR 01 - GRO/PGR Introdutório", hours: 4, price: 89.9 },
  loto: { id: "loto", title: "LOTO - Bloqueio e Etiquetagem", hours: 4, price: 99.9 }
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return sendJson(204, {});
  }

  if (event.httpMethod !== "POST") {
    return sendJson(405, { error: "Metodo nao permitido." });
  }

  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if (!accessToken) {
    return sendJson(503, {
      code: "MERCADO_PAGO_NOT_CONFIGURED",
      error: "Mercado Pago nao configurado no Netlify."
    });
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return sendJson(400, { error: "Carrinho invalido." });
  }

  if (!Array.isArray(body.items) || body.items.length === 0 || body.items.length > 20) {
    return sendJson(400, { error: "Carrinho invalido." });
  }

  const catalog = loadCatalog();
  let items;
  try {
    items = body.items.map((item) => buildCheckoutItem(item, catalog));
  } catch (error) {
    return sendJson(400, { error: error.message || "Item invalido no carrinho." });
  }

  const publicBaseUrl = getPublicBaseUrl(event);
  const preference = {
    items,
    external_reference: `fortixseg-${randomUUID()}`,
    statement_descriptor: "FORTIXSEG",
    metadata: {
      brand: "FortixSeg",
      course_ids: items.map((item) => item.id).join(",")
    }
  };

  if (publicBaseUrl) {
    preference.back_urls = {
      success: `${publicBaseUrl}/?payment=success#home`,
      failure: `${publicBaseUrl}/?payment=failure#home`,
      pending: `${publicBaseUrl}/?payment=pending#home`
    };
    preference.auto_return = "approved";
  }

  try {
    const mercadoPagoResponse = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(preference)
    });

    const data = await mercadoPagoResponse.json().catch(() => ({}));
    if (!mercadoPagoResponse.ok) {
      const detail = data?.message || data?.error || data?.cause?.[0]?.description || "Mercado Pago recusou a solicitacao.";
      return sendJson(502, { error: String(detail).slice(0, 240) });
    }

    const useSandbox = String(process.env.MERCADO_PAGO_USE_SANDBOX || "true").toLowerCase() === "true";
    const checkoutUrl = useSandbox && data.sandbox_init_point ? data.sandbox_init_point : data.init_point;
    if (!checkoutUrl) {
      return sendJson(502, { error: "O Mercado Pago nao retornou o link do checkout." });
    }

    return sendJson(200, { id: data.id, checkoutUrl });
  } catch {
    return sendJson(502, { error: "Nao foi possivel conectar ao Mercado Pago agora." });
  }
};

function buildCheckoutItem(item, catalog) {
  const productId = cleanId(item?.courseId || item?.packageId || item?.id || item?.title);
  const quantity = Number(item?.quantity);
  const course = catalog[productId];
  const submittedTitle = cleanText(item?.title || "", 180);
  const submittedUnitPrice = Number(item?.unitPrice);
  const title = course?.title || submittedTitle;
  const price = Number(course?.price ?? submittedUnitPrice);
  const hours = Number(course?.hours) || 0;
  const kind = item?.packageId || item?.kind === "package" ? "Pacote empresarial" : "Treinamento online";

  if (!productId || !title || !Number.isInteger(quantity) || quantity < 1 || quantity > 500 || !Number.isFinite(price) || price <= 0 || price > 100000) {
    throw new Error("Item ou quantidade invalida no carrinho.");
  }

  // TODO: no backend real, validar pacotes, descontos e valores no banco PostgreSQL antes de enviar ao Mercado Pago.
  return {
    id: productId,
    title,
    description: hours ? `${kind} - ${hours} horas` : kind,
    quantity,
    currency_id: "BRL",
    unit_price: Number(price.toFixed(2))
  };
}

function loadCatalog() {
  const candidates = [
    resolve(__dirname, "../../data/courses.json"),
    resolve(process.cwd(), "data/courses.json")
  ];

  for (const filePath of candidates) {
    try {
      if (existsSync(filePath)) {
        const parsed = JSON.parse(readFileSync(filePath, "utf8"));
        if (parsed && typeof parsed === "object") return parsed;
      }
    } catch {
      return DEFAULT_COURSES;
    }
  }

  return DEFAULT_COURSES;
}

function getPublicBaseUrl(event) {
  const value = process.env.PUBLIC_BASE_URL || process.env.URL || event.headers.origin || "";
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return "";
    return url.origin;
  } catch {
    return "";
  }
}

function cleanId(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 80);
}

function cleanText(value, max = 180) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, max);
}

function sendJson(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS"
    },
    body: statusCode === 204 ? "" : JSON.stringify(body)
  };
}
