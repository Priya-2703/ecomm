import React from 'react';
import Header from '../component/header.jsx';
import Footer from '../component/footer.jsx';
import '../css/about.css';

const About = () => {
  return (
    <>
      <Header />
      <div className="about-container">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-content-about">
            <h1 className="hero-title">About Heeka</h1>
            <p className="hero-subtitle">
              Nurturing Nature's Goodness Since Day One
            </p>
          </div>
         <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
              alt="Lush green forest with sunlight filtering through trees" 
            />
          </div>
        </section>

        {/* Our Story Section */}
        <section className="our-story">
          <div className="container">
            <div className="story-content">
              <div className="story-text">
                <h2>Our Story</h2>
                <p>
                  Heeka was born from a simple belief: nature provides the best ingredients 
                  for a healthy, sustainable lifestyle. Founded with a passion for organic 
                  living, we've dedicated ourselves to sourcing and creating the finest 
                  natural products that honor both your well-being and our planet.
                </p>
                <p>
                  From our humble beginnings to becoming a trusted name in organic products, 
                  our journey has been guided by unwavering commitment to quality, 
                  sustainability, and the ancient wisdom of natural healing.
                </p>
              </div>
              <div className="story-image">
                <img src="https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Organic product founders and natural ingredients" />
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="mission-section">
          <div className="container">
            <h2>Our Mission</h2>
            <div className="mission-grid">
              <div className="mission-card">
                <div className="mission-icon">🌱</div>
                <h3>Pure & Natural</h3>
                <p>
                  We source only the purest, organically grown ingredients, 
                  ensuring every product meets the highest standards of natural purity.
                </p>
              </div>
              <div className="mission-card">
                <div className="mission-icon">🌍</div>
                <h3>Sustainable Practice</h3>
                <p>
                  Our commitment to sustainability drives every decision, from 
                  eco-friendly packaging to supporting organic farming communities.
                </p>
              </div>
              <div className="mission-card">
                <div className="mission-icon">❤️</div>
                <h3>Wellness First</h3>
                <p>
                  Your health and well-being are at the heart of everything we do, 
                  creating products that nourish both body and soul.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Products Section */}
        <section className="products-overview">
          <div className="container">
            <h2>What We Offer</h2>
            <div className="products-grid">
              <div className="product-highlight">
                <img src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Pure organic honey jar with honeycomb" />
                <h3>Organic Honey</h3>
                <p>
                  Pure, raw honey harvested from pristine apiaries, retaining all 
                  natural enzymes and nutrients for maximum health benefits.
                </p>
              </div>
              <div className="product-highlight">
                <img src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Organic tea leaves and tea cup" />
                <h3>Organic Tea</h3>
                <p>
                  Hand-picked tea leaves from organic gardens, offering a perfect 
                  blend of flavor, aroma, and wellness in every cup.
                </p>
              </div>
              <div className="product-highlight">
                <img src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Natural hair oil bottles with herbs" />
                <h3>Natural Hair Oil</h3>
                <p>
                  Traditional hair care solutions crafted with time-tested natural 
                  ingredients for healthy, lustrous hair.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <div className="container">
            <h2>Our Values</h2>
            <div className="values-content">
              <div className="values-list">
                <div className="value-item">
                  <h4>Quality Assurance</h4>
                  <p>Every product undergoes rigorous testing to ensure purity and potency.</p>
                </div>
                <div className="value-item">
                  <h4>Transparency</h4>
                  <p>We believe in complete transparency about our sourcing and production processes.</p>
                </div>
                <div className="value-item">
                  <h4>Community Support</h4>
                  <p>We work directly with organic farmers and communities to ensure fair trade practices.</p>
                </div>
                <div className="value-item">
                  <h4>Innovation</h4>
                  <p>Combining traditional wisdom with modern innovation to create exceptional products.</p>
                </div>
              </div>
              <div className="values-image">
                <img 
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
          alt="Professional team members standing in a natural setting discussing organic products" 
             />             
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <div className="container">
            <h2>Meet Our Team</h2>
            <p className="team-intro">
              Behind Heeka is a passionate team of experts in organic farming, 
              nutrition, and sustainable business practices.
            </p>
            <div className="team-grid">
              <div className="team-member">
               <img 
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Sarah Johnson - Founder standing professionally in business attire" 
                />               
                 <h4>Sarah Johnson</h4>
                <p>Founder & CEO</p>
              </div>
              <div className="team-member">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" alt="Dr. Michael Chen - Head of Product Development" />
                <h4>Dr. Michael Chen</h4>
                <p>Head of Product Development</p>
              </div>
              <div className="team-member">
                <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" alt="Emma Rodriguez - Sustainability Director" />
                <h4>Emma Rodriguez</h4>
                <p>Sustainability Director</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <h2>Join the Heeka Family</h2>
            <p>
              Experience the difference that pure, organic products can make in your life. 
              Join thousands of satisfied customers who trust Heeka for their natural wellness needs.
            </p>
            <button className="cta-button">Shop Now</button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;