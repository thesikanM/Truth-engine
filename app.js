// ============================================
// TRUTH ENGINE — INTERACTIVE FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initializeAnimations();
  initializeScrollEffects();
  initializeInteractivity();
  initializeDashboard();
});

// ============================================
// ANIMATIONS
// ============================================

function initializeAnimations() {
  // Animate elements on scroll
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

  // Observe all cards and sections
  document.querySelectorAll('.pillar-card, .benefit-card, .dash-card, .arch-node').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });

  // Add animation keyframes
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
  `;
  document.head.appendChild(style);
}

// ============================================
// SCROLL EFFECTS
// ============================================

function initializeScrollEffects() {
  const navbar = document.querySelector('.navbar');
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Navbar shadow on scroll
    if (currentScrollY > 10) {
      navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    // Parallax effect on hero
    const hero = document.querySelector('.hero-visual');
    if (hero && currentScrollY < 800) {
      hero.style.transform = `translateY(${currentScrollY * 0.3}px)`;
    }

    lastScrollY = currentScrollY;
  });
}

// ============================================
// INTERACTIVITY
// ============================================

function initializeInteractivity() {
  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Button interactions
  document.querySelectorAll('.btn-primary, .btn-ghost').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Card hover effects
  document.querySelectorAll('.pillar-card, .benefit-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

// ============================================
// DASHBOARD ANIMATIONS
// ============================================

function initializeDashboard() {
  animateBarChart();
  animateAnomalyList();
  animateTrustEvolution();
  animateHeatmap();
}

function animateBarChart() {
  const bars = document.querySelectorAll('.bar');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bars.forEach((bar, index) => {
          setTimeout(() => {
            bar.style.animation = 'barGrow 0.6s ease-out forwards';
          }, index * 100);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const chartContainer = document.querySelector('.bar-chart');
  if (chartContainer) {
    observer.observe(chartContainer);
  }

  // Add animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes barGrow {
      from {
        height: 0;
        opacity: 0;
      }
      to {
        height: var(--h, 50%);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
}

function animateAnomalyList() {
  const items = document.querySelectorAll('.anomaly-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        items.forEach((item, index) => {
          setTimeout(() => {
            item.style.animation = 'slideInLeft 0.5s ease-out forwards';
          }, index * 100);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const listContainer = document.querySelector('.anomaly-list');
  if (listContainer) {
    observer.observe(listContainer);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `;
  document.head.appendChild(style);
}

function animateTrustEvolution() {
  const sparkline = document.querySelector('.sparkline');
  if (!sparkline) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const path = sparkline.querySelector('path:first-of-type');
        if (path) {
          const length = path.getTotalLength();
          path.style.strokeDasharray = length;
          path.style.strokeDashoffset = length;
          path.style.animation = `drawLine 1.5s ease-out forwards`;
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(sparkline);

  const style = document.createElement('style');
  style.textContent = `
    @keyframes drawLine {
      to {
        stroke-dashoffset: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

function animateHeatmap() {
  const cells = document.querySelectorAll('.hm-cell');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cells.forEach((cell, index) => {
          setTimeout(() => {
            cell.style.animation = 'heatmapPulse 0.6s ease-out forwards';
          }, index * 50);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heatmap = document.querySelector('.heatmap-grid');
  if (heatmap) {
    observer.observe(heatmap);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes heatmapPulse {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  `;
  document.head.appendChild(style);
}

// ============================================
// UTILITY: LIVE DATA SIMULATION
// ============================================

function simulateLiveData() {
  // Update trust score periodically
  setInterval(() => {
    const ringFill = document.querySelector('.ring-fill');
    if (ringFill) {
      const currentOffset = parseFloat(ringFill.style.strokeDashoffset) || 45;
      const newOffset = 45 + Math.sin(Date.now() / 5000) * 20;
      ringFill.style.strokeDashoffset = newOffset;
    }
  }, 100);

  // Simulate anomaly updates
  const anomalyBadge = document.querySelector('.dash-card-badge--red');
  if (anomalyBadge) {
    setInterval(() => {
      const count = Math.floor(Math.random() * 5) + 1;
      anomalyBadge.textContent = `${count} Alert${count > 1 ? 's' : ''}`;
    }, 5000);
  }
}

// Initialize live data simulation
simulateLiveData();

// ============================================
// ACCESSIBILITY
// ============================================

// Ensure keyboard navigation works
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close any open modals if needed
  }
});

// Add focus styles for keyboard navigation
const style = document.createElement('style');
style.textContent = `
  button:focus-visible,
  a:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }
`;
document.head.appendChild(style);

console.log('✓ Truth Engine Platform initialized');
