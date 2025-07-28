import React from 'react';
import { Leaf } from 'lucide-react';
import '../component/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <Leaf className="footer-logo-icon" />
              <span className="footer-logo-text">Heeka</span>
            </div>
            <p className="footer-desc">Premium natural products for a healthier lifestyle.</p>
          </div>
          <div className="footer-section">
            <h3 className="footer-heading">Products</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Natural Honey</a></li>
              <li><a href="#" className="footer-link">Organic Tea</a></li>
              <li><a href="#" className="footer-link">Hair Oils</a></li>
              <li><a href="#" className="footer-link">Gift Sets</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-heading">Support</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">FAQ</a></li>
              <li><a href="#" className="footer-link">Shipping</a></li>
              <li><a href="#" className="footer-link">Returns</a></li>
              <li><a href="#" className="footer-link">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-heading">Connect</h3>
            <p className="footer-social-text">Follow us for daily wellness tips</p>
            <div className="social-links">
              <div className="social-link">f</div>
              <div className="social-link">t</div>
              <div className="social-link">i</div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Heeka. All rights reserved. Crafted with ❤️ for natural living.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;