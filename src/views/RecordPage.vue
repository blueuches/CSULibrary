<template>
  <div
    class="w-full min-h-screen font-['Poppins'] bg-[#f7f5f0] pb-20 pt-[40px] relative overflow-hidden"
  >
    <!-- Decorative background -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#1b5e20]/5 blur-[120px] translate-x-1/3 -translate-y-1/3"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full bg-[#2e7d32]/4 blur-[100px] -translate-x-1/4 translate-y-1/4"
      ></div>
      <svg
        class="absolute inset-0 w-full h-full opacity-[0.025]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1b5e20" stroke-width="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <div class="w-full px-4 sm:px-8 lg:px-12 relative z-10">
      <!-- Page Header -->
      <div class="page-header mb-14 text-center">
        <!-- Eyebrow -->
        <div class="flex mt-8 items-center justify-center gap-3">
          <div class="w-10 h-[2px] bg-[#f9a825]"></div>
          <span class="text-[10px] font-extrabold tracking-[0.32em] text-[#1a2e1a] uppercase"
            >Digital Resources at CSU Library</span
          >
        </div>

        <!-- title -->
        <h1
          class="digital-heading text-[clamp(2.8rem,8vw,5.5rem)] font-black text-[#1a2e1a] uppercase mb-5"
          style="font-family: 'Poppins', sans-serif; letter-spacing: -0.02em"
        >
          Digital Records
        </h1>

        <!-- Subtitle -->
        <p
          class="text-[14px] text-[#888] leading-relaxed max-w-lg mx-auto font-normal tracking-wide"
        ></p>
        <p
          class="text-[14px] mt-10 text-[#888] leading-relaxed max-w-xl mx-auto font-normal tracking-wide"
        >
          Your gateway to institutional archives, digital collections, and academic resources —
          organized, accessible, and always available.
        </p>
      </div>

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        <!-- DATA UPLOAD -->
        <div
          class="record-card group flex flex-col w-full h-full bg-white rounded-xl overflow-hidden border border-[#1b5e20]/10 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
        >
          <div
            class="relative h-44 flex items-center justify-center bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] overflow-hidden"
          >
            <div
              class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#1b5e20]/10 to-[#2e7d32]/20"
            ></div>
            <img
              src="@/assets/images/recordpage/folder-upload-icon.png"
              alt="Data Upload"
              class="h-20 object-contain relative z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
            />
            <div
              class="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#1b5e20]/30 rounded-tr-sm"
            ></div>
            <div
              class="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#1b5e20]/30 rounded-bl-sm"
            ></div>
          </div>

          <div class="p-6 flex flex-col flex-grow">
            <div class="flex items-center gap-2 mb-3">
              <span class="w-5 h-[2px] bg-[#1b5e20]"></span>
              <h3
                class="text-[15px] font-bold tracking-widest uppercase text-[#1b5e20] font-['Poppins']"
              >
                Data Upload
              </h3>
            </div>
            <p
              class="text-[14px] text-[#555] leading-relaxed mb-6 flex-grow font-['Poppins'] font-light"
            >
              Access institutional records, research documents, and archived files shared by the
              library — organized for easy retrieval.
            </p>
            <a
              href="https://drive.google.com/drive/folders/10VykxJ5P2C_OwVsF0Ym_ef4TUuFdq9I6"
              target="_blank"
              class="record-btn group/btn relative flex items-center justify-between px-4 py-2.5 bg-[#1b5e20] text-white text-[12px] font-semibold tracking-wider uppercase font-['Poppins'] rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#2e7d32]"
            >
              <span class="relative z-10">Go to Data Upload</span>
              <svg
                class="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        <!-- CD-ROM DOWNLOAD -->
        <div
          class="record-card group flex flex-col w-full h-full bg-white rounded-xl overflow-hidden border border-[#1b5e20]/10 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
        >
          <div
            class="relative h-44 flex items-center justify-center bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] overflow-hidden"
          >
            <div
              class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#1b5e20]/10 to-[#2e7d32]/20"
            ></div>
            <img
              src="@/assets/images/recordpage/folder-download-icon.png"
              alt="CD-ROM Download"
              class="h-20 object-contain relative z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
            />
            <div
              class="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#1b5e20]/30 rounded-tr-sm"
            ></div>
            <div
              class="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#1b5e20]/30 rounded-bl-sm"
            ></div>
          </div>

          <div class="p-6 flex flex-col flex-grow">
            <div class="flex items-center gap-2 mb-3">
              <span class="w-5 h-[2px] bg-[#1b5e20]"></span>
              <h3
                class="text-[15px] font-bold tracking-widest uppercase text-[#1b5e20] font-['Poppins']"
              >
                CD-ROM
              </h3>
            </div>
            <p
              class="text-[14px] text-[#555] leading-relaxed mb-6 flex-grow font-['Poppins'] font-light"
            >
              Download digitized CD-ROM contents — archived theses, references, and multimedia
              resources from physical formats, now online.
            </p>
            <a
              href="#"
              class="record-btn group/btn relative flex items-center justify-between px-4 py-2.5 bg-[#1b5e20] text-white text-[12px] font-semibold tracking-wider uppercase font-['Poppins'] rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#2e7d32]"
            >
              <span class="relative z-10">Download CD-ROM</span>
              <svg
                class="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- E-BOOKS GDRIVE -->
        <div
          class="record-card group flex flex-col w-full h-full bg-white rounded-xl overflow-hidden border border-[#1b5e20]/10 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
        >
          <div
            class="relative h-44 flex items-center justify-center bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] overflow-hidden"
          >
            <div
              class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#1b5e20]/10 to-[#2e7d32]/20"
            ></div>
            <img
              src="@/assets/images/recordpage/download-book-icon.png"
              alt="E-books Gdrive"
              class="h-20 object-contain relative z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
            />
            <div
              class="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#1b5e20]/30 rounded-tr-sm"
            ></div>
            <div
              class="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#1b5e20]/30 rounded-bl-sm"
            ></div>
          </div>

          <div class="p-6 flex flex-col flex-grow">
            <div class="flex items-center gap-2 mb-3">
              <span class="w-5 h-[2px] bg-[#1b5e20]"></span>
              <h3
                class="text-[15px] font-bold tracking-widest uppercase text-[#1b5e20] font-['Poppins']"
              >
                E-books GDrive
              </h3>
            </div>
            <p
              class="text-[14px] text-[#555] leading-relaxed mb-6 flex-grow font-['Poppins'] font-light"
            >
              Explore our collection of digital textbooks, references, and academic materials via
              Google Drive — available anytime, anywhere.
            </p>
            <a
              href="https://drive.google.com/drive/folders/1-2P2uJiziZHND_8gH5-d20uDmAiPs5gt"
              target="_blank"
              class="record-btn group/btn relative flex items-center justify-between px-4 py-2.5 bg-[#1b5e20] text-white text-[12px] font-semibold tracking-wider uppercase font-['Poppins'] rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#2e7d32]"
            >
              <span class="relative z-10">Go to E-books</span>
              <svg
                class="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        <!-- E-RESOURCES -->
        <div
          class="record-card group flex flex-col w-full h-full bg-white rounded-xl overflow-hidden border border-[#1b5e20]/10 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
        >
          <div
            class="relative h-44 flex items-center justify-center bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] overflow-hidden"
          >
            <div
              class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#1b5e20]/10 to-[#2e7d32]/20"
            ></div>
            <img
              src="@/assets/images/recordpage/find-book-icon.png"
              alt="E-Resources"
              class="h-20 object-contain relative z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
            />
            <div
              class="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#1b5e20]/30 rounded-tr-sm"
            ></div>
            <div
              class="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#1b5e20]/30 rounded-bl-sm"
            ></div>
          </div>

          <div class="p-6 flex flex-col flex-grow">
            <div class="flex items-center gap-2 mb-3">
              <span class="w-5 h-[2px] bg-[#1b5e20]"></span>
              <h3
                class="text-[15px] font-bold tracking-widest uppercase text-[#1b5e20] font-['Poppins']"
              >
                E-Resources
              </h3>
            </div>
            <p
              class="text-[14px] text-[#555] leading-relaxed mb-6 flex-grow font-['Poppins'] font-light"
            >
              Access subscribed databases, journals, and research portals provided by the library to
              support learning, teaching, and inquiry.
            </p>
            <RouterLink
              :to="{ name: 'eresources' }"
              class="record-btn group/btn relative flex items-center justify-between px-4 py-2.5 bg-[#1b5e20] text-white text-[12px] font-semibold tracking-wider uppercase font-['Poppins'] rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#2e7d32]"
            >
              <span class="relative z-10">Go to E-Resources</span>
              <svg
                class="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Video Modals -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      @click.self="isModalOpen = false"
    >
      <div
        class="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
      >
        <button
          @click="isModalOpen = false"
          class="absolute top-4 right-4 text-white/70 hover:text-[#ffb74d] text-2xl font-bold transition-colors z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60"
        >
          ✕
        </button>
        <iframe
          class="w-full h-full"
          src="https://www.youtube.com/embed/Lv0URTSBniY?autoplay=1"
          frameborder="0"
          allow="
            accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture;
          "
          allowfullscreen
        ></iframe>
      </div>
    </div>

    <div
      v-if="isOrientationModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      @click.self="isOrientationModalOpen = false"
    >
      <div
        class="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
      >
        <button
          @click="isOrientationModalOpen = false"
          class="absolute top-4 right-4 text-white/70 hover:text-[#66bb6a] text-2xl font-bold transition-colors z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60"
        >
          ✕
        </button>
        <iframe
          class="w-full h-full"
          src="https://www.youtube.com/embed/HAEPrH2aYpc?autoplay=1"
          frameborder="0"
          allow="
            accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture;
          "
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isModalOpen = ref(false)
const isOrientationModalOpen = ref(false)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

.page-header {
  opacity: 0;
  animation: cardFadeUp 0.5s ease forwards;
}

.record-card {
  opacity: 0;
  animation: cardFadeUp 0.5s ease forwards;
}
.record-card:nth-child(1) {
  animation-delay: 0.2s;
}
.record-card:nth-child(2) {
  animation-delay: 0.3s;
}
.record-card:nth-child(3) {
  animation-delay: 0.4s;
}
.record-card:nth-child(4) {
  animation-delay: 0.5s;
}

@keyframes cardFadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.record-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.15) 50%,
    transparent 60%
  );
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}
.record-btn:hover::after {
  transform: translateX(100%);
}

.digital-heading {
  margin: 10px 0 0;
  font-weight: 900;
  font-size: clamp(1.6rem, 5vw, 3.3rem);
  line-height: 1.02;
}
</style>
