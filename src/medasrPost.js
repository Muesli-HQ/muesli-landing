export const medasrPost = {
  "path": "/blog/medical-dictation-mac-medasr",
  "title": "Medical dictation on Mac with Google MedASR",
  "seoTitle": "Medical Dictation on Mac with Google MedASR | Muesli",
  "description": "Use Google MedASR to dictate medical terminology on an Apple Silicon Mac. Try a sample report, check the transcript, and compare the published accuracy results.",
  "date": "2026-11-11",
  "category": "Model Guides",
  "tags": [
    "Model Guides",
    "Dictation",
    "Local AI"
  ],
  "readTime": "2 min read",
  "image": "/images/og/medical-dictation-medasr.jpg",
  "imageAlt": "A clinician dictates into a microphone beside a laptop in a sunlit clinic. The banner reads “Medical dictation” and “Google MedASR on Mac.”",
  "imageWidth": 1200,
  "imageHeight": 630,
  "imageBanner": true,
  "blocks": [
    {
      "type": "paragraph",
      "text": "“No pleural effusion.” Three words in a radiology report. Drop the first and the finding reads the other way."
    },
    {
      "type": "paragraph",
      "text": "In Muesli 0.8.6, we added Google’s MedASR to the dictation hotkey. It’s a speech model trained on English physician dictations. Hold the key, speak in the vocabulary you use at work, and release. Muesli types the draft at your cursor. Your Mac handles the transcription, including when you’re offline. [Muesli 0.8.6 release notes](https://github.com/Muesli-HQ/muesli/releases/tag/v0.8.6)"
    },
    {
      "type": "paragraph",
      "text": "MedASR is still an unusual option in a Mac dictation app. Handy also offers it. For Muesli, we converted the model to Apple’s Core ML format and published the weights. The same model handles a sentence you dictate live and a recording you transcribe later. [Our Core ML model](https://huggingface.co/Muesli-HQ/medasr-coreml) · [Handy’s model list](https://models.handy.computer/models/medasr/)"
    },
    {
      "type": "heading",
      "text": "Try it with a passage you know"
    },
    {
      "type": "paragraph",
      "text": "On an Apple Silicon Mac running macOS 14.2 or later, open **Models → Dictation** in Muesli. Find **MedASR**, review Google’s terms, and choose **Agree & Continue**. Download the model and set it active. It takes about 212 MB on disk. [MedASR setup](https://github.com/Muesli-HQ/muesli/blob/v0.8.6/docs/medasr.md)"
    },
    {
      "type": "paragraph",
      "text": "For a first pass, open a blank note and dictate “Small left pleural effusion. No pneumothorax.” Read the sample back. Did it keep *left*? Did it keep *no*? Try saying “new paragraph” before the impression. Muesli turns that spoken cue into a paragraph break."
    },
    {
      "type": "paragraph",
      "text": "A family physician preparing a teaching case can dictate a medication history and check the names and doses against the script. A department comparing dictation tools can give each model the same de-identified recording. To run that comparison with Muesli, use `muesli-cli transcribe sample.wav --model medasr`. [CLI transcription guide](/docs/cli/transcribe/)"
    },
    {
      "type": "heading",
      "text": "How accurate is it?"
    },
    {
      "type": "paragraph",
      "text": "On Google’s held-out radiologist dictations, MedASR had a **6.6% word error rate** with greedy decoding. Whisper Large v3 scored **25.3%** on the same recordings. Google measured those results on its own dataset. We haven’t measured a clinical error rate for Muesli’s Mac conversion. [Google’s MedASR evaluation](https://huggingface.co/google/medasr#performance-and-evaluations)"
    },
    {
      "type": "paragraph",
      "text": "For clinicians evaluating dictation, the words that change meaning deserve their own tally. Count a missed negation or a wrong dose separately from a misplaced comma. Google calls for validation in each intended workflow and independent verification of the output. Start with a few de-identified passages from your specialty, use your usual microphone, and keep the reference text beside you. [Google’s intended use and limitations](https://huggingface.co/google/medasr#usage-and-limitations)"
    },
    {
      "type": "paragraph",
      "text": "[Download Muesli for Mac](/download/)"
    }
  ]
};
