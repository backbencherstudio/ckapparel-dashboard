import api from "@/lib/axios";
import type { MeResponseBody, User } from "@/types/auth.types";
import axios from "axios";

function messageFromAxiosError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    if (typeof data?.message === "string") return data.message;
    if (error.response?.status === 401) return "Invalid email or password.";
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong";
}

export const authService = {
  async login(credentials: { email: string; password: string }) {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || "Login failed");
      }

      return await authService.me();
    } catch (e) {
      if (e instanceof Error) throw e;
      throw new Error(messageFromAxiosError(e));
    }
  },

  async me(): Promise<User> {
    try {
      const { data } = await api.get<MeResponseBody>("/auth/me");
      if (data?.data) return data.data;
      throw new Error(data?.message ?? "Failed to load profile");
    } catch (e) {
      throw new Error(messageFromAxiosError(e));
    }
  },

  async logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
  },
};
