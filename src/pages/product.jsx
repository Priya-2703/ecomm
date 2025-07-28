import React, { useState, useEffect } from 'react';
import { 
  Package, Plus, Edit, Trash2, Search, Filter, Eye, X, ChevronDown, Check
} from 'lucide-react';
import '../css/admin.css';
import '../css/product.css';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    image: null,
    imagePreview: ''
  });

  // Fetch products and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch products
        const productsResponse = await fetch('http://localhost:5000/admin/products');
        const productsData = await productsResponse.json();
        
        // Fetch categories
        const categoriesResponse = await fetch('http://localhost:5000/admin/categories');
        const categoriesData = await categoriesResponse.json();
        
        // Format categories for dropdown
        const formattedCategories = [
          { value: 'all', label: 'All Categories' },
          ...categoriesData.map(cat => ({
            value: cat.value.toLowerCase().replace(' ', ''),
            label: cat.label
          }))
        ];
        
        setProducts(productsData);
        setCategories(formattedCategories);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
      product.category.toLowerCase().replace(' ', '') === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatIndianCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({
          ...newProduct,
          image: file,
          imagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.category) {
      alert('Please fill all required fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('category', newProduct.category);
      formData.append('price', newProduct.price);
      formData.append('stock', newProduct.stock);
      if (newProduct.image) {
        formData.append('image', newProduct.image);
      }

      const response = await fetch('http://localhost:5000/admin/products', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const addedProduct = await response.json();
        setProducts([...products, addedProduct]);
        setNewProduct({
          name: '',
          category: '',
          price: '',
          stock: '',
          image: null,
          imagePreview: ''
        });
        setShowAddProductModal(false);
        
        // Refresh categories in case a new one was added
        const categoriesResponse = await fetch('http://localhost:5000/admin/categories');
        const categoriesData = await categoriesResponse.json();
        setCategories([
          { value: 'all', label: 'All Categories' },
          ...categoriesData.map(cat => ({
            value: cat.value.toLowerCase().replace(' ', ''),
            label: cat.label
          }))
        ]);
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct({
      ...product,
      category: product.category.toLowerCase().replace(' ', ''),
      imagePreview: product.image
    });
    setShowEditProductModal(true);
  };

  const handleSaveEdit = async () => {
    if (!editingProduct.name || !editingProduct.price || !editingProduct.stock || !editingProduct.category) {
      alert('Please fill all required fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', editingProduct.name);
      formData.append('category', editingProduct.category);
      formData.append('price', editingProduct.price);
      formData.append('stock', editingProduct.stock);
      
      const response = await fetch(`http://localhost:5000/admin/products/${editingProduct.id}`, {
        method: 'PUT',
        body: formData
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts(products.map(product => 
          product.id === updatedProduct.id ? updatedProduct : product
        ));
        setShowEditProductModal(false);
        setEditingProduct(null);
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`http://localhost:5000/admin/products/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          setProducts(products.filter(product => product.id !== id));
        } else {
          const errorData = await response.json();
          alert(errorData.message || 'Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  const handleAddCategory = async (categoryName) => {
    try {
      const response = await fetch('http://localhost:5000/admin/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category_name: categoryName })
      });

      if (response.ok) {
        const newCategory = await response.json();
        setCategories([
          ...categories,
          { 
            value: newCategory.category_name.toLowerCase().replace(' ', ''),
            label: newCategory.category_name 
          }
        ]);
        return true;
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to add category');
        return false;
      }
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Failed to add category');
      return false;
    }
  };

  const ProductRow = ({ product }) => (
    <tr className="heeka-admin-product-row">
      <td className="heeka-admin-product-info">
        <div className="heeka-admin-product-details">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="heeka-admin-product-image" 
            />
          ) : (
            <div className={`heeka-admin-product-icon heeka-admin-${product.category.toLowerCase().replace(' ', '')}`}>
              {product.category === 'Honey Products' ? '🍯' : 
               product.category === 'Tea Collection' ? '🍃' : '🌿'}
            </div>
          )}
          <div>
            <p className="heeka-admin-product-name">{product.name}</p>
            <p className="heeka-admin-product-category">{product.category}</p>
          </div>
        </div>
      </td>
      <td className="heeka-admin-product-price">{formatIndianCurrency(product.price)}</td>
      <td className="heeka-admin-product-stock">
        <span className={`heeka-admin-stock-badge ${
          product.stock > 50 ? 'heeka-admin-high' :
          product.stock > 20 ? 'heeka-admin-medium' : 'heeka-admin-low'
        }`}>
          {product.stock} units
        </span>
      </td>
      <td className="heeka-admin-product-sales">{product.sales || 0}</td>
      <td className="heeka-admin-product-actions">
        <div className="heeka-admin-action-buttons">
          <button className="heeka-admin-action-btn heeka-admin-view">
            <Eye size={16} />
          </button>
          <button 
            className="heeka-admin-action-btn heeka-admin-edit"
            onClick={() => handleEditProduct(product)}
          >
            <Edit size={16} />
          </button>
          <button 
            className="heeka-admin-action-btn heeka-admin-delete"
            onClick={() => handleDeleteProduct(product.id)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );

  if (isLoading) {
    return (
      <div className="heeka-admin-products-section">
        <div className="heeka-admin-loading">
          Loading products...
        </div>
      </div>
    );
  }

  return (
    <div className="heeka-admin-products-section">
      <div className="heeka-admin-page-header-with-action">
        <div>
          <h2 className="heeka-admin-page-title">Products</h2>
          <p className="heeka-admin-page-subtitle">Manage your product inventory</p>
        </div>
        <button 
          className="heeka-admin-primary-button"
          onClick={() => setShowAddProductModal(true)}
        >
          <Plus size={18} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filters */}
      <div className="heeka-admin-filters-card">
        <div className="heeka-admin-filters-content">
          <div className="heeka-admin-filter-controls">
            <div className="heeka-admin-search-input">
              <Search size={18} className="heeka-admin-search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="heeka-admin-search-field"
              />
            </div>
            
            <div className="heeka-admin-category-select">
              <Filter size={18} className="heeka-admin-filter-icon" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="heeka-admin-category-field"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="heeka-admin-results-count">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="heeka-admin-table-card">
        <table className="heeka-admin-products-table">
          <thead className="heeka-admin-table-header">
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Sales</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <ProductRow key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="heeka-admin-modal-overlay">
          <div className="heeka-admin-modal">
            <div className="heeka-admin-modal-header">
              <h3>Add New Product</h3>
              <button 
                className="heeka-admin-modal-close"
                onClick={() => setShowAddProductModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="heeka-admin-modal-body">
              <div className="heeka-admin-form-group">
                <label>Product Name <span className="heeka-admin-required">*</span></label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  placeholder="Enter product name"
                />
              </div>
              
              <div className="heeka-admin-form-group">
                <label>Category <span className="heeka-admin-required">*</span></label>
                <div className="heeka-admin-custom-select">
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  >
                    {productCategories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="heeka-admin-select-arrow" />
                </div>
              </div>
              
              <div className="heeka-admin-form-row">
                <div className="heeka-admin-form-group">
                  <label>Price (₹) <span className="heeka-admin-required">*</span></label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    placeholder="Enter price"
                    min="1"
                  />
                </div>
                
                <div className="heeka-admin-form-group">
                  <label>Stock Quantity <span className="heeka-admin-required">*</span></label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    placeholder="Enter stock"
                    min="0"
                  />
                </div>
              </div>

              <div className="heeka-admin-form-group">
                <label>Product Image</label>
                <div className="heeka-admin-image-upload">
                  {newProduct.imagePreview ? (
                    <div className="heeka-admin-image-preview">
                      <img src={newProduct.imagePreview} alt="Preview" />
                      <button 
                        type="button" 
                        className="heeka-admin-remove-image"
                        onClick={() => setNewProduct({...newProduct, image: null, imagePreview: ''})}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="heeka-admin-upload-label">
                      <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="heeka-admin-upload-input"
                      />
                      <div className="heeka-admin-upload-content">
                        <Plus size={24} className="heeka-admin-upload-icon" />
                        <p>Upload Product Image</p>
                        <p className="heeka-admin-upload-hint">JPG, PNG up to 2MB</p>
                      </div>
                    </label>
                  )}
                </div>
              </div>
            </div>
            
            <div className="heeka-admin-modal-footer">
              <button 
                className="heeka-admin-secondary-button"
                onClick={() => setShowAddProductModal(false)}
              >
                Cancel
              </button>
              <button 
                className="heeka-admin-primary-button"
                onClick={handleAddProduct}
              >
                <Check size={18} />
                <span>Add Product</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditProductModal && editingProduct && (
        <div className="heeka-admin-modal-overlay">
          <div className="heeka-admin-modal">
            <div className="heeka-admin-modal-header">
              <h3>Edit Product</h3>
              <button 
                className="heeka-admin-modal-close"
                onClick={() => setShowEditProductModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="heeka-admin-modal-body">
              <div className="heeka-admin-form-group">
                <label>Product Name <span className="heeka-admin-required">*</span></label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                  placeholder="Enter product name"
                />
              </div>
              
              <div className="heeka-admin-form-group">
                <label>Category <span className="heeka-admin-required">*</span></label>
                <div className="heeka-admin-custom-select">
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                  >
                    {productCategories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="heeka-admin-select-arrow" />
                </div>
              </div>
              
              <div className="heeka-admin-form-row">
                <div className="heeka-admin-form-group">
                  <label>Price (₹) <span className="heeka-admin-required">*</span></label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                    placeholder="Enter price"
                    min="1"
                  />
                </div>
                
                <div className="heeka-admin-form-group">
                  <label>Stock Quantity <span className="heeka-admin-required">*</span></label>
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({...editingProduct, stock: e.target.value})}
                    placeholder="Enter stock"
                    min="0"
                  />
                </div>
              </div>

              <div className="heeka-admin-form-group">
                <label>Product Image</label>
                <div className="heeka-admin-image-upload">
                  {editingProduct.imagePreview ? (
                    <div className="heeka-admin-image-preview">
                      <img src={editingProduct.imagePreview} alt="Preview" />
                      <button 
                        type="button" 
                        className="heeka-admin-remove-image"
                        onClick={() => setEditingProduct({...editingProduct, imagePreview: ''})}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="heeka-admin-upload-label">
                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setEditingProduct({
                                ...editingProduct,
                                imagePreview: reader.result
                              });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        accept="image/*"
                        className="heeka-admin-upload-input"
                      />
                      <div className="heeka-admin-upload-content">
                        <Plus size={24} className="heeka-admin-upload-icon" />
                        <p>Upload Product Image</p>
                        <p className="heeka-admin-upload-hint">JPG, PNG up to 2MB</p>
                      </div>
                    </label>
                  )}
                </div>
              </div>
            </div>
            
            <div className="heeka-admin-modal-footer">
              <button 
                className="heeka-admin-secondary-button"
                onClick={() => setShowEditProductModal(false)}
              >
                Cancel
              </button>
              <button 
                className="heeka-admin-primary-button"
                onClick={handleSaveEdit}
              >
                <Check size={18} />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;