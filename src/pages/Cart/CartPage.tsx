import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import type { CartItem } from '../../context/CartContext';
import ShoppingBagIcon from '../../components/Icons/ShoppingBagIcon';
import TrashIcon from '../../components/Icons/TrashIcon';

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
        <ShoppingBagIcon className="w-24 h-24 mb-6 text-indigo-400" />
        <h1 className="text-3xl font-semibold text-slate-800 mb-3">Seu carrinho está vazio</h1>
        <p className="text-slate-500 mb-8 max-w-md">
          Parece que você ainda não adicionou nada. Que tal explorar nossos produtos e encontrar algo que ame?
        </p>
        <Link
          to="/"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Explorar Produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      
      <div className="bg-indigo-600 shrink-0 shadow-md">
        <div className="container mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white py-4 sm:py-6 text-center sm:text-left">
            Seu Carrinho de Compras
          </h1>
        </div>
      </div>

      <div className="flex-grow overflow-auto flex flex-col px-4 sm:px-6 pb-6">
        
        <div className="container mx-auto bg-white shadow-xl rounded-lg flex flex-col h-full overflow-hidden">
            
            <div className="px-4 pt-4 pb-2 sm:px-6 sm:pt-6 sm:pb-2 hidden sm:grid grid-cols-6 gap-4 border-b border-indigo-200 font-semibold text-slate-600 text-sm shrink-0">
              <div className="col-span-3">Produto</div>
              <div className="text-center">Quantidade</div>
              <div className="text-right">Subtotal</div>
              <div className="text-center">Remover</div>
            </div>

            <ul className="divide-y divide-indigo-100 overflow-y-auto flex-grow min-h-0 px-4 sm:px-6">
              {cartItems.map((item: CartItem) => (
                <li key={item.id} className="py-4 grid grid-cols-1 sm:grid-cols-6 gap-4 items-center">
                  <div className="col-span-1 sm:col-span-3 flex items-center">
                    <img src={item.image} alt={item.title} className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-md border border-slate-200 mr-3 sm:mr-4 shrink-0" />
                    <div className="flex-grow min-w-0">
                      <Link to={`/produto/${item.id}`} className="text-sm sm:text-base font-medium text-indigo-600 hover:text-indigo-700 hover:underline line-clamp-2" title={item.title}>
                        {item.title}
                      </Link>
                      <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">Preço Unit.: R$ {item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center text-sm sm:text-base">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="px-2 py-1 bg-slate-200 hover:bg-slate-300 rounded-l text-slate-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >-</button>
                    <span className="px-3 py-1 border-t border-b border-slate-200 text-slate-700 min-w-[40px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-slate-200 hover:bg-slate-300 rounded-r text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      aria-label="Aumentar quantidade"
                    >+</button>
                  </div>
                  <div className="text-sm sm:text-base font-medium text-slate-700 text-center sm:text-right">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </div>
                  <div className="text-center">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                      aria-label="Remover item"
                    ><TrashIcon className="w-5 h-5 sm:w-6 sm:h-6" /></button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-4 pb-4 px-4 sm:pt-6 sm:pb-6 sm:px-6 border-t border-indigo-200 shrink-0">
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
                  className="order-2 sm:order-1 px-6 py-2 text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 border border-red-300 rounded-md transition-colors w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-red-500"
                >Limpar Carrinho</button>
                <button
                  onClick={handlePurchase}
                  className="order-1 sm:order-2 px-6 py-3 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >Finalizar Compra</button>
              </div>
              <div className="mt-6 text-center">
                <Link
                  to="/"
                  className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline"
                >&larr; Continuar Comprando</Link>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;