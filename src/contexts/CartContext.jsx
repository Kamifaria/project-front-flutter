import { createContext, useContext, useState } from 'react';

// Criando o contexto
const CartContext = createContext();

// Hook para usar o contexto mais facilmente
export const useCart = () => useContext(CartContext);

// Provider do carrinho
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ➕ Adicionar produto ao carrinho
  const addToCart = (product) => {
    const exists = cartItems.find(item => item.id === product.id && item.provider === product.provider);

    if (exists) {
      setCartItems(cartItems.map(item =>
        item.id === product.id && item.provider === product.provider
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // ➖ Remover produto do carrinho
  const removeFromCart = (productId, provider) => {
    setCartItems(cartItems.filter(item => !(item.id === productId && item.provider === provider)));
  };

  // 🔄 Alterar quantidade
  const updateQuantity = (productId, provider, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, provider);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId && item.provider === provider
          ? { ...item, quantity }
          : item
      ));
    }
  };

  // 🗑️ Limpar carrinho
  const clearCart = () => {
    setCartItems([]);
  };

  // 💰 Calcular total
  const total = cartItems.reduce((acc, item) => {
    const price = Number(item.price || item.price_in_euro || 0);
    return acc + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      total,
    }}>
      {children}
    </CartContext.Provider>
  );
};
