import prismaClient from "../../prisma";

class FindOneEgressoByEmail {
  async execute(email: string) {
    const egresso = await prismaClient.egresso.findFirst({
      where: {
        email: email,
      },
    });
    return egresso;
  }
}

export { FindOneEgressoByEmail };