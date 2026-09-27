#!/bin/bash
set -Eeuo pipefail

COZE_WORKSPACE_PATH="${COZE_WORKSPACE_PATH:-$(pwd)}"

cd "${COZE_WORKSPACE_PATH}"

PORT=5000
DEPLOY_RUN_PORT="${DEPLOY_RUN_PORT:-$PORT}"

echo "Starting Next.js production server on port ${DEPLOY_RUN_PORT}..."

# 优先用 standalone（快很多），否则回退到 pnpm next start
if [ -f ".next/standalone/server.js" ]; then
  echo "Using standalone server..."
  cd .next/standalone
  exec node server.js -p "${DEPLOY_RUN_PORT}" -H 0.0.0.0
else
  echo "Standalone not found, falling back to pnpm next start..."
  exec pnpm next start -p "${DEPLOY_RUN_PORT}" -H 0.0.0.0
fi
