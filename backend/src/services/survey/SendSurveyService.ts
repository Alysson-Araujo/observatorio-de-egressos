import { Request, Response } from "express";
import {
  NodemailerMailAdapterSendSurveyEgressoNew,
  NodemailerMailAdapterSendSurveyEgressoUpdate,
} from "../../adapters/nodemailer-mail-adapter";
import { SurveyRequest } from "../../interfaces/surveyInterface";
import { FindEgressoyByParticipatedInTheResearchService } from "../egresso/FindEgressoByParticipatedInTheResearchService";

class SendSurveyService {
  async sendSurvey( req:Request) {
    try {
      const { linkSurvey, surveyType,textEmail }: SurveyRequest = req.body;

      const findEgressoyByParticipatedInTheResearchService =
        new FindEgressoyByParticipatedInTheResearchService();

      if (surveyType === "NewEgresso") {
        const egressos =
          await findEgressoyByParticipatedInTheResearchService.execute(false);

        if (egressos.length > 0) {
          const listEgressosEmails = egressos.map((egresso: { email: string }): string => egresso.email);
          const nodemailerMailAdapterSendSurveyEgressoNew =
            new NodemailerMailAdapterSendSurveyEgressoNew();
          await nodemailerMailAdapterSendSurveyEgressoNew.sendMail(
            linkSurvey,
            listEgressosEmails,
            textEmail
          );
          return true;
        }
      }
      if (surveyType === "UpdateEgresso") {
        const egressos =
          await findEgressoyByParticipatedInTheResearchService.execute(true);
          
        if (egressos.length > 0) {
          const listEgressosEmails = egressos.map((egresso: { email: string }): string => egresso.email);
          const nodemailerMailAdapterSendSurveyEgressoUpdate =
            new NodemailerMailAdapterSendSurveyEgressoUpdate();
          await nodemailerMailAdapterSendSurveyEgressoUpdate.sendMail(
            linkSurvey,
            listEgressosEmails,
            textEmail
          );
          return true;
        }
      }
      return false;
    } catch (error: any) {
      return new Error(error.message);
    }
  }
}

export { SendSurveyService };
