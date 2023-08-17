/*
  Warnings:

  - You are about to alter the column `condition` on the `Condition` table. The data in that column could be lost. The data in that column will be cast from `Decimal(1,1)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Condition" ALTER COLUMN "condition" SET DATA TYPE INTEGER;
