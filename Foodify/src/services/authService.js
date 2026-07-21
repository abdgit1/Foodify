import apiClient from "./apiClient";

export async function loginUser(credentials) {
  return await apiClient.post("/user/login/", credentials, { skipUnwrap: true });
}

export async function registerUser(userData) {
  return await apiClient.post("/user/register/", userData, { skipUnwrap: true });
}