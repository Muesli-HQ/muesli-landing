export const siteData = {
  siteUrl: 'https://muesli.works',
  name: 'Muesli',
  legalName: 'Muesli',
  tagline: 'Speak, and keep your notes close.',
  description: 'Muesli is an open-source Mac app for on-device dictation, local-first meeting transcription, and private speech-to-text on Apple Silicon.',
  shortDescription: 'Open-source local-first dictation and meeting notes for macOS.',
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
    'Runs speech-to-text locally on Apple Silicon.',
    'Supports hold-to-talk dictation and meeting transcription.',
    'Captures meeting audio from your own Mac without adding a meeting bot.',
    'Stores dictations, transcripts, and meeting notes locally by default.',
    'Open-source and inspectable on GitHub.',
    'Optional services such as OpenAI, OpenRouter, ChatGPT, and Google Calendar are explicit integrations, not the default transcription path.',
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
      title: 'Offline Dictation for Mac',
      path: '/offline-dictation-mac',
      url: 'https://muesli.works/offline-dictation-mac',
      description: 'A practical guide to offline dictation on Mac, local speech-to-text models, and what can run without sending audio to a cloud transcription service.',
    },
    {
      title: 'Local Meeting Transcription for Mac',
      path: '/local-meeting-transcription-mac',
      url: 'https://muesli.works/local-meeting-transcription-mac',
      description: 'A practical guide to local meeting transcription on Mac and macOS, meeting notes without a bot, and what can stay on your own computer.',
    },
    {
      title: 'Granola Alternative',
      path: '/granola-alternative',
      url: 'https://muesli.works/granola-alternative',
      description: 'A practical Granola alternative guide for people who want local-first meeting notes, open-source software, and more ownership of their workday memory.',
    },
  ],
  routes: {
    '/': {
      title: 'Muesli - speak, and keep your notes close',
      canonical: 'https://muesli.works/',
      description: 'Muesli is a local-first Mac app for dictation, meeting notes, and private speech-to-text.',
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
    '/offline-dictation-mac': {
      title: 'Offline dictation for Mac · Muesli',
      canonical: 'https://muesli.works/offline-dictation-mac',
      description: 'Offline dictation on Mac with local speech-to-text models such as Parakeet and Whisper, built for people who do not want everyday voice typing to start with a cloud upload.',
    },
    '/local-meeting-transcription-mac': {
      title: 'Local meeting transcription for Mac and macOS · Muesli',
      canonical: 'https://muesli.works/local-meeting-transcription-mac',
      description: 'Local meeting transcription on Mac and macOS for people who want meeting notes without a bot, with audio captured from their own computer.',
    },
    '/granola-alternative': {
      title: 'Granola alternative for local-first meeting notes · Muesli',
      canonical: 'https://muesli.works/granola-alternative',
      description: 'A Granola alternative for people who want local-first meeting transcription, open-source software, and meeting notes they own instead of renting workday memory from the cloud.',
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
