/* Product listing page: grid, search, filters, sorting */
import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useApp } from "../state/AppContext.jsx";
import FilterBar from "../components/FilterBar.jsx";
import ProductCard from "../components/ProductCard.jsx";

export default function ProductList() {
  const { filteredProducts, setFilters } = useApp();
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const gender = params.get("gender");
    if (gender) setFilters(prev => ({ ...prev, gender: [gender] }));
  }, [location.search, setFilters]);

  return (
    <div className="grid" style={{ gap: 12 }}>
      <FilterBar />
      <div className="product-grid">
        {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
