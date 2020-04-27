import { FeedRecipe } from "../entities/feedRecipe";

export interface FeedGateway {
  getFeedForUser(userId: string): Promise<FeedRecipe[]>;
}
