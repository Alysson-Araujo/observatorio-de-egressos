-- CreateTable
CREATE TABLE "surveys_answered" (
    "id" TEXT NOT NULL,
    "egressoId" TEXT NOT NULL,
    "surveyId" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "emailRecebeuFormulario" TEXT NOT NULL,
    "emailNovoParaFormulario" TEXT,
    "cursoDeGraduacaoFinalizado" TEXT NOT NULL,
    "anoDeIngresso" TEXT NOT NULL,
    "anoDeConclusao" TEXT NOT NULL,
    "quantidadeDeSemestres" TEXT NOT NULL,
    "duranteGraduacaoTrabalhandoEstagiando" TEXT NOT NULL,
    "cursoAjudouEAjudaEmpregoAtual" TEXT NOT NULL,
    "encontreiEmpregoRapidamenteConcluidoCurso" TEXT NOT NULL,
    "estouTrabalhandoAtualmenteFormacaoAcademica" TEXT NOT NULL,
    "areasDeTrabalhoFormacao" TEXT[],
    "faixaSalarial" TEXT,
    "estaRealizandoPosGraduacao" TEXT NOT NULL,
    "empresaTrabalhandoAtualmente" TEXT,
    "cargoAtualNaEmpresa" TEXT,
    "linkPefilLinkedin" TEXT,
    "avaliacaoInfraestruturaCursoDuranteGraduacao" TEXT NOT NULL,
    "avaliacaoCorpoDocenteCursoDuranteGraducacao" TEXT NOT NULL,
    "avaliacaoDedicacaoCursoDuranteGraduacao" TEXT NOT NULL,
    "comentariosSobreOCursoDuranteGraduacao" TEXT,
    "AvaliacaoEstruturaCurricularDoCursoConcluido" TEXT NOT NULL,
    "data_survey" TIMESTAMP,

    CONSTRAINT "surveys_answered_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "surveys_answered" ADD CONSTRAINT "surveys_answered_egressoId_fkey" FOREIGN KEY ("egressoId") REFERENCES "egressos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surveys_answered" ADD CONSTRAINT "surveys_answered_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
