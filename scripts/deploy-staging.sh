#!/usr/bin/env bash
set -e

PORT=3001
ENV="staging"
LOG_FILE="staging.log"

echo "=================================================="
echo "🚀 DEPLOYING TO STAGING (PORT ${PORT})"
echo "=================================================="

# Check if port is in use and stop process
PID=$(lsof -t -i:${PORT} || true)
if [ -n "$PID" ]; then
  echo "⚠️ Stopping existing Staging process (PID: $PID)..."
  kill -9 $PID || true
  sleep 1
fi

# Start Node server in background using setsid for clean detachment
echo "▶️ Starting Staging application on http://localhost:${PORT}..."
setsid env PORT=${PORT} NODE_ENV=${ENV} node server.js > ${LOG_FILE} 2>&1 &

echo "📝 Logs streaming to: ${LOG_FILE}"

# Give server time to initialize
sleep 2

# Verify deployment with health check script
chmod +x ./scripts/health-check.sh
./scripts/health-check.sh ${PORT}
