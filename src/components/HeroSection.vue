<template>
  <section class="hero">
    <div class="hero-copy">
      <p class="eyebrow">Greece needs more than beach cleanups. It needs systems.</p>
      <h1>We are engineering the cleanest coastline in the Mediterranean.</h1>
      <p class="lead">
        CleanBeaches Greece combines mechanical beach cleaning fleets, volunteer mobilization,
        and data transparency to remove thousands of kilograms of trash from vulnerable shores.
      </p>
      <div class="hero-cta">
        <button class="solid-button">Donate now</button>
        <a class="ghost-button" href="#roadmap">See our roadmap</a>
      </div>
      <div class="hero-stats">
        <div>
          <p class="stat">12</p>
          <p class="label">Islands committed</p>
        </div>
        <div>
          <p class="stat">24,800 kg</p>
          <p class="label">Plastic removed (pilot)</p>
        </div>
        <div>
          <p class="stat">140%</p>
          <p class="label">Volunteer growth</p>
        </div>
      </div>
    </div>
    <div class="hero-visual">
      <div class="orb"></div>
      <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" alt="Clean beach" />
      <div class="badge">Next clean-up: Milos, Cyclades</div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 3rem;
  align-items: center;
  padding: 3rem 2rem;
}

.hero-copy h1 {
  font-size: clamp(2.5rem, 4vw, 3.8rem);
  margin-bottom: 1rem;
  color: #0f172a;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.8rem;
  color: #0284c7;
  font-weight: 700;
}

.lead {
  font-size: 1.1rem;
  color: #475569;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
}

.hero-stats {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  padding-top: 1.5rem;
}

.stat {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: #0f172a;
}

.label {
  margin: 0;
  color: #475569;
}

.hero-visual {
  position: relative;
  display: flex;
  justify-content: center;
}

.hero-visual img {
  width: 100%;
  border-radius: 20px;
  object-fit: cover;
  max-height: 460px;
}

.orb {
  position: absolute;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.35), transparent 70%);
  filter: blur(5px);
  top: -40px;
  right: 0;
}

.badge {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(15, 23, 42, 0.85);
  color: white;
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  font-weight: 600;
}

button,
.ghost-button {
  border-radius: 999px;
  font-weight: 600;
  padding: 0.75rem 1.8rem;
  cursor: pointer;
  border: none;
}

.ghost-button {
  border: 1px solid #0ea5e9;
  color: #0ea5e9;
  background: transparent;
  text-decoration: none;
}

.solid-button {
  background: linear-gradient(120deg, #0ea5e9, #0284c7);
  color: #fff;
}

@media (max-width: 600px) {
  .hero-cta {
    flex-direction: column;
  }
}
</style>
