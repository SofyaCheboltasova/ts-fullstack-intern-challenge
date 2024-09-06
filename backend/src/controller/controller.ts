import { IncomingMessage, ServerResponse } from "http";
import LikeController from "./likeController";
import UserController from "./userController";
import { Response } from "../type/ResponseType";

export default class Controller {
  private likeController: LikeController;
  private userController: UserController;

  constructor() {
    this.likeController = new LikeController();
    this.userController = new UserController();
  }

  private setCorsHeaders(res: ServerResponse) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }

  private setResponse(res: ServerResponse, response: Response) {
    res.statusCode = response.statusCode;
    res.setHeader("Content-Type", "application/json");

    response.headers &&
      Object.keys(response.headers).forEach((key) => {
        res.setHeader(key, response.headers.get(key)!);
      });

    res.end(JSON.stringify(response.response));
  }

  public async requestListener(req: IncomingMessage, res: ServerResponse) {
    this.setCorsHeaders(res);
    const url = req.url;

    if (url.startsWith("/likes")) {
      const response: Response = await this.likeController.handleRequest(req);
      this.setResponse(res, response);
    }

    if (url.startsWith("/user")) {
      const response: Response = await this.userController.handleRequest(req);
      this.setResponse(res, response);
    }
  }
}

