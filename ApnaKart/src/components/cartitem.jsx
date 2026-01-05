/* Cart item row with quantity controls and size/color display */
import React from "react";
import { formatINR } from "../utils/format.js";
export default function CartItem({ item, onQty, onRemove }) {
  const key = `${item.id}:${item.size}:${item.color}`;
  return (
    <div className="card">
      <div className="row-between">
        <div className="row">
          <img src={item.images?.[0]} alt={item.name} style={{ width: 60, height: 60, borderRadius: 8, objectFit: "cover" }} />
          <div>
            <div style={{ fontWeight: 600 }}>{item.name}</div>
            <div className="row">
              <span className="badge">Size: {item.size}</span>
              <span className="badge">Color: {item.color}</span>
            </div>
            <div className="price">{formatINR(item.price)}</div>
          </div>
        </div>
        <div className="row">
          <button className="btn" onClick={() => onQty(key, Math.max(1, item.qty - 1))}>−</button>
          <div className="badge">{item.qty}</div>
          <button className="btn" onClick={() => onQty(key, item.qty + 1)}>+</button>
          <button className="btn" onClick={() => onRemove(key)}>Remove</button>
        </div>
      </div>
    </div>
  );
}
