// src/context/CartContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import type { Product } from "../types";

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
}

const CART_STORAGE_KEY = 'rocketShopCart'; 

const CartContext = createContext<CartContextType>(null!);

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
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const localData = localStorage.getItem(CART_STORAGE_KEY);
      return localData ? JSON.parse(localData) : []; 
    } catch (error) {
      console.error("Erro ao carregar carrinho do localStorage:", error);
      return []; 
    }
  });

  const [itemCount, setItemCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0.0);

  useEffect(() => {
    const newTotalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setItemCount(newTotalCount);

    const newTotalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(newTotalPrice);

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Erro ao salvar carrinho no localStorage:", error);
    }

    console.log("Carrinho atualizado (Context):", cartItems);
    console.log("Total de itens (Context):", newTotalCount);
    console.log("Preço total (Context): R$", newTotalPrice.toFixed(2));
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

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY); 
    } catch (error) {
      console.error("Erro ao limpar carrinho do localStorage:", error);
    }
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};