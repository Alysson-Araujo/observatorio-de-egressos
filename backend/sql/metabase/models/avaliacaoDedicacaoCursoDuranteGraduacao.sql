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
  COUNT(sa."avaliacaoDedicacaoCursoDuranteGraduacao") AS quantidade
FROM
  possiveis_respostas pr
LEFT JOIN
  surveys_answered sa
ON
  pr.resposta = sa."avaliacaoDedicacaoCursoDuranteGraduacao"
GROUP BY
  pr.resposta