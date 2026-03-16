<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- SIDEBAR -->
    <div class="sticky top-0 h-screen">
      <Sidebar />
    </div>

    <!-- MAIN CONTENT -->
    <div class="flex-1 py-10 px-6 md:pl-8 md:pr-16" style="font-family: 'Poppins', sans-serif">
      <!-- HEADER -->
      <header class="mb-10 flex items-center gap-4">
        <div class="header-left">
          <div class="header-breadcrumb">
            <span>Admin</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 5l7 7-7 7" />
            </svg>
            <span>Web Overview</span>
          </div>
          <h1 class="header-title">Web <span class="text-yellow-500">Overview</span></h1>
          <p class="header-sub">Manage website visuals and assets</p>
        </div>
      </header>

      <!-- TOP NAVIGATION -->
      <div class="flex gap-4 mb-10 flex-wrap">
        <button
          @click="activeSection = 'carousel'"
          :class="
            activeSection === 'carousel'
              ? 'bg-[#0B2010] text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          "
          class="px-6 py-3 rounded-xl font-bold shadow-sm transition"
        >
          Hero Carousel
        </button>

        <button
          @click="activeSection = 'cards'"
          :class="
            activeSection === 'cards'
              ? 'bg-[#0B2010] text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          "
          class="px-6 py-3 rounded-xl font-bold shadow-sm transition"
        >
          Feature Cards
        </button>

        <button
          @click="activeSection = 'about'"
          :class="
            activeSection === 'about'
              ? 'bg-[#0B2010] text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          "
          class="px-6 py-3 rounded-xl font-bold shadow-sm transition"
        >
          About Banner
        </button>
      </div>

      <!-- HERO CAROUSEL -->
      <section v-if="activeSection === 'carousel'" class="animate-fade-in">
        <div class="bg-white rounded-3xl shadow-lg p-10">
          <div class="flex justify-between items-center mb-8">
            <h4 class="font-black text-xl">Hero Carousel Slides</h4>

            <button
              @click="goToEditor('New Slide', 'new.jpg')"
              class="px-6 py-3 bg-[#0d2b0f] text-white rounded-xl font-bold hover:bg-[#1b5e20] transition"
            >
              Add Slide
            </button>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div
              v-for="n in 5"
              :key="n"
              class="flex items-center gap-6 bg-gray-50 p-6 rounded-2xl border hover:shadow-md transition"
            >
              <div
                class="w-40 h-24 bg-gray-200 rounded-xl flex items-center justify-center text-xs text-gray-500"
              >
                Slide {{ n }} Preview
              </div>

              <div class="flex-1">
                <h5 class="font-bold text-gray-800">Hero Slide {{ n }}</h5>
                <p class="text-xs text-gray-400">Main_Hero_Asset_{{ n }}.webp</p>
              </div>

              <button
                @click="goToEditor(`Hero Slide ${n}`, `hero_${n}.jpg`)"
                class="px-5 py-2 bg-[#0d2b0f] text-white rounded-lg text-sm hover:bg-[#1b5e20] transition"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- FEATURE CARDS -->
      <section v-if="activeSection === 'cards'" class="animate-fade-in">
        <div class="bg-white rounded-3xl shadow-lg p-10">
          <h4 class="font-black text-xl mb-8">Feature Cards</h4>

          <div class="grid md:grid-cols-3 gap-8">
            <div
              v-for="tag in ['Read', 'Learn', 'Discover']"
              :key="tag"
              @click="goToEditor(`${tag} Card`, `lib-${tag.toLowerCase()}.jpg`)"
              class="aspect-[4/5] bg-gray-50 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-[#0B2010] hover:bg-green-50 transition"
            >
              <div
                class="w-20 h-20 bg-white shadow rounded-2xl mb-6 flex items-center justify-center text-green-700"
              >
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                  />
                </svg>
              </div>

              <h5 class="font-black text-[#0B2010] tracking-widest uppercase">
                {{ tag }}
              </h5>

              <p class="text-xs text-gray-400 mt-2">Change Image</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ABOUT BANNER -->
      <section v-if="activeSection === 'about'" class="animate-fade-in">
        <div class="bg-white rounded-3xl shadow-lg p-10">
          <h4 class="font-black text-xl mb-8">About Page Banner</h4>

          <div
            class="aspect-[21/9] bg-gray-200 rounded-3xl flex items-center justify-center relative group overflow-hidden"
          >
            <div class="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
              <svg class="w-24 h-24 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
              10-4.48 10-10S17.52 2 12 2z"
                />
              </svg>

              <p class="font-bold text-lg">Banner Preview</p>
            </div>

            <div
              class="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition"
            >
              <button
                @click="goToEditor('About Banner', 'about-bg.jpg')"
                class="px-8 py-4 bg-[#0d2b0f] text-white font-bold rounded-xl hover:bg-[#1b5e20] transition"
              >
                Replace Banner
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'

const router = useRouter()

const activeSection = ref('carousel')

const goToEditor = (target: string, currentFile: string) => {
  router.push({
    name: 'website-images',
    query: {
      target,
      file: currentFile,
    },
  })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');

.animate-fade-in {
  animation: fadeIn 0.5s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
