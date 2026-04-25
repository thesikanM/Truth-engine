// ============================================
// TRUTH ENGINE — FRONTEND APPLICATION
// Full Stack Integration with Backend API
// ============================================

const API_BASE = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

async function initializeApp() {
  initializeAnimations();
  initializeScrollEffects();
  initializeValidator();
  loadAnalytics();
  loadReviewHistory();
}

// ============================================
// VALIDATOR FUNCTIONALITY
// ============================================

function initializeValidator() {
  const form = document.getElementById('validatorForm');
  const textarea = document.getElementById('reviewContent');
  const charCount = document.getElementById('charCount');

  // Character counter
  textarea.addEventListener('input', () => {
    charCount.textContent = textarea.value.length;
  });

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await validateReview();
  });
}

async function validateReview() {
  const content = document.getElementById('reviewContent').value.trim();
  const sourceUrl = document.getElementById('sourceUrl').value.trim();
  const submitBtn = document.querySelector('.btn-submit');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoader = submitBtn.querySelector('.btn-loader');

  if (!content) {
    alert('Please enter review content');
    return;
  }

  // Show loading state
  submitBtn.disabled = true;
  btnText.style.display = 'none';
  btnLoader.style.display = 'flex';

  try {
    const response = await fetch(`${API_BASE}/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, sourceUrl })
    });

    if (!response.ok) throw new Error('Validation failed');

    const result = await response.json();
    displayResult(result);
    loadAnalytics();
    loadReviewHistory();
  } catch (error) {
    console.error('Error:', error);
    alert('Validation failed. Please try again.');
  } finally {
    submitBtn.disabled = false;
    btnText.style.display = 'inline';
    btnLoader.style.display = 'none';
  }
}

function displayResult(result) {
  const resultContainer = document.getElementById('resultContainer');
  const scoreNumber = document.getElementById('scoreNumber');
  const scoreStatus = document.getElementById('scoreStatus');
  const scoreMessage = document.getElementById('scoreMessage');
  const reviewId = document.getElementById('reviewId');
  const validatedAt = document.getElementById('validatedAt');
  const scoreRingFill = document.getElementById('scoreRingFill');

  const score = result.score;
  scoreNumber.textContent = Math.round(score);

  // Determine status
  let status, message, color;
  if (score >= 80) {
    status = 'Excellent';
    message = 'This review appears highly authentic and trustworthy.';
    color = '#10b981';
  } else if (score >= 60) {
    status = 'Good';
    message = 'This review is generally authentic with minor concerns.';
    color = '#3b82f6';
  } else if (score >= 40) {
    status = 'Fair';
    message = 'This review has some authenticity concerns.';
    color = '#f59e0b';
  } else {
    status = 'Poor';
    message = 'This review shows significant authenticity concerns.';
    color = '#ef4444';
  }

  scoreStatus.textContent = status;
  scoreStatus.style.color = color;
  scoreMessage.textContent = message;
  reviewId.textContent = `#${result.reviewId}`;
  validatedAt.textContent = new Date().toLocaleString();

  // Animate score ring
  const circumference = 2 * Math.PI * 80;
  const offset = circumference - (score / 100) * circumference;
  scoreRingFill.style.strokeDasharray = circumference;
  scoreRingFill.style.strokeDashoffset = offset;
  scoreRingFill.style.stroke = color;

  // Display factors
  const factors = result.factors;
  Object.keys(factors).forEach(key => {
    const value = factors[key];
    const fillEl = document.getElementById(`factor-${key}`);
    const valEl = document.getElementById(`factor-${key}-val`);
    if (fillEl && valEl) {
      fillEl.style.width = `${(value / 15) * 100}%`;
      valEl.textContent = value.toFixed(1);
    }
  });

  resultContainer.style.display = 'block';
  resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function resetValidator() {
  document.getElementById('validatorForm').reset();
  document.getElementById('resultContainer').style.display = 'none';
  document.getElementById('charCount').textContent = '0';
}

// ============================================
// ANALYTICS
// ============================================

async function loadAnalytics() {
  try {
    const response = await fetch(`${API_BASE}/analytics`);
    if (!response.ok) throw new Error('Failed to load analytics');

    const data = await response.json();
    const stats = data.stats;
    const distribution = data.distribution;

    // Update stats
    document.getElementById('totalReviews').textContent = stats.totalReviews;
    document.getElementById('avgScore').textContent = stats.averageScore.toFixed(1);
    document.getElementById('stat-total').textContent = stats.totalReviews;
    document.getElementById('stat-avg').textContent = stats.averageScore.toFixed(1);
    document.getElementById('stat-max').textContent = stats.maxScore.toFixed(1);
    document.getElementById('stat-min').textContent = stats.minScore.toFixed(1);

    // Update distribution bars
    const distributionMap = {};
    distribution.forEach(item => {
      distributionMap[item.category] = parseInt(item.count);
    });

    const total = Object.values(distributionMap).reduce((a, b) => a + b, 0) || 1;
    const bars = document.querySelectorAll('#scoreDistribution .bar');
    const categories = ['Excellent', 'Good', 'Fair', 'Poor'];

    bars.forEach((bar, index) => {
      const count = distributionMap[categories[index]] || 0;
      const percentage = (count / total) * 100;
      bar.style.setProperty('--h', `${percentage}%`);
    });
  } catch (error) {
    console.error('Analytics error:', error);
  }
}

// ============================================
// REVIEW HISTORY
// ============================================

async function loadReviewHistory() {
  try {
    const response = await fetch(`${API_BASE}/reviews`);
    if (!response.ok) throw new Error('Failed to load reviews');

    const data = await response.json();
    const tbody = document.getElementById('historyTableBody');

    if (data.reviews.length === 0) {
      tbody.innerHTML = '<tr class="empty-state"><td colspan="5">No reviews validated yet. Start by validating a review above!</td></tr>';
      return;
    }

    tbody.innerHTML = data.reviews.map(review => `
      <tr>
        <td>#${review.id}</td>
        <td class="preview">${review.content.substring(0, 50)}...</td>
        <td><span class="score-badge" style="background: ${getScoreColor(review.accuracy_score)}">${review.accuracy_score.toFixed(1)}</span></td>
        <td>${review.source_url ? '<a href="' + review.source_url + '" target="_blank">View</a>' : '-'}</td>
        <td>${new Date(review.created_at).toLocaleDateString()}</td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('History error:', error);
  }
}

function getScoreColor(score) {
  if (score >= 80) return 'rgba(16, 185, 129, 0.2)';
  if (score >= 60) return 'rgba(59, 130, 246, 0.2)';
  if (score >= 40) return 'rgba(245, 158, 11, 0.2)';
  return 'rgba(239, 68, 68, 0.2)';
}

// ============================================
// ANIMATIONS
// ============================================

function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.pillar-card, .benefit-card, .dash-card, .arch-node').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .spinner {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-right: 6px;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .btn-loader {
      display: flex;
      align-items: center;
    }
    .score-badge {
      display: inline-block;
      padding: 0.35rem 0.75rem;
      border-radius: 0.35rem;
      color: #fff;
      font-weight: 600;
      font-size: 0.85rem;
    }
    .preview {
      max-width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `;
  document.head.appendChild(style);
}

function initializeScrollEffects() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    const hero = document.querySelector('.hero-visual');
    if (hero && window.scrollY < 800) {
      hero.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    }
  });
}

console.log('✓ Truth Engine Frontend initialized');
