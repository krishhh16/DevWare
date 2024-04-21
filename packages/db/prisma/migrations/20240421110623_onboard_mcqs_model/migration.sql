-- CreateTable
CREATE TABLE "Post" (
    "email" TEXT NOT NULL,
    "post" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "UserOnboard" (
    "email" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "UserOnboard_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserOnboard_email_key" ON "UserOnboard"("email");
