#!/usr/bin/env bash
set -euo pipefail
ROOT="$PWD"
echo "Checking links in presentations/*.html under $ROOT"
files=(presentations/*.html)
if [ ${#files[@]} -eq 0 ]; then
  echo "No presentation HTML files found." >&2
  exit 0
fi
failed=0

# extract urls (href/src) and normalize
urls=$(grep -hEo '(href|src)="[^"]+"' "${files[@]}" | sed -E 's/^(href|src)="//;s/"$//' | sed 's/&amp;/&/g' | sort -u)
base_dir="$(dirname "${files[0]}")"

while IFS= read -r url; do
  # skip empty
  [ -z "$url" ] && continue
  # skip anchors and mailto
  case "$url" in
    '#'* | 'mailto:'* | 'http://localhost'* | 'https://www.drupal.org'* | 'https://www.linkedin.com'*)
      continue
      ;;
  esac

  if [[ "$url" =~ ^https?:// ]]; then
    # check external URL
    status=$(curl -I -L --max-time 10 -s -o /dev/null -w "%{http_code}" "$url" || echo 000)
    if [ "$status" = "000" ] || [ "$status" -ge 400 ]; then
      echo "BROKEN: $url (status $status)"
      failed=1
    else
      echo "OK: $url ($status)"
    fi
  else
    # treat as local path
    if [[ "$url" = /* ]]; then
      path="$ROOT${url}"
    else
      # resolve relative to the presentations dir
      path=$(python3 -c 'import os,sys; print(os.path.normpath(os.path.join(sys.argv[1], sys.argv[2], sys.argv[3])))' "$ROOT" "$base_dir" "$url")
    fi
    # strip query string
    path="${path%%\?*}"
    if [ -e "$path" ]; then
      echo "OK: local $url -> $path"
    else
      echo "MISSING: local $url -> $path"
      failed=1
    fi
  fi
done <<< "$urls"

if [ "$failed" -ne 0 ]; then
  echo "Link check completed: FAILURES detected." >&2
  exit 2
fi

echo "Link check completed: all OK"
exit 0
#!/usr/bin/env bash
set -euo pipefail
ROOT="$PWD"
echo "Checking links in presentations/*.html under $ROOT"
files=(presentations/*.html)
if [ ${#files[@]} -eq 0 ]; then
  echo "No presentation HTML files found." >&2
  exit 0
fi
failed=0
urls=$(grep -hEo '(href|src)="[^"]+"' "${files[@]}" | sed -E 's/^(href|src)="//;s/"$//' | sed 's/&amp;/&/g' | sort -u)
for url in $urls; do
  # skip empty
  [ -z "$url" ] && continue
  # skip anchors and mailto
  case "$url" in
    '#'* | 'mailto:'*)
      continue
      ;;
  esac

  if [[ "$url" =~ ^https?:// ]]; then
    # check external URL
    status=$(curl -I -L --max-time 10 -s -o /dev/null -w "%{http_code}" "$url" || echo 000)
    if [ "$status" = "000" ] || [ "$status" -ge 400 ]; then
      echo "BROKEN: $url (status $status)"
      failed=1
    else
      echo "OK: $url ($status)"
    fi
  else
    # treat as local path
    # handle leading slash paths as relative to repo root
    if [[ "$url" = /* ]]; then
      path="$ROOT${url}"
    else
      path="$ROOT/$(dirname "$files")/$url"
      # try resolved path relative to presentations dir
      path=$(python3 - <<PY
import os,sys
root=sys.argv[1]
f=sys.argv[2]
u=sys.argv[3]
print(os.path.normpath(os.path.join(root, os.path.dirname(f), u)))
PY
"$ROOT" "${files[0]}" "$url")
    fi
    if [ -e "$path" ]; then
      echo "OK: local $url -> $path"
    else
      echo "MISSING: local $url -> $path"
      failed=1
    fi
  fi
done

if [ "$failed" -ne 0 ]; then
  echo "Link check completed: FAILURES detected." >&2
  exit 2
fi

echo "Link check completed: all OK"
exit 0
