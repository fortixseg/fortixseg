import { randomUUID } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const REQUEST_TIMEOUT_MS = 15_000;

const CORE_COURSES = {
  nr35: { id: "nr35", code: "NR 35", title: "NR 35 - Trabalho em Altura", hours: 8, price: 149.90 },
  nr12: { id: "nr12", code: "NR 12", title: "NR 12 - Seguranca no Trabalho em Maquinas e Equipamentos", hours: 8, price: 179.90 },
  nr10: { id: "nr10", code: "NR 10", title: "NR 10 - Seguranca em Instalacoes e Servicos em Eletricidade", hours: 40, price: 249.90 },
  nr33: { id: "nr33", code: "NR 33", title: "NR 33 - Seguranca e Saude em Espacos Confinados", hours: 16, price: 199.90 },
  epi: { id: "epi", code: "EPI", title: "Uso Correto de EPIs", hours: 4, price: 59.90 },
  integracao: { id: "integracao", code: "INT", title: "Integracao de Seguranca", hours: 4, price: 79.90 },
  nr01: { id: "nr01", code: "NR 01", title: "NR 01 - GRO/PGR Introdutorio", hours: 4, price: 89.90 },
  loto: { id: "loto", code: "LOTO", title: "LOTO - Bloqueio e Etiquetagem", hours: 4, price: 99.90 }
};

