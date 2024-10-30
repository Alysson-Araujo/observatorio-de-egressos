/* Já foi construído o modelo no Metabase*/
WITH possiveis_respostas AS (
  SELECT '1 salário mínimo' AS resposta
  UNION ALL
  SELECT 'Entre 2 a 4 salários mínimos'
  UNION ALL
  SELECT 'Entre 5 a 7 salários mínimos'
  UNION ALL
  SELECT 'Entre 8 e 10 salários mínimos'
  UNION ALL
  SELECT 'Mais de 10 salários mínimos'
)

SELECT
  pr.resposta AS resposta_possivel,
  COUNT(sa."faixaSalarial") AS quantidade
FROM
  possiveis_respostas pr
LEFT JOIN
  surveys_answered sa
ON
  pr.resposta = sa."faixaSalarial"
GROUP BY
  pr.resposta