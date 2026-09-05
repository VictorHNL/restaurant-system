import {
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { CartContext, type CartProduct, type CartItem } from "./cart";

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({
  children,
}: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  const [notification, setNotification] =
    useState<string | null>(null);

  function addToCart(product: CartProduct) {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          product,
          quantity: 1,
        },
      ];
    });

    setNotification(
      `${product.name} foi adicionado ao carrinho!`
    );

    setTimeout(() => {
      setNotification(null);
    }, 2500);
  }

  function decreaseQuantity(productId: number) {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.product.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(productId: number) {
    setItems((currentItems) =>
      currentItems.filter(
        (item) => item.product.id !== productId
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [items]);

  const totalPrice = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total + item.product.price * item.quantity,
      0
    );
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        notification,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
