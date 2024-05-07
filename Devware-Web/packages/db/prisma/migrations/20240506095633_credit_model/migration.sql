/*
  Warnings:

  - The primary key for the `Credit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Credit` table. All the data in the column will be lost.
  - The `credit` column on the `Credit` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Credit" DROP CONSTRAINT "Credit_pkey",
DROP COLUMN "id",
DROP COLUMN "credit",
ADD COLUMN     "credit" INTEGER NOT NULL DEFAULT 0,
ADD CONSTRAINT "Credit_pkey" PRIMARY KEY ("email");
