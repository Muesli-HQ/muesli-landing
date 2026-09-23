# Bodhan editorial plan

Three complete drafts, prepared September 23, 2026. These files are outside the site's published routes. No deployment or sitemap changes have been made for them.

## Publication order and search intent

| Order | Post | Primary intent | Suggested URL |
| --- | --- | --- | --- |
| 1 | Bodhan comes to Mac: Indic speech-to-text in Muesli 0.8.4 | Product discovery: Bodhan Mac app, Bodhan dictation, Indic transcription Mac | /blog/bodhan-indic-transcription-mac/ |
| 2 | How to dictate in Hindi, Tamil, and other Indian languages on Mac | Setup: Hindi voice typing Mac, Tamil dictation Mac, Indian-language dictation | /blog/indian-language-dictation-mac/ |
| 3 | Running Bodhan on Apple Silicon with CoreML and MLX Swift | Technical: Bodhan CoreML, Indic ASR Apple Silicon, Bodhan MLX | /blog/bodhan-coreml-mlx-apple-silicon/ |

Each draft includes a title, proposed slug, meta description, a direct opening answer, sources, and relevant links to existing product pages. Treat these as hypotheses about search intent, not measured keyword-volume findings.

The launch story owns the announcement and full language list. The guide owns setup and practical evaluation. The engineering article owns runtime architecture and evidence. Link the launch story to the other two once their URLs exist. Use a contextual link from the on-device dictation page to the setup guide, and from the local-first AI page to the engineering article. Avoid creating 22 near-identical language pages from these drafts. Individual language articles should have tested examples and useful language-specific details.

## Claim record

- First public release: the founder states that Muesli is the first macOS dictation app to publicly release or support Bodhan models. The launch draft uses this narrowly scoped claim. Independent competitor chronology was not established in this research. Keep the dated announcement and supporting chronology with the editorial record when publishing. Muesli's release link alone proves availability, not competitive priority.
- Naming: Bodhan Core and Bodhan Flex, from Bodhan AI. Use “22 scheduled languages” for precise coverage wording. Total language counts include English: Core 25, Flex 27.
- Implementation verified against the local v0.8.4 tag, including README.md, BodhanModelStore.swift, BodhanCoreML.swift, and BodhanBackend.swift. CoreML encoder plus MLX Swift decoder; CPU/GPU is the default encoder compute configuration. No all-Neural-Engine claim.
- Muesli is open-source. Describe Bodhan by name and link its model terms; its card lists the custom Indic Open Model License. Do not imply the model has the same license as the app.
- Benchmark wording is confined to the engineering article and attributed to Bodhan. Core's card labels the metric OIWER; Flex's card currently calls it WER. Do not combine those descriptions into an unqualified leaderboard claim or present upstream numbers as measurements of the Mac conversion.
- Muesli's UI exposes Core native-script and Flex mixed-script behavior. Upstream Flex's romanized mode is not advertised here as a Muesli control.
- Download sizes are weight storage, not RAM requirements. No unmeasured latency or accuracy claims.
- Bodhan transcription is local. Hosted summaries and optional processing require their own data-flow explanation.

## Sources checked

- https://huggingface.co/bodhan-ai/indic-transcribe-flex
- https://huggingface.co/bodhan-ai/indic-transcribe-core
- https://huggingface.co/phequals/indic-transcribe-flex-coreml
- https://github.com/Muesli-HQ/muesli/releases/tag/v0.8.4
- Local Muesli repository at tag v0.8.4, with versioned public source links in the drafts.
- The requested https://bodhan.ai/research/blogs/indic-transcribe returned HTTP 404. The link from Bodhan's own console and the Flex model card leads to the same unavailable URL. Its article text was not used or represented as reviewed. Recheck it if restored.

## Useful original material to add

A Models-tab screenshot, a short screen recording of mixed-language dictation, and a small set of verified transcript examples would strengthen the launch and guide. For the engineering post, add Mac chip, RAM, model revision, precision, sample provenance, runtime and accuracy measurements when available. Current drafts do not fabricate these results.

When integrated into the site, add each actual canonical URL to the sitemap and blog index, and use the existing article metadata and structured-data conventions. Keep draft routes out of the live sitemap until their pages exist.

## Local website integration

The articles are now implemented locally in src/bodhanPosts.js, which is the website's editable article source. The Markdown files above retain the initial editorial drafts. Each route is pre-rendered and has a local sitemap entry, canonical URL, meta description, Open Graph and Twitter metadata, BlogPosting/ImageObject schema, blog-index discovery, and related links. Deployment remains pending.

The covers and social images use the original painting reproductions without modification. Their actual image dimensions are included in the metadata. Source and public-domain records are in public/images/bodhan/sources.json; each article links its artwork source and public-domain status in a small footer credit. Paintings: Hamsa Damayanti; Jatayu Vadham (updated at user request); Saraswati.
