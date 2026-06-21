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
import solarpunkBestDictationAppsMacUrl from './assets/solarpunk-best-dictation-apps-mac.webp';
import solarpunkOfflineDictationUrl from './assets/solarpunk-offline-dictation.webp';
import solarpunkAppleNeuralEngineSpeechUrl from './assets/solarpunk-apple-neural-engine-speech.webp';
import solarpunkLocalSpeechGlossaryUrl from './assets/solarpunk-local-speech-glossary.webp';
import solarpunkLocalMeetingTranscriptionUrl from './assets/solarpunk-local-meeting-transcription.webp';
import solarpunkGranolaAlternativeUrl from './assets/solarpunk-granola-alternative.webp';
import solarpunkWisprFlowAlternativeUrl from './assets/solarpunk-wispr-flow-alternative.webp';
import solarpunkOtterAiAlternativeUrl from './assets/solarpunk-otter-ai-alternative.webp';
import solarpunkFirefliesAiAlternativeUrl from './assets/solarpunk-fireflies-ai-alternative.webp';
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
    title: 'Do you want meeting notes to start locally?',
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
    question: 'Is Muesli open source?',
    answer: 'Yes. Muesli is open source and available on GitHub, which makes it a better fit for people who want to inspect the software they trust with speech and meeting records.',
  },
  {
    question: 'When should I still choose Granola?',
    answer: 'Choose Granola if you want a polished hosted AI notepad and team knowledge workspace more than local capture, source availability, or transcript ownership. The right tool depends on which tradeoff matters more.',
  },
];

const wisprFlowAlternativeFaqItems = [
  {
    question: 'Is Muesli a Wispr Flow alternative?',
    answer: 'Yes. Muesli can be a Wispr Flow alternative for Mac users who want local-first dictation, offline speech-to-text models, and open-source software. It is not a cross-platform voice keyboard; it is focused on macOS and Apple Silicon.',
  },
  {
    question: 'Does Muesli work on macOS?',
    answer: 'Yes. Muesli is a native macOS app for Apple Silicon Macs. It supports dictation from the menu bar and can paste cleaned text back into the app you were already using.',
  },
  {
    question: 'Does Muesli use offline models such as Parakeet and Whisper?',
    answer: 'Yes. Muesli supports local ASR options including Parakeet and Whisper, with other model paths available for different accuracy and latency tradeoffs.',
  },
  {
    question: 'Is Muesli better than Wispr Flow for privacy?',
    answer: 'Muesli is better for users who want the normal speech-to-text path to start locally on their Mac. That is different from claiming every feature is always offline. Optional integrations and cloud summarization are separate choices.',
  },
  {
    question: 'Should I switch from Wispr Flow to Muesli?',
    answer: 'Switch if your priority is local-first Mac dictation, transcript ownership, open-source software, and offline-capable speech-to-text. Stay with Wispr Flow if you want polished cross-platform dictation across desktop and mobile.',
  },
];

const otterAiAlternativeFaqItems = [
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
    answer: 'Otter.ai may be better for teams that want a mature hosted transcription platform, shared cloud notes, centralized search, and collaboration across many users.',
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
    answer: 'Fireflies.ai is likely the better fit if your main requirement is centralized team search and cloud meeting intelligence. Muesli is better when you care more about local capture, inspectability, and ownership.',
  },
  {
    question: 'Is local-first meeting transcription more private?',
    answer: 'It is a narrower default. Local-first transcription reduces the need to upload meeting audio just to produce a transcript, while optional cloud summaries or integrations remain separate choices.',
  },
];

