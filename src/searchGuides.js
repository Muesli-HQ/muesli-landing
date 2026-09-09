// Editorial content for existing search landing pages. Keep metadata, visible
// answers, and generated discovery files on the same source of truth.
const release = 'https://github.com/Muesli-HQ/muesli/releases/tag/v0.8.3';
const readme = 'https://github.com/Muesli-HQ/muesli/blob/v0.8.3/README.md';
const exporter = 'https://github.com/Muesli-HQ/muesli/blob/v0.8.3/native/MuesliNative/Sources/MuesliNativeApp/MeetingExporter.swift';
const sources = {
  muesli: ['Muesli 0.8.3: installation, models and features', readme],
  release: ['Muesli 0.8.3 release', release],
  license: ['Muesli MIT license', 'https://github.com/Muesli-HQ/muesli/blob/v0.8.3/LICENSE'],
  export: ['Muesli PDF and Markdown export implementation', exporter],
  granolaPlans: ['Granola plans and pricing', 'https://www.granola.ai/pricing'],
  granolaCapture: ['Granola transcription and transcript access', 'https://docs.granola.ai/help-center/taking-notes/transcription'],
  granolaSecurity: ['Granola data storage and security', 'https://www.granola.ai/security'],
  flow: ['Wispr Flow features and internet requirement', 'https://docs.wisprflow.ai/articles/2772472373-what-is-flow'],
  flowPlans: ['Wispr Flow plans and pricing', 'https://docs.wisprflow.ai/articles/9559327591-flow-plans-and-what-s-included'],
  superwhisper: ['Superwhisper offline transcription', 'https://superwhisper.com/offline-transcription'],
  superwhisperPlans: ['Superwhisper Pro pricing', 'https://superwhisper.com/docs/get-started/sw-pro'],
  voiceink: ['VoiceInk local and cloud models', 'https://tryvoiceink.com/docs/ai-models'],
  voiceinkPlans: ['VoiceInk Mac pricing and requirements', 'https://tryvoiceink.com/pricing'],
  apple: ['Apple Dictation setup and on-device availability', 'https://support.apple.com/en-gb/guide/mac-help/-mh40584/mac'],
  parakeet: ['NVIDIA Parakeet TDT 0.6B v3 model card', 'https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3'],
};

const reviewed = '2026-09-09';
const requirements = 'Apple Silicon Mac, macOS 14.2 or later. Some models require a newer macOS version.';
const transcriptExample = '# Project check-in\n\n**Date:** September 9, 2026\n**Duration:** 2m 0s\n**Words:** 15\n\n---\n\n## Raw Transcript\n\nYou: I will send the draft today.\nSpeaker 1: I will review it tomorrow morning.';

