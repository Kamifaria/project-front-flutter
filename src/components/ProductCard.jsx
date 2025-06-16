import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const image = product.photo || product.image || product.avatar || 'https://via.placeholder.com/150';
  const price = Number(product.price || product.price_in_euro || 0).toFixed(2);
  const name = product.name || product.title || 'Sem nome';

  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-xl transition">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-lg font-semibold mt-2">{name}</h2>
      <p className="text-gray-700">R$ {price}</p>

      <Link
        to={`/product/${product.id}`}
        className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Ver Detalhes
      </Link>
    </div>
  );
}

export default ProductCard;
