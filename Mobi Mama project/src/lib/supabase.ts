import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          email: string;
          full_name: string;
          role: 'phc' | 'moh' | 'insurance' | 'admin';
          facility_id: string | null;
          phone: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          email: string;
          full_name: string;
          role?: 'phc' | 'moh' | 'insurance' | 'admin';
          facility_id?: string | null;
          phone?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          email?: string;
          full_name?: string;
          role?: 'phc' | 'moh' | 'insurance' | 'admin';
          facility_id?: string | null;
          phone?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      patients: {
        Row: {
          id: string;
          patient_id: string;
          nin: string | null;
          first_name: string;
          last_name: string;
          phone: string;
          emergency_contact: string | null;
          address: string | null;
          lga: string | null;
          state: string;
          date_of_birth: string | null;
          lmp: string;
          edd: string;
          weeks_pregnant: number;
          preferred_language: string;
          risk_level: 'low' | 'medium' | 'high' | 'critical';
          is_active: boolean;
          facility_id: string | null;
          registered_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          patient_id?: string;
          nin?: string | null;
          first_name: string;
          last_name: string;
          phone: string;
          emergency_contact?: string | null;
          address?: string | null;
          lga?: string | null;
          state?: string;
          date_of_birth?: string | null;
          lmp: string;
          edd: string;
          preferred_language?: string;
          risk_level?: 'low' | 'medium' | 'high' | 'critical';
          is_active?: boolean;
          facility_id?: string | null;
          registered_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          patient_id?: string;
          nin?: string | null;
          first_name?: string;
          last_name?: string;
          phone?: string;
          emergency_contact?: string | null;
          address?: string | null;
          lga?: string | null;
          state?: string;
          date_of_birth?: string | null;
          lmp?: string;
          edd?: string;
          preferred_language?: string;
          risk_level?: 'low' | 'medium' | 'high' | 'critical';
          is_active?: boolean;
          facility_id?: string | null;
          registered_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      appointments: {
        Row: {
          id: string;
          patient_id: string;
          facility_id: string | null;
          appointment_date: string;
          appointment_time: string;
          appointment_type: string;
          status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
          notes: string | null;
          reminder_sent: boolean;
          reminder_sent_at: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          patient_id: string;
          facility_id?: string | null;
          appointment_date: string;
          appointment_time: string;
          appointment_type: string;
          status?: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
          notes?: string | null;
          reminder_sent?: boolean;
          reminder_sent_at?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          patient_id?: string;
          facility_id?: string | null;
          appointment_date?: string;
          appointment_time?: string;
          appointment_type?: string;
          status?: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
          notes?: string | null;
          reminder_sent?: boolean;
          reminder_sent_at?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      vitals: {
        Row: {
          id: string;
          patient_id: string;
          appointment_id: string | null;
          blood_pressure_systolic: number | null;
          blood_pressure_diastolic: number | null;
          weight: number | null;
          fetal_heart_rate: number | null;
          temperature: number | null;
          urine_protein: string | null;
          hemoglobin: number | null;
          risk_assessment: 'low' | 'medium' | 'high' | 'critical';
          notes: string | null;
          recorded_by: string | null;
          recorded_at: string;
        };
        Insert: {
          id?: string;
          patient_id: string;
          appointment_id?: string | null;
          blood_pressure_systolic?: number | null;
          blood_pressure_diastolic?: number | null;
          weight?: number | null;
          fetal_heart_rate?: number | null;
          temperature?: number | null;
          urine_protein?: string | null;
          hemoglobin?: number | null;
          risk_assessment?: 'low' | 'medium' | 'high' | 'critical';
          notes?: string | null;
          recorded_by?: string | null;
          recorded_at?: string;
        };
        Update: {
          id?: string;
          patient_id?: string;
          appointment_id?: string | null;
          blood_pressure_systolic?: number | null;
          blood_pressure_diastolic?: number | null;
          weight?: number | null;
          fetal_heart_rate?: number | null;
          temperature?: number | null;
          urine_protein?: string | null;
          hemoglobin?: number | null;
          risk_assessment?: 'low' | 'medium' | 'high' | 'critical';
          notes?: string | null;
          recorded_by?: string | null;
          recorded_at?: string;
        };
      };
      emergency_alerts: {
        Row: {
          id: string;
          patient_id: string;
          alert_type: string;
          severity: 'low' | 'medium' | 'high' | 'critical';
          description: string | null;
          location: string | null;
          status: 'active' | 'responded' | 'resolved' | 'cancelled';
          response_notes: string | null;
          responded_by: string | null;
          responded_at: string | null;
          created_at: string;
          resolved_at: string | null;
        };
        Insert: {
          id?: string;
          patient_id: string;
          alert_type: string;
          severity: 'low' | 'medium' | 'high' | 'critical';
          description?: string | null;
          location?: string | null;
          status?: 'active' | 'responded' | 'resolved' | 'cancelled';
          response_notes?: string | null;
          responded_by?: string | null;
          responded_at?: string | null;
          created_at?: string;
          resolved_at?: string | null;
        };
        Update: {
          id?: string;
          patient_id?: string;
          alert_type?: string;
          severity?: 'low' | 'medium' | 'high' | 'critical';
          description?: string | null;
          location?: string | null;
          status?: 'active' | 'responded' | 'resolved' | 'cancelled';
          response_notes?: string | null;
          responded_by?: string | null;
          responded_at?: string | null;
          created_at?: string;
          resolved_at?: string | null;
        };
      };
      insurance_records: {
        Row: {
          id: string;
          patient_id: string;
          nhis_id: string | null;
          plan_name: string;
          status: 'active' | 'pending' | 'expired' | 'cancelled';
          premium_amount: number | null;
          coverage_percentage: number;
          start_date: string | null;
          end_date: string | null;
          auto_deduction: boolean;
          last_payment_date: string | null;
          next_payment_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          patient_id: string;
          nhis_id?: string | null;
          plan_name: string;
          status?: 'active' | 'pending' | 'expired' | 'cancelled';
          premium_amount?: number | null;
          coverage_percentage?: number;
          start_date?: string | null;
          end_date?: string | null;
          auto_deduction?: boolean;
          last_payment_date?: string | null;
          next_payment_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          patient_id?: string;
          nhis_id?: string | null;
          plan_name?: string;
          status?: 'active' | 'pending' | 'expired' | 'cancelled';
          premium_amount?: number | null;
          coverage_percentage?: number;
          start_date?: string | null;
          end_date?: string | null;
          auto_deduction?: boolean;
          last_payment_date?: string | null;
          next_payment_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      education_content: {
        Row: {
          id: string;
          title: string;
          content: string;
          category: string;
          language: string;
          week_range: string | null;
          content_type: string;
          is_featured: boolean;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          category: string;
          language?: string;
          week_range?: string | null;
          content_type?: string;
          is_featured?: boolean;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          category?: string;
          language?: string;
          week_range?: string | null;
          content_type?: string;
          is_featured?: boolean;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      facilities: {
        Row: {
          id: string;
          name: string;
          code: string;
          lga: string;
          state: string;
          address: string | null;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          code: string;
          lga: string;
          state?: string;
          address?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          code?: string;
          lga?: string;
          state?: string;
          address?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}