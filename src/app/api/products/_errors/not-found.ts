import { NextResponse } from "next/server";

export function NotFound(message: string) {
  return NextResponse.json({ message }, { status: 404 });
}
