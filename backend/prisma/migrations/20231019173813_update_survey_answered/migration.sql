/*
  Warnings:

  - Changed the type of `quantidadeDeSemestres` on the `surveys_answered` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "surveys_answered" DROP COLUMN "quantidadeDeSemestres",
ADD COLUMN     "quantidadeDeSemestres" INTEGER NOT NULL;
