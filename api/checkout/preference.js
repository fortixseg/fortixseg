import { randomUUID } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

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

export default async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido." });
  }

  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if (!accessToken) {
    return res.status(503).json({
      code: "MERCADO_PAGO_NOT_CONFIGURED",
      error: "Mercado Pago não configurado na Vercel. Configure MERCADO_PAGO_ACCESS_TOKEN."
    });
  }

  const body = typeof req.body === "string" ? safeJson(req.body) : (req.body || {});

  if (!Array.isArray(body.items) || body.items.length === 0 || body.items.length > 20) {
    return res.status(400).json({ error: "Carrinho inválido." });
  }

  const catalog = loadCatalog();
  let items;
  try {
    items = body.items.map((item) => buildCheckoutItem(item, catalog));
  } catch (error) {
    return res.status(400).json({ error: error.message || "Item inválido no carrinho." });
  }

  const publicBaseUrl = getPublicBaseUrl(req);
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
      const detail = data?.message || data?.error || data?.cause?.[0]?.description || "Mercado Pago recusou a solicitação.";
      return res.status(502).json({ error: String(detail).slice(0, 240), mercadoPago: data });
    }

    const useSandbox = String(process.env.MERCADO_PAGO_USE_SANDBOX || "true").toLowerCase() === "true";
    const checkoutUrl = useSandbox && data.sandbox_init_point ? data.sandbox_init_point : data.init_point;
    if (!checkoutUrl) {
      return res.status(502).json({ error: "O Mercado Pago não retornou o link do checkout." });
    }

    return res.status(200).json({ id: data.id, checkoutUrl });
  } catch (error) {
    return res.status(502).json({ error: "Não foi possível conectar ao Mercado Pago agora." });
  }
}

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
    throw new Error("Item ou quantidade inválida no carrinho.");
  }

  // TODO PRODUÇÃO: recalcular preços, pacotes e descontos no backend/banco, não confiar no preço enviado pelo navegador.
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

function getPublicBaseUrl(req) {
  const envUrl = process.env.PUBLIC_BASE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || "";
  const host = req.headers["x-forwarded-host"] || req.headers.host || "";
  const proto = req.headers["x-forwarded-proto"] || "https";
  const value = envUrl || (host ? `${proto}://${host}` : "");

  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    if (url.protocol !== "https:") return "";
    return url.origin;
  } catch {
    return "";
  }
}

function safeJson(value) {
  try {
    return JSON.parse(value || "{}");
  } catch {
    return {};
  }
}

function cleanId(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 80);
}

function cleanText(value, max = 180) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, max);
}

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Cache-Control", "no-store");
}
