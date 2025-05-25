import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartIcon from '../Icons/CartIcon'; 

interface NavbarProps {
  onCartIconClick: () => void; 
}

export const Navbar: React.FC<NavbarProps> = ({ onCartIconClick }) => {
  const { itemCount } = useCart();

  return (
    <nav className="bg-indigo-600 py-3 sm:py-4 px-4 sticky top-0 z-30 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-baseline">
          <span
            className="font-bold text-2xl sm:text-3xl text-white mr-1"
            style={{
              fontFamily: "sans-serif",
              fontWeight: 700,
              fontStyle: "italic",
            }}
          >
            Rocket
          </span>
          <span
            className="text-base sm:text-lg text-indigo-200"
            style={{ fontFamily: "sans-serif", fontWeight: 500 }}
          >
            Shop
          </span>
        </Link>

        <button
          onClick={onCartIconClick} 
          className="relative text-white hover:text-indigo-200 transition-colors p-1"
          aria-label="Abrir resumo do carrinho"
        >
          <CartIcon className="w-16 h-16" />
          {itemCount > 0 && (
            <span className="absolute -top-1.5 -right-2.5 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};