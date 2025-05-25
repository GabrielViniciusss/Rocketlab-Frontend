import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import productsData from "../../data/products.json";
import type { Product } from "../../types";
import { useCart } from "../../context/CartContext";

import { Navbar } from "../../components/Navbar/Navbar"; 
import CartIcon from "../../components/Icons/CartIcon"; 
import CartResume from "../../components/Cart/CartResume"; 

const products: Product[] = productsData as Product[];

export const ProductDetail: React.FC = () => {
  const { addToCart, itemCount } = useCart(); 
  const params = useParams();
  const productId = params.productId;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false); 

  const handleAddToCartFromDetail = (productToAdd: Product) => {
    addToCart(productToAdd);
  };

  const openCartModal = () => setIsCartModalOpen(true);
  const closeCartModal = () => setIsCartModalOpen(false);

  useEffect(() => {
    setLoading(true);
    if (productId) {
      const foundProduct = products.find(
        (p) => p.id === parseInt(productId, 10)
      );
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setProduct(null);
        console.warn(`Produto com ID ${productId} não encontrado.`);
      }
    }
    setLoading(false);
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <div className="text-center p-10">Carregando detalhes do produto...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar onCartIconClick={openCartModal} />
        <div className="text-center p-10 mt-6">
          <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
          <p className="mb-4">
            Não conseguimos encontrar um produto com o ID fornecido.
          </p>
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 hover:underline font-semibold"
          >
            &larr; Voltar para a página inicial
          </Link>
        </div>
        <Link
            to="/Cart"
            className="fixed bottom-6 right-10 sm:bottom-8 sm:right-12 bg-indigo-600 hover:bg-indigo-700 text-white p-3 sm:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 z-40 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
            aria-label="Ver carrinho de compras"
          >
            <CartIcon className="w-16 h-16" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform translate-x-1/4 -translate-y-1/4">
                {itemCount}
              </span>
            )}
          </Link>

          {isCartModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300"
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
                <CartResume /> 
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={closeCartModal}
                    className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                  >
                    Continuar Comprando
                  </button>
                  <Link
                    to="/Cart"
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
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onCartIconClick={openCartModal} />
      <div
        className={`container mx-auto p-4 sm:p-6 mt-6 sm:mt-10 ${
          isCartModalOpen ? "blur-sm" : ""
        } transition-all duration-300`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden md:flex md:items-start">
              <div className="md:w-1/2 p-4 sm:p-8 flex justify-center items-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full max-w-md h-auto object-contain max-h-[400px] sm:max-h-[500px] rounded-md"
                />
              </div>
              <div className="md:w-1/2 p-4 sm:p-8 flex flex-col justify-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
                  {product.title}
                </h1>
                <p className="text-slate-500 text-xs sm:text-sm mb-2 uppercase tracking-wider">
                  {product.category}
                </p>
                <p className="text-3xl sm:text-4xl font-semibold text-indigo-600 mb-4">
                  R$ {product.price.toFixed(2)}
                </p>
                <div className="mb-4 text-sm sm:text-base">
                  <span className="font-semibold text-slate-700">Avaliação:</span>
                  <span className="text-yellow-500 ml-1">
                    {product.rating.rate}/5
                  </span>
                  <span className="text-slate-500 ml-1">
                    ({product.rating.count} avaliações)
                  </span>
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed text-sm sm:text-base">
                  {product.description}
                </p>

                <button
                  onClick={() => handleAddToCartFromDetail(product)}
                  className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 text-base sm:text-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                >
                  Adicionar ao Carrinho
                </button>

                <Link
                  to="/"
                  className="text-indigo-600 hover:text-indigo-800 hover:underline mt-8 block text-sm sm:text-base"
                >
                  &larr; Voltar para todos os produtos
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <CartResume />
          </div>
        </div>
      </div>

      <Link
        to="/Cart"
        className="fixed bottom-6 right-10 sm:bottom-8 sm:right-12 bg-indigo-600 hover:bg-indigo-700 text-white p-3 sm:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 z-40 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
        aria-label="Ver carrinho de compras"
      >
        <CartIcon className="w-16 h-16" /> 
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform translate-x-1/4 -translate-y-1/4">
            {itemCount}
          </span>
        )}
      </Link>

      {isCartModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300"
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
            <CartResume /> 
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closeCartModal}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
              >
                Continuar Comprando
              </button>
              <Link
                to="/Cart"
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