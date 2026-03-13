// New Artists Spotlight — monthly refresh file
// To update: edit this list, commit, and deploy. No other changes needed.
// Last updated: 2026-03-12

export interface SpotlightArtist {
  id: string;
  name: string;
  handle: string; // without @
  profileUrl: string;
  imageUrl: string; // profile photo or artwork — swap as outreach completes
  bio: string; // one sentence max
  medium?: string; // optional: painting, digital, neon, etc.
  featured?: boolean; // pin to top of grid
}

export const spotlightArtists: SpotlightArtist[] = [
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
