<!-- eslint-disable vue/multi-word-component-names -- nom imposé par le planning (Footer.vue) -->
<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <p class="footer__brand">
        <strong>MAPINTE</strong>
        <span>— Registre &amp; exploration des microbrasseries artisanales</span>
      </p>
      <p class="footer__meta">
        Données :
        <a href="https://www.openbrewerydb.org/" target="_blank" rel="noopener noreferrer"
          >Open Brewery DB</a
        >
        · © {{ year }} MaPinte · CPNV SI-CA2a
      </p>
      <p class="footer__warning">
        L'abus d'alcool est dangereux pour la santé, à consommer avec modération.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: auto;
  background: #f8fafc;
  border-top: 1px solid rgb(0 0 0 / 0.08);
  font-size: 12px;
  color: #475569;
}

.footer__inner {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 16px;
}

.footer p {
  margin: 0;
}

.footer__brand strong {
  color: #0f172a;
  letter-spacing: 0.08em;
  margin-right: 6px;
}

.footer a {
  color: #0f172a;
  font-weight: 600;
}
</style>
