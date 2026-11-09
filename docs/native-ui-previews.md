# Native UI website previews

`src/nativePreviews.jsx` and `src/nativePreviews.css` render the product illustrations as DOM, CSS and small icon assets. No screenshots or customer data are embedded.

## Sources

- macOS v0.8.6: `MuesliTheme.swift`, `SidebarView.swift`, `TimeTurnerPage.swift`, `TimeTurnerView.swift`, `FeedbackCaptureView.swift`, `MeetingChatView.swift`, `MeetingDetailView.swift`, `IndicatorWaveformDynamics.swift` and `AIPromptInput.swift`.
- Live muesliDev inspection on 2026-11-09: sidebar, Time Turner header, Chat history/conversation, expanded composer and meeting details. The local app had no saved Vidshots and no captures on its selected day, so populated history and Vidshot detail layouts are based on their source views.
- The blue mark uses the approved `public/brand/muesli-waveform-lockup-white.svg` waveform, extracted without changing its geometry. `public/native-preview/native/muesli-mark.svg` contains the original embedded mark and alpha filter; CSS supplies the native accent tint.
- Time Turner and Vidshot paths are direct ports of `TimeTurnerIcon.swift` and `VidshotIcon.swift`, including their stroke widths.
- Native SF Symbol glyphs are rendered by `scripts/export-native-preview-icons.swift` via AppKit at 14pt medium into transparent PNG masks. They are used only as icons, not screenshots.
- The UI fonts are the app's bundled Nunito Sans Regular, Medium, SemiBold and Bold. Their OFL license is included.

- Timeline app icons are exported from the installed official macOS app bundles at 128px: Google Chrome (`app.icns`), ChatGPT (`icon-chatgpt.icns`), Claude (`electron.icns`) and Apple Notes (`AppIcon.icns`). PNGs live in `public/native-preview/apps/`; their original colors and silhouettes are preserved.

## Rendering

The 1100 × 780 logical canvas scales uniformly with ResizeObserver. Sidebar width is 240pt, matching the inspected app. Typography, spacing and controls retain their point dimensions at all website breakpoints. The brand uses the app's default blue accent rather than a user-specific saved accent. Native window controls are shown in a windowed presentation.

The Notes documents and all names, conversations and timestamps are illustrative content. Cotypist's ghost text stays after the insertion caret. The classic recording indicator follows the native five-bar profile, distinct from the brand logo.

Each preview can be enlarged in a native HTML dialog. Escape and the close button dismiss it. Reduced-motion disables the visual animations.

Pixel-for-pixel parity is not asserted for macOS material rendering, system window chrome, or the populated states that were unavailable in the local app. Compare those states against native captures before treating these illustrations as regression baselines.
