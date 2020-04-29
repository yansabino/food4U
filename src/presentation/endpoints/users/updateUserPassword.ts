import { Request, Response } from "express";
import { UserDB } from "../../../data/userDataBase";
import { UpdateUserPasswordUC } from "../../../business/usecase/users/updateUserPassword";

import { JWTAuthentication } from "../../../utils/JWTAuthentication";
import { BcryptService } from "../../../utils/bcryptService";

export const UpdateUserPasswordEndpoint = async (req: Request,res: Response) => {
  try {
    const updateUserPasswordUC = new UpdateUserPasswordUC(
      new UserDB(),
      new JWTAuthentication(),
      new BcryptService()
      );
    const jwtAuth = new JWTAuthentication();
    const userId = jwtAuth.verifyToken(req.headers.auth as string);

    const input = {
      previousPassword: req.body.previousPassword,
      newPassword: req.body.newPassword,
      token: userId.id
    };

    const result = await updateUserPasswordUC.execute(input);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      message: err.message,
      ...err
    });
  }
};
