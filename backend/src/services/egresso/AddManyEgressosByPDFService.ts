import prismaClient from "../../prisma";
import { Egresso } from "../../interfaces/egressoInterface";
import { FindFirstEgressos } from "./FindFirstEgressos";
import { FindManyEgressosService } from "./FindManyEgressos";

class AddManyEgressosByPDFService {
  async execute(egressos: Egresso[]) {
    const egressosToInsert: Egresso[] = [];
    const findManyEgressosService = new FindManyEgressosService();
    const existingEgressos = await findManyEgressosService.execute();

    const data = existingEgressos.map(
      ({ name, email, year_of_entry, matricula }: Egresso) => ({
        name,
        email,
        year_of_entry,
        matricula,
      })
    );

    for (const egresso1 of egressos) {
      let encontrado = false;
      for (const egresso2 of data) {
        if (
          egresso1.matricula === egresso2.matricula &&
          egresso1.name === egresso2.name &&
          egresso1.email === egresso2.email &&
          egresso1.year_of_entry === egresso2.year_of_entry
        ) {
          encontrado = true;
          break;
        }
      }
      if (!encontrado) {
        egressosToInsert.push(egresso1);
      }
    }
    return egressosToInsert;
  }
}

export { AddManyEgressosByPDFService };
