import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { signInAdmin } from "@/stores/pavone/lib/supabase";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/stores/pavone/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInAdmin(email, password);
      navigate({ to: "/stores/pavone/admin" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blush/30 via-cream to-lavender/30 px-4">
      <div className="w-full max-w-md bg-background rounded-2xl shadow-soft p-8 border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-pink/15 flex items-center justify-center">
            <Lock className="h-5 w-5 text-pink" />
          </div>
          <div>
            <div className="font-display text-2xl text-cocoa">Pavone Admin</div>
            <div className="text-xs text-muted-foreground">Secure Supabase admin</div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              required
              placeholder="owner@example.com"
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink/40"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink/40"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-cocoa text-ivory py-3 text-sm font-medium hover:bg-cocoa/90 transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Enter studio"}
          </button>
        </form>
      </div>
    </div>
  );
}
