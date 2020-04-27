import { Recipe } from "./recipe";

export class FeedRecipe extends Recipe {
  constructor(
    id: string,
    title: string,
    description: string,
    creationDate: number,
    userId: string,
    private userEmail: string
  ) {
    super(id, title, creationDate, description, userId);
  }

  getUserEmail() {
    return this.userEmail;
  }
}
