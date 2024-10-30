/*
  Warnings:

  - Changed the type of `courseName` on the `surveys` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CourseName" AS ENUM ('EngenhariaDeSoftware', 'CienciaDaComputacao', 'SistemasDeInformacao', 'EngenhariaDaComputacao', 'DesignDigital', 'RedesDeComputadores');

-- AlterTable
ALTER TABLE "surveys" DROP COLUMN "courseName",
ADD COLUMN     "courseName" "CourseName" NOT NULL;
