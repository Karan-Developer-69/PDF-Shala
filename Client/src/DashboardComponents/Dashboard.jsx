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
import { useProducts } from '../context/ProductsContext';

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
  const { getDashboardMetrics, getChartData } = useProducts();
  const metrics = getDashboardMetrics();
  const chartData = getChartData();

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
          <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
          <p className="mt-2 text-2xl font-bold text-purple-700">{metrics.totalUsers}</p>
          <p className="text-sm text-green-600">+{metrics.monthlyGrowth}% this month</p>
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
          <Pie data={chartData.pieData} />
        </div>

        {/* Bar Chart: Monthly Sales */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Monthly Sales</h3>
          <Bar data={chartData.barData} options={{ scales: { y: { beginAtZero: true } } }} />
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
              <Line data={chartData.userActivityData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          {/* Inventory Trends */}
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">Inventory Trends</h3>
            <div className="h-60">
              <Line data={chartData.inventoryTrendsData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          {/* Revenue Forecast */}
          <div className="bg-white p-4 shadow-lg rounded-lg md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">Revenue Forecast</h3>
            <div className="h-72">
              <Line data={chartData.revenueForecastData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

