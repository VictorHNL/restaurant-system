import axios from "axios";
import { errorMessage } from "./api";

const api = axios.create({ baseURL: import.meta.env.VITE_USER_API_URL || "http://localhost:8002" });
export type User = { id: number; name: string; email: string };
type Session = { token: string; user: User };
export function session(): Session | null {
  const raw = localStorage.getItem("le-maitre-session");
  return raw ? JSON.parse(raw) as Session : null;
}
export function logout() { localStorage.removeItem("le-maitre-session"); }
async function save(request: Promise<{data: Session}>) {
  const data = (await request).data; localStorage.setItem("le-maitre-session", JSON.stringify(data)); return data;
}
export const register = (name: string, email: string, password: string) => save(api.post("/auth/register", {name,email,password}));
export const login = (email: string, password: string) => save(api.post("/auth/login", {email,password}));
export const authError = errorMessage;
