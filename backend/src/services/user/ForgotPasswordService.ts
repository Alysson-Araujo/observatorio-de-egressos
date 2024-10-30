import { NodemailerMailAdapterForgotPassword } from "../../adapters/nodemailer-mail-adapter";
import { UserInterface } from "../../interfaces/UserInterface";
import jwt from "jsonwebtoken";

class ForgotPasswordService {
  public async execute(user: UserInterface): Promise<void> {
    try {
      // Chave secreta para assinar o token (mantenha-a segura)
      const secretKey = process.env.JWT_SECRET;
      
      // Dados a serem incluídos no token
      const payload = {
        userId: user.id,
        email: user.email,
        name: user.name,
      };
      
      const expiresIn = "1h";

      if(!secretKey){
        throw new Error("JWT_SECRET is not defined in the environment variables");
      }

      const resetPasswordToken = jwt.sign(payload, secretKey, { expiresIn });

      // Envio de e-mail
      const mailAdapter = new NodemailerMailAdapterForgotPassword();
      await mailAdapter.sendMail(user, resetPasswordToken);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export { ForgotPasswordService };
