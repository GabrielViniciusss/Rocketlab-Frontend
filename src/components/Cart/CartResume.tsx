import React from "react";
import { useCart } from "../../context/CartContext";

const CartResume: React.FC = () => {
  const { cartItems, itemCount, totalPrice } = useCart();

  if (itemCount === 0) {
    return (
      <div className="border border-slate-200 bg-white rounded-lg p-4 mb-6 shadow">
        <h3 className="text-lg font-semibold text-slate-700 mb-2">Carrinho</h3>
        <p className="text-sm text-slate-500">Seu carrinho está vazio.</p>
      </div>
    );
  }

  return (
    <div className="border border-slate-200 bg-white rounded-lg p-4 mb-6 shadow">
      <h3 className="text-lg font-semibold text-slate-700 mb-3">Carrinho</h3>
      <ul className="divide-y divide-slate-100 max-h-60 overflow-y-auto hide-scrollbar">
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
            <div className="text-sm text-slate-700 ml-2 text-right flex-shrink-0 w-24">
              <p className="text-xs">Qtd: {item.quantity}</p>
              <p className="font-medium mt-0.5">
                R$ {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="border-t border-slate-200 mt-3 pt-3">
        <div className="flex justify-between items-center font-semibold text-slate-800">
          <span>
            Total ({itemCount} {itemCount === 1 ? "item" : "itens"}):
          </span>
          <span>R$ {totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartResume;
