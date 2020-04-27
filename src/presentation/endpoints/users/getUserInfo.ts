import { Request, Response } from "express";

import * as jwt from "jsonwebtoken";

export const getUserInfoEndpoint = async (req: Request, res: Response) => {
  try {
    const data = jwt.verify(req.headers.auth as string, "lalala") as any;
    console.log(data);
    res.send({
      id: data.userId,
      email: data.email
    });
  } catch (err) {
    res.status(400).send({
      message: "Invalid Token"
    });
  }
};
