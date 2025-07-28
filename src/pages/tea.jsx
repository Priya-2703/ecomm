import React, { useState } from 'react';
import { Leaf, Heart, Brain, Shield, Star } from 'lucide-react';
import Header from '../component/header.jsx';
import Footer from '../component/footer.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/tea.css';

const HeekaTeaContent = () => {
  const [activeTab, setActiveTab] = useState('wellness');
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

  const teaBenefits = [
    {
      icon: <Heart className="ht-benefit-icon" />,
      title: "Heart Health",
      description: "Rich in antioxidants that support cardiovascular health and help reduce the risk of heart disease."
    },
    {
      icon: <Brain className="ht-benefit-icon" />,
      title: "Mental Clarity",
      description: "Natural compounds like L-theanine promote focus, reduce stress, and enhance cognitive function."
    },
    {
      icon: <Shield className="ht-benefit-icon" />,
      title: "Immune Support",
      description: "Packed with polyphenols and vitamins that strengthen your immune system naturally."
    },
    {
      icon: <Leaf className="ht-benefit-icon" />,
      title: "Detoxification",
      description: "Helps cleanse the body of toxins while providing essential nutrients and hydration."
    }
  ];

  const craftingProcess = [
    {
      phase: "01",
      title: "Organic Cultivation",
      description: "Our tea leaves are grown in pristine organic gardens without pesticides or artificial fertilizers."
    },
    {
      phase: "02",
      title: "Hand Picking",
      description: "Expert tea pickers carefully select only the finest young leaves and buds at peak freshness."
    },
    {
      phase: "03",
      title: "Traditional Processing",
      description: "Time-honored techniques including withering, rolling, and oxidation preserve maximum flavor and nutrients."
    },
    {
      phase: "04",
      title: "Quality Assurance",
      description: "Every batch undergoes rigorous testing for purity, potency, and exceptional taste profile."
    }
  ];

  const teaCollection = [
    {
      product_id: 13, // Match the IDs from your database
      name: "Earl Grey Supreme",
      price: 28.99, // Change from string to number
      image: "🫖",
      description: "Premium black tea with bergamot oil and cornflower petals",
      rating: 4.9,
      label: "Signature"
    },
    {
      product_id: 14,
      name: "Dragon Well Green",
      price: 32.99,
      image: "🍃",
      description: "Delicate green tea with a sweet, nutty flavor profile",
      rating: 5.0,
      label: "Premium"
    },
    {
      product_id: 15,
      name: "Chamomile Dreams",
      price: 25.99,
      image: "🌼",
      description: "Soothing herbal blend perfect for evening relaxation",
      rating: 4.8,
      label: "Herbal"
    },
    {
      product_id: 16,
      name: "White Peony",
      price: 45.99,
      image: "🤍",
      description: "Rare white tea with subtle sweetness and delicate aroma",
      rating: 5.0,
      label: "Rare"
    },
    {
      product_id: 17,
      name: "Jasmine Phoenix Pearls",
      price: 38.99,
      image: "🌺",
      description: "Hand-rolled green tea pearls scented with jasmine flowers",
      rating: 4.9,
      label: "Artisan"
    },
    {
      product_id: 18,
      name: "Royal Pu-erh",
      price: 42.99,
      image: "🍂",
      description: "Aged dark tea with rich, earthy complexity",
      rating: 4.7,
      label: "Aged"
    }
  ];

  return (
    <>
      <Header />

      <div className="ht-main-wrapper">
        {/* Tab Navigation */}
        <nav className="ht-nav">
          <div className="ht-nav-container">
            <div className="ht-tab-buttons">
              {['wellness', 'crafting', 'collection'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`ht-tab-btn ${activeTab === tab ? 'ht-tab-active' : ''}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Wellness Benefits Section */}
        {activeTab === 'wellness' && (
          <section className="ht-section ht-wellness-area">
            <div className="ht-container">
              <div className="ht-section-header">
                <h2 className="ht-main-title">Wellness in Every Sip</h2>
                <p className="ht-subtitle">
                  Discover the incredible health benefits of our premium organic tea collection
                </p>
              </div>
              <div className="ht-wellness-grid">
                {teaBenefits.map((benefit, index) => (
                  <div key={index} className="ht-wellness-card">
                    <div className="ht-icon-container">
                      {benefit.icon}
                    </div>
                    <h3 className="ht-wellness-title">{benefit.title}</h3>
                    <p className="ht-wellness-text">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Crafting Process Section */}
        {activeTab === 'crafting' && (
          <section className="ht-section ht-crafting-area">
            <div className="ht-container">
              <div className="ht-section-header">
                <h2 className="ht-main-title">Art of Tea Crafting</h2>
                <p className="ht-subtitle">
                  From garden to cup, every step is guided by tradition and passion for excellence
                </p>
              </div>
              <div className="ht-crafting-timeline">
                {craftingProcess.map((process, index) => (
                  <div key={index} className={`ht-timeline-item ${index % 2 === 1 ? 'ht-timeline-reverse' : ''}`}>
                    <div className="ht-timeline-content">
                      <div className="ht-process-card">
                        <div className="ht-process-header">
                          <span className="ht-phase-number">{process.phase}</span>
                          <h3 className="ht-process-title">{process.title}</h3>
                        </div>
                        <p className="ht-process-text">{process.description}</p>
                      </div>
                    </div>
                    <div className="ht-timeline-icon">
                      <span className="ht-leaf-emoji">🍃</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Tea Collection Section */}
        {activeTab === 'collection' && (
          <section className="ht-section ht-collection-area">
            <div className="ht-container">
              <div className="ht-section-header">
                <h2 className="ht-main-title">Premium Tea Collection</h2>
                <p className="ht-subtitle">
                  Explore our curated selection of the world's finest organic teas
                </p>
              </div>
              <div className="ht-collection-grid">
                {teaCollection.map((tea, index) => (
                  <div key={index} className="ht-product-card">
                    <div className="ht-product-image">
                      <div className="ht-image-background">
                        <span className="ht-product-emoji">{tea.image}</span>
                      </div>
                      <div className="ht-product-label">
                        <span>{tea.label}</span>
                      </div>
                    </div>
                    <div className="ht-product-info">
                      <div className="ht-product-header">
                        <h3 className="ht-product-name">{tea.name}</h3>
                        <div className="ht-rating">
                          <Star className="ht-rating-star" />
                          <span className="ht-rating-value">{tea.rating}</span>
                        </div>
                      </div>
                      <p className="ht-product-desc">{tea.description}</p>
                      <div className="ht-product-footer">
                        <span className="ht-price">₹{tea.price.toFixed(2)}</span>
                        <button 
                          className="ht-cart-button"
                          onClick={() => addToCart(tea.product_id)}
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

export default HeekaTeaContent;