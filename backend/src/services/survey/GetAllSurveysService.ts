import prismaClient from "../../prisma";

class GetAllSurveysService {
  async execute() {
    const surveys = await prismaClient.survey.findMany({
      select:{
        id: true,
        linkSheet: true,
        linkSurvey: true,
        timeAvailable: true,
        created_at: true,
        courseName: true,
        surveyType: true,
        dateSent: true,
        dateEnd: true,
        survey_answered: {
          select:{
            id: true,
          }
        }
      }
    });
    return surveys;
  }
}

export { GetAllSurveysService };