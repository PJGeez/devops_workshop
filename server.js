const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const ENVIRONMENT = process.env.NODE_ENV || 'production';
const APP_VERSION = require('./package.json').version;

// Read git commit or build info if available
let gitCommit = 'DEV-LOCAL-COMMIT';
try {
  if (fs.existsSync(path.join(__dirname, '.git/HEAD'))) {
    const head = fs.readFileSync(path.join(__dirname, '.git/HEAD'), 'utf8').trim();
    if (head.startsWith('ref: ')) {
      const refPath = head.substring(5);
      if (fs.existsSync(path.join(__dirname, '.git', refPath))) {
        gitCommit = fs.readFileSync(path.join(__dirname, '.git', refPath), 'utf8').trim().substring(0, 7);
      }
    } else {
      gitCommit = head.substring(0, 7);
    }
  }
} catch (e) {
  gitCommit = 'v1.0.0-release';
}

const buildTime = new Date().toISOString();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.get('/api/info', (req, res) => {
  res.json({
    appName: 'DevOps CI/CD Visual Demo App',
    version: APP_VERSION,
    environment: ENVIRONMENT.toUpperCase(),
    port: PORT,
    gitCommit: gitCommit,
    buildTime: buildTime,
    status: 'ONLINE',
    // Custom feature flag that students can toggle to see visual updates
    features: {
      newHeaderBanner: true,
      themeColor: ENVIRONMENT.toLowerCase() === 'staging' ? 'Amber Staging Theme' : 'Emerald Production Theme',
      magicBadge: '🚀 CI/CD Pipeline Deployed!'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'HEALTHY',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: ENVIRONMENT
  });
});

// Serve frontend for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`   DevOps Demo App running on PORT: ${PORT}`);
    console.log(`   Environment: ${ENVIRONMENT.toUpperCase()}`);
    console.log(`   Version: ${APP_VERSION}`);
    console.log(`   Access at: http://localhost:${PORT}`);
    console.log(`==================================================`);
  });
}

module.exports = app;
