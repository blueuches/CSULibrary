<template>
  <div class="w-full bg-[#f7f5f0] min-h-screen">

    <!-- ===== HERO ===== -->
    <div class="personnel-hero">
      <div class="absolute inset-0 hero-overlay"></div>

      <div class="relative z-10 flex flex-col items-center gap-3">
        <p class="hero-eyebrow">Caraga State University</p>
        <h1 class="hero-title">Library Personnel</h1>
        <div class="hero-divider">
          <span class="hero-dot gold"></span>
          <span class="hero-line"></span>
          <span class="hero-dot green"></span>
          <span class="hero-line"></span>
          <span class="hero-dot gold"></span>
        </div>
      </div>
    </div>

    <!-- ===== MAIN CONTENT ===== -->
    <div class="px-6 sm:px-10 lg:px-16 py-20 max-w-6xl mx-auto">

      <!-- ===== FEATURED (HEAD) ===== -->
      <div v-if="featuredStaff" class="featured-wrapper mb-24">

        <!-- Label -->
        <div class="flex items-center gap-3 mb-10 justify-center">
          <div class="label-line"></div>
          <span class="label-text">University Librarian</span>
          <div class="label-line"></div>
        </div>

        <div class="featured-card">
          <!-- Left accent bar -->
          <div class="featured-accent-bar"></div>

          <!-- Photo — original circular style -->
          <div class="featured-photo-wrap">
            <div
              class="absolute inset-0 rounded-full border-4 shadow-md"
              style="background-color: #0d2b0f; border-color: #66bb6a;"
            ></div>
            <img
              :src="featuredStaff.image"
              :alt="featuredStaff.name"
              class="featured-photo"
            />
          </div>

          <!-- Info -->
          <div class="featured-info">
            <span class="featured-badge">Head of Library Services</span>
            <h2 class="featured-name">{{ featuredStaff.name }}</h2>
            <p class="featured-subtitle">{{ featuredStaff.subtitle }}</p>
            <div class="featured-divider"></div>
            <p v-if="featuredStaff.position" class="featured-position">
              {{ featuredStaff.position }}
            </p>
          </div>


        </div>
      </div>

      <!-- ===== STAFF SECTION LABEL ===== -->
      <div class="flex items-center gap-3 mb-12">
        <div class="label-line"></div>
        <span class="label-text">Library Staff</span>
        <div class="label-line flex-1"></div>
      </div>

      <!-- ===== STAFF GRID ===== -->
      <div class="staff-grid">
        <div
          v-for="(person, index) in otherStaff"
          :key="person.id"
          class="staff-card"
        >
<!-- Photo — original circular style -->
          <div class="staff-photo-wrap">
            <div
              class="absolute inset-0 rounded-full border-4 shadow-md"
              style="background-color: #0d2b0f; border-color: #66bb6a;"
            ></div>
            <img
              :src="person.image"
              :alt="person.name"
              class="staff-photo"
            />
          </div>

          <!-- Info -->
          <div class="staff-info">
            <h3 class="staff-name">{{ person.name }}</h3>
            <div class="staff-rule"></div>
            <p class="staff-subtitle">{{ person.subtitle }}</p>
            <p v-if="person.position" class="staff-position">{{ person.position }}</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import cora from '@/assets/images/personnelpage/cora.png'
import mercy from '@/assets/images/personnelpage/mercy.png'
import marie from '@/assets/images/personnelpage/marie.png'
import berongoy from '@/assets/images/personnelpage/berongoy.png'
import jorge from '@/assets/images/personnelpage/jorge.png'
import warren from '@/assets/images/personnelpage/warren.png'
import malyn from '@/assets/images/personnelpage/malyn.png'
import sabrena from '@/assets/images/personnelpage/sabrena.png'
import jasmin from '@/assets/images/personnelpage/jasmin.png'
import lagaras from '@/assets/images/personnelpage/lagaras.png'

interface StaffMember {
  id: number
  name: string
  subtitle: string
  position?: string
  image: string
}

const staff = ref<StaffMember[]>([
  { id: 1, name: 'MARIA CORAZON L. TERCERA, RL', subtitle: 'University Librarian', position: 'Head, Library Services', image: cora },
  { id: 2, name: 'MERCY G. REYES, RL', subtitle: 'Technical Librarian I', image: mercy },
  { id: 3, name: 'ANN MARIE MONTE DE RAMOS, RL', subtitle: 'Readers Services Librarian', image: marie },
  { id: 4, name: 'JEHOVENN T. BERONGOY', subtitle: 'Audio-Visual Technician', image: berongoy },
  { id: 5, name: 'JORGE V. BAUTISTA', subtitle: 'Public Assistance & Complaints Desk Officer', image: jorge },
  { id: 6, name: 'JOHN WARREN S. BATONDO, LPT', subtitle: 'Administrative Aide VI Clerk III', image: warren },
  { id: 7, name: 'MALYN C. TRAYA', subtitle: 'Technical Service Staff', image: malyn },
  { id: 8, name: 'SABRENA MAE ELLEVERA', subtitle: 'Periodical Service Staff', image: sabrena },
  { id: 9, name: 'JASMIN D. PADILLA', subtitle: 'Library Learning Spaces Staff', image: jasmin },
  { id: 10, name: 'JHOGIE A. LAGARAS', subtitle: 'Circulation Services Staff', image: lagaras },
])

const featuredStaff = computed(() => staff.value[0])
const otherStaff = computed(() => staff.value.slice(1))
</script>

