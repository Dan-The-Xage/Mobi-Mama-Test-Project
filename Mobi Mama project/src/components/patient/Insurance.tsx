import React, { useState } from 'react';
import { 
  Shield, 
  CreditCard, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  DollarSign,
  Calendar,
  Phone,
  FileText,
  Plus
} from 'lucide-react';

interface InsuranceProps {
  patient: any;
}

export const Insurance: React.FC<InsuranceProps> = ({ patient }) => {
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);

  const insuranceData = {
    isEnrolled: true,
    nhisId: 'NHIS001234567',
    plan: 'Basic Coverage',
    status: 'active',
    premium: 5000,
    coverage: 80,
    lastPayment: '2024-01-01',
    nextPayment: '2024-02-01',
    autoDeduction: true,
    coverageDetails: {
      ancVisits: 'Covered (100%)',
      delivery: 'Covered (80%)',
      ultrasound: 'Covered (70%)',
      bloodTests: 'Covered (90%)',
      medications: 'Covered (60%)',
      emergency: 'Covered (100%)'
    }
  };

  const paymentHistory = [
    { date: '2024-01-01', amount: 5000, status: 'paid', method: 'Auto-deduction' },
    { date: '2023-12-01', amount: 5000, status: 'paid', method: 'Auto-deduction' },
    { date: '2023-11-01', amount: 5000, status: 'paid', method: 'Auto-deduction' },
    { date: '2023-10-01', amount: 5000, status: 'paid', method: 'Manual Payment' },
  ];

  const claimsHistory = [
    { id: 'CLM001', date: '2024-01-15', service: 'ANC Visit', amount: 15000, covered: 15000, status: 'approved' },
    { id: 'CLM002', date: '2024-01-08', service: 'Blood Test', amount: 8000, covered: 7200, status: 'approved' },
    { id: 'CLM003', date: '2023-12-20', service: 'Ultrasound', amount: 25000, covered: 17500, status: 'approved' },
  ];

  const availablePlans = [
    { name: 'Basic Coverage', premium: 5000, coverage: 80, features: ['ANC Visits', 'Basic Delivery', 'Emergency Care'] },
    { name: 'Premium Coverage', premium: 8000, coverage: 90, features: ['All Basic', 'Ultrasound', 'Lab Tests', 'Medications'] },
    { name: 'Comprehensive Coverage', premium: 12000, coverage: 95, features: ['All Premium', 'Private Room', 'Specialist Care'] },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'expired':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Shield className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Insurance Status Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Insurance Coverage</h2>
          {!insuranceData.isEnrolled && (
            <button
              onClick={() => setShowEnrollmentForm(true)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Enroll Now
            </button>
          )}
        </div>

        {insuranceData.isEnrolled ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getStatusIcon(insuranceData.status)}
                <div>
                  <h3 className="font-semibold text-gray-900">{insuranceData.plan}</h3>
                  <p className="text-sm text-gray-600">NHIS ID: {insuranceData.nhisId}</p>
                </div>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(insuranceData.status)}`}>
                {insuranceData.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{insuranceData.coverage}%</div>
                <div className="text-sm text-gray-600">Coverage</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">₦{insuranceData.premium.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Monthly Premium</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{insuranceData.nextPayment}</div>
                <div className="text-sm text-gray-600">Next Payment</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <XCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Insurance Coverage</h3>
            <p className="text-gray-600 mb-4">Enroll in NHIS to access affordable healthcare</p>
            <button
              onClick={() => setShowEnrollmentForm(true)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Enroll Now
            </button>
          </div>
        )}
      </div>

      {insuranceData.isEnrolled && (
        <>
          {/* Coverage Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Coverage Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(insuranceData.coverageDetails).map(([service, coverage]) => (
                <div key={service} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700 capitalize">{service.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="text-sm text-green-600 font-medium">{coverage}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
            
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg mb-4">
              <div className="flex items-center space-x-3">
                <CreditCard className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Auto-deduction</p>
                  <p className="text-xs text-gray-600">Monthly premium automatically deducted</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={insuranceData.autoDeduction}
                  readOnly
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Payment History</h4>
              {paymentHistory.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{payment.date}</p>
                    <p className="text-xs text-gray-600">{payment.method}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">₦{payment.amount.toLocaleString()}</p>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Claims History */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Claims History</h3>
            <div className="space-y-3">
              {claimsHistory.map((claim) => (
                <div key={claim.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{claim.service}</p>
                    <p className="text-xs text-gray-600">{claim.date} • {claim.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">₦{claim.covered.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">of ₦{claim.amount.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Enrollment Form Modal */}
      {showEnrollmentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Enroll in NHIS</h3>
              <button
                onClick={() => setShowEnrollmentForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Choose Your Plan</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {availablePlans.map((plan, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-green-500 cursor-pointer">
                      <h5 className="font-semibold text-gray-900 mb-2">{plan.name}</h5>
                      <p className="text-2xl font-bold text-green-600 mb-2">₦{plan.premium.toLocaleString()}</p>
                      <p className="text-sm text-gray-600 mb-3">{plan.coverage}% Coverage</p>
                      <ul className="text-sm space-y-1">
                        {plan.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-center">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-4">Payment Method</h4>
                <div className="space-y-3">
                  <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="paymentMethod" value="auto" className="mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Auto-deduction</p>
                      <p className="text-xs text-gray-600">Monthly premium automatically deducted from your account</p>
                    </div>
                  </label>
                  <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="paymentMethod" value="manual" className="mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Manual Payment</p>
                      <p className="text-xs text-gray-600">Pay monthly premium manually</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowEnrollmentForm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Support */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <Phone className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-900">Call NHIS Support</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <FileText className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-green-900">View Benefits Guide</span>
          </button>
        </div>
      </div>
    </div>
  );
};