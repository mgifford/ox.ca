#!/usr/bin/env bash
set -euo pipefail

# Fetch whisper.cpp (shallow) into a local, ignored demo directory
# Requires: git, curl
# Note: This does not build the wasm demos; it just prepares a place to host them
# You can replace the copy steps below with prebuilt demo artifacts when available.

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST_DIR="$ROOT_DIR/presentations/whisper-demo"
TMP_DIR="$ROOT_DIR/.tmp-whisper"
REPO_URL="https://github.com/ggerganov/whisper.cpp.git"

rm -rf "$TMP_DIR"
mkdir -p "$TMP_DIR" "$DEST_DIR"

echo "Cloning whisper.cpp (shallow)..."
GIT_LFS_SKIP_SMUDGE=1 git clone --depth=1 "$REPO_URL" "$TMP_DIR/whisper.cpp"

# Placeholder: copy a minimal static page to indicate setup status
cat > "$DEST_DIR/index.html" <<'HTML'
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Whisper Web Demo (Placeholder)</title>
  <style>body{font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; margin:2rem; line-height:1.5}</style>
</head>
<body>
  <h1>Whisper Web Demo</h1>
  <p>This is a placeholder. To embed a working web demo, either:</p>
  <ol>
    <li>Host a prebuilt whisper.cpp web demo (wasm) under this directory, or</li>
    <li>Point the iframe <code>src</code> to an externally hosted demo.</li>
  </ol>
  <p>Repository cloned locally at: <code>presentations/whisper-demo</code> (ignored by git).</p>
</body>
</html>
HTML

rm -rf "$TMP_DIR"
echo "Prepared placeholder demo at $DEST_DIR/index.html"
