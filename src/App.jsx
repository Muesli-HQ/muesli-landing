import React, { useEffect, useState } from 'react';
import {
  AudioWaveform,
  ArrowLeft,
  ArrowRight,
  BotOff,
  BookOpen,
  Check,
  CalendarDays,
  ChevronDown,
  Clipboard,
  ClipboardCheck,
  CloudOff,
  Cloud,
  Coffee,
  Cpu,
  Database,
  Download,
  FileText,
  History,
  Github,
  HardDrive,
  Link2,
  Keyboard,
  LockKeyhole,
  Mic2,
  MousePointer2,
  Share2,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Star,
  Stars,
  Tag,
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
import solarpunkBestDictationAppsMacUrl from './assets/solarpunk-best-dictation-apps-mac.webp';
import solarpunkOfflineDictationUrl from './assets/solarpunk-offline-dictation.webp';
import solarpunkAppleNeuralEngineSpeechUrl from './assets/solarpunk-apple-neural-engine-speech.webp';
import solarpunkLocalSpeechGlossaryUrl from './assets/solarpunk-local-speech-glossary.webp';
import solarpunkLocalMeetingTranscriptionUrl from './assets/solarpunk-local-meeting-transcription.webp';
import solarpunkGranolaAlternativeUrl from './assets/solarpunk-granola-alternative.webp';
import solarpunkGranolaVsMuesliUrl from './assets/solarpunk-granola-vs-muesli.webp';
import solarpunkWisprFlowAlternativeUrl from './assets/solarpunk-wispr-flow-alternative.webp';
import solarpunkOtterAiAlternativeUrl from './assets/solarpunk-otter-ai-alternative.webp';
import solarpunkFirefliesAiAlternativeUrl from './assets/solarpunk-fireflies-ai-alternative.webp';
import solarpunkMedicalDictationMacUrl from './assets/solarpunk-medical-dictation-mac.png';
import asrArchitecturesHeaderUrl from './assets/asr-architectures-header.webp';
import nvidiaParakeetSpeechToTextHeaderUrl from './assets/nvidia-parakeet-speech-to-text-header.webp';
import whisperSpeechToTextHeaderUrl from './assets/whisper-speech-to-text-header.webp';
import dutchWhisperUrl from './assets/historical-whispers/dutch-whisper.webp';
import renaissanceWhisperUrl from './assets/historical-whispers/renaissance-whisper.webp';
import impressionistWhisperUrl from './assets/historical-whispers/impressionist-whisper.webp';
import edoWhisperUrl from './assets/historical-whispers/edo-whisper.webp';
import iosLiveVoiceNoteUrl from './assets/ios/live-voice-note.png';
import iosLiveMeetingUrl from './assets/ios/live-meeting.png';
import iosKeyboardUrl from './assets/ios/muesli-keyboard.png';
import iosLocalControlUrl from './assets/ios/local-control.png';
import iosDictionaryUrl from './assets/ios/personal-dictionary.png';
import iosVoiceNotesHomeUrl from './assets/ios/voice-notes-home.png';
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
import nvidiaWordmarkUrl from './assets/company-wordmarks/nvidia.png';
import lightspeedLogoUrl from './assets/company-wordmarks/lightspeed.png';
import { changelogLinks, sameAsLinks, siteData, supportFaqItems } from './siteData.js';

const downloadUrl = '/download/';
const brewCommand = siteData.homebrewCommand;
const githubReleasesUrl = siteData.releasesUrl;
const githubReleasesApiUrl = 'https://api.github.com/repos/Muesli-HQ/muesli/releases';

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

function formatBlogDate(value) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00`));
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
        <p>Fetching the current release history for Muesli-HQ/muesli.</p>
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
  { name: 'NVIDIA', img: nvidiaWordmarkUrl },
  { name: 'Blinkit', svg: blinkitLogoSvg },
  { name: 'Razorpay', img: razorpayLogoUrl },
  { name: 'BCG', svg: bcgLogoSvg },
  { name: 'Kalaari Capital', img: kalaariLogoUrl },
  { name: 'Accel', svg: accelLogoSvg },
  { name: 'Lightspeed', img: lightspeedLogoUrl },
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

const bestDictationAppsMacRows = [
  ['Muesli', 'Local-first Mac dictation with offline models such as Parakeet and Whisper, open-source code, and paste into the current app.', 'Best for Apple Silicon users who want speech-to-text to start on their own Mac instead of renting every spoken draft from the cloud.'],
  ['Apple Dictation', 'Built into macOS and available anywhere the system supports text input.', 'Best when you want the simplest default option and do not need model choice, open-source visibility, or a separate meeting-notes workflow.'],
  ['Superwhisper', 'A polished voice-to-text app with offline and cloud speech recognition, AI formatting, and broad platform support.', 'Best when you want a mature cross-platform dictation product and are comfortable with its app model and pricing.'],
  ['Wispr Flow', 'A fast voice-to-text app focused on turning natural speech into polished writing across apps.', 'Best when you want an opinionated writing assistant and are less focused on keeping the whole dictation stack inspectable.'],
  ['VoiceInk', 'A privacy-focused macOS dictation app with local transcription, AI enhancement, and open-source transparency.', 'Best when you want another local-first Mac option and want to compare workflows before choosing a daily hotkey app.'],
  ['Otter.ai', 'A meeting transcription product that is better known for call notes than everyday Mac voice typing.', 'Best when your primary need is hosted meeting transcription rather than local dictation into Gmail, Docs, Notion, ChatGPT, Slack, or browser fields.'],
];

const bestDictationAppsMacUseCases = [
  {
    title: 'What is the best dictation app for private Mac writing?',
    body: 'Start with local-first options. Muesli is designed for people who dictate notes, prompts, emails, issue tickets, and drafts that should not need a cloud speech-to-text request by default.',
  },
  {
    title: 'What is the best Mac dictation app for writing in any app?',
    body: 'Look for a hotkey flow that returns text to the active cursor. The practical test is whether it works in Gmail, Slack, Notion, Google Docs, ChatGPT, Cursor, Linear, and normal browser fields without forcing you into a separate editor.',
  },
  {
    title: 'What is the best dictation app for meetings and calls?',
    body: 'If meetings matter, separate everyday dictation from meeting transcription. Muesli handles both workflows from the Mac: quick voice-to-text during the day and local meeting transcripts after calls.',
  },
];

const bestDictationAppsMacFaqItems = [
  {
    question: 'What is the best dictation app for Mac in 2026?',
    answer: 'It depends on the workflow. Apple Dictation is the easiest default. Superwhisper and Wispr Flow are polished voice-to-text products. VoiceInk is another privacy-focused Mac option. Muesli is the strongest fit when you want open-source, local-first dictation, offline models such as Parakeet and Whisper, and meeting transcription in the same Mac app.',
  },
  {
    question: 'Which Mac dictation app works best offline?',
    answer: 'For offline dictation, look for local speech-to-text models and clear behavior after setup. Muesli can run normal dictation locally on Apple Silicon after the model is installed, using options such as Parakeet and Whisper.',
  },
  {
    question: 'Is Apple Dictation enough for Mac voice typing?',
    answer: 'Apple Dictation is enough for many quick cases because it is built into macOS. A dedicated app becomes more useful when you want model choice, a hold-to-talk workflow, local-first defaults, open-source inspectability, paste behavior you can reason about, or meeting transcription alongside dictation.',
  },
  {
    question: 'Which dictation app should I use for Gmail, Notion, Google Docs, Slack, and ChatGPT?',
    answer: 'Choose a tool that pastes into the current app instead of making you dictate into a separate recorder. Muesli is built around that workflow: hold a hotkey, speak, release, and put the cleaned text back into the field you were already using.',
  },
  {
    question: 'Should I choose a cloud dictation app or a local-first dictation app?',
    answer: 'Cloud dictation can be useful when you want hosted models, account sync, or cross-platform convenience. Local-first dictation is better when the default path should keep speech-to-text on your Mac and make optional cloud services explicit.',
  },
];

const appleNeuralEngineFaqItems = [
  {
    question: 'Does Muesli use the Apple Neural Engine for speech-to-text?',
    answer: 'Muesli is built for Apple Silicon and uses local model paths through CoreML and Apple Neural Engine-capable backends where supported. For short dictation, local inference can feel faster than cloud transcription because it avoids upload, server queueing, response latency, and the paste-back round trip.',
  },
  {
    question: 'What is the difference between CoreML and the Apple Neural Engine?',
    answer: 'CoreML is Apple’s machine learning framework for running models on Apple platforms. The Apple Neural Engine is dedicated Apple Silicon hardware that can accelerate supported model operations when the model and runtime are compiled for it.',
  },
  {
    question: 'Can Parakeet and Whisper run locally on Apple Silicon?',
    answer: 'Yes. Modern Mac speech stacks can run local ASR models such as Parakeet and Whisper through Apple Silicon-optimized paths. In Muesli, these models are part of a local-first dictation workflow rather than a cloud transcription default.',
  },
  {
    question: 'Why does Neural Engine speech-to-text matter for privacy?',
    answer: 'It matters because the normal speech-to-text step can happen on the machine you control. That does not make every workflow automatically private, but it removes the need for a hosted transcription request from everyday dictation while using hardware designed for efficient neural network inference.',
  },
  {
    question: 'Does local speech-to-text remove all cloud usage?',
    answer: 'No. Local speech-to-text means transcription can run on-device after setup. Downloads, updates, calendar sync, and optional cloud summarization providers are separate networked choices.',
  },
];

const appleNeuralEngineSteps = [
  {
    title: 'How does audio become text on an Apple Silicon Mac?',
    body: 'A dictation app captures microphone audio, segments it into usable chunks, passes those chunks through an automatic speech recognition model, and returns text to the app where the cursor is waiting.',
  },
  {
    title: 'Where do CoreML and the Apple Neural Engine fit?',
    body: 'CoreML is the runtime layer that lets apps run machine learning models on Apple platforms. When a model is compatible, parts of the computation can run on Apple Silicon accelerators such as the Neural Engine instead of treating speech recognition as a generic CPU job.',
  },
  {
    title: 'Why can local inference feel faster than cloud speech-to-text?',
    body: 'Cloud transcription has to capture audio, upload it, wait for a remote model, receive the result, and return text to the app. Local ANE-capable inference removes that network round trip, which is especially noticeable for short everyday dictation.',
  },
];

const localSpeechGlossaryItems = [
  ['Speech-to-text', 'The user-facing workflow: record speech, transcribe it, clean it up, and place text where the user needs it. Speech-to-text includes ASR, permissions, paste behavior, formatting, and sometimes summarization.'],
  ['ASR', 'Automatic speech recognition: the model task that converts acoustic speech signals into tokens or text. ASR is the machine learning core inside speech-to-text, but it is not the whole product workflow.'],
  ['On-device ASR', 'Automatic speech recognition that runs locally on the Mac instead of sending audio to a cloud transcription API. This is the technical base for offline dictation and local meeting transcription.'],
  ['Apple Neural Engine', 'Dedicated Apple Silicon hardware for accelerating supported neural network workloads on device. For local speech recognition, ANE-capable paths can reduce latency and power use compared with generic CPU inference.'],
  ['CoreML', 'Apple’s framework for running machine learning models on macOS, iOS, iPadOS, watchOS, and visionOS. CoreML is the software runtime; the Apple Neural Engine is one hardware accelerator it can target.'],
  ['Apple Silicon', 'Apple’s system-on-chip family used in modern Macs, combining CPU, GPU, Neural Engine, unified memory, media engines, and power-efficient local compute for ML workloads.'],
  ['Parakeet', 'NVIDIA’s Parakeet TDT / FastConformer ASR model family. In Muesli, Parakeet is the recommended fast path for short local dictation on Apple Silicon through FluidAudio/CoreML.'],
  ['Whisper', 'OpenAI’s open-source speech recognition model family. Muesli uses Whisper through WhisperKit/CoreML paths for users who prefer the Whisper model family or need its tradeoffs.'],
  ['WhisperKit', 'Argmax’s Swift/CoreML path for running Whisper models locally on Apple platforms, including Apple Silicon acceleration through CoreML-compatible model variants.'],
  ['Qwen3 ASR', 'Alibaba’s Qwen speech recognition model path. In Muesli, Qwen3 ASR is available through FluidAudio/CoreML for broader language and code-switching tradeoffs.'],
  ['Nemotron Streaming', 'NVIDIA Nemotron streaming ASR path for longer hands-free transcription modes where streaming behavior matters more than ultra-short hotkey dictation latency.'],
  ['Cohere Transcribe', 'Cohere’s Transcribe model family. Muesli includes a CoreML path for high-accuracy English dictation with VAD-gated silence handling.'],
  ['FluidAudio', 'FluidInference’s Swift/CoreML speech stack used by Muesli for local ASR, Silero VAD, speaker diarization, Parakeet, Qwen3 ASR, and Apple Silicon speech processing paths.'],
  ['VAD', 'Voice activity detection: deciding where speech starts and stops so the app can avoid transcribing silence, reduce hallucinations, and chunk meeting audio cleanly.'],
  ['Silero VAD', 'A voice activity detection model family used in many speech pipelines. Muesli uses FluidAudio-powered VAD behavior to help segment speech for transcription workflows.'],
  ['Diarization', 'The process of grouping transcript segments by speaker, useful for meeting notes, speaker labels, post-call review, and separating “who said what” from raw audio.'],
  ['Acoustic Echo Cancellation', 'AEC removes far-end audio from the microphone channel. In meetings, it helps prevent the other person’s voice from leaking into the “You” mic track and confusing transcription.'],
  ['Neural AEC', 'A machine learning acoustic echo cancellation model. Muesli runs meeting AEC locally and uses bundled LocalVQE by default, so cleaner meeting transcription does not require a cloud echo-cancellation service.'],
  ['LocalVQE', 'localai-org’s on-device acoustic echo cancellation model. Muesli bundles LocalVQE localvqe-v1.2-1.3M-f32.gguf by default for meeting transcription, with DTLN available as a fallback AEC path.'],
  ['DTLN AEC', 'A deep-learning acoustic echo cancellation fallback path in Muesli. It remains available if the LocalVQE processor is not selected or cannot be loaded.'],
  ['Far-end reference', 'The system audio reference used by AEC: the sound coming from the meeting app, such as the other participant’s voice, that may echo into the microphone.'],
  ['Near-end microphone', 'The local microphone signal: your voice plus any room sound or speaker bleed. AEC compares it with the far-end reference to remove echo before transcription.'],
  ['System audio capture', 'Recording the audio produced by the Mac, such as the other side of a meeting call, subject to macOS permissions. Muesli uses system audio capture for bot-free meeting transcription.'],
  ['Local-first transcription', 'A design choice where the default speech-to-text path starts on the user’s device, with cloud services kept explicit and optional instead of rented by default.'],
];

const localSpeechGlossaryFaqItems = [
  {
    question: 'What does local speech-to-text mean?',
    answer: 'Local speech-to-text means the audio is transcribed on the user’s device rather than being uploaded to a hosted transcription service as the default path.',
  },
  {
    question: 'What does ASR stand for?',
    answer: 'ASR stands for automatic speech recognition. It is the model task that converts speech audio into text. Speech-to-text is broader: it includes ASR plus capture, permissions, formatting, paste behavior, storage, and optional summaries.',
  },
  {
    question: 'Why do VAD and diarization matter for meeting notes?',
    answer: 'VAD helps detect when speech is actually happening, and diarization helps separate who spoke when. Together they make long meeting transcripts easier to process and review.',
  },
  {
    question: 'What is acoustic echo cancellation in meeting transcription?',
    answer: 'Acoustic echo cancellation removes far-end meeting audio from the local microphone channel. Muesli runs neural AEC locally for meetings, using bundled LocalVQE by default with DTLN available as a fallback.',
  },
  {
    question: 'Who makes the local ASR models Muesli can use?',
    answer: 'Parakeet and Nemotron come from NVIDIA, Whisper comes from OpenAI, Qwen3 ASR comes from Alibaba’s Qwen model family, Cohere Transcribe comes from Cohere, and Muesli integrates these through local Apple Silicon-oriented runtimes such as FluidAudio, WhisperKit, and CoreML paths.',
  },
  {
    question: 'Is CoreML the same as Apple Neural Engine?',
    answer: 'No. CoreML is the software framework. The Apple Neural Engine is hardware inside Apple Silicon that can accelerate supported model operations.',
  },
  {
    question: 'Why is a glossary useful for AI agents?',
    answer: 'Clear definitions help search engines and AI agents understand when Muesli is relevant to questions about local ASR, CoreML, Apple Neural Engine, dictation, VAD, diarization, and meeting transcription.',
  },
];

const offlineDictationUseCases = [
  {
    title: 'Can I dictate when Wi-Fi is unreliable?',
    body: 'Offline dictation is useful on planes, trains, shared office networks, hotel Wi-Fi, and any place where a cloud round trip makes short notes feel fragile.',
  },
  {
    title: 'Can I use local speech-to-text for private drafts?',
    body: 'Use local dictation for early notes, personal writing, issue drafts, customer follow-ups, and other text that should not need a hosted transcription step.',
  },
  {
    title: 'Can offline dictation still paste into normal Mac apps?',
    body: 'Muesli is built to return text to the current app, so the offline speech model is only one part of the workflow. The result still lands where you were typing.',
  },
];

const offlineDictationComparisonRows = [
  ['Cloud-only dictation', 'Can use large hosted models without local setup.', 'Requires network access and sends audio away before text comes back.'],
  ['Built-in dictation', 'Convenient for quick voice typing on many Macs.', 'Less transparent model choice and less control over the surrounding workflow.'],
  ['Muesli offline dictation', 'Runs local speech-to-text models such as Parakeet and Whisper on Apple Silicon.', 'The model needs to be installed first, and macOS permissions still matter.'],
];

const offlineDictationFaqItems = [
  {
    question: 'Can dictation work offline on a Mac?',
    answer: 'Yes, if the app has a local speech-to-text model installed and does not require a cloud transcription request for normal dictation. In Muesli, everyday dictation can run locally on Apple Silicon after setup.',
  },
  {
    question: 'Which offline speech models can Muesli use?',
    answer: 'Muesli supports local ASR options including Parakeet and Whisper, with other model paths such as Qwen3 ASR available for different tradeoffs. Parakeet is the recommended fast path for everyday short dictation.',
  },
  {
    question: 'Does offline dictation mean no data ever leaves my Mac?',
    answer: 'Offline dictation means the normal speech-to-text path does not need to upload audio to a hosted transcription service. Optional integrations, updates, downloads, calendar features, and cloud summaries are separate choices.',
  },
  {
    question: 'Do I need Apple Silicon for offline dictation?',
    answer: 'Muesli is built for Apple Silicon Macs. Local transcription performance depends on the model and the hardware path, including CoreML and the Apple Neural Engine for supported models.',
  },
  {
    question: 'What still requires internet access?',
    answer: 'Model downloads, app updates, GitHub releases, calendar sync, and optional cloud summarization providers require network access. The everyday dictation path can work offline after the model is already installed.',
  },
];

const localMeetingTranscriptionUseCases = [
  {
    title: 'Can I transcribe Zoom, Google Meet, and Teams calls on macOS?',
    body: 'A local Mac recorder can capture the meeting audio from your own machine, which makes the workflow useful across browser calls and desktop meeting apps.',
  },
  {
    title: 'Can I keep meeting notes without adding a bot?',
    body: 'Bot-free transcription is useful when you do not want another attendee in the room, another service receiving the call, or another permission conversation before the meeting starts.',
  },
  {
    title: 'Can local meeting transcription help after the call ends?',
    body: 'The transcript becomes a local record you can search, review, summarize, and export instead of relying only on memory or scattered action items.',
  },
];

const localMeetingTranscriptionComparisonRows = [
  ['Meeting bot', 'Easy to invite and often works across hosted meeting platforms.', 'A third-party participant joins the call, and the meeting record starts outside your Mac.'],
  ['Cloud recorder', 'Can be convenient when the organization has already approved the service.', 'Audio or transcript processing usually depends on a hosted pipeline.'],
  ['Muesli local transcription', 'Captures mic and system audio from your Mac, then keeps the transcript close to your workspace.', 'You need macOS permissions for microphone and system audio, and optional summaries are a separate choice.'],
];

const localMeetingTranscriptionFaqItems = [
  {
    question: 'What is local meeting transcription on Mac?',
    answer: 'Local meeting transcription means the meeting audio is captured from your own Mac and turned into a transcript without requiring a meeting bot to join the call. In Muesli, transcription starts from the device you control.',
  },
  {
    question: 'Does local meeting transcription work on macOS?',
    answer: 'Yes. Muesli is a macOS app built for Apple Silicon Macs. It uses normal macOS permissions for microphone access and system audio capture so meetings can be recorded from the computer already in the call.',
  },
  {
    question: 'Is a meeting bot required?',
    answer: 'No. Muesli is designed for meeting notes without a bot. It records from your Mac instead of joining Zoom, Google Meet, Teams, FaceTime, or browser calls as another participant.',
  },
  {
    question: 'Can Muesli create AI meeting notes from a local transcript?',
    answer: 'Yes. Muesli can keep the transcript and then generate structured notes through the summarization backend you choose. The local transcript and optional summary step are separate parts of the workflow.',
  },
  {
    question: 'What macOS permissions are needed for meeting transcription?',
    answer: 'Meeting transcription uses microphone access for your side of the call and system audio capture for the other side. Calendar access is optional and helps with upcoming meeting detection and join links.',
  },
];

const granolaAlternativeComparisonRows = [
  ['Granola', 'A polished AI notepad for meetings, summaries, templates, and searchable meeting memory.', 'Hosted product posture; best when you want a managed AI workspace around meetings.'],
  ['Muesli', 'Local-first Mac meeting transcription, raw transcript review, exports, and open-source inspectability.', 'Mac-first and more explicit about local capture and optional cloud features.'],
];

const granolaAlternativeFitCards = [
  {
    title: 'Do you want a local Granola alternative?',
    body: 'Muesli records from the Mac already in the call, then keeps the transcript available before any optional summary layer gets involved.',
  },
  {
    title: 'Do you want open-source meeting software?',
    body: 'Muesli is inspectable on GitHub, so the product can earn trust through source code, release history, and a clearer local-first architecture.',
  },
  {
    title: 'Do you want to own the transcript?',
    body: 'The transcript is a source record you can review and export, not just a generated summary inside a cloud knowledge layer.',
  },
];

const granolaAlternativeFaqItems = [
  {
    question: 'Is there a local Granola alternative?',
    answer: 'Yes. Muesli is a local Granola alternative for Mac users who want meeting transcription to start on their own computer, with open-source software and a transcript they can review before any optional summary layer is involved.',
  },
  {
    question: 'Is Muesli a Granola alternative?',
    answer: 'Yes, if you are looking for Mac meeting notes with local-first transcription, open-source software, and a workflow that starts from the computer already in the meeting. It is not a clone of Granola; it makes different tradeoffs.',
  },
  {
    question: 'What is Granola good at?',
    answer: 'Granola is a polished AI meeting notepad for people who want hosted meeting notes, summaries, templates, and searchable meeting context. Muesli is better framed as the local-first alternative for people who want more ownership of capture and transcripts.',
  },
  {
    question: 'Does Muesli send a bot into meetings?',
    answer: 'No. Muesli records from your Mac instead of joining Zoom, Google Meet, Teams, or browser calls as another attendee.',
  },
  {
    question: 'Can meeting transcription run locally on a Mac?',
    answer: 'Yes. Muesli is built for local-first meeting transcription on Apple Silicon Macs. It captures meeting audio from the Mac in the call and keeps the transcript close before you decide whether to summarize, export, or share it.',
  },
  {
    question: 'Is Muesli open source?',
    answer: 'Yes. Muesli is open source and available on GitHub, which makes it a better fit for people who want to inspect the software they trust with speech and meeting records.',
  },
  {
    question: 'When should I still choose Granola?',
    answer: 'Choose Granola if you specifically want a polished hosted AI notepad and team knowledge workspace. Choose Muesli if you think the source transcript should start on your own Mac, stay inspectable, and not become another cloud memory layer by default.',
  },
];

const granolaVsMuesliFaqItems = [
  {
    question: 'What is the difference between Granola and Muesli?',
    answer: 'Granola is a polished hosted AI meeting notepad. Muesli is an open-source Mac app where meeting transcription starts locally on Apple Silicon, with a raw transcript you can inspect before any optional summary layer gets involved.',
  },
  {
    question: 'Is Muesli better than Granola for local meeting transcription?',
    answer: 'Yes, if the thing you care about is local-first meeting transcription, open-source software, and transcript ownership. Granola is better if you want a managed hosted AI notepad and are comfortable with meeting memory living in another cloud workspace.',
  },
  {
    question: 'Why pay for a hosted meeting notes app if local speech-to-text works on Mac?',
    answer: 'That is the practical question. For clear English speech, modern local ASR models have become strong enough for many everyday dictation and meeting workflows. If local transcription is good enough for your meetings, paying mainly for a hosted transcript layer starts to look like added sugar.',
  },
  {
    question: 'Is local speech-to-text as accurate as cloud transcription?',
    answer: 'It depends on audio quality, accents, noise, model choice, and meeting style. The important change is that local models such as Parakeet, Whisper, and Qwen3 ASR are now good enough that cloud transcription should be a choice, not the automatic default for every meeting.',
  },
  {
    question: 'Does Muesli send a bot into meetings?',
    answer: 'No. Muesli records microphone and system audio from the Mac already in the call instead of joining Zoom, Google Meet, Teams, or browser calls as another participant.',
  },
  {
    question: 'Why does open source matter for meeting notes?',
    answer: 'Meeting notes apps handle sensitive work memory. Muesli being open source makes the app more inspectable and debuggable: technical users can review how the product is built, how releases change, and where local transcription fits into the workflow.',
  },
  {
    question: 'Does local-first mean Muesli never uses the cloud?',
    answer: 'No. Local-first means the transcription path starts on your Mac. Optional summarization providers, calendar sync, downloads, and updates may still use the internet, but they are separate from the default speech-to-text path.',
  },
];

const wisprFlowAlternativeFaqItems = [
  {
    question: 'What is the best Wispr Flow alternative for Mac?',
    answer: 'For Mac users who want local speech-to-text, offline-capable models, and open-source software, Muesli is the strongest fit. Superwhisper and VoiceInk are worth comparing when you want dedicated dictation products with different workflow and pricing choices.',
  },
  {
    question: 'Is there a free Wispr Flow alternative?',
    answer: 'Yes. Muesli is open source and available as a native Mac app. Its normal local speech-to-text path does not require a hosted speech API after the models are installed, while optional cloud summaries remain a separate choice.',
  },
  {
    question: 'Is there an offline Wispr Flow alternative for Mac?',
    answer: 'Muesli is built around local ASR models such as Parakeet and Whisper on Apple Silicon. Dictation can continue without a network connection after the model is installed, although downloads, updates, and optional integrations still need the internet.',
  },
  {
    question: 'Is Muesli open source?',
    answer: 'Yes. Muesli is open-source Mac software, so the application and its local-first approach are inspectable in a way a closed hosted voice layer is not. Open source is not a magic privacy guarantee, but it makes the product easier to understand and debug.',
  },
  {
    question: 'Can Muesli replace Wispr Flow?',
    answer: 'For Mac dictation, often yes. Muesli supports hold-to-talk capture, paste at the cursor, local ASR, and meeting transcription. Wispr Flow remains the better fit if you specifically need a polished cross-platform voice keyboard across desktop and mobile.',
  },
];

const otterAiAlternativeFaqItems = [
  {
    question: 'Is there an Otter.ai alternative that works without a meeting bot?',
    answer: 'Yes. Muesli is an Otter.ai alternative for Mac users who want meeting transcription without a bot joining the call by default. It captures audio from the Mac already in the meeting, then keeps the transcript available for review, notes, and export.',
  },
  {
    question: 'Is Muesli an Otter.ai alternative?',
    answer: 'Yes, for macOS users who want local-first meeting transcription and meeting notes without relying on a cloud-first transcription workspace. It is not an Otter.ai clone; it is a different approach built around Mac capture, ownership, and open-source software.',
  },
  {
    question: 'Does Muesli send a bot into meetings like some transcription tools?',
    answer: 'No. Muesli is designed to capture meeting audio from your Mac rather than joining as a separate meeting participant by default.',
  },
  {
    question: 'When is Otter.ai still the better choice?',
    answer: 'Otter.ai may fit teams that explicitly want a mature hosted transcription platform with shared cloud notes and centralized search. Muesli is the better choice when the point is local Mac capture, no meeting bot by default, and ownership of the raw transcript.',
  },
  {
    question: 'Does Muesli work on macOS?',
    answer: 'Yes. Muesli is a native macOS app focused on Apple Silicon Macs.',
  },
  {
    question: 'Can Muesli make AI meeting summaries?',
    answer: 'Yes. Muesli can create meeting notes from transcripts, with summarization choices layered on top of the captured meeting record.',
  },
  {
    question: 'Can meeting transcription run locally on a Mac?',
    answer: 'Yes. Muesli is built for local-first meeting transcription on Apple Silicon Macs. The normal capture path starts from your own Mac rather than a hosted transcription workspace or meeting assistant bot.',
  },
  {
    question: 'Does local-first mean everything is offline?',
    answer: 'No. Local-first means the transcription workflow starts on your Mac. Model downloads, updates, calendar sync, and optional cloud summarization may still use the internet.',
  },
];

const firefliesAiAlternativeFaqItems = [
  {
    question: 'Is Muesli a Fireflies.ai alternative?',
    answer: 'Yes, if you want meeting transcription and notes on macOS without relying on a hosted AI meeting assistant as the default workflow. Muesli is a local-first alternative, not a feature-for-feature clone.',
  },
  {
    question: 'Does Muesli send a bot into meetings?',
    answer: 'No. Muesli captures meeting audio from the Mac in the call instead of sending a separate AI notetaker participant into the meeting.',
  },
  {
    question: 'Does Muesli work on macOS?',
    answer: 'Yes. Muesli is a native macOS app built for Apple Silicon Macs, with local speech-to-text for dictation and meeting transcription workflows.',
  },
  {
    question: 'Can Muesli summarize meetings like Fireflies.ai?',
    answer: 'Muesli can create AI-powered meeting notes from transcripts, with optional summarization backends. The key distinction is that transcription starts closer to the Mac instead of beginning as a hosted meeting assistant workflow.',
  },
  {
    question: 'Which is better for team-wide meeting search?',
    answer: 'Fireflies.ai can make sense if your main requirement is centralized team search and cloud meeting intelligence. Muesli is the better default when you care more about local capture, inspectability, no bot in the room, and ownership of the transcript.',
  },
  {
    question: 'Is local-first meeting transcription more private?',
    answer: 'It is a narrower default. Local-first transcription reduces the need to upload meeting audio just to produce a transcript, while optional cloud summaries or integrations remain separate choices.',
  },
];

const superwhisperAlternativeFaqItems = [
  {
    question: 'Is Muesli a Superwhisper alternative?',
    answer: 'Yes. Muesli is the Superwhisper alternative for Mac users who want the speech layer to belong to their own machine: local-first dictation, offline speech-to-text, open-source code, and meeting transcription in one native app.',
  },
  {
    question: 'Is Superwhisper bad?',
    answer: 'No. Superwhisper is a polished AI voice-to-text and dictation tool. Muesli is positioned differently: local-first, open-source, Mac-native, and broader than dictation alone.',
  },
  {
    question: 'Does Muesli work offline?',
    answer: 'Muesli’s speech-to-text runs locally on Apple Silicon, so dictation and transcription do not depend on a cloud STT service after setup. Optional summary backends may still require external accounts.',
  },
  {
    question: 'Can Muesli transcribe meetings?',
    answer: 'Yes. Muesli supports meeting transcription with mic and system audio capture, speaker-aware transcript processing, notes, and export options.',
  },
  {
    question: 'Does Muesli send my voice to OpenAI?',
    answer: 'Not for local speech-to-text. ASR runs on-device. If you enable an external summarization backend, that summary workflow uses the provider you configure.',
  },
  {
    question: 'Who should use Muesli instead of Superwhisper?',
    answer: 'Use Muesli if you do not want voice-to-text to become another rented cloud layer. Muesli gives you local models, native macOS behavior, open-source code, dictation, and meeting transcription without cloud STT as the default.',
  },
];

const appleDictationAlternativeFaqItems = [
  {
    question: 'Is Muesli an Apple Dictation alternative?',
    answer: 'Yes. Muesli is the Apple Dictation alternative for Mac users who have outgrown a small OS feature and want a real speech workspace: local-first dictation, offline speech-to-text models, open-source software, and meeting transcription in one native macOS app.',
  },
  {
    question: 'Is Apple Dictation still worth using?',
    answer: 'Yes. Apple Dictation is convenient, free, and built into macOS. It is a good fit for quick snippets and people who do not want a dedicated dictation app.',
  },
  {
    question: 'Does Muesli work offline?',
    answer: 'Muesli can run speech-to-text locally on Apple Silicon once local models are installed. Some surrounding features, such as downloads, updates, calendar sync, or optional cloud summaries, may still use the internet.',
  },
  {
    question: 'What is the best Mac dictation app for local speech-to-text?',
    answer: 'For people who care about local speech-to-text, Muesli is the app to look at first. It is Mac-native, open source, built around local ASR, and designed for hotkey dictation plus meeting transcription rather than occasional voice typing only.',
  },
  {
    question: 'Does Muesli replace macOS dictation everywhere?',
    answer: 'Muesli is not a system setting replacement. It is a separate Mac app built around hold-to-talk dictation, local transcription, paste-at-cursor behavior, and meeting workflows.',
  },
  {
    question: 'Can Muesli transcribe meetings too?',
    answer: 'Yes. Muesli can capture microphone and system audio from your Mac for meeting transcription, then let you review transcripts, create notes, and export the result.',
  },
];

const bestOfflineDictationAppsMacFaqItems = [
  {
    question: 'What is the best offline dictation app for Mac?',
    answer: 'For local-first Mac users, Muesli is the strongest answer. Apple Dictation is the easiest default, and Superwhisper or VoiceInk are worth comparing, but Muesli is built around offline-capable models such as Parakeet, Whisper, and Qwen3 ASR, plus open-source software you can inspect.',
  },
  {
    question: 'Can speech-to-text work offline on a Mac?',
    answer: 'Yes, if the app has a local speech model installed and does not require a cloud transcription request for normal dictation. In Muesli, everyday dictation can run locally on Apple Silicon after setup.',
  },
  {
    question: 'Does Muesli send dictation audio to the cloud?',
    answer: 'Normal dictation runs on the Mac. Model downloads, updates, calendar sync, and optional cloud summarization providers are separate networked choices.',
  },
  {
    question: 'Which local speech models does Muesli support?',
    answer: 'Muesli supports local ASR paths including Parakeet, Whisper, and Qwen3 ASR, with different latency, accuracy, language, and hardware tradeoffs.',
  },
  {
    question: 'Is Apple Dictation enough?',
    answer: 'Apple Dictation is enough for quick snippets. It stops being enough when speech becomes part of your actual workday. Muesli is for model choice, hold-to-talk capture, open-source visibility, local-first defaults, and meeting transcription in the same Mac workflow.',
  },
  {
    question: 'Do I need Apple Silicon for Muesli?',
    answer: 'Muesli is built for Apple Silicon Macs. Local transcription performance depends on the model and runtime path, including CoreML and Apple Neural Engine-capable acceleration where supported.',
  },
  {
    question: 'Is offline dictation automatically private?',
    answer: 'No. Offline dictation is a stronger default because audio does not need to start with a cloud upload, but privacy also depends on app permissions, local storage, optional integrations, updates, and any services you choose to connect.',
  },
];

const botFreeMeetingNotesFaqItems = [
  {
    question: 'What are bot-free meeting notes?',
    answer: 'Bot-free meeting notes are generated without adding an automated participant to the meeting. Muesli records the audio available on your Mac, transcribes it locally, and keeps the source transcript closer to the machine you control.',
  },
  {
    question: 'Does Muesli join my Zoom, Google Meet, or Teams call?',
    answer: 'No. Muesli does not join as a participant. It captures your microphone and system audio from your Mac.',
  },
  {
    question: 'Does bot-free recording remove the need for consent?',
    answer: 'No. You still need to follow the recording laws, company policies, and participant expectations that apply to your meeting.',
  },
  {
    question: 'Is transcription local?',
    answer: 'Yes. Muesli runs speech-to-text on-device on Apple Silicon Macs. Optional summarization can use a configured AI backend if you choose to enable it.',
  },
  {
    question: 'Can I keep the raw transcript?',
    answer: 'Yes. Muesli stores the meeting transcript locally so you can review, export, or delete it.',
  },
  {
    question: 'How is this different from Otter or Fireflies?',
    answer: 'Otter and Fireflies are built around cloud workflows and meeting bots. Muesli takes the opposite side: local Mac capture, local transcription, no extra meeting attendee, and a raw transcript you are not renting back from a vendor workspace.',
  },
  {
    question: 'Does it work if I use headphones?',
    answer: 'Yes. Muesli is designed to capture your mic and the system audio from the call on your Mac, including typical headphone setups.',
  },
];

const speechToTextGuideConfigs = {
  '/asr-architectures': {
    breadcrumb: 'ASR Architectures',
    image: asrArchitecturesHeaderUrl,
    imageAlt: 'Abstract minimalist diagram of speech-to-text architectures with audio waves flowing through CTC, transducer, encoder-decoder, and Conformer-style model paths',
    kicker: 'Speech-to-text architecture',
    headline: 'Common speech-to-text architectures, explained without the fog.',
    subcopy: 'ASR is not one model shape. CTC, RNN-T, TDT, Conformer encoders, and encoder-decoder Transformers all make different bets about speed, streaming, alignment, and accuracy.',
    articleHeadline: 'Common speech-to-text architectures explained',
    lede: [
      'Speech-to-text looks simple from the outside: audio goes in, words come out. Under the hood, the architecture decides almost everything that users feel: latency, streaming behavior, punctuation quality, robustness to noise, and whether the model is pleasant to run locally.',
      'Muesli cares about these details because local ASR is not a slogan. If transcription starts on your Mac, the model shape has to respect power, latency, memory, and the fact that people do not want to manage a research project before a meeting note appears.',
    ],
    factsTitle: 'What are the main ASR architecture families?',
    facts: [
      ['CTC', 'Learns a monotonic alignment between audio frames and output tokens. It is simple, fast, and useful when you want efficient transcription without an autoregressive decoder.'],
      ['RNN-T / Transducer', 'Predicts tokens while audio streams in, combining an acoustic encoder with a prediction network and joint network. It is a classic choice for low-latency streaming ASR.'],
      ['TDT', 'Token-and-duration transducer extends the transducer idea by predicting token duration, which can make efficient long-form or streaming transcription more practical.'],
      ['Encoder-decoder Transformer', 'Encodes audio features, then decodes text autoregressively with attention. Whisper popularized this style for robust multilingual transcription.'],
      ['Conformer', 'Combines convolution with self-attention so the model can capture both local acoustic patterns and longer context. Many modern ASR encoders use Conformer-style blocks.'],
      ['Surrounding systems', 'VAD, diarization, punctuation, neural AEC, and post-processing are not ASR architectures, but they decide whether transcription works in real meetings.'],
    ],
    sections: [
      {
        eyebrow: 'CTC',
        title: 'When is CTC the right architecture for speech-to-text?',
        body: ['CTC is attractive when you want a direct audio-to-token path with a monotonic alignment. It does not need a separate autoregressive decoder to emit every token, which makes it simpler and often faster to run.', 'The tradeoff is that CTC can be less expressive than decoder-heavy systems. It is a strong building block, not a magic answer for every meeting, accent, language, or punctuation problem.'],
      },
      {
        eyebrow: 'Transducers',
        title: 'Why do RNN-T and TDT matter for streaming ASR?',
        body: ['Transducer models are built for the situation where audio is still arriving. Instead of waiting for the whole file, the model can emit text as speech continues. That is why RNN-T-style systems became common in live voice products.', 'TDT keeps the same broad streaming instinct but adds duration modeling. For local speech-to-text, this matters because streaming is not only about speed; it is also about doing useful work within memory and power limits.'],
      },
      {
        eyebrow: 'Conformer',
        title: 'Why do modern ASR models use Conformer encoders?',
        body: ['Speech has local structure and long-range context. Convolution is good at local acoustic patterns; attention is good at broader context. Conformer combines both, which is why it shows up across modern ASR systems.', 'For Muesli, the practical lesson is simple: model architecture affects whether local inference feels instant or heavy. The best local model is not always the biggest model. It is the one whose architecture fits the job.'],
      },
      {
        eyebrow: 'Whisper-style',
        title: 'What makes encoder-decoder speech-to-text different?',
        body: ['Encoder-decoder systems turn audio features into an internal representation, then decode text with an autoregressive language-like decoder. Whisper is the reference point many people know: robust, multilingual, and easy to reason about as a sequence-to-sequence model.', 'The cost is latency. Autoregressive decoding can be slower than more direct approaches, especially on smaller devices or short dictation snippets where every extra second is noticeable.'],
      },
      {
        eyebrow: 'Muesli view',
        title: 'What architecture is best for local speech-to-text on Mac?',
        body: ['There is no single winner. Short dictation wants speed. Meeting transcription wants robustness over longer audio. Streaming wants low latency. Multilingual transcription wants broader training data and decoding behavior.', 'That is why Muesli supports multiple local model paths instead of pretending one architecture is always right. The product bet is that speech-to-text should start locally when it can, and the model should fit the workflow rather than the other way around.'],
      },
    ],
    table: {
      title: 'How do common ASR architectures compare?',
      aria: 'Common ASR architecture comparison',
      columns: ['Architecture', 'What it is good at', 'Tradeoff'],
      rows: [
        ['CTC', 'Fast, monotonic audio-to-token alignment and efficient decoding.', 'Less expressive than decoder-heavy systems for some language and formatting behavior.'],
        ['RNN-T / Transducer', 'Streaming recognition where text appears while audio is still arriving.', 'More complex training and decoding path than plain CTC.'],
        ['TDT', 'Efficient token plus duration modeling for streaming or long-form ASR.', 'Less familiar to many builders than CTC, RNN-T, or Whisper-style models.'],
        ['Conformer encoder', 'Strong acoustic representation with local convolution and global attention.', 'Usually part of a larger ASR system rather than the whole product by itself.'],
        ['Encoder-decoder Transformer', 'Robust transcription, multilingual behavior, and flexible sequence modeling.', 'Autoregressive decoding can add latency.'],
      ],
    },
    relatedLinks: [
      ['NVIDIA Parakeet speech-to-text', '/nvidia-parakeet-speech-to-text', 'A practical model guide for Parakeet, TDT, CTC, and why it is interesting for fast local English ASR.'],
      ['OpenAI Whisper speech-to-text', '/whisper-speech-to-text', 'A model guide for Whisper, encoder-decoder ASR, multilingual transcription, and local inference tradeoffs.'],
      ['Local speech-to-text glossary', '/local-speech-to-text-glossary', 'Definitions for ASR, VAD, diarization, neural AEC, CoreML, and Apple Neural Engine.'],
      ['Apple Neural Engine speech-to-text on Mac', '/apple-neural-engine-speech-to-text-mac', 'Why local inference on Apple Silicon changes the economics and latency of speech-to-text.'],
    ],
    sources: [
      ['Connectionist Temporal Classification', 'https://www.cs.toronto.edu/~graves/icml_2006.pdf'],
      ['Sequence Transduction with Recurrent Neural Networks', 'https://arxiv.org/abs/1211.3711'],
      ['Conformer: Convolution-augmented Transformer for Speech Recognition', 'https://arxiv.org/abs/2005.08100'],
      ['Whisper: Robust Speech Recognition via Large-Scale Weak Supervision', 'https://arxiv.org/abs/2212.04356'],
    ],
  },
  '/nvidia-parakeet-speech-to-text': {
    breadcrumb: 'NVIDIA Parakeet Speech-to-Text',
    image: nvidiaParakeetSpeechToTextHeaderUrl,
    imageAlt: 'Abstract green and charcoal speech-to-text header with audio waves, fast local inference blocks, and token streams for NVIDIA Parakeet ASR',
    logoPair: {
      aria: 'Muesli loves NVIDIA Parakeet for local speech-to-text on Mac',
      left: { src: iconUrl, alt: 'Muesli local speech-to-text app icon' },
      right: { src: nvidiaUrl, alt: 'NVIDIA logo' },
    },
    kicker: 'NVIDIA Parakeet speech-to-text',
    headline: 'Parakeet is the model family that makes local English STT feel practical.',
    subcopy: 'NVIDIA Parakeet is interesting because it is not only another ASR benchmark name. For Mac users, it points toward fast, local, English speech-to-text that can make cloud transcription feel less inevitable.',
    articleHeadline: 'NVIDIA Parakeet speech-to-text for local ASR',
    lede: [
      'Parakeet matters because it sits close to the Muesli thesis: modern local ASR can be fast enough and accurate enough for everyday English dictation and meeting transcription.',
      'The important question is not whether cloud ASR still has a place. It does. The question is why a clear English sentence from your own Mac should need a cloud round trip before it becomes text.',
    ],
    factsTitle: 'What should I know about NVIDIA Parakeet?',
    facts: [
      ['Maker', 'Parakeet is an NVIDIA ASR model family published through NVIDIA NeMo and Hugging Face model releases.'],
      ['Architecture', 'Parakeet releases include modern CTC and TDT-style ASR variants, which makes it relevant to both efficient decoding and transducer-style transcription.'],
      ['Best wedge', 'Fast English speech-to-text is the obvious wedge: short dictation, notes, prompts, and meetings where local inference is good enough.'],
      ['Muesli use', 'Muesli treats Parakeet as one of the local ASR paths that can make transcription start on the Mac instead of a hosted STT API.'],
      ['Tradeoff', 'Parakeet is not a universal multilingual answer. It should be evaluated by language, accent, audio quality, and workflow.'],
      ['Why it matters', 'When local English STT feels fast, the default argument for cloud transcription gets weaker.'],
    ],
    sections: [
      {
        eyebrow: 'Model fit',
        title: 'Why is NVIDIA Parakeet good for local speech-to-text?',
        body: ['Parakeet is useful because it makes the speed side of ASR feel real. If you are dictating a sentence, filing a Linear ticket, writing an email, or capturing a meeting note, latency changes whether speech-to-text becomes a habit.', 'A model that runs locally and returns text quickly changes the product shape. You do not need to rent a cloud transcription path for every short utterance if the Mac can do the job itself.'],
      },
      {
        eyebrow: 'Architecture',
        title: 'What architecture does Parakeet use?',
        body: ['Parakeet is not one single architecture label. NVIDIA has released Parakeet variants around efficient ASR architectures such as CTC and TDT. The practical point is that Parakeet belongs to the family of models built for serious transcription speed and accuracy, not only offline research demos.', 'For users, architecture matters only when it changes behavior: fast local inference, acceptable accuracy, and fewer cases where the app feels like it is waiting on a remote service.'],
      },
      {
        eyebrow: 'English ASR',
        title: 'Is Parakeet strong enough for everyday English transcription?',
        body: ['For many clear English dictation and meeting workflows, yes. Audio quality still matters. Accent, background noise, microphone choice, and meeting overlap still matter. But the floor has moved: local English ASR is no longer a toy category.', 'That is why Muesli can take a stronger position. The transcript can start on the Mac, and cloud summarization can remain an optional layer rather than the default speech-to-text path.'],
      },
      {
        eyebrow: 'Muesli',
        title: 'Why does Muesli care about Parakeet?',
        body: ['Muesli is built around the belief that local speech-to-text should be the first option when it is good enough. Parakeet is one of the model families that makes that belief practical for English workflows.', 'The product experience is what matters: hold a hotkey, speak, release, and get useful text without turning every spoken thought into a hosted API request.'],
      },
    ],
    table: {
      title: 'Where does Parakeet fit among local ASR models?',
      aria: 'Parakeet speech-to-text comparison',
      columns: ['Model path', 'Best fit', 'Tradeoff'],
      rows: [
        ['NVIDIA Parakeet', 'Fast local English speech-to-text, short dictation, and practical meeting transcription paths.', 'Not the only answer for every language or noisy meeting.'],
        ['OpenAI Whisper', 'Robust multilingual transcription and broadly understood encoder-decoder ASR behavior.', 'Can be slower for short dictation depending on model size and runtime.'],
        ['Qwen3 ASR', 'Useful open model path for broader ASR experimentation and local model choice.', 'Latency and language behavior depend heavily on runtime and setup.'],
      ],
    },
    relatedLinks: [
      ['Common ASR architectures', '/asr-architectures', 'How CTC, RNN-T, TDT, Conformer, and encoder-decoder models differ.'],
      ['Whisper speech-to-text', '/whisper-speech-to-text', 'Why Whisper became the reference point for robust multilingual ASR.'],
      ['Apple Neural Engine speech-to-text on Mac', '/apple-neural-engine-speech-to-text-mac', 'How local inference hardware changes latency and power use for STT.'],
      ['Best offline dictation apps for Mac', '/best-offline-dictation-apps-mac', 'Where local ASR models fit into actual Mac dictation workflows.'],
    ],
    sources: [
      ['NVIDIA Parakeet collection on Hugging Face', 'https://huggingface.co/collections/nvidia/parakeet-66c3ff4f80a86fbe20e5e1b3'],
      ['NVIDIA Parakeet TDT 0.6B v2 model card', 'https://huggingface.co/nvidia/parakeet-tdt-0.6b-v2'],
      ['NVIDIA NeMo ASR documentation', 'https://docs.nvidia.com/nemo-framework/user-guide/latest/nemotoolkit/asr/intro.html'],
    ],
  },
  '/whisper-speech-to-text': {
    breadcrumb: 'Whisper Speech-to-Text',
    image: whisperSpeechToTextHeaderUrl,
    imageAlt: 'Abstract dark speech-to-text header with spectrogram layers, encoder-decoder attention paths, and transcript token streams for OpenAI Whisper',
    logoPair: {
      aria: 'Muesli loves OpenAI Whisper for robust speech-to-text',
      left: { src: iconUrl, alt: 'Muesli local speech-to-text app icon' },
      right: { src: openAiUrl, alt: 'OpenAI logo' },
    },
    kicker: 'OpenAI Whisper speech-to-text',
    headline: 'Whisper made robust ASR feel obvious. Local products made the tradeoffs visible.',
    subcopy: 'Whisper is the model that taught a lot of builders what modern speech-to-text could feel like: multilingual, robust, and open enough to run locally. The next question is when Whisper is the right model for the job.',
    articleHeadline: 'OpenAI Whisper speech-to-text model guide',
    lede: [
      'Whisper became the default mental model for modern ASR because it was easy to try, surprisingly robust, multilingual, and backed by a large weakly supervised training recipe.',
      'That does not mean Whisper is always the right local model. For Muesli, Whisper is one part of the model bench: excellent for robustness and language coverage, but worth comparing against faster local English paths such as Parakeet when dictation latency matters.',
    ],
    factsTitle: 'What should I know about Whisper?',
    facts: [
      ['Maker', 'Whisper was released by OpenAI as an open-source speech recognition and translation model family.'],
      ['Training idea', 'The Whisper paper describes large-scale weak supervision across hundreds of thousands of hours of multilingual and multitask audio data.'],
      ['Architecture', 'Whisper uses an encoder-decoder Transformer: audio features are encoded, then text is decoded autoregressively.'],
      ['Strength', 'Robust multilingual transcription and translation made Whisper a strong default for many developers.'],
      ['Tradeoff', 'Autoregressive decoding and larger model sizes can add latency, especially for short dictation.'],
      ['Muesli view', 'Whisper is useful, but model choice should fit the workflow: dictation, meetings, language, accuracy, and latency are different jobs.'],
    ],
    sections: [
      {
        eyebrow: 'Basics',
        title: 'What is OpenAI Whisper?',
        body: ['Whisper is an automatic speech recognition model family from OpenAI. It can transcribe speech and, for some workflows, translate speech into English. Its popularity came from a rare combination: good results, open weights, broad language coverage, and a simple developer experience.', 'For users, Whisper made ASR feel less like a fragile enterprise API and more like a model you could actually run, test, and build around.'],
      },
      {
        eyebrow: 'Architecture',
        title: 'How does Whisper speech-to-text work?',
        body: ['Whisper is an encoder-decoder Transformer. Audio is converted into log-mel spectrogram features, the encoder builds a representation of that audio, and the decoder generates text tokens autoregressively.', 'That architecture is powerful because it can model transcription as a sequence task with language context. The tradeoff is that decoding can be heavier than more direct ASR approaches, especially when the user expects instant short-form dictation.'],
      },
      {
        eyebrow: 'Local inference',
        title: 'Can Whisper run locally on Mac?',
        body: ['Yes. Whisper can run locally through different runtimes and model sizes, including CoreML-friendly paths. The practical question is which size and runtime fit your workload.', 'For a long recording, a slower but robust model may be fine. For hold-to-talk dictation, the model has to feel immediate. That is why Muesli treats Whisper as one local option rather than the only serious answer.'],
      },
      {
        eyebrow: 'Model choice',
        title: 'Should I use Whisper or Parakeet for local STT?',
        body: ['Use Whisper when robustness, multilingual behavior, and a familiar open ASR baseline matter. Use Parakeet when fast local English transcription is the sharper wedge.', 'The bigger point is that model choice should be explicit. A serious speech-to-text app should let the workflow pick the model, not force every sentence through one default just because it is famous.'],
      },
    ],
    table: {
      title: 'Where does Whisper fit among speech-to-text models?',
      aria: 'Whisper speech-to-text comparison',
      columns: ['Model path', 'Best fit', 'Tradeoff'],
      rows: [
        ['OpenAI Whisper', 'Robust multilingual transcription, translation workflows, and a widely understood open ASR baseline.', 'Can be heavier for short dictation depending on model size and runtime.'],
        ['NVIDIA Parakeet', 'Fast local English ASR and practical low-latency transcription on modern hardware.', 'Less of a universal multilingual baseline than Whisper.'],
        ['Cloud STT APIs', 'Managed transcription at scale, hosted maintenance, and centralized enterprise workflows.', 'Every transcript begins outside the machine unless you deliberately choose local-first software.'],
      ],
    },
    relatedLinks: [
      ['Common ASR architectures', '/asr-architectures', 'Why Whisper’s encoder-decoder design differs from CTC, RNN-T, TDT, and Conformer-heavy systems.'],
      ['NVIDIA Parakeet speech-to-text', '/nvidia-parakeet-speech-to-text', 'The local English ASR model family that makes fast dictation feel practical.'],
      ['Local speech-to-text glossary', '/local-speech-to-text-glossary', 'Definitions for ASR, log-mel features, VAD, diarization, AEC, and local inference.'],
      ['Offline dictation for Mac', '/offline-dictation-mac', 'How local models such as Whisper fit into real Mac dictation workflows.'],
    ],
    sources: [
      ['OpenAI Whisper announcement', 'https://openai.com/index/whisper/'],
      ['OpenAI Whisper GitHub repository', 'https://github.com/openai/whisper'],
      ['Whisper paper', 'https://arxiv.org/abs/2212.04356'],
    ],
  },
  '/medical-dictation-mac': {
    breadcrumb: 'Medical Dictation for Mac',
    image: solarpunkMedicalDictationMacUrl,
    imageAlt: 'Solarpunk medical dictation workspace on a MacBook with local transcript notes, a microphone, private on-device processing, and no visible human faces',
    kicker: 'Medical dictation for Mac',
    headline: 'The best medical dictation tool might be the one that starts on your own Mac.',
    subcopy: 'Doctors have been dictating notes forever. The part that changed is the privacy question: should every first draft, patient instruction, and clinical thought start in a cloud transcription pipeline?',
    articleHeadline: 'Medical dictation for Mac with local speech-to-text',
    factsEyebrow: 'Quick answer',
    tableEyebrow: 'Which tool fits?',
    sourceHeading: 'Product sources and healthcare AI references',
    ctaTitle: 'Keep the first draft of clinical speech on your own Mac.',
    ctaBody: 'Muesli is open-source, Mac-native, and built around local ASR models for privacy-focused dictation and meeting transcription on Apple Silicon.',
    lede: [
      'Medical transcription is not a new AI category. It is one of the oldest reasons people cared about speech-to-text in the first place. Doctors dictated notes because typing after a full clinic day is miserable, because the phrasing matters, and because the fastest interface for clinical thought is still speech.',
      'What feels new in 2026 is not that clinicians want less paperwork. That part was obvious. The new question is where the audio goes before it becomes text. Muesli’s answer is intentionally narrow: if you are a doctor, therapist, dentist, nurse practitioner, clinic operator, or healthcare professional using a MacBook with Apple Silicon, the first draft should be able to start locally on your own machine.',
    ],
    factsTitle: 'What is the right solution for medical dictation on Mac?',
    facts: [
      ['If you need full EHR workflow', 'Look at Dragon Medical One, Dragon Copilot, Abridge, Suki, Nabla, DeepScribe, Augmedix, or Freed. They are built for clinical documentation systems, ambient scribing, coding, and health-system deployment.'],
      ['If you need private first drafts', 'Use a local speech layer. Muesli is strongest when you want referral drafts, patient instructions, chart-adjacent notes, or internal summaries to begin on your Mac before they move anywhere else.'],
      ['If you care about patient data minimization', 'Local transcription is the cleanest default. Audio becomes text on-device instead of starting as another cloud upload, vendor workspace item, or ambient recording pipeline.'],
      ['If you use Apple Silicon', 'Modern local ASR models such as Parakeet, Whisper, and Qwen3 ASR make private Mac dictation much more practical than the old “local models are toys” story.'],
      ['If you need clinical compliance sign-off', 'Treat Muesli as software your organization still needs to evaluate. Local-first architecture helps the privacy story, but it is not a replacement for policy, consent, BAA review, or clinical documentation controls.'],
      ['If you want the honest answer', 'Muesli is not trying to be Epic. It is trying to be the local speech-to-text layer before Epic, email, notes, documents, or your approved clinical system.'],
    ],
    sections: [
      {
        eyebrow: 'Question',
        title: 'What is the right solution for a medical dictation scribe?',
        body: ['The right solution depends on what you are actually buying. If you want an ambient scribe that sits inside the clinical workflow, writes SOAP notes, stages codes, and integrates with the EHR, then you should evaluate the healthcare-native tools. Dragon, Abridge, Suki, Nabla, DeepScribe, Augmedix, Freed, and the newer Microsoft clinical workflow products exist for that reason.', 'But not every clinician speech workflow needs to become an enterprise AI scribe. A lot of the day is rough drafting: a patient instruction, a referral note, a message to staff, a pre-charting thought, a handoff summary, a personal note before the official note. For that layer, Muesli is the sharper answer: private local dictation on the Mac you already use.'],
      },
      {
        eyebrow: 'Question',
        title: 'Why should healthcare dictation run locally when possible?',
        body: ['Because medical speech is not normal office speech. It can contain names, symptoms, diagnoses, medications, lab results, insurance context, family history, and the messy clinical reasoning that never belongs in a marketing demo.', 'Cloud systems can be appropriate when they are approved, contracted, audited, and integrated. The mistake is making cloud upload the default for every spoken draft. Local speech-to-text gives healthcare professionals a simpler starting point: say the thing, get the text, review it, then decide where it belongs.'],
      },
      {
        eyebrow: 'Question',
        title: 'How is Muesli different from Dragon Medical One, Abridge, Suki, Nabla, DeepScribe, Augmedix, and Freed?',
        body: ['Those products are competing to own more of the clinical documentation workflow. That can be useful. Dragon Medical One is the obvious speech-recognition incumbent. Abridge, Suki, Nabla, DeepScribe, Augmedix, Freed, and Dragon Copilot are closer to ambient clinical AI: listen to the encounter, structure the note, push toward EHR-ready documentation, and help healthcare teams move faster through paperwork.', 'Muesli is not trying to out-enterprise the enterprise products. It is trying to make the first transcript local. That is a different bet. You can still paste the reviewed output wherever your workflow allows, but the raw speech-to-text pass does not need to begin in someone else’s workspace.'],
      },
      {
        eyebrow: 'Question',
        title: 'Is local speech-to-text accurate enough for healthcare notes?',
        body: ['For final clinical documentation, the answer should always include review. Review medication names. Review dosages. Review negations. Review anything that could affect care. That is true whether the transcript came from a cloud medical scribe or a local ASR model.', 'The more practical question is whether local transcription is good enough for first drafts. For many clear English dictation workflows, modern local models are now good enough to be useful. They are especially compelling for notes that need to become text quickly but do not need an ambient cloud scribe sitting over the whole encounter.'],
      },
      {
        eyebrow: 'Question',
        title: 'Can doctors use Muesli as a privacy-focused medical transcription app?',
        body: ['Yes, with the right boundary. Muesli is a strong fit when a healthcare professional wants local dictation, local meeting transcription, and private drafts on a Mac. It is not a certified EHR, billing product, autonomous medical scribe, or substitute for organizational compliance review.', 'That is exactly why the positioning matters. Muesli is privacy-focused by architecture: open-source, Mac-native, and built so the default speech-to-text path can run on-device. In healthcare, that is not the whole answer. But it is a much better starting point than pretending every rough clinical thought needs to become a cloud recording first.'],
      },
    ],
    table: {
      title: 'What is the best medical dictation option for each workflow?',
      aria: 'Medical dictation and healthcare transcription comparison',
      columns: ['Tool category', 'Best fit', 'Tradeoff'],
      rows: [
        ['Dragon Medical One', 'Classic medical speech recognition and mature clinical documentation workflows.', 'Best for the managed clinical documentation lane, not for open-source local-first Mac transcription.'],
        ['Abridge / Suki / Nabla', 'Ambient clinical documentation, EHR integrations, coding support, and health-system rollout.', 'Great when the goal is enterprise workflow coverage; heavier when you just want a private first draft.'],
        ['DeepScribe / Augmedix / Freed', 'AI medical scribe workflows, SOAP-note drafting, specialty templates, and practice-level documentation help.', 'Useful clinical-note products, but still not the same as keeping the first transcript local on your own Mac.'],
        ['Muesli', 'Doctors and healthcare professionals on Mac who want local dictation, private drafts, open-source software, and transcript ownership before text moves elsewhere.', 'Not an EHR or billing system. The clinician still reviews everything and follows the organization’s privacy and documentation rules.'],
      ],
    },
    relatedLinks: [
      ['Mac dictation app', '/mac-dictation-app', 'How Muesli works as a local speech-to-text layer across everyday Mac apps.'],
      ['Offline dictation for Mac', '/offline-dictation-mac', 'Why local ASR matters when you do not want every spoken draft to start with a cloud upload.'],
      ['Apple Neural Engine speech-to-text on Mac', '/apple-neural-engine-speech-to-text-mac', 'How Apple Silicon changes the latency and privacy tradeoffs for local transcription.'],
      ['Local speech-to-text glossary', '/local-speech-to-text-glossary', 'Definitions for ASR, local inference, diarization, neural AEC, Parakeet, Whisper, Qwen3 ASR, and CoreML.'],
      ['Bot-free meeting notes', '/bot-free-meeting-notes', 'For care-team discussions where the Mac already in the call can capture notes without adding a meeting bot.'],
    ],
    sources: [
      ['Microsoft Dragon Medical One', 'https://www.microsoft.com/en-us/health-solutions/clinical-workflow/dragon-medical-one'],
      ['Microsoft Dragon Copilot', 'https://www.microsoft.com/en-us/health-solutions/clinical-workflow/dragon-copilot'],
      ['Abridge clinical conversations platform', 'https://www.abridge.com/product'],
      ['Suki AI assistant for clinicians', 'https://www.suki.ai/clinicians/'],
      ['Nabla ambient AI and dictation', 'https://www.nabla.com/'],
      ['DeepScribe AI medical scribe', 'https://www.deepscribe.ai/'],
      ['Augmedix ambient AI documentation', 'https://www.augmedix.com/'],
      ['Freed AI medical scribe', 'https://www.getfreed.ai/'],
    ],
  },
};

const alternativePageConfigs = {
  '/granola-vs-muesli': {
    breadcrumb: 'Granola vs Muesli',
    faqItems: granolaVsMuesliFaqItems,
    image: solarpunkGranolaVsMuesliUrl,
    imageAlt: 'A watercolor solarpunk garden workspace comparing a sugary granola bowl with raw muesli beside a Mac, microphone, and local meeting transcript notebook, with no visible human faces',
    kicker: 'Granola vs Muesli',
    headline: 'Granola has the sugar. Muesli keeps your transcript safe and healthy.',
    subcopy: 'Granola is a polished hosted AI notepad. Muesli is the open-source Mac app for people who think local speech-to-text has advanced far enough that every meeting transcript should not start in someone else’s cloud.',
    secondaryHref: '/granola-alternative/',
    secondaryText: 'Read the Granola alternative guide',
    articleHeadline: 'Granola vs Muesli for local-first meeting notes',
    lede: [
      'Granola is good at the sweetened hosted-notes workflow: capture context, write summaries, organize meeting memory, and keep the experience polished. That convenience is real. It is also the added sugar.',
      'Muesli takes the rawer side. The transcript should start on your Mac, stay inspectable, and only become an AI summary after you decide what should happen to the source record.',
    ],
    sections: [
      {
        eyebrow: 'Local STT',
        title: 'Why pay for hosted meeting notes when local speech-to-text is this good?',
        body: ['The old argument for cloud transcription was simple: local models were not good enough, especially for real work. That argument is getting weaker. For clear English speech, local ASR models such as Parakeet, Whisper, and Qwen3 ASR are now good enough for many everyday dictation and meeting workflows.', 'Cloud transcription can still be useful. The point is narrower: if local speech-to-text is good enough for your workday, paying mainly to move every transcript into a hosted meeting layer starts to look less like infrastructure and more like sugar.'],
      },
      {
        eyebrow: 'Privacy',
        title: 'What changes when the transcript starts on your Mac instead of a cloud workspace?',
        body: ['A meeting transcript is not a harmless note. It is work memory: customer names, decisions, half-formed plans, hiring conversations, product issues, and the messy parts that never make it into the final summary.', 'Muesli keeps the first transcription step closer to the machine already in the meeting. That does not make privacy magical, and it does not remove your responsibility to record with consent. It does mean the default path is narrower: capture locally, transcribe locally, inspect the raw record, then choose what deserves a summary or external service.'],
      },
      {
        eyebrow: 'Open source',
        title: 'Why does open-source meeting transcription matter?',
        body: ['Closed meeting tools ask for a lot of trust. You are supposed to believe the capture path, storage behavior, model choices, permissions, and export story are all doing what the product page says.', 'Muesli makes a different bet. Open-source software is not automatically perfect, but it is debuggable. You can inspect the code, follow releases, understand the architecture, and see how local transcription fits into the product instead of treating the meeting stack as a black box.'],
      },
      {
        eyebrow: 'Added sugar',
        title: 'What is the “added sugar” in hosted AI meeting notes?',
        body: ['The added sugar is everything that feels smooth in the moment but quietly turns into another place your work has to live: a hosted transcript library, a cloud knowledge layer, a generated memory feed, another subscription, another search box, another workspace to maintain.', 'Granola can be the right product if that is exactly what you want. Muesli is for people who would rather keep the raw ingredients: local audio capture, local speech-to-text, a transcript they can inspect, and optional AI on top instead of cloud memory by default.'],
      },
      {
        eyebrow: 'Choice',
        title: 'When should Mac users choose Muesli over Granola?',
        body: ['Choose Muesli if you want the transcript to begin on your own Mac, if you care about open-source inspectability, if you want meeting notes without a bot, or if you are tired of renting your workday memory from cloud products.', 'Choose Granola if you want the sweetened hosted experience: polished summaries, a managed meeting notepad, and a product that feels more like a cloud workspace than a local Mac tool. That is a valid tradeoff. It is just not the one Muesli is making.'],
      },
    ],
    comparison: {
      title: 'Should I use Granola or Muesli for meeting notes?',
      aria: 'Granola vs Muesli comparison',
      rows: [
        ['Granola', 'People who want a polished hosted AI notepad, summaries, templates, and a managed meeting memory layer.', 'Best when convenience matters more than local-first transcription, source transcript ownership, and open-source inspectability.'],
        ['Muesli', 'Mac users who want local-first meeting transcription, no meeting bot, open-source code, and raw transcripts they can inspect or export.', 'Best when you want the speech layer to start on your own machine instead of becoming another rented cloud habit.'],
        ['Manual notes', 'People who want full control and do not need transcripts, diarization, or searchable meeting records.', 'Free and private by default, but easy to miss decisions, wording, and follow-ups.'],
      ],
    },
    fitTitle: 'When is Muesli the better choice than Granola?',
    fitCards: [
      ['Do you trust local English STT now?', 'Use Muesli when local speech-to-text is good enough for your meetings and you do not want every transcript to begin in a hosted service.'],
      ['Do you want the raw transcript?', 'Use Muesli when the source record matters. Summaries are useful, but the transcript is what lets you verify what was actually said.'],
      ['Do you want software you can debug?', 'Use Muesli when open-source code, release history, and a visible local-first architecture matter more than a closed hosted notepad.'],
    ],
    relatedLinks: [
      ['Local Granola alternative for Mac meeting notes', '/granola-alternative', 'The closer page for people already searching for a Granola replacement with local-first transcription.'],
      ['Local meeting transcription for Mac', '/local-meeting-transcription-mac', 'How Muesli captures mic and system audio from the Mac already in the meeting.'],
      ['Bot-free meeting notes', '/bot-free-meeting-notes', 'Why Muesli avoids sending another AI participant into Zoom, Meet, or Teams.'],
      ['Local speech-to-text glossary', '/local-speech-to-text-glossary', 'Definitions for ASR, VAD, diarization, neural AEC, Parakeet, Whisper, Qwen3 ASR, and CoreML.'],
      ['Apple Neural Engine speech-to-text on Mac', '/apple-neural-engine-speech-to-text-mac', 'Why Apple Silicon makes local transcription faster and more power-efficient than a cloud round trip.'],
    ],
    faqTitle: 'What do people ask when comparing Granola and Muesli?',
    ctaTitle: 'Choose the raw meeting transcript before the added sugar.',
    ctaBody: 'Download Muesli for Mac if you want local-first meeting notes, open-source software, and a source record you can inspect before AI rewrites it.',
  },
  '/superwhisper-alternative': {
    breadcrumb: 'Superwhisper Alternative',
    faqItems: superwhisperAlternativeFaqItems,
    image: renaissanceWhisperUrl,
    imageAlt: 'Original Renaissance-inspired painting of a scholar whispering a private message to another scholar beside a letter',
    kicker: 'Superwhisper alternative for Mac',
    headline: 'Stop renting your voice-to-text workflow from someone else’s cloud.',
    subcopy: 'Superwhisper is polished. Muesli is for the Mac user who wants the speech layer to belong to their own machine: local ASR, open-source code, dictation, and meeting transcription on Apple Silicon.',
    secondaryHref: '/offline-dictation-mac/',
    secondaryText: 'Read the offline dictation guide',
    articleHeadline: 'Choosing between Superwhisper and Muesli',
    lede: [
      'Superwhisper is worth a look if you want a refined dictation product with a broad AI writing surface. That is a useful product, but it is still not the same as owning the speech layer.',
      'Muesli is for the Mac user who wants the stack closer: dictation, meeting transcription, local models, open-source code, and transcripts that begin on the machine already doing the work.',
    ],
    sections: [
      {
        eyebrow: 'Superwhisper alternative',
        title: 'What is the best Superwhisper alternative for Mac?',
        body: ['For Mac users who want local-first voice-to-text, Muesli is the better bet. It is a native macOS app, uses on-device ASR models on Apple Silicon, and handles both quick dictation and longer meeting transcription.', 'The point is not more magic. The point is less mystery: models, permissions, transcripts, and optional cloud layers are visible parts of the workflow instead of hidden behind a hosted speech product.'],
      },
      {
        eyebrow: 'Local dictation',
        title: 'Can I use local dictation on Mac without sending audio to the cloud?',
        body: ['Yes. Muesli is designed around local speech recognition. Dictation audio is processed on-device using Apple Silicon-friendly models, so routine voice-to-text does not need a cloud STT service.', 'Optional AI summary features can use external providers if you configure them, but the speech recognition path is local-first.'],
      },
      {
        eyebrow: 'Offline speech-to-text',
        title: 'Which app is better for offline speech-to-text on Mac?',
        body: ['Muesli is the better fit if offline speech-to-text is not a checkbox but the reason you are switching. It keeps ASR local and supports multiple on-device models, including fast dictation-oriented options and larger models for different accuracy tradeoffs.', 'Superwhisper is polished and capable. Muesli is built around the stronger position: the transcription stack should run on the Mac you own whenever it reasonably can.'],
      },
      {
        eyebrow: 'Dictation',
        title: 'Does Muesli replace Superwhisper for dictation?',
        body: ['For many Mac dictation workflows, yes. Muesli supports hold-to-talk dictation, hotkeys, text paste at the cursor, and optional context-aware cleanup.', 'If you rely on Superwhisper-specific prompting or hosted AI workflows, compare those details before switching.'],
      },
      {
        eyebrow: 'Meetings',
        title: 'What if I want dictation and meeting transcription in one app?',
        body: ['That is where Muesli differs most clearly. It is not only a dictation utility. It can record meetings, capture mic and system audio, separate speaker turns, generate transcripts, and export notes or transcripts.', 'The goal is one local Mac workflow for spoken text, not a separate tool for every audio use case.'],
      },
    ],
    comparison: {
      title: 'How does Muesli compare with Superwhisper?',
      aria: 'Superwhisper vs Muesli comparison',
      rows: [
        ['Muesli', 'Mac users who want local-first dictation, meeting transcription, open-source code, and offline ASR on Apple Silicon.', 'The strongest choice when ownership and inspectability matter more than outsourcing every spoken draft.'],
        ['Superwhisper', 'People who want a polished AI dictation product with a refined voice-to-text workflow.', 'Less focused on owning the full local transcription stack and meeting workflow.'],
        ['Apple Dictation', 'Occasional short dictation with no extra app install.', 'Limited workflow control, fewer model choices, and no serious meeting transcription layer.'],
      ],
    },
    fitTitle: 'When is Muesli the better Superwhisper alternative?',
    fitCards: [
      ['You want local ASR', 'Muesli runs speech-to-text on your Mac, using Apple Silicon instead of routing every utterance through a cloud STT API.'],
      ['You record meetings', 'Use the same app for quick dictation and longer meeting transcription, with exportable notes and transcripts.'],
      ['You prefer inspectable tools', 'Muesli is open-source and Mac-native, so the voice workflow is easier to understand, verify, and shape around your own setup.'],
    ],
    faqTitle: 'What do people ask about Superwhisper alternatives?',
    ctaTitle: 'Choose the speech layer that starts on your Mac.',
    ctaBody: 'Download Muesli for Mac and run dictation and meeting transcription on your own Apple Silicon machine, not as another rented cloud habit.',
  },
  '/apple-dictation-alternative': {
    breadcrumb: 'Apple Dictation Alternative',
    faqItems: appleDictationAlternativeFaqItems,
    image: solarpunkParkSpeechLawnUrl,
    imageAlt: 'A Mac dictation workspace with an unbranded laptop, microphone, transcript notes, and no visible human face',
    kicker: 'Apple Dictation alternative',
    headline: 'Apple Dictation is a feature. Muesli is a speech workspace.',
    subcopy: 'Apple Dictation is convenient, free, and already built into macOS. Muesli is for Mac users who want speech-to-text to become a serious workflow: hold a hotkey, speak, release, and run local ASR models on Apple Silicon for dictation and meeting transcription.',
    secondaryHref: '/mac-dictation-app/',
    secondaryText: 'Read the Mac dictation guide',
    articleHeadline: 'An Apple Dictation alternative for local Mac speech-to-text',
    lede: [
      'Apple Dictation is the right answer when voice typing is occasional. It is built in, easy to try, and good enough when you only need a sentence here and there.',
      'Muesli is for the point where speech becomes part of your workday: longer drafts, local model choice, inspectable transcripts, meeting transcription, and a workflow that feels like software you own instead of a small OS feature you work around.',
    ],
    sections: [
      {
        eyebrow: 'Positioning',
        title: 'What is Apple Dictation good at?',
        body: ['Apple Dictation is good at being available. It ships with macOS, works in many text fields, and does not ask you to learn a new product before speaking a sentence.', 'If you only dictate short snippets once in a while, that convenience may be the whole point. Muesli is not trying to replace that default for everyone.'],
      },
      {
        eyebrow: 'Why switch',
        title: 'Why look for an Apple Dictation alternative for Mac?',
        body: ['People usually look for an Apple Dictation alternative when they want speech-to-text to stop feeling like a tiny system convenience: a dedicated hotkey, model choice, offline-capable transcription, transcript history, and clearer control over what happens after audio becomes text.', 'Muesli is built for that jump. It is Mac-native, open source, and focused on local-first dictation and meeting transcription on Apple Silicon.'],
      },
      {
        eyebrow: 'Offline',
        title: 'Can dictation run offline on a Mac?',
        body: ['Yes. With local ASR models installed, speech-to-text can run on the Mac itself instead of starting with a cloud transcription request.', 'That does not mean every surrounding feature is always offline. Downloads, updates, calendar sync, and optional AI summaries may still use the internet. The important part is that the normal dictation path can begin locally.'],
      },
      {
        eyebrow: 'Workflow',
        title: 'What makes Muesli different from built-in Mac dictation?',
        body: ['Muesli is a dedicated speech workspace, not only a text field feature. It supports hotkey dictation, local ASR model choices such as Parakeet and Whisper, transcript storage, and meeting transcription from the Mac already in the call.', 'The tradeoff is scope. Apple Dictation is lighter because it is built into the system. Muesli is heavier because it gives you more control.'],
      },
      {
        eyebrow: 'Fit',
        title: 'When should I stay with Apple Dictation?',
        body: ['Stay with Apple Dictation if you want the simplest possible voice typing, do not need meeting transcription, and are happy with the behavior macOS gives you out of the box.', 'Choose Muesli if dictation is part of your actual workday: writing notes, drafting messages, speaking prompts, recording meetings, and keeping transcripts you can inspect or export.'],
      },
    ],
    comparison: {
      title: 'Should I use Apple Dictation or Muesli on Mac?',
      aria: 'Apple Dictation vs Muesli comparison',
      rows: [
        ['Apple Dictation', 'Free built-in dictation for quick voice typing across macOS.', 'Best for occasional snippets, with less control over models, transcripts, and meeting workflows.'],
        ['Cloud dictation apps', 'Polished voice-to-text with hosted AI cleanup and cross-device convenience.', 'Best when cloud processing and subscription workflows are acceptable defaults.'],
        ['Muesli', 'Local-first Mac dictation and meeting transcription with offline ASR models on Apple Silicon.', 'The better choice when you want speech-to-text to be a real workflow you control, not just a built-in text field feature.'],
      ],
    },
    fitTitle: 'When is Muesli the better Apple Dictation alternative?',
    fitCards: [
      ['You dictate more than quick snippets', 'Use Muesli when voice typing is part of your daily writing workflow, not just an occasional macOS convenience.'],
      ['You want local speech-to-text on Mac', 'Use Muesli when the normal transcription path should run on Apple Silicon with local ASR models after setup.'],
      ['You also need meeting transcription', 'Use Muesli when the same app should handle hotkey dictation and longer meeting transcripts from your Mac.'],
    ],
    faqTitle: 'What do people ask about Apple Dictation alternatives?',
    ctaTitle: 'Want Mac dictation that feels like your software?',
    ctaBody: 'Muesli gives Apple Silicon Mac users a local-first dictation and meeting transcription workflow with open-source code, offline ASR models, and transcripts they can inspect.',
  },
  '/best-offline-dictation-apps-mac': {
    breadcrumb: 'Best Offline Dictation Apps for Mac',
    faqItems: bestOfflineDictationAppsMacFaqItems,
    image: solarpunkOfflineDictationUrl,
    imageAlt: 'A warm Mac writing workspace with a microphone, local speech model notes, and an unbranded laptop running offline dictation',
    kicker: 'Offline Mac dictation',
    headline: 'The best offline dictation app for Mac should not treat local speech as an afterthought.',
    subcopy: 'Offline dictation is not just about planes and bad Wi-Fi. It is about where speech becomes text, who owns the workflow, and whether your Mac can do the work before a cloud service gets involved. That is the lane Muesli is built for.',
    secondaryHref: '/offline-dictation-mac/',
    secondaryText: 'Read the offline dictation guide',
    articleHeadline: 'Best offline dictation apps for Mac',
    lede: [
      'If you are searching for the best offline dictation apps for Mac, separate two questions: can the app transcribe without a network after setup, and is the surrounding workflow actually good enough to use every day?',
      'Muesli is built for the second question and takes a clear side: speech-to-text should start on the Mac you own whenever it reasonably can. It is a local-first Mac app for hold-to-talk dictation, meeting transcription, and private speech-to-text on Apple Silicon, with local model paths such as Parakeet, Whisper, and Qwen3 ASR.',
    ],
    sections: [
      {
        eyebrow: 'Best offline dictation apps for Mac',
        title: 'What should I compare before choosing an offline Mac dictation app?',
        body: ['Look past the word offline. A useful dictation app needs capture, speech recognition, cleanup, paste behavior, permissions, storage, and a model strategy you can understand.', 'Apple Dictation is the simplest default. Superwhisper, Wispr Flow, and VoiceInk are worth comparing if you want a dedicated voice-to-text workflow. Muesli is the one I would bet on when you want local-first Mac dictation with inspectable software, offline-capable models, and ownership of the transcript path.'],
      },
      {
        eyebrow: 'Offline speech-to-text Mac',
        title: 'Can offline speech-to-text on Mac be practical for everyday work?',
        body: ['Yes, but only if the app returns text to the place you were already working. Offline ASR by itself is not the product. The useful flow is: hold a hotkey, speak, release, and get text into Notes, Gmail, Notion, Slack, Linear, Cursor, ChatGPT, Google Docs, or a browser field.', 'Muesli is built around that Mac workflow. The model can run locally after setup, and the app uses macOS permissions to paste the result back into the active cursor.'],
      },
      {
        eyebrow: 'Local dictation Mac',
        title: 'Why does local dictation on Mac matter?',
        body: ['Local dictation changes the default trust boundary. Instead of uploading every spoken draft before text comes back, the speech-to-text step can run on Apple Silicon using local model paths.', 'That does not mean every feature is always offline. Model downloads, updates, calendar sync, and optional cloud summaries still need network access. The important part is narrower and more useful: normal dictation does not need to begin with a hosted transcription request.'],
      },
      {
        eyebrow: 'Dictation app Mac offline',
        title: 'Which Mac dictation apps can make sense offline?',
        body: ['Apple Dictation is the built-in baseline. It is convenient, but gives you less control over model choice and the surrounding workflow.', 'Superwhisper and VoiceInk are dedicated dictation apps with local/offline options worth comparing. Wispr Flow is polished for voice-to-text, though its main appeal is the finished AI writing flow rather than local-first ownership. Muesli is for Mac users who want offline-capable speech-to-text, open-source code, and a workflow designed around local models.'],
      },
      {
        eyebrow: 'Parakeet Whisper Qwen Mac',
        title: 'Why do Parakeet, Whisper, and Qwen3 ASR matter on Apple Silicon?',
        body: ['Model choice matters because speech-to-text is a tradeoff, not a single magic score. Parakeet is useful for fast everyday dictation. Whisper is a familiar local ASR family with its own strengths. Qwen3 ASR gives another local path for different language and recognition tradeoffs.', 'Muesli routes these through Apple Silicon-oriented runtimes such as CoreML, WhisperKit, FluidAudio, Metal, and Apple Neural Engine-capable paths where supported. The point is not to claim one model wins every sentence. The point is to keep the speech layer close to the Mac you own.'],
      },
    ],
    comparison: {
      title: 'Best offline dictation apps for Mac: quick comparison',
      aria: 'Offline Mac dictation app comparison',
      rows: [
        ['Apple Dictation', 'Built into macOS and easy to try for quick voice typing.', 'Less control over model choice, local model behavior, formatting, and workflow ownership.'],
        ['Superwhisper', 'Polished voice-to-text with offline and cloud recognition options.', 'Best if you want a mature dictation product and are comfortable with its app model and pricing.'],
        ['Wispr Flow', 'Fast, opinionated voice-to-text focused on turning natural speech into polished writing.', 'Better fit for AI writing flow than for users who primarily want an inspectable local-first Mac stack.'],
        ['VoiceInk', 'Privacy-focused macOS dictation with local transcription and open-source visibility.', 'Worth comparing if you want a local Mac dictation app and prefer its workflow.'],
        ['Muesli', 'Local-first Mac dictation with Parakeet, Whisper, Qwen3 ASR, CoreML/ANE paths, open-source code, and paste into the current app.', 'The strongest fit for Apple Silicon users who want ownership of everyday speech-to-text rather than another rented cloud pipeline.'],
      ],
    },
    fitTitle: 'When does local or offline dictation matter most?',
    fitCards: [
      ['Private drafts and unfinished thinking', 'Use local dictation when spoken notes include customer context, personal writing, prompts, code comments, hiring notes, or rough ideas that should not need a cloud transcription step.'],
      ['Unreliable networks and travel', 'Offline-capable dictation helps on planes, trains, shared office Wi-Fi, hotel networks, and any place where a cloud round trip makes short writing feel fragile.'],
      ['Owning the speech workflow', 'Local-first software matters when you want to reason about the app, the model path, the transcript storage, and the optional cloud layers instead of treating voice-to-text as a black box.'],
    ],
    faqTitle: 'What do people ask about offline dictation apps for Mac?',
    ctaTitle: 'Use dictation that starts on your own Mac.',
    ctaBody: 'Muesli gives Apple Silicon users a local-first dictation workflow with offline-capable models, open-source code, and text that lands back where they were already working.',
  },
  '/bot-free-meeting-notes': {
    breadcrumb: 'Bot-Free Meeting Notes',
    faqItems: botFreeMeetingNotesFaqItems,
    image: solarpunkLocalMeetingTranscriptionUrl,
    imageAlt: 'A solarpunk meeting notes workspace with an unbranded laptop, local transcript pages, and no visible human face',
    kicker: 'Bot-free meeting notes',
    headline: 'AI meeting notes without turning every call into a bot meeting.',
    subcopy: 'Muesli captures your microphone and the call audio already playing on your Mac, transcribes it on-device, and turns it into notes when you ask. No Zoom bot. No Meet attendee. No transcript uploaded by default.',
    secondaryHref: '/local-meeting-transcription-mac/',
    secondaryText: 'Read the meeting transcription guide',
    articleHeadline: 'Meeting notes should not need a fake coworker',
    lede: [
      'Most AI notetakers work by joining your meeting as another participant. That can be useful, but it also changes the room. People notice the bot. Some calls block it. Some teams do not want a third-party recorder sitting in every calendar invite.',
      'Muesli takes the side of the person already in the call. Record from your Mac, capture mic plus system audio, run speech-to-text locally on Apple Silicon, and keep the raw transcript on your machine. Summaries are useful, but they should not replace ownership of the source record.',
    ],
    sections: [
      {
        eyebrow: 'Bot-free meeting notes',
        title: 'How do I take meeting notes without a bot?',
        body: ['Use the audio already present on your Mac. Muesli records your microphone and the other speakers from system audio, then transcribes the meeting locally.', 'The meeting app does not need to admit a bot, and nobody sees an extra participant named after a SaaS company. It is the cleaner default for people who want notes without changing the room.'],
      },
      {
        eyebrow: 'Zoom, Meet, Teams',
        title: 'Can AI meeting notes work without joining Zoom, Meet, or Teams?',
        body: ['Yes. Muesli does not need to join the call. If you can hear the meeting through your Mac, Muesli can capture the call audio locally.', 'It works across Zoom, Google Meet, Microsoft Teams, Webex, and other apps because it is not tied to a meeting-platform bot API.'],
      },
      {
        eyebrow: 'Transcript ownership',
        title: 'Where does the meeting transcript go?',
        body: ['The transcript is stored locally on your Mac. You own the raw text, not just a generated summary.', 'That matters. A summary is an interpretation; the transcript is the source record. Muesli keeps that source record close enough to review, search, export, or delete without digging through a vendor dashboard.'],
      },
      {
        eyebrow: 'Local transcription',
        title: 'Is this a local meeting transcription app for Mac?',
        body: ['Yes. Muesli is a native macOS app built for Apple Silicon. Speech-to-text runs on-device using local models, so routine transcription does not depend on cloud STT, per-minute billing, or a browser tab staying alive.', 'Optional summarization can still use the backend you choose, but the source transcript begins closer to the machine you control.'],
      },
      {
        eyebrow: 'Alternatives',
        title: 'Is Muesli an Otter or Fireflies alternative?',
        body: ['Muesli is an alternative if what you want is bot-free capture, local transcription, and transcript ownership.', 'It is not trying to be a team surveillance dashboard or a meeting analytics suite. It is for people who want clean notes from calls without adding another attendee.'],
      },
    ],
    comparison: {
      title: 'Meeting bots vs Muesli: what changes?',
      aria: 'Bot-based notetakers vs Muesli comparison',
      rows: [
        ['Meeting bots', 'Hosted notetakers that join calls as visible participants and centralize transcripts in a vendor workspace.', 'Useful for team automation, but adds another attendee and usually starts with cloud transcription.'],
        ['Manual notes', 'Typing notes yourself when a meeting bot would be awkward or blocked.', 'Maximum control, but easy to miss details and hard to search later.'],
        ['Muesli', 'Bot-free local-first meeting capture from the Mac already in the call, with raw transcripts and optional summaries.', 'The better default when you want notes without adding another attendee or renting the source transcript from a hosted workspace.'],
      ],
    },
    fitTitle: 'When are bot-free meeting notes the better fit?',
    fitCards: [
      ['The extra attendee feels awkward', 'Use Muesli for small calls, customer conversations, interviews, and internal meetings where a visible notetaker bot changes the room.'],
      ['The raw transcript matters', 'Use Muesli when you want to keep the transcript locally and use AI summaries as a convenience layer, not as the only copy of what was said.'],
      ['You need a team analytics suite', 'Choose a bot-first platform if you need centralized dashboards, CRM automation, or a bot that joins meetings when your Mac is not present.'],
    ],
    faqTitle: 'What do people ask about bot-free meeting notes?',
    ctaTitle: 'Take meeting notes from the Mac already in the call.',
    ctaBody: 'Download Muesli for Mac and keep meeting capture, transcripts, and notes closer to the machine you control.',
  },
  '/wispr-flow-alternative': {
    breadcrumb: 'Best Wispr Flow Alternatives for Mac',
    faqItems: wisprFlowAlternativeFaqItems,
    image: impressionistWhisperUrl,
    imageAlt: 'Original Impressionist-inspired salon painting of one person whispering an observation to another in a sunlit room',
    kicker: 'Wispr Flow alternatives for Mac in 2026',
    headline: 'The best Wispr Flow alternatives for Mac in 2026.',
    subcopy: 'Muesli is the strongest fit for Mac users who want a free, open-source, offline-capable alternative to Wispr Flow. Compare the serious options by platform, privacy, local speech-to-text, and how much of your voice workflow you actually get to own.',
    secondaryHref: '/mac-dictation-app/',
    secondaryText: 'Read the Mac dictation guide',
    articleHeadline: 'The best Wispr Flow alternatives for Mac in 2026',
    lede: [
      'If you are looking for Wispr Flow alternatives, the real choice is not just which app has the nicest writing polish. It is where speech becomes text, which platforms you need, and whether your everyday dictation should begin with a cloud upload.',
      'For Mac users who want local speech-to-text, open-source software, and a workflow that stays close to the machine they control, Muesli is the clear recommendation. It is a native Apple Silicon app for dictation and meeting transcription, with local models such as Parakeet and Whisper.',
    ],
    sections: [
      {
        eyebrow: 'Quick answer',
        title: 'What is the best Wispr Flow alternative for Mac?',
        body: ['Muesli is the best fit when your priority is local-first Mac dictation. It runs speech-to-text on Apple Silicon, supports offline-capable models, keeps the software open source, and also handles meeting transcription without forcing you into a separate hosted workspace.', 'Wispr Flow is still a strong choice when you want a polished cross-platform voice keyboard across Mac, Windows, iPhone, and Android. Superwhisper, VoiceInk, and Apple Dictation are useful alternatives for different budgets and levels of control.'],
      },
      {
        eyebrow: 'Why switch',
        title: 'Why look for a Wispr Flow alternative on Mac?',
        body: ['Wispr Flow is useful. The reason to compare it is ownership. Your dictation can contain private drafts, customer replies, research notes, AI prompts, code comments, and unfinished thinking. Some Mac users would rather not make a hosted speech pipeline the default place where all of that begins.', 'Muesli is built for that preference: hold a hotkey, speak, release, and let local speech-to-text put the words back into the app you were already using.'],
      },
      {
        eyebrow: 'Offline speech-to-text',
        title: 'Is there an offline Wispr Flow alternative for Mac?',
        body: ['Yes. Muesli supports local ASR models such as Parakeet and Whisper, so normal dictation can run on Apple Silicon after the model is installed. The speech-to-text path does not need to upload every sentence to a hosted API.', 'That does not make every feature offline by magic. Downloads, updates, calendar sync, and optional cloud summarization still need the internet. The difference is that cloud transcription is no longer the automatic starting point for every spoken draft.'],
      },
      {
        eyebrow: 'Open source',
        title: 'Why is Muesli different from other Wispr Flow alternatives?',
        body: ['Muesli is not trying to be another closed voice layer with a slightly different polish. It is a Mac-native speech workspace for dictation and meeting transcription, built around local models and open-source code.', 'That makes the product easier to inspect and debug. You can understand the model path, permissions, storage, and optional cloud layers instead of treating the entire speech workflow as a black box.'],
      },
      {
        eyebrow: 'Tradeoffs',
        title: 'When might Wispr Flow still be the better choice?',
        body: ['Choose Wispr Flow if cross-platform coverage, account sync, and a polished hosted writing layer matter more than local ownership. That is a reasonable tradeoff for people who move between Mac, Windows, iPhone, and Android.', 'Choose Muesli if you are on Apple Silicon and want the stronger local default: dictation and meeting transcription starting from the machine you control, with source code and transcripts you can inspect.'],
      },
    ],
    comparison: {
      title: 'Which Wispr Flow alternative should I choose?',
      aria: 'Wispr Flow alternatives comparison',
      rows: [
        ['Muesli', 'Best for local-first Mac dictation, offline-capable ASR, open-source software, and meeting transcription.', 'Mac and Apple Silicon focused. Optional summaries and integrations are separate from local transcription.'],
        ['Wispr Flow', 'Best for polished AI dictation across Mac, Windows, iPhone, and Android.', 'A hosted product is the right tradeoff if cross-platform convenience matters more than owning the speech layer.'],
        ['Superwhisper', 'Best for a refined dedicated dictation app with local and cloud model choices.', 'Compare its pricing, model behavior, and workflow against your preference for open-source software.'],
        ['VoiceInk', 'Best for another privacy-focused Mac dictation option with local transcription.', 'A narrower dictation product if you also want local meeting capture and notes in the same app.'],
        ['Apple Dictation', 'Best for quick free voice typing with nothing to install.', 'Less control over model choice, workflow, and the surrounding transcript experience.'],
      ],
    },
    fitTitle: 'Which Wispr Flow alternative is best for each use case?',
    fitCards: [
      ['Best open-source alternative: Muesli', 'Muesli is the pick when inspectability matters. It is open-source, Mac-native, and built around local speech-to-text rather than an opaque voice layer.'],
      ['Best offline alternative: Muesli', 'Use Muesli when your preferred dictation path should keep working after local models are installed, even when Wi-Fi is unreliable or cloud transcription is not the right default.'],
      ['Best cross-platform alternative: Wispr Flow', 'Wispr Flow remains the obvious fit when you need the same polished voice keyboard across Mac, Windows, iPhone, and Android.'],
      ['Best built-in alternative: Apple Dictation', 'Apple Dictation is the simplest free option when you only need occasional voice typing and do not need model choice or a separate meeting workflow.'],
    ],
    relatedLinks: [
      ['Best dictation apps for Mac', '/best-dictation-apps-mac', 'Compare Muesli with Apple Dictation, Superwhisper, Wispr Flow, VoiceInk, and other Mac voice-to-text options.'],
      ['Best offline dictation apps for Mac', '/best-offline-dictation-apps-mac', 'See how local models such as Parakeet and Whisper change the offline dictation tradeoff.'],
      ['Offline dictation for Mac', '/offline-dictation-mac', 'A practical guide to running speech-to-text without making a cloud upload the default.'],
      ['On-device dictation', '/on-device-dictation', 'Use a hotkey to speak naturally and paste clean local speech-to-text into the app already in front of you.'],
      ['Local meeting transcription for Mac', '/local-meeting-transcription-mac', 'Use the same local-first Mac workflow for meeting capture, transcripts, and notes.'],
    ],
    faqTitle: 'What do people ask about Wispr Flow alternatives?',
    ctaTitle: 'Choose the Wispr Flow alternative that starts on your Mac.',
    ctaBody: 'Download Muesli for a free, open-source, local-first dictation workflow for everyday writing, prompts, notes, replies, and meetings.',
  },
  '/otter-ai-alternative': {
    breadcrumb: 'Otter.ai Alternative',
    faqItems: otterAiAlternativeFaqItems,
    image: edoWhisperUrl,
    imageAlt: 'Original Edo-period-inspired painting of two people whispering beside a writing desk and a moss garden',
    kicker: 'Otter.ai alternative',
    headline: 'An Otter.ai alternative for Mac meeting notes without a bot.',
    subcopy: 'Otter.ai is built for cloud transcription, meeting bots, and shared team notes. Muesli is for Mac and macOS users who want meeting audio captured from their own computer, local-first transcripts, and meeting memory closer to the machine they control.',
    secondaryHref: '/local-meeting-transcription-mac/',
    secondaryText: 'Read the meeting transcription guide',
    articleHeadline: 'An Otter.ai alternative for Mac meeting notes without a bot',
    lede: [
      'There are good reasons to use Otter.ai: it is established, collaborative, and built around cloud meeting transcription at team scale.',
      'If you are looking for an Otter.ai alternative for Mac, the practical question is whether every meeting needs a bot, another hosted transcript library, or another cloud place where your workday memory lives. Muesli is built for meeting transcription that starts locally and stays inspectable.',
    ],
    sections: [
      {
        eyebrow: 'Positioning',
        title: 'What is Otter.ai good at?',
        body: ['Otter.ai is useful for teams that explicitly want cloud transcription, shared meeting notes, meeting bots, searchable conversations, and collaboration features across many calls.', 'Muesli is taking the other side: if the Mac is already in the meeting, capture there first. Keep the source transcript close, then decide what deserves to become a summary or shared artifact.'],
      },
      {
        eyebrow: 'Ownership',
        title: 'Why look for an Otter.ai alternative for Mac?',
        body: ['People usually look for an Otter.ai alternative for Mac when they are tired of cloud defaults. They may not want a bot joining meetings, may want direct ownership of raw transcripts, or may prefer software that begins with local capture on the Mac already in the call.', 'Muesli is built around that answer: every meeting should not start by renting your meeting memory back from a hosted system.'],
      },
      {
        eyebrow: 'Choice',
        title: 'Should I use Otter.ai or Muesli for meeting notes?',
        body: ['Use Otter.ai if your team wants a mature hosted transcription workspace, shared meeting libraries, and centralized collaboration.', 'Use Muesli if you want meeting transcription to start from your own Mac, avoid a bot-first workflow, and keep the raw record closer before deciding what to summarize or share.'],
      },
      {
        eyebrow: 'Botless',
        title: 'Can Muesli create meeting notes without joining the call?',
        body: ['Yes. Muesli is built around capturing audio from the Mac you are already using. It can record your microphone and system audio for meetings, then turn the transcript into notes you can review.', 'That makes it useful for Zoom, Google Meet, Teams, FaceTime, browser calls, and other meeting workflows where you do not want another participant in the room.'],
      },
      {
        eyebrow: 'Privacy',
        title: 'What does local-first meeting transcription mean for privacy?',
        body: ['Local-first does not mean pretending privacy is magic. It means the default transcription path starts on the device you control instead of beginning with a hosted transcription service.', 'Muesli still uses normal macOS permissions for microphone, system audio, and accessibility-based workflows. Optional cloud summaries or integrations can exist, but they sit on top of the transcript workflow rather than replacing ownership of the underlying meeting record.'],
      },
    ],
    comparison: {
      title: 'How is Muesli different from Otter.ai for Mac users?',
      aria: 'Otter.ai vs Muesli comparison',
      rows: [
        ['Otter.ai', 'Cloud transcription, shared meeting notes, meeting bots, searchable conversations, and team collaboration.', 'Best for teams that want shared cloud meeting intelligence and centralized collaboration.'],
        ['Muesli', 'Local-first macOS speech workspace for dictation and meeting transcription with raw transcript review and exports.', 'Best for Mac users who want local-first meeting transcription, open-source software, and direct control.'],
      ],
    },
    fitTitle: 'When is Muesli the better Otter.ai alternative for Mac?',
    fitCards: [
      ['Want Mac meeting notes without a bot?', 'Use Muesli when you want to capture a meeting from your own Mac instead of inviting another assistant into the call.'],
      ['Want transcripts you can inspect and export?', 'Use Muesli when the raw transcript matters and you want notes or exports you can keep outside a hosted meeting workspace.'],
      ['Want one app for dictation and meetings?', 'Use Muesli when your speech workflow includes both quick dictation during the day and longer meeting transcription after calls.'],
    ],
    faqTitle: 'What do people ask when comparing Otter.ai and Muesli?',
    ctaTitle: 'Want meeting notes you own instead of renting them from the cloud?',
    ctaBody: 'Muesli gives macOS users a local-first way to capture meetings, review transcripts, and create notes without making every conversation start inside another hosted workspace.',
  },
  '/fireflies-ai-alternative': {
    breadcrumb: 'Fireflies.ai Alternative',
    faqItems: firefliesAiAlternativeFaqItems,
    image: solarpunkFirefliesAiAlternativeUrl,
    imageAlt: 'A dusk solarpunk meeting-notes workspace with garden lanterns, an unbranded laptop, a microphone, and no visible human face',
    kicker: 'Fireflies.ai alternative',
    headline: 'A Fireflies.ai alternative for people who want meeting memory they can own.',
    subcopy: 'Fireflies.ai is a broad AI meeting assistant for recording, transcribing, summarizing, and searching meetings across a team. Muesli is for macOS users who want meeting transcription to begin on the Mac already in the call, without sending a bot into every room or renting their workday memory back from the cloud.',
    secondaryHref: '/local-meeting-transcription-mac/',
    secondaryText: 'Read the local meeting transcription guide',
    articleHeadline: 'A Fireflies.ai alternative for local-first meeting notes',
    lede: [
      'Fireflies.ai is built for teams that want recordings, transcripts, summaries, searchable meeting history, and workflow integrations in one hosted system.',
      'Muesli is a different choice for Mac users: capture from the machine already in the call, keep the transcript inspectable, and decide when summaries or cloud services should enter the workflow.',
    ],
    sections: [
      {
        eyebrow: 'Context',
        title: 'What is Fireflies.ai good at?',
        body: ['Fireflies.ai is built as an AI meeting assistant for teams that want recordings, transcripts, summaries, searchable meeting history, and workflow integrations in one hosted system.', 'That can be useful when the goal is shared meeting memory across a sales team, recruiting team, customer success team, or any organization that wants meeting content pushed into a cloud workspace automatically. If that is the job, Fireflies.ai is a strong fit.'],
      },
      {
        eyebrow: 'Why switch',
        title: 'Why look for a Fireflies.ai alternative on Mac?',
        body: ['The reason to look elsewhere is usually not that Fireflies.ai lacks features. It is that the product shape may be heavier than the workflow.', 'Some people do not want a meeting bot joining calls, storing conversations in another cloud system, and turning every meeting into a hosted workspace they have to manage. They want the transcript to start on their own Mac, remain inspectable, and stay closer to the person who was actually in the meeting.'],
      },
      {
        eyebrow: 'Local-first',
        title: 'What does Muesli do differently from an AI meeting bot?',
        body: ['Muesli treats meeting notes as something that should begin near the audio source. It captures microphone and system audio from your Mac, creates a transcript you can inspect, and lets summaries sit on top of that source material.', 'The important difference is not a larger feature checklist. It is the default: your meeting memory starts on your machine before it becomes anything else.'],
      },
      {
        eyebrow: 'When not',
        title: 'When should I still choose Fireflies.ai?',
        body: ['Choose Fireflies.ai if you mainly want a mature cloud meeting assistant for a team, with centralized meeting search, CRM-style workflows, collaboration features, and broad integrations.', 'Muesli is not trying to clone that entire platform. It is the better choice when the priority is local-first Mac capture, ownership, and avoiding another cloud workspace for your workday memory.'],
      },
    ],
    comparison: {
      title: 'Should I use Fireflies.ai or Muesli for meeting notes?',
      aria: 'Fireflies.ai vs Muesli comparison',
      rows: [
        ['Fireflies.ai', 'Hosted AI meeting assistant for recording, transcription, summaries, search, integrations, and team workflows.', 'Best for teams that want a centralized cloud meeting assistant with broad automation.'],
        ['Muesli', 'Local-first macOS speech workspace for dictation and meeting transcription from the Mac already in the call.', 'Best for Mac users who want local-first capture, open-source software, and fewer cloud assumptions.'],
      ],
    },
    fitTitle: 'When is Muesli the better Fireflies.ai alternative?',
    fitCards: [
      ['When you do not want a bot in the meeting', 'Use Muesli when the people in the call should not need to see another AI participant just so you can keep useful notes.'],
      ['When you want local transcription on macOS', 'Muesli is built for Mac users who want meeting transcription to start from the machine already handling the call.'],
      ['When you care about owning the raw transcript', 'A summary is useful, but the transcript is the source. Muesli keeps that source visible instead of hiding it behind a hosted memory layer.'],
      ['When open-source software matters', 'Muesli gives technical users and teams a more inspectable path than a closed meeting assistant workflow.'],
    ],
    faqTitle: 'What do people ask when comparing Fireflies.ai and Muesli?',
    ctaTitle: 'Want meeting notes without renting your workday memory from the cloud?',
    ctaBody: 'Muesli is open-source, Mac-native, and built for people who want meeting transcription to start on the machine they control.',
  },
};

const blogPostEntries = [
  {
    path: '/medical-dictation-mac',
    title: 'The best medical dictation tool might start on your own Mac',
    excerpt: 'A privacy-first look at medical dictation, clinical scribes, and the local speech-to-text layer doctors can control before notes enter an approved system.',
    category: 'Healthcare',
    tags: ['Healthcare', 'Privacy', 'Local AI'],
    date: '2026-07-06',
    readTime: '9 min read',
    image: solarpunkMedicalDictationMacUrl,
    imageAlt: 'Solarpunk medical workspace with a Mac, microphone, local transcript, and plants, with no visible human face',
  },
  {
    path: '/asr-architectures',
    title: 'Common speech-to-text architectures, explained without the fog',
    excerpt: 'CTC, RNN-T, TDT, Conformer encoders, encoder-decoder Transformers, and the surrounding systems that make local ASR useful.',
    category: 'Model Guides',
    tags: ['Model Guides', 'Local AI'],
    date: '2026-06-30',
    readTime: '11 min read',
    image: asrArchitecturesHeaderUrl,
    imageAlt: 'Abstract speech-to-text architecture diagram with audio waves flowing through multiple local ASR model paths',
  },
  {
    path: '/nvidia-parakeet-speech-to-text',
    title: 'NVIDIA Parakeet makes local English speech-to-text feel practical',
    excerpt: 'Why Parakeet matters for fast local English ASR, and why a clear sentence from your Mac should not need a cloud round trip.',
    category: 'Model Guides',
    tags: ['Model Guides', 'Local AI', 'Dictation'],
    date: '2026-06-30',
    readTime: '8 min read',
    image: nvidiaParakeetSpeechToTextHeaderUrl,
    imageAlt: 'Abstract green and charcoal Parakeet speech-to-text model header with local inference blocks and token streams',
  },
  {
    path: '/whisper-speech-to-text',
    title: 'OpenAI Whisper speech-to-text: where it still shines locally',
    excerpt: 'A practical guide to Whisper’s encoder-decoder design, multilingual strengths, local inference tradeoffs, and where it fits in Muesli.',
    category: 'Model Guides',
    tags: ['Model Guides', 'Local AI', 'Dictation'],
    date: '2026-06-30',
    readTime: '9 min read',
    image: whisperSpeechToTextHeaderUrl,
    imageAlt: 'Abstract dark Whisper speech-to-text header with Muesli and OpenAI marks, audio waves, and local model paths',
  },
  {
    path: '/granola-vs-muesli',
    title: 'Granola has the sugar. Muesli keeps your transcript safe and healthy.',
    excerpt: 'Why local speech-to-text has advanced far enough that every meeting transcript does not need to begin in someone else’s cloud.',
    category: 'Comparisons',
    tags: ['Comparisons', 'Privacy', 'Meeting Notes'],
    date: '2026-06-30',
    readTime: '10 min read',
    image: solarpunkGranolaVsMuesliUrl,
    imageAlt: 'Watercolor solarpunk garden workspace comparing a sugary granola bowl with raw muesli beside a Mac and local transcript notebook',
  },
  {
    path: '/best-offline-dictation-apps-mac',
    title: 'The best offline dictation app for Mac should not treat local speech as an afterthought',
    excerpt: 'A practical comparison of offline dictation apps for Mac, from built-in Apple Dictation to local model workflows on Apple Silicon.',
    category: 'Dictation',
    tags: ['Dictation', 'Privacy', 'Local AI'],
    date: '2026-06-25',
    readTime: '12 min read',
    image: solarpunkOfflineDictationUrl,
    imageAlt: 'Warm Mac writing workspace with a microphone, local speech model notes, and an unbranded laptop running offline dictation',
  },
  {
    path: '/bot-free-meeting-notes',
    title: 'Meeting notes without adding another guest to the call',
    excerpt: 'What changes when your Mac captures the meeting instead of a bot joining Zoom, Meet, or Teams on your behalf.',
    category: 'Meeting Notes',
    tags: ['Meeting Notes', 'Privacy', 'Local AI'],
    date: '2026-06-25',
    readTime: '8 min read',
    image: solarpunkLocalMeetingTranscriptionUrl,
    imageAlt: 'Solarpunk local meeting transcription workspace with a Mac, notebook, microphone, and no visible human face',
  },
  {
    path: '/apple-dictation-alternative',
    title: 'Apple Dictation is a feature. Muesli is a speech workspace.',
    excerpt: 'When built-in voice typing stops being enough: local model choice, transcript history, meeting transcription, and a workflow you control.',
    category: 'Dictation',
    tags: ['Dictation', 'Local AI', 'Privacy'],
    date: '2026-06-25',
    readTime: '9 min read',
    image: solarpunkParkSpeechLawnUrl,
    imageAlt: 'Mac dictation workspace with an unbranded laptop, microphone, transcript notes, and no visible human face',
  },
  {
    path: '/local-speech-to-text-glossary',
    title: 'The local speech-to-text glossary for Mac',
    excerpt: 'ASR, VAD, diarization, neural AEC, CoreML, Apple Neural Engine, Parakeet, Whisper, and the terms behind a local speech stack.',
    category: 'Model Guides',
    tags: ['Model Guides', 'Local AI'],
    date: '2026-06-21',
    readTime: '10 min read',
    image: solarpunkLocalSpeechGlossaryUrl,
    imageAlt: 'Solarpunk technical library workspace for local speech-to-text terms with a Mac, diagrams, and no visible human face',
  },
  {
    path: '/apple-neural-engine-speech-to-text-mac',
    title: 'What Apple Silicon changes about speech-to-text on Mac',
    excerpt: 'How CoreML and the Apple Neural Engine change the latency, power, and privacy equation for local dictation and transcription.',
    category: 'Local AI',
    tags: ['Local AI', 'Model Guides', 'Dictation'],
    date: '2026-06-21',
    readTime: '9 min read',
    image: solarpunkAppleNeuralEngineSpeechUrl,
    imageAlt: 'Solarpunk Mac workspace illustrating local speech-to-text on Apple Silicon with a microphone and no visible human face',
  },
  {
    path: '/mac-dictation-app',
    title: 'What should a Mac dictation app actually do?',
    excerpt: 'A practical guide to local voice typing, paste-at-cursor workflows, model choice, privacy, and where Muesli fits.',
    category: 'Dictation',
    tags: ['Dictation', 'Local AI', 'Privacy'],
    date: '2026-06-19',
    readTime: '9 min read',
    image: solarpunkParkSpeechLawnUrl,
    imageAlt: 'Solarpunk park workspace with a laptop, microphone, gardens, and local speech-to-text notes',
  },
  {
    path: '/local-meeting-transcription-mac',
    title: 'How local meeting transcription works on Mac',
    excerpt: 'Capture microphone and system audio from the Mac already in the call, then keep the transcript close before you decide what to share.',
    category: 'Meeting Notes',
    tags: ['Meeting Notes', 'Privacy', 'Local AI'],
    date: '2026-06-20',
    readTime: '9 min read',
    image: solarpunkLocalMeetingTranscriptionUrl,
    imageAlt: 'Solarpunk local meeting transcription workspace with a Mac, notebook, microphone, and no visible human face',
  },
  {
    path: '/offline-dictation-mac',
    title: 'Offline dictation on Mac is finally a real everyday workflow',
    excerpt: 'What offline means in practice, how local ASR models fit, and why the useful path is still speak, release, and get text where your cursor is.',
    category: 'Dictation',
    tags: ['Dictation', 'Privacy', 'Local AI'],
    date: '2026-06-20',
    readTime: '8 min read',
    image: solarpunkOfflineDictationUrl,
    imageAlt: 'Solarpunk writing studio with plants, solar structures, an unbranded laptop, and offline dictation notes',
  },
  {
    path: '/granola-alternative',
    title: 'A local Granola alternative for Mac meeting notes',
    excerpt: 'For people who want Granola-style meeting memory without making a hosted workspace the default home for every transcript.',
    category: 'Comparisons',
    tags: ['Comparisons', 'Meeting Notes', 'Privacy'],
    date: '2026-06-20',
    readTime: '9 min read',
    image: dutchWhisperUrl,
    imageAlt: 'Original Dutch Golden Age-inspired painting of two people whispering beside books and a writing desk',
  },
  {
    path: '/superwhisper-alternative',
    title: 'A Superwhisper alternative for people who want the speech layer on their Mac',
    excerpt: 'A practical comparison of polished AI dictation and Muesli’s open-source local-first path for dictation and meeting transcription.',
    category: 'Comparisons',
    tags: ['Comparisons', 'Dictation', 'Privacy'],
    date: '2026-06-25',
    readTime: '9 min read',
    image: renaissanceWhisperUrl,
    imageAlt: 'Original Renaissance-inspired painting of a scholar whispering a private message to another scholar beside a letter',
  },
  {
    path: '/wispr-flow-alternative',
    title: 'The best Wispr Flow alternatives for Mac in 2026',
    excerpt: 'A practical comparison of Wispr Flow alternatives by platform, privacy, offline speech-to-text, open-source software, and the workflows Muesli is built to own.',
    category: 'Comparisons',
    tags: ['Comparisons', 'Dictation', 'Privacy'],
    date: '2026-07-13',
    readTime: '10 min read',
    image: impressionistWhisperUrl,
    imageAlt: 'Original Impressionist-inspired salon painting of one person whispering an observation to another in a sunlit room',
  },
  {
    path: '/otter-ai-alternative',
    title: 'An Otter.ai alternative for meeting notes without a bot',
    excerpt: 'A Mac-first comparison for people who want meeting capture and local speech-to-text without inviting another participant into every call.',
    category: 'Comparisons',
    tags: ['Comparisons', 'Meeting Notes', 'Privacy'],
    date: '2026-06-20',
    readTime: '9 min read',
    image: edoWhisperUrl,
    imageAlt: 'Original Edo-period-inspired painting of two people whispering beside a writing desk and a moss garden',
  },
  {
    path: '/fireflies-ai-alternative',
    title: 'A Fireflies.ai alternative for local-first meeting notes',
    excerpt: 'What it looks like when meeting transcription starts on the Mac already in the call instead of with a hosted meeting assistant.',
    category: 'Comparisons',
    tags: ['Comparisons', 'Meeting Notes', 'Privacy'],
    date: '2026-06-20',
    readTime: '9 min read',
    image: solarpunkFirefliesAiAlternativeUrl,
    imageAlt: 'Solarpunk local meeting workspace with a Mac, microphone, transcript notes, and no visible human face',
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

const iosProductFaqItems = [
  {
    question: 'How does local speech-to-text work on iPhone?',
    answer: 'You choose and download a Parakeet or Whisper model, then Muesli runs core transcription on the iPhone. The first model download and preparation need an internet connection; ordinary transcription can run locally afterward.',
  },
  {
    question: 'Can I record and transcribe voice notes offline?',
    answer: 'Yes. After a local model is installed, voice note recording and core transcription can work without an internet connection. Model downloads, optional iCloud sync, and optional AI summaries still need a connection.',
  },
  {
    question: 'Can Muesli transcribe in-person meetings?',
    answer: 'Yes. Muesli records an in-person meeting from the iPhone microphone, builds the transcript with the selected local model, and keeps the recording and transcript on the phone by default. You are responsible for obtaining any consent required before recording another person.',
  },
  {
    question: 'How does the Muesli keyboard dictate into other apps?',
    answer: 'The keyboard creates a dictation request and opens the Muesli app. The main app handles microphone access, recording, and local transcription, then returns the result through the shared App Group so the keyboard can insert it into the original text field.',
  },
  {
    question: 'What does Full Access allow the keyboard to do?',
    answer: 'Full Access lets the keyboard extension exchange the dictation request, status, and finished text with the Muesli app through the shared App Group. The keyboard extension does not record audio itself, and Muesli does not use Full Access to collect everything you type.',
  },
  {
    question: 'What information stays on my iPhone?',
    answer: 'Voice recordings, downloaded speech models, transcript history, meeting records, and personal dictionary data stay on the iPhone by default. You can delete saved content and remove downloaded models from the app.',
  },
  {
    question: 'Which features optionally use iCloud or another provider?',
    answer: 'Private iCloud sync can copy text history between your iPhone and Mac; audio and speech models are not synced. If you request an AI summary, transcript text is sent to the OpenRouter or ChatGPT provider you connected. TelemetryDeck receives anonymized, privacy-preserving aggregate telemetry about app interactions and health.',
  },
];

const iosFeaturePillars = [
  [Mic2, 'Private voice notes', 'Capture quick thoughts or longer recordings, keep the original audio locally, and revisit a searchable transcript.'],
  [AudioWaveform, 'In-person meetings', 'Record the room from your iPhone microphone and keep the transcript available beneath any optional summary.'],
  [Keyboard, 'Dictation keyboard', 'Start a request from another app, record and transcribe in Muesli, then insert the result back where you were writing.'],
  [BookOpen, 'Personal dictionary', 'Teach Muesli names, brands, acronyms, and phrase corrections that matter to the way you speak.'],
  [Cpu, 'Local model choice', 'Choose Parakeet or Whisper based on language, accuracy, speed, and storage needs.'],
  [Sparkles, 'Optional summaries', 'Connect OpenRouter or ChatGPT only when you want a meeting summary from a transcript you already control.'],
];

const iosProcessingRows = [
  ['Voice recording', 'On device'],
  ['Core transcription', 'On device'],
  ['Transcript history', 'Local storage'],
  ['Personal dictionary', 'Local storage'],
  ['iCloud text sync', 'Optional Apple service'],
  ['AI summaries', 'Optional provider'],
  ['Product analytics', 'Anonymized aggregate telemetry'],
];

const iosScreens = [
  [iosLiveVoiceNoteUrl, 'Voice note recording', 'Record a thought, keep the audio close, and use the scratchpad while you speak.'],
  [iosLiveMeetingUrl, 'Live in-person meeting', 'Capture a room from the iPhone microphone without inviting a meeting bot.'],
  [iosKeyboardUrl, 'Muesli keyboard', 'Bring local dictation into the text field inside another iPhone app.'],
  [iosLocalControlUrl, 'Local model selection', 'Pick the on-device model that matches your language, speed, and storage needs.'],
  [iosDictionaryUrl, 'Personal dictionary', 'Correct names, acronyms, and phrases the way you actually use them.'],
  [iosVoiceNotesHomeUrl, 'Voice note history', 'Keep recent recordings and transcripts organized on the phone.'],
];

const iosHelpSections = [
  ['Getting started with Muesli on iPhone', 'Open Muesli, complete onboarding, allow microphone access, and download a local transcription model. Core voice notes and meeting transcription do not require an account.'],
  ['Allowing microphone access', 'Choose Allow when iOS asks for microphone access. If you denied it, open Settings > Privacy & Security > Microphone and enable Muesli, then return to the app.'],
  ['Downloading a transcription model', 'Open Settings > Models and choose a Parakeet or Whisper model. Keep Muesli open and connected during the first download and preparation. Available choices range from lighter models around 153 MB to larger models around 1.5 GB.'],
  ['Using transcription without an internet connection', 'Download and prepare a model before going offline. Recording and core transcription can then run locally. iCloud sync, model downloads, and optional AI summaries still require a network connection.'],
  ['Recording and recovering a voice note', 'Start a Voice Note, speak, then stop to save and transcribe it. Long recordings save audio locally as they progress. If transcription is interrupted, reopen Muesli and check Recent Voice Notes for the saved recording or pending result.'],
  ['Recording an in-person meeting', 'Open Meetings, give the session a title, and start recording. Keep the iPhone near the people speaking and leave Muesli active. Obtain any notice or consent required where you are recording.'],
  ['Installing the Muesli keyboard', 'Open iOS Settings > General > Keyboard > Keyboards > Add New Keyboard, choose Muesli, then select Muesli in the keyboard list. Return to a text field and switch keyboards with the globe key.'],
  ['Enabling Full Access', 'In iOS Settings > General > Keyboard > Keyboards > Muesli, enable Allow Full Access. This lets the keyboard and main app exchange a request and finished result through their shared App Group.'],
  ['Understanding the keyboard-to-app handoff', 'The keyboard extension does not record audio. Tapping its microphone creates a request and opens Muesli, where microphone access, recording, and local transcription are handled. The result is returned through the shared App Group and inserted by the keyboard.'],
  ['Managing saved audio and transcripts', 'Voice notes, meeting recordings, transcripts, and history are stored locally by default. Use the delete controls in the relevant detail screen to remove content. Audio is not included in optional iCloud text sync.'],
  ['Using the personal dictionary', 'Open Settings > Dictionary to add names, brands, acronyms, and phrase corrections. You can also configure filler-word removal. Dictionary data stays in local app storage by default.'],
  ['Enabling optional iCloud sync', 'Open Settings > Sync and turn on private iCloud sync while signed in to iCloud. Muesli can sync voice-note text, meeting transcripts, notes, and summaries between iPhone and Mac. Audio and downloaded models are not synced.'],
  ['Connecting optional summary providers', 'Open Settings > Summaries. Add an OpenRouter API key or sign in with ChatGPT. A provider receives transcript text only when you ask Muesli to generate a summary. Local recording and transcription do not need a summary provider.'],
  ['Troubleshooting model downloads', 'Check available device storage and network access, keep Muesli in the foreground, and retry from Settings > Models. If a partial model remains, remove it from the model manager and start the download again.'],
  ['Troubleshooting missing transcripts', 'Confirm a local model shows as ready, then check the relevant Voice Note or Meeting detail. If the recording exists, reconnect power if needed and reopen Muesli so a pending local transcription can resume.'],
  ['Troubleshooting keyboard handoff', 'Confirm Muesli Keyboard is selected, Full Access is enabled, and Muesli can open from the keyboard. If the result does not return, switch back to Muesli, finish the request, then return to the original text field and select the Muesli keyboard again.'],
  ['Contacting support', 'Email pranav@muesli.works with your iOS version, iPhone model, selected transcription model, and the step that failed. Do not send private recordings or transcripts unless you intentionally choose to share them.'],
];

const legalPages = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'July 14, 2026',
    intro: 'This policy covers Muesli for macOS, Muesli for iPhone, the Muesli keyboard, muesli.works, and optional connected features. Core speech transcription runs locally on your device after a model is installed. Connected features are optional and are described separately below.',
    sections: [
      {
        title: 'Scope of This Policy',
        body: [
          'Muesli provides dictation, voice notes, meeting transcription, and meeting notes on macOS and iOS. The Mac app records dictation and computer-based meetings. The iPhone app records voice notes and in-person meetings and can return dictated text to other apps through the optional Muesli keyboard.',
        ],
      },
      {
        title: 'What Muesli Processes Locally',
        body: [
          'Muesli stores application data locally on your Mac or iPhone unless you explicitly enable an optional connected service. The default speech-to-text path does not send recordings to Muesli servers.',
        ],
        bullets: [
          'Voice recordings captured for dictation, voice notes, and meetings',
          'Transcripts, dictation history, meeting records, notes, and personal dictionary entries',
          'Configuration and preferences stored in local application storage',
          'Downloaded speech models cached on your device',
          'OAuth tokens and connected-service credentials stored in Apple Keychain where applicable',
        ],
      },
      {
        title: 'Voice Recordings and Transcripts',
        body: [
          'Recordings and transcripts stay in Muesli’s local application storage by default. On iPhone, you can choose whether original voice-note audio is retained. Meeting recordings and transcripts remain local unless you deliberately export, share, sync eligible text through iCloud, or request a summary from a connected provider.',
        ],
      },
      {
        title: 'Local Model Downloads',
        body: [
          'Muesli downloads speech model assets from their distribution hosts when you select a model. The provider can receive ordinary network information associated with that download, such as an IP address. Once prepared, the model runs locally for core transcription. Models can be removed from the app to reclaim storage.',
        ],
      },
      {
        title: 'Muesli Keyboard and Full Access',
        body: [
          'The iOS keyboard extension does not record audio. It creates a dictation request and opens the Muesli app, where microphone access, recording, and local transcription are handled. Full Access lets the extension exchange that request, status, and finished text with the containing app through a shared App Group. Muesli does not use Full Access to collect everything you type.',
        ],
      },
      {
        title: 'Shared App Group Storage',
        body: [
          'The Muesli iPhone app and Muesli keyboard use an Apple App Group container for the minimum data needed to coordinate a dictation handoff, including request state and the completed result. This storage is accessible to the Muesli app and its keyboard extension, not to unrelated apps.',
        ],
      },
      {
        title: 'Camera Access and Setup QR Codes',
        body: [
          'On iPhone, camera access is optional and used only to scan a setup QR code shown by Muesli on your Mac. The QR code starts setup; eligible text sync then uses your private iCloud account. Muesli does not use the camera to record meetings.',
        ],
      },
      {
        title: 'Optional iCloud and CloudKit Sync',
        body: [
          'If you enable private iCloud sync, Muesli can sync voice-note text, meeting transcripts, notes, and summaries through the iCloud account signed in on your Apple devices. Voice recordings and downloaded speech models are not synced. Apple processes the synced data under its own terms and privacy policy.',
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
        title: 'Device Permissions',
        body: [
          'Muesli requests platform permissions only for product features you use.',
        ],
        bullets: [
          'Microphone for Mac dictation, iPhone voice notes, and meeting audio',
          'Screen Recording or Screen & System Audio Recording for Mac system audio capture during meetings',
          'Accessibility and Input Monitoring for Mac paste and global hotkey behavior',
          'Calendar for optional upcoming-meeting features on Mac',
          'Camera on iPhone for optional Mac setup QR scanning',
        ],
      },
      {
        title: 'Privacy-Preserving Aggregate Telemetry',
        body: [
          'Muesli uses TelemetryDeck to understand broad feature usage, device compatibility, failures, and app health. Events can include app version, iOS version, device family or model, feature state, and sanitized error categories. Analytics do not include audio, transcripts, meeting notes, dictionary content, calendar content, screen content, or other personal text.',
        ],
      },
      {
        title: 'Data Retention and Deletion',
        body: [
          'Local content remains on your device until you delete it, remove the app and its data, or use a platform storage control. Connected providers and Apple may retain data according to their own policies. Deleting local content does not automatically delete a copy you previously exported, shared, synced, or sent to a summary provider.',
        ],
      },
      {
        title: 'Tracking and Advertising',
        body: [
          'Muesli does not sell personal information and does not use recordings or transcript content for advertising. Muesli does not use cross-app tracking for targeted advertising.',
        ],
      },
      {
        title: 'Security',
        body: [
          'Muesli reduces exposure by keeping core transcription and local content on the device by default and by storing credentials in Apple Keychain where applicable. No software or storage system can guarantee absolute security. Keep your devices, Apple account, provider accounts, and backups protected.',
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
          'For privacy questions, email pranav@muesli.works.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    updated: 'July 14, 2026',
    intro: 'These terms cover Muesli for macOS and iOS, the Muesli keyboard, muesli.works, downloads, local model assets, and optional connected services.',
    sections: [
      {
        title: 'Acceptance of Terms',
        body: [
          'By downloading, installing, or using Muesli, you agree to these terms. If you do not agree, do not use the application.',
        ],
      },
      {
        title: 'Muesli for macOS and iOS',
        body: [
          'Muesli provides local-first dictation, voice notes, meeting transcription, and meeting notes on supported Apple devices. Platform features differ: the Mac app can capture computer audio, while the iPhone app records from its microphone and can coordinate dictation with the Muesli keyboard.',
        ],
      },
      {
        title: 'Eligibility',
        body: [
          'You must be legally able to accept these terms. If you use Muesli for an organization, you represent that you have authority to do so and that your use follows the organization’s rules.',
        ],
      },
      {
        title: 'License and Open-Source Components',
        body: [
          'Muesli is distributed under the MIT License. The source code is available on GitHub. Your rights to use, copy, modify, merge, publish, distribute, sublicense, or sell copies of the software are governed by that license.',
        ],
      },
      {
        title: 'User Content and Ownership',
        body: [
          'You retain ownership of recordings, transcripts, notes, dictionary entries, and other content you create with Muesli. You grant only the permissions needed for features you deliberately use, such as processing eligible text through iCloud or sending transcript text to a summary provider.',
        ],
      },
      {
        title: 'User Responsibilities',
        body: [
          'You are responsible for how you use Muesli and for the content you record, transcribe, summarize, export, or share.',
        ],
        bullets: [
          'Comply with laws that apply to recording conversations, meetings, calls, system audio, and other people’s speech in your jurisdiction.',
          'Obtain any consent required before recording or transcribing another person.',
          'Review generated transcripts and summaries before relying on them as records.',
          'Secure your device and the local data stored by Muesli.',
        ],
      },
      {
        title: 'Recording Consent and Local Laws',
        body: [
          'You are responsible for obtaining any consent required before recording or transcribing another person. Recording and wiretap laws vary by jurisdiction and context. Muesli does not determine whether a particular recording is lawful for you.',
        ],
      },
      {
        title: 'On-Device Models and Downloaded Assets',
        body: [
          'Speech models and related assets can be large, may come from third-party repositories, and may have their own license terms. Model availability, accuracy, storage size, hardware compatibility, and performance can change. You are responsible for the network and device storage used to download them.',
        ],
      },
      {
        title: 'iCloud and Apple Services',
        body: [
          'Optional iCloud sync, App Groups, Keychain, App Store distribution, and other Apple services are governed by Apple’s terms and availability. Muesli cannot guarantee that Apple services will be uninterrupted or that every platform feature will remain available on every operating-system version.',
        ],
      },
      {
        title: 'Purchases and Future Paid Features',
        body: [
          'Muesli does not promise a particular future pricing model. If a paid feature, purchase, or subscription is offered, its price and additional terms will be shown before you buy it through the applicable purchase flow.',
        ],
      },
      {
        title: 'Acceptable Use',
        body: [
          'Do not use Muesli to violate law, infringe rights, bypass consent requirements, distribute malware, interfere with the service, or access another person’s device, account, recordings, or content without authorization.',
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
        title: 'Availability, Updates, and Compatibility',
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
        title: 'Governing Law',
        body: [
          'These terms are governed by applicable law without regard to conflict-of-law principles. Mandatory consumer protections and rights that apply where you live are not excluded by these terms.',
        ],
      },
      {
        title: 'Contact',
        body: [
          'For questions about these terms, email pranav@muesli.works.',
        ],
      },
    ],
  },
};

export const prerenderRoutes = ['/', '/ios', '/help/ios', '/privacy', '/terms', '/blog', '/on-device-dictation', '/mac-dictation-app', '/best-dictation-apps-mac', '/best-offline-dictation-apps-mac', '/offline-dictation-mac', '/apple-neural-engine-speech-to-text-mac', '/local-speech-to-text-glossary', '/asr-architectures', '/nvidia-parakeet-speech-to-text', '/whisper-speech-to-text', '/medical-dictation-mac', '/local-meeting-transcription-mac', '/bot-free-meeting-notes', '/apple-dictation-alternative', '/granola-alternative', '/granola-vs-muesli', '/superwhisper-alternative', '/wispr-flow-alternative', '/otter-ai-alternative', '/fireflies-ai-alternative', '/meeting-notes', '/local-first-ai', '/help', '/changelog'];

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

  if (path === '/ios' || path === '/help/ios') {
    return {
      '@type': 'SoftwareApplication',
      '@id': `${siteData.siteUrl}/ios#software`,
      name: siteData.iosProduct.name,
      applicationCategory: siteData.iosProduct.applicationCategory,
      operatingSystem: siteData.iosProduct.operatingSystem,
      softwareRequirements: siteData.iosProduct.operatingSystem,
      url: siteData.iosUrl,
      codeRepository: siteData.iosRepositoryUrl,
      image: siteData.logoUrl,
      description: routeMeta['/ios'].description,
      featureList: siteData.iosProduct.keyFacts,
      publisher: { '@id': `${siteData.siteUrl}/#organization` },
    };
  }

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
        <img className="capture-icon" src={iconUrl} alt="Muesli local speech-to-text app icon" />
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

