<template>
  <section id="volunteer" class="volunteer">
    <div>
      <p class="eyebrow">Volunteer network</p>
      <h2>Locals + travelers welcome.</h2>
      <p>
        Sign up to receive SMS deploy alerts, logistics briefings, and post-operation transparency decks. We coordinate with
        municipalities so every action is permitted, insured, and safe.
      </p>
    </div>
    <form class="signup-form" @submit.prevent>
      <label>
        Full name
        <input type="text" name="name" placeholder="Athina Karidi" required />
      </label>
      <label>
        Email
        <input type="email" name="email" placeholder="you@example.com" required />
      </label>
      <label>
        Preferred region
        <select name="region">
          <option value="Cyclades">Cyclades</option>
          <option value="Dodecanese">Dodecanese</option>
          <option value="Ionian">Ionian</option>
          <option value="Crete">Crete</option>
          <option value="Attica">Attica</option>
        </select>
      </label>
      <button type="submit" class="solid-button">Join the roster</button>
      <p class="disclaimer">We will never spam or sell your data. GDPR-compliant opt-out anytime.</p>
    </form>
  </section>
</template>

<style scoped>
.volunteer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 3rem 2rem;
  align-items: center;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 15px 40px rgba(15, 23, 42, 0.08);
}

label {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  color: #0f172a;
  gap: 0.3rem;
}

input,
select {
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.15);
  padding: 0.75rem 1rem;
  font-size: 1rem;
}

.disclaimer {
  margin: 0;
  font-size: 0.85rem;
  color: #475569;
}

button {
  border: none;
}
</style>
