import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Bell,
  Plus,
  BarChart3,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Zap,
  Wifi,
  MonitorSpeaker,
  Home,
  Car,
  GraduationCap,
  CreditCard,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { Link, useParams } from "react-router";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({ type: "success", message: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState(""); // This would come from auth context
  const [expandedCard, setExpandedCard] = useState(null);

  // Mock reminders data - replace with real data from API
  const [reminders, setReminders] = useState([]);

  const showCustomAlert = (type, message) => {
    setAlertData({ type, message });
    setShowAlert(true);
    // Auto hide after 4 seconds
    setTimeout(() => setShowAlert(false), 4000);
  };

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setErrorMessage("");
        const clientName = await axios.get(
          `http://localhost:5000/client/${id}`
        );
        setUserName(clientName.data.data.fullName);
        const response = await axios.get(`http://localhost:5000/bill/${id}`);
        setReminders(response.data);
      } catch (error) {
        console.log("Failed to fetch bills: ", error);
        setErrorMessage(
          "Failed to load reminders. Please try refreshing the page or check your connection."
        );
      }
    };
    fetchBills();
  }, [id]);

  const iconMap = {
    Household: Home,
    Entertainment: MonitorSpeaker,
    Insurance: CreditCard,
    Education: GraduationCap,
    Others: Zap,
  };

  const colorMap = {
    Household: "from-yellow-500 to-orange-500",
    Entertainment: "from-red-500 to-pink-500",
    Insurance: "from-blue-500 to-cyan-500",
    Education: "from-purple-500 to-violet-500",
    Others: "from-pink-400 to-orange-400",
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (daysUntil) => {
    if (daysUntil == 0) return "text-red-400";
    if (daysUntil <= 3) return "text-yellow-400";
    return "text-green-400";
  };

  const getStatusText = (daysUntil) => {
    if (daysUntil < 0) return `${Math.abs(daysUntil)} days overdue`;
    if (daysUntil === 0) return "Due today";
    if (daysUntil === 1) return "Due tomorrow";
    return `Due in ${daysUntil} days`;
  };

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleAddReminder = () => {
    console.log("Add reminder clicked");
    // This would open an add reminder modal or navigate to add reminder page
    navigate(`/reminder/${id}`);
  };

  const handleFinanceTracking = () => {
    console.log("Finance tracking clicked");
    // This would navigate to finance tracking page
    navigate(`/finance/${id}`);
  };

  const handleMarkComplete = async (reminderID) => {
    try {
      setErrorMessage(""); // Clear any existing error message
      await axios.delete(`http://localhost:5000/bill/${id}/${reminderID}`);
      showCustomAlert("success", "Payment marked as complete!");
      // Refresh reminders after marking complete
      const response = await axios.get(`http://localhost:5000/bill/${id}`);
      setReminders(response.data);
    } catch (error) {
      console.log("Failed to mark reminder as complete: ", error);
      setErrorMessage("Failed to mark payment as complete. Please try again.");
    }
  };

  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-700/50 rounded-full mb-6">
        <Calendar className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">No Reminders Set</h3>
      <p className="text-gray-400 mb-8 max-w-md mx-auto">
        You haven't set up any payment reminders yet. Start by adding your first
        reminder to never miss a payment again.
      </p>
      <button
        onClick={handleAddReminder}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
      >
        <Plus className="h-5 w-5" />
        <span>Add Your First Reminder</span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation Header */}
      <nav className="relative z-10 px-6 py-4 bg-slate-800/30 backdrop-blur-sm border-b border-purple-400/20">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bell className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">BillAlert</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2 bg-slate-700/50 px-4 py-2 rounded-full">
              <User className="h-5 w-5 text-purple-400" />
              <span className="text-white">{userName}</span>
            </div>
            <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
              <Link to="/login">
                <LogOut className="h-5 w-5" />
              </Link>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-8">
            <p className="text-red-400 text-sm">{errorMessage}</p>
          </div>
        )}

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {" "}
              {userName.split(" ")[0]}
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Stay on top of your payments and manage your financial reminders
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <button
            onClick={handleAddReminder}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Plus className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Add New Reminder</h3>
                <p className="text-purple-100">Set up a new payment reminder</p>
              </div>
            </div>
          </button>

          <button
            onClick={handleFinanceTracking}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Finance Tracker</h3>
                <p className="text-blue-100">View your spending analytics</p>
              </div>
            </div>
          </button>
        </div>

        {showAlert && (
          <div
            className={`mb-8 p-4 rounded-lg font-semibold ${
              alertData.type === "success"
                ? "bg-green-500/20 border border-green-500/50 text-green-400"
                : "bg-red-500/20 border border-red-500/50 text-red-400"
            }`}
          >
            {alertData.message}
          </div>
        )}

        {/* Reminders Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Your Reminders</h2>
            {reminders.length > 0 && (
              <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                {reminders.length} active
              </span>
            )}
          </div>

          {reminders.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-4">
              {reminders.map((reminder) => {
                const daysUntil = getDaysUntilDue(reminder.dueDate);
                const isExpanded = expandedCard === reminder._id;
                const IconComponent = iconMap[reminder.category] || Zap;
                const IconColor = colorMap[reminder.category] || Zap;

                return (
                  <div
                    key={reminder._id}
                    className="bg-slate-700/30 rounded-xl border border-slate-600/50 transition-all duration-300 hover:border-purple-400/50"
                  >
                    <div
                      className="p-6 cursor-pointer"
                      onClick={() => toggleCard(reminder._id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`p-3 rounded-xl bg-gradient-to-r ${IconColor}`}
                          >
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {reminder.name}
                            </h3>
                            <p className="text-gray-400">{reminder.category}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-lg font-bold text-white">
                              ₹{reminder.amount}
                            </p>
                            <p
                              className={`text-sm ${getStatusColor(daysUntil)}`}
                            >
                              {getStatusText(daysUntil)}
                            </p>
                          </div>
                          <div className="text-gray-400">
                            {/* Rotate chevron to indicate expand/collapse instead of swapping icons */}
                            <ChevronDown
                              className={`h-5 w-5 transition-transform duration-300 ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {/* Smooth accordion: animate max-height with overflow-hidden. Increase max-h if content grows. */}
                    <div
                      className={`overflow-hidden transition-[max-height] duration-600 ease-in-out ${
                        isExpanded ? "max-h-[800px]" : "max-h-0"
                      }`}
                    >
                      {/* Subtle border reveal while expanding */}
                      <div
                        className={`px-6 pb-6 border-t transition-colors duration-600 ${
                          isExpanded
                            ? "border-slate-600/50"
                            : "border-transparent"
                        }`}
                      >
                        {/* Fade + slight slide for inner content so it feels less abrupt */}
                        <div
                          className={`pt-4 space-y-4 transition-all duration-600 ${
                            isExpanded
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 -translate-y-2"
                          }`}
                        > 
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-400 mb-1">
                                Due Date
                              </label>
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-purple-400" />
                                <span className="text-white">
                                  {new Date(
                                    reminder.dueDate
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-400 mb-1">
                                Amount
                              </label>
                              <div className="flex items-center space-x-2">
                                <DollarSign className="h-4 w-4 text-green-400" />
                                <span className="text-white font-semibold">
                                  ${reminder.amount}
                                </span>
                              </div>
                            </div>
                          </div>

                          {reminder.description && (
                            <div>
                              <label className="block text-sm font-medium text-gray-400 mb-1">
                                Description
                              </label>
                              <p className="text-gray-300">
                                {reminder.description}
                              </p>
                            </div>
                          )}
                          <div className="flex space-x-3 pt-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkComplete(reminder._id);
                              }}
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
                            >
                              <CheckCircle className="h-4 w-4" />
                              <span>Mark as Paid</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
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
