import { createFileRoute } from "@tanstack/react-router";
import { FloralCatalog } from "@/components/atelier/floral-catalog";
import { PageHeading } from "@/components/atelier/page-heading";
import { pageMetadata, studioImages } from "@/data/flowers";

export const Route = createFileRoute("/gallery")({
  head: () =>
    pageMetadata(
      "The Floral Gallery",
      "Explore vivid birthday flowers, romantic roses, seasonal arrangements, and colorful wedding inspiration from Atelier Bloom.",
    ),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <main className="content-page container">
      <PageHeading
        label="A GLIMPSE OF OUR WORLD"
        title="In full bloom"
        description="Color, texture, and a little botanical magic. Moments and arrangements from the atelier."
      />
      <FloralCatalog gallery />
      <section className="gallery-wide">
        <img
          src={studioImages.gardenWedding}
          alt="Garden wedding floral arch in coral and lavender"
          width={1536}
          height={1024}
          loading="lazy"
        />
        <img
          src={studioImages.wedding}
          alt="Candlelit floral wedding table"
          width={1024}
          height={1024}
          loading="lazy"
        />
      </section>
    </main>
  );
}
