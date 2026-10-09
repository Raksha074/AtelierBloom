import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PageHeading } from "@/components/atelier/page-heading";
import { pageMetadata, studioImages, floralDesigns } from "@/data/flowers";

export const Route = createFileRoute("/journal")({
  head: () =>
    pageMetadata(
      "Notes from the Atelier",
      "Seasonal floral inspiration, colorful occasion guides, and thoughtful flower care from the Atelier Bloom journal.",
    ),
  component: JournalPage,
});

const stories = [
  {
    title: "A love letter to color",
    category: "SEASONAL INSPIRATION",
    image: studioImages.journal,
    excerpt: "Coral, lilac, butter yellow. Letting the season set the palette.",
    text: "A palette can begin with just one flower. A coral dahlia invites a soft lilac sweet pea; a golden ranunculus brings the whole arrangement to life. Rather than matching everything perfectly, we look for colors that bring out the best in each other. The result is a garden-inspired gathering that feels joyful, expressive, and full of movement.",
  },
  {
    title: "Flowers that say it for you",
    category: "THE OCCASION EDIT",
    image: floralDesigns[0]?.image ?? studioImages.journal,
    excerpt: "From a birthday wish to a quiet gesture of care, choose flowers with feeling.",
    text: "For birthdays, we love playful shapes and generous color: dahlias, poppies, and golden ranunculus. For anniversaries, roses and deep-toned dahlias feel romantic without being predictable. A thoughtful sympathy arrangement calls for softer tones, gentle movement, and space to breathe. There is no single right flower — the loveliest choice is always the one that feels personal.",
  },
  {
    title: "A little care goes a long way",
    category: "FLOWER CARE",
    image: studioImages.studio,
    excerpt: "Simple rituals to keep your flowers looking lovely for longer.",
    text: "Begin with a clean vase and fresh, cool water. Trim the stems at an angle and remove any foliage below the waterline. Keep your arrangement away from direct sunlight, heaters, and ripening fruit. Refresh the water regularly, and give the stems another little trim. As individual flowers fade, remove them gently and let the arrangement evolve.",
  },
];

function JournalPage() {
  const [selectedStory, setSelectedStory] = useState<(typeof stories)[number] | null>(null);
  return (
    <main className="content-page container">
      <PageHeading
        label="THE JOURNAL"
        title="Notes from the atelier"
        description="Seasonal discoveries, little floral rituals, and beautiful things worth sharing."
      />
      <div className="journal-grid">
        {stories.map((story) => (
          <article key={story.title}>
            <img src={story.image} alt={story.title} width={1536} height={1024} loading="lazy" />
            <p className="eyebrow">{story.category}</p>
            <h2>{story.title}</h2>
            <p className="copy">{story.excerpt}</p>
            <Button variant="botanicalText" onClick={() => setSelectedStory(story)}>
              READ THE STORY <ArrowRight />
            </Button>
          </article>
        ))}
      </div>
      <Dialog
        open={selectedStory !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedStory(null);
        }}
      >
        <DialogContent className="preview-dialog">
          {selectedStory && (
            <>
              <DialogTitle>{selectedStory.title}</DialogTitle>
              <img
                className="preview-photo"
                src={selectedStory.image}
                alt={selectedStory.title}
                width={1536}
                height={1024}
              />
              <DialogDescription className="article-text">{selectedStory.text}</DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
