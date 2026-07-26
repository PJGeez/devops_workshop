async function fetchAppInfo() {
  try {
    const res = await fetch('/api/info');
    if (!res.ok) throw new Error('API request failed');
    const data = await res.json();

    // Update Banner & Badges
    const envBadge = document.getElementById('envBadge');
    const envText = document.getElementById('envText');
    const portTag = document.getElementById('portTag');
    const visualBanner = document.getElementById('visualBanner');
    const featureChip = document.getElementById('featureChip');
    const commitChip = document.getElementById('commitChip');

    envText.textContent = data.environment;
    envBadge.className = `env-badge ${data.environment.toLowerCase()}`;

    portTag.textContent = `Port: ${data.port}`;
    featureChip.textContent = `${data.features.themeColor}`;
    commitChip.textContent = `Git: ${data.gitCommit}`;

    if (data.environment.toLowerCase() === 'staging') {
      visualBanner.classList.add('staging-theme');
    } else {
      visualBanner.classList.remove('staging-theme');
    }

    // Update Server Metrics
    document.getElementById('valVersion').textContent = data.version;
    document.getElementById('valEnv').textContent = data.environment;
    document.getElementById('valPort').textContent = data.port;
    document.getElementById('valHealth').textContent = data.status;

    // Update Pipeline Card step
    const deployStepTitle = document.getElementById('deployStepTitle');
    const deployStepDesc = document.getElementById('deployStepDesc');
    deployStepTitle.textContent = `Deployed to ${data.environment}`;
    deployStepDesc.textContent = `Running on Local Port ${data.port}`;

  } catch (err) {
    console.error('Error fetching app info:', err);
    document.getElementById('valHealth').textContent = 'OFFLINE';
    document.getElementById('valHealth').className = 'metric-value';
    document.getElementById('valHealth').style.color = '#ef4444';
  }
}

// Initial fetch and poll every 2 seconds
fetchAppInfo();
setInterval(fetchAppInfo, 2000);
