import { FormatDataSheet } from "../../interfaces/surveyInterface";
import prismaClient from "../../prisma";
import { FindEgressosByEmail } from "../egresso/FindEgressosByEmail";
import { GetAllSurveysService } from "../survey/GetAllSurveysService";
import { convertExcelToJSON, downloadPlanilha } from "./DownloadPlanilha";
import { FindOneEgressoByNameAndYearEntry } from "../egresso/FindOneEgressoByNameAndYearEntry";
import { FindOneEgressoByEmail } from "../egresso/FindOneEgressoByEmail";
import { FindManyEgressosService } from "../egresso/FindManyEgressos";
import { getMostRecentFile } from "../../config/learingPdf";
import path from "path";

interface Egressos {
  id: string;
    name: string;
    email: string;
    year_of_entry: string;
    matricula: string;
    course: string;
}

class AddSurveyAnsweredService {
  async execute() {
    try {
      const getAllSurveysService = new GetAllSurveysService();
      const findEgressosByEmail = new FindEgressosByEmail();
      const findEgressoByEmailAndYearEntry =
        new FindOneEgressoByNameAndYearEntry();
      const findOneEgressoByEmail = new FindOneEgressoByEmail();
      const surveys = await getAllSurveysService.execute();
      const regexAnoDeIngresso = /\b\d{4}\.[12]\b/g;
      const regexEmail = /^\S+@\S+\.\S+$/;

      if (surveys.length === 0) {
        throw new Error("Não há surveys cadastrados no banco de dados");
      } else {
        for (const survey of surveys) {
          console.log(survey.linkSheet);
          await downloadPlanilha(survey.linkSheet);
          const sheetDir = path.resolve(
            __dirname,
            "..",
            "..",
            "..",
            "tmp",
            "respostas_surveys"
          );
          const dir = getMostRecentFile(sheetDir);
          console.log(dir);
          
          const dadosSurveyJson = await convertExcelToJSON(
            `./tmp/respostas_surveys/${dir?.file}`
          );
          const respostasSurveyTratadas = await this.transformData(
            dadosSurveyJson
          );
          //Primeira etapa: Separar os emails dos egressos que responderam o survey
          const emailsCombinados = respostasSurveyTratadas.map((resposta) => {
            return {
              nomeCompleto:
                resposta["Qual é o seu nome completo?"].toUpperCase(),
              emailAtual:
                resposta[
                  "Digite seu e-mail (o mesmo que você recebeu este formulário)"
                ].toLowerCase(),
              emailNovo:
                resposta[
                  "Além do e-mail informado acima, você possui outro por onde deseja receber futuras comunicações das coordenações de curso da UFC-Quixadá?"
                ].toLowerCase(),
              anoIngresso:
                resposta[
                  "2. Qual o ano e semestre que você ingressou na UFC - Quixadá?"
                ],
            };
          });

          for (const egresso of emailsCombinados) {
            console.log(
              egresso.nomeCompleto,
              egresso.emailAtual,
              egresso.anoIngresso
            );

            const egressoExists = await findOneEgressoByEmail.execute(
              egresso.emailAtual.toLowerCase()
            );
            if (!egressoExists) {
              const confirmEgressoExists =
                await findEgressoByEmailAndYearEntry.execute(
                  egresso.nomeCompleto.toUpperCase(),
                  egresso.anoIngresso
                );
              if (confirmEgressoExists) {
                const findManyEgressosService = new FindManyEgressosService();
                const allEgressos = await findManyEgressosService.execute();

                const onlyEgresso = allEgressos.filter(
                  (egressoFind: Egressos) =>
                    egressoFind.name === egresso.nomeCompleto.toUpperCase() &&
                    egressoFind.year_of_entry === egresso.anoIngresso
                );

                if (onlyEgresso.length === 1) {
                  await prismaClient.egresso.update({
                    where: {
                      id: onlyEgresso[0].id,
                    },
                    data: {
                      email: egresso.emailAtual.toLowerCase(),
                    },
                  });
                }
              }
            }
          }
          //Segunda etapa: Analisar se o email do egresso já está cadastrado no banco de dados

          const existingEgressos = await findEgressosByEmail.execute(
            emailsCombinados.map((email) => email.emailAtual.toLowerCase())
          );

          for (const egressos of existingEgressos) {
            const egresso = respostasSurveyTratadas.find(
              (resposta) =>
                resposta[
                  "Digite seu e-mail (o mesmo que você recebeu este formulário)"
                ] === egressos.email.toLowerCase()
            );
            console.log(egresso);
            if (egresso && egressos.participatedInTheResearch === false) {
              const fixAnoIngresso =
                egresso[
                  "2. Qual o ano e semestre que você ingressou na UFC - Quixadá?"
                ].match(regexAnoDeIngresso);
              const fixAnoConclusao =
                egresso[
                  "3. Qual foi o ano de conclusão do curso que você fez na UFC - Campus Quixadá?"
                ].match(regexAnoDeIngresso);

              if (fixAnoIngresso) {
                egresso[
                  "2. Qual o ano e semestre que você ingressou na UFC - Quixadá?"
                ] = fixAnoIngresso[0];
              }

              if (fixAnoConclusao) {
                egresso[
                  "3. Qual foi o ano de conclusão do curso que você fez na UFC - Campus Quixadá?"
                ] = fixAnoConclusao[0];
              }

              if (
                regexEmail.test(
                  egresso[
                    "Além do e-mail informado acima, você possui outro por onde deseja receber futuras comunicações das coordenações de curso da UFC-Quixadá?"
                  ]
                )===false
              ) {
                egresso[
                  "Além do e-mail informado acima, você possui outro por onde deseja receber futuras comunicações das coordenações de curso da UFC-Quixadá?"
                ] = "";
              }

              await prismaClient.survey_Answered.create({
                data: {
                  egressoId: egressos.id,
                  surveyId: survey.id,
                  nomeCompleto:
                    egresso["Qual é o seu nome completo?"].toUpperCase(),
                  emailRecebeuFormulario:
                    egresso[
                      "Digite seu e-mail (o mesmo que você recebeu este formulário)"
                    ].toLowerCase(),
                  emailNovoParaFormulario:
                    egresso[
                      "Além do e-mail informado acima, você possui outro por onde deseja receber futuras comunicações das coordenações de curso da UFC-Quixadá?"
                    ].toLowerCase(),
                  cursoDeGraduacaoFinalizado:
                    egresso[
                      "1. Qual curso de graduação você finalizou na Universidade Federal do Ceará - Campus Quixadá?"
                    ],
                  anoDeIngresso:
                    egresso[
                      "2. Qual o ano e semestre que você ingressou na UFC - Quixadá?"
                    ],
                  anoDeConclusao:
                    egresso[
                      "3. Qual foi o ano de conclusão do curso que você fez na UFC - Campus Quixadá?"
                    ],
                  quantidadeDeSemestres:
                    egresso[
                      "4. Quantos semestres você precisou para concluir o curso?"
                    ],
                  duranteGraduacaoTrabalhandoEstagiando:
                    egresso[
                      "5. Durante a graduação, você já estava trabalhando ou estagiando em uma área relacionada ao curso que você se graduou?"
                    ],
                  cursoAjudouEAjudaEmpregoAtual:
                    egresso[
                      "6. O curso me ajudou, e ainda ajuda, com minhas atividades no meu atual emprego?"
                    ],
                  encontreiEmpregoRapidamenteConcluidoCurso:
                    egresso[
                      "7. Eu encontrei, rapidamente, um emprego na área relacionada ao curso de graduação após ter o concluído?"
                    ],
                  estouTrabalhandoAtualmenteFormacaoAcademica:
                    egresso[
                      "8. Atualmente, estou trabalhando na área da minha formação acadêmica?"
                    ],
                  areasDeTrabalhoFormacao: egresso["[object Object]"]
                    ? egresso["[object Object]"].split(", ")
                    : ["Não está trabalhando atualmente"],
                  faixaSalarial:
                    egresso[
                      "10. Se você estiver trabalhando, qual faixa de salário você possui atualmente?"
                    ],
                  estaRealizandoPosGraduacao:
                    egresso[
                      "11. Atualmente, você está realizando algo na área acadêmica como mestrado ou doutorado que esteja relacionado com a sua área de formação?"
                    ],
                  empresaTrabalhandoAtualmente:
                    egresso[
                      "12. Em qual empresa você está trabalhando atualmente?"
                    ],
                  cargoAtualNaEmpresa:
                    egresso[
                      "13. Qual o cargo que você ocupa atualmente nesta empresa?"
                    ] !== `{""}`
                      ? egresso[
                          "13. Qual o cargo que você ocupa atualmente nesta empresa?"
                        ]
                      : null,
                  linkPefilLinkedin:
                    egresso[
                      "14. Você possui uma página no LinkedIn? Se sim, informe-a abaixo."
                    ].hyperlink,
                  avaliacaoInfraestruturaCursoDuranteGraduacao:
                    egresso[
                      "15. Como você avalia a infraestrutura disponível para o curso durante a sua graduação?"
                    ],
                  avaliacaoCorpoDocenteCursoDuranteGraducacao:
                    egresso[
                      "16. Como você avalia ao corpo docente do curso que você teve contato durante a sua graduação?"
                    ],
                  avaliacaoDedicacaoCursoDuranteGraduacao:
                    egresso[
                      "17. Como você avalia a sua dedicação ao curso durante a graduação?"
                    ],
                  comentariosSobreOCursoDuranteGraduacao:
                    egresso[
                      "19. Utilize o espaço abaixo para deixar alguma sugestão e/ou crítica sobre a formação recebida durante a graduação. São sempre bem-vindas."
                    ],
                  AvaliacaoEstruturaCurricularDoCursoConcluido:
                    egresso[
                      "18. Como você avalia a estrutura curricular (disciplinas e atividades) do curso que você realizou?"
                    ],
                  data_survey: egresso["Carimbo de data/hora"],
                },
              });
              await prismaClient.egresso.update({
                where: {
                  email: egressos.email.toLowerCase(),
                },
                data: {
                  participatedInTheResearch: true,
                  year_of_conclusion:
                    egresso[
                      "3. Qual foi o ano de conclusão do curso que você fez na UFC - Campus Quixadá?"
                    ],
                },
              });
              // Terceira etapa: Verificar se o egresso colocou um email novo para receber futuras comunicações
              if (
                egresso[
                  "Além do e-mail informado acima, você possui outro por onde deseja receber futuras comunicações das coordenações de curso da UFC-Quixadá?"
                ] !== "" &&
                regexEmail.test(
                  egresso[
                    "Além do e-mail informado acima, você possui outro por onde deseja receber futuras comunicações das coordenações de curso da UFC-Quixadá?"
                  ].toLowerCase()
                )
              ) {
                // Quarta etapa: Verificar se o email novo já está cadastrado no banco de dados

                const existingEgressosNovos =
                  await findOneEgressoByEmail.execute(
                    egresso[
                      "Além do e-mail informado acima, você possui outro por onde deseja receber futuras comunicações das coordenações de curso da UFC-Quixadá?"
                    ]
                  );
                if (existingEgressosNovos === null) {
                  // Quinta etapa: Atualizar o email do egresso no banco de dados (só fazer depois de cadastrar as respostas do survey)

                  await prismaClient.egresso.update({
                    where: {
                      email:
                        egresso[
                          "Digite seu e-mail (o mesmo que você recebeu este formulário)"
                        ].toLowerCase(),
                    },
                    data: {
                      email:
                        egresso[
                          "Além do e-mail informado acima, você possui outro por onde deseja receber futuras comunicações das coordenações de curso da UFC-Quixadá?"
                        ].toLowerCase(),
                    },
                  });
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Erro ao carregar o JSON:", error);
    }
  }

  async transformData(jsonData: string): Promise<FormatDataSheet[]> {
    try {
      const objeto = JSON.parse(jsonData) as FormatDataSheet[];
      return objeto;
    } catch (parseError) {
      throw parseError;
    }
  }
}

export { AddSurveyAnsweredService };
