# Truth Engine - Universal Authenticity Validation System

A full-stack web application that validates the authenticity of product reviews and feedback using advanced trust scoring algorithms.

## 🎯 Features

### Core Functionality
- **Review Validator**: Paste any review or share a link to get an instant authenticity score (0-100)
- **Trust Score Algorithm**: Analyzes 5 key factors:
  - Content Length
  - URL Credibility
  - Sentiment Balance
  - Detail Level
  - Language Quality
- **Anti-Gaming Detection**: Identifies suspicious patterns like excessive caps, repetitive text, and emoji abuse
- **Live Analytics Dashboard**: Real-time statistics and score distribution
- **Review History**: Track all validated reviews with timestamps

### Technical Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL (Neon)
- **Deployment**: Render.com (Backend) + Vercel (Frontend)

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- npm
- Git

### Local Development

1. **Clone and Install**
```bash
git clone <your-repo-url>
cd truth-engine
npm install
```

2. **Setup Environment**
```bash
cp .env.example .env
# Add your Neon DATABASE_URL to .env
```

3. **Run Server**
```bash
npm start
```

4. **Access Application**
Open `http://localhost:5000` in your browser

## 📊 API Endpoints

### Validate Review
```
POST /api/validate
Content-Type: application/json

{
  "content": "Review text here",
  "sourceUrl": "https://example.com"
}

Response:
{
  "success": true,
  "reviewId": 1,
  "score": 85.5,
  "factors": {
    "contentLength": 15,
    "urlCredibility": 15,
    "sentimentBalance": 12.3,
    "detailLevel": 15,
    "languageQuality": 15
  }
}
```

### Get Reviews
```
GET /api/reviews
```

### Get Analytics
```
GET /api/analytics
```

## 🗄️ Database Schema

### reviews table
```sql
- id (SERIAL PRIMARY KEY)
- content (TEXT)
- source_url (VARCHAR)
- accuracy_score (DECIMAL)
- trust_factors (JSONB)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### validation_logs table
```sql
- id (SERIAL PRIMARY KEY)
- review_id (INTEGER FK)
- validation_type (VARCHAR)
- result (JSONB)
- created_at (TIMESTAMP)
```

## 🎓 Trust Score Calculation

The algorithm evaluates reviews on 5 dimensions:

1. **Content Length** (0-15 points)
   - 500+ chars: 15 pts
   - 200-500 chars: 10 pts
   - 50-200 chars: 5 pts

2. **URL Credibility** (0-15 points)
   - Credible domains (Amazon, GitHub, etc.): 15 pts
   - Other domains: 8 pts

3. **Sentiment Balance** (0-15 points)
   - Balanced positive/negative words: Higher score
   - Extreme sentiment: Lower score

4. **Detail Level** (0-15 points)
   - 5+ sentences, 100+ words: 15 pts
   - 3+ sentences, 50+ words: 10 pts
   - Less: 5 pts

5. **Language Quality** (0-15 points)
   - Proper capitalization: 5 pts
   - Minimal spelling errors: 5 pts
   - Grammar structure: 5 pts

**Anti-Gaming Penalties:**
- Excessive caps (>50%): -10 pts
- Too many emojis (>5): -5 pts
- Repetitive patterns: -10 pts

## 📱 Project Structure

```
truth-engine/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── server.js
├── package.json
├── .env.example
├── GUIDE.md
└── README.md
```

## 🌐 Deployment

### Deploy to Render (Backend)

1. Push code to GitHub
2. Connect GitHub to Render
3. Add environment variables:
   - `DATABASE_URL`: Your Neon connection string
   - `PORT`: 5000
4. Deploy!

### Deploy to Vercel (Frontend)

1. Push code to GitHub
2. Connect GitHub to Vercel
3. Deploy!

See `GUIDE.md` for detailed deployment instructions in Tanglish.

## 🔒 Security Features

- SSL/TLS encryption for database connections
- Input validation on all endpoints
- CORS protection
- Environment variables for sensitive data
- Prepared statements to prevent SQL injection

## 📈 Performance

- Average response time: <200ms
- Database queries optimized with indexes
- Frontend assets minified
- Lazy loading for images and components

## 🐛 Known Limitations

- Sentiment analysis is basic (English only)
- No user authentication (demo version)
- Limited to 10 reviews in history view
- No rate limiting (add for production)

## 🚀 Future Enhancements

- [ ] Multi-language support
- [ ] Advanced NLP sentiment analysis
- [ ] User authentication and profiles
- [ ] Review comparison and clustering
- [ ] Mobile app
- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] API rate limiting

## 📝 License

MIT License - Feel free to use for educational purposes

## 👨‍💻 Author

Created as a college mini project demonstrating full-stack development with Node.js, Express, and PostgreSQL.

## 📞 Support

For deployment help, see `GUIDE.md` (Tanglish version available)

---

**Happy Validating! 🎉**
