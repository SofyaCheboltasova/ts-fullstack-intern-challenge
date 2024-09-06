import { createServer, IncomingMessage, Server, ServerResponse } from "http";

export default class ServerClass {
  host: string;
  port: number;
  server: Server<typeof IncomingMessage, typeof ServerResponse>;

  constructor(host = "127.0.0.1", port = 7000) {
    this.host = host;
    this.port = port;
    this.server = createServer((req, res) => this.requestListener(req, res));
  }

  start() {
    this.server.listen(this.port, this.host, () => {
      console.log(`Server listens http://${this.host}:${this.port}`);
    });
  }

  private setResponse(
    res: ServerResponse,
    statusCode: number,
    headers: Map<string, string>,
    body: string
  ) {
    res.statusCode = statusCode;

    Object.keys(headers).forEach((key) => {
      res.setHeader(key, headers.get(key)!);
    });

    res.end(body);
  }

  private requestListener(req: IncomingMessage, res: ServerResponse) {
    const method = req.method;
    const url = req.url;
    const headers = new Map().set("Content-Type", "text/plain");

    if (method === "POST") {
      switch (url) {
        case "/contact": {
          this.setResponse(res, 200, headers, "Create admin request\n");
          break;
        }
        default: {
          this.setResponse(res, 404, headers, "Not found\n");
          break;
        }
      }
    }
  }
}

