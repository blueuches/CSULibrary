<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { db } from "@/firebase"

console.log("Firestore instance:", db)

const route = useRoute()

const isAdminRoute = computed(() =>
  route.path.startsWith('/admin')
)
</script>

<!-- max-w-7xl -->

<template>
  <div class="min-h-screen w-full flex flex-col bg-slate-50">
    <Navbar  v-if="!isAdminRoute" />
    <main class="flex-grow w-full !p-0 !m-0">
      <RouterView />
    </main>
    <Footer v-if="!isAdminRoute" />
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
