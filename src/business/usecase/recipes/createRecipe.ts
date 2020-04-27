import { v4 } from "uuid";
import { Recipe } from "../../entities/recipe";
import { RecipeGateway } from "../../gateways/recipeGateway";

export class CreateRecipeUC {
  constructor(private recipeGateway: RecipeGateway) {}

  async execute(input: CreateRecipeInput) {
    const recipeId = this.generateRecipeId();

    const newRecipe = new Recipe(
      recipeId,
      input.title,
      new Date(),
      input.description,
      input.userId
    );
    await this.recipeGateway.createRecipe(newRecipe);
  }

  private generateRecipeId() {
    return v4();
  }
}

export interface CreateRecipeInput {
  title: string;
  description: string;
  userId: string;
}
