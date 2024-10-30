/*
  Warnings:

  - Added the required column `courseName` to the `surveys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "surveys" ADD COLUMN     "courseName" TEXT NOT NULL;
