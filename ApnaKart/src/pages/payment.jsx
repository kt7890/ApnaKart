/* Payment page: options and simulation with "Place Order" navigation */
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useApp } from "../state/AppContext.jsx";
import { formatINR } from "../utils/format.js";
import PaymentOptions from "../components/PaymentOptions.jsx";

export default function Payment() {
  const { totals, placeOrder } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const quickBuyTotal = location.state?.quickBuyTotal ?? null;
  const [method, setMethod] = useState("UPI");

  function onPlaceOrder() {
    const id = placeOrder();
    navigate("/order-success", { state: { id } });
  }

  return (
    <div className="grid" style={{ gap: 12 }}>
      <div className="card">
        <div className="row-between">
          <div style={{ fontWeight: 700 }}>Payable Amount</div>
          <div className="price">{formatINR(quickBuyTotal ?? totals.total)}</div>
        </div>
      </div>
      <PaymentOptions method={method} setMethod={setMethod} onPlaceOrder={onPlaceOrder} />
    </div>
  );
}
