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
          <div v-if="fileName" class="file-pill">
            <span class="file-pill-icon">📄</span>
            <span class="file-pill-name">{{ fileName }}</span>
            <button @click="clearData" class="file-pill-remove">✕</button>
          </div>
        </div>

        <!-- Drop Zone -->
        <div
          class="upload-zone"
          :class="{
            'upload-zone--active': isDragging,
            'upload-zone--loaded': fileName
          }"
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="handleDrop"
          @click="openFileDialog"
        >
          <input
            type="file"
            accept=".xlsx,.xls"
            @change="handleFileUpload"
            class="hidden-input"
            ref="fileInput"
          />

          <div class="upload-visual">
            <div class="upload-icon-ring" :class="{ 'ring--loaded': fileName }">
              <svg v-if="!fileName" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <svg v-else width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
          </div>

          <div class="upload-content">
            <p v-if="!fileName" class="upload-main-text">
              <strong>Drag & drop</strong> your Excel file here
            </p>
            <p v-else class="upload-main-text upload-success-text">
              <strong>{{ fileName }}</strong> loaded successfully
            </p>
            <p class="upload-sub-text">
              <span v-if="!fileName">or click to browse — .xlsx, .xls supported</span>
              <span v-else class="upload-row-count">{{ parsedRows.length.toLocaleString() }} rows detected</span>
            </p>
          </div>

          <button v-if="!fileName" class="browse-btn" @click.stop="openFileDialog">
            Browse Files
          </button>
        </div>
      </div>

      <!-- Detected Columns -->
      <transition name="slide-up">
        <div v-if="availableColumns.length" class="main-card mt-card">
          <div class="card-inner-header">
            <div class="section-label">
              <span class="step-number">02</span>
              <h2 class="section-title">Detected Columns</h2>
            </div>
            <span class="col-count">{{ availableColumns.length }} columns</span>
          </div>

          <div class="columns-grid">
            <span v-for="col in availableColumns" :key="col" class="col-badge">
              <span class="col-dot"></span>{{ col }}
            </span>
          </div>
        </div>
      </transition>

      <!-- Preview Table -->
      <transition name="slide-up">
        <div v-if="parsedRows.length" class="main-card mt-card">
          <div class="card-inner-header">
            <div class="section-label">
              <span class="step-number">03</span>
              <h2 class="section-title">Preview Records</h2>
            </div>
            <span class="preview-meta">First 10 of {{ parsedRows.length.toLocaleString() }} rows</span>
          </div>

          <div class="table-scroll">
            <table class="preview-table">
              <thead>
                <tr>
                  <th class="row-num-col">#</th>
                  <th v-for="col in availableColumns" :key="col">{{ col }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in parsedRows.slice(0, 10)" :key="index">
                  <td class="row-num-cell">{{ index + 1 }}</td>
                  <td v-for="col in availableColumns" :key="col">{{ row[col] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </transition>

      <!-- Action Buttons -->
      <transition name="slide-up">
        <div v-if="parsedRows.length" class="action-bar">
          <div class="action-info">
            <span class="ready-badge">
              <span class="ready-dot"></span>
              {{ parsedRows.length.toLocaleString() }} records ready to import
            </span>
          </div>
          <div class="action-btns">
            <button @click="clearData" class="cancel-btn">
              Cancel
            </button>
            <button @click="importStudents" class="import-btn" :class="{ 'btn-loading': isImporting }">
              <span v-if="!isImporting" class="btn-content">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                Import Records
              </span>
              <span v-else class="btn-content">
                <span class="spinner"></span>
                Importing…
              </span>
            </button>
          </div>
        </div>
      </transition>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as XLSX from "xlsx"

type ExcelRow = Record<string, string | number>

const fileInput = ref<HTMLInputElement | null>(null)
const fileName = ref("")
const availableColumns = ref<string[]>([])
const parsedRows = ref<ExcelRow[]>([])
const isDragging = ref(false)
const isImporting = ref(false)

function openFileDialog() {
  fileInput.value?.click()
}

function parseFile(file: File) {
  fileName.value = file.name
  const reader = new FileReader()
  reader.onload = (e) => {
    const data = new Uint8Array(e.target?.result as ArrayBuffer)
    const workbook = XLSX.read(data, { type: "array" })
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const rows = XLSX.utils.sheet_to_json<ExcelRow>(sheet)
    parsedRows.value = rows
    availableColumns.value = Object.keys(rows[0] || {})
  }
  reader.readAsArrayBuffer(file)
}

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files?.[0]) parseFile(target.files[0])
}

function handleDrop(event: DragEvent) {
  isDragging.value = false
  const file = event.dataTransfer?.files[0]
  if (file) parseFile(file)
}

function clearData() {
  parsedRows.value = []
  availableColumns.value = []
  fileName.value = ""
  if (fileInput.value) fileInput.value.value = ""
}

async function importStudents() {
  isImporting.value = true
  const students = parsedRows.value.map(row => ({
    studentNumber: row["Student Number"],
    firstName: row["First Name"],
    lastName: row["Last Name"],
    college: row["College"],
    department: row["Department"],
    program: row["Program"],
    yearLevel: row["Year Level"],
    isActive: true,
    updatedAt: new Date()
  }))
  console.log("Students ready for upload:", students)
  await new Promise(r => setTimeout(r, 1200))
  isImporting.value = false
  alert("Records processed. Connect this to Firebase next.")
}
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
.mt-card { margin-top: 20px; }

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

/* File pill */
.file-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(34,139,34,0.12);
  border: 1px solid rgba(92,186,110,0.3);
  border-radius: 100px;
  padding: 5px 12px 5px 10px;
}
.file-pill-icon { font-size: 13px; }
.file-pill-name {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  color: #5cba6e;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.file-pill-remove {
  font-size: 11px;
  color: rgba(92,186,110,0.5);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 2px;
  line-height: 1;
  transition: color 0.15s;
}
.file-pill-remove:hover { color: #5cba6e; }

/* ── Upload Zone ──────────────────────────────── */
.hidden-input { display: none; }

.upload-zone {
  border: 2px dashed rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.25s;
  background: rgba(255,255,255,0.02);
  text-align: center;
}
.upload-zone:hover {
  border-color: rgba(212,175,55,0.35);
  background: rgba(212,175,55,0.03);
}
.upload-zone--active {
  border-color: rgba(212,175,55,0.6);
  background: rgba(212,175,55,0.06);
  transform: scale(1.01);
}
.upload-zone--loaded {
  border-color: rgba(92,186,110,0.35);
  background: rgba(92,186,110,0.04);
  cursor: default;
  padding: 32px 24px;
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
  transition: all 0.3s;
}
.upload-zone:hover .upload-icon-ring,
.upload-zone--active .upload-icon-ring {
  border-color: rgba(212,175,55,0.5);
  background: rgba(212,175,55,0.12);
  color: #d4af37;
}
.ring--loaded {
  border-color: rgba(92,186,110,0.4);
  background: rgba(92,186,110,0.1);
  color: #5cba6e;
}

.upload-main-text {
  font-size: 15px;
  color: rgba(240,237,228,0.55);
  margin: 0;
}
.upload-main-text strong { color: #f0ede4; }
.upload-success-text strong { color: #5cba6e; }

.upload-sub-text {
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  color: rgba(240,237,228,0.25);
  margin: 0;
  letter-spacing: 0.03em;
}
.upload-row-count {
  color: rgba(92,186,110,0.7);
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

/* ── Columns ──────────────────────────────────── */
.col-count {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  color: rgba(212,175,55,0.6);
  background: rgba(212,175,55,0.08);
  border: 1px solid rgba(212,175,55,0.15);
  padding: 4px 10px;
  border-radius: 100px;
  letter-spacing: 0.05em;
}

.columns-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.col-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  color: rgba(240,237,228,0.65);
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  padding: 6px 12px;
  border-radius: 8px;
  letter-spacing: 0.03em;
}
.col-dot {
  width: 5px; height: 5px;
  background: #d4af37;
  border-radius: 50%;
  opacity: 0.6;
  flex-shrink: 0;
}

/* ── Table ────────────────────────────────────── */
.preview-meta {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  color: rgba(240,237,228,0.3);
  letter-spacing: 0.04em;
}

.table-scroll {
  overflow-x: auto;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.06);
}

.preview-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.preview-table th {
  padding: 11px 14px;
  text-align: left;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  color: rgba(212,175,55,0.65);
  letter-spacing: 0.07em;
  text-transform: uppercase;
  background: rgba(212,175,55,0.04);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  white-space: nowrap;
}
.row-num-col {
  width: 40px;
  color: rgba(255,255,255,0.2) !important;
  text-align: center;
}
.preview-table td {
  padding: 10px 14px;
  color: rgba(240,237,228,0.6);
  border-bottom: 1px solid rgba(255,255,255,0.04);
  white-space: nowrap;
}
.row-num-cell {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  color: rgba(255,255,255,0.2) !important;
  text-align: center;
}
.preview-table tbody tr:last-child td { border-bottom: none; }
.preview-table tbody tr:hover td {
  background: rgba(212,175,55,0.04);
  color: rgba(240,237,228,0.9);
}

/* ── Action Bar ───────────────────────────────── */
.action-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  padding: 20px 28px;
  background: rgba(14,32,18,0.88);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}

.ready-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #5cba6e;
  font-family: 'DM Mono', monospace;
  letter-spacing: 0.04em;
}
.ready-dot {
  width: 7px; height: 7px;
  background: #5cba6e;
  border-radius: 50%;
  animation: pulse-dot 1.5s ease-in-out infinite;
}

