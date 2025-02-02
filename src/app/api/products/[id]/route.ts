import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { UnauthenticatedError } from "../_errors/unauthenticated-error";
import { NotFound } from "../_errors/not-found";
import { InternalServerError } from "../_errors/server-error";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;

    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NotFound("Product not found");
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    return InternalServerError(error);
  }
}

export const DELETE = auth(async function DELETE(request, { params }) {
  try {
    const { auth: session } = request;

    if (!session) {
      return UnauthenticatedError();
    }

    const productId = params?.id as string;

    await db.product.delete({
      where: { id: productId },
    });

    return NextResponse.json(
      {
        message: "Product deleted successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NotFound("Product not found");
    }

    return InternalServerError(error);
  }
});
