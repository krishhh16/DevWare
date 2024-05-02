/*
  Warnings:

  - You are about to drop the column `isFeedback` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isFeedback";

-- CreateTable
CREATE TABLE "Feedback" (
    "email" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "UserInsights" (
    "email" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "UserInsights_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserInsights_email_key" ON "UserInsights"("email");

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInsights" ADD CONSTRAINT "UserInsights_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
