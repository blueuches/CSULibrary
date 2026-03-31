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
        <div>
          <div class="header-breadcrumb">
            <span>Admin</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="inline-block w-4 h-4 mx-2">
              <path d="M9 5l7 7-7 7"/>
            </svg>
            <span>Website Management</span>
          </div>

          <h1 class="header-title text-3xl font-black">
            Website <span class="text-yellow-500">Overview</span>
          </h1>

          <p class="header-sub text-gray-600">
            Manage website visuals and assets
          </p>
        </div>
      </header>

      <!-- NAVIGATION -->
      <div class="flex gap-4 mb-10 flex-wrap">
        <button
          @click="activeSection='carousel'"
          :class="activeSection==='carousel'
            ? 'bg-[#0B2010] text-white'
            : 'bg-white text-gray-600 hover:bg-gray-100'"
          class="px-6 py-3 rounded-xl font-bold shadow-sm transition"
        >
          Hero Carousel
        </button>

        <button
          @click="activeSection='cards'"
          :class="activeSection==='cards'
            ? 'bg-[#0B2010] text-white'
            : 'bg-white text-gray-600 hover:bg-gray-100'"
          class="px-6 py-3 rounded-xl font-bold shadow-sm transition"
        >
          Feature Cards
        </button>

        <button
          @click="activeSection='library'"
          :class="activeSection==='library'
            ? 'bg-[#0B2010] text-white'
            : 'bg-white text-gray-600 hover:bg-gray-100'"
          class="px-6 py-3 rounded-xl font-bold shadow-sm transition"
        >
          Library Banner
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
import { getAllWebsiteImages } from '@/services/websiteImageService'

const router = useRouter()
const route = useRoute()
const activeSection = ref('carousel')
const mediaItems = ref<any[]>([])

// Load media from backend
const loadMedia = async () => {
  const data = await getAllWebsiteImages()
  mediaItems.value = data
}

// Initial load
onMounted(() => loadMedia())

/* HERO CAROUSEL */
const carouselImages = computed(() =>
  mediaItems.value.filter(
    item => item.page === 'homepage' && item.section === 'carousel'
  )
)

/* FEATURE CARDS */
const featureCards = computed(() =>
  mediaItems.value.filter(
    item => item.page === 'homepage' && item.section === 'read-learn-discover'
  )
)

/* CSU LIBRARY BANNER */
const libraryBanner = computed(() =>
  mediaItems.value.find(
    item => item.title === 'CSU Library Main Image'
  )
)

// Navigate to editor
const goToEditor = (target: string, currentFile: string) => {
  router.push({
    name: 'website-images',
    query: { target, file: currentFile }
  })
}

// ✅ Auto-refresh images after returning from editor
router.afterEach((to, from) => {
  // Only reload if we came back from editor page
  if (from.name === 'website-images') {
    loadMedia()
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');

.animate-fade-in {
  animation:fadeIn .5s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity:0;
    transform:translateY(20px);
  }
  to {
    opacity:1;
    transform:translateY(0);
  }
}
</style>