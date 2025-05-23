// src/pages/Cart/CartPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import type { CartItem } from '../../context/CartContext';

const TrashIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.48 0A48.697 48.697 0 0 1 5.25 6H10" />
  </svg>
);

export const CartPage: React.FC = () => {
  const {
    cartItems,
    itemCount,
    totalPrice,
    removeFromCart,
    updateQuantity,
    clearCart
  } = useCart();

  const [isPurchaseSuccessful, setIsPurchaseSuccessful] = useState(false);
  const navigate = useNavigate();

  const handlePurchase = () => {
    console.log("Processando compra...", cartItems);
    clearCart();
    setIsPurchaseSuccessful(true);
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  if (isPurchaseSuccessful) {
    return (
      <div className="container mx-auto p-6 text-center min-h-[calc(100vh-100px)] flex flex-col justify-center items-center">
        <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h1 className="text-3xl font-bold text-green-600 mb-4">Compra bem sucedida!</h1>
        <p className="text-slate-700 mb-8">Obrigado por comprar na RocketShop!</p>
        <button
          onClick={handleContinueShopping}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          Voltar à página principal para comprar mais itens
        </button>
      </div>
    );
  }

  if (itemCount === 0) {
    return (
      <div className="container mx-auto p-6 text-center min-h-[calc(100vh-100px)] flex flex-col justify-center items-center">
        <h1 className="text-3xl font-semibold text-slate-700 mb-4">Seu carrinho está vazio</h1>
        <Link
          to="/"
          className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline"
        >
          Continuar comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 min-h-[calc(100vh-100px)]">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6 sm:mb-8">Seu Carrinho de Compras</h1>

      <div className="bg-white shadow-xl rounded-lg p-4 sm:p-6">
        <div className="hidden sm:grid grid-cols-6 gap-4 mb-4 pb-2 border-b font-semibold text-slate-600 text-sm">
          <div className="col-span-3">Produto</div>
          <div className="text-center">Quantidade</div>
          <div className="text-right">Subtotal</div>
          <div className="text-center">Remover</div>
        </div>

        <ul className="divide-y divide-slate-200">
          {cartItems.map((item: CartItem) => (
            <li key={item.id} className="py-4 grid grid-cols-1 sm:grid-cols-6 gap-4 items-center">
              <div className="col-span-1 sm:col-span-3 flex items-center">
                <img src={item.image} alt={item.title} className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-md border border-slate-200 mr-3 sm:mr-4" />
                <div className="flex-grow">
                  <Link to={`/produto/${item.id}`} className="text-sm sm:text-base font-medium text-indigo-600 hover:underline line-clamp-2" title={item.title}>
                    {item.title}
                  </Link>
                  <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">Preço Unit.: R$ {item.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center justify-center text-sm sm:text-base">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="px-2 py-1 bg-slate-200 hover:bg-slate-300 rounded-l text-slate-700 disabled:opacity-50"
                  aria-label="Diminuir quantidade"
                >
                  -
                </button>
                <span className="px-3 py-1 border-t border-b border-slate-200 text-slate-700 min-w-[40px] text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-slate-200 hover:bg-slate-300 rounded-r text-slate-700"
                  aria-label="Aumentar quantidade"
                >
                  +
                </button>
              </div>

              <div className="text-sm sm:text-base font-medium text-slate-700 text-center sm:text-right">
                R$ {(item.price * item.quantity).toFixed(2)}
              </div>

              <div className="text-center">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50"
                  aria-label="Remover item"
                >
                  <TrashIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <div className="text-right">
              <p className="text-lg sm:text-xl font-semibold text-slate-800">
                Total Geral: R$ {totalPrice.toFixed(2)}
              </p>
              <p className="text-sm text-slate-500">
                {itemCount} {itemCount === 1 ? 'item' : 'itens'}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-end items-center gap-3">
            <button
              onClick={clearCart}
              className="order-2 sm:order-1 px-6 py-2 text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 border border-red-300 rounded-md transition-colors w-full sm:w-auto"
            >
              Limpar Carrinho
            </button>
            <button
              onClick={handlePurchase}
              className="order-1 sm:order-2 px-6 py-3 text-base font-semibold text-white bg-green-500 hover:bg-green-600 rounded-md transition-colors w-full sm:w-auto"
            >
              Finalizar Compra
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline text-sm sm:text-base"
            >
              &larr; Continuar Comprando
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartPage;