import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const exists = cartItems.find(
      (item) => item.id === product.id && item.provider === product.provider
    );

    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id && item.provider === product.provider
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId, provider) => {
    setCartItems(
      cartItems.filter(
        (item) => !(item.id === productId && item.provider === provider)
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const total = cartItems.reduce((acc, item) => {
    const price = Number(item.price || item.price_in_euro || 0);
    return acc + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};
