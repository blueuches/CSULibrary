<script setup lang="ts">
import { onBeforeUnmount, type DirectiveBinding } from 'vue'

const heroSrc = new URL('@/assets/csu.jpg', import.meta.url).href
const iconGif1 = new URL('@/assets/icons/idea.gif', import.meta.url).href
const iconGif2 = new URL('@/assets/icons/opportunities.gif', import.meta.url).href
const iconGif3 = new URL('@/assets/icons/student.gif', import.meta.url).href
const iconGif4 = new URL('@/assets/icons/social-life.gif', import.meta.url).href

const objectives = [
  '1. Develop collections of materials that support, enrich and satisfy the curricula and research needs of stakeholders;',
  '2. Effect a universally-accepted library system of organization and circulation;',
  '3. Ensure the provision and maintenance of efficient facilities and equipment for quality library services and operations;',
  '4. Install a computerized system of information access for wider information coverage and facilitated library operations;',
]

const rules = [
  '1. Always use appropriate voice level.',
  '2. No eating and drinking at reader’s area.',
  '3. Keep away books from rain, water and dust.',
  '4. Do not write or draw anything in our books.',
  '5. Cellular Phone should be put to silent mode.',
  '6. Answering phone calls inside the library is not allowed.',
  '7. Walk quietly into the library.',
  '8. Never run around the hallway outside the library premises.',
]

// scroll
let io: IntersectionObserver | null = null

const ensureObserver = (): IntersectionObserver | null => {
  if (io) return io

  const reduceMotion =
    typeof window !== 'undefined' &&
    !!window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduceMotion) {
    io = null
    return null
  }

  io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in')
          io?.unobserve(entry.target)
        }
      }
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -10% 0px',
    },
  )

  return io
}

type RevealBinding = DirectiveBinding<number | string | undefined>

const vReveal = {
  mounted(el: HTMLElement, binding: RevealBinding) {
    const delay = Number(binding.value ?? 0)
    if (delay > 0) el.style.setProperty('--reveal-delay', `${delay}ms`)

    el.classList.add('reveal')

    const obs = ensureObserver()
    if (!obs) {
      el.classList.add('reveal-in')
      return
    }
    obs.observe(el)
  },
  unmounted(el: HTMLElement) {
    io?.unobserve(el)
  },
}

onBeforeUnmount(() => {
  io?.disconnect()
  io = null
})
</script>

<template>
  <section class="about-page">
    <!-- Title -->
    <div class="page-inner" v-reveal>
      <div class="section-title section-title-center">
        <span class="section-kicker">
          <span class="kicker-line"></span>
          <span class="kicker-text">INTRODUCING CSU LIBRARY</span>
        </span>
        <h1 class="section-headline">ABOUT CSU LIBRARY</h1>
      </div>
    </div>

    <!-- HERO -->
    <div class="hero-bleed" v-reveal="80">
      <div class="hero-wrap hero-overlay">
        <img :src="heroSrc" alt="CSU Library" class="hero-img" loading="lazy" />
      </div>
    </div>

    <!-- Content area -->
    <div class="about-content page-inner">
      <!-- Intro -->
      <div class="intro-text" v-reveal>
        <p class="mt-5">
          Libraries play a very crucial role in supporting the academic programs of any university
          as it identifies, evaluates, procures, processes, and then makes these learning resources
          available to the faculty and student for their teaching, learning and research
          assignments.
        </p>

        <p class="mt-4">
          The Caraga State University (CSU) Library in support to the attainment of the mandate of
          the University specifically the educational objectives endeavors to provide relevant
          materials and services. It has a program of selection, acquisition, collection maintenance
          and stocking, circulation of relevant materials, and provision of physical facilities and
          professional manpower. It positions itself to respond to the changing expectations faced
          by the University which paves way to the changing needs of its clientele, and the
          curricular offerings.
        </p>
      </div>

      <!-- GIF icons -->
      <div class="page-inner" v-reveal>
        <div class="icon-wrap icon-mt">
          <div class="icon-pill">
            <img :src="iconGif1" alt="Animated idea icon" class="gif-icon" loading="lazy" />
            <span>Discovery</span>
          </div>
          <div class="icon-pill">
            <img :src="iconGif3" alt="Animated student icon" class="gif-icon" loading="lazy" />
            <span>Learning</span>
          </div>
          <div class="icon-pill">
            <img
              :src="iconGif2"
              alt="Animated opportunities icon"
              class="gif-icon"
              loading="lazy"
            />
            <span>knowledge</span>
          </div>
          <div class="icon-pill">
            <img :src="iconGif4" alt="Animated social-life icon" class="gif-icon" loading="lazy" />
            <span>Networking</span>
          </div>
        </div>
      </div>

      <!-- Row 1: 3 cards -->
      <div class="cards-grid">
        <div class="grid-item" v-reveal>
          <div class="content-box fixed-card">
            <div class="section-block no-top-space">
              <h3 class="green-heading with-accent">Vision</h3>
              <div class="card-body">
                <p class="section-paragraph">
                  The CSU Library envisions to be a leading repository of knowledge in the pursuit
                  of globally competitive academic aspirations of the University with respect to the
                  advancement of science and technology for the changing demands of Caraga Region.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="grid-item" v-reveal="80">
          <div class="content-box fixed-card">
            <div class="section-block no-top-space">
              <h3 class="green-heading with-accent">Mission</h3>
              <div class="card-body">
                <p class="section-paragraph">
                  It is committed to sustain an excellent bank of information to support the
                  services of the empowering stakeholders with knowledge and skills relevant to the
                  broad-based development of the region.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="grid-item" v-reveal="160">
          <div class="content-box fixed-card">
            <div class="section-block no-top-space">
              <h3 class="green-heading with-accent">Goal</h3>
              <div class="card-body">
                <p class="section-paragraph">
                  To ensure a well organized library system with a vast collection of information
                  and education materials relative to the academic programs of the University and
                  the societal demand of the region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Row 2: 2 wider cards (hover same as top cards) -->
      <div class="cards-grid-bottom">
        <div class="grid-item" v-reveal>
          <div class="content-box fixed-card">
            <div class="section-block no-top-space">
              <h3 class="green-heading with-accent">Objectives</h3>
              <div class="card-body no-scroll">
                <ol class="custom-list list-tight">
                  <li v-for="(item, i) in objectives" :key="i">{{ item }}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div class="grid-item" v-reveal="80">
          <div class="content-box fixed-card">
            <div class="section-block no-top-space">
              <h3 class="green-heading with-accent">Rules and Regulation</h3>
              <div class="card-body no-scroll">
                <ol class="custom-list list-tight">
                  <li v-for="(item, i) in rules" :key="i">{{ item }}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /Row 2 -->
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap;');

