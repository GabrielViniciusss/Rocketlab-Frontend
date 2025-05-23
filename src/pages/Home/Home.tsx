import React, { useState } from "react";
import productsData from "../../data/products.json";
import type { Product } from "../../types/index.ts";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartComponent from "../../components/CartComponent.tsx";

const products: Product[] = productsData as Product[];

const CartIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
  </svg>
);

export const Home = () => {
  const { addToCart, itemCount } = useCart();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const handleAddToCartClick = (
    product: Product,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    addToCart(product);
  };

  const openCartModal = () => setIsCartModalOpen(true);
  const closeCartModal = () => setIsCartModalOpen(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-indigo-600 py-3 sm:py-4 px-4 sticky top-0 z-30 shadow-md">
        {" "}
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
            onClick={openCartModal}
            className="relative text-white hover:text-indigo-200 transition-colors"
            aria-label="Abrir resumo do carrinho"
          >
            <CartIcon className="w-16 h-16" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      <div
        className={`container mx-auto p-4 mt-6 ${
          isCartModalOpen ? "blur-sm" : ""
        } transition-all duration-300`}
      >
        {" "}
        <p className="text-3xl sm:text-4xl font-semibold text-indigo-600 text-center mt-4 mb-14 sm:mt-6 sm:mb-16">
          Os melhores Produtos estão aqui, há 22 anos
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white flex flex-col"
            >
              <Link to={`/produto/${product.id}`} className="block">
                <div className="p-5 flex flex-col items-center flex-grow">
                  <div className="w-full h-52 mb-5 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h2 className="text-lg font-semibold mb-2 text-center text-slate-800 h-16 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {product.title}
                  </h2>
                  <p className="text-2xl font-bold text-indigo-600 mb-4">
                    R$ {product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
              <div className="p-5 pt-0 mt-auto bg-slate-50 rounded-b-lg">
                <button
                  onClick={(e) => handleAddToCartClick(product, e)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 text-sm"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link
        to="/carrinho"
        className="fixed bottom-6 right-20 sm:bottom-8 sm:right-20 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 z-40 flex items-center justify-center"
        aria-label="Ver carrinho"
      >
        <CartIcon className="w-16 h-16 sm:w-16 sm:h-16" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform translate-x-1/4 -translate-y-1/4">
            {itemCount}
          </span>
        )}
      </Link>

      {isCartModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300" // z-50 para o modal, maior que navbar e FAB
          onClick={closeCartModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md sm:max-w-lg mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-slate-800">
                Seu Carrinho
              </h2>
              <button
                onClick={closeCartModal}
                className="text-slate-500 hover:text-slate-700 text-2xl"
                aria-label="Fechar modal do carrinho"
              >
                &times;
              </button>
            </div>
            <CartComponent />
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closeCartModal}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
              >
                Continuar Comprando
              </button>
              <Link
                to="/carrinho"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
                onClick={closeCartModal}
              >
                Ver Carrinho Completo
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
