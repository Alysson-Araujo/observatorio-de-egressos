import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password, courseAdmin } = req.body;
    const createUserService = new CreateUserService();

    console.log(name);
    const user = await createUserService.execute({
      name,
      email,
      password,
      courseAdmin,
    });
    return res.json(user);
  }
}

export { CreateUserController };
