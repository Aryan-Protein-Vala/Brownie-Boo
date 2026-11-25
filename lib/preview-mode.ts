// SQLite stays local. Hosted forms can use FormSubmit.
export const hasLocalServices =
  process.env.VERCEL !== "1" && process.env.BOO_HOSTED_PREVIEW !== "1";
