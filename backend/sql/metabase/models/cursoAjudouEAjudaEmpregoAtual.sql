/* Já foi construído o modelo no Metabase*/
WITH possiveis_respostas AS (
  SELECT 'Concordo totalmente' AS resposta
  UNION ALL
  SELECT 'Concordo parcialmente'
  UNION ALL
  SELECT 'Não concordo nem discordo'
  UNION ALL
  SELECT 'Discordo'
  UNION ALL
  SELECT 'Discordo totalmente'
)

SELECT
  pr.resposta AS resposta_possivel,
  COUNT(sa."cursoAjudouEAjudaEmpregoAtual") AS quantidade
FROM
  possiveis_respostas pr
LEFT JOIN
  surveys_answered sa
ON
  pr.resposta = sa."cursoAjudouEAjudaEmpregoAtual"
GROUP BY
  pr.resposta