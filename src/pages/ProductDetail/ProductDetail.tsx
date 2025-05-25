import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import productsData from "../../data/products.json";
import type { Product } from "../../types";
import { useCart } from "../../context/CartContext";
import CartComponent from "../../components/Cart/CartResume";

const products: Product[] = productsData as Product[];

export const ProductDetail: React.FC = () => {
  const { addToCart } = useCart(); // Obter a função
  const params = useParams();
  const productId = params.productId;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const handleAddToCartFromDetail = (productToAdd: Product) => {
    addToCart(productToAdd);
  };

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
      <div className="text-center p-10">Carregando detalhes do produto...</div>
    );
  }

  if (!product) {
    return (
      <div className="text-center p-10">
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
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 mt-6 sm:mt-10">
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
                {" "}
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
          <CartComponent />
        </div>
      </div>{" "}
    </div>
  );
};
