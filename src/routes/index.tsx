import { createFileRoute, Link } from "@tanstack/react-router";
import { Flower2, Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloralCatalog } from "@/components/atelier/floral-catalog";
import { SocialLinks } from "@/components/atelier/site-layout";
import { pageMetadata, studioImages } from "@/data/flowers";
import hero from "@/assets/atelier-hero.jpg";

export const Route = createFileRoute("/")({
  head: () =>
    pageMetadata(
      "Artful Flowers, Naturally",
      "Bespoke flowers for birthdays, anniversaries, weddings, and everyday moments. Discover Atelier Bloom, a botanical studio in Portland.",
    ),
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      <section className="hero" aria-label="Atelier Bloom floral design">
        <img
          className="hero-photo"
          src={hero}
          alt="Blush and ivory flowers in a ceramic vase in the sunlit atelier"
          width={1536}
          height={1024}
          fetchPriority="high"
        />
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="eyebrow hero-label">
              ARTFULLY ROOTED, BEAUTIFULLY YOU <Leaf />
            </div>
            <h1>
              Flowers
              <br />
              Styled Like
              <br />
              Living Art
            </h1>
            <p className="hero-description">
              Thoughtful floral design for life’s most meaningful moments. Handcrafted with
              intention, inspired by nature.
            </p>
            <div className="hero-actions">
              <Button variant="botanical" asChild>
                <Link to="/collections">
                  EXPLORE COLLECTIONS <ArrowRight />
                </Link>
              </Button>
              <Button variant="botanicalText" asChild>
                <Link to="/about">
                  OUR STORY <ArrowRight />
                </Link>
              </Button>
            </div>
            <SocialLinks />
          </div>
        </div>
        <div className="hero-seal">
          <Flower2 />
          <span>SUSTAINABLY SOURCED</span>
          <span>LOCALLY LOVED</span>
        </div>
      </section>
      <section className="home-occasions container">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">LIFE IN FULL COLOR</p>
            <h2 className="section-title">A flower for every feeling.</h2>
          </div>
          <Button variant="botanicalOutline" asChild>
            <Link to="/collections">
              ALL COLLECTIONS <ArrowRight />
            </Link>
          </Button>
        </div>
        <FloralCatalog featured />
      </section>
      <section className="about">
        <img
          className="about-photo"
          src={studioImages.studio}
          alt="Flowers and pottery on the atelier work table"
          loading="lazy"
          width={1280}
          height={1024}
        />
        <div className="about-content">
          <p className="eyebrow">OUR BOTANICAL STUDIO</p>
          <h2 className="section-title">
            Rooted in Nature.
            <br />
            Designed with Soul.
          </h2>
          <p className="copy">
            We follow the seasons, celebrate the unexpected, and let every stem find its own
            beautiful place. Thoughtful flowers, made for you.
          </p>
          <Button className="mt-6" variant="botanicalOutline" asChild>
            <Link to="/about">
              MEET THE ATELIER <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
      <section className="home-wedding container">
        <div>
          <p className="eyebrow">WEDDINGS & CELEBRATIONS</p>
          <h2 className="section-title">
            Your day.
            <br />
            In beautiful bloom.
          </h2>
          <p className="copy">
            From quiet vows to joyful garden gatherings, we create flowers that feel like a part of
            your story.
          </p>
          <Button variant="botanical" asChild>
            <Link to="/weddings">
              EXPLORE WEDDINGS <ArrowRight />
            </Link>
          </Button>
        </div>
        <img
          src={studioImages.gardenWedding}
          alt="Colorful garden wedding flower arch"
          loading="lazy"
          width={1536}
          height={1024}
        />
      </section>
    </main>
  );
}
