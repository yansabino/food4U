import { Request, Response } from "express";
import { JWTAuthentication } from "../../../utils/JWTAuthentication";

export const getUserInfoEndpoint = async (req: Request, res: Response) => {
  try {
    const jwtAuth = new JWTAuthentication()
    const userId = jwtAuth.verifyToken(req.headers.auth as string)
    const input = {
      id: userId.id
    }
    res.status(200).send(input);
  } catch (err) {
    res.status(400).send({
      message: "Invalid Token"
    });
  }
};
