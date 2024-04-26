/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "KnowledgeBase" (
    "email" TEXT NOT NULL,
    "post" TEXT,
    "resume" TEXT,

    CONSTRAINT "KnowledgeBase_pkey" PRIMARY KEY ("email")
);
