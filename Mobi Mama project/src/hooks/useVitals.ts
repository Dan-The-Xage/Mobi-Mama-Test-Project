import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Vital = Database['public']['Tables']['vitals']['Row'];
type VitalInsert = Database['public']['Tables']['vitals']['Insert'];

export function useVitals() {
  const [vitals, setVitals] = useState<Vital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVitals = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('vitals')
        .select(`
          *,
          patients:patient_id (
            first_name,
            last_name,
            patient_id
          ),
          appointments:appointment_id (
            appointment_date,
            appointment_type
          )
        `)
        .order('recorded_at', { ascending: false });

      if (error) throw error;
      setVitals(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createVital = async (vitalData: VitalInsert) => {
    try {
      // Auto-assess risk based on vitals
      const riskAssessment = assessRisk(vitalData);
      
      const { data, error } = await supabase
        .from('vitals')
        .insert({
          ...vitalData,
          risk_assessment: riskAssessment,
        })
        .select()
        .single();

      if (error) throw error;
      
      // Update patient risk level if necessary
      if (riskAssessment === 'high' || riskAssessment === 'critical') {
        await supabase
          .from('patients')
          .update({ risk_level: riskAssessment })
          .eq('id', vitalData.patient_id);
      }
      
      // Refresh vitals list
      await fetchVitals();
      return { data, error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: null, error };
    }
  };

  const getPatientVitals = async (patientId: string) => {
    try {
      const { data, error } = await supabase
        .from('vitals')
        .select('*')
        .eq('patient_id', patientId)
        .order('recorded_at', { ascending: false });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: [], error };
    }
  };

  const getHighRiskPatients = async () => {
    try {
      const { data, error } = await supabase
        .from('vitals')
        .select(`
          *,
          patients:patient_id (
            first_name,
            last_name,
            patient_id,
            phone
          )
        `)
        .in('risk_assessment', ['high', 'critical'])
        .order('recorded_at', { ascending: false });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: [], error };
    }
  };

  // Risk assessment algorithm
  const assessRisk = (vitals: VitalInsert): 'low' | 'medium' | 'high' | 'critical' => {
    let riskScore = 0;

    // Blood pressure assessment
    if (vitals.blood_pressure_systolic && vitals.blood_pressure_diastolic) {
      const systolic = vitals.blood_pressure_systolic;
      const diastolic = vitals.blood_pressure_diastolic;
      
      if (systolic >= 160 || diastolic >= 110) {
        riskScore += 3; // Severe hypertension
      } else if (systolic >= 140 || diastolic >= 90) {
        riskScore += 2; // Mild hypertension
      } else if (systolic < 90 || diastolic < 60) {
        riskScore += 2; // Hypotension
      }
    }

    // Temperature assessment
    if (vitals.temperature) {
      if (vitals.temperature >= 38.5) {
        riskScore += 2; // High fever
      } else if (vitals.temperature >= 37.5) {
        riskScore += 1; // Mild fever
      }
    }

    // Fetal heart rate assessment
    if (vitals.fetal_heart_rate) {
      if (vitals.fetal_heart_rate < 110 || vitals.fetal_heart_rate > 160) {
        riskScore += 2; // Abnormal FHR
      }
    }

    // Urine protein assessment
    if (vitals.urine_protein === 'positive' || vitals.urine_protein === 'strong') {
      riskScore += 2; // Proteinuria
    }

    // Hemoglobin assessment
    if (vitals.hemoglobin && vitals.hemoglobin < 11) {
      riskScore += 1; // Anemia
    }

    // Determine risk level
    if (riskScore >= 5) return 'critical';
    if (riskScore >= 3) return 'high';
    if (riskScore >= 1) return 'medium';
    return 'low';
  };

  useEffect(() => {
    fetchVitals();
  }, []);

  return {
    vitals,
    loading,
    error,
    createVital,
    getPatientVitals,
    getHighRiskPatients,
    refetch: fetchVitals,
  };
}