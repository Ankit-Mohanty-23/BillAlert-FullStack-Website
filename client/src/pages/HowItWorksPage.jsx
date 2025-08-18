import React, { useState } from "react";
import {
  Bell,
  Calendar,
  Mail,
  CheckCircle,
  CreditCard,
  Zap,
  Shield,
  Clock,
  BarChart3,
  PieChart,
  ArrowRight,
  Users,
  Database,
  Lock,
  Smartphone,
  MonitorSpeaker,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Home,
  Car,
  GraduationCap,
  Wifi,
} from "lucide-react";
import { Link } from "react-router";

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Create Your Account",
      description:
        "Sign up with your email and create a secure account. Your data is protected with JWT authentication.",
      icon: Users,
      details: [
        "Quick 2-minute registration process",
        "Secure JWT-based authentication",
        "Your data is private and encrypted",
      ],
    },
    {
      title: "Add Your Bills & Subscriptions",
      description:
        "Set up reminders for all your recurring payments with due dates, amounts, and categories.",
      icon: Calendar,
      details: [
        "Add electricity, internet, rent payments",
        "Include streaming services like Netflix",
        "Set custom categories and amounts",
      ],
    },
    {
      title: "Receive Smart Reminders",
      description:
        "Get automated email alerts before due dates. Reminders continue until you mark payments as complete.",
      icon: Mail,
      details: [
        "Daily email notifications before due dates",
        "Automated cron job system",
        "Reminders stop when you confirm payment",
      ],
    },
    {
      title: "Track Your Finances",
      description:
        "View visual analytics of your spending patterns and get insights into your payment habits.",
      icon: BarChart3,
      details: [
        "Interactive charts and graphs",
        "Spending categorization",
        "Monthly and yearly insights",
      ],
    },
  ];

  const problemStats = [
    {
      icon: DollarSign,
      value: "$240",
      label: "Average annual loss to forgotten bills",
    },
    {
      icon: AlertTriangle,
      value: "78%",
      label: "Of people have paid late fees",
    },
    {
      icon: CreditCard,
      value: "15+",
      label: "Average recurring payments per person",
    },
  ];

  const billCategories = [
    {
      icon: Zap,
      name: "Electricity & Utilities",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Wifi,
      name: "Internet & Phone",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: MonitorSpeaker,
      name: "Streaming Services",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Home,
      name: "Rent & Mortgage",
      color: "from-green-500 to-emerald-500",
    },
    { icon: Car, name: "Insurance", color: "from-purple-500 to-violet-500" },
    {
      icon: GraduationCap,
      name: "Education",
      color: "from-indigo-500 to-blue-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bell className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">BillAlert</span>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105">
            <Link to='/login'>Get Started</Link>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 pt-12 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            How
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {" "}
              BillAlert{" "}
            </span>
            Works
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            A comprehensive solution to manage your recurring payments and track
            your financial habits
          </p>
        </div>
      </section>

      {/* Problem Overview */}
      <section className="px-6 py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-8">
            The Problem We're Solving
          </h2>
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 p-8 rounded-2xl border border-red-500/30 mb-12">
            <p className="text-xl text-gray-200 leading-relaxed text-center">
              Managing multiple recurring payments like electricity bills,
              Wi-Fi, utility services, streaming subscriptions, rent, insurance,
              and educational fees can be overwhelming and easy to forget. This
              often results in missed due dates, late payment fees, and service
              disruptions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {problemStats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-slate-700/30 rounded-2xl"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-red-400 mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Simple 4-Step Process
          </h2>

          {/* Step Navigation */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-4 bg-slate-800/50 p-2 rounded-2xl">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeStep === index
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Step {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-6">
                {React.createElement(steps[activeStep].icon, {
                  className: "h-10 w-10 text-white",
                })}
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                {steps[activeStep].title}
              </h3>
              <p className="text-xl text-gray-300 mb-6">
                {steps[activeStep].description}
              </p>
              <div className="space-y-3">
                {steps[activeStep].details.map((detail, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 p-8 rounded-2xl">
              <div className="aspect-video bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl flex items-center justify-center">
                {React.createElement(steps[activeStep].icon, {
                  className: "h-24 w-24 text-purple-400",
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bill Categories */}
      <section className="px-6 py-20 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-8">
            Track All Your Payments
          </h2>
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            BillAlert handles all types of recurring payments and subscriptions
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {billCategories.map((category, index) => (
              <div
                key={index}
                className="bg-slate-800/50 p-6 rounded-2xl hover:scale-105 transition-transform duration-300"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl mb-4`}
                >
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {category.name}
                </h3>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 bg-gradient-to-r ${category.color} rounded-full`}
                    style={{ width: `${Math.random() * 60 + 40}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Features */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Powerful Dashboard Features
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-3 rounded-xl">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Reminder Dashboard
                  </h3>
                  <p className="text-gray-300">
                    View all your reminders in one place. Add new reminders with
                    custom categories, amounts, and due dates. Mark payments as
                    complete to stop notifications.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-green-600 to-green-800 p-3 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Finance Tracker
                  </h3>
                  <p className="text-gray-300">
                    Interactive charts and visual statistics of your spending
                    habits. Categorized spending analysis helps you understand
                    your financial patterns.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-3 rounded-xl">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Smart Notifications
                  </h3>
                  <p className="text-gray-300">
                    Automated email reminders powered by cron jobs. Get notified
                    daily until you confirm payment completion.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 p-8 rounded-2xl">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-4 rounded-xl text-center">
                  <PieChart className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-300">Spending Analysis</p>
                </div>
                <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 p-4 rounded-xl text-center">
                  <BarChart3 className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-300">Monthly Trends</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Netflix</span>
                  <span className="text-white font-semibold">$15.99</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Electricity</span>
                  <span className="text-white font-semibold">$89.50</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Internet</span>
                  <span className="text-white font-semibold">$49.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Privacy */}
      <section className="px-6 py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Secure & Private
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-full mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                JWT Authentication
              </h3>
              <p className="text-gray-300">
                Industry-standard JWT tokens ensure secure access to your
                account and protect your sensitive data.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mb-4">
                <Database className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                MongoDB Storage
              </h3>
              <p className="text-gray-300">
                Your data is securely stored in MongoDB with proper encryption
                and backup systems.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full mb-4">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Private Accounts
              </h3>
              <p className="text-gray-300">
                Each user has completely private data. Your financial
                information is never shared or visible to others.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Never Miss Another Payment?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of users who have taken control of their recurring
            payments
          </p>
          <button>
          <Link
            to="/login"
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
          >
            <span>Get Started Free</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          </button>
          <p className="text-purple-100 mt-4">
            No credit card required • Set up in 2 minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Bell className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">BillAlert</span>
          </div>
          <p className="text-gray-400 mb-6">
            The smart way to manage your recurring payments and track your
            finances
          </p>
          <div className="border-t border-gray-700 pt-6">
            <p className="text-gray-500">
              © 2025 BillAlert. Never miss a payment again.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
