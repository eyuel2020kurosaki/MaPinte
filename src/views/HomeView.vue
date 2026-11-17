<template>
  <section class="hero">
    <div class="container hero__inner">
      <p class="eyebrow">Brasseries artisanales</p>
      <h1 class="headline headline--hero">Trouvez votre prochaine pinte.</h1>
      <p class="lead hero__lead">
        Recherchez, filtrez et découvrez les microbrasseries et brewpubs près de chez vous, ou à
        l'autre bout du monde.
      </p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-block: clamp(64px, 12vw, 128px) clamp(56px, 10vw, 104px);
  text-align: center;
}

.hero__inner {
  max-width: 820px;
}

.hero__lead {
  max-width: 600px;
  margin-inline: auto;
}

/* Apparition douce au chargement, décalée élément par élément */
.hero__inner > * {
  animation: rise 0.8s var(--ease) both;
}

.hero__inner > :nth-child(2) {
  animation-delay: 0.08s;
}

.hero__inner > :nth-child(3) {
  animation-delay: 0.16s;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
}
</style>
