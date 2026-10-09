import bridal from "@/assets/bridal.jpg";
import seasonal from "@/assets/seasonal.jpg";
import centerpiece from "@/assets/centerpiece.jpg";
import sameDay from "@/assets/same-day.jpg";
import birthday from "@/assets/birthday.jpg";
import anniversary from "@/assets/anniversary.jpg";
import celebration from "@/assets/celebration.jpg";
import sympathy from "@/assets/sympathy.jpg";
import studio from "@/assets/studio.jpg";
import wedding from "@/assets/wedding.jpg";
import gardenWedding from "@/assets/garden-wedding.jpg";
import journal from "@/assets/floral-journal.jpg";

export const studioImages = { studio, wedding, gardenWedding, journal };
export const occasions = [
  "All",
  "Wedding",
  "Birthday",
  "Anniversary",
  "Celebration",
  "Sympathy",
  "Everyday",
] as const;
export type Occasion = (typeof occasions)[number];
export interface FloralDesign {
  name: string;
  occasion: Occasion;
  image: string;
  description: string;
  price?: number;
}

// A single catalog keeps the collections and gallery in step.
export const floralDesigns: FloralDesign[] = [
  {
    name: "Birthday Brights",
    occasion: "Birthday",
    image: birthday,
    description:
      "Coral dahlias, golden ranunculus, and playful poppies. A joyful little celebration of someone you love.",
  },
  {
    name: "A Love in Bloom",
    occasion: "Anniversary",
    image: anniversary,
    description:
      "Rich garden roses and velvet burgundy dahlias, gathered together for a love worth celebrating.",
  },
  {
    name: "Golden Congratulations",
    occasion: "Celebration",
    image: celebration,
    description:
      "Sunflowers, warm orange zinnias, and cheerful daisies for new beginnings and happy milestones.",
  },
  {
    name: "A Gentle Thought",
    occasion: "Sympathy",
    image: sympathy,
    description:
      "Soft lavender roses, white lisianthus, and quiet blue delphiniums. A thoughtful gesture of comfort.",
  },
  {
    name: "Bridal Bouquets",
    occasion: "Wedding",
    image: bridal,
    price: 180,
    description:
      "Seasonal ivory blooms, delicate textures, and silk ribbons. Created to feel entirely like you.",
  },
  {
    name: "Seasonal Arrangements",
    occasion: "Everyday",
    image: seasonal,
    price: 95,
    description:
      "The loveliest stems of the season, thoughtfully composed in a sculptural ceramic vessel.",
  },
  {
    name: "Event Centerpieces",
    occasion: "Celebration",
    image: centerpiece,
    price: 220,
    description:
      "Artful arrangements that bring warmth, movement, and a little magic to your table.",
  },
  {
    name: "Same-Day Bouquets",
    occasion: "Everyday",
    image: sameDay,
    price: 75,
    description:
      "A generous gathering of the day’s most beautiful flowers, crafted with thoughtful care.",
  },
];

export function pageMetadata(title: string, description: string) {
  const fullTitle = `${title} — Atelier Bloom`;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
