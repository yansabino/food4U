import { Request, Response } from "express";
import { UserDB } from "../../../data/userDataBase";
import { LoginUserUC } from "../../../business/usecase/users/loginUser";

export const loginUserEndpoint = async (req: Request, res: Response) => {
  const loginUserUC = new LoginUserUC(new UserDB());
  const input = {
    email: req.body.email,
    password: req.body.password
  };

  try {
    const token = await loginUserUC.execute(input);
    res.send({ message: "Usuario logado com sucesso", token });
  } catch (err) {
    res.status(400).send({
      message: err.message,
      ...err
    });
  }
};
