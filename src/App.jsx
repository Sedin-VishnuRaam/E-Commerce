import ProductList from "./features/products/ProductList.jsx";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./features/cart/Cart.jsx";

export default function App() {
  return (
    <>
    

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      </>
  );
}
