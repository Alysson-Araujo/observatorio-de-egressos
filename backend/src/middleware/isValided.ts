import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserInterface } from "../interfaces/UserInterface";

export function isValided(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.params.token;
    console.log(authToken)
  if (!authToken) {
    return res.status(401).end();
  }

  // A ideia seria pegar apenas o token e para isso, colocando [, token], vamos pegar apenas token
  // Já que pegados 2 informações no header authorization. Assim ignoramos a primeira info e depois pegamos o token
 
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }
  try {
    const secretKey = process.env.JWT_SECRET;
    const {id,email,name} = jwt.verify(authToken, secretKey) as UserInterface;

   
    req.user_email = email
    return next();
  } catch (err) {
    return res.status(401).end();
  }
}