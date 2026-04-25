import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from '@neondatabase/serverless';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// ============================================
// DATABASE INITIALIZATION
// ============================================

async function initializeDatabase() {
  try {
    const client = await pool.connect();
    
    // Create reviews table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        source_url VARCHAR(500),
        accuracy_score DECIMAL(5, 2),
        trust_factors JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create validation_logs table for analytics
    await client.query(`
      CREATE TABLE IF NOT EXISTS validation_logs (
        id SERIAL PRIMARY KEY,
        review_id INTEGER REFERENCES reviews(id),
        validation_type VARCHAR(100),
        result JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✓ Database initialized successfully');
    client.release();
  } catch (error) {
    console.error('Database initialization error:', error);
    process.exit(1);
  }
}

// ============================================
// TRUST SCORE CALCULATION ENGINE
// ============================================

function calculateTrustScore(content, sourceUrl) {
  let score = 50; // Base score
  const factors = {
    contentLength: 0,
    urlCredibility: 0,
    sentimentBalance: 0,
    detailLevel: 0,
    languageQuality: 0
  };

  // Factor 1: Content Length (0-15 points)
  const contentLength = content.length;
  if (contentLength > 500) factors.contentLength = 15;
  else if (contentLength > 200) factors.contentLength = 10;
  else if (contentLength > 50) factors.contentLength = 5;
  score += factors.contentLength;

  // Factor 2: URL Credibility (0-15 points)
  if (sourceUrl) {
    const credibleDomains = ['amazon.com', 'flipkart.com', 'github.com', 'medium.com', 'dev.to', 'reddit.com', 'producthunt.com'];
    const isCredible = credibleDomains.some(domain => sourceUrl.toLowerCase().includes(domain));
    factors.urlCredibility = isCredible ? 15 : 8;
    score += factors.urlCredibility;
  }

  // Factor 3: Sentiment Balance (0-15 points)
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'love', 'perfect', 'awesome', 'best'];
  const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'worst', 'poor', 'useless', 'broken'];
  
  const positiveCount = positiveWords.filter(word => content.toLowerCase().includes(word)).length;
  const negativeCount = negativeWords.filter(word => content.toLowerCase().includes(word)).length;
  
  const totalSentimentWords = positiveCount + negativeCount;
  if (totalSentimentWords > 0) {
    const balance = Math.abs(positiveCount - negativeCount) / totalSentimentWords;
    factors.sentimentBalance = Math.max(0, 15 - (balance * 10));
  } else {
    factors.sentimentBalance = 8;
  }
  score += factors.sentimentBalance;

  // Factor 4: Detail Level (0-15 points)
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const words = content.split(/\s+/).length;
  if (sentences > 5 && words > 100) factors.detailLevel = 15;
  else if (sentences > 3 && words > 50) factors.detailLevel = 10;
  else factors.detailLevel = 5;
  score += factors.detailLevel;

  // Factor 5: Language Quality (0-15 points)
  const hasProperCapitalization = /[A-Z]/.test(content);
  const hasMinimalSpellingErrors = (content.match(/\b\w+\b/g) || []).length > 5;
  const hasGrammarStructure = /[,;:]/.test(content);
  
  let qualityScore = 0;
  if (hasProperCapitalization) qualityScore += 5;
  if (hasMinimalSpellingErrors) qualityScore += 5;
  if (hasGrammarStructure) qualityScore += 5;
  factors.languageQuality = qualityScore;
  score += factors.languageQuality;

  // Anti-Gaming Detection (penalty system)
  const allCaps = (content.match(/[A-Z]/g) || []).length / content.length;
  if (allCaps > 0.5) score -= 10; // Too many caps = suspicious

  const excessiveEmojis = (content.match(/[\u{1F600}-\u{1F64F}]/gu) || []).length;
  if (excessiveEmojis > 5) score -= 5;

  const repetitivePatterns = /(.{3,})\1{2,}/.test(content);
  if (repetitivePatterns) score -= 10;

  // Clamp score between 0-100
  score = Math.max(0, Math.min(100, score));

  return {
    score: parseFloat(score.toFixed(2)),
    factors: {
      contentLength: parseFloat(factors.contentLength.toFixed(2)),
      urlCredibility: parseFloat(factors.urlCredibility.toFixed(2)),
      sentimentBalance: parseFloat(factors.sentimentBalance.toFixed(2)),
      detailLevel: parseFloat(factors.detailLevel.toFixed(2)),
      languageQuality: parseFloat(factors.languageQuality.toFixed(2))
    },
    breakdown: {
      baseScore: 50,
      totalFactors: parseFloat((Object.values(factors).reduce((a, b) => a + b, 0)).toFixed(2)),
      finalScore: parseFloat(score.toFixed(2))
    }
  };
}

// ============================================
// API ENDPOINTS
// ============================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Truth Engine API is running' });
});

// Root route - serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Validate review and calculate trust score
app.post('/api/validate', async (req, res) => {
  try {
    const { content, sourceUrl } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: 'Review content is required' });
    }

    // Calculate trust score
    const trustResult = calculateTrustScore(content, sourceUrl);

    // Save to database
    const client = await pool.connect();
    const result = await client.query(
      `INSERT INTO reviews (content, source_url, accuracy_score, trust_factors)
       VALUES ($1, $2, $3, $4)
       RETURNING id, created_at;`,
      [content, sourceUrl || null, trustResult.score, JSON.stringify(trustResult.factors)]
    );

    const reviewId = result.rows[0].id;

    // Log validation
    await client.query(
      `INSERT INTO validation_logs (review_id, validation_type, result)
       VALUES ($1, $2, $3);`,
      [reviewId, 'trust_score_calculation', JSON.stringify(trustResult)]
    );

    client.release();

    res.json({
      success: true,
      reviewId,
      ...trustResult,
      message: 'Review validated successfully'
    });
  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({ error: 'Validation failed', details: error.message });
  }
});

// Get review history
app.get('/api/reviews', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT id, content, source_url, accuracy_score, created_at
       FROM reviews
       ORDER BY created_at DESC
       LIMIT 10;`
    );
    client.release();

    res.json({
      success: true,
      count: result.rows.length,
      reviews: result.rows
    });
  } catch (error) {
    console.error('Fetch reviews error:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Get analytics dashboard data
app.get('/api/analytics', async (req, res) => {
  try {
    const client = await pool.connect();

    const statsResult = await client.query(
      `SELECT 
        COUNT(*) as total_reviews,
        AVG(accuracy_score) as avg_score,
        MAX(accuracy_score) as max_score,
        MIN(accuracy_score) as min_score
       FROM reviews;`
    );

    const distributionResult = await client.query(
      `SELECT 
        CASE 
          WHEN accuracy_score >= 80 THEN 'Excellent'
          WHEN accuracy_score >= 60 THEN 'Good'
          WHEN accuracy_score >= 40 THEN 'Fair'
          ELSE 'Poor'
        END as category,
        COUNT(*) as count
       FROM reviews
       GROUP BY category;`
    );

    client.release();

    res.json({
      success: true,
      stats: {
        totalReviews: parseInt(statsResult.rows[0].total_reviews) || 0,
        averageScore: parseFloat(statsResult.rows[0].avg_score) || 0,
        maxScore: parseFloat(statsResult.rows[0].max_score) || 0,
        minScore: parseFloat(statsResult.rows[0].min_score) || 0
      },
      distribution: distributionResult.rows
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// ============================================
// SERVER STARTUP
// ============================================

async function startServer() {
  try {
    await initializeDatabase();
    
    // Catch-all route - serve index.html for any unmatched routes
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
    
    app.listen(PORT, () => {
      console.log(`\n✓ Truth Engine Server running on http://localhost:${PORT}`);
      console.log(`✓ API available at http://localhost:${PORT}/api`);
      console.log(`✓ Frontend available at http://localhost:${PORT}\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  await pool.end();
  process.exit(0);
});
