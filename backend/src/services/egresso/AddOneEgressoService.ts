import { EgressoRequest } from "../../interfaces/egressoInterface";
import prismaClient from "../../prisma";

class AddOneEgressoService {
  async execute({
    name,
    email,
    matricula,
    year_of_conclusion,
    year_of_entry,
    course
  }: EgressoRequest) {
    const item = await prismaClient.egresso.create({
      data: {
        name,
        email,
        matricula,
        year_of_conclusion,
        year_of_entry,
        course
      },
    });
    return item;
  }
}

export { AddOneEgressoService };
