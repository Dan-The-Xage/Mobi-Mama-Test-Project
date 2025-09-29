import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type EducationContent = Database['public']['Tables']['education_content']['Row'];
type EducationInsert = Database['public']['Tables']['education_content']['Insert'];

export function useEducation() {
  const [content, setContent] = useState<EducationContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async (filters?: {
    category?: string;
    language?: string;
    featured?: boolean;
  }) => {
    try {
      setLoading(true);
      let query = supabase
        .from('education_content')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }
      if (filters?.language) {
        query = query.eq('language', filters.language);
      }
      if (filters?.featured !== undefined) {
        query = query.eq('is_featured', filters.featured);
      }

      const { data, error } = await query;

      if (error) throw error;
      setContent(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createContent = async (contentData: EducationInsert) => {
    try {
      const { data, error } = await supabase
        .from('education_content')
        .insert(contentData)
        .select()
        .single();

      if (error) throw error;
      
      // Refresh content list
      await fetchContent();
      return { data, error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: null, error };
    }
  };

  const getFeaturedContent = async (language: string = 'english') => {
    try {
      const { data, error } = await supabase
        .from('education_content')
        .select('*')
        .eq('is_featured', true)
        .eq('language', language)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: [], error };
    }
  };

  const getContentByWeek = async (week: number, language: string = 'english') => {
    try {
      const { data, error } = await supabase
        .from('education_content')
        .select('*')
        .eq('language', language)
        .or(`week_range.ilike.%Week ${week}%,week_range.ilike.%Week 1-40%,week_range.ilike.%All weeks%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: [], error };
    }
  };

  const searchContent = async (query: string, language?: string) => {
    try {
      let searchQuery = supabase
        .from('education_content')
        .select('*')
        .or(`title.ilike.%${query}%,content.ilike.%${query}%,category.ilike.%${query}%`);

      if (language) {
        searchQuery = searchQuery.eq('language', language);
      }

      const { data, error } = await searchQuery.order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: [], error };
    }
  };

  const getCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('education_content')
        .select('category')
        .order('category');

      if (error) throw error;
      
      // Get unique categories
      const categories = [...new Set(data?.map(item => item.category) || [])];
      return { data: categories, error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: [], error };
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return {
    content,
    loading,
    error,
    createContent,
    getFeaturedContent,
    getContentByWeek,
    searchContent,
    getCategories,
    refetch: fetchContent,
  };
}