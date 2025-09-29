import React, { useState } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Heart,
  Thermometer,
  Scale,
  Droplets,
  Plus,
  Search
} from 'lucide-react';
import { useVitals } from '../../hooks/useVitals';
import { usePatients } from '../../hooks/usePatients';
import { useAuth } from '../../hooks/useAuth';

export const VitalsTracking: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [showNewVital, setShowNewVital] = useState(false);
  const [vitalForm, setVitalForm] = useState({
    patient_id: '',
    blood_pressure_systolic: '',
    blood_pressure_diastolic: '',
    weight: '',
    fetal_heart_rate: '',
    temperature: '',
    urine_protein: 'negative',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const { vitals, createVital, loading } = useVitals();
  const { patients } = usePatients();
  const { profile } = useAuth();

  const handleVitalFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setVitalForm({
      ...vitalForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitVital = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await createVital({
        patient_id: vitalForm.patient_id,
        blood_pressure_systolic: vitalForm.blood_pressure_systolic ? parseInt(vitalForm.blood_pressure_systolic) : null,
        blood_pressure_diastolic: vitalForm.blood_pressure_diastolic ? parseInt(vitalForm.blood_pressure_diastolic) : null,
        weight: vitalForm.weight ? parseFloat(vitalForm.weight) : null,
        fetal_heart_rate: vitalForm.fetal_heart_rate ? parseInt(vitalForm.fetal_heart_rate) : null,
        temperature: vitalForm.temperature ? parseFloat(vitalForm.temperature) : null,
        urine_protein: vitalForm.urine_protein,
        notes: vitalForm.notes || null,
        recorded_by: profile?.id || null,
      });

      if (!error) {
        setShowNewVital(false);
        setVitalForm({
          patient_id: '',
          blood_pressure_systolic: '',
          blood_pressure_diastolic: '',
          weight: '',
          fetal_heart_rate: '',
          temperature: '',
          urine_protein: 'negative',
          notes: ''
        });
      }
    } catch (err) {
      console.error('Error creating vital:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const riskStats = {
    high: vitals.filter(v => v.risk_assessment === 'high' || v.risk_assessment === 'critical').length,
    medium: vitals.filter(v => v.risk_assessment === 'medium').length,
    normal: vitals.filter(v => v.risk_assessment === 'low').length
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical':
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'medium':
        return <TrendingUp className="h-4 w-4 text-yellow-600" />;
      case 'low':
        return <Heart className="h-4 w-4 text-green-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">High Risk</p>
              <p className="text-2xl font-bold text-red-600">{riskStats.high}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Medium Risk</p>
              <p className="text-2xl font-bold text-yellow-600">{riskStats.medium}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Normal</p>
              <p className="text-2xl font-bold text-green-600">{riskStats.normal}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Heart className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Vitals & Risk Management</h2>
          <button
            onClick={() => setShowNewVital(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Record Vitals
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient name or ID..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Risk Levels</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="normal">Normal</option>
          </select>
        </div>

        {/* Vitals Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BP</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FHR</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temp</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Protein</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vitals.map((vital: any) => (
                <tr key={vital.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {vital.patients?.first_name} {vital.patients?.last_name}
                      </p>
                      <p className="text-sm text-gray-500">ID: {vital.patients?.patient_id}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {new Date(vital.recorded_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-sm text-gray-900">
                        {vital.blood_pressure_systolic && vital.blood_pressure_diastolic 
                          ? `${vital.blood_pressure_systolic}/${vital.blood_pressure_diastolic}`
                          : 'N/A'
                        }
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <Scale className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-sm text-gray-900">
                        {vital.weight ? `${vital.weight}kg` : 'N/A'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <Activity className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-gray-900">
                        {vital.fetal_heart_rate || 'N/A'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <Thermometer className="h-4 w-4 text-orange-500 mr-1" />
                      <span className="text-sm text-gray-900">
                        {vital.temperature ? `${vital.temperature}°C` : 'N/A'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <Droplets className="h-4 w-4 text-purple-500 mr-1" />
                      <span className="text-sm text-gray-900">{vital.urine_protein || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      {getRiskIcon(vital.risk_assessment)}
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(vital.risk_assessment)}`}>
                        {vital.risk_assessment}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">{vital.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* New Vitals Modal */}
        {showNewVital && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Record Patient Vitals</h3>
              
              <form onSubmit={handleSubmitVital} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Patient
                    </label>
                    <select 
                      name="patient_id"
                      value={vitalForm.patient_id}
                      onChange={handleVitalFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select patient...</option>
                      {patients.map((patient) => (
                        <option key={patient.id} value={patient.id}>
                          {patient.first_name} {patient.last_name} ({patient.patient_id})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      defaultValue={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Blood Pressure - Systolic
                    </label>
                    <input
                      type="number"
                      name="blood_pressure_systolic"
                      value={vitalForm.blood_pressure_systolic}
                      onChange={handleVitalFormChange}
                      placeholder="120"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Blood Pressure - Diastolic
                    </label>
                    <input
                      type="number"
                      name="blood_pressure_diastolic"
                      value={vitalForm.blood_pressure_diastolic}
                      onChange={handleVitalFormChange}
                      placeholder="80"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={vitalForm.weight}
                      onChange={handleVitalFormChange}
                      placeholder="65"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fetal Heart Rate (bpm)
                    </label>
                    <input
                      type="number"
                      name="fetal_heart_rate"
                      value={vitalForm.fetal_heart_rate}
                      onChange={handleVitalFormChange}
                      placeholder="150"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Temperature (°C)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="temperature"
                      value={vitalForm.temperature}
                      onChange={handleVitalFormChange}
                      placeholder="36.8"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Urine Protein
                    </label>
                    <select 
                      name="urine_protein"
                      value={vitalForm.urine_protein}
                      onChange={handleVitalFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="negative">Negative</option>
                      <option value="trace">Trace</option>
                      <option value="positive">Positive</option>
                      <option value="strong">Strong</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    rows={3}
                    name="notes"
                    value={vitalForm.notes}
                    onChange={handleVitalFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter any additional notes or observations..."
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowNewVital(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {submitting ? 'Saving...' : 'Save Vitals'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};