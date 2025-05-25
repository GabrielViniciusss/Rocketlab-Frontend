import React, { useState, useMemo } from "react";
import productsData from "../../data/products.json";
import type { Product } from "../../types/index.ts";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartResume from "../../components/Cart/CartResume.tsx";
import { Navbar } from "../../components/Navbar/Navbar";
import CartIcon from "../../components/Icons/CartIcon";
import SearchIcon from "../../components/Icons/SearchIcon";
import SearchComponent from "../../components/Search/SearchComponent";

const productsList: Product[] = productsData as Product[];

export const Home = () => {
  const { cartItems, addToCart, updateQuantity, itemCount } = useCart();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleInitialAddToCart = (product: Product) => {
    addToCart(product);
  };

  const openCartModal = () => setIsCartModalOpen(true);
  const closeCartModal = () => setIsCartModalOpen(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };
  const handleRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRating(event.target.value);
  };

  const toggleAdvancedFilters = () => {
    const newVisibility = !showAdvancedFilters;
    setShowAdvancedFilters(newVisibility);
    if (!newVisibility) {
      setSearchTerm("");
      setSelectedCategory("");
      setSelectedRating("");
    }
  };

  const uniqueCategories = useMemo(() => {
    const categories = Array.from(new Set(productsList.map(p => p.category)));
    return categories.sort((a, b) => a.localeCompare(b));
  }, []);

  const ratingOptions = [
    { value: "", label: "Qualquer Avaliação" },
    { value: "4-5", label: "★★★★☆ (4+)" },
    { value: "3-4", label: "★★★☆☆ (3-3.9)" },
    { value: "2-3", label: "★★☆☆☆ (2-2.9)" },
    { value: "1-2", label: "★☆☆☆☆ (1-1.9)" },
    { value: "0-1", label: "☆☆☆☆☆ (0-0.9)" }
  ];

  const filteredProducts = useMemo(() => {
    return productsList.filter(product => {
      const nameMatch = searchTerm === "" || product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch = selectedCategory === "" || product.category === selectedCategory;

      let ratingMatch = true;
      if (selectedRating !== "") {
        const rate = product.rating.rate;
        switch (selectedRating) {
          case "4-5": ratingMatch = rate >= 4; break;
          case "3-4": ratingMatch = rate >= 3 && rate < 4; break;
          case "2-3": ratingMatch = rate >= 2 && rate < 3; break;
          case "1-2": ratingMatch = rate >= 1 && rate < 2; break;
          case "0-1": ratingMatch = rate >= 0 && rate < 1; break;
          default: ratingMatch = true;
        }
      }
      return nameMatch && categoryMatch && ratingMatch;
    });
  }, [searchTerm, selectedCategory, selectedRating]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onCartIconClick={openCartModal} />

      <div
        className={`container mx-auto p-4 mt-6 ${
          isCartModalOpen ? "blur-sm" : ""
        } transition-all duration-300`}
      >
        <p className="text-3xl sm:text-4xl font-semibold text-indigo-600 text-center mt-4 mb-8 sm:mt-6 sm:mb-10">
          Os melhores Produtos estão aqui, há 22 anos
        </p>

        <div className="mb-6 sm:mb-8 flex flex-col items-center">
          <button
            onClick={toggleAdvancedFilters}
            className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md hover:shadow-lg transition-all duration-150 ease-in-out max-w-xs w-full sm:w-auto"
          >
            <SearchIcon className="h-5 w-5 mr-2" />
            {showAdvancedFilters ? "Ocultar Filtros" : "Pesquisar Produtos"}
          </button>
        </div>
        
        {showAdvancedFilters && (
          <SearchComponent
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            uniqueCategories={uniqueCategories}
            selectedRating={selectedRating}
            onRatingChange={handleRatingChange}
            ratingOptions={ratingOptions}
          />
        )}

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const cartItem = cartItems.find(item => item.id === product.id);
              const currentQuantity = cartItem ? cartItem.quantity : 0;

              return (
                <div
                  key={product.id}
                  className="group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white flex flex-col group-hover:brightness-90"
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
                    {currentQuantity === 0 ? (
                      <button
                        onClick={() => handleInitialAddToCart(product)}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 text-sm cursor-pointer"
                      >
                        Adicionar ao Carrinho
                      </button>
                    ) : (
                      <div className="flex items-center justify-around">
                        <button
                          onClick={() => updateQuantity(product.id, currentQuantity - 1)}
                          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-md text-indigo-600 font-bold text-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                          aria-label="Diminuir quantidade"
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold text-slate-700">{currentQuantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, currentQuantity + 1)}
                          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-md text-indigo-600 font-bold text-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          aria-label="Aumentar quantidade"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <SearchIcon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">Nenhum produto encontrado</h3>
            <p className="text-slate-500">
              Tente ajustar seus filtros ou clique em "Ocultar Filtros" para ver todos os produtos.
            </p>
          </div>
        )}
      </div>

      <Link
        to="/Cart"
        className="fixed bottom-6 right-10 sm:bottom-8 sm:right-12 bg-indigo-600 hover:bg-indigo-700 text-white p-3 sm:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 z-40 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 cursor-pointer"
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
          className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300"
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
                className="text-slate-500 hover:text-slate-700 text-2xl cursor-pointer"
                aria-label="Fechar modal do carrinho"
              >
                &times;
              </button>
            </div>
            <CartResume />
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closeCartModal}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
              >
                Continuar Comprando
              </button>
              <Link
                to="/Cart"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors cursor-pointer"
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