# Push Code to GitHub - Step by Step Guide

Your GitHub repo is ready: https://github.com/thesikanM/Truth-engine

Follow these steps to push your code:

---

## 🚀 Step 1: Open Terminal/Command Prompt

On Windows:
- Press `Win + R`
- Type `cmd` or `powershell`
- Press Enter

Or use Git Bash if you have it installed.

---

## 🔧 Step 2: Navigate to Your Project

```bash
cd C:\Users\thesi\mini_project_team11
```

Or wherever your project folder is located.

---

## 📝 Step 3: Configure Git (First Time Only)

```bash
git config --global user.email "thesigan.gpm@gmail.com"
git config --global user.name "thesikanM"
```

---

## 🔐 Step 4: Initialize Git Repository

```bash
git init
```

---

## 📦 Step 5: Add All Files

```bash
git add .
```

---

## 💾 Step 6: Create First Commit

```bash
git commit -m "Initial commit: Truth Engine full-stack application"
```

---

## 🔗 Step 7: Add Remote Repository

```bash
git remote add origin https://github.com/thesikanM/Truth-engine.git
```

---

## 🚀 Step 8: Push to GitHub

```bash
git branch -M main
git push -u origin main
```

When prompted for password:
- Use your GitHub **Personal Access Token** (not your password)
- Or use GitHub CLI authentication

---

## 🔑 If You Don't Have a Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token"
3. Select scopes: `repo`, `workflow`
4. Copy the token
5. Use it as password when pushing

---

## ✅ Verify Push Was Successful

Go to: https://github.com/thesikanM/Truth-engine

You should see all your files there!

---

## 📋 Complete Command Sequence

Copy and paste these commands one by one:

```bash
cd C:\Users\thesi\mini_project_team11

git config --global user.email "thesigan.gpm@gmail.com"
git config --global user.name "thesikanM"

git init

git add .

git commit -m "Initial commit: Truth Engine full-stack application"

git remote add origin https://github.com/thesikanM/Truth-engine.git

git branch -M main

git push -u origin main
```

---

## 🐛 Troubleshooting

### Error: "git: command not found"
- Install Git from: https://git-scm.com/download/win
- Restart terminal after installation

### Error: "fatal: not a git repository"
- Make sure you're in the correct folder
- Run `git init` first

### Error: "Authentication failed"
- Use Personal Access Token instead of password
- Generate one at: https://github.com/settings/tokens

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/thesikanM/Truth-engine.git
```

---

## ✨ After Successful Push

Your code is now on GitHub! Next steps:

1. **Verify files are there**: https://github.com/thesikanM/Truth-engine
2. **Deploy to Render**: Follow DEPLOYMENT_SUMMARY.md
3. **Get live URL**: Your app will be live!

---

## 📞 Need Help?

If you get stuck:
1. Check the error message carefully
2. Google the error
3. Make sure Git is installed
4. Make sure you're in the right folder
5. Check your GitHub credentials

---

**Good luck! Your code will be on GitHub soon! 🚀**
