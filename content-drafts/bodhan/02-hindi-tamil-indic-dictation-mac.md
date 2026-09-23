---
title: "How to dictate in Hindi, Tamil, and other Indian languages on Mac"
slug: "/blog/indian-language-dictation-mac/"
description: "Set up local Indian-language dictation on Mac with Bodhan in Muesli. Choose a language, compare Core and Flex, and check mixed-language output."
status: draft
---

# How to dictate in Hindi, Tamil, and other Indian languages on Mac

You can use Bodhan in Muesli to dictate in Hindi, Tamil, Telugu, Malayalam, Bengali, and other supported Indian languages on an Apple Silicon Mac. Install Muesli 0.8.4 or later, download a Bodhan model, and select your language. The Bodhan integration requires macOS 15 or later. [Muesli's model guide](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/README.md)

This guide walks through a first dictation and a useful way to compare the two model choices.

## 1. Download a Bodhan model

Open Muesli's Models tab and find Bodhan Core and Bodhan Flex. Each has a precision selector for FP16 and INT8. Download your preferred variant and allow the preparation step to finish.

The published weight sizes are approximately 2.46 GB for FP16 and 1.27 GB for INT8. Allow additional space for compilation caches. Memory usage while transcribing includes further runtime allocations, so these download figures should not be used as RAM requirements. [Muesli 0.8.4 model details](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/README.md)

## 2. Select the language you plan to speak

Choose Hindi, Tamil, or your other supported language in the model's language control. Automatic detection is also available. An explicit language is a useful starting point when you know what you will speak.

For your first test, use a quiet room and your usual microphone. Dictate a few complete sentences at a comfortable pace. This makes it easier to tell whether an error comes from the recording, a particular name, or the model's handling of your speech.

## 3. Dictate into a text field

Click where you want the text to appear. Hold your configured dictation hotkey, speak, and release it. Wait for transcription and check the inserted text before continuing.

A useful first test is a short message with a name, a date, and a task. You could dictate a reminder to send a document to a colleague tomorrow. Use your own words and the mixture of languages you would normally speak.

## 4. Compare Core and Flex on your writing

In Muesli, Core uses native-script output. Flex uses mixed-script output with English terms in Latin letters. For example, a Hindi sentence containing an English product name is a useful test of which output you prefer. This is an evaluation suggestion; the spelling and formatting of any particular phrase can vary. [Bodhan integration details](https://github.com/Muesli-HQ/muesli/blob/v0.8.4/README.md)

Check three things when comparing the results:

- Were the words captured correctly?
- Are the scripts comfortable for your intended reader?
- Did names, quantities, and dates survive accurately?

Repeat with a second sample before settling on a model. Save examples that consistently need correction so you can make a useful bug report.

## Can I use this for meetings?

Bodhan is also available for Muesli's meeting transcription workflow. Test a short conversation with the microphone and system-audio setup you intend to use. Check each speaker's words, particularly where people interrupt one another. Keep the original recording available while reviewing an important transcript.

For a first dictation, [download Muesli](https://muesli.works/download/). For conversations, see the [meeting transcription guide](https://muesli.works/meeting-notes/).
