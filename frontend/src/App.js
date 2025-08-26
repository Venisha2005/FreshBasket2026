import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Banner from "./components/Banner";
import Header from "./components/Header";
import Checkout from "./pages/checkout";
import Store from "./pages/store";
import FruitDetail from "./pages/fruitDetail";  // ✅ Import details page
import CartPage from "./pages/cart";
import About from "./pages/about";

function App() {
  const [cart, setCart] = useState([]); // ✅ cart state in App

  return (
    <Router>
      <Header cart={cart} /> {/* ✅ show cart in header */}
      <Routes>
        {/* ✅ Home page */}
        <Route
          path="/"
          element={
            <div>
              <Banner />
              <div className="text-center py-8"></div>
            </div>
          }
        />

        {/* ✅ Store page */}
        <Route path="/store" element={<Store cart={cart} setCart={setCart} />} />

        {/* ✅ Fruit details page (dynamic route) */}
        <Route path="/fruit/:id" element={<FruitDetail cart={cart} setCart={setCart} />} />

        {/* ✅ Checkout page */}
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
        <Route path="/about" element={<About />} />

      </Routes>
    </Router>
  );
}

export default App;
