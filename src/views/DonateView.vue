<template>
  <section class="donate-view">
    <div class="donate-hero">
      <p class="eyebrow">Fuel the fleet</p>
      <h1>Direct your support into machines, crews, and transparency.</h1>
      <p>
        This initial pledge form captures intent so we can route you to the correct payment flow (Stripe, SEPA, or municipal
        co-funding). A CleanBeaches team member will follow up with the full compliance packet.
      </p>
    </div>
    <form class="donate-form" @submit.prevent>
      <label>
        Full name / Organization
        <input type="text" name="name" placeholder="Maria Papadopoulou" required />
      </label>
      <label>
        Email
        <input type="email" name="email" placeholder="you@example.com" required />
      </label>
      <label>
        Preferred contribution amount (€)
        <input type="number" name="amount" min="25" step="25" placeholder="10400" />
      </label>
      <label>
        Funding channel
        <select name="channel" required>
          <option value="stripe">Stripe (card / Apple Pay)</option>
          <option value="sepa">SEPA transfer</option>
          <option value="grant">Grant / CSR partnership</option>
          <option value="municipal">Municipal contract</option>
        </select>
      </label>
      <label>
        Message / intent
        <textarea name="message" rows="4" placeholder="Tell us about the coastline or program you want to underwrite"></textarea>
      </label>
      <button type="submit" class="solid-button">Submit pledge</button>
      <p class="disclaimer">No payment is processed on this screen. We reply within one business day with the secure payment link.</p>
    </form>
  </section>
</template>

<style scoped>
.donate-view {
  padding: 2rem 2rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 960px;
  margin: 0 auto;
}

.donate-hero {
  text-align: center;
}

.donate-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #fff;
  padding: 2.5rem;
  border-radius: 32px;
  box-shadow: 0 25px 60px rgba(15, 23, 42, 0.12);
}

label {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  color: #0f172a;
  gap: 0.4rem;
}

input,
select,
textarea {
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.15);
  padding: 0.85rem 1rem;
  font-size: 1rem;
  font-family: inherit;
}

textarea {
  resize: vertical;
}

button {
  align-self: flex-start;
  border: none;
}

.disclaimer {
  margin: 0;
  font-size: 0.85rem;
  color: #475569;
}

@media (max-width: 640px) {
  .donate-form {
    padding: 1.5rem;
  }
}
</style>