.about-page {
  font-family: 'Poppins', sans-serif;

  --page-bg: #f3f4f6;
  --ribbon-green: #0d2b0f;
  --accent-orange: #fbc02d;
  --text-color: #1f1f1f;
  --float-shadow-green: 13, 43, 15;

  width: 100%;
  min-height: 100vh;
  padding: 24px 0 40px;
  background: var(--page-bg);
}

.page-inner {
  width: 100% !important;
  max-width: none !important;
  margin: 0 !important;
  padding: 0 32px !important;
  box-sizing: border-box !important;
}

/* scroll */
.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 520ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 520ms cubic-bezier(0.2, 0.8, 0.2, 1);
  transition-delay: var(--reveal-delay, 0ms);
  will-change: opacity, transform;
}
.reveal.reveal-in {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}

/* Title */
.section-title {
  width: min(100%, 1500px);
  margin: 8px auto 14px;
}
.section-title-center {
  text-align: center;
}

.section-kicker {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  margin-top: 2.5%;
}
.kicker-line {
  width: 54px;
  height: 4px;
  border-radius: 999px;
  background: var(--accent-orange);
  display: inline-block;
}
.kicker-text {
  font-weight: 900;
  letter-spacing: 6px;
  font-size: 0.7rem;
  color: var(--ribbon-green);
  text-transform: uppercase;
}
.section-headline {
  margin: 10px 0 0;
  margin-bottom: 3%;
  font-weight: 900;
  font-size: clamp(1.6rem, 5vw, 3.3rem);
  line-height: 1.02;
  color: var(--ribbon-green);
}

/* Icons */
.icon-mt {
  margin-top: 32px;
}
.icon-wrap {
  width: min(100%, 1500px);
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  gap: 16px;
}
.icon-pill {
  display: inline-flex;
  align-items: center;
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.06);
}
.gif-icon {
  width: 46px;
  height: 46px;
  object-fit: contain;
  display: block;
}

/* Hero */
.hero-bleed {
  width: 100%;
  padding: 0 !important;
  margin: 10px 0 0;
}
.hero-wrap {
  width: 100% !important;
  max-width: none !important;
  margin: 0 !important;
  border-radius: 0;
  overflow: hidden;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow:
    0 10px 22px rgba(0, 0, 0, 0.1),
    0 18px 34px rgba(0, 0, 0, 0.08);
}
.hero-img {
  width: 100%;
  height: 370px;
  object-fit: cover;
  object-position: center;
  display: block;
  position: relative;
  z-index: 0;
  filter: brightness(0.92) contrast(1.03);
}
.hero-overlay {
  position: relative;
}
.hero-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(to bottom, rgba(13, 43, 15, 0.4), rgba(13, 43, 15, 0.68));
}

