-- CreateTable
CREATE TABLE "egressos" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "year_of_entry" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "egressos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "egressos_email_key" ON "egressos"("email");

-- CreateIndex
CREATE UNIQUE INDEX "egressos_matricula_key" ON "egressos"("matricula");
