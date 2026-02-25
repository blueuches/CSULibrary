<script setup lang="ts">
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
</script>

<template>
  <section class="about-page">
    <!-- Ribbon -->
    <div class="csu-ribbon-wrap">
      <div class="page-inner">
        <div class="csu-ribbon">
          <span class="csu-ribbon-title">ABOUT CSU LIBRARY</span>
        </div>
      </div>
    </div>
    <!-- Content area -->
    <div class="about-content page-inner">
      <div class="intro-text">
        <p>
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

      <h2 class="vmg-title">Vision, Mission, Goal</h2>

      <div class="cards-grid">
        <!-- Vision -->
        <div class="grid-item">
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

        <!-- Mission -->
        <div class="grid-item">
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

        <!-- Goal -->
        <div class="grid-item">
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

        <!-- Objectives -->
        <div class="grid-item">
          <div class="content-box fixed-card list-card">
            <div class="section-block no-top-space">
              <h3 class="green-heading with-accent">Objectives</h3>
              <div class="card-body">
                <ol class="custom-list">
                  <li v-for="(item, i) in objectives" :key="i">{{ item }}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <!-- Rules and Regulation -->
        <div class="grid-item">
          <div class="content-box fixed-card list-card">
            <div class="section-block no-top-space">
              <h3 class="green-heading with-accent">Rules and Regulation</h3>
              <div class="card-body">
                <ol class="custom-list">
                  <li v-for="(item, i) in rules" :key="i">{{ item }}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div class="grid-item ghost-item" aria-hidden="true">
          <div class="content-box fixed-card"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* =========================
   Page
========================= */
.about-page {
  --page-bg: #f3f4f6;
  --ribbon-green: #1b5e20;
  --ribbon-green-dark: #1b5e20;
  --accent-orange: #f15a24;
  --text-color: #1f1f1f;
  --card-border: #d8d8d8;
  --float-shadow-green: 102, 187, 106;

  width: 100%;
  min-height: 100vh;
  padding: 24px 0 40px;
  background: var(--page-bg);
}

.page-inner {
  width: min(100%, 1500px);
  margin: 0 auto;
  padding: 0 32px;
  box-sizing: border-box;
}

/* =========================
   Ribbon (aligned to content)
========================= */
.csu-ribbon-wrap {
  width: 100%;
  padding: 12px 0 8px;
  position: relative;
}

.csu-ribbon {
  position: relative;
  width: 100%;
  height: 48px;
  background: var(--ribbon-green);
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
  background: var(--page-bg);
  clip-path: polygon(0 50%, 100% 0, 100% 100%);
}

.csu-ribbon::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 0;
  border-top: 10px solid var(--ribbon-green-dark);
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
  /* background: #ff5a36; */
  border-radius: 1px;
}

/* =========================
   Content
========================= */
.about-content {
  width: 100%;
  padding-top: 10px;
  padding-bottom: 32px;
  box-sizing: border-box;
}

.intro-text {
  color: var(--text-color);
  line-height: 1.45;
  font-size: 1rem;
  max-width: 1300px;
  margin: 0 auto;
  text-align: center;
}

.intro-text .mt-4 {
  margin-top: 14px;
}

.vmg-title {
  margin: 34px 0 20px;
  font-weight: 900;
  font-size: 3rem;
  color: #1b5e20;
  text-align: center;
  line-height: 1.1;
}

/* =========================
   3-column cards grid
========================= */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  align-items: stretch;
  perspective: 1200px;
}

.grid-item {
  min-width: 0;
  display: flex;
  perspective: 1200px;
}

/* =========================
   Card + 3D Hover Effect
========================= */
.content-box {
  width: 100%;
  background: linear-gradient(180deg, #ffffff 0%, #fbfbfb 100%);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  padding: 18px 20px;
  box-sizing: border-box;

  box-shadow:
    0 6px 14px rgba(var(--float-shadow-green), 0.16),
    0 14px 28px rgba(var(--float-shadow-green), 0.12),
    0 2px 4px rgba(var(--float-shadow-green), 0.1);

  position: relative;
  transform-style: preserve-3d;
  transform-origin: center center;
  backface-visibility: hidden;

  transform: translateY(-2px) translateZ(0);

  transition:
    transform 0.32s cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 0.32s cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 0.28s ease;
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
  transition: opacity 0.28s ease;
  pointer-events: none;
}

.content-box::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  border: 1px solid rgba(var(--float-shadow-green), 0.16);
  box-shadow: 0 0 0 0 rgba(var(--float-shadow-green), 0);
  opacity: 0.5;
  transition:
    opacity 0.28s ease,
    box-shadow 0.28s ease,
    border-color 0.28s ease;
  pointer-events: none;
}

