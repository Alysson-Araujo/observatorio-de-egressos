import { Request, Response } from "express";
import { GetAllSurveysService } from "../../services/survey/GetAllSurveysService";

class GetAllSurveysController {
  async handle(req: Request, res: Response) {
    try {
        const getAllSurveysService = new GetAllSurveysService();
        const listSurveys = await getAllSurveysService.execute();

        if (!listSurveys) {
            return res.status(400).json({ message: "Não foi possível buscar os históricos de surveys" });
        } else {
            return res.status(200).json(listSurveys);
        }
    } catch (error: any) {
        return res.status(500).json({ message: "Ocorreu um erro", error: error.message });
    }
  }
}

export { GetAllSurveysController };