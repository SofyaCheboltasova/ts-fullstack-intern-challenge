import Like from "../entity/Like";
import User from "../entity/User";

export interface Response {
  statusCode: number;
  response: ResponseData;
  headers?: Map<string, string>;
}

export type ResponseData = string | Like | [] | Like[] | User;

