<template>
  <div class="page-shell">
    <Sidebar />

    <div class="page-scroll">
      <!-- HEADER -->
      <header class="attn-header">
        <div>
          <div class="header-breadcrumb !mb-2">
            <span
              class="cursor-pointer hover:text-[#0d2b0f] transition-colors"
              @click="$router.push('/admin/announcement')"
              >BACK</span
            >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 5l7 7-7 7" />
            </svg>

            <span>EVENT ANNOUNCEMENT</span>
          </div>

          <h1 class="hero-title">
            <span class="hero-word-dark hero-underlined">Library</span>
            <span class="hero-word-gold"> Settings</span>
          </h1>
          <p class="hero-subtitle">Configure school info, security, and system preferences</p>
        </div>
      </header>

      <!-- FORM GRID -->
      <div class="settings-grid">
        <!-- LEFT COL -->
        <div class="settings-col">
          <!-- School / Library Info -->
          <div class="settings-card" style="--delay: 0s">
            <div class="card-eyebrow">School / Library Information</div>
            <div class="field-stack">
              <div class="field-row">
                <label class="field-label">School Name</label>
                <div class="field-right">
                  <input class="field-input flex-1" type="text" value="Caraga State University" />
                  <label class="toggle-pill">
                    <input type="checkbox" checked />
                    <span class="pill-track"><span class="pill-thumb"></span></span>
                    <span class="pill-text">Show</span>
                  </label>
                </div>
              </div>

              <div class="field-row">
                <label class="field-label">Address</label>
                <input class="field-input flex-1" type="text" value="Ampayon, Butuan City" />
              </div>

              <div class="field-row">
                <label class="field-label">Font</label>
                <div class="field-right">
                  <button class="ghost-btn">Browse Font</button>
                  <span class="field-meta">Microsoft Sans Serif 8.25</span>
                </div>
              </div>

              <div class="field-row">
                <label class="field-label">School Logo</label>
                <div class="field-right">
                  <button class="ghost-btn">Browse</button>
                  <label class="toggle-pill">
                    <input type="checkbox" checked />
                    <span class="pill-track"><span class="pill-thumb"></span></span>
                    <span class="pill-text">Show</span>
                  </label>
                </div>
              </div>
              <p class="path-hint">C:\Users\PC_1\Pictures\Caraga_State_University.png</p>

              <div class="field-row">
                <label class="field-label">Max Capacity</label>
                <input class="field-input field-input--sm" type="number" value="1000" />
              </div>

              <div class="field-row">
                <label class="field-label">Library Hours</label>
                <div class="field-right time-row">
                  <input class="field-input field-input--xs" type="number" value="8" />
                  <span class="time-sep">am –</span>
                  <input class="field-input field-input--xs" type="number" value="8" />
                  <span class="time-sep">pm</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Play Video / Announcements -->
          <div class="settings-card" style="--delay: 0.2s">
            <div class="card-eyebrow">Play Video / Show Announcements</div>
            <div class="radio-stack">
              <label class="radio-row">
                <span class="radio-wrap">
                  <input type="radio" name="announce" value="video" v-model="announceMode" />
                  <span class="radio-custom"></span>
                </span>
                <span class="radio-label">Play Video Presentation</span>
                <button class="ghost-btn ml-auto">Browse</button>
              </label>
              <p class="radio-hint">No video selected</p>

              <label class="radio-row">
                <span class="radio-wrap">
                  <input type="radio" name="announce" value="image" v-model="announceMode" />
                  <span class="radio-custom"></span>
                </span>
                <span class="radio-label">Show Image</span>
                <button class="ghost-btn ml-auto">Browse</button>
              </label>
              <p class="radio-hint">No image selected</p>

              <label class="radio-row">
                <span class="radio-wrap">
                  <input type="radio" name="announce" value="none" v-model="announceMode" />
                  <span class="radio-custom"></span>
                </span>
                <span class="radio-label">Don't show anything</span>
              </label>
            </div>

            <div class="field-row mt-4">
              <label class="field-label">App Background</label>
              <div class="field-right">
                <button class="ghost-btn">Browse</button>
                <label class="toggle-pill">
                  <input type="checkbox" checked />
                  <span class="pill-track"><span class="pill-thumb"></span></span>
                  <span class="pill-text">Show</span>
                </label>
              </div>
            </div>
            <p class="path-hint">
              C:\Users\PC_1\Pictures\1300179-popular-f14-wallpaper-1920x1080.jpg
            </p>
          </div>
        </div>

        <!-- RIGHT COL -->
        <div class="settings-col">
          <!-- Security -->
          <div class="settings-card" style="--delay: 0.1s">
            <div class="card-eyebrow">Security</div>
            <div class="field-row">
              <label class="field-label">Admin Password</label>
              <div class="field-right">
                <input
                  class="field-input flex-1"
                  :type="showPass ? 'text' : 'password'"
                  value="password123"
                />
                <button class="ghost-btn" @click="showPass = !showPass">
                  {{ showPass ? 'Hide' : 'Hover To View' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Software Settings -->
          <div class="settings-card" style="--delay: 0.3s">
            <div class="card-eyebrow">Software Settings</div>
            <div class="check-stack">
              <label class="check-row">
                <span class="check-wrap">
                  <input type="checkbox" />
                  <span class="check-custom"></span>
                </span>
                Allow logout (Capacity check)
              </label>
              <label class="check-row">
                <span class="check-wrap">
                  <input type="checkbox" />
                  <span class="check-custom"></span>
                </span>
                Allow Visitor / Guest Login
              </label>
            </div>
          </div>

          <!-- Admin / Librarian Info -->
          <div class="settings-card" style="--delay: 0.4s">
            <div class="card-eyebrow">Administrator / Librarian Information</div>
            <div class="field-stack">
              <div class="field-col">
                <label class="field-label">Complete Name</label>
                <input class="field-input w-full" type="text" value="Jehovenn T. Berongoy" />
              </div>
              <div class="field-col">
                <label class="field-label">Position / Rank</label>
                <input class="field-input w-full" type="text" value="LOAMS In Charge" />
              </div>
            </div>
            <button class="enable-btn">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
              >
                <path d="M12 4v16m8-8H4" />
              </svg>
              Enable Book Drop System
            </button>
          </div>

          <!-- Action Buttons -->
          <div class="form-actions">
            <button class="cancel-btn" @click="$router.back()">Cancel</button>
            <button class="apply-btn">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'

const announceMode = ref('none')
const showPass = ref(false)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;0,700;0,900;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');

/* ── KEYFRAMES ── */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes underlineGrow {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.99);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ── SHELL ── */
.page-shell {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: #edefed;
  font-family: 'DM Sans', sans-serif;
}

/* ── SCROLL AREA ── */
.page-scroll {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 40px 44px 80px;
  box-sizing: border-box;
}
.page-scroll::-webkit-scrollbar {
  width: 5px;
}
.page-scroll::-webkit-scrollbar-thumb {
  background: rgba(6, 32, 9, 0.1);
  border-radius: 5px;
}

/* ── HEADER ── */
.attn-header {
  margin-bottom: 28px;
  animation: fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.header-breadcrumb {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
  font-size: 0.65rem;
  font-weight: 600;
  color: rgba(6, 32, 9, 0.38);
  letter-spacing: 0.04em;
}
.header-breadcrumb svg {
  width: 10px;
  height: 10px;
  opacity: 0.35;
  flex-shrink: 0;
}
.breadcrumb-back {
  cursor: pointer;
  transition: color 0.18s;
}
.breadcrumb-back:hover {
  color: #062009;
}
.breadcrumb-current {
  color: rgba(6, 32, 9, 0.65);
  font-weight: 700;
}

.hero-title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.02em;
  margin: 0 0 8px;
  display: inline-block;
}
.hero-word-dark {
  color: #062009;
}

.hero-underlined {
  position: relative;
  display: inline-block;
}
.hero-underlined::after {
  content: '';
  position: absolute;
  bottom: -7px;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(to right, #062009, #f9a825);
  border-radius: 3px;
  transform-origin: left;
  animation: underlineGrow 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.hero-subtitle {
  font-size: 0.82rem;
  color: #6b7280;
  margin-top: 16px;
}

/* ── SETTINGS GRID ── */
.settings-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: start;
}
.settings-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ── CARD ── */
.settings-card {
  background: white;
  border: 1px solid rgba(6, 32, 9, 0.07);
  border-radius: 20px;
  padding: 22px 22px 20px;
  box-shadow: 0 2px 12px rgba(6, 32, 9, 0.05);
  animation: cardIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0s) both;
  transition:
    box-shadow 0.2s,
    transform 0.2s;
}
.settings-card:hover {
  box-shadow: 0 6px 24px rgba(6, 32, 9, 0.09);
  transform: translateY(-1px);
}

.card-eyebrow {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  color: #c8930a;
  text-transform: uppercase;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1.5px solid #f5edda;
}

/* ── FIELDS ── */
.field-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.field-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.field-col {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.field-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: rgba(6, 32, 9, 0.4);
  min-width: 120px;
  flex-shrink: 0;
}
.field-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  flex-wrap: wrap;
}
.field-input {
  padding: 0.32rem 0.65rem;
  border-radius: 9px;
  border: 1.5px solid #e2e6e0;
  background: #f7f8f5;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem;
  color: #062009;
  outline: none;
  min-width: 0;
  transition:
    border-color 0.18s,
    box-shadow 0.18s;
}
.field-input:focus {
  border-color: #062009;
  box-shadow: 0 0 0 3px rgba(6, 32, 9, 0.08);
}
.field-input.flex-1 {
  flex: 1;
}
.field-input.w-full {
  width: 100%;
}
.field-input--sm {
  width: 80px;
}
.field-input--xs {
  width: 52px;
  text-align: center;
}

.field-meta {
  font-size: 0.66rem;
  color: #9ba390;
}
.path-hint {
  font-size: 0.62rem;
  color: #9ba390;
  margin-top: -4px;
}
.time-row {
  gap: 6px;
}
.time-sep {
  font-size: 0.72rem;
  color: rgba(6, 32, 9, 0.4);
}

/* ── GHOST BTN ── */
.ghost-btn {
  font-size: 0.66rem;
  font-weight: 700;
  padding: 0.28rem 0.85rem;
  border-radius: 8px;
  border: 1.5px solid #e2e6e0;
  background: #f7f8f5;
  color: #062009;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background 0.18s,
    border-color 0.18s,
    transform 0.15s;
}
.ghost-btn:hover {
  background: #eaede4;
  border-color: #c5ccbe;
  transform: translateY(-1px);
}
.ghost-btn:active {
  transform: translateY(0);
}

/* ── TOGGLE PILL ── */
.toggle-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}
.toggle-pill input {
  display: none;
}
.pill-track {
  width: 36px;
  height: 20px;
  border-radius: 999px;
  background: #d4d8ce;
  position: relative;
  transition: background 0.22s;
}
.pill-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);
}
.toggle-pill input:checked + .pill-track {
  background: #062009;
}
.toggle-pill input:checked + .pill-track .pill-thumb {
  transform: translateX(16px);
}
.pill-text {
  font-size: 0.65rem;
  font-weight: 700;
  color: rgba(6, 32, 9, 0.4);
}

