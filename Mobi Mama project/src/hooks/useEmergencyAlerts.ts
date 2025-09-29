import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type EmergencyAlert = Database['public']['Tables']['emergency_alerts']['Row'];
type EmergencyAlertInsert = Database['public']['Tables']['emergency_alerts']['Insert'];
type EmergencyAlertUpdate = Database['public']['Tables']['emergency_alerts']['Update'];

export function useEmergencyAlerts() {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('emergency_alerts')
        .select(`
          *,
          patients:patient_id (
            first_name,
            last_name,
            patient_id,
            phone,
            address,
            emergency_contact
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAlerts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createAlert = async (alertData: EmergencyAlertInsert) => {
    try {
      const { data, error } = await supabase
        .from('emergency_alerts')
        .insert(alertData)
        .select()
        .single();

      if (error) throw error;
      
      // Refresh alerts list
      await fetchAlerts();
      
      // Send real-time notification to admin users
      await supabase
        .channel('emergency_alerts')
        .send({
          type: 'broadcast',
          event: 'new_alert',
          payload: data,
        });
      
      return { data, error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: null, error };
    }
  };

  const updateAlert = async (id: string, updates: EmergencyAlertUpdate) => {
    try {
      const { data, error } = await supabase
        .from('emergency_alerts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      // Refresh alerts list
      await fetchAlerts();
      return { data, error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: null, error };
    }
  };

  const respondToAlert = async (id: string, responseNotes: string, respondedBy: string) => {
    return updateAlert(id, {
      status: 'responded',
      response_notes: responseNotes,
      responded_by: respondedBy,
      responded_at: new Date().toISOString(),
    });
  };

  const resolveAlert = async (id: string, responseNotes?: string) => {
    return updateAlert(id, {
      status: 'resolved',
      response_notes: responseNotes,
      resolved_at: new Date().toISOString(),
    });
  };

  const getActiveAlerts = async () => {
    try {
      const { data, error } = await supabase
        .from('emergency_alerts')
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
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: [], error };
    }
  };

  const getPatientAlerts = async (patientId: string) => {
    try {
      const { data, error } = await supabase
        .from('emergency_alerts')
        .select('*')
        .eq('patient_id', patientId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: [], error };
    }
  };

  // Subscribe to real-time updates
  useEffect(() => {
    const channel = supabase
      .channel('emergency_alerts_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'emergency_alerts',
        },
        () => {
          fetchAlerts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    fetchAlerts();
  }, []);

  return {
    alerts,
    loading,
    error,
    createAlert,
    updateAlert,
    respondToAlert,
    resolveAlert,
    getActiveAlerts,
    getPatientAlerts,
    refetch: fetchAlerts,
  };
}