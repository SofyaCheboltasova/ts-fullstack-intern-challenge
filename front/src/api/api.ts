import axios, { HttpStatusCode } from "axios";
import CatData from "../types/catData";

export async function fetchCats(page: number): Promise<CatData[] | undefined> {
  try {
    const response = await axios.get("http://localhost:8000/cats?page=" + page);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export interface PostResponse {
  token?: string;
  error?: string;
}

export async function createUser(
  login: string,
  password: string
): Promise<PostResponse> {
  const userData = { login: login, password: password };
  const response = await axios.post("http://localhost:8000/user", userData, {
    headers: { "Content-Type": "application/json" },
  });

  if (response.status === HttpStatusCode.Created) {
    const token = response.headers["x-auth-token"];
    return { token: token };
  }

  return { error: response.data.error };
}

