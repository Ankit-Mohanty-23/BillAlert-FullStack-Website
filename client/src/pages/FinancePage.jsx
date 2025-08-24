import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Bell,
  ArrowLeft,
  TrendingUp,
  DollarSign,
  PieChart,
  Calendar,
  Filter,
} from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import apiService from "../services/apiService";

export default function FinancePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  // Sample spending data - in real app this would come from your database
  const [spendingData, setSpendingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(
          `/payments/${id}`
        );
        setSpendingData(response.data);
      } catch (error) {
        console.log("Failed to fetch bills: ", error);
      }
    };
    fetchData();
  }, [id]);

  // Category colors for consistency
  const categoryColors = {
    Household: "#8B5CF6", // Purple
    Entertainment: "#EC4899", // Pink
    Education: "#10B981", // Green
    Insurance: "#F59E0B", // Amber
    Others: "#6366F1", // Indigo
  };

  // Calculate total spending by category for pie chart
  const getCategoryTotals = () => {
    const totals = {};
    spendingData.forEach((item) => {
      totals[item.category] = (totals[item.category] || 0) + item.amount;
    });

    return Object.entries(totals).map(([category, amount]) => ({
      name: category,
      value: amount,
      color: categoryColors[category],
    }));
  };

  const pieChartData = getCategoryTotals();
  const totalSpending = spendingData.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  // Custom tooltip for pie chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-slate-800 border border-purple-400/30 rounded-lg p-3 shadow-lg">
          <p className="text-white font-semibold">{data.name}</p>
          <p className="text-purple-300">${data.value.toFixed(2)}</p>
          <p className="text-gray-400 text-sm">
            {((data.value / totalSpending) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      {/* Floating Background Elements */}
      <div className="hidden md:block absolute top-20 left-10 animate-bounce delay-300">
        <div className="bg-purple-600/10 p-4 rounded-full">
          <PieChart className="h-8 w-8 text-purple-400/50" />
        </div>
      </div>
      <div className="hidden md:block absolute top-40 right-16 animate-bounce delay-700">
        <div className="bg-pink-600/10 p-4 rounded-full">
          <TrendingUp className="h-8 w-8 text-pink-400/50" />
        </div>
      </div>
      <div className="hidden md:block absolute bottom-32 left-15 animate-bounce delay-1000">
        <div className="bg-purple-600/10 p-4 rounded-full">
          <DollarSign className="h-8 w-8 text-purple-400/50" />
        </div>
      </div>

      {/* Header */}
      <header className="px-4 md:px-6 py-4 md:py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <Bell className="h-8 w-8 text-purple-400" />
            <span className="text-xl md:text-2xl font-bold text-white">
              BillAlert
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-3 sm:px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
              Finance Tracker
            </h1>
            <p className="text-base md:text-xl text-gray-300">
              Visualize your spending patterns and track your financial habits
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-4 md:p-6 rounded-2xl border border-purple-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Spending</p>
                  <p className="text-xl md:text-2xl font-bold text-white">
                    ${totalSpending.toFixed(2)}
                  </p>
                </div>
                <div className="bg-purple-600/30 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 p-4 md:p-6 rounded-2xl border border-green-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Reminders</p>
                  <p className="text-xl md:text-2xl font-bold text-white">
                    {spendingData.length}
                  </p>
                </div>
                <div className="bg-green-600/30 p-3 rounded-full">
                  <Bell className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-4 md:gap-8">
            {/* Spending Table */}
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-4 md:p-8 border border-purple-500/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white flex items-center">
                  <DollarSign className="h-6 w-6 mr-2 text-purple-400" />
                  Spending Overview
                </h2>
                <button className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
                  <Filter className="h-5 w-5" />
                </button>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-700">
                <div className="overflow-y-auto max-h-96">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-700/50">
                        <th className="px-3 md:px-4 py-3 text-left text-sm font-semibold text-purple-100">
                          Name
                        </th>
                        <th className="px-3 md:px-4 py-3 text-left text-sm font-semibold text-purple-100">
                          Category
                        </th>
                        <th className="px-3 md:px-4 py-3 text-right text-sm font-semibold text-purple-100">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {spendingData.map((item) => (
                        <tr
                          key={item._id}
                          className={`border-t border-slate-700/50 hover:bg-slate-700/30 transition-colors duration-200`}
                        >
                          <td className="px-3 md:px-4 py-3 text-white font-medium">
                            {item.name}
                          </td>
                          <td className="px-3 md:px-4 py-3">
                            <span
                              className="px-3 py-1 rounded-full text-xs font-medium text-white"
                              style={{
                                backgroundColor:
                                  categoryColors[item.category] + "40",
                                color: categoryColors[item.category],
                              }}
                            >
                              {item.category}
                            </span>
                          </td>
                          <td className="px-3 md:px-4 py-3 text-right text-white font-semibold">
                            ${item.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="min-w-0 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-4 md:p-8 border border-purple-500/20">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 md:mb-6 flex items-center">
                <PieChart className="h-6 w-6 mr-2 text-purple-400" />
                Category Breakdown
              </h2>

              <div className="h-64 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart margin={{ top: 16, bottom: 16 }}>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 md:gap-3 mt-4 md:mt-6">
                {pieChartData.map((entry, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">
                        {entry.name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        ${entry.value.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="px-6 py-8 bg-slate-800/30 backdrop-blur-sm border-b border-purple-400/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Bell className="h-6 w-6 text-purple-400" />
            <span className="text-xl font-semibold text-white">BillAlert</span>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} BillAlert
          </p>
        </div>
      </footer>
    </div>
  );
}
