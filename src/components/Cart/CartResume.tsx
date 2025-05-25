import React from "react";
import { useCart } from "../../context/CartContext";
import TrashIcon from '../../components/Icons/TrashIcon';

const CartResume: React.FC = () => {
  const { cartItems, itemCount, totalPrice, updateQuantity, clearCart } = useCart();

  if (itemCount === 0) {
    return (
      <div className="border border-indigo-200 bg-white rounded-lg p-4 mb-6 shadow">
        <h3 className="text-lg font-semibold text-indigo-700 mb-2">Carrinho</h3>
        <p className="text-sm text-slate-500">Seu carrinho está vazio.</p>
      </div>
    );
  }

  return (
    <div className="border border-indigo-200 bg-white rounded-lg p-4 mb-6 shadow">
      <h3 className="text-lg font-semibold text-indigo-700 mb-3">Carrinho</h3>
      <ul className="divide-y divide-indigo-100 max-h-60 overflow-y-auto hide-scrollbar">
        {cartItems.map((item) => (
          <li key={item.id} className="flex items-center py-3">
            <img
              src={item.image}
              alt={item.title}
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-md border border-slate-200 mr-3 sm:mr-4"
            />
            <div className="flex-grow">
              <p
                className="text-sm font-medium text-slate-800 line-clamp-2"
                title={item.title}
              >
                {item.title}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Preço Unit.: R$ {item.price.toFixed(2)}
              </p>
            </div>
            <div className="ml-2 text-right flex-shrink-0 w-32 flex flex-col items-end justify-center">
              <div className="flex items-center justify-end mb-1">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 bg-slate-100 hover:bg-slate-200 rounded-md text-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Diminuir quantidade"
                  disabled={item.quantity <= 0}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-sm font-semibold text-slate-700 mx-2 w-5 text-center tabular-nums">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 bg-slate-100 hover:bg-slate-200 rounded-md text-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                  aria-label="Aumentar quantidade"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <p className="text-sm font-medium text-indigo-600">
                R$ {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="border-t border-indigo-200 mt-3 pt-3">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-slate-700">
            Total ({itemCount} {itemCount === 1 ? "item" : "itens"}):
          </span>
          <span className="font-bold text-lg text-indigo-700">R$ {totalPrice.toFixed(2)}</span>
        </div>
        {itemCount > 0 && (
          <div className="mt-4 text-center">
            <button
              onClick={clearCart}
              className="inline-flex items-center px-4 py-2 border border-red-300 text-xs font-medium rounded-md shadow-sm text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 transition-colors cursor-pointer"
            >
              <TrashIcon className="w-4 h-4 mr-2" />
              Limpar Carrinho
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartResume;