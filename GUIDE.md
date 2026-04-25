# Truth Engine - Full Stack Deployment Guide (Tanglish)

## 📋 Overview

Idi Truth Engine application ek full-stack project hai jo frontend, backend, aur Neon PostgreSQL database use karta hai. Idi guide mein aapko step-by-step deployment process samjhaya jayega.

---

## 🚀 Part 1: Local Setup (Development)

### Step 1: Prerequisites Install Karo

Pehle aapke computer mein ye sab install hona chahiye:
- **Node.js** (v16 or higher) - [nodejs.org](https://nodejs.org) se download karo
- **npm** (Node Package Manager) - Node.js ke saath automatically aata hai
- **Git** - [git-scm.com](https://git-scm.com) se download karo

Verify karne ke liye terminal mein type karo:
```bash
node --version
npm --version
git --version
```

### Step 2: Project Setup

```bash
# Project folder mein jao
cd truth-engine

# Dependencies install karo
npm install
```

### Step 3: Environment Variables Setup

`.env.example` file ko `.env` mein rename karo:

```bash
# Windows PowerShell mein:
Copy-Item .env.example .env

# Mac/Linux mein:
cp .env.example .env
```

Abhi `.env` file mein DATABASE_URL empty hai. Hum isko Neon se setup karenge.

---

## 🗄️ Part 2: Neon Database Setup

### Step 1: Neon Account Banao

1. [neon.tech](https://neon.tech) par jao
2. "Sign Up" button click karo
3. Email se account banao (ya GitHub se login karo)
4. Email verify karo

### Step 2: New Project Create Karo

1. Dashboard mein "New Project" button click karo
2. Project name dedo (example: "truth-engine")
3. Region select karo (apne country ke paas wala select karo)
4. "Create Project" click karo

### Step 3: Connection String Copy Karo

1. Project dashboard mein jao
2. "Connection string" section mein jao
3. "Pooled connection" option select karo (important!)
4. Pura connection string copy karo (ye kuch aisa dikhega):
```
postgresql://user:password@host/database?sslmode=require
```

### Step 4: .env File Mein Paste Karo

`.env` file ko open karo aur DATABASE_URL ko update karo:

```env
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
PORT=5000
NODE_ENV=development
```

**Important:** Connection string mein `?sslmode=require` hona chahiye!

---

## 🧪 Part 3: Local Testing

### Backend Start Karo

```bash
npm start
```

Agar sab theek hai to ye message aayega:
```
✓ Truth Engine Server running on http://localhost:5000
✓ API available at http://localhost:5000/api
✓ Frontend available at http://localhost:5000
```

### Frontend Test Karo

Browser mein open karo: `http://localhost:5000`

Validator section mein kuch review paste karo aur "Validate Review" button click karo. Agar score aaye to database connection theek hai!

---

## 🌐 Part 4: Deployment (Production)

### Option A: Render.com Par Deploy Karo (Recommended)

#### Step 1: Render Account Banao
1. [render.com](https://render.com) par jao
2. GitHub account se sign up karo
3. Email verify karo

#### Step 2: GitHub Mein Push Karo

```bash
# Git initialize karo (agar pehle se nahi hai)
git init

# Sab files add karo
git add .

# Commit karo
git commit -m "Initial commit: Truth Engine full stack app"

# GitHub par push karo (apne repo mein)
git push origin main
```

#### Step 3: Render Par Deploy Karo

1. Render dashboard mein jao
2. "New +" button click karo
3. "Web Service" select karo
4. Apna GitHub repository connect karo
5. Ye settings use karo:
   - **Name:** truth-engine
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (ya paid, apni choice)

#### Step 4: Environment Variables Add Karo

Render dashboard mein:
1. "Environment" tab mein jao
2. "Add Environment Variable" click karo
3. Key: `DATABASE_URL`
4. Value: Apna Neon connection string paste karo
5. "Save" click karo

#### Step 5: Deploy Karo

1. "Create Web Service" button click karo
2. Deployment start hoga (2-5 minutes lagega)
3. Jab "Live" status aaye, to deployment complete hai!

Apka app ab live hai! URL kuch aisa hoga:
```
https://truth-engine.onrender.com
```

---

### Option B: Vercel Par Deploy Karo (Frontend Only)

Agar sirf frontend deploy karna hai:

1. [vercel.com](https://vercel.com) par jao
2. GitHub se sign up karo
3. "New Project" click karo
4. Apna repository select karo
5. Deploy karo

**Note:** Agar Vercel par deploy karo to backend Render par hona chahiye aur frontend mein API URL update karna padega.

---

## 🔧 Part 5: Troubleshooting

### Problem 1: "Cannot connect to database"

**Solution:**
- `.env` file mein DATABASE_URL check karo
- Neon dashboard mein connection string copy karo (pooled connection)
- `?sslmode=require` add karo agar nahi hai

### Problem 2: "Port 5000 already in use"

**Solution:**
```bash
# Windows mein:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux mein:
lsof -i :5000
kill -9 <PID>
```

### Problem 3: "npm install error"

**Solution:**
```bash
# Cache clear karo
npm cache clean --force

# Phir se install karo
npm install
```

### Problem 4: "Deployment fails on Render"

**Solution:**
- Render logs check karo (Logs tab mein)
- DATABASE_URL environment variable add hai ya nahi check karo
- Node version compatible hai ya nahi check karo

---

## 📊 API Endpoints Reference

Agar manual testing karna ho to ye endpoints use karo:

### 1. Health Check
```
GET http://localhost:5000/api/health
```

### 2. Review Validate Karo
```
POST http://localhost:5000/api/validate
Content-Type: application/json

{
  "content": "This product is amazing!",
  "sourceUrl": "https://amazon.com/product"
}
```

### 3. Reviews History Dekho
```
GET http://localhost:5000/api/reviews
```

### 4. Analytics Data
```
GET http://localhost:5000/api/analytics
```

---

## 🎯 Production Checklist

Deploy karne se pehle ye sab check karo:

- [ ] `.env` file mein DATABASE_URL add hai
- [ ] Neon database connection test kiya hai
- [ ] Local mein app run kiya hai aur test kiya hai
- [ ] GitHub mein code push kiya hai
- [ ] Render/Vercel par environment variables add kiye hain
- [ ] Deployment logs check kiye hain
- [ ] Live URL par app access kar sakte ho

---

## 📱 Frontend Features

### Validator Section
- Review content paste karo
- Optional: Source URL add karo
- "Validate Review" button click karo
- Instant accuracy score aayega

### Analytics Dashboard
- Total reviews validated
- Average score
- Score distribution chart
- Live statistics

### Review History
- Last 10 validated reviews
- Score aur source URL dekho
- Validation date dekho

---

## 🔐 Security Notes

Production mein deploy karte waqt:

1. **Never commit `.env` file** - `.gitignore` mein add karo
2. **Use strong database passwords** - Neon automatically generate karta hai
3. **Enable SSL** - `?sslmode=require` use karo
4. **CORS settings** - Production URL add karo
5. **Rate limiting** - Implement karo agar needed ho

---

## 📞 Support

Agar koi problem ho to:

1. **Logs check karo** - Terminal ya Render dashboard mein
2. **Error message read karo** - Isse pata chal jayega problem kya hai
3. **Google search karo** - Error message ko Google mein search karo
4. **Documentation dekho** - [Neon docs](https://neon.tech/docs), [Render docs](https://render.com/docs)

---

## 🎓 Learning Resources

- **Node.js:** [nodejs.org/docs](https://nodejs.org/docs)
- **Express:** [expressjs.com](https://expressjs.com)
- **PostgreSQL:** [postgresql.org/docs](https://postgresql.org/docs)
- **Neon:** [neon.tech/docs](https://neon.tech/docs)
- **Render:** [render.com/docs](https://render.com/docs)

---

## ✅ Deployment Success!

Jab aapka app live ho jaye to:

1. **Share karo** - Apne friends/teachers ko URL share karo
2. **Test karo** - Different reviews validate karo
3. **Monitor karo** - Analytics dashboard dekho
4. **Improve karo** - Feedback ke basis par features add karo

---

**Happy Deploying! 🚀**

Agar ye guide helpful tha to star ⭐ dedo!
