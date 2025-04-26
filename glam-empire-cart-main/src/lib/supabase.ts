
import { createClient } from '@supabase/supabase-js';

// Default to empty strings if environment variables are not set
// These will be replaced with actual values when environment variables are configured
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Check if Supabase is properly configured
export const isSupabaseConfigured = !(
  !import.meta.env.VITE_SUPABASE_URL || 
  !import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_URL === 'https://your-project.supabase.co' ||
  import.meta.env.VITE_SUPABASE_ANON_KEY === 'your-anon-key'
);

// Show console warning if using default values
if (!isSupabaseConfigured) {
  console.warn(
    'Supabase environment variables not found. Authentication and database operations will not work properly. ' +
    'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.'
  );
}
