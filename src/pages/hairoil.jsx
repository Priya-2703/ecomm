import React, { useState } from 'react';
import { Sparkles, Shield, Heart, Zap, Star } from 'lucide-react';
import Header from '../component/header.jsx';
import Footer from '../component/footer.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/hairoil.css';

const HeekaHairOilContent = () => {
  const [currentView, setCurrentView] = useState('benefits');
  const navigate = useNavigate();

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to add items to cart');
        navigate('/login');
        return;
      }
      
      const response = await axios.post(
        'http://localhost:5000/cart',
        { product_id: productId, quantity: 1 },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      if (error.response) {
        alert(error.response.data.message || 'Failed to add product to cart');
      } else {
        alert('Error adding product. Please try again.');
      }
    }
  };


  const hairBenefits = [
    {
      icon: <Sparkles className="hh-benefit-icon" />,
      title: "Deep Nourishment",
      description: "Penetrates deeply into hair follicles to provide intensive moisture and restore vitality to damaged hair."
    },
    {
      icon: <Shield className="hh-benefit-icon" />,
      title: "Scalp Protection",
      description: "Creates a protective barrier against environmental damage while maintaining optimal scalp health."
    },
    {
      icon: <Heart className="hh-benefit-icon" />,
      title: "Strength & Growth",
      description: "Stimulates blood circulation to promote healthy hair growth and reduces breakage significantly."
    },
    {
      icon: <Zap className="hh-benefit-icon" />,
      title: "Instant Shine",
      description: "Adds natural luster and silky smoothness without weighing hair down or leaving greasy residue."
    }
  ];

  const oilCrafting = [
    {
      stage: "01",
      title: "Botanical Selection",
      description: "We carefully source premium organic herbs and botanicals from certified sustainable farms worldwide."
    },
    {
      stage: "02",
      title: "Cold Extraction",
      description: "Our proprietary cold-press method preserves maximum potency and nutritional value of each ingredient."
    },
    {
      stage: "03",
      title: "Ayurvedic Blending",
      description: "Ancient Ayurvedic formulations are combined with modern techniques for optimal hair health benefits."
    },
    {
      stage: "04",
      title: "Purity Testing",
      description: "Rigorous quality control ensures each bottle meets our highest standards for purity and effectiveness."
    }
  ];

  const hairProducts = [
    {
      product_id: 7, // Match the IDs from your database
      name: "Argan Repair Elixir",
      price: 36.99, // Change from string to number
      image: "✨",
      description: "Luxurious argan oil blend for damaged and dry hair restoration",
      rating: 4.9,
      tag: "Bestseller"
    },
    {
      product_id: 8,
      name: "Rosemary Growth Serum",
      price: 42.99,
      image: "🌿",
      description: "Potent rosemary formula to stimulate hair growth and thickness",
      rating: 5.0,
      tag: "Growth"
    },
    {
      product_id: 9,
      name: "Coconut Silk Therapy",
      price: 29.99,
      image: "🥥",
      description: "Pure coconut oil treatment for silky smooth, manageable hair",
      rating: 4.8,
      tag: "Hydrating"
    },
    {
      product_id: 10,
      name: "Jojoba Scalp Treatment",
      price: 33.99,
      image: "🧴",
      description: "Gentle jojoba formula for sensitive scalp and dandruff control",
      rating: 4.7,
      tag: "Gentle"
    },
    {
      product_id: 11,
      name: "Amla Vitality Complex",
      price: 38.99,
      image: "🍃",
      description: "Traditional amla oil rich in vitamin C for hair strengthening",
      rating: 4.9,
      tag: "Vitamin-C"
    },
    {
      product_id: 12,
      name: "Lavender Night Oil",
      price: 34.99,
      image: "💜",
      description: "Calming lavender oil for overnight deep conditioning treatment",
      rating: 5.0,
      tag: "Overnight"
    }
  ];

  return (
    <>
      <Header />

      <div className="hh-main-container">
        {/* Section Navigation */}
        <nav className="hh-nav">
          <div className="hh-nav-container">
            <div className="hh-view-switcher">
              {['benefits', 'process', 'products'].map((view) => (
                <button
                  key={view}
                  onClick={() => setCurrentView(view)}
                  className={`hh-view-btn ${currentView === view ? 'hh-view-active' : ''}`}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Hair Benefits Section */}
        {currentView === 'benefits' && (
          <section className="hh-section hh-benefits-section">
            <div className="hh-wrapper">
              <div className="hh-header">
                <h2 className="hh-main-title">Luxurious Hair Transformation</h2>
                <p className="hh-subtitle">
                  Experience the power of nature's finest ingredients for healthy, beautiful hair
                </p>
              </div>
              <div className="hh-benefits-grid">
                {hairBenefits.map((benefit, index) => (
                  <div key={index} className="hh-benefit-card">
                    <div className="hh-benefit-icon-container">
                      {benefit.icon}
                    </div>
                    <h3 className="hh-benefit-title">{benefit.title}</h3>
                    <p className="hh-benefit-description">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Oil Crafting Process Section */}
        {currentView === 'process' && (
          <section className="hh-section hh-process-section">
            <div className="hh-wrapper">
              <div className="hh-header">
                <h2 className="hh-main-title">Artisan Oil Crafting</h2>
                <p className="hh-subtitle">
                  Discover our time-honored process that transforms nature's bounty into liquid gold
                </p>
              </div>
              <div className="hh-crafting-timeline">
                {oilCrafting.map((craft, index) => (
                  <div key={index} className={`hh-timeline-item ${index % 2 === 1 ? 'hh-timeline-reverse' : ''}`}>
                    <div className="hh-timeline-content">
                      <div className="hh-process-card">
                        <div className="hh-process-header">
                          <span className="hh-stage-number">{craft.stage}</span>
                          <h3 className="hh-process-title">{craft.title}</h3>
                        </div>
                        <p className="hh-process-description">{craft.description}</p>
                      </div>
                    </div>
                    <div className="hh-timeline-icon">
                      <span className="hh-oil-drop">💧</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Hair Products Section */}
        {currentView === 'products' && (
          <section className="hh-section hh-products-section">
            <div className="hh-wrapper">
              <div className="hh-header">
                <h2 className="hh-main-title">Premium Hair Oil Collection</h2>
                <p className="hh-subtitle">
                  Discover our expertly formulated organic hair oils for every hair type and concern
                </p>
              </div>
              <div className="hh-products-grid">
                {hairProducts.map((product, index) => (
                  <div key={index} className="hh-product-card">
                    <div className="hh-product-image-container">
                      <div className="hh-product-image-bg">
                        <span className="hh-product-emoji">{product.image}</span>
                      </div>
                      <div className="hh-product-tag">
                        <span>{product.tag}</span>
                      </div>
                    </div>
                    <div className="hh-product-info">
                      <div className="hh-product-header">
                        <h3 className="hh-product-name">{product.name}</h3>
                        <div className="hh-product-rating">
                          <Star className="hh-rating-star" />
                          <span className="hh-rating-value">{product.rating}</span>
                        </div>
                      </div>
                      <p className="hh-product-description">{product.description}</p>
                       <div className="hh-product-footer">
                        <span className="hh-product-price">₹{product.price.toFixed(2)}</span>
                        <button 
                          className="hh-add-to-cart-btn"
                          onClick={() => addToCart(product.product_id)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                  ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <Footer />
    </>
  );
};

export default HeekaHairOilContent;