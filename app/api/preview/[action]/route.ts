import { hasLocalServices } from "../../../../lib/preview-mode";
import { type NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  CUSTOMER_COOKIE,
  HERO_COOKIE,
  PreviewError,
  asEmail,
  asObject,
  asText,
  checkAdminPassword,
  createSession,
  customerProfile,
  endSession,
  getOrAssignHero,
  getSession,
  initializeAdminKey,
  joinWaitlist,
  loginCustomer,
  readAdmin,
  recordHeroEvent,
  registerCustomer,
  saveConfiguration,
  saveContact,
  trackOrder,
} from "../../../../lib/local-store";

export const runtime = "nodejs";

const bodyLimit = 64 * 1024;
const adminAge = 60 * 60 * 8;
const customerAge = 60 * 60 * 24 * 7;
const heroAge = 60 * 60 * 24 * 365;
const loopbackHosts = new Set(["localhost", "127.0.0.1", "[::1]"]);

function respond(data?: unknown, message?: string) {
  return NextResponse.json(
    { ok: true, data, message },
    { headers: { "Cache-Control": "no-store" } },
  );
}

function withCookie(
  response: NextResponse,
  request: NextRequest,
  name: string,
  value: string,
  maxAge: number,
) {
  response.cookies.set(name, value, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    maxAge,
    secure: request.nextUrl.protocol === "https:",
  });
  return response;
}

function checkLocalRequest(request: NextRequest) {
  const host = request.headers.get("host") || request.nextUrl.host;
  const origin = request.headers.get("origin");
  let local = false;
  try {
    const target = new URL(`http://${host}`);
    const source = origin ? new URL(origin) : undefined;
    local =
      loopbackHosts.has(target.hostname) &&
      (!source || source.host === target.host);
  } catch {
    throw new PreviewError(
      "This service is available only in the local preview.",
      403,
    );
  }
  if (!local || request.headers.get("sec-fetch-site") === "cross-site") {
    throw new PreviewError(
      "This service is available only in the local preview.",
      403,
    );
  }
}

async function readBody(request: NextRequest) {
  if (
    request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !==
    "application/json"
  ) {
    throw new PreviewError("Send these details as JSON.", 415);
  }
  if (Number(request.headers.get("content-length")) > bodyLimit)
    throw new PreviewError("That request is too large.", 413);

  const reader = request.body?.getReader();
  if (!reader) throw new PreviewError("Please send the form details again.");
  const decoder = new TextDecoder();
  let text = "";
  let length = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > bodyLimit) {
        await reader.cancel();
        throw new PreviewError("That request is too large.", 413);
      }
      text += decoder.decode(value, { stream: true });
    }
  } finally {
    reader.releaseLock();
  }
  try {
    return asObject(JSON.parse(text + decoder.decode()));
  } catch {
    throw new PreviewError("Please send the form details again.");
  }
}

function getPassword(value: unknown, minLength = 1) {
  if (
    typeof value !== "string" ||
    value.length < minLength ||
    value.length > 256 ||
    !value.trim()
  ) {
    throw new PreviewError(
      minLength > 1
        ? `Use at least ${minLength} characters for your password.`
        : "Enter your password.",
    );
  }
  return value;
}

async function account(request: NextRequest, body: Record<string, unknown>) {
  const session = request.cookies.get(CUSTOMER_COOKIE)?.value;
  switch (body.mode) {
    case "register": {
      const name = asText(body.name, 100);
      if (!name) throw new PreviewError("Enter your name.");
      const profile = await registerCustomer(
        asEmail(body.email),
        name,
        getPassword(body.password, 8),
      );
      endSession("customer", session);
      return withCookie(
        respond(profile, "Welcome to the Boo Club."),
        request,
        CUSTOMER_COOKIE,
        createSession("customer", customerAge, profile.email),
        customerAge,
      );
    }
    case "login": {
      const profile = await loginCustomer(
        asEmail(body.email),
        getPassword(body.password),
      );
      endSession("customer", session);
      return withCookie(
        respond(profile, "You’re signed in."),
        request,
        CUSTOMER_COOKIE,
        createSession("customer", customerAge, profile.email),
        customerAge,
      );
    }
    case "profile":
      return respond(customerProfile(session));
    case "logout":
      endSession("customer", session);
      return withCookie(
        respond(undefined, "You’re signed out."),
        request,
        CUSTOMER_COOKIE,
        "",
        0,
      );
    default:
      throw new PreviewError("Choose an account action.");
  }
}

