#!/usr/bin/env bash
set -e
npm run build

target="$1"
if [ -z "$target" ]; then target="$TARGET"; fi
if [ -z "$target" ]; then
  echo 'No host specified'
  exit 2
fi

scp -r build/. "${target}:/var/www/react-jisho"