WITH possiveis_respostas AS (
  SELECT 'Excelente' AS resposta
  UNION ALL
  SELECT 'Bom'
  UNION ALL
  SELECT 'Regular'
  UNION ALL
  SELECT 'Ruim'
),

anos_de_ingresso AS (
  SELECT DISTINCT "anoDeIngresso" FROM surveys_answered
)

SELECT
  pr.resposta AS Avaiação,
  ai."anoDeIngresso" AS "ano de ingresso",
  COALESCE(COUNT(sa."avaliacaoCorpoDocenteCursoDuranteGraducacao"), 0) AS quantidade
FROM
  possiveis_respostas pr
CROSS JOIN
  anos_de_ingresso ai
LEFT JOIN
  surveys_answered sa
ON
  pr.resposta = sa."avaliacaoCorpoDocenteCursoDuranteGraducacao"
  AND ai."anoDeIngresso" = sa."anoDeIngresso"
GROUP BY
  pr.resposta, ai."anoDeIngresso"
ORDER BY
  ai."anoDeIngresso"
