/* Já foi construído o modelo no Metabase*/
WITH possiveis_respostas AS (
  SELECT 'Excelente' AS resposta
  UNION ALL
  SELECT 'Bom'
  UNION ALL
  SELECT 'Regular'
  UNION ALL
  SELECT 'Ruim'
)

SELECT
  pr.resposta AS resposta_possivel,
  COUNT(sa."avaliacaoCorpoDocenteCursoDuranteGraducacao") AS quantidade
FROM
  possiveis_respostas pr
LEFT JOIN
  surveys_answered sa
ON
  pr.resposta = sa."avaliacaoCorpoDocenteCursoDuranteGraducacao"
GROUP BY
  pr.resposta