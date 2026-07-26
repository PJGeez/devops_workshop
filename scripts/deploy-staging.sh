#!/usr/bin/env bash
set -e

# Auto-locate Node.js & npm if not in PATH (e.g. NVM installations)
export PATH="/home/prajwal/.nvm/versions/node/v25.5.0/bin:/usr/local/bin:/usr/bin:/bin:$PATH"

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

# Prevent Jenkins ProcessTreeKiller from terminating background server on build completion
export JENKINS_NODE_COOKIE=dontKillMe
export BUILD_ID=dontKillMe

# Start Node server in background using setsid for clean detachment
echo "▶️ Starting Staging application on http://localhost:${PORT}..."
JENKINS_NODE_COOKIE=dontKillMe BUILD_ID=dontKillMe setsid env PORT=${PORT} NODE_ENV=${ENV} node server.js > ${LOG_FILE} 2>&1 &

echo "📝 Logs streaming to: ${LOG_FILE}"

# Give server time to initialize
sleep 2

# Verify deployment with health check script
chmod +x ./scripts/health-check.sh
./scripts/health-check.sh ${PORT}
