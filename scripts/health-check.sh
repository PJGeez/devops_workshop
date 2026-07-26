#!/usr/bin/env bash

PORT=${1:-3000}
MAX_RETRIES=5
RETRY_DELAY=2

echo "🔍 Running Health Check on http://localhost:${PORT}/api/health..."

for i in $(seq 1 $MAX_RETRIES); do
  HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:${PORT}/api/health || echo "000")
  
  if [ "$HTTP_STATUS" -eq 200 ]; then
    echo "✅ Health check PASSED on Port ${PORT}! (HTTP Status: 200 OK)"
    exit 0
  else
    echo "⏳ Attempt $i/$MAX_RETRIES: Server not ready yet (HTTP Status: ${HTTP_STATUS}). Retrying in ${RETRY_DELAY}s..."
    sleep $RETRY_DELAY
  fi
done

echo "❌ Health check FAILED on Port ${PORT} after ${MAX_RETRIES} attempts!"
exit 1
