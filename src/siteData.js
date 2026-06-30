export const siteData = {
  siteUrl: 'https://muesli.works',
  name: 'Muesli',
  legalName: 'Muesli',
  tagline: 'Speak, and keep your notes close.',
  description: 'Muesli is an open-source Mac app for local speech-to-text, dictation, and meeting transcription on Apple Silicon with Parakeet, Whisper, and no cloud STT by default.',
  shortDescription: 'Open-source Mac dictation, local speech-to-text, and meeting notes.',
  downloadUrl: 'https://muesli.works/download/',
  homebrewCommand: 'brew tap pHequals7/muesli && brew install --cask muesli',
  repositoryUrl: 'https://github.com/pHequals7/muesli',
  releasesUrl: 'https://github.com/pHequals7/muesli/releases',
  latestReleaseUrl: 'https://github.com/pHequals7/muesli/releases/latest',
  xUrl: 'https://x.com/fastspeech2text',
  linkedinUrl: 'https://www.linkedin.com/company/mueslios/',
  logoUrl: 'https://muesli.works/icon.png',
  ogImageUrl: 'https://muesli.works/og-muesli.jpg',
  operatingSystem: 'macOS',
  softwareRequirements: 'Apple Silicon Mac',
  applicationCategory: 'ProductivityApplication',
  keyFacts: [
    'Runs local speech-to-text on Apple Silicon with model paths such as Parakeet and Whisper.',
    'Dictate across Mac apps and paste clean text at the cursor.',
    'Supports hold-to-talk AI dictation and meeting transcription.',
    'Captures meeting audio from your own Mac without adding a meeting bot.',
    'Stores dictations, transcripts, and meeting notes locally by default.',
    'Open-source and inspectable on GitHub.',
    'No cloud speech-to-text API is required for the default local transcription path after models are installed.',
    'Optional services such as OpenAI, OpenRouter, ChatGPT, and Google Calendar are explicit integrations, not the default transcription path.',
  ],
  technicalFacts: [
    'Muesli is a native macOS app built with Swift and AppKit, not Electron.',
    'Local speech-to-text runs on Apple Silicon through CoreML and Apple Neural Engine-capable model paths where supported.',
    'For short dictation, local Apple Silicon inference can reduce latency by avoiding the cloud upload, remote inference, response, and paste-back round trip.',
    'The Apple Neural Engine is dedicated neural network hardware, which helps supported speech models run efficiently on device.',
    'Muesli supports local ASR model options including NVIDIA Parakeet, Whisper, Qwen3 ASR, and Nemotron Streaming.',
    'The default dictation workflow does not require a hosted speech-to-text API after local models are installed.',
    'Meeting transcription combines microphone audio, system audio capture, voice activity detection, and speaker diarization.',
    'Meeting echo cancellation runs locally with bundled LocalVQE by default and DTLN available as a fallback AEC path.',
    'Parakeet and Nemotron come from NVIDIA, Whisper comes from OpenAI, Qwen3 ASR comes from Alibaba’s Qwen model family, and Cohere Transcribe comes from Cohere.',
    'Optional summarization providers are separate from the local transcription path.',
  ],
  featurePages: [
    {
      title: 'On-device Dictation',
      path: '/on-device-dictation',
      url: 'https://muesli.works/on-device-dictation',
      description: 'Mac dictation that runs speech-to-text locally on Apple Silicon and pastes clean text into the app you are already using.',
    },
    {
      title: 'Meeting Notes',
      path: '/meeting-notes',
      url: 'https://muesli.works/meeting-notes',
      description: 'AI meeting notes without a meeting bot, using local transcription from your Mac microphone and system audio.',
    },
    {
      title: 'Local-first AI',
      path: '/local-first-ai',
      url: 'https://muesli.works/local-first-ai',
      description: 'A local-first AI Mac app where speech-to-text starts on-device and optional cloud providers stay explicit.',
    },
  ],
  guidePages: [
    {
      title: 'Mac Dictation App',
      path: '/mac-dictation-app',
      url: 'https://muesli.works/mac-dictation-app',
      description: 'A practical guide to Mac dictation apps, local speech-to-text, offline models such as Parakeet and Whisper, and private voice typing on Apple Silicon.',
    },
    {
      title: 'Best Dictation Apps for Mac',
      path: '/best-dictation-apps-mac',
      url: 'https://muesli.works/best-dictation-apps-mac',
      description: 'A fair 2026 guide to the best dictation apps for Mac and macOS, including Apple Dictation, Muesli, Superwhisper, Wispr Flow, VoiceInk, and other voice-to-text options.',
    },
    {
      title: 'Best Offline Dictation Apps for Mac',
      path: '/best-offline-dictation-apps-mac',
      url: 'https://muesli.works/best-offline-dictation-apps-mac',
      description: 'A practical comparison of offline dictation apps for Mac, including Apple Dictation, Superwhisper, Wispr Flow, VoiceInk, and Muesli with local models such as Parakeet, Whisper, and Qwen3 ASR.',
    },
    {
      title: 'Offline Dictation for Mac',
      path: '/offline-dictation-mac',
      url: 'https://muesli.works/offline-dictation-mac',
      description: 'A practical guide to offline dictation on Mac, local speech-to-text models, and what can run without sending audio to a cloud transcription service.',
    },
    {
      title: 'Apple Neural Engine Speech-to-Text on Mac',
      path: '/apple-neural-engine-speech-to-text-mac',
      url: 'https://muesli.works/apple-neural-engine-speech-to-text-mac',
      description: 'A technical guide to Apple Neural Engine speech-to-text on Mac, CoreML, local ASR models such as Parakeet and Whisper, and how Muesli uses Apple Silicon for local dictation.',
    },
    {
      title: 'Local Speech-to-Text Glossary',
      path: '/local-speech-to-text-glossary',
      url: 'https://muesli.works/local-speech-to-text-glossary',
      description: 'A technical glossary for local speech-to-text on Mac, covering ASR versus speech-to-text, CoreML, Apple Neural Engine, Parakeet, Whisper, Qwen3 ASR, VAD, diarization, neural AEC, LocalVQE, and local-first transcription.',
    },
    {
      title: 'ASR Architectures',
      path: '/asr-architectures',
      url: 'https://muesli.works/asr-architectures',
      description: 'A practical guide to common speech-to-text architectures, including CTC, RNN-T, TDT, Conformer encoders, encoder-decoder Transformers, and streaming ASR.',
    },
    {
      title: 'NVIDIA Parakeet Speech-to-Text',
      path: '/nvidia-parakeet-speech-to-text',
      url: 'https://muesli.works/nvidia-parakeet-speech-to-text',
      description: 'A model guide to NVIDIA Parakeet speech-to-text, local English ASR, TDT and CTC model paths, and why Parakeet matters for fast Mac transcription.',
    },
    {
      title: 'Whisper Speech-to-Text',
      path: '/whisper-speech-to-text',
      url: 'https://muesli.works/whisper-speech-to-text',
      description: 'A model guide to OpenAI Whisper speech-to-text, encoder-decoder ASR, multilingual transcription, local inference, and Whisper tradeoffs on Mac.',
    },
    {
      title: 'Local Meeting Transcription for Mac',
      path: '/local-meeting-transcription-mac',
      url: 'https://muesli.works/local-meeting-transcription-mac',
      description: 'A practical guide to local meeting transcription on Mac and macOS, meeting notes without a bot, and what can stay on your own computer.',
    },
    {
      title: 'Bot-Free Meeting Notes',
      path: '/bot-free-meeting-notes',
      url: 'https://muesli.works/bot-free-meeting-notes',
      description: 'A practical guide to AI meeting notes without a bot, using local-first meeting transcription from the Mac already in the call.',
    },
    {
      title: 'Apple Dictation Alternative',
      path: '/apple-dictation-alternative',
      url: 'https://muesli.works/apple-dictation-alternative',
      description: 'An Apple Dictation alternative guide for Mac users who want local-first dictation, offline speech-to-text models, open-source software, and meeting transcription on Apple Silicon.',
    },
    {
      title: 'Granola Alternative',
      path: '/granola-alternative',
      url: 'https://muesli.works/granola-alternative',
      description: 'A local Granola alternative guide for people who want local-first meeting notes, open-source software, and more ownership of their workday memory.',
    },
    {
      title: 'Granola vs Muesli',
      path: '/granola-vs-muesli',
      url: 'https://muesli.works/granola-vs-muesli',
      description: 'A Granola vs Muesli comparison for Mac users deciding between hosted AI meeting notes and open-source local-first meeting transcription.',
    },
    {
      title: 'Superwhisper Alternative',
      path: '/superwhisper-alternative',
      url: 'https://muesli.works/superwhisper-alternative',
      description: 'A practical Superwhisper alternative guide for Mac users who want local-first dictation, meeting transcription, open-source code, and offline speech-to-text on Apple Silicon.',
    },
    {
      title: 'Wispr Flow Alternative',
      path: '/wispr-flow-alternative',
      url: 'https://muesli.works/wispr-flow-alternative',
      description: 'A practical Wispr Flow alternative guide for Mac and macOS users who want local-first dictation, offline speech models, and more ownership of voice-to-text.',
    },
    {
      title: 'Otter.ai Alternative',
      path: '/otter-ai-alternative',
      url: 'https://muesli.works/otter-ai-alternative',
      description: 'An Otter.ai alternative guide for Mac users who want local-first meeting transcription, meeting notes without a bot, and notes they can own.',
    },
    {
      title: 'Fireflies.ai Alternative',
      path: '/fireflies-ai-alternative',
      url: 'https://muesli.works/fireflies-ai-alternative',
      description: 'A practical Fireflies.ai alternative guide for macOS users who want meeting transcription to start on their Mac without sending a bot into every room.',
    },
  ],
  routes: {
    '/': {
      title: 'Muesli - open-source Mac dictation and local speech-to-text',
      canonical: 'https://muesli.works/',
      description: 'Muesli is an open-source Mac app for local speech-to-text, dictation, and meeting transcription on Apple Silicon with Parakeet and Whisper.',
    },
    '/privacy': {
      title: 'Privacy Policy · Muesli',
      canonical: 'https://muesli.works/privacy',
      description: 'Privacy policy for Muesli, a local-first macOS app for on-device dictation and meeting transcription.',
    },
    '/terms': {
      title: 'Terms of Service · Muesli',
      canonical: 'https://muesli.works/terms',
      description: 'Terms of Service for Muesli, a local-first macOS app for dictation, meeting transcription, and private meeting notes.',
    },
    '/on-device-dictation': {
      title: 'On-device dictation for Mac · Muesli',
      canonical: 'https://muesli.works/on-device-dictation',
      description: 'Muesli is an open-source Mac dictation app and private cloud dictation alternative that runs speech-to-text locally on Apple Silicon.',
    },
    '/mac-dictation-app': {
      title: 'Mac dictation app for local speech-to-text · Muesli',
      canonical: 'https://muesli.works/mac-dictation-app',
      description: 'A practical guide to choosing a Mac dictation app for local speech-to-text, offline models such as Parakeet and Whisper, and private voice typing on Apple Silicon.',
    },
    '/best-dictation-apps-mac': {
      title: 'Best dictation apps for Mac in 2026 · Muesli',
      canonical: 'https://muesli.works/best-dictation-apps-mac',
      description: 'A practical 2026 comparison of the best dictation apps for Mac and macOS, including local-first voice-to-text, offline speech models, Apple Dictation, Superwhisper, Wispr Flow, VoiceInk, and Muesli.',
    },
    '/best-offline-dictation-apps-mac': {
      title: 'Best offline dictation apps for Mac · Muesli',
      canonical: 'https://muesli.works/best-offline-dictation-apps-mac',
      description: 'A practical comparison of offline dictation apps for Mac, including Apple Dictation, Superwhisper, Wispr Flow, VoiceInk, and Muesli with local models such as Parakeet, Whisper, and Qwen3 ASR.',
    },
    '/offline-dictation-mac': {
      title: 'Offline dictation for Mac · Muesli',
      canonical: 'https://muesli.works/offline-dictation-mac',
      description: 'Offline dictation on Mac with local speech-to-text models such as Parakeet and Whisper, built for people who do not want everyday voice typing to start with a cloud upload.',
    },
    '/apple-neural-engine-speech-to-text-mac': {
      title: 'Apple Neural Engine speech-to-text on Mac · Muesli',
      canonical: 'https://muesli.works/apple-neural-engine-speech-to-text-mac',
      description: 'How Apple Neural Engine speech-to-text works on Mac with CoreML, local ASR models such as Parakeet and Whisper, and Muesli’s local-first dictation workflow on Apple Silicon.',
    },
    '/local-speech-to-text-glossary': {
      title: 'Local speech-to-text glossary for Mac · Muesli',
      canonical: 'https://muesli.works/local-speech-to-text-glossary',
      description: 'A technical glossary for local speech-to-text on Mac, including ASR versus speech-to-text, CoreML, Apple Neural Engine, Parakeet, Whisper, Qwen3 ASR, VAD, diarization, neural AEC, LocalVQE, and local-first transcription.',
    },
    '/asr-architectures': {
      title: 'Common speech-to-text architectures · Muesli',
      canonical: 'https://muesli.works/asr-architectures',
      description: 'Common speech-to-text architectures explained: CTC, RNN-T, TDT, Conformer encoders, encoder-decoder Transformers, streaming ASR, and how model shape changes local transcription.',
    },
    '/nvidia-parakeet-speech-to-text': {
      title: 'NVIDIA Parakeet speech-to-text guide · Muesli',
      canonical: 'https://muesli.works/nvidia-parakeet-speech-to-text',
      description: 'NVIDIA Parakeet speech-to-text explained for local English ASR, TDT and CTC model paths, fast Mac transcription, and Muesli’s local-first model strategy.',
    },
    '/whisper-speech-to-text': {
      title: 'OpenAI Whisper speech-to-text guide · Muesli',
      canonical: 'https://muesli.works/whisper-speech-to-text',
      description: 'OpenAI Whisper speech-to-text explained: encoder-decoder ASR, multilingual transcription, local inference on Mac, and when Whisper is the right model choice.',
    },
    '/local-meeting-transcription-mac': {
      title: 'Local meeting transcription for Mac and macOS · Muesli',
      canonical: 'https://muesli.works/local-meeting-transcription-mac',
      description: 'Local meeting transcription on Mac and macOS for people who want meeting notes without a bot, with audio captured from their own computer.',
    },
    '/bot-free-meeting-notes': {
      title: 'Bot-free meeting notes for Mac · Muesli',
      canonical: 'https://muesli.works/bot-free-meeting-notes',
      description: 'AI meeting notes without sending a bot into Zoom, Google Meet, or Teams. Muesli records mic and system audio from the Mac already in the call, then transcribes locally.',
    },
    '/apple-dictation-alternative': {
      title: 'Apple Dictation alternative for Mac · Muesli',
      canonical: 'https://muesli.works/apple-dictation-alternative',
      description: 'An Apple Dictation alternative for Mac users who want local-first dictation, offline speech-to-text models, open-source software, and meeting transcription on Apple Silicon.',
    },
    '/granola-alternative': {
      title: 'Local Granola alternative for Mac meeting notes · Muesli',
      canonical: 'https://muesli.works/granola-alternative',
      description: 'A local Granola alternative for Mac users who want local-first meeting transcription, open-source software, and meeting notes they own instead of renting workday memory from the cloud.',
    },
    '/granola-vs-muesli': {
      title: 'Granola vs Muesli for local meeting notes · Muesli',
      canonical: 'https://muesli.works/granola-vs-muesli',
      description: 'Granola vs Muesli for Mac users comparing hosted AI meeting notes with open-source local-first transcription, raw transcript ownership, and fewer cloud defaults.',
    },
    '/superwhisper-alternative': {
      title: 'Superwhisper alternative for Mac local dictation · Muesli',
      canonical: 'https://muesli.works/superwhisper-alternative',
      description: 'A practical Superwhisper alternative for Mac users who want local-first dictation, meeting transcription, open-source code, and offline speech-to-text on Apple Silicon.',
    },
    '/wispr-flow-alternative': {
      title: 'Wispr Flow alternative for local Mac dictation · Muesli',
      canonical: 'https://muesli.works/wispr-flow-alternative',
      description: 'A Wispr Flow alternative for Mac and macOS users who want fast voice-to-text, local speech models, open-source software, and dictation they own instead of renting every spoken draft from the cloud.',
    },
    '/otter-ai-alternative': {
      title: 'Otter.ai alternative for Mac meeting notes without a bot · Muesli',
      canonical: 'https://muesli.works/otter-ai-alternative',
      description: 'An Otter.ai alternative for Mac users who want local-first meeting transcription, meeting notes without a bot, and notes they can own instead of renting meeting memory from the cloud.',
    },
    '/fireflies-ai-alternative': {
      title: 'Fireflies.ai alternative for Mac meeting notes · Muesli',
      canonical: 'https://muesli.works/fireflies-ai-alternative',
      description: 'A Fireflies.ai alternative for macOS users who want meeting transcription to start on their Mac, avoid meeting bots, and keep ownership of their workday memory instead of renting it from the cloud.',
    },
    '/meeting-notes': {
      title: 'AI meeting notes without a bot · Muesli',
      canonical: 'https://muesli.works/meeting-notes',
      description: 'Muesli captures private meeting notes on Mac without a meeting bot. Local transcription runs on-device, with optional AI summaries and exports.',
    },
    '/local-first-ai': {
      title: 'Local-first AI for Mac · Muesli',
      canonical: 'https://muesli.works/local-first-ai',
      description: 'Muesli is a local-first AI Mac app for private dictation and meeting transcription, with on-device speech-to-text and open-source design.',
    },
    '/help': {
      title: 'Help and troubleshooting · Muesli',
      canonical: 'https://muesli.works/help',
      description: 'Troubleshooting help for Muesli permissions, paste behavior, hotkeys, meeting audio, calendar events, and macOS setup.',
    },
    '/changelog': {
      title: 'Changelog · Muesli',
      canonical: 'https://muesli.works/changelog',
      description: 'Stable Muesli release information, public GitHub releases, and download links for the local-first macOS dictation app.',
    },
  },
};

