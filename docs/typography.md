# Website typography

- Nunito Sans for navigation, body copy, buttons and compact card headings.
- Newsreader at the shared display weight (600) for editorial headings. Use `--font-display-tracking` for their letter spacing.
- Weight roles: `--font-regular` (400), `--font-medium` (500), `--font-semibold` (600), `--font-bold` (700).
- The lowercase muesli wordmark retains its dedicated 650 weight and existing tracking.
- Website code uses `--font-mono`.

The Google Fonts import supplies the Nunito Sans 400–700 variable weight range, including the wordmark weight. Do not introduce alternate font aliases for marketing text.

Native UI recreations in `.np-preview` deliberately use their bundled `MuesliNative` Nunito Sans faces and app-specific metrics. Apple Notes uses the macOS system font and native timestamps retain their monospace stack. Keep those styles separate from website typography. Third-party tweet embeds control their own fonts.

Use `--text-body` (deep blue #12365b) for supporting marketing copy. Reserve `--muted` for secondary labels and metadata. Keep light text on dark panels and preserve native UI preview colors.
