import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Search, Filter, CreditCard, Eye
} from 'lucide-react';
import '../css/admin.css';
import '../css/order.css';

const Orders = () => {
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const orderStatuses = [
    { value: 'all', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const paymentMethods = [
    { value: 'all', label: 'All Methods' },
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'upi', label: 'UPI' },
    { value: 'cod', label: 'Cash on Delivery' }
  ];

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/admin/orders?status=${orderStatusFilter}&payment=${paymentMethodFilter}`);
        const data = await response.json();
        setOrders(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [orderStatusFilter, paymentMethodFilter]);

  // Filter orders based on status, payment method, and search term
  const filteredOrders = orders.filter(order => {
    const matchesStatus = orderStatusFilter === 'all' || order.status.toLowerCase() === orderStatusFilter;
    const matchesPayment = paymentMethodFilter === 'all' || order.payment.toLowerCase() === paymentMethodFilter;
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.id.toString().includes(searchTerm);
    return matchesStatus && matchesPayment && matchesSearch;
  });

  const formatIndianCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'heeka-admin-pending',
      processing: 'heeka-admin-processing',
      shipped: 'heeka-admin-shipped',
      delivered: 'heeka-admin-delivered',
      cancelled: 'heeka-admin-cancelled'
    };
    
    const statusLabels = {
      pending: 'Pending',
      processing: 'Processing',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled'
    };

    return (
      <span className={`heeka-admin-status-badge ${statusClasses[status.toLowerCase()]}`}>
        {statusLabels[status.toLowerCase()]}
      </span>
    );
  };

  const getPaymentIcon = (method) => {
    const icons = {
      credit_card: <CreditCard size={16} />,
      upi: <span style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}>UPI</span>,
      cod: <span style={{ fontFamily: 'sans-serif' }}>COD</span>
    };
    return icons[method.toLowerCase()] || <CreditCard size={16} />;
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        // Update local state
        setOrders(orders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        ));
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
  };

  const OrderRow = ({ order }) => (
    <tr className="heeka-admin-order-row">
      <td className="heeka-admin-order-id">#{order.id}</td>
      <td className="heeka-admin-order-customer">{order.customer}</td>
      <td className="heeka-admin-order-date">{formatDate(order.date)}</td>
      <td className="heeka-admin-order-status">
        <select
          value={order.status.toLowerCase()}
          onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
          className={`heeka-admin-status-select heeka-admin-${order.status.toLowerCase()}`}
        >
          {orderStatuses.filter(s => s.value !== 'all').map(status => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </td>
      <td className="heeka-admin-order-amount">{formatIndianCurrency(order.amount)}</td>
      <td className="heeka-admin-order-items">{order.items} item{order.items !== 1 ? 's' : ''}</td>
      <td className="heeka-admin-order-payment">
        <div className="heeka-admin-payment-method">
          {getPaymentIcon(order.payment)}
        </div>
      </td>
      <td className="heeka-admin-order-actions">
        <button className="heeka-admin-action-btn heeka-admin-view">
          <Eye size={16} />
        </button>
      </td>
    </tr>
  );

  if (isLoading) {
    return (
      <div className="heeka-admin-orders-section">
        <div className="heeka-admin-loading">
          Loading orders...
        </div>
      </div>
    );
  }

  return (
    <div className="heeka-admin-orders-section">
      <div className="heeka-admin-page-header">
        <h2 className="heeka-admin-page-title">Orders</h2>
        <p className="heeka-admin-page-subtitle">Manage customer orders and fulfillment</p>
      </div>

      {/* Order Filters */}
      <div className="heeka-admin-filters-card">
        <div className="heeka-admin-filters-content">
          <div className="heeka-admin-filter-controls">
            <div className="heeka-admin-search-input">
              <Search size={18} className="heeka-admin-search-icon" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="heeka-admin-search-field"
              />
            </div>
            
            <div className="heeka-admin-status-select">
              <Filter size={18} className="heeka-admin-filter-icon" />
              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="heeka-admin-filter-field"
              >
                {orderStatuses.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="heeka-admin-payment-select">
              <CreditCard size={18} className="heeka-admin-filter-icon" />
              <select
                value={paymentMethodFilter}
                onChange={(e) => setPaymentMethodFilter(e.target.value)}
                className="heeka-admin-filter-field"
              >
                {paymentMethods.map(method => (
                  <option key={method.value} value={method.value}>
                    {method.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="heeka-admin-results-count">
            Showing {filteredOrders.length} of {orders.length} orders
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="heeka-admin-table-card">
        <table className="heeka-admin-orders-table">
          <thead className="heeka-admin-table-header">
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Items</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <OrderRow key={order.id} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;