import React, { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import "./AllProducts.css";

const AllProducts = () => {
  const { addToCart } = useCart();
  const [addedProducts, setAddedProducts] = useState({});
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const allCategories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedProducts((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedProducts((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <div className="ap-page">

      {/* ── Hero Banner ── */}
      <div className="ap-hero">
        <div className="ap-hero__content">
          <p className="ap-hero__eyebrow">🌿 Complete Collection</p>
          <h1 className="ap-hero__title">All Products</h1>
          <p className="ap-hero__sub">
            Browse our full range of authentic Himalayan &amp; Ayurvedic products
          </p>
        </div>

        {/* Search */}
        <div className="ap-search-wrap">
          <span className="ap-search-icon">🔍</span>
          <input
            type="text"
            className="ap-search-input"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="ap-search-clear" onClick={() => setSearchQuery("")}>✕</button>
          )}
        </div>
      </div>

      {/* ── Category Tabs ── */}
      <div className="ap-tabs-bar">
        {allCategories.map((cat) => (
          <button
            key={cat}
            className={`ap-tab ${activeCategory === cat ? "ap-tab--active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
            <span className="ap-tab__count">
              {cat === "All"
                ? products.length
                : products.filter((p) => p.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      {/* ── Results count ── */}
      <div className="ap-results-bar">
        <p className="ap-results-text">
          Showing <strong>{filteredProducts.length}</strong> product
          {filteredProducts.length !== 1 ? "s" : ""}
          {activeCategory !== "All" ? ` in "${activeCategory}"` : ""}
          {searchQuery ? ` for "${searchQuery}"` : ""}
        </p>
      </div>

      {/* ── Product Grid ── */}
      {filteredProducts.length === 0 ? (
        <div className="ap-empty">
          <span className="ap-empty__icon">😕</span>
          <h3>No products found</h3>
          <p>Try a different category or search term</p>
          <button
            className="ap-empty__btn"
            onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="ap-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="ap-card">
              {product.badge && (
                <span className="ap-card__badge">{product.badge}</span>
              )}
              <Link to={`/product/${product.id}`} className="ap-card__img-link">
                <img
                  src={product.image}
                  alt={product.name}
                  className="ap-card__img"
                />
                <div className="ap-card__overlay">
                  <span>View Details →</span>
                </div>
              </Link>
              <div className="ap-card__body">
                <span className="ap-card__cat">{product.category}</span>
                <h3 className="ap-card__name">{product.name}</h3>
                <div className="ap-card__rating">
                  {"⭐".repeat(Math.floor(product.rating))}
                  <span className="ap-card__rating-num">{product.rating}</span>
                </div>
                <p className="ap-card__desc">
                  {product.description.slice(0, 95)}…
                </p>
                {product.benefits && (
                  <div className="ap-card__benefits">
                    {product.benefits.slice(0, 2).map((b) => (
                      <span key={b} className="ap-card__benefit-pill">{b}</span>
                    ))}
                  </div>
                )}
                <p className="ap-card__price">
                  ₹{(product.price * 83).toFixed(0)}
                  <span className="ap-card__price-usd"> / ${product.price.toFixed(2)}</span>
                </p>
                <div className="ap-card__actions">
                  <Link to={`/product/${product.id}`} className="ap-card__view-btn">
                    View Details
                  </Link>
                  <button
                    className={`ap-card__cart-btn ${addedProducts[product.id] ? "added" : ""}`}
                    onClick={() => handleAddToCart(product)}
                  >
                    {addedProducts[product.id] ? "✓ Added!" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
