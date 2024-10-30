/* Não foi utilizada no Metabase*/
WITH possiveis_respostas AS (
  SELECT 'Sim, doutorado ou pós-doutorado.' AS resposta
  UNION ALL
  SELECT 'Sim, mestrado.'
  UNION ALL
  SELECT 'Não estou realizando algo na área acadêmica.'
)

SELECT
  pr.resposta AS resposta_possivel,
  COUNT(sa."estaRealizandoPosGraduacao") AS quantidade
FROM
  possiveis_respostas pr
LEFT JOIN
  surveys_answered sa
ON
  pr.resposta = sa."estaRealizandoPosGraduacao"
GROUP BY
  pr.resposta