export const sameAsLinks = [
  siteData.repositoryUrl,
  siteData.xUrl,
  siteData.linkedinUrl,
];

export const supportFaqItems = [
  {
    question: 'App won\'t open?',
    answer: 'If macOS says Muesli is damaged, open System Settings > Privacy & Security, scroll down, and click Open Anyway. If that still does not clear it, run the command below.',
    command: 'sudo xattr -cr /Applications/Muesli.app',
  },
  {
    question: 'Why isn\'t my transcription pasting into the input box?',
    answer: 'Usually this means Accessibility access is missing, stale, or attached to the wrong copy of Muesli. Open System Settings > Privacy & Security > Accessibility, make sure Muesli is enabled, then quit and reopen it from /Applications. If it still fails, remove Muesli from Accessibility, add it back, and relaunch.',
  },
  {
    question: 'Why doesn\'t the hotkey start dictation?',
    answer: 'The global hotkey depends on Input Monitoring. Open System Settings > Privacy & Security > Input Monitoring, confirm Muesli is allowed, then relaunch the app from /Applications. If you changed the shortcut in Settings, make sure you are using the configured key instead of assuming the default.',
  },
  {
    question: 'Why did Muesli stop working after an update or reinstall?',
    answer: 'macOS permissions are tied to a specific installed app path and signature. If you launch Muesli from Downloads, Desktop, or an older duplicate copy, paste and hotkey permissions can silently stop working. Keep one copy in /Applications, delete duplicates, then re-grant Accessibility and Input Monitoring if needed.',
  },
  {
    question: 'Why is meeting recording failing or missing system audio?',
    answer: 'Muesli needs Screen Recording or Screen & System Audio Recording permission for meeting capture. Open System Settings > Privacy & Security, enable Muesli under the relevant recording pane, then relaunch. If microphone transcription works but meeting capture does not, this is usually the missing permission.',
  },
  {
    question: 'Why isn\'t Muesli showing upcoming meetings?',
    answer: 'Upcoming meetings come from local macOS Calendar access, Google Calendar, or both. If the list is empty, first check Calendar permission. If you rely on Google Calendar, reconnect it in Settings and wait for the next refresh. If you use both, Muesli deduplicates matching events, so you should still only see one entry per meeting.',
  },
];

export const changelogLinks = [
  {
    title: 'GitHub Releases',
    url: siteData.releasesUrl,
    body: 'The canonical release history for stable Muesli builds, release notes, and downloadable DMGs.',
  },
  {
    title: 'Latest Stable Release',
    url: siteData.latestReleaseUrl,
    body: 'The newest public production build for macOS.',
  },
  {
    title: 'Source Repository',
    url: siteData.repositoryUrl,
    body: 'The open-source codebase behind the macOS app.',
  },
];
