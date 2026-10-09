<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Use separate TanStack Start content routes with a shared header and footer; each page owns its metadata, and the platform bootstrap remains authoritative.
- Keep floral catalog data separate from small, clearly named presentation components so occasion content can be updated without changing page logic.
- Keep inquiry, newsletter, wishlist, and preview interactions frontend-only; this studio landing page does not send or persist submissions.
- Define visual treatments in the global semantic design system and expose button treatments as component variants for consistent styling.
- Flower recommendations run in a server function that calls the AI Gateway with the real catalog, so the model only suggests arrangements the studio offers and the key stays server-side.
