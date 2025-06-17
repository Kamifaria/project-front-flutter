import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';

function Checkout() {
  const { cartItems, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.address) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    // Aqui poderia enviar para uma API se quisesse

    alert('Pedido realizado com sucesso! ✅');
    clearCart();
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 py-10 text-center">
        <h1 className="text-4xl font-bold mb-6 text-blue-800">Checkout</h1>
        <p className="text-lg">Seu carrinho está vazio.</p>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
          Voltar para a loja
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8 text-blue-800 text-center">🧾 Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold mb-1">Nome</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              placeholder="Digite seu nome"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              placeholder="Digite seu email"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Endereço</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              placeholder="Digite seu endereço"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Confirmar Pedido
          </button>
        </form>

        {/* Resumo do pedido */}
        <div className="border rounded-xl p-6 shadow-md bg-white">
          <h2 className="text-2xl font-bold mb-4">Resumo do Pedido</h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.provider}`} className="flex justify-between">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">Qtd: {item.quantity}</p>
                </div>
                <div className="font-semibold">
                  R$ {(Number(item.price || item.price_in_euro || 0) * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4 flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
