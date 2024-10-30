import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
  name: string;
  email: string;
  password: string;
  courseAdmin: string;
}

class CreateUserService {
  async execute({ name, email, password,courseAdmin }: UserRequest) {
    //Verificar se ele enviou o email
    if (!email) {
      throw new Error("Email incorrect");
    }

    // Verificar se esse email já está cadastrado no banco de dados
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("user already exists");
    }

    const passwordHash = await hash(password, 8);
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        courseAdmin
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return user;
  }
}

export { CreateUserService };