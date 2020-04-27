import { v4 } from "uuid";
import { UserGateway } from "../../gateways/userGateway";
import { User } from "../../entities/user";
import * as bcrypt from "bcrypt";
import { MinimumCharacterError } from "../../Error/MinimumCharacterError";

export class CreateUserUC {
  constructor(private userGateway: UserGateway) {}

  public async execute(input: CreateUserUCInput): Promise<CreateUserUCOutput> {
    const id = v4();
    const SALT_ROUNDS = 10;
    const hashPassword = await bcrypt.hash(input.password, SALT_ROUNDS);
    const user = new User(
      id,
      input.email,
      hashPassword,
      input.name,
      input.birthday
    );

    if (input.password.length < 6) {
      throw new MinimumCharacterError();
    }

    await this.userGateway.createUser(user);

    return {
      message: "Usuario criado com sucesso"
    };
  }
}
export interface CreateUserUCInput {
  email: string;
  password: string;
  name: string;
  birthday: Date;
}

export interface CreateUserUCOutput {
  message: string;
}
