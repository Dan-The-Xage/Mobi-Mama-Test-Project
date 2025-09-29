import React, { useState } from 'react';
import { 
  Shield, 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Plus,
  Search,
  DollarSign,
  FileText,
  Users
} from 'lucide-react';

export const InsurancePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'status' | 'enrollment' | 'claims'>('status');

  const insuranceData = [
    {
      id: 1,
      patientName: 'Fatima Ibrahim',
      patientId: '001',
      nhisId: 'NHIS001234567',
      status: 'active',
      plan: 'Basic Coverage',
      premium: 5000,
      coverage: 80,
      lastPayment: '2024-01-01',
      nextPayment: '2024-02-01'
    },
    {
      id: 2,
      patientName: 'Aisha Mohammed',
      patientId: '002',
      nhisId: 'NHIS002345678',
      status: 'pending',
      plan: 'Premium Coverage',
      premium: 8000,
      coverage: 95,
      lastPayment: '2023-12-01',
      nextPayment: '2024-01-01'
    },
    {
      id: 3,
      patientName: 'Hadiza Suleiman',
      patientId: '003',
      nhisId: '',
      status: 'uninsured',
      plan: 'None',
      premium: 0,
      coverage: 0,
      lastPayment: '',
      nextPayment: ''
    }
  ];

  const claimsData = [
    {
      id: 1,
      patientName: 'Fatima Ibrahim',
      claimId: 'CLM001',
      service: 'ANC Visit',
      amount: 15000,
      status: 'approved',
      date: '2024-01-15',
      processedDate: '2024-01-16'
    },
    {
      id: 2,
      patientName: 'Aisha Mohammed',
      claimId: 'CLM002',
      service: 'Ultrasound',
      amount: 25000,
      status: 'pending',
      date: '2024-01-14',
      processedDate: ''
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'uninsured':
        return 'bg-gray-100 text-gray-800';
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
      case 'uninsured':
        return <XCircle className="h-4 w-4 text-gray-600" />;
      default:
        return <Shield className="h-4 w-4 text-gray-600" />;
    }
  };

  const getClaimStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    totalInsured: insuranceData.filter(i => i.status === 'active').length,
    pendingEnrollments: insuranceData.filter(i => i.status === 'pending').length,
    uninsured: insuranceData.filter(i => i.status === 'uninsured').length,
    totalClaims: claimsData.length
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Insured</p>
              <p className="text-2xl font-bold text-green-600">{stats.totalInsured}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Enrollments</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingEnrollments}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Uninsured</p>
              <p className="text-2xl font-bold text-red-600">{stats.uninsured}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <Users className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Claims</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalClaims}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Insurance Management</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('status')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'status'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Shield className="h-4 w-4 mr-2 inline" />
              Insurance Status
            </button>
            <button
              onClick={() => setActiveTab('enrollment')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'enrollment'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Plus className="h-4 w-4 mr-2 inline" />
              New Enrollment
            </button>
            <button
              onClick={() => setActiveTab('claims')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'claims'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <CreditCard className="h-4 w-4 mr-2 inline" />
              Claims Management
            </button>
          </div>
        </div>

        {activeTab === 'status' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by patient name or NHIS ID..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="expired">Expired</option>
                <option value="uninsured">Uninsured</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NHIS ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Premium</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coverage</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Payment</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {insuranceData.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{patient.patientName}</p>
                          <p className="text-sm text-gray-500">ID: {patient.patientId}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">{patient.nhisId || 'N/A'}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          {getStatusIcon(patient.status)}
                          <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                            {patient.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">{patient.plan}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {patient.premium > 0 ? `₦${patient.premium.toLocaleString()}` : 'N/A'}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${patient.coverage}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">{patient.coverage}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">{patient.nextPayment || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'enrollment' && (
          <div className="space-y-6">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select patient...</option>
                    <option value="001">Fatima Ibrahim</option>
                    <option value="002">Aisha Mohammed</option>
                    <option value="003">Hadiza Suleiman</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Insurance Plan
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select plan...</option>
                    <option value="basic">Basic Coverage (₦5,000/month)</option>
                    <option value="premium">Premium Coverage (₦8,000/month)</option>
                    <option value="family">Family Coverage (₦12,000/month)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Premium
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="number"
                      placeholder="5000"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coverage Percentage
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="80">80%</option>
                    <option value="90">90%</option>
                    <option value="95">95%</option>
                    <option value="100">100%</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="auto">Auto-deduction</option>
                    <option value="manual">Manual Payment</option>
                    <option value="employer">Employer Sponsored</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Enroll Patient
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'claims' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 mr-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search claims..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                New Claim
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {claimsData.map((claim) => (
                    <tr key={claim.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">{claim.claimId}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{claim.patientName}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{claim.service}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">₦{claim.amount.toLocaleString()}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{claim.date}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getClaimStatusColor(claim.status)}`}>
                          {claim.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};