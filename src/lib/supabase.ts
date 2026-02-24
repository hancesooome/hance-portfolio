import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://domzxwzidventnxpasof.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 
                        import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvbXp4d3ppZHZlbnRueHBhc29mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MjMxNzQsImV4cCI6MjA4NzQ5OTE3NH0.f6SRJyG7jzWWIwJVKn5so6-MyJX_5Fi6F4iITnM9Zcw';

export const effectiveSupabaseUrl = supabaseUrl;
export const effectiveSupabaseKey = supabaseAnonKey;

export const isSupabaseConfigured = (!!import.meta.env.VITE_SUPABASE_URL || effectiveSupabaseUrl !== 'https://placeholder.supabase.co') && 
                                   (!!import.meta.env.VITE_SUPABASE_ANON_KEY || !!import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY || effectiveSupabaseKey !== 'placeholder');

export const supabase = createClient(effectiveSupabaseUrl, effectiveSupabaseKey);
