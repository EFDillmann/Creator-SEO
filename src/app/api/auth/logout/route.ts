import { type NextRequest, NextResponse } from "next/server";
import { signOutCurrentUser } from "@/app/(auth)/_actions/auth-actions";

export async function GET(request: NextRequest) {
  await signOutCurrentUser();
  return NextResponse.redirect(new URL("/", request.url));
}
