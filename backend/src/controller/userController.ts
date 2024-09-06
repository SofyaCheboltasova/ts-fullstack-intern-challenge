import { IncomingMessage } from "http";
import UserService from "../service/userService";
import User from "../entity/User";
import getParsedBody from "../shared/getParsedBody";
import getResponse from "../shared/getResponse";

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async handleRequest(req: IncomingMessage) {
    const method = req.method;

    switch (method) {
      case "POST": {
        try {
          const body: User = await getParsedBody(req);
          const response: User = await this.userService.postUser(body);
          const headers = new Map().set(
            "X-Auth-Token",
            "3525dcdddea774939652f7f11df6d7db10a9db35a5d758c64d600a00c1cc41be"
          );
          return getResponse(201, response, headers);
        } catch (err) {
          return getResponse(405, "Invalid input");
        }
      }
    }
  }
}