const COURSE_ROWS = [
  ["integ-chao", "INT", "Integracao de Seguranca", 4, 79.90],
  ["percepcao-riscos", "RISCO", "Percepcao de Riscos", 4, 69.90],
  ["apr", "APR", "APR - Analise Preliminar de Risco", 4, 89.90],
  ["pt", "PT", "Permissao de Trabalho - PT", 4, 99.90],
  ["nr12-introdutorio", "NR 12", "NR-12 Introdutorio", 8, 179.90],
  ["nr12-operadores", "NR 12", "NR-12 para Operadores", 8, 199.90],
  ["nr12-manutencao", "NR 12", "NR-12 para Manutencao", 8, 219.90],
  ["nr33-nocoes", "NR 33", "NR-33 Espaco Confinado - Nocoes", 8, 169.90],
  ["risco-eletrico-nao-eletricistas", "ELE", "Riscos com Eletricidade para Nao Eletricistas", 4, 89.90],
  ["ferramentas-manuais", "FER", "Ferramentas Manuais com Seguranca", 2, 49.90],
  ["ferramentas-eletricas", "FER", "Ferramentas Eletricas Portateis", 4, 79.90],
  ["movimentacao-cargas", "CARGAS", "Movimentacao Manual de Cargas", 4, 69.90],
  ["ergonomia-posto", "NR 17", "Ergonomia no Posto de Trabalho - NR-17", 4, 79.90],
  ["incendio-nocoes", "INC", "Protecao contra Incendio - Nocoes", 4, 69.90],
  ["produtos-quimicos", "NR 26", "Produtos Quimicos e FDS/FISPQ - NR-26", 4, 89.90],
  ["ar-comprimido", "AR", "Seguranca com Ar Comprimido", 2, 59.90],
  ["solda-corte", "SOLDA", "Seguranca em Solda e Corte - Nocoes", 4, 99.90],
  ["ponte-rolante", "PONTE", "Ponte Rolante - Teorico", 8, 159.90],
  ["talhas-icamento", "TALHAS", "Talhas e Dispositivos de Icamento", 4, 89.90],
  ["empilhadeira-reciclagem", "EMP", "Empilhadeira - Reciclagem Teorica", 8, 149.90],
  ["paleteira-eletrica", "PAL", "Paleteira Eletrica - Nocoes de Seguranca", 4, 79.90],
  ["prensas", "PRENSA", "Seguranca em Prensas", 4, 119.90],
  ["maos-dedos", "MAOS", "Protecao de Maos e Dedos", 2, 49.90],
  ["quase-acidente", "QA", "Quase Acidente e Comportamento Seguro", 2, 49.90],
  ["cinco-s-seguranca", "5S", "5S com Foco em Seguranca", 4, 69.90],
  ["ordem-limpeza", "5S", "Ordem, Limpeza e Organizacao Segura", 2, 39.90],
  ["trabalho-quente", "TQ", "Trabalho a Quente - Nocoes", 4, 89.90],
  ["contratadas", "CONT", "Seguranca para Contratadas", 4, 99.90],
  ["integ-adm", "ADM", "Integracao de Seguranca para Administrativo", 4, 69.90],
  ["ergonomia-escritorio", "NR 17", "Ergonomia em Escritorio - NR-17", 4, 79.90],
  ["home-office", "HOME", "Home Office Seguro e Ergonomia", 2, 49.90],
  ["acidentes-adm", "ADM", "Prevencao de Acidentes no Ambiente Administrativo", 2, 49.90],
  ["primeiros-socorros", "PS", "Nocoes de Primeiros Socorros", 4, 89.90],
  ["evacuacao-emergencia", "EVAC", "Evacuacao de Emergencia e Abandono de Area", 2, 49.90],
  ["assedio", "RH", "Assedio Moral e Sexual no Trabalho", 4, 79.90],
  ["cipa-assedio", "NR 05", "NR-05 CIPA e Prevencao ao Assedio", 8, 129.90],
  ["saude-mental", "PSICO", "Saude Mental e Seguranca Psicologica", 4, 89.90],
  ["lgpd-rh-sst", "LGPD", "LGPD para RH e Seguranca do Trabalho", 4, 89.90],
  ["comunicacao-riscos", "COM", "Comunicacao de Riscos", 2, 49.90],
  ["direcao-defensiva", "FROTA", "Direcao Defensiva para Frota Leve", 4, 89.90],
  ["escadas-portateis", "ESC", "Uso Seguro de Escadas Portateis", 2, 49.90],
  ["almoxarifado", "ALM", "Organizacao Segura de Almoxarifado", 4, 69.90],
  ["ler-dort", "LER", "Qualidade de Vida e Prevencao de LER/DORT", 4, 79.90],
  ["sst-liderancas", "LID", "SST para Liderancas", 4, 119.90],
  ["responsabilidade-lideranca", "LID", "Responsabilidade da Lideranca em Seguranca", 4, 119.90],
  ["gro-pgr", "GRO", "Gestao de Riscos Ocupacionais - GRO/PGR", 8, 179.90],
  ["dds-eficaz", "DDS", "Como Conduzir DDS Eficaz", 2, 69.90],
  ["investigacao-acidentes", "INV", "Investigacao e Analise de Acidentes", 8, 199.90],
  ["tratamento-quase-acidentes", "QA", "Tratamento de Quase Acidentes", 4, 99.90],
  ["indicadores-seguranca", "KPI", "Gestao de Indicadores de Seguranca", 4, 129.90],
  ["auditoria-comportamental", "AUD", "Auditoria Comportamental de Seguranca", 4, 129.90],
  ["pt-emitentes", "PT", "Permissao de Trabalho para Emitentes e Aprovadores", 4, 129.90],
  ["gestao-contratadas", "CONT", "Gestao de Contratadas em SST", 4, 129.90],
  ["gestao-reciclagens", "TREIN", "Gestao de Treinamentos e Reciclagens", 4, 99.90],
  ["pae", "PAE", "Plano de Atendimento a Emergencias - PAE", 4, 119.90],
  ["cultura-seguranca", "CULT", "Cultura de Seguranca e Comportamento Seguro", 4, 99.90],
  ["comunicacao-supervisores", "COM", "Comunicacao de Seguranca para Supervisores", 2, 69.90],
  ["documentos-sst", "DOC", "Gestao de Documentos de SST", 4, 99.90],
  ["controle-certificados", "CERT", "Controle de Certificados e Validades", 2, 69.90],
  ["esocial-sst", "eSOC", "Nocoes de eSocial SST", 4, 119.90],
  ["novos-colaboradores", "INT", "Integracao de Novos Colaboradores", 4, 79.90],
  ["treinamentos-obrigatorios", "TREIN", "Gestao de Treinamentos Obrigatorios", 4, 99.90],
  ["nr01-rh", "NR 01", "NR-01 para RH e Gestores", 4, 99.90],
  ["matriz-treinamentos", "MATRIZ", "Como Montar Matriz de Treinamentos", 4, 119.90],
  ["evidencias-auditoria", "AUD", "Organizacao de Evidencias para Auditoria", 4, 119.90],
  ["terceiros-documentacao", "TERC", "Terceiros e Documentacao de Seguranca", 4, 119.90],
  ["lgpd-colaboradores", "LGPD", "LGPD aplicada a Dados de Colaboradores", 4, 89.90],
  ["dds-altura", "DDS", "DDS - Trabalho em Altura", 0.5, 19.90],
  ["dds-epi", "DDS", "DDS - Uso Correto de EPIs", 0.5, 19.90],
  ["dds-maos", "DDS", "DDS - Protecao das Maos", 0.5, 19.90],
  ["dds-quase-acidente", "DDS", "DDS - Quase Acidente", 0.5, 19.90],
  ["dds-ordem-limpeza", "DDS", "DDS - Ordem e Limpeza", 0.5, 19.90],
  ["dds-risco-eletrico", "DDS", "DDS - Risco Eletrico", 0.5, 19.90],
  ["dds-quimicos", "DDS", "DDS - Produtos Quimicos", 0.5, 19.90],
  ["dds-ergonomia", "DDS", "DDS - Ergonomia", 0.5, 19.90],
  ["dds-cargas", "DDS", "DDS - Movimentacao de Cargas", 0.5, 19.90],
  ["dds-bloqueio", "DDS", "DDS - Bloqueio de Energia", 0.5, 19.90],
  ["dds-escadas", "DDS", "DDS - Escadas Portateis", 0.5, 19.90],
  ["dds-comunicacao-acidentes", "DDS", "DDS - Comunicacao de Acidentes", 0.5, 19.90],
  ["dds-comportamento", "DDS", "DDS - Comportamento Seguro", 0.5, 19.90],
  ["dds-ferramentas", "DDS", "DDS - Uso de Ferramentas", 0.5, 19.90],
  ["dds-transito-interno", "DDS", "DDS - Transito Interno", 0.5, 19.90]
];

