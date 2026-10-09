import { createFileRoute, Link } from "@tanstack/react-router";
import { Sprout, Heart, HandHeart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/atelier/page-heading";
import { pageMetadata, studioImages } from "@/data/flowers";

export const Route = createFileRoute("/about")({
  head: () =>
    pageMetadata(
      "Our Botanical Studio",
      "Meet Atelier Bloom: a Portland floral studio devoted to seasonal flowers, bespoke design, and thoughtful, foam-free floristry.",
    ),
  component: AboutPage,
});

const values = [
  {
    icon: Sprout,
    title: "Led by nature",
    text: "We work with seasonal flowers and local growers, embracing the movement and character of each stem.",
  },
  {
    icon: Heart,
    title: "Made for your story",
    text: "No two moments are the same. Your flowers should feel personal, expressive, and entirely your own.",
  },
  {
    icon: HandHeart,
    title: "Care in every detail",
    text: "From foam-free arrangements to thoughtful materials, a gentler approach is at the heart of our work.",
  },
];

function AboutPage() {
  return (
    <main className="content-page container">
      <PageHeading
        label="OUR STORY"
        title="Rooted in nature. Designed with soul."
        description="A love for flowers. An eye for the unexpected. A belief that beauty belongs in the everyday."
      />
      <img
        className="story-cover"
        src={studioImages.studio}
        alt="Sunlight falling across the florist’s workshop"
        width={1280}
        height={1024}
      />
      <section className="editorial-story">
        <h2 className="section-title">
          A little world,
          <br />
          made of flowers.
        </h2>
        <div>
          <p>
            Atelier Bloom is a botanical studio in Portland, Oregon. Our work begins with the
            season: the first garden roses, a graceful branch, a flower with a beautifully unruly
            shape.
          </p>
          <p>
            We arrange slowly and intentionally, creating flowers that feel alive rather than
            perfectly still. Whether it’s a small gift or a room full of celebration, we bring the
            same care to every stem.
          </p>
          <Button variant="botanicalOutline" asChild>
            <Link to="/contact">
              LET’S MAKE SOMETHING BEAUTIFUL <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
      <section className="values-grid">
        {values.map((value) => (
          <div key={value.title}>
            <value.icon />
            <h3>{value.title}</h3>
            <p className="copy">{value.text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
