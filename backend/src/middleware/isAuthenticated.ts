import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  const authToken = req.headers.authorization;
  
  if (!authToken) {
    return res.status(401).end();
  }

  // A ideia seria pegar apenas o token e para isso, colocando [, token], vamos pegar apenas token
  // Já que pegados 2 informações no header authorization. Assim ignoramos a primeira info e depois pegamos o token
  const [, token] = authToken.split(" ");

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }
    // Validação do TOKEN 
    // O sub vem a ser o ID do usuário
    const { sub } = verify(token, process.env.JWT_SECRET) as PayLoad; 

    //Colocar o id do usuário para a variável user_id dentro do req do express no qual foi colocado em @types/
    req.user_id = sub;
    return next();
  } catch (err) {
    return res.status(401).end();
  }
}