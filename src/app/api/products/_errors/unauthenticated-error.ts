import { NextResponse } from "next/server";

export function UnauthenticatedError() {
  return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
}
