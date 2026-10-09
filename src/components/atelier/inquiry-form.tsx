import { useState, type FormEvent } from "react";
import { ArrowRight, Flower2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InquiryForm({
  initialService = "",
  design = "",
}: {
  initialService?: string;
  design?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState(initialService);

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted)
    return (
      <div className="confirmation" role="status">
        <Flower2 />
        <h3>Thank you, beautifully.</h3>
        <p className="copy">Your vision is the beginning of something wonderful.</p>
        <p className="form-note">Preview confirmation only — no inquiry has been sent.</p>
        <Button variant="botanicalOutline" onClick={() => setSubmitted(false)}>
          SEND ANOTHER INQUIRY <ArrowRight />
        </Button>
      </div>
    );

  return (
    <form className="contact-form" onSubmit={submitInquiry}>
      <div className="form-grid">
        <label className="field">
          Full Name
          <input name="name" placeholder="Your full name" autoComplete="name" required />
        </label>
        <label className="field">
          Email Address
          <input
            name="email"
            type="email"
            placeholder="Email address"
            autoComplete="email"
            required
          />
        </label>
        <label className="field">
          Event or Delivery Date
          <input name="date" type="date" required />
        </label>
        <label className="field">
          Service Type
          <select value={service} onChange={(event) => setService(event.target.value)} required>
            <option value="" disabled>
              Choose a service
            </option>
            {["Wedding", "Private Event", "Weekly Delivery", "Custom Order"].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="field field-wide">
          Message / Floral Vision
          <textarea
            name="message"
            placeholder="Tell us a little about your vision…"
            defaultValue={design ? `I’d love to know more about ${design}.` : ""}
            required
          />
        </label>
      </div>
      <Button className="inquiry-submit" variant="botanical" type="submit">
        SEND INQUIRY <ArrowRight />
      </Button>
    </form>
  );
}
