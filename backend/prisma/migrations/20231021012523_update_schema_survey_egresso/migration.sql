/*
  Warnings:

  - Changed the type of `courseName` on the `surveys` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "egressos" ADD COLUMN     "course" TEXT NOT NULL DEFAULT 'Engenharia de Software';

-- AlterTable
ALTER TABLE "surveys" DROP COLUMN "courseName",
ADD COLUMN     "courseName" TEXT NOT NULL;
