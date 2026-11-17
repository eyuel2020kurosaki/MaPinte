<script setup>
const members = ['Eyuel Worku', 'Taveeporn Matta', 'Amin Torrisi', 'Farah Mohamed Ahmed']
const stack = ['Vue.js 3', 'Vue Router', 'Pinia', 'Axios', 'Open Brewery DB']
</script>

<template>
  <section class="about">
    <div class="container about__inner">
      <p class="eyebrow">À propos</p>
      <h1 class="headline">Un atlas des brasseries artisanales.</h1>
      <p class="lead">
        MaPinte est une application web réalisée dans le cadre du module Frontend du CPNV (classe
        SI&#8209;CA2a), selon la méthode Agile Scrum.
      </p>

      <div class="about__grid">
        <div class="tile">
          <h2>L'équipe</h2>
          <ul>
            <li v-for="name in members" :key="name">{{ name }}</li>
          </ul>
        </div>
        <div class="tile">
          <h2>Technologies</h2>
          <ul>
            <li v-for="item in stack" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>

      <p class="about__source">
        Les données proviennent de
        <a
          href="https://www.openbrewerydb.org/"
          class="link-chevron"
          target="_blank"
          rel="noopener noreferrer"
          >Open Brewery DB<span class="visually-hidden"> (nouvel onglet)</span></a
        >
      </p>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding-block: clamp(56px, 10vw, 104px) 96px;
}

.about__inner {
  max-width: 820px;
}

.about__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-top: 56px;
}

.tile {
  padding: 28px;
  border-radius: var(--radius);
  background: var(--bg-secondary);
}

.tile h2 {
  font-size: 24px;
  margin-bottom: 12px;
}

.tile ul {
  margin: 0;
  padding: 0;
  list-style: none;
  color: var(--text-secondary);
}

.tile li + li {
  margin-top: 4px;
}

.about__source {
  margin-top: 40px;
  color: var(--text-secondary);
}
</style>
