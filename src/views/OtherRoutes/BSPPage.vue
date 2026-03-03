<template>
  <div class="w-full py-6 px-4 max-w-7xl mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <!-- LEFT: Article (2/3) -->
      <div class="lg:col-span-2">
        <!-- Tags -->
        <div class="flex gap-2 mb-3">
          <span
            style="
              font-size: 0.75rem;
              font-weight: 700;
              color: #1b5e20;
              border-left: 3px solid #1b5e20;
              padding-left: 8px;
            "
            >News</span
          >
          <span
            style="
              font-size: 0.75rem;
              font-weight: 700;
              color: #1b5e20;
              border-left: 3px solid #f9a825;
              padding-left: 8px;
            "
            >Caraga State University Library</span
          >
        </div>

        <!-- Title -->
        <h1
          style="font-size: 2rem; font-weight: 900; color: #0d2b0f; line-height: 1.3"
          class="mb-4"
        >
          The Bangko Sentral ng Pilipinas (BSP), together with Caraga State University formally
          launch the BSP Knowledge Resource Network (KRN) at CSU Library.
        </h1>

        <!-- Meta -->
        <div class="flex gap-4 mb-6" style="font-size: 0.8rem; color: #666">
          <span class="flex items-center gap-1">
            <svg
              class="w-4 h-4"
              style="color: #1b5e20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            February 19, 2026
          </span>
        </div>

        <!-- Main Image -->
        <div class="mb-8">
          <img
            src="@/assets/images/BSP.jpg"
            alt="BSP KRN Launch"
            class="w-full object-cover rounded-sm"
          />
        </div>

        <!-- Paragraph 1 -->
        <p class="mb-6" style="font-size: 1rem; color: #222; line-height: 1.8; text-align: justify">
          The Bangko Sentral ng Pilipinas (BSP), together with Caraga State University formally
          launch the BSP Knowledge Resource Network (KRN) at CSU Library.
        </p>

        <!-- Paragraph 2 -->
        <p class="mb-6" style="font-size: 1rem; color: #222; line-height: 1.8; text-align: justify">
          The KRN is an initiative at information and knowledge sharing that aims to enhance the
          public's understanding of economic and financial concepts and issues, and thus empower
          them to contribute more meaningfully to economic development and benefit better from the
          opportunities that such development would bring. In partnership with libraries, the BSP
          will set up Knowledge Resource Collections that will house updated BSP publications such
          as books, reports, guides, manuals, primers and brochures, as well as provide access to
          online publications and research assistance services to the public. These information
          resources and services will be made available to the local communities for free.
        </p>

        <!-- Blockquote -->
        <blockquote class="my-8 pl-6" style="border-left: 4px solid #1b5e20; position: relative">
          <span
            style="
              font-size: 4rem;
              font-weight: 900;
              color: #1b5e20;
              opacity: 0.2;
              position: absolute;
              top: -10px;
              left: 12px;
              line-height: 1;
            "
            >"</span
          >
          <p style="font-size: 1rem; font-style: italic; color: #0d2b0f; line-height: 1.8">
            "BSP envisions KRN to be a catalyst for economic development by empowering the public to
            make informed and better economic and financial decisions through easy access to
            information and services."
          </p>
        </blockquote>
      </div>

      <!-- RIGHT: Latest Post (1/3) -->
      <div class="lg:col-span-1 self-start">
        <div class="sticky top-6">
          <h2
            style="
              font-size: 1.2rem;
              font-weight: 900;
              color: #0d2b0f;
              border-bottom: 3px solid #f9a825;
              padding-bottom: 8px;
            "
            class="mb-4"
          >
            LIBRARY UPDATES
          </h2>

          <!-- Post Item -->
          <div
            v-for="(post, i) in latestPosts"
            :key="i"
            class="flex gap-3 mb-4 cursor-pointer group"
          >
            <img
              :src="post.image"
              :alt="post.title"
              class="w-20 h-16 object-cover rounded flex-shrink-0"
            />
            <div>
              <p
                class="group-hover:text-[#1b5e20] transition-colors duration-200"
                style="font-size: 0.85rem; font-weight: 700; color: #1b5e20; line-height: 1.4"
              >
                {{ post.title }}
              </p>
              <p style="font-size: 0.75rem; color: #888" class="mt-1">{{ post.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SCROLL TO TOP -->
    <Transition name="fade">
      <button
        v-if="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-6 right-6 z-50 rounded-lg p-3 transition-all duration-300 hover:scale-110 hover:opacity-90"
        style="background: #0d2b0f"
      >
        <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M5 11l7-7 7 7"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M5 17l7-7 7 7"
          />
        </svg>
      </button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const showScrollTop = ref(false)

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const latestPosts = [
  {
    image: new URL('@/assets/images/card2.jpg', import.meta.url).href,
    title: 'National Book Week Celebration',
    date: 'February 19, 2026',
  },
  {
    image: new URL('@/assets/images/card3.png', import.meta.url).href,
    title: 'STARBOOKS - DOST-STII',
    date: 'February 19, 2026',
  },
  {
    image: new URL('@/assets/images/reservation.jpg', import.meta.url).href,
    title: 'AVR Reservation',
    date: 'February 19, 2026',
  },
  {
    image: new URL('@/assets/images/top.jpg', import.meta.url).href,
    title: 'Top Library Borrowers and Visitors',
    date: 'February 19, 2026',
  },
  {
    image: new URL('@/assets/images/newly_acc_books.png', import.meta.url).href,
    title: 'Newly Acquired Books',
    date: 'February 19, 2026',
  },
]
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
