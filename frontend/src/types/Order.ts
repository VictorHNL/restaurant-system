export interface Order {
  id: number; status: string; total: number; created_at: string;
  items: { product_id: number; name: string; quantity: number; unit_price: number; subtotal: number }[];
}
