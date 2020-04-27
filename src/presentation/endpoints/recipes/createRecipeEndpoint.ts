import { Request, Response } from "express";
import { RecipeDB } from "../../../data/recipeDataBase";
import { CreateRecipeUC } from "../../../business/usecase/recipes/createRecipe";
import { JWTAuthentication } from "../../../utils/JWTAuthentication";

export const createRecipeEndpoint = async (req: Request, res: Response) => {
  try {
    const createRecipeUC = new CreateRecipeUC(new RecipeDB());
    const jwtAuth = new JWTAuthentication();
    const userId = jwtAuth.verifyToken(req.headers.auth as string);
    const input = {
      userId,
      title: req.body.title,
      description: req.body.description
    };
    await createRecipeUC.execute(input);
    res.send({ message: "Receita Criada" });
  } catch (err) {
    res.status(400).send({
      message: err.message,
      ...err
    });
  }
};
