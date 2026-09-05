import { ordersApi } from "./api";
import type { Order } from "../types/Order";
export async function createOrder(items: { product_id: number; quantity: number }[]) {
  return (await ordersApi.post<Order>("/orders", { items })).data;
}
export async function getOrders() { return (await ordersApi.get<Order[]>("/orders")).data; }
export async function getOrder(id: string) { return (await ordersApi.get<Order>("/orders/" + encodeURIComponent(id))).data; }
export const money = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
