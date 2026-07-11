#!/bin/bash
cd "$(dirname "$0")"
if ! git diff --quiet || ! git diff --cached --quiet || [ -n "$(git ls-files --others --exclude-standard)" ]; then
    git add -A
    git commit -m "auto-sync $(date '+%Y-%m-%d %H:%M')"
    git push
fi
