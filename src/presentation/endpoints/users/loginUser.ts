import { Request, Response } from "express";
import { UserDB } from "../../../data/userDataBase";
import { LoginUserUC } from "../../../business/usecase/users/loginUser";
import { JWTAuthentication } from "../../../utils/JWTAuthentication";
import { BcryptService } from "../../../utils/bcryptService";

export const loginUserEndpoint = async (req: Request, res: Response) => {
  const loginUserUC = new LoginUserUC(
    new UserDB(),
    new JWTAuthentication(),
    new BcryptService()
  );
  const input = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const result = await loginUserUC.execute(input);
    res.send({ message: "Usuario logado com sucesso", result });
  } catch (err) {
    res.status(400).send({
      message: err.message,
      ...err,
    });
  }
};
