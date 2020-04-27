import { BaseDB } from "./baseDataBase";
import { FeedGateway } from "../business/gateways/feedGateway";
import { FeedRecipe } from "../business/entities/feedRecipe";

export class FeedDB extends BaseDB implements FeedGateway {
  private recipeTableName = "recipes";
  private relationTableName = "users_relations";
  private userTableName = "user";

  async getFeedForUser(userId: string): Promise<FeedRecipe[]> {
    console.log(userId);
    const response = await this.connection.raw(`
        SELECT ${this.recipeTableName}.*, ${this.userTableName}.email from ${this.relationTableName}
        JOIN ${this.recipeTableName} on ${this.recipeTableName}.userId=${this.relationTableName}.followed_id
        JOIN ${this.userTableName} on ${this.relationTableName}.followed_id=${this.userTableName}.id
        WHERE follower_id='${userId}'
        ORDER BY ${this.recipeTableName}.creationDate DESC;
        `);

    return response[0].map((recipe: any) => {
      return new FeedRecipe(
        recipe.id,
        recipe.title,
        recipe.description,
        recipe.creationDate,
        recipe.userId,
        recipe.userEmail
      );
    });
  }
}
