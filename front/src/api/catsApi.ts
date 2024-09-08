import axios, { HttpStatusCode } from "axios";
import { CatResponse } from "../types/Response";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
});

export async function fetchCats(page: number): Promise<CatResponse> {
  const response = await axiosInstance.get(`/cats?page=${page}`);

  if (response.status === HttpStatusCode.Ok) {
    return { cats: response.data };
  }
  return { error: response.data.error };
}

