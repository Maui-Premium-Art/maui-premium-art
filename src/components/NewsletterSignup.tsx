"use client";

import { useState, useCallback } from "react";

interface NewsletterSignupProps {
  /** Tag signups by origin: website-footer, events-panel, popup, x-link */
  source?: string;
  /** Compact mode for inline placement (footer, panel) */
  compact?: boolean;
}

export default function NewsletterSignup({
  source = "website",
  compact = false,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email) return;

      setStatus("submitting");

      // Placeholder: log to console + simulate success
      // Replace with Kit API call when account is ready:
      // POST https://api.convertkit.com/v3/forms/{FORM_ID}/subscribe
      // body: { api_key, email, first_name, tags: ["website-signup", source] }
      console.log("[Newsletter]", { email, firstName, source, tag: "website-signup" });

      // Simulate async
      await new Promise((r) => setTimeout(r, 600));
      setStatus("success");
      setEmail("");
      setFirstName("");
    },
    [email, firstName, source]
  );

  if (status === "success") {
    return (
      <div
        style={{
          padding: compact ? "12px 0" : "16px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif" }}>
          Mahalo! You&apos;re on the list. 🤙
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: compact ? 8 : 10,
      }}
    >
      {!compact && (
        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          }}
        >
          Get notified
        </div>
      )}

      <div style={{ display: "flex", gap: 8, width: "100%" }}>
        <input
          type="text"
          name="first_name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          aria-label="First name"
          style={{
            flex: 1,
            minWidth: 0,
            boxSizing: "border-box",
            padding: compact ? "8px 10px" : "9px 12px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            color: "#ffffff",
            fontSize: 13,
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            outline: "none",
          }}
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          aria-label="Email address"
          style={{
            flex: 2,
            minWidth: 0,
            boxSizing: "border-box",
            padding: compact ? "8px 10px" : "9px 12px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            color: "#ffffff",
            fontSize: 13,
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            outline: "none",
          }}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        style={{
          padding: compact ? "8px 16px" : "10px 20px",
          background: status === "submitting" ? "rgba(74,158,255,0.08)" : "rgba(74,158,255,0.12)",
          border: "1px solid rgba(74,158,255,0.25)",
          borderRadius: 8,
          color: "#ffffff",
          fontSize: 12,
          fontWeight: 500,
          cursor: status === "submitting" ? "wait" : "pointer",
          fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          letterSpacing: "0.02em",
          opacity: status === "submitting" ? 0.6 : 1,
          transition: "opacity 0.2s ease",
          alignSelf: compact ? "flex-start" : "stretch",
        }}
      >
        {status === "submitting" ? "Subscribing…" : "Notify Me"}
      </button>

      {!compact && (
        <p
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.18)",
            margin: 0,
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          }}
        >
          No spam. Unsubscribe anytime.
        </p>
      )}

      {/* Hidden source tag */}
      <input type="hidden" name="source" value={source} />
    </form>
  );
}
