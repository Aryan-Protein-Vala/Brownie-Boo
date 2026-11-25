import {
  createHash,
  randomBytes,
  randomInt,
  scrypt,
  timingSafeEqual,
} from "node:crypto";
import {
  closeSync,
  linkSync,
  mkdirSync,
  openSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { promisify } from "node:util";

export const HERO_COOKIE = "boo_b_hero";
export const CUSTOMER_COOKIE = "boo_b_customer";
export const ADMIN_COOKIE = "boo_b_admin";

const heroes = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"] as const;
const productIds = ["original", "double-trouble", "boujee"] as const;
const sizes = [50, 200, 250];
const skuIds = productIds.flatMap((product) =>
  sizes.map((size) => `${product}-${size}`),
);
const tokenPattern = /^[0-9a-f]{48}$/;
const keyPattern = /^[a-z0-9][a-z0-9-]{0,47}$/i;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const derivePassword = promisify(scrypt);
const fakePasswordHash = `${"0".repeat(32)}:${"0".repeat(128)}`;

type Hero = (typeof heroes)[number];
type Customer = { email: string; name: string };
type SessionKind = "admin" | "customer";
type Assignment = { variant: Hero; value: string };
type Drop = {
  id: string;
  name: string;
  earlyAt: string;
  publicAt: string;
  dispatchAt: string;
  stock: Record<string, number>;
};
type Discount = { code: string; percent: number; active: boolean };
const factFields = [
  "ingredients",
  "nutrition",
  "allergenNotes",
  "storage",
  "shelfLife",
  "certifications",
] as const;
type ProductFacts = Partial<Record<(typeof factFields)[number], string>>;
type Configuration = {
  weights: Record<Hero, number>;
  skuPrices: Record<string, number | null>;
  productFacts: Partial<Record<(typeof productIds)[number], ProductFacts>>;
  drops: Drop[];
  discounts: Discount[];
};

const defaults: Configuration = {
  weights: Object.fromEntries(
    heroes.map((hero) => [
      hero,
      hero === "E" ? 65 : hero === "G" || hero === "J" ? 0 : 5,
    ]),
  ) as Configuration["weights"],
  skuPrices: Object.fromEntries(skuIds.map((sku) => [sku, null])),
  productFacts: {},
  drops: [
    {
      id: "drop-001",
      name: "Drop 001",
      earlyAt: "",
      publicAt: "",
      dispatchAt: "",
      stock: {},
    },
  ],
  discounts: [],
};

const globalStore = globalThis as typeof globalThis & {
  booPreviewDb?: DatabaseSync;
};

export class PreviewError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}

function localDirectory() {
  const directory =
    process.env.BOO_PREVIEW_DATA_DIR || join(process.cwd(), ".local");
  mkdirSync(directory, { recursive: true, mode: 0o700 });
  return directory;
}

function db() {
  if (globalStore.booPreviewDb) return globalStore.booPreviewDb;

  const path = join(localDirectory(), "preview.sqlite");
  closeSync(openSync(path, "a", 0o600));
  const store = new DatabaseSync(path);
  store.exec(`
    PRAGMA busy_timeout = 4000;
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS configuration (id INTEGER PRIMARY KEY CHECK (id = 1), body TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS assignments (
      id TEXT PRIMARY KEY, variant TEXT NOT NULL, impressed INTEGER NOT NULL DEFAULT 0,
      clicked INTEGER NOT NULL DEFAULT 0, created_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS waitlist (
      email TEXT NOT NULL, topic TEXT NOT NULL, visitor TEXT, created_at INTEGER NOT NULL,
      PRIMARY KEY (email, topic), FOREIGN KEY (visitor) REFERENCES assignments(id)
    );
    CREATE INDEX IF NOT EXISTS waitlist_visitor ON waitlist(visitor);
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, message TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS customers (
      email TEXT PRIMARY KEY, name TEXT NOT NULL, password_hash TEXT NOT NULL, created_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY, kind TEXT NOT NULL, email TEXT, expires_at INTEGER NOT NULL,
      FOREIGN KEY (email) REFERENCES customers(email) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS orders (
      code TEXT PRIMARY KEY, email TEXT NOT NULL, status TEXT NOT NULL, dispatch_at TEXT
    );
  `);
  globalStore.booPreviewDb = store;
  return store;
}

export function asObject(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new PreviewError("Please send the form details again.");
  }
  return value as Record<string, unknown>;
}