<style scoped>
/* ================================
   HERO
================================ */
.personnel-hero {
  width: 100%;
  height: 380px;
  background-image: url('@/assets/images/personnelpage/csu-background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.hero-overlay {
  background: linear-gradient(
    to bottom,
    rgba(4, 16, 5, 0.72) 0%,
    rgba(13, 43, 15, 0.80) 60%,
    rgba(4, 16, 5, 0.90) 100%
  );
}

.corner-tl, .corner-tr, .corner-bl, .corner-br {
  width: 28px;
  height: 28px;
  opacity: 0.5;
}
.corner-tl { border-top: 1.5px solid #f9a825; border-left: 1.5px solid #f9a825; }
.corner-tr { border-top: 1.5px solid #f9a825; border-right: 1.5px solid #f9a825; }
.corner-bl { border-bottom: 1.5px solid #f9a825; border-left: 1.5px solid #f9a825; }
.corner-br { border-bottom: 1.5px solid #f9a825; border-right: 1.5px solid #f9a825; }

.hero-eyebrow {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.35em;
  color: #f9a825;
  text-transform: uppercase;
  opacity: 0.85;
}

.hero-title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1;
}

.hero-divider {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 4px 0;
}
.hero-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  display: inline-block;
}
.hero-dot.gold { background: #f9a825; }
.hero-dot.green { background: #66bb6a; }
.hero-line {
  width: 40px;
  height: 1px;
  background: rgba(255,255,255,0.3);
  display: inline-block;
}

.hero-sub {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.55);
  letter-spacing: 0.15em;
  font-style: italic;
}

/* ================================
   LABELS
================================ */
.label-line {
  height: 1px;
  width: 40px;
  background: linear-gradient(to right, #0d2b0f, rgba(13,43,15,0.15));
}
.label-text {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.28em;
  color: #0d2b0f;
  text-transform: uppercase;
  white-space: nowrap;
}

/* ================================
   FEATURED CARD
================================ */
.featured-wrapper {
  animation: fadeUp 0.7s ease both;
}

.featured-card {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 48px;
  background: #ffffff;
  border: 1px solid rgba(13, 43, 15, 0.08);
  border-radius: 4px;
  padding: 48px 52px;
  box-shadow: 0 4px 40px rgba(13, 43, 15, 0.07);
  overflow: hidden;
}

.featured-accent-bar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, #f9a825, #1b5e20);
}

/* Circular — featured */
.featured-photo-wrap {
  position: relative;
  flex-shrink: 0;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: visible;
}

.featured-photo {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 192px;
  height: 224px;
  object-fit: cover;
  border-radius: 50%;
  z-index: 1;
  transition: transform 0.3s ease;
}

.featured-photo:hover {
  transform: translateX(-50%) scale(1.05);
}

.featured-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.featured-badge {
  display: inline-block;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #0d2b0f;
  background: #f9a825;
  padding: 3px 10px;
  border-radius: 2px;
  width: fit-content;
}

.featured-name {
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0d2b0f;
  line-height: 1.2;
  letter-spacing: 0.03em;
}

.featured-subtitle {
  font-size: 0.85rem;
  color: #1b5e20;
  font-style: italic;
}

.featured-divider {
  width: 48px;
  height: 2px;
  background: linear-gradient(to right, #f9a825, rgba(249,168,37,0.2));
  border-radius: 2px;
}

.featured-position {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(13, 43, 15, 0.5);
}


/* ================================
   STAFF GRID
================================ */
.staff-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.staff-card {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
  background: #ffffff;
  border: 1px solid rgba(13, 43, 15, 0.07);
  border-radius: 4px;
  padding: 24px 28px;
  box-shadow: 0 2px 16px rgba(13, 43, 15, 0.05);
  transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
  overflow: hidden;

  margin-top: 8px; /* <-- add this */
}

.staff-card:hover {
  box-shadow: 0 8px 32px rgba(13, 43, 15, 0.12);
  transform: translateY(-3px);
  border-color: rgba(249, 168, 37, 0.35);
}


/* Circular — staff */
.staff-photo-wrap {
  position: relative;
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: visible;
}

.staff-photo {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 96px;
  height: 106px;
  object-fit: cover;
  border-radius: 50%;
  z-index: 1;
  transition: transform 0.3s ease;
}

.staff-card:hover .staff-photo {
  transform: translateX(-50%) scale(1.05);
}

.staff-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.staff-name {
  font-family: 'Poppins', sans-serif;
  font-size: 0.88rem;
  font-weight: 700;
  color: #0d2b0f;
  line-height: 1.3;
  letter-spacing: 0.01em;
}

.staff-rule {
  width: 28px;
  height: 1.5px;
  background: linear-gradient(to right, #f9a825, rgba(249,168,37,0.2));
  border-radius: 2px;
  transition: width 0.3s ease;
}

.staff-card:hover .staff-rule {
  width: 48px;
}

.staff-subtitle {
  font-size: 0.75rem;
  color: #1b5e20;
  font-style: italic;
  line-height: 1.5;
}

.staff-position {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(13, 43, 15, 0.45);
}

/* Bottom gold-green line on hover */
.staff-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(to right, #f9a825, #1b5e20);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.staff-card:hover::after {
  transform: scaleX(1);
}

/* ================================
   ANIMATIONS
================================ */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ================================
   RESPONSIVE
================================ */
@media (max-width: 768px) {
  .personnel-hero { height: 280px; }
  .hero-title { font-size: 1.8rem; }

  .featured-card {
    flex-direction: column;
    text-align: center;
    padding: 36px 28px;
    gap: 28px;
  }
  .featured-info { align-items: center; }
  .featured-badge { align-self: center; }

  .staff-grid {
    grid-template-columns: 1fr;
  }
}
</style>