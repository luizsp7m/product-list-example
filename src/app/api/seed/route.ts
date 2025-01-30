import bcrypt from "bcrypt";

import { USER_ROLES } from "@/constants/user-roles";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { products } from "@/assets/products-data";

export async function GET() {
  const adminPassword = await bcrypt.hash("admin", 10);

  await db.user.deleteMany();
  await db.product.deleteMany();

  await db.user.createMany({
    data: [
      {
        email: "admin@email.com",
        password: adminPassword,
        role: USER_ROLES.ADMIN,
      },
    ],
  });

  await db.product.createMany({
    data: products,
  });

  return NextResponse.json(
    { message: "Users and products created successfully" },
    { status: 201 }
  );
}
