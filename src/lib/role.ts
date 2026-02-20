// src/lib/role.ts
import { NextRequest, NextResponse } from "next/server";

export function checkRole(req: NextRequest, allowedRoles: string[]) {
  const role = req.headers.get("x-user-role"); // یا از session
  if (!role || !allowedRoles.includes(role)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}