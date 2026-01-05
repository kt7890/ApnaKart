/* Reusable product card: shows image, name, INR price, discount */
import React from "react";
import { Link } from "react-router-dom";
import { formatINR, discountLabel } from "../utils/format.js";
import { useApp } from "../state/AppContext.jsx";

export default function ProductCard({ product }) {
  const { wishlist, toggleWishlist } = useApp();
  const isWish = wishlist.includes(product.id);
  const disc = discountLabel(product.price, product.originalPrice);

  return (
    <div className="card">
      <Link to={`/product/${product.id}`}>
        <img
          className="product-img"
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            const fallback = product.images[1] || "/images/men_tshirt.svg";
            if (e.currentTarget.src !== window.location.origin + fallback) e.currentTarget.src = fallback;
          }}
        />
      </Link>
      <div className="row-between" style={{ marginTop: 8 }}>
        <div>
          <div style={{ fontWeight: 600 }}>{product.name}</div>
          <div className="row">
            <span className="price">{formatINR(product.price)}</span>
            {product.originalPrice && <span className="strike">{formatINR(product.originalPrice)}</span>}
            {disc && <span className="discount">{disc}</span>}
          </div>
        </div>
        <button className="btn ghost" aria-label="Wishlist" onClick={() => toggleWishlist(product.id)}>
          {isWish ? "♥" : "♡"}
        </button>
      </div>
      <div className="row" style={{ marginTop: 6 }}>
        <span className="badge">{product.brand}</span>
        <span className="badge">{product.category}</span>
        <span className="badge">{product.gender}</span>
        <span className="badge">{product.occasion}</span>
      </div>
    </div>
  );
}
