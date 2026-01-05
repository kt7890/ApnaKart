/* Payment options UI simulation: UPI, Card, COD */
import React from "react";
export default function PaymentOptions({ method, setMethod, onPlaceOrder }) {
  return (
    <div className="card">
      <div style={{ fontWeight: 700, marginBottom: 8 }}>Select Payment Method</div>
      <div className="row">
        <button className={`pill ${method === "UPI" ? "active" : ""}`} onClick={() => setMethod("UPI")}>UPI</button>
        <button className={`pill ${method === "CARD" ? "active" : ""}`} onClick={() => setMethod("CARD")}>Debit / Credit Card</button>
        <button className={`pill ${method === "COD" ? "active" : ""}`} onClick={() => setMethod("COD")}>Cash on Delivery (COD)</button>
      </div>

      {method === "UPI" && (
        <div style={{ marginTop: 12 }}>
          <input className="input" placeholder="Enter UPI ID (e.g., name@bank)" />
          <div className="card" style={{ marginTop: 8, textAlign: "center" }}>
            <img alt="UPI QR Scanner" src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ApnaKartUPI" style={{ width: 150, height: 150 }} />
            <div style={{ color: "var(--muted)", marginTop: 6 }}>Scan to pay</div>
          </div>
        </div>
      )}

      {method === "CARD" && (
        <div style={{ marginTop: 12 }} className="grid">
          <input className="input" placeholder="Card Number" />
          <div className="row">
            <input className="input" placeholder="Expiry MM/YY" />
            <input className="input" placeholder="CVV" />
          </div>
        </div>
      )}

      {method === "COD" && (
        <div className="card" style={{ marginTop: 12 }}>
          COD selected. Pay in cash upon delivery.
        </div>
      )}

      <button className="btn primary" style={{ marginTop: 12 }} onClick={onPlaceOrder}>Place Order</button>
    </div>
  );
}
