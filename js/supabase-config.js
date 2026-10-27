/*
 * Supabase browser configuration for the Zeenat portfolio project.
 * Use only the project's publishable key here; never use a service_role/secret key.
 */
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://linfpcivfmhxvpgkrseq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_7u_twd-sZNBCMm6J2Ow_UvxhzBZx";

export const supabaseConfigured =
  SUPABASE_URL.startsWith("https://") &&
  SUPABASE_PUBLISHABLE_KEY.startsWith("sb_publishable_");

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
