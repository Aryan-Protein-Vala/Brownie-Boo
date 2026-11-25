// Local preview services write to SQLite. The hosted storefront is read-only.
export const hasLocalServices =
  process.env.VERCEL !== "1" && process.env.BOO_HOSTED_PREVIEW !== "1";
