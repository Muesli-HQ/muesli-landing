// These comparisons are checked against released Muesli features, not main.
export const reviewed = '2026-10-29';
export const muesliSources = [
  ['Muesli 0.8.5 features, requirements and data paths', 'https://github.com/Muesli-HQ/muesli/blob/v0.8.5/README.md'],
  ['Muesli 0.8.5 release', 'https://github.com/Muesli-HQ/muesli/releases/tag/v0.8.5'],
];

export const granolaComparison = {
  headline: 'Granola vs Muesli: keep your meeting notes on your Mac',
  subcopy: 'You were in the meeting. You should have the record. We built Muesli to transcribe calls on your Mac, keep your notes close, and let you take them anywhere. Free and open source.',
  articleHeadline: 'Granola vs Muesli for local-first meeting notes',
  lede: ['A customer call, a hiring conversation, the decision that changes your roadmap. These are records you will come back to. We think keeping them on the computer you own should be straightforward. With Muesli, you get a local transcript, notes you can export, and the code behind it all.'],
  sections: [
    { title: 'Put your Mac to work', body: ['Your Apple Silicon Mac can handle the transcription. Muesli captures your microphone and the audio from your call, runs speech recognition locally, and saves the transcript on your machine. Once the model is downloaded, that workflow works offline. No Muesli transcription subscription.', 'You need an Apple Silicon Mac with macOS 14.2 or later. Some models need a newer OS. For summaries, you choose the provider: a hosted provider receives the meeting content you ask it to summarize. Optional iCloud sync moves text and sync metadata between devices; audio stays out of sync.'] },
    { title: 'What changes when you leave Granola?', body: ['Both apps capture meetings without a bot. Granola uses external transcription providers and stores your notes in its encrypted cloud; it does not retain meeting audio recordings. With Muesli, the transcript starts on your Mac and is there for you to read, search and export.', 'Granola’s shared folders and team integrations may be part of your day. Account for those when switching. If what you need is a record of your own meetings, Muesli gives you local transcription and file exports for free. You can keep the transcript in your project folder, open it in your editor, or hand it to your coding agent.'] },
    { title: 'Make your next meeting a Muesli meeting', body: ['Install Muesli, download a meeting model, and allow microphone and system-audio access. Let everyone know you are recording, then capture your next call. You will have both sides of the conversation in one transcript.', 'Open the transcript, check the names and decisions, and choose Export Transcript or Export Full Meeting. Save it as Markdown or PDF. That file is yours to work with in the tools you already use.'] },
  ],
  comparison: {
    title: 'What you get with Muesli', aria: 'Granola and Muesli workflow comparison',
    rows: [
      ['Muesli', 'Local meeting transcripts, file exports and open-source Mac software.', 'Requires Apple Silicon and model downloads. Hosted summaries and optional sync have separate data boundaries.'],
      ['Granola', 'Hosted notes, shared folders and team integrations.', 'Uses external transcription providers and cloud storage. History and integrations depend on the plan.'],
    ],
  },
  fitTitle: 'Keep more of your work in your hands',
  fitCards: [
    ['Local files', 'Take your transcript into a project folder, your editor or your archive. Markdown and PDF travel well.'],
    ['Open code', 'We publish the application source. Read how capture and storage work, follow a change, or make one yourself.'],
    ['Dictation too', 'The same app handles your email drafts, messages and prompts. Hold your hotkey, speak, and paste at the cursor.'],
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
  ctaTitle: 'Your next meeting deserves a local copy.',
  ctaBody: 'Get Muesli for free. Record the call, keep the transcript, and take your notes wherever your work goes.',
  sources: [...muesliSources,
    ['Granola security and storage', 'https://www.granola.ai/security'],
    ['Granola plans and history limits', 'https://www.granola.ai/pricing'],
    ['Granola transcription and transcript access', 'https://docs.granola.ai/help-center/taking-notes/transcription'],
  ],
};

export const superwhisperComparison = {
  headline: 'Switch from Superwhisper to free, open-source dictation',
  subcopy: 'Superwhisper’s free plan limits local dictation to Whisper. Muesli gives you 7+ local ASR models optimized for Apple Silicon, with choices for speed, accuracy and the languages you actually speak. Free, with open-source application code.',
  articleHeadline: 'Choosing between Superwhisper and Muesli',
  lede: ['We want speaking to your Mac to feel as ordinary as typing. Open a draft, hold a key, say what you mean. Muesli puts the text at your cursor. When a meeting starts, use the same app to capture the conversation and keep a transcript.'],
  sections: [
    { title: 'Why we built a free alternative', body: ['Superwhisper’s ongoing free plan offers only Whisper for local dictation. Parakeet and Cohere Transcribe require Pro after the trial. We give you 7+ local ASR models in the free Muesli app: Parakeet, Whisper, Qwen3 ASR, Cohere Transcribe, Nemotron, SenseVoice and Bodhan. Pick for speed, accuracy, language support and the memory available on your Mac. Switching models should be part of finding your setup.', 'Download a local speech model in Muesli and start dictating. Use local cleanup or turn cleanup off to work offline. If you prefer a hosted model, that is your choice: hosted dictation sends audio, and hosted cleanup sends text to the provider you select. External providers may charge for their service.'] },
    { title: 'Hinglish mein bolte ho? Aise hi likho.', body: ['Try saying: “Kal ki meeting ke action items mujhe Slack pe bhej do.” That is how plenty of us speak at work. We want Muesli to work with that, too.', 'Choose Bodhan Flex and select Romanized output to write Indic speech in Latin letters. Prefer the original script? Choose Native. Want Indic script alongside English terms? Choose Mixed. These output modes run locally on Apple Silicon with macOS 15 or later. Your language deserves a place in your dictation app.'] },
    { title: 'Give your keyboard a break', body: ['Install Muesli on an Apple Silicon Mac running macOS 14.2 or later. Download a model, finish the guided permissions setup, and open the email you have been putting off. Hold your hotkey, speak the first paragraph, and release. Your words land in the draft.', 'Use it for a message, a bug report, or a prompt for your coding agent. Check the text before sending, just as you would a typed draft. Some models need newer macOS versions; choose one supported by your Mac.'] },
    { title: 'Keep the conversation after the call', body: ['Muesli captures your microphone and system audio, transcribes locally, and lets you export notes or the full transcript as Markdown or PDF. Meeting transcription is included in the free app. Superwhisper also offers meetings, with access tied to its current plan.', 'Let participants know you are recording. After the call, read the transcript or generate notes with your chosen provider. Hosted summaries send meeting content to that provider. Optional iCloud sync carries text and sync metadata, never audio.'] },
  ],
  comparison: {
    title: 'What you are switching to', aria: 'Muesli and Superwhisper workflow comparison',
    rows: [
      ['Muesli', '7+ local ASR models, dictation and meeting transcription in the free app. MIT-licensed application code.', 'Apple Silicon Mac required. You download local models; optional hosted providers can charge separately.'],
      ['Superwhisper', 'Only Whisper for local dictation on the ongoing free plan. Parakeet, Cohere Transcribe and AI modes require Pro after the trial.', 'Check paid-plan access for the models, meeting features and writing modes you need.'],
    ],
  },
  fitTitle: 'Built for the way you work',
  fitCards: [
    ['Inspect the app', 'The application code is public and MIT-licensed. See how it works, report a bug, or build on it.'],
    ['Keep ordinary files', 'Your meeting transcript can live beside your project files. Export Markdown or PDF and keep working.'],
    ['Speak your language', 'Use Bodhan Flex for Indic speech with Native, Mixed or Romanized output. Choose the script you want to read.'],
  ],
  relatedLinks: [
    ['On-device dictation', '/on-device-dictation', 'Setup, model tradeoffs and local versus hosted processing.'],
    ['Offline dictation guide', '/offline-dictation-mac', 'Prepare your Mac before working without a connection.'],
    ['Meeting notes', '/meeting-notes', 'Use the same app to capture and review a call.'],
  ],
  faqTitle: 'Superwhisper alternative questions',
  faqItems: [
    { question: 'Does Superwhisper work offline?', answer: 'Yes. Its ongoing free plan includes local Whisper models; Parakeet and Cohere Transcribe require Pro after the trial. Muesli gives you 7+ local ASR models in the free app, including options for Indic speech and romanized output.' },
    { question: 'Can both apps transcribe meetings?', answer: 'Yes. Both offer meeting features. Check Superwhisper’s current plan limits. Muesli includes local meeting transcription and Markdown or PDF export.' },
    { question: 'Does Muesli always keep data on the Mac?', answer: 'Local models process speech on the Mac. Optional hosted dictation sends audio, hosted cleanup sends text, and hosted summaries send meeting content. Optional iCloud sync transfers text and sync metadata.' },
  ],
  ctaTitle: 'Start speaking. Muesli will do the typing.',
  ctaBody: 'Free dictation. Local meeting transcription. Open-source code. Download Muesli and put your Mac to work.',
  sources: [...muesliSources,
    ['Superwhisper offline transcription', 'https://superwhisper.com/offline-transcription'],
    ['Superwhisper meeting features', 'https://superwhisper.com/'],
    ['Superwhisper Free and Pro plans', 'https://superwhisper.com/docs/billing/plans'],
  ],
};
