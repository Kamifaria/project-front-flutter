import { useEffect, useState } from 'react';
import { getBrazilianProducts, getEuropeanProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [brazilianResponse, europeanResponse] = await Promise.all([
          getBrazilianProducts(),
          getEuropeanProducts(),
        ]);

        const combinedProducts = [
          ...brazilianResponse.data.map(p => ({ ...p, provider: 'Brazilian' })),
          ...europeanResponse.data.map(p => ({ ...p, provider: 'European' })),
        ];

        // Remove possíveis duplicados por id e fornecedor
        const uniqueProducts = combinedProducts.filter(
          (product, index, self) =>
            index === self.findIndex(
              (p) => p.id === product.id && p.provider === product.provider
            )
        );

        setProducts(uniqueProducts);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-semibold">Carregando produtos...</div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-10 text-center">
        🛍️ Produtos Disponíveis
      </h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard
              key={`${product.id}-${product.provider}`}
              product={product}
            />
          ))
        ) : (
          <div className="text-center text-xl">Nenhum produto encontrado.</div>
        )}
      </div>
    </div>
  );
}

export default Home;
