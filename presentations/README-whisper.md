# Live Captioning with Whisper

This feature provides real-time live captioning for presentations using Whisper.cpp.

**⚠️ Local Use Only**: This feature is designed for local development and presentations running on your own machine. It will not work on deployed static sites or remote servers.

## Overview

The caption system polls a JSON file that gets updated in real-time by Whisper.cpp as you speak. The slides display the live transcript as it's generated.

## Prerequisites

- Node.js and npm installed
- A working microphone
- whisper.cpp compiled on your system

## Setup Instructions

### 1. Build Whisper.cpp

Clone and build whisper.cpp inside the presentations directory to keep everything together:

```bash
# From the presentations directory
cd presentations
git clone https://github.com/ggerganov/whisper.cpp.git
cd whisper.cpp

# Install SDL2 (required for microphone capture)
brew install sdl2

# Build with CMake
cmake -B build -DWHISPER_SDL2=ON
cmake --build build --config Release
```

This creates the `whisper-stream` binary at `presentations/whisper.cpp/build/bin/whisper-stream`.

**Note:** You can also add whisper.cpp as a git submodule if you want to track it properly in version control.

### 2. Download a Model

Download a Whisper model. The multilingual models support 99 languages including French, Spanish, German, Japanese, and many more.

#### Available Models

| Model | Parameters | English-only | Multilingual | Memory | Speed vs large |
|-------|-----------|--------------|--------------|--------|----------------|
| tiny | 39M | tiny.en | tiny | ~1 GB | ~10x faster |
| base | 74M | base.en | base | ~1 GB | ~7x faster |
| small | 244M | small.en | small | ~2 GB | ~4x faster |
| medium | 769M | medium.en | medium | ~5 GB | ~2x faster |
| large-v3 | 1550M | - | large-v3 | ~10 GB | baseline |
| large-v3-turbo | 809M | - | large-v3-turbo | ~6 GB | ~8x faster |

**English-only models** (`.en` suffix) perform better for English transcription, especially tiny.en and base.en.

**Multilingual models** (without `.en`) support 99 languages and can also translate to English.

**Quantized models** (with `-q5_0`, `-q5_1`, or `-q8_0` suffix) are smaller and faster but slightly less accurate.

#### Recommended Models

- **For English presentations**: `base.en` (good balance of speed and accuracy)
- **For French or other languages**: `base` (multilingual)
- **For best accuracy**: `medium` or `large-v3-turbo`
- **For fastest speed**: `tiny` or `tiny.en`

#### Download a Model

```bash
# From the whisper.cpp directory

# English-only (recommended for English)
bash ./models/download-ggml-model.sh base.en

# Multilingual (supports French, Spanish, German, Japanese, etc.)
bash ./models/download-ggml-model.sh base

# For better accuracy with multilingual
bash ./models/download-ggml-model.sh medium
```

#### Supported Languages

The multilingual models support 99 languages including:

**European**: French, German, Spanish, Italian, Portuguese, Dutch, Polish, Russian, Ukrainian, Greek, Swedish, Norwegian, Danish, Finnish, Czech, Romanian, Hungarian, Bulgarian, Croatian, Serbian, Slovak, Slovenian, Lithuanian, Latvian, Estonian, Icelandic, Irish, Welsh, Catalan, Basque, Galician, and more.

**Asian**: Chinese (Mandarin & Cantonese), Japanese, Korean, Hindi, Tamil, Telugu, Bengali, Urdu, Thai, Vietnamese, Indonesian, Malay, Tagalog, and more.

**Middle Eastern & African**: Arabic, Hebrew, Persian, Turkish, Swahili, Yoruba, Hausa, Amharic, and more.

**Other**: Haitian Creole, Maori, Hawaiian, and more.

[See the full list of supported languages](https://github.com/openai/whisper/blob/main/whisper/tokenizer.py#L11-L110)

This downloads the model to `presentations/whisper.cpp/models/` (e.g., `ggml-base.en.bin` or `ggml-base.bin`).

### 3. Configure Environment Variables (Optional)

If you installed whisper.cpp in the presentations directory, the scripts will auto-detect the paths. Otherwise, set these environment variables:

```bash
export WHISPER_BIN="./presentations/whisper.cpp/build/bin/whisper-stream"
export WHISPER_MODEL="./presentations/whisper.cpp/models/ggml-base.en.bin"
```

Add these to your `~/.zshrc` or `~/.bashrc` to make them permanent.

### 4. Start the Caption Listener

From the ox.ca project root:

```bash
npm run dev:whisper
```

This script:
- Launches `whisper-stream` with your microphone
- Writes the live transcript to `presentations/whisper-demo/transcript.json`
- Updates the file every 500ms as new words are recognized

### 5. View the Slides

Open your presentation in a browser:

```bash
# If not already running, start a local server
npm run serve
# or
python3 -m http.server 5500
```

Navigate to your slides. The caption button in the menu bar will turn green (🟢 Captions On) when the transcript file is being updated.

## How It Works

1. **whisper-stream**: Captures audio from your microphone and performs speech-to-text conversion in real-time
2. **run-whisper.js**: Node script that runs whisper-stream and writes output to JSON
3. **whisper-transcript.js**: Client-side script that polls the JSON file every 2 seconds
4. **Transcript boxes**: HTML elements with `data-transcript-src` attributes display the live text

## Default Paths

The scripts will attempt to auto-detect whisper.cpp in these locations (in order):

1. `$WHISPER_BIN` environment variable (if set)
2. `./presentations/whisper.cpp/build/bin/whisper-stream` (relative to project root)
3. `./whisper.cpp/build/bin/whisper-stream` (if running from presentations dir)
4. `/usr/local/bin/whisper-stream`

For models:

1. `$WHISPER_MODEL` environment variable (if set)
2. `./presentations/whisper.cpp/models/ggml-base.en.bin` (relative to project root)
3. `./whisper.cpp/models/ggml-base.en.bin` (if running from presentations dir)

## Adding Captions to Your Slides

To add live captions to any presentation:

1. Load the whisper-transcript.js script:
   ```html
   <script src="ca-slides/whisper-transcript.js"></script>
   ```

2. Add a transcript box to any slide:
   ```html
   <div class="live-transcript" data-transcript-src="../whisper-demo/transcript.json"></div>
   ```

The caption button in the menu bar will automatically show status and provide setup instructions.

## Troubleshooting

### Caption button stays grey
- Check that `npm run dev:whisper` is running
- Verify the transcript.json file is being created and updated: `ls -l presentations/whisper-demo/transcript.json`
- Check browser console for fetch errors

### No audio captured
- Check microphone permissions in System Preferences
- Verify the correct microphone is selected (whisper-stream uses the default input device)
- Test with: `whisper-stream -m /path/to/model.bin` (should show live transcript in terminal)

### Transcript is delayed or incorrect
- Try a larger model (e.g., `small.en` or `medium.en`) for better accuracy
- Speak clearly and at a moderate pace
- Reduce background noise

### Path not found errors
- Set explicit paths with `WHISPER_BIN` and `WHISPER_MODEL` environment variables
- Check that whisper.cpp is compiled: `ls presentations/whisper.cpp/build/bin/whisper-stream`
- Verify model file exists: `ls presentations/whisper.cpp/models/ggml-base.en.bin`

## Privacy Note

All processing happens locally on your machine. No audio or transcript data is sent to external servers.

## References

- [Whisper.cpp GitHub](https://github.com/ggerganov/whisper.cpp)
- [Whisper model information](https://github.com/openai/whisper#available-models-and-languages)
