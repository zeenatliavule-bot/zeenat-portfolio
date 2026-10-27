/*
 * Supabase browser configuration.
 * Replace both values with the URL and publishable/anon key from:
 * Supabase Dashboard → Project Settings → API.
 * Never put a service_role or secret key in this file.
 */
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://YOUR_PROJECT_REF.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY";

export const supabaseConfigured =
  !SUPABASE_URL.includes("YOUR_PROJECT_REF") &&
  !SUPABASE_PUBLISHABLE_KEY.includes("YOUR_SUPABASE");

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