const alternativePageConfigs = {
  '/wispr-flow-alternative': {
    breadcrumb: 'Wispr Flow Alternative',
    faqItems: wisprFlowAlternativeFaqItems,
    image: solarpunkWisprFlowAlternativeUrl,
    imageAlt: 'A solarpunk Mac writing workspace with an unbranded laptop, notebook, microphone, and no visible human face',
    kicker: 'Wispr Flow alternative',
    headline: 'A Wispr Flow alternative for people who want to own their voice-to-text workflow.',
    subcopy: 'Wispr Flow is a polished AI voice keyboard for speaking into apps across Mac, Windows, iPhone, and Android. Muesli is for Mac and macOS users who want dictation to start locally, stay inspectable, and turn speech into text without renting every spoken draft back from the cloud.',
    secondaryHref: '/mac-dictation-app/',
    secondaryText: 'Read the Mac dictation guide',
    articleHeadline: 'A Wispr Flow alternative for local Mac dictation',
    lede: [
      'The best voice-to-text app is not always the one with the most magic. Sometimes it is the one you can understand.',
      'If your dictation contains private drafts, prompts, emails, notes, code comments, or unfinished thinking, the place where speech becomes text matters. Muesli is built around a simpler default: hold a hotkey, speak, release, and let local speech-to-text models such as Parakeet and Whisper transcribe on your Mac.',
    ],
    sections: [
      {
        eyebrow: 'Positioning',
        title: 'What is Wispr Flow good at?',
        body: ['Wispr Flow is strong when you want a polished cross-platform voice keyboard. It works across common writing apps, emphasizes fast voice-to-text, and uses AI formatting to turn natural speech into cleaner writing. For people who want one dictation layer across desktop and mobile, that can be the right tradeoff.'],
      },
      {
        eyebrow: 'Ownership',
        title: 'Why look for a Wispr Flow alternative on Mac?',
        body: ['The question is not whether Wispr Flow is useful. The question is whether your everyday dictation should depend on a hosted speech pipeline. Some Mac users want their rough thoughts, customer replies, AI prompts, and private notes to start on the machine they control.', 'Muesli is built for that preference: local-first dictation on Apple Silicon, open-source software, and a workflow that keeps the transcript close to the cursor.'],
      },
      {
        eyebrow: 'Local-first',
        title: 'What changes when dictation runs locally on macOS?',
        body: ['Local dictation changes the default path. Instead of sending each utterance away before text comes back, the speech-to-text step can run on Apple Silicon.', 'That does not make every feature offline or every workflow private by magic. It does make the normal dictation path narrower, easier to reason about, and less dependent on a cloud service for every sentence.'],
      },
      {
        eyebrow: 'Scope',
        title: 'Is Muesli a Wispr Flow clone?',
        body: ['No. Wispr Flow is a broad AI voice keyboard. Muesli is a Mac-native speech workspace for dictation and meeting transcription.', 'The overlap is voice-to-text; the philosophy is different. Muesli is better suited to people who care about local models, open-source code, raw transcript ownership, and keeping workday memory under their control.'],
      },
      {
        eyebrow: 'When not',
        title: 'When might Wispr Flow still be the better choice?',
        body: ['Choose Wispr Flow if you want one polished dictation product across Mac, Windows, iPhone, and Android, or if cloud AI formatting is more important to you than local-first ownership.', 'Muesli is intentionally narrower: it is for Mac users who want dictation and meeting transcription to start from the machine they control.'],
      },
    ],
    comparison: {
      title: 'Should I use Wispr Flow or Muesli for macOS dictation?',
      aria: 'Wispr Flow vs Muesli comparison',
      rows: [
        ['Wispr Flow', 'Polished cross-platform AI dictation for Mac, Windows, iPhone, and Android.', 'Best if you want a hosted, highly finished voice keyboard across devices.'],
        ['Apple Dictation', 'Free and already built into macOS.', 'Best for quick snippets, but less flexible for model choice, cleanup, and longer work sessions.'],
        ['Muesli', 'Local-first Mac dictation with offline models such as Parakeet and Whisper.', 'Best if you want speech-to-text to begin on your Mac and remain inspectable.'],
      ],
    },
    fitTitle: 'When is Muesli the better Wispr Flow alternative?',
    fitCards: [
      ['Do you want offline dictation on Mac?', 'Use Muesli when your preferred dictation path should keep working after local models are installed, even when Wi-Fi is unreliable or cloud transcription is not the right default.'],
      ['Do you dictate private drafts or AI prompts?', 'Use Muesli when spoken drafts include sensitive notes, customer context, research prompts, or unfinished thinking that should not need a hosted transcription step.'],
      ['Do you want open-source Mac software?', 'Use Muesli when inspectability matters. The app is open source, Mac-native, and built around local speech-to-text rather than an opaque voice layer.'],
    ],
    faqTitle: 'What do people ask about Wispr Flow alternatives?',
    ctaTitle: 'Want voice-to-text that starts on your own Mac?',
    ctaBody: 'Muesli gives Mac users a local-first dictation workflow for everyday writing, prompts, notes, and replies, without making every spoken draft depend on a cloud speech pipeline.',
  },
  '/otter-ai-alternative': {
    breadcrumb: 'Otter.ai Alternative',
    faqItems: otterAiAlternativeFaqItems,
    image: solarpunkOtterAiAlternativeUrl,
    imageAlt: 'A solarpunk meeting-notes workspace with an unbranded laptop, organized transcript pages, and no visible human face',
    kicker: 'Otter.ai alternative',
    headline: 'An Otter.ai alternative for people who want to own their meeting memory.',
    subcopy: 'Otter.ai is built for cloud transcription, meeting bots, and shared team notes. Muesli is for macOS users who want meeting audio captured from their own Mac, local-first transcripts, and a workflow that keeps meeting memory closer to the machine they control.',
    secondaryHref: '/local-meeting-transcription-mac/',
    secondaryText: 'Read the meeting transcription guide',
    articleHeadline: 'An Otter.ai alternative for local-first meeting notes',
    lede: [
      'There are good reasons to use Otter.ai: it is established, collaborative, and built around cloud meeting transcription at team scale.',
      'But not every meeting note workflow needs another bot, another hosted transcript library, or another cloud place where your workday memory lives. If you want Mac meeting transcription that starts locally and stays inspectable, Muesli is the healthier alternative.',
    ],
    sections: [
      {
        eyebrow: 'Positioning',
        title: 'What is Otter.ai good at?',
        body: ['Otter.ai is useful for teams that want cloud transcription, shared meeting notes, meeting bots, searchable conversations, and collaboration features across many calls. It is a broad transcription workspace, not just a small Mac utility.', 'If your company wants a hosted record of meetings with team sharing and admin controls, Otter.ai may be the better fit.'],
      },
      {
        eyebrow: 'Ownership',
        title: 'Why look for an Otter.ai alternative on macOS?',
        body: ['People usually look for an Otter.ai alternative when they want fewer cloud defaults. They may not want a bot joining meetings, may want more direct ownership of raw transcripts, or may prefer software that begins with local capture on the Mac already in the call.', 'The question is not whether cloud transcription can be useful. It is whether every meeting should start by renting your meeting memory back from a hosted system.'],
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
      title: 'How is Muesli different from Otter.ai?',
      aria: 'Otter.ai vs Muesli comparison',
      rows: [
        ['Otter.ai', 'Cloud transcription, shared meeting notes, meeting bots, searchable conversations, and team collaboration.', 'Best for teams that want shared cloud meeting intelligence and centralized collaboration.'],
        ['Muesli', 'Local-first macOS speech workspace for dictation and meeting transcription with raw transcript review and exports.', 'Best for Mac users who want local-first meeting transcription, open-source software, and direct control.'],
      ],
    },
    fitTitle: 'Where does Muesli fit best?',
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
          'For privacy questions, email pranav@muesli.works.',
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
          'For questions about these terms, email pranav@muesli.works.',
        ],
      },
    ],
  },
};

