import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { floralDesigns, occasions, type FloralDesign, type Occasion } from "@/data/flowers";

export function FloralCatalog({
  gallery = false,
  featured = false,
}: {
  gallery?: boolean;
  featured?: boolean;
}) {
  const [occasion, setOccasion] = useState<Occasion>("All");
  const [preview, setPreview] = useState<FloralDesign | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const designs = featured
    ? floralDesigns.slice(0, 4)
    : floralDesigns.filter((design) => occasion === "All" || design.occasion === occasion);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 3500);
    return () => clearTimeout(timer);
  }, [notice]);

  function toggleWishlist(design: FloralDesign) {
    const alreadySaved = wishlist.includes(design.name);
    setWishlist((current) =>
      alreadySaved ? current.filter((name) => name !== design.name) : [...current, design.name],
    );
    setNotice(`${design.name} ${alreadySaved ? "removed from" : "added to"} wishlist`);
  }

  return (
    <>
      {!featured && (
        <div className="occasion-tabs" role="group" aria-label="Filter by occasion">
          {occasions.map((item) => (
            <Button
              key={item}
              variant={occasion === item ? "botanical" : "botanicalOutline"}
              aria-pressed={occasion === item}
              onClick={() => setOccasion(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      )}
      <div className={featured ? "collection-grid" : "occasion-grid"}>
        {designs.map((design) => (
          <article className="collection-card" key={design.name}>
            <Button
              variant="ghost"
              className="collection-image"
              aria-label={`Preview ${design.name}`}
              onClick={() => setPreview(design)}
            >
              <img src={design.image} alt={design.name} loading="lazy" width={768} height={768} />
            </Button>
            <div className="collection-meta">
              <div>
                <p className="eyebrow">{design.occasion}</p>
                <h3>{design.name}</h3>
                {!gallery && (
                  <p>{design.price ? `Start from $${design.price}` : "Made to order"}</p>
                )}
              </div>
              <Button
                variant="botanicalIcon"
                aria-label={`${wishlist.includes(design.name) ? "Remove" : "Add"} ${design.name} ${wishlist.includes(design.name) ? "from" : "to"} wishlist`}
                aria-pressed={wishlist.includes(design.name)}
                onClick={() => toggleWishlist(design)}
              >
                {wishlist.includes(design.name) ? <Check /> : <Plus />}
              </Button>
            </div>
            {!featured && <p className="design-description">{design.description}</p>}
          </article>
        ))}
      </div>
      <Dialog
        open={preview !== null}
        onOpenChange={(open) => {
          if (!open) setPreview(null);
        }}
      >
        <DialogContent className="preview-dialog">
          {preview && (
            <>
              <DialogTitle>{preview.name}</DialogTitle>
              <img
                className="preview-photo"
                src={preview.image}
                alt={preview.name}
                width={768}
                height={768}
              />
              <DialogDescription className="preview-description">
                {preview.description}
              </DialogDescription>
              <Button variant="botanical" asChild>
                <Link to="/contact" search={{ service: "Custom Order", design: preview.name }}>
                  INQUIRE ABOUT THIS DESIGN <ArrowRight />
                </Link>
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
      {notice && (
        <div className="toast" role="status">
          <Check />
          {notice}
        </div>
      )}
    </>
  );
}
