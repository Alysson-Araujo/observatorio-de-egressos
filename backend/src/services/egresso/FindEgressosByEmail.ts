import prismaClient from "../../prisma";

class FindEgressosByEmail {
  async execute(emails: string[]) {
    const existingEgressos = await prismaClient.egresso.findMany({
        where: {
          email: {
            in: emails, // Use a condição "in" para verificar se o email está na lista de emails fornecida
          },
        },
      });
    return existingEgressos;
  }
}

export { FindEgressosByEmail };