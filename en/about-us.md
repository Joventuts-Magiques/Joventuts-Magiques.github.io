---
layout: default
title: About Us
lang: en
permalink: /en/about-us/
---

<main class="about-page" role="main">
  <header class="about-hero">
    <h1>About Joventuts Màgiques</h1>
    <p class="hero-subtitle">We are a youth organization from Pineda de Mar (Catalonia) dedicated to promoting healthy leisure and community through board games and collectible card games.</p>
  </header>

  <section class="about-section">
    <div class="section-card">
      <h2>Who We Are</h2>
      <p>We are a group of gaming enthusiasts who decided to create a space where we can share our passion. Since 2025, we meet every Tuesday to play, learn, and enjoy together what we love most.</p>
    </div>
  </section>

  <section class="about-section">
    <div class="section-card">
      <h2>What We Do</h2>
      <div class="activities-grid">
        <div class="activity-item">
          <span class="activity-icon">🎲</span>
          <h3>Board Games</h3>
          <p>We have a game library with games for all tastes</p>
        </div>
        <div class="activity-item">
          <span class="activity-icon">🃏</span>
          <h3>Magic: The Gathering</h3>
          <p>Tournaments, drafts and casual games</p>
        </div>
        <div class="activity-item">
          <span class="activity-icon">🎮</span>
          <h3>Role-Playing Games</h3>
          <p>D&D campaigns, One Piece and much more</p>
        </div>
        <div class="activity-item">
          <span class="activity-icon">🎪</span>
          <h3>Events</h3>
          <p>Special gatherings, workshops and celebrations</p>
        </div>
      </div>
    </div>
  </section>

  <section class="about-section">
    <div class="section-card">
      <h2>Where to Find Us</h2>
      <div class="location-info">
        <p><strong>📍 Can Jalpí!</strong> - Carrer Sant Joan, Pineda de Mar</p>
        <p><strong>📅 Every Tuesday</strong></p>
        <p><strong>🕐 From 7:30 PM to 11:30 PM</strong></p>
      </div>
    </div>
  </section>

  <section class="about-cta">
    <div class="cta-card">
      <h2>Join the Community!</h2>
      <p>If you're interested in board games, Magic: The Gathering, or simply want to meet new people with similar interests, you're welcome at Joventuts Màgiques! Your experience level doesn't matter - we have space for beginners and veterans alike.</p>
      <p class="cta-contact">Want to become a member, have questions or suggestions?<a href="https://linktr.ee/joventutsmagiques" class="contact-link" target="_blank" rel="noopener noreferrer">Contact Us</a></p>
    </div>
  </section>

  <nav class="page-navigation" role="navigation">
    <a href="/" class="back-link">← Home</a>
  </nav>
</main>

<style>
.about-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.about-hero {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 1rem;
}

.about-hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.about-section {
  margin-bottom: 2rem;
}

.section-card {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-light);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: var(--shadow-sm);
}

.section-card h2 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: var(--color-primary);
}

.section-card p {
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
}

.activities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.activity-item {
  text-align: center;
  padding: 1.5rem;
  background: var(--color-bg-secondary);
  border-radius: 8px;
  transition: transform var(--transition-normal);
}

.activity-item:hover {
  transform: translateY(-4px);
}

.activity-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.activity-item h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--color-text-primary);
}

.activity-item p {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  margin: 0;
}

.location-info {
  background: var(--color-bg-secondary);
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid var(--color-primary);
}

.location-info p {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.about-cta {
  margin: 3rem 0 2rem;
}

.cta-card {
  background: var(--hero-gradient);
  color: var(--hero-text-color);
  border-radius: 12px;
  padding: 2.5rem;
  text-align: center;
  box-shadow: var(--shadow-md);
}

.cta-card h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: white;
}

.cta-card p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.95);
}

.cta-contact {
  font-weight: 500;
  margin-top: 1.5rem;
}

.contact-link {
  color: white;
  text-decoration: underline;
  font-weight: bold;
  transition: opacity var(--transition-normal);
}

.contact-link:hover {
  opacity: 0.8;
}

.page-navigation {
  margin-top: 3rem;
  text-align: center;
}

.back-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
  text-decoration: none;
  border-radius: 8px;
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.back-link:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

@media (max-width: 768px) {
  .about-hero h1 {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .activities-grid {
    grid-template-columns: 1fr;
  }

  .section-card {
    padding: 1.5rem;
  }

  .cta-card {
    padding: 2rem 1.5rem;
  }

  .cta-card h2 {
    font-size: 1.5rem;
  }
}
</style>
