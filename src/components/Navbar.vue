<template>
  <header class="w-full bg-white border-t-4 border-[#FBC02D] shadow-sm">
    <div class="w-full px-6 lg:px-10">
      <div class="flex justify-between items-center h-20">
        <div class="flex items-center">
          <img src="/csu-logo.png" alt="University Logo" class="w-[55px] h-auto" />
          <div class="flex flex-col font-serif leading-tight text-[#0d2b0f]">
            <span class="text-lg md:text-xl font-bold uppercase tracking-tight">Caraga State</span>
            <span class="text-lg md:text-xl font-bold uppercase tracking-tight">University</span>
          </div>
        </div>

        <nav class="hidden xl:flex items-center">
          <RouterLink v-for="link in navLinks" :key="link.path" :to="link.path" class="nav-link">
            {{ link.name }}
          </RouterLink>
        </nav>

        <div class="xl:hidden">
          <button class="p-2 text-[#1B5E20]">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'announcement', path: '/announcements' },
  { name: 'features', path: '/features' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'personnel', path: '/personnel' },
  { name: 'Record', path: '/records' },
  { name: 'services', path: '/services' },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

.font-serif {
  font-family: Georgia, serif;
}

.nav-link {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  color: #0d2b0f;
  transition: all 0.3s ease;
  text-transform: capitalize;
  margin: 0 10px;
}

.nav-link:hover {
  color: #2e7d32;
}

/* Active route */
.router-link-active {
  color: #2e7d32;
  border-bottom: 2px solid #fbc02d;
}
</style>
