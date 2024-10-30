import prismaClient from "../../prisma";

class FindManyEgressosService {
  async execute() {
    const existingEgressos = await prismaClient.egresso.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        year_of_entry: true,
        matricula: true,
        course: true,
      },
    });
    return existingEgressos;
  }
}

export { FindManyEgressosService };
