/* Product detail page: gallery, 360° rotation simulation, size/color selection */
import React from "react";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useApp } from "../state/AppContext.jsx";
import { formatINR } from "../utils/format.js";
import SizeChart from "../components/SizeChart.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const { products, addToCart } = useApp();
  const product = useMemo(() => products.find(p => p.id === id), [products, id]);
  const [activeImg, setActiveImg] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState(product?.colors?.[0] || "");
  const [msg, setMsg] = useState("");

  if (!product) return <div className="card">Product not found</div>;

  function onAddToCart() {
    const res = addToCart({ ...product, size, color });
    setMsg(res.ok ? "Added to cart" : "Please select a size");
  }

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card">
        <div style={{ position: "relative" }}>
          <img
            className="product-img"
            src={product.images[activeImg]}
            alt={product.name}
            style={{ transform: `rotate(${rotate}deg)`, transition: "transform .2s" }}
            onMouseMove={(e) => setRotate(((e.nativeEvent.offsetX / e.currentTarget.clientWidth) - 0.5) * 40)}
            onError={(e) => {
              const fallback = product.images[1] || product.images[0];
              if (e.currentTarget.src !== window.location.origin + fallback) e.currentTarget.src = fallback;
            }}
          />
          <div className="row" style={{ marginTop: 8 }}>
            {product.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${product.name} ${i}`}
                style={{ width: 50, height: 50, borderRadius: 8, objectFit: "cover", cursor: "pointer", border: i === activeImg ? "2px solid var(--accent)" : "1px solid var(--border)" }}
                onClick={() => setActiveImg(i)}
                onError={(e) => {
                  const fallback = product.images[1] || product.images[0];
                  if (e.currentTarget.src !== window.location.origin + fallback) e.currentTarget.src = fallback;
                }}
              />
            ))}
          </div>
        </div>
        <div className="row" style={{ marginTop: 8 }}>
          <span className="badge">Same-day Delivery</span>
          <span className="badge">Next-day Delivery</span>
          <span className="badge">COD</span>
        </div>
      </div>

      <div className="card">
        <div style={{ fontSize: 20, fontWeight: 800 }}>{product.name}</div>
        <div className="row">
          <div className="price">{formatINR(product.price)}</div>
          {product.originalPrice && <div className="strike">{formatINR(product.originalPrice)}</div>}
          <div className="stars">★★★★★</div>
        </div>

        <div style={{ marginTop: 8 }}>
          <div style={{ fontWeight: 700 }}>Color</div>
          <div className="row" style={{ marginTop: 4 }}>
            {product.colors.map(c => (
              <div key={c} className={`color-swatch ${color === c ? "active" : ""}`} title={c} onClick={() => setColor(c)} style={{ background: swatchColor(c) }} />
            ))}
          </div>
        </div>

        <div style={{ marginTop: 8 }}>
          <div style={{ fontWeight: 700 }}>Size (select to enable Add to Cart)</div>
          <div className="row" style={{ marginTop: 4 }}>
            {product.sizes.map(s => (
              <button key={s} className={`size-btn ${size === s ? "active" : ""}`} onClick={() => setSize(s)}>{s}</button>
            ))}
          </div>
        </div>

        <div className="row" style={{ marginTop: 8 }}>
          <button className="btn primary" onClick={onAddToCart} disabled={!size}>Add to Cart</button>
          <div style={{ color: "var(--muted)" }}>{msg}</div>
        </div>

        <div className="grid cols-2" style={{ marginTop: 12 }}>
          <div>
            <div style={{ fontWeight: 700 }}>Fabric</div>
            <div>{product.fabric}</div>
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>Care</div>
            <div>{product.care}</div>
          </div>
        </div>
        <div className="row" style={{ marginTop: 8 }}>
          <span className="badge">Weather: Summer</span>
          <span className="badge">Fit: Perfect Fit</span>
        </div>
      </div>

      <SizeChart />

      <section className="card">
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Ratings & Reviews</div>
        <div className="card">Verified Customer: Loved the quality! Fits as expected.</div>
        <div className="card">Runs Small: Recommend one size up for Men’s shirts.</div>
      </section>
    </div>
  );
}

function swatchColor(name) {
  const map = { Black: "#000", White: "#fff", Navy: "#1e3a8a", Red: "#ef4444", Blue: "#3b82f6", Yellow: "#f59e0b", Pink: "#ec4899", Maroon: "#7f1d1d", Green: "#22c55e", Magenta: "#a21caf", Sky: "#93c5fd" };
  return map[name] || "#ccc";
}
