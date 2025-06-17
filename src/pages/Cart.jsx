import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, total, clearCart } = useCart();

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8 text-blue-800 text-center">🛒 Carrinho</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-xl">
          <p>Seu carrinho está vazio.</p>
          <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
            Voltar para a loja
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.provider}`}
              className="flex gap-6 border-b pb-4 items-center"
            >
              <img
                src={item.photo || item.image || item.avatar}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
              />

              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">
                  {item.provider === 'Brazilian' ? '🇧🇷 Fornecedor Brasileiro' : '🇪🇺 Fornecedor Europeu'}
                </p>
                <p className="mt-1">Preço: R$ {Number(item.price || item.price_in_euro || 0).toFixed(2)}</p>

                <div className="flex gap-4 mt-3 items-center">
                  <button
                    onClick={() => updateQuantity(item.id, item.provider, item.quantity - 1)}
                    className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                  >
                    -
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.provider, item.quantity + 1)}
                    className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id, item.provider)}
                    className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remover
                  </button>
                </div>
              </div>

              <div className="text-lg font-bold">
                Subtotal: R$ {(Number(item.price || item.price_in_euro || 0) * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={clearCart}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Limpar Carrinho
            </button>

            <div className="text-2xl font-bold">
              Total: R$ {total.toFixed(2)}
            </div>

            <Link
              to="/checkout"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
              Finalizar Pedido
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
