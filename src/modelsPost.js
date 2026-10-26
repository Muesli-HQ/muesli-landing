export const modelsPost = {
  "path": "/blog/muesli-models-hugging-face",
  "title": "Muesli models are on Hugging Face",
  "seoTitle": "Muesli Cleanup Models and Apple Silicon Ports on Hugging Face",
  "description": "Download Muesli dictation cleanup models in MLX, GGUF, and LiteRT formats, plus CoreML speech recognition ports for Apple Silicon.",
  "date": "2026-10-26",
  "category": "Model Guides",
  "tags": [
    "Model Guides",
    "Local AI",
    "Dictation"
  ],
  "readTime": "3 min read",
  "image": "/images/muesli-hugging-face-banner.webp",
  "imageAlt": "Muesli’s blue waveform logo beside the yellow Hugging Face logo, above the words Muesli models on Hugging Face.",
  "imageWidth": 1774,
  "imageHeight": 887,
  "imageInBody": false,
  "blocks": [
    {
      "type": "paragraph",
      "text": "We are publishing the models we fine-tune and port for Muesli on [Muesli HQ on Hugging Face](https://huggingface.co/Muesli-HQ). Download the weights, read the prompts, and use them in your own local speech tools under each model’s license."
    },
    {
      "type": "paragraph",
      "text": "Our work covers dictation cleanup and speech recognition on Apple Silicon. Publishing it lets other developers inspect our choices, reproduce the documented tests, and build on the same models."
    },
    {
      "type": "heading",
      "text": "Dictation cleanup models"
    },
    {
      "type": "paragraph",
      "text": "The cleanup models take a transcript and are trained to remove fillers, apply spoken corrections, format dictated lists, and fix clear recognition mistakes while preserving the speaker’s wording. They support English and optional app context."
    },
    {
      "type": "list",
      "items": [
        "**Qwen3.5 0.8B:** [MLX 8-bit](https://huggingface.co/Muesli-HQ/qwen35-0.8b-muesli-cleanup-v12-mlx-8bit) for Apple Silicon, with a [GGUF version](https://huggingface.co/Muesli-HQ/qwen35-0.8b-muesli-cleanup-v12-gguf) for llama.cpp.",
        "**Qwen3.5 2B:** [MLX 8-bit](https://huggingface.co/Muesli-HQ/qwen35-2b-muesli-cleanup-v12-mlx-8bit) and [GGUF builds](https://huggingface.co/Muesli-HQ/qwen35-2b-muesli-cleanup-v12-gguf) for the larger Qwen cleanup model.",
        "**LFM2.5 1.2B:** [MLX 4-bit](https://huggingface.co/Muesli-HQ/lfm25-1.2b-muesli-cleanup-v12-mlx-4bit), [MLX 8-bit](https://huggingface.co/Muesli-HQ/lfm25-1.2b-muesli-cleanup-v12-mlx-8bit), and [GGUF](https://huggingface.co/Muesli-HQ/lfm25-1.2b-muesli-cleanup-v12-gguf) options.",
        "**Gemma 4 E2B:** [MLX 4-bit](https://huggingface.co/Muesli-HQ/gemma4-e2b-muesli-cleanup-v12-mlx-4bit) for Apple Silicon and a [LiteRT-LM build](https://huggingface.co/Muesli-HQ/gemma4-e2b-muesli-cleanup-v12-litert)."
      ]
    },
    {
      "type": "paragraph",
      "text": "The cards include training details, exact prompt formats, and evaluation results. Use those prompts when testing. The reported cleanup benchmarks use authored examples; performance on your own dictations can differ."
    },
    {
      "type": "heading",
      "text": "Speech recognition ports for Apple Silicon"
    },
    {
      "type": "list",
      "items": [
        "[Indic-Transcribe Flex CoreML](https://huggingface.co/Muesli-HQ/indic-transcribe-flex-coreml) supports mixed-script output, including Hindi in Devanagari alongside English in Latin script.",
        "[Indic-Transcribe Core CoreML](https://huggingface.co/Muesli-HQ/indic-transcribe-core-coreml) produces native-script output for Indic speech."
      ]
    },
    {
      "type": "paragraph",
      "text": "The Indic ports have been checked against upstream transcripts in a small set of smoke tests. Their tested configuration uses CPU and GPU on macOS 15 or later. Broader language coverage and long recordings need further evaluation."
    },
    {
      "type": "heading",
      "text": "Build with us"
    },
    {
      "type": "paragraph",
      "text": "These releases build on Qwen, Liquid AI, Google, Bodhan AI / AI4Bharat, and NVIDIA. Each card identifies its upstream model and license. Check those terms before reuse, especially the custom licenses attached to LFM and Indic models."
    },
    {
      "type": "paragraph",
      "text": "Start with the [Muesli model collection](https://huggingface.co/Muesli-HQ/models), or explore the [Muesli source code](https://github.com/Muesli-HQ/muesli). For the app, [download Muesli](https://muesli.works/download/). Our [Bodhan CoreML and MLX guide](https://muesli.works/blog/bodhan-coreml-mlx-apple-silicon/) goes deeper into the Apple ports."
    }
  ],
  "imageBanner": true
};
