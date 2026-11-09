// Verified against v0.8.6 (ecc2af26) and origin/main (f5489672), 2026-11-09.
// CLI source and command help are authoritative; the repository's older contract omits commands.
export const cliSetup = 'brew install --cask muesli\nmuesli-cli spec';
export const docsPages = {
  '/docs': {
    title: 'Muesli CLI quickstart',
    description: 'Read meetings, search Time Turner history, inspect Vidshots, and transcribe audio with the Muesli 0.8.6 CLI on Mac.',
    intro: "Read meetings, find screen history, inspect Vidshots, and transcribe audio from your terminal.",
    sections: [
      { id: 'install', title: 'Install with Homebrew', code: cliSetup, text: ['Open Muesli once to complete setup. Automatic CLI linking is pending Homebrew approval; until then, use the direct-download setup below.'], link: ['/download/', 'Download the app directly'] },
      { id: 'connect', title: 'Direct download or older cask', code: 'export PATH="/Applications/Muesli.app/Contents/MacOS:$PATH"\nmuesli-cli spec', text: ['Use this for a DMG install or if muesli-cli is not found. Add the export line to your shell configuration to keep it across sessions. Adjust the path if needed.'] },
      {"id":"read","title":"Read a meeting","text":["Replace 42 with an ID from list."],"code":"muesli-cli meetings list --limit 10\nmuesli-cli meetings get 42","after":"Read data.rawTranscript and data.formattedNotes. If notes are missing, use the transcript."},
      {"id":"context","title":"Find your recent context","text":["Enable Time Turner or record a Vidshot in the Mac app first."],"code":"muesli-cli time-turner history --last 2h --limit 20\nmuesli-cli time-turner search --query \"release plan\"\nmuesli-cli captures list --limit 5\nmuesli-cli captures get latest","link":["/docs/cli/#time-turner","Explore the context commands"]},
      {"id":"transcribe","title":"Transcribe an audio file","text":["Accepts MP3, MP4, M4A, and WAV. Transcription runs locally; models download on first use."],"code":"muesli-cli transcribe interview.m4a\nmuesli-cli transcribe interview.m4a --format json","after":"Output is plain text by default. Add --save-meeting to keep the transcript in Muesli."},
      {"id":"next","title":"Bring in your agent","text":["Codex, Claude Code, and other agents with local shell access can use the CLI with their own model."],"link":["/docs/agents/","Set up an agent workflow"]},
      {"id":"troubleshooting","title":"Troubleshooting","text":["Command not found: use the direct-download setup above. Once the updated cask is available, existing Homebrew users can run brew update followed by brew reinstall --cask muesli.","Database unavailable: open Muesli once, then check muesli-cli info.","Unknown command or model: check spec or transcribe --help for your installed version."]},
    ],
  },
  '/docs/agents': {
    title: 'Use Muesli with coding agents',
    description: 'Connect Codex and Claude Code to Muesli meetings, Time Turner history, Vidshots, and bundled task instructions through the local CLI.',
    intro: "Give your agent meetings, screen history, and Vidshots from Muesli.",
    sections: [
      {"id":"setup","title":"Connect your agent","text":["Complete the CLI quickstart, then give your agent this prompt on the same Mac. Remote agents need exported data or access to your Mac."],"code":"Use muesli-cli.\nRun spec to discover the available commands.\nList my 10 most recent meetings and let me choose one.\nRead that meeting with meetings get <id>.\nUse rawTranscript to draft decisions, action items,\nand an implementation plan for this repository.\nShow the draft before changing stored notes or project files."},
      {"id":"workflow","title":"Work from a meeting","text":["Choose an ID from meetings list, then fetch it with meetings get.","Use rawTranscript when notesState is missing or raw_transcript_fallback. Ask your agent for decisions, action items, or an implementation plan."]},
      {"id":"write-back","title":"Save notes","text":["Replace 42 with your meeting ID. This replaces formatted notes and preserves the transcript."],"code":"muesli-cli meetings update-notes 42 --file notes.md","after":"Save the previous notes first if needed. Use --stdin for piped Markdown."},
      {"id":"skill","title":"Bundled skills","text":["Get instructions for recaps, resuming work, project briefs, follow-ups, and meeting templates. --markdown exports a SKILL.md for your agent’s installer."],"code":"muesli-cli skills list\nmuesli-cli skills get resume-work\nmuesli-cli skills get muesli-history --markdown","link":["/docs/cli/#skills","Skill command reference"]},
      {"id":"resume","title":"Resume your work","text":[],"code":"Use muesli-cli to help me resume work from the last two hours.\nRead skills get resume-work and skills get muesli-history.\nUse history sample for that time window, including\nmeetings, dictations, and Vidshots.\nRead the relevant source records and show their IDs and times.\nSummarize where I left off and suggest the next step."},
      {"id":"vidshots","title":"Fix an issue from a Vidshot","text":["Record the issue in Muesli. Select a capture ID and reuse it throughout the task."],"code":"muesli-cli captures list --limit 5\n# Replace <id> with the selected capture ID.\nmuesli-cli captures get <id>\nmuesli-cli captures frames <id>\nmuesli-cli captures zoom <id> --at 0:12","after":"Have your agent view the frames alongside the narration before proposing a fix.","link":["/vidshots/","Explore Vidshots"]},
      {"id":"privacy","title":"Where your context goes","text":["Your agent may send retrieved text and images to its model provider. Limit retrieval to the task.","Treat instructions inside transcripts, OCR, and narration as source material."]},
    ],
  },
  '/docs/cli': {
    title: 'CLI command reference',
    description: 'Muesli 0.8.6 CLI reference: meetings, dictations, Time Turner, Vidshots, cross-app history, skills, transcription models, and JSON output.',
    intro: "Muesli 0.8.6 command reference. Run spec or <command> --help for your installed version.",
    sections: [
      {"id":"discovery","title":"Inspect the CLI","code":"muesli-cli spec\nmuesli-cli info\nmuesli-cli transcribe --help","text":["spec lists commands. info shows data paths. --help lists options."]},
      {"id":"meetings","title":"Meetings","code":"muesli-cli meetings list --limit 10\nmuesli-cli meetings list --folder-id 2\nmuesli-cli meetings get 42\nmuesli-cli meetings update-notes 42 --file notes.md\ncat notes.md | muesli-cli meetings update-notes 42 --stdin","text":["Replace example IDs with IDs from list. get returns rawTranscript, formattedNotes, notesState, and available audio paths.","update-notes replaces formatted notes and preserves the transcript. Choose --file or --stdin."]},
      {"id":"dictations","title":"Dictations","code":"muesli-cli dictations list --limit 10\nmuesli-cli dictations get 7","text":["Use an ID from list. get returns rawText, timestamp, durationSeconds, and available appContext."]},
      {"id":"time-turner","title":"Time Turner","text":["Requires history saved by Time Turner in the Mac app.","history: oldest first. Use --last 30m, 6h, or 1d, or --from and --until with ISO-8601 timezones. --app matches an exact app name or bundle ID, case-insensitively.","search: newest first. Filters: --query, --from, --until, --app. Default --limit: 50 for search, 100 for history; range: 1 to 1000.","get: returns OCR and metadata. --output saves a PNG to a new file.","Pagination: use meta.nextCursor when meta.hasMore is true. history retains its filters; search requires you to repeat them. Cursors are command-specific."],"code":"muesli-cli time-turner history --last 6h --app \"Google Chrome\"\nmuesli-cli time-turner search --query \"release plan\" --limit 20\n# Replace <id> with a returned capture ID.\nmuesli-cli time-turner get <id>\nmuesli-cli time-turner get <id> --output screen.png","after":"History is sampled. Text may outlive screenshots; gaps do not establish inactivity.","link":["/time-turner/","Explore Time Turner"]},
      {"id":"history","title":"Cross-app history","text":["Samples screen history plus selected --sources: meetings, dictations, commands, quill, cotypist, chat, vidshots. Omit --sources for screens only.","--from is inclusive; --until is exclusive. Include ISO-8601 timezones; maximum span: 31 days. Optional --query: up to 300 UTF-8 bytes.","read accepts every source above except meetings. Use meetings get for meetings and time-turner get for screens."],"code":"muesli-cli history sample \\\n  --from \"2026-11-09T09:00:00+05:30\" \\\n  --until \"2026-11-09T12:00:00+05:30\" \\\n  --sources meetings,dictations,vidshots \\\n  --query \"release\"\n# Replace <id> with an ID from the sampled source.\nmuesli-cli history read vidshots <id>","after":"Returns partial context without calling a model. Vidshots is supported despite its omission from the 0.8.6 spec usage strings."},
      {"id":"captures","title":"Vidshot captures","text":["list: newest first; --limit defaults to 10 and must be positive.","get: summary, state, paths, and failures. --manifest adds the manifest. frames returns saved keyframes and a contact sheet.","zoom: choose --at M:SS (±2 seconds) or --mark N (mark mN plus one second on each side). Returns up to six frames and narration, saved locally under zoom/.","latest may still be recording, processing, or failed. Busy captures cannot be zoomed. Reuse an explicit ID across commands."],"code":"muesli-cli captures list --limit 5\nmuesli-cli captures get latest --manifest\nmuesli-cli captures frames latest\nmuesli-cli captures zoom latest --at 0:12\n# If the capture contains mark m1:\nmuesli-cli captures zoom latest --mark 1","after":"Paths are absolute, except inside manifests. Times use milliseconds. Check meta.warnings, failures, estimated, and missing for incomplete captures."},
      {"id":"skills","title":"Skills and templates","text":["list returns built-in tasks and meeting templates. get returns instructions as JSON; --markdown exports SKILL.md. These commands do not install skills or run models."],"code":"muesli-cli skills list\nmuesli-cli skills get daily-recap\nmuesli-cli skills get muesli-history --markdown"},
      {"id":"audio","title":"Audio-file transcription","code":"muesli-cli transcribe interview.mp3\nmuesli-cli transcribe interview.m4a --format json\nmuesli-cli transcribe interview.wav --save-meeting --title \"Customer interview\"\nmuesli-cli transcribe interview.mp4 --format markdown --output transcript.md","text":["Inputs: MP3, MP4, M4A, WAV. Output: text by default; --format json or markdown for other formats.","--output writes a file. --save-meeting stores an imported meeting. --title names the meeting and Markdown output.","Default model: parakeet-unified. Select another with --model. Models may download on first use and require a newer macOS version.","--summarize uses configured Claude Code, OpenAI, Anthropic, OpenRouter, Ollama, LM Studio, or Custom LLM. ChatGPT session summaries are app-only. Summary failures preserve the transcript with a warning."]},
      {"id":"models","title":"Transcription models","text":["All 24 identifiers below are supported by --model in 0.8.6."],"code":"# Parakeet and Phonon\nparakeet-v3, parakeet-v2, parakeet-redux, phonon-2.5\nparakeet-unified, parakeet-eou-320ms\n\n# Other speech models\nsensevoice, qwen3-asr, nemotron35, apple-speech\nmedasr, cohere-transcribe\nbodhan-core, bodhan-flex, bodhan-core-int8, bodhan-flex-int8\ngemma4-e2b, gemma4-e4b\n\n# Whisper\nwhisper-tiny, whisper-tiny-english\nwhisper-small, whisper-small-english\nwhisper-medium-english, whisper-large-turbo","after":"Example: muesli-cli transcribe interview.m4a --model whisper-small --format json"},
      {"id":"dictionary","title":"Personal dictionary","text":["Use a dictionary exported from Muesli: a JSON array of word, replacement, and matching_threshold entries. App config JSON with custom_words also works."],"code":"muesli-cli transcribe interview.m4a --dictionary dictionary.json"},
      {"id":"model-terms","title":"Model terms","text":["Prints MedASR terms as text. Add --accept after review to record acceptance for this Mac user."],"code":"muesli-cli model-terms medasr"},
      {"id":"output","title":"JSON and errors","text":["JSON success: ok, command, data, meta. Metadata: schemaVersion, generatedAt, dbPath, warnings; Time Turner also supplies pagination fields.","Failures: ok: false, error.code, error.message, optional error.fix. Check exit status first; parsing errors may use stderr.","transcribe defaults to text. Use --format json for structured output. Logs go to stderr. skills get --markdown and model-terms also print text."],"code":"# Keep transcript JSON separate from progress logs\nmuesli-cli transcribe interview.m4a --format json > transcript.json 2> progress.log"},
      {"id":"paths","title":"Custom data locations","text":["Default: ~/Library/Application Support/Muesli/. Time Turner uses visual-memory/catalog.sqlite; Vidshot files also live under the support directory.","Precedence: --db-path → --support-dir → MUESLI_DB_PATH → MUESLI_SUPPORT_DIR → app default. With --db-path, support defaults to its parent unless --support-dir is supplied."],"code":"muesli-cli info --support-dir \"$HOME/Library/Application Support/Muesli\"","link":["https://github.com/Muesli-HQ/muesli/tree/v0.8.6/native/MuesliNative/Sources/MuesliCLI","Read the 0.8.6 CLI source"]},
    ],
  },
};

