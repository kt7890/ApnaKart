/* Size chart modal-like section for guidance */
import React from "react";
export default function SizeChart() {
  return (
    <div className="card">
      <div style={{ fontWeight: 700, marginBottom: 6 }}>Size Chart</div>
      <div className="grid cols-2">
        <div>
          <div>Men (T-Shirts/Shirts)</div>
          <div className="row" style={{ color: "var(--muted)" }}>S 38" • M 40" • L 42" • XL 44"</div>
        </div>
        <div>
          <div>Women (Kurtas/Dresses)</div>
          <div className="row" style={{ color: "var(--muted)" }}>XS 32" • S 34" • M 36" • L 38"</div>
        </div>
        <div>
          <div>Kids</div>
          <div className="row" style={{ color: "var(--muted)" }}>2Y 20" • 4Y 22" • 6Y 24" • 8Y 26"</div>
        </div>
      </div>
      <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 6 }}>
        Tip: Check "Size-fit" feedback (Runs Small / Perfect Fit / Loose)
      </div>
    </div>
  );
}
