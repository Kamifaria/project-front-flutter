import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function Header() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-blue-800 text-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo e nome */}
        <div className="text-2xl font-bold flex items-center gap-2">
          <span role="img" aria-label="logo">🛍️</span>
          <Link to="/" className="hover:text-gray-300">
            Devnology Store
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex gap-10 items-center text-lg">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>

          <Link to="/cart" className="relative hover:text-gray-300">
            Carrinho
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          <Link to="/checkout" className="hover:text-gray-300">
            Checkout
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
