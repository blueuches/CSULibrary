<template>
  <div class="w-full py-6 px-4 max-w-7xl mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
            >Feature</span
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

        <!-- Title with Logo -->
        <div class="flex items-center gap-4 mb-4">
          <img
            src="@/assets/images/card3.png"
            alt="STARBOOKS Logo"
            class="w-20 h-20 object-contain"
          />
          <h1 style="font-size: 2rem; font-weight: 900; color: #0d2b0f; line-height: 1.3">
            STARBOOKS - DOST-STII
          </h1>
        </div>

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
            src="@/assets/images/card3.png"
            alt="STARBOOKS"
            class="w-full object-cover rounded-sm"
          />
        </div>

        <!-- What is STARBOOKS box -->
        <div class="mb-6 rounded-lg overflow-hidden border border-[#1b5e20]">
          <div class="px-4 py-3" style="background: #1b5e20">
            <h2 style="font-size: 1rem; font-weight: 900; color: white">What is STARBOOKS?</h2>
          </div>
          <div class="p-4" style="background: #f9f9f9">
            <p style="font-size: 0.95rem; color: #222; line-height: 1.8; text-align: justify">
              Science and technology information is vast and numerous locally and globally. It
              encompasses and applies to many fields of study. Not many people realize that we live
              and breathe science and technology everyday—it is in the things we encounter day by
              day, it is in us. The Science and Technology Information Institute (STII) of the
              Department of Science and Technology is mandated by virtue of Executive Order 128 on
              January 30, 1987 generally to promote science and technology information in the
              country and accomplishes this by maintaining a physical library and producing
              multi-media promotions (print and video).
            </p>
          </div>
        </div>

        <!-- Divider -->
        <div
          class="mb-6"
          style="height: 2px; background: linear-gradient(to right, #1b5e20, #f9a825, transparent)"
        ></div>

        <!-- Paragraph 2 -->
        <p class="mb-6" style="font-size: 1rem; color: #222; line-height: 1.8; text-align: justify">
          The S&T Academic and Research-Based Openly-Operated Kiosks (STARBOOKs) will be access
          portals in key areas in the Philippines where residents can have access to the scientific
          information physically available at DOST (SciNeT), Philippine eLib project sources,
          freely-available online resources, and subscribed databases (if any). STARBOOKs will each
          have state of the art facilities to access science and technology information via the STII
          portals. A technically-qualified staff will be on hand to assist STARBOOKs users on-site
          while an online Librarian's HelpDesk service will also be available to answer queries.
          Through the STARBOOKs Program, Filipinos can have access to scientific information for
          their research needs or simply to satisfy their curious minds. Eventually, it is hoped
          that
        </p>

        <!-- Goals -->
        <div class="mb-8 space-y-4">
          <div
            class="flex gap-4 items-start p-4 rounded-lg border-l-4 border-[#f9a825]"
            style="background: #f9f9f9"
          >
            <span style="font-size: 1.5rem; font-weight: 900; color: #f9a825; line-height: 1"
              >1</span
            >
            <p style="font-size: 0.95rem; color: #222; line-height: 1.8">
              It will create interest in the field of Science and Technology which may increase the
              number of Filipinos enrolling in S&T courses.
            </p>
          </div>
          <div
            class="flex gap-4 items-start p-4 rounded-lg border-l-4 border-[#f9a825]"
            style="background: #f9f9f9"
          >
            <span style="font-size: 1.5rem; font-weight: 900; color: #f9a825; line-height: 1"
              >2</span
            >
            <p style="font-size: 0.95rem; color: #222; line-height: 1.8">
              Encourage great and curious minds to develop new ideas — inventions and innovations.
            </p>
          </div>
          <div
            class="flex gap-4 items-start p-4 rounded-lg border-l-4 border-[#f9a825]"
            style="background: #f9f9f9"
          >
            <span style="font-size: 1.5rem; font-weight: 900; color: #f9a825; line-height: 1"
              >3</span
            >
            <p style="font-size: 0.95rem; color: #222; line-height: 1.8">
              Inspire one's capacity for entrepreneurship and research for socio-economic
              development.
            </p>
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
            "Through the STARBOOKs Program, Filipinos can have access to scientific information for
            their research needs or simply to satisfy their curious minds."
          </p>
        </blockquote>

        <!-- Visit Link -->
        <div class="mt-6">
          <a
            href="https://www.starbooks.ph"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-sm transition-all duration-300 hover:opacity-90"
            style="background: #1b5e20; color: white; font-weight: 700; font-size: 0.9rem"
          >
            Visit STARBOOKS Website →
          </a>
        </div>
      </div>

      <!-- RIGHT: Latest Post (1/3) -->
      <div class="lg:col-span-1">
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
  </div>
</template>

<script setup lang="ts">
import card1 from '@/assets/images/card1.jpg'
import card2 from '@/assets/images/card2.jpg'
import card3 from '@/assets/images/card3.png'
import reservation from '@/assets/images/reservation.jpg'
import top from '@/assets/images/top.jpg'
import newlyAccBooks from '@/assets/images/newly_acc_books.png'

const latestPosts = [
  { image: card1, title: 'BSP Knowledge Resource Network', date: 'February 19, 2026' },
  { image: card2, title: 'National Book Week Celebration', date: 'February 19, 2026' },
  { image: reservation, title: 'AVR Reservation', date: 'February 19, 2026' },
  { image: top, title: 'Top Library Borrowers and Visitors', date: 'February 19, 2026' },
  { image: newlyAccBooks, title: 'Newly Acquired Books', date: 'February 19, 2026' },
]
</script>

<style scoped></style>
