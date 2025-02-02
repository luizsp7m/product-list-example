import { NextResponse } from "next/server";

export function InternalServerError(error: unknown) {
  return NextResponse.json(
    { message: "Internal server error", error },
    { status: 500 }
  );
}