.grid-item:hover .content-box::after {
  opacity: 1;
  border-color: rgba(var(--float-shadow-green), 0.32);
  box-shadow: 0 0 0 4px rgba(var(--float-shadow-green), 0.1);
}

.grid-item:hover .content-box {
  transform: translateY(-12px) rotateX(7deg) rotateY(-5deg) scale(1.015);
  border-color: rgba(var(--float-shadow-green), 0.35);
  box-shadow:
    0 18px 34px rgba(var(--float-shadow-green), 0.28),
    0 28px 48px rgba(var(--float-shadow-green), 0.2),
    0 10px 20px rgba(var(--float-shadow-green), 0.16);
}

.grid-item:nth-child(even):hover .content-box {
  transform: translateY(-12px) rotateX(7deg) rotateY(5deg) scale(1.015);
}

.grid-item:hover .content-box::before {
  opacity: 0.8;
}

.grid-item:hover .content-box::after {
  opacity: 1;
  border-color: rgba(27, 94, 32, 0.2);
  box-shadow: 0 0 0 4px rgba(27, 94, 32, 0.05);
}

.ghost-item:hover .content-box {
  transform: none !important;
  box-shadow: none !important;
  border-color: transparent !important;
}
.ghost-item .content-box::before,
.ghost-item .content-box::after {
  display: none;
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

.section-block {
  margin-top: 10px;
}

.green-heading {
  color: #2e7d32;
  font-weight: 900;
  font-size: 2rem;
  line-height: 1.1;
  margin: 0;
  flex-shrink: 0;

  transition: transform 0.28s ease;
  transform-style: preserve-3d;
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
  transition: transform 0.28s ease;
  transform-style: preserve-3d;
}

.grid-item:hover .green-heading {
  transform: translateZ(18px);
}

.grid-item:hover .card-body {
  transform: translateZ(10px);
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
  line-height: 1.5;
  font-size: 1rem;
}

.custom-list li {
  margin-bottom: 10px;
}

.ghost-item {
  visibility: hidden;
  pointer-events: none;
}

/* =========================
   List Cards (Objectives + Rules)
========================= */
.list-card {
  height: auto !important;
  min-height: 390px;
}

.list-card .card-body {
  overflow-y: visible;
  padding-right: 0;
}

/* =========================
   Responsive
========================= */
@media (max-width: 1400px) {
  .vmg-title {
    font-size: 2.5rem;
  }

  .green-heading {
    font-size: 1.75rem;
  }

  .fixed-card {
    height: 330px;
  }

  .list-card {
    min-height: 400px;
  }

  .with-accent::before {
    height: 34px;
  }
}

@media (max-width: 1100px) {
  .page-inner {
    padding: 0 24px;
  }

  .cards-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  .ghost-item {
    display: none;
  }

  .fixed-card {
    height: 320px;
  }

  .list-card {
    height: auto !important;
    min-height: 360px;
  }

  .vmg-title {
    font-size: 2.1rem;
  }
}

@media (max-width: 768px) {
  .page-inner {
    width: 100%;
    padding: 0 14px;
  }

  .csu-ribbon {
    height: 42px;
  }

  .csu-ribbon::after {
    width: 26px;
    height: 42px;
  }

  .csu-ribbon-title {
    font-size: 1rem;
    line-height: 42px;
  }

  .csu-ribbon-title::before {
    top: -12px;
    transform: translateX(-82px);
    height: 8px;
  }

  .intro-text {
    font-size: 0.96rem;
  }

  .vmg-title {
    margin-top: 22px;
    margin-bottom: 14px;
    font-size: 1.5rem;
  }

  .cards-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .content-box {
    padding: 16px;
    border-radius: 14px;
  }

  .fixed-card {
    height: auto;
    min-height: 220px;
  }

  .list-card {
    min-height: 220px;
  }

  .green-heading {
    font-size: 1.45rem;
  }

  .with-accent::before {
    top: 3px;
    height: 28px;
  }

  .section-paragraph,
  .custom-list {
    margin-left: 28px;
  }

  /* Disable heavy 3D hover on mobile */
  .grid-item:hover .content-box,
  .grid-item:nth-child(even):hover .content-box {
    transform: none;
    box-shadow:
      0 1px 2px rgba(0, 0, 0, 0.03),
      0 8px 18px rgba(0, 0, 0, 0.04);
  }

  .grid-item:hover .green-heading,
  .grid-item:hover .card-body {
    transform: none;
  }

  .content-box::before,
  .content-box::after {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .content-box,
  .green-heading,
  .card-body {
    transition: none !important;
  }
}
</style>
