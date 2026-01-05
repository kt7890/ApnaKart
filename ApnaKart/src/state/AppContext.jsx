/* Global application state: products, cart, wishlist, filters, theme, coins */
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import productsData from "../data/products.json";

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [products, setProducts] = useState(productsData);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    price: [0, 20000],
    category: [],
    brand: [],
    size: [],
    color: [],
    gender: [],
    occasion: []
  });
  const [sort, setSort] = useState("popular");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [coins, setCoins] = useState(0);
  const [coupon, setCoupon] = useState(null);
  const [address, setAddress] = useState({ name: "", phone: "", line1: "", line2: "", pincode: "", city: "", state: "" });
  const [returns, setReturns] = useState({ status: "initiated" });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
  }, [theme]);

  /* Derived products based on search, filters, sort */
  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => `${p.name} ${p.brand} ${p.category} ${p.gender} ${p.occasion}`.toLowerCase().includes(q));
    }
    list = list.filter(p =>
      p.price >= filters.price[0] && p.price <= filters.price[1] &&
      (filters.category.length ? filters.category.includes(p.category) : true) &&
      (filters.brand.length ? filters.brand.includes(p.brand) : true) &&
      (filters.gender.length ? filters.gender.includes(p.gender) : true) &&
      (filters.occasion.length ? filters.occasion.includes(p.occasion) : true) &&
      (filters.color.length ? filters.color.some(c => p.colors.includes(c)) : true) &&
      (filters.size.length ? filters.size.some(s => p.sizes.includes(s)) : true)
    );
    switch (sort) {
      case "price_low_high": list.sort((a, b) => a.price - b.price); break;
      case "newest": list.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0)); break;
      case "popular": default: list.sort((a, b) => (b.popularity || 0) - (a.popularity || 0)); break;
    }
    return list;
  }, [products, search, filters, sort]);

  /* Cart operations with mandatory size selection check */
  function addToCart(item) {
    if (!item.size) return { ok: false, reason: "size_required" };
    const key = `${item.id}:${item.size}:${item.color}`;
    setCart(prev => {
      const found = prev.find(x => `${x.id}:${x.size}:${x.color}` === key);
      if (found) return prev.map(x => x === found ? { ...x, qty: x.qty + (item.qty || 1) } : x);
      return [...prev, { ...item, qty: item.qty || 1 }];
    });
    setCoins(prev => prev + Math.floor(item.price / 100)); // earn 1 coin per ₹100
    return { ok: true };
  }
  const removeFromCart = (key) => setCart(prev => prev.filter(x => `${x.id}:${x.size}:${x.color}` !== key));
  const updateQty = (key, qty) => setCart(prev => prev.map(x => `${x.id}:${x.size}:${x.color}` === key ? { ...x, qty } : x));
  const clearCart = () => setCart([]);

  /* Wishlist toggle */
  const toggleWishlist = (id) => setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  /* Coupon logic: APNA10 = 10% | QUIZ5 = 5% */
  function applyCoupon(code) {
    const normalized = (code || "").trim().toUpperCase();
    if (!normalized) { setCoupon(null); return { ok: false }; }
    if (["APNA10", "QUIZ5", "FEST20", "STUDENT10", "FIRST15"].includes(normalized)) {
      setCoupon(normalized); return { ok: true };
    }
    return { ok: false };
  }

  /* Price totals with coupon */
  const totals = useMemo(() => {
    const subtotal = cart.reduce((s, x) => s + x.price * x.qty, 0);
    let discount = 0;
    const codes = { APNA10: 0.10, QUIZ5: 0.05, FEST20: 0.20, STUDENT10: 0.10, FIRST15: 0.15 };
    if (coupon && codes[coupon]) discount = Math.round(subtotal * codes[coupon]);
    const total = Math.max(0, subtotal - discount);
    return { subtotal, discount, total };
  }, [cart, coupon]);

  /* Place order simulation: return dummy order id */
  function placeOrder() {
    const id = "ORD" + Math.floor(100000 + Math.random() * 899999);
    clearCart();
    setReturns({ status: "initiated" });
    setCoins(prev => prev + 50); // bonus coins on order
    return id;
  }

  const value = {
    theme, setTheme,
    products, setProducts,
    search, setSearch,
    filters, setFilters,
    sort, setSort,
    filteredProducts,
    cart, addToCart, removeFromCart, updateQty, clearCart,
    wishlist, toggleWishlist,
    coins,
    coupon, applyCoupon,
    address, setAddress,
    totals,
    returns, setReturns,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

