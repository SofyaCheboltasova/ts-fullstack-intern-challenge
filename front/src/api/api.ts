import axios from "axios";

const DEV_BASE_URL = "http://localhost:3000";
const PROD_BASE_URL = "/api";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.NODE_ENV === "prod" ? PROD_BASE_URL : DEV_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export function setAuthHeaders() {
  axiosInstance.defaults.headers["Authorization"] =
    `Bearer ${localStorage.getItem("auth_token")}`;
  axiosInstance.defaults.headers["X-User-Id"] = localStorage.getItem("user_id");
}
