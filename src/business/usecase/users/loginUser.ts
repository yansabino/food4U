import { UserGateway } from "../../gateways/userGateway";
import { CryptographyGateway } from "../../gateways/cryptographyGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class LoginUserUC {
  constructor(
    private userGateway: UserGateway,
    private authenticationGateway: AuthenticationGateway,
    private crytographyGateway: CryptographyGateway
  ) {}

  public async execute(input: LoginUserUCInput): Promise<LoginUserUCOutPut> {
    const user = await this.userGateway.loginUser(input.email);

    if (!user) {
      throw new Error("Email incorreto");
    }

    const isPaswordCorrect = await this.crytographyGateway.compare(
      input.password,
      user.getPassword()
    );

    if (!isPaswordCorrect) {
      throw new Error("Senha incorreta");
    }

    const token = this.authenticationGateway.generateToken({
      id: user.getId(),
    });

    return { token };
  }
}

export interface LoginUserUCInput {
  email: string;
  password: string;
}

export interface LoginUserUCOutPut {
  token: string;
}
