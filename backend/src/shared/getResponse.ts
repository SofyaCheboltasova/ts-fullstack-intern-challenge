import { Response, ResponseData } from "../type/ResponseType";

export default function getResponse<T extends ResponseData>(
  status: number,
  response: T,
  headers?: Map<string, string>
): Response {
  return {
    statusCode: status,
    response: response,
    headers: headers,
  };
}

