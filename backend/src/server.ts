import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import Controller from "./controller/controller";

export default class ServerClass {
  host: string;
  port: number;
  controller: Controller;
  server: Server<typeof IncomingMessage, typeof ServerResponse>;

  constructor(host = "127.0.0.1", port = 8000) {
    this.host = host;
    this.port = port;
    this.controller = new Controller();
    this.server = createServer((req, res) =>
      this.controller.requestListener(req, res)
    );
  }

  start() {
    this.server.listen(this.port, this.host, () => {
      console.log(`Server listens http://${this.host}:${this.port}`);
    });
  }
}