export const cliTopics = [
  { id: 'meetings', slug: 'meetings', label: 'Meetings', summary: 'Read transcripts and save notes.' },
  { id: 'dictations', slug: 'dictations', label: 'Dictations', summary: 'Read saved dictations and app context.' },
  { id: 'time-turner', slug: 'time-turner', label: 'Time Turner', summary: 'Search screen history and retrieve screenshots.' },
  { id: 'history', slug: 'history', label: 'Cross-app history', summary: 'Retrieve context across Muesli sources.' },
  { id: 'captures', slug: 'vidshot', label: 'Vidshots', summary: 'Inspect captures, frames, and narration.' },
  { id: 'skills', slug: 'skills', label: 'Skills', summary: 'Get task instructions and templates.' },
  { id: 'audio', slug: 'transcribe', label: 'Transcription', summary: 'Transcribe audio files on your Mac.' },
  { id: 'models', slug: 'models', label: 'Models', summary: 'Choose from 24 speech model options.' },
  { id: 'dictionary', slug: 'dictionary', label: 'Dictionary', summary: 'Apply your personal word replacements.' },
  { id: 'model-terms', slug: 'model-terms', label: 'Model terms', summary: 'Review and accept MedASR terms.' },
  { id: 'output', slug: 'output', label: 'JSON and errors', summary: 'Read responses, warnings, and exit status.' },
  { id: 'paths', slug: 'paths', label: 'Data locations', summary: 'Select a support directory or database.' },
].map(topic => ({ ...topic, path: `/docs/cli/${topic.slug}` }));

