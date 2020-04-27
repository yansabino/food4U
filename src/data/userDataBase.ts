import { BaseDB } from "./baseDataBase";
import { User } from "../business/entities/user";
import { UserGateway } from "../business/gateways/userGateway";
import { DuplicateUserError } from "../business/Error/DuplicateUserError";

export class UserDB extends BaseDB implements UserGateway {
  private userTableName = "user";
  private relationTableName = "users_relations";

  async createUser(user: User) {
    try {
      await this.connection
        .insert({
          id: user.getId(),
          email: user.getEmail(),
          password: user.getPassword(),
          name: user.getName(),
          birthday: user.getBirthday()
        })
        .into(this.userTableName);
    } catch (err) {
      console.log(err);
      if (err.code === "ER_DUP_ENTRY") {
        throw new DuplicateUserError();
      } else {
        throw err;
      }
    }
  }

  async loginUser(email: string): Promise<User | undefined> {
    const user = await this.connection
      .select("*")
      .from(this.userTableName)
      .where({ email });
    if (!user[0]) {
      return undefined;
    }

    return new User(
      user[0].id,
      user[0].email,
      user[0].password,
      user[0].name,
      user[0].birthday
    );
  }

  async createUserFollowRelation(
    followerId: string,
    followedId: string
  ): Promise<void> {
    await this.connection.raw(
    `INSERT INTO ${this.relationTableName}
    (\`follower_id\`, \`followed_id\`)
    values ('${followerId}','${followedId}');`);
  }

  async getUserById(id: string): Promise<User | undefined> {
    const user = await this.connection.raw(`
    SELECT * 
    FROM ${this.userTableName}
    WHERE id='${id}'
    `);
    return new User(
      user[0][0].id,
      user[0][0].email,
      user[0][0].password,
      user[0][0].name,
      user[0][0].birthday
    );
  }

  async updateUserPassword(newpassword: string, id: string): Promise<void> {
    await this.connection.raw(
      `update user set password='${newpassword}' where id='${id}';`
    );
  }

  async updateUserInfos(
    email: string,
    name: string,
    birthday: Date,
    id: string
  ): Promise<void> {
    await this.connection
      .from(this.userTableName)
      .where({
        id: `${id}`
      })
      .update({
        name: `${name}`,
        email: `${email}`,
        birthday: `${birthday}`
      });

    // await this.connection.raw(`UPDATE ${this.userTableName}
    // SET email = '${email}', name = '${name}', birthday = '${birthday}'
    // WHERE id = '${id}';`)
  }
}
