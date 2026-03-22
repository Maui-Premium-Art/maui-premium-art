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
  galleryImages?: string[];
  description: string;
  formats: ArtFormat[];
  relatedSlugs?: string[];
}

export const artworks: Artwork[] = [
  {
    slug: "mahalo-bird",
    title: "Mahalo Bird",
    artist: "Juan Linnon Ellis",
    artistAlias: "Frog One",
    category: "Juan Linnon Ellis Collection",
    heroImage: "/images/mahalo-bird/electric-prr-hummingbird.jpg",
    galleryImages: [
      "/images/mahalo-bird/electric-prr-hummingbird.jpg",
      "/images/mahalo-bird/wrap-tailgate.jpg",
      "/images/mahalo-bird/wrap-2.jpg",
      "/images/mahalo-bird/wrap-5.jpg",
    ],
    description:
      "Infuse your Cybertruck with the radiant Aloha Spirit of the islands with this stunning tailgate wrap, hand-designed by talented Hawaiian artist, Juan Linnon Ellis aka Frog One.\n\nThis masterpiece transforms your tailgate into a cosmic celebration of island soul: swirling nebulae-inspired clouds in deep blues, teals, and purples blend seamlessly with bursts of golden yellow and sunset hues. At the heart glows bold, flowing script that channels pure island energy, while a majestic hummingbird soars through the dreamlike sky, trailing vibrant energy and symbolizing the joy and freedom of Hawaii.\n\nPerfect for those who want to carry the lush beauty of the tropics, ancient Polynesian essence, and starry island nights wherever the road takes them. Durable, high-quality vinyl wrap engineered specifically for the Cybertruck tailgate — weather-resistant, easy to apply, and built to turn heads with timeless Hawaiian style.",
    formats: [
      { name: "Cybertruck Tailgate Wrap", price: 895, stripePriceId: "price_1TDvX5K94uWlASEifRAnTYpT" },
      { name: "Original Art Piece", price: 4995, stripePriceId: "price_1TDvZwK94uWlASEiQX41bZmg" },
      { name: "Metallic Print", price: 1295, stripePriceId: "price_1TDvaLK94uWlASEib1cL8APn" },
      { name: "Fine Art Print", price: 395, stripePriceId: "price_1TDvazK94uWlASEiCwoGWRTY" },
      { name: "Gallery Canvas", price: 895, stripePriceId: "price_1TDvbOK94uWlASEiQTid6cB9" },
    ],
    relatedSlugs: [],
  },
];

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return artworks.map((a) => a.slug);
}
