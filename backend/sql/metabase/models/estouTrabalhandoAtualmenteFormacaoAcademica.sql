

/* Já foi construído o modelo no Metabase*/
WITH possiveis_respostas AS (
  SELECT 'Sim.' AS resposta
  UNION ALL
  SELECT 'Não.'
  UNION ALL
  SELECT 'No momento, não estou trabalhando'
)

SELECT
  pr.resposta AS resposta_possivel,
  COUNT(sa."estouTrabalhandoAtualmenteFormacaoAcademica") AS quantidade
FROM
  possiveis_respostas pr
LEFT JOIN
  surveys_answered sa
ON
  pr.resposta = sa."estouTrabalhandoAtualmenteFormacaoAcademica"
GROUP BY
  pr.resposta
