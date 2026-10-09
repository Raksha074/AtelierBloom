import { createFileRoute } from "@tanstack/react-router";
import { FloralCatalog } from "@/components/atelier/floral-catalog";
import { FlowerFinder } from "@/components/atelier/flower-finder";
import { PageHeading } from "@/components/atelier/page-heading";
import { pageMetadata } from "@/data/flowers";

export const Route = createFileRoute("/collections")({
  head: () =>
    pageMetadata(
      "Floral Collections",
      "Discover colorful flowers for birthdays, anniversaries, weddings, celebrations, sympathy, and everyday moments.",
    ),
  component: CollectionsPage,
});

function CollectionsPage() {
  return (
    <main className="content-page container">
      <PageHeading
        label="FLOWERS, WITH FEELING"
        title="Collections for every occasion"
        description="Joyful brights. Romantic roses. Quiet gestures of care. Find the flowers that say it your way."
      />
      <FlowerFinder />
      <FloralCatalog />
    </main>
  );
}
