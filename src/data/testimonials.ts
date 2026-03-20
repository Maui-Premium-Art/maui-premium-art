// Curated testimonials — Maui updates this file with new social proof
// Source: X posts, DMs, customer feedback

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  handle?: string;
  date: string;
  source: "x" | "dm" | "review" | "press";
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: "Just saw a Cybertruck with the Mahalo Bird wrap in Kihei. Stopped me in my tracks. This is what CT wraps should look like.",
    author: "Mike K.",
    handle: "mike_ct_owner",
    date: "Mar 2026",
    source: "x",
  },
  {
    id: "t2",
    quote: "The fact that there are only 10 of each design makes it feel like owning actual art, not a sticker.",
    author: "Sarah L.",
    date: "Mar 2026",
    source: "dm",
  },
  {
    id: "t3",
    quote: "Hawaiian art on a Cybertruck is the crossover I didn't know I needed. The tailgate wrap is fire.",
    author: "CT_Enthusiast",
    handle: "CT_Enthusiast",
    date: "Mar 2026",
    source: "x",
  },
  {
    id: "t4",
    quote: "Ordered the Fine Art Print — the colors in person are even better than on screen. Juan's work is next level.",
    author: "David R.",
    date: "Feb 2026",
    source: "review",
  },
  {
    id: "t5",
    quote: "Finally, someone treating the CT as a canvas instead of slapping generic graphics on it. Respect.",
    author: "Alex M.",
    handle: "alex_wraps",
    date: "Mar 2026",
    source: "x",
  },
  {
    id: "t6",
    quote: "The website itself feels like being inside the truck. That 3D model you can spin around? Genius.",
    author: "Jen P.",
    date: "Mar 2026",
    source: "dm",
  },
];
