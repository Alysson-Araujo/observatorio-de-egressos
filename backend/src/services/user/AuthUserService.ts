import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import * as dotenv from 'dotenv';
dotenv.config();
interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("Email/Passoword incorrect");
    }

    // Verificar se a senha está correta

    const passwordIsMatch = await compare(password, user.password);

    if (!passwordIsMatch) {
      throw new Error("Email/Passoword incorrect");
    }
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
      }
    // Gerar o token JWT e devolver os dados do usuário
    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { subject: user.id, expiresIn: "1h" }
    );
    return { id: user.id, name: user.name, email: user.email, token: token };
  }
}

export { AuthUserService };