/* Content */
.about-content {
  width: 100%;
  padding-top: 10px;
  padding-bottom: 32px;
  box-sizing: border-box;
}
.intro-text {
  color: var(--text-color);
  line-height: 1.45;
  font-size: 15px;
  max-width: 1300px;
  margin: 0 auto;
  text-align: center;
}
.intro-text .mt-4 {
  margin-top: 14px;
}

/* Cards */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  align-items: stretch;
  perspective: 1200px;
  margin-top: 22px;
}
.cards-grid-bottom {
  width: min(100%, 1500px);
  margin: 20px auto 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  align-items: stretch;
  perspective: 1200px;
}
.grid-item {
  min-width: 0;
  display: flex;
  perspective: 1200px;
}

/* Card */
.content-box {
  width: 100%;
  background: linear-gradient(180deg, #ffffff 50%, #ffffff 100%);
  border-radius: 16px;
  padding: 18px 20px;
  box-sizing: border-box;

  box-shadow:
    0 6px 14px rgba(var(--float-shadow-green), 0.16),
    0 14px 28px rgba(var(--float-shadow-green), 0.12),
    0 2px 4px rgba(var(--float-shadow-green), 0.1);

  position: relative;
  transform: translateY(0);
  transition:
    transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 0.28s cubic-bezier(0.2, 0.8, 0.2, 1);
  will-change: transform, box-shadow;
}

.content-box::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.75) 0%,
    rgba(255, 255, 255, 0.22) 35%,
    rgba(255, 255, 255, 0) 62%
  );
  opacity: 0.35;
  transition: opacity 0.24s ease;
  pointer-events: none;
}
.content-box::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  border: 1px solid rgba(var(--float-shadow-green), 0.16);
  opacity: 0.5;
  pointer-events: none;
}

/* ✅ Hover behavior (applies to both top + bottom cards) */
.grid-item:hover .content-box {
  transform: translateY(-10px) scale(1.02);
  box-shadow:
    0 18px 34px rgba(var(--float-shadow-green), 0.28),
    0 28px 48px rgba(var(--float-shadow-green), 0.2),
    0 10px 20px rgba(var(--float-shadow-green), 0.16);
}

.fixed-card {
  height: 350px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.no-top-space {
  margin-top: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.green-heading {
  color: #0d2b0f;
  font-weight: 900;
  font-size: 2rem;
  line-height: 1.1;
  margin: 0;
  flex-shrink: 0;
}
.with-accent {
  position: relative;
  padding-left: 22px;
}
.with-accent::before {
  content: '';
  position: absolute;
  left: 0;
  top: 4px;
  width: 6px;
  height: 38px;
  background: var(--accent-orange);
  border-radius: 1px;
}

.card-body {
  margin-top: 12px;
  flex: 1;
  overflow-y: auto;
  padding-right: 4px;
}
.no-scroll {
  overflow-y: visible !important;
  padding-right: 0 !important;
}

.section-paragraph {
  margin: 0 0 0 34px;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-color);
}

.custom-list {
  margin: 0 0 0 34px;
  padding-left: 20px;
  color: var(--text-color);
  line-height: 1.32;
  font-size: 0.98rem;
}
.custom-list li {
  margin-bottom: 8px;
}
.list-tight {
  line-height: 1.3;
}
.list-tight li {
  margin-bottom: 8px;
}

/* Responsive */
@media (max-width: 1100px) {
  .page-inner {
    padding: 0 24px !important;
  }
  .cards-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
  .cards-grid-bottom {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .hero-img {
    height: 280px;
  }
}
@media (max-width: 768px) {
  .page-inner {
    padding: 0 14px !important;
    width: 100% !important;
  }
  .kicker-text {
    letter-spacing: 4px;
    font-size: 0.85rem;
  }
  .kicker-line {
    width: 38px;
    height: 4px;
  }
  .hero-img {
    height: 210px;
  }

  .cards-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .fixed-card {
    height: auto;
    min-height: 220px;
  }

  /* hover off on mobile */
  .grid-item:hover .content-box {
    transform: none;
    box-shadow:
      0 1px 2px rgba(0, 0, 0, 0.03),
      0 8px 18px rgba(0, 0, 0, 0.04);
  }
  .content-box::before,
  .content-box::after {
    display: none;
  }
}
</style>
