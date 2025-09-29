import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type InsuranceRecord = Database['public']['Tables']['insurance_records']['Row'];
type InsuranceInsert = Database['public']['Tables']['insurance_records']['Insert'];
type InsuranceUpdate = Database['public']['Tables']['insurance_records']['Update'];

export function useInsurance() {
  const [records, setRecords] = useState<InsuranceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('insurance_records')
        .select(`
          *,
          patients:patient_id (
            first_name,
            last_name,
            patient_id,
            phone
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRecords(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createRecord = async (recordData: InsuranceInsert) => {
    try {
      // Generate NHIS ID if not provided
      if (!recordData.nhis_id) {
        recordData.nhis_id = await generateNHISId();
      }

      const { data, error } = await supabase
        .from('insurance_records')
        .insert(recordData)
        .select()
        .single();

      if (error) throw error;
      
      // Refresh records list
      await fetchRecords();
      return { data, error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: null, error };
    }
  };

  const updateRecord = async (id: string, updates: InsuranceUpdate) => {
    try {
      const { data, error } = await supabase
        .from('insurance_records')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      // Refresh records list
      await fetchRecords();
      return { data, error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: null, error };
    }
  };

  const getPatientInsurance = async (patientId: string) => {
    try {
      const { data, error } = await supabase
        .from('insurance_records')
        .select('*')
        .eq('patient_id', patientId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return { data: data || null, error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: null, error };
    }
  };

  const checkNHISStatus = async (nhisId: string) => {
    try {
      const { data, error } = await supabase
        .from('insurance_records')
        .select('*')
        .eq('nhis_id', nhisId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return { data: data || null, error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: null, error };
    }
  };

  const processPayment = async (recordId: string, amount: number) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      const nextPaymentDate = nextMonth.toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('insurance_records')
        .update({
          last_payment_date: today,
          next_payment_date: nextPaymentDate,
          status: 'active',
        })
        .eq('id', recordId)
        .select()
        .single();

      if (error) throw error;
      
      // Refresh records list
      await fetchRecords();
      return { data, error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: null, error };
    }
  };

  const getExpiringInsurance = async (days: number = 30) => {
    try {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + days);
      const futureDateStr = futureDate.toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('insurance_records')
        .select(`
          *,
          patients:patient_id (
            first_name,
            last_name,
            patient_id,
            phone
          )
        `)
        .eq('status', 'active')
        .lte('next_payment_date', futureDateStr)
        .order('next_payment_date', { ascending: true });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: [], error };
    }
  };

  const generateNHISId = async (): Promise<string> => {
    // Generate a unique NHIS ID
    const prefix = 'NHIS';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return {
    records,
    loading,
    error,
    createRecord,
    updateRecord,
    getPatientInsurance,
    checkNHISStatus,
    processPayment,
    getExpiringInsurance,
    refetch: fetchRecords,
  };
}