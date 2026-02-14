import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = useCallback((product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getSubtotal = useCallback(() => {
    return items.reduce(
      (total, item) => total + item.product.price_per_ton * item.quantity,
      0
    );
  }, [items]);

  const getItemCount = useCallback(() => {
    return items.length;
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        getSubtotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
