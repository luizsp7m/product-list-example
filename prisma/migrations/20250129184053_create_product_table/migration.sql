-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('FASHION_AND_ACCESSORIES', 'ELECTRONICS', 'HOME_AND_DECOR', 'SPORTS_AND_OUTDOORS', 'BEAUTY_AND_HEALTH', 'BABY_AND_KIDS', 'AUTOMOTIVE', 'FOOD');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "ProductCategory" NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
