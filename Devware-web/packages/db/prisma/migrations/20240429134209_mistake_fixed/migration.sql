/*
  Warnings:

  - The primary key for the `Feedback` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `GHData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `KnowledgeBase` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserInsights` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserOnboard` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[email]` on the table `UserInsights` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `UserOnboard` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Feedback` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `GHData` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `KnowledgeBase` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `UserInsights` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `UserOnboard` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "GHData" DROP CONSTRAINT "GHData_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "GHData_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "KnowledgeBase" DROP CONSTRAINT "KnowledgeBase_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "KnowledgeBase_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "UserInsights" DROP CONSTRAINT "UserInsights_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "UserInsights_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserOnboard" DROP CONSTRAINT "UserOnboard_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "UserOnboard_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "post" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserInsights_email_key" ON "UserInsights"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserOnboard_email_key" ON "UserOnboard"("email");
