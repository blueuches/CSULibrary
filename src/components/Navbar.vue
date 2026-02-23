<template>
  <header class="w-full bg-white border-t-4 border-[#FBC02D] shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        
        <div class="flex items-center gap-3">
          <img src="/csu-logo.png" alt="University Logo" class="w-[55px] h-auto" />
          <div class="flex flex-col font-serif leading-tight text-[#0D2B0F]">
            <span class="text-lg md:text-xl font-bold uppercase tracking-tight">Caraga State</span>
            <span class="text-lg md:text-xl font-bold uppercase tracking-tight">University</span>
          </div>
        </div>

        <nav class="hidden xl:flex items-center space-x-6">
          <RouterLink 
            v-for="link in navLinks" 
            :key="link.path"
            :to="link.path" 
            class="nav-link"
          >
            {{ link.name }}
          </RouterLink>
        </nav>

        <div class="xl:hidden">
          <button class="p-2 text-[#1B5E20]">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

// Updated to match your "Current Navbar" routes and labels
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'announcement', path: '/announcements' },
  { name: 'About', path: '/about' },
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
  font-weight: 500;
  font-size: 0.95rem;
  color: #1B5E20; /* Design Green */
  transition: all 0.3s ease;
  text-transform: capitalize; /* Matches your current label style */
}

.nav-link:hover {
  color: #FBC02D; /* Design Gold */
}

/* Active route styling (optional but useful) */
.router-link-active {
  color: #FBC02D;
  border-bottom: 2px solid #FBC02D;
}
</style>