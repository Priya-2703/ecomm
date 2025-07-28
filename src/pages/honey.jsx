import React, { useState } from 'react';
import { Heart, Shield, Zap, Droplets, Star } from 'lucide-react';
import Header from '../component/header.jsx';
import Footer from '../component/footer.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/honey.css';

const HeekaHoneyContent = () => {
  const [activeSection, setActiveSection] = useState('benefits');
  const navigate = useNavigate();

  const addToCart = async (productId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }
    
    const response = await axios.post('http://localhost:5000/cart', {
      product_id: productId,  // Make sure this matches what backend expects
      quantity: 1
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.data.message === 'Product not found') {
      alert('Product not found in our database');
    } else {
      alert('Product added to cart!');
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      alert(error.response.data.message || 'Failed to add product to cart');
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request:', error.request);
      alert('No response from server. Please try again.');
    } else {
      // Something happened in setting up the request
      console.error('Error:', error.message);
      alert('Error setting up request. Please try again.');
    }
  }
};

  const benefits = [
    {
      icon: <Heart className="heeka-honey__benefit-icon" />,
      title: "Rich in Antioxidants",
      description: "Packed with powerful antioxidants that help protect your body from cellular damage and support overall health."
    },
    {
      icon: <Shield className="heeka-honey__benefit-icon" />,
      title: "Natural Antibacterial",
      description: "Contains natural antibacterial properties that can help boost your immune system and fight infections."
    },
    {
      icon: <Zap className="heeka-honey__benefit-icon" />,
      title: "Natural Energy Boost",
      description: "Provides sustained energy without the crash, making it perfect for athletes and active individuals."
    },
    {
      icon: <Droplets className="heeka-honey__benefit-icon" />,
      title: "Soothes Throat",
      description: "Natural remedy for sore throats and coughs, providing gentle relief and healing properties."
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Sustainable Beekeeping",
      description: "Our bees roam freely in organic wildflower meadows, collecting nectar from pesticide-free flowers."
    },
    {
      step: "02",
      title: "Natural Harvesting",
      description: "We harvest honey using traditional methods that respect the bees and their natural lifecycle."
    },
    {
      step: "03",
      title: "Minimal Processing",
      description: "Our honey is gently filtered to remove impurities while preserving all natural enzymes and nutrients."
    },
    {
      step: "04",
      title: "Quality Testing",
      description: "Each batch is carefully tested for purity and quality to ensure you receive only the finest honey."
    }
  ];

  const products = [
    {
      product_id: 1, // Added product_id for cart functionality
      name: "Wildflower Honey",
      price: "₹24.99",
      image: "🍯",
      description: "Pure wildflower honey with a delicate floral taste",
      rating: 4.9,
      badge: "Best Seller"
    },
    {
      product_id: 2,
      name: "Manuka Honey",
      price: "₹49.99",
      image: "🍯",
      description: "Premium Manuka honey with exceptional healing properties",
      rating: 5.0,
      badge: "Premium"
    },
    {
      product_id: 3,
      name: "Acacia Honey",
      price: "₹29.99",
      image: "🍯",
      description: "Light and mild acacia honey, perfect for tea and baking",
      rating: 4.8,
      badge: "Organic"
    },
    {
      product_id: 4,
      name: "Clover Honey",
      price: "₹22.99",
      image: "🍯",
      description: "Classic clover honey with a sweet, subtle flavor",
      rating: 4.7,
      badge: "Popular"
    },
    {
      product_id: 5,
      name: "Lavender Honey",
      price: "₹34.99",
      image: "🍯",
      description: "Aromatic lavender honey with calming properties",
      rating: 4.9,
      badge: "Limited"
    },
    {
      product_id: 6,
      name: "Raw Honeycomb",
      price: "₹39.99",
      image: "🍯",
      description: "Pure honeycomb straight from the hive",
      rating: 5.0,
      badge: "Raw"
    }
  ];

  return (
    <>
      <Header />

      <div className="heeka-honey">
        {/* Navigation */}
        <nav className="heeka-honey__navigation">
          <div className="heeka-honey__nav-container">
            <div className="heeka-honey__nav-buttons">
              {['benefits', 'process', 'products'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`heeka-honey__nav-button ${activeSection === section ? 'heeka-honey__nav-button--active' : ''}`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Benefits Section */}
        {activeSection === 'benefits' && (
          <section className="heeka-honey__section heeka-honey__benefits">
            <div className="heeka-honey__container">
              <div className="heeka-honey__section-header">
                <h2 className="heeka-honey__section-title">Nature's Golden Benefits</h2>
                <p className="heeka-honey__section-subtitle">
                  Experience the incredible health benefits of our pure organic honey
                </p>
              </div>
              <div className="heeka-honey__benefits-grid">
                {benefits.map((benefit, index) => (
                  <div key={index} className="heeka-honey__benefit-card">
                    <div className="heeka-honey__benefit-icon-wrapper">
                      {benefit.icon}
                    </div>
                    <h3 className="heeka-honey__benefit-title">{benefit.title}</h3>
                    <p className="heeka-honey__benefit-description">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Process Section */}
        {activeSection === 'process' && (
          <section className="heeka-honey__section heeka-honey__process">
            <div className="heeka-honey__container">
              <div className="heeka-honey__section-header">
                <h2 className="heeka-honey__section-title">Our Artisan Process</h2>
                <p className="heeka-honey__section-subtitle">
                  From hive to jar, every step is crafted with care and respect for nature
                </p>
              </div>
              <div className="heeka-honey__process-steps">
                {processSteps.map((step, index) => (
                  <div key={index} className={`heeka-honey__process-step ${index % 2 === 1 ? 'heeka-honey__process-step--reverse' : ''}`}>
                    <div className="heeka-honey__step-content">
                      <div className="heeka-honey__step-card">
                        <div className="heeka-honey__step-header">
                          <span className="heeka-honey__step-number">{step.step}</span>
                          <h3 className="heeka-honey__step-title">{step.title}</h3>
                        </div>
                        <p className="heeka-honey__step-description">{step.description}</p>
                      </div>
                    </div>
                    <div className="heeka-honey__step-icon">
                      <span className="heeka-honey__bee-emoji">🐝</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Products Section */}
        {activeSection === 'products' && (
          <section className="heeka-honey__section heeka-honey__products">
            <div className="heeka-honey__container">
              <div className="heeka-honey__section-header">
                <h2 className="heeka-honey__section-title">Our Honey Collection</h2>
                <p className="heeka-honey__section-subtitle">
                  Discover our premium selection of organic honey varieties
                </p>
              </div>
              <div className="heeka-honey__products-grid">
                {products.map((product, index) => (
                  <div key={index} className="heeka-honey__product-card">
                    <div className="heeka-honey__product-image">
                      <div className="heeka-honey__product-image-bg">
                        <span className="heeka-honey__product-emoji">{product.image}</span>
                      </div>
                      <div className="heeka-honey__product-badge">
                        <span>{product.badge}</span>
                      </div>
                    </div>
                    <div className="heeka-honey__product-content">
                      <div className="heeka-honey__product-header">
                        <h3 className="heeka-honey__product-name">{product.name}</h3>
                        <div className="heeka-honey__product-rating">
                          <Star className="heeka-honey__star-icon" />
                          <span className="heeka-honey__rating-text">{product.rating}</span>
                        </div>
                      </div>
                      <p className="heeka-honey__product-description">{product.description}</p>
                      <div className="heeka-honey__product-footer">
                        <span className="heeka-honey__product-price">{product.price}</span>
                        <button 
                          className="heeka-honey__add-to-cart-btn"
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

export default HeekaHoneyContent;