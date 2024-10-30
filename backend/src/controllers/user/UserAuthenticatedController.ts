import { Request, Response } from "express";
import { GetAllSurveysService } from "../../services/survey/GetAllSurveysService";

class UserAuthenticatedController {
  async handle(req: Request, res: Response) {
    try {
        console.log("Usuário não encontrado");
        const user_id = req.user_id;
        if(user_id == undefined || user_id == null){
            return res.status(400).json({ message: "Usuário não encontrado" });
        }
        else
        {
            return res.status(200).json({ message: "Usuário autenticado com sucesso!" });
        }
  }
  catch (error) {
    return res.json({ message: "ocorreu um erro", error: error });
  }
}
}
export { UserAuthenticatedController };