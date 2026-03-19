"use client";

import Panel from "@/components/ui/Panel";

interface StoryPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function StoryPanel({ open, onClose }: StoryPanelProps) {
  return (
    <Panel open={open} onClose={onClose} direction="right" width="400px" title="Our Story">
      {/* Kihei label */}
      <div
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#4a9eff",
          marginBottom: 14,
          fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
        }}
      >
        Kihei, Maui
      </div>

      <h2
        style={{
          fontSize: 22,
          fontWeight: 300,
          margin: "0 0 16px",
          color: "#ffffff",
          lineHeight: 1.3,
          fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
        }}
      >
        Where Hawaiian art meets the future of driving.
      </h2>

      <Section title="The Artist">
        Juan Linnon Ellis is a painter from Maui. His work draws on the color, spirit,
        and depth of Hawaiian culture — not as decoration, but as language. Under the
        name Hulali Lā ☀️, he creates original artwork designed specifically for the Cybertruck.
      </Section>

      <Section title="The Vision">
        The Cybertruck is the most futuristic vehicle on the road. It deserves art
        that matches — not generic graphics from a template, but original fine art
        with soul, story, and scarcity. We limit every design to 10 wraps.
        When they&apos;re gone, they&apos;re gone.
      </Section>

      <Section title="The Place">
        Everything starts in Kihei, on the south shore of Maui. The light here is different —
        golden, warm, the kind of light that makes you see color differently. Hawaiian culture
        isn&apos;t a theme we borrow — it&apos;s where we live, and it shapes everything we make.
      </Section>

      {/* Lore callout */}
      <div
        style={{
          background: "rgba(74,158,255,0.04)",
          border: "1px solid rgba(74,158,255,0.12)",
          borderRadius: 10,
          padding: "16px 14px",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#4a9eff",
            marginBottom: 8,
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          }}
        >
          The Lore
        </div>
        <p
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.55)",
            margin: 0,
            lineHeight: 1.7,
            fontStyle: "italic",
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          }}
        >
          &ldquo;Hawaiian culture meets the future. Not cyberpunk, not Star Trek —
          Hawaiians at the forefront of interstellar travel. The vocabulary is Hawaiian.
          The spirit is Hawaiian. The medium is futuristic.&rdquo;
        </p>
      </div>

      {/* Footer */}
      <div
        style={{
          fontSize: 11,
          color: "rgba(255,255,255,0.18)",
          fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          paddingTop: 12,
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        Art by Hulali Lā · mauipremiumart.com
      </div>
    </Panel>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h3
        style={{
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.45)",
          margin: "0 0 8px",
          paddingBottom: 6,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 13,
          color: "rgba(255,255,255,0.55)",
          margin: 0,
          lineHeight: 1.8,
          fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
        }}
      >
        {children}
      </p>
    </div>
  );
}
