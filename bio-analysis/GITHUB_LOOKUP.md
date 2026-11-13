# GitHub-only Bio publication

The private repository runs `bio-publish-lookup.yml` on changes to Bio files,
every six hours, and on manual dispatch. It executes the unchanged native runtime
for each explicit case in `bio_lookup_cases.json`, then commits only the lookup
index and complete generated result JSON to the public Bio repository.

The public page makes same-origin GET requests to `public/bio-lookup/`. It needs
no API server, local computer, tunnel, user token, or runtime credentials. The
page matches compound identity, dose in mg, and interval exactly. It never
substitutes a nearby dose or reports an unpublished combination as evaluated.
Independent results remain independent; this is not a combined interaction run.

## Coverage and maintenance

The initial two cases reproduce archived controls (Famotidine 40 mg once daily,
Ammonia 1 mg once daily). They are engineering examples, not dosing advice.
The 338-compound catalog does not define a dose grid. To expand lookup coverage,
add explicitly chosen cases with a unique safe id, display label, formula,
dose, and interval. The workflow generates complete results before committing.
A failed run leaves the last successful dataset online. The page displays the
generation time and flags a refresh older than 24 hours.

The runtime reference remains the retained locked snapshot. Re-running the
publisher is not acquisition of a new living manifold. A compatible updated
runtime must be supplied separately before results can reflect new reference data.

`SEAM_GITHUB_TOKEN` must retain write access to the public Bio repository.
GitHub schedules may run late; they do not require this computer to be online.
Pages serves the last published dataset even between or during workflow runs.

The previous localhost/Cloudflare API is no longer used by the public page.
