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
          ANALYTICS STUDIO
        </div>
        <h1 class="page-title">Add New <span class="title-accent">Statistic</span></h1>
        <p class="page-subtitle">Configure your report parameters and upload your data source</p>
      </header>

      <!-- Main Card -->
      <div class="main-card">

        <!-- Step 1: Report Details -->
        <section class="form-section">
          <div class="section-label">
            <span class="step-number">01</span>
            <h2 class="section-title">Report Details</h2>
          </div>

          <div class="fields-grid">
            <div class="field-group">
              <label class="field-label">Report Name <span class="required">*</span></label>
              <input
                v-model="reportName"
                type="text"
                placeholder="e.g. Monthly Sales Summary"
                class="field-input"
              />
            </div>

            <div class="field-group">
              <label class="field-label">Group By Column <span class="required">*</span></label>
              <div class="select-wrapper">
                <select v-model="groupBy" class="field-input field-select">
                  <option disabled value="">Select column…</option>
                  <option v-for="col in availableColumns" :key="col" :value="col">{{ col }}</option>
                </select>
                <span class="select-arrow">▾</span>
              </div>
            </div>

            <div class="field-group">
              <label class="field-label">Unique By <span class="optional">(optional)</span></label>
              <div class="select-wrapper">
                <select v-model="uniqueBy" class="field-input field-select">
                  <option disabled value="">Select column…</option>
                  <option v-for="col in availableColumns" :key="col" :value="col">{{ col }}</option>
                </select>
                <span class="select-arrow">▾</span>
              </div>
            </div>

            <div class="field-group">
              <label class="field-label">Sort By Column <span class="required">*</span></label>
              <div class="select-wrapper">
                <select v-model="sortBy" class="field-input field-select">
                  <option disabled value="">Select column…</option>
                  <option v-for="col in availableColumns" :key="col" :value="col">{{ col }}</option>
                </select>
                <span class="select-arrow">▾</span>
              </div>
            </div>
          </div>

          <div class="inline-fields">
            <div class="field-group field-narrow">
              <label class="field-label">Top N Limit</label>
              <input
                v-model.number="limit"
                type="number"
                placeholder="e.g. 10"
                class="field-input"
              />
            </div>

            <div class="field-group field-narrow">
              <label class="field-label">Sort Direction</label>
              <div class="toggle-group">
                <button
                  @click="sortDirection = 'desc'"
                  :class="['toggle-btn', sortDirection === 'desc' ? 'toggle-active' : '']"
                >↓ Desc</button>
                <button
                  @click="sortDirection = 'asc'"
                  :class="['toggle-btn', sortDirection === 'asc' ? 'toggle-active' : '']"
                >↑ Asc</button>
              </div>
            </div>
          </div>
        </section>

        <div class="section-divider"></div>

        <!-- Step 2: Display Columns -->
        <section class="form-section">
          <div class="section-label">
            <span class="step-number">02</span>
            <h2 class="section-title">Display Columns</h2>
          </div>

          <div class="empty-columns">
            Column selection will be available once data integration is connected
          </div>
        </section>

        <div class="section-divider"></div>

        <!-- Submit -->
        <section class="form-section submit-section">
          <div class="submit-info">
            <span v-if="reportName && groupBy && sortBy" class="ready-badge">
              <span class="ready-dot"></span> Ready to create
            </span>
          </div>
          <button @click="createReport" class="submit-btn">
            <span class="btn-text">Create Statistic</span>
            <span class="btn-arrow">→</span>
          </button>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const reportName = ref("");
const groupBy = ref("");
const uniqueBy = ref("");
const sortBy = ref("");
const sortDirection = ref("desc");
const limit = ref<number | null>(null);

const availableColumns = ref<string[]>([]);

function createReport() {
  if (!reportName.value || !groupBy.value || !sortBy.value) {
    alert("Please fill all required fields.");
    return;
  }
  const reportDefinition = {
    name: reportName.value,
    groupBy: groupBy.value,
    uniqueBy: uniqueBy.value || null,
    sortBy: sortBy.value,
    sortDirection: sortDirection.value,
    limit: limit.value || null,
  };
  console.log("Report Definition:", reportDefinition);
  alert("Statistic created successfully!");
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

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
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
}
.orb-1 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(22, 80, 40, 0.5), transparent 70%);
  top: -100px; left: -150px;
}
.orb-2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.12), transparent 70%);
  bottom: 0; right: -100px;
}
.grid-overlay {
  position: fixed; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
  z-index: 0;
}

