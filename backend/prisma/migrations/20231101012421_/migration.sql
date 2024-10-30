/*
  Warnings:

  - You are about to drop the column `emailText` on the `surveys` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "surveys" DROP COLUMN "emailText",
ADD COLUMN     "textEmail" TEXT;