/* ── RADIO ── */
.radio-stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.radio-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.78rem;
  font-weight: 500;
  color: #062009;
  cursor: pointer;
}
.radio-wrap {
  display: flex;
  flex-shrink: 0;
}
.radio-wrap input {
  display: none;
}
.radio-custom {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #d4d8ce;
  position: relative;
  flex-shrink: 0;
  transition: border-color 0.18s;
}
.radio-wrap input:checked ~ .radio-custom {
  border-color: #062009;
}
.radio-wrap input:checked ~ .radio-custom::after {
  content: '';
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  background: #062009;
}
.radio-label {
  flex: 1;
}
.radio-hint {
  font-size: 0.62rem;
  color: #9ba390;
  padding-left: 24px;
  margin-top: -4px;
}

/* ── CHECKBOX ── */
.check-stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.check-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.78rem;
  font-weight: 500;
  color: #062009;
  cursor: pointer;
}
.check-wrap {
  display: flex;
  flex-shrink: 0;
}
.check-wrap input {
  display: none;
}
.check-custom {
  width: 17px;
  height: 17px;
  border-radius: 5px;
  border: 2px solid #d4d8ce;
  position: relative;
  flex-shrink: 0;
  transition:
    border-color 0.18s,
    background 0.18s;
}
.check-wrap input:checked ~ .check-custom {
  border-color: #062009;
  background: #062009;
}
.check-wrap input:checked ~ .check-custom::after {
  content: '';
  position: absolute;
  left: 3px;
  top: 1px;
  width: 5px;
  height: 9px;
  border: 2px solid #fff;
  border-top: none;
  border-left: none;
  transform: rotate(45deg);
}

