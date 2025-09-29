import React from 'react';
import { 
  Calendar, 
  Heart, 
  Activity, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Baby,
  Shield,
  MessageCircle,
  Phone
} from 'lucide-react';

interface PatientDashboardProps {
  patient: any;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({ patient }) => {
  const currentWeek = patient.weeksPregnant;
  const totalWeeks = 40;
  const progressPercentage = (currentWeek / totalWeeks) * 100;

  const quickStats = [
    { 
      title: 'Weeks Pregnant', 
      value: `${currentWeek}`, 
      subtitle: 'of 40 weeks',
      icon: Baby, 
      color: 'bg-pink-500' 
    },
    { 
      title: 'Next Appointment', 
      value: 'Feb 15', 
      subtitle: '2024, 10:00 AM',
      icon: Calendar, 
      color: 'bg-blue-500' 
    },
    { 
      title: 'Health Status', 
      value: 'Normal', 
      subtitle: 'Low risk',
      icon: Heart, 
      color: 'bg-green-500' 
    },
    { 
      title: 'Insurance', 
      value: 'Active', 
      subtitle: '80% coverage',
      icon: Shield, 
      color: 'bg-purple-500' 
    },
  ];

  const recentActivities = [
    { type: 'appointment', message: 'ANC visit completed', time: '2 days ago', icon: CheckCircle, color: 'text-green-600' },
    { type: 'vitals', message: 'Blood pressure recorded: 120/80', time: '2 days ago', icon: Activity, color: 'text-blue-600' },
    { type: 'education', message: 'New health tip available', time: '1 week ago', icon: MessageCircle, color: 'text-purple-600' },
    { type: 'reminder', message: 'Appointment reminder sent', time: '1 week ago', icon: Clock, color: 'text-yellow-600' },
  ];

  const todaysTips = [
    "Take your prenatal vitamins daily",
    "Drink plenty of water throughout the day",
    "Get adequate rest - aim for 7-9 hours of sleep",
    "Eat nutritious foods rich in folic acid and iron"
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {patient.name}!</h1>
            <p className="text-green-100">You're doing great! Here's your pregnancy update</p>
          </div>
          <Baby className="h-12 w-12 text-white opacity-80" />
        </div>
      </div>

      {/* Pregnancy Progress */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Pregnancy Progress</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Week {currentWeek} of {totalWeeks}</span>
            <span className="text-sm text-gray-500">{Math.round(progressPercentage)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Expected Delivery Date</p>
            <p className="text-lg font-semibold text-gray-900">{patient.edd}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.subtitle}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <activity.icon className={`h-5 w-5 mt-0.5 ${activity.color}`} />
                <div>
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Health Tips */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Health Tips</h3>
          <div className="space-y-3">
            {todaysTips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <Phone className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-green-900">Call Healthcare Provider</span>
          </button>
          
          <button className="flex items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <Calendar className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-900">View Appointments</span>
          </button>
          
          <button className="flex items-center justify-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-sm font-medium text-red-900">Emergency SOS</span>
          </button>
        </div>
      </div>
    </div>
  );
};