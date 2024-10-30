import { SurveyCreate, SurveyRequest } from "../../interfaces/surveyInterface";
import prismaClient from "../../prisma";

class AddSurveyService {
  async execute({
    linkSurvey,
        linkSheet,
        surveyType,
        courseName,
        dateEnd,
        dateSent,
        textEmail
  }: SurveyRequest) {
    
    const dateEndFormatted = new Date(dateEnd);
    const dateSentFormatted = new Date(dateSent);
    console.log("asfasasfasfasf")
    const survey = await prismaClient.survey.create({
      data: {
        linkSurvey,
        linkSheet,
        surveyType,
        courseName,
        dateEnd: dateEndFormatted,
        dateSent: dateSentFormatted,
        textEmail
      },
    });
    return survey;
  }
}

export { AddSurveyService };
