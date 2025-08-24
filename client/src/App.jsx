import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage"
import HowItWorksPage from './pages/HowItWorksPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ReminderPage from './pages/AddRemindersForm';
import FinancePage from './pages/FinancePage'

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/working' element={<HowItWorksPage />} />
          <Route path='/login' element={<LoginPage />} />

          {/* jwt token Protected Routes */}

          <Route 
            path='/dashboard/:id'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route 
            path='/reminder/:id' 
            element={
              <ProtectedRoute>
                <ReminderPage />
              </ProtectedRoute>
            }
            />
          <Route 
            path='/finance/:id' 
            element={
              <ProtectedRoute>
                <FinancePage />
              </ProtectedRoute>
            } />

        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App