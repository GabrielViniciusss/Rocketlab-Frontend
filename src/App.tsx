import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { ProductDetail } from "./pages/ProductDetail/ProductDetail";
import { CartProvider } from "./context/CartContext";
import { CartPage } from './pages/Cart/CartPage';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:productId" element={<ProductDetail />} />
          <Route path="/carrinho" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
