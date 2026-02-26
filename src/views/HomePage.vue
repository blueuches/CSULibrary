<template>
  <div class="w-full !m-0 !p-0">
    <!-- CAROUSEL -->
    <div class="relative w-full overflow-hidden">
      <div
        class="flex transition-transform duration-700 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * slideWidth}%)` }"
      >
        <div v-for="(image, index) in images" :key="index" class="min-w-[100%]">
          <img
            :src="image.src"
            :alt="image.alt"
            class="w-full object-cover"
            :style="{ height: imageHeight }"
          />
        </div>
      </div>

      <!-- Prev Button -->
      <button
        @click="prev"
        class="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:text-[#0d2b0f] transition opacity-0 hover:opacity-100 p-2"
      >
        <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <!-- Next Button -->
      <button
        @click="next"
        class="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-[#0d2b0f] transition opacity-0 hover:opacity-100 p-2"
      >
        <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Dots -->
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <button
          v-for="(_, i) in images"
          :key="i"
          @click="currentIndex = i"
          class="w-2 h-2 rounded-full transition-all"
          :class="currentIndex === i ? 'bg-[#fbc02d] w-2' : 'bg-[#fbc02d]/50'"
        />
      </div>
    </div>

    <!-- TAGLINE -->
    <div class="w-full py-8 flex justify-center">
      <h2 class="tagline-title tracking-widest">H.E.R.O Learning Commons</h2>
    </div>

    <!-- READ LEARN DISCOVER SECTION -->
    <div class="w-full flex justify-center px-5 py-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-6xl">
        <!-- Read -->
        <div class="flex flex-col items-center">
          <h2
            class="w-full text-center"
            style="
              font-size: 1.9rem;
              font-weight: 900;
              color: #1b5e20;
              border-bottom: 4px solid #f9a825;
              padding-bottom: 6px;
              margin-bottom: 16px;
            "
          >
            READ
          </h2>
          <img
            src="@/assets/images/read.jpg"
            alt="Read"
            class="w-full h-[400px] rounded-lg object-cover"
          />
        </div>

        <!-- Learn -->
        <div class="flex flex-col itmb-3 pb-2ems-center">
          <h2
            class="w-full text-center"
            style="
              font-size: 1.9rem;
              font-weight: 900;
              color: #1b5e20;
              border-bottom: 4px solid #f9a825;
              padding-bottom: 6px;
              margin-bottom: 16px;
            "
          >
            LEARN
          </h2>
          <img
            src="@/assets/images/learn.jpg"
            alt="Learn"
            class="w-full h-[400px] rounded-lg object-cover"
          />
        </div>

        <!-- Discover -->
        <div class="flex flex-col items-center">
          <h2
            class="w-full text-center"
            style="
              font-size: 1.9rem;
              font-weight: 900;
              color: #1b5e20;
              border-bottom: 4px solid #f9a825;
              padding-bottom: 6px;
              margin-bottom: 16px;
            "
          >
            DISCOVER
          </h2>
          <img
            src="@/assets/images/discover.jpg"
            alt="Discover"
            class="w-full h-[400px] rounded-lg object-cover"
          />
        </div>
      </div>
    </div>

    <!-- WELCOME RIBBON BANNER -->
    <div class="csu-ribbon-wrap">
      <div class="csu-ribbon">
        <span class="csu-ribbon-title">Welcome to Caraga State University Library</span>
      </div>
    </div>

    <!-- CSU LIBRARY -->
    <div class="w-full bg-[#0d2b0f] flex justify-center py-12 px-6 mt-8">
      <div class="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <!-- Left: Image -->
        <div class="w-full h-96 flex justify-center">
          <img
            src="@/assets/images/lib.jpg"
            alt="Students"
            class="w-full h-full object-cover rounded-sm"
          />
        </div>

        <!-- Right: Text -->
        <div class="flex flex-col text-white px-4">
          <h2 class="page-heading mb-4" style="color: white">Caraga State University Library</h2>
          <p class="text-white text-base leading-relaxed mb-6">
            The CSU Library Service Unit aims to support and achieve the educational objectives of
            CSU. It seeks relevant materials and services; and provide these to fulfull the
            vision,mission goals and objectives of the State College to respond to the changing
            needs of the clientele and the curricular offerings.
          </p>
        </div>
      </div>
    </div>

    <!-- CAMPUS UPDATES SECTION -->
    <div class="w-full flex justify-center px-6 py-12">
      <div class="w-full max-w-6xl mx-auto">
        <h2 class="text-2xl font-extrabold py-10 text-center">
          <span
            class="border-b-4 border-[#f9a825] pb-1"
            style="font-size: 1.9rem; font-weight: 900; color: #1b5e20"
            >LIBRARY UPDATES</span
          >
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Card 1 -->
          <div
            class="border-2 border-[#1b5e20] rounded-lg overflow-hidden flex flex-col hover:shadow-lg hover:shadow-[#0d2b0f]/100 hover:scale-105 transition-all duration-300"
          >
            <img src="@/assets/images/card1.jpg" alt="Card 1" class="w-full h-56 object-cover" />
            <div class="p-5 flex flex-col flex-grow">
              <h3 class="card-heading pb-5 text-center">BSP Knowledge Resource Network</h3>
              <RouterLink
                :to="{ name: 'bcppage' }"
                class="border-2 border-[#1b5e20] text-center text-[#1b5e20] px-4 py-2 text-sm font-semibold hover:bg-[#0d2b0f] hover:text-white hover:underline transition"
              >
                More Details →
              </RouterLink>
            </div>
          </div>

          <!-- Card 2 -->
          <div
            class="border-2 border-[#1b5e20] rounded-lg overflow-hidden flex flex-col hover:shadow-lg hover:shadow-[#0d2b0f]/100 hover:scale-105 transition-all duration-300"
          >
            <img src="@/assets/images/card2.jpg" alt="Card 2" class="w-full h-56 object-cover" />
            <div class="p-5 flex flex-col flex-grow">
              <h3 class="card-heading pb-5 text-center">84th National Book Week Celebration</h3>
              <button
                class="border-2 border-[#1b5e20] text-[#1b5e20] px-4 py-2 text-sm font-semibold hover:bg-[#0d2b0f] hover:text-white hover:underline transition"
              >
                More Details →
              </button>
            </div>
          </div>

          <!-- Card 3 -->
          <div
            class="border-2 border-[#1b5e20] rounded-lg overflow-hidden flex flex-col hover:shadow-lg hover:shadow-[#0d2b0f]/100 hover:scale-105 transition-all duration-300"
          >
            <img src="@/assets/images/card3.png" alt="Card 3" class="w-full h-56 object-cover" />
            <div class="p-5 flex flex-col flex-grow">
              <h3 class="card-heading pb-5 text-center">STARBOOKS - DOST-STII</h3>
              <button
                class="border-2 border-[#1b5e20] text-[#1b5e20] px-4 py-2 text-sm font-semibold hover:bg-[#0d2b0f] hover:text-white hover:underline transition"
              >
                More Details →
              </button>
            </div>
          </div>

          <!-- Card 4 -->
          <div
            class="border-2 border-[#1b5e20] rounded-lg overflow-hidden flex flex-col hover:shadow-lg hover:shadow-[#0d2b0f]/100 hover:scale-105 transition-all duration-300"
          >
            <img
              src="@/assets/images/reservation.jpg"
              alt="Card 4"
              class="w-full h-56 object-cover"
            />
            <div class="p-5 flex flex-col flex-grow">
              <h3 class="card-heading pb-5 text-center">AVR Reservation</h3>
              <button
                class="border-2 border-[#1b5e20] text-[#1b5e20] px-4 py-2 text-sm font-semibold hover:bg-[#0d2b0f] hover:text-white hover:underline transition"
              >
                More Details →
              </button>
            </div>
          </div>

          <!-- Card 5 -->
          <div
            class="border-2 border-[#1b5e20] rounded-lg overflow-hidden flex flex-col hover:shadow-lg hover:shadow-[#0d2b0f]/100 hover:scale-105 transition-all duration-300"
          >
            <img src="@/assets/images/top.jpg" alt="Card 5" class="w-full h-56 object-cover" />
            <div class="p-5 flex flex-col flex-grow">
              <h3 class="card-heading pb-5 text-center">Top Library Borrowers and Visitors</h3>
              <button
                class="border-2 border-[#1b5e20] text-[#1b5e20] px-4 py-2 text-sm font-semibold hover:bg-[#0d2b0f] hover:text-white hover:underline transition"
              >
                More Details →
              </button>
            </div>
          </div>

          <!-- Card 6 -->
          <div
            class="border-2 border-[#1b5e20] rounded-lg overflow-hidden flex flex-col hover:shadow-lg hover:shadow-[#0d2b0f]/100 hover:scale-105 transition-all duration-300"
          >
            <img
              src="@/assets/images/newly_acc_books.png"
              alt="Card 6"
              class="w-full h-56 object-cover"
            />
            <div class="p-5 flex flex-col flex-grow">
              <h3 class="card-heading pb-5 text-center">Newly Acquired Books</h3>
              <button
                class="border-2 border-[#1b5e20] text-[#1b5e20] px-4 py-2 text-sm font-semibold hover:bg-[#0d2b0f] hover:text-white hover:underline transition"
              >
                More Details →
              </button>
            </div>
          </div>
        </div>

        <!-- Card 7 - Centered -->
        <div class="w-full h-96 flex justify-center py-4">
          <div
            class="border-2 border-[#1b5e20] rounded-lg overflow-hidden flex flex-col hover:shadow-lg hover:shadow-[#0d2b0f]/100 hover:scale-105 transition-all duration-300 w-1/3"
          >
            <img src="@/assets/images/card7.png" alt="Card 7" class="w-full h-56 object-cover" />
            <div class="p-5 flex flex-col flex-grow">
              <h3 class="card-heading pb-5 text-center">85th National Book Week Celebration</h3>
              <button
                class="border-2 border-[#1b5e20] text-[#1b5e20] px-4 py-2 text-sm font-semibold hover:bg-[#0d2b0f] hover:text-white hover:underline transition"
              >
                More Details →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- USEFUL LINKS SECTION -->
    <div class="w-full bg-white flex justify-center py-12 px-6 mt-8">
      <div class="w-full max-w-6xl mx-auto">
        <h2 class="text-2xl font-extrabold py-10 text-center">
          <span
            class="border-b-4 border-[#f9a825] pb-1"
            style="font-size: 1.9rem; font-weight: 900; color: #1b5e20"
            >USEFUL LINKS</span
          >
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- News Card 1 -->
          <div
            class="border-2 border-[#1b5e20] rounded-lg overflow-hidden flex flex-row hover:shadow-lg hover:shadow-[#0d2b0f]/100 hover:scale-105 transition-all duration-300"
          >
            <img
              src="@/assets/images/e-lib.jpg"
              alt="News 1"
              class="w-40 h-full object-cover flex-shrink-0"
            />
            <div class="p-4 flex flex-col justify-center gap-1">
              <a
                href="https://www.elib.gov.ph"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:underline hover:decoration-[#f9a825] cursor-pointer"
              >
                <h2 class="link-heading">Philippine E-Lib</h2>
              </a>
              <p class="text-[#0d2b0f]">National Library of the Philippines (NLP)</p>
            </div>
          </div>

          <!-- News Card 2 -->
          <div
            class="border-2 border-[#1b5e20] rounded-lg overflow-hidden flex flex-row hover:shadow-lg hover:shadow-[#0d2b0f]/100 hover:scale-105 transition-all duration-300"
          >
            <img
              src="/csu-logo.png"
              alt="News 2"
              class="w-20 h-full object-contain flex-shrink-0 p-2"
            />
            <div class="p-4 flex flex-col justify-center gap-1">
              <a
                href="https://www.carsu.edu.ph/"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:underline hover:decoration-[#f9a825] cursor-pointer"
              >
                <h2 class="link-heading">CARSU Webpage</h2>
              </a>
              <p class="text-[#0d2b0f]">CARAGA STATE UNIVERSITY</p>
            </div>
          </div>

          <!-- News Card 3 -->
          <div
            class="border-2 border-[#1b5e20] rounded-lg overflow-hidden flex flex-row hover:shadow-lg hover:shadow-[#0d2b0f]/100 hover:scale-105 transition-all duration-300"
          >
            <img
              src="@/assets/images/opac.png"
              alt="News 3"
              class="w-40 h-full object-cover flex-shrink-0"
            />
            <div class="p-4 flex flex-col justify-center gap-1">
              <a
                href="http://mylibrary.carsu.edu.ph/"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:underline hover:decoration-[#f9a825] cursor-pointer"
              >
                <h2 class="link-heading">Web OPAC</h2>
              </a>
              <p class="text-[#0d2b0f]">Online Public Access Catalog</p>
            </div>
          </div>

          <!-- News Card 4 -->
          <div
            class="border-2 border-[#1b5e20] rounded-lg overflow-hidden flex flex-row hover:shadow-lg hover:shadow-[#0d2b0f]/100 hover:scale-105 transition-all duration-300"
          >
            <img
              src="@/assets/images/free.jpg"
              alt="News 4"
              class="w-20 h-full object-cover flex-shrink-0"
            />
            <div class="p-4 flex flex-col justify-center gap-1">
              <a
                href="https://www.journals.uchicago.edu/action/showPublications"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:underline hover:decoration-[#f9a825] cursor-pointer"
              >
                <h2 class="link-heading">New free access journals</h2>
              </a>
              <p class="text-[#0d2b0f]">Online Public Access Catalog</p>
            </div>
          </div>

          <!-- News Card 5 -->
          <div
            class="border-2 border-[#1b5e20] rounded-lg overflow-hidden flex flex-row hover:shadow-lg hover:shadow-[#0d2b0f]/100 hover:scale-105 transition-all duration-300"
          >
            <img
              src="@/assets/images/gale.jpg"
              alt="News 5"
              class="w-40 h-full object-cover flex-shrink-0"
            />
            <div class="p-4 flex flex-col justify-center gap-1">
              <a
                href="https://link.gale.com/apps/menu?userGroupName=phcarsu&prodId=MENU"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:underline hover:decoration-[#f9a825] cursor-pointer"
              >
                <h2 class="link-heading">Infotrac</h2>
              </a>
              <p class="text-[#0d2b0f]">Online Custom Journals</p>
            </div>
          </div>

          <!-- News Card 6 -->
          <div
            class="border-2 border-[#1b5e20] rounded-lg overflow-hidden flex flex-row hover:shadow-lg hover:shadow-[#0d2b0f]/100 hover:scale-105 transition-all duration-300"
          >
            <img
              src="@/assets/images/EBSCO.jpg"
              alt="News 6"
              class="w-20 h-full object-contain flex-shrink-0 p-2"
            />
            <div class="p-4 flex flex-col justify-center gap-1">
              <a
                href="https://login.ebsco.com"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:underline hover:decoration-[#f9a825] cursor-pointer"
              >
                <h2 class="link-heading">EBSCO</h2>
              </a>
              <p class="text-[#0d2b0f]">Research databases, EBooks, Discovery Service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

import photo1 from '@/assets/images/img.jpg'
import photo2 from '@/assets/images/img0.jpg'
import photo3 from '@/assets/images/img1.jpg'
import photo4 from '@/assets/images/img2.jpg'
import photo5 from '@/assets/images/img3.jpg'

const images = [
  { src: photo1, alt: 'Photo 1' },
  { src: photo2, alt: 'Photo 2' },
  { src: photo3, alt: 'Photo 3' },
  { src: photo4, alt: 'Photo 4' },
  { src: photo5, alt: 'Photo 5' },
]

const imageHeight = '600px'
const currentIndex = ref(0)
const slideWidth = 100

let autoplayInterval: ReturnType<typeof setInterval> | null = null

function next() {
  currentIndex.value = (currentIndex.value + 1) % images.length
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length
}

onMounted(() => {
  autoplayInterval = setInterval(next, 3000)
})

onUnmounted(() => {
  if (autoplayInterval) clearInterval(autoplayInterval)
})
</script>

<style scoped>
/* ========================= 
   Shared Font/Heading Styles
========================= */
.tagline-title {
  font-weight: 900;
  font-size: 3rem;
  color: #0d2b0f;
  text-align: center;
  line-height: 2;
}

.card-heading {
  font-size: 1rem;
  font-weight: 900;
  color: #0d2b0f;
}

.link-heading {
  font-size: 1.1rem;
  font-weight: 900;
  color: #0d2b0f;
}

@media (max-width: 1400px) {
  .tagline-title {
    font-size: 2.5rem;
  }
  .page-heading {
    font-size: 1.9rem;
  }
}

@media (max-width: 768px) {
  .tagline-title {
    margin-top: 22px;
    margin-bottom: 14px;
    font-size: 1.5rem;
  }
}

/* =========================
   Ribbon
========================= */
.csu-ribbon-wrap {
  width: 100%;
  padding: 12px 0 20px;
  position: relative;
  display: flex;
  justify-content: center;
}

.csu-ribbon {
  position: relative;
  width: 85%;
  height: 48px;
  background: #1b5e20;
  display: flex;
  align-items: center;
  justify-content: center;
}

.csu-ribbon::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 34px;
  height: 48px;
  background: #ffffff;
  clip-path: polygon(0 50%, 100% 0, 100% 100%);
}

.csu-ribbon::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 0;
  border-top: 10px solid #0d2b0f;
  border-right: 12px solid transparent;
}

.csu-ribbon-title {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 2;
  margin: 0;
  text-align: center;
  color: #fff;
  font-weight: 800;
  font-size: 1.2rem;
  line-height: 48px;
  letter-spacing: 0.3px;
}

.csu-ribbon-title::before {
  content: '';
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-120px);
  width: 4px;
  height: 10px;
  border-radius: 1px;
}
</style>
