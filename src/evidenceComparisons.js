// These comparisons are checked against released Muesli features, not main.
export const reviewed = '2026-10-29';
export const muesliSources = [
  ['Muesli 0.8.5 features, requirements and data paths', 'https://github.com/Muesli-HQ/muesli/blob/v0.8.5/README.md'],
  ['Muesli 0.8.5 release', 'https://github.com/Muesli-HQ/muesli/releases/tag/v0.8.5'],
];

export const granolaComparison = {
  headline: 'Granola vs Muesli: where your meeting transcript lives',
  subcopy: 'Choose Muesli for free, open-source meeting transcription on your Apple Silicon Mac. Choose Granola for hosted notes and shared team workflows. Both capture meetings without a bot joining the call.',
  articleHeadline: 'Granola vs Muesli for local-first meeting notes',
  lede: ['For a customer call you need to keep locally, Muesli captures microphone and system audio, transcribes on your Mac, and lets you export the record as Markdown or PDF. Granola uses hosted transcription providers and stores notes and transcripts in its cloud.'],
  sections: [
    { title: 'What stays local in Muesli?', body: ['Meeting speech recognition runs on-device by default. Saved transcripts and notes are available locally. Download the model before working offline. If you choose a hosted summary provider, meeting content is sent to that provider. Optional iCloud sync transfers text and sync metadata, not audio.', 'The Mac app requires Apple Silicon and macOS 14.2 or later. Individual models may require a newer OS. Check model availability during setup, and get participants’ permission before recording.'] },
    { title: 'What does Granola offer?', body: ['Granola captures device audio without adding a meeting participant. Its security page describes external transcription and AI providers, cloud storage encrypted in transit and at rest, and no retained meeting audio recordings.', 'Granola supports shared folders and hosted meeting search. Its Basic plan includes limited history; Business adds unlimited history and advanced integrations. Check the current plan details if a team integration is essential.'] },
    { title: 'Try one meeting before switching', body: ['In Muesli, grant microphone and system-audio permissions, choose a downloaded meeting model, and record a short call with consent. Review both sides of the transcript, correct important names, then use Export Transcript or Export Full Meeting to save Markdown or PDF.', 'Open the exported file in your editor and verify that it contains the decisions you need. Test your own accents, microphones and overlapping speakers. This comparison does not establish an accuracy winner.'] },
  ],
  comparison: {
    title: 'Which workflow fits?', aria: 'Granola and Muesli workflow comparison',
    rows: [
      ['Muesli', 'Local meeting transcripts, file exports and open-source Mac software.', 'Requires Apple Silicon and model downloads. Hosted summaries and optional sync have separate data boundaries.'],
      ['Granola', 'Hosted notes, shared folders and team integrations.', 'Uses external transcription providers and cloud storage. History and integrations depend on the plan.'],
    ],
  },
  fitTitle: 'Choose around the record you need',
  fitCards: [
    ['Local files', 'Use Muesli when you want to review and export a meeting transcript on your Mac.'],
    ['Team workspace', 'Keep Granola if shared folders and its integrations are central to your team’s workflow.'],
    ['Dictation too', 'Muesli also pastes dictated text into the active Mac app using a configurable hotkey.'],
  ],
  relatedLinks: [
    ['Granola alternative guide', '/granola-alternative', 'A feature-by-feature comparison of capture, storage and export.'],
    ['Meeting notes in Muesli', '/meeting-notes', 'Capture and review microphone and system audio.'],
    ['Use meeting notes with coding agents', '/docs/agents/', 'Read the CLI workflow and its data-access boundaries.'],
  ],
  faqTitle: 'Granola and Muesli questions',
  faqItems: [
    { question: 'Do both apps work without a meeting bot?', answer: 'Yes. Both capture audio from your device. Bot-free capture alone does not tell you whether transcription or storage is local.' },
    { question: 'Does Muesli work offline?', answer: 'Local meeting transcription works after a model is downloaded. Hosted summaries require a connection and send meeting content to your selected provider. iCloud sync is optional.' },
    { question: 'Can I get the transcript out?', answer: 'Muesli exports transcripts and notes as Markdown or PDF. Granola also provides transcript access and export options; check its documentation for the current workflow.' },
  ],
  ctaTitle: 'Keep a meeting transcript on your Mac.',
  ctaBody: 'Download Muesli, choose a local model, and try a short meeting before moving your workflow.',
  sources: [...muesliSources,
    ['Granola security and storage', 'https://www.granola.ai/security'],
    ['Granola plans and history limits', 'https://www.granola.ai/pricing'],
    ['Granola transcription and transcript access', 'https://docs.granola.ai/help-center/taking-notes/transcription'],
  ],
};

