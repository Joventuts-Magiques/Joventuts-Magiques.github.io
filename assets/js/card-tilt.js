/**
 * Card Tilt Effect
 * Adds dynamic 3D tilt effect to game cards based on mouse position
 */

class CardTilt {
  constructor() {
    this.cards = document.querySelectorAll('.game-card');
    this.init();
  }

  init() {
    if (this.prefersReducedMotion()) {
      return;
    }

    this.cards.forEach(card => {
      card.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
      card.addEventListener('mousemove', this.handleMouseMove.bind(this));
      card.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    });
  }

  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  handleMouseEnter(e) {
    const card = e.currentTarget;
    card.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease, border-color 0.3s ease';
  }

  handleMouseMove(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    // Calculate mouse position relative to card center
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation angles (max 8 degrees)
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    // Calculate mouse position as percentage for shine effect
    const mouseXPercent = (x / rect.width) * 100;
    const mouseYPercent = (y / rect.height) * 100;

    // Update CSS custom properties for shine effect
    card.style.setProperty('--mouse-x', `${mouseXPercent}%`);
    card.style.setProperty('--mouse-y', `${mouseYPercent}%`);

    // Apply transform with subtle tilt
    card.style.transform = `
      translateY(-12px)
      scale(1.02)
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
  }

  handleMouseLeave(e) {
    const card = e.currentTarget;
    card.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease';
    card.style.transform = '';
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CardTilt();
  });
} else {
  new CardTilt();
}
