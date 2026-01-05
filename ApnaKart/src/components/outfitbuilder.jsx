/* Mix & Match Outfit Builder with rule-based recommendations */
import React from "react";
import { useMemo, useState } from "react";
import { useApp } from "../state/AppContext.jsx";
import { formatINR } from "../utils/format.js";

export default function OutfitBuilder() {
  const { products } = useApp();
  const tops = products.filter(p => ["T-Shirts", "Shirts", "Kurtas"].includes(p.category));
  const bottoms = products.filter(p => ["Jeans"].includes(p.category));
  const ethnic = products.filter(p => ["Sarees"].includes(p.category));
  const [top, setTop] = useState(null);
  const [bottom, setBottom] = useState(null);
  const [eth, setEth] = useState(null);

  const recommendation = useMemo(() => {
    if (top && bottom) return "Great casual combo! Add sneakers for a complete look.";
    if (eth) return "Festive pick! Pair with matching bangles and sandals.";
    return "Select items to build your outfit.";
  }, [top, bottom, eth]);

  const total = (top?.price || 0) + (bottom?.price || 0) + (eth?.price || 0);

  return (
    <div className="card">
      <div className="row-between">
        <div style={{ fontWeight: 700 }}>Mix & Match Outfit Builder</div>
        <div className="price">{formatINR(total)}</div>
      </div>
      <div className="grid cols-3">
        <Selector title="Top" list={tops} selected={top} onSelect={setTop} />
        <Selector title="Bottom" list={bottoms} selected={bottom} onSelect={setBottom} />
        <Selector title="Ethnic" list={ethnic} selected={eth} onSelect={setEth} />
      </div>
      <div className="card" style={{ marginTop: 10 }}>{recommendation}</div>
    </div>
  );
}

function Selector({ title, list, selected, onSelect }) {
  return (
    <div>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>{title}</div>
      <div className="row">
        {list.map(p => (
          <button key={p.id} className={`pill ${selected?.id === p.id ? "active" : ""}`} onClick={() => onSelect(p)}>
            {p.name}
          </button>
        ))}
      </div>
    </div>
  );
}
