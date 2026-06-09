import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { adminActions } from "@/stores/pavone/lib/admin/mock-store";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/stores/pavone/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (adminActions.login(password)) {
      navigate({ to: "/stores/pavone/admin" });
    } else {
      setError("Incorrect password. Try admin123 (demo).");
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
            <div className="text-xs text-muted-foreground">Demo studio — no real authentication</div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              placeholder="admin123"
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink/40"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-lg bg-cocoa text-ivory py-3 text-sm font-medium hover:bg-cocoa/90 transition-colors"
          >
            Enter studio
          </button>

          <p className="text-xs text-muted-foreground text-center pt-2">
            Demo password: <span className="font-mono text-cocoa">admin123</span>
          </p>
        </form>
      </div>
    </div>
  );
}
