import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Eye, Edit, User, Mail, Phone, MapPin, Clock
} from 'lucide-react';
import '../css/admin.css';
import '../css/customer.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch customers from backend
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`/admin/customers?search=${searchTerm}`);
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        const data = await response.json();
        setCustomers(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching customers:', error);
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, [searchTerm]);

  const formatIndianCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const CustomerRow = ({ customer }) => (
    <tr className="heeka-admin-customer-row">
      <td className="heeka-admin-customer-info">
        <div className="heeka-admin-customer-avatar">
          <User size={20} />
        </div>
        <div>
          <p className="heeka-admin-customer-name">{customer.name}</p>
          <p className="heeka-admin-customer-email">{customer.email}</p>
        </div>
      </td>
      <td className="heeka-admin-customer-phone">{customer.phone}</td>
      <td className="heeka-admin-customer-orders">{customer.orders}</td>
      <td className="heeka-admin-customer-spent">{formatIndianCurrency(customer.totalSpent)}</td>
      <td className="heeka-admin-customer-joined">{formatDate(customer.joined)}</td>
      <td className="heeka-admin-customer-actions">
        <div className="heeka-admin-action-buttons">
          <button className="heeka-admin-action-btn heeka-admin-view">
            <Eye size={16} />
          </button>
          <button className="heeka-admin-action-btn heeka-admin-edit">
            <Edit size={16} />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="heeka-admin-customers-section">
      <div className="heeka-admin-page-header">
        <h2 className="heeka-admin-page-title">Customers</h2>
        <p className="heeka-admin-page-subtitle">View and manage customer information</p>
      </div>

      {/* Customer Filters */}
      <div className="heeka-admin-filters-card">
        <div className="heeka-admin-filters-content">
          <div className="heeka-admin-filter-controls">
            <div className="heeka-admin-search-input">
              <Search size={18} className="heeka-admin-search-icon" />
              <input
                type="text"
                placeholder="Search customers..."
                className="heeka-admin-search-field"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          
          <div className="heeka-admin-results-count">
            {isLoading ? 'Loading...' : `Showing ${customers.length} customers`}
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="heeka-admin-table-card">
        {isLoading ? (
          <div className="heeka-admin-loading">Loading customers...</div>
        ) : (
          <table className="heeka-admin-customers-table">
            <thead className="heeka-admin-table-header">
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <CustomerRow key={customer.id} customer={customer} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Customers;