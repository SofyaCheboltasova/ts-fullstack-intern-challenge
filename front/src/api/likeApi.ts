import axios, { HttpStatusCode } from "axios";
import { Response, LikeResponse } from "../types/Response";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
});

function setAuthHeaders() {
  axiosInstance.defaults.headers[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("auth_token")}`;
  axiosInstance.defaults.headers["X-User-Id"] = localStorage.getItem("user_id");
}

export async function addLike(catId: string): Promise<LikeResponse> {
  setAuthHeaders();
  const response = await axiosInstance.post("/likes", {
    cat_id: catId,
    created_at: new Date().toISOString(),
  });

  if (response.status === HttpStatusCode.Created) {
    return { like: response.data };
  }
  return { error: response.data.error };
}

export async function deleteLike(catId: string): Promise<void | Response> {
  setAuthHeaders();
  const response = await axiosInstance.delete(`likes/${catId}`);
  if (response.status !== HttpStatusCode.Ok) {
    return { error: response.data.error };
  }
}

export async function getLikes(): Promise<LikeResponse[] | Response> {
  setAuthHeaders();
  const response = await axiosInstance.post("likes");
  if (response.status === HttpStatusCode.Ok) {
    return response.data;
  }
  return { error: response.data.error };
}

