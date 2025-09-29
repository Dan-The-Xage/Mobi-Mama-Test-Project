import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { PatientApp } from './components/patient/PatientApp';
import { AppSelector } from './components/AppSelector';
import { useAuth } from './hooks/useAuth';
import { AdminLogin } from './components/admin/AdminLogin';

function App() {
  const [currentApp, setCurrentApp] = useState<'selector' | 'admin' | 'patient'>('selector');
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleAppSelect = (app: 'admin' | 'patient') => {
    setCurrentApp(app);
  };

  const handleBackToSelector = () => {
    setCurrentApp('selector');
  };

  if (currentApp === 'selector') {
    return <AppSelector onAppSelect={handleAppSelect} />;
  }

  if (currentApp === 'admin') {
    return (
      <Router>
        <Routes>
          <Route 
            path="/admin" 
            element={
              user && profile ? (
                <AdminDashboard user={profile} onBack={handleBackToSelector} />
              ) : (
                <AdminLogin onBack={handleBackToSelector} />
              )
            } 
          />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Routes>
      </Router>
    );
  }

  if (currentApp === 'patient') {
    return <PatientApp onBack={handleBackToSelector} />;
  }

  return null;
}

export default App;