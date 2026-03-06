<template>
  <div class="app-wrapper">
    <div class="bg-orb orb-1"></div>
    <div class="bg-orb orb-2"></div>
    <div class="grid-overlay"></div>

    <div class="page-container">

      <!-- Header -->
      <header class="page-header">
        <div class="header-badge">
          <span class="badge-dot"></span>
          CSU STUDENT MANAGEMENT
        </div>
        <h1 class="page-title">Import <span class="title-accent">Student Records</span></h1>
        <p class="page-subtitle">Upload an Excel file to sync student data with the database</p>
      </header>

      <!-- Upload Card -->
      <div class="main-card">
        <div class="card-inner-header">
          <div class="section-label">
            <span class="step-number">01</span>
            <h2 class="section-title">Upload Excel File</h2>
          </div>
        </div>

        <!-- Drop Zone (UI only) -->
        <div class="upload-zone">
          <div class="upload-visual">
            <div class="upload-icon-ring">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
          </div>

          <div class="upload-content">
            <p class="upload-main-text">
              <strong>Drag & drop</strong> your Excel file here
            </p>
            <p class="upload-sub-text">
              or click to browse — .xlsx, .xls supported
            </p>
          </div>

          <button class="browse-btn">
            Browse Files
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
// File upload functionality will be connected later
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

/* ── Base ─────────────────────────────────────── */
.app-wrapper {
  min-height: 100vh;
  background: #0a1a0f;
  font-family: 'Syne', sans-serif;
  position: relative;
  overflow-x: hidden;
}

.bg-orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  z-index: 0;
}
.orb-1 {
  width: 560px; height: 560px;
  background: radial-gradient(circle, rgba(20,78,38,0.55), transparent 70%);
  top: -120px; left: -160px;
}
.orb-2 {
  width: 420px; height: 420px;
  background: radial-gradient(circle, rgba(212,175,55,0.1), transparent 70%);
  bottom: -60px; right: -100px;
}
.grid-overlay {
  position: fixed; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
  z-index: 0;
}

/* ── Layout ───────────────────────────────────── */
.page-container {
  position: relative; z-index: 1;
  max-width: 860px;
  margin: 0 auto;
  padding: 48px 24px 80px;
}

/* ── Header ───────────────────────────────────── */
.page-header { margin-bottom: 40px; }

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  color: #d4af37;
  background: rgba(212,175,55,0.08);
  border: 1px solid rgba(212,175,55,0.2);
  padding: 6px 14px;
  border-radius: 100px;
  margin-bottom: 20px;
}
.badge-dot {
  width: 6px; height: 6px;
  background: #d4af37;
  border-radius: 50%;
  animation: pulse-dot 2s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%,100% { opacity:1; transform:scale(1); }
  50% { opacity:0.4; transform:scale(0.65); }
}

.page-title {
  font-size: 42px;
  font-weight: 800;
  color: #f0ede4;
  line-height: 1.1;
  margin: 0 0 12px;
  letter-spacing: -0.02em;
}
.title-accent {
  color: #d4af37;
  position: relative;
}
.title-accent::after {
  content: '';
  position: absolute;
  bottom: 2px; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, #d4af37, transparent);
  border-radius: 2px;
}
.page-subtitle {
  color: rgba(240,237,228,0.42);
  font-size: 15px;
  margin: 0;
}

/* ── Card ─────────────────────────────────────── */
.main-card {
  background: rgba(14,32,18,0.88);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(212,175,55,0.04);
  padding: 32px 36px;
}

.card-inner-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.section-label {
  display: flex;
  align-items: center;
  gap: 12px;
}
.step-number {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  color: #d4af37;
  background: rgba(212,175,55,0.1);
  border: 1px solid rgba(212,175,55,0.25);
  padding: 3px 8px;
  border-radius: 6px;
  letter-spacing: 0.05em;
}
.section-title {
  font-size: 16px;
  font-weight: 700;
  color: #f0ede4;
  margin: 0;
}

/* ── Upload Zone ──────────────────────────────── */
.upload-zone {
  border: 2px dashed rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background: rgba(255,255,255,0.02);
  text-align: center;
}

.upload-icon-ring {
  width: 64px; height: 64px;
  border-radius: 50%;
  border: 1.5px solid rgba(212,175,55,0.25);
  background: rgba(212,175,55,0.07);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(212,175,55,0.7);
}

.upload-main-text {
  font-size: 15px;
  color: rgba(240,237,228,0.55);
  margin: 0;
}
.upload-main-text strong { color: #f0ede4; }

.upload-sub-text {
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  color: rgba(240,237,228,0.25);
  margin: 0;
  letter-spacing: 0.03em;
}

.browse-btn {
  background: rgba(212,175,55,0.1);
  border: 1px solid rgba(212,175,55,0.3);
  color: #d4af37;
  font-family: 'Syne', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  padding: 10px 22px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 4px;
}
.browse-btn:hover {
  background: rgba(212,175,55,0.18);
  border-color: rgba(212,175,55,0.55);
}

/* ── Responsive ───────────────────────────────── */
@media (max-width: 600px) {
  .page-title { font-size: 30px; }
  .main-card { padding: 24px 18px; }
  .card-inner-header { flex-direction: column; align-items: flex-start; gap: 12px; }
}
</style>