const PACKAGE_CATALOG = {
  "pkg-integracao": { id: "pkg-integracao", code: "PCT 01", title: "Integracao Essencial", hours: 12, price: 199.90 },
  "pkg-chao-fabrica": { id: "pkg-chao-fabrica", code: "PCT 02", title: "Chao de Fabrica", hours: 24, price: 349.90 },
  "pkg-administrativo": { id: "pkg-administrativo", code: "PCT 03", title: "Administrativo Seguro", hours: 18, price: 249.90 },
  "pkg-lideranca": { id: "pkg-lideranca", code: "PCT 04", title: "Lideranca em Seguranca", hours: 28, price: 449.90 },
  "pkg-manutencao": { id: "pkg-manutencao", code: "PCT 05", title: "Manutencao Segura", hours: 26, price: 399.90 },
  "pkg-rh-sst": { id: "pkg-rh-sst", code: "PCT 06", title: "RH e Gestao SST", hours: 20, price: 299.90 }
};

const DISCOUNT_TIERS = [
  { min: 1, max: 5, discount: 0 },
  { min: 6, max: 20, discount: 0.10 },
  { min: 21, max: 50, discount: 0.15 },
  { min: 51, max: 100, discount: 0.20 }
];

const STATIC_CATALOG = {
  ...CORE_COURSES,
  ...Object.fromEntries(COURSE_ROWS.map(([id, code, title, hours, price]) => [id, { id, code, title, hours, price }]))
};

