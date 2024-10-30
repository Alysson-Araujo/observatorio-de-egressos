import prismaClient from "../../prisma";

class UpdateParticipatedEgressoService {
  async execute(emails: string[]) {
    for (let i = 0; i < emails.length; i++) {
      await prismaClient.egresso.update({
        where: {
          email: emails[i].toLowerCase(),
        },
        data: {
          participatedInTheResearch: true,
        },
      });
    }
  }
}

export { UpdateParticipatedEgressoService };
