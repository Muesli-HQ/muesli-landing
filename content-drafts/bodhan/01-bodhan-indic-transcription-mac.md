---
title: "Bodhan comes to Mac: Indic speech-to-text in Muesli 0.8.4"
slug: "/blog/bodhan-indic-transcription-mac/"
description: "Use Bodhan Core and Flex locally on your Mac with Muesli 0.8.4, with support for India's 22 scheduled languages and English."
status: draft
---

# Bodhan comes to Mac: Indic speech-to-text in Muesli 0.8.4

Muesli is the first macOS dictation app to publicly release support for Bodhan Core and Flex. Available in Muesli 0.8.4, the two models run locally on Apple Silicon Macs for dictation and meeting transcription. Both cover India's 22 scheduled languages. Core supports 25 languages in total, while Flex supports 27. You can download either model inside Muesli and use it on macOS 15 or later. [Muesli 0.8.4 documentation](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/README.md)

A conversation can move between Hindi and English in the same sentence. A colleague might explain a problem in Tamil, then use the English name of a product or a technical term. Those are useful cases to try with Bodhan in Muesli: dictate a message, capture a discussion, or turn a spoken idea into a first draft.

## Two models in the Models tab

Muesli offers Bodhan Core and Bodhan Flex as separate choices. Core produces native-script output. Flex uses mixed-script output, keeping Indic words in their script and English terms in Latin letters, with support for spoken-number formatting. You can compare their output using the same short recording and choose the model that fits how you write. [Muesli's Bodhan integration](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/README.md)

Both model cards offer FP16 and INT8 downloads. Select a precision and language, download the model, and let preparation finish before your first dictation. Muesli also supports automatic language detection.

## Language coverage

The shared coverage includes Assamese, Bengali, Bodo, Dogri, Gujarati, Hindi, Kannada, Kashmiri, Konkani, Maithili, Malayalam, Manipuri, Marathi, Nepali, Odia, Punjabi, Sanskrit, Santali, Sindhi, Tamil, Telugu, and Urdu. English, Bhojpuri, and Bhili bring Core's total to 25. Flex additionally includes Chhattisgarhi and Haryanvi. [Bodhan Core model card](https://huggingface.co/bodhan-ai/indic-transcribe-core), [Bodhan Flex model card](https://huggingface.co/bodhan-ai/indic-transcribe-flex)

Language support is a starting point for evaluation. Try the names, accents, and vocabulary you use every day. Read through dates and numbers before sending a transcript to someone else.

## Running Bodhan locally

We adapted Bodhan for Muesli with a CoreML encoder and a native MLX Swift decoder. The speech recognition runs on your Mac after the required model assets are downloaded. Muesli handles model selection, recording, and dictation into the app where you are writing. [Implementation in Muesli 0.8.4](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/native/MuesliNative/Sources/MuesliNativeApp/BodhanCoreML.swift)

Meeting summaries and optional text-processing features have their own model settings. If you enable a hosted service for those steps, review what text it receives. Local speech recognition describes the Bodhan transcription step.

## Try your first dictation

Install or update to Muesli 0.8.4, open Models, and download Bodhan Core or Flex. Choose your language, wait for the model to become ready, then place your cursor in a text field and use your dictation hotkey.

Start with a few sentences you would actually send. Include an English term if you normally mix languages. Check the transcript and try the other Bodhan model if you prefer a different script treatment.

[Download Muesli](https://muesli.works/download/) or learn how [on-device dictation](https://muesli.works/on-device-dictation/) works.
