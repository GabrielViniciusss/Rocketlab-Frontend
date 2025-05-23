// src/context/CartContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import type { Product } from "../types";
import type { ReactNode } from "react";

export interface CartItem extends Product {
  quantity: number;
}

interface CartContext {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  itemCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContext>(null!);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [itemCount, setItemCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0.0);

  useEffect(() => {
    const newTotalCount = cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    setItemCount(newTotalCount);

    const newTotalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(newTotalPrice);

    console.log("Carrinho atualizado:", cartItems);
    console.log("Total de itens:", newTotalCount);
    console.log("Preço total:", newTotalPrice.toFixed(2));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const value = {
    cartItems,
    addToCart,
    itemCount,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
