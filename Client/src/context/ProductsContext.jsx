import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([
    { id: 1, image: 'https://picsum.photos/id/1011/300/200', title: 'React in Depth PDF', price: '499', rating: 4.7, reviews: 320, qty: 1, downloads: 20, category: 'PDFs' },
    { id: 2, image: 'https://picsum.photos/id/1012/300/200', title: 'JavaScript Essentials', price: '399', rating: 4.5, reviews: 210, qty: 1, downloads: 15, category: 'E-Books' },
  ]);

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
      // Update sales data
      setSalesData(prev => ({
        ...prev,
        monthly: prev.monthly.map(value => value + Math.floor(Math.random() * 10) - 5),
        channels: {
          online: prev.channels.online + Math.floor(Math.random() * 20) - 10,
          retail: prev.channels.retail + Math.floor(Math.random() * 5) - 2,
          wholesale: prev.channels.wholesale + Math.floor(Math.random() * 10) - 5
        }
      }));

      // Update user activity
      setUserActivity(prev => ({
        ...prev,
        daily: prev.daily.map(value => value + Math.floor(Math.random() * 20) - 10)
      }));

      // Update inventory trends
      setInventoryTrends(prev => ({
        monthly: prev.monthly.map(value => value + Math.floor(Math.random() * 10) - 5)
      }));

      // Update revenue data
      setRevenueData(prev => ({
        actual: prev.actual.map(value => value + Math.floor(Math.random() * 100) - 50),
        forecast: prev.forecast.map(value => value + Math.floor(Math.random() * 100) - 50)
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: products.length + 1,
      rating: 0,
      reviews: 0,
      qty: 1,
      downloads: 0,
      category: newProduct.category || 'PDFs'
    };
    setProducts([...products, productWithId]);
    
    // Update sales data categories
    setSalesData(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [productWithId.category]: (prev.categories[productWithId.category] || 0) + 1
      }
    }));
  };

  const updateProduct = (updatedProduct) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  const removeProduct = (productId) => {
    const productToRemove = products.find(p => p.id === productId);
    setProducts(products.filter(product => product.id !== productId));
    
    // Update sales data categories
    if (productToRemove) {
      setSalesData(prev => ({
        ...prev,
        categories: {
          ...prev.categories,
          [productToRemove.category]: Math.max(0, (prev.categories[productToRemove.category] || 0) - 1)
        }
      }));
    }
  };

  const getProductById = (productId) => {
    return products.find(product => product.id === productId);
  };

  const getDashboardMetrics = () => {
    const totalProducts = products.length;
    const totalSales = products.reduce((sum, product) => sum + (parseInt(product.price) * product.downloads), 0);
    const averageRating = products.reduce((sum, product) => sum + product.rating, 0) / totalProducts;
    const highestSellingProduct = products.reduce((highest, current) => 
      current.downloads > highest.downloads ? current : highest
    );

    return {
      totalProducts,
      totalSales: `$${totalSales.toLocaleString()}`,
      averageRating: averageRating.toFixed(1),
      highestSellingProduct: highestSellingProduct.title,
      totalUsers: userActivity.monthly[userActivity.monthly.length - 1],
      monthlyGrowth: ((userActivity.monthly[userActivity.monthly.length - 1] - userActivity.monthly[0]) / userActivity.monthly[0] * 100).toFixed(1)
    };
  };

  const getChartData = () => {
    return {
      pieData: {
        labels: ['Online', 'Retail', 'Wholesale'],
        datasets: [{
          label: 'Sales Channels',
          data: [salesData.channels.online, salesData.channels.retail, salesData.channels.wholesale],
          backgroundColor: ['#8B5CF6', '#A78BFA', '#C4B5FD'],
          borderWidth: 1,
        }],
      },
      barData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Monthly Sales',
          data: salesData.monthly,
          backgroundColor: '#8B5CF6',
        }],
      },
      doughnutData: {
        labels: Object.keys(salesData.categories),
        datasets: [{
          label: 'Product Categories',
          data: Object.values(salesData.categories),
          backgroundColor: ['#7C3AED', '#9F7AEA', '#B794F4'],
          borderWidth: 1,
        }],
      },
      userActivityData: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Active Users',
          data: userActivity.daily,
          fill: false,
          borderColor: '#8B5CF6',
          tension: 0.3,
        }],
      },
      inventoryTrendsData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Inventory Units',
          data: inventoryTrends.monthly,
          fill: false,
          borderColor: '#A78BFA',
          tension: 0.3,
        }],
      },
      revenueForecastData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Actual Revenue',
            data: revenueData.actual,
            fill: false,
            borderColor: '#7C3AED',
            tension: 0.3,
          },
          {
            label: 'Forecast Revenue',
            data: revenueData.forecast,
            fill: false,
            borderColor: '#C4B5FD',
            tension: 0.3,
          },
        ],
      },
    };
  };

  return (
    <ProductsContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      removeProduct,
      getProductById,
      getDashboardMetrics,
      getChartData
    }}>
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