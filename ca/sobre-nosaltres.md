---
layout: default
title: Sobre Nosaltres
lang: ca
permalink: /ca/sobre-nosaltres/
---

<main class="about-page" role="main">
  <header class="about-hero">
    <h1>Sobre Joventuts Màgiques</h1>
    <p class="hero-subtitle">Som una entitat juvenil de Pineda de Mar (Catalunya) dedicada a fomentar l'oci saludable i la comunitat a través dels jocs de taula i els jocs de cartes col·leccionables.</p>
  </header>

  <section class="about-section">
    <div class="section-card">
      <h2>Qui Som?</h2>
      <p>Som un grup d'entusiastes dels jocs que vam decidir crear un espai on poder compartir la nostra passió. Des del 2025, ens trobem cada dimarts per jugar, aprendre i gaudir junts del que més ens agrada.</p>
    </div>
  </section>

  <section class="about-section">
    <div class="section-card">
      <h2>Què Fem?</h2>
      <div class="activities-grid">
        <div class="activity-item">
          <span class="activity-icon">🎲</span>
          <h3>Jocs de Taula</h3>
          <p>Disposem d'una ludoteca amb jocs per a tots els gustos</p>
        </div>
        <div class="activity-item">
          <span class="activity-icon">🃏</span>
          <h3>Magic: The Gathering</h3>
          <p>Tornejos, drafts i partides casual</p>
        </div>
        <div class="activity-item">
          <span class="activity-icon">🎮</span>
          <h3>Jocs de Rol</h3>
          <p>Campanyes de D&D, One Piece i molt més</p>
        </div>
        <div class="activity-item">
          <span class="activity-icon">🎪</span>
          <h3>Esdeveniments</h3>
          <p>Jornades especials, tallers i celebracions</p>
        </div>
      </div>
    </div>
  </section>

  <section class="about-section">
    <div class="section-card">
      <h2>On Ens Trobes?</h2>
      <div class="location-info">
        <p><strong>📍 Can Jalpí!</strong> - Carrer Sant Joan, Pineda de Mar</p>
        <p><strong>📅 Tots els dimarts</strong></p>
        <p><strong>🕐 De 19:30 a 23:30h</strong></p>
      </div>
    </div>
  </section>

  <section class="about-cta">
    <div class="cta-card">
      <h2>Uneix-te a la Comunitat!</h2>
      <p>Si t'interessen els jocs de taula, Magic: The Gathering, o simplement vols conèixer gent nova amb interessos similars, ets benvingut a Joventuts Màgiques! No importa el teu nivell d'experiència - tenim espai per a principiants i veterans per igual.</p>
      <p class="cta-contact">Vols ser soci, tens dubtes o suggeriments?<a href="https://linktr.ee/joventutsmagiques" class="contact-link" target="_blank" rel="noopener noreferrer">Contacta'ns</a></p>
    </div>
  </section>

  <nav class="page-navigation" role="navigation">
    <a href="/" class="back-link">← Inici</a>
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
  transition: opacity 0.2s ease;
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
