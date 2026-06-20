import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BotOff,
  CalendarDays,
  ChevronDown,
  Clipboard,
  ClipboardCheck,
  CloudOff,
  Coffee,
  Cpu,
  Download,
  FileText,
  History,
  Github,
  HardDrive,
  Keyboard,
  LockKeyhole,
  Mic2,
  MousePointer2,
  ShieldCheck,
  Sparkles,
  Star,
  Stars,
  Wand2,
} from 'lucide-react';
import './styles.css';
import iconUrl from '../docs/icon.png';
import zoomUrl from '../assets/zoom-app.png';
import meetUrl from '../assets/Google_Meet_icon_(2020).svg.png';
import teamsUrl from '../assets/Microsoft_Office_Teams_(2025–present).svg.png';
import slackUrl from '../assets/Slack_icon_2019.svg.png';
import nvidiaUrl from '../assets/Nvidia_logo.svg.png';
import openAiUrl from '../assets/OpenAI_Logo.svg.png';
import cohereUrl from '../assets/cohere.png';
import qwenUrl from '../assets/Qwen_logo.svg.png';
import presidioHeroBgUrl from './assets/presidio-laptop-hero-bg.png';
import solarpunkBgUrl from './assets/solarpunk-speech-workspace.png';
import solarpunkDictationUrl from './assets/solarpunk-greenhouse-dictation.png';
import solarpunkMeetingNotesUrl from './assets/solarpunk-meeting-notes.png';
import solarpunkLocalFirstUrl from './assets/solarpunk-local-first.png';
import solarpunkParkSpeechLawnUrl from './assets/solarpunk-park-speech-lawn.png';
import spotifyLogoSvg from './assets/company-wordmarks/spotify.svg?raw';
import atlassianLogoSvg from './assets/company-wordmarks/atlassian.svg?raw';
import goldmanSachsLogoSvg from './assets/company-wordmarks/goldmansachs.svg?raw';
import deliveryHeroLogoSvg from './assets/company-wordmarks/deliveryhero.svg?raw';
import automatticLogoSvg from './assets/company-wordmarks/automattic.svg?raw';
import wordpressLogoSvg from './assets/company-wordmarks/wordpress.svg?raw';
import hubspotLogoSvg from './assets/company-wordmarks/hubspot.svg?raw';
import googleLogoSvg from './assets/company-wordmarks/google.svg?raw';
import accelLogoSvg from './assets/company-wordmarks/accel.svg?raw';
import bcgLogoSvg from './assets/company-wordmarks/bcg.svg?raw';
import blinkitLogoSvg from './assets/company-wordmarks/blinkit.svg?raw';
import kalaariLogoUrl from './assets/company-wordmarks/kalaari.png';
import datadogLogoUrl from './assets/company-wordmarks/datadog.png';
import razorpayLogoUrl from './assets/company-wordmarks/razorpay.png';
import { changelogLinks, sameAsLinks, siteData, supportFaqItems } from './siteData.js';

const downloadUrl = '/download/';
const brewCommand = siteData.homebrewCommand;
const githubReleasesUrl = siteData.releasesUrl;
const githubReleasesApiUrl = 'https://api.github.com/repos/pHequals7/muesli/releases';

function formatStars(count) {
  if (count == null) return 'Stars';
  if (count >= 1000) return `${(count / 1000).toFixed(1).replace('.0', '')}k`;
  return count.toLocaleString();
}

function formatReleaseDate(value) {
  if (!value) return 'Recently';
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

function cleanReleaseText(value) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/[_*]/g, '')
    .replace(/<[^>]+>/g, '')
    .trim();
}

function parseReleaseBody(body = '') {
  const lines = body.split('\n');
  const sections = [];
  let current = null;
  let summary = '';

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) return;

    const headingMatch = line.match(/^#{2,4}\s+(.+)$/);
    if (headingMatch) {
      const title = cleanReleaseText(headingMatch[1]);
      if (/^muesli(?:preprod)?\s+\d/i.test(title)) return;
      if (/^install$/i.test(title)) {
        current = null;
        return;
      }

      current = { title, bullets: [] };
      sections.push(current);
      return;
    }

    const bulletMatch = line.match(/^[-*]\s+(.+)$/) || line.match(/^\d+\.\s+(.+)$/);
    if (bulletMatch) {
      if (!current) {
        current = { title: 'Notes', bullets: [] };
        sections.push(current);
      }
      current.bullets.push(cleanReleaseText(bulletMatch[1]));
      return;
    }

    if (!summary && !line.startsWith('#')) {
      summary = cleanReleaseText(line);
    }
  });

  return {
    summary,
    sections: sections
      .map((section) => ({
        ...section,
        bullets: section.bullets.filter(Boolean).slice(0, 5),
      }))
      .filter((section) => section.bullets.length > 0)
      .slice(0, 4),
  };
}

function normalizeRelease(release) {
  const parsed = parseReleaseBody(release.body);
  const dmgAsset = release.assets?.find((asset) => asset.name?.toLowerCase().endsWith('.dmg'));

  return {
    id: release.id,
    title: release.name || release.tag_name,
    tag: release.tag_name,
    date: formatReleaseDate(release.published_at),
    isPrerelease: release.prerelease,
    htmlUrl: release.html_url,
    downloadUrl: dmgAsset?.browser_download_url,
    summary: parsed.summary,
    sections: parsed.sections,
  };
}

function useStableReleases() {
  const [releases, setReleases] = useState([]);
  const [releaseStatus, setReleaseStatus] = useState('loading');

  useEffect(() => {
    let isMounted = true;

    async function loadReleases() {
      try {
        const collected = [];

        for (let page = 1; page <= 5; page += 1) {
          const response = await fetch(`${githubReleasesApiUrl}?per_page=100&page=${page}`, {
            headers: { Accept: 'application/vnd.github+json' },
          });

          if (!response.ok) throw new Error('Unable to load releases');

          const pageItems = await response.json();
          collected.push(...pageItems);
          if (pageItems.length < 100) break;
        }

        if (!isMounted) return;

        setReleases(
          collected
            .filter((release) => !release.draft && !release.prerelease && !/alpha|preprod|pre-release|prerelease/i.test(`${release.tag_name} ${release.name}`))
            .map(normalizeRelease)
        );
        setReleaseStatus('ready');
      } catch {
        if (!isMounted) return;
        setReleaseStatus('error');
      }
    }

    loadReleases();

    return () => {
      isMounted = false;
    };
  }, []);

  return { releases, releaseStatus };
}

