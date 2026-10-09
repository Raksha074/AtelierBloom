import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Flower2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { floralDesigns } from "@/data/flowers";
import { recommendArrangements, type Recommendation } from "@/lib/recommend.functions";

const occasionChoices = ["Birthday", "Anniversary", "Wedding", "Celebration", "Sympathy", "Just because"];

export function FlowerFinder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Recommendation | null>(null);

  async function findFlowers(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setLoading(true);
    setError("");
    setResult(null);
    try {
      setResult(
        await recommendArrangements({
          data: {
            occasion: String(form.get("occasion")),
            colors: String(form.get("colors")),
            budget: Number(form.get("budget")),
            notes: String(form.get("notes")),
          },
        }),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flower-finder" aria-labelledby="finder-title">
      <p className="eyebrow">FLOWER FINDER</p>
      <h2 className="section-title" id="finder-title">
        Not sure what to choose?
      </h2>
      <p className="copy">Tell us the moment, the colors you love, and your budget.</p>
      <form className="contact-form" onSubmit={findFlowers}>
        <div className="form-grid">
          <label className="field">
            Occasion
            <select name="occasion" defaultValue="Birthday" required>
              {occasionChoices.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
          <label className="field">
            Budget (USD)
            <input name="budget" type="number" min={20} max={5000} defaultValue={100} required />
          </label>
          <label className="field field-wide">
            Color preferences
            <input name="colors" placeholder="e.g. soft peach, coral, a touch of gold" />
          </label>
          <label className="field field-wide">
            Anything else?
            <textarea name="notes" placeholder="She loves garden roses, nothing too formal…" />
          </label>
        </div>
        <Button variant="botanical" type="submit" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : <Flower2 />}
          {loading ? "GATHERING IDEAS…" : "RECOMMEND FLOWERS"}
        </Button>
      </form>

      {error && (
        <p className="finder-error" role="alert">
          {error}
        </p>
      )}

      {result && (
        <div className="finder-results" role="status">
          <p className="copy">{result.summary}</p>
          <div className="finder-picks">
            {result.picks.map((pick) => {
              const design = floralDesigns.find((d) => d.name === pick.name);
              return (
                <article className="finder-pick" key={pick.name}>
                  {design && <img src={design.image} alt={design.name} width={160} height={160} />}
                  <div>
                    <h3>{pick.name}</h3>
                    <p>{pick.reason}</p>
                    <Link to="/contact" search={{ service: "Custom Order", design: pick.name }}>
                      Inquire <ArrowRight />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="design-description">
            <strong>A custom idea:</strong> {result.customIdea}
          </p>
        </div>
      )}
    </section>
  );
}
