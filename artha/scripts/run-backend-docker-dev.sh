#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ARTHA_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
COMPOSE_FILE="${ARTHA_DIR}/docker-compose.yml"
OVERRIDE_FILE="${ARTHA_DIR}/.docker-compose.backend-dev.override.yml"
REQUIRED_PORTS=(3000 8000 5432 5433)

cleanup() {
  rm -f "${OVERRIDE_FILE}"
}

trap cleanup EXIT

stop_project_stack() {
  docker compose -f "${COMPOSE_FILE}" down --remove-orphans >/dev/null 2>&1 || true
}

remove_docker_containers_using_port() {
  local port="$1"
  local ids
  ids="$(docker ps --format '{{.ID}} {{.Ports}}' | awk -v p="${port}" '$0 ~ ":" p "->" {print $1}')"
  if [[ -n "${ids}" ]]; then
    echo "Removing Docker containers using port ${port}: ${ids}"
    # shellcheck disable=SC2086
    docker rm -f ${ids} >/dev/null 2>&1 || true
  fi
}

kill_local_processes_using_port() {
  local port="$1"
  if ! command -v lsof >/dev/null 2>&1; then
    return
  fi

  local pids
  pids="$(lsof -tiTCP:${port} -sTCP:LISTEN 2>/dev/null || true)"
  if [[ -n "${pids}" ]]; then
    echo "Killing local processes using port ${port}: ${pids}"
    # shellcheck disable=SC2086
    kill -9 ${pids} >/dev/null 2>&1 || true
  fi
}

free_required_ports() {
  stop_project_stack
  for port in "${REQUIRED_PORTS[@]}"; do
    remove_docker_containers_using_port "${port}"
    kill_local_processes_using_port "${port}"
  done
}

load_env_file() {
  local env_file="${ARTHA_DIR}/.env.local"
  if [[ -f "${env_file}" ]]; then
    echo "Loading environment from ${env_file}"
    set -a
    # shellcheck disable=SC1090
    source "${env_file}"
    set +a
  fi

  if [[ -z "${SUPABASE_JWT_SECRET:-}" ]]; then
    export SUPABASE_JWT_SECRET=""
    echo "SUPABASE_JWT_SECRET is not set; backend will use Supabase JWKS verification only."
  fi
}

cd "${ARTHA_DIR}"
load_env_file
free_required_ports

cat > "${OVERRIDE_FILE}" <<'YAML'
services:
  artha-api:
    working_dir: /app
    command:
      - uvicorn
      - main:app
      - --host
      - 0.0.0.0
      - --port
      - "8000"
      - --reload
      - --reload-dir
      - /app
      - --log-level
      - info
    volumes:
      - ./services/artha-api:/app
    ports:
      - "8000:8000"
    environment:
      PYTHONDONTWRITEBYTECODE: "1"
      PYTHONUNBUFFERED: "1"
      ALLOWED_ORIGINS: '["http://localhost:3000"]'
YAML

echo "Starting postgres, timescaledb, and artha-api with hot reload on http://localhost:8000"
echo "Starting Next.js frontend on http://localhost:3000"
docker compose \
  -f "${COMPOSE_FILE}" \
  -f "${OVERRIDE_FILE}" \
  up --build postgres timescaledb artha-api nextjs
