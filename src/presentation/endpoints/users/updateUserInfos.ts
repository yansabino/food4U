import { Request, Response } from "express";
import { UserDB } from "../../../data/userDataBase";

import { JWTAuthentication } from "../../../utils/JWTAuthentication";
import { UpdateUserInfosUC } from "../../../business/usecase/users/updateUserInfos";

export const updateUserPasswordEndpoint = async (req: Request,res: Response) => {
  try {
    const updateUserInfosUC = new UpdateUserInfosUC(new UserDB());
    const jwtAuth = new JWTAuthentication();
    const userId = jwtAuth.verifyToken(req.headers.auth as string);
    const input = {
      email: req.body.email,
      name: req.body.name,
      birthday: req.body.birthday,
      id: userId
    };

    const result = await updateUserInfosUC.execute(input);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      message: err.message,
      ...err
    });
  }
};
