import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Heart,
  Edit,
  Save,
  X,
  Camera
} from 'lucide-react';

interface PatientProfileProps {
  patient: any;
}

export const PatientProfile: React.FC<PatientProfileProps> = ({ patient }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: patient.name,
    phone: patient.phone,
    address: '123 Main Street, Gombe',
    emergencyContact: '08098765432',
    language: 'Hausa',
    lmp: patient.lmp,
    edd: patient.edd
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
  };

  const profileInfo = [
    { label: 'Full Name', value: formData.name, icon: User, field: 'name' },
    { label: 'Phone Number', value: formData.phone, icon: Phone, field: 'phone' },
    { label: 'Address', value: formData.address, icon: MapPin, field: 'address' },
    { label: 'Emergency Contact', value: formData.emergencyContact, icon: Phone, field: 'emergencyContact' },
    { label: 'Preferred Language', value: formData.language, icon: User, field: 'language' },
  ];

  const pregnancyInfo = [
    { label: 'Last Menstrual Period', value: formData.lmp, icon: Calendar, field: 'lmp' },
    { label: 'Expected Delivery Date', value: formData.edd, icon: Calendar, field: 'edd' },
    { label: 'Weeks Pregnant', value: `${patient.weeksPregnant} weeks`, icon: Heart, field: 'weeksPregnant' },
    { label: 'Risk Level', value: patient.riskLevel, icon: Heart, field: 'riskLevel' },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Profile Photo */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-green-600">F</span>
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{patient.name}</h3>
            <p className="text-gray-600">Patient ID: {patient.id}</p>
            <p className="text-gray-600">{patient.weeksPregnant} weeks pregnant</p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="space-y-4">
          {profileInfo.map((info, index) => (
            <div key={index} className="flex items-center space-x-3">
              <info.icon className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">{info.label}</label>
                {isEditing ? (
                  info.field === 'language' ? (
                    <select
                      name={info.field}
                      value={formData[info.field as keyof typeof formData]}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="Hausa">Hausa</option>
                      <option value="Fulfulde">Fulfulde</option>
                      <option value="Kanuri">Kanuri</option>
                      <option value="English">English</option>
                    </select>
                  ) : (
                    <input
                      type={info.field === 'phone' || info.field === 'emergencyContact' ? 'tel' : 'text'}
                      name={info.field}
                      value={formData[info.field as keyof typeof formData]}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  )
                ) : (
                  <p className="text-gray-900">{info.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pregnancy Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pregnancy Information</h3>
        <div className="space-y-4">
          {pregnancyInfo.map((info, index) => (
            <div key={index} className="flex items-center space-x-3">
              <info.icon className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">{info.label}</label>
                {isEditing && (info.field === 'lmp' || info.field === 'edd') ? (
                  <input
                    type="date"
                    name={info.field}
                    value={formData[info.field as keyof typeof formData]}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <p className="text-gray-900">{info.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Medical History */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical History</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Previous Pregnancies</span>
            <span className="text-sm text-gray-900">2</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Allergies</span>
            <span className="text-sm text-gray-900">None</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Blood Type</span>
            <span className="text-sm text-gray-900">O+</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Chronic Conditions</span>
            <span className="text-sm text-gray-900">None</span>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input type="checkbox" className="mr-3" defaultChecked />
            <span className="text-sm text-gray-700">SMS Reminders</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-3" defaultChecked />
            <span className="text-sm text-gray-700">Voice Call Reminders</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-3" defaultChecked />
            <span className="text-sm text-gray-700">WhatsApp Messages</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-3" defaultChecked />
            <span className="text-sm text-gray-700">Health Education Content</span>
          </label>
        </div>
      </div>
    </div>
  );
};