# Git Installation & GitHub Push - Complete Guide

## 📥 Step 1: Download Git

1. Go to: https://git-scm.com/download/win
2. Click the download button (it will auto-detect Windows)
3. A file named `Git-X.XX.X-64-bit.exe` will download

---

## 🔧 Step 2: Install Git

1. Open the downloaded `.exe` file
2. Click "Next" through all screens (default settings are fine)
3. When asked about "Adjusting your PATH environment", select:
   - ✅ "Git from the command line and also from 3rd-party software"
4. Click "Install"
5. Click "Finish"

**Restart your computer after installation**

---

## ✅ Step 3: Verify Git Installation

Open Command Prompt and type:
```bash
git --version
```

You should see something like: `git version 2.42.0.windows.1`

---

## 🚀 Step 4: Configure Git

Open Command Prompt and run:

```bash
git config --global user.email "thesigan.gpm@gmail.com"
git config --global user.name "thesikanM"
```

---

## 📁 Step 5: Navigate to Your Project

```bash
cd C:\Users\thesi\mini_project_team11
```

---

## 🔐 Step 6: Create GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: `Truth Engine`
4. Select these scopes:
   - ✅ repo (full control of private repositories)
   - ✅ workflow
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. Save it somewhere safe

---

## 📦 Step 7: Initialize Git Repository

In Command Prompt (in your project folder):

```bash
git init
```

---

## 📝 Step 8: Add All Files

```bash
git add .
```

---

## 💾 Step 9: Create First Commit

```bash
git commit -m "Initial commit: Truth Engine full-stack application"
```

---

## 🔗 Step 10: Add Remote Repository

```bash
git remote add origin https://github.com/thesikanM/Truth-engine.git
```

---

## 🌿 Step 11: Rename Branch to Main

```bash
git branch -M main
```

---

## 🚀 Step 12: Push to GitHub

```bash
git push -u origin main
```

When prompted:
- **Username**: `thesikanM`
- **Password**: Paste your Personal Access Token (from Step 6)

---

## ✨ Step 13: Verify Success

Go to: https://github.com/thesikanM/Truth-engine

You should see all your files!

---

## 📋 All Commands in One Block

Copy and paste these one by one in Command Prompt:

```bash
git config --global user.email "thesigan.gpm@gmail.com"
```

```bash
git config --global user.name "thesikanM"
```

```bash
cd C:\Users\thesi\mini_project_team11
```

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "Initial commit: Truth Engine full-stack application"
```

```bash
git remote add origin https://github.com/thesikanM/Truth-engine.git
```

```bash
git branch -M main
```

```bash
git push -u origin main
```

---

## 🐛 Troubleshooting

### "git: command not found"
- Git is not installed or not in PATH
- Restart computer after installation
- Reinstall Git if needed

### "fatal: not a git repository"
- Make sure you're in the correct folder
- Run `git init` first

### "Authentication failed"
- Use Personal Access Token, not password
- Make sure token is copied correctly
- Generate new token if needed

### "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/thesikanM/Truth-engine.git
```

### "fatal: The current branch main has no upstream branch"
```bash
git push -u origin main
```

---

## 🎯 After Successful Push

Your code is now on GitHub! Next:

1. ✅ Code is on GitHub
2. 📖 Read DEPLOYMENT_SUMMARY.md
3. 🌐 Deploy to Render
4. 🚀 Get live URL
5. 📊 Present to teachers

---

## 📞 Quick Reference

| Command | What it does |
|---------|-------------|
| `git --version` | Check if Git is installed |
| `git config --global user.email "..."` | Set your email |
| `git config --global user.name "..."` | Set your name |
| `git init` | Initialize repository |
| `git add .` | Add all files |
| `git commit -m "..."` | Create commit |
| `git remote add origin ...` | Connect to GitHub |
| `git branch -M main` | Rename branch |
| `git push -u origin main` | Push to GitHub |
| `git status` | Check status |
| `git log` | View commits |

---

## ✅ Checklist

- [ ] Git installed
- [ ] Git configured with email and name
- [ ] In correct project folder
- [ ] Personal Access Token created
- [ ] `git init` run
- [ ] `git add .` run
- [ ] `git commit` run
- [ ] `git remote add origin` run
- [ ] `git branch -M main` run
- [ ] `git push -u origin main` run
- [ ] Files visible on GitHub

---

**You're ready to push! Follow the steps above! 🚀**
