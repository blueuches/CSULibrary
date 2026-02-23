<template>
  <nav class="w-full bg-white border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex-shrink-0">
          <span class="text-xl font-bold text-slate-800">MyProject</span>
        </div>
        <div class="flex space-x-6">
          <RouterLink to="/" class="text-slate-600 hover:text-slate-900 transition">Home</RouterLink>
          <RouterLink to="/announcements" class="text-slate-600 hover:text-slate-900 transition">announcement</RouterLink>
          <RouterLink to="/about" class="text-slate-600 hover:text-slate-900 transition">About</RouterLink>
          <RouterLink to="/features" class="text-slate-600 hover:text-slate-900 transition">features</RouterLink>
          <RouterLink to="/gallery" class="text-slate-600 hover:text-slate-900 transition">Gallery</RouterLink>
          <RouterLink to="/personnel" class="text-slate-600 hover:text-slate-900 transition">personnel</RouterLink>
          <RouterLink to="/records" class="text-slate-600 hover:text-slate-900 transition">Record</RouterLink>
          <RouterLink to="/services" class="text-slate-600 hover:text-slate-900 transition">services</RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>