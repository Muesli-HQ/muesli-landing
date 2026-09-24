// Bodhan articles and their shared page/social metadata.
export const bodhanPosts = [
  {
    "path": "/blog/hinglish-indic-meeting-notes-mac",
    "title": "Hinglish and Indic language meeting notes on Mac with Muesli",
    "description": "Create meeting notes from Hinglish, English, and Indic conversations on Mac. Use Bodhan for local transcription in Muesli, then review summaries and action items.",
    "date": "2026-09-24",
    "category": "Meeting Notes",
    "tags": [
      "Meeting Notes",
      "Model Guides",
      "Local AI"
    ],
    "readTime": "4 min read",
    "image": "/images/bodhan/udaipur-jagniwas-1767.jpg",
    "imageAlt": "Maharana Ari Singh and his courtiers at the Jagniwas Water Palace in Udaipur, painted in 1767",
    "artTitle": "Maharana Ari Singh with His Courtiers Being Entertained at the Jagniwas Water Palace",
    "artArtist": "Bhima, Kesu Ram, Bhopa, and Nathu",
    "artArtists": [
      "Bhima",
      "Kesu Ram",
      "Bhopa",
      "Nathu"
    ],
    "artDate": "1767",
    "artCollection": "The Metropolitan Museum of Art",
    "artSource": "https://www.metmuseum.org/art/collection/search/38007",
    "imageWidth": 1200,
    "imageHeight": 962,
    "blocks": [
      {
        "type": "paragraph",
        "text": "Muesli can turn a Hinglish or Indic-language meeting into a local transcript using Bodhan Core or Flex on an Apple Silicon Mac. You can then generate structured meeting notes with your configured summarization model. Bodhan support starts with Muesli 0.8.4 and requires macOS 15 or later. [Muesli’s versioned model and meeting guide](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/README.md)"
      },
      {
        "type": "paragraph",
        "text": "The speech recognition models are developed by [Bodhan AI](https://bodhan.ai/). Read the team’s [Indic-Transcribe research article](https://bodhan.ai/research/blogs/indic-transcribe) for the model family, language coverage, and output modes. Muesli adapts Core and Flex for local use on Apple Silicon."
      },
      {
        "type": "heading",
        "text": "Keep the Hindi, English, and decisions together"
      },
      {
        "type": "paragraph",
        "text": "A project discussion may move from Hindi explanations to English product names, deadlines, and technical details. A Tamil or Bengali conversation can follow the same pattern. Useful meeting notes need to retain the decision, who owns the next step, and when it is due, whichever language carried that information."
      },
      {
        "type": "paragraph",
        "text": "Start with the transcript as the record of what was said. Then review the summary against it. A short, polished action item can still contain the wrong name or date if an earlier transcription error passes through."
      },
      {
        "type": "heading",
        "text": "Choose Bodhan for the meeting transcript"
      },
      {
        "type": "paragraph",
        "text": "Muesli offers Core for native-script output and Flex for mixed-script output. For a Hindi-English meeting, Flex is a practical first model to try: Hindi appears in Devanagari while English terms can remain in Latin letters. Muesli 0.8.4 does not expose Flex’s upstream Romanized-output mode as an app setting."
      },
      {
        "type": "paragraph",
        "text": "Both models cover India’s 22 scheduled languages. Core supports 25 languages in total and Flex supports 27, including English. Choose the main language of the discussion or evaluate automatic detection on a short sample. Coverage does not guarantee equal results for every accent, overlapping conversation, or combination of languages. [Bodhan Core](https://huggingface.co/bodhan-ai/indic-transcribe-core) and [Flex](https://huggingface.co/bodhan-ai/indic-transcribe-flex) model cards describe the upstream models."
      },
      {
        "type": "heading",
        "text": "Set up a Hinglish or Indic-language meeting"
      },
      {
        "type": "list",
        "items": [
          "Download and prepare Bodhan Core or Flex in Muesli’s Models tab. Choose the language and FP16 or INT8 variant you want to use.",
          "Select Bodhan as the meeting transcription model. Check which model is responsible for the final transcript if you also use a live-transcript mode.",
          "Check microphone and system-audio capture with a short call. Confirm that both your voice and the remote participant’s voice appear in the saved transcript.",
          "Let participants know you are recording, start a meeting recording in Muesli, and use your usual call app.",
          "After the meeting, review the transcript before sharing the notes. Check names, quantities, deadlines, and any words spoken while people were talking over one another."
        ]
      },
      {
        "type": "paragraph",
        "text": "Muesli captures microphone and system audio on your Mac. It does not need a separate meeting bot to join the call. Bodhan is a final-transcription model in Muesli; selecting it does not provide a Bodhan-powered streaming caption mode. See the [meeting transcription overview](https://muesli.works/meeting-notes/) for the recording workflow."
      },
      {
        "type": "heading",
        "text": "Turn the transcript into meeting notes"
      },
      {
        "type": "paragraph",
        "text": "Bodhan handles speech recognition. Muesli’s configured summary model creates the meeting notes from the transcript. Available summary options include OpenAI, OpenRouter, a ChatGPT subscription connection, and local Ollama models. Choose a summary model that handles the languages in your discussion, then use a built-in or custom meeting template."
      },
      {
        "type": "paragraph",
        "text": "Decide how your team wants to read the notes: English, an Indic language, or a mixture that preserves the original terminology. You can include that preference in a custom template. Treat the following as a suggested instruction to evaluate with your chosen summary model:"
      },
      {
        "type": "paragraph",
        "text": "“Write the meeting notes in English. Preserve people’s names, product names, and quoted Hindi or other Indic phrases. List decisions, open questions, and action items with an owner and due date only when the transcript states them. Mark unclear details for review.”"
      },
      {
        "type": "paragraph",
        "text": "For Hindi notes, change the requested output language to Hindi and specify how English technical terms should appear. The result depends on the summarization model and the quality of the transcript. Review the notes alongside the original conversation before assigning work."
      },
      {
        "type": "heading",
        "text": "A short Hindi-English meeting to test"
      },
      {
        "type": "paragraph",
        "text": "Try a two-person practice call with a task, an owner, and a deadline. One person could say, “Riya design update Thursday ko bhejegi.” The other could add, “English summary mein pending questions bhi include karna.” These are sample prompts for your own evaluation, rather than recorded benchmark results."
      },
      {
        "type": "list",
        "items": [
          "Confirm that Riya is attached to the design update and Thursday remains the deadline.",
          "Check that the request to include pending questions survives in the notes.",
          "Read English feature names and Hindi phrasing against the recording.",
          "Try a second sample with the Indic language and vocabulary your team uses most often."
        ]
      },
      {
        "type": "heading",
        "text": "What stays on your Mac?"
      },
      {
        "type": "paragraph",
        "text": "Bodhan transcription runs locally after its assets are downloaded and prepared. Hosted summary providers receive the transcript text used to generate notes. If you want local summarization too, configure a local Ollama model and test its ability to handle your meeting’s languages. Review optional sync and processing settings as part of that setup."
      },
      {
        "type": "heading",
        "text": "Can I export or use the notes with coding agents?"
      },
      {
        "type": "paragraph",
        "text": "Muesli supports PDF and Markdown export for meeting notes and transcripts. Its bundled CLI also lets local coding agents read saved meeting records and write updated notes. A useful workflow is to review a Hinglish technical discussion, then ask your agent to turn the confirmed action items into an implementation plan. Hosted agents may receive the text you provide. See the [coding-agent documentation](https://muesli.works/docs/agents/)."
      },
      {
        "type": "paragraph",
        "text": "[Download Muesli](https://muesli.works/download/) to try a short meeting with Bodhan. For individual messages and documents, read [Hinglish and Indic language dictation on Mac with Muesli](https://muesli.works/blog/hinglish-dictation-mac/)."
      }
    ]
  },
  {
    "path": "/blog/hinglish-dictation-mac",
    "title": "Hinglish and Indic language dictation on Mac with Muesli",
    "description": "Dictate in Hinglish, English, and Indic languages on Mac with Muesli and Bodhan. Set up local speech-to-text and compare native and mixed-script output.",
    "date": "2026-09-24",
    "category": "Model Guides",
    "tags": [
      "Model Guides",
      "Dictation",
      "Local AI"
    ],
    "readTime": "5 min read",
    "image": "/images/bodhan/taj-mahal-1880.jpg",
    "imageAlt": "A View of the Taj Mahal, an 1880 watercolor by Koodrutoollah",
    "artTitle": "A View of the Taj Mahal",
    "artSource": "https://www.metmuseum.org/art/collection/search/910558",
    "imageWidth": 1200,
    "imageHeight": 899,
    "blocks": [
      {
        "type": "paragraph",
        "text": "Muesli brings local Hindi-English dictation to Apple Silicon Macs through Bodhan Core and Flex. For Hinglish speech, start with Bodhan Flex: Muesli uses its mixed-script mode, which writes Hindi in Devanagari and keeps English terms in Latin letters. Bodhan support is available from Muesli 0.8.4 and requires macOS 15 or later. [Muesli 0.8.4 model guide](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/README.md)"
      },
      {
        "type": "paragraph",
        "text": "The speech recognition models are developed by [Bodhan AI](https://bodhan.ai/). Read the team’s [Indic-Transcribe research article](https://bodhan.ai/research/blogs/indic-transcribe) for the model family, language coverage, and output modes. Muesli adapts Core and Flex for local use on Apple Silicon."
      },
      {
        "type": "paragraph",
        "text": "A message to a teammate might start in Hindi, include English product names, and end with a deadline in English. Muesli lets you try that Hindi-English workflow in the text field where you already write. Check that the transcript preserves both languages and the details that make the message useful."
      },
      {
        "type": "heading",
        "text": "What does Hindi-English dictation need to capture?"
      },
      {
        "type": "paragraph",
        "text": "Hinglish combines Hindi and English within a conversation or sentence. You might explain a task in Hindi and use English for a software feature, a project name, or an entire reply. When choosing a Hindi-English dictation app, try the vocabulary you actually use: colleagues, amounts, dates, and English technical terms."
      },
      {
        "type": "paragraph",
        "text": "The written result matters too. Some readers prefer Hindi in Devanagari with English words left in Latin letters. Others write the whole message using the Latin alphabet. Decide which form you want before judging a transcript."
      },
      {
        "type": "heading",
        "text": "Choosing Bodhan Flex for Hindi and English in Muesli"
      },
      {
        "type": "paragraph",
        "text": "Bodhan AI describes Flex as supporting code-mixed speech, including Hinglish. Its upstream model offers native-script, mixed-script, and Romanized output. [Bodhan Flex model card](https://huggingface.co/bodhan-ai/indic-transcribe-flex)"
      },
      {
        "type": "paragraph",
        "text": "Muesli 0.8.4 selects mixed-script output for Flex and native-script output for Core. Flex is a useful starting point for a Hindi message that includes English software names or workplace vocabulary. Core is another option to evaluate when you prefer native-script writing. [Versioned Bodhan backend](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/native/MuesliNative/Sources/MuesliNativeApp/BodhanBackend.swift)"
      },
      {
        "type": "paragraph",
        "text": "For example, “आज design review है” illustrates Devanagari mixed with Latin letters. “Aaj design review hai” illustrates fully Romanized Hinglish. These are written examples of the two formats, not measured transcription results. Muesli 0.8.4 does not expose a Romanized output selector; its Flex integration uses mixed script."
      },
      {
        "type": "heading",
        "text": "Dictation in other Indic languages"
      },
      {
        "type": "paragraph",
        "text": "The same Muesli workflow supports Bengali, Tamil, Telugu, Marathi, Malayalam, Gujarati, Kannada, and the other languages covered by Bodhan. Choose the language you plan to speak, then try a short message with the English names and technical terms you normally use. Core writes native-script text; Flex uses mixed-script output. Test your own language combination before using it for a longer document."
      },
      {
        "type": "heading",
        "text": "Set up Hindi-English speech-to-text on your Mac"
      },
      {
        "type": "list",
        "items": [
          "Install Muesli 0.8.4 or later on an Apple Silicon Mac running macOS 15 or later. Complete the microphone, hotkey, and paste-permission steps in onboarding.",
          "Open Models, find Bodhan Flex, and choose an FP16 or INT8 variant. Download the model and wait for preparation to finish.",
          "Select Hindi for a Hindi-led message containing English words. Automatic language detection is also available; compare it with an explicit selection using your own speech.",
          "Place your cursor in the text field where you want to write. Hold your configured dictation hotkey, speak a short message, and release it.",
          "Review the inserted text. Check names, English terms, numbers, and the Hindi wording before sending."
        ]
      },
      {
        "type": "paragraph",
        "text": "For the broader language setup, see our [Indian-language dictation guide](https://muesli.works/blog/indian-language-dictation-mac/). The [Bodhan release article](https://muesli.works/blog/bodhan-indic-transcription-mac/) covers both model choices and their language coverage."
      },
      {
        "type": "heading",
        "text": "Five Hindi-English phrases to try with your own voice"
      },
      {
        "type": "paragraph",
        "text": "These original prompts are a small evaluation checklist. They are written in Latin letters so you can read them aloud; Flex output in Muesli may contain Devanagari. We have not benchmarked these sentences or compared their output across apps."
      },
      {
        "type": "list",
        "items": [
          "“Aaj design review ke baad updated mockup bhej dena.” Check whether design review and mockup remain recognizable.",
          "“Neha ko Friday tak invoice bhejna hai.” Check the person’s name and the deadline.",
          "“Is order mein 12 notebooks aur 3 pens hain.” Check both quantities against what you said.",
          "“Login ho raha hai, lekin export button kaam nahi kar raha.” Check that the problem with the export button is preserved.",
          "“Pehle Hindi mein explain karunga, then we can discuss the implementation.” Check the transition into a longer English phrase."
        ]
      },
      {
        "type": "paragraph",
        "text": "Use the same microphone and a quiet room for the first pass. Then try a typical recording environment. Note how many corrections each message needs and how long it takes to become ready to send. That gives you a practical measure of whether dictation helps your writing."
      },
      {
        "type": "heading",
        "text": "Local transcription and optional AI processing"
      },
      {
        "type": "paragraph",
        "text": "After the model assets are downloaded and prepared, Bodhan speech recognition runs on your Mac. Muesli uses a CoreML encoder and an MLX Swift decoder. You can dictate with Bodhan without a hosted speech-to-text service. See [how the Apple Silicon integration works](https://muesli.works/blog/bodhan-coreml-mlx-apple-silicon/)."
      },
      {
        "type": "paragraph",
        "text": "Optional cleanup and meeting summaries have separate model settings. A hosted provider can receive transcript text when you enable it. For your first Hinglish test, turn off optional cleanup so you can review the recognition output directly. If you later enable cleanup, check that it preserves your language mix and preferred script."
      },
      {
        "type": "heading",
        "text": "Can I use Bodhan for Hindi-English meetings?"
      },
      {
        "type": "paragraph",
        "text": "Bodhan is also available for [meeting transcription in Muesli](https://muesli.works/meeting-notes/). Try a short discussion before relying on it for a longer meeting. Review speaker changes, overlapping speech, and action items, especially when a deadline or quantity matters. A dictation test with one speaker does not establish accuracy for a group conversation."
      },
      {
        "type": "heading",
        "text": "Is Hinglish dictation free in Muesli?"
      },
      {
        "type": "paragraph",
        "text": "Muesli is a free, open-source app. Local Bodhan transcription requires a model download and a compatible Mac. Any hosted service you choose for optional cleanup or summaries has its own access requirements and costs."
      },
      {
        "type": "heading",
        "text": "Can Muesli write Hinglish entirely in English letters?"
      },
      {
        "type": "paragraph",
        "text": "In version 0.8.4, Flex uses mixed-script output and Core uses native-script output. There is no in-app selector for fully Romanized Hinglish. If Latin-only writing is essential to your workflow, evaluate that requirement separately before choosing your dictation setup."
      },
      {
        "type": "heading",
        "text": "Does Bodhan cover other Indian languages?"
      },
      {
        "type": "paragraph",
        "text": "Both Bodhan models cover India’s 22 scheduled languages. Core supports 25 languages in total and Flex supports 27. Availability for a language does not establish accuracy for every accent or English-mixed conversation. Try a sample in the language combination you use. [Bodhan Core model card](https://huggingface.co/bodhan-ai/indic-transcribe-core)"
      },
      {
        "type": "paragraph",
        "text": "[Download Muesli](https://muesli.works/download/), choose Bodhan Flex, and try a short Hindi-English message in your usual writing app."
      },
      {
        "type": "paragraph",
        "text": "For team conversations, see [Hinglish and Indic language meeting notes on Mac with Muesli](https://muesli.works/blog/hinglish-indic-meeting-notes-mac/)."
      }
    ],
    "artArtist": "Koodrutoollah",
    "artDate": "1880",
    "artCollection": "The Metropolitan Museum of Art"
  },
  {
    "path": "/blog/bodhan-indic-transcription-mac",
    "title": "Bodhan comes to Mac: Indic speech-to-text in Muesli 0.8.4",
    "description": "Use Bodhan Core and Flex locally on your Mac with Muesli 0.8.4, with support for India's 22 scheduled languages and English.",
    "date": "2026-09-23",
    "category": "Model Guides",
    "tags": [
      "Model Guides",
      "Dictation",
      "Local AI"
    ],
    "readTime": "3 min read",
    "image": "/images/bodhan/damayanti.jpg",
    "imageAlt": "Hamsa Damayanti by Raja Ravi Varma",
    "artTitle": "Hamsa Damayanti",
    "artSource": "https://commons.wikimedia.org/wiki/File:Ravi_Varma-Princess_Damayanthi_talking_with_Royal_Swan_about_Nala.jpg",
    "imageWidth": 2448,
    "imageHeight": 4256,
    "blocks": [
      {
        "type": "paragraph",
        "text": "Muesli is the first macOS dictation app to publicly release support for Bodhan Core and Flex. Available in Muesli 0.8.4, the two models run locally on Apple Silicon Macs for dictation and meeting transcription. Both cover India's 22 scheduled languages. Core supports 25 languages in total, while Flex supports 27. You can download either model inside Muesli and use it on macOS 15 or later. [Muesli 0.8.4 documentation](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/README.md)"
      },
      {
        "type": "paragraph",
        "text": "A conversation can move between Hindi and English in the same sentence. A colleague might explain a problem in Tamil, then use the English name of a product or a technical term. Those are useful cases to try with Bodhan in Muesli: dictate a message, capture a discussion, or turn a spoken idea into a first draft."
      },
      {
        "type": "heading",
        "text": "Two models in the Models tab"
      },
      {
        "type": "paragraph",
        "text": "Muesli offers Bodhan Core and Bodhan Flex as separate choices. Core produces native-script output. Flex uses mixed-script output, keeping Indic words in their script and English terms in Latin letters, with support for spoken-number formatting. You can compare their output using the same short recording and choose the model that fits how you write. [Muesli's Bodhan integration](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/README.md)"
      },
      {
        "type": "paragraph",
        "text": "Both model cards offer FP16 and INT8 downloads. Select a precision and language, download the model, and let preparation finish before your first dictation. Muesli also supports automatic language detection."
      },
      {
        "type": "heading",
        "text": "Language coverage"
      },
      {
        "type": "paragraph",
        "text": "The shared coverage includes Assamese, Bengali, Bodo, Dogri, Gujarati, Hindi, Kannada, Kashmiri, Konkani, Maithili, Malayalam, Manipuri, Marathi, Nepali, Odia, Punjabi, Sanskrit, Santali, Sindhi, Tamil, Telugu, and Urdu. English, Bhojpuri, and Bhili bring Core's total to 25. Flex additionally includes Chhattisgarhi and Haryanvi. [Bodhan Core model card](https://huggingface.co/bodhan-ai/indic-transcribe-core), [Bodhan Flex model card](https://huggingface.co/bodhan-ai/indic-transcribe-flex)"
      },
      {
        "type": "paragraph",
        "text": "Language support is a starting point for evaluation. Try the names, accents, and vocabulary you use every day. Read through dates and numbers before sending a transcript to someone else."
      },
      {
        "type": "heading",
        "text": "Running Bodhan locally"
      },
      {
        "type": "paragraph",
        "text": "We adapted Bodhan for Muesli with a CoreML encoder and a native MLX Swift decoder. The speech recognition runs on your Mac after the required model assets are downloaded. Muesli handles model selection, recording, and dictation into the app where you are writing. [Implementation in Muesli 0.8.4](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/native/MuesliNative/Sources/MuesliNativeApp/BodhanCoreML.swift)"
      },
      {
        "type": "paragraph",
        "text": "Meeting summaries and optional text-processing features have their own model settings. If you enable a hosted service for those steps, review what text it receives. Local speech recognition describes the Bodhan transcription step."
      },
      {
        "type": "heading",
        "text": "Try your first dictation"
      },
      {
        "type": "paragraph",
        "text": "Install or update to Muesli 0.8.4, open Models, and download Bodhan Core or Flex. Choose your language, wait for the model to become ready, then place your cursor in a text field and use your dictation hotkey."
      },
      {
        "type": "paragraph",
        "text": "Start with a few sentences you would actually send. Include an English term if you normally mix languages. Check the transcript and try the other Bodhan model if you prefer a different script treatment."
      },
      {
        "type": "paragraph",
        "text": "[Download Muesli](https://muesli.works/download/) or learn how [on-device dictation](https://muesli.works/on-device-dictation/) works."
      }
    ]
  },
  {
    "path": "/blog/indian-language-dictation-mac",
    "title": "How to dictate in Hindi, Tamil, and other Indian languages on Mac",
    "description": "Set up local Indian-language dictation on Mac with Bodhan in Muesli. Choose a language, compare Core and Flex, and check mixed-language output.",
    "date": "2026-09-23",
    "category": "Model Guides",
    "tags": [
      "Model Guides",
      "Dictation",
      "Local AI"
    ],
    "readTime": "3 min read",
    "image": "/images/bodhan/jatayu-vadham.jpg",
    "imageAlt": "Ravana attacking Jatayu in Jatayu Vadham by Raja Ravi Varma",
    "artTitle": "Jatayu Vadham",
    "artSource": "https://commons.wikimedia.org/wiki/File:Raja_Ravi_Varma,_Jatayu_vadha,_1906.jpg",
    "imageWidth": 2605,
    "imageHeight": 3640,
    "blocks": [
      {
        "type": "paragraph",
        "text": "You can use Bodhan in Muesli to dictate in Hindi, Tamil, Telugu, Malayalam, Bengali, and other supported Indian languages on an Apple Silicon Mac. Install Muesli 0.8.4 or later, download a Bodhan model, and select your language. The Bodhan integration requires macOS 15 or later. [Muesli's model guide](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/README.md)"
      },
      {
        "type": "paragraph",
        "text": "This guide walks through a first dictation and a useful way to compare the two model choices."
      },
      {
        "type": "heading",
        "text": "1. Download a Bodhan model"
      },
      {
        "type": "paragraph",
        "text": "Open Muesli's Models tab and find Bodhan Core and Bodhan Flex. Each has a precision selector for FP16 and INT8. Download your preferred variant and allow the preparation step to finish."
      },
      {
        "type": "paragraph",
        "text": "The published weight sizes are approximately 2.46 GB for FP16 and 1.27 GB for INT8. Allow additional space for compilation caches. Memory usage while transcribing includes further runtime allocations, so these download figures should not be used as RAM requirements. [Muesli 0.8.4 model details](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/README.md)"
      },
      {
        "type": "heading",
        "text": "2. Select the language you plan to speak"
      },
      {
        "type": "paragraph",
        "text": "Choose Hindi, Tamil, or your other supported language in the model's language control. Automatic detection is also available. An explicit language is a useful starting point when you know what you will speak."
      },
      {
        "type": "paragraph",
        "text": "For your first test, use a quiet room and your usual microphone. Dictate a few complete sentences at a comfortable pace. This makes it easier to tell whether an error comes from the recording, a particular name, or the model's handling of your speech."
      },
      {
        "type": "heading",
        "text": "3. Dictate into a text field"
      },
      {
        "type": "paragraph",
        "text": "Click where you want the text to appear. Hold your configured dictation hotkey, speak, and release it. Wait for transcription and check the inserted text before continuing."
      },
      {
        "type": "paragraph",
        "text": "A useful first test is a short message with a name, a date, and a task. You could dictate a reminder to send a document to a colleague tomorrow. Use your own words and the mixture of languages you would normally speak."
      },
      {
        "type": "heading",
        "text": "4. Compare Core and Flex on your writing"
      },
      {
        "type": "paragraph",
        "text": "In Muesli, Core uses native-script output. Flex uses mixed-script output with English terms in Latin letters. For example, a Hindi sentence containing an English product name is a useful test of which output you prefer. This is an evaluation suggestion; the spelling and formatting of any particular phrase can vary. [Bodhan integration details](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/README.md)"
      },
      {
        "type": "paragraph",
        "text": "Check three things when comparing the results:"
      },
      {
        "type": "list",
        "items": [
          "Were the words captured correctly?",
          "Are the scripts comfortable for your intended reader?",
          "Did names, quantities, and dates survive accurately?"
        ]
      },
      {
        "type": "paragraph",
        "text": "Repeat with a second sample before settling on a model. Save examples that consistently need correction so you can make a useful bug report."
      },
      {
        "type": "heading",
        "text": "Can I use this for meetings?"
      },
      {
        "type": "paragraph",
        "text": "Bodhan is also available for Muesli's meeting transcription workflow. Test a short conversation with the microphone and system-audio setup you intend to use. Check each speaker's words, particularly where people interrupt one another. Keep the original recording available while reviewing an important transcript."
      },
      {
        "type": "paragraph",
        "text": "For a first dictation, [download Muesli](https://muesli.works/download/). For conversations, see the [meeting transcription guide](https://muesli.works/meeting-notes/)."
      }
    ]
  },
  {
    "path": "/blog/bodhan-coreml-mlx-apple-silicon",
    "title": "Running Bodhan on Apple Silicon with CoreML and MLX Swift",
    "description": "How Muesli 0.8.4 runs Bodhan Core and Flex on Mac with a CoreML encoder, MLX Swift decoder, FP16 and INT8 weights, and local audio processing.",
    "date": "2026-09-23",
    "category": "Model Guides",
    "tags": [
      "Model Guides",
      "Dictation",
      "Local AI"
    ],
    "readTime": "3 min read",
    "image": "/images/bodhan/saraswati.jpg",
    "imageAlt": "Saraswati by Raja Ravi Varma",
    "artTitle": "Saraswati",
    "artSource": "https://commons.wikimedia.org/wiki/File:Saraswati.jpg",
    "imageWidth": 925,
    "imageHeight": 1496,
    "blocks": [
      {
        "type": "paragraph",
        "text": "Muesli 0.8.4 runs Bodhan Core and Flex through a hybrid native pipeline: a CoreML encoder processes the audio representation, and an MLX Swift decoder generates the transcript. Both FP16 and INT8 variants use this arrangement in the app. The integration requires macOS 15 or later. [Versioned runtime source](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/native/MuesliNative/Sources/MuesliNativeApp/BodhanCoreML.swift)"
      },
      {
        "type": "paragraph",
        "text": "For a desktop speech app, the work extends from model conversion to the moment a user presses a hotkey. Downloads need to be manageable, preparation needs to finish before recording, and longer utterances need a path through the runtime."
      },
      {
        "type": "heading",
        "text": "From audio to text"
      },
      {
        "type": "paragraph",
        "text": "Muesli's implementation separates the audio frontend, CoreML model execution, and MLX decoder into native components. The app loads the assets for the selected Bodhan variant and prepares the runtime before marking it ready. Its production path selects the MLX decoder for both model families. [Runtime source](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/native/MuesliNative/Sources/MuesliNativeApp/BodhanCoreML.swift), [MLX decoder](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/native/MuesliNative/Sources/MuesliNativeApp/BodhanMLXDecoder.swift)"
      },
      {
        "type": "paragraph",
        "text": "The CoreML and MLX conversions are available on Hugging Face for [Bodhan Core](https://huggingface.co/phequals/indic-transcribe-core-coreml) and [Bodhan Flex](https://huggingface.co/phequals/indic-transcribe-flex-coreml). Muesli provides a consumer interface around that runtime, including model downloads and selection from the Models tab."
      },
      {
        "type": "heading",
        "text": "What the precision selector changes"
      },
      {
        "type": "paragraph",
        "text": "The FP16 and INT8 choices change the weights used by the encoder and decoder. INT8 uses weight-only quantization; activations and the decoder's key-value cache remain floating point. The variants have separate downloads and can be removed independently. [Model storage and selection](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/native/MuesliNative/Sources/MuesliNativeApp/BodhanModelStore.swift), [versioned model documentation](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/README.md)"
      },
      {
        "type": "paragraph",
        "text": "This gives users a concrete choice to evaluate on their own Mac. Compare preparation time, transcription time, and the resulting text using the same audio. Report the chip, memory, model family, precision, and recording duration alongside any performance result."
      },
      {
        "type": "heading",
        "text": "Device placement and longer recordings"
      },
      {
        "type": "paragraph",
        "text": "The production encoder configuration defaults to CPU and GPU compute units. Actual CoreML execution depends on the runtime configuration and available hardware. A claim that Bodhan runs entirely on the Neural Engine would be inaccurate for this implementation. [CoreML configuration](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/native/MuesliNative/Sources/MuesliNativeApp/BodhanCoreML.swift)"
      },
      {
        "type": "paragraph",
        "text": "Muesli processes longer recordings in overlapping chunks and merges the resulting text. That makes boundaries between chunks part of the evaluation: listen for a phrase that spans a boundary and check for repeated or missing words. [Bodhan backend](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/native/MuesliNative/Sources/MuesliNativeApp/BodhanBackend.swift)"
      },
      {
        "type": "heading",
        "text": "Reading the accuracy results"
      },
      {
        "type": "paragraph",
        "text": "Bodhan's Core model card reports a Voice of India average of 8.7, compared with 11.3 for Flex, and describes its metric as orthographically informed word error rate, or OIWER. These are Bodhan's upstream results. They do not establish the accuracy of Muesli's converted FP16 or INT8 variants on a particular Mac. [Bodhan Core evaluation](https://huggingface.co/bodhan-ai/indic-transcribe-core)"
      },
      {
        "type": "paragraph",
        "text": "A useful next evaluation is a reproducible set of recordings across languages, accents, mixed-language speech, and microphone conditions. Publishing those recordings' provenance, scoring rules, and hardware would let others assess the conversion directly."
      },
      {
        "type": "paragraph",
        "text": "[Try Bodhan in Muesli](https://muesli.works/download/) or inspect the [0.8.4 implementation](https://github.com/Muesli-HQ/muesli/tree/v0.8.4)."
      }
    ]
  }
];
