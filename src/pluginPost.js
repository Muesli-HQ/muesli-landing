export const pluginPost = {
  path: '/blog/muesli-chatgpt-codex-plugin',
  title: 'Use Muesli meeting notes in ChatGPT and Codex',
  description: 'Use the Muesli plugin with ChatGPT and Codex to find meeting transcripts, extract action items, and turn conversations into implementation plans on your Mac.',
  date: '2026-10-20',
  category: 'Agent Guides',
  tags: ['Meeting Notes', 'Local AI', 'Agent Guides'],
  readTime: '4 min read',
  image: '/images/muesli-chatgpt-plugin-live.webp',
  imageAlt: 'ChatGPT and Muesli logos above the announcement Plugin is Live!',
  imageWidth: 1536,
  imageHeight: 1024,
  blocks: [
    { type: 'paragraph', text: 'The Muesli plugin is now available on ChatGPT. It gives you a starting point for working with Muesli through your assistant: finding a meeting, reviewing its transcript, and turning the discussion into useful notes or a plan for your next coding task. [Open the Muesli plugin](https://chatgpt.com/plugins/plugins_6abe2bb24af081919ea718e221cfdafa).' },
    { type: 'heading', text: 'Start with the Muesli plugin' },
    { type: 'paragraph', text: 'Open the plugin listing while signed in to ChatGPT, then follow the installation and setup steps shown for your account. Availability and permissions depend on the ChatGPT or Codex environment you are using. Keep Muesli installed on the Mac that holds your recordings and complete the app’s initial setup before trying a meeting workflow.' },
    { type: 'paragraph', text: 'Muesli’s agent workflow uses the bundled muesli-cli to read saved meetings and dictations. The assistant needs access to that local tool and its data. Installing a plugin does not, by itself, make your Mac’s meeting database accessible to a browser session or a remote coding environment. If your session cannot access local tools, export the meeting as Markdown and attach the file you want it to work with.' },
    { type: 'heading', text: 'Find a meeting and ask for action items' },
    { type: 'paragraph', text: 'Start with a specific request so the assistant can identify the right conversation. Ask it to list candidate meetings before reading one, especially when several recordings have similar titles.' },
    { type: 'quote', text: 'Use Muesli to find my recent product planning meetings. Show me the titles and dates so I can choose one. Then read that meeting’s transcript and extract decisions, action items, owners, and deadlines. Mark anything that was left undecided.' },
    { type: 'paragraph', text: 'Review names and dates against the transcript. Ask for supporting passages when an action item seems ambiguous. A transcript can contain recognition errors, and an assistant can mistake a suggestion for a commitment.' },
    { type: 'heading', text: 'Turn a meeting into a Codex implementation plan' },
    { type: 'paragraph', text: 'In Codex with local shell access, Muesli can supply the meeting context alongside your repository. This is useful after a bug triage, customer interview, or engineering planning session. The assistant can read the discussion, inspect relevant code, and propose the work needed to implement an agreed change.' },
    { type: 'quote', text: 'Read the Muesli meeting I selected and inspect this repository. Map the agreed changes to the relevant files. Draft an implementation plan with open questions and acceptance criteria. Show me the plan before editing code.' },
    { type: 'paragraph', text: 'The local workflow starts with muesli-cli spec to discover the installed commands, followed by meetings list and meetings get with a returned meeting ID. Our [coding agent guide](https://muesli.works/docs/agents/) includes a ready-to-use setup prompt, and the [CLI reference](https://muesli.works/docs/cli/) documents the commands. The [Muesli agent skill](https://github.com/Muesli-HQ/muesli/tree/main/skills/muesli-agent) is the source for this workflow.' },
    { type: 'heading', text: 'Prompts for meeting summaries and follow-ups' },
    { type: 'list', items: [
      'Meeting summary: Summarize this transcript in five bullets, followed by decisions and unresolved questions. Include supporting quotes for the decisions.',
      'Customer interview: Extract pain points, requested features, and examples from this conversation. Keep the customer’s words separate from your interpretation.',
      'Follow-up draft: Draft a concise follow-up from this meeting. Include agreed next steps and owners. Leave missing deadlines unspecified and show me the draft.',
      'Project handoff: Turn the selected transcript into a handoff document with context, decisions, constraints, and next steps for another developer.'
    ] },
    { type: 'heading', text: 'Save reviewed notes back to Muesli' },
    { type: 'paragraph', text: 'When your assistant has local CLI access, it can save reviewed Markdown with meetings update-notes. This replaces the stored formatted notes for the chosen meeting and preserves the raw transcript. Ask to see the draft first, and retain a copy of existing notes if you need them. The [write-back instructions](https://muesli.works/docs/agents/#write-back) show the exact command.' },
    { type: 'heading', text: 'What stays on your Mac?' },
    { type: 'paragraph', text: 'Muesli runs speech recognition locally and stores meeting data on your Mac. When ChatGPT or a hosted Codex model reads a transcript, that text becomes part of the assistant’s context and may be processed by its provider. Choose which meetings to share and review the permissions presented during setup.' },
    { type: 'heading', text: 'If the assistant cannot find your meetings' },
    { type: 'list', items: [
      'Open Muesli and confirm the recording appears in your meeting history.',
      'Check that the assistant is running on the Mac containing those meetings and has the local access needed for the task.',
      'For a command-not-found error, follow the PATH setup in the CLI quickstart. The CLI is bundled inside Muesli.app.',
      'Use muesli-cli spec to check the commands supported by your installed version. For a browser-only workflow without local access, export and attach the selected transcript.'
    ] },
    { type: 'paragraph', text: '[Get the Muesli plugin](https://chatgpt.com/plugins/plugins_6abe2bb24af081919ea718e221cfdafa), or begin with the [local CLI quickstart](https://muesli.works/docs/). If you have yet to record a conversation, see how [meeting transcription in Muesli](https://muesli.works/meeting-notes/) works.' }
  ]
};
