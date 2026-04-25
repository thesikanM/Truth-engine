# Truth Engine - Quick Start Guide

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create .env File
```bash
cp .env.example .env
```

### Step 3: Add Database URL
Edit `.env` and add your Neon PostgreSQL connection string:
```
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
PORT=5000
```

### Step 4: Start Server
```bash
npm start
```

### Step 5: Open Browser
Go to: `http://localhost:5000`

---

## 🧪 Test the App

1. **Scroll to "Review Authenticity Validator"**
2. **Paste a review:**
   ```
   This product is absolutely amazing! It arrived quickly, works perfectly, 
   and the quality is outstanding. I've been using it for a week and couldn't 
   be happier. Highly recommend to everyone looking for a reliable solution.
   ```
3. **Click "Validate Review"**
4. **See the score and breakdown!**

---

## 📊 Try Different Reviews

### High Score Review (80+)
```
This product exceeded my expectations. The build quality is excellent, 
it arrived on time, and customer service was responsive. I've used similar 
products before, and this one is definitely superior. Worth every penny.
```

### Medium Score Review (60-80)
```
Good product. Works as described. Arrived quickly. Would recommend.
```

### Low Score Review (40-60)
```
OK product. Not bad. Could be better. LOTS OF CAPS. 😂😂😂😂😂
```

---

## 🗄️ Database Setup

### Option 1: Use Neon (Recommended)
1. Go to [neon.tech](https://neon.tech)
2. Create free account
3. Create new project
4. Copy connection string
5. Paste in `.env` file

### Option 2: Local PostgreSQL
```bash
# Install PostgreSQL locally
# Create database
createdb truth_engine

# Connection string:
DATABASE_URL=postgresql://localhost/truth_engine
```

---

## 🚀 Deploy to Production

### Deploy Backend to Render
1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Create new Web Service
4. Connect GitHub repo
5. Add `DATABASE_URL` environment variable
6. Deploy!

### Deploy Frontend to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repo
3. Deploy!

**See GUIDE.md for detailed instructions in Tanglish**

---

## 📱 API Testing

### Using cURL

**Validate a review:**
```bash
curl -X POST http://localhost:5000/api/validate \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Great product!",
    "sourceUrl": "https://amazon.com"
  }'
```

**Get reviews:**
```bash
curl http://localhost:5000/api/reviews
```

**Get analytics:**
```bash
curl http://localhost:5000/api/analytics
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 5000 in use | Change PORT in .env or kill process on port 5000 |
| Database connection error | Check DATABASE_URL in .env, verify Neon connection |
| npm install fails | Run `npm cache clean --force` then `npm install` |
| Frontend not loading | Check if server is running on port 5000 |

---

## 📚 Project Structure

```
truth-engine/
├── public/              # Frontend files (served by Express)
│   ├── index.html      # Main HTML
│   ├── styles.css      # Styling
│   └── app.js          # Frontend logic
├── server.js           # Backend server
├── package.json        # Dependencies
├── .env.example        # Environment template
├── GUIDE.md            # Full deployment guide (Tanglish)
├── README.md           # Project documentation
└── QUICKSTART.md       # This file
```

---

## ✨ Features Overview

### Validator
- Paste review text
- Optional: Add source URL
- Get instant authenticity score (0-100)
- See detailed factor breakdown

### Analytics
- Total reviews validated
- Average score
- Score distribution chart
- Live statistics

### History
- View last 10 validated reviews
- See scores and sources
- Track validation dates

---

## 🎯 Next Steps

1. **Test locally** - Validate some reviews
2. **Check database** - Verify data is saved
3. **Deploy** - Follow GUIDE.md for production
4. **Share** - Show your project to friends/teachers
5. **Improve** - Add more features!

---

## 💡 Tips

- **Better reviews get higher scores** - Detailed, balanced, well-written reviews score higher
- **Credible sources matter** - Amazon, GitHub URLs boost score
- **Avoid gaming** - Excessive caps, emojis, repetition lower score
- **Check analytics** - See patterns in validated reviews

---

## 🎓 Learning Outcomes

By completing this project, you'll learn:
- ✅ Full-stack web development
- ✅ Node.js and Express.js
- ✅ PostgreSQL databases
- ✅ REST API design
- ✅ Frontend-backend integration
- ✅ Cloud deployment
- ✅ Algorithm design

---

**Ready to validate? Start with Step 1! 🚀**
