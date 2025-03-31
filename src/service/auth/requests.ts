import { api } from "../api";
import { SignInOutput } from "./types";

export async function login(
  email: string,
  password: string,
): Promise<SignInOutput> {
  const response = await api.post("/auth/signin", { email, password });
  return response.data;
}

export async function register(email: string, password: string) {
  const response = await api.post("/auth/signup", { email, password });
  return response.data;
}

export async function requestPasswordChange(email: string) {
  const response = await api.patch("/auth/password", { email });
  return response.data;
}

export async function validatePasswordSecret(secret: string) {
  const response = await api.patch("/auth/password/validate", { secret });
  return response.data;
}

export async function changePassword(
  secret: string,
  password: string,
  email: string,
) {
  const response = await api.patch("/auth/password/change", {
    secret,
    password,
    email,
  });
  return response.data;
}
