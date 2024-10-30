import { Request, Response } from "express";
import { PassarDadosNoTxt, clearFile } from "../../config/learingPdf";
import { countWordOccurrencesInFile } from "../../config/getEgressos";
import { Egresso } from "../../interfaces/egressoInterface";
import { AddManyEgressosByPDFService } from "../../services/egresso/AddManyEgressosByPDFService";
import { AddManyEgressoService } from "../../services/egresso/AddManyEgressoService";

class AddManyEgressosByPDFController {
  async handle(req: Request, res: Response) {
    try {
      await PassarDadosNoTxt();
      const listaEgressosTratados = await countWordOccurrencesInFile(
        "./dados.txt"
      );
      clearFile();
      if (listaEgressosTratados == null || undefined)
        return res.json({ message: "Lista vazia." });
      else {
        const addManyEgressosByPDFService = new AddManyEgressosByPDFService();
        const egressosToInsert = await addManyEgressosByPDFService.execute(
          listaEgressosTratados
        );
        const course:string = req.body.course;
        const addManyEgressoService = new AddManyEgressoService();
        const userCount = await addManyEgressoService.execute(egressosToInsert,course);

        return res.status(201).json({ message: "Egressos adicionados com sucesso.", user: userCount });
      }
    } catch (error) {
      return res.json({ message: "ocorreu um erro na inserção dos egressos", error: error });
    }
  }
}

export { AddManyEgressosByPDFController };