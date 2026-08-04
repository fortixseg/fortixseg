import { readFileSync } from "node:fs";

const env = loadEnvFile(".env");
const baseUrl = `http://127.0.0.1:${env.PORT || "3001"}`;

function loadEnvFile(path) {
  try {
    const parsed = {};
    for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
      const separator = trimmed.indexOf("=");
      let value = trimmed.slice(separator + 1).trim();
      if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      parsed[trimmed.slice(0, separator).trim()] = value;
    }
    return parsed;
  } catch {
    return {};
  }
}

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {})
    }
  });
  const text = await response.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text.slice(0, 160) };
  }
  return { ok: response.ok, status: response.status, data };
}

const login = await request("/api/auth/login", {
  method: "POST",
  body: JSON.stringify({
    email: env.FORTIXSEG_ADMIN_EMAIL,
    password: env.FORTIXSEG_ADMIN_PASSWORD
  })
});

if (!login.ok) {
  console.log(JSON.stringify({ ok: false, step: "login", status: login.status, error: login.data?.error }, null, 2));
  process.exit(1);
}

const checkout = await request("/api/checkout-preference", {
  method: "POST",
  token: login.data.token,
  body: JSON.stringify({
    items: [{ courseId: "nr35", quantity: 1, unitPrice: 149.90, title: "NR 35 - Trabalho em Altura" }]
  })
});

console.log(JSON.stringify({
  ok: checkout.ok,
  status: checkout.status,
  preferenceCreated: Boolean(checkout.data?.id),
  checkoutHost: checkout.data?.checkoutUrl ? new URL(checkout.data.checkoutUrl).host : "",
  code: checkout.data?.code || "",
  error: checkout.data?.error || "",
  details: checkout.data?.details || ""
}, null, 2));

if (!checkout.ok) process.exitCode = 1;
