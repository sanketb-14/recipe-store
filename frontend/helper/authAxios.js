// authAxios.js
import { auth } from "@/app/lib/auth";
import axiosInstance from "./axiosInstance";

export async function getAuthenticatedAxios() {
  const session = await auth();
  const instance = axiosInstance.create();

  if (session?.accessToken) {
    instance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
      return config;
    });
  }

  return instance;
}