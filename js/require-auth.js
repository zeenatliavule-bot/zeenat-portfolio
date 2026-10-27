import { supabase, supabaseConfigured } from "./supabase-config.js";

async function requireSignIn() {
  if (!supabaseConfigured || !supabase) {
    window.location.replace("sign-in.html");
    return;
  }

  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) {
    window.location.replace("sign-in.html");
  }
}

requireSignIn();