export const superwhisperComparison = {
  headline: 'A free, open-source Superwhisper alternative for Mac',
  subcopy: 'Muesli offers local dictation and meeting transcription on Apple Silicon. Superwhisper also supports offline transcription and meetings. Choose Muesli when free access and inspectable application code matter to your workflow.',
  articleHeadline: 'Choosing between Superwhisper and Muesli',
  lede: ['Both apps can turn speech into text locally. Muesli combines dictation, meeting capture and file exports in a free Mac app. Superwhisper offers local and cloud models, configurable writing modes, and paid features. Compare the model and workflow you will actually use.'],
  sections: [
    { title: 'Offline dictation is available in both apps', body: ['Superwhisper documents local models that work after a download, plus optional cloud models. Its free plan includes local Whisper dictation; Pro adds further models and AI modes. Offline speech recognition is not an exclusive Muesli feature.', 'Muesli runs dictation locally by default after setup. Choose a local speech model and local cleanup, or turn cleanup off, for an offline workflow. Selecting hosted dictation uploads audio; hosted cleanup sends text to the selected provider.'] },
    { title: 'Try an email draft on your Mac', body: ['Muesli requires an Apple Silicon Mac running macOS 14.2 or later; some models need newer macOS versions. Install a model, grant microphone, hotkey and Accessibility permissions, then open an email draft. Hold your configured hotkey, speak two sentences, and release to paste.', 'Review names and punctuation before sending. Compare both apps with the same microphone and text, using local models in each. This page does not claim a measured speed or accuracy advantage.'] },
    { title: 'Both apps can help with meetings', body: ['Superwhisper advertises meeting recording, summaries and speaker separation. Check its current plan for meeting access. Muesli captures microphone and system audio, creates a local transcript, and exports notes or transcripts as Markdown or PDF.', 'In Muesli, a hosted summary provider receives meeting content when selected. Optional iCloud sync transfers text and sync metadata, not audio. Record with participants’ permission.'] },
  ],
  comparison: {
    title: 'Muesli and Superwhisper tradeoffs', aria: 'Muesli and Superwhisper workflow comparison',
    rows: [
      ['Muesli', 'Free dictation, meeting transcription and MIT-licensed application code.', 'Apple Silicon Mac required. You download local models; optional hosted providers can charge separately.'],
      ['Superwhisper', 'Local Whisper dictation on its free plan, with additional models and AI modes on Pro.', 'Check paid-plan access for the models, meeting features and writing modes you need.'],
    ],
  },
  fitTitle: 'Reasons to try Muesli',
  fitCards: [
    ['Inspect the app', 'Read the public source to understand model routing, permissions and storage.'],
    ['Keep ordinary files', 'Export a meeting transcript as Markdown or PDF for your editor or archive.'],
    ['Choose each data path', 'Use local models for speech and review hosted-provider settings before enabling them.'],
  ],
  relatedLinks: [
    ['On-device dictation', '/on-device-dictation', 'Setup, model tradeoffs and local versus hosted processing.'],
    ['Offline dictation guide', '/offline-dictation-mac', 'Prepare your Mac before working without a connection.'],
    ['Meeting notes', '/meeting-notes', 'Use the same app to capture and review a call.'],
  ],
  faqTitle: 'Superwhisper alternative questions',
  faqItems: [
    { question: 'Does Superwhisper work offline?', answer: 'Yes. Superwhisper supports local speech models and also offers cloud options. Muesli is another local option, with free access and open-source application code.' },
    { question: 'Can both apps transcribe meetings?', answer: 'Yes. Both offer meeting features. Check Superwhisper’s current plan limits. Muesli includes local meeting transcription and Markdown or PDF export.' },
    { question: 'Does Muesli always keep data on the Mac?', answer: 'Local models process speech on the Mac. Optional hosted dictation sends audio, hosted cleanup sends text, and hosted summaries send meeting content. Optional iCloud sync transfers text and sync metadata.' },
  ],
  ctaTitle: 'Try local dictation with Muesli.',
  ctaBody: 'Download the free Mac app and test it with a draft you would normally type.',
  sources: [...muesliSources,
    ['Superwhisper offline transcription', 'https://superwhisper.com/offline-transcription'],
    ['Superwhisper meeting features', 'https://superwhisper.com/'],
    ['Superwhisper Free and Pro plans', 'https://superwhisper.com/docs/billing/plans'],
  ],
};
