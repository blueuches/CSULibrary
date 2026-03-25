<template>
  <div class="w-full py-6 px-4 max-w-7xl mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <!-- LEFT: Article (2/3) -->
      <div class="lg:col-span-2">
        <!-- Back Button + Tags -->
        <div class="flex items-center gap-3 mb-3">
          <button
            @click="$router.back()"
            class="inline-flex items-center gap-1 text-sm font-semibold text-[#1b5e20] hover:underline"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>

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
          National Book Week Celebration
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
            src="@/assets/images/card2.jpg"
            alt="National Book Week Celebration"
            class="w-full object-cover rounded-sm"
          />
        </div>

        <!-- Paragraph 1 -->
        <p class="mb-6" style="font-size: 1rem; color: #222; line-height: 1.8; text-align: justify">
          CSU Library Celebrates 84th National Book Week with the theme "Connected Actions.
          Collective Vision: Libraries Transforming Society"
        </p>

        <!-- Paragraph 2 -->
        <p class="mb-6" style="font-size: 1rem; color: #222; line-height: 1.8; text-align: justify">
          The National Book Week is an annual celebration that aims to promote reading and literacy
          among Filipinos. The CSU Library actively participates in this event by organizing various
          activities for students, faculty, and staff.
        </p>

        <!-- ACTIVITIES SECTION -->
        <div class="mt-8">
          <!-- Header -->
          <div class="mb-6 px-4 py-3 rounded-sm" style="background: #1b5e20">
            <h2 style="font-size: 1.2rem; font-weight: 900; color: white; letter-spacing: 0.05em">
              Activities
            </h2>
          </div>

          <!-- Tabs + Carousel Layout -->
          <div class="flex flex-col md:flex-row gap-6 mb-8">
            <!-- Image Carousel -->
            <div class="flex-1">
              <p
                class="text-center mb-3"
                style="font-size: 0.9rem; font-weight: 700; color: #0d2b0f"
              >
                {{ tabs[activeTab]?.label }} Photos
              </p>
              <div class="relative overflow-hidden rounded-lg">
                <div
                  class="flex transition-transform duration-500 ease-in-out"
                  :style="{ transform: `translateX(-${carouselIndex * 100}%)` }"
                >
                  <div
                    v-for="(img, i) in tabs[activeTab]?.images ?? []"
                    :key="i"
                    class="min-w-full"
                  >
                    <img
                      :src="img"
                      class="w-full object-contain rounded-lg"
                      style="max-height: 500px"
                    />
                  </div>
                </div>
                <!-- Dots -->
                <div
                  v-if="(tabs[activeTab]?.images ?? []).length > 1"
                  class="flex justify-center gap-2 mt-3"
                >
                  <button
                    v-for="(_, i) in tabs[activeTab]?.images ?? []"
                    :key="i"
                    @click="carouselIndex = i"
                    class="w-2 h-2 rounded-full transition-all"
                    :style="{ background: carouselIndex === i ? '#f9a825' : '#ccc' }"
                  />
                </div>
              </div>
            </div>

            <!-- Tabs -->
            <div class="flex md:flex-col gap-2">
              <button
                v-for="(tab, i) in tabs"
                :key="i"
                @click="setTab(i)"
                class="px-6 py-3 text-sm font-bold rounded-sm transition-all duration-200"
                :style="
                  activeTab === i
                    ? 'background: #f9a825; color: #0d2b0f;'
                    : 'background: #1b5e20; color: white;'
                "
              >
                {{ tab.label }}
              </button>
            </div>
          </div>

          <!-- Prize Details -->
          <div v-for="(tab, i) in tabs" :key="i" class="mb-6">
            <div class="px-4 py-2 mb-3 rounded-sm" style="background: #1b5e20">
              <h3 style="font-size: 1rem; font-weight: 900; color: white">
                {{ tab.contestTitle }}
              </h3>
            </div>
            <p class="mb-2" style="font-size: 0.9rem; color: #444">
              The winners received the following prizes:
            </p>
            <ul class="space-y-1">
              <li v-for="(prize, j) in tab.prizes" :key="j" style="font-size: 0.9rem; color: #222">
                <span style="font-weight: 700">{{ prize.place }}</span> - {{ prize.description }}
              </li>
            </ul>
          </div>
        </div>

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
            "Connected Actions. Collective Vision: Libraries Transforming Society."
          </p>
        </blockquote>
      </div>

      <!-- Library Updates -->
      <div>
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
        <div
          v-for="(post, i) in latestPosts"
          :key="i"
          class="flex gap-3 mb-4 cursor-pointer group"
          @click="router.push(post.route)"
        >
          <img
            :src="post.image"
            :alt="post.title"
            class="w-20 h-16 object-cover rounded flex-shrink-0 group-hover:brightness-90 transition-all duration-200"
          />
          <div class="flex flex-col justify-center min-w-0">
            <span
              class="group-hover:underline"
              style="font-size: 0.85rem; font-weight: 700; color: #1b5e20; line-height: 1.4"
            >
              {{ post.title }}
            </span>
            <p style="font-size: 0.75rem; color: #888" class="mt-1">{{ post.date }}</p>
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
import { useRouter } from 'vue-router'
const router = useRouter()

