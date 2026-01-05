/* Filter bar with search, price slider, and facets */
import React from "react";
import { useApp } from "../state/AppContext.jsx";

const CATEGORIES = ["T-Shirts", "Shirts", "Jeans", "Kurtas", "Sarees", "Dresses", "Ethnic Wear", "Casual Wear", "Party Wear"];
const BRANDS = ["ApnaBasics", "ApnaTrends", "ApnaKids", "ApnaOffice", "ApnaEthnic"];
const SIZES = ["XS", "S", "M", "L", "XL", "2Y", "4Y", "6Y", "8Y", "Free"];
const COLORS = ["Black", "White", "Navy", "Red", "Blue", "Yellow", "Pink", "Maroon", "Green", "Magenta", "Sky"];
const GENDER = ["Men", "Women", "Kids"];
const OCCASIONS = ["Casual", "Festive", "Party"];

export default function FilterBar() {
  const { search, setSearch, filters, setFilters, sort, setSort } = useApp();
  const [min, max] = filters.price;

  function toggle(field, value) {
    setFilters(prev => {
      const arr = prev[field];
      const exists = arr.includes(value);
      return { ...prev, [field]: exists ? arr.filter(x => x !== value) : [...arr, value] };
    });
  }

  return (
    <div className="card">
      <div className="filter-bar">
        <input className="input" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />

        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="popular">Popular</option>
          <option value="price_low_high">Price: Low → High</option>
          <option value="newest">Newest</option>
        </select>

        <div className="accordion" style={{ gridColumn: "1 / -1" }}>
          <details open>
            <summary>Price range: ₹ {min} — ₹ {max}</summary>
            <div className="content row" style={{ gap: 16 }}>
              <input type="range" min="0" max="20000" value={min} onChange={e => setFilters(prev => ({ ...prev, price: [Number(e.target.value), prev.price[1]] }))} />
              <input type="range" min="0" max="20000" value={max} onChange={e => setFilters(prev => ({ ...prev, price: [prev.price[0], Number(e.target.value)] }))} />
            </div>
          </details>
        </div>

        <Facet title="Category" values={CATEGORIES} selected={filters.category} onToggle={(v) => toggle("category", v)} />
        <Facet title="Brand" values={BRANDS} selected={filters.brand} onToggle={(v) => toggle("brand", v)} />
        <Facet title="Size" values={SIZES} selected={filters.size} onToggle={(v) => toggle("size", v)} />
        <Facet title="Color" values={COLORS} selected={filters.color} onToggle={(v) => toggle("color", v)} />
        <Facet title="Gender" values={GENDER} selected={filters.gender} onToggle={(v) => toggle("gender", v)} />
        <Facet title="Occasion" values={OCCASIONS} selected={filters.occasion} onToggle={(v) => toggle("occasion", v)} />
      </div>
    </div>
  );
}

function Facet({ title, values, selected, onToggle }) {
  return (
    <div className="card" style={{ padding: 8 }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
      <div className="row">
        {values.map(v => (
          <button key={v} className={`pill ${selected.includes(v) ? "active" : ""}`} onClick={() => onToggle(v)}>{v}</button>
        ))}
      </div>
    </div>
  );
}
