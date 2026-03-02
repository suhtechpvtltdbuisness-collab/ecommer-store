import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Header.css";

const Header = () => {
  const { getCartItemsCount } = useCart();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>🛒 Gromuse</h1>
        </Link>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for Organic Products..."
            className="search-input"
          />
          <button className="search-btn">🔍</button>
        </div>
        <nav className="nav">
          <Link to="/" className="nav-link">
            Products
          </Link>
          <Link to="/cart" className="nav-link cart-link">
            Cart
            {getCartItemsCount() > 0 && (
              <span className="cart-badge">{getCartItemsCount()}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
