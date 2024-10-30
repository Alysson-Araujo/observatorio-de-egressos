enum SurveyType {
  NewEgresso = "NewEgresso",
  UpdateEgresso = "UpdateEgresso",
}

export interface SurveyRequest {
  linkSurvey: string;
  linkSheet: string;
  surveyType: SurveyType;
  timeAvailable?: number; // Time in days
  courseName: courseName;
  textEmail: any;
  dateSent: string;
  dateEnd: string;
}



export interface SurveyCreate {
  linkSurvey: string;
  linkSheet: string;
  surveyType: SurveyType;
  timeAvailable: number; // Time in days
  courseName: courseName;
  textEmail?: string;
  dateEndFormatted: Date;
  dateSentFormatted: Date;
}


enum courseName {
  EngenhariaDeSoftware = "EngenhariaDeSoftware",
  CienciaDaComputacao = "CienciaDaComputacao",
  SistemasDeInformacao = "SistemasDeInformacao",
  EngenhariaDaComputacao = "EngenhariaDaComputacao",
  DesignDigital = "DesignDigital",
  RedesDeComputadores = "RedesDeComputadores",
}

interface SurveyAnsweredSheet {
  egressoId: string;
  surveyId: string;
  nomeCompleto: string;
  emailRecebeuFormulario: string;
  emailNovoParaFormulario?: string | null;
  cursoDeGraduacaoFinalizado: string;
  anoDeIngresso: string;
  anoDeConclusao: string;
  quantidadeDeSemestres: string;
  duranteGraduacaoTrabalhandoEstagiando: string;
  cursoAjudouEAjudaEmpregoAtual: string;
  encontreiEmpregoRapidamenteConcluidoCurso: string;
  estouTrabalhandoAtualmenteFormacaoAcademica: string;
  areasDeTrabalhoFormacao: string[] | null;
  faixaSalarial?: string | null;
  estaRealizandoPosGraduacao: string;
  empresaTrabalhandoAtualmente?: string | null;
  cargoAtualNaEmpresa?: string | null;
  linkPefilLinkedin?: LinkFormat | null;
  avaliacaoInfraestruturaCursoDuranteGraduacao: string;
  avaliacaoCorpoDocenteCursoDuranteGraducacao: string;
  avaliacaoDedicacaoCursoDuranteGraduacao: string;
  comentariosSobreOCursoDuranteGraduacao?: string | null;
  AvaliacaoEstruturaCurricularDoCursoConcluido: string;
  data_survey?: Date;
}

interface LinkFormat {
  hyperlink: string;
}

export interface FormatDataSheet {
  "Carimbo de data/hora": string;
  "[object Object]": string;
  "Qual é o seu nome completo?": string;
  "Digite seu e-mail (o mesmo que você recebeu este formulário)": string;
  "Além do e-mail informado acima, você possui outro por onde deseja receber futuras comunicações das coordenações de curso da UFC-Quixadá?": string;
  "1. Qual curso de graduação você finalizou na Universidade Federal do Ceará - Campus Quixadá?": string;
  "2. Qual o ano e semestre que você ingressou na UFC - Quixadá?": string;
  "3. Qual foi o ano de conclusão do curso que você fez na UFC - Campus Quixadá?": string;
  "4. Quantos semestres você precisou para concluir o curso?": number;
  "5. Durante a graduação, você já estava trabalhando ou estagiando em uma área relacionada ao curso que você se graduou?": string;
  "6. O curso me ajudou, e ainda ajuda, com minhas atividades no meu atual emprego?": string;
  "7. Eu encontrei, rapidamente, um emprego na área relacionada ao curso de graduação após ter o concluído?": string;
  "8. Atualmente, estou trabalhando na área da minha formação acadêmica?": string;
  "10. Se você estiver trabalhando, qual faixa de salário você possui atualmente?": string;
  "11. Atualmente, você está realizando algo na área acadêmica como mestrado ou doutorado que esteja relacionado com a sua área de formação?": string;
  "12. Em qual empresa você está trabalhando atualmente?": string;
  "13. Qual o cargo que você ocupa atualmente nesta empresa?": string;
  "14. Você possui uma página no LinkedIn? Se sim, informe-a abaixo.": LinkFormat;
  "15. Como você avalia a infraestrutura disponível para o curso durante a sua graduação?": string;
  "16. Como você avalia ao corpo docente do curso que você teve contato durante a sua graduação?": string;
  "17. Como você avalia a sua dedicação ao curso durante a graduação?": string;
  "18. Como você avalia a estrutura curricular (disciplinas e atividades) do curso que você realizou?": string;
  "19. Utilize o espaço abaixo para deixar alguma sugestão e/ou crítica sobre a formação recebida durante a graduação. São sempre bem-vindas.": string;
  Pontuação: string;
}