.page-container {
  position: relative; z-index: 1;
  max-width: 860px;
  margin: 0 auto;
  padding: 48px 24px 80px;
}

.page-header { margin-bottom: 40px; }

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: #d4af37;
  background: rgba(212, 175, 55, 0.08);
  border: 1px solid rgba(212, 175, 55, 0.2);
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
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.7); }
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
  color: rgba(240, 237, 228, 0.45);
  font-size: 15px;
  font-weight: 400;
  margin: 0;
}

.main-card {
  background: rgba(14, 32, 18, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  overflow: hidden;
  box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.05);
}

.form-section { padding: 36px 40px; }

.section-label {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
}
.step-number {
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  font-weight: 500;
  color: #d4af37;
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.25);
  padding: 3px 8px;
  border-radius: 6px;
  letter-spacing: 0.05em;
}
.section-title {
  font-size: 16px;
  font-weight: 700;
  color: #f0ede4;
  margin: 0;
  letter-spacing: 0.01em;
}

.section-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent);
  margin: 0 40px;
}

.fields-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.inline-fields {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.field-group { display: flex; flex-direction: column; gap: 8px; }
.field-narrow { flex: 0 0 auto; }

.field-label {
  font-size: 12px;
  font-weight: 600;
  color: rgba(240, 237, 228, 0.55);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.required { color: #d4af37; margin-left: 2px; }
.optional { color: rgba(240, 237, 228, 0.3); font-weight: 400; text-transform: none; letter-spacing: 0; }

.field-input {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 10px;
  padding: 11px 14px;
  font-family: 'Syne', sans-serif;
  font-size: 14px;
  color: #f0ede4;
  outline: none;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  width: 100%;
  box-sizing: border-box;
}
.field-input::placeholder { color: rgba(240, 237, 228, 0.2); }
.field-input:focus {
  border-color: rgba(212, 175, 55, 0.5);
  background: rgba(212, 175, 55, 0.04);
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.08);
}

.select-wrapper { position: relative; }
.field-select { appearance: none; padding-right: 36px; cursor: pointer; }
.field-select option { background: #0f2614; color: #f0ede4; }
.select-arrow {
  position: absolute;
  right: 12px; top: 50%;
  transform: translateY(-50%);
  color: rgba(212, 175, 55, 0.6);
  font-size: 13px;
  pointer-events: none;
}

.toggle-group {
  display: flex;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 10px;
  overflow: hidden;
}
.toggle-btn {
  flex: 1;
  padding: 10px 16px;
  font-family: 'Syne', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: rgba(240,237,228,0.4);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}
.toggle-active {
  background: rgba(212, 175, 55, 0.15);
  color: #d4af37;
}

.empty-columns {
  font-size: 13px;
  color: rgba(240,237,228,0.25);
  font-style: italic;
  padding: 8px 0;
}

.submit-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ready-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #5cba6e;
  font-family: 'DM Mono', monospace;
  letter-spacing: 0.05em;
}
.ready-dot {
  width: 7px; height: 7px;
  background: #5cba6e;
  border-radius: 50%;
  animation: pulse-dot 1.5s ease-in-out infinite;
}

.submit-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #c9a227 0%, #e8c547 100%);
  color: #0a1a0f;
  font-family: 'Syne', sans-serif;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding: 14px 28px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 24px rgba(212,175,55,0.25), 0 1px 0 rgba(255,255,255,0.2) inset;
}
.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(212,175,55,0.4), 0 1px 0 rgba(255,255,255,0.2) inset;
}
.submit-btn:active { transform: translateY(0); }
.btn-arrow {
  font-size: 16px;
  transition: transform 0.2s;
}
.submit-btn:hover .btn-arrow { transform: translateX(3px); }

@media (max-width: 640px) {
  .form-section { padding: 28px 20px; }
  .section-divider { margin: 0 20px; }
  .fields-grid { grid-template-columns: 1fr; }
  .page-title { font-size: 30px; }
  .submit-section { flex-direction: column; align-items: flex-start; gap: 16px; }
  .submit-btn { width: 100%; justify-content: center; }
}
</style>