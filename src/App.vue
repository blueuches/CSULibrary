<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue' 
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="min-h-screen w-full flex flex-col bg-slate-50 overflow-x-hidden">
    
    <Navbar />

    <main class="flex-grow w-full">
      <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <RouterView />
      </div>
    </main>

    <Footer />

  </div>
</template>

<style>
/* Ensuring the browser doesn't add default padding/margins 
  that would break the "full-width" look of the Navbar/Footer.
*/
body {
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
}
</style>