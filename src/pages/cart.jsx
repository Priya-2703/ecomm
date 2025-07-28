import React, { useState, useEffect } from 'react';
import { Minus, Plus, X, ShoppingBag, Truck, Shield, CreditCard, Lock } from 'lucide-react';
import Header from '../component/header.jsx';
import Footer from '../component/footer.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/cart.css';

const HeekaCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'United States'
  });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const steps = ['Cart', 'Information', 'Shipping', 'Payment'];

  // Fetch cart items from backend
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get('http://localhost:5000/cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setCartItems(response.data.cart_items || []);
      setOrderSummary({
        subtotal: response.data.subtotal || 0,
        shipping: response.data.shipping || 0,
        tax: response.data.tax || 0,
        total: response.data.total || 0
      });
    } catch (error) {
      console.error('Error fetching cart:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (cartId, newQuantity) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/cart/${cartId}`, {
        quantity: newQuantity
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert(error.response?.data?.message || 'Failed to update quantity');
    }
  };

  const removeItem = async (cartId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/cart/${cartId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchCart();
    } catch (error) {
      console.error('Error removing item:', error);
      alert(error.response?.data?.message || 'Failed to remove item');
    }
  };

  const handleInputChange = (field, value) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const placeOrder = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.post('http://localhost:5000/checkout', {
        customer_info: customerInfo,
        shipping_method: shippingMethod,
        payment_method: paymentMethod
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      alert(`Order placed successfully! Order ID: ${response.data.order_id}`);
      setCurrentStep(0);
      setCartItems([]);
      navigate('/orders');
    } catch (error) {
      console.error('Error placing order:', error);
      alert(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const CartStep = () => (
    <div className="hka-checkout-section hka-space-y-6">
      <div className="hka-section-header hka-flex hka-items-center hka-justify-between">
        <h2 className="hka-section-title">Your Cart</h2>
        <div className="hka-cart-summary-badge hka-flex hka-items-center">
          <ShoppingBag className="hka-icon hka-icon-small hka-mr-2" />
          <span className="hka-text-primary-dark">
            {cartItems.reduce((total, item) => total + item.quantity, 0)} items
          </span>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="hka-empty-state hka-text-center hka-py-12">
          <ShoppingBag className="hka-icon hka-icon-large hka-mx-auto hka-text-accent-light hka-mb-4" />
          <h3 className="hka-empty-state-title hka-mb-2">Your cart is empty</h3>
          <p className="hka-empty-state-text">Add some of our organic products to get started!</p>
        </div>
      ) : (
        <div className="hka-cart-items-list hka-space-y-4">
          {cartItems.map(item => (
            <div key={item.cart_id} className="hka-cart-item hka-card hka-card-shadow hka-border-light-green">
              <div className="hka-flex hka-items-center hka-space-x-4">
                <div className="hka-product-thumbnail">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.product_name} className="product-image" />
                  ) : (
                    <span>🍯</span>
                  )}
                </div>
                <div className="hka-flex-grow">
                  <h3 className="hka-product-title">{item.product_name}</h3>
                  <div className="hka-flex hka-items-center hka-mt-1">
                    <span className="hka-rating-star">★</span>
                    <span className="hka-rating-text">4.9</span>
                  </div>
                </div>
                <div className="hka-quantity-controls hka-flex hka-items-center hka-space-x-3">
                  <button
                    onClick={() => updateQuantity(item.cart_id, item.quantity - 1)}
                    className="hka-btn hka-btn-icon hka-btn-primary-solid hka-quantity-button"
                    aria-label={`Decrease quantity of ${item.product_name}`}
                  >
                    <Minus className="hka-icon hka-icon-small hka-text-white" />
                  </button>
                  <span className="hka-quantity-display">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cart_id, item.quantity + 1)}
                    className="hka-btn hka-btn-icon hka-btn-primary-solid hka-quantity-button"
                    aria-label={`Increase quantity of ${item.product_name}`}
                  >
                    <Plus className="hka-icon hka-icon-small hka-text-white" />
                  </button>
                </div>
                <div className="hka-text-right">
                  <p className="hka-item-total-price">₹{(Number(item.price) * item.quantity).toFixed(2)}</p>
                  <p className="hka-item-price-per-unit">₹{Number(item.price).toFixed(2)} each</p>
                </div>
                <button
                  onClick={() => removeItem(item.cart_id)}
                  className="hka-btn hka-btn-icon hka-btn-remove"
                  aria-label={`Remove ${item.product_name} from cart`}
                >
                  <X className="hka-icon hka-icon-small" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const InformationStep = () => (
    <div className="hka-checkout-section hka-space-y-6">
      <h2 className="hka-section-title">Contact Information</h2>
      <div className="hka-card hka-card-shadow hka-border-light-green">
        <div className="hka-form-grid hka-grid hka-gap-4">
          <div className="hka-form-field">
            <label htmlFor="email" className="hka-form-label">Email</label>
            <input
              type="email"
              id="email"
              value={customerInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="hka-form-input"
              placeholder="your@email.com"
            />
          </div>
          <div className="hka-form-field hka-hidden md:hka-block"></div>

          <div className="hka-form-field">
            <label htmlFor="firstName" className="hka-form-label">First Name</label>
            <input
              type="text"
              id="firstName"
              value={customerInfo.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="hka-form-input"
              placeholder="First name"
            />
          </div>
          <div className="hka-form-field">
            <label htmlFor="lastName" className="hka-form-label">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={customerInfo.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="hka-form-input"
              placeholder="Last name"
            />
          </div>
          <div className="hka-form-field hka-col-span-full">
            <label htmlFor="address" className="hka-form-label">Address</label>
            <input
              type="text"
              id="address"
              value={customerInfo.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="hka-form-input"
              placeholder="Street address"
            />
          </div>
          <div className="hka-form-field">
            <label htmlFor="city" className="hka-form-label">City</label>
            <input
              type="text"
              id="city"
              value={customerInfo.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="hka-form-input"
              placeholder="City"
            />
          </div>
          <div className="hka-form-field">
            <label htmlFor="zipCode" className="hka-form-label">ZIP Code</label>
            <input
              type="text"
              id="zipCode"
              value={customerInfo.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              className="hka-form-input"
              placeholder="Postal code"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const ShippingStep = () => (
    <div className="hka-checkout-section hka-space-y-6">
      <h2 className="hka-section-title">Shipping Method</h2>
      <div className="hka-space-y-4">
        <div 
          className={`hka-shipping-option ${shippingMethod === 'standard' ? 'hka-shipping-option-selected' : ''} hka-card hka-card-shadow hka-border-primary-green`}
          onClick={() => setShippingMethod('standard')}
        >
          <div className="hka-flex hka-items-center hka-justify-between">
            <div className="hka-flex hka-items-center">
              <Truck className="hka-icon hka-icon-small hka-text-primary-green hka-mr-3" />
              <div>
                <p className="hka-shipping-method-title">Standard Shipping</p>
                <p className="hka-shipping-method-delivery">5-7 business days</p>
              </div>
            </div>
            <p className="hka-shipping-cost">{orderSummary.subtotal > 50 ? 'FREE' : `₹${orderSummary.shipping.toFixed(2)}`}</p>
          </div>
        </div>
        <div 
          className={`hka-shipping-option ${shippingMethod === 'express' ? 'hka-shipping-option-selected' : ''} hka-card hka-card-shadow hka-border-gray`}
          onClick={() => setShippingMethod('express')}
        >
          <div className="hka-flex hka-items-center hka-justify-between">
            <div className="hka-flex hka-items-center">
              <Truck className="hka-icon hka-icon-small hka-text-gray-medium hka-mr-3" />
              <div>
                <p className="hka-shipping-method-title">Express Shipping</p>
                <p className="hka-shipping-method-delivery">2-3 business days</p>
              </div>
            </div>
            <p className="hka-shipping-cost">₹15.99</p>
          </div>
        </div>
      </div>
      {orderSummary.subtotal > 50 && (
        <div className="hka-alert hka-alert-success hka-success-message">
          <p className="hka-alert-text">🎉 Congratulations! You qualify for free shipping!</p>
        </div>
      )}
    </div>
  );

  const PaymentStep = () => (
    <div className="hka-checkout-section hka-space-y-6">
      <h2 className="hka-section-title">Payment</h2>
      <div className="hka-card hka-card-shadow hka-border-light-green">
        <div className="hka-security-info hka-flex hka-items-center hka-mb-4">
          <Lock className="hka-icon hka-icon-small hka-text-primary-green hka-mr-2" />
          <span className="hka-security-text">Secure payment powered by SSL encryption</span>
        </div>
        <div className="hka-space-y-4">
          <div className="hka-form-field">
            <label htmlFor="cardNumber" className="hka-form-label">Card Number</label>
            <div className="hka-input-icon-container">
              <input
                type="text"
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                className="hka-form-input hka-pr-12"
              />
              <CreditCard className="hka-input-icon" />
            </div>
          </div>
          <div className="hka-form-grid hka-grid hka-grid-cols-2 hka-gap-4">
            <div className="hka-form-field">
              <label htmlFor="expiryDate" className="hka-form-label">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                placeholder="MM/YY"
                className="hka-form-input"
              />
            </div>
            <div className="hka-form-field">
              <label htmlFor="cvv" className="hka-form-label">CVV</label>
              <input
                type="text"
                id="cvv"
                placeholder="123"
                className="hka-form-input"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const OrderSummary = () => (
    <div className="hka-order-summary hka-card hka-card-shadow hka-bg-light-green hka-border-primary-green">
      <h3 className="hka-order-summary-title hka-mb-4">Order Summary</h3>
      <div className="hka-summary-details hka-space-y-2">
        <div className="hka-flex hka-justify-between">
          <span className="hka-summary-label">Subtotal</span>
          <span className="hka-summary-value">₹{orderSummary.subtotal.toFixed(2)}</span>
        </div>
        <div className="hka-flex hka-justify-between">
          <span className="hka-summary-label">Shipping</span>
          <span className="hka-summary-value">{orderSummary.subtotal > 50 ? 'FREE' : `₹${orderSummary.shipping.toFixed(2)}`}</span>
        </div>
        <div className="hka-flex hka-justify-between">
          <span className="hka-summary-label">Tax (8%)</span>
          <span className="hka-summary-value">₹{orderSummary.tax.toFixed(2)}</span>
        </div>
        <div className="hka-summary-total hka-border-top hka-pt-2 hka-mt-3">
          <div className="hka-flex hka-justify-between hka-font-semibold hka-text-lg">
            <span className="hka-text-primary-dark">Total</span>
            <span className="hka-text-primary-dark">₹{orderSummary.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="hka-guarantee-info hka-flex hka-items-center hka-mt-4">
        <Shield className="hka-icon hka-icon-small hka-mr-2" />
        <span>30-day money-back guarantee</span>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <CartStep />;
      case 1: return <InformationStep />;
      case 2: return <ShippingStep />;
      case 3: return <PaymentStep />;
      default: return <CartStep />;
    }
  };

  return (
    <div className="hka-page-wrapper">
      <Header />
      <main className="hka-main-content">
        <div className="hka-container hka-px-4 hka-py-8">
          <div className="hka-progress-bar hka-mb-8">
            <div className="hka-flex hka-items-center hka-justify-center hka-space-x-4">
              {steps.map((step, index) => (
                <div key={step} className="hka-flex hka-items-center">
                  <div className={`hka-progress-step-indicator ${
                    index <= currentStep
                      ? 'hka-bg-primary-green hka-text-white hka-progress-step-active'
                      : 'hka-bg-gray-light hka-text-green-medium'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`hka-progress-step-label ${
                    index <= currentStep ? 'hka-text-primary-green' : 'hka-text-gray-medium'
                  }`}>
                    {step}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`hka-progress-step-line ${
                      index < currentStep ? 'hka-bg-primary-green' : 'hka-bg-gray-light'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="hka-checkout-layout hka-grid hka-gap-8">
            <div className="hka-main-checkout-area lg:hka-col-span-2">
              {renderStep()}
            </div>

            <div className="hka-sidebar-area lg:hka-col-span-1">
              <div className="hka-sticky hka-sticky-top">
                <OrderSummary />

                <div className="hka-navigation-buttons hka-mt-6 hka-space-y-3">
                  {currentStep < 3 && cartItems.length > 0 && (
                    <button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="hka-btn hka-btn-primary hka-btn-large"
                      disabled={loading}
                    >
                      {currentStep === 0 ? 'Proceed to Checkout' :
                       currentStep === 1 ? 'Continue to Shipping' :
                       currentStep === 2 ? 'Continue to Payment' : 'Next Step'}
                    </button>
                  )}

                  {currentStep === 3 && (
                    <button
                      className="hka-btn hka-btn-primary hka-btn-large"
                      onClick={placeOrder}
                      disabled={loading || !paymentMethod}
                    >
                      {loading ? 'Processing...' : 'Complete Order'}
                    </button>
                  )}

                  {currentStep > 0 && (
                    <button
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="hka-btn hka-btn-secondary hka-btn-large"
                      disabled={loading}
                    >
                      Back
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer className="hka-footer" />
    </div>
  );
};

export default HeekaCartPage;