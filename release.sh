#!/bin/env bash
set -e

npx update-browserslist-db@latest
npm run build
scp -r build/. root@pirotech.link:/var/www/react-jisho