import { createContext, useContext, useState, useEffect } from 'react';
import api, { API_URL } from '../utils/api';

export const ProductsContext = createContext({
  products: [],
  setProducts: () => {},
  salesData: {},
  userActivity: {},
  inventoryTrends: {},
  revenueData: {}
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/pdf/get-pdfs');
      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products');
    }
  };

  // Add new product
  const addProduct = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/pdf/add-products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.status === 201) {
        await fetchProducts(); // Refresh products list
        return { success: true };
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to add product');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Update existing product
  const updateProduct = async (productId, formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/pdf/update-product/${productId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.status === 200) {
        await fetchProducts(); // Refresh products list
        return { success: true };
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Remove product
  const removeProduct = async (productId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/pdf/remove-product/${productId}`);
      if (response.status === 200) {
        await fetchProducts(); // Refresh products list
        return { success: true };
      }
    } catch (error) {
      console.error('Error removing product:', error);
      setError('Failed to remove product');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Get product by ID
  const getProductById = (productId) => {
    return products.find(product => product._id === productId);
  };

  // Dashboard metrics
  const [salesData, setSalesData] = useState({
    monthly: [65, 59, 80, 81, 56, 55, 70, 75, 82, 90, 95, 100],
    channels: {
      online: 300,
      retail: 50,
      wholesale: 100
    },
    categories: {
      'PDFs': 50,
      'E-Books': 25,
      'Courses': 25
    }
  });

  const [userActivity, setUserActivity] = useState({
    daily: [120, 200, 150, 170, 190, 220, 130],
    monthly: [1500, 1800, 2000, 2200, 2500, 2800, 3000, 3200, 3500, 3800, 4000, 4200]
  });

  const [inventoryTrends, setInventoryTrends] = useState({
    monthly: [500, 480, 450, 470, 430, 400, 420, 440, 460, 480, 500, 520]
  });

  const [revenueData, setRevenueData] = useState({
    actual: [6000, 7000, 8000, 7500, 9000, 9500, 10000, 10500, 11000, 11500, 12000, 12500],
    forecast: [6500, 6800, 8200, 7900, 8700, 9800, 10200, 10800, 11200, 11800, 12200, 12800]
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSalesData(prev => ({
        ...prev,
        monthly: prev.monthly.map(value => value + Math.floor(Math.random() * 10) - 5),
        channels: {
          online: prev.channels.online + Math.floor(Math.random() * 20) - 10,
          retail: prev.channels.retail + Math.floor(Math.random() * 5) - 2,
          wholesale: prev.channels.wholesale + Math.floor(Math.random() * 10) - 5
        }
      }));

      setUserActivity(prev => ({
        ...prev,
        daily: prev.daily.map(value => value + Math.floor(Math.random() * 20) - 10)
      }));

      setInventoryTrends(prev => ({
        monthly: prev.monthly.map(value => value + Math.floor(Math.random() * 10) - 5)
      }));

      setRevenueData(prev => ({
        actual: prev.actual.map(value => value + Math.floor(Math.random() * 100) - 50),
        forecast: prev.forecast.map(value => value + Math.floor(Math.random() * 100) - 50)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getDashboardMetrics = () => {
    const totalProducts = products.length;
    const totalSales = products.reduce((sum, product) => sum + (parseInt(product.price) * (product.downloads || 0)), 0);
    const averageRating = products.reduce((sum, product) => sum + (product.rating || 0), 0) / totalProducts || 0;
    const highestSellingProduct = products.reduce((highest, current) => 
      (current.downloads || 0) > (highest.downloads || 0) ? current : highest
    , products[0] || {});

    return {
      totalProducts,
      totalSales: `$${totalSales.toLocaleString()}`,
      averageRating: averageRating.toFixed(1),
      highestSellingProduct: highestSellingProduct?.title || 'No products',
      totalUsers: userActivity.monthly[userActivity.monthly.length - 1],
      monthlyGrowth: ((userActivity.monthly[userActivity.monthly.length - 1] - userActivity.monthly[0]) / userActivity.monthly[0] * 100).toFixed(1)
    };
  };

  const value = {
    products,
    loading,
    error,
    setProducts,
    salesData,
    userActivity,
    inventoryTrends,
    revenueData
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}; 