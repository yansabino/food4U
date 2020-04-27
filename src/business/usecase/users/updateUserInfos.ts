import { UserGateway } from "../../gateways/userGateway";

export class UpdateUserInfosUC {
  constructor(private usergateway: UserGateway) {}

  async execute(input: UpdateUserInput) {
    const user = await this.usergateway.getUserById(input.id);

    if (!user) {
      throw new Error("usuario não encontrado");
    }
    //TENTATIVA DE INSERIR APENAS UM INPUT.
    // if (!input.email) {
    //   input.email = user.getEmail();
    // }

    // if (!input.name) {
    //   input.name = user.getName();
    // }

    // if (!input.birthday) {
    //   input.birthday = user.getBirthday();
    // }

    await this.usergateway.updateUserInfos(
      input.email,
      input.name,
      input.birthday,
      input.id
    );

    return { message: "Informações dos Usuarios alteradas" };
  }
}

export interface UpdateUserInput {
  email: string;
  name: string;
  birthday: Date;
  id: string;
}
