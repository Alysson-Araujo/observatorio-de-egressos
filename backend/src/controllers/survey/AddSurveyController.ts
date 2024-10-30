import { Request, Response } from "express";
import { AddSurveyService } from "../../services/survey/AddSurveyService";
import { SurveyRequest } from "../../interfaces/surveyInterface";
import { SendSurveyService } from "../../services/survey/SendSurveyService";

class AddSurveyController {
  async handle(req: Request, res: Response) {
    try {
      const {
        linkSurvey,
        linkSheet,
        surveyType,
        timeAvailable,
        courseName,
        dateEnd,
        dateSent,
        textEmail,
      }: SurveyRequest = req.body;


      const addSurveyService = new AddSurveyService();
        console.log("passou aqui 1")
      const survey = await addSurveyService.execute({
        linkSurvey,
        linkSheet,
        surveyType,
        timeAvailable,
        courseName,
        dateEnd,
        dateSent,
        textEmail,
      });
      console.log(survey)
      console.log("passou aqui 2")
      if (!survey) {
        return res
          .status(400)
          .json({ message: "Não foi possível registrar um survey!" });
      } 
      else {
        const sendSurveyService = new SendSurveyService();
        const sended = await sendSurveyService.sendSurvey(req);
        if (!sended) {
          return res
            .status(400)
            .json({
              message:
                "O survey foi cadastrado, mas não foi enviado aos egressos!",
            });
        }

        return res
          .status(201)
          .json({
            message: "Survey registrado e enviado aos egressos com sucesso!",
            survey,
          });
      }
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Ocorreu um erro", error: error.message });
    }
  }
}

export { AddSurveyController };