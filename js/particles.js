// Particle System for WMB Cafe
class ParticleSystem {
  constructor() {
    this.particles = [];
    this.particleCount = 50;
    this.init();
  }

  init() {
    this.createParticles();
    this.animate();
  }

  createParticles() {
    const container = document.body;
    
    for (let i = 0; i < this.particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random size between 2-6px
      const size = Math.random() * 4 + 2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      // Random position
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      
      // Random animation delay
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
      
      // Random opacity
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      
      container.appendChild(particle);
      this.particles.push(particle);
    }
  }

  animate() {
    // Particles are animated via CSS, but we can add interactive effects here
    this.particles.forEach((particle, index) => {
      // Add mouse interaction
      document.addEventListener('mousemove', (e) => {
        const rect = particle.getBoundingClientRect();
        const distance = Math.sqrt(
          Math.pow(e.clientX - (rect.left + rect.width / 2), 2) +
          Math.pow(e.clientY - (rect.top + rect.height / 2), 2)
        );
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.style.transform = `scale(${1 + force * 0.5})`;
          particle.style.opacity = Math.min(1, 0.3 + force * 0.7);
        } else {
          particle.style.transform = 'scale(1)';
          particle.style.opacity = 0.3;
        }
      });
    });
  }

  destroy() {
    this.particles.forEach(particle => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    });
    this.particles = [];
  }
}

// Initialize particle system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ParticleSystem();
});

// Add floating animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { 
      transform: translateY(0px) rotate(0deg) translateX(0px); 
    }
    25% { 
      transform: translateY(-20px) rotate(90deg) translateX(10px); 
    }
    50% { 
      transform: translateY(-40px) rotate(180deg) translateX(-5px); 
    }
    75% { 
      transform: translateY(-20px) rotate(270deg) translateX(-10px); 
    }
  }
  
  .particle {
    position: fixed;
    background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(102,126,234,0.3) 100%);
    border-radius: 50%;
    pointer-events: none;
    z-index: -1;
    animation: float 6s ease-in-out infinite;
    transition: all 0.3s ease;
  }
`;
document.head.appendChild(style);
