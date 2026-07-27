#!/usr/bin/env bash
set -e

# Dynamically locate Node.js & npm across different user accounts and NVM setups
if ! command -v node &> /dev/null; then
  if [ -d "$HOME/.nvm/versions/node" ]; then
    LATEST_NVM_NODE=$(ls -d "$HOME/.nvm/versions/node/"* 2>/dev/null | tail -n 1)
    if [ -n "$LATEST_NVM_NODE" ]; then
      export PATH="$LATEST_NVM_NODE/bin:$PATH"
    fi
  fi
fi
export PATH="/usr/local/bin:/usr/bin:/bin:$PATH"

PORT=3000
ENV="production"
LOG_FILE="production.log"

echo "=================================================="
echo "🚀 DEPLOYING TO PRODUCTION (PORT ${PORT})"
echo "=================================================="

# Check if port is in use and stop process
PID=$(lsof -t -i:${PORT} || true)
if [ -n "$PID" ]; then
  echo "⚠️ Stopping existing Production process (PID: $PID)..."
  kill -9 $PID || true
  sleep 1
fi

# Prevent Jenkins ProcessTreeKiller from terminating background server on build completion
export JENKINS_NODE_COOKIE=dontKillMe
export BUILD_ID=dontKillMe

# Start Node server in background using setsid for clean detachment
echo "▶️ Starting Production application on http://localhost:${PORT}..."
JENKINS_NODE_COOKIE=dontKillMe BUILD_ID=dontKillMe setsid env PORT=${PORT} NODE_ENV=${ENV} node server.js > ${LOG_FILE} 2>&1 &

echo "📝 Logs streaming to: ${LOG_FILE}"

# Give server time to initialize
sleep 2

# Verify deployment with health check script
chmod +x ./scripts/health-check.sh
./scripts/health-check.sh ${PORT}
