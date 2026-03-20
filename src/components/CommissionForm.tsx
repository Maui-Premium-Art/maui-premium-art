"use client";

import { useState, useCallback } from "react";

// When Boss creates a Tally form, replace this entire component with:
// <iframe data-tally-src="https://tally.so/embed/FORM_ID?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
//   loading="lazy" width="100%" height="500" frameBorder="0" title="Commission Request" />
// Then add <script src="https://tally.so/widgets/embed.js" /> to layout.tsx head.

const WRAP_STYLES = [
  "Full Wrap (all panels)",
  "Partial Wrap (tailgate + sides)",
  "Tailgate Only",
  "Custom / Not sure yet",
];

const BUDGET_RANGES = [
  "$2,000 – $3,000",
  "$3,000 – $5,000",
  "$5,000+",
  "Not sure yet",
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  ctYear: string;
  ctColor: string;
  wrapStyle: string;
  description: string;
  budget: string;
  source: string;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8,
  color: "#ffffff",
  fontSize: 13,
  fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.35)",
  marginBottom: 6,
  display: "block",
  fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
};

export default function CommissionForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    ctYear: "",
    ctColor: "",
    wrapStyle: "",
    description: "",
    budget: "",
    source: typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("src") ?? "website" : "website",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const update = useCallback((field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!form.name || !form.email) return;

      setStatus("submitting");

      // Placeholder: log to console
      // Replace with Tally embed or API call when form ID is ready
      console.log("[Commission Request]", form);

      await new Promise((r) => setTimeout(r, 800));
      setStatus("success");
    },
    [form]
  );

  if (status === "success") {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px 20px",
          background: "rgba(14,14,22,0.8)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 14,
        }}
      >
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#4a9eff", marginBottom: 12, fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif" }}>
          Request Received
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 300, margin: "0 0 8px", color: "#ffffff" }}>Mahalo!</h2>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.7, fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif" }}>
          We&apos;ll review your commission request and reach out within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "rgba(14,14,22,0.8)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 14,
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
          fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
        }}
      >
        Tell us about your vision
      </div>

      {/* Name + Email */}
      <div className="commission-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={labelStyle}>Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Email *</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
            style={inputStyle}
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label style={labelStyle}>Phone (optional)</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* CT Year + Color */}
      <div className="commission-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={labelStyle}>CT Year</label>
          <input
            type="text"
            value={form.ctYear}
            onChange={(e) => update("ctYear", e.target.value)}
            placeholder="e.g. 2024"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>CT Color</label>
          <input
            type="text"
            value={form.ctColor}
            onChange={(e) => update("ctColor", e.target.value)}
            placeholder="e.g. Stainless Steel"
            style={inputStyle}
          />
        </div>
      </div>

      {/* Wrap Style */}
      <div>
        <label style={labelStyle}>Wrap Style</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {WRAP_STYLES.map((ws) => (
            <button
              key={ws}
              type="button"
              onClick={() => update("wrapStyle", ws)}
              style={{
                padding: "8px 14px",
                background: form.wrapStyle === ws ? "rgba(74,158,255,0.1)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${form.wrapStyle === ws ? "rgba(74,158,255,0.3)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 8,
                color: form.wrapStyle === ws ? "#ffffff" : "rgba(255,255,255,0.5)",
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                transition: "all 0.15s ease",
              }}
            >
              {ws}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label style={labelStyle}>Describe your vision</label>
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Colors, themes, Hawaiian elements, personal meaning — tell us everything."
          rows={4}
          style={{
            ...inputStyle,
            resize: "vertical",
            lineHeight: 1.6,
          }}
        />
      </div>

      {/* Budget */}
      <div>
        <label style={labelStyle}>Budget Range</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {BUDGET_RANGES.map((br) => (
            <button
              key={br}
              type="button"
              onClick={() => update("budget", br)}
              style={{
                padding: "8px 14px",
                background: form.budget === br ? "rgba(74,158,255,0.1)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${form.budget === br ? "rgba(74,158,255,0.3)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 8,
                color: form.budget === br ? "#ffffff" : "rgba(255,255,255,0.5)",
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                transition: "all 0.15s ease",
              }}
            >
              {br}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        style={{
          padding: "14px 24px",
          background: status === "submitting" ? "rgba(74,158,255,0.08)" : "rgba(74,158,255,0.15)",
          border: "1px solid rgba(74,158,255,0.3)",
          borderRadius: 10,
          color: "#ffffff",
          fontSize: 14,
          fontWeight: 600,
          cursor: status === "submitting" ? "wait" : "pointer",
          fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          letterSpacing: "0.02em",
          opacity: status === "submitting" ? 0.6 : 1,
          transition: "opacity 0.2s ease",
        }}
      >
        {status === "submitting" ? "Submitting…" : "Submit Commission Request"}
      </button>

      <p
        style={{
          fontSize: 11,
          color: "rgba(255,255,255,0.2)",
          margin: 0,
          textAlign: "center",
          fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
        }}
      >
        We respond within 48 hours. Custom commissions start at $2,995.
      </p>

      <style>{`
        @media (max-width: 480px) {
          .commission-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}
