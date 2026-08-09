import { Pool } from "pg";

const DATABASE_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.SUPABASE_DB_URL || "";
const DATABASE_ENABLED = Boolean(DATABASE_URL);

let pool = null;
let initPromise = null;

function getPool() {
  if (!DATABASE_ENABLED) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: DATABASE_URL,
      ssl: DATABASE_URL.includes("localhost") ? false : { rejectUnauthorized: false }
    });
  }
  return pool;
}

async function ensureSchema() {
  if (!DATABASE_ENABLED) return;
  if (!initPromise) {
    initPromise = (async () => {
      const client = await getPool().connect();
      try {
        await client.query(`
          create table if not exists runtime_state (
            state_key text primary key,
            value jsonb not null,
            updated_at timestamptz not null default now()
          )
        `);
      } finally {
        client.release();
      }
    })();
  }
  await initPromise;
}

async function readStateValue(stateKey) {
  const client = await getPool().connect();
  try {
    const result = await client.query("select value from runtime_state where state_key = $1", [stateKey]);
    return result.rows[0]?.value ?? null;
  } finally {
    client.release();
  }
}

async function writeStateValue(stateKey, value) {
  const client = await getPool().connect();
  try {
    await client.query(
      `insert into runtime_state (state_key, value, updated_at)
       values ($1, $2::jsonb, now())
       on conflict (state_key)
       do update set value = excluded.value, updated_at = now()`,
      [stateKey, JSON.stringify(value)]
    );
  } finally {
    client.release();
  }
}

export function isDatabaseEnabled() {
  return DATABASE_ENABLED;
}

export async function loadDatabaseState({ defaultCourseCatalog, defaultAppData, defaultInteractiveCourses = [] }) {
  if (!DATABASE_ENABLED) return null;
  await ensureSchema();

  const [courseCatalog, appData, interactiveCourses] = await Promise.all([
    readStateValue("course_catalog"),
    readStateValue("app_data"),
    readStateValue("interactive_courses")
  ]);

  if (!courseCatalog) await writeStateValue("course_catalog", defaultCourseCatalog);
  if (!appData) await writeStateValue("app_data", defaultAppData);
  if (!interactiveCourses) await writeStateValue("interactive_courses", defaultInteractiveCourses);

  return {
    courseCatalog: courseCatalog || defaultCourseCatalog,
    appData: appData || defaultAppData,
    interactiveCourses: interactiveCourses || defaultInteractiveCourses
  };
}

export async function saveDatabaseState({ courseCatalog, appData, interactiveCourses = [] }) {
  if (!DATABASE_ENABLED) return;
  await ensureSchema();
  await Promise.all([
    writeStateValue("course_catalog", courseCatalog),
    writeStateValue("app_data", appData),
    writeStateValue("interactive_courses", interactiveCourses)
  ]);
}
