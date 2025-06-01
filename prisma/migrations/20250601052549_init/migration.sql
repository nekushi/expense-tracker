-- CreateEnum
CREATE TYPE "Category" AS ENUM ('food', 'transportation', 'utilities', 'entertainment', 'health', 'education', 'shopping', 'savings', 'others');

-- CreateTable
CREATE TABLE "Expenses" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "category" "Category" NOT NULL DEFAULT 'others',
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("id")
);
