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
      <h2
        class="text-3xl md:text-4xl font-bold tracking-widest text-center"
        style="
          font-family: 'Cinzel', serif;
          background: linear-gradient(
            to right,
            #0d2b0f,
            #0d2b0f,
            #2e7d32,
            #66bb6a,
            #fbc02d,
            #f2c078
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        "
      >
        H.E.R.O Learning Commons
      </h2>
    </div>

    <!-- READ LEARN DISCOVER SECTION -->
    <div class="w-full flex justify-center px-5 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-6xl">
        <!-- Read -->
        <div class="flex flex-col items-center">
          <h2
            class="text-2xl font-extrabold text-[#1B5E20] mb-3 pb-2 w-full text-center"
            style="font-size: 1.5rem; font-weight: 900; color: #0d2b0f"
          >
            Read
          </h2>
          <img
            src="@/assets/images/read.jpg"
            alt="Read"
            class="w-full h-[400px] rounded-lg object-cover"
          />
        </div>

        <!-- Learn -->
        <div class="flex flex-col items-center">
          <h2
            class="text-2xl font-extrabold text-[#1B5E20] mb-3 pb-2 w-full text-center"
            style="font-size: 1.5rem; font-weight: 900; color: #0d2b0f"
          >
            Learn
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
            class="text-2xl font-extrabold text-[#1B5E20] mb-3 pb-2 w-full text-center"
            style="font-size: 1.5rem; font-weight: 900; color: #0d2b0f"
          >
            Discover
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
        <span class="csu-ribbon-title"> Welcome to Caraga State University Library</span>
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
          <h2 class="text-3xl mb-4" style="font-size: 1.5rem; font-weight: 900; color: white">
            Caraga State University Library
          </h2>
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
            class="border-b-3 border-[#f9a825] pb-1"
            style="font-size: 1.5rem; font-weight: 900; color: #0d2b0f"
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
              <h3
                class="pb-5 text-center"
                style="font-size: 1rem; font-weight: 900; color: #0d2b0f"
              >
                BSP Knowledge Resource Network
              </h3>

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
              <h3
                class="pb-5 text-center"
                style="font-size: 1rem; font-weight: 900; color: #0d2b0f"
              >
                84th National Book Week Celebration
              </h3>
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
              <h3
                class="pb-5 text-center"
                style="font-size: 1rem; font-weight: 900; color: #0d2b0f"
              >
                STARBOOKS - DOST-STII
              </h3>
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
              <h3
                class="pb-5 text-center"
                style="font-size: 1rem; font-weight: 900; color: #0d2b0f"
              >
                AVR Reservation
              </h3>
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
              <h3
                class="pb-5 text-center"
                style="font-size: 1rem; font-weight: 900; color: #0d2b0f"
              >
                Top Library Borrowers and Visitors
              </h3>
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
              <h3
                class="pb-5 text-center"
                style="font-size: 1rem; font-weight: 900; color: #0d2b0f"
              >
                Newly Acquired Books
              </h3>
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
              <h3
                class="pb-5 text-center"
                style="font-size: 1rem; font-weight: 900; color: #0d2b0f"
              >
                85th National Book Week Celebration
              </h3>
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

    <!-- NEWS SECTION -->
    <div class="w-full bg-white flex justify-center py-12 px-6 mt-8">
      <div class="w-full max-w-6xl mx-auto">
        <h2 class="text-2xl font-extrabold py-10 text-center">
          <span
            class="border-b-4 border-[#f9a825] pb-1"
            style="font-size: 1.5rem; font-weight: 900; color: #0d2b0f"
            >LATEST NEWS</span
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
                <h2 style="font-size: 1.1rem; font-weight: 900; color: #0d2b0f">
                  Philippine E-Lib
                </h2>
              </a>
              <p class="text-[#0d2b0f]">National Library of the Philippines (NLP)</p>
            </div>
          </div>

          <!-- News Card 2 -->
          <div
            class="border-2 border-[#1b5e20] rounded-lg overflow-hidden flex flex-row hover:shadow-lg hover:shadow-[#0d2b0f]/100 hover:scale-105 transition-all duration-300"
          >
            <img src="/csu-logo.png" alt="News 3" class="w-20 h-full object-cover flex-shrink-0" />
            <div class="p-4 flex flex-col justify-center gap-1">
              <a
                href="https://www.carsu.edu.ph/"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:underline hover:decoration-[#f9a825] cursor-pointer"
              >
                <h2
                  class="text-[#1B5E20] mb-3 pb-2 w-full"
                  style="font-size: 1.1rem; font-weight: 900; color: #0d2b0f"
                >
                  CARSU Webpage
                </h2>
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
                <h2
                  class="text-[#1B5E20] mb-3 pb-2 w-full"
                  style="font-size: 1.1rem; font-weight: 900; color: #0d2b0f"
                >
                  Web OPAC
                </h2>
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
              alt="News 3"
              class="w-20 h-full object-cover flex-shrink-0"
            />
            <div class="p-4 flex flex-col justify-center">
              <a
                href="https://www.journals.uchicago.edu/action/showPublications"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:underline hover:decoration-[#f9a825] cursor-pointer"
              >
                <h2
                  class="text-[#1B5E20] mb-3 pb-2 w-full gap-1"
                  style="font-size: 1.1rem; font-weight: 900; color: #0d2b0f"
                >
                  New free access journals
                </h2>
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
              alt="News 2"
              class="w-40 h-full object-cover flex-shrink-0"
            />
            <div class="p-4 flex flex-col justify-center gap-1">
              <a
                href="https://link.gale.com/apps/menu?userGroupName=phcarsu&prodId=MENU"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:underline hover:decoration-[#f9a825] cursor-pointer"
              >
                <h2
                  class="text-[#1B5E20] mb-3 pb-2 w-full"
                  style="font-size: 1.1rem; font-weight: 900; color: #0d2b0f"
                >
                  Infotrac
                </h2>
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
              alt="News 3"
              class="w-20 h-full object-cover flex-shrink-0 p-2"
            />
            <div class="p-4 flex flex-col justify-center gap-1">
              <a
                href="https://login.ebsco.com/?requestIdentifier=4a67d2a8-ffeb-49ba-b81a-56bcad923862&acrValues=uid&ui_locales&redirect_uri=https://logon.ebsco.zone/api/dispatcher/continue/prompted?state=MGM1ODBjMTUyZTA1NGE2NWFiYmQ3ZjM1NjA4MjI2MTQ=&authRequest=eyJraWQiOiIxNzY5MTEwMjQ0MDQ3IiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczpcL1wvYXV0aC5lYnNjby56b25lXC9hcGlcL2Rpc3BhdGNoZXIiLCJhdXRoUmVxdWVzdCI6eyJsb2dpbl9oaW50IjpudWxsLCJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbl9jb2RlIiwic2NvcGUiOiJvcGVuaWQgZW1haWwgYWZmaWxpYXRpb24iLCJhY3JfdmFsdWVzIjoidWlkIiwicmVzcG9uc2VfdHlwZSI6ImNvZGUiLCJyZWRpcmVjdF91cmkiOiJodHRwczpcL1wvc2VhcmNoLmVic2NvaG9zdC5jb21cL3dlYmF1dGhcL1Byb21wdGVkQ2FsbGJhY2suYXNweCIsInN0YXRlIjoiQXhCZWpDcE5adU9kdUVVTkdKOWNBZHdzbDBPUURBM2VRY0F2a3ZvYUVtQWN0ajg2bjQxY3U4cHh0QnQ2MjBPMnV6VzVsVHhYRWRnc3FmR0hoMnpwZERjWDdtUjVKdUdIMkVlaURtWmpDWW5id1pON0ZGVGRnX0htRms4YXM5TEN3NzRFYmdhdGpLSnd6R01qNS1MdnJSNGZFQnI5XzNVMGg2M2o5YV9IeWJQX3kzTHhiS3JscWVLUkV0OTV0U0tDcmpoTTE0VVUzN0pHOEc1RHhLbC1tTmozOEZFek1tY2tHTEZxYW5tYlpiWlZNb3d6b1I4LVN4US1ic0tmMmkwSFhzUDBnUDM0TTBsbHNCOXNBNy1XUnR5N1doM200ZmdMZDQ1b2EyRnY0Ui1xS3ZrazVXVWRhZ2RhM1ZzMXRmSHVpdWs2N2dMUzE0OTV4OGF6OUE4NWo2ZmV3OWNRLVhkV3RmTlJHX09nRVRFZUJhLUtEVUNoMFEiLCJjbGllbnRfaWQiOiJhd2d5Y0l4NTdNcnduRFE1aDRVZTZ5Q1ZFUDByNU10OSIsInJlc3BvbnNlX21vZGUiOiJxdWVyeSIsInJlcUlkIjoiNGE2N2QyYTgtZmZlYi00OWJhLWI4MWEtNTZiY2FkOTIzODYyIn0sImlhdCI6MTc3MjAwMTkzMSwianRpIjoiZTA0OTVjZTgtOTc1ZC00NDMxLTk5ZDctMTM5NjhkOWQ5ZmUyIiwicmVxSWQiOiI0YTY3ZDJhOC1mZmViLTQ5YmEtYjgxYS01NmJjYWQ5MjM4NjIifQ.lanZ6eJGj9KTJDp2x5oIHxoxAv0xx7Y3plQpOTordflU8p6NWi1NOgdGPPG3Kj1Eqboq50P64trc0HcgLQnXBXbAJ0B78bv5xA4CMd6Zg5RuhSg2a7cFapuejT4TaEM9f4d_0SCoR8v0QruXibK8wsoq3-AlsxG_4j5OfXKcc6xXpAUv7QnSUj6OnVIyrNzGkynXFRzm62SOxzJJ8KKH0YRrcFsEvpbwGATqrMdv8bacnWQboMD4NNCICGAAFX76LjjC0bougPgDkXCdXmM2Bj0GBod8R5hgyLbBUV7dXil0eytZ3oeHGk7LkjsyxhILgAu2C6v6ysrifkad9qusvw"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:underline hover:decoration-[#f9a825] cursor-pointer"
              >
                <h2
                  class="text-[#1B5E20] mb-3 pb-2 w-full"
                  style="font-size: 1.1rem; font-weight: 900; color: #0d2b0f"
                >
                  EBSCO
                </h2>
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
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap');

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
