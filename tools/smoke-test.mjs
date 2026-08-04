import { readFileSync } from "node:fs";

const env = loadEnvFile(".env");
const baseUrl = `http://127.0.0.1:${env.PORT || "3001"}`;
const results = [];

function loadEnvFile(path) {
  try {
    const source = readFileSync(path, "utf8");
    const parsed = {};
    for (const line of source.split(/\r?\n/)) {
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
  if (!response.ok) {
    const error = new Error(data.error || data.message || `HTTP ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}

function record(name, ok, details = {}) {
  results.push({ name, ok: Boolean(ok), details });
}

async function run() {
  const health = await request("/api/health");
  record("health", health.ok === true, {
    mercadoPagoConfigured: Boolean(health.mercadoPagoConfigured),
    runtimeState: health.runtimeStateIssue ? "issue" : "ok"
  });

  const login = await request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: env.FORTIXSEG_ADMIN_EMAIL,
      password: env.FORTIXSEG_ADMIN_PASSWORD
    })
  });
  const token = login.token;
  record("admin login", login.user?.role === "admin", { role: login.user?.role });

  const dashboard = await request("/api/admin/dashboard", { token });
  record("admin dashboard", Number.isFinite(dashboard.metrics?.courses), dashboard.metrics || {});

  const usersBefore = await request("/api/admin/users", { token });
  record("admin users list", Array.isArray(usersBefore.users), { count: usersBefore.users?.length || 0 });

  const stamp = Date.now();
  const createdUser = await request("/api/admin/users", {
    method: "POST",
    token,
    body: JSON.stringify({
      role: "student",
      name: "Aluno Teste Codex",
      email: `codex-test-${stamp}@fortixseg.local`,
      password: "123456",
      phone: "11999999999",
      document: "00000000000",
      courseId: "nr35"
    })
  });
  record("admin create user", Boolean(createdUser.user?.id), {
    role: createdUser.user?.role,
    status: createdUser.user?.status
  });

  const disabledUser = await request(`/api/admin/users/${encodeURIComponent(createdUser.user.id)}`, {
    method: "PATCH",
    token,
    body: JSON.stringify({ status: "inactive" })
  });
  record("admin disable user", disabledUser.user?.status === "inactive", { status: disabledUser.user?.status });

  const createdCourse = await request("/api/admin/courses", {
    method: "POST",
    token,
    body: JSON.stringify({
      title: "Curso Teste Codex",
      code: `TST ${stamp}`,
      category: "Teste",
      hours: 2,
      price: 10,
      lessons: 2,
      minimumGrade: 70,
      attempts: 3,
      audience: "Equipe interna",
      objective: "Validar cadastro",
      syllabus: ["Abertura", "PDF", "Avaliação"],
      status: "published"
    })
  });
  const courseId = createdCourse.course.id;
  record("admin create course", Boolean(courseId), { id: courseId });

  const pdf = Buffer.from("%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF\n").toString("base64");
  const resource = await request(`/api/admin/courses/${encodeURIComponent(courseId)}/resources`, {
    method: "POST",
    token,
    body: JSON.stringify({
      name: "apostila-teste.pdf",
      data: `data:application/pdf;base64,${pdf}`
    })
  });
  record("admin upload pdf", Boolean(resource.resource?.url), {
    name: resource.resource?.name,
    size: resource.resource?.size
  });

  const deletedCourse = await request(`/api/admin/courses/${encodeURIComponent(courseId)}`, {
    method: "DELETE",
    token
  });
  record("admin delete test course", deletedCourse.deleted === true || deletedCourse.archived === true, deletedCourse);

  try {
    const checkout = await request("/api/checkout-preference", {
      method: "POST",
      token,
      body: JSON.stringify({
        items: [{ courseId: "nr35", quantity: 1, unitPrice: 149.90, title: "NR 35 - Trabalho em Altura" }]
      })
    });
    record("mercado pago checkout", Boolean(checkout.checkoutUrl), {
      preferenceCreated: Boolean(checkout.id),
      checkoutHost: checkout.checkoutUrl ? new URL(checkout.checkoutUrl).host : ""
    });
  } catch (error) {
    record("mercado pago checkout", false, {
      status: error.status || 0,
      code: error.data?.code || "",
      error: String(error.message).slice(0, 180),
      details: String(error.data?.details || "").slice(0, 240)
    });
  }

  console.log(JSON.stringify(results, null, 2));
  if (results.some((item) => !item.ok && item.name !== "mercado pago checkout")) {
    process.exitCode = 1;
  }
}

run().catch((error) => {
  console.log(JSON.stringify({ fatal: String(error.message), status: error.status || 0 }, null, 2));
  process.exitCode = 1;
});
