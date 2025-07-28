import React from 'react';
import { Truck, Shield, Heart, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../component/header.jsx';
import Footer from '../component/footer.jsx';
import '../css/home.css';
import { Leaf, Award } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  // Function to scroll to products section smoothly
  const scrollToProducts = () => {
    const productsSection = document.getElementById('signature-products');
    if (productsSection) {
      productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Function to handle navigation to specific product pages
  const navigateTo = (path) => {
    navigate(path);
    window.scrollTo(0, 0); // Scroll to top on navigation
  };

  return (
    <div className="homepage">
      <Header />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content-home">
          <div className="hero-text">
            <h1 className="hero-title">
              Pure <span className="highlight">Organic</span> Wellness
            </h1>
            <p className="hero-subtitle">
              Discover nature's finest treasures with Heeka's premium collection of organic hair oil, raw honey, and tea powder
            </p>
            <div className="hero-buttons">
              <button 
                className="btn-primary" 
                onClick={scrollToProducts}
                aria-label="Shop our products"
              >
                Shop Now <ArrowRight size={20} />
              </button>
              <button 
                className="btn-secondary" 
                onClick={() => navigateTo('/about')}
                aria-label="Learn more about us"
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-elements">
              <div className="float-1"><Leaf size={24} /></div>
              <div className="float-2"><Heart size={20} /></div>
              <div className="float-3"><Star size={16} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <Shield className="feature-icon" />
              <h3>100% Organic</h3>
              <p>Certified organic ingredients sourced directly from nature</p>
            </div>
            <div className="feature-card">
              <Truck className="feature-icon" />
              <h3>Free Delivery</h3>
              <p>Complimentary shipping on orders above ₹500</p>
            </div>
            <div className="feature-card">
              <Award className="feature-icon" />
              <h3>Premium Quality</h3>
              <p>Handpicked products meeting highest quality standards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products" id="signature-products">
        <div className="container">
          <div className="section-header">
            <h2>Our Signature Products</h2>
            <p>Nature's bounty, carefully curated for your wellness journey</p>
          </div>
          
          <div className="products-grid">
            {/* Hair Oil Product Card */}
            <div className="product-card hair-oil">
              <div className="product-image">
                <div className="product-icon">🌿</div>
              </div>
              <div className="product-content">
                <h3>Organic Hair Oil</h3>
                <p>Nourish your hair with our blend of ancient herbs and natural oils. Promotes healthy growth and adds lustrous shine.</p>
                <div className="product-benefits">
                  <span className="benefit">✨ Strengthens roots</span>
                  <span className="benefit">🌱 Natural ingredients</span>
                  <span className="benefit">💧 Deep conditioning</span>
                </div>
                <button 
                  className="product-btn" 
                  onClick={() => navigateTo('/hairoil')}
                  aria-label="Explore hair care products"
                >
                  Explore Hair Care
                </button>
              </div>
            </div>

            {/* Honey Product Card */}
            <div className="product-card honey">
              <div className="product-image">
                <div className="product-icon">🍯</div>
              </div>
              <div className="product-content">
                <h3>Pure Raw Honey</h3>
                <p>Golden nectar straight from pristine hives. Unprocessed, unfiltered honey that retains all natural enzymes and nutrients.</p>
                <div className="product-benefits">
                  <span className="benefit">🔥 Boosts immunity</span>
                  <span className="benefit">⚡ Natural energy</span>
                  <span className="benefit">🌟 Rich in antioxidants</span>
                </div>
                <button 
                  className="product-btn" 
                  onClick={() => navigateTo('/honey')}
                  aria-label="Discover honey products"
                >
                  Discover Honey
                </button>
              </div>
            </div>

            {/* Tea Product Card */}
            <div className="product-card tea">
              <div className="product-image">
                <div className="product-icon">🍃</div>
              </div>
              <div className="product-content">
                <h3>Organic Tea Powder</h3>
                <p>Premium tea leaves ground to perfection. Experience the authentic taste and wellness benefits of traditional tea.</p>
                <div className="product-benefits">
                  <span className="benefit">🫖 Rich aroma</span>
                  <span className="benefit">💚 Antioxidant rich</span>
                  <span className="benefit">🧘 Calming effect</span>
                </div>
                <button 
                  className="product-btn" 
                  onClick={() => navigateTo('/tea')}
                  aria-label="Browse tea products"
                >
                  Browse Teas
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2>What Our Customers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"The hair oil is amazing! My hair feels so much stronger and shinier after just a few weeks of use."</p>
              <div className="customer">
                <strong>Priya S.</strong>
                <span>Verified Buyer</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"Best honey I've ever tasted! You can really taste the difference when it's pure and organic."</p>
              <div className="customer">
                <strong>Rajesh M.</strong>
                <span>Verified Buyer</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"The tea powder has such a rich flavor. It's become part of my daily wellness routine."</p>
              <div className="customer">
                <strong>Anita K.</strong>
                <span>Verified Buyer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Experience Pure Organic Wellness?</h2>
            <p>Join thousands of satisfied customers who have made the switch to natural, organic products</p>
            <button 
              className="btn-primary large" 
              onClick={scrollToProducts}
              aria-label="Start your wellness journey"
            >
              Start Your Journey <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;