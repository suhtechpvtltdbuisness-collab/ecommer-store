import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import "./Products.css";

/* IDs 1 = Kesar, 2 = Shilajit — kept as hero feature */
const featuredIds = [1, 2];

const whyCards = [
  {
    icon: "🌿",
    title: "100% Pure",
    desc: "No fillers, no additives — only the purest Himalayan Kesar and Shilajit, straight from their source.",
    color: "gold",
  },
  {
    icon: "⚡",
    title: "Energy & Vitality",
    desc: "Our Shilajit resin contains 85+ minerals and fulvic acid to supercharge your body and mind.",
    color: "earth",
  },
  {
    icon: "✨",
    title: "Skin Radiance",
    desc: "Kesar's potent antioxidants help achieve a natural golden glow and even skin tone.",
    color: "saffron",
  },
];

const unlockCards = [
  {
    icon: "📖",
    title: "Learn",
    desc: "Discover how Kesar and Shilajit have been used in Ayurveda for centuries to boost vitality and longevity.",
  },
  {
    icon: "🗺️",
    title: "Guide",
    desc: "Get dosage guides, usage tips, and Ayurvedic recipes to harness the full power of these superfoods.",
  },
  {
    icon: "💊",
    title: "Benefits",
    desc: "From immunity to skin glow to mental clarity — explore the science-backed benefits of each ingredient.",
  },
];

const faqs = [
  {
    q: "What is the best way to consume Kesar (Saffron)?",
    a: "Add 2–4 saffron threads to warm milk, water, or tea and let them steep for 5 minutes. Best taken in the morning or before bed for optimal absorption. You can also add it to rice, desserts, and smoothies.",
  },
  {
    q: "How do I take Himalayan Shilajit resin?",
    a: "Take a pea-sized amount (300–500 mg) of resin and dissolve it in warm water, milk, or herbal tea. Consume on an empty stomach in the morning for best results. Do not take with very hot liquids.",
  },
  {
    q: "Is your Kesar 100% genuine Kashmiri saffron?",
    a: "Yes! Our Kesar is A-grade, hand-picked from the saffron fields of Pampore, Kashmir. Every batch is lab-tested for crocin content, purity, and absence of adulterants before packaging.",
  },
  {
    q: "How is your Shilajit sourced and purified?",
    a: "Our Shilajit is harvested from altitudes above 16,000 ft in the Himalayas. It is then sun-purified using the traditional Ayurvedic method, triple-filtered, and lab-certified for heavy metals and microbial safety.",
  },
  {
    q: "Can I take Kesar and Shilajit together?",
    a: "Absolutely! Kesar and Shilajit are often combined in Ayurvedic formulations. Together they enhance energy, boost immunity, improve skin health, and support cognitive function. Start with small doses and observe your body's response.",
  },
  {
    q: "Do you offer free delivery?",
    a: "Yes! We offer free delivery on all orders above ₹999. Standard delivery takes 3–5 business days, and express delivery (1–2 days) is available at a nominal charge.",
  },
];

