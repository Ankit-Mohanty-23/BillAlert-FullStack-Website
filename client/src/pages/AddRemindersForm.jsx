import React, { useState } from 'react';
import { Bell, Calendar, DollarSign, Tag, Clock, FileText, ArrowLeft, Plus } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import apiService from "../services/apiService";

export default function AddRemindersForm() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    clientId: id,
    name: '',
    category: '',
    amount: '',
    dueDate: '',
    recurrence: 'none',
    description: '',
  });

  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'Household', label: 'Household' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Education', label: 'Education' },
    { value: 'Insurance', label: 'Insurance' },
    { value: 'Others', label: 'Others' }
  ];

  const recurrenceOptions = [
    { value: 'none', label: 'One-time' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Reminder name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.amount) newErrors.amount = 'Amount is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try{
        await apiService.post(`/bill/create/${id}`, formData);
        alert('Reminder created successfully!');
        navigate(-1);
      }catch(err){
        console.log("Error posting bill: ",err);
        setErrors("Server Error, Please try again !");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 animate-bounce delay-300">
        <div className="bg-purple-600/10 p-4 rounded-full">
          <Bell className="h-8 w-8 text-purple-400/50" />
        </div>
      </div>
      <div className="absolute top-40 right-16 animate-bounce delay-700">
        <div className="bg-pink-600/10 p-4 rounded-full">
          <DollarSign className="h-8 w-8 text-pink-400/50" />
        </div>
      </div>
      <div className="absolute bottom-32 left-20 animate-bounce delay-1000">
        <div className="bg-purple-600/10 p-4 rounded-full">
          <Calendar className="h-8 w-8 text-purple-400/50" />
        </div>
      </div>

      {/* Header */}
      <header className="px-6 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300"
              onClick={() => navigate(-1)}
            > 
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <Bell className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">BillAlert</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
              Add New Reminder
            </h1>
            <p className="text-xl text-gray-300">
              Never miss a payment again with automated reminders
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/20">
            <div className="space-y-8">
              
              {/* Mandatory Fields Section */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full mr-3">
                    Required
                  </span>
                  Essential Information
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Reminder Name */}
                  <div className="md:col-span-2">
                    <label className="flex items-center text-lg font-semibold text-purple-100 mb-3">
                      <Tag className="h-5 w-5 mr-2 text-purple-400" />
                      Reminder Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Netflix Subscription, Electricity Bill"
                      className={`w-full px-4 py-4 bg-slate-700/50 border ${errors.name ? 'border-red-400' : 'border-slate-600'} 
                                rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 
                                focus:ring-2 focus:ring-purple-400/20 transition-all duration-300`}
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name}</p>}
                  </div>

                  {/* Category */}
                  <div>
                    <label className="flex items-center text-lg font-semibold text-purple-100 mb-3">
                      <FileText className="h-5 w-5 mr-2 text-purple-400" />
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 bg-slate-700/50 border ${errors.category ? 'border-red-400' : 'border-slate-600'} 
                                rounded-xl text-white focus:outline-none focus:border-purple-400 
                                focus:ring-2 focus:ring-purple-400/20 transition-all duration-300`}
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value} className="bg-slate-700">
                          {cat.label}
                        </option>
                      ))}
                    </select>
                    {errors.category && <p className="text-red-400 text-sm mt-2">{errors.category}</p>}
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="flex items-center text-lg font-semibold text-purple-100 mb-3">
                      <DollarSign className="h-5 w-5 mr-2 text-purple-400" />
                      Amount *
                    </label>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      step="0.01"
                      className={`w-full px-4 py-4 bg-slate-700/50 border ${errors.amount ? 'border-red-400' : 'border-slate-600'} 
                                rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 
                                focus:ring-2 focus:ring-purple-400/20 transition-all duration-300`}
                    />
                    {errors.amount && <p className="text-red-400 text-sm mt-2">{errors.amount}</p>}
                  </div>

                  {/* Due Date */}
                  <div className="md:col-span-2">
                    <label className="flex items-center text-lg font-semibold text-purple-100 mb-3">
                      <Calendar className="h-5 w-5 mr-2 text-purple-400" />
                      Due Date *
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 bg-slate-700/50 border ${errors.dueDate ? 'border-red-400' : 'border-slate-600'} 
                                rounded-xl text-white focus:outline-none focus:border-purple-400 
                                focus:ring-2 focus:ring-purple-400/20 transition-all duration-300`}
                    />
                    {errors.dueDate && <p className="text-red-400 text-sm mt-2">{errors.dueDate}</p>}
                    <p className="text-gray-400 text-sm mt-2">Click on the little calender button on right to choose a Date</p>
                  </div>
                </div>
              </div>

              {/* Optional Fields Section */}
              <div className="border-t border-slate-700 pt-8">
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-2 py-1 rounded-full mr-3">
                    Optional
                  </span>
                  Additional Settings
                </h2>
                
                <div className="space-y-6">
                  {/* Recurrence */}
                  <div className="grid md:grid-cols gap-6">
                    <div>
                      <label className="flex items-center text-lg font-semibold text-purple-100 mb-3">
                        <Clock className="h-5 w-5 mr-2 text-purple-400" />
                        Recurrence
                      </label>
                      <select
                        name="recurrence"
                        value={formData.recurrence}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white 
                                 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 
                                 transition-all duration-300"
                      >
                        {recurrenceOptions.map(option => (
                          <option key={option.value} value={option.value} className="bg-slate-700">
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    
                  </div>

                  {/* Description */}
                  <div>
                    <label className="flex items-center text-lg font-semibold text-purple-100 mb-3">
                      <FileText className="h-5 w-5 mr-2 text-purple-400" />
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Additional notes about this reminder..."
                      rows={4}
                      className="w-full px-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white 
                               placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 
                               focus:ring-purple-400/20 transition-all duration-300 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <button
                  type="button"
                  className="flex-1 border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white 
                           px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 
                           hover:scale-105 transform"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
                           text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 
                           transform hover:scale-105 flex items-center justify-center"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create Reminder
                </button>
              </div>
            </div>
          </div>

          {/* Helper Text */}
          <div className="text-center mt-8">
            <p className="text-gray-400">
              Fields marked with <span className="text-red-400">*</span> are required
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}