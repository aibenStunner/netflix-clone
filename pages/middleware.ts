import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../lib/utils";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const userId = await verifyToken(token as string);
  const { pathname } = req.nextUrl;

  if (
    pathname.includes("/api/login") ||
    userId ||
    pathname.includes("/static")
  ) {
    return NextResponse.next();
  }

  if ((!token || !userId) && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