export const searchGuides = {
  '/granola-alternative': {
    title: 'Free, Open-Source Granola Alternative for Mac | Muesli',
    description: 'Compare Muesli and Granola for Mac meeting notes: local transcription, free use, transcript access, PDF and Markdown exports, and optional AI summaries.',
    headline: 'A free, open-source Granola alternative for Mac.',
    label: 'Granola alternative',
    image: 'granola',
    imageAlt: 'Dutch Golden Age-inspired painting of two people talking beside books and a writing desk',
    reviewed,
    intro: 'Muesli transcribes meetings on your Mac and saves the transcript locally. Use it for microphone and system-audio capture, speaker labels, and PDF or Markdown exports. The app is free and MIT-licensed. AI summaries are optional.',
    note: 'Written by the Muesli team. Muesli details refer to version 0.8.3; competitor documentation and USD prices were checked on September 9, 2026.',
    sections: [
      {
        id: 'comparison', title: 'How do Muesli and Granola compare?',
        paragraphs: ['Both apps capture meeting audio without joining the call as a bot. The useful distinction is where transcription runs, how you use the saved record, and which collaboration features you need.'],
        table: {
          columns: ['Feature', 'Muesli for Mac', 'Granola'],
          rows: [
            ['Meeting capture', 'Microphone and system audio from your Mac; no meeting bot.', 'Device audio capture; no meeting bot.'],
            ['Processing and storage', 'On-device transcription and local history. Cloud summaries and iCloud text sync are optional.', 'Hosted transcription and AI notes. Stores transcripts and notes; does not retain meeting audio recordings.'],
            ['Transcript access', 'Review the raw transcript and export it as Markdown or PDF.', 'View the transcript and copy all of it from the transcript panel.'],
            ['Notes and sharing', 'Export notes, transcript, or the full meeting as a file.', 'Shared notes and folders, with integrations on paid plans.'],
            ['Cost', 'Free app with no Muesli transcription subscription. Optional external AI providers may charge.', 'Basic: $0 with limited history. Business: $14 per user/month with unlimited notes and history.'],
          ],
        },
        sources: ['muesli', 'export', 'granolaCapture', 'granolaSecurity', 'granolaPlans'],
      },
      {
        id: 'fit', title: 'When does Muesli fit your workflow?',
        paragraphs: ['Choose Muesli if you want to transcribe meetings on Apple Silicon, keep a local record, and work with ordinary files. You can inspect the source, use dictation in the same app, and choose a summary provider separately.', 'Granola is worth keeping if your team relies on shared folders, hosted meeting search, or its integrations. Those collaboration features may matter more to your workflow than where transcription runs.'],
        sources: ['license', 'granolaPlans'],
      },
      {
        id: 'try-it', title: 'Try Muesli on your next meeting',
        steps: [
          ['Install the app', `Download Muesli, move it to Applications, and complete onboarding. ${requirements}`],
          ['Download a speech model', 'Choose Parakeet v3 during setup or from Models. Finish the download before going offline.'],
          ['Check both sides of the call', 'Allow microphone and system-audio access. Start Meeting Recording from the menu bar and make a short test with another participant. Confirm that both voices appear in the transcript.'],
          ['Review and export', 'Stop the recording and open the meeting. Review the Transcript tab, then choose Export Transcript or Export Full Meeting. Select Markdown or PDF in the save dialog.'],
        ],
        sources: ['muesli', 'export'],
      },
      {
        id: 'summaries', title: 'Can I keep the summary local too?',
        paragraphs: ['Yes, if you configure Ollama with a model running on your Mac. You can also keep the transcript without generating a summary. OpenAI, OpenRouter, and ChatGPT summaries send transcript text to the selected service and require a connection.', 'Local transcription and bot-free capture are separate properties. Granola also captures without a bot. Tell the people in the meeting that you are recording or transcribing.'],
        sources: ['muesli', 'granolaCapture'],
      },
    ],
    faqs: [
      ['Is Muesli a free Granola alternative?', 'Yes. The Mac app is free and open source under the MIT license. Local transcription has no Muesli subscription fee. Optional external AI services have their own pricing.'],
      ['Does Granola let me access the raw transcript?', 'Yes. Granola documents a transcript panel with a copy-all option. Muesli also exposes the transcript and offers Markdown and PDF file exports.'],
      ['Can I import my Granola history?', 'This guide does not describe a direct Granola migration. Keep copies of existing notes and transcripts, and try Muesli with new meetings before changing your workflow.'],
      ['Does Muesli work on an Intel Mac?', 'The Mac app requires Apple Silicon and macOS 14.2 or later. Check the selected model for any additional requirements.'],
    ],
    related: [['Local meeting setup and troubleshooting', '/local-meeting-transcription-mac'], ['Detailed Granola vs Muesli comparison', '/granola-vs-muesli'], ['Meeting notes in Muesli', '/meeting-notes']],
    cta: 'Try local meeting transcription.',
    ctaBody: 'Download Muesli, choose a model, and check the transcript from a short call.',
  },
  '/local-meeting-transcription-mac': {
    title: 'Local Meeting Transcription for Mac: Setup and Export | Muesli',
    description: 'Set up local meeting transcription on Mac with Muesli. Capture mic and system audio, check permissions, review speaker labels, and export PDF or Markdown.',
    headline: 'Transcribe meetings locally on your Mac.',
    label: 'Local meeting transcription', image: 'meeting',
    imageAlt: 'Painting of a quiet workspace for recording and reviewing a conversation',
    reviewed,
    intro: 'Muesli captures your microphone and the audio playing through your Mac, then runs speech recognition on-device. It works with calls in Zoom, Google Meet, and Teams without adding a meeting bot. You can review the transcript and export it after the call.',
    note: 'Setup and export instructions checked against Muesli 0.8.3 source and release documentation. Permission names can vary with macOS and the capture method.',
    sections: [
      {
        id: 'setup', title: 'How to record and transcribe a meeting',
        steps: [
          ['Install and choose a model', `${requirements} Move Muesli to Applications, open it, and complete onboarding. Download the speech model you plan to use.`],
          ['Allow microphone and system audio', 'Follow the permission prompts. Microphone access captures you; system-audio access captures the people you hear through the meeting app. Relaunch Muesli if macOS asks you to.'],
          ['Start a short test call', 'Join the call and tell the participants you are transcribing. In the Muesli menu bar menu, choose Start Meeting Recording. Speak, then ask the other person to speak.'],
          ['Check the transcript', 'Choose Stop Meeting Recording and open the saved meeting. Check that your speech and the remote voice were captured before relying on the setup for a longer call.'],
          ['Review, summarize, or export', 'Review names, numbers, and speaker labels. Generate notes with your configured provider if needed, then export the transcript or notes.'],
        ],
        sources: ['muesli', 'release'],
      },
      {
        id: 'permissions', title: 'Which macOS permissions do I need?',
        table: {
          columns: ['Permission', 'Purpose', 'If something is missing'],
          rows: [
            ['Microphone', 'Captures your side of the conversation.', 'Check the selected input and Microphone access in System Settings > Privacy & Security.'],
            ['System audio', 'Captures speech from the call. Muesli 0.8.3 uses a CoreAudio tap with a ScreenCaptureKit fallback.', 'Check the recording permission requested by your macOS version. A fallback may require Screen & System Audio Recording or Screen Recording access.'],
            ['Accessibility and Input Monitoring', 'Used for dictation paste and global hotkeys.', 'If dictation fails after setup, check both permissions and quit and reopen Muesli from Applications.'],
            ['Calendar, optional', 'Shows upcoming events and meeting links.', 'You can start a recording manually without connecting a calendar.'],
          ],
        },
        sources: ['muesli'],
      },
      {
        id: 'troubleshooting', title: 'What should I check when a voice is missing?',
        paragraphs: ['If only your voice appears, check that the call audio is playing on this Mac and that Muesli has system-audio access. If only the other people appear, check Microphone permission and the input device. After changing headphones or microphones, run another short capture test.', 'If speech appears twice, check whether your microphone is picking up the speakers and try headphones. Overlapping voices and noisy audio can still cause transcription or speaker-label errors. Review important quotations against the recording.'],
      },
      {
        id: 'export', title: 'Export a transcript as Markdown or PDF',
        paragraphs: ['Open a saved meeting and select the Transcript tab. Choose Export Transcript from the export menu. For notes and transcript together, choose Export Full Meeting. The save dialog lets you choose Markdown or PDF.', 'Markdown exports include a title, date, duration, word count, and the selected content. The example below uses fictional dialogue to show the file structure. It is not a recording or an accuracy test.'],
        example: {label: 'Illustrative Markdown transcript', text: transcriptExample, href: '/examples/meeting-transcript.md'},
        sources: ['export'],
      },
      {
        id: 'offline', title: 'What works offline?',
        paragraphs: ['With the required models downloaded, local capture, transcription, transcript review, and file export can run without a transcription service. An online call still needs its own connection.', 'For local summaries, configure Ollama on your Mac and download its model in advance. Optional OpenAI, OpenRouter, and ChatGPT summaries need a connection and receive transcript text. Calendar sync and optional iCloud text sync also use the network.'],
        sources: ['muesli'],
      },
    ],
    faqs: [
      ['What does local meeting transcription mean?', 'The speech-recognition model runs on your computer. Recording audio on a Mac alone does not establish where transcription happens. Muesli uses on-device speech models for its local meeting workflow.'],
      ['Can it transcribe a call playing on my phone?', 'System-audio capture records audio playing on the Mac. For this workflow, join the call on the Mac so Muesli can capture the remote participants.'],
      ['Does Muesli identify every speaker correctly?', 'Speaker diarization separates voices, but labels can be wrong when people overlap, change microphones, or sound similar. Review speaker assignments before quoting or sharing the transcript.'],
      ['Do I need a calendar integration?', 'No. Start and stop a meeting recording from the Muesli menu bar menu. Calendar access is optional.'],
    ],
    related: [['Compare Muesli with Granola', '/granola-alternative'], ['Bot-free meeting notes', '/bot-free-meeting-notes'], ['Permission troubleshooting', '/help']],
    cta: 'Record a short test meeting.',
    ctaBody: 'Check both voices, review the transcript, and export a file you can use.',
  },
  '/wispr-flow-alternative': {
    title: 'Wispr Flow Alternatives for Mac: Free and Offline Options | Muesli',
    description: 'Compare Wispr Flow alternatives for Mac by offline transcription, price, model choice, and setup. Includes Muesli, Superwhisper, VoiceInk, and Apple Dictation.',
    headline: 'Wispr Flow alternatives for Mac, compared.',
    label: 'Wispr Flow alternatives', image: 'wispr',
    imageAlt: 'Painting of a quiet desk and conversation, illustrating dictation on a Mac',
    reviewed,
    intro: 'Muesli is a free, open-source option if you want dictation and meeting transcription on an Apple Silicon Mac. Speech recognition runs locally after model setup. Superwhisper, VoiceInk, and Apple Dictation offer other ways to dictate on a Mac, with different controls and costs.',
    note: 'Written by the Muesli team. Prices below are published USD prices checked September 9, 2026. This is a feature comparison, not a head-to-head accuracy benchmark.',
    sections: [
      {
        id: 'comparison', title: 'Which Mac dictation app fits your needs?',
        table: {
          columns: ['App', 'Transcription and workflow', 'Published price'],
          rows: [
            ['Muesli', 'Local Parakeet and Whisper models, configurable hotkey, paste at the cursor, and meeting capture. Requires Apple Silicon.', 'Free, MIT-licensed app. Optional external AI providers have separate costs.'],
            ['Wispr Flow', 'Requires internet for voice transcription. Useful if you already depend on its writing features across devices.', 'Free tier. Pro: $15/user/month, or $12/user/month billed annually.'],
            ['Superwhisper', 'Local and cloud model choices, with configurable modes. Check the selected model and language-processing settings for offline use.', 'Pro documentation lists $8.49/month, $84.99/year, or $249.99 lifetime.'],
            ['VoiceInk', 'Local models and optional hosted providers. Mac license requires Apple Silicon and macOS 14.4 or later.', 'Solo license shown at $25 for one Mac; a one-time purchase.'],
            ['Apple Dictation', 'Built into macOS. Keyboard settings show whether your language and setup process general dictation on-device.', 'Included with macOS.'],
          ],
        },
        sources: ['muesli', 'license', 'flow', 'flowPlans', 'superwhisper', 'superwhisperPlans', 'voiceink', 'voiceinkPlans', 'apple'],
      },
      {
        id: 'switch', title: 'How to try Muesli alongside Wispr Flow',
        steps: [
          ['Install and finish model setup', `${requirements} Choose Parakeet v3 in onboarding and wait for it to finish preparing.`],
          ['Choose a different hotkey', 'Assign a modifier key that does not overlap with your other dictation app. Allow Microphone, Input Monitoring, and Accessibility access during setup.'],
          ['Try the apps you write in', 'Place the cursor in Notes, your mail app, or a browser text field. Hold the Muesli hotkey, speak a short message, and release it. Check the pasted text.'],
          ['Compare your own vocabulary', 'Try names, technical terms, punctuation, and a longer paragraph. Add recurring terms to the personal dictionary. Check whether you need an optional cleanup model for the formatting you want.'],
        ],
        sources: ['muesli'],
      },
      {
        id: 'offline', title: 'Is there an offline Wispr Flow alternative?',
        paragraphs: ['Yes. Muesli can use downloaded local speech models; Superwhisper and VoiceInk also offer local models. Wispr states that Flow needs an internet connection for transcription.', 'Check the whole workflow before going offline. A local speech model can produce text while a cloud cleanup feature still waits for a network. In Muesli, use local cleanup or disable it, then test dictation with Wi-Fi and any wired connection disconnected.'],
        sources: ['flow', 'superwhisper', 'voiceink', 'muesli'],
      },
      {
        id: 'fit', title: 'When should you stay with Wispr Flow?',
        paragraphs: ['Keep Flow if its formatting, vocabulary handling, and device coverage already meet your needs and an internet connection is acceptable. A switch is useful when it solves a specific problem, such as offline work, subscription cost, or a need for local meeting transcription.', 'Try both apps with the same types of messages before committing. Compare correction effort and time until usable text appears. Model names and advertised latency alone do not tell you how an app handles your voice.'],
      },
    ],
    faqs: [
      ['Is Muesli a free Wispr Flow alternative?', 'Yes. Muesli is free and MIT-licensed. You can use installed local speech models without a Muesli subscription. Optional external AI services are priced separately.'],
      ['Can I use Wispr Flow offline?', 'Wispr’s documentation says Flow requires an internet connection for voice transcription. Muesli, Superwhisper, and VoiceInk offer local transcription options.'],
      ['Will the formatting be identical?', 'No. Speech models, dictionaries, and cleanup settings differ. Test the names, punctuation, and paragraph styles you use regularly.'],
      ['Does this Mac guide cover Windows or Android?', 'No. These setup instructions are for Muesli on an Apple Silicon Mac. Check each vendor’s current platform support if you need other devices.'],
    ],
    related: [['Compare offline Mac dictation', '/best-offline-dictation-apps-mac'], ['Muesli dictation features', '/on-device-dictation'], ['Parakeet setup and model choices', '/nvidia-parakeet-speech-to-text']],
    cta: 'Try your next draft with Muesli.',
    ctaBody: 'Install a local model and dictate into the apps you already use.',
  },
  '/best-offline-dictation-apps-mac': {
    title: 'Best Offline Dictation Apps for Mac: What Works Offline | Muesli',
    description: 'Compare offline Mac dictation with Muesli, Superwhisper, VoiceInk, and Apple Dictation. Check local models, cleanup, pricing, and your setup without internet.',
    headline: 'Offline dictation apps for Mac: what works without internet.',
    label: 'Offline dictation apps', image: 'offline',
    imageAlt: 'Painting of a laptop in a quiet outdoor workspace',
    reviewed,
    intro: 'Muesli, Superwhisper, and VoiceInk offer local speech models for Mac dictation. Apple Dictation can also process general dictation on-device in supported configurations. Check transcription and text cleanup separately when choosing an offline setup.',
    note: 'Written by the Muesli team from product documentation checked September 9, 2026. The test below is a procedure you can run; no comparative speed or accuracy results are claimed.',
    sections: [
      {
        id: 'comparison', title: 'Which parts of each app work offline?',
        table: {
          columns: ['App', 'Offline transcription', 'Setup and cost to check'],
          rows: [
            ['Muesli', 'Yes, using a downloaded local model. Local cleanup is optional.', 'Free Mac app. Download models first; hosted summaries and sync need a network.'],
            ['Superwhisper', 'Yes, with a local voice model. Configure language processing separately.', 'Check current model access in the app. Published Pro options: $8.49/month, $84.99/year, $249.99 lifetime.'],
            ['VoiceInk', 'Yes, with local models. Hosted transcription and enhancement are optional.', 'One-Mac Solo license shown at $25. Requires Apple Silicon and macOS 14.4+.'],
            ['Apple Dictation', 'Depends on language and setup. Check the notice in System Settings > Keyboard > Dictation.', 'Included with macOS. Follow Apple’s instructions for your language and Mac.'],
            ['Wispr Flow', 'No. Its documentation requires internet for voice transcription.', 'Included here to distinguish it from apps offering offline recognition.'],
          ],
        },
        sources: ['muesli', 'superwhisper', 'superwhisperPlans', 'voiceink', 'voiceinkPlans', 'apple', 'flow'],
      },
      {
        id: 'choose', title: 'How to choose an offline setup',
        paragraphs: ['Start with Apple Dictation if you want to try the built-in option. Choose Muesli if you want a free app with model selection, a personal dictionary, and local meeting transcription. Compare Superwhisper’s modes or VoiceInk’s local and hosted provider controls if those fit your writing workflow.', 'Keep language support in view. Muesli’s Parakeet v3 supports 25 languages; Parakeet v2 is English-only. Whisper offers other language and model-size choices. Check the specific model card before downloading.'],
        sources: ['apple', 'muesli', 'superwhisperPlans', 'voiceink', 'parakeet'],
      },
      {
        id: 'test', title: 'Run a five-minute offline check',
        steps: [
          ['Prepare while connected', 'Install the app, download its speech model, and run one dictation. Download any local cleanup model you intend to use.'],
          ['Choose local processing', 'Select a local speech model. Disable hosted cleanup or choose a local cleanup model. Note your app version, macOS version, Mac chip, and model name.'],
          ['Disconnect the network', 'Turn off Wi-Fi and disconnect any wired connection. Open Notes or another local text editor.'],
          ['Dictate three samples', 'Try a short message, a paragraph, and names or technical terms you use at work. Check that text appears without a connection.'],
          ['Check the result and repeat', 'Count corrections and note time until usable text appears. Quit and reopen the app while offline, then repeat. This also checks whether the model remains available after a restart.'],
        ],
      },
      {
        id: 'sample', title: 'Use a sample with details you can check',
        paragraphs: ['Read the sentence below and compare the names, time, and number in the output. Replace the names with vocabulary from your work. This is a test prompt, not a sample generated by a speech model.'],
        example: {label: 'Suggested dictation prompt', text: 'Please ask Priya to review the CoreML notes by 10:30 tomorrow. We need three examples before the meeting.'},
      },
      {
        id: 'network', title: 'What still needs a connection?',
        paragraphs: ['Model downloads and app updates need internet. In Muesli, cloud summaries, calendar sync, and optional iCloud text sync use the network too. You can keep these separate from local dictation.', 'A successful offline test checks whether your chosen workflow works without a connection. It does not establish what the app sends when you reconnect. Read the provider and sync settings for the features you enable.'],
        sources: ['muesli'],
      },
    ],
    faqs: [
      ['What is the best offline dictation app for Mac?', 'Choose based on language support, correction effort, price, and workflow. Muesli offers free local dictation and meeting capture. Superwhisper and VoiceInk provide other local model workflows. Apple Dictation is included with macOS.'],
      ['Does offline dictation work before I download a model?', 'Apps with downloadable local speech models need those files installed first. Complete setup and a successful test while connected before relying on offline use.'],
      ['Why does an offline model still wait for internet?', 'A separate cleanup or formatting feature may use a cloud provider. Check both recognition and post-processing settings, then repeat the test in a local text editor.'],
      ['Can I use Muesli on a flight?', 'Local dictation can work after model setup. Prepare the app and models before traveling, and test the exact settings you plan to use with the network disconnected.'],
    ],
    related: [['Set up offline dictation in Muesli', '/offline-dictation-mac'], ['Compare Wispr Flow alternatives', '/wispr-flow-alternative'], ['Choose a Parakeet model', '/nvidia-parakeet-speech-to-text']],
    cta: 'Set up dictation before you go offline.',
    ctaBody: 'Download Muesli and a local model, then try it in your text editor.',
  },
  '/nvidia-parakeet-speech-to-text': {
    title: 'NVIDIA Parakeet on Mac: Local Dictation Setup | Muesli',
    description: 'Use NVIDIA Parakeet for local Mac dictation with Muesli. Compare v3 and v2 language support, install a model, and check recognition and latency on your Mac.',
    headline: 'Use NVIDIA Parakeet for dictation on your Mac.',
    label: 'NVIDIA Parakeet speech-to-text', image: 'parakeet',
    imageAlt: 'Green and charcoal illustration of speech flowing through an on-device recognition model',
    reviewed,
    intro: 'Parakeet is NVIDIA’s speech-recognition model family. Muesli uses CoreML versions through FluidAudio to run dictation on Apple Silicon. Install the app, download a model, and use a hotkey to paste transcribed speech at the cursor. No terminal setup or NVIDIA GPU is needed for this Mac workflow.',
    note: 'Model details checked against NVIDIA’s model card and Muesli 0.8.3 documentation on September 9, 2026. No new latency or accuracy benchmark was run for this guide.',
    sections: [
      {
        id: 'models', title: 'Should I choose Parakeet v3 or v2?',
        table: {
          columns: ['Model', 'Languages', 'Use in Muesli'],
          rows: [
            ['Parakeet TDT v3', '25 languages, including English; automatic language detection.', 'The recommended starting model in Muesli 0.8.3. Its app download is approximately 450 MB.'],
            ['Parakeet TDT v2', 'English only.', 'An alternative to compare with v3 on your own English recordings. App download is approximately 450 MB.'],
            ['Whisper', 'Language support depends on the selected variant.', 'Compare when you need another language or get recurring recognition errors with Parakeet.'],
          ],
        },
        paragraphs: ['The v3 model card lists Bulgarian, Croatian, Czech, Danish, Dutch, English, Estonian, Finnish, French, German, Greek, Hungarian, Italian, Latvian, Lithuanian, Maltese, Polish, Portuguese, Romanian, Russian, Slovak, Slovenian, Spanish, Swedish, and Ukrainian.', 'NVIDIA’s model files and the CoreML files distributed for a Mac runtime are different packages. Use Muesli’s model manager for this workflow.'],
        sources: ['parakeet', 'muesli'],
      },
      {
        id: 'setup', title: 'Set up Parakeet dictation in Muesli',
        steps: [
          ['Install Muesli', `${requirements} Download the app and move it to Applications. You can also install the Homebrew cask.`],
          ['Download Parakeet v3', 'Choose it during onboarding or open Models. Wait for downloading and preparation to finish. Select it as your dictation model.'],
          ['Finish permissions and hotkey setup', 'Allow Microphone, Input Monitoring, and Accessibility access. Reopen Muesli if prompted, then complete the dictation test.'],
          ['Dictate into a text field', 'Open Notes, place the cursor in a note, hold your configured hotkey, speak, and release. Review the pasted text.'],
          ['Add the vocabulary you use', 'Use the personal dictionary for recurring names and terms. If mistakes persist, try another local model with the same sample.'],
        ],
        example: {label: 'Optional Homebrew installation', text: 'brew install --cask muesli'},
        sources: ['muesli'],
      },
      {
        id: 'architecture', title: 'What does TDT mean?',
        paragraphs: ['TDT stands for Token-and-Duration Transducer. The model predicts text tokens and how far to advance through the audio. NVIDIA’s v3 model pairs this decoder with a FastConformer encoder.', 'That architecture is one part of dictation latency. Audio capture, model loading, recognition, optional text cleanup, and paste behavior all contribute to how quickly a sentence reaches your document.'],
        sources: ['parakeet'],
      },
      {
        id: 'measure', title: 'How fast is Parakeet on my Mac?',
        paragraphs: ['Measure the time from releasing the hotkey until the final text appears. Record the Mac chip, app version, model, recording length, and whether cleanup is enabled. Compare the first run after launch with several subsequent runs.', 'A model benchmark on an NVIDIA GPU does not establish end-to-end latency on a Mac. Longer recordings and text cleanup can also change the result. Use the same phrases and settings when comparing Parakeet with Whisper.'],
      },
      {
        id: 'limits', title: 'What should I check if recognition is wrong?',
        paragraphs: ['Confirm that the model supports the language you are speaking. Check the microphone input and try a clear sample without background speech. For names and abbreviations, add dictionary entries and repeat the sample.', 'Parakeet transcribes speech. Meeting speaker labels, echo handling, and summaries are separate parts of Muesli. Choosing Parakeet alone does not guarantee accurate speaker assignments or a particular note format.'],
      },
    ],
    faqs: [
      ['Do I need an NVIDIA GPU to use Parakeet on Mac?', 'No. Muesli uses a CoreML runtime on Apple Silicon for its Parakeet models. NVIDIA GPU instructions for other runtimes do not apply to this setup.'],
      ['Is Parakeet English-only?', 'Parakeet TDT v2 is English-only. TDT v3 supports 25 languages. Check the specific checkpoint rather than assuming all Parakeet models have the same language support.'],
      ['Can Parakeet dictation work offline?', 'Yes, with the local model installed. Use local cleanup or disable cleanup if you want the full dictation workflow to work without internet.'],
      ['Is Parakeet always more accurate than Whisper?', 'No single model is best for every voice, language, or recording. Compare recognition errors and correction effort on examples from your own work.'],
    ],
    related: [['Whisper speech-to-text guide', '/whisper-speech-to-text'], ['Offline dictation comparison', '/best-offline-dictation-apps-mac'], ['Speech-to-text architectures', '/asr-architectures']],
    cta: 'Try Parakeet with your own words.',
    ctaBody: 'Download Muesli, install Parakeet v3, and dictate into your next document.',
  },
};

export { sources as searchGuideSources };
