import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-brand">
            <h2>🛒 Gromuse</h2>
            <p>
              Pure organic products from the Himalayas. We bring natural
              wellness to your doorstep.
            </p>
          </div>
          <div className="payment-methods">
            <h4>Accepted Payments</h4>
            <div className="payment-icons">
              <div className="payment-icon visa">VISA</div>
              <div className="payment-icon mastercard">MC</div>
              <div className="payment-icon paypal">PayPal</div>
              <div className="payment-icon applepay">Apple Pay</div>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <h3>Department</h3>
          <ul>
            <li>
              <Link to="/">Skincare</Link>
            </li>
            <li>
              <Link to="/">Spices</Link>
            </li>
            <li>
              <Link to="/">Beverages</Link>
            </li>
            <li>
              <Link to="/">Food</Link>
            </li>
            <li>
              <Link to="/">Organic Grocery</Link>
            </li>
            <li>
              <Link to="/">Wellness</Link>
            </li>
            <li>
              <Link to="/">Hair Care</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>About us</h3>
          <ul>
            <li>
              <Link to="/">About Gromuse</Link>
            </li>
            <li>
              <Link to="/">Careers</Link>
            </li>
            <li>
              <Link to="/">News & Blog</Link>
            </li>
            <li>
              <Link to="/">Help</Link>
            </li>
            <li>
              <Link to="/">Press Center</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Services</h3>
          <ul>
            <li>
              <Link to="/">Gift Card</Link>
            </li>
            <li>
              <Link to="/">Mobile App</Link>
            </li>
            <li>
              <Link to="/">Shipping & Delivery</Link>
            </li>
            <li>
              <Link to="/">Order Pickup</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Help</h3>
          <ul>
            <li>
              <Link to="/">Shopcart Help</Link>
            </li>
            <li>
              <Link to="/">Returns</Link>
            </li>
            <li>
              <Link to="/">Track Orders</Link>
            </li>
            <li>
              <Link to="/">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        <div className="footer-bottom-links">
          <Link to="/" className="bottom-link">
            <span className="icon">💼</span> Become Seller
          </Link>
          <Link to="/" className="bottom-link">
            <span className="icon">🎁</span> Gift Cards
          </Link>
          <Link to="/" className="bottom-link">
            <span className="icon">❓</span> Help Center
          </Link>
        </div>

        <div className="footer-bottom-right">
          <Link to="/">Terms of Use</Link>
          <Link to="/">Privacy Policy</Link>
        </div>

        <div className="footer-copyright">
          <p>All Rights reserved by Gromuse | 2026</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
