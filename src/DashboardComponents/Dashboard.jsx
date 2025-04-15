import React from 'react';
import { Pie, Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

export const Dashboard = () => {
  // --- Primary Charts Data ---
  // Pie Chart Data (Sales Distribution)
  const pieData = {
    labels: ['Online', 'Retail', 'Wholesale'],
    datasets: [
      {
        label: 'Sales Channels',
        data: [300, 50, 100],
        backgroundColor: ['#8B5CF6', '#A78BFA', '#C4B5FD'],
        borderWidth: 1,
      },
    ],
  };

  // Bar Chart Data (Monthly Sales)
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: '#8B5CF6',
      },
    ],
  };

  // Doughnut Chart Data (Product Categories)
  const doughnutData = {
    labels: ['PDFs', 'E-Books', 'Courses'],
    datasets: [
      {
        label: 'Product Categories',
        data: [50, 25, 25],
        backgroundColor: ['#7C3AED', '#9F7AEA', '#B794F4'],
        borderWidth: 1,
      },
    ],
  };

  // Dummy key metrics; in a real app, these would be dynamically fetched.
  const metrics = {
    totalSales: '$45,000',
    totalProducts: 120,
    averageRating: 4.6,
    highestSellingProduct: 'React in Depth PDF',
  };

  // --- Additional Insights Data ---
  // User Activity Line Chart Data (Active Users per Day)
  const userActivityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Active Users',
        data: [120, 200, 150, 170, 190, 220, 130],
        fill: false,
        borderColor: '#8B5CF6',
        tension: 0.3,
      },
    ],
  };

  // Inventory Trends Line Chart Data (Units in Stock Over Months)
  const inventoryTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Inventory Units',
        data: [500, 480, 450, 470, 430, 400],
        fill: false,
        borderColor: '#A78BFA',
        tension: 0.3,
      },
    ],
  };

  // Revenue Forecast Line Chart Data (Actual vs. Forecast)
  const revenueForecastData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Actual Revenue',
        data: [6000, 7000, 8000, 7500, 9000, 9500],
        fill: false,
        borderColor: '#7C3AED',
        tension: 0.3,
      },
      {
        label: 'Forecast Revenue',
        data: [6500, 6800, 8200, 7900, 8700, 9800],
        fill: false,
        borderColor: '#C4B5FD',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-purple-800 mb-8 text-center">Admin Dashboard</h1>
      
      {/* Primary Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Total Sales</h2>
          <p className="mt-2 text-2xl font-bold text-purple-700">{metrics.totalSales}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Total Products</h2>
          <p className="mt-2 text-2xl font-bold text-purple-700">{metrics.totalProducts}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Average Rating</h2>
          <p className="mt-2 text-2xl font-bold text-purple-700">{metrics.averageRating}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Highest Selling Product</h2>
          <p className="mt-2 text-xl font-bold text-purple-700">{metrics.highestSellingProduct}</p>
        </div>
      </div>

      {/* Primary Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Pie Chart: Sales Distribution */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Sales Distribution</h3>
          <Pie data={pieData} />
        </div>

        {/* Bar Chart: Monthly Sales */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Monthly Sales</h3>
          <Bar data={barData} options={{ scales: { y: { beginAtZero: true } } }} />
        </div>

        {/* Doughnut Chart: Product Categories */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Product Categories</h3>
          <Doughnut data={doughnutData} />
        </div>
      </div>

      {/* Advanced Additional Insights Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">Additional Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* User Activity */}
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">User Activity</h3>
            <div className="h-60">
              <Line data={userActivityData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          {/* Inventory Trends */}
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">Inventory Trends</h3>
            <div className="h-60">
              <Line data={inventoryTrendsData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          {/* Revenue Forecast */}
          <div className="bg-white p-4 shadow-lg rounded-lg md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">Revenue Forecast</h3>
            <div className="h-72">
              <Line data={revenueForecastData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

