import { UserGateway } from "../../gateways/userGateway";
import { MinimumCharacterError } from "../../Error/MinimumCharacterError";
import { CryptographyGateway } from "../../gateways/cryptographyGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class UpdateUserPasswordUC {
  constructor(
    private usergateway: UserGateway,
    private authenticationGateway: AuthenticationGateway,
    private cryptographyGateway: CryptographyGateway
  ) {}

  async execute(input: UpdateUserInput): Promise<UpdateUserOutPut> {

    if (!input.token) {
      throw new Error("Missing Auth Token");
    }

    const userInfo = this.authenticationGateway.verifyToken(input.token);
    const id = userInfo.id;
    const user = await this.usergateway.getUserById(id);

    if (!user) {
      throw new Error("usuario não encontrado");
    }

    const isPasswordCorrect = await this.cryptographyGateway.compare(
      input.previousPassword,
      user.getPassword()
    );
    if (!isPasswordCorrect) {
      throw new Error("senha incompativel");
    }

    if (input.newPassword.length < 6) {
      throw new MinimumCharacterError();
    }

    const password = await this.cryptographyGateway.encrypt(input.newPassword);
    await this.usergateway.updateUserPassword(user.getId(), password);

    const token = this.authenticationGateway.generateToken({
      id: user.getId(),
    });

    return { message: "Senha alterada", token };
  }
}

export interface UpdateUserInput {
  newPassword: string;
  previousPassword: string;
  token: string;
}

export interface UpdateUserOutPut {
  message: string;
  token: string;
}
