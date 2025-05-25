import React from 'react';
import SearchIcon from '../Icons/SearchIcon'; 

interface RatingOption {
  value: string;
  label: string;
}

interface ProductFiltersProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCategory: string;
  onCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  uniqueCategories: string[];
  selectedRating: string;
  onRatingChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  ratingOptions: RatingOption[];
}

const SearchComponent: React.FC<ProductFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  uniqueCategories,
  selectedRating,
  onRatingChange,
  ratingOptions,
}) => {
  return (
    <div className="mb-8 sm:mb-10 max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-lg transition-all duration-300 ease-in-out">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 items-end">
        <div className="md:col-span-3 lg:col-span-1">
          <label htmlFor="search-products" className="block text-sm font-medium text-slate-700 mb-1">
            Pesquisar por Nome
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              name="search-products"
              id="search-products"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2.5 text-sm border-slate-300 rounded-md placeholder-slate-400 shadow-sm"
              placeholder="Nome do produto..."
              value={searchTerm}
              onChange={onSearchChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="filter-category" className="block text-sm font-medium text-slate-700 mb-1">
            Categoria
          </label>
          <select
            id="filter-category"
            name="filter-category"
            value={selectedCategory}
            onChange={onCategoryChange}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2.5 px-3 text-sm border-slate-300 rounded-md bg-white shadow-sm"
          >
            <option value="">Todas as Categorias</option>
            {uniqueCategories.map(category => (
              <option key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-rating" className="block text-sm font-medium text-slate-700 mb-1">
            Avaliação
          </label>
          <select
            id="filter-rating"
            name="filter-rating"
            value={selectedRating}
            onChange={onRatingChange}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2.5 px-3 text-sm border-slate-300 rounded-md bg-white shadow-sm"
          >
            {ratingOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent