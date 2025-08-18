import React, { useState, useEffect } from "react";
import {
  Bell,
  Calendar,
  Mail,
  CheckCircle,
  CreditCard,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import { Link } from "react-router";

export default function BillReminderLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Sarah Chen",
      text: "Never missed a Netflix payment since using this app!",
      role: "Freelancer",
    },
    {
      name: "Mike Rodriguez",
      text: "Saved me from late fees on my electricity bill twice this month.",
      role: "Small Business Owner",
    },
    {
      name: "Emma Thompson",
      text: "Finally, a simple solution that actually works!",
      role: "Student",
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
          <Link
            to="/login"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 inline-block"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-32">
        <div className="max-w-6xl mx-auto text-center">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Never Miss a
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {" "}
                Payment
              </span>
              <br />
              Again
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Stop losing money to forgotten subscriptions and late fees. Get
              smart, automated reminders for all your recurring bills until you
              mark them complete.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/login"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Start Free Today
              </Link>
              <Link
                to="/Working"
                className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top left-8 animate-bounce">
          <div className="bg-purple-600/20 p-4 rounded-full">
            <CreditCard className="h-8 w-8 text-purple-400" />
          </div>
        </div>
        <div className="absolute top-[165px] right-7 animate-bounce delay-700">
          <div className="bg-pink-600/20 p-4 rounded-full">
            <Zap className="h-8 w-8 text-pink-400" />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="px-6 py-20 bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            The Problem We Solve
          </h2>
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 p-8 rounded-2xl border border-red-500/30">
            <p className="text-xl text-gray-200 leading-relaxed">
              "People often forget about their upcoming subscription renewals or
              bill payments, like Netflix, electricity, internet, etc., and need
              a simple system to remind them before the due date."
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6">
              <div className="text-3xl font-bold text-red-400 mb-2">$240</div>
              <p className="text-gray-300">
                Average annual loss to forgotten subscriptions
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl font-bold text-red-400 mb-2">78%</div>
              <p className="text-gray-300">
                Of people have been charged late fees
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl font-bold text-red-400 mb-2">15+</div>
              <p className="text-gray-300">Average subscriptions per person</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            How BillAlert Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-2xl mb-4 group-hover:scale-105 transition-transform duration-300">
                <Calendar className="h-12 w-12 text-white mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Set Reminders
              </h3>
              <p className="text-gray-400">
                Add all your recurring bills and subscriptions with due dates
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl mb-4 group-hover:scale-105 transition-transform duration-300">
                <Mail className="h-12 w-12 text-white mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Daily Email Alerts
              </h3>
              <p className="text-gray-400">
                Receive automated email reminders until payment is complete
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-2xl mb-4 group-hover:scale-105 transition-transform duration-300">
                <CheckCircle className="h-12 w-12 text-white mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Mark Complete
              </h3>
              <p className="text-gray-400">
                Simply mark bills as paid to stop the reminders
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-pink-600 to-pink-800 p-6 rounded-2xl mb-4 group-hover:scale-105 transition-transform duration-300">
                <Clock className="h-12 w-12 text-white mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Automated System
              </h3>
              <p className="text-gray-400">
                Cron jobs ensure you never miss a payment deadline
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-8">
                Why Choose BillAlert?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Shield className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Never Pay Late Fees Again
                    </h3>
                    <p className="text-gray-300">
                      Save hundreds of dollars annually by staying on top of all
                      your payments
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Zap className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Fully Automated
                    </h3>
                    <p className="text-gray-300">
                      Set it once and forget it - our system handles all the
                      reminders
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Bell className="h-6 w-6 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Smart Notifications
                    </h3>
                    <p className="text-gray-300">
                      Get reminded daily until you confirm payment - no more
                      forgotten bills
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">
                Perfect For:
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">
                    Netflix, Spotify, Disney+ subscriptions
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">
                    Electricity and utility bills
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">
                    Internet and phone services
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Insurance premiums</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Credit card payments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-12">
            What Our Users Say
          </h2>
          <div className="bg-slate-800/50 p-8 rounded-2xl min-h-[200px] flex items-center justify-center">
            <div className="transition-all duration-500">
              <p className="text-2xl text-gray-200 mb-6 italic">
                "{testimonials[currentTestimonial].text}"
              </p>
              <div>
                <p className="text-lg font-semibold text-white">
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="text-purple-400">
                  {testimonials[currentTestimonial].role}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? "bg-purple-400" : "bg-gray-600"
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Take Control?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of users who never miss a payment anymore
          </p>
          <Link
            to="/login"
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Get Started Free
          </Link>
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
            The smart way to manage your recurring payments and subscriptions
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
