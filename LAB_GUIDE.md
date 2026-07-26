# 🚀 DevOps CI/CD Lab Guide for Beginners

Welcome to the **Hands-On CI/CD Lab**! This project is designed for juniors and students with basic Git knowledge to visually experience how automated building, testing, and deployment works using **Jenkins** and **GitHub Actions**.

---

## 🎯 Lab Objectives

1. **Understand the CI/CD Lifecycle**:
   - **Checkout**: Pulling the latest source code from Git.
   - **Build**: Installing dependencies & verifying application files.
   - **Test**: Running automated unit & API tests with Jest.
   - **Deploy**: Promoting code to **Staging (Port 3001)** and **Production (Port 3000)**.
   - **Health Check**: Automated verification before confirming deployment.

2. **Visual Verification**:
   - Open your browser to see immediate changes on `http://localhost:3000` (Production) and `http://localhost:3001` (Staging).

3. **Fail-Safe Protection**:
   - Learn how breaking unit tests prevents bad code from reaching Production.

---

## 📁 Repository Structure

```text
├── Jenkinsfile                    # Jenkins Pipeline script (Declarative syntax)
├── .github/workflows/ci-cd.yml    # GitHub Actions Workflow definition
├── server.js                      # Express web server with health & info APIs
├── public/                        # Visual UI Dashboard
│   ├── index.html                 # HTML Dashboard layout
│   ├── style.css                  # Dark mode, glassmorphism CSS theme
│   └── app.js                     # Real-time polling client script
├── test/                          # Automated test suite
│   └── app.test.js                # Jest unit & endpoint tests
└── scripts/                       # Deployment & Health Check bash scripts
    ├── deploy-staging.sh          # Deploys app to Port 3001
    ├── deploy-prod.sh             # Deploys app to Port 3000
    └── health-check.sh            # Automated API health verification
```

---

## 🏫 Setting Up Jenkins in the Lab

Since Jenkins is already installed in your lab:

### Step 1: Create a New Pipeline Job in Jenkins
1. Open Jenkins in your browser (usually `http://localhost:8080`).
2. Click **New Item**.
3. Enter job name: `devops-visual-cicd-demo`.
4. Select **Pipeline** and click **OK**.

### Step 2: Configure GitHub Repository & Automatic Git Triggers
1. Scroll down to **Build Triggers**:
   - Check **Poll SCM** and set Schedule to `* * * * *` (This tells Jenkins to check GitHub every 1 minute for new commits).
   - *Alternative (If Jenkins is publicly accessible)*: Check **GitHub hook trigger for GPRC SCM polling**.

2. Scroll down to the **Pipeline** section:
   - **Definition**: Select `Pipeline script from SCM`
   - **SCM**: Select `Git`
   - **Repository URL**: Paste your GitHub URL (e.g., `https://github.com/YOUR_USERNAME/DevOps_jenkins_and_githubactions.git`)
   - **Branch Specifier**: `*/main` (or `*/master`)
   - **Script Path**: `Jenkinsfile`
3. Click **Save**.

### ⚡ How the Automatic Trigger Works When Code is Pushed:
1. Student edits code (e.g. updates title or color in `public/index.html`).
2. Student pushes to GitHub: `git commit -am "new feature" && git push origin main`.
3. Jenkins detects the new commit automatically (via Poll SCM within 60s or Webhook instantly).
4. Jenkins automatically starts the pipeline execution, runs tests, and updates `http://localhost:3000` live!

---

## 🧪 Hands-On Exercises for Students

### 🟢 Exercise 1: Make a Visual Feature Change (Pass Case)
1. Open `public/index.html` in your editor.
2. Edit line 28 (Banner Title):
   ```html
   <h3 id="bannerTitle">🎉 Feature V2: Deployed via Automated CI/CD!</h3>
   ```
3. Commit your changes:
   ```bash
   git add public/index.html
   git commit -m "feat: Updated banner title for V2 release"
   ```
4. Run the pipeline in Jenkins (or push to GitHub).
5. Open `http://localhost:3000` in your browser.
6. **Observe**: The banner title updates automatically without manually stopping or starting servers!

---

### 🔴 Exercise 2: Intentionally Fail a Test (Safety Guardrail)
1. Open `test/app.test.js`.
2. Modify line 12 to expect a wrong status:
   ```javascript
   expect(res.body.status).toEqual('BROKEN_STATUS');
   ```
3. Commit and trigger the pipeline:
   ```bash
   git add test/app.test.js
   git commit -m "test: Introduce failing assertion"
   ```
4. Watch Jenkins run:
   - Stage 1 (Checkout): ✅ Passed
   - Stage 2 (Build): ✅ Passed
   - Stage 3 (Automated Tests): ❌ **FAILED!**
5. **Key Takeaway**: Notice how the pipeline **halts immediately** at Stage 3. The bad code **never gets deployed** to Port 3001 or 3000, keeping Production safe!

---

### 🔄 Exercise 3: Fix the Test & Recover
1. Revert the test change in `test/app.test.js`:
   ```javascript
   expect(res.body.status).toEqual('ONLINE');
   ```
2. Commit and re-run Jenkins:
   ```bash
   git add test/app.test.js
   git commit -m "fix: Fixed failing unit test"
   ```
3. Watch Jenkins successfully pass all 6 stages and deploy to Port 3000!

---

## ⚡ Running Locally Without Jenkins (CLI Testing)

You can also test the full pipeline locally using terminal commands:

```bash
# 1. Run unit tests
npm test

# 2. Deploy to Staging (Port 3001)
./scripts/deploy-staging.sh

# 3. Deploy to Production (Port 3000)
./scripts/deploy-prod.sh

# 4. Check Health
./scripts/health-check.sh 3000
./scripts/health-check.sh 3001
```

---

## 💡 Comparing Jenkins & GitHub Actions

Compare the two pipeline formats in your code editor:
- **`Jenkinsfile`**: Uses Groovy-based declarative `pipeline { stages { stage() { steps { ... } } } }`.
- **`.github/workflows/ci-cd.yml`**: Uses YAML format `jobs: <job_id>: steps: - name: ... run: ...`.

Both follow the exact same logical steps: **Checkout ➡️ Build ➡️ Test ➡️ Deploy ➡️ Health Check**.
