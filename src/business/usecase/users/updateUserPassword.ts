import { UserGateway } from "../../gateways/userGateway";
import * as bcrypt from "bcrypt";
import { MinimumCharacterError } from "../../Error/MinimumCharacterError";

export class UpdateUserPasswordUC {
  constructor(private usergateway: UserGateway) {}

  async execute(input: UpdateUserInput) {
    const user = await this.usergateway.getUserById(input.id);

    if (!user) {
      throw new Error("usuario não encontrado");
    }

    const compare = await bcrypt.compare(
      input.previousPassword,
      user.getPassword()
    );
    if (!compare) {
      throw new Error("senha incompativel");
    }

    if (input.newPassword.length < 6) {
      throw new MinimumCharacterError();
    }

    const SALT_ROUNDS = 10;
    const hashPassword = await bcrypt.hash(input.newPassword, SALT_ROUNDS);

    await this.usergateway.updateUserPassword(hashPassword, input.id);
    return { message: "Senha alterada" };
  }
}

export interface UpdateUserInput {
  newPassword: string;
  previousPassword: string;
  id: string;
}
