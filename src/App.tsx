import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { ProductDetail } from "./pages/ProductDetail/ProductDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:productId" element={<ProductDetail />} />
          {/* <Route path= "teste" element = {<Test />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
