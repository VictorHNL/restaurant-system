import axios from "axios";
export const productsApi = axios.create({ baseURL: import.meta.env.VITE_PRODUCT_API_URL || "http://localhost:8000", timeout: 8000 });
export const ordersApi = axios.create({ baseURL: import.meta.env.VITE_ORDER_API_URL || "http://localhost:8001", timeout: 15000 });
export function errorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const detail = error.response?.data?.detail;
    if (typeof detail === "string") return detail;
    if (error.response?.status === 422) return "Confira os itens e as quantidades do pedido.";
  }
  return "Não foi possível acessar o serviço. Tente novamente em instantes.";
}
