import { createFileRoute } from "@tanstack/react-router";
import { InquiryForm } from "@/components/atelier/inquiry-form";
import { PageHeading } from "@/components/atelier/page-heading";
import { pageMetadata, studioImages } from "@/data/flowers";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { service?: string | undefined; design?: string | undefined } => ({
    service: typeof search["service"] === "string" ? search["service"] : undefined,
    design: typeof search["design"] === "string" ? search["design"] : undefined,
  }),
  head: () =>
    pageMetadata(
      "Contact & Floral Inquiries",
      "Tell Atelier Bloom about your wedding, special occasion, or custom floral vision. Visit our Portland botanical studio by appointment.",
    ),
  component: ContactPage,
});

function ContactPage() {
  const { service = "", design = "" } = Route.useSearch();
  return (
    <main className="content-page container">
      <PageHeading
        label="LET’S CREATE SOMETHING BEAUTIFUL"
        title="Your story starts here"
        description="A celebration, a thoughtful gift, or simply a love of flowers. Tell us what you have in mind."
      />
      <div className="contact-layout">
        <div className="contact-studio">
          <img
            src={studioImages.journal}
            alt="Colorful garden flowers and silk ribbons on the studio table"
            width={1536}
            height={1024}
          />
          <h2 className="section-title">Come say hello.</h2>
          <p className="copy">
            Portland, Oregon · Visits by appointment
            <br />
            Tuesday–Saturday, 10am–6pm
            <br />
            Sunday–Monday by appointment
          </p>
        </div>
        <section className="inquiry">
          <p className="eyebrow">ORDER OR INQUIRY</p>
          <h2 className="section-title">Let’s talk flowers.</h2>
          <p className="copy">Share a few details, and a little of your inspiration.</p>
          <InquiryForm key={`${service}-${design}`} initialService={service} design={design} />
        </section>
      </div>
    </main>
  );
}