export default async function handler(request, response) {
  applyJsonHeaders(response);

  if (request.method === "OPTIONS") {
    return response.status(204).end();
  }

  if (request.method !== "POST") {
    return sendJson(response, 405, { error: "Metodo nao permitido." });
  }

  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if (!accessToken) {
    return sendJson(response, 503, {
      code: "MERCADO_PAGO_NOT_CONFIGURED",
      error: "Mercado Pago nao configurado na Vercel."
    });
  }

  let body;
  try {
    body = await readRequestBody(request);
  } catch {
    return sendJson(response, 400, { error: "Carrinho invalido." });
  }

  if (!Array.isArray(body.items) || body.items.length === 0 || body.items.length > 20) {
    return sendJson(response, 400, { error: "Carrinho invalido." });
  }

  const catalog = loadCatalog();
  let items;
  try {
    items = body.items.map((item) => buildCheckoutItem(item, catalog));
  } catch (error) {
    return sendJson(response, 400, { error: error.message || "Item invalido no carrinho." });
  }

  const publicBaseUrl = getPublicBaseUrl(request);
  const preference = {
    items,
    external_reference: `fortixseg-${randomUUID()}`,
    statement_descriptor: "FORTIXSEG",
    metadata: {
      brand: "FortixSeg",
      product_ids: items.map((item) => item.id).join(",")
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
    const mercadoPagoResponse = await fetchWithTimeout("https://api.mercadopago.com/checkout/preferences", {
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
      return sendJson(response, 502, { error: cleanText(detail, 240) });
    }

    const useSandbox = String(process.env.MERCADO_PAGO_USE_SANDBOX || "true").toLowerCase() === "true";
    const checkoutUrl = useSandbox ? data.sandbox_init_point : data.init_point;
    if (!checkoutUrl) {
      return sendJson(response, 502, { error: "O Mercado Pago nao retornou o link do checkout." });
    }

    // TODO: consultar o pagamento no backend antes de liberar matricula, certificado ou acesso ao curso.
    return sendJson(response, 200, {
      id: data.id,
      checkoutUrl,
      init_point: data.init_point || "",
      sandbox_init_point: data.sandbox_init_point || "",
      mode: useSandbox ? "sandbox" : "production"
    });
  } catch {
    return sendJson(response, 502, { error: "Nao foi possivel conectar ao Mercado Pago agora." });
  }
}

function buildCheckoutItem(item, catalog) {
  const isPackage = Boolean(item?.packageId || item?.type === "package" || item?.kind === "package");
  const quantity = Number(item?.quantity);
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 500) {
    throw new Error("Quantidade invalida no carrinho.");
  }

  if (isPackage) {
    const productId = cleanId(item?.packageId || item?.id || item?.key);
    const product = PACKAGE_CATALOG[productId];
    if (!product) throw new Error("Pacote nao encontrado.");

    const tier = DISCOUNT_TIERS.find((entry) => quantity >= entry.min && quantity <= entry.max);
    if (!tier) throw new Error("Para mais de 100 colaboradores, solicite uma proposta personalizada.");

    const unitPrice = product.price * (1 - tier.discount);
    return {
      id: product.id,
      title: product.title,
      description: `Pacote empresarial - ${product.hours} horas`,
      quantity,
      currency_id: "BRL",
      unit_price: roundMoney(unitPrice)
    };
  }

  const productId = cleanId(item?.courseId || item?.id || item?.key);
  const submittedPrice = Number(item?.unitPrice);
  const submittedTitle = cleanText(item?.title, 180);
  const product = catalog[productId] || (submittedTitle && Number.isFinite(submittedPrice)
    ? { id: productId, title: submittedTitle, hours: Number(item?.hours) || 0, price: submittedPrice }
    : null);
  if (!product) throw new Error("Curso nao encontrado no catalogo de checkout.");

  const price = Number(product.price);
  if (!Number.isFinite(price) || price <= 0 || price > 100000) {
    throw new Error("Preco invalido no catalogo de checkout.");
  }

  // TODO: substituir catalogo estatico por PostgreSQL/Supabase antes de vender em producao.
  return {
    id: product.id || productId,
    title: cleanText(product.title || "Treinamento online", 180),
    description: `${item?.corporate ? "Vaga corporativa" : "Treinamento online"} - ${Number(product.hours) || 0} horas`,
    quantity,
    currency_id: "BRL",
    unit_price: roundMoney(price)
  };
}

function loadCatalog() {
  const catalog = { ...STATIC_CATALOG };
  const candidates = [
    resolve(process.cwd(), "data", "courses.json"),
    resolve(process.cwd(), "outputs", "qualiseg", "data", "courses.json")
  ];

  for (const filePath of candidates) {
    try {
      if (!existsSync(filePath)) continue;
      const parsed = JSON.parse(readFileSync(filePath, "utf8"));
      if (!parsed || typeof parsed !== "object") continue;
      for (const [id, course] of Object.entries(parsed)) {
        if (course?.status === "draft") continue;
        const normalized = normalizeCourse(course, id);
        if (normalized) catalog[normalized.id] = normalized;
      }
      break;
    } catch {
      break;
    }
  }

  return catalog;
}

function normalizeCourse(course, fallbackId) {
  const id = cleanId(course?.id || fallbackId);
  const title = cleanText(course?.title, 180);
  const price = Number(course?.price);
  if (!id || !title || !Number.isFinite(price)) return null;
  return {
    id,
    code: cleanText(course?.code || id.toUpperCase(), 30),
    title,
    hours: Number(course?.hours) || 0,
    price
  };
}

async function readRequestBody(request) {
  if (Buffer.isBuffer(request.body)) {
    return request.body.length ? JSON.parse(request.body.toString("utf8")) : {};
  }

  if (request.body && typeof request.body === "object" && !isReadableStream(request.body)) {
    return request.body;
  }

  if (typeof request.body === "string") {
    return request.body ? JSON.parse(request.body) : {};
  }

  return new Promise((resolveBody, rejectBody) => {
    let size = 0;
    const chunks = [];
    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > 128_000) {
        rejectBody(new Error("Carrinho muito grande."));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => {
      try {
        resolveBody(chunks.length ? JSON.parse(Buffer.concat(chunks).toString("utf8")) : {});
      } catch (error) {
        rejectBody(error);
      }
    });
    request.on("error", rejectBody);
  });
}

async function fetchWithTimeout(url, options) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function getPublicBaseUrl(request) {
  const headerOrigin = request.headers?.origin || "";
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || "";
  const raw = process.env.PUBLIC_BASE_URL || headerOrigin || (vercelUrl ? `https://${vercelUrl}` : "");

  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") return "";
    return url.origin;
  } catch {
    return "";
  }
}

function applyJsonHeaders(response) {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
}

function sendJson(response, statusCode, body) {
  return response.status(statusCode).json(body);
}

function cleanId(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, 80);
}

function cleanText(value, maxLength = 180) {
  return String(value || "").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function roundMoney(value) {
  return Number(Number(value).toFixed(2));
}

function isReadableStream(value) {
  return value && typeof value.getReader === "function";
}
