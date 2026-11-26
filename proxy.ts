import { randomInt } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { variants } from "./lib/catalogue";
import { getOrAssignHero, HERO_COOKIE } from "./lib/local-store";
import { hasLocalServices } from "./lib/preview-mode";

const hostedHeroCookie = "boo_b_hosted_hero";

function assignHostedHero(existing?: string) {
  const saved = variants.find(({ id }) => id === existing);
  const { id } = saved ?? variants[randomInt(variants.length)];
  return { variant: id, value: id };
}

export function proxy(request: NextRequest) {
  if (/^[A-J]$/i.test(request.nextUrl.searchParams.get("hero") ?? "")) {
    return NextResponse.next();
  }
  if (
    request.headers.get("next-router-prefetch") ||
    request.headers.get("purpose") === "prefetch"
  ) {
    return NextResponse.next();
  }
  const cookie = hasLocalServices ? HERO_COOKIE : hostedHeroCookie;
  const existing = request.cookies.get(cookie)?.value;
  const assignment = hasLocalServices
    ? getOrAssignHero(existing)
    : assignHostedHero(existing);
  const headers = new Headers(request.headers);
  headers.set("x-boo-hero", assignment.variant);
  const response = NextResponse.next({ request: { headers } });
  response.headers.set("Cache-Control", "private, no-store");
  if (assignment.value !== existing) {
    response.cookies.set(cookie, assignment.value, {
      httpOnly: true,
      sameSite: "lax",
      secure: request.nextUrl.protocol === "https:",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  return response;
}

export const config = { matcher: "/" };