import card1 from '@/assets/images/card1.jpg'
import card3 from '@/assets/images/card3.png'
import reservation from '@/assets/images/reservation.jpg'
import top from '@/assets/images/top.jpg'
import newlyAccBooks from '@/assets/images/newly_acc_books.png'
import poster3 from '@/assets/images/poster3.jpg'

const activeTab = ref(0)
const carouselIndex = ref(0)
const showScrollTop = ref(false)

function setTab(i: number) {
  activeTab.value = i
  carouselIndex.value = 0
}

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

const tabs = [
  {
    label: 'Poster',
    contestTitle: 'Poster Making Contest',
    images: [poster3, poster3, poster3],
    prizes: [
      { place: '1st prize', description: '₱2,000 and Certificate of Recognition from CSU Library' },
      { place: '2nd prize', description: '₱1,000 and Certificate of Recognition from CSU Library' },
      { place: '3rd prize', description: '₱600 and Certificate of Recognition from CSU Library' },
      { place: 'Consolation', description: '₱200 for consolation price' },
    ],
  },
  {
    label: 'Essay',
    contestTitle: 'Essay Writing Contest',
    images: [poster3, poster3, poster3],
    prizes: [
      { place: '1st prize', description: '₱2,000 and Certificate of Recognition from CSU Library' },
      { place: '2nd prize', description: '₱1,000 and Certificate of Recognition from CSU Library' },
      { place: '3rd prize', description: '₱600 and Certificate of Recognition from CSU Library' },
      { place: 'Consolation', description: '₱200 for consolation price' },
    ],
  },
  {
    label: 'Quiz',
    contestTitle: 'Quiz Contest',
    images: [poster3, poster3, poster3],
    prizes: [
      { place: '1st prize', description: '₱2,000 and Certificate of Recognition from CSU Library' },
      { place: '2nd prize', description: '₱1,000 and Certificate of Recognition from CSU Library' },
      { place: '3rd prize', description: '₱600 and Certificate of Recognition from CSU Library' },
      { place: 'Consolation', description: '₱200 for consolation price' },
    ],
  },
  {
    label: 'Shelfie',
    contestTitle: 'CSU Library Shelfie Contest',
    images: [poster3, poster3, poster3],
    prizes: [
      { place: '1st prize', description: '₱1,000 and Certificate of Recognition from CSU Library' },
      { place: '2nd prize', description: '₱500 and Certificate of Recognition from CSU Library' },
      { place: '3rd prize', description: '₱300 and Certificate of Recognition from CSU Library' },
      { place: 'Consolation', description: '₱200 for consolation price' },
    ],
  },
]

const latestPosts = [
  {
    image: new URL('@/assets/images/card1.jpg', import.meta.url).href,
    title: 'BSP Knowledge Resource Network',
    date: 'February 19, 2026',
    route: { name: 'bcppage' },
  },
  {
    image: new URL('@/assets/images/card3.png', import.meta.url).href,
    title: 'STARBOOKS - DOST-STII',
    date: 'February 19, 2026',
    route: { name: 'starbooks' },
  },
  {
    image: new URL('@/assets/images/reservation.jpg', import.meta.url).href,
    title: 'AVR Reservation',
    date: 'February 19, 2026',
    route: { name: 'avr' },
  },
  {
    image: new URL('@/assets/images/top.jpg', import.meta.url).href,
    title: 'Top Library Borrowers and Visitors',
    date: 'February 19, 2026',
    route: { name: 'top-borrowers' },
  },
  {
    image: new URL('@/assets/images/newly_acc_books.png', import.meta.url).href,
    title: 'Newly Acquired Books',
    date: 'February 19, 2026',
    route: { name: 'newlyacquiredbooks' },
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
