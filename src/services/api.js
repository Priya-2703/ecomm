// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/admin';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Admin authentication
export const loginAdmin = (email, password) => {
  return api.post('/login', { email, password });
};

// Dashboard
export const getDashboardStats = () => {
  return api.get('/dashboard/stats');
};

export const getTopProducts = () => {
  return api.get('/dashboard/top-products');
};

export const getRecentOrders = () => {
  return api.get('/dashboard/recent-orders');
};

// Products
export const getProducts = (search = '', category = null) => {
  return axios.get('/admin/products', {
    params: { 
      search: search,
      category: category === 'all' ? null : category
    }
  });
};

export const addProduct = (productData) => {
  const formData = new FormData();
  formData.append('name', productData.name);
  formData.append('category', productData.category);
  formData.append('price', productData.price);
  formData.append('stock', productData.stock);
  if (productData.image) {
    formData.append('image', productData.image);
  }
  
  return api.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateProduct = (productId, productData) => {
  const formData = new FormData();
  formData.append('name', productData.name);
  formData.append('category', productData.category);
  formData.append('price', productData.price);
  formData.append('stock', productData.stock);
  if (productData.image) {
    formData.append('image', productData.image);
  }
  
  return api.put(`/products/${productId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteProduct = (productId) => {
  return api.delete(`/products/${productId}`);
};

// Orders
export const getOrders = (statusFilter = 'all', paymentFilter = 'all') => {
  return api.get('/orders', {
    params: { status: statusFilter, payment: paymentFilter }
  });
};

export const updateOrderStatus = (orderId, newStatus) => {
  return api.put(`/orders/${orderId}`, { status: newStatus });
};

// Customers
export const getCustomers = (searchTerm = '') => {
  return api.get('/customers', {
    params: { search: searchTerm }
  });
};

// Categories
export const getCategories = () => {
  return axios.get('/admin/categories');
};

export default api;