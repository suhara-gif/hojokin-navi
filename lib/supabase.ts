import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Server-side client with service role key
export function getServiceSupabase() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, serviceRoleKey);
}

// Types
export interface Subsidy {
  id: string;
  title: string;
  organization: string | null;
  category: string | null;
  region_code: string | null;
  amount_min: number | null;
  amount_max: number | null;
  deadline: string | null;
  application_start: string | null;
  target_text: string | null;
  overview: string | null;
  url: string | null;
  status: 'open' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface SyncLog {
  id: number;
  synced_at: string;
  added_count: number;
  updated_count: number;
  closed_count: number;
  total_count: number;
  error_message: string | null;
}
