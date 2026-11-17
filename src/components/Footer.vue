<script setup>
import { RouterLink } from 'vue-router'

const year = new Date().getFullYear()
const members = ['Eyuel Worku', 'Taveeporn Matta', 'Amin Torrisi', 'Farah Mohamed Ahmed']
</script>

<template>
  <footer class="footer">
    <div class="container">
      <p class="footer__notice">
        L'abus d'alcool est dangereux pour la santé, à consommer avec modération.
      </p>

      <div class="footer__grid">
        <div>
          <p class="footer__brand">MaPinte</p>
          <p>Registre et exploration des microbrasseries artisanales.</p>
        </div>

        <nav aria-label="Liens du pied de page">
          <ul class="footer__links">
            <li><RouterLink to="/">Catalogue</RouterLink></li>
            <li><RouterLink to="/a-propos">À propos</RouterLink></li>
            <li>
              <a href="https://www.openbrewerydb.org/" target="_blank" rel="noopener noreferrer"
                >Open Brewery DB<span class="visually-hidden"> (nouvel onglet)</span></a
              >
            </li>
          </ul>
        </nav>
      </div>

      <div class="footer__bottom">
        <p>Copyright &copy; {{ year }} MaPinte. Projet Frontend, CPNV SI&#8209;CA2a.</p>
        <p>
          <template v-for="(member, i) in members" :key="member">
            <template v-if="i"> · </template>
            <span class="footer__member">{{ member }}</span>
          </template>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--bg-secondary);
  color: var(--text-secondary);
  font-size: 12px;
  line-height: 1.33;
  letter-spacing: -0.01em;
  padding-block: 18px 22px;
  border-top: 1px solid var(--separator);
}

.footer__notice {
  padding-bottom: 14px;
  border-bottom: 1px solid var(--separator);
}

.footer__grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px 40px;
  padding-block: 18px;
  border-bottom: 1px solid var(--separator);
}

.footer__brand {
  color: var(--text);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
}

.footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.footer__links a {
  color: var(--text);
}

.footer__member {
  white-space: nowrap;
}

.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 6px 24px;
  padding-top: 14px;
}
</style>
