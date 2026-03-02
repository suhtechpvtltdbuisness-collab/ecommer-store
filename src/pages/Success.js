import React from "react";
import { Link } from "react-router-dom";
import "./Success.css";

const Success = () => {
  return (
    <div className="success-page">
      <div className="success-container">
        <div className="success-icon">✓</div>
        <h1>Order Successful!</h1>
        <p>
          Thank you for your purchase. Your order has been successfully placed.
        </p>
        <div className="order-info">
          <p>
            You will receive an email confirmation shortly with your order
            details and tracking information.
          </p>
        </div>
        <div className="success-actions">
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
