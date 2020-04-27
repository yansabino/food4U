import { Request, Response } from "express";
import { FeedDB } from "../../../data/feedDataBase";
import { GetFeedUC } from "../../../business/usecase/users/getFeed";
import { JWTAuthentication } from "../../../utils/JWTAuthentication";

export const getFeedEndpoint = async (req: Request, res: Response) => {
  try {
    const feedDataBase = new FeedDB();
    const getFeedUC = new GetFeedUC(feedDataBase);

    const jwtAuth = new JWTAuthentication();

    const userId = jwtAuth.verifyToken(req.headers.auth as string);

    const input = {
      userId
    };

    const result = await getFeedUC.execute(input);

    res.send({ result });
  } catch (err) {
    res.status(400).send({
      message: err.message,
      ...err
    });
  }
};
