"use client";

import { useState, useCallback } from "react";

// When Boss creates Tally form, replace with:
// <iframe data-tally-src="https://tally.so/embed/FORM_ID?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
//   loading="lazy" width="100%" height="600" frameBorder="0" title="Artist Submission" />

interface FormData {
  name: string;
  email: string;
  xHandle: string;
  portfolioUrl: string;
  statement: string;
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

export default function ArtistSubmissionForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    xHandle: "",
    portfolioUrl: "",
    statement: "",
    source: "website",
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
      console.log("[Artist Submission]", form);
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
          Submission Received
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 300, margin: "0 0 8px", color: "#ffffff" }}>Mahalo!</h3>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.7, fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif" }}>
          We&apos;ll review your portfolio and reach out if it&apos;s a fit.
          Featured artists get a profile on our site + social promotion.
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
        gap: 16,
      }}
    >
      <div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#4a9eff",
            marginBottom: 4,
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          }}
        >
          Become a Featured Artist
        </div>
        <p
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.4)",
            margin: 0,
            lineHeight: 1.6,
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          }}
        >
          We feature emerging artists who push the intersection of fine art and the Cybertruck.
          Share your work — we&apos;d love to see it.
        </p>
      </div>

      {/* Name + Email */}
      <div className="artist-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
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

      {/* X Handle + Portfolio */}
      <div className="artist-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={labelStyle}>X Handle</label>
          <input
            type="text"
            value={form.xHandle}
            onChange={(e) => update("xHandle", e.target.value)}
            placeholder="@yourhandle"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Portfolio URL</label>
          <input
            type="url"
            value={form.portfolioUrl}
            onChange={(e) => update("portfolioUrl", e.target.value)}
            placeholder="https://..."
            style={inputStyle}
          />
        </div>
      </div>

      {/* Statement */}
      <div>
        <label style={labelStyle}>Artist Statement</label>
        <textarea
          value={form.statement}
          onChange={(e) => update("statement", e.target.value)}
          placeholder="Tell us about your work, your medium, what drives you. 2-3 sentences."
          rows={3}
          style={{
            ...inputStyle,
            resize: "vertical",
            lineHeight: 1.6,
          }}
        />
      </div>

      {/* File upload note */}
      <div
        style={{
          padding: "12px 14px",
          background: "rgba(255,255,255,0.02)",
          border: "1px dashed rgba(255,255,255,0.1)",
          borderRadius: 8,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.3)",
            margin: 0,
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          }}
        >
          Include your portfolio URL above — we&apos;ll review your work there.
          File uploads coming soon via Tally integration.
        </p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        style={{
          padding: "13px 24px",
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
        {status === "submitting" ? "Submitting…" : "Submit Your Work"}
      </button>

      <style>{`
        @media (max-width: 480px) {
          .artist-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}
