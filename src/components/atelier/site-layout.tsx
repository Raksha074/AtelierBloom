import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Flower2, Instagram, Facebook, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Home", to: "/" },
  { name: "Collections", to: "/collections" },
  { name: "About", to: "/about" },
  { name: "Weddings", to: "/weddings" },
  { name: "Gallery", to: "/gallery" },
  { name: "Journal", to: "/journal" },
  { name: "Contact", to: "/contact" },
] as const;

export function SocialLinks({ footer = false }: { footer?: boolean }) {
  return (
    <div className={footer ? "footer-socials" : "socials"}>
      <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
        <Instagram />
      </a>
      <a href="https://www.pinterest.com/" target="_blank" rel="noreferrer" aria-label="Pinterest">
        <span className="pinterest">p</span>
      </a>
      <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
        <Facebook />
      </a>
    </div>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <header className="header container">
        <Link className="brand" to="/" aria-label="Atelier Bloom home">
          <Flower2 className="brand-flower" />
          <div>
            <div className="brand-name">
              ATELIER
              <br />
              BLOOM
            </div>
            <div className="brand-sub eyebrow">BOTANICAL STUDIO</div>
          </div>
        </Link>
        <nav className="nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.to} to={item.to} className={pathname === item.to ? "active" : ""}>
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="header-tools">
          <Button variant="botanicalOutline" asChild>
            <Link to="/contact">ORDER INQUIRY</Link>
          </Button>
          <Button
            variant="botanicalIcon"
            className="menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>
      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)}>
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}

export function SiteFooter() {
  const [subscribed, setSubscribed] = useState(false);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-newsletter">
            <h2 className="eyebrow">STAY IN BLOOM</h2>
            <p>
              Floral inspiration, seasonal updates,
              <br />
              and little notes from the studio.
            </p>
            {subscribed ? (
              <p role="status" className="mt-3">
                Thank you for joining us.
                <br />
                Preview only — subscription not saved.
              </p>
            ) : (
              <form
                className="newsletter"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubscribed(true);
                }}
              >
                <input
                  className="newsletter-input"
                  aria-label="Newsletter email address"
                  type="email"
                  placeholder="Your email address"
                  required
                />
                <Button variant="botanicalIcon" type="submit" aria-label="Subscribe to newsletter">
                  <ArrowRight />
                </Button>
              </form>
            )}
          </div>
          <div>
            <h2 className="eyebrow">OUR STUDIO</h2>
            <p>
              Portland, Oregon
              <br />
              Visits by appointment
            </p>
            <Link to="/contact">Get in touch →</Link>
          </div>
          <div>
            <h2 className="eyebrow">OPENING HOURS</h2>
            <p>
              Tuesday – Saturday
              <br />
              10:00 AM – 6:00 PM
              <br />
              Sunday & Monday
              <br />
              By appointment
            </p>
          </div>
          <div>
            <h2 className="eyebrow">EXPLORE</h2>
            <div className="footer-page-links">
              <Link to="/collections">Collections</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/journal">Journal</Link>
            </div>
            <SocialLinks footer />
          </div>
          <div className="monogram" aria-hidden="true">
            <Flower2 />
            AB
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Atelier Bloom Botanical Studio.</span>
          <span>Made with flowers & a little love.</span>
        </div>
      </div>
    </footer>
  );
}
