-- CreateEnum
CREATE TYPE "SurveyType" AS ENUM ('NewEgresso', 'UpdateEgresso');

-- CreateTable
CREATE TABLE "surveys" (
    "id" TEXT NOT NULL,
    "linkSurvey" TEXT NOT NULL,
    "linkSheet" TEXT NOT NULL,
    "surveyType" "SurveyType" NOT NULL,
    "timeAvailable" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "surveys_pkey" PRIMARY KEY ("id")
);
