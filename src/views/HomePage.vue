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
        class="absolute left-2 top-1/2 -translate-y-1/2 text-[#1a1a1a] bg-transparent hover:bg-[#F5C300] transition opacity-0 hover:opacity-100 p-2 rounded-full"
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
        class="absolute right-2 top-1/2 -translate-y-1/2 text-[#1a1a1a] bg-transparent hover:bg-[#F5C300] transition opacity-0 hover:opacity-100 p-2 rounded-full"
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
        class="font-bold tracking-widest text-center"
        style="font-family: 'Cinzel', serif; font-size: 2.5rem"
      >
        <span
          class="animate-fade-in inline-block"
          style="
            animation-delay: 0s;
            animation-fill-mode: both;
            background: linear-gradient(to right, #0d2b0f);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          "
          >HERO</span
        >
        <span
          class="animate-fade-in inline-block mx-2"
          style="
            animation-delay: 0.4s;
            animation-fill-mode: both;
            background: linear-gradient(to right, #0d2b0f, #1b5e20, #66bb6a);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          "
          >LEARNING</span
        >
        <span
          class="animate-fade-in inline-block"
          style="
            animation-delay: 0.8s;
            animation-fill-mode: both;
            background: linear-gradient(to right, #fbc02d, #fbc02d, #f2c078, #f2c078);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          "
          >COMMONS</span
        >
      </h2>
    </div>

    <!-- READ LEARN DISCOVER SECTION -->
    <div class="w-full flex justify-center px-6 py-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 w-[100%]">
        <!-- Read -->
        <div class="relative overflow-hidden rounded-lg group cursor-pointer">
          <img
            src="@/assets/images/tinay.jpg"
            alt="Read"
            class="w-full h-[450px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-[#1b5e20]/90 via-[#0d2b0f]/30 to-transparent"
          ></div>
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <h2
              style="
                font-size: 1.9rem;
                font-weight: 900;
                color: white;
                border-bottom: 4px solid #f9a825;
                padding-bottom: 6px;
                display: inline-block;
              "
            >
              Read
            </h2>
          </div>
        </div>

        <!-- Learn -->
        <div class="relative overflow-hidden rounded-lg group cursor-pointer">
          <img
            src="@/assets/images/eden.jpg"
            alt="Learn"
            class="w-full h-[450px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-[#1b5e20]/90 via-[#0d2b0f]/30 to-transparent"
          ></div>
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <h2
              style="
                font-size: 1.9rem;
                font-weight: 900;
                color: white;
                border-bottom: 4px solid #f9a825;
                padding-bottom: 6px;
                display: inline-block;
              "
            >
              Learn
            </h2>
          </div>
        </div>

        <!-- Discover -->
        <div class="relative overflow-hidden rounded-lg group cursor-pointer">
          <img
            src="@/assets/images/tinay.jpg"
            alt="Discover"
            class="w-full h-[450px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-[#1b5e20]/90 via-[#0d2b0f]/30 to-transparent"
          ></div>
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <h2
              style="
                font-size: 1.9rem;
                font-weight: 900;
                color: white;
                border-bottom: 4px solid #f9a825;
                padding-bottom: 6px;
                display: inline-block;
              "
            >
              Discover
            </h2>
          </div>
        </div>
      </div>
    </div>

    <!-- CSU LIBRARY -->
    <div class="w-full bg-[#0d2b0f] flex justify-center py-12 px-6 mt-8">
      <div class="w-[100%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <!-- Left: Image -->
        <div class="w-full h-full flex justify-center">
          <img
            src="@/assets/images/img0.jpg"
            alt="Students"
            class="w-full h-full object-cover rounded-sm"
          />
        </div>

        <!-- Right: Text -->
        <div class="flex flex-col text-white px-4 relative">
          <div style="width: 60px; height: 4px; background: #f9a825; margin-bottom: 16px"></div>
          <div class="mb-4">
            <span
              style="
                background: #f9a825;
                color: #0d2b0f;
                font-size: 0.75rem;
                font-weight: 900;
                letter-spacing: 0.15em;
                padding: 4px 12px;
                border-radius: 4px;
              "
              >CSU LIBRARY</span
            >
          </div>
          <h2
            class="mb-4"
            style="color: white; font-size: 1.9rem; font-weight: 900; letter-spacing: 0.1em"
          >
            Caraga State University Library
          </h2>
          <div class="mb-4">
            <div
              style="
                width: 100%;
                height: 1px;
                background: linear-gradient(to right, #f9a825, transparent);
              "
            ></div>
          </div>
          <p class="text-white/80 text-base leading-relaxed mb-6" style="text-align: justify">
            The CSU Library Service Unit aims to support and achieve the educational objectives of
            CSU. It seeks relevant materials and services; and provide these to fulfull the
            vision,mission goals and objectives of the State College to respond to the changing
            needs of the clientele and the curricular offerings.
          </p>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-4 mt-2">
            <div
              class="flex flex-col items-center border border-white/20 rounded-lg p-4 bg-white/5 hover:bg-white/10 hover:border-[#f9a825] hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <svg
                class="w-8 h-8 mb-2"
                style="color: #f9a825"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span style="font-size: 1.4rem; font-weight: 900; color: #f9a825">10,000+</span>
              <span class="text-white/80 text-sm text-center">Books</span>
            </div>
            <div
              class="flex flex-col items-center border border-white/20 rounded-lg p-4 bg-white/5 hover:bg-white/10 hover:border-[#f9a825] hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <svg
                class="w-8 h-8 mb-2"
                style="color: #f9a825"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              <span style="font-size: 1.4rem; font-weight: 900; color: #f9a825">500+</span>
              <span class="text-white/80 text-sm text-center">Journals</span>
            </div>
            <div
              class="flex flex-col items-center border border-white/20 rounded-lg p-4 bg-white/5 hover:bg-white/10 hover:border-[#f9a825] hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <svg
                class="w-8 h-8 mb-2"
                style="color: #f9a825"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                />
              </svg>
              <span style="font-size: 1.4rem; font-weight: 900; color: #f9a825">5,000+</span>
              <span class="text-white/80 text-sm text-center">Students Served</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CAMPUS UPDATES SECTION -->
    <div class="w-full flex justify-center px-6 py-12">
      <div class="w-[100%] mx-auto">
        <h2 class="text-2xl font-extrabold py-10 text-center">
          <span
            class="border-b-4 border-[#f9a825] pb-1"
            style="font-size: 1.9rem; font-weight: 900; color: #1b5e20"
            >LIBRARY UPDATES</span
          >
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            class="border-2 border-[#1b5e20] rounded-lg overflow-hidden flex flex-col hover:shadow-lg hover:shadow-[#0d2b0f]/100 hover:scale-105 transition-all duration-300"
          >
            <img src="@/assets/images/card1.jpg" alt="Card 1" class="w-full h-56 object-cover" />
            <div class="p-5 flex flex-col flex-grow">
              <h3 class="card-heading pb-5 text-center">BSP Knowledge Resource Network</h3>
              <RouterLink
                :to="{ name: 'bcppage' }"
                class="border-2 border-[#1b5e20] text-center text-[#1b5e20] px-4 py-2 text-sm font-semibold hover:bg-[#0d2b0f] hover:text-white hover:underline transition"
                >More Details →</RouterLink
              >
            </div>
          </div>
          <div
            class="border-2 border-[#1b5e20] rounded-lg overflow-hidden flex flex-col hover:shadow-lg hover:shadow-[#0d2b0f]/100 hover:scale-105 transition-all duration-300"
          >
            <img src="@/assets/images/card2.jpg" alt="Card 2" class="w-full h-56 object-cover" />
            <div class="p-5 flex flex-col flex-grow">
              <h3 class="card-heading pb-5 text-center">National Book Week Celebration</h3>
              <RouterLink
                :to="{ name: 'nbwcpage' }"
                class="border-2 border-[#1b5e20] text-center text-[#1b5e20] px-4 py-2 text-sm font-semibold hover:bg-[#0d2b0f] hover:text-white hover:underline transition"
              >
                More Details →
              </RouterLink>
            </div>
          </div>
          <div
            class="border-2 border-[#1b5e20] rounded-lg overflow-hidden flex flex-col hover:shadow-lg hover:shadow-[#0d2b0f]/100 hover:scale-105 transition-all duration-300"
          >
            <img src="@/assets/images/card3.png" alt="Card 3" class="w-full h-56 object-cover" />
            <div class="p-5 flex flex-col flex-grow">
              <h3 class="card-heading pb-5 text-center">STARBOOKS - DOST-STII</h3>
              <RouterLink
                :to="{ name: 'starbooks' }"
                class="border-2 border-[#1b5e20] text-center text-[#1b5e20] px-4 py-2 text-sm font-semibold hover:bg-[#0d2b0f] hover:text-white hover:underline transition"
              >
                More Details →
              </RouterLink>
            </div>
          </div>
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
              <RouterLink
                :to="{ name: 'avr' }"
                class="border-2 border-[#1b5e20] text-center text-[#1b5e20] px-4 py-2 text-sm font-semibold hover:bg-[#0d2b0f] hover:text-white hover:underline transition"
              >
                More Details →
              </RouterLink>
            </div>
          </div>
          <div
            class="border-2 border-[#1b5e20] rounded-lg overflow-hidden flex flex-col hover:shadow-lg hover:shadow-[#0d2b0f]/100 hover:scale-105 transition-all duration-300"
          >
            <img src="@/assets/images/top.jpg" alt="Card 5" class="w-full h-56 object-cover" />
            <div class="p-5 flex flex-col flex-grow">
              <h3 class="card-heading pb-5 text-center">Top Library Borrowers and Visitors</h3>
              <RouterLink
                :to="{ name: 'top-borrowers' }"
                class="border-2 border-[#1b5e20] text-center text-[#1b5e20] px-4 py-2 text-sm font-semibold hover:bg-[#0d2b0f] hover:text-white hover:underline transition"
              >
                More Details →
              </RouterLink>
            </div>
          </div>
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
              <RouterLink
                :to="{ name: 'newlyacquiredbooks' }"
                class="border-2 border-[#1b5e20] text-center text-[#1b5e20] px-4 py-2 text-sm font-semibold hover:bg-[#0d2b0f] hover:text-white hover:underline transition"
              >
                More Details →
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- USEFUL LINKS SECTION -->
    <div class="w-full bg-white flex justify-center py-12 px-6 mt-8">
      <div class="w-[100%] mx-auto">
        <h2 class="text-2xl font-extrabold py-10 text-center">
          <span
            class="border-b-4 border-[#f9a825] pb-1"
            style="font-size: 1.9rem; font-weight: 900; color: #1b5e20"
            >USEFUL LINKS</span
          >
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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

    <!-- FEATURES SECTION -->
    <div class="w-full bg-white py-12 px-6 mt-8">
      <div class="mx-auto flex flex-col gap-10">
        <!-- VIRTUAL TOUR -->
        <div class="flex flex-col md:flex-row items-center gap-8 border-b border-gray-200 pb-10">
          <!-- Left: Video Thumbnail -->
          <div
            @click="isModalOpen = true"
            class="w-full md:w-[50%] flex-shrink-0 relative cursor-pointer group rounded-xl overflow-hidden shadow-md"
            style="aspect-ratio: 16/9"
          >
            <div
              class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style="background-image: url('https://img.youtube.com/vi/Lv0URTSBniY/hqdefault.jpg')"
            ></div>

            <!-- Dark overlay -->
            <div class="absolute inset-0 bg-black/20"></div>

            <!-- YouTube-style play button -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div
                class="bg-red-600 rounded-xl px-5 py-3 flex items-center gap-2 shadow-lg transition-transform group-hover:scale-110"
              >
                <!-- Play icon -->
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            <!-- Watch on YouTube badge -->
            <div
              class="absolute bottom-3 left-3 flex items-center gap-2 bg-black/60 rounded px-2 py-1"
            >
              <span class="text-white text-xs font-medium">Watch on</span>
              <svg class="h-4" viewBox="0 0 90 20" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z"
                  fill="#FF0000"
                />
                <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white" />
                <path
                  d="M34.6024 13.0036L31.3945 1.41846H34.1932L35.3961 6.50354C35.7198 7.83796 35.9535 8.9696 36.0972 9.89844H36.1821C36.2971 9.24352 36.5341 8.11484 36.887 6.50354L38.1074 1.41846H40.9061L37.6829 13.0036V18.561H34.6024V13.0036Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          <!-- Right: Text Content -->
          <div class="w-full md:w-[60%] flex flex-col gap-3">
            <h2 class="text-3xl font-extrabold text-[#0d2b0f] leading-tight">Virtual Tour</h2>

            <p class="text-gray-700 text-base leading-relaxed mt-1">
              Explore our modern facilities and collection areas from the comfort of your device.
              Get a full 360° look at our campus and library spaces.
            </p>

            <p class="font-bold text-[#0d2b0f] text-sm">This is a virtual experience.</p>
            <p class="font-bold text-[#0d2b0f] text-sm">This is Caraga State University Library.</p>

            <div class="mt-3">
              <button
                @click="isModalOpen = true"
                class="border-2 border-[#0d2b0f] text-[#0d2b0f] px-6 py-2 text-sm font-semibold rounded flex items-center gap-2 hover:bg-[#0d2b0f] hover:text-white transition-all duration-200"
              >
                Watch Video
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- LIBRARY ORIENTATION -->
        <div class="flex flex-col md:flex-row items-center gap-8">
          <!-- Left: Text Content — right-aligned to sit close to the video -->
          <div class="w-full md:w-[50%] flex flex-col gap-3 text-right">
            <h2 class="text-3xl font-extrabold text-[#0d2b0f] leading-tight">
              Library Orientation
            </h2>

            <p class="text-gray-700 text-base leading-relaxed mt-1">
              First time here? Learn how to navigate our physical and digital resources effectively.
              This orientation will guide you through everything you need to know.
            </p>

            <p class="font-bold text-[#0d2b0f] text-sm">This is your guide.</p>
            <p class="font-bold text-[#0d2b0f] text-sm">This is Caraga State University Library.</p>

            <div class="mt-3 flex justify-end">
              <button
                @click="isOrientationModalOpen = true"
                class="border-2 border-[#0d2b0f] text-[#0d2b0f] px-6 py-2 text-sm font-semibold rounded flex items-center gap-2 hover:bg-[#0d2b0f] hover:text-white transition-all duration-200"
              >
                Watch Video
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Right: Video Thumbnail -->
          <div
            @click="isOrientationModalOpen = true"
            class="w-full md:w-[50%] flex-shrink-0 relative cursor-pointer group rounded-xl overflow-hidden shadow-md"
            style="aspect-ratio: 16/9"
          >
            <div
              class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style="background-image: url('https://img.youtube.com/vi/HAEPrH2aYpc/hqdefault.jpg')"
            ></div>
            <div class="absolute inset-0 bg-black/20"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div
                class="bg-red-600 rounded-xl px-5 py-3 flex items-center gap-2 shadow-lg transition-transform group-hover:scale-110"
              >
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div
              class="absolute bottom-3 left-3 flex items-center gap-2 bg-black/60 rounded px-2 py-1"
            >
              <span class="text-white text-xs font-medium">Watch on</span>
              <svg class="h-4" viewBox="0 0 90 20" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z"
                  fill="#FF0000"
                />
                <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white" />
                <path
                  d="M34.6024 13.0036L31.3945 1.41846H34.1932L35.3961 6.50354C35.7198 7.83796 35.9535 8.9696 36.0972 9.89844H36.1821C36.2971 9.24352 36.5341 8.11484 36.887 6.50354L38.1074 1.41846H40.9061L37.6829 13.0036V18.561H34.6024V13.0036Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- VIRTUAL TOUR MODAL -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      @click.self="isModalOpen = false"
    >
      <div
        class="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
      >
        <button
          @click="isModalOpen = false"
          class="absolute top-4 right-4 text-white text-2xl font-bold hover:text-[#ffb74d] transition z-10"
        >
          ✕
        </button>
        <iframe
          class="w-full h-full"
          src="https://www.youtube.com/embed/Lv0URTSBniY?autoplay=1"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>

    <!-- ORIENTATION MODAL -->
    <div
      v-if="isOrientationModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      @click.self="isOrientationModalOpen = false"
    >
      <div
        class="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
      >
        <button
          @click="isOrientationModalOpen = false"
          class="absolute top-4 right-4 text-white text-2xl font-bold hover:text-[#66bb6a] transition z-10"
        >
          ✕
        </button>
        <iframe
          class="w-full h-full"
          src="https://www.youtube.com/embed/HAEPrH2aYpc?autoplay=1"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
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

import photo1 from '@/assets/images/img.jpg'
import photo2 from '@/assets/images/img0.jpg'
import photo3 from '@/assets/images/img1.jpg'
import photo4 from '@/assets/images/img2.jpg'
import photo5 from '@/assets/images/img3.jpg'

const isModalOpen = ref(false)
const isOrientationModalOpen = ref(false)

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
const showScrollTop = ref(false)

let autoplayInterval: ReturnType<typeof setInterval> | null = null

function next() {
  currentIndex.value = (currentIndex.value + 1) % images.length
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length
}

function handleScroll() {
  showScrollTop.value = window.scrollY > 300
}

onMounted(() => {
  autoplayInterval = setInterval(next, 3000)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  if (autoplayInterval) clearInterval(autoplayInterval)
  window.removeEventListener('scroll', handleScroll)
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  opacity: 0;
  animation: fadeIn 0.6s ease forwards;
}

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

/* Scroll to top transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
