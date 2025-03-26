/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Team_email_key" ON "Team"("email");