const Products = () => {
  const { addToCart } = useCart();
  const [addedProducts, setAddedProducts] = useState({});
  const [isPlaying, setIsPlaying] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);
  const sideVideoRef = useRef(null);

  const featuredProducts = products.filter((p) => featuredIds.includes(p.id));

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedProducts((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedProducts((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const togglePlay = () => {
    if (sideVideoRef.current) {
      if (isPlaying) { sideVideoRef.current.pause(); }
      else { sideVideoRef.current.play(); }
      setIsPlaying(!isPlaying);
    }
  };



  const toggleFaq = (idx) => setOpenFaq(openFaq === idx ? null : idx);

  return (
    <div className="products-page">

      {/* ════════════════════════════════════════
          FULL-SCREEN DUAL VIDEO HERO
      ════════════════════════════════════════ */}
      <section className="video-hero">
        <div className="video-overlay" />
        <div className="video-panel video-panel--left">
          <video className="bg-video" src="/videos/video1.mp4" autoPlay loop muted playsInline />
        </div>
        <div className="video-panel video-panel--right">
          <video className="bg-video" src="/videos/video2.mp4" autoPlay loop muted playsInline />
        </div>
        <div className="video-divider" />
        <div className="video-hero__content">
          <p className="video-hero__tagline">🌸 Kashmir Kesar &nbsp;·&nbsp; 🏔️ Himalayan Shilajit</p>
          <h1 className="video-hero__title">
            Nature's Finest,<br />
            <span className="gold-text">Delivered to You</span>
          </h1>
          <p className="video-hero__sub">
            Premium A-grade Kashmiri Saffron and authentic Himalayan Shilajit —
            ethically sourced, lab-certified, and delivered to your doorstep.
          </p>
          <div className="video-hero__actions">
            <a href="#why-us" className="btn-primary">Discover More</a>
            <Link to="/products" className="btn-outline">Shop Now</Link>
          </div>
        </div>
        <div className="hero-badges">
          <span className="hero-badge">✅ Lab Certified</span>
          <span className="hero-badge">🌱 100% Organic</span>
          <span className="hero-badge">🏔️ Altitude Sourced</span>
          <span className="hero-badge">🚚 Free Delivery</span>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SPLIT: VIDEO LEFT + CONTENT RIGHT
      ════════════════════════════════════════ */}
      <section id="why-us" className="split-section">
        <div className="split-video-wrap">
          <video ref={sideVideoRef} className="split-video" src="/videos/video1.mp4" autoPlay loop muted playsInline />
          <button className="split-play-btn" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? "⏸" : "▶"}
          </button>
          <div className="split-video-ring" />
        </div>
        <div className="split-content">
          <p className="split-eyebrow">Why Choose Himalayan Organics?</p>
          <h2 className="split-heading">
            Are you ready for <br />
            <span className="gold-text">Pure Himalayan Power?</span>
          </h2>
          <p className="split-desc">
            We bring you nature's most potent gifts — Kashmiri Kesar (Saffron)
            and authentic Shilajit resin — directly from 16,000 ft altitude,
            ensuring maximum purity and potency in every jar.
          </p>
          <div className="why-cards">
            {whyCards.map((c) => (
              <div key={c.title} className={`why-card why-card--${c.color}`}>
                <span className="why-card__icon">{c.icon}</span>
                <div>
                  <h3 className="why-card__title">{c.title}</h3>
                  <p className="why-card__desc">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FEATURED PRODUCTS  (Kesar + Shilajit)
      ════════════════════════════════════════ */}
      <section id="featured" className="featured-section">
        <div className="section-header">
          <p className="section-eyebrow">Our Star Products</p>
          <h2 className="section-title">Kesar &amp; Shilajit Collection</h2>
          <p className="section-sub">Pure, potent, and Himalayan – two of nature's greatest treasures</p>
          <div className="section-divider" />
        </div>
        <div className="featured-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className={`product-card product-card--${product.category.toLowerCase()}`}>
              {product.badge && <span className="product-badge">{product.badge}</span>}
              <Link to={`/product/${product.id}`} className="product-image-link">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-image-overlay"><span>View Details →</span></div>
              </Link>
              <div className="product-info">
                <div className="product-tag">{product.category}</div>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-rating">
                  {"⭐".repeat(Math.floor(product.rating))}
                  <span className="rating-num">{product.rating}</span>
                </div>
                <p className="product-desc-short">{product.description.slice(0, 100)}…</p>
                {product.benefits && (
                  <div className="product-benefits">
                    {product.benefits.map((b) => (
                      <span key={b} className="benefit-pill">{b}</span>
                    ))}
                  </div>
                )}
                <p className="product-price">
                  ₹{(product.price * 83).toFixed(0)}
                  <span className="product-price-usd"> / ${product.price.toFixed(2)}</span>
                </p>
                <div className="product-actions">
                  <Link to={`/product/${product.id}`} className="view-details-btn">View Details</Link>
                  <button
                    className={`add-to-cart-btn ${addedProducts[product.id] ? "added" : ""}`}
                    onClick={() => handleAddToCart(product)}
                  >
                    {addedProducts[product.id] ? "✓ Added!" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          STATS STRIP
      ════════════════════════════════════════ */}
      <section className="stats-strip">
        {[
          { num: "10K+", label: "Happy Customers" },
          { num: "100%", label: "Lab Certified" },
          { num: "16,000ft", label: "Altitude Sourced" },
          { num: "4.9★", label: "Average Rating" },
        ].map((s) => (
          <div key={s.label} className="stat-item">
            <span className="stat-num">{s.num}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </section>


      {/* ════════════════════════════════════════
          UNLOCK SECTION — with animated flower bg
      ════════════════════════════════════════ */}

      <div className="unlock-section-outer">

        {/* ── Big saffron flower — left side ── */}
        <svg className="flower-bg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <g className="flower-pulse">
            {/* Outer 8 petals */}
            <g className="flower-petals-outer">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <ellipse
                  key={`op${i}`}
                  cx="200" cy="200"
                  rx="38" ry="88"
                  fill={i % 2 === 0 ? "#E8900C" : "#F4A520"}
                  opacity="0.75"
                  transform={`rotate(${angle} 200 200) translate(0 -88)`}
                />
              ))}
            </g>
            {/* Inner 8 petals */}
            <g className="flower-petals-inner">
              {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
                <ellipse
                  key={`ip${i}`}
                  cx="200" cy="200"
                  rx="26" ry="62"
                  fill={i % 2 === 0 ? "#FFD700" : "#D4A017"}
                  opacity="0.85"
                  transform={`rotate(${angle} 200 200) translate(0 -62)`}
                />
              ))}
            </g>
            {/* Tiny inner 8 petals */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <ellipse
                key={`tp${i}`}
                cx="200" cy="200"
                rx="14" ry="38"
                fill="#FFF3DC"
                opacity="0.9"
                transform={`rotate(${angle} 200 200) translate(0 -38)`}
              />
            ))}
            {/* Centre glow circles */}
            <circle cx="200" cy="200" r="38" fill="#FFD700" opacity="0.9" />
            <g className="flower-center-glow">
              <circle cx="200" cy="200" r="26" fill="#E8900C" opacity="0.95" />
              <circle cx="200" cy="200" r="14" fill="#FFF3DC" opacity="1" />
            </g>
          </g>
        </svg>

        {/* ── Small flower — top-right ── */}
        <svg className="flower-bg-right" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <g>
            <g className="flower-petals-outer-r">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <ellipse
                  key={`sr${i}`}
                  cx="200" cy="200"
                  rx="36" ry="84"
                  fill={i % 2 === 0 ? "#D4A017" : "#E8900C"}
                  opacity="0.8"
                  transform={`rotate(${angle} 200 200) translate(0 -84)`}
                />
              ))}
            </g>
            <g className="flower-petals-inner-r">
              {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
                <ellipse
                  key={`si${i}`}
                  cx="200" cy="200"
                  rx="22" ry="55"
                  fill="#FFD700"
                  opacity="0.85"
                  transform={`rotate(${angle} 200 200) translate(0 -55)`}
                />
              ))}
            </g>
            <circle cx="200" cy="200" r="34" fill="#E8900C" opacity="0.9" />
            <circle cx="200" cy="200" r="18" fill="#FFF8EE" opacity="1" />
          </g>
        </svg>

        <section className="unlock-section">
          {/* Left */}
          <div className="unlock-content">
            <p className="unlock-eyebrow">🔓 Unlock the Power</p>
            <h2 className="unlock-heading">
              Unlock the Secrets of<br />
              <span className="gold-text">Himalayan Wellness</span>
            </h2>
            <p className="unlock-desc">
              Focusing on ancient Ayurvedic wisdom is transformative because it reconnects you with nature's most potent remedies. Kesar and Shilajit empower you to see possibilities in your health — boundless energy, glowing skin, a sharp mind, and a resilient body. Together, they create a path to total wellness.
            </p>
            <Link to="/products" className="unlock-cta">
              🌸 Explore Products
            </Link>

            {/* Three mini-cards */}
            <div className="unlock-cards">
              {unlockCards.map((c) => (
                <div key={c.title} className="unlock-card">
                  <span className="unlock-card__icon">{c.icon}</span>
                  <h3 className="unlock-card__title">{c.title}</h3>
                  <p className="unlock-card__desc">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interactive Bloom Grid */}
          <div className="bloom-container">
            {/* The 6 tiny petals */}
            <img src="/images/kesar.jpg" alt="Petal 1" className="bloom-petal bloom-petal-1" />
            <img src={products[2].image} alt="Petal 2" className="bloom-petal bloom-petal-2" />
            <img src={products[3].image} alt="Petal 3" className="bloom-petal bloom-petal-3" />
            <img src={products[4].image} alt="Petal 4" className="bloom-petal bloom-petal-4" />
            <img src={products[6].image} alt="Petal 5" className="bloom-petal bloom-petal-5" />
            <img src={products[7].image} alt="Petal 6" className="bloom-petal bloom-petal-6" />

            {/* The main large square */}
            <div className="bloom-main-square">
              <img src="/images/kesar.jpg" alt="Discover Wellness" />
              <div className="bloom-hover-text">Hover to Bloom</div>
            </div>
          </div>
        </section>
      </div>


      {/* ════════════════════════════════════════
          FAQ ACCORDION
      ════════════════════════════════════════ */}
      <section className="faq-section">
        <div className="section-header">
          <p className="section-eyebrow">Got Questions?</p>
          <h2 className="faq-title">FAQs</h2>
          <p className="section-sub">Read our answers to frequently asked questions about Kesar &amp; Shilajit.</p>
          <div className="section-divider" />
        </div>

        <div className="faq-list">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className={`faq-item ${openFaq === idx ? "faq-item--open" : ""}`}
            >
              <button className="faq-question" onClick={() => toggleFaq(idx)}>
                <span>{item.q}</span>
                <span className={`faq-icon ${openFaq === idx ? "faq-icon--open" : ""}`}>
                  {openFaq === idx ? "▼" : "▶"}
                </span>
              </button>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Products;
