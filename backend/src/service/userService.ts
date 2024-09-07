import { Repository } from "typeorm";
import * as crypto from "crypto";

import dataSource from "../data-source";
import User from "../entity/User";
import UserDto from "../../../api/src/dto/user.dto";

export default class UserService {
  private repository: Repository<User>;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  private generateSalt(length: number): string {
    return crypto.randomBytes(length).toString("hex");
  }
  private generateAuthToken(id: number): string {
    const salt = this.generateSalt(16);
    return crypto.createHash("sha256").update(`${id}${salt}`).digest("hex");
  }

  private async getUserByLogin(userDto: UserDto): Promise<User | null> {
    const existingUser = await this.repository.findOne({
      where: { login: userDto.login },
    });

    return existingUser;
  }

  private async checkPassword(userDto: UserDto): Promise<boolean> {
    const existingUser = await this.getUserByLogin(userDto);
    return existingUser.password === userDto.password;
  }

  public async postUser(
    userDto: UserDto
  ): Promise<{ user: User; token: string }> {
    const existingUser = await this.getUserByLogin(userDto);

    if (existingUser) {
      const isEqualPassword = await this.checkPassword(userDto);

      if (isEqualPassword) {
        return { user: existingUser, token: existingUser.token };
      } else {
        throw new Error("Неправильный пароль");
      }
    }

    const user = this.repository.create(userDto);
    const token = this.generateAuthToken(user.id);
    user.token = token;

    const savedUser = await this.repository.save(user);

    return { user: savedUser, token: token };
  }
}
