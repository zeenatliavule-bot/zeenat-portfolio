import { supabase, supabaseConfigured } from "./supabase-config.js";

const form = document.getElementById("authForm");
const message = document.getElementById("message");
const submit = form?.querySelector('button[type="submit"]');

function showMessage(text, kind = "error") {
  if (!message) return;
  message.textContent = text;
  message.className = `message show ${kind}`;
}
function setBusy(busy, label) {
  if (!submit) return;
  submit.disabled = busy;
  submit.textContent = busy ? "Please wait…" : label;
}
document.querySelectorAll("[data-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.toggle);
    if (!input) return;
    input.type = input.type === "password" ? "text" : "password";
    button.textContent = input.type === "password" ? "Show" : "Hide";
  });
});

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    message.className = "message";
    if (!supabaseConfigured) {
      showMessage("Authentication is not connected yet. Add your Supabase project URL and publishable/anon key in js/supabase-config.js, then redeploy.");
      return;
    }
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim().toLowerCase();
    const password = String(data.get("password") || "");
    const mode = form.dataset.mode;
    setBusy(true, mode === "signup" ? "Create account →" : "Sign in →");
    try {
      if (mode === "signup") {
        const fullName = String(data.get("fullName") || "").trim();
        const confirmPassword = String(data.get("confirmPassword") || "");
        if (password.length < 8) throw new Error("Use a password with at least 8 characters.");
        if (password !== confirmPassword) throw new Error("The passwords do not match.");
        const { data: result, error } = await supabase.auth.signUp({
          email, password, options: {
            data: { full_name: fullName },
            emailRedirectTo: new URL("sign-in.html", window.location.href).href
          }
        });
        if (error) throw error;
        if (result.session) {
          showMessage("Your account is ready. You are signed in.", "success");
          window.setTimeout(() => window.location.assign("index.html"), 900);
        } else {
          showMessage("Account created. If email confirmation is enabled in Supabase, check your inbox to confirm your address before signing in.", "success");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        showMessage("Signed in successfully. Taking you back to the portfolio…", "success");
        window.setTimeout(() => window.location.assign("index.html"), 700);
      }
    } catch (error) {
      showMessage(error?.message || "Something went wrong. Please try again.");
    } finally {
      setBusy(false, mode === "signup" ? "Create account →" : "Sign in →");
    }
  });
}

const forgot = document.getElementById("forgotPassword");
if (forgot) {
  forgot.addEventListener("click", async (event) => {
    event.preventDefault();
    if (!supabaseConfigured) {
      showMessage("Connect Supabase first, then enter your email address and try again.");
      return;
    }
    const email = document.getElementById("email")?.value.trim().toLowerCase();
    if (!email) {
      showMessage("Enter your email address first, then choose Forgot password.");
      document.getElementById("email")?.focus();
      return;
    }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: new URL("sign-in.html", window.location.href).href
      });
      if (error) throw error;
      showMessage("If an account exists for that address, a password-reset email will be sent.", "success");
    } catch (error) {
      showMessage(error?.message || "Unable to request a password reset.");
    }
  });
}
