"use server";

import { db } from "@/lib/db";
import { productFormatter } from "@/utils/product-formatter";
import { Prisma } from "@prisma/client";
import { getProductsSchema } from "./_schemas/get-products-schema";

export async function getProducts(props: {
  search?: string;
  orderBy?: string;
  page?: string;
  perPage?: string;
  category?: string;
}) {
  try {
    const propsValidation = getProductsSchema.safeParse({
      search: props.search,
      page: props.page || 1,
      perPage: props.perPage || 10,
      category: props.category,
      orderBy: props.orderBy || "updatedAt:desc",
    });

    if (!propsValidation.success) {
      throw new Error("Validation error");
    }

    const {
      data: { search, orderBy, perPage, page, category },
    } = propsValidation;

    const where: Prisma.ProductWhereInput = {
      ...(search && {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }),

      ...(category && {
        category: {
          equals: category,
        },
      }),
    };

    let productOrderBy = undefined;

    if (orderBy) {
      const [field, order] = orderBy.split(":") as [string, "asc" | "desc"];
      productOrderBy = { [field]: order };
    }

    const skip = (page - 1) * perPage;

    const [totalCount, products] = await db.$transaction([
      db.product.count({ where }),

      db.product.findMany({
        where,
        skip,
        take: perPage,
        orderBy: productOrderBy,
      }),
    ]);

    const numberPages = Math.ceil(totalCount / perPage);

    return {
      data: products.map(productFormatter),
      page,
      perPage,
      numberPages,
      total: totalCount,
    };
  } catch (error) {
    throw error;
  }
}
