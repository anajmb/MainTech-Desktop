import { api } from "./axios";
import { Buffer } from "buffer";

const TOKEN_KEY = "@user_token";

export async function saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export async function getToken(): Promise<string | null> {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return token;
}

export async function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
  delete api.defaults.headers.common["Authorization"];
}

export function decodeJwt(token?: string) {
    if (!token) return null;
    try {
        const payload = token.split(".")[1];
        const padded = payload.padEnd(payload.length + (4 - (payload.length % 4)) % 4, "=");
        const json = Buffer.from(padded.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
        return JSON.parse(json);
    } catch {
        return null;
    }
}

export async function fetchCurrentUser(): Promise<any | null> {
  const token = await getToken();
  const payload = decodeJwt(token ?? undefined);
  const id = payload?.id ?? payload?.sub ?? payload?.userId;
  if (!id) return null;

  try {
    const res = await api.get(`/employees/getUnique/${id}`);
    if (res?.data) return res.data;
  } catch (err) {
    console.error("Erro ao buscar usuário:", err);
  }

  return null;
}
