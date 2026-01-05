/* Checkout page: address form (UI), order summary, price breakup */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../state/AppContext.jsx";
import { formatINR } from "../utils/format.js";

export default function Checkout() {
  const { address, setAddress, cart, totals } = useApp();
  const navigate = useNavigate();

  return (
    <div className="grid" style={{ gap: 12 }}>
      <div className="card">
        <div style={{ fontWeight: 700 }}>Delivery Address</div>
        <div className="grid">
          <input className="input" placeholder="Full Name" value={address.name} onChange={e => setAddress(a => ({ ...a, name: e.target.value }))} />
          <input className="input" placeholder="Phone" value={address.phone} onChange={e => setAddress(a => ({ ...a, phone: e.target.value }))} />
          <input className="input" placeholder="Address Line 1" value={address.line1} onChange={e => setAddress(a => ({ ...a, line1: e.target.value }))} />
          <input className="input" placeholder="Address Line 2" value={address.line2} onChange={e => setAddress(a => ({ ...a, line2: e.target.value }))} />
          <div className="row">
            <input className="input" placeholder="Pincode" value={address.pincode} onChange={e => setAddress(a => ({ ...a, pincode: e.target.value }))} />
            <input className="input" placeholder="City" value={address.city} onChange={e => setAddress(a => ({ ...a, city: e.target.value }))} />
            <input className="input" placeholder="State" value={address.state} onChange={e => setAddress(a => ({ ...a, state: e.target.value }))} />
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Order Summary</div>
        {cart.map(item => (
          <div key={`${item.id}:${item.size}:${item.color}`} className="row-between">
            <div>{item.name} × {item.qty}</div>
            <div className="price">{formatINR(item.price * item.qty)}</div>
          </div>
        ))}
        <div style={{ marginTop: 8 }}>
          <div className="row-between"><div>Subtotal</div><div className="price">{formatINR(totals.subtotal)}</div></div>
          <div className="row-between"><div>Discount</div><div className="discount">− {formatINR(totals.discount)}</div></div>
          <div className="row-between" style={{ fontWeight: 800 }}><div>Total</div><div className="price">{formatINR(totals.total)}</div></div>
        </div>
        <button className="btn primary" style={{ marginTop: 8 }} onClick={() => navigate("/payment")}>Continue to Payment</button>
      </div>
    </div>
  );
}
