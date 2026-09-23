// Bodhan articles and their shared page/social metadata.
export const bodhanPosts = [
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