/* ── ENABLE BTN ── */
.enable-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 16px;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.55rem 1.1rem;
  border-radius: 10px;
  border: 1.5px solid #c8930a;
  background: #fef9ee;
  color: #c8930a;
  cursor: pointer;
  transition:
    background 0.18s,
    transform 0.15s;
}
.hero-word-gold {
  color: #e6a800;
}
.enable-btn:hover {
  background: #faefd0;
  transform: translateY(-1px);
}
.enable-btn:active {
  transform: translateY(0);
}

/* ── FORM ACTIONS ── */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 4px;
  animation: fadeUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
}
.cancel-btn {
  padding: 0.6rem 1.3rem;
  border-radius: 11px;
  border: 1.5px solid #e2e6e0;
  background: transparent;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  color: rgba(6, 32, 9, 0.4);
  cursor: pointer;
  transition:
    background 0.18s,
    color 0.18s;
}
.cancel-btn:hover {
  background: #f0f2ec;
  color: rgba(6, 32, 9, 0.7);
}
.apply-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 0.6rem 1.5rem;
  border-radius: 11px;
  border: none;
  background: #062009;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(6, 32, 9, 0.2);
  transition:
    background 0.18s,
    box-shadow 0.18s,
    transform 0.15s;
}
.apply-btn:hover {
  background: #1b5e20;
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(6, 32, 9, 0.25);
}
.apply-btn:active {
  transform: translateY(0);
}

/* ── UTILITIES ── */
.ml-auto {
  margin-left: auto;
}
.mt-4 {
  margin-top: 1rem;
}

/* ── RESPONSIVE ── */
@media (max-width: 960px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 680px) {
  .page-scroll {
    padding: 20px 16px 60px;
  }
}
</style>
