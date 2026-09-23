---
title: "Running Bodhan on Apple Silicon with CoreML and MLX Swift"
slug: "/blog/bodhan-coreml-mlx-apple-silicon/"
description: "How Muesli 0.8.4 runs Bodhan Core and Flex on Mac with a CoreML encoder, MLX Swift decoder, FP16 and INT8 weights, and local audio processing."
status: draft
---

# Running Bodhan on Apple Silicon with CoreML and MLX Swift

Muesli 0.8.4 runs Bodhan Core and Flex through a hybrid native pipeline: a CoreML encoder processes the audio representation, and an MLX Swift decoder generates the transcript. Both FP16 and INT8 variants use this arrangement in the app. The integration requires macOS 15 or later. [Versioned runtime source](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/native/MuesliNative/Sources/MuesliNativeApp/BodhanCoreML.swift)

For a desktop speech app, the work extends from model conversion to the moment a user presses a hotkey. Downloads need to be manageable, preparation needs to finish before recording, and longer utterances need a path through the runtime.

## From audio to text

Muesli's implementation separates the audio frontend, CoreML model execution, and MLX decoder into native components. The app loads the assets for the selected Bodhan variant and prepares the runtime before marking it ready. Its production path selects the MLX decoder for both model families. [Runtime source](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/native/MuesliNative/Sources/MuesliNativeApp/BodhanCoreML.swift), [MLX decoder](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/native/MuesliNative/Sources/MuesliNativeApp/BodhanMLXDecoder.swift)

The CoreML and MLX conversions are available on Hugging Face for [Bodhan Core](https://huggingface.co/phequals/indic-transcribe-core-coreml) and [Bodhan Flex](https://huggingface.co/phequals/indic-transcribe-flex-coreml). Muesli provides a consumer interface around that runtime, including model downloads and selection from the Models tab.

## What the precision selector changes

The FP16 and INT8 choices change the weights used by the encoder and decoder. INT8 uses weight-only quantization; activations and the decoder's key-value cache remain floating point. The variants have separate downloads and can be removed independently. [Model storage and selection](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/native/MuesliNative/Sources/MuesliNativeApp/BodhanModelStore.swift), [versioned model documentation](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/README.md)

This gives users a concrete choice to evaluate on their own Mac. Compare preparation time, transcription time, and the resulting text using the same audio. Report the chip, memory, model family, precision, and recording duration alongside any performance result.

## Device placement and longer recordings

The production encoder configuration defaults to CPU and GPU compute units. Actual CoreML execution depends on the runtime configuration and available hardware. A claim that Bodhan runs entirely on the Neural Engine would be inaccurate for this implementation. [CoreML configuration](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/native/MuesliNative/Sources/MuesliNativeApp/BodhanCoreML.swift)

Muesli processes longer recordings in overlapping chunks and merges the resulting text. That makes boundaries between chunks part of the evaluation: listen for a phrase that spans a boundary and check for repeated or missing words. [Bodhan backend](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/native/MuesliNative/Sources/MuesliNativeApp/BodhanBackend.swift)

## Reading the accuracy results

Bodhan's Core model card reports a Voice of India average of 8.7, compared with 11.3 for Flex, and describes its metric as orthographically informed word error rate, or OIWER. These are Bodhan's upstream results. They do not establish the accuracy of Muesli's converted FP16 or INT8 variants on a particular Mac. [Bodhan Core evaluation](https://huggingface.co/bodhan-ai/indic-transcribe-core)

A useful next evaluation is a reproducible set of recordings across languages, accents, mixed-language speech, and microphone conditions. Publishing those recordings' provenance, scoring rules, and hardware would let others assess the conversion directly.

[Try Bodhan in Muesli](https://muesli.works/download/) or inspect the [0.8.4 implementation](https://github.com/Muesli-HQ/muesli/tree/v0.8.4).