export function asText(value: unknown, limit: number) {
  if (typeof value !== "string" || value.length > limit) return "";
  return value.trim();
}

export function asEmail(value: unknown) {
  const email = asText(value, 254).toLowerCase();
  if (!emailPattern.test(email))
    throw new PreviewError("Enter a valid email address.");
  return email;
}

function readConfiguration(): Configuration {
  const row = db().prepare("SELECT body FROM configuration WHERE id = 1").get();
  return row
    ? { ...defaults, ...(JSON.parse(String(row.body)) as Configuration) }
    : defaults;
}

function getAssignment(value?: string): Assignment | null {
  if (!value || !tokenPattern.test(value)) return null;
  const row = db()
    .prepare("SELECT variant FROM assignments WHERE id = ?")
    .get(value);
  return row ? { variant: row.variant as Hero, value } : null;
}

export function readHeroVariant(value?: string) {
  const existing = getAssignment(value);
  return existing && readConfiguration().weights[existing.variant] > 0
    ? existing.variant
    : null;
}

export function getOrAssignHero(value?: string): Assignment {
  const { weights } = readConfiguration();
  const existing = getAssignment(value);
  if (existing && weights[existing.variant] > 0) return existing;

  let ticket = randomInt(
    heroes.reduce((total, hero) => total + weights[hero], 0),
  );
  let variant: Hero = "E";
  for (const hero of heroes) {
    ticket -= weights[hero];
    if (ticket < 0) {
      variant = hero;
      break;
    }
  }
  const id = randomBytes(24).toString("hex");
  db()
    .prepare(
      "INSERT INTO assignments (id, variant, created_at) VALUES (?, ?, ?)",
    )
    .run(id, variant, Date.now());
  return { variant, value: id };
}

export function recordHeroEvent(
  value: string | undefined,
  kind: "impression" | "click",
  expected: unknown,
) {
  const assignment = getAssignment(value);
  if (!assignment || (expected && expected !== assignment.variant)) return;

  const statement =
    kind === "click"
      ? "UPDATE assignments SET clicked = 1, impressed = 1 WHERE id = ?"
      : "UPDATE assignments SET impressed = 1 WHERE id = ?";
  db().prepare(statement).run(assignment.value);
}

export function joinWaitlist(email: string, topic: string, cookie?: string) {
  const visitor = getAssignment(cookie)?.value ?? null;
  const result = db()
    .prepare("INSERT OR IGNORE INTO waitlist VALUES (?, ?, ?, ?)")
    .run(email, topic, visitor, Date.now());
  return result.changes > 0;
}

export function saveContact(email: string, name: string, message: string) {
  db()
    .prepare(
      "INSERT INTO contacts (email, name, message, created_at) VALUES (?, ?, ?, ?)",
    )
    .run(email, name, message, Date.now());
}

async function hashPassword(
  password: string,
  salt = randomBytes(16).toString("hex"),
) {
  const digest = (
    (await derivePassword(password, salt, 64)) as Buffer
  ).toString("hex");
  return `${salt}:${digest}`;
}

export async function registerCustomer(
  email: string,
  name: string,
  password: string,
): Promise<Customer> {
  const hash = await hashPassword(password);
  const result = db()
    .prepare("INSERT OR IGNORE INTO customers VALUES (?, ?, ?, ?)")
    .run(email, name, hash, Date.now());
  if (result.changes === 0)
    throw new PreviewError(
      "That account already exists. Sign in to continue.",
      409,
    );
  return { email, name };
}

export async function loginCustomer(
  email: string,
  password: string,
): Promise<Customer> {
  const row = db()
    .prepare("SELECT name, password_hash FROM customers WHERE email = ?")
    .get(email);
  const expected = row ? String(row.password_hash) : fakePasswordHash;
  const supplied = await hashPassword(password, expected.split(":")[0]);
  if (!timingSafeEqual(Buffer.from(expected), Buffer.from(supplied)) || !row) {
    throw new PreviewError("That email and password did not match.", 401);
  }
  return { email, name: String(row.name) };
}

function tokenHash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function createSession(
  kind: SessionKind,
  maxAge: number,
  email?: string,
) {
  const token = randomBytes(24).toString("hex");
  const now = Date.now();
  db().prepare("DELETE FROM sessions WHERE expires_at <= ?").run(now);
  db()
    .prepare("INSERT INTO sessions VALUES (?, ?, ?, ?)")
    .run(tokenHash(token), kind, email ?? null, now + maxAge * 1000);
  return token;
}

