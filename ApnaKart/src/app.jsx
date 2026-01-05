/* App layout and routing */
import React from "react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import { Home as HomeIcon, ShoppingBag, ShoppingCart, Zap, MessageCircle, Heart, User } from "lucide-react";
import Home from "./pages/Home.jsx";
import ProductList from "./pages/ProductList.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Payment from "./pages/Payment.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import DarkModeToggle from "./components/DarkModeToggle.jsx";
import ChatWidget from "./components/ChatWidget.jsx";
import { useApp } from "./state/AppContext.jsx";
import { formatINR } from "./utils/format.js";

export default function App() {
  const { cart, coins, wishlist } = useApp();
  const navigate = useNavigate();

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="app">
      <header className="header">
        <div className="brand" onClick={() => navigate("/")}>
          <ShoppingBag className="icon" /> ApnaKart
        </div>
        <nav className="nav">
          <NavLink to="/" end className="nav-link">
            <HomeIcon size={20} />
            <span>Home</span>
          </NavLink>
          <NavLink to="/products" className="nav-link">
            <ShoppingBag size={20} />
            <span>Shop</span>
          </NavLink>
          <NavLink to="/cart" className="nav-link">
            <div className="cart-icon-wrapper">
              <ShoppingCart size={20} />
              {cart.length > 0 && <span className="badge">{cart.length}</span>}
            </div>
            <span>Cart</span>
          </NavLink>
        </nav>
        <div className="actions">
          <div className="coins" title="Your ApnaCoins Rewards">
            <Zap size={16} fill="currentColor" /> {coins}
          </div>
          <DarkModeToggle />
          <button className="quick-buy" onClick={() => navigate("/payment", { state: { quickBuyTotal: cartTotal } })}>
            Quick Buy
          </button>
        </div>
      </header>

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
      </main>

      <footer className="footer">
        <div>© {new Date().getFullYear()} ApnaKart — Fashion for India</div>
        <div className="trust">
          <span className="badge">Verified Reviews</span>
          <span className="badge">COD Available</span>
          <span className="badge">Same-day Delivery</span>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}