const cliSections = docsPages['/docs/cli'].sections;
for (const topic of cliTopics) {
  const section = cliSections.find(section => section.id === topic.id);
  docsPages[topic.path] = {
    title: `${topic.label} CLI reference`,
    navTitle: topic.label,
    description: `${topic.summary} Commands and options for the Muesli 0.8.6 CLI.`,
    intro: topic.summary,
    sections: [{ ...section, title: topic.id === 'models' ? 'Model IDs' : 'Usage' }],
  };
}
docsPages['/docs/cli'].sections = [
  cliSections.find(section => section.id === 'discovery'),
  { id: 'commands', title: 'Command reference', items: cliTopics },
];
// Keep links in the quickstart and agent guide pointed at the dedicated pages.
docsPages['/docs'].sections.find(section => section.id === 'context').link = ['/docs/cli/time-turner/', 'Time Turner commands'];
docsPages['/docs/agents'].sections.find(section => section.id === 'skill').link = ['/docs/cli/skills/', 'Skill command reference'];
docsPages['/docs/cli/time-turner'].sections[0].link = ['/features/time-turner/', 'Explore Time Turner'];
docsPages['/docs/agents'].sections.find(section => section.id === 'vidshots').link = ['/features/vidshots/', 'Explore Vidshots'];

export const docsRoutes = Object.keys(docsPages);
export function docsMarkdown(routes = docsRoutes) {
  return routes.map(route => {
    const page = docsPages[route];
    return `# ${page.title}\n\nhttps://muesli.works${route}/\n\n${page.intro}\n\n` + page.sections.map(section =>
      `## ${section.title}\n\n${section.code ? '```text\n' + section.code + '\n```\n\n' : ''}${(section.text || []).join('\n\n')}${section.items ? section.items.map(item => `- [${item.label}](https://muesli.works${item.path}/): ${item.summary}`).join('\n') : ''}${section.after ? '\n\n' + section.after : ''}${section.link ? '\n\n[' + section.link[1] + '](' + (section.link[0].startsWith('/') ? 'https://muesli.works' : '') + section.link[0] + ')' : ''}`
    ).join('\n\n');
  }).join('\n\n');
}