export function getSession(kind: SessionKind, value?: string) {
  if (!value || !tokenPattern.test(value)) return undefined;
  return db()
    .prepare(
      "SELECT email FROM sessions WHERE id = ? AND kind = ? AND expires_at > ?",
    )
    .get(tokenHash(value), kind, Date.now());
}

export function endSession(kind: SessionKind, value?: string) {
  if (!value || !tokenPattern.test(value)) return;
  db()
    .prepare("DELETE FROM sessions WHERE id = ? AND kind = ?")
    .run(tokenHash(value), kind);
}

export function customerProfile(value?: string): Customer {
  const session = getSession("customer", value);
  if (!session?.email)
    throw new PreviewError("Sign in to see your profile.", 401);
  const email = String(session.email);
  const row = db()
    .prepare("SELECT name FROM customers WHERE email = ?")
    .get(email);
  if (!row) throw new PreviewError("Sign in to see your profile.", 401);
  return { email, name: String(row.name) };
}

export function trackOrder(email: string, code: string) {
  const row = db()
    .prepare(
      "SELECT code, status, dispatch_at FROM orders WHERE code = ? AND email = ?",
    )
    .get(code, email);
  if (!row)
    throw new PreviewError(
      "We couldn’t find a matching order. Please check both details.",
      404,
    );
  return {
    code: String(row.code),
    status: String(row.status),
    dispatchAt: row.dispatch_at ? String(row.dispatch_at) : null,
  };
}

export function initializeAdminKey() {
  if (process.env.BOO_PREVIEW_ADMIN_PASSWORD)
    return process.env.BOO_PREVIEW_ADMIN_PASSWORD;

  const path = join(localDirectory(), "admin-password.txt");
  try {
    return readFileSync(path, "utf8").trim();
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }

  // Link a complete file so concurrent processes never read a partly written key.
  const temp = `${path}.${randomBytes(8).toString("hex")}`;
  writeFileSync(temp, `${randomBytes(18).toString("base64url")}\n`, {
    flag: "wx",
    mode: 0o600,
  });
  try {
    linkSync(temp, path);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
  } finally {
    unlinkSync(temp);
  }
  return readFileSync(path, "utf8").trim();
}

export function checkAdminPassword(password: string) {
  const expected = Buffer.from(tokenHash(initializeAdminKey()), "hex");
  const supplied = Buffer.from(tokenHash(password), "hex");
  if (!timingSafeEqual(expected, supplied))
    throw new PreviewError("That owner key didn’t match.", 401);
}

export function readAdmin() {
  const configuration = readConfiguration();
  const analytics = db()
    .prepare(
      `
    SELECT variant, COUNT(*) AS assignments, SUM(impressed) AS impressions, SUM(clicked) AS clicks,
      SUM(EXISTS (SELECT 1 FROM waitlist WHERE visitor = assignments.id)) AS signups
    FROM assignments GROUP BY variant
  `,
    )
    .all();
  return {
    configuration,
    analytics: heroes.map(
      (variant) =>
        analytics.find((row) => row.variant === variant) ?? {
          variant,
          assignments: 0,
          impressions: 0,
          clicks: 0,
          signups: 0,
        },
    ),
    waitlistCount: Number(
      db().prepare("SELECT COUNT(*) AS count FROM waitlist").get()?.count ?? 0,
    ),
    contactCount: Number(
      db().prepare("SELECT COUNT(*) AS count FROM contacts").get()?.count ?? 0,
    ),
  };
}

function asNumber(value: unknown, maximum: number, integer = true): number {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value < 0 ||
    value > maximum ||
    (integer && !Number.isInteger(value))
  ) {
    throw new PreviewError(
      "Enter valid positive values for this configuration.",
    );
  }
  return value;
}

function asDate(value: unknown) {
  if (value === undefined || value === null || value === "") return "";
  const date = asText(value, 45);
  if (
    !/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2})?)?$/.test(
      date,
    ) ||
    !Number.isFinite(Date.parse(date))
  ) {
    throw new PreviewError("Enter a valid date for each scheduled release.");
  }
  return date;
}

function asSkuEntries(value: unknown) {
  const entries = Object.entries(asObject(value));
  if (entries.length > 40 || entries.some(([sku]) => !keyPattern.test(sku))) {
    throw new PreviewError("Enter a valid SKU for each product size.");
  }
  return entries;
}

