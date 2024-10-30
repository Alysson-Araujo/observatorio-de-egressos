import prismaClient from "../../prisma";

class FindUserByEmail {
  async execute(email: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        email,
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

export { FindUserByEmail };