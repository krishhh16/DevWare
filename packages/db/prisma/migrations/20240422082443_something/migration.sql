/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `GHData` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserInsights_email_key";

-- DropIndex
DROP INDEX "UserOnboard_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "GHData_email_key" ON "GHData"("email");
