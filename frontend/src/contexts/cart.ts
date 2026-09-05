import { createContext, useContext } from "react";
export interface CartProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

export interface CartContextData {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  notification: string | null;

  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextData | undefined>(
  undefined
);

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart deve ser utilizado dentro de CartProvider"
    );
  }

  return context;
}
