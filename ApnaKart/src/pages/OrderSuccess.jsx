/* Order success page: show dummy order id, continue shopping, returns tracking */
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../state/AppContext.jsx";

export default function OrderSuccess() {
  const { returns, setReturns } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id ?? "ORD000000";

  return (
    <div className="grid" style={{ gap: 12 }}>
      <div className="card" style={{ textAlign: "center" }}>
        <h2 style={{ margin: 0 }}>Order Placed Successfully</h2>
        <div style={{ color: "var(--muted)" }}>Order ID: {id}</div>
        <button className="btn primary" style={{ marginTop: 8 }} onClick={() => navigate("/")}>Continue Shopping</button>
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Return & Exchange Tracking</div>
        <div className="return-steps">
          <div className="return-step">Initiated</div>
          <div className="return-step">Picked</div>
          <div className="return-step">Quality Check</div>
          <div className="return-step">Refunded</div>
        </div>
        <div className="row" style={{ marginTop: 8 }}>
          <button className="btn" onClick={() => setReturns({ status: "picked" })}>Update: Picked</button>
          <button className="btn" onClick={() => setReturns({ status: "qc" })}>Update: QC</button>
          <button className="btn" onClick={() => setReturns({ status: "refunded" })}>Update: Refunded</button>
        </div>
        <div style={{ color: "var(--muted)", marginTop: 6 }}>Current Status: {returns.status}</div>
      </div>
    </div>
  );
}
