import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pageMetadata, studioImages } from "@/data/flowers";

export const Route = createFileRoute("/weddings")({
  head: () =>
    pageMetadata(
      "Weddings & Celebrations",
      "Bespoke bridal bouquets, colorful ceremony arches, and candlelit tablescapes for meaningful weddings and celebrations.",
    ),
  component: WeddingsPage,
});

function WeddingsPage() {
  return (
    <main>
      <section className="hero wedding-hero">
        <img
          className="hero-photo"
          src={studioImages.gardenWedding}
          alt="Coral, peach, and lavender floral arch at a garden wedding"
          width={1536}
          height={1024}
          fetchPriority="high"
        />
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow hero-label">WEDDINGS & CELEBRATIONS</p>
            <h1>
              Wedding
              <br />
              flowers,
              <br />
              with feeling.
            </h1>
            <p className="hero-description">
              A celebration of your story, in every color, every petal, and every unforgettable
              little detail.
            </p>
            <Button variant="botanical" asChild>
              <Link to="/contact" search={{ service: "Wedding", design: "" }}>
                START PLANNING <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="wedding-details container">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">FROM THE FIRST STEM TO THE LAST DANCE</p>
            <h2 className="section-title">Beautifully yours.</h2>
          </div>
          <p className="copy">
            Intimate, abundant, understated, or full of color.
            <br />
            We’ll find the flowers that feel like you.
          </p>
        </div>
        <div className="wedding-services">
          {[
            {
              title: "The bridal bouquet",
              image: studioImages.journal,
              text: "Personal flowers with graceful movement, seasonal textures, and colors that tell your story.",
            },
            {
              title: "A moment to say “I do”",
              image: studioImages.gardenWedding,
              text: "Garden-inspired ceremony flowers, from delicate aisle accents to a joyful sculptural arch.",
            },
            {
              title: "A table to remember",
              image: studioImages.wedding,
              text: "Thoughtful centerpieces, candlelight, and beautiful details that bring everyone together.",
            },
          ].map((item) => (
            <article key={item.title}>
              <img src={item.image} alt={item.title} width={1536} height={1024} loading="lazy" />
              <h3>{item.title}</h3>
              <p className="copy">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="planning-band">
        <div className="container">
          <p className="eyebrow">LET’S BEGIN</p>
          <h2 className="section-title">First, tell us your story.</h2>
          <p className="copy">
            Share your date, setting, and the flowers you’re dreaming of. We’ll take it from there.
          </p>
          <Button variant="botanical" asChild>
            <Link to="/contact" search={{ service: "Wedding", design: "" }}>
              MAKE A WEDDING INQUIRY <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
