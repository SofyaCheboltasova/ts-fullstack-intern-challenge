import axios, { HttpStatusCode } from "axios";
import { UserResponse } from "../types/Response";

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

export async function getUser(): Promise<UserResponse> {
  setAuthHeaders();
  const response = await axiosInstance.get(`/user`);
  if (response.status === HttpStatusCode.Ok) {
    return { user: response.data };
  }
  return { error: response.data.error };
}

export async function createUser(
  login: string,
  password: string
): Promise<UserResponse> {
  const response = await axiosInstance.post("/user", { login, password });

  if (response.status === HttpStatusCode.Created) {
    localStorage.setItem("auth_token", response.headers["x-auth-token"]);
    localStorage.setItem("user_id", response.data.id);
    return { user: response.data };
  }
  return { error: response.data.error };
}

