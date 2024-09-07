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

  public async postUser(
    userDto: UserDto
  ): Promise<{ user: User; token: string }> {
    const user = this.repository.create(userDto);
    const token = this.generateAuthToken(user.id);
    user.token = token;

    const savedUser = await this.repository.save(user);

    return { user: savedUser, token: token };
  }
}

