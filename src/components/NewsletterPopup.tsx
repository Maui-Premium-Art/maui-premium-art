"use client";

import { useState, useEffect } from "react";
import NewsletterSignup from "@/components/NewsletterSignup";

const POPUP_KEY = "mpa-newsletter-dismissed";
const POPUP_DELAY_MS = 8000; // Show after 8 seconds

export default function NewsletterPopup() {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem(POPUP_KEY)) return;

    const timer = setTimeout(() => {
      setShow(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    }, POPUP_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(POPUP_KEY, "1");
    setTimeout(() => setShow(false), 300);
  };

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 68,
        right: 12,
        left: 12,
        zIndex: 60,
        width: "auto",
        maxWidth: 320,
        marginLeft: "auto",
        background: "rgba(12,12,20,0.95)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 14,
        padding: "20px 16px 16px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
      role="dialog"
      aria-label="Newsletter signup"
    >
      {/* Close button */}
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          background: "none",
          border: "none",
          color: "rgba(255,255,255,0.3)",
          fontSize: 16,
          cursor: "pointer",
          padding: "2px 6px",
          lineHeight: 1,
        }}
      >
        ×
      </button>

      <div
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: "#ffffff",
          marginBottom: 4,
          fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
        }}
      >
        Stay in the loop
      </div>
      <div
        style={{
          fontSize: 12,
          color: "rgba(255,255,255,0.4)",
          marginBottom: 14,
          lineHeight: 1.5,
          fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
        }}
      >
        New editions, wrap reveals, and studio drops. No spam.
      </div>

      <NewsletterSignup source="popup" compact />
    </div>
  );
}
