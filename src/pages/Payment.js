import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Payment.css";

const Payment = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      clearCart();
      navigate("/success");
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="payment-page">
        <div className="empty-payment">
          <h2>No order to process</h2>
          <p>Your cart is empty.</p>
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
    <div className="payment-page">
      <h2 className="payment-title">Payment</h2>

      <div className="payment-container">
        <div className="payment-form">
          <h3>Payment Method</h3>

          <div className="payment-methods">
            <label
              className={`payment-method-option ${paymentMethod === "card" ? "active" : ""}`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>💳 Credit/Debit Card</span>
            </label>

            <label
              className={`payment-method-option ${paymentMethod === "paypal" ? "active" : ""}`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>🅿️ PayPal</span>
            </label>

            <label
              className={`payment-method-option ${paymentMethod === "crypto" ? "active" : ""}`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="crypto"
                checked={paymentMethod === "crypto"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>₿ Cryptocurrency</span>
            </label>
          </div>

          {paymentMethod === "card" && (
            <form onSubmit={handleSubmit} className="card-form">
              <div className="form-group">
                <label>Card Number *</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  required
                />
              </div>

              <div className="form-group">
                <label>Cardholder Name *</label>
                <input
                  type="text"
                  name="cardName"
                  value={paymentData.cardName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date *</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>CVV *</label>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    maxLength="4"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="pay-btn" disabled={processing}>
                {processing ? "Processing..." : `Pay ₹${(total * 83).toFixed(0)}`}
              </button>
            </form>
          )}

          {paymentMethod === "paypal" && (
            <div className="alternative-payment">
              <p>You will be redirected to PayPal to complete your payment.</p>
              <button
                className="pay-btn paypal-btn"
                onClick={handleSubmit}
                disabled={processing}
              >
                {processing ? "Processing..." : "Continue to PayPal"}
              </button>
            </div>
          )}

          {paymentMethod === "crypto" && (
            <div className="alternative-payment">
              <p>You will be redirected to our crypto payment processor.</p>
              <button
                className="pay-btn crypto-btn"
                onClick={handleSubmit}
                disabled={processing}
              >
                {processing ? "Processing..." : "Pay with Crypto"}
              </button>
            </div>
          )}

          <div className="security-note">
            <span className="lock-icon">🔒</span>
            <p>Your payment information is secure and encrypted</p>
          </div>
        </div>

        <div className="payment-summary">
          <h3>Order Summary</h3>

          <div className="summary-items">
            <div className="summary-row">
              <span>Items ({cartItems.length})</span>
              <span>₹{(subtotal * 83).toFixed(0)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>₹{(shipping * 83).toFixed(0)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (10%)</span>
              <span>₹{(tax * 83).toFixed(0)}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{(total * 83).toFixed(0)}</span>
            </div>
          </div>

          <div className="summary-products">
            <h4>Items in Order</h4>
            {cartItems.map((item) => (
              <div key={item.id} className="summary-product">
                <img src={item.image} alt={item.name} />
                <div className="summary-product-info">
                  <p className="product-name">{item.name}</p>
                  <p className="product-quantity">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
