import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Order.css";

const Order = () => {
  const { cartItems, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store order info in sessionStorage
    sessionStorage.setItem("orderInfo", JSON.stringify(formData));
    navigate("/payment");
  };

  if (cartItems.length === 0) {
    return (
      <div className="order-page">
        <div className="empty-order">
          <h2>No items in cart</h2>
          <p>Please add items to your cart before placing an order.</p>
          <button onClick={() => navigate("/")} className="back-to-shop-btn">
            Go to Products
          </button>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="order-page">
      <h2 className="order-title">Checkout</h2>

      <div className="order-container">
        <div className="shipping-form">
          <h3>Shipping Information</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>State *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>ZIP Code *</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Country *</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="continue-payment-btn">
              Continue to Payment
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>

          <div className="order-items">
            {cartItems.map((item) => (
              <div key={item.id} className="order-item">
                <img src={item.image} alt={item.name} />
                <div className="order-item-info">
                  <p className="item-name">{item.name}</p>
                  <p className="item-quantity">Qty: {item.quantity}</p>
                </div>
                <div className="item-price">
                  ₹{(item.price * item.quantity * 83).toFixed(0)}
                </div>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>₹{(subtotal * 83).toFixed(0)}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span>₹{(shipping * 83).toFixed(0)}</span>
            </div>
            <div className="total-row">
              <span>Tax (10%)</span>
              <span>₹{(tax * 83).toFixed(0)}</span>
            </div>
            <div className="total-divider"></div>
            <div className="total-row grand-total">
              <span>Total</span>
              <span>₹{(total * 83).toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
