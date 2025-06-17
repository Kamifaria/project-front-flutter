import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const image =
    product.photo || product.image || product.avatar || 'https://via.placeholder.com/150';
  const price = Number(product.price || product.price_in_euro || 0).toFixed(2);
  const name = product.name || product.title || 'Sem nome';

  return (
    <div className="border rounded-xl shadow-lg p-5 flex flex-col justify-between hover:scale-105 hover:shadow-2xl transition bg-white">
      <img
        src={image}
        alt={name}
        className="w-full h-52 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-bold mb-2 text-black">{name}</h2>
      <p className="text-gray-700 text-lg mb-4">R$ {price}</p>

      <span className="text-sm mb-4 px-3 py-1 bg-blue-100 text-blue-800 rounded-full self-start">
        {product.provider === 'Brazilian'
          ? '🇧🇷 Fornecedor Brasileiro'
          : '🇪🇺 Fornecedor Europeu'}
      </span>

      <div className="flex gap-3 mt-auto">
        <button
          onClick={() => addToCart(product)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Adicionar
        </button>
        <Link
          to={`/product/${product.id}`}
          className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded text-center"
        >
          Detalhes
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
