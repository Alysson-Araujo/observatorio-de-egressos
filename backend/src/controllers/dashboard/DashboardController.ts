import { Request, Response } from "express";
import { Metabase } from "../../config/Metabase";



class MetabaseController {
  async handle(req: Request, res: Response) {
    try{
    const token = Metabase();

    return res.status(200).json({ tokenMetabase: token });
    }
   catch (error: any) {
    return res.status(500).json({ message: "Ocorreu um erro", error: error.message });
}
  }
}

export { MetabaseController };