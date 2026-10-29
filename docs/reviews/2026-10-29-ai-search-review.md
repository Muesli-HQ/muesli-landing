# Search readiness review, 29 October 2026

## Scope and result

Review baseline: `8ae32136417262c15f7d3377e658fb0876bd0d39`. Three existing pages improved, no new landing pages. Existing footer, navigation, blog posts, route canonicals, sitemap and robots settings preserved. Shared product metadata corrected separately as requested. No production deployment or outreach.

## Retrieval evidence

Nine exact buyer queries were submitted to the existing Exa web search connector, five results each. Query text, result order, titles and exact URLs are preserved in [the result log](2026-10-29-ai-search-results.json). These are ordinary web retrieval results from a search-enabled tool, **not** Google positions or ChatGPT/Claude/Gemini recommendations. No independent AI-answer connector was available in this session. Consumer AI answer visibility and exact AI-cited URLs remain unmeasured; nothing here treats a search result as an AI citation. No new paid tool or account was used.

Muesli appeared in the branded comparison query, including its comparison page, alternative guide, official GitHub repository and import blog. It was absent from the first five results of the other eight queries. This small, one-engine sample does not establish general invisibility or ranking changes.

| Query | Products surfaced in results (not independent AI recommendations) | Existing sitemap coverage / decision |
| --- | --- | --- |
| best offline dictation for Apple Silicon | Sayburst, OpenWhisp, Speakmac, OpenQuack, Yaps; comparison excerpts also name Handy, VoiceInk and Superwhisper | `/best-offline-dictation-apps-mac`, `/offline-dictation-mac`, `/on-device-dictation`; improve the last page's evidence rather than add a synonym page |
| free open-source Wispr Flow alternative | OpenWhispr, Tambourine, OpenFlow, FluidVoice, FreeFlow | `/wispr-flow-alternative` already serves this intent; defer within the three-page cap |
| private meeting notes without a bot | Granola, Anarlog, Oats, Harknotes, Takku | `/bot-free-meeting-notes`, `/local-meeting-transcription-mac`; avoid duplicating them |
| Granola alternative keeping transcripts local | Anarlog, talat, Oatmeal, Oats, Meetily | `/granola-alternative` already has sourced comparison content; bring the separate decision page up to that standard |
| local AI autocomplete across Mac apps | Typeahead, MacAutocomplete, WeType, FlowIn | No dedicated page; no verified passive autocomplete feature in release 0.8.5. Quill voice writing is a different workflow. Do not publish a matching promise |
| letting Claude Code use meeting notes | Circleback, Claude Code Club, Supernormal, claude-meeting-notes, Trippi Notes | `/docs/agents/` and `/docs/cli/` exist; link readers to them rather than create a competing landing page |
| voice-controlled computer automation for Mac | Verba, Cursor Voice, Rocky, Apple Voice Control, Peeky | No focused buyer page; release 0.8.5 documents Computer Use with experimental local planning. Deferred to keep this review on three verified existing pages |
| Superwhisper alternative offline open source Mac | OpenWhispr, VoiceType, VocaMac, OpenWispr, VoxPrompt | `/superwhisper-alternative` exists but mischaracterizes its competitor; correct it first |
| Granola vs Muesli meeting notes | Muesli pages and repository; also an unrelated repository fork | `/granola-vs-muesli` is retrieved directly. Its text is a source candidates can read now, making misleading framing especially worth fixing |

## Why these three changes

