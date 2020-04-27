import { User } from "../entities/user";

export interface UserGateway {
  createUser(user: User): Promise<void>;
  loginUser(email: string): Promise<User | undefined>;
  createUserFollowRelation(
    followerId: string,
    followedId: string
  ): Promise<void>;
  updateUserPassword(newpassword: string, id: string): Promise<void> 
  getUserById(id: string): Promise<User | undefined>
  updateUserInfos(email: string, name: string, birthday: Date, id: string): Promise<void>
}
