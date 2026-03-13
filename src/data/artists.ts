// Artists page data — edit here to update content
// Last updated: 2026-03-12

export interface SpotlightArtist {
  id: string;
  name: string;
  handle: string; // without @
  profileUrl: string;
  imageUrl: string;
  bio: string; // one sentence max
  medium?: string;
}

export interface FeaturedArtist {
  id: string;
  name: string;
  publicName: string; // brand/public name
  handle: string;
  profileUrl: string;
  heroImageUrl: string; // large artwork image
  portraitImageUrl?: string;
  tagline: string;
  story: string; // 2–3 sentences
  medium: string;
  location: string;
  shopUrl?: string;
}

// ─── ANCHOR ARTIST — Juan / Hulali Lā ───────────────────────────────────────
// This is Boss. His page. His story. Ships at launch.

export const featuredArtist: FeaturedArtist = {
  id: "hulali-la",
  name: "Juan Linnon Ellis",
  publicName: "Hulali Lā ☀️",
  handle: "Maui_PremiumArt",
  profileUrl: "https://x.com/Maui_PremiumArt",
  heroImageUrl: "/images/mahalo-bird/wrap-2.jpg",
  tagline: "Fine art born in Maui. Made for the Cybertruck.",
  story:
    "Juan Linnon Ellis is a painter from Maui whose work draws on the color, spirit, and depth of Hawaiian culture. The Mahalo Bird wasn't adapted for the Cybertruck — it was conceived for it. Original fine art vinyl wraps, limited to 10 per design.",
  medium: "Fine Art / Vinyl Wrap",
  location: "Maui, Hawaiʻi",
  shopUrl: "https://mauipremiumart.com",
};

// ─── UP AND COMING ───────────────────────────────────────────────────────────
// Curated monthly. Outreach before featuring. One image, one sentence.

export const upAndComingArtists: SpotlightArtist[] = [
  {
    id: "john_fasano",
    name: "John Fasano",
    handle: "john_fasano",
    profileUrl: "https://x.com/john_fasano",
    imageUrl: "https://unavatar.io/twitter/john_fasano",
    bio: "My time is fleeting, but my paintings are eternal.",
    medium: "Painting",
  },
  {
    id: "christina_meca",
    name: "Christina Meca",
    handle: "ChristinaMeca",
    profileUrl: "https://x.com/ChristinaMeca",
    imageUrl: "https://unavatar.io/twitter/ChristinaMeca",
    bio: "Emerging artist working in vibrant, luminous color.",
    medium: "Painting",
  },
  {
    id: "noosh_naomi",
    name: "Noosh Naomi",
    handle: "Noosh_Naomi",
    profileUrl: "https://x.com/Noosh_Naomi",
    imageUrl: "https://unavatar.io/twitter/Noosh_Naomi",
    bio: "Happy artist who loves neon — joy made visible.",
    medium: "Neon",
  },
  {
    id: "joeysart",
    name: "Joey",
    handle: "Joeysart58616",
    profileUrl: "https://x.com/Joeysart58616",
    imageUrl: "https://unavatar.io/twitter/Joeysart58616",
    bio: "Original digital artwork crafted with emotion.",
    medium: "Digital",
  },
  {
    id: "alicia_loy",
    name: "Alicia Loy Griffin",
    handle: "AliciaLoyGriff2",
    profileUrl: "https://x.com/AliciaLoyGriff2",
    imageUrl: "https://unavatar.io/twitter/AliciaLoyGriff2",
    bio: "Sculptural concept prototypes at the edge of form and function.",
    medium: "Sculpture",
  },
  {
    id: "art_aja_oi",
    name: "Aja Oi",
    handle: "art_aja_oi",
    profileUrl: "https://x.com/art_aja_oi",
    imageUrl: "https://unavatar.io/twitter/art_aja_oi",
    bio: "Artist and philosopher — making sense of the world one piece at a time.",
    medium: "Mixed",
  },
];

// Refresh cadence: 1st of each month, aligned with hashtag-review cron
// Outreach note: confirm permission with each artist before featuring
export const lastRefreshed = "2026-03-01";
export const nextRefresh = "2026-04-01";