function admin(request: NextRequest, body: Record<string, unknown>) {
  const session = request.cookies.get(ADMIN_COOKIE)?.value;
  if (body.mode === "login") {
    checkAdminPassword(getPassword(body.password));
    endSession("admin", session);
    return withCookie(
      respond(readAdmin(), "Owner preview unlocked."),
      request,
      ADMIN_COOKIE,
      createSession("admin", adminAge),
      adminAge,
    );
  }
  if (body.mode === "logout") {
    endSession("admin", session);
    return withCookie(
      respond(undefined, "Owner preview locked."),
      request,
      ADMIN_COOKIE,
      "",
      0,
    );
  }
  if (!getSession("admin", session)) {
    initializeAdminKey();
    throw new PreviewError("Enter the local owner key to continue.", 401);
  }
  if (body.mode === "save") saveConfiguration(body.configuration);
  if (body.mode === "read" || body.mode === "save") {
    return respond(
      readAdmin(),
      body.mode === "save" ? "Preview configuration saved." : undefined,
    );
  }
  throw new PreviewError("Choose an owner action.");
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ action: string }> },
) {
  try {
    const { action } = await params;
    if (action === "checkout")
      throw new PreviewError(
        "The oven’s still preheating. Ordering opens when the first batch is ready.",
        403,
      );

    if (!hasLocalServices)
      throw new PreviewError("This service is coming soon.", 403);

    checkLocalRequest(request);
    const body = await readBody(request);
    const hero = request.cookies.get(HERO_COOKIE)?.value;

    switch (action) {
      case "waitlist": {
        const email = asEmail(body.email);
        const topic =
          asText(body.topic, 100).toLowerCase().replace(/\s+/g, " ") ||
          "early access";
        if (!/^[a-z0-9][a-z0-9 :_-]*$/.test(topic))
          throw new PreviewError("Choose a valid update to follow.");
        const joined = joinWaitlist(email, topic, hero);
        return respond(
          { joined },
          joined ? "You’re on the list." : "You’re already on this list.",
        );
      }
      case "contact": {
        const email = asEmail(body.email);
        const name = asText(body.name, 100);
        const message = asText(body.message, 4000);
        if (!name || !message)
          throw new PreviewError(
            "Enter your name and a message under 4,000 characters.",
          );
        saveContact(email, name, message);
        return respond(
          undefined,
          "Boo has your note. It’s saved in this local preview.",
        );
      }
      case "experiment": {
        if (body.kind === "assign") {
          const assignment = getOrAssignHero(hero);
          const response = respond({ variant: assignment.variant });
          return assignment.value === hero
            ? response
            : withCookie(
                response,
                request,
                HERO_COOKIE,
                assignment.value,
                heroAge,
              );
        }
        if (body.kind === "impression" || body.kind === "click") {
          recordHeroEvent(hero, body.kind, body.variant);
          return respond();
        }
        throw new PreviewError("Choose a valid experiment event.");
      }
      case "account":
        return await account(request, body);
      case "tracking": {
        const email = asEmail(body.email);
        const code = asText(body.code, 80).toUpperCase();
        if (!/^[A-Z0-9-]+$/.test(code))
          throw new PreviewError("Enter a valid order reference.");
        return respond(trackOrder(email, code));
      }
      case "admin":
        return admin(request, body);
      default:
        throw new PreviewError("That preview service doesn’t exist.", 404);
    }
  } catch (error) {
    if (error instanceof PreviewError) {
      return NextResponse.json(
        { ok: false, message: error.message },
        {
          status: error.status,
          headers: { "Cache-Control": "no-store" },
        },
      );
    }
    console.error("Brownie Boo local preview API error:", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Well, crumbs. Something went wrong. Please try again.",
      },
      {
        status: 500,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
}
