import { hasLocalServices } from "./preview-mode";

const recipient = process.env.BOO_FORMSUBMIT_RECIPIENT?.trim();

export const formSubmitEndpoint = recipient
  ? `https://formsubmit.co/${encodeURIComponent(recipient).replace("%40", "@")}`
  : undefined;

export const hasCustomerForms = Boolean(formSubmitEndpoint) || hasLocalServices;
