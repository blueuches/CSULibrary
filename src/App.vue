<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<!-- max-w-7xl -->
 
<template>
  <div class="min-h-screen w-full flex flex-col bg-slate-50">
    <Navbar />
    <main class="flex-grow w-full !p-0 !m-0">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
}
</style>