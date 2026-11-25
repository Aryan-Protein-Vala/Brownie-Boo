import { NextResponse, type NextRequest } from "next/server";
import { getOrAssignHero, HERO_COOKIE } from "./lib/local-store";
import { hasLocalServices } from "./lib/preview-mode";

export function proxy(request: NextRequest) {
  if (!hasLocalServices) return NextResponse.next();
  if (/^[A-J]$/i.test(request.nextUrl.searchParams.get("hero") ?? "")) {
    return NextResponse.next();
  }
  if (
    request.headers.get("next-router-prefetch") ||
    request.headers.get("purpose") === "prefetch"
  ) {
    return NextResponse.next();
  }
  const existing = request.cookies.get(HERO_COOKIE)?.value;
  const assignment = getOrAssignHero(existing);
  const headers = new Headers(request.headers);
  headers.set("x-boo-hero", assignment.variant);
  const response = NextResponse.next({ request: { headers } });
  response.headers.set("Cache-Control", "private, no-store");
  if (assignment.value !== existing) {
    response.cookies.set(HERO_COOKIE, assignment.value, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  return response;
}

export const config = { matcher: "/" };
