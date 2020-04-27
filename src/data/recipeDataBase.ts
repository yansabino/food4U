import { BaseDB } from "./baseDataBase";
import { Recipe } from "../business/entities/recipe";
import { RecipeGateway } from "../business/gateways/recipeGateway";

export class RecipeDB extends BaseDB implements RecipeGateway {
  private recipeTableName = "recipes";

  async createRecipe(recipe: Recipe): Promise<void> {
    await this.connection
      .insert({
        id: recipe.getId(),
        title: recipe.getTitle(),
        description: recipe.getDescription(),
        creationDate: recipe.getCreationDate(),
        userID: recipe.getUserId()
      })
      .into(this.recipeTableName);
  }
}
