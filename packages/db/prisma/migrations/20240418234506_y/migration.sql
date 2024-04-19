-- CreateTable
CREATE TABLE "GHData" (
    "email" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "GHData_pkey" PRIMARY KEY ("email")
);

-- AddForeignKey
ALTER TABLE "GHData" ADD CONSTRAINT "GHData_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
