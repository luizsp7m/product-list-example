import { PRODUCT_SEARCH_PARAMS } from "@/constants/product-search-params";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { productFormatter } from "@/utils/product-formatter";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ValidationError } from "./_errors/validation-error";
import { InternalServerError } from "./_errors/server-error";
import { UnauthenticatedError } from "./_errors/unauthenticated-error";
import { getProductsSearchParamsSchema } from "./_schemas/get-products-search-params-schema";
import { productDataSchema } from "./_schemas/product-data-schema";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const searchParamsValidation = getProductsSearchParamsSchema.safeParse({
      search: searchParams.get(PRODUCT_SEARCH_PARAMS.SEARCH) || undefined,
      page: searchParams.get(PRODUCT_SEARCH_PARAMS.PAGE) || 1,
      perPage: searchParams.get(PRODUCT_SEARCH_PARAMS.PER_PAGE) || 10,
      category: searchParams.get(PRODUCT_SEARCH_PARAMS.CATEGORY) || undefined,
      orderBy:
        searchParams.get(PRODUCT_SEARCH_PARAMS.ORDER_BY) || "createdAt:desc",
    });

    if (!searchParamsValidation.success) {
      return NextResponse.json(
        {
          message: "Validation error",
          error: searchParamsValidation.error,
        },
        { status: 400 }
      );
    }

    const { search, page, perPage, category, orderBy } =
      searchParamsValidation.data;

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

    return NextResponse.json(
      {
        data: products.map(productFormatter),
        page,
        perPage,
        numberPages,
        total: totalCount,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}

export const POST = auth(async function POST(request) {
  try {
    const { auth: session } = request;

    if (!session) {
      return UnauthenticatedError();
    }

    const body = await request.json();

    const productDataValidation = productDataSchema.safeParse({
      name: body.name,
      category: body.category,
      price: body.price,
      description: body.description,
      imageUrl: body.imageUrl,
    });

    if (!productDataValidation.success) {
      return ValidationError(productDataValidation.error);
    }

    const productData = productDataValidation.data;

    const product = await db.product.upsert({
      create: { ...productData },
      update: { ...productData },
      where: {
        id: productData.id,
      },
    });

    return NextResponse.json(
      {
        message: "Product created successfully",
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    return InternalServerError(error);
  }
});
