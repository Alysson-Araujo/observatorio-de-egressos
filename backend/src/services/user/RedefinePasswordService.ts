import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

class RedefinePasswordService {
  async execute(email: string, password: string) {

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.update({
      where: {
        email,
      },
      data: {
        password:passwordHash,
      },
    });
    return user;
  }
}

export { RedefinePasswordService };
