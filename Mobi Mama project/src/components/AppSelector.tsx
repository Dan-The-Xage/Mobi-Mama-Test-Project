import React from 'react';
import { Monitor, Smartphone, Heart, Shield, Users, Calendar } from 'lucide-react';

interface AppSelectorProps {
  onAppSelect: (app: 'admin' | 'patient') => void;
}

export const AppSelector: React.FC<AppSelectorProps> = ({ onAppSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">MobiMama+</h1>
          </div>
          <p className="text-xl text-gray-600 mb-2">Digital Maternal Health Companion</p>
          <p className="text-gray-500">Reducing maternal and neonatal mortality through digital health solutions</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Admin Portal */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-center mb-6">
              <Monitor className="h-16 w-16 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Admin Portal</h2>
            <p className="text-gray-600 mb-6 text-center">
              Comprehensive dashboard for healthcare workers, MoH officers, and insurance personnel
            </p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center text-sm text-gray-700">
                <Users className="h-4 w-4 mr-2 text-blue-500" />
                Patient Registration & Management
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                Appointment Scheduling & Tracking
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Shield className="h-4 w-4 mr-2 text-blue-500" />
                Insurance & Risk Management
              </div>
            </div>

            <button
              onClick={() => onAppSelect('admin')}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Access Admin Portal
            </button>
          </div>

          {/* Patient App */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-center mb-6">
              <Smartphone className="h-16 w-16 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Patient App</h2>
            <p className="text-gray-600 mb-6 text-center">
              Mobile-friendly interface for pregnant women to access health information and services
            </p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center text-sm text-gray-700">
                <Calendar className="h-4 w-4 mr-2 text-green-500" />
                Appointment Reminders
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Heart className="h-4 w-4 mr-2 text-green-500" />
                Health Education Content
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Shield className="h-4 w-4 mr-2 text-green-500" />
                Emergency SOS Alerts
              </div>
            </div>

            <button
              onClick={() => onAppSelect('patient')}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
            >
              Access Patient App
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Supporting maternal health in underserved communities across Northern Nigeria
          </p>
        </div>
      </div>
    </div>
  );
};