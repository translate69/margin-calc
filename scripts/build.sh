#!/bin/bash
set -Eeuo pipefail

COZE_WORKSPACE_PATH="${COZE_WORKSPACE_PATH:-$(pwd)}"

cd "${COZE_WORKSPACE_PATH}"

echo "Installing dependencies..."
pnpm install --prefer-frozen-lockfile --prefer-offline --loglevel debug --reporter=append-only

echo "Building Next.js standalone project..."
pnpm next build

# standalone 产物需要手动复制 static / public 进去
STANDALONE_DIR=".next/standalone"
if [ -d "${STANDALONE_DIR}" ]; then
  echo "Copying static assets to standalone..."
  cp -r .next/static "${STANDALONE_DIR}/.next/static" 2>/dev/null || true
  if [ -d "public" ]; then
    cp -r public "${STANDALONE_DIR}/public" 2>/dev/null || true
  fi
  echo "Standalone build ready."
fi

echo "Build completed successfully!"
