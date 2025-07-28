import React, { useState, useEffect } from 'react';
import { 
  Package, ShoppingCart, DollarSign, TrendingUp,
  Calendar, CreditCard, Truck
} from 'lucide-react';
import '../css/admin.css';
import '../css/dashboard.css';

const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState('week');
  const [productFilter, setProductFilter] = useState('all');
  const [dashboardStats, setDashboardStats] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const timeFilters = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  const productFilters = [
    { value: 'all', label: 'All Products' },
    { value: 'honey', label: 'Honey' },
    { value: 'tea', label: 'Tea' },
    { value: 'haircare', label: 'Hair Care' }
  ];

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch dashboard stats
        const statsResponse = await fetch('http://localhost:5000/admin/dashboard/stats');
        const statsData = await statsResponse.json();
        setDashboardStats(statsData);
        
        // Fetch top products
        const topProductsResponse = await fetch('http://localhost:5000/admin/dashboard/top-products');
        const topProductsData = await topProductsResponse.json();
        setTopProducts(topProductsData);
        
        // Fetch recent orders
        const ordersResponse = await fetch('http://localhost:5000/admin/dashboard/recent-orders');
        const ordersData = await ordersResponse.json();
        setRecentOrders(ordersData);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [timeFilter, productFilter]);

  const formatIndianCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
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

  const StatCard = ({ icon: Icon, title, value, change, color }) => (
    <div className="heeka-admin-stat-card">
      <div className="heeka-admin-stat-content">
        <div className="heeka-admin-stat-text">
          <p className="heeka-admin-stat-title">{title}</p>
          <p className="heeka-admin-stat-value">{value}</p>
          {change && (
            <p className={`heeka-admin-stat-change ${change > 0 ? 'heeka-admin-positive' : 'heeka-admin-negative'}`}>
              <TrendingUp size={14} className="heeka-admin-trend-icon" />
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`heeka-admin-stat-icon heeka-admin-${color}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="heeka-admin-dashboard">
        <div className="heeka-admin-loading">
          Loading dashboard data...
        </div>
      </div>
    );
  }

  return (
    <div className="heeka-admin-dashboard">
      <div className="heeka-admin-page-header">
        <h2 className="heeka-admin-page-title">Dashboard Overview</h2>
        <p className="heeka-admin-page-subtitle">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Dashboard Filters */}
      <div className="heeka-admin-filters-card">
        <div className="heeka-admin-filters-content">
          <div className="heeka-admin-filter-controls">
            <div className="heeka-admin-time-select">
              <Calendar size={18} className="heeka-admin-filter-icon" />
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="heeka-admin-filter-field"
              >
                {timeFilters.map(filter => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="heeka-admin-product-select">
              <Package size={18} className="heeka-admin-filter-icon" />
              <select
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
                className="heeka-admin-filter-field"
              >
                {productFilters.map(filter => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      {dashboardStats && (
        <div className="heeka-admin-stats-grid">
          <StatCard
            icon={Package}
            title="Total Products"
            value={dashboardStats.totalProducts}
            color="blue"
          />
          <StatCard
            icon={ShoppingCart}
            title="Total Sales"
            value={dashboardStats.totalSales.toLocaleString()}
            change={12.5} // You can calculate this from your data if needed
            color="green"
          />
          <StatCard
            icon={DollarSign}
            title="Revenue"
            value={formatIndianCurrency(dashboardStats.totalRevenue)}
            change={8.2} // You can calculate this from your data if needed
            color="purple"
          />
          <StatCard
            icon={Package}
            title="Low Stock Alert"
            value={dashboardStats.lowStockProducts}
            color="red"
          />
        </div>
      )}

      {/* Top Products */}
      <div className="heeka-admin-dashboard-card">
        <div className="heeka-admin-card-header">
          <h3 className="heeka-admin-card-title">Top Selling Products</h3>
        </div>
        <div className="heeka-admin-card-content">
          <div className="heeka-admin-top-products">
            {topProducts.map((product, index) => (
              <div key={product.id} className="heeka-admin-top-product-item">
                <div className="heeka-admin-product-rank">
                  <span className="heeka-admin-rank-number">{index + 1}</span>
                  <div>
                    <p className="heeka-admin-top-product-name">{product.name}</p>
                    <p className="heeka-admin-top-product-sales">{product.sales} sales</p>
                  </div>
                </div>
                <span className="heeka-admin-top-product-price">
                  {formatIndianCurrency(product.price)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="heeka-admin-dashboard-card">
        <div className="heeka-admin-card-header">
          <h3 className="heeka-admin-card-title">Recent Orders</h3>
        </div>
        <div className="heeka-admin-card-content">
          <table className="heeka-admin-orders-table">
            <thead className="heeka-admin-table-header">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id} className="heeka-admin-order-row">
                  <td className="heeka-admin-order-id">#{order.id}</td>
                  <td className="heeka-admin-order-customer">{order.customer}</td>
                  <td className="heeka-admin-order-date">{formatDate(order.date)}</td>
                  <td className="heeka-admin-order-status">{getStatusBadge(order.status)}</td>
                  <td className="heeka-admin-order-amount">{formatIndianCurrency(order.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;