1. **Superwhisper alternative:** replace implications that Superwhisper requires cloud speech or lacks meetings. Its [offline page](https://superwhisper.com/offline-transcription), [homepage](https://superwhisper.com/) and [plans documentation](https://superwhisper.com/docs/billing/plans) explicitly describe local transcription, meeting assistance and free local Whisper dictation. The search sample returns competitors' product/repository pages for this intent. Muesli's existing page needs factual differentiation: free application access, MIT source, file exports, setup requirements and optional hosted paths. Includes a concrete email-draft trial.
2. **Granola vs Muesli:** remove the sugar metaphor and unsupported superiority framing from a page Exa actually returned. [Granola security](https://www.granola.ai/security) describes bot-free capture, hosted transcription providers and encrypted cloud storage. [Plans](https://www.granola.ai/pricing) include shared folders, limited free history and paid expanded history/integrations. Both products have transcript access. The comparison now explains the local-record versus shared-workspace choice, with a short meeting/export trial and explicit summary/sync boundaries. `/granola-alternative` remains the detailed alternative guide.
3. **On-device dictation:** remove model timing estimates (~0.13s, ~1–2s, ~2–3s) lacking hardware, recording-length, warmup and cleanup methodology. Existing handoff evidence also says no benchmark was performed for the prior search-page work. No new ASR benchmark was run. Add an offline draft procedure, requirements, limitations and dated release evidence. This existing route already serves the buyer need and supports the other comparison pages.

All feature claims were checked against the [0.8.5 tagged README](https://github.com/Muesli-HQ/muesli/blob/v0.8.5/README.md) and [release](https://github.com/Muesli-HQ/muesli/releases/tag/v0.8.5), verified using GitHub's latest-release API. The development README advertises additional work; it was not used to label unreleased features as shipped. No Granola-import availability promise was added to these pages.

## Shared metadata

The same desktop `SoftwareApplication` ID previously used each article's URL and description. It now consistently names Muesli, points to `https://muesli.works/`, uses the shared product description, and gives Apple Silicon/macOS 14.2 requirements. Optional hosted speech/text processing and iCloud boundaries are explicit in shared facts. Page-specific WebPage, Article and FAQ identities remain page-specific. The separate iPhone application retains its own identity.

## Verification

- `npm run build`: passes client, SSR and prerender. Existing JS chunk-size warning remains. No dependencies added.
- `python3 scripts/check-search-pages.py`: passes all three generated pages. Checks initial HTML, one H1, canonical, dated primary sources, requirements, local/hosted copy, download link, internal destinations/fragments, no old latency estimates, no visible em dashes, and FAQ/schema text agreement.
- Shared software entity checked across all 36 rendered pages that include the desktop application: one consistent object.
- Mobile Chrome at 390 × 844: all three reviewed visually; document width 390, no horizontal overflow, correct headings, source links and download CTAs. Desktop Granola page also checked at 1440px. Browser screenshot saving to the repository was unavailable through the tool, so screenshots were inspected inline.
- Download destination remains `/download/`, an existing static page with a GitHub Releases fallback. Production download page returned HTTP 200. Latest-release API returned `Muesli-0.8.5.dmg` at `https://github.com/Muesli-HQ/muesli/releases/download/v0.8.5/Muesli-0.8.5.dmg`. No installer download or installation was triggered.
- `git diff --check`: passes. Sitemap, robots and Vercel routing settings unchanged.

## Before/after performance

Same Chrome tab, 390 × 844 mobile viewport/DPR 1, 4× CPU slowdown, Fast 4G, cache bypass on reload, auto-stopped performance traces. Baseline and review builds served by Python `http.server` on localhost (ports 4182/4183). This intentionally excludes CDN compression/caching. The values are lab observations, not field performance or SEO outcomes. [Trace summaries](2026-10-29-performance.json) preserve each run.

| Page | Before LCP, ms | After LCP, ms | CLS before → after |
| --- | --- | --- | --- |
| Superwhisper alternative | 858, 1231 | 1038, 948 | 0.00 → 0.00 |
| Granola comparison | 1516, 1792 | 1742, 1832 | 0.01 / 0.00 → 0.00 |
| On-device dictation | 4671 | 4812 | 0.00 → 0.00 |

**Regression flag:** Granola mean LCP increased about 133ms (8%) in this small sample; dictation increased 141ms (3%, one run). These are observed increases, not proof of a causal regression. Superwhisper's mean fell about 52ms and run-to-run variability is substantial. The existing dictation hero-image load dominates its roughly 4.8s LCP and remains a performance limitation. No standardized interaction sequence was tested, so no INP claim is made.

Asset evidence: client JS 614,592 → 610,864 bytes (gzip 177,052 → 176,723); CSS 116,877 → 117,392 bytes (gzip 23,852 → 23,956). No new media or network integrations. Initial HTML shrank from 24,587 → 22,779 bytes for Superwhisper and 28,548 → 22,619 for Granola; dictation grew 25,660 → 27,658 bytes with the setup instructions and sources.

## Reference limits

[Discovered Labs' Granola case study](https://discoveredlabs.com/case-studies/granola) describes a combined content, technical SEO and off-site program. Its results are vendor-reported context and do not isolate the effect of any one page edit. The [inspiration tweet](https://x.com/wespreadjam/status/2115568290307469548) returned HTTP 403 through web retrieval; no claims were inferred from it. This draft makes no ranking-lift promise and adds no analytics, tracking, monitoring or external outreach.
