/*
  Warnings:

  - You are about to alter the column `amount` on the `Expenses` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Expenses" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;
