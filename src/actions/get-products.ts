"use server";

import { db } from "@/lib/db";
import { productFormatter } from "@/utils/product-formatter";
import { Product } from "@prisma/client";
import { z } from "zod";

const searchParamsSchema = z.object({
  search: z.string().trim().toLowerCase(),
  orderBy: z.string().trim(),
  page: z.coerce.number().int().min(1),
  perPage: z.coerce.number().int().min(1).max(50),
  category: z.string().trim(),
});

export async function getProducts(props: {
  search: string;
  orderBy: string;
  page: number;
  perPage: number;
  category: string;
}) {
  try {
    const validation = searchParamsSchema.safeParse({
      search: props.search,
      orderBy: props.orderBy,
      page: props.page,
      perPage: props.perPage,
      category: props.category,
    });

    if (!validation.success) {
      throw new Error(JSON.stringify(validation.error.flatten().fieldErrors));
    }

    const {
      data: { search, orderBy, perPage, page, category },
    } = validation;

    const skip = (page - 1) * perPage;

    const countProducts = await db.product.count({
      where: {
        ...(search && {
          name: {
            contains: search,
            mode: "insensitive",
          },
        }),

        ...(category && {
          category: {
            equals: category as Product["category"],
          },
        }),
      },
    });

    const [sortByField, sortByDirection] = orderBy.split(":");

    const products = await db.product.findMany({
      where: {
        ...(search && {
          name: {
            contains: search,
            mode: "insensitive",
          },
        }),

        ...(category && {
          category: {
            equals: category as Product["category"],
          },
        }),
      },

      skip,
      take: perPage,

      orderBy: { [sortByField]: sortByDirection as "asc" | "desc" },
    });

    const numberPages = Math.ceil(countProducts / perPage);

    return {
      data: products.map(productFormatter),
      page,
      perPage,
      numberPages,
      total: countProducts,
    };
  } catch (error) {
    throw error;
  }
}