function ReleaseFeed({ releases, releaseStatus, maxVisible = 3 }) {
  const visibleReleases = releases.slice(0, maxVisible);
  const latestRelease = visibleReleases[0];
  const olderReleaseCount = Math.max(releases.length - visibleReleases.length, 0);

  if (releaseStatus === 'loading') {
    return (
      <div className="changelog-shell changelog-loading" aria-live="polite">
        <span />
        <strong>Loading releases from GitHub...</strong>
        <p>Fetching the current release history for pHequals7/muesli.</p>
      </div>
    );
  }

  if (releaseStatus === 'error') {
    return (
      <div className="changelog-shell changelog-error">
        <strong>Couldn’t load the release feed.</strong>
        <p>GitHub may be rate-limiting this browser. The canonical changelog is still available on GitHub.</p>
        <a href={githubReleasesUrl} target="_blank" rel="noreferrer">Open GitHub Releases</a>
      </div>
    );
  }

  if (!latestRelease) {
    return (
      <div className="changelog-shell changelog-error">
        <strong>No stable releases found.</strong>
        <p>The canonical changelog is available on GitHub Releases.</p>
        <a href={githubReleasesUrl} target="_blank" rel="noreferrer">Open GitHub Releases</a>
      </div>
    );
  }

  return (
    <div className="changelog-grid">
      <article className="latest-release">
        <div className="release-meta">
          <span>Latest stable</span>
          <b>{latestRelease.date}</b>
        </div>
        <h3>{latestRelease.title}</h3>
        <p>{latestRelease.summary || 'The newest public Muesli build is available from GitHub Releases.'}</p>
        {latestRelease.sections[0]?.bullets?.length > 0 && (
          <ul>
            {latestRelease.sections[0].bullets.slice(0, 4).map((item, itemIndex) => (
              <li key={`${latestRelease.id}-latest-${itemIndex}`}>{item}</li>
            ))}
          </ul>
        )}
        <div className="release-actions">
          <a href={latestRelease.htmlUrl} target="_blank" rel="noreferrer">Release notes</a>
          {latestRelease.downloadUrl && (
            <a href={latestRelease.downloadUrl}>Download DMG</a>
          )}
        </div>
      </article>

      <div className="release-timeline" aria-label="GitHub release history">
        <div className="timeline-topline">
          <span>Latest {visibleReleases.length} releases</span>
          <a href={githubReleasesUrl} target="_blank" rel="noreferrer">View on GitHub</a>
        </div>
        {visibleReleases.map((release, index) => (
          <details className="release-item" key={release.id} open={index === 0}>
            <summary>
              <span className="release-dot" />
              <span className="release-title">
                <strong>{release.title}</strong>
                <small>{release.date}</small>
              </span>
              <span className="release-badge">stable</span>
            </summary>
            <div className="release-body">
              {release.summary && <p>{release.summary}</p>}
              {release.sections.length > 0 ? (
                release.sections.map((section, sectionIndex) => (
                  <div className="release-section" key={`${release.id}-${section.title}-${sectionIndex}`}>
                    <h4>{section.title}</h4>
                    <ul>
                      {section.bullets.map((item, itemIndex) => (
                        <li key={`${release.id}-${sectionIndex}-${itemIndex}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p>GitHub release notes are available for this build.</p>
              )}
              <a className="release-link" href={release.htmlUrl} target="_blank" rel="noreferrer">
                Open full release
              </a>
            </div>
          </details>
        ))}
        {olderReleaseCount > 0 && (
          <a className="older-releases-link" href={githubReleasesUrl} target="_blank" rel="noreferrer">
            <span>{olderReleaseCount} older stable releases</span>
            <strong>Open GitHub Releases</strong>
          </a>
        )}
      </div>
    </div>
  );
}

const featureRows = [
  {
    icon: Mic2,
    title: 'Dictate anywhere on your Mac',
    body: 'Press a hotkey, speak naturally, and Muesli pastes clean text into the app you are already using.',
    dictationPill: true,
    href: '/on-device-dictation/',
    linkLabel: 'Explore on-device dictation',
  },
  {
    icon: CalendarDays,
    title: 'Meeting notes without a bot',
    body: 'Capture meetings from your own computer audio, then keep the transcript local and easy to revisit.',
    meetingLogos: true,
    href: '/meeting-notes/',
    linkLabel: 'Explore local meeting notes',
  },
  {
    icon: CloudOff,
    title: 'Local-first by design',
    body: 'Open-source, built for Apple Silicon, and ready for the speech models you already trust.',
    logos: true,
    href: '/local-first-ai/',
    linkLabel: 'Explore local-first AI',
  },
];

const providerLogos = [
  { src: nvidiaUrl, alt: 'NVIDIA' },
  { src: openAiUrl, alt: 'OpenAI' },
  { src: cohereUrl, alt: 'Cohere' },
  { src: qwenUrl, alt: 'Qwen' },
];

const meetingLogos = [
  { src: zoomUrl, alt: 'Zoom' },
  { src: meetUrl, alt: 'Google Meet' },
  { src: teamsUrl, alt: 'Microsoft Teams' },
  { src: slackUrl, alt: 'Slack' },
];

const userLogos = [
  { name: 'Spotify', svg: spotifyLogoSvg },
  { name: 'Atlassian', svg: atlassianLogoSvg },
  { name: 'Goldman Sachs', svg: goldmanSachsLogoSvg },
  { name: 'Datadog', img: datadogLogoUrl },
  { name: 'Blinkit', svg: blinkitLogoSvg },
  { name: 'Razorpay', img: razorpayLogoUrl },
  { name: 'BCG', svg: bcgLogoSvg },
  { name: 'Kalaari Capital', img: kalaariLogoUrl },
  { name: 'Accel', svg: accelLogoSvg },
  { name: 'Delivery Hero', svg: deliveryHeroLogoSvg },
  { name: 'Automattic', svg: automatticLogoSvg },
  { name: 'WordPress', svg: wordpressLogoSvg },
  { name: 'HubSpot', svg: hubspotLogoSvg },
  { name: 'Google', svg: googleLogoSvg },
];

const trustItems = [
  { icon: BotOff, text: 'No meeting bot joins your calls' },
  { icon: LockKeyhole, text: 'Transcripts stay close to your machine' },
  { icon: Keyboard, text: 'One hotkey for thought-to-text' },
  { icon: Github, text: 'Open-source and inspectable' },
];

const dictationSteps = [
  {
    icon: Keyboard,
    title: 'Hold your hotkey',
    body: 'Use a modifier key such as Right Command when you want to dictate. Speak in the app you were already using.',
  },
  {
    icon: Cpu,
    title: 'Transcribe on Apple Silicon',
    body: 'Muesli runs speech recognition locally through CoreML, Metal, and the Apple Neural Engine. Parakeet is built for fast everyday dictation.',
  },
  {
    icon: MousePointer2,
    title: 'Paste where your cursor is',
    body: 'When you release the hotkey, Muesli pastes the cleaned text into the active text field instead of making you copy from a separate transcript window.',
  },
];

const dictationNotes = [
  {
    title: 'No cloud speech round trip',
    body: 'After the model is installed, day-to-day dictation does not need a hosted speech-to-text API. Your voice is processed on your Mac, which removes the usual upload, queue, retention, and vendor-account surface from quick dictation.',
  },
  {
    title: 'Less exposed by default',
    body: 'Cloud transcription can be the right tradeoff for some teams, but it adds more places where audio, transcripts, credentials, logs, and third-party access policies have to be trusted. Muesli keeps the dictation path narrower.',
  },
  {
    title: 'Open-source and inspectable',
    body: 'Muesli is public on GitHub, so the app, model routing, permissions, paste behavior, and local storage choices can be inspected instead of hidden behind a hosted black box.',
  },
];

const dictationModels = [
  ['Parakeet v3', 'Recommended', 'CoreML / Neural Engine', '~0.13s'],
  ['Whisper Small', 'Compact', 'WhisperKit / CoreML', '~1-2s'],
  ['Qwen3 ASR', 'Multilingual', 'CoreML', '~2-3s'],
];

const dictationAnswerCards = [
  {
    title: 'Open-source Mac dictation app',
    body: 'Muesli is a local-first macOS dictation app that turns speech into text on your Mac and pastes it into the app you are already using.',
  },
  {
    title: 'Private alternative to cloud dictation',
    body: 'For normal dictation, speech recognition runs on-device instead of sending audio to a hosted speech-to-text API.',
  },
  {
    title: 'Works where you already type',
    body: 'Use Muesli for notes, email, Slack, docs, issue trackers, prompts, and other Mac text fields without moving your writing into a separate editor.',
  },
];

const dictationFaqItems = [
  {
    question: 'Does Muesli send dictation audio to a cloud speech API?',
    answer: 'Normal dictation runs on your Mac. Meeting summaries can optionally use services such as OpenAI, OpenRouter, ChatGPT, or Ollama, but that is separate from the local dictation path.',
  },
  {
    question: 'Is Muesli a private alternative to cloud dictation?',
    answer: 'Yes. Muesli is designed as a local-first Mac dictation app for people who do not want quick speech-to-text to depend on a hosted transcription service.',
  },
  {
    question: 'Can I use Muesli offline?',
    answer: 'After the speech model is installed, normal dictation can run without an internet connection. Optional downloads, updates, calendar integrations, and cloud summarization providers still need network access.',
  },
  {
    question: 'Does Muesli work in any Mac app?',
    answer: 'Muesli pastes dictated text into the active app using macOS accessibility and clipboard behavior, so it is built for notes, email, chat, documents, issue trackers, browser text fields, and other places you already type.',
  },
  {
    question: 'What makes Muesli different from Apple Dictation?',
    answer: 'Muesli is open-source, model-flexible, and built around a hold-to-talk workflow with local ASR models such as Parakeet, Whisper, and Qwen3 ASR. It also connects dictation with meeting transcription and local-first notes workflows.',
  },
  {
    question: 'What permissions are involved?',
    answer: 'Dictation needs microphone access, input monitoring for the hotkey, and accessibility permission to paste the result. The app guides those permissions during onboarding.',
  },
];

const macDictationUseCases = [
  {
    title: 'Can I dictate notes and drafts on Mac?',
    body: 'Capture rough thinking before it becomes too polished. Dictate into Notes, Obsidian, Notion, Google Docs, or the draft window already open on your Mac.',
  },
  {
    title: 'Can I use speech-to-text for chat and email?',
    body: 'Say the reply out loud, then edit it in place. The point is not to replace writing; it is to get the first version down faster.',
  },
  {
    title: 'Can I dictate issue tickets and AI prompts?',
    body: 'Use speech for bug reports, support replies, Linear tickets, commit notes, research prompts, or any other text field where a blank cursor slows you down.',
  },
];

const macDictationComparisonRows = [
  ['Built-in dictation', 'Convenient and already installed.', 'Less control over the model, workflow, and local-first behavior.'],
  ['Cloud transcription', 'Useful when a hosted model is the right tradeoff.', 'Audio leaves the device before it becomes text.'],
  ['Muesli', 'Offline models such as Parakeet and Whisper transcribe everyday speech locally on Apple Silicon.', 'You still need macOS permissions for the hotkey, microphone, and paste.'],
];

const macDictationFaqItems = [
  {
    question: 'What should I look for in a Mac dictation app?',
    answer: 'Look for a fast capture flow, reliable paste behavior, clear macOS permissions, local model support, and an easy way to keep using the apps where you already write.',
  },
  {
    question: 'Can offline models such as Parakeet and Whisper transcribe on a Mac?',
    answer: 'Yes. Muesli can run offline speech-to-text models on Apple Silicon. Parakeet is the recommended fast path for short dictation, while Whisper is useful when you prefer that model family or its tradeoffs.',
  },
  {
    question: 'Is local dictation the same as private dictation?',
    answer: 'Local dictation is a stronger privacy default because the audio does not need to start with a cloud upload. You still need to understand app permissions, storage, optional integrations, and any services you choose to connect.',
  },
  {
    question: 'Does Muesli replace Apple Dictation?',
    answer: 'Muesli is a separate Mac app for people who want an open-source, local-first workflow with model choice, hold-to-talk capture, paste into the current app, and adjacent meeting transcription features.',
  },
  {
    question: 'Does Muesli work offline?',
    answer: 'Normal dictation can work offline after the speech model is installed. Downloads, updates, calendar integrations, and optional cloud summarization providers still require network access.',
  },
];

const meetingSteps = [
  {
    icon: CalendarDays,
    title: 'Start from the meeting you already have',
    body: 'Muesli can surface upcoming calls from Calendar, extract meeting links, and let you join, record, or do both without sending a bot into the room.',
  },
  {
    icon: BotOff,
    title: 'Capture both sides locally',
    body: 'The app records your microphone and system audio from your own Mac, then uses local speech recognition to build the transcript.',
  },
  {
    icon: FileText,
    title: 'Turn the transcript into notes',
    body: 'Keep the raw transcript, generate structured notes with your chosen summary backend, and export notes or the full meeting as Markdown or PDF.',
  },
];

const meetingAnswerCards = [
  {
    title: 'AI meeting notes without a bot',
    body: 'Muesli records from your Mac instead of joining Zoom, Meet, or Teams as another attendee.',
  },
  {
    title: 'Local meeting transcription',
    body: 'Speech-to-text runs on-device with CoreML and Apple Silicon. The transcript is created on your machine before any optional summary step.',
  },
  {
    title: 'Private meeting notes for Mac',
    body: 'Meetings, transcripts, and exports live in local app storage, with optional providers only when you ask Muesli to summarize.',
  },
];

const meetingNotes = [
  {
    title: 'No bot-shaped social tax',
    body: 'Some meetings should not start with a mystery participant joining the call. Muesli listens from your own computer, so the capture layer stays out of the guest list.',
  },
  {
    title: 'Raw transcript stays reviewable',
    body: 'Summaries are useful, but they are not a source of truth. Muesli keeps the transcript close so you can check names, decisions, and action items before sharing notes.',
  },
  {
    title: 'Built for messy real calls',
    body: 'Meetings have interruptions, system audio, people talking over each other, and app switching. Muesli is designed around that desktop reality rather than a perfect recording studio.',
  },
];

const meetingFaqItems = [
  {
    question: 'Does Muesli join my meeting as a bot?',
    answer: 'No. Muesli records from your Mac, using your microphone and system audio, so it does not need to appear as another participant in Zoom, Google Meet, Teams, or other calls.',
  },
  {
    question: 'Is meeting transcription local?',
    answer: 'The speech-to-text path runs on-device using Apple Silicon, CoreML, and local ASR models. Optional summaries can use services such as OpenAI, OpenRouter, ChatGPT, or Ollama depending on your setup.',
  },
  {
    question: 'Where are meeting transcripts and notes stored?',
    answer: 'Muesli stores dictations, transcripts, and meeting notes in local app storage on your Mac. You can export notes, transcripts, or the full meeting as Markdown or PDF.',
  },
  {
    question: 'Can Muesli capture Zoom, Google Meet, Teams, and Slack calls?',
    answer: 'Muesli captures audio from your own computer rather than depending on a specific meeting provider. It is designed for common meeting surfaces such as Zoom, Google Meet, Microsoft Teams, Slack, and browser-based calls.',
  },
  {
    question: 'What permissions are needed for meeting notes?',
    answer: 'Meeting capture uses microphone permission for your voice, Screen Recording or Screen & System Audio Recording for computer audio, and optional Calendar access for upcoming meeting detection. Camera state may help detect active meetings, but Muesli is not recording video.',
  },
  {
    question: 'Are AI meeting notes always accurate?',
    answer: 'No transcript or summary system should be treated as perfect. Review the transcript and generated notes before relying on them as a record, sending them to teammates, or using them for decisions.',
  },
];

const localFirstAnswerCards = [
  {
    title: 'Local-first AI for Mac',
    body: 'Muesli treats speech-to-text as a Mac-level feature. Dictation and transcription start on your device, not in a hosted speech pipeline.',
  },
  {
    title: 'Private speech-to-text by default',
    body: 'Everyday voice input should not require uploading raw audio before it becomes text.',
  },
  {
    title: 'Open-source and inspectable',
    body: 'The app is public on GitHub, so model routing, permissions, paste behavior, and local storage choices can be inspected instead of guessed.',
  },
];

const localFirstPrinciples = [
  {
    title: 'Transcribe on the device',
    body: 'Speech-to-text should feel like part of the operating system: speak, transcribe locally, paste or save the text.',
  },
  {
    title: 'Use cloud GPUs for harder work',
    body: 'Use the cloud for heavier reasoning, summaries, downloads, and integrations. Do not use it as the default path for basic transcription.',
  },
  {
    title: 'Inspectability over slogans',
    body: '“Private” means more when the code, storage model, permissions, and integration boundaries are visible. Muesli is open-source so those claims can be checked.',
  },
];

const localFirstStack = [
  ['Apple Silicon', 'Runs speech models on the Mac instead of sending every utterance to a server.'],
  ['CoreML + Neural Engine', 'Keeps supported ASR models fast and Mac-native instead of wrapping a web app.'],
  ['Local storage', 'Dictations, transcripts, and meeting records stay in app storage on the machine.'],
  ['Optional providers', 'Cloud summaries and integrations are explicit choices, not the default transcription path.'],
];

const localFirstFaqItems = [
  {
    question: 'What does local-first mean for Muesli?',
    answer: 'It means speech-to-text runs on your Mac first. Dictation and meeting transcription start with on-device models and local app storage, not a hosted speech-to-text API.',
  },
  {
    question: 'Does Muesli work without the cloud?',
    answer: 'Normal dictation and local transcription can run after models are installed. The network is still useful for downloads, updates, calendar integrations, and optional summaries.',
  },
  {
    question: 'Is Muesli open-source?',
    answer: 'Yes. Muesli is open-source, so the app behavior, model choices, macOS permissions, and storage decisions can be inspected on GitHub.',
  },
  {
    question: 'Why does local-first matter for voice?',
    answer: 'Voice often contains names, customer details, private thoughts, and unfinished work. Basic transcription should not require sending that raw audio to another service.',
  },
  {
    question: 'What data is still sent to third-party services?',
    answer: 'Optional features can send data to services you configure, such as OpenAI, OpenRouter, ChatGPT, Google Calendar, or model/download providers. Those integrations are separate from the default local transcription path.',
  },
  {
    question: 'Is Muesli a native Mac app?',
    answer: 'Yes. Muesli is a native macOS app built for Apple Silicon, CoreML, and the Apple Neural Engine rather than an Electron wrapper around a cloud transcription service.',
  },
];

const tweetTestimonials = [
  'https://twitter.com/anshulbhide/status/2053999514101714944',
  'https://twitter.com/FracSlap/status/2053622908073730179',
  'https://twitter.com/azrulrhm/status/2053997949987041647',
  'https://twitter.com/asmartpanda/status/2034237473069674846',
  'https://twitter.com/shantanugoel/status/2034151360376279316',
  'https://twitter.com/anirudhamudan/status/2036855462180876616',
  'https://twitter.com/arcane_bloom/status/2036775141351547080',
];

const faqItems = supportFaqItems;

const workflow = [
  'Speak in the flow of work',
  'Muesli listens from your Mac',
  'Paste, summarize, or revisit later',
];

const speechSamples = [
  'I should follow up after lunch...',
  'Why would you do this in the cloud?',
  'How are you so fast?',
  "I don't know what I would do without Muesli.",
  'Turn that into action items.',
];

const legalPages = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'May 25, 2026',
    intro: 'Muesli is local-first speech software for macOS. Dictation and speech-to-text transcription run on your Mac using on-device models. Audio is not sent to Muesli servers for transcription.',
    sections: [
      {
        title: 'What Muesli Does',
        body: [
          'Muesli is a native macOS app for dictation, meeting transcription, and meeting notes. It uses CoreML and Apple Silicon acceleration to convert speech to text locally on your device.',
        ],
      },
      {
        title: 'Data That Stays on Your Device',
        body: [
          'Muesli stores application data locally on your Mac unless you explicitly enable an optional connected service.',
        ],
        bullets: [
          'Audio captured for dictation and meetings',
          'Transcripts, dictations, and meeting notes stored in a local SQLite database',
          'Configuration and preferences stored in a local JSON file',
          'Downloaded speech models cached on your device',
          'OAuth tokens and connected-service credentials stored in macOS Keychain where applicable',
        ],
      },
      {
        title: 'Optional Cloud Services',
        body: [
          'Muesli includes optional integrations that require explicit user action. When enabled, the data needed for that feature is sent directly to the selected provider.',
        ],
        bullets: [
          'OpenAI API, OpenRouter, or ChatGPT may receive meeting transcript text for optional AI meeting summaries.',
          'Google Calendar may be used to read upcoming meeting event metadata and meeting links.',
          'Sparkle or GitHub-hosted update checks may be used to discover new app releases.',
        ],
      },
      {
        title: 'Google Calendar Integration',
        body: [
          'If you connect Google Calendar, Muesli requests read-only calendar access so it can show upcoming meetings and help start recordings. Calendar data is used for meeting detection and display inside the app. You can revoke access from your Google Account permissions page.',
        ],
      },
      {
        title: 'macOS Permissions',
        body: [
          'Muesli requests macOS permissions only for product features you use.',
        ],
        bullets: [
          'Microphone for dictation and meeting microphone audio',
          'Screen Recording or Screen & System Audio Recording for system audio capture during meetings',
          'Accessibility for pasting text and optional screen context capture',
          'Input Monitoring for global hotkey detection',
          'Calendar for local macOS calendar events',
        ],
      },
      {
        title: 'Anonymous Usage Analytics',
        body: [
          'Muesli may use privacy-focused analytics to understand broad feature usage and app health. Analytics never include audio, transcripts, meeting notes, calendar content, screen content, or other personal text.',
        ],
      },
      {
        title: 'Open Source',
        body: [
          'Muesli is open source under the MIT license. You can inspect the code and releases on GitHub.',
        ],
      },
      {
        title: 'Children’s Privacy',
        body: [
          'Muesli is not directed to children under 13, and we do not knowingly collect personal information from children.',
        ],
      },
      {
        title: 'Changes to This Policy',
        body: [
          'If this policy changes, the updated version will be posted on this page with a revised date.',
        ],
      },
      {
        title: 'Contact',
        body: [
          'For privacy questions, open an issue on GitHub or contact the maintainer through the repository.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    updated: 'May 25, 2026',
    intro: 'Muesli is open-source macOS software. These terms cover your use of the application, website, downloads, and optional connected services.',
    sections: [
      {
        title: 'Acceptance of Terms',
        body: [
          'By downloading, installing, or using Muesli, you agree to these terms. If you do not agree, do not use the application.',
        ],
      },
      {
        title: 'Description of Service',
        body: [
          'Muesli provides local-first dictation, meeting transcription, and meeting notes on macOS. Optional integrations may connect to third-party services such as OpenAI, OpenRouter, ChatGPT, and Google Calendar.',
        ],
      },
      {
        title: 'License',
        body: [
          'Muesli is distributed under the MIT License. The source code is available on GitHub. Your rights to use, copy, modify, merge, publish, distribute, sublicense, or sell copies of the software are governed by that license.',
        ],
      },
      {
        title: 'User Responsibilities',
        body: [
          'You are responsible for how you use Muesli and for the content you record, transcribe, summarize, export, or share.',
        ],
        bullets: [
          'Comply with laws that apply to recording conversations, meetings, calls, system audio, and other people’s speech in your jurisdiction.',
          'Obtain any required knowledge, notice, or consent from participants before recording or transcribing.',
          'Review generated transcripts and summaries before relying on them as records.',
          'Secure your device and the local data stored by Muesli.',
        ],
      },
      {
        title: 'No Professional Advice',
        body: [
          'Muesli transcripts, summaries, action items, meeting notes, and exports are for informational and productivity purposes only. They are not legal, medical, financial, HR, compliance, or other professional advice.',
        ],
      },
      {
        title: 'AI Output Accuracy',
        body: [
          'Speech recognition, speaker diarization, summaries, action items, and generated notes may be inaccurate, incomplete, mislabeled, delayed, or missing context. You are responsible for reviewing and verifying outputs before relying on them, sharing them, or using them as records.',
        ],
      },
      {
        title: 'Third-Party Services',
        body: [
          'Optional integrations and externally hosted resources are governed by the terms and privacy policies of their respective providers. This may include OpenAI, OpenRouter, ChatGPT, Google Calendar, GitHub Releases, model repositories, and downloaded model providers. Muesli is not responsible for the availability, accuracy, security, pricing, policy changes, or continued operation of third-party services.',
        ],
      },
      {
        title: 'Google Calendar Integration',
        body: [
          'When you connect Google Calendar, Muesli requests read-only access to calendar events for meeting detection and display. Muesli’s use and transfer of information received from Google APIs is intended to comply with the Google API Services User Data Policy, including Limited Use requirements.',
        ],
      },
      {
        title: 'Updates and Changes',
        body: [
          'Muesli may change, remove, rename, limit, or stop maintaining features, models, integrations, release channels, downloads, documentation, or update mechanisms at any time.',
        ],
      },
      {
        title: 'Export Control and Restricted Use',
        body: [
          'You are responsible for complying with applicable export control, sanctions, trade, and restricted-use laws. You may not use Muesli or optional connected services where such use is prohibited by applicable law or by the terms of a connected provider.',
        ],
      },
      {
        title: 'Termination or Limitation',
        body: [
          'Muesli is local software, but access to website downloads, update feeds, OAuth integrations, connected services, support channels, or related infrastructure may be limited, suspended, discontinued, or refused for misuse, legal risk, security risk, or operational reasons.',
        ],
      },
      {
        title: 'Disclaimer of Warranties',
        body: [
          'Muesli is provided “as is,” without warranty of any kind. Speech recognition accuracy depends on audio quality, language, model behavior, system conditions, and user configuration.',
        ],
      },
      {
        title: 'Limitation of Liability',
        body: [
          'To the maximum extent permitted by law, the authors and copyright holders of Muesli are not liable for claims, damages, or other liability arising from use of the software, website, downloads, or optional integrations.',
        ],
      },
      {
        title: 'Changes to These Terms',
        body: [
          'These terms may be updated from time to time. The updated version will be posted on this page with a revised date. Continued use of Muesli after changes means you accept the updated terms.',
        ],
      },
      {
        title: 'Contact',
        body: [
          'For questions about these terms, open an issue on GitHub or contact the maintainer through the repository.',
        ],
      },
    ],
  },
};

export const prerenderRoutes = ['/', '/privacy', '/terms', '/on-device-dictation', '/mac-dictation-app', '/meeting-notes', '/local-first-ai', '/help', '/changelog'];

export const routeMeta = siteData.routes;

function normalizePath(pathname = '/') {
  const path = pathname.replace(/\/+$/, '') || '/';

  if (path === '/privacy.html') return '/privacy';
  if (path === '/terms.html') return '/terms';

  return path;
}

function setCanonicalUrl(path = '/') {
  const canonical = `https://muesli.works${path === '/' ? '/' : path}`;
  let link = document.querySelector('link[rel="canonical"]');

  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }

  link.href = canonical;
}

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function pageSchema(path, type = 'WebPage') {
  const meta = routeMeta[path] || routeMeta['/'];
  return {
    '@type': type,
    '@id': `${meta.canonical}#webpage`,
    url: meta.canonical,
    name: meta.title,
    description: meta.description,
    isPartOf: { '@id': `${siteData.siteUrl}/#website` },
  };
}

function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${siteData.siteUrl}/#organization`,
    name: siteData.name,
    legalName: siteData.legalName,
    url: siteData.siteUrl,
    logo: siteData.logoUrl,
    sameAs: sameAsLinks,
  };
}

function softwareSchema(path = '/') {
  const meta = routeMeta[path] || routeMeta['/'];
  return {
    '@type': 'SoftwareApplication',
    '@id': `${siteData.siteUrl}/#software`,
    name: siteData.name,
    applicationCategory: siteData.applicationCategory,
    operatingSystem: siteData.operatingSystem,
    softwareRequirements: siteData.softwareRequirements,
    url: meta.canonical,
    downloadUrl: siteData.downloadUrl,
    codeRepository: siteData.repositoryUrl,
    image: siteData.ogImageUrl,
    description: meta.description,
    featureList: siteData.keyFacts,
    publisher: { '@id': `${siteData.siteUrl}/#organization` },
  };
}

function breadcrumbSchema(items) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${items[items.length - 1].url}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function faqSchema(path, items) {
  return {
    '@type': 'FAQPage',
    '@id': `${routeMeta[path].canonical}#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.command ? `${item.answer} Command: ${item.command}` : item.answer,
      },
    })),
  };
}

function baseStructuredData(path, extras = []) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema(),
      {
        '@type': 'WebSite',
        '@id': `${siteData.siteUrl}/#website`,
        url: `${siteData.siteUrl}/`,
        name: siteData.name,
        description: siteData.description,
        publisher: { '@id': `${siteData.siteUrl}/#organization` },
      },
      softwareSchema(path),
      pageSchema(path),
      ...extras,
    ],
  };
}

function pageBreadcrumb(path, name) {
  return breadcrumbSchema([
    { name: 'Muesli', url: `${siteData.siteUrl}/` },
    { name, url: routeMeta[path].canonical },
  ]);
}

function PixelGarden() {
  return (
    <div className="pixel-garden" aria-label="Animated local speech workflow with a laptop and floating Muesli capture icon">
      <div className="sun" />
      <div className="cloud cloud-one" />
      <div className="cloud cloud-two" />
      <div className="hill hill-back" />
      <div className="hill hill-front" />
      <div className="garden-grid" />
      <div className="talker" aria-hidden="true">
        <div className="talker-face">
          <span className="eye eye-left" />
          <span className="eye eye-right" />
          <span className="mouth" />
        </div>
        <div className="speech-bubble">
          {speechSamples.map((sample) => (
            <span key={sample}>{sample}</span>
          ))}
        </div>
      </div>
      <div className="paste-stream" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="note-window">
        <div className="window-top">
          <span />
          <span />
          <span />
        </div>
        <div className="dictation-field">
          <strong>Notes</strong>
          <p className="typed-text">
            {speechSamples.map((sample) => (
              <span key={sample}>{sample.replace('...', '.')}</span>
            ))}
          </p>
          <i className="paste-cursor" />
        </div>
        <div className="spark-note">
          <Sparkles size={14} />
          pasted locally
        </div>
        <div className="laptop-base" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="floating-capture">
        <img className="capture-icon" src={iconUrl} alt="" />
        <div className="capture-status">
          <span>listening</span>
          <div className="mini-wave">
            <b />
            <b />
            <b />
            <b />
          </div>
        </div>
      </div>
    </div>
  );
}

function XLogo(props) {
  return (
    <svg viewBox="0 0 1200 1227" aria-hidden="true" focusable="false" {...props}>
      <path d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894L144.011 79.694h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z" />
    </svg>
  );
}

function LinkedInLogo(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.85-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.554V9h3.565v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

function LegalPage({ page, path }) {
  useEffect(() => {
    const meta = routeMeta[path];
    document.title = meta?.title || `${page.title} · Muesli`;
    setCanonicalUrl(path);
  }, [page.title, path]);

  const structuredData = baseStructuredData(path, [
    pageBreadcrumb(path, page.title),
  ]);

  return (
    <main className="legal-page">
      <JsonLd data={structuredData} />
      <nav className="legal-nav">
        <a className="brand" href="/" aria-label="Muesli home">
          <img src={iconUrl} alt="" />
          <span>muesli</span>
        </a>
        <a className="legal-back" href="/">
          <ArrowLeft size={17} />
          Back to muesli.works
        </a>
      </nav>

      <article className="legal-document">
        <h1>{page.title}</h1>
        <p className="legal-updated">Last updated: {page.updated}</p>
        <p className="legal-intro">{page.intro}</p>

        {page.sections.map((section) => (
          <section className="legal-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets && (
              <ul>
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>

      <footer className="legal-footer">
        <span>muesli · local-first · open source</span>
        <a href="https://github.com/pHequals7/muesli" target="_blank" rel="noreferrer">GitHub</a>
      </footer>
    </main>
  );
}

function SupportAnswer({ item }) {
  return (
    <>
      <p>{item.answer}</p>
      {item.command && (
        <span className="command-row">
          <code>{item.command}</code>
        </span>
      )}
    </>
  );
}

function HelpPage() {
  useEffect(() => {
    const meta = routeMeta['/help'];
    document.title = meta.title;
    setCanonicalUrl('/help');
  }, []);

  const structuredData = baseStructuredData('/help', [
    pageBreadcrumb('/help', 'Help and troubleshooting'),
    faqSchema('/help', supportFaqItems),
  ]);

  return (
    <main className="legal-page utility-page">
      <JsonLd data={structuredData} />
      <nav className="legal-nav">
        <a className="brand" href="/" aria-label="Muesli home">
          <img src={iconUrl} alt="" />
          <span>muesli</span>
        </a>
        <a className="legal-back" href="/">
          <ArrowLeft size={17} />
          Back to muesli.works
        </a>
      </nav>

      <article className="legal-document">
        <h1>Help and troubleshooting</h1>
        <p className="legal-intro">
          Fix common Muesli setup issues around macOS permissions, paste behavior, hotkeys, meeting audio,
          calendar events, and app installation.
        </p>

        {supportFaqItems.map((item) => (
          <section className="legal-section" key={item.question}>
            <h2>{item.question}</h2>
            <SupportAnswer item={item} />
          </section>
        ))}
      </article>

      <footer className="legal-footer">
        <span>Still stuck? The project is open source.</span>
        <a href={siteData.repositoryUrl} target="_blank" rel="noreferrer">Open GitHub</a>
      </footer>
    </main>
  );
}

function ChangelogPage() {
  const { releases, releaseStatus } = useStableReleases();

  useEffect(() => {
    const meta = routeMeta['/changelog'];
    document.title = meta.title;
    setCanonicalUrl('/changelog');
  }, []);

  const structuredData = baseStructuredData('/changelog', [
    pageBreadcrumb('/changelog', 'Changelog'),
  ]);

  return (
    <main className="legal-page utility-page">
      <JsonLd data={structuredData} />
      <nav className="legal-nav">
        <a className="brand" href="/" aria-label="Muesli home">
          <img src={iconUrl} alt="" />
          <span>muesli</span>
        </a>
        <a className="legal-back" href="/">
          <ArrowLeft size={17} />
          Back to muesli.works
        </a>
      </nav>

      <article className="legal-document">
        <h1>Changelog</h1>
        <p className="legal-intro">
          Muesli ships in public. Stable release notes and macOS downloads are published through GitHub Releases,
          where each production build has its canonical notes and DMG assets.
        </p>

        <div className="utility-changelog-feed">
          <ReleaseFeed releases={releases} releaseStatus={releaseStatus} maxVisible={6} />
        </div>

        {changelogLinks.map((link) => (
          <section className="legal-section" key={link.title}>
            <h2>{link.title}</h2>
            <p>{link.body}</p>
            <p>
              <a href={link.url} target="_blank" rel="noreferrer">{link.url}</a>
            </p>
          </section>
        ))}
      </article>

      <footer className="legal-footer">
        <span>Prefer the latest build?</span>
        <a href={siteData.latestReleaseUrl} target="_blank" rel="noreferrer">Open latest release</a>
      </footer>
    </main>
  );
}

function ProductPageNav() {
  return (
    <nav className="product-nav">
      <a className="brand" href="/" aria-label="Muesli home">
        <img src={iconUrl} alt="" />
        <span>muesli</span>
      </a>
      <div className="product-nav-links">
        <a href="/#notes">Product</a>
        <a href="/#privacy">Privacy</a>
        <a href="/changelog">Releases</a>
        <a className="product-nav-cta" href={downloadUrl}>
          <Download size={17} />
          Download
        </a>
      </div>
    </nav>
  );
}

function MacDictationAppPage() {
  useEffect(() => {
    const meta = routeMeta['/mac-dictation-app'];
    document.title = meta.title;
    setCanonicalUrl('/mac-dictation-app');
  }, []);

  const macDictationStructuredData = baseStructuredData('/mac-dictation-app', [
    pageBreadcrumb('/mac-dictation-app', 'Mac Dictation App'),
    faqSchema('/mac-dictation-app', macDictationFaqItems),
    {
      '@type': 'Article',
      '@id': `${routeMeta['/mac-dictation-app'].canonical}#article`,
      headline: 'A Mac dictation app that keeps your speech on your Mac',
      description: routeMeta['/mac-dictation-app'].description,
      image: siteData.ogImageUrl,
      author: {
        '@type': 'Organization',
        name: siteData.name,
      },
      publisher: { '@id': `${siteData.siteUrl}/#organization` },
      mainEntityOfPage: { '@id': `${routeMeta['/mac-dictation-app'].canonical}#webpage` },
    },
  ]);

  return (
    <main className="product-page article-page mac-dictation-page">
      <JsonLd data={macDictationStructuredData} />
      <ProductPageNav />

      <article className="seo-article">
        <figure className="seo-article-image">
          <img src={solarpunkParkSpeechLawnUrl} alt="A solarpunk park workspace with gardens, solar structures, a laptop, and no visible human face" />
        </figure>

        <header className="seo-article-hero">
          <div className="seo-article-kicker">Mac dictation guide</div>
          <h1>A Mac dictation app that keeps your speech on your Mac.</h1>
          <p>
            Dictation is most useful when it stays close to the work. Muesli turns speech into text on Apple
            Silicon, then pastes it into the app you were already using.
          </p>
          <div className="seo-article-actions">
            <a className="primary-cta" href={downloadUrl}>
              <Download size={19} />
              Download for macOS
            </a>
            <a className="secondary-cta" href="/on-device-dictation/">
              Read the product page
              <ArrowRight size={18} />
            </a>
          </div>
        </header>

        <section className="seo-article-section seo-article-lede">
          <p>
            A good Mac dictation app should not feel like a recording booth. It should feel like a small speech layer
            sitting inside the apps you already use: notes, email, chat, documents, issue trackers, browser fields,
            and the unfinished draft you were avoiding.
          </p>
          <p>
            That is the practical case for Muesli. Hold a hotkey, speak normally, release, and the cleaned text lands
            at the cursor. For everyday dictation, offline models such as Parakeet and Whisper transcribe on the Mac
            instead of sending each thought through a hosted speech-to-text pipeline.
          </p>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>What matters</span>
            <h2>What makes a Mac dictation app fast enough for everyday writing?</h2>
          </div>
          <p>
            Many speech-to-text tools work only after you move into their editor, start a recording, copy the
            transcript, and paste it back where the text was supposed to go. That is a high-friction path for a
            sentence, a reply, or a half-formed paragraph.
          </p>
          <p>
            Muesli is built around the shorter version: capture speech from the menu bar, transcribe locally, clean up
            the text, and paste it into the active Mac app. The workflow is intentionally plain because dictation is
            usually a means to an end, not the main event.
          </p>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Model choice</span>
            <h2>Can offline models such as Parakeet and Whisper transcribe well on Mac?</h2>
          </div>
          <p>
            Apple Silicon changed the shape of local speech-to-text. Fast local models can handle short dictation
            without a cloud round trip, while larger model families give people more control over accuracy, language,
            and latency tradeoffs.
          </p>
          <p>
            Muesli supports local ASR options including Parakeet, Whisper, Qwen3 ASR, and other model paths. The
            important part is not having a long model list. It is that a Mac dictation app can choose the right local
            model for the job instead of treating every spoken sentence as a server request.
          </p>
        </section>

        <section className="seo-article-section seo-comparison-section">
          <div className="seo-section-heading">
            <span>Comparison</span>
            <h2>Should I use Apple Dictation, cloud transcription, or Muesli?</h2>
          </div>
          <div className="seo-comparison-table" role="table" aria-label="Mac dictation app comparison">
            <div className="seo-comparison-row seo-comparison-head" role="row">
              <strong>Option</strong>
              <strong>Where it helps</strong>
              <strong>Tradeoff</strong>
            </div>
            {macDictationComparisonRows.map(([option, helps, tradeoff]) => (
              <div className="seo-comparison-row" role="row" key={option}>
                <strong>{option}</strong>
                <span>{helps}</span>
                <span>{tradeoff}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Where it fits</span>
            <h2>Where can I use speech-to-text on my Mac?</h2>
          </div>
          <div className="seo-card-grid">
            {macDictationUseCases.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Privacy</span>
            <h2>Is local dictation more private than cloud speech-to-text?</h2>
          </div>
          <p>
            The useful distinction is simple: local dictation means the normal speech-to-text path does not begin by
            uploading audio to a hosted transcription service. That reduces the number of systems involved in turning a
            spoken thought into text.
          </p>
          <p>
            Muesli still uses normal macOS permissions. Microphone access captures speech, Input Monitoring handles
            the hotkey, and Accessibility lets the app paste text back into the active field. Optional integrations,
            such as cloud summarization or calendar access, are separate choices rather than the default dictation
            path.
          </p>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Beyond dictation</span>
            <h2>Can the same Mac app handle dictation and meeting notes?</h2>
          </div>
          <p>
            Muesli is not only a voice typing tool. The same app can also capture meeting audio from your Mac and keep
            a transcript you can review. That matters because many people need both workflows: quick dictation during
            the day, and a searchable record after calls.
          </p>
          <p>
            If that is the workflow you care about, read the meeting notes page after this one. The design principle is
            the same: capture from the machine you control, keep the source material close, and use AI as a layer on
            top rather than a place where the record disappears.
          </p>
        </section>

        <section className="seo-article-section seo-faq-section">
          <div className="seo-section-heading">
            <span>FAQ</span>
            <h2>What do people ask before switching Mac dictation tools?</h2>
          </div>
          <div className="faq-list dictation-faq-list">
            {macDictationFaqItems.map((item, index) => (
              <details className="faq-item" open={index === 0} key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="seo-article-cta">
          <img src={iconUrl} alt="" />
          <div>
            <h2>Want local dictation before adding another cloud speech service?</h2>
            <p>Open-source, Mac-native, and built for people who want speech-to-text to start on their own machine.</p>
          </div>
          <a className="primary-cta" href={downloadUrl}>
            <span className="apple-mark" aria-hidden="true"></span>
            Download Muesli
          </a>
        </footer>
      </article>
    </main>
  );
}

function OnDeviceDictationPage() {
  useEffect(() => {
    const meta = routeMeta['/on-device-dictation'];
    document.title = meta.title;
    setCanonicalUrl('/on-device-dictation');
  }, []);

  const dictationStructuredData = baseStructuredData('/on-device-dictation', [
    pageBreadcrumb('/on-device-dictation', 'On-device Dictation'),
    faqSchema('/on-device-dictation', dictationFaqItems),
  ]);

  return (
    <main className="product-page dictation-page">
      <JsonLd data={dictationStructuredData} />
      <ProductPageNav />

      <section className="product-hero">
        <img className="product-hero-bg" src={presidioHeroBgUrl} alt="" aria-hidden="true" />
        <div className="product-hero-copy">
          <h1>Dictation that stays on your Mac.</h1>
          <p className="lede">
            Muesli turns spoken thoughts into clean text without sending everyday dictation through a cloud
            speech pipeline. Hold a hotkey, speak naturally, release, and the text lands where your cursor already is.
          </p>
          <div className="cta-row">
            <a className="primary-cta" href={downloadUrl}>
              <Download size={19} />
              Download for macOS
            </a>
            <a className="secondary-cta" href="https://github.com/pHequals7/muesli" target="_blank" rel="noreferrer">
              <Github size={18} />
              Read the source
            </a>
          </div>
        </div>

        <div className="dictation-demo-card" aria-label="Muesli on-device dictation flow">
          <div className="notes-mock-chrome">
            <div className="notes-window-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="notes-toolbar">
              <span>Aa</span>
              <span>☑</span>
              <span>▦</span>
            </div>
            <div className="notes-search">Search</div>
          </div>
          <div className="notes-mock-body">
            <aside className="notes-sidebar" aria-label="Notes folders">
              <div className="notes-folder muted">Quick Notes <span>1</span></div>
              <p>iCloud</p>
              <div className="notes-folder active">Muesli Notes <span>12</span></div>
              <div className="notes-folder">Dictations <span>41</span></div>
              <div className="notes-folder">Meetings <span>8</span></div>
              <div className="notes-folder muted">Local AI <span>3</span></div>
            </aside>
            <div className="notes-list" aria-label="Recent notes">
              <strong>Previous 30 Days</strong>
              <div className="notes-list-item active">
                <b>On-device AI</b>
                <span>Today · Voice became text without leaving this Mac.</span>
              </div>
              <div className="notes-list-item">
                <b>Meeting recap</b>
                <span>No bot joined. Transcript stayed local.</span>
              </div>
              <div className="notes-list-item">
                <b>Launch tasks</b>
                <span>Clean up onboarding feedback.</span>
              </div>
            </div>
            <article className="notes-editor" aria-label="Muesli note output">
              <div className="notes-date">Today at 11:52 AM</div>
              <h3>On-device AI for everyday words</h3>
              <p>
                Hold Right Command, speak naturally, and Muesli pastes clean text into the note you were already writing.
              </p>
              <p>
                The dictation model runs on Apple Silicon. No hosted speech-to-text API is needed for quick thoughts,
                issue drafts, messages, or notes.
              </p>
              <div className="notes-caret" aria-hidden="true" />
            </article>
          </div>
          <div className="notes-muesli-status" aria-label="Muesli dictation is listening locally">
            <div className="dictation-hotkey">
              <img src={iconUrl} alt="" />
              <span>Hold Right Cmd</span>
              <div className="mini-wave" aria-hidden="true">
                <b />
                <b />
                <b />
                <b />
              </div>
            </div>
            <div className="dictation-local-strip">
              <span><HardDrive size={15} /> local model</span>
              <span><ShieldCheck size={15} /> no STT API</span>
            </div>
          </div>
        </div>
      </section>

      <section className="dictation-answer-strip" aria-label="Muesli on-device dictation summary">
        {dictationAnswerCards.map((card) => (
          <article key={card.title}>
            <h2>{card.title}</h2>
            <p>{card.body}</p>
          </article>
        ))}
      </section>

      <section className="product-section product-section-tight">
        <div className="product-story-grid">
          <div className="product-section-heading story-heading">
            <h2>For the text you were going to type anyway.</h2>
            <p>
              Dictation is most useful when it disappears into normal work. Muesli does not ask you to move your writing
              into a recorder app. It listens from the menu bar and pastes into Messages, Slack, Linear, Notion, Google
              Docs, email, terminals, issue trackers, or wherever the cursor is waiting.
            </p>
          </div>
          <figure className="story-visual">
            <img src={solarpunkDictationUrl} alt="A warm greenhouse workspace with a laptop and a blurred person nearby, suggesting natural local dictation" />
            <figcaption>
              <span>local speech layer</span>
              <strong>voice in, text out, no hosted STT detour</strong>
            </figcaption>
          </figure>
        </div>

        <div className="dictation-step-grid">
          {dictationSteps.map((step) => {
            const Icon = step.icon;
            return (
              <article className="dictation-step" key={step.title}>
                <Icon size={22} />
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="product-section dictation-proof-section">
        <div className="dictation-proof-card">
          <h2>Speech is a little too personal to treat like a generic upload.</h2>
          <p>
            A cloud dictation product can be convenient, but the security tradeoff is real: your voice leaves the
            machine before it becomes text, and every extra service in that path becomes another place to secure,
            audit, and trust. Muesli is designed for the opposite default. The dictation path runs locally, then uses
            macOS accessibility and paste behavior to put the result back into your current app.
          </p>
          <div className="dictation-note-list">
            {dictationNotes.map((note) => (
              <article key={note.title}>
                <h3>{note.title}</h3>
                <p>{note.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="product-section dictation-models-section">
        <div>
          <h2>Fast when you want fast. Flexible when you need a different model.</h2>
          <p>
            The recommended path is Parakeet on the Apple Neural Engine for quick dictation. Muesli also supports
            Whisper and Qwen3 ASR options for people who care more about a particular language, model family, or
            accuracy tradeoff than raw speed.
          </p>
        </div>
        <div className="model-table" role="table" aria-label="Muesli dictation model options">
          {dictationModels.map(([model, fit, runtime, latency]) => (
            <div className="model-row" role="row" key={model}>
              <strong>{model}</strong>
              <span>{fit}</span>
              <span>{runtime}</span>
              <b>{latency}</b>
            </div>
          ))}
        </div>
      </section>

      <section className="product-section dictation-faq-section">
        <div className="dictation-faq-heading">
          <h2>What “on-device” means here.</h2>
          <p>Short answers for the parts people usually want clarified before trusting dictation software.</p>
        </div>
        <div className="faq-list dictation-faq-list">
          {dictationFaqItems.map((item, index) => (
            <details className="faq-item" open={index === 0} key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="product-bottom-cta">
        <img src={iconUrl} alt="" />
        <h2>Try local-first dictation before renting another speech pipeline.</h2>
        <p>Open-source, Mac-native, and built for people who would rather keep their voice close.</p>
        <a className="primary-cta" href={downloadUrl}>
          <span className="apple-mark" aria-hidden="true"></span>
          Download Muesli
        </a>
      </section>
    </main>
  );
}

function MeetingNotesPage() {
  useEffect(() => {
    const meta = routeMeta['/meeting-notes'];
    document.title = meta.title;
    setCanonicalUrl('/meeting-notes');
  }, []);

  const meetingStructuredData = baseStructuredData('/meeting-notes', [
    pageBreadcrumb('/meeting-notes', 'Meeting Notes'),
    faqSchema('/meeting-notes', meetingFaqItems),
  ]);

  return (
    <main className="product-page meeting-page">
      <JsonLd data={meetingStructuredData} />
      <ProductPageNav />

      <section className="product-hero meeting-hero">
        <img className="product-hero-bg" src={solarpunkMeetingNotesUrl} alt="" aria-hidden="true" />
        <div className="product-hero-copy">
          <h1>Only Notes. No uninvited bots.</h1>
          <p className="lede">
            Muesli records from your own Mac, captures microphone and computer audio, and turns the transcript into
            meeting notes you can actually review. The meeting does not need another participant named “AI Notetaker.”
          </p>
          <div className="cta-row">
            <a className="primary-cta" href={downloadUrl}>
              <Download size={19} />
              Download for macOS
            </a>
            <a className="secondary-cta" href="https://github.com/pHequals7/muesli" target="_blank" rel="noreferrer">
              <Github size={18} />
              Read the source
            </a>
          </div>
        </div>

        <figure className="meeting-hero-card">
          <img src={solarpunkMeetingNotesUrl} alt="A warm solarpunk meeting workspace with notebooks, a laptop, and blurred people at the table" />
          <figcaption className="meeting-listening-pill" aria-label="Muesli is listening to this meeting">
            <img src={iconUrl} alt="" />
            <span className="meeting-listening-wave" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className="meeting-stop-indicator" aria-hidden="true" />
          </figcaption>
        </figure>
      </section>

      <section className="dictation-answer-strip meeting-answer-strip" aria-label="Muesli meeting notes summary">
        {meetingAnswerCards.map((card) => (
          <article key={card.title}>
            <h2>{card.title}</h2>
            <p>{card.body}</p>
          </article>
        ))}
      </section>

      <section className="product-section product-section-tight">
        <div className="product-story-grid meeting-story-grid">
          <div className="product-section-heading story-heading meeting-story-heading">
            <h2>Most meeting notes should begin with a transcript you control.</h2>
            <p>
              A summary is only useful if you can check it. Muesli keeps the raw meeting record close: what you said,
              what came through your speakers, and the notes generated from that transcript. Use it for standups,
              customer calls, research chats, interviews, or the messy internal meeting where the real decisions happen.
            </p>
          </div>

          <aside className="meeting-evidence-card" aria-label="Muesli meeting notes workflow">
            <h3>Keep the source material close, then let AI help with the shape.</h3>
            <p>
              The useful thing is not a beautiful summary by itself. It is a reviewable record of the call: microphone,
              system audio, transcript, then notes. Muesli keeps those layers visible instead of asking you to trust a
              black-box recap.
            </p>
            <div className="meeting-evidence-list">
              <article>
                <span>01</span>
                <strong>Capture</strong>
                <p>Record your voice and the call audio from your own Mac.</p>
              </article>
              <article>
                <span>02</span>
                <strong>Review</strong>
                <p>Use the transcript as the source when names, decisions, or wording matter.</p>
              </article>
              <article>
                <span>03</span>
                <strong>Export</strong>
                <p>Save notes, transcript, or the full meeting as Markdown or PDF.</p>
              </article>
            </div>
          </aside>
        </div>

        <div className="dictation-step-grid">
          {meetingSteps.map((step) => {
            const Icon = step.icon;
            return (
              <article className="dictation-step meeting-step" key={step.title}>
                <Icon size={22} />
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="product-section dictation-proof-section meeting-proof-section">
        <div className="dictation-proof-card">
          <h2>Meeting memory should not require renting another attendee.</h2>
          <p>
            Bot-based notetakers are convenient until the room changes because they are there. Muesli takes a quieter
            route: record from the machine you control, keep the transcript reviewable, and use summaries as a layer
            on top of the source material rather than a replacement for it.
          </p>
          <div className="dictation-note-list">
            {meetingNotes.map((note) => (
              <article key={note.title}>
                <h3>{note.title}</h3>
                <p>{note.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="product-section dictation-models-section meeting-export-section">
        <div>
          <h2>Keep the notes useful, but keep the source nearby.</h2>
          <p>
            Muesli can generate structured meeting notes, action items, and summaries, then export them as PDF or
            Markdown. If the wording matters, jump back to the transcript before treating the notes as the record.
          </p>
        </div>
        <div className="meeting-export-list" aria-label="Muesli meeting note outputs">
          <article>
            <span>01</span>
            <h3>Notes</h3>
            <p>Clean summary, decisions, action items, and follow-ups.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Transcript</h3>
            <p>The raw meeting text stays available for review and correction.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Export</h3>
            <p>Save notes, transcript, or the full meeting as Markdown or PDF.</p>
          </article>
        </div>
      </section>

      <section className="product-section dictation-faq-section">
        <div className="dictation-faq-heading">
          <h2>What “without a bot” means here.</h2>
          <p>Short answers for the parts people usually want clear before trusting meeting notes software.</p>
        </div>
        <div className="faq-list dictation-faq-list">
          {meetingFaqItems.map((item, index) => (
            <details className="faq-item" open={index === 0} key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="product-bottom-cta meeting-bottom-cta">
        <img src={iconUrl} alt="" />
        <h2>Try meeting notes that do not enter the room before you do.</h2>
        <p>Mac-native, local-first, and built around a transcript you can inspect.</p>
        <a className="primary-cta" href={downloadUrl}>
          <span className="apple-mark" aria-hidden="true"></span>
          Download Muesli
        </a>
      </section>
    </main>
  );
}

function LocalFirstPage() {
  useEffect(() => {
    const meta = routeMeta['/local-first-ai'];
    document.title = meta.title;
    setCanonicalUrl('/local-first-ai');
  }, []);

  const localFirstStructuredData = baseStructuredData('/local-first-ai', [
    pageBreadcrumb('/local-first-ai', 'Local-first AI'),
    faqSchema('/local-first-ai', localFirstFaqItems),
  ]);

  return (
    <main className="product-page local-first-page">
      <JsonLd data={localFirstStructuredData} />
      <ProductPageNav />

      <section className="product-hero local-first-hero">
        <img className="product-hero-bg" src={solarpunkLocalFirstUrl} alt="" aria-hidden="true" />
        <div className="product-hero-copy">
          <h1>AI that stays on your Mac.</h1>
          <p className="lede">
            Muesli turns speech into text locally, so everyday dictation and meeting transcripts do not have to begin
            with a cloud upload.
          </p>
          <div className="cta-row">
            <a className="primary-cta" href={downloadUrl}>
              <Download size={19} />
              Download for macOS
            </a>
            <a className="secondary-cta" href="https://github.com/pHequals7/muesli" target="_blank" rel="noreferrer">
              <Github size={18} />
              Read the source
            </a>
          </div>
        </div>

        <figure className="meeting-hero-card local-first-hero-card">
          <img src={solarpunkLocalFirstUrl} alt="A warm solarpunk desk with a laptop, notebooks, plants, and small local hardware in sunlight" />
          <figcaption className="local-compute-pill" aria-label="Muesli local compute status">
            <HardDrive size={18} />
            <span>local model</span>
          </figcaption>
        </figure>
      </section>

      <section className="dictation-answer-strip local-first-answer-strip" aria-label="Muesli local-first summary">
        {localFirstAnswerCards.map((card) => (
          <article key={card.title}>
            <h2>{card.title}</h2>
            <p>{card.body}</p>
          </article>
        ))}
      </section>

      <section className="product-section product-section-tight">
        <div className="product-story-grid">
          <div className="product-section-heading story-heading local-first-story-heading">
            <h2>Privacy is easier when less leaves in the first place.</h2>
            <p>
              Speech-to-text should sit inside the device boundary. Your Mac hears the audio, transcribes it, and gives
              you text. More complex work can still go to stronger models when you choose, but transcription should not
              start with a cloud upload.
            </p>
          </div>

          <aside className="local-first-machine-card" aria-label="Muesli local-first design">
            <h3>Basic transcription should not need a server.</h3>
            <p>
              Cloud GPUs are useful. Put them to work on harder tasks: reasoning, long summaries, integrations, and
              model-heavy workflows. Turning speech into text should happen on the machine already listening.
            </p>
            <div className="local-first-circuit">
              <span><Mic2 size={16} /> audio</span>
              <ArrowRight size={18} />
              <span><Cpu size={16} /> Mac</span>
              <ArrowRight size={18} />
              <span><FileText size={16} /> text</span>
            </div>
          </aside>
        </div>

        <div className="dictation-step-grid">
          {localFirstPrinciples.map((item, index) => {
            const icons = [HardDrive, CloudOff, Github];
            const Icon = icons[index];
            return (
              <article className="dictation-step local-first-step" key={item.title}>
                <Icon size={22} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="product-section dictation-models-section local-first-stack-section">
        <div>
          <h2>Local transcription. Explicit connections.</h2>
          <p>
            Muesli is not pretending the internet does not exist. It makes the boundary clear: speech-to-text starts on
            the Mac, storage stays local, and external providers are named parts of the workflow.
          </p>
        </div>
        <div className="local-first-stack-list" aria-label="Muesli local-first architecture">
          {localFirstStack.map(([title, body]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="product-section dictation-proof-section">
        <div className="dictation-proof-card local-first-proof-card">
          <h2>Open-source is how trust is established.</h2>
          <p>
            A privacy claim is weak if the product is a sealed box. Muesli’s code is public, so the important details can
            be inspected: what permissions are requested, where transcripts are stored, which model path runs, and when
            an optional integration is allowed to send data elsewhere.
          </p>
          <div className="dictation-note-list">
            <article>
              <h3>Permissions are tied to features</h3>
              <p>Microphone, Accessibility, Input Monitoring, Screen Recording, and Calendar each map to concrete app behavior.</p>
            </article>
            <article>
              <h3>Storage is local by default</h3>
              <p>Dictations, meetings, transcripts, and notes are kept in app storage on the Mac instead of a hosted dashboard.</p>
            </article>
            <article>
              <h3>Integrations stay visible</h3>
              <p>OpenAI, OpenRouter, ChatGPT, Google Calendar, and model downloads are optional layers, not hidden transcription defaults.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="product-section dictation-faq-section">
        <div className="dictation-faq-heading">
          <h2>What local-first means here.</h2>
          <p>Short answers about Muesli’s local transcription path, optional network features, and open-source design.</p>
        </div>
        <div className="faq-list dictation-faq-list">
          {localFirstFaqItems.map((item, index) => (
            <details className="faq-item" open={index === 0} key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="product-bottom-cta">
        <img src={iconUrl} alt="" />
        <h2>Try speech-to-text that starts on the machine you already trust.</h2>
        <p>Open-source, Mac-native, and designed to keep the default path close.</p>
        <a className="primary-cta" href={downloadUrl}>
          <span className="apple-mark" aria-hidden="true"></span>
          Download Muesli
        </a>
      </section>
    </main>
  );
}

function LandingPage() {
  const [stars, setStars] = useState(157);
  const [brewCopied, setBrewCopied] = useState(false);
  const { releases, releaseStatus } = useStableReleases();

  useEffect(() => {
    document.title = 'Muesli - speak, and keep your notes close';
    setCanonicalUrl('/');
  }, []);

  useEffect(() => {
    fetch('https://api.github.com/repos/pHequals7/muesli')
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (data?.stargazers_count != null) setStars(data.stargazers_count);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (window.twttr?.widgets) {
      window.twttr.widgets.load();
      return;
    }

    const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
    if (existingScript) return;

    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';
    document.body.appendChild(script);
  }, []);

  async function copyBrewCommand() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(brewCommand);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = brewCommand;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setBrewCopied(true);
      window.setTimeout(() => setBrewCopied(false), 1800);
    } catch {
      setBrewCopied(false);
    }
  }

  const landingStructuredData = baseStructuredData('/');

  return (
    <main className="no-graphics">
      <JsonLd data={landingStructuredData} />
      <nav className="nav">
        <a className="brand" href="#top" aria-label="Muesli home">
          <img src={iconUrl} alt="" />
          <span>muesli</span>
        </a>
        <div className="nav-links">
          <details className="nav-feature-menu">
            <summary>
              Features
              <ChevronDown size={15} aria-hidden="true" />
            </summary>
            <div className="nav-dropdown">
              <a href="/on-device-dictation/">On-device Dictation</a>
              <a href="/meeting-notes/">Meeting Notes</a>
              <a href="/local-first-ai/">Local-first AI</a>
            </div>
          </details>
          <a href="#privacy">Privacy</a>
          <a href="/changelog">Changelog</a>
          <a href="/help">Help</a>
          <a className="github-pill" href="https://github.com/pHequals7/muesli" target="_blank" rel="noreferrer">
            <Github size={17} />
            <span>Open source</span>
            <b><Star size={14} /> {formatStars(stars)}</b>
          </a>
        </div>
      </nav>

      <section className="hero" id="top">
        <img className="hero-bg-art" src={presidioHeroBgUrl} alt="" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><Stars size={16} /> local-first speech workspace</p>
          <h1>Your speech should belong to you.</h1>
          <p className="lede">
            Muesli is an open-source Mac app for dictation and meeting notes. Speak naturally, paste clean text,
            and keep transcripts close. Do not rent out speech to the cloud when it should be yours.
          </p>
          <div className="cta-row">
            <a className="primary-cta" href={downloadUrl}>
              <Download size={19} />
              Download for macOS
            </a>
            <a className="secondary-cta" href="#notes">
              Explore
              <ArrowRight size={18} />
            </a>
          </div>
          <button
            className={`brew-pill${brewCopied ? ' is-copied' : ''}`}
            type="button"
            onClick={copyBrewCommand}
            aria-label="Copy Homebrew install command"
          >
            {brewCopied ? <ClipboardCheck size={16} /> : <Clipboard size={16} />}
            <code>{brewCommand}</code>
            <span>{brewCopied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
        <PixelGarden />
      </section>

      <section className="notes-section" id="notes">
        <div className="section-kicker"><Coffee size={17} /> a calmer way to capture work</div>
        <div className="notes-layout">
          <div>
            <h2>From a half-formed thought to text in the place you were already working.</h2>
            <p>
              Muesli listens from the menu bar, cleans up your words, and pastes them back into the current app.
              The product story is simple: your Mac becomes a private speech layer for everyday work.
            </p>
          </div>
          <div className="flow-card">
            {workflow.map((item, index) => (
              <div className="flow-step" key={item}>
                <span>{index + 1}</span>
                <p>{item}</p>
                {index < workflow.length - 1 && <ArrowRight size={18} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="feature-band">
        {featureRows.map((feature) => {
          const Icon = feature.icon;
          const content = (
            <>
              <Icon size={22} />
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              {feature.dictationPill && (
                <div className="dictation-pill" aria-label="Muesli floating dictation control">
                  <img src={iconUrl} alt="" />
                  <span>Hold Right Cmd to dictate</span>
                </div>
              )}
              {feature.logos && (
                <div className="provider-logos" aria-label="Supported model providers">
                  {providerLogos.map((logo) => (
                    <img key={logo.alt} src={logo.src} alt={logo.alt} />
                  ))}
                </div>
              )}
              {feature.meetingLogos && (
                <div className="meeting-logos" aria-label="Supported meeting surfaces">
                  {meetingLogos.map((logo) => (
                    <img key={logo.alt} src={logo.src} alt={logo.alt} />
                  ))}
                </div>
              )}
              {feature.linkLabel && (
                <span className="feature-link-label">
                  {feature.linkLabel}
                  <ArrowRight size={16} aria-hidden="true" />
                </span>
              )}
            </>
          );

          if (feature.href) {
            return (
              <a className="feature feature-link" href={feature.href} key={feature.title}>
                {content}
              </a>
            );
          }

          return (
            <article className="feature" key={feature.title}>
              {content}
            </article>
          );
        })}
      </section>

      <section className="user-ticker" aria-label="Teams where Muesli users work">
        <p>Used by professionals everywhere to speed up their thoughts</p>
        <div className="ticker-window">
          <div className="ticker-track">
            {[...userLogos, ...userLogos].map((logo, index) => (
              <div className="ticker-logo" key={`${logo.name}-${index}`}>
                {logo.svg ? (
                  <span
                    className="ticker-wordmark"
                    role="img"
                    aria-label={logo.name}
                    dangerouslySetInnerHTML={{ __html: logo.svg }}
                  />
                ) : logo.img ? (
                  <img src={logo.img} alt={logo.name} />
                ) : (
                  <>
                    <span>{logo.name}</span>
                    {logo.subname && <small>{logo.subname}</small>}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials-section" aria-label="Muesli testimonials from X">
        <div className="testimonials-heading">
          <p className="section-kicker"><Sparkles size={17} /> from people trying muesli</p>
          <h2>People are already making speech feel local again.</h2>
        </div>
        <div className="tweet-wall">
          {tweetTestimonials.map((tweetUrl) => (
            <article className="tweet-card" key={tweetUrl}>
              <blockquote className="twitter-tweet" data-dnt="true" data-theme="light">
                <a href={tweetUrl}>View this post on X</a>
              </blockquote>
            </article>
          ))}
        </div>
      </section>

      <section className="privacy-section" id="privacy">
        <div className="privacy-art">
          <div className="comparison-card">
            <div className="comparison-column cloud-column">
              <span>Cloud dictation</span>
              <strong>Upload first, wait later</strong>
              <p>Speech leaves your machine, needs internet, waits in a hosted queue, then pastes when the round trip finishes.</p>
              <div className="cloud-demo" aria-hidden="true">
                <div className="workflow-card source-card">
                  <span>voice</span>
                  <strong>“send the recap”</strong>
                </div>
                <div className="cloud-route">
                  <i />
                  <i />
                  <i />
                  <em>upload</em>
                  <em>queue</em>
                  <em>return</em>
                </div>
                <div className="cloud-stack">
                  <div className="server-rack">
                    <b />
                    <b />
                    <b />
                  </div>
                  <span>hosted ASR</span>
                </div>
                <div className="latency-card">
                  <span>needs internet</span>
                  <strong>paste delayed</strong>
                  <small>round trip pending</small>
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>
            <div className="comparison-column local-column">
              <span>Muesli</span>
              <strong>Local speech, instant paste</strong>
              <p>Works without internet after install, stays Mac-native, and pastes from your own machine without a meeting bot.</p>
              <div className="local-demo" aria-hidden="true">
                <div className="local-core">
                  <img src={iconUrl} alt="" />
                  <span>on your Mac</span>
                </div>
                <div className="local-trace">
                  <b />
                  <b />
                  <b />
                </div>
                <div className="output-card">
                  <span>pasted now</span>
                  <strong>clean text</strong>
                  <small>offline ok</small>
                </div>
                <div className="local-badges">
                  <span>no bot</span>
                  <span>inspectable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="privacy-copy">
          <p className="section-kicker"><CloudOff size={17} /> open source, private by default</p>
          <h2>No guest in the meeting. No rented speech pipeline.</h2>
          <p>
            Muesli is personal, friendly, and local. The code is inspectable, the workflow is Mac-native,
            and the promise is clear: speech is intimate infrastructure, not a subscription toll road.
          </p>
          <div className="trust-grid">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div className="trust-item" key={item.text}>
                  <Icon size={18} />
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="changelog-section" id="changelog">
        <div className="changelog-heading">
          <p className="section-kicker"><History size={17} /> changelog from github</p>
          <h2>Every release, pulled from the open-source repo.</h2>
          <p>
            Muesli ships in public. This section reads the GitHub Releases feed directly and shows only
            stable public builds.
          </p>
        </div>

        <ReleaseFeed releases={releases} releaseStatus={releaseStatus} />
      </section>

      <section className="faq" id="faq">
        <div>
          <p className="section-kicker"><Wand2 size={17} /> faq</p>
          <h2>Common fixes for setup, permissions, and meeting capture.</h2>
        </div>
        <div className="faq-list">
          {faqItems.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary>{item.question}</summary>
              <SupportAnswer item={item} />
            </details>
          ))}
        </div>
      </section>

      <section className="bottom-cta">
        <img className="footer-bg-art" src={solarpunkBgUrl} alt="" aria-hidden="true" />
        <img className="bottom-icon" src={iconUrl} alt="" />
        <h2>Open-source speech workspace for your working memory.</h2>
        <p>Useful, local, and owned by the person doing the speaking.</p>
        <a className="primary-cta" href={downloadUrl}>
          <span className="apple-mark" aria-hidden="true"></span>
          Try the Mac app
        </a>
        <div className="social-links" aria-label="Muesli social links">
          <a href="https://x.com/fastspeech2text" target="_blank" rel="noreferrer" aria-label="Follow Muesli on X">
            <XLogo />
          </a>
          <a href="https://www.linkedin.com/company/mueslios/" target="_blank" rel="noreferrer" aria-label="Follow Muesli on LinkedIn">
            <LinkedInLogo />
          </a>
        </div>
        <p className="copyright">
          © 2026 Muesli. Built with &lt;3 by{' '}
          <a href="https://github.com/pHequals7" target="_blank" rel="noreferrer">pHequals7</a>
          {' '}and 10+ contributors.
          <span className="footer-links" aria-label="Legal links">
            <a href="/help">Help</a>
            <a href="/changelog">Changelog</a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </span>
        </p>
      </section>
    </main>
  );
}

export function App({ pathname = '/' }) {
  const path = normalizePath(pathname);
  const legalKey = path === '/privacy'
    ? 'privacy'
    : path === '/terms'
      ? 'terms'
      : null;

  if (legalKey) {
    return <LegalPage page={legalPages[legalKey]} path={path} />;
  }

  if (path === '/help') {
    return <HelpPage />;
  }

  if (path === '/changelog') {
    return <ChangelogPage />;
  }

  if (path === '/on-device-dictation') {
    return <OnDeviceDictationPage />;
  }

  if (path === '/mac-dictation-app') {
    return <MacDictationAppPage />;
  }

  if (path === '/meeting-notes') {
    return <MeetingNotesPage />;
  }

  if (path === '/local-first-ai') {
    return <LocalFirstPage />;
  }

  return <LandingPage />;
}
