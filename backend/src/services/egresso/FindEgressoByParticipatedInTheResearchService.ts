import prismaClient from "../../prisma";

class FindEgressoyByParticipatedInTheResearchService {
  async execute(participatedInTheResearch: boolean) {
    const surveys = await prismaClient.egresso.findMany({
      where: {
        participatedInTheResearch,
      },
      select: {
        email: true,
      },
    });
    return surveys;
  }
}

export { FindEgressoyByParticipatedInTheResearchService };
