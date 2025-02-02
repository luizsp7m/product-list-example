import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function ValidationError(error: ZodError) {
  return NextResponse.json(
    {
      message: "Validation error",
      error,
    },
    { status: 400 }
  );
}
