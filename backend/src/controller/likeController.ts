import { IncomingMessage } from "http";

import Like from "../entity/Like";
import LikeService from "../service/likeService";
import getParsedBody from "../shared/getParsedBody";
import getResponse from "../shared/getResponse";

export default class LikeController {
  private likeService: LikeService;

  constructor() {
    this.likeService = new LikeService();
  }

  public async handleRequest(req: IncomingMessage) {
    const method = req.method;

    switch (method) {
      case "POST": {
        try {
          const body: Like = await getParsedBody(req);
          const response: Like = await this.likeService.postLike(body);
          return getResponse(201, response);
        } catch (err) {
          return getResponse(405, "Invalid input");
        }
      }
      case "DELETE": {
        const id: number = Number(req.url.split("/").pop());
        try {
          await this.likeService.deleteLike(id);
          return getResponse(201, "Successful operation");
        } catch (err) {
          return getResponse(404, "Like not found");
        }
      }

      case "GET": {
        const response: Like[] | [] = await this.likeService.getLikes();
        return getResponse(200, response);
      }
    }
  }
}

