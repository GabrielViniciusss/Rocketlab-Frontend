import productsData from "../../data/products.json";
import type { Product } from "../../types/index.ts";
import { Link } from "react-router-dom";

const products: Product[] = productsData as Product[];

export const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-indigo-600 py-3 sm:py-4 px-4">
        <div className="flex items-center justify-between">
          {" "}
          <div className="flex items-baseline">
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
          </div>
          <div></div>
        </div>
      </nav>

      <div className="container mx-auto p-4 mt-6">
        <p className="text-3xl sm:text-4xl font-semibold text-indigo-600 text-center mt-4 mb-10 sm:mt-1 sm:mb-12">
          Os melhores Produtos estão aqui há 22 anos
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((product) => (
            <Link
              to={`/produto/${product.id}`}
              key={product.id}
              className="group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 bg-white flex flex-col"
            >
              <div className="p-5 flex flex-col items-center flex-grow">
                <div className="w-full h-52 mb-5 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h2 className="text-lg font-semibold mb-2 text-center text-slate-800 h-16 line-clamp-2">
                  {product.title}
                </h2>
                <p className="text-2xl font-bold text-indigo-600 mb-4">
                  R$ {product.price.toFixed(2)}
                </p>
              </div>
              <div className="p-5 pt-0 mt-auto bg-slate-50 rounded-b-lg">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(
                      `Botão 'Adicionar ao Carrinho' para ${product.title} clicado.`
                    );
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 text-sm"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
