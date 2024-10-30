import { Request, Response } from "express";
import { FindUserByEmail } from "../../services/user/FindUserByEmail";
import { ForgotPasswordService } from "../../services/user/ForgotPasswordService";

class ForgotPasswordController {
  async handle(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (email == undefined || email == null) {
        return res.status(400).json({ message: "Email não informado" });
      } else {
          const findUserByEmail = new FindUserByEmail();
          const user = await findUserByEmail.execute(email);
          
          if(user == null || undefined){
              return res.status(400).json({ message: "Não foi possível solicitar a redefinição de senha. Email não encontrado." });
          }
          else{
            const forgotPaswordService = new ForgotPasswordService();
            await forgotPaswordService.execute(user);
            return res.status(200).json({ message: "Solicitação de redefinição de senha enviada com sucesso." });
          }
      }
    } catch (error) {
      return res.json({ message: "ocorreu um erro", error: error });
    }
  }
}

export { ForgotPasswordController };