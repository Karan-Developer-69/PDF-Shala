import  { useEffect } from 'react';
// Import Chart.js components and register them
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement, // Import Filler for area charts
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
// Optional: Icons for flair
import { FaFilePdf, FaTrophy, FaDollarSign, FaChartLine } from 'react-icons/fa';
// Register the components you need with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler // Register Filler
);

// --- Placeholder Data (Replace with actual data fetching) ---
const totalSalesAmount = 12450.75;
const totalPdfsSold = 350;
const averageSaleValue = totalSalesAmount / totalPdfsSold;

const highestSellingPdf = {
  title: "The Ultimate Guide to Tailwind CSS",
  salesCount: 85,
  revenue: 2125.00, // Optional: Revenue for this specific PDF
};

const monthlySalesData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Example months
  sales: [30, 45, 60, 55, 70, 85, 90, 80, 100, 110, 120, 150], // Example PDF units sold per month
  // Optional: Revenue per month
  // revenue: [750, 1125, 1500, 1375, 1750, 2125, 2250, 2000, 2500, 2750, 3000, 3750],
};
// --- End Placeholder Data ---


export const Dashboard = () => {

  const monthlySales = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [1200, 1900, 3000, 5000, 2500, 3000],
        backgroundColor: 'rgba(168, 85, 247, 0.4)', // Purple shade
        borderColor: 'rgba(168, 85, 247, 1)',
        borderWidth: 1,
      },
    ],
  };
  // --- Chart Configuration ---
  const lineChartOptions = {
    responsive: true, // Make it responsive
    maintainAspectRatio: false, // Important to allow height control via container
    plugins: {
      legend: {
        position: 'top',
        labels: {
            color: '#4b5563', // Gray-600 for legend text
        }
      },
      title: {
        display: true,
        text: 'Monthly PDF Sales',
        color: '#4c1d95', // Purple-800 for title
        font: {
            size: 18,
            weight: 'bold',
        }
      },
      tooltip: {
        backgroundColor: 'rgba(76, 29, 149, 0.8)', // Purple-800 with opacity
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
            color: '#6b7280', // Gray-500 for Y-axis labels
        },
        grid: {
            color: '#e5e7eb', // Gray-200 for grid lines
        }
      },
      x: {
         ticks: {
            color: '#6b7280', // Gray-500 for X-axis labels
        },
         grid: {
            display: false, // Hide vertical grid lines if desired
        }
      }
    },
  };

  const lineChartData = {
    labels: monthlySalesData.labels,
    datasets: [
      {
        label: 'PDFs Sold',
        data: monthlySalesData.sales,
        borderColor: '#8b5cf6', // Purple-500
        backgroundColor: 'rgba(139, 92, 246, 0.2)', // Lighter purple fill
        tension: 0.3, // Smooths the line
        fill: true, // Fill area under the line
        pointBackgroundColor: '#8b5cf6', // Purple-500 for points
        pointBorderColor: '#fff',
        pointHoverRadius: 7,
        pointHoverBackgroundColor: '#6d28d9', // Purple-700 on hover
      },
       // Optional: Add a dataset for revenue if you have it
      // {
      //   label: 'Revenue ($)',
      //   data: monthlySalesData.revenue,
      //   borderColor: '#10b981', // Emerald-500 for contrast
      //   backgroundColor: 'rgba(16, 185, 129, 0.1)',
      //   tension: 0.3,
      //   fill: false, // Don't fill this one if you have the other filled
      //   yAxisID: 'y1', // Use if you want a separate scale for revenue
      // },
    ],
  };
  // --- End Chart Configuration ---


  // Add a subtle fade-in animation on load
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in-element');
    elements.forEach((el, index) => {
      el.style.animation = `fadeInUpSimple 0.5s ease-out ${index * 0.1}s forwards`;
    });
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-indigo-100 p-4 md:p-8">
       {/* Add simple keyframes for subtle load animation */}
       <style>
        {`
          @keyframes fadeInUpSimple {
            from {
              opacity: 0;
              transform: translateY(15px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .fade-in-element {
             opacity: 0; /* Start hidden */
          }
        `}
      </style>

      <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6 md:mb-8 fade-in-element">
        Admin Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Total Sales Card */}
        <div className="bg-white p-5 rounded-xl shadow-lg flex items-center space-x-4 transition-transform transform hover:scale-105 fade-in-element">
          <div className="bg-purple-100 p-3 rounded-full">
            <FaDollarSign className="text-purple-600 text-2xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Sales</p>
            <p className="text-2xl font-semibold text-purple-800">
              ${totalSalesAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Total PDFs Sold Card */}
        <div className="bg-white p-5 rounded-xl shadow-lg flex items-center space-x-4 transition-transform transform hover:scale-105 fade-in-element">
          <div className="bg-purple-100 p-3 rounded-full">
            <FaFilePdf className="text-purple-600 text-2xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500">PDFs Sold</p>
            <p className="text-2xl font-semibold text-purple-800">{totalPdfsSold}</p>
          </div>
        </div>

         {/* Average Sale Value Card */}
         <div className="bg-white p-5 rounded-xl shadow-lg flex items-center space-x-4 transition-transform transform hover:scale-105 fade-in-element">
          <div className="bg-purple-100 p-3 rounded-full">
            <FaChartLine className="text-purple-600 text-2xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Average Sale Value</p>
            <p className="text-2xl font-semibold text-purple-800">
                ${averageSaleValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area (Chart and Leaderboard) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

        {/* Monthly Sales Chart - Takes 2/3 width on large screens */}
        <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-xl shadow-lg fade-in-element">
           {/* Container to control chart height */}
          <div className="relative h-72 md:h-96">
             <Line options={lineChartOptions} data={lineChartData} />
          </div>
        </div>

        {/* Highest Selling PDF Leaderboard - Takes 1/3 width */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg fade-in-element">
          <h2 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
            <FaTrophy className="text-yellow-500 mr-2" /> Top Selling PDF
          </h2>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-700 truncate mb-1" title={highestSellingPdf.title}>
                {highestSellingPdf.title}
            </h3>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-purple-600">{highestSellingPdf.salesCount}</span> units sold
            </p>
            {/* Optional: Display revenue for this PDF */}
            {highestSellingPdf.revenue && (
               <p className="text-sm text-gray-600 mt-1">
                Revenue: <span className="font-medium text-green-600">${highestSellingPdf.revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
               </p>
            )}
          </div>
          {/* You could add a list of top 3-5 PDFs here if needed */}
          <h3 className="text-lg font-semibold text-purple-800 mt-6 mb-3">Top 5 Leaderboard</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>PDF Title 1 <span className="text-sm text-purple-600 float-right">120 sales</span></li>
            <li>PDF Title 2 <span className="text-sm text-purple-600 float-right">105 sales</span></li>
            {/* // ... map over top PDFs data */}
          </ol>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-purple-700">Monthly Sales</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Bar
            data={monthlySales}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Monthly Sales Trend' },
              },
            }}
          />
        </div>
      </div>

    </div>
  );
};