export const prerenderRoutes = ['/', '/privacy', '/terms', '/on-device-dictation', '/mac-dictation-app', '/best-dictation-apps-mac', '/offline-dictation-mac', '/apple-neural-engine-speech-to-text-mac', '/local-speech-to-text-glossary', '/local-meeting-transcription-mac', '/granola-alternative', '/wispr-flow-alternative', '/otter-ai-alternative', '/fireflies-ai-alternative', '/meeting-notes', '/local-first-ai', '/help', '/changelog'];

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

const footerDirectoryColumns = [
  {
    title: 'Product',
    links: [
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
      ['Mac dictation app', '/mac-dictation-app'],
      ['Offline dictation for Mac', '/offline-dictation-mac'],
      ['Apple Neural Engine speech-to-text', '/apple-neural-engine-speech-to-text-mac'],
      ['Local speech-to-text glossary', '/local-speech-to-text-glossary'],
      ['Local meeting transcription', '/local-meeting-transcription-mac'],
    ],
  },
  {
    title: 'Compare',
    links: [
      ['Granola alternative', '/granola-alternative'],
      ['Wispr Flow alternative', '/wispr-flow-alternative'],
      ['Otter.ai alternative', '/otter-ai-alternative'],
      ['Fireflies.ai alternative', '/fireflies-ai-alternative'],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['Help', '/help'],
      ['Changelog', '/changelog'],
      ['GitHub', 'https://github.com/pHequals7/muesli'],
      ['llms.txt', '/llms.txt'],
      ['facts.json', '/facts.json'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['X', 'https://x.com/fastspeech2text'],
      ['LinkedIn', 'https://www.linkedin.com/company/mueslios/'],
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
      <SiteFooterDirectory compact />
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
            cloud-connected writing assistant, a local-first Mac tool, or a meeting transcription system.
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
          <img src={iconUrl} alt="" />
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
          <img src={iconUrl} alt="" />
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
          <img src={iconUrl} alt="" />
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
        </header>

        <section className="seo-article-section seo-article-lede">
          <p>
            Offline dictation is not only about working without Wi-Fi. It is about removing the default cloud step
            from the shortest path between speech and text. If the model can run locally, a quick note or reply does
            not need to become an audio upload first.
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
          <img src={iconUrl} alt="" />
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
          <img src={iconUrl} alt="" />
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
      headline: 'A Granola alternative for local-first meeting notes',
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
          <img src={solarpunkGranolaAlternativeUrl} alt="A solarpunk breakfast workspace with a bowl of muesli, an unbranded laptop, a microphone, and no visible human face" />
        </figure>

        <header className="seo-article-hero">
          <div className="seo-article-kicker">Granola alternative</div>
          <h1>A Granola alternative for the healthier version of your workday meeting notes.</h1>
          <p>
            Muesli is for people who want local-first meeting transcription, open-source software, and notes they can
            own instead of renting their workday memory from the cloud.
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
        </header>

        <section className="seo-article-section seo-article-lede">
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
            That is a legitimate product direction. The question is whether your meeting notes should live primarily
            inside another cloud workspace, or whether the source record should begin on the computer you control.
          </p>
        </section>

        <section className="seo-article-section">
          <div className="seo-section-heading">
            <span>Ownership</span>
            <h2>Why look for a Granola alternative?</h2>
          </div>
          <p>
            The reason is not that every hosted meeting-notes product is bad. The reason is ownership. Meetings contain
            customer context, hiring decisions, product strategy, personal judgment, and unfinished thinking. Renting
            that memory back from the cloud is a real tradeoff.
          </p>
          <p>
            Muesli is built for people who want a local-first default: capture from the Mac, keep the transcript close,
            export ordinary files, and choose optional AI summarization deliberately.
          </p>
        </section>

        <section className="seo-article-section seo-comparison-section">
          <div className="seo-section-heading">
            <span>Comparison</span>
            <h2>Granola vs Muesli: what changes?</h2>
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
            <h2>When is Muesli the better Granola alternative?</h2>
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
          <img src={iconUrl} alt="" />
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
          <img src={iconUrl} alt="" />
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
      <SiteFooterDirectory compact />
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

  if (path === '/best-dictation-apps-mac') {
    return <BestDictationAppsMacPage />;
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

  if (path === '/local-meeting-transcription-mac') {
    return <LocalMeetingTranscriptionMacPage />;
  }

  if (path === '/granola-alternative') {
    return <GranolaAlternativePage />;
  }

  if (path === '/wispr-flow-alternative' || path === '/otter-ai-alternative' || path === '/fireflies-ai-alternative') {
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
