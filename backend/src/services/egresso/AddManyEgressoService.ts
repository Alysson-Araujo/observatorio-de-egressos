import prismaClient from "../../prisma";
import {Egresso} from "../../interfaces/egressoInterface"

class AddManyEgressoService {
  async execute(data: Egresso[],course:string) {
    const item = await prismaClient.egresso.createMany({
      data: data.map((egresso) => ({
        name: egresso.name,
        email: egresso.email,
        year_of_entry: egresso.year_of_entry,
        matricula: egresso.matricula,
        course: course,
      })),
      skipDuplicates: true,
    });
    return item;
  }
}

export { AddManyEgressoService };