#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "▸ Installing dependencies"
if [ -f "pnpm-lock.yaml" ]; then
  pnpm install --frozen-lockfile
elif [ -f "yarn.lock" ]; then
  yarn install --frozen-lockfile
else
  npm ci
fi

echo "▸ Type-checking Svelte + TypeScript"
npx svelte-check --tsconfig ./tsconfig.json

echo "▸ Building for production"
npx vite build

echo "▸ Build complete → dist/"
du -sh dist/
