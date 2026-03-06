import { type NextRequest, NextResponse } from "next/server";
import { exchangeGoogleCodeForSession } from "@/app/(auth)/_actions/auth-actions";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/dashboard";

  const safeNext = next.startsWith("/") ? next : "/dashboard";

  if (code) {
    await exchangeGoogleCodeForSession(code);
  }

  return NextResponse.redirect(new URL(safeNext, requestUrl.origin));
}
