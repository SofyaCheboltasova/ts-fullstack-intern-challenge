import { Repository } from "typeorm";
import dataSource from "../data-source";
import User from "../entity/User";

export default class UserService {
  private repository: Repository<User>;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  public postUser(user: User): Promise<User> {
    const newUser = this.repository.save(user);
    return newUser;
  }
}

