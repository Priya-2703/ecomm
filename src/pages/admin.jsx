import React, { useState } from 'react';
import { 
  Package, ShoppingCart, Users, BarChart3 
} from 'lucide-react';
import Dashboard from './dashboard';
import Products from './product';
import Orders from './order';
import Customers from './customer';
import '../css/admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="heeka-admin-container">
      {/* Sidebar */}
      <div className="heeka-admin-sidebar">
        <div className="heeka-admin-sidebar-header">
          <h1 className="heeka-admin-brand-title">Heeka Store</h1>
          <p className="heeka-admin-brand-subtitle">Admin Panel</p>
        </div>
        
        <nav className="heeka-admin-sidebar-nav">
          <div className="heeka-admin-nav-items">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`heeka-admin-nav-item ${activeTab === 'dashboard' ? 'heeka-admin-active' : ''}`}
            >
              <BarChart3 size={18} className="heeka-admin-nav-icon" />
              Dashboard
            </button>
            
            <button
              onClick={() => setActiveTab('products')}
              className={`heeka-admin-nav-item ${activeTab === 'products' ? 'heeka-admin-active' : ''}`}
            >
              <Package size={18} className="heeka-admin-nav-icon" />
              Products
            </button>
            
            <button
              onClick={() => setActiveTab('orders')}
              className={`heeka-admin-nav-item ${activeTab === 'orders' ? 'heeka-admin-active' : ''}`}
            >
              <ShoppingCart size={18} className="heeka-admin-nav-icon" />
              Orders
            </button>
            
            <button
              onClick={() => setActiveTab('customers')}
              className={`heeka-admin-nav-item ${activeTab === 'customers' ? 'heeka-admin-active' : ''}`}
            >
              <Users size={18} className="heeka-admin-nav-icon" />
              Customers
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="heeka-admin-main-content">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'products' && <Products />}
        {activeTab === 'orders' && <Orders />}
        {activeTab === 'customers' && <Customers />}
      </div>
    </div>
  );
};

export default Admin;