import axios, { HttpStatusCode } from "axios";
import CatData from "../types/catData";
import UserType from "../types/userData";
import { useAuth } from "../contexts/AuthContext";

export async function fetchCats(page: number): Promise<CatData[] | undefined> {
  try {
    const response = await axios.get("http://localhost:8000/cats?page=" + page);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export interface PostResponse {
  user?: UserType;
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
    return response.data;
  }

  return { error: response.data.error };
}

export async function addLike(cat_id: string) {
  const { user } = useAuth();

  const likeData = {
    cat_id: cat_id,
    user_id: user?.id,
    created_at: new Date().toISOString(),
  };
  const response = await axios.post("http://localhost:8000/likes", likeData, {
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": localStorage.getItem("auth_token"),
    },
  });

  if (response.status === HttpStatusCode.Created) {
    return response.data;
  }
  return { error: response.data.error };
}

