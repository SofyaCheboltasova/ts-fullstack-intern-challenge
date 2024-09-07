import axios from "axios";
import CatData from "../types/catData";

export async function fetchCats(page: number): Promise<CatData[] | undefined> {
  try {
    const response = await axios.get("http://localhost:8000/cats?page=" + page);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function createUser(
  login: string,
  password: string
): Promise<string | null> {
  try {
    const userData = { login: login, password: password };
    const response = await axios.post("http://localhost:8000/user", userData, {
      headers: { "Content-Type": "application/json" },
    });
    const token = response.headers["x-auth-token"];
    return token;
  } catch (err) {
    console.error(err);
    return null;
  }
}

