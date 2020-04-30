import { FeedGateway } from "../../gateways/feedGateway";

export class GetFeedUC {
  constructor(private feedGateway: FeedGateway) {}

  async execute(input: GetFeedInput): Promise<GetFeedOutput[]> {
    const recipes = await this.feedGateway.getFeedForUser(input.userId);

    return recipes.map(recipe => {
      return {
        id: recipe.getId(),
        title: recipe.getTitle(),
        description: recipe.getDescription(),
        creationDate: recipe.getCreationDate(),
        userId: recipe.getUserId(),
        userEmail: recipe.getUserEmail()
      };
    });
  }
}

export interface GetFeedInput {
  userId: string;
}

export interface GetFeedOutput {
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  userId: string;
  userEmail: string;
}

