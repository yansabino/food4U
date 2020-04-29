import { Request, Response } from "express";
import { CreateUserUC } from "../../../business/usecase/users/createUser";
import { UserDB } from "../../../data/userDataBase";
import { JWTAuthentication } from "../../../utils/JWTAuthentication";
import { BcryptService } from "../../../utils/bcryptService";

export const createUserEndpoint = async (req: Request, res: Response) => {
  try {
    const createUserUC = new CreateUserUC(
      new UserDB(),
      new JWTAuthentication(),
      new BcryptService()
      );
    const result = await createUserUC.execute({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      birthday: req.body.birthday
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      message: err.message,
      ...err
    });
  }
};
