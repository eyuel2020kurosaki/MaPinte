<script setup>
const year = new Date().getFullYear()
const members = ['Eyuel Worku', 'Taveeporn Matta', 'Amin Torrisi', 'Farah Mohamed Ahmed']
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <p class="footer__title">
        <strong>MaPinte</strong> &copy; {{ year }} — Projet Frontend, CPNV SI-CA2a
      </p>
      <p class="footer__members">Réalisé par {{ members.join(', ') }}</p>
      <p class="footer__source">
        Données fournies par
        <a href="https://www.openbrewerydb.org/" target="_blank" rel="noopener noreferrer"
          >Open Brewery DB</a
        >
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--color-dark);
  color: var(--color-border);
  font-size: 0.9rem;
}

.footer__inner {
  padding-block: 24px;
  text-align: center;
}

.footer p {
  margin: 0.25em 0;
}

.footer__title strong {
  color: var(--color-primary);
}

.footer a {
  color: var(--color-primary);
}
</style>
