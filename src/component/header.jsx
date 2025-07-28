import React, { useState } from 'react';
import { ShoppingBag, Leaf, Menu, X, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../component/header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Honey', path: '/honey' },
    { name: 'Tea', path: '/tea' },
    { name: 'HairOil', path: '/hairoil' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <Leaf className="logo-icon" />
              <span className="logo-text">Heeka</span>
            </div>

            <nav className="nav-desktop">
              {navItems.map((item) => (
                <Link key={item.name} to={item.path} className="nav-link">
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="header-actions">
              <Search className="action-icon" />
              <User className="action-icon" />
              <Link to="/cart" className="cart-wrapper"> {/* Added Link here */}
                <ShoppingBag className="action-icon" />
                <span className="cart-badge">2</span>
              </Link>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="mobile-menu-btn"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              <nav className="mobile-nav">
                {navItems.map((item) => (
                  <Link 
                    key={item.name} 
                    to={item.path} 
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;