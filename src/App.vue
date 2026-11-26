<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="app">
    <Navbar />
    <RouterView />
    <Footer />
  </div>
</template>

<style>
body {
  margin: 0;
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    sans-serif;
  color: #0f172a;
  background: #ffffff;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
