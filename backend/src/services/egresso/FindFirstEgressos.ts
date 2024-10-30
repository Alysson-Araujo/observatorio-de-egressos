import prismaClient from "../../prisma";
import { Egresso } from "../../interfaces/egressoInterface";

class FindFirstEgressos {
  async execute(data: Egresso) {
    const existingEgressos = await prismaClient.egresso.findFirst({
        where: {
            name: data.name,
            email: data.email,
            year_of_entry: data.year_of_entry,
            matricula: data.matricula
        }
    });
    return existingEgressos !== null;
  }
}

export { FindFirstEgressos };
