<template>
  <div class="page-shell">
    <Sidebar />

    <div class="page-scroll">
      <header class="attn-header">
        <div class="header-content">
          <nav class="header-breadcrumb">
            <span class="breadcrumb-back" @click="$router.push('/admin/attendance')">Attendance</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M9 5l7 7-7 7" />
            </svg>
            <span class="breadcrumb-current">System Configuration</span>
          </nav>

          <div class="hero-flex">
            <div>
              <h1 class="hero-title">
                <span class="hero-word-dark">Library</span>
                <span class="hero-word-accent italic">Settings</span>
              </h1>
              <p class="hero-subtitle">Define institutional parameters, security protocols, and display preferences.</p>
            </div>
            <div class="header-status-badge">
              <span class="status-dot"></span>
              Administrative Access
            </div>
          </div>
        </div>
      </header>

      <div class="settings-grid">
        <div class="settings-col">
          <section class="settings-card" style="--delay: 0.1s">
            <div class="card-header">
              <h3 class="card-eyebrow">Institutional Identity</h3>
            </div>
            
            <div class="field-stack">
              <div class="field-group">
                <label class="field-label">University / School Name</label>
                <div class="input-with-action">
                  <input class="field-input flex-1" type="text" value="Caraga State University" />
                  <label class="toggle-switch">
                    <input type="checkbox" checked />
                    <span class="switch-slider"></span>
                  </label>
                </div>
              </div>

              <div class="field-group">
                <label class="field-label">Campus Address</label>
                <input class="field-input w-full" type="text" value="Ampayon, Butuan City" />
              </div>

              <div class="grid-row-2">
                <div class="field-group">
                  <label class="field-label">System Font</label>
                  <button class="action-select-btn">
                    <span>MS Sans Serif</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M19 9l-7 7-7-7" /></svg>
                  </button>
                </div>
                <div class="field-group">
                  <label class="field-label">Maximum Capacity</label>
                  <input class="field-input w-full text-center" type="number" value="1000" />
                </div>
              </div>
            </div>
          </section>

          <section class="settings-card" style="--delay: 0.3s">
            <div class="card-header">
              <h3 class="card-eyebrow">Announcement Display</h3>
            </div>
            
            <div class="selection-stack">
              <label class="radio-option" :class="{ active: announceMode === 'video' }">
                <input type="radio" name="mode" value="video" v-model="announceMode" />
                <div class="radio-text">
                  <span class="radio-label">Video Presentation</span>
                  <span class="radio-sub">Play looping institutional media</span>
                </div>
                <button class="browse-link">Browse</button>
              </label>

              <label class="radio-option" :class="{ active: announceMode === 'image' }">
                <input type="radio" name="mode" value="image" v-model="announceMode" />
                <div class="radio-text">
                  <span class="radio-label">Static Image</span>
                  <span class="radio-sub">Display standard announcement graphics</span>
                </div>
                <button class="browse-link">Browse</button>
              </label>
            </div>
          </section>
        </div>

        <div class="settings-col">
          <section class="settings-card" style="--delay: 0.2s">
            <div class="card-header">
              <h3 class="card-eyebrow">Security & Access</h3>
            </div>
            
            <div class="field-group">
              <label class="field-label">Admin Master Password</label>
              <div class="password-input-group">
                <input :type="showPass ? 'text' : 'password'" value="••••••••••••" class="field-input flex-1" />
                <button class="visibility-btn" @click="showPass = !showPass">
                  {{ showPass ? 'Hide' : 'Reveal' }}
                </button>
              </div>
            </div>
          </section>

          <section class="settings-card" style="--delay: 0.4s">
            <div class="card-header">
              <h3 class="card-eyebrow">Librarian In-Charge</h3>
            </div>
            
            <div class="field-stack">
              <div class="field-group">
                <label class="field-label">Full Name</label>
                <input class="field-input w-full" type="text" value="Jehovenn T. Berongoy" />
              </div>
              <div class="field-group">
                <label class="field-label">Position / Rank</label>
                <input class="field-input w-full" type="text" value="LOAMS In Charge" />
              </div>
              
              <button class="secondary-feature-btn">
                <span class="btn-plus">+</span>
                Enable Book Drop Module
              </button>
            </div>
          </section>

          <div class="footer-actions">
            <button class="btn-ghost" @click="$router.back()">Discard Changes</button>
            <button class="btn-apply">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12" /></svg>
              Save Configuration
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

// Fixed reactive variables to resolve
const announceMode = ref('video')
const showPass = ref(false)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

.page-shell {
  display: flex;
  height: 100vh;
  background: #f4f6f3;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #062009;
}

.page-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 40px 50px;
}

/* Header Styling */
.header-breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(6, 32, 9, 0.4);
  margin-bottom: 12px;
}

.hero-title {
  font-size: 2.8rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
}

.hero-word-accent {
  color: #c8930a;
}

.hero-subtitle {
  font-size: 0.85rem;
  color: #6b7280;
  margin-top: 10px;
  max-width: 500px;
}

.header-status-badge {
  background: white;
  padding: 8px 16px;
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);
}

.status-dot {
  width: 6px;
  height: 6px;
  background: #10b981;
  border-radius: 50%;
}

/* Grid & Cards */
.settings-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 40px;
}

.settings-card {
  background: white;
  border-radius: 24px;
  padding: 28px;
  border: 1px solid rgba(6, 32, 9, 0.06);
  box-shadow: 0 4px 20px rgba(6, 32, 9, 0.02);
  margin-bottom: 24px;
}

.card-eyebrow {
  font-size: 0.8rem;
  font-weight: 800;
  color: #062009;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f2ef;
  margin-bottom: 20px;
}

/* Inputs */
.field-group { margin-bottom: 16px; }
.field-label {
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  color: rgba(6, 32, 9, 0.5);
  margin-bottom: 6px;
  text-transform: uppercase;
}

.field-input {
  background: #f8faf7;
  border: 1.5px solid #eef1ec;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s;
}

.field-input:focus {
  outline: none;
  border-color: #062009;
  background: white;
}

.input-with-action { display: flex; align-items: center; gap: 12px; }

/* Buttons */
.btn-apply {
  background: #062009;
  color: white;
  padding: 12px 24px;
  border-radius: 14px;
  font-weight: 700;
  font-size: 0.85rem;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-apply:hover { transform: translateY(-2px); }

.secondary-feature-btn {
  width: 100%;
  background: #fef9ec;
  border: 2px dashed #f1e4c4;
  padding: 14px;
  border-radius: 16px;
  color: #c8930a;
  font-weight: 700;
  font-size: 0.8rem;
  margin-top: 10px;
  cursor: pointer;
}

/* Radio Options */
.radio-option {
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 16px;
  border: 1.5px solid #eef1ec;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.radio-option.active {
  border-color: #062009;
  background: #fcfdfc;
}

.radio-text { flex: 1; margin-left: 12px; }
.radio-label { display: block; font-weight: 700; font-size: 0.85rem; }
.radio-sub { font-size: 0.65rem; color: #9ca3af; }

.footer-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  margin-top: 10px;
}

.btn-ghost {
  background: none;
  border: none;
  color: #9ca3af;
  font-weight: 700;
  cursor: pointer;
}

.grid-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.w-full { width: 100%; }
.flex-1 { flex: 1; }
</style>