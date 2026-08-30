import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

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

interface CartContextData {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  notification: string | null;

  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextData | undefined>(
  undefined
);

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

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart deve ser utilizado dentro de CartProvider"
    );
  }

  return context;
}