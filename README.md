# ⚡ Visual DevOps CI/CD Demo Application

A lightweight, visually engaging Node.js & Express application built for **DevOps juniors and students** to learn **CI/CD pipelines** using **Jenkins** and **GitHub Actions**.

![CI/CD Pipeline](https://img.shields.io/badge/CI%2FCD-Jenkins%20%26%20GitHub%20Actions-blue)
![Ports](https://img.shields.io/badge/Ports-3000%20(Prod)%20%7C%203001%20(Staging)-emerald)

---

## ✨ Features

- **Visual Dashboard**: Shows live versioning, git commit hash, environment badges (Amber for Staging on 3001, Emerald for Production on 3000), and pipeline steps.
- **Local Port Deployments**: Zero cloud/AWS dependencies required. Runs locally on ports `3000` (Production) and `3001` (Staging).
- **Automated Health Checks**: Includes bash scripts that verify API responsiveness before confirming successful deployments.
- **Dual Pipeline Support**: Comes pre-configured with both `Jenkinsfile` and `.github/workflows/ci-cd.yml`.
- **Fail-Safe Demo**: Pre-packaged with Jest tests so students can practice breaking & fixing pipelines.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Tests
```bash
npm test
```

### 3. Deploy App to Local Ports
```bash
# Deploy to Staging (Port 3001)
./scripts/deploy-staging.sh

# Deploy to Production (Port 3000)
./scripts/deploy-prod.sh
```

### 4. View App in Browser
- **Production Environment**: `http://localhost:3000`
- **Staging Environment**: `http://localhost:3001`

---

## 📖 Lab Guide

For step-by-step instructions on setting up Jenkins in your lab and guiding students through hands-on exercises, read [LAB_GUIDE.md](file:///home/prajwal/whattheshit/DevOps_jenkins_and_githubactions/LAB_GUIDE.md).
