import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Clock,
  MessageSquare,
  Heart,
  Activity,
  Zap,
  User,
  X
} from 'lucide-react';

interface EmergencySOSProps {
  patient: any;
}

export const EmergencySOS: React.FC<EmergencySOSProps> = ({ patient }) => {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [selectedEmergency, setSelectedEmergency] = useState('');
  const [emergencyDetails, setEmergencyDetails] = useState('');

  const emergencyTypes = [
    { id: 'bleeding', name: 'Severe Bleeding', icon: AlertTriangle, color: 'bg-red-500' },
    { id: 'pain', name: 'Severe Pain', icon: Zap, color: 'bg-orange-500' },
    { id: 'breathing', name: 'Difficulty Breathing', icon: Activity, color: 'bg-blue-500' },
    { id: 'headache', name: 'Severe Headache', icon: Heart, color: 'bg-purple-500' },
    { id: 'other', name: 'Other Emergency', icon: AlertTriangle, color: 'bg-gray-500' },
  ];

  const emergencyContacts = [
    { name: 'Primary Healthcare Provider', phone: '+234 803 123 4567', type: 'primary' },
    { name: 'Emergency Services', phone: '199', type: 'emergency' },
    { name: 'Ambulance Service', phone: '+234 805 987 6543', type: 'ambulance' },
    { name: 'Emergency Contact (Family)', phone: patient.emergencyContact || '+234 808 765 4321', type: 'family' },
  ];

  const handleEmergencyTrigger = () => {
    if (selectedEmergency) {
      setEmergencyActive(true);
      // In real app, this would trigger emergency alerts
      console.log('Emergency triggered:', selectedEmergency, emergencyDetails);
    }
  };

  const handleCancelEmergency = () => {
    setEmergencyActive(false);
    setSelectedEmergency('');
    setEmergencyDetails('');
  };

  return (
    <div className="space-y-6">
      {/* Emergency Status */}
      {emergencyActive && (
        <div className="bg-red-600 text-white rounded-lg p-6 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-8 w-8" />
              <div>
                <h3 className="text-xl font-bold">Emergency Alert Active</h3>
                <p className="text-red-100">Help is on the way. Stay calm and wait for assistance.</p>
              </div>
            </div>
            <button
              onClick={handleCancelEmergency}
              className="bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Cancel Alert
            </button>
          </div>
        </div>
      )}

      {/* Emergency SOS Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Emergency SOS</h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Emergency services available 24/7</span>
          </div>
        </div>
        <p className="text-gray-600">
          Use this feature if you're experiencing a medical emergency. Your location and medical information will be shared with emergency responders.
        </p>
      </div>

      {!emergencyActive ? (
        <>
          {/* Emergency Types */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Emergency Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {emergencyTypes.map((emergency) => (
                <button
                  key={emergency.id}
                  onClick={() => setSelectedEmergency(emergency.id)}
                  className={`flex items-center p-4 rounded-lg border-2 transition-all ${
                    selectedEmergency === emergency.id
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-red-300'
                  }`}
                >
                  <div className={`p-3 rounded-full ${emergency.color} mr-4`}>
                    <emergency.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{emergency.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Emergency Details */}
          {selectedEmergency && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Describe Your Emergency</h3>
              <textarea
                value={emergencyDetails}
                onChange={(e) => setEmergencyDetails(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Please describe what's happening. Include symptoms, severity, and any other relevant details..."
              />
              
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleEmergencyTrigger}
                  className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                >
                  <AlertTriangle className="h-6 w-6" />
                  <span>SEND EMERGENCY ALERT</span>
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Emergency Active Status */
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Response Status</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-800">Emergency alert sent successfully</span>
              <span className="text-xs text-green-600">2 minutes ago</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-blue-800">Healthcare provider notified</span>
              <span className="text-xs text-blue-600">1 minute ago</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-yellow-800">Ambulance dispatched - ETA 15 minutes</span>
              <span className="text-xs text-yellow-600">Just now</span>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Contacts */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contacts</h3>
        <div className="space-y-3">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <Phone className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                  <p className="text-xs text-gray-600">{contact.phone}</p>
                </div>
              </div>
              <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors">
                Call
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Warning Signs */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">When to Seek Emergency Care</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-red-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-900">Severe bleeding or persistent bleeding</p>
              <p className="text-xs text-gray-600">Heavy vaginal bleeding, especially with clots</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-red-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-900">Severe headache with vision changes</p>
              <p className="text-xs text-gray-600">Could indicate preeclampsia or other serious conditions</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-red-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-900">Difficulty breathing or chest pain</p>
              <p className="text-xs text-gray-600">Shortness of breath that's getting worse</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-red-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-900">Severe abdominal pain</p>
              <p className="text-xs text-gray-600">Constant, severe pain that doesn't improve</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-red-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-900">Absence of fetal movement</p>
              <p className="text-xs text-gray-600">No baby movement for several hours after 20 weeks</p>
            </div>
          </div>
        </div>
      </div>

      {/* Location Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Location Information</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Current Location</p>
              <p className="text-xs text-gray-600">Gombe Central Ward, Gombe State</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Patient Information</p>
              <p className="text-xs text-gray-600">{patient.name} • {patient.weeksPregnant} weeks pregnant</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Contact Number</p>
              <p className="text-xs text-gray-600">{patient.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};