import { Request, Response } from "express";
import { AddManyEgressoService } from "../../services/egresso/AddManyEgressoService";
import { Egresso } from "../../interfaces/egressoInterface";

class AddManyEgressoController {
  async handle(req: Request, res: Response) {
    try {
      const listEgressos:Egresso[] = req.body as Egresso[];

      if (listEgressos == null || undefined)
        return res.json({ message: "Lista de egressos vazia." });
      else {

        const addManyEgressoService = new AddManyEgressoService();
        const user = await addManyEgressoService.execute(listEgressos,req.body.course);

        return res.status(201).json({ message: "Egressos adicionados com sucesso.", user: user });
      }
    } catch (error) {
      return res.json({ message: "ocorreu um erro", error: error });
    }
  }
}

export { AddManyEgressoController };