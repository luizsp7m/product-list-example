import bcrypt from "bcrypt";

import { USER_ROLES } from "@/constants/user-roles";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const adminPassword = await bcrypt.hash("admin", 10);
  const customerPassword = await bcrypt.hash("customer", 10);

  await db.user.deleteMany();

  await db.user.createMany({
    data: [
      {
        email: "admin@email.com",
        password: adminPassword,
        role: USER_ROLES.ADMIN,
      },

      {
        email: "customer@email.com",
        password: customerPassword,
        role: USER_ROLES.CUSTOMER,
      },
    ],
  });

  return NextResponse.json(
    { message: "Users created successfully" },
    { status: 201 }
  );
}
