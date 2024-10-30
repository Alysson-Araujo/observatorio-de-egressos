import { Request, Response } from "express";
import { FindUserByEmail } from "../../services/user/FindUserById";
import { RedefinePasswordService } from "../../services/user/RedefinePasswordService";

class RedefinePasswordController {
  async handle(req: Request, res: Response) {
    try {
      const email = req.user_email
      const password = req.body.password
    
      const findUser = new FindUserByEmail();
        const user = await findUser.execute(email);

        if (user == null || undefined) {
          return res.status(400).json({ message: "Usuário não encontrado" });
        }
        else {
            const redefinePasswordService = new RedefinePasswordService();
            await redefinePasswordService.execute(email,password);
            return res.status(200).json({ message: "Senha alterada com sucesso." });
        }
    } catch (error) {
      return res.status(400).json({ message: "ocorreu um erro", error: error });
    }
  }
}

export { RedefinePasswordController };

