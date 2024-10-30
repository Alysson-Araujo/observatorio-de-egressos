/* Já foi construído o modelo no Metabase*/
WITH possiveis_respostas AS (
  SELECT 'Engenharia de Software' AS resposta
  UNION ALL
  SELECT 'Ciência da Computação'
  UNION ALL
  SELECT 'Sistemas de Informação'
  UNION ALL
  SELECT 'Engenharia de Computação'
  UNION ALL
  SELECT 'Design Digital'
  UNION ALL
  SELECT 'Redes de Computadores'
)

SELECT
  pr.resposta AS resposta_possivel,
  COUNT(sa."cursoDeGraduacaoFinalizado") AS quantidade
FROM
  possiveis_respostas pr
LEFT JOIN
  surveys_answered sa
ON
  pr.resposta = sa."cursoDeGraduacaoFinalizado"
GROUP BY
  pr.resposta
