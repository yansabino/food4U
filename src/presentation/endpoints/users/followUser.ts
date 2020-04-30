import { Request, Response } from "express";
import { FollowUserUC } from "../../../business/usecase/users/followUser";
import { UserDB } from "../../../data/userDataBase";
import { JWTAuthentication } from "../../../utils/JWTAuthentication";

export const followUserEndpoint = async (req: Request, res: Response) => {
  try {
    const jwtAuth = new JWTAuthentication();

    const userDataBase = new UserDB();

    const userId = jwtAuth.verifyToken(req.headers.auth as string);

    const useCase = new FollowUserUC(userDataBase);

    const input = {
      userId: userId.id,
      followedId: req.body.followedId
    };
    console.log(input);
    await useCase.execute(input);
    res.status(200).send({
      message: "User Followed Successfully"
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: err.message
    });
  }
};
