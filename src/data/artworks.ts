export interface ArtFormat {
  name: string;
  price: number;
  stripePriceId?: string;
  description?: string;
}

export interface Artwork {
  slug: string;
  title: string;
  artist: string;
  artistAlias?: string;
  category: string;
  heroImage: string;
  tailgateImage: string;
  galleryImages?: string[];
  description: string;
  formats: ArtFormat[];
  relatedSlugs?: string[];
}

// Shared formats — all pieces use same pricing + Stripe IDs
const STANDARD_FORMATS: ArtFormat[] = [
  { name: "Cybertruck Tailgate Wrap", price: 895, stripePriceId: "price_1TDvX5K94uWlASEifRAnTYpT" },
  { name: "Original Art Piece", price: 4995, stripePriceId: "price_1TDvZwK94uWlASEiQX41bZmg" },
  { name: "Metallic Print", price: 1295, stripePriceId: "price_1TDvaLK94uWlASEib1cL8APn" },
  { name: "Fine Art Print", price: 395, stripePriceId: "price_1TDvazK94uWlASEiCwoGWRTY" },
  { name: "Gallery Canvas", price: 895, stripePriceId: "price_1TDvbOK94uWlASEiQTid6cB9" },
];

export const artworks: Artwork[] = [
  {
    slug: "mahalo-bird",
    title: "Mahalo Bird",
    artist: "Juan Linnon Ellis",
    artistAlias: "Frog One",
    category: "Juan Linnon Ellis Collection",
    heroImage: "/images/tailgate-art/mahalo-bird_tailgate.jpg",
    tailgateImage: "/images/tailgate-art/mahalo-bird_tailgate.jpg",
    galleryImages: [
      "/images/tailgate-art/mahalo-bird_tailgate.jpg",
      "/images/mahalo-bird/electric-prr-hummingbird.jpg",
      "/images/mahalo-bird/wrap-tailgate.jpg",
      "/images/mahalo-bird/wrap-2.jpg",
    ],
    description:
      "Infuse your Cybertruck with the radiant Aloha Spirit of the islands with this stunning tailgate wrap, hand-designed by talented Hawaiian artist, Juan Linnon Ellis aka Frog One.\n\nThis masterpiece transforms your tailgate into a cosmic celebration of island soul: swirling nebulae-inspired clouds in deep blues, teals, and purples blend seamlessly with bursts of golden yellow and sunset hues. At the heart glows bold, flowing script that channels pure island energy, while a majestic hummingbird soars through the dreamlike sky, trailing vibrant energy and symbolizing the joy and freedom of Hawaii.",
    formats: STANDARD_FORMATS,
    relatedSlugs: ["humming-bird", "aloha"],
  },
  {
    slug: "aloha",
    title: "Aloha",
    artist: "Juan Linnon Ellis",
    artistAlias: "Frog One",
    category: "Juan Linnon Ellis Collection",
    heroImage: "/images/tailgate-art/aloha_tailgate.webp",
    tailgateImage: "/images/tailgate-art/aloha_tailgate.webp",
    description: "Pure aloha spirit captured in vibrant color. A celebration of Hawaiian warmth and welcome, designed to turn your Cybertruck tailgate into a beacon of island soul.",
    formats: STANDARD_FORMATS,
    relatedSlugs: ["mahalo-bird", "sunset"],
  },
  {
    slug: "eyes-of-the-world",
    title: "Eyes of the World",
    artist: "Juan Linnon Ellis",
    artistAlias: "Frog One",
    category: "Juan Linnon Ellis Collection",
    heroImage: "/images/tailgate-art/eyes-of-the-world_tailgate.jpg",
    tailgateImage: "/images/tailgate-art/eyes-of-the-world_tailgate.jpg",
    description: "A visionary piece that channels cosmic awareness through Hawaiian artistic tradition. Bold, watching, alive — this wrap makes your CT a moving meditation on perspective and presence.",
    formats: STANDARD_FORMATS,
    relatedSlugs: ["pono", "heart"],
  },
  {
    slug: "heart",
    title: "Heart",
    artist: "Juan Linnon Ellis",
    artistAlias: "Frog One",
    category: "Juan Linnon Ellis Collection",
    heroImage: "/images/tailgate-art/heart_tailgate.jpg",
    tailgateImage: "/images/tailgate-art/heart_tailgate.jpg",
    description: "Love rendered in bold strokes and rich color. This piece transforms your Cybertruck into a rolling expression of heart and connection — art that speaks before words do.",
    formats: STANDARD_FORMATS,
    relatedSlugs: ["lovers", "aloha"],
  },
  {
    slug: "humming-bird",
    title: "Humming Bird",
    artist: "Juan Linnon Ellis",
    artistAlias: "Frog One",
    category: "Juan Linnon Ellis Collection",
    heroImage: "/images/tailgate-art/humming-bird_tailgate.jpg",
    tailgateImage: "/images/tailgate-art/humming-bird_tailgate.jpg",
    description: "A companion piece to the Mahalo Bird — this hummingbird captures the joy and freedom of Hawaiian wildlife in flight. Vibrant, kinetic energy frozen in fine art form on your CT tailgate.",
    formats: STANDARD_FORMATS,
    relatedSlugs: ["mahalo-bird", "music"],
  },
  {
    slug: "lovers",
    title: "Lovers",
    artist: "Juan Linnon Ellis",
    artistAlias: "Frog One",
    category: "Juan Linnon Ellis Collection",
    heroImage: "/images/tailgate-art/lovers_tailgate.jpg",
    tailgateImage: "/images/tailgate-art/lovers_tailgate.jpg",
    description: "Two souls intertwined in color and form. A romantic masterpiece that turns your Cybertruck into a moving canvas of connection, painted with the warmth of Hawaiian sunsets.",
    formats: STANDARD_FORMATS,
    relatedSlugs: ["heart", "sunset"],
  },
  {
    slug: "music",
    title: "Music",
    artist: "Juan Linnon Ellis",
    artistAlias: "Frog One",
    category: "Juan Linnon Ellis Collection",
    heroImage: "/images/tailgate-art/music_tailgate.jpg",
    tailgateImage: "/images/tailgate-art/music_tailgate.jpg",
    description: "Sound made visible. Hawaiian rhythm and melody rendered as fine art — every note a color, every beat a brushstroke. Your CT becomes a rolling concert of visual harmony.",
    formats: STANDARD_FORMATS,
    relatedSlugs: ["humming-bird", "aloha"],
  },
  {
    slug: "pono",
    title: "Pono",
    artist: "Juan Linnon Ellis",
    artistAlias: "Frog One",
    category: "Juan Linnon Ellis Collection",
    heroImage: "/images/tailgate-art/pono_tailgate.jpg",
    tailgateImage: "/images/tailgate-art/pono_tailgate.jpg",
    description: "Pono — righteousness, balance, harmony. This piece embodies the Hawaiian principle of living in alignment. Bold composition meets spiritual depth on your Cybertruck tailgate.",
    formats: STANDARD_FORMATS,
    relatedSlugs: ["eyes-of-the-world", "aloha"],
  },
  {
    slug: "sunset",
    title: "Sunset",
    artist: "Juan Linnon Ellis",
    artistAlias: "Frog One",
    category: "Juan Linnon Ellis Collection",
    heroImage: "/images/tailgate-art/sunset_tailgate.jpg",
    tailgateImage: "/images/tailgate-art/sunset_tailgate.jpg",
    description: "A Maui sunset distilled into fine art. Golden hour meets stainless steel — warm hues cascading across your CT tailgate like the last light over Kihei. Every day ends beautiful.",
    formats: STANDARD_FORMATS,
    relatedSlugs: ["aloha", "lovers"],
  },
];

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return artworks.map((a) => a.slug);
}
