import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [recommendedVisible, setRecommendedVisible] = useState(false);
  const recommendedRef = useRef(null);

  const sizes = ["S", "M", "L", "XL", "2XL", "3XL"];

  const product = products.find((p) => p.id === parseInt(id));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRecommendedVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    const el = recommendedRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [product]);

  // Reset state when product changes
  useEffect(() => {
    setRecommendedVisible(false);
    setSelectedImage(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!product) {
    return (
      <div className="product-details-page">
        <div className="not-found">
          <h2>Product not found</h2>
          <Link to="/" className="back-link">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(product.stock, value));
    setQuantity(newQuantity);
  };

  // Get recommended products: same category first, then other categories, excluding current
  const sameCategory = products.filter((p) => p.category === product.category && p.id !== product.id);
  const otherProducts = products.filter((p) => p.category !== product.category && p.id !== product.id);
  const relatedProducts = sameCategory.slice(0, 3);
  const recommendedProducts = [...sameCategory, ...otherProducts].slice(0, 8);

  return (
    <div className="product-details-page">
      <div className="breadcrumb">
        <Link to="/">Products</Link> / {product.name}
      </div>

      <div className="product-details-container">
        <div className="product-image-section">
          <div className="main-image-container">
            <img
              src={product.images?.[selectedImage] || product.image}
              alt={product.name}
              className="detail-image"
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="thumbnail-gallery">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className={`thumbnail ${selectedImage === index ? "active" : ""}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="product-info-section">
          <span className="product-category">{product.category}</span>
          <h1 className="product-title">{product.name}</h1>

          <div className="product-rating-detail">
            <span className="stars">
              {"⭐".repeat(Math.floor(product.rating))}
            </span>
            <span className="rating-text">{product.rating} / 5</span>
          </div>

          <div className="price-section">
            <span className="price">₹{(product.price * 83).toFixed(0)}</span>
          </div>

          <p className="product-description">{product.description}</p>

          {/* Seller Information Section */}
          <div className="seller-section">
            <h3>Seller Information</h3>
            <div className="seller-info">
              <div className="seller-name">
                <span className="store-icon">🏪</span>
                <span>Himalaya Organic Store</span>
              </div>
              <div className="seller-stats">
                <div className="stat-item">
                  <span className="stat-icon">⭐</span>
                  <span>4.8 Rating</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">📍</span>
                  <span>Himalayas, India</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">💬</span>
                  <span>95% Chat Reply</span>
                </div>
              </div>
            </div>
          </div>

          {/* Size Selection */}
          <div className="size-section">
            <label className="section-label">Select Size:</label>
            <div className="size-grid">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {product.benefits && (
            <div className="benefits-section">
              <h3 className="benefits-title">Key Benefits</h3>
              <ul className="benefits-list">
                {product.benefits.map((benefit, idx) => (
                  <li key={idx} className="benefit-item">
                    <span className="benefit-icon">✓</span> {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="product-meta">
            <div className="meta-item">
              <span className="meta-label">Stock:</span>
              <span
                className={`meta-value ${product.stock < 10 ? "low-stock" : ""}`}
              >
                {product.stock} available
              </span>
            </div>
          </div>

          <div className="quantity-section">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <button
                className="qty-btn"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  handleQuantityChange(parseInt(e.target.value) || 1)
                }
                min="1"
                max={product.stock}
                className="qty-input"
              />
              <button
                className="qty-btn"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button
              className="buy-now-btn primary"
              onClick={() => {
                addToCart(product, quantity);
                navigate("/cart");
              }}
            >
              🛒 Buy this Item
            </button>
            <button
              className={`add-to-bag-btn ${added ? "added" : ""}`}
              onClick={handleAddToCart}
            >
              {added ? "✓ Added to Bag" : "🛍️ Add to Bag"}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="product-tabs-section">
        <div className="tabs-header">
          <button
            className={`tab-btn ${activeTab === "description" ? "active" : ""}`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`tab-btn ${activeTab === "styling" ? "active" : ""}`}
            onClick={() => setActiveTab("styling")}
          >
            Styling Ideas
          </button>
          <button
            className={`tab-btn ${activeTab === "review" ? "active" : ""}`}
            onClick={() => setActiveTab("review")}
          >
            Review
          </button>
          <button
            className={`tab-btn ${activeTab === "bestseller" ? "active" : ""}`}
            onClick={() => setActiveTab("bestseller")}
          >
            Best Seller
          </button>
          <button className="report-btn">📋 Report Product</button>
        </div>

        <div className="tabs-content">
          {activeTab === "description" && (
            <div className="tab-panel">
              <h2>Product Details</h2>
              <p className="detailed-description">{product.description}</p>

              <div className="specifications-grid">
                <div className="spec-row">
                  <span className="spec-label">Package Dimensions</span>
                  <span className="spec-value">
                    : {product.packageDimensions}
                  </span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Specification</span>
                  <span className="spec-value">: {product.specifications}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Date First Available</span>
                  <span className="spec-value">: {product.dateAvailable}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Department</span>
                  <span className="spec-value">: {product.department}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "styling" && (
            <div className="tab-panel">
              <h2>Styling Ideas</h2>
              <p className="section-subtitle">See more</p>
              <div className="related-products-grid">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    to={`/product/${relatedProduct.id}`}
                    className="related-product-card"
                  >
                    <img src={relatedProduct.image} alt={relatedProduct.name} />
                    <h4>{relatedProduct.name}</h4>
                    <p className="related-price">
                      ₹{(relatedProduct.price * 83).toFixed(0)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {activeTab === "review" && (
            <div className="tab-panel">
              <h2>Customer Reviews</h2>
              <div className="review-summary">
                <div className="rating-overview">
                  <span className="rating-large">{product.rating}</span>
                  <div className="stars-large">
                    {"⭐".repeat(Math.floor(product.rating))}
                  </div>
                  <p>Based on {Math.floor(product.rating * 47)} reviews</p>
                </div>
              </div>
              <div className="reviews-list">
                <div className="review-item">
                  <div className="review-header">
                    <span className="reviewer-name">John D.</span>
                    <span className="review-date">2 weeks ago</span>
                  </div>
                  <div className="review-stars">⭐⭐⭐⭐⭐</div>
                  <p className="review-text">
                    Excellent quality! Very satisfied with this organic product
                    from Himalaya.
                  </p>
                </div>
                <div className="review-item">
                  <div className="review-header">
                    <span className="reviewer-name">Sarah M.</span>
                    <span className="review-date">1 month ago</span>
                  </div>
                  <div className="review-stars">⭐⭐⭐⭐</div>
                  <p className="review-text">
                    Great product, authentic and natural. Delivery was quick
                    too!
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "bestseller" && (
            <div className="tab-panel">
              <h2>Best Seller in {product.category}</h2>
              <div className="bestseller-badge">
                <span className="badge-icon">🏆</span>
                <p>
                  This product is ranked #{Math.ceil(product.id / 2)} in{" "}
                  {product.category} category
                </p>
              </div>
              <div className="bestseller-stats">
                <div className="stat-box">
                  <h3>{product.stock}+</h3>
                  <p>Units Sold This Month</p>
                </div>
                <div className="stat-box">
                  <h3>{product.rating}</h3>
                  <p>Average Rating</p>
                </div>
                <div className="stat-box">
                  <h3>98%</h3>
                  <p>Customer Satisfaction</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recommended Products Section */}
      <div
        ref={recommendedRef}
        className={`recommended-section ${recommendedVisible ? "visible" : ""}`}
      >
        <div className="recommended-header">
          <h2 className="recommended-title">🌿 Recommended for You</h2>
          <p className="recommended-subtitle">Products you might also love</p>
        </div>
        <div className="recommended-grid">
          {recommendedProducts.map((rec) => (
            <Link
              key={rec.id}
              to={`/product/${rec.id}`}
              className="rec-card"
            >
              {rec.badge && <span className="rec-badge">{rec.badge}</span>}
              <div className="rec-image-wrap">
                <img src={rec.image} alt={rec.name} className="rec-image" />
              </div>
              <div className="rec-info">
                <span className="rec-category">{rec.category}</span>
                <h4 className="rec-name">{rec.name}</h4>
                <div className="rec-footer">
                  <span className="rec-price">₹{(rec.price * 83).toFixed(0)}</span>
                  <span className="rec-rating">⭐ {rec.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
