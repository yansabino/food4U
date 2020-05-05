import { v4 } from "uuid";
import { UserGateway } from "../../gateways/userGateway";
import { User } from "../../entities/user";
import { MinimumCharacterError } from "../../Error/MinimumCharacterError";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { CryptographyGateway } from "../../gateways/cryptographyGateway";

export class CreateUserUC {
  constructor(
    private userGateway: UserGateway,
    private authenticationGateway: AuthenticationGateway,
    private crytographyGateway: CryptographyGateway
  ) {}

  public async execute(input: CreateUserUCInput): Promise<CreateUserUCOutput> {
    const id = this.generateUserId();

    const password = await this.crytographyGateway.encrypt(input.password);
    const invalidPassword = password.length < 6;

    if (!password) {
      throw new Error("Senha Invalida");
    }
    if (!input.email) {
      throw new Error("Email Invalido");
    }
    if (!input.name) {
      throw new Error("Nome Invalido");
    }
    if (!input.birthday) {
      throw new Error("Data de Nascimento Invalida");
    }

    if (invalidPassword) {
      throw new MinimumCharacterError();
    }

    const user = new User(
      id,
      input.email,
      password,
      input.name,
      input.birthday
    );

    await this.userGateway.createUser(user);

    const token = this.authenticationGateway.generateToken({
      id: user.getId(),
      email: user.getEmail()
    });

    return {
      message: "Usuario criado com sucesso",
      token,
    };
  }
  private generateUserId() {
    return v4();
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
  token: string;
}
