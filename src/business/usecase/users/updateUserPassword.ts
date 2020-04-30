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

    const pass = await this.cryptographyGateway.encrypt(input.newPassword);
    await this.usergateway.updateUserPassword(user.getId(), pass);

    const token = this.authenticationGateway.generateToken({
      id: user.getId(),
    });

    return { token };
  }
}

export interface UpdateUserInput {
  token: string;
  newPassword: string;
  previousPassword: string;
}

export interface UpdateUserOutPut {  
  token: string;
}
