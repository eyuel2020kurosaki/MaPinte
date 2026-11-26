<script setup>
import { RouterLink } from 'vue-router'

const team = ['Eyuel Worku', 'Taveeporn Matta', 'Amin Torrisi', 'Farah Mohamed Ahmed']
const stack = ['Vue.js 3', 'Vue Router', 'Pinia', 'Axios', 'Open Brewery DB']
</script>

<template>
  <main class="about">
    <h1>À propos de MaPinte</h1>

    <p class="about__lead">
      MaPinte permet d'explorer, de rechercher et de filtrer des brasseries artisanales et des bars
      à bière du monde entier, à partir des données ouvertes d'Open Brewery DB.
    </p>

    <section class="about__section" aria-labelledby="about-projet">
      <h2 id="about-projet">Le projet</h2>
      <p>
        Application réalisée dans le cadre du module Frontend au CPNV (filière informatique, classe
        SI-CA2a), en méthode Agile Scrum avec un suivi des sprints dans iceScrum.
      </p>
    </section>

    <section class="about__section" aria-labelledby="about-equipe">
      <h2 id="about-equipe">L'équipe</h2>
      <ul class="about__list">
        <li v-for="member in team" :key="member">{{ member }}</li>
      </ul>
    </section>

    <section class="about__section" aria-labelledby="about-techno">
      <h2 id="about-techno">Technologies</h2>
      <ul class="about__tags">
        <li v-for="tech in stack" :key="tech">{{ tech }}</li>
      </ul>
      <p>
        Données :
        <a href="https://www.openbrewerydb.org/" target="_blank" rel="noopener noreferrer"
          >Open Brewery DB</a
        >
        (API publique et gratuite).
      </p>
    </section>

    <RouterLink to="/" class="about__back">← Retour au catalogue</RouterLink>
  </main>
</template>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 32px 16px 48px;
  box-sizing: border-box;
}

.about h1 {
  margin: 0;
}

.about__lead {
  margin: 0;
  font-size: 1.0625rem;
  line-height: 1.6;
  color: #475569;
}

.about__section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.about__section h2 {
  margin: 0;
  font-size: 1.125rem;
}

.about__section p {
  margin: 0;
  line-height: 1.6;
}

.about__list {
  margin: 0;
  padding-left: 20px;
  line-height: 1.8;
}

.about__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.about__tags li {
  padding: 2px 8px;
  border-radius: 4px;
  background: #f1f5f9;
  color: #0b1527;
  font-family: ui-monospace, 'SFMono-Regular', 'JetBrains Mono', Menlo, Consolas, monospace;
  font-size: 0.8125rem;
}

.about a {
  color: #0f172a;
  font-weight: 600;
}

.about__back {
  align-self: flex-start;
  padding: 8px 16px;
  border-radius: 4px;
  background: #0b1527;
  color: #ffffff !important;
  text-decoration: none;
  font-size: 0.875rem;
}

.about__back:focus-visible {
  outline: 3px solid #b8860b;
  outline-offset: 2px;
}
</style>
