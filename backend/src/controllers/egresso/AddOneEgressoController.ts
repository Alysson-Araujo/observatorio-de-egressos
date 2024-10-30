import { Request, Response } from "express";
import { EgressoRequest } from "../../interfaces/egressoInterface";
import { AddOneEgressoService } from "../../services/egresso/AddOneEgressoService";
import { FindFirstEgressos } from "../../services/egresso/FindFirstEgressos";

class AddOneEgressoController {
  async handle(req: Request, res: Response) {
    try {
      const { name, email, matricula, year_of_conclusion, year_of_entry,course } =
        req.body as EgressoRequest;
        const regexData = /\b\d{4}[.][12]\b/;

      const findFirstEgressoService = new FindFirstEgressos();
      const egressoExists = await findFirstEgressoService.execute({
        name,
        email,
        matricula,
        year_of_entry,
        course,
      });

      if (egressoExists) {
        return res.json({ message: "Egresso já cadastrado" });
      } 
      else if(regexData.test(year_of_conclusion) == false || regexData.test(year_of_entry) == false){
        return res.json({ message: "Ano de conclusão ou ano de ingresso inválido" });
    }
      else {
        const addOneEgressoService = new AddOneEgressoService();

        const egresso = await addOneEgressoService.execute({
          name,
          email,
          matricula,
          year_of_conclusion,
          year_of_entry,
          course,
        });
        return res.status(201).json(egresso);
      }
    } catch (error) {
      return res.json({ message: "ocorreu um erro", error: error });
    }
  }
}

export { AddOneEgressoController };
