export const granolaImportPost = {
  "path": "/blog/import-granola-notes",
  "title": "Bring your Granola notes home to Muesli",
  "seoTitle": "Export Granola Notes to Muesli | Muesli 0.8.6",
  "description": "Bring your Granola meeting history to your Mac. Muesli 0.8.6 will import notes and transcripts from the official export, ready to search, edit, and keep.",
  "date": "2026-10-25",
  "category": "Meeting Notes",
  "tags": [
    "Meeting Notes",
    "Privacy",
    "Local AI"
  ],
  "readTime": "5 min read",
  "image": "/images/granola-export-guide.png",
  "imageAlt": "Export Granola notes in three steps: open Settings, generate an export, and choose workspaces.",
  "imageWidth": 2117,
  "imageHeight": 743,
  "imageInBody": true,
  "blocks": [
    {
      "type": "paragraph",
      "text": "Your customer calls, interviews, and team meetings become more useful when you can return to them months later. A decision from last quarter. The exact words a customer used. A commitment you need to follow through on."
    },
    {
      "type": "paragraph",
      "text": "We believe you should be able to keep that history on your own machine, search it, and take it wherever you work next. That is why we are adding **Granola imports in Muesli 0.8.6**."
    },
    {
      "type": "paragraph",
      "text": "Export your history from Granola, import it into Muesli, and keep your notes and transcripts in a free, open-source app on your Mac. Your imported archive will remain available without a Muesli subscription or a rolling history cutoff."
    },
    {
      "type": "heading",
      "text": "Keep your meeting history with you"
    },
    {
      "type": "paragraph",
      "text": "Michael recently [asked for help leaving Granola](https://x.com/michael_chomsky/status/2113141317786386907):"
    },
    {
      "type": "tweet",
      "url": "https://twitter.com/michael_chomsky/status/2113141317786386907",
      "author": "Michael (@michael_chomsky)",
      "date": "October 22, 2026",
      "text": "I'm looking to migrate from Granola and export away all of my data"
    },
    {
      "type": "paragraph",
      "text": "Earlier, Guido Appenzeller criticised the loss of local access and asked what other people were switching to:"
    },
    {
      "type": "tweet",
      "url": "https://twitter.com/appenz/status/2033597347868111004",
      "author": "Guido Appenzeller (@appenz)",
      "date": "March 16, 2026",
      "text": "Any recommendations for good alternatives? What are you switching to?"
    },
    {
      "type": "paragraph",
      "text": "These posts describe their experiences at the time. Granola now offers a [public API on paid plans](https://docs.granola.ai/introduction) and an [official export available on Basic](https://docs.granola.ai/help-center/sharing/exporting-notes). That export is the route we use to bring your history into Muesli."
    },
    {
      "type": "paragraph",
      "text": "We built this import for people making that move. You have already spent the time in those meetings. Switching apps should let you carry that work forward."
    },
    {
      "type": "paragraph",
      "text": "The difficulty of relying on someone else's storage has also shown up in community tools. The maintainer of [Granary](https://github.com/wassimk/granary), a Granola-to-Markdown exporter, archived the project after encrypted cache changes broke its exports. Muesli's importer uses Granola's supported export, so you can move your history without maintaining a workaround."
    },
    {
      "type": "paragraph",
      "text": "Once imported, your notes live in Muesli's local meeting library. You can search old conversations, edit notes, and export notes or transcripts as Markdown or PDF. Keep a copy in your project folder, add it to your own knowledge base, or share a document with a colleague."
    },
    {
      "type": "paragraph",
      "text": "You should have that same freedom to leave Muesli. Exporting your work is part of the app."
    },
    {
      "type": "heading",
      "text": "Make Muesli your next meeting notebook"
    },
    {
      "type": "paragraph",
      "text": "Muesli brings dictation and meeting transcription to Apple Silicon Macs, with speech-to-text running on your device. You can continue building your meeting history alongside the notes you bring over from Granola."
    },
    {
      "type": "list",
      "items": [
        "**Keep a local archive.** Your imported meetings are stored on your Mac. Optional iCloud sync follows your existing Muesli settings.",
        "**Find older conversations.** Global meeting search reaches imported records beyond the latest 200 shown in the meeting browser.",
        "**Keep the original content.** Import preserves the summaries, manual notes, and transcripts present in your export, without rewriting them.",
        "**Use ordinary files outside the app.** Export notes and transcripts as Markdown or PDF whenever you need them."
      ]
    },
    {
      "type": "paragraph",
      "text": "Muesli is free and open source. For new meetings, optional AI summaries use the backend you configure, which may involve a cloud provider and its own charges. Importing existing summaries does not call an AI service."
    },
    {
      "type": "heading",
      "text": "Export from Granola in three steps"
    },
    {
      "type": "paragraph",
      "text": "You can prepare your export now and import it when Muesli 0.8.6 is available."
    },
    {
      "type": "image",
      "src": "/images/granola-export-guide.png",
      "alt": "Granola export in three steps: open Settings, generate an export under Profile, then choose workspaces.",
      "width": 2117,
      "height": 743
    },
    {
      "type": "orderedList",
      "items": [
        "Open your workspace menu in Granola and choose **Settings**.",
        "Go to **Profile**, find **Export historical data**, and click **Generate CSV**.",
        "Choose the workspaces to include and click **Generate CSV** again."
      ]
    },
    {
      "type": "paragraph",
      "text": "Granola will email a download link. Use the same account to download your export within 24 hours, before the link expires. Keep the ZIP or CSV files for the next step."
    },
    {
      "type": "paragraph",
      "text": "**You can export on Granola's free plan.** Its official export includes eligible notes older than the 30-day in-app history window. Export is enabled on Basic and Business; Enterprise administrators control access. [Granola's export instructions](https://docs.granola.ai/help-center/sharing/exporting-notes)."
    },
    {
      "type": "heading",
      "text": "Bring the export into Muesli"
    },
    {
      "type": "paragraph",
      "text": "In Muesli 0.8.6, open **Meetings → Import → Granola**. Select your ZIP or CSV files, check the preview, and import."
    },
    {
      "type": "paragraph",
      "text": "Your meetings will appear in a **Granola** folder, with their titles and creation dates. Generated summaries keep their exported Markdown, manual notes remain separate, and transcripts retain their text and line breaks. Previously imported document IDs are skipped, preserving your local edits when you select the same records again."
    },
    {
      "type": "paragraph",
      "text": "This is a one-time file transfer. Once the content is imported, reading it in Muesli does not require a connection to your Granola account. [Import details](https://github.com/Muesli-HQ/muesli/blob/main/docs/plans/granola-csv-import.md)."
    },
    {
      "type": "heading",
      "text": "Before you leave your old archive"
    },
    {
      "type": "paragraph",
      "text": "Check a few important meetings after importing, and keep the original export as a backup."
    },
    {
      "type": "paragraph",
      "text": "Granola's export covers notes you own that have a summary. Deleted notes and notes without summaries are excluded, so your exported count may be lower than your in-app count. [Export scope](https://docs.granola.ai/help-center/sharing/exporting-notes)."
    },
    {
      "type": "paragraph",
      "text": "Muesli can preserve only what the file contains. The October 2026 export we tested did not include audio, duration, structured participant lists, or speaker timestamps. Creation dates are labelled “Created”; missing content stays empty."
    },
    {
      "type": "heading",
      "text": "Bring your next meeting to Muesli"
    },
    {
      "type": "paragraph",
      "text": "You can start using Muesli for new meetings today. When 0.8.6 arrives, bring your Granola history over and keep it alongside everything you record next."
    },
    {
      "type": "paragraph",
      "text": "Your meeting notes should stay useful for as long as you need them. Keep them on your Mac, make your own backups, and choose what you do with them."
    },
    {
      "type": "paragraph",
      "text": "[Download Muesli for Mac](https://muesli.works/download/) · [Follow the 0.8.6 release](https://github.com/Muesli-HQ/muesli/releases)"
    }
  ]
};