function asDrops(value: unknown): Drop[] {
  if (!Array.isArray(value) || value.length > 50)
    throw new PreviewError("Enter a valid list of drops.");
  const ids = new Set<string>();
  return value.map((item) => {
    const drop = asObject(item);
    const id = asText(drop.id, 48);
    const name = asText(drop.name, 100);
    if (!keyPattern.test(id) || !name || ids.has(id))
      throw new PreviewError("Each drop needs a unique key and a name.");
    ids.add(id);
    const earlyAt = asDate(drop.earlyAt);
    const publicAt = asDate(drop.publicAt);
    const dispatchAt = asDate(drop.dispatchAt);
    const dates = [earlyAt, publicAt, dispatchAt]
      .filter(Boolean)
      .map((date) => Date.parse(date));
    if (dates.some((date, index) => index > 0 && date < dates[index - 1])) {
      throw new PreviewError(
        "Early access, public release and dispatch must be in that order.",
      );
    }
    const stock = Object.fromEntries(
      asSkuEntries(drop.stock ?? {}).map(([sku, units]) => [
        sku,
        asNumber(units, 1_000_000),
      ]),
    );
    return { id, name, earlyAt, publicAt, dispatchAt, stock };
  });
}

function asDiscounts(value: unknown): Discount[] {
  if (!Array.isArray(value) || value.length > 100)
    throw new PreviewError("Enter a valid list of discount codes.");
  const codes = new Set<string>();
  return value.map((item) => {
    const discount = asObject(item);
    const code = asText(discount.code, 32).toUpperCase();
    const percent = asNumber(discount.percent, 100);
    if (
      !keyPattern.test(code) ||
      codes.has(code) ||
      percent < 1 ||
      typeof discount.active !== "boolean"
    ) {
      throw new PreviewError(
        "Each discount needs a unique code and a percentage from 1 to 100.",
      );
    }
    codes.add(code);
    return { code, percent, active: discount.active };
  });
}

export function saveConfiguration(value: unknown) {
  const patch = asObject(value);
  const store = db();
  store.exec("BEGIN IMMEDIATE");
  try {
    const configuration = { ...readConfiguration() };
    if (patch.weights !== undefined) {
      const weights = asObject(patch.weights);
      configuration.weights = { ...configuration.weights };
      for (const hero of heroes) {
        if (Object.hasOwn(weights, hero))
          configuration.weights[hero] = asNumber(weights[hero], 1000);
      }
      if (!heroes.some((hero) => configuration.weights[hero] > 0)) {
        throw new PreviewError(
          "Give at least one hero a nonzero traffic weight.",
        );
      }
    }
    if (patch.skuPrices !== undefined) {
      const prices = Object.fromEntries(
        asSkuEntries(patch.skuPrices).map(([sku, amount]) => [
          sku,
          amount === null
            ? null
            : Math.round(asNumber(amount, 1_000_000, false) * 100) / 100,
        ]),
      );
      configuration.skuPrices = { ...configuration.skuPrices, ...prices };
    }
    if (patch.productFacts !== undefined) {
      const incoming = asObject(patch.productFacts);
      configuration.productFacts = { ...configuration.productFacts };
      for (const product of productIds) {
        if (!Object.hasOwn(incoming, product)) continue;
        const facts = asObject(incoming[product]);
        const updates: ProductFacts = {};
        for (const field of factFields) {
          if (!Object.hasOwn(facts, field)) continue;
          const value = facts[field];
          if (typeof value !== "string" || value.length > 2000) {
            throw new PreviewError(
              "Keep each product note under 2,000 characters.",
            );
          }
          updates[field] = value.trim();
        }
        configuration.productFacts[product] = {
          ...configuration.productFacts[product],
          ...updates,
        };
      }
    }
    if (patch.drops !== undefined) configuration.drops = asDrops(patch.drops);
    if (patch.discounts !== undefined)
      configuration.discounts = asDiscounts(patch.discounts);
    store
      .prepare(
        "INSERT INTO configuration VALUES (1, ?) ON CONFLICT (id) DO UPDATE SET body = excluded.body",
      )
      .run(JSON.stringify(configuration));
    store.exec("COMMIT");
  } catch (error) {
    store.exec("ROLLBACK");
    throw error;
  }
}
