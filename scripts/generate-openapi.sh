#!/usr/bin/env bash

set -euo pipefail

repo_root=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
pocket_id_dir=$(cd -- "${1:-$repo_root/pocket-id}" && pwd)
backend_dir="$pocket_id_dir/backend"
output_file="$repo_root/static/openapi.json"
work_dir=$(mktemp -d "${RUNNER_TEMP:-${TMPDIR:-/tmp}}/pocket-id-openapi.XXXXXX")
server_port=${OPENAPI_PORT:-1411}
actors_port=${OPENAPI_ACTORS_PORT:-1414}
server_pid=

cleanup() {
  if [[ -n "$server_pid" ]]; then
    kill "$server_pid" 2>/dev/null || true
    wait "$server_pid" 2>/dev/null || true
  fi
  rm -rf "$work_dir"
}
trap cleanup EXIT

version=$(tr -d '[:space:]' < "$pocket_id_dir/.version")

cd "$backend_dir"
go build \
  -tags=exclude_frontend,unit \
  -ldflags "-X github.com/pocket-id/pocket-id/backend/internal/common.Version=$version" \
  -o "$work_dir/pocket-id" \
  ./cmd

env \
  APP_ENV=production \
  APP_URL=https://id.example.com \
  INTERNAL_APP_URL="http://127.0.0.1:$server_port" \
  HOST=127.0.0.1 \
  PORT="$server_port" \
  ACTORS_HOST=127.0.0.1 \
  ACTORS_PORT="$actors_port" \
  DB_CONNECTION_STRING="$work_dir/pocket-id.db" \
  UPLOAD_PATH="$work_dir/uploads" \
  ENCRYPTION_KEY=0123456789abcdef0123456789abcdef \
  DISABLE_RATE_LIMITING=true \
  ANALYTICS_DISABLED=true \
  VERSION_CHECK_DISABLED=true \
  "$work_dir/pocket-id" > "$work_dir/server.log" 2>&1 &
server_pid=$!

spec_url="http://127.0.0.1:$server_port/api/openapi.json"
spec_file="$work_dir/openapi.json"
ready=false

for _ in {1..60}; do
  if curl --fail --silent "$spec_url" --output "$spec_file"; then
    ready=true
    break
  fi
  if ! kill -0 "$server_pid" 2>/dev/null; then
    cat "$work_dir/server.log"
    exit 1
  fi
  sleep 1
done

if [[ "$ready" != true ]]; then
  cat "$work_dir/server.log"
  echo "Timed out waiting for $spec_url" >&2
  exit 1
fi

jq -e '
  .openapi == "3.1.0" and
  (.paths | type == "object" and length > 0) and
  (.components.schemas | type == "object" and length > 0)
' "$spec_file" > /dev/null

mkdir -p "$(dirname -- "$output_file")"
mv "$spec_file" "$output_file"
