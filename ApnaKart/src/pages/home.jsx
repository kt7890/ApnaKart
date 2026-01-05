/* Home page: hero, featured, trending, arrivals, categories, offers */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../state/AppContext.jsx";
import ProductCard from "../components/ProductCard.jsx";
import FlashSaleTimer from "../components/FlashSaleTimer.jsx";
import OutfitBuilder from "../components/OutfitBuilder.jsx";
import StyleQuiz from "../components/StyleQuiz.jsx";

export default function Home() {
  const { products } = useApp();
  const navigate = useNavigate();
  const featured = products.slice(0, 4);
  const trending = [...products].sort((a, b) => (b.popularity || 0) - (a.popularity || 0)).slice(0, 4);
  const arrivals = products.filter(p => p.newArrival).slice(0, 4);

  return (
    <div className="grid" style={{ gap: 16 }}>
      <section className="hero">
        <h1>Festive Dhamaka — Flat 50% OFF (UI)</h1>
        <div style={{ color: "var(--muted)" }}>Free same-day delivery • COD available • Verified reviews</div>
        <div className="offers" style={{ marginTop: 8 }}>
          <div className="offer">Student Discount</div>
          <div className="offer">First Order Discount</div>
        </div>
        <div style={{ marginTop: 8 }}>
          <FlashSaleTimer endsAt={new Date(Date.now() + 48 * 3600_000).toISOString()} />
        </div>
      </section>

      <section>
        <div className="row-between">
          <h2 style={{ margin: 0 }}>Featured</h2>
          <button className="btn" onClick={() => navigate("/products")}>Explore All</button>
        </div>
        <div className="product-grid" style={{ marginTop: 8 }}>
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section>
        <h2 style={{ margin: 0 }}>Trending Fashion</h2>
        <div className="product-grid" style={{ marginTop: 8 }}>
          {trending.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section>
        <h2 style={{ margin: 0 }}>New Arrivals</h2>
        <div className="product-grid" style={{ marginTop: 8 }}>
          {arrivals.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section>
        <h2 style={{ margin: 0 }}>Shop by Category</h2>
        <div className="grid cols-3" style={{ marginTop: 8 }}>
          <CategoryCard title="Men" onClick={() => navigate("/products?gender=Men")} />
          <CategoryCard title="Women" onClick={() => navigate("/products?gender=Women")} />
          <CategoryCard title="Kids" onClick={() => navigate("/products?gender=Kids")} />
        </div>
      </section>

      <OutfitBuilder />
      <StyleQuiz />
    </div>
  );
}

function CategoryCard({ title, onClick }) {
  return (
    <div className="card" onClick={onClick} style={{ cursor: "pointer", textAlign: "center" }}>
      <div style={{ fontWeight: 700 }}>{title}</div>
      <div style={{ color: "var(--muted)" }}>Explore {title} collection</div>
    </div>
  );
}
