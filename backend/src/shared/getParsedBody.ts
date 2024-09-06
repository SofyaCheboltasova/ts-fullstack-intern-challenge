import { IncomingMessage } from "http";
import Like from "../entity/Like";
import User from "../entity/User";

export default async function getParsedBody<T extends User | Like>(
  req: IncomingMessage
): Promise<T> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const parsedBody = JSON.parse(body);
        resolve(parsedBody);
      } catch (error) {
        reject(error);
      }
    });
  });
}