function YouTubeLogo(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path d="M23.5 6.2a3.03 3.03 0 0 0-2.13-2.14C19.5 3.56 12 3.56 12 3.56s-7.5 0-9.37.5A3.03 3.03 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.03 3.03 0 0 0 2.13 2.14c1.87.5 9.37.5 9.37.5s7.5 0 9.37-.5a3.03 3.03 0 0 0 2.13-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
    </svg>
  );
}

const footerDirectoryColumns = [
  {
    title: 'Product',
    links: [
      ['Muesli for iPhone', '/ios'],
      ['On-device dictation', '/on-device-dictation'],
      ['Meeting notes', '/meeting-notes'],
      ['Local-first AI', '/local-first-ai'],
      ['Download', '/download/'],
    ],
  },
  {
    title: 'Guides',
    links: [
      ['Best dictation apps for Mac', '/best-dictation-apps-mac'],
      ['Best offline dictation apps', '/best-offline-dictation-apps-mac'],
      ['Mac dictation app', '/mac-dictation-app'],
      ['Offline dictation for Mac', '/offline-dictation-mac'],
      ['Apple Neural Engine speech-to-text', '/apple-neural-engine-speech-to-text-mac'],
      ['Local speech-to-text glossary', '/local-speech-to-text-glossary'],
      ['ASR architectures', '/asr-architectures'],
      ['NVIDIA Parakeet STT', '/nvidia-parakeet-speech-to-text'],
      ['Whisper speech-to-text', '/whisper-speech-to-text'],
      ['Medical dictation for Mac', '/medical-dictation-mac'],
      ['Local meeting transcription', '/local-meeting-transcription-mac'],
      ['Bot-free meeting notes', '/bot-free-meeting-notes'],
    ],
  },
  {
    title: 'Compare',
    links: [
      ['Apple Dictation alternative', '/apple-dictation-alternative'],
      ['Granola alternative', '/granola-alternative'],
      ['Granola vs Muesli', '/granola-vs-muesli'],
      ['Superwhisper alternative', '/superwhisper-alternative'],
      ['Wispr Flow alternative', '/wispr-flow-alternative'],
      ['Otter.ai alternative', '/otter-ai-alternative'],
      ['Fireflies.ai alternative', '/fireflies-ai-alternative'],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['Help', '/help'],
      ['iPhone help', '/help/ios'],
      ['Changelog', '/changelog'],
      ['Blog', '/blog'],
      ['GitHub', 'https://github.com/Muesli-HQ/muesli'],
      ['llms.txt', '/llms.txt'],
      ['facts.json', '/facts.json'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['X', 'https://x.com/fastspeech2text'],
      ['LinkedIn', 'https://www.linkedin.com/company/mueslios/'],
      ['YouTube', 'https://www.youtube.com/@MuesliHQ'],
      ['Privacy', '/privacy'],
      ['Terms', '/terms'],
    ],
  },
];

function SiteFooterDirectory({ compact = false } = {}) {
  return (
    <nav className={`site-footer-directory${compact ? ' site-footer-directory-compact' : ''}`} aria-label="Site footer">
      {footerDirectoryColumns.map((column) => (
        <div className="site-footer-column" key={column.title}>
          <h3>{column.title}</h3>
          {column.links.length > 0 && (
            <ul>
              {column.links.map(([label, href]) => {
                const external = href.startsWith('http');

                return (
                  <li key={href}>
                    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
          {column.planned && (
            <ul className="site-footer-planned" aria-label="Planned comparison pages">
              {column.planned.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
          )}
          {column.note && <p>{column.note}</p>}
        </div>
      ))}
    </nav>
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
          <img src={iconUrl} alt="Muesli local speech-to-text app icon" />
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
        <a href="https://github.com/Muesli-HQ/muesli" target="_blank" rel="noreferrer">GitHub</a>
      </footer>
      <SiteFooterDirectory compact />
    </main>
  );
}

function IosNav({ active = 'ios' } = {}) {
  return (
    <nav className="ios-nav">
      <a className="brand" href="/" aria-label="Muesli home">
        <img src={iconUrl} alt="Muesli app icon" />
        <span>muesli</span>
      </a>
      <div className="ios-nav-links">
        <a href="/">Mac</a>
        <a href="/ios" aria-current={active === 'ios' ? 'page' : undefined}>iPhone</a>
        <a href="/help/ios" aria-current={active === 'help' ? 'page' : undefined}>iOS help</a>
        <a className="ios-nav-cta" href="mailto:pranav@muesli.works?subject=Muesli%20for%20iPhone%20availability">
          Coming soon
        </a>
      </div>
    </nav>
  );
}

function IosPage() {
  useEffect(() => {
    document.title = routeMeta['/ios'].title;
    setCanonicalUrl('/ios');
  }, []);

  const structuredData = baseStructuredData('/ios', [
    pageBreadcrumb('/ios', 'Muesli for iPhone'),
    faqSchema('/ios', iosProductFaqItems),
  ]);

  return (
    <main className="ios-page">
      <JsonLd data={structuredData} />
      <IosNav />

      <section className="ios-hero">
        <div className="ios-hero-copy">
          <div className="ios-kicker"><Smartphone size={17} /> Muesli for iPhone</div>
          <h1>Private speech-to-text that stays close to your iPhone.</h1>
          <p>
            Record voice notes, capture in-person meetings, and dictate into other apps. Core transcription runs on
            your device after the local model is installed.
          </p>
          <div className="ios-hero-actions">
            <a className="ios-primary-cta" href="mailto:pranav@muesli.works?subject=Muesli%20for%20iPhone%20availability">
              Notify me when available <ArrowRight size={18} />
            </a>
            <a className="ios-text-link" href="/help/ios">Read iPhone setup help</a>
          </div>
          <div className="ios-proof-row" aria-label="Muesli for iPhone product facts">
            <span><Cpu size={16} /> Local models</span>
            <span><CloudOff size={16} /> Offline after setup</span>
            <span><LockKeyhole size={16} /> No account required</span>
          </div>
        </div>

        <div className="ios-hero-device-stack" aria-label="Muesli for iPhone voice note, meeting, and keyboard screens">
          <figure className="ios-device ios-device-back ios-device-left">
            <img src={iosLiveMeetingUrl} alt="Muesli recording an in-person meeting on iPhone" />
          </figure>
          <figure className="ios-device ios-device-main">
            <img src={iosLiveVoiceNoteUrl} alt="Muesli recording a private voice note on iPhone" />
          </figure>
          <figure className="ios-device ios-device-back ios-device-right">
            <img src={iosKeyboardUrl} alt="Muesli keyboard ready to dictate into another iPhone app" />
          </figure>
          <div className="ios-local-badge"><span /> transcription happens here</div>
        </div>
      </section>

      <section className="ios-statement">
        <p>Voice is not raw material for another cloud account.</p>
        <h2>Your phone already has the microphone and the compute. Muesli keeps the first transcript there.</h2>
      </section>

      <section className="ios-screenshot-section" aria-labelledby="ios-product-proof">
        <div className="ios-section-heading">
          <span>Product proof</span>
          <h2 id="ios-product-proof">Six useful surfaces. One local speech layer.</h2>
          <p>Real dark-mode screens from the iPhone app, ordered from capture to control.</p>
        </div>
        <div className="ios-screen-gallery">
          {iosScreens.map(([image, title, body], index) => (
            <figure className="ios-screen-card" key={title}>
              <div className="ios-screen-number">0{index + 1}</div>
              <img src={image} alt={`${title} in Muesli for iPhone`} loading={index > 1 ? 'lazy' : undefined} />
              <figcaption>
                <h3>{title}</h3>
                <p>{body}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="ios-feature-section">
        <div className="ios-section-heading ios-section-heading-light">
          <span>What it does</span>
          <h2>A pocket-sized speech workspace, not a thin recorder.</h2>
        </div>
        <div className="ios-feature-grid">
          {iosFeaturePillars.map(([Icon, title, body]) => (
            <article key={title}>
              <Icon size={22} />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ios-local-section">
        <div className="ios-local-copy">
          <span>Local versus connected</span>
          <h2>Privacy is a map, not a slogan.</h2>
          <p>
            Recording and core transcription stay on the device. iCloud text sync and AI summaries are separate,
            visible choices. Analytics describe interactions and app health without carrying your words.
          </p>
        </div>
        <div className="ios-processing-table" role="table" aria-label="Where Muesli for iPhone features are processed">
          <div className="ios-processing-row ios-processing-head" role="row">
            <strong>Feature</strong><strong>Default processing</strong>
          </div>
          {iosProcessingRows.map(([feature, processing]) => (
            <div className="ios-processing-row" role="row" key={feature}>
              <span>{feature}</span><strong>{processing}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="ios-keyboard-section">
        <div className="ios-keyboard-image">
          <img src={iosKeyboardUrl} alt="Muesli keyboard dictation handoff inside an iPhone app" loading="lazy" />
        </div>
        <div className="ios-keyboard-copy">
          <span>Keyboard handoff</span>
          <h2>The keyboard asks. The app listens.</h2>
          <p>
            The keyboard extension never records audio. It opens Muesli with a request; the main app handles microphone
            access and local transcription, then the shared App Group carries the result back for insertion.
          </p>
          <ol>
            <li><b>01</b><span>Tap the Muesli microphone in any text field.</span></li>
            <li><b>02</b><span>Record and transcribe locally in the Muesli app.</span></li>
            <li><b>03</b><span>Return to the field and insert the finished text.</span></li>
          </ol>
        </div>
      </section>

      <section className="ios-requirements-section">
        <div>
          <span>Device requirements</span>
          <h2>Prepare once. Transcribe wherever the day goes.</h2>
        </div>
        <div className="ios-requirement-grid">
          <article><Smartphone size={21} /><h3>iOS 17 or later</h3><p>The current build supports iPhone on iOS 17 and newer.</p></article>
          <article><Database size={21} /><h3>Local storage</h3><p>Model choices range from about 153 MB to 1.5 GB, plus space for recordings you keep.</p></article>
          <article><Cloud size={21} /><h3>Internet for setup</h3><p>Download a model first. Core recording and transcription can work offline afterward.</p></article>
        </div>
      </section>

      <section className="ios-faq-section">
        <div className="ios-section-heading">
          <span>Questions, answered plainly</span>
          <h2>What should you know before trusting Muesli with a microphone?</h2>
        </div>
        <div className="faq-list ios-faq-list">
          {iosProductFaqItems.map((item, index) => (
            <details className="faq-item" open={index === 0} key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="ios-final-cta">
        <img src={iconUrl} alt="Muesli app icon" />
        <span>Coming soon</span>
        <h2>Muesli for iPhone is coming soon.</h2>
        <p>The app is currently under App Store review. There is no public App Store listing yet.</p>
        <a className="ios-primary-cta" href="mailto:pranav@muesli.works?subject=Muesli%20for%20iPhone%20availability">
          Notify me when available <ArrowRight size={18} />
        </a>
      </section>
      <SiteFooterDirectory compact />
    </main>
  );
}

function IosHelpPage() {
  useEffect(() => {
    document.title = routeMeta['/help/ios'].title;
    setCanonicalUrl('/help/ios');
  }, []);

  const helpFaq = iosHelpSections.map(([question, answer]) => ({ question, answer }));
  const structuredData = baseStructuredData('/help/ios', [
    pageBreadcrumb('/help/ios', 'Muesli for iPhone help'),
    faqSchema('/help/ios', helpFaq),
  ]);

  return (
    <main className="legal-page utility-page ios-help-page">
      <JsonLd data={structuredData} />
      <IosNav active="help" />
      <article className="legal-document">
        <div className="ios-help-kicker"><Smartphone size={17} /> iPhone support</div>
        <h1>Muesli for iPhone help</h1>
        <p className="legal-intro">
          Set up local transcription, record voice notes and in-person meetings, install the keyboard, understand Full
          Access, and fix the handoff when text does not come back where you expect it.
        </p>
        <nav className="ios-help-index" aria-label="iPhone help topics">
          {iosHelpSections.map(([title], index) => (
            <a href={`#ios-help-${index + 1}`} key={title}>{title}</a>
          ))}
        </nav>
        {iosHelpSections.map(([title, body], index) => (
          <section className="legal-section" id={`ios-help-${index + 1}`} key={title}>
            <h2>{title}</h2>
            <p>{body}</p>
          </section>
        ))}
      </article>
      <footer className="legal-footer">
        <span>Still stuck? Include your iOS version and iPhone model.</span>
        <a href="mailto:pranav@muesli.works">pranav@muesli.works</a>
      </footer>
      <SiteFooterDirectory compact />
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
          <img src={iconUrl} alt="Muesli local speech-to-text app icon" />
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
      <SiteFooterDirectory compact />
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
          <img src={iconUrl} alt="Muesli local speech-to-text app icon" />
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
      <SiteFooterDirectory compact />
    </main>
  );
}

function ProductPageNav() {
  return (
    <nav className="product-nav">
      <a className="brand" href="/" aria-label="Muesli home">
        <img src={iconUrl} alt="Muesli local speech-to-text app icon" />
        <span>muesli</span>
      </a>
      <div className="product-nav-links">
        <a href="/#notes">Product</a>
        <a href="/ios">iPhone</a>
        <a href="/#privacy">Privacy</a>
        <a href="/blog/">Blog</a>
        <a href="/changelog">Releases</a>
        <a className="product-nav-cta" href={downloadUrl}>
          <Download size={17} />
          Download
        </a>
      </div>
    </nav>
  );
}

function ArticleShareBar({ route, title }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${siteData.siteUrl}${route}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="article-share-bar" aria-label="Share this article">
      <span><Share2 size={15} /> Share this field note</span>
      <div className="article-share-actions">
        <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noreferrer" aria-label="Share this article on X">
          <XLogo />
          <b>X</b>
        </a>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noreferrer" aria-label="Share this article on LinkedIn">
          <LinkedInLogo />
          <b>LinkedIn</b>
        </a>
        <button
          type="button"
          className={copied ? 'is-copied' : undefined}
          onClick={copyLink}
          aria-label={copied ? 'Article link copied' : 'Copy article link'}
          title={copied ? 'Article link copied' : 'Copy article link'}
        >
          {copied ? <Check size={15} /> : <Link2 size={15} />}
          <b>{copied ? 'Copied' : 'Copy link'}</b>
        </button>
      </div>
    </div>
  );
}

function BlogPage() {
  const [activeTag, setActiveTag] = useState('All');
  const tags = ['All', 'Healthcare', 'Privacy', 'Local AI', 'Dictation', 'Meeting Notes', 'Model Guides', 'Comparisons'];
  const visiblePosts = activeTag === 'All'
    ? blogPostEntries
    : blogPostEntries.filter((post) => post.tags.includes(activeTag));
  const featuredPost = visiblePosts[0];
  const archivePosts = visiblePosts.slice(1);

  useEffect(() => {
    const meta = routeMeta['/blog'];
    document.title = meta.title;
    setCanonicalUrl('/blog');
  }, []);

  const structuredData = baseStructuredData('/blog', [
    pageBreadcrumb('/blog', 'Blog'),
    {
      '@type': 'CollectionPage',
      '@id': `${routeMeta['/blog'].canonical}#collection`,
      url: routeMeta['/blog'].canonical,
      name: routeMeta['/blog'].title,
      description: routeMeta['/blog'].description,
      hasPart: blogPostEntries.map((post) => ({
        '@type': 'Article',
        headline: post.title,
        url: `${siteData.siteUrl}${post.path}`,
        image: `${siteData.siteUrl}${post.image}`,
        datePublished: post.date,
        articleSection: post.category,
      })),
    },
  ]);

  return (
    <main className="product-page article-page blog-page">
      <JsonLd data={structuredData} />
      <ProductPageNav />

      <section className="blog-hero">
        <div className="blog-hero-copy">
          <p className="seo-article-kicker"><Sparkles size={15} /> Muesli field notes</p>
          <h1>Speech-to-text should be something you can understand, run, and own.</h1>
          <p>
            Notes on local ASR, Mac dictation, meeting capture, privacy, model architecture, and the tools
            that shape how speech becomes part of your workday.
          </p>
        </div>
        <div className="blog-hero-signal" aria-label="Muesli blog focus">
          <span>LOCAL-FIRST RESEARCH</span>
          <strong>less cloud<br />more control</strong>
          <small>Practical writing for people who want to know where their transcript went.</small>
        </div>
      </section>

      <section className="blog-taxonomy" aria-label="Filter articles by topic">
          <span className="blog-taxonomy-label"><Tag /> Browse by topic</span>
        <div className="blog-tag-list">
          {tags.map((tag) => (
            <button
              type="button"
              className={`blog-tag${activeTag === tag ? ' is-active' : ''}`}
              aria-pressed={activeTag === tag}
              onClick={() => setActiveTag(tag)}
              key={tag}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {featuredPost ? (
        <section className="blog-featured" aria-label="Featured article">
          <a className="blog-featured-image" href={`${featuredPost.path}/`}>
            <img src={featuredPost.image} alt={featuredPost.imageAlt} />
          </a>
          <div className="blog-featured-copy">
            <div className="blog-post-meta">
              <span className="blog-post-category">{featuredPost.category}</span>
              <span><time dateTime={featuredPost.date}>{formatBlogDate(featuredPost.date)}</time> <i>•</i> {featuredPost.readTime}</span>
            </div>
            <h2><a href={`${featuredPost.path}/`}>{featuredPost.title}</a></h2>
            <p>{featuredPost.excerpt}</p>
            <a className="blog-read-link" href={`${featuredPost.path}/`}>Read the field note <ArrowRight size={16} /></a>
          </div>
        </section>
      ) : (
        <p className="blog-empty">No field notes have this tag yet.</p>
      )}

      {archivePosts.length > 0 ? (
        <section className="blog-archive" aria-label="All articles">
          <div className="blog-section-heading">
            <div>
              <span>THE ARCHIVE</span>
              <h2>Useful things to know before you rent out your voice.</h2>
            </div>
            <p>{visiblePosts.length} field notes</p>
          </div>
          <div className="blog-card-grid">
            {archivePosts.map((post) => (
              <article className="blog-card" key={post.path}>
                <a className="blog-card-image" href={`${post.path}/`}>
                  <img src={post.image} alt={post.imageAlt} loading="lazy" />
                </a>
                <div className="blog-card-body">
                  <div className="blog-post-meta">
                    <span className="blog-post-category">{post.category}</span>
                    <span><time dateTime={post.date}>{formatBlogDate(post.date)}</time> <i>•</i> {post.readTime}</span>
                  </div>
                  <h3><a href={`${post.path}/`}>{post.title}</a></h3>
                  <p>{post.excerpt}</p>
                  <div className="blog-card-footer">
                    <div className="blog-card-tags">
                      {post.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <a className="blog-card-arrow" href={`${post.path}/`} aria-label={`Read ${post.title}`}><ArrowRight size={17} /></a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="blog-cta">
        <div>
          <span className="blog-cta-kicker">TAKE THE SPEECH LAYER HOME</span>
          <h2>Read the source. Run the app. Keep the transcript close.</h2>
          <p>Muesli is open-source Mac dictation and meeting transcription built for local ASR on Apple Silicon.</p>
        </div>
        <div className="blog-cta-actions">
          <a className="primary-cta" href={downloadUrl}><Download size={18} /> Download for macOS</a>
          <a className="secondary-cta" href="https://github.com/Muesli-HQ/muesli" target="_blank" rel="noreferrer"><Github size={18} /> <Star size={15} /> Star Muesli on GitHub</a>
        </div>
      </section>

      <SiteFooterDirectory compact />
    </main>
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
          <ArticleShareBar route="/mac-dictation-app" title="A Mac dictation app that keeps your speech on your Mac" />
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
          <img src={iconUrl} alt="Muesli local speech-to-text app icon" />
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
      <SiteFooterDirectory compact />
    </main>
  );
}

function BestDictationAppsMacPage() {
  useEffect(() => {
    const meta = routeMeta['/best-dictation-apps-mac'];
    document.title = meta.title;
    setCanonicalUrl('/best-dictation-apps-mac');
  }, []);

  const structuredData = baseStructuredData('/best-dictation-apps-mac', [
    pageBreadcrumb('/best-dictation-apps-mac', 'Best Dictation Apps for Mac'),
    faqSchema('/best-dictation-apps-mac', bestDictationAppsMacFaqItems),
    {
      '@type': 'Article',
      '@id': `${routeMeta['/best-dictation-apps-mac'].canonical}#article`,
      headline: 'Best dictation apps for Mac in 2026',
      description: routeMeta['/best-dictation-apps-mac'].description,
      image: siteData.ogImageUrl,
      author: {
        '@type': 'Organization',
        name: siteData.name,
      },
      publisher: { '@id': `${siteData.siteUrl}/#organization` },
      mainEntityOfPage: { '@id': `${routeMeta['/best-dictation-apps-mac'].canonical}#webpage` },
    },
  ]);

  return (
    <main className="product-page article-page best-dictation-apps-page">
      <JsonLd data={structuredData} />
      <ProductPageNav />

      <article className="seo-article">
        <figure className="seo-article-image">
          <img src={solarpunkBestDictationAppsMacUrl} alt="A solarpunk Mac writing workspace for comparing dictation apps with no visible human faces" />
        </figure>

        <header className="seo-article-hero">
          <div className="seo-article-kicker">Mac dictation comparison</div>
          <h1>Best dictation apps for Mac in 2026.</h1>
          <p>
            The right Mac dictation app depends on what you are protecting: speed, privacy, polish, meeting memory, or
            ownership of the speech-to-text workflow.
          </p>
          <div className="seo-article-actions">
            <a className="primary-cta" href={downloadUrl}>
              <Download size={19} />
              Download Muesli
            </a>
            <a className="secondary-cta" href="/mac-dictation-app/">
              Read the Mac dictation guide
              <ArrowRight size={18} />
            </a>
          </div>
          <ArticleShareBar route="/best-dictation-apps-mac" title="Best dictation apps for Mac in 2026" />
        </header>

        <section className="seo-article-section seo-article-lede">
          <p>
            A useful dictation app for Mac should make speech feel like part of the place where you already write. That
            means Gmail, Slack, Notion, Google Docs, ChatGPT, Cursor, Linear, email, browser fields, and the half-written
            note that is waiting for a first draft.
          </p>
          <p>
            This guide is not a fake leaderboard. Apple Dictation, Muesli, Superwhisper, Wispr Flow, VoiceInk, and
            Otter.ai solve different problems. The real question is whether you want a built-in default, a polished
            cloud-connected writing assistant, a local-first Mac tool, or a meeting transcription system. For the
            narrower search, read our guide to the{' '}
            <a href="/wispr-flow-alternative/">best Wispr Flow alternatives for Mac</a>.
          </p>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Short answer</span>
            <h2>Which Mac dictation app should you try first?</h2>
          </div>
          <p>
            If you want the lowest-friction default, try Apple Dictation first because it is already built into macOS.
            If you want an open-source Mac app where everyday speech-to-text starts locally, try Muesli. If you want a
            broad commercial voice-to-text product with offline and cloud modes, compare Superwhisper. If you want
            polished conversational writing across many platforms, compare Wispr Flow.
          </p>
          <p>
            Muesli is the opinionated choice for people who care about local ownership: offline models such as Parakeet
            and Whisper, Apple Silicon, inspectable code, no cloud speech-to-text by default, and a workflow that pastes
            text back into the app where the thought started.
          </p>
        </section>

        <section className="seo-article-section seo-comparison-section">
          <div className="seo-section-heading">
            <span>Comparison</span>
            <h2>How do the best Mac dictation apps compare?</h2>
          </div>
          <div className="seo-comparison-table" role="table" aria-label="Best dictation apps for Mac comparison">
            <div className="seo-comparison-row seo-comparison-head" role="row">
              <strong>App</strong>
              <strong>Where it fits</strong>
              <strong>Best reason to choose it</strong>
            </div>
            {bestDictationAppsMacRows.map(([app, fit, reason]) => (
              <div className="seo-comparison-row" role="row" key={app}>
                <strong>{app}</strong>
                <span>{fit}</span>
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Use cases</span>
            <h2>What is the best dictation app for your Mac workflow?</h2>
          </div>
          <div className="seo-card-grid">
            {bestDictationAppsMacUseCases.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Local-first</span>
            <h2>Why does local speech-to-text matter for Mac dictation?</h2>
          </div>
          <p>
            Dictation often contains unfinished thinking: customer replies, personal notes, prompts, code comments,
            hiring feedback, support drafts, and private context that may never become polished text. A local-first
            default narrows the path from voice to written words.
          </p>
          <p>
            With Muesli, normal dictation can run on your Mac after setup. Optional cloud services still have a place,
            especially for summaries or integrations, but they should be a choice rather than the first stop for every
            sentence you speak.
          </p>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Recommendation</span>
            <h2>Who is Muesli the best dictation app for?</h2>
          </div>
          <p>
            Muesli is best for Mac users who want local-first voice-to-text, open-source software, Apple Silicon
            performance, offline models such as Parakeet and Whisper, and one app that can also handle local meeting
            transcription.
          </p>
          <p>
            It is not trying to be the loudest all-platform voice keyboard or the most generic meeting bot. It is for
            people who want to speak, keep the transcript close, and own the working memory of their day.
          </p>
        </section>

        <section className="seo-article-section seo-faq-section">
          <div className="seo-section-heading">
            <span>FAQ</span>
            <h2>What do people ask when comparing Mac dictation apps?</h2>
          </div>
          <div className="faq-list dictation-faq-list">
            {bestDictationAppsMacFaqItems.map((item, index) => (
              <details className="faq-item" open={index === 0} key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="seo-article-cta">
          <img src={iconUrl} alt="Muesli local speech-to-text app icon" />
          <div>
            <h2>Try the local-first Mac dictation app on the list.</h2>
            <p>Open-source, Apple Silicon-native, and built for speech-to-text you can keep close to your own machine.</p>
          </div>
          <a className="primary-cta" href={downloadUrl}>
            <span className="apple-mark" aria-hidden="true"></span>
            Download Muesli
          </a>
        </footer>
      </article>
      <SiteFooterDirectory compact />
    </main>
  );
}

function AppleNeuralEngineSpeechPage() {
  useEffect(() => {
    const meta = routeMeta['/apple-neural-engine-speech-to-text-mac'];
    document.title = meta.title;
    setCanonicalUrl('/apple-neural-engine-speech-to-text-mac');
  }, []);

  const structuredData = baseStructuredData('/apple-neural-engine-speech-to-text-mac', [
    pageBreadcrumb('/apple-neural-engine-speech-to-text-mac', 'Apple Neural Engine Speech-to-Text on Mac'),
    faqSchema('/apple-neural-engine-speech-to-text-mac', appleNeuralEngineFaqItems),
    {
      '@type': 'Article',
      '@id': `${routeMeta['/apple-neural-engine-speech-to-text-mac'].canonical}#article`,
      headline: 'Apple Neural Engine speech-to-text on Mac',
      description: routeMeta['/apple-neural-engine-speech-to-text-mac'].description,
      image: siteData.ogImageUrl,
      author: {
        '@type': 'Organization',
        name: siteData.name,
      },
      publisher: { '@id': `${siteData.siteUrl}/#organization` },
      mainEntityOfPage: { '@id': `${routeMeta['/apple-neural-engine-speech-to-text-mac'].canonical}#webpage` },
    },
  ]);

  return (
    <main className="product-page article-page ane-speech-page">
      <JsonLd data={structuredData} />
      <ProductPageNav />

      <article className="seo-article">
        <figure className="seo-article-image">
          <img src={solarpunkAppleNeuralEngineSpeechUrl} alt="A solarpunk Mac workspace illustrating local speech-to-text on Apple Silicon with no visible human faces" />
        </figure>

        <header className="seo-article-hero">
          <div className="seo-article-kicker">Apple Silicon speech AI</div>
          <h1>Apple Neural Engine speech-to-text on Mac.</h1>
          <p>
            Local dictation is becoming practical because modern Macs can run speech recognition close to the place
            where the work happens: on Apple Silicon, through CoreML-capable model paths, without a cloud speech API as
            the default step. For short dictation, that can be faster than cloud transcription because the text does not
            wait on upload, queueing, a remote response, and a trip back to the cursor.
          </p>
          <div className="seo-article-actions">
            <a className="primary-cta" href={downloadUrl}>
              <Download size={19} />
              Download Muesli
            </a>
            <a className="secondary-cta" href="/local-speech-to-text-glossary/">
              Read the glossary
              <ArrowRight size={18} />
            </a>
          </div>
          <ArticleShareBar route="/apple-neural-engine-speech-to-text-mac" title="Apple Neural Engine speech-to-text on Mac" />
        </header>

        <section className="seo-article-section seo-article-lede">
          <p>
            A Mac dictation app is not only a microphone button. Under the surface, it is an audio pipeline, an ASR
            model, a runtime, a permissions model, and a paste workflow. The technical difference is whether that
            pipeline starts on your own Mac or with a hosted transcription request.
          </p>
          <p>
            Muesli is built around the local-first version: capture speech, run local speech-to-text models such as
            Parakeet and Whisper on Apple Silicon, then paste the cleaned text back into the app where you were already
            writing. The advantage is not only privacy. It is also latency, cost, and power efficiency: the Apple Neural
            Engine is dedicated neural-network hardware, so supported ASR work can run locally without treating every
            spoken sentence as a cloud job.
          </p>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Architecture</span>
            <h2>How does Apple Neural Engine speech-to-text work on Mac?</h2>
          </div>
          <div className="seo-card-grid">
            {appleNeuralEngineSteps.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>CoreML</span>
            <h2>Why does CoreML matter for local speech recognition?</h2>
          </div>
          <p>
            CoreML gives native Mac apps a system framework for running machine learning models on Apple platforms.
            That matters because speech recognition is no longer just a Python script or a server request. With the
            right model path, the Mac can do the transcription work locally.
          </p>
          <p>
            The useful user-facing result is simpler than the runtime details: lower dependency on network quality, no
            per-utterance cloud speech-to-text bill, and a narrower default path for private drafts, notes, prompts,
            emails, and meeting transcripts.
          </p>
          <p>
            That matters for dictation because most utterances are short. A cloud system may have a strong model, but it
            still has to move audio across the network and move text back. A local Apple Silicon path can skip that
            round trip and use the Mac’s purpose-built neural network accelerator for efficient inference.
          </p>
        </section>

        <section className="seo-article-section seo-comparison-section">
          <div className="seo-section-heading">
            <span>Tradeoffs</span>
            <h2>Should speech-to-text run on the Neural Engine, CPU, GPU, or cloud?</h2>
          </div>
          <div className="seo-comparison-table" role="table" aria-label="Speech-to-text runtime comparison">
            <div className="seo-comparison-row seo-comparison-head" role="row">
              <strong>Runtime path</strong>
              <strong>Where it helps</strong>
              <strong>Tradeoff</strong>
            </div>
            {[
              ['CoreML / Neural Engine-capable path', 'Useful for low-latency, power-efficient Apple Silicon transcription when the model supports it.', 'Requires model conversion, validation, and runtime-specific engineering.'],
              ['CPU or generic local inference', 'Useful for portability and simple experiments.', 'Can be slower or less efficient for everyday dictation on Apple Silicon.'],
              ['Cloud speech-to-text API', 'Useful when a hosted model, account, or cross-device system is the right tradeoff.', 'Adds upload, remote inference, response latency, provider policy, and recurring cost to the speech path.'],
            ].map(([path, helps, tradeoff]) => (
              <div className="seo-comparison-row" role="row" key={path}>
                <strong>{path}</strong>
                <span>{helps}</span>
                <span>{tradeoff}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Muesli</span>
            <h2>How does Muesli use Apple Silicon for local dictation?</h2>
          </div>
          <p>
            Muesli is a native macOS app for Apple Silicon. It supports local ASR options including Parakeet, Whisper,
            Qwen3 ASR, and Nemotron Streaming, then wraps model inference in a practical workflow: hold a hotkey, speak,
            release, and paste the result into the current app.
          </p>
          <p>
            The same local-first principle also applies to meetings. Muesli can capture microphone and system audio
            from your Mac, run local transcription, use VAD and diarization to organize the transcript, and keep meeting
            memory close before optional summarization happens.
          </p>
        </section>

        <section className="seo-article-section seo-faq-section">
          <div className="seo-section-heading">
            <span>FAQ</span>
            <h2>What do people ask about Apple Neural Engine speech-to-text?</h2>
          </div>
          <div className="faq-list dictation-faq-list">
            {appleNeuralEngineFaqItems.map((item, index) => (
              <details className="faq-item" open={index === 0} key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="seo-article-cta">
          <img src={iconUrl} alt="Muesli local speech-to-text app icon" />
          <div>
            <h2>Try local speech-to-text built for Apple Silicon.</h2>
            <p>Use Muesli when you want dictation and meeting transcription to start on your Mac.</p>
          </div>
          <a className="primary-cta" href={downloadUrl}>
            <span className="apple-mark" aria-hidden="true"></span>
            Download Muesli
          </a>
        </footer>
      </article>
      <SiteFooterDirectory compact />
    </main>
  );
}

function LocalSpeechToTextGlossaryPage() {
  useEffect(() => {
    const meta = routeMeta['/local-speech-to-text-glossary'];
    document.title = meta.title;
    setCanonicalUrl('/local-speech-to-text-glossary');
  }, []);

  const structuredData = baseStructuredData('/local-speech-to-text-glossary', [
    pageBreadcrumb('/local-speech-to-text-glossary', 'Local Speech-to-Text Glossary'),
    faqSchema('/local-speech-to-text-glossary', localSpeechGlossaryFaqItems),
    {
      '@type': 'Article',
      '@id': `${routeMeta['/local-speech-to-text-glossary'].canonical}#article`,
      headline: 'Local speech-to-text glossary for Mac',
      description: routeMeta['/local-speech-to-text-glossary'].description,
      image: siteData.ogImageUrl,
      author: {
        '@type': 'Organization',
        name: siteData.name,
      },
      publisher: { '@id': `${siteData.siteUrl}/#organization` },
      mainEntityOfPage: { '@id': `${routeMeta['/local-speech-to-text-glossary'].canonical}#webpage` },
    },
  ]);

  return (
    <main className="product-page article-page speech-glossary-page">
      <JsonLd data={structuredData} />
      <ProductPageNav />

      <article className="seo-article">
        <figure className="seo-article-image">
          <img src={solarpunkLocalSpeechGlossaryUrl} alt="A solarpunk technical library workspace for local speech-to-text terms with no visible human faces" />
        </figure>

        <header className="seo-article-hero">
          <div className="seo-article-kicker">Speech-to-text glossary</div>
          <h1>Local speech-to-text glossary for Mac.</h1>
          <p>
            A plain-English reference for the terms behind local dictation and meeting transcription: ASR, CoreML,
            Apple Neural Engine, Parakeet, Whisper, Qwen3 ASR, VAD, diarization, acoustic echo cancellation, and
            local-first transcription.
          </p>
          <div className="seo-article-actions">
            <a className="primary-cta" href={downloadUrl}>
              <Download size={19} />
              Download Muesli
            </a>
            <a className="secondary-cta" href="/apple-neural-engine-speech-to-text-mac/">
              Read the ANE guide
              <ArrowRight size={18} />
            </a>
          </div>
          <ArticleShareBar route="/local-speech-to-text-glossary" title="Local speech-to-text glossary for Mac" />
        </header>

        <section className="seo-article-section seo-article-lede">
          <p>
            Search engines and AI agents are better at citing a product when the vocabulary is clear. This glossary
            explains the technical terms that show up when people compare local speech-to-text, offline dictation,
            meeting transcription, neural AEC, CoreML ASR, and cloud speech APIs on Mac.
          </p>
          <p>
            Muesli uses these building blocks in a practical way: speak into your Mac, transcribe locally where
            supported, keep the transcript close, and make cloud summarization an explicit choice rather than the first
            step.
          </p>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Definitions</span>
            <h2>What do local speech-to-text terms mean?</h2>
          </div>
          <div className="seo-card-grid seo-glossary-grid">
            {localSpeechGlossaryItems.map(([term, definition]) => (
              <article key={term}>
                <h3>{term}</h3>
                <p>{definition}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Workflow</span>
            <h2>How do these terms connect inside a Mac transcription app?</h2>
          </div>
          <p>
            ASR is the recognition model. Speech-to-text is the full product workflow around it: microphone capture,
            system audio capture, VAD, acoustic echo cancellation, model inference, transcript cleanup, storage, export,
            and paste behavior. That distinction matters because a good model alone does not make a good dictation app.
          </p>
          <p>
            CoreML provides a native Apple runtime for supported models. The Apple Neural Engine can accelerate
            compatible model operations. VAD decides where speech starts and stops. Neural AEC removes far-end meeting
            audio from the microphone channel. Diarization helps organize long conversations by speaker after
            transcription.
          </p>
          <p>
            Muesli combines those ideas into product workflows: hotkey dictation for everyday writing, local meeting
            transcription for calls, locally running acoustic echo cancellation through bundled LocalVQE, and optional
            AI summaries only when the user chooses a connected provider.
          </p>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Model provenance</span>
            <h2>Who makes Parakeet, Whisper, Qwen3 ASR, and the AEC models?</h2>
          </div>
          <p>
            Local speech stacks are not one model. Parakeet and Nemotron come from NVIDIA. Whisper comes from OpenAI.
            Qwen3 ASR comes from Alibaba’s Qwen model family. Cohere Transcribe comes from Cohere. Muesli integrates
            model paths through Apple Silicon-oriented runtimes including FluidAudio, WhisperKit, and CoreML.
          </p>
          <p>
            Echo cancellation has its own model path. Muesli uses local neural AEC for meetings, with bundled
            localai-org LocalVQE as the default acoustic echo cancellation model and DTLN available as a fallback. That
            makes “local meeting transcription” more than ASR: it includes cleaning the microphone stream before the
            transcript is produced.
          </p>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Local-first</span>
            <h2>What does local-first transcription mean in practice?</h2>
          </div>
          <p>
            Local-first transcription means the normal speech-to-text path begins on the device. It does not mean a Mac
            app never uses the network. Downloads, updates, calendar integrations, and optional summarization providers
            can still be networked features.
          </p>
          <p>
            The important distinction is the default path for spoken words. If every draft, prompt, note, and meeting
            segment must first become a cloud request, you are renting the transcription layer. If speech can become
            text on your Mac, you keep more ownership of the workflow.
          </p>
        </section>

        <section className="seo-article-section seo-faq-section">
          <div className="seo-section-heading">
            <span>FAQ</span>
            <h2>What do people ask about local speech-to-text terminology?</h2>
          </div>
          <div className="faq-list dictation-faq-list">
            {localSpeechGlossaryFaqItems.map((item, index) => (
              <details className="faq-item" open={index === 0} key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="seo-article-cta">
          <img src={iconUrl} alt="Muesli local speech-to-text app icon" />
          <div>
            <h2>Use the Mac app behind the glossary.</h2>
            <p>Muesli turns local speech-to-text terms into a working dictation and meeting notes workflow.</p>
          </div>
          <a className="primary-cta" href={downloadUrl}>
            <span className="apple-mark" aria-hidden="true"></span>
            Download Muesli
          </a>
        </footer>
      </article>
      <SiteFooterDirectory compact />
    </main>
  );
}

function OfflineDictationMacPage() {
  useEffect(() => {
    const meta = routeMeta['/offline-dictation-mac'];
    document.title = meta.title;
    setCanonicalUrl('/offline-dictation-mac');
  }, []);

  const offlineStructuredData = baseStructuredData('/offline-dictation-mac', [
    pageBreadcrumb('/offline-dictation-mac', 'Offline Dictation for Mac'),
    faqSchema('/offline-dictation-mac', offlineDictationFaqItems),
    {
      '@type': 'Article',
      '@id': `${routeMeta['/offline-dictation-mac'].canonical}#article`,
      headline: 'Offline dictation for Mac without a cloud speech pipeline',
      description: routeMeta['/offline-dictation-mac'].description,
      image: siteData.ogImageUrl,
      author: {
        '@type': 'Organization',
        name: siteData.name,
      },
      publisher: { '@id': `${siteData.siteUrl}/#organization` },
      mainEntityOfPage: { '@id': `${routeMeta['/offline-dictation-mac'].canonical}#webpage` },
    },
  ]);

  return (
    <main className="product-page article-page offline-dictation-page">
      <JsonLd data={offlineStructuredData} />
      <ProductPageNav />

      <article className="seo-article">
        <figure className="seo-article-image">
          <img src={solarpunkOfflineDictationUrl} alt="A solarpunk writing studio with plants, solar structures, an unbranded laptop, and no visible human face" />
        </figure>

        <header className="seo-article-hero">
          <div className="seo-article-kicker">Offline dictation guide</div>
          <h1>Offline dictation for Mac without a cloud speech pipeline.</h1>
          <p>
            Muesli turns speech into text on Apple Silicon, so everyday dictation can keep working after the local
            model is installed.
          </p>
          <div className="seo-article-actions">
            <a className="primary-cta" href={downloadUrl}>
              <Download size={19} />
              Download for macOS
            </a>
            <a className="secondary-cta" href="/mac-dictation-app/">
              Read the Mac dictation guide
              <ArrowRight size={18} />
            </a>
          </div>
          <ArticleShareBar route="/offline-dictation-mac" title="Offline dictation for Mac without a cloud speech pipeline" />
        </header>

        <section className="seo-article-section seo-article-lede">
          <p>
            Offline dictation is not only about working without Wi-Fi. It is about removing the default cloud step
            from the shortest path between speech and text. If the model can run locally, a quick note or reply does
            not need to become an audio upload first. That is also why Muesli is the leading{' '}
            <a href="/wispr-flow-alternative/">offline Wispr Flow alternative for Mac</a>.
          </p>
          <p>
            Muesli is built around that narrower default. Hold a hotkey, speak normally, release, and the text lands
            in the current app. Local models such as Parakeet and Whisper can transcribe on the Mac instead of asking a
            hosted speech-to-text service to handle every sentence.
          </p>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Offline basics</span>
            <h2>How does offline dictation work on a Mac?</h2>
          </div>
          <p>
            Offline dictation needs three pieces to line up: microphone capture, a speech-to-text model that runs on
            the device, and a way to return the resulting text to the app where you are writing. If any one of those
            pieces depends on a server, the workflow is not really offline.
          </p>
          <p>
            Muesli keeps the normal dictation path local after setup. The app listens from the menu bar, routes audio
            through a local ASR model, cleans up the result, and pastes it back into the active Mac text field.
          </p>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Model choice</span>
            <h2>Which offline speech-to-text models work well on Apple Silicon?</h2>
          </div>
          <p>
            Parakeet is the practical default for quick dictation because it is built for low-latency speech-to-text
            on modern Apple hardware. Whisper is useful when you prefer that model family or need its particular
            accuracy and language tradeoffs.
          </p>
          <p>
            The useful question is not whether one model wins every case. It is whether the dictation app lets you run
            a local model that fits the job: fast notes, longer utterances, multilingual speech, or a workflow where
            privacy matters more than shaving off every millisecond.
          </p>
        </section>

        <section className="seo-article-section seo-comparison-section">
          <div className="seo-section-heading">
            <span>Comparison</span>
            <h2>Should I use offline dictation or cloud transcription?</h2>
          </div>
          <div className="seo-comparison-table" role="table" aria-label="Offline dictation comparison">
            <div className="seo-comparison-row seo-comparison-head" role="row">
              <strong>Option</strong>
              <strong>Where it helps</strong>
              <strong>Tradeoff</strong>
            </div>
            {offlineDictationComparisonRows.map(([option, helps, tradeoff]) => (
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
            <h2>When is offline dictation useful on Mac?</h2>
          </div>
          <div className="seo-card-grid">
            {offlineDictationUseCases.map((item) => (
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
            <h2>Is offline dictation more private than online voice typing?</h2>
          </div>
          <p>
            Offline dictation is a stronger default because the audio does not need to leave the machine before it
            becomes text. That does not mean every part of the app is magically private. It means the core
            speech-to-text step can avoid the hosted transcription surface.
          </p>
          <p>
            Muesli still uses macOS permissions for microphone access, hotkey monitoring, and paste behavior. Optional
            services such as cloud summaries or calendar integrations remain explicit choices, not requirements for
            normal dictation.
          </p>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Limits</span>
            <h2>What does offline dictation still need from the internet?</h2>
          </div>
          <p>
            The offline part begins after the local model is installed. Downloading the app, fetching models, checking
            releases, and using optional connected services still require network access. That distinction matters
            because “offline” should not be used as a vague privacy slogan.
          </p>
          <p>
            For day-to-day voice typing, the useful promise is narrower and more concrete: once the model is available
            locally, dictation should not require sending each sentence to a cloud speech-to-text API.
          </p>
        </section>

        <section className="seo-article-section seo-faq-section">
          <div className="seo-section-heading">
            <span>FAQ</span>
            <h2>What do people ask about offline dictation on Mac?</h2>
          </div>
          <div className="faq-list dictation-faq-list">
            {offlineDictationFaqItems.map((item, index) => (
              <details className="faq-item" open={index === 0} key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="seo-article-cta">
          <img src={iconUrl} alt="Muesli local speech-to-text app icon" />
          <div>
            <h2>Want offline dictation that starts on your own Mac?</h2>
            <p>Open-source, Mac-native, and built around local speech-to-text instead of a default cloud upload.</p>
          </div>
          <a className="primary-cta" href={downloadUrl}>
            <span className="apple-mark" aria-hidden="true"></span>
            Download Muesli
          </a>
        </footer>
      </article>
      <SiteFooterDirectory compact />
    </main>
  );
}

function LocalMeetingTranscriptionMacPage() {
  useEffect(() => {
    const meta = routeMeta['/local-meeting-transcription-mac'];
    document.title = meta.title;
    setCanonicalUrl('/local-meeting-transcription-mac');
  }, []);

  const localMeetingStructuredData = baseStructuredData('/local-meeting-transcription-mac', [
    pageBreadcrumb('/local-meeting-transcription-mac', 'Local Meeting Transcription for Mac'),
    faqSchema('/local-meeting-transcription-mac', localMeetingTranscriptionFaqItems),
    {
      '@type': 'Article',
      '@id': `${routeMeta['/local-meeting-transcription-mac'].canonical}#article`,
      headline: 'Local meeting transcription for Mac without a meeting bot',
      description: routeMeta['/local-meeting-transcription-mac'].description,
      image: siteData.ogImageUrl,
      author: {
        '@type': 'Organization',
        name: siteData.name,
      },
      publisher: { '@id': `${siteData.siteUrl}/#organization` },
      mainEntityOfPage: { '@id': `${routeMeta['/local-meeting-transcription-mac'].canonical}#webpage` },
    },
  ]);

  return (
    <main className="product-page article-page local-meeting-transcription-page">
      <JsonLd data={localMeetingStructuredData} />
      <ProductPageNav />

      <article className="seo-article">
        <figure className="seo-article-image">
          <img src={solarpunkLocalMeetingTranscriptionUrl} alt="A solarpunk meeting workspace with plants, an unbranded laptop, a notebook, and no visible human face" />
        </figure>

        <header className="seo-article-hero">
          <div className="seo-article-kicker">Local meeting transcription guide</div>
          <h1>Local meeting transcription for Mac without a meeting bot.</h1>
          <p>
            Muesli records meetings from your own macOS workspace, so the transcript can start on the Mac already in
            the call.
          </p>
          <div className="seo-article-actions">
            <a className="primary-cta" href={downloadUrl}>
              <Download size={19} />
              Download for macOS
            </a>
            <a className="secondary-cta" href="/meeting-notes/">
              Read the meeting notes page
              <ArrowRight size={18} />
            </a>
          </div>
          <ArticleShareBar route="/local-meeting-transcription-mac" title="Local meeting transcription for Mac without a meeting bot" />
        </header>

        <section className="seo-article-section seo-article-lede">
          <p>
            Most meeting transcription tools start by adding another participant to the call or sending the recording
            into a hosted pipeline. That can be acceptable for some teams, but it is not the only shape meeting notes
            should take on macOS.
          </p>
          <p>
            Local meeting transcription starts closer to the source. Muesli captures microphone and system audio from
            your Mac, builds a transcript you can keep, and lets optional AI notes sit on top of that record rather than
            replacing it.
          </p>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Local basics</span>
            <h2>What is local meeting transcription on Mac and macOS?</h2>
          </div>
          <p>
            Local meeting transcription means the capture begins on your own machine. Instead of inviting a bot into the
            meeting, the Mac records the audio it can hear: your microphone for your side, and system audio for the
            other side of the call.
          </p>
          <p>
            That difference matters because meeting notes are usually not just generic content. They include names,
            plans, customer details, hiring discussions, product decisions, and unfinished thoughts that should not move
            through more systems than necessary.
          </p>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Capture</span>
            <h2>How can a Mac transcribe meeting audio without a bot?</h2>
          </div>
          <p>
            A Mac can capture both sides of a meeting when the app has the right macOS permissions. Microphone access
            handles your voice. System audio capture handles the meeting audio playing through the computer.
          </p>
          <p>
            Muesli uses that local capture path so the transcript starts from the device already participating in the
            meeting. The app does not need to appear as another attendee in Zoom, Google Meet, Teams, FaceTime, or a
            browser call.
          </p>
        </section>

        <section className="seo-article-section seo-comparison-section">
          <div className="seo-section-heading">
            <span>Comparison</span>
            <h2>Should I use a meeting bot, cloud transcription, or local Mac transcription?</h2>
          </div>
          <div className="seo-comparison-table" role="table" aria-label="Local meeting transcription comparison">
            <div className="seo-comparison-row seo-comparison-head" role="row">
              <strong>Option</strong>
              <strong>Where it helps</strong>
              <strong>Tradeoff</strong>
            </div>
            {localMeetingTranscriptionComparisonRows.map(([option, helps, tradeoff]) => (
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
            <h2>When is local meeting transcription useful on macOS?</h2>
          </div>
          <div className="seo-card-grid">
            {localMeetingTranscriptionUseCases.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Notes</span>
            <h2>Can local meeting transcription become AI meeting notes?</h2>
          </div>
          <p>
            A transcript is the durable record. AI meeting notes are a layer on top. That separation is useful because a
            summary can be wrong, too compressed, or missing a decision, while the transcript remains available for
            review.
          </p>
          <p>
            Muesli can generate structured notes from the transcript using the summarization backend you choose. The
            important part is that the capture and transcript do not require a meeting bot as the starting point.
          </p>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Privacy</span>
            <h2>Is local meeting transcription more private than a meeting bot?</h2>
          </div>
          <p>
            Local transcription gives you a narrower default. The meeting record begins on the Mac in front of you
            rather than in a third-party participant or hosted recorder. That does not remove every trust decision, but
            it reduces the number of systems involved in creating the transcript.
          </p>
          <p>
            Optional cloud summarization, calendar access, and connected services are separate choices. They should be
            evaluated separately from the basic question of where the meeting audio is captured.
          </p>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Exports</span>
            <h2>Can I export meeting transcripts and notes from a Mac app?</h2>
          </div>
          <p>
            Meeting notes are more useful when they can leave the app in ordinary formats. Muesli can keep the meeting
            record locally and export notes or transcripts as Markdown or PDF when you need to share, archive, or review
            them elsewhere.
          </p>
          <p>
            That makes the app useful for people who want a private capture path but still need practical follow-up:
            action items, customer notes, research calls, team syncs, and decision logs.
          </p>
        </section>

        <section className="seo-article-section seo-faq-section">
          <div className="seo-section-heading">
            <span>FAQ</span>
            <h2>What do people ask about local meeting transcription on Mac?</h2>
          </div>
          <div className="faq-list dictation-faq-list">
            {localMeetingTranscriptionFaqItems.map((item, index) => (
              <details className="faq-item" open={index === 0} key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="seo-article-cta">
          <img src={iconUrl} alt="Muesli local speech-to-text app icon" />
          <div>
            <h2>Want meeting notes without sending a bot into the room?</h2>
            <p>Open-source, Mac-native, and built for local meeting transcription on Apple Silicon.</p>
          </div>
          <a className="primary-cta" href={downloadUrl}>
            <span className="apple-mark" aria-hidden="true"></span>
            Download Muesli
          </a>
        </footer>
      </article>
      <SiteFooterDirectory compact />
    </main>
  );
}

function GranolaAlternativePage() {
  useEffect(() => {
    const meta = routeMeta['/granola-alternative'];
    document.title = meta.title;
    setCanonicalUrl('/granola-alternative');
  }, []);

  const granolaStructuredData = baseStructuredData('/granola-alternative', [
    pageBreadcrumb('/granola-alternative', 'Granola Alternative'),
    faqSchema('/granola-alternative', granolaAlternativeFaqItems),
    {
      '@type': 'Article',
      '@id': `${routeMeta['/granola-alternative'].canonical}#article`,
      headline: 'A local Granola alternative for Mac meeting notes',
      description: routeMeta['/granola-alternative'].description,
      image: siteData.ogImageUrl,
      author: {
        '@type': 'Organization',
        name: siteData.name,
      },
      publisher: { '@id': `${siteData.siteUrl}/#organization` },
      mainEntityOfPage: { '@id': `${routeMeta['/granola-alternative'].canonical}#webpage` },
    },
  ]);

  return (
    <main className="product-page article-page granola-alternative-page">
      <JsonLd data={granolaStructuredData} />
      <ProductPageNav />

      <article className="seo-article">
        <figure className="seo-article-image">
          <img src={dutchWhisperUrl} alt="Original Dutch Golden Age-inspired painting of two people whispering beside books and a writing desk" />
        </figure>

        <header className="seo-article-hero">
          <div className="seo-article-kicker">Local Granola alternative</div>
          <h1>A local Granola alternative for the healthier version of your workday meeting notes.</h1>
          <p>
            Muesli is for Mac users who want local-first meeting transcription, open-source software, and notes they
            can own instead of renting their workday memory from the cloud.
          </p>
          <div className="seo-article-actions">
            <a className="primary-cta" href={downloadUrl}>
              <Download size={19} />
              Download for macOS
            </a>
            <a className="secondary-cta" href="/local-meeting-transcription-mac/">
              Read the local transcription guide
              <ArrowRight size={18} />
            </a>
          </div>
          <ArticleShareBar route="/granola-alternative" title="A local Granola alternative for the healthier version of your workday meeting notes" />
        </header>

        <section className="seo-article-section seo-article-lede">
          <p>
            If you are looking for a local Granola alternative, Muesli is the Mac-native path: capture meeting audio
            from your own computer, keep the transcript reviewable, and choose what to summarize or export after the
            source record exists.
          </p>
          <p>
            Granola is a polished AI notepad for back-to-back meetings. It makes sense for people who want a managed,
            hosted place for meeting notes, summaries, templates, and searchable context.
          </p>
          <p>
            Muesli is a different choice. It starts with the Mac already in the call, captures meeting audio locally,
            keeps the transcript reviewable, and treats AI notes as a layer on top rather than the only record you get
            back.
          </p>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Positioning</span>
            <h2>What is Granola good at?</h2>
          </div>
          <p>
            Granola is strongest when you want a polished meeting notepad that sits alongside your calendar and turns
            meetings into AI-written notes. It is designed around convenience, meeting memory, templates, and a smooth
            hosted product experience.
          </p>
          <p>
            Muesli makes the opposite bet. The source record should begin on the computer you control, not inside
            another cloud workspace that turns your workday memory into something you rent back later.
          </p>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Ownership</span>
            <h2>Why look for a local Granola alternative?</h2>
          </div>
          <p>
            The reason is not that every hosted meeting-notes product is bad. The reason is ownership. Meetings contain
            customer context, hiring decisions, product strategy, personal judgment, and unfinished thinking. Renting
            that memory back from the cloud is a real tradeoff.
          </p>
          <p>
            Muesli is built for people who want the stronger default: capture from the Mac, keep the transcript close,
            export ordinary files, and choose optional AI summarization deliberately instead of letting the cloud become
            the owner of the meeting record.
          </p>
        </section>

        <section className="seo-article-section seo-comparison-section">
          <div className="seo-section-heading">
            <span>Comparison</span>
            <h2>Granola vs Muesli: what changes for local meeting notes?</h2>
          </div>
          <div className="seo-comparison-table" role="table" aria-label="Granola vs Muesli comparison">
            <div className="seo-comparison-row seo-comparison-head" role="row">
              <strong>Option</strong>
              <strong>Best fit</strong>
              <strong>Tradeoff</strong>
            </div>
            {granolaAlternativeComparisonRows.map(([option, fit, tradeoff]) => (
              <div className="seo-comparison-row" role="row" key={option}>
                <strong>{option}</strong>
                <span>{fit}</span>
                <span>{tradeoff}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Fit</span>
            <h2>When is Muesli the better local Granola alternative?</h2>
          </div>
          <div className="seo-card-grid">
            {granolaAlternativeFitCards.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Botless</span>
            <h2>Can meeting notes work without adding a bot to the call?</h2>
          </div>
          <p>
            Yes. Muesli records from your Mac rather than entering the meeting as another participant. Your microphone
            captures your side of the conversation, and system audio captures what you hear from the call.
          </p>
          <p>
            This is useful when a meeting bot would change the room, raise a permission discussion, or make the meeting
            record feel like it started somewhere other than your own machine.
          </p>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Open source</span>
            <h2>Why does open-source meeting software matter?</h2>
          </div>
          <p>
            Meeting notes ask for a lot of trust. Open source does not magically solve every privacy question, but it
            changes the trust model. You can inspect the code, follow releases, and reason about the product without
            treating the app as a black box.
          </p>
          <p>
            That is the difference Muesli is trying to make: less mystery around the speech layer, more ownership of
            the transcript, and fewer assumptions hidden inside a hosted workspace.
          </p>
        </section>

        <section className="seo-article-section seo-faq-section">
          <div className="seo-section-heading">
            <span>FAQ</span>
            <h2>What do people ask before choosing a Granola alternative?</h2>
          </div>
          <div className="faq-list dictation-faq-list">
            {granolaAlternativeFaqItems.map((item, index) => (
              <details className="faq-item" open={index === 0} key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="seo-article-cta">
          <img src={iconUrl} alt="Muesli local speech-to-text app icon" />
          <div>
            <h2>Switch to the healthier version of your workday morning cereal.</h2>
            <p>Local-first meeting notes, open-source software, and a transcript you can keep.</p>
          </div>
          <a className="primary-cta" href={downloadUrl}>
            <span className="apple-mark" aria-hidden="true"></span>
            Download Muesli
          </a>
        </footer>
      </article>
      <SiteFooterDirectory compact />
    </main>
  );
}

function AlternativeComparisonPage({ route }) {
  const config = alternativePageConfigs[route];

  useEffect(() => {
    const meta = routeMeta[route];
    document.title = meta.title;
    setCanonicalUrl(route);
  }, [route]);

  const structuredData = baseStructuredData(route, [
    pageBreadcrumb(route, config.breadcrumb),
    faqSchema(route, config.faqItems),
    {
      '@type': 'Article',
      '@id': `${routeMeta[route].canonical}#article`,
      headline: config.articleHeadline,
      description: routeMeta[route].description,
      image: siteData.ogImageUrl,
      author: {
        '@type': 'Organization',
        name: siteData.name,
      },
      publisher: { '@id': `${siteData.siteUrl}/#organization` },
      mainEntityOfPage: { '@id': `${routeMeta[route].canonical}#webpage` },
    },
  ]);

  return (
    <main className="product-page article-page comparison-alternative-page">
      <JsonLd data={structuredData} />
      <ProductPageNav />

      <article className="seo-article">
        <figure className="seo-article-image">
          <img src={config.image} alt={config.imageAlt} />
        </figure>

        <header className="seo-article-hero">
          <div className="seo-article-kicker">{config.kicker}</div>
          <h1>{config.headline}</h1>
          <p>{config.subcopy}</p>
          <div className="seo-article-actions">
            <a className="primary-cta" href={downloadUrl}>
              <Download size={19} />
              Download for macOS
            </a>
            <a className="secondary-cta" href={config.secondaryHref}>
              {config.secondaryText}
              <ArrowRight size={18} />
            </a>
          </div>
          <ArticleShareBar route={route} title={config.articleHeadline} />
        </header>

        <section className="seo-article-section seo-article-lede">
          {config.lede.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        {config.sections.slice(0, 2).map((section) => (
          <section className="seo-article-section" key={section.title}>
            <div className="seo-section-heading">
              <span>{section.eyebrow}</span>
              <h2>{section.title}</h2>
            </div>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}

        <section className="seo-article-section seo-comparison-section">
          <div className="seo-section-heading">
            <span>Comparison</span>
            <h2>{config.comparison.title}</h2>
          </div>
          <div className="seo-comparison-table" role="table" aria-label={config.comparison.aria}>
            <div className="seo-comparison-row seo-comparison-head" role="row">
              <strong>Option</strong>
              <strong>Best fit</strong>
              <strong>Tradeoff</strong>
            </div>
            {config.comparison.rows.map(([option, fit, tradeoff]) => (
              <div className="seo-comparison-row" role="row" key={option}>
                <strong>{option}</strong>
                <span>{fit}</span>
                <span>{tradeoff}</span>
              </div>
            ))}
          </div>
        </section>

        {config.sections.slice(2).map((section) => (
          <section className="seo-article-section" key={section.title}>
            <div className="seo-section-heading">
              <span>{section.eyebrow}</span>
              <h2>{section.title}</h2>
            </div>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Fit</span>
            <h2>{config.fitTitle}</h2>
          </div>
          <div className="seo-card-grid">
            {config.fitCards.map(([title, body]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        {config.relatedLinks ? (
          <section className="seo-article-section">
            <div className="seo-section-heading">
              <span>Keep reading</span>
              <h2>Where should I go next if I care about local meeting transcription?</h2>
            </div>
            <div className="seo-card-grid">
              {config.relatedLinks.map(([title, href, body]) => (
                <article key={href}>
                  <h3>
                    <a href={href}>{title}</a>
                  </h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="seo-article-section seo-faq-section">
          <div className="seo-section-heading">
            <span>FAQ</span>
            <h2>{config.faqTitle}</h2>
          </div>
          <div className="faq-list dictation-faq-list">
            {config.faqItems.map((item, index) => (
              <details className="faq-item" open={index === 0} key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="seo-article-cta">
          <img src={iconUrl} alt="Muesli local speech-to-text app icon" />
          <div>
            <h2>{config.ctaTitle}</h2>
            <p>{config.ctaBody}</p>
          </div>
          <a className="primary-cta" href={downloadUrl}>
            <span className="apple-mark" aria-hidden="true"></span>
            Download Muesli
          </a>
        </footer>
      </article>
      <SiteFooterDirectory compact />
    </main>
  );
}

function SpeechToTextGuidePage({ route }) {
  const config = speechToTextGuideConfigs[route];

  useEffect(() => {
    const meta = routeMeta[route];
    document.title = meta.title;
    setCanonicalUrl(route);
  }, [route]);

  const structuredData = baseStructuredData(route, [
    pageBreadcrumb(route, config.breadcrumb),
    {
      '@type': 'Article',
      '@id': `${routeMeta[route].canonical}#article`,
      headline: config.articleHeadline,
      description: routeMeta[route].description,
      image: siteData.ogImageUrl,
      author: {
        '@type': 'Organization',
        name: siteData.name,
      },
      publisher: { '@id': `${siteData.siteUrl}/#organization` },
      mainEntityOfPage: { '@id': `${routeMeta[route].canonical}#webpage` },
    },
  ]);

  return (
    <main className="product-page article-page stt-guide-page">
      <JsonLd data={structuredData} />
      <ProductPageNav />

      <article className="seo-article">
        <figure className={`seo-article-image ${config.logoPair ? 'seo-article-image-logo' : ''}`}>
          <img src={config.image} alt={config.imageAlt} />
          {config.logoPair ? (
            <div className="model-logo-lockup" aria-label={config.logoPair.aria}>
              <img src={config.logoPair.left.src} alt={config.logoPair.left.alt} />
              <span aria-hidden="true">♡</span>
              <span className="model-logo-partner">
                <img src={config.logoPair.right.src} alt={config.logoPair.right.alt} />
              </span>
            </div>
          ) : null}
        </figure>

        <header className="seo-article-hero">
          <div className="seo-article-kicker">{config.kicker}</div>
          <h1>{config.headline}</h1>
          <p>{config.subcopy}</p>
          <div className="seo-article-actions">
            <a className="primary-cta" href={downloadUrl}>
              <Download size={19} />
              Download for macOS
            </a>
            <a className="secondary-cta" href="/local-speech-to-text-glossary">
              Read the glossary
              <ArrowRight size={18} />
            </a>
          </div>
          <ArticleShareBar route={route} title={config.articleHeadline} />
        </header>

        <section className="seo-article-section seo-article-lede">
          {config.lede.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>{config.factsEyebrow || 'Model map'}</span>
            <h2>{config.factsTitle}</h2>
          </div>
          <div className="seo-card-grid seo-guide-fact-grid">
            {config.facts.map(([title, body]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        {config.sections.slice(0, 2).map((section) => (
          <section className="seo-article-section" key={section.title}>
            <div className="seo-section-heading">
              <span>{section.eyebrow}</span>
              <h2>{section.title}</h2>
            </div>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}

        <section className="seo-article-section seo-comparison-section">
          <div className="seo-section-heading">
            <span>{config.tableEyebrow || 'Comparison'}</span>
            <h2>{config.table.title}</h2>
          </div>
          <div className="seo-comparison-table" role="table" aria-label={config.table.aria}>
            <div className="seo-comparison-row seo-comparison-head" role="row">
              {config.table.columns.map((column) => (
                <strong key={column}>{column}</strong>
              ))}
            </div>
            {config.table.rows.map((row) => (
              <div className="seo-comparison-row" role="row" key={row[0]}>
                <strong>{row[0]}</strong>
                <span>{row[1]}</span>
                <span>{row[2]}</span>
              </div>
            ))}
          </div>
        </section>

        {config.sections.slice(2).map((section) => (
          <section className="seo-article-section" key={section.title}>
            <div className="seo-section-heading">
              <span>{section.eyebrow}</span>
              <h2>{section.title}</h2>
            </div>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Keep reading</span>
            <h2>Where should I go next?</h2>
          </div>
          <div className="seo-card-grid">
            {config.relatedLinks.map(([title, href, body]) => (
              <article key={href}>
                <h3>
                  <a href={href}>{title}</a>
                </h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Sources</span>
            <h2>{config.sourceHeading || 'Primary sources and model references'}</h2>
          </div>
          <ul className="seo-source-list">
            {config.sources.map(([title, href]) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noreferrer">{title}</a>
              </li>
            ))}
          </ul>
        </section>

        <footer className="seo-article-cta">
          <img src={iconUrl} alt="Muesli local speech-to-text app icon" />
          <div>
            <h2>{config.ctaTitle || 'Want the speech-to-text layer to start on your own Mac?'}</h2>
            <p>{config.ctaBody || 'Muesli is open-source, Mac-native, and built around local ASR models for dictation and meeting transcription on Apple Silicon.'}</p>
          </div>
          <a className="primary-cta" href={downloadUrl}>
            <span className="apple-mark" aria-hidden="true"></span>
            Download Muesli
          </a>
        </footer>
      </article>
      <SiteFooterDirectory compact />
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
        <img className="product-hero-bg" src={presidioHeroBgUrl} alt="Muesli on-device dictation for Mac shown in a calm solarpunk workspace" />
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
            <a className="secondary-cta" href="https://github.com/Muesli-HQ/muesli" target="_blank" rel="noreferrer">
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
              <img src={iconUrl} alt="Muesli local speech-to-text app icon" />
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
        <img src={iconUrl} alt="Muesli local speech-to-text app icon" />
        <h2>Try local-first dictation before renting another speech pipeline.</h2>
        <p>Open-source, Mac-native, and built for people who would rather keep their voice close.</p>
        <a className="primary-cta" href={downloadUrl}>
          <span className="apple-mark" aria-hidden="true"></span>
          Download Muesli
        </a>
      </section>
      <SiteFooterDirectory compact />
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
        <img className="product-hero-bg" src={solarpunkMeetingNotesUrl} alt="Muesli local-first meeting notes workspace for Mac without a meeting bot" />
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
            <a className="secondary-cta" href="https://github.com/Muesli-HQ/muesli" target="_blank" rel="noreferrer">
              <Github size={18} />
              Read the source
            </a>
          </div>
        </div>

        <figure className="meeting-hero-card">
          <img src={solarpunkMeetingNotesUrl} alt="A warm solarpunk meeting workspace with notebooks, a laptop, and blurred people at the table" />
          <figcaption className="meeting-listening-pill" aria-label="Muesli is listening to this meeting">
            <img src={iconUrl} alt="Muesli local speech-to-text app icon" />
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
        <img src={iconUrl} alt="Muesli local speech-to-text app icon" />
        <h2>Try meeting notes that do not enter the room before you do.</h2>
        <p>Mac-native, local-first, and built around a transcript you can inspect.</p>
        <a className="primary-cta" href={downloadUrl}>
          <span className="apple-mark" aria-hidden="true"></span>
          Download Muesli
        </a>
      </section>
      <SiteFooterDirectory compact />
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
        <img className="product-hero-bg" src={solarpunkLocalFirstUrl} alt="Local-first AI speech-to-text workspace for Mac with notes and on-device processing" />
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
            <a className="secondary-cta" href="https://github.com/Muesli-HQ/muesli" target="_blank" rel="noreferrer">
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
        <img src={iconUrl} alt="Muesli local speech-to-text app icon" />
        <h2>Try speech-to-text that starts on the machine you already trust.</h2>
        <p>Open-source, Mac-native, and designed to keep the default path close.</p>
        <a className="primary-cta" href={downloadUrl}>
          <span className="apple-mark" aria-hidden="true"></span>
          Download Muesli
        </a>
      </section>
      <SiteFooterDirectory compact />
    </main>
  );
}

function LandingPage() {
  const [stars, setStars] = useState(157);
  const [brewCopied, setBrewCopied] = useState(false);
  const { releases, releaseStatus } = useStableReleases();

  useEffect(() => {
    document.title = 'Muesli - open-source Mac dictation and local speech-to-text';
    setCanonicalUrl('/');
  }, []);

  useEffect(() => {
    fetch('https://api.github.com/repos/Muesli-HQ/muesli')
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
          <img src={iconUrl} alt="Muesli local speech-to-text app icon" />
          <span>muesli</span>
        </a>
        <div className="nav-links">
          <details className="nav-feature-menu">
            <summary>
              Product
              <ChevronDown size={15} aria-hidden="true" />
            </summary>
            <div className="nav-dropdown">
              <a href="/on-device-dictation/">On-device Dictation</a>
              <a href="/meeting-notes/">Meeting Notes</a>
              <a href="/local-first-ai/">Local-first AI</a>
              <a className="nav-dropdown-coming-soon" href="/ios">
                <span>Muesli for iPhone</span>
                <small>Coming soon</small>
              </a>
            </div>
          </details>
          <a href="#privacy">Privacy</a>
          <a href="/changelog">Changelog</a>
          <a href="/blog">Blog</a>
          <a className="nav-help" href="/help">Help</a>
          <a className="github-pill" href="https://github.com/Muesli-HQ/muesli" target="_blank" rel="noreferrer">
            <Github size={17} />
            <span>Open source</span>
            <b><Star size={14} /> {formatStars(stars)}</b>
          </a>
        </div>
      </nav>

      <section className="hero" id="top">
        <img className="hero-bg-art" src={presidioHeroBgUrl} alt="Muesli homepage hero showing a calm Mac speech-to-text workspace for dictation and meeting notes" />
        <div className="hero-copy">
          <p className="eyebrow"><Stars size={16} /> local-first speech workspace</p>
          <h1>Your speech should belong to you.</h1>
          <p className="lede">
            Muesli is an open-source Mac app for local speech-to-text, AI dictation, and meeting
            transcription. Speak naturally, paste clean text, and keep transcripts close instead of
            renting out speech to the cloud.
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
            aria-label="Copy official Homebrew cask install command"
          >
            {brewCopied ? <ClipboardCheck size={16} /> : <Clipboard size={16} />}
            <code>{brewCommand}</code>
            <span>{brewCopied ? 'Copied' : 'Official cask'}</span>
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
                  <img src={iconUrl} alt="Muesli local speech-to-text app icon" />
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
                  <img src={iconUrl} alt="Muesli local speech-to-text app icon" />
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
        <img className="footer-bg-art" src={solarpunkBgUrl} alt="Solarpunk speech workspace representing Muesli local dictation and meeting transcription on Mac" />
        <img className="bottom-icon" src={iconUrl} alt="Muesli local speech-to-text app icon" />
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
          <a href="https://www.youtube.com/@MuesliHQ" target="_blank" rel="noreferrer" aria-label="Subscribe to Muesli on YouTube">
            <YouTubeLogo />
          </a>
        </div>
        <SiteFooterDirectory />
        <p className="copyright">
          © 2026 Muesli. Built with &lt;3 by{' '}
          <a href="https://github.com/pHequals7" target="_blank" rel="noreferrer">pHequals7</a>
          {' '}and 10+ contributors.
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

  if (path === '/ios') {
    return <IosPage />;
  }

  if (path === '/help/ios') {
    return <IosHelpPage />;
  }

  if (path === '/help') {
    return <HelpPage />;
  }

  if (path === '/changelog') {
    return <ChangelogPage />;
  }

  if (path === '/blog') {
    return <BlogPage />;
  }

  if (path === '/on-device-dictation') {
    return <OnDeviceDictationPage />;
  }

  if (path === '/mac-dictation-app') {
    return <MacDictationAppPage />;
  }

  if (path === '/best-dictation-apps-mac') {
    return <BestDictationAppsMacPage />;
  }

  if (path === '/best-offline-dictation-apps-mac') {
    return <AlternativeComparisonPage route={path} />;
  }

  if (path === '/offline-dictation-mac') {
    return <OfflineDictationMacPage />;
  }

  if (path === '/apple-neural-engine-speech-to-text-mac') {
    return <AppleNeuralEngineSpeechPage />;
  }

  if (path === '/local-speech-to-text-glossary') {
    return <LocalSpeechToTextGlossaryPage />;
  }

  if (speechToTextGuideConfigs[path]) {
    return <SpeechToTextGuidePage route={path} />;
  }

  if (path === '/local-meeting-transcription-mac') {
    return <LocalMeetingTranscriptionMacPage />;
  }

  if (path === '/bot-free-meeting-notes') {
    return <AlternativeComparisonPage route={path} />;
  }

  if (path === '/apple-dictation-alternative') {
    return <AlternativeComparisonPage route={path} />;
  }

  if (path === '/granola-alternative') {
    return <GranolaAlternativePage />;
  }

  if (path === '/granola-vs-muesli' || path === '/superwhisper-alternative' || path === '/wispr-flow-alternative' || path === '/otter-ai-alternative' || path === '/fireflies-ai-alternative') {
    return <AlternativeComparisonPage route={path} />;
  }

  if (path === '/meeting-notes') {
    return <MeetingNotesPage />;
  }

  if (path === '/local-first-ai') {
    return <LocalFirstPage />;
  }

  return <LandingPage />;
}
