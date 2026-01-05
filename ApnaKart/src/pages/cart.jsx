/* Cart page: list items, qty controls, coupon input, totals and checkout */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../state/AppContext.jsx";
import { formatINR } from "../utils/format.js";
import CartItem from "../components/CartItem.jsx";

export default function Cart() {
  const { cart, updateQty, removeFromCart, applyCoupon, totals } = useApp();
  const navigate = useNavigate();

  return (
    <div className="grid" style={{ gap: 12 }}>
      {cart.length === 0 && <div className="card">Your cart is empty</div>}
      {cart.map(item => (
        <CartItem key={`${item.id}:${item.size}:${item.color}`} item={item} onQty={updateQty} onRemove={removeFromCart} />
      ))}

      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Apply Coupon</div>
        <div className="row">
          <input id="coupon" className="input" placeholder="APNA10, QUIZ5, FEST20, STUDENT10, FIRST15" />
          <button className="btn" onClick={() => applyCoupon(document.getElementById("coupon").value)}>Apply</button>
        </div>
      </div>

      <div className="card">
        <div className="row-between"><div>Subtotal</div><div className="price">{formatINR(totals.subtotal)}</div></div>
        <div className="row-between"><div>Discount</div><div className="discount">− {formatINR(totals.discount)}</div></div>
        <div className="row-between" style={{ fontWeight: 800 }}><div>Total</div><div className="price">{formatINR(totals.total)}</div></div>
        <button className="btn primary" style={{ marginTop: 8 }} onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
      </div>
    </div>
  );
}