.action-btns { display: flex; gap: 12px; }

.cancel-btn {
  padding: 12px 22px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  color: rgba(240,237,228,0.45);
  font-family: 'Syne', sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.cancel-btn:hover {
  border-color: rgba(255,255,255,0.2);
  color: rgba(240,237,228,0.75);
}

.import-btn {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 12px 26px;
  background: linear-gradient(135deg, #c9a227 0%, #e8c547 100%);
  border: none;
  border-radius: 12px;
  color: #0a1a0f;
  font-family: 'Syne', sans-serif;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.03em;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 20px rgba(212,175,55,0.28), 0 1px 0 rgba(255,255,255,0.2) inset;
}
.import-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(212,175,55,0.42), 0 1px 0 rgba(255,255,255,0.2) inset;
}
.import-btn:active { transform: translateY(0); }
.btn-loading {
  opacity: 0.8;
  pointer-events: none;
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spinner {
  width: 14px; height: 14px;
  border: 2px solid rgba(10,26,15,0.3);
  border-top-color: #0a1a0f;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ── Transitions ──────────────────────────────── */
.slide-up-enter-active {
  transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

/* ── Responsive ───────────────────────────────── */
@media (max-width: 600px) {
  .page-title { font-size: 30px; }
  .main-card { padding: 24px 18px; }
  .action-bar { flex-direction: column; align-items: flex-start; gap: 16px; }
  .action-btns { width: 100%; }
  .import-btn, .cancel-btn { flex: 1; justify-content: center; }
  .card-inner-header { flex-direction: column; align-items: flex-start; gap: 12px; }
}
</style>