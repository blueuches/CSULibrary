<template>
  <div class="page-shell">
    <Sidebar />

    <div class="page-scroll">
      <AdminPageHeader :breadcrumbs="['Admin', 'Attendance']" title="Attendance Settings">
        <template #subtitle>Configure school info, security, and system preferences</template>
      </AdminPageHeader>

      <!-- ERROR BANNER -->
      <div v-if="errorMsg" class="error-banner">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        {{ errorMsg }}
        <button @click="errorMsg = null" class="banner-close">✕</button>
      </div>

      <!-- SUCCESS BANNER -->
      <div v-if="successMsg" class="success-banner">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        {{ successMsg }}
        <button @click="successMsg = null" class="banner-close">✕</button>
      </div>

      <!-- FORM -->
      <div class="settings-wrapper" v-if="!loading">
        <div class="settings-card" :class="{ 'settings-card--editing': editing }">
          <!-- Card Header -->
          <div class="card-eyebrow-row">
            <div class="card-eyebrow">School / Library Information</div>
            <div class="card-actions">
              <button
                v-if="!editing"
                class="action-btn action-btn--edit"
                @click="editSection"
                title="Edit"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Edit
              </button>
              <button
                class="action-btn action-btn--delete"
                @click="deleteTarget = true"
                title="Delete"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
                Delete
              </button>
            </div>
          </div>

          <!-- Fields -->
          <div class="field-stack">
            <!-- Row 1: School Name + Building Title -->
            <div class="field-row field-row--2">
              <div class="field-col">
                <label class="field-label">School Name <span class="field-required">*</span></label>
                <div class="field-input-wrap">
                  <svg
                    class="field-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-5h6v5" />
                  </svg>
                  <input
                    class="field-input w-full"
                    type="text"
                    v-model="settings.school_name"
                    :disabled="!editing"
                    placeholder="e.g. Caraga State University"
                  />
                </div>
              </div>
              <div class="field-col">
                <label class="field-label"
                  >Building Title <span class="field-required">*</span></label
                >
                <div class="field-input-wrap">
                  <svg
                    class="field-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                  <input
                    class="field-input w-full"
                    type="text"
                    v-model="settings.building_title"
                    :disabled="!editing"
                    placeholder="e.g. University Library"
                  />
                </div>
              </div>
            </div>

            <!-- Row 2: System Name + Max Capacity -->
            <div class="field-row field-row--2">
              <div class="field-col">
                <label class="field-label">System Name <span class="field-required">*</span></label>
                <div class="field-input-wrap">
                  <svg
                    class="field-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                  </svg>
                  <input
                    class="field-input w-full"
                    type="text"
                    v-model="settings.system_name"
                    :disabled="!editing"
                    placeholder="e.g. Library Attendance System"
                  />
                </div>
              </div>
              <div class="field-col">
                <label class="field-label">Max Capacity</label>
                <div class="field-input-wrap">
                  <svg
                    class="field-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <input
                    class="field-input field-input--sm"
                    type="number"
                    v-model="settings.max_capacity"
                    :disabled="!editing"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <!-- Row 3: Opening + Closing Time -->
            <div class="field-row field-row--2">
              <div class="field-col">
                <label class="field-label">Opening Time</label>
                <div class="field-input-wrap">
                  <svg
                    class="field-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <input
                    class="field-input w-full"
                    type="time"
                    v-model="settings.opening_time"
                    :disabled="!editing"
                  />
                </div>
              </div>
              <div class="field-col">
                <label class="field-label">Closing Time</label>
                <div class="field-input-wrap">
                  <svg
                    class="field-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <input
                    class="field-input w-full"
                    type="time"
                    v-model="settings.closing_time"
                    :disabled="!editing"
                  />
                </div>
              </div>
            </div>

            <!-- App Background -->
            <div class="field-col">
              <label class="field-label">App Background</label>
              <div class="bg-upload-area" :class="{ 'bg-upload-area--active': editing }">
                <div v-if="settings.bg_path" class="bg-preview">
                  <img :src="settings.bg_path" alt="Background preview" class="bg-thumb" />
                  <div class="bg-preview-info">
                    <span class="bg-filename">Background set</span>
                    <span class="bg-url">{{ settings.bg_path }}</span>
                  </div>
                  <button
                    v-if="editing"
                    class="bg-change-btn"
                    :disabled="uploading"
                    @click="bgFileInput?.click()"
                  >
                    <span v-if="uploading" class="btn-spinner"></span>
                    {{ uploading ? 'Uploading...' : 'Change' }}
                  </button>
                </div>
                <button
                  v-else
                  class="bg-empty-btn"
                  :disabled="!editing || uploading"
                  @click="bgFileInput?.click()"
                >
                  <span v-if="uploading" class="btn-spinner btn-spinner--gold"></span>
                  <svg
                    v-else
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    style="width: 18px; height: 18px"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  {{
                    uploading
                      ? 'Uploading...'
                      : editing
                        ? 'Click to upload background'
                        : 'No background selected'
                  }}
                </button>
                <input
                  ref="bgFileInput"
                  type="file"
                  accept="image/*"
                  style="display: none"
                  @change="onBgFileChange"
                />
              </div>
            </div>

            <!-- Meta: last saved + edited by -->
            <div class="meta-row">
              <div v-if="lastUpdated" class="meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Last saved: {{ lastUpdated }}
              </div>
              <div v-if="editedByEmail" class="meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                By: {{ editedByEmail }}
              </div>
            </div>
          </div>

          <!-- Inline save/cancel -->
          <div v-if="editing" class="inline-actions">
            <div class="inline-hint"></div>
            <div class="inline-btns">
              <button class="inline-cancel" @click="cancelEdit">Cancel</button>
              <button class="inline-save" @click="saveSection" :disabled="saving">
                <span v-if="saving" class="btn-spinner btn-spinner--white"></span>
                <svg
                  v-else
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  style="width: 11px; height: 11px"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {{ saving ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- DELETE CONFIRMATION MODAL -->
    <Teleport to="body">
      <div v-if="deleteTarget" class="modal-overlay" @click.self="deleteTarget = false">
        <div class="modal-box">
          <div class="modal-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </div>
          <h3 class="modal-title">Delete Settings?</h3>
          <p class="modal-desc">
            This will permanently delete the
            <strong>School / Library Information</strong> settings from the database. This action
            cannot be undone.
          </p>
          <div class="modal-actions">
            <button class="modal-cancel" @click="deleteTarget = false">Cancel</button>
            <button class="modal-confirm" @click="deleteSection" :disabled="deleting">
              <span v-if="deleting" class="btn-spinner btn-spinner--white"></span>
              {{ deleting ? 'Deleting...' : 'Yes, Delete' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { createClient } from '@supabase/supabase-js'
import Sidebar from '@/components/Sidebar.vue'

// ── Supabase client ───────────────────────────────────────────────
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)

// ── Types ─────────────────────────────────────────────────────────
interface Settings {
  school_name: string
  building_title: string
  system_name: string
  bg_path: string
  max_capacity: number
  opening_time: string
  closing_time: string
}

// ── State ─────────────────────────────────────────────────────────
const loading = ref(false)
const saving = ref(false)
const deleting = ref(false)
const uploading = ref(false)
const editing = ref(false)
const deleteTarget = ref(false)
const errorMsg = ref<string | null>(null)
const successMsg = ref<string | null>(null)
const bgFileInput = ref<HTMLInputElement | null>(null)

const rowId = ref<string | null>(null)
const editedAt = ref<string | null>(null)
const editedByEmail = ref<string | null>(null)

const defaultSettings: Settings = {
  school_name: '',
  building_title: '',
  system_name: '',
  bg_path: '',
  max_capacity: 0,
  opening_time: '',
  closing_time: '',
}

const settings = reactive<Settings>({ ...defaultSettings })
const snapshot = reactive<Settings>({ ...defaultSettings })

// ── Computed ──────────────────────────────────────────────────────
const lastUpdated = computed(() => {
  if (!editedAt.value) return null
  return new Date(editedAt.value).toLocaleString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
})

// ── Load ──────────────────────────────────────────────────────────
onMounted(loadSettings)

async function loadSettings() {
  loading.value = true
  errorMsg.value = null

  try {
    const { data, error } = await supabase
      .from('attendance_page')
      .select('id, element_form, edited_at, edited_by')
      .eq('element_name', 'school_info')
      .maybeSingle()

    if (error) throw error

    if (data) {
      rowId.value = data.id
      editedAt.value = data.edited_at

      // Fetch editor email from auth.users via profiles table
      if (data.edited_by) {
        const { data: userData } = await supabase
          .from('profiles') // ← change to your actual users/profiles table name
          .select('email')
          .eq('id', data.edited_by)
          .maybeSingle()
        editedByEmail.value = userData?.email ?? null
      }

      const parsed: Partial<Settings> = JSON.parse(data.element_form || '{}')
      Object.assign(settings, { ...defaultSettings, ...parsed })
    }
  } catch (err: any) {
    errorMsg.value = `Failed to load settings: ${err.message}`
  } finally {
    loading.value = false
  }
}

// ── Edit / Cancel ─────────────────────────────────────────────────
function editSection() {
  Object.assign(snapshot, { ...settings })
  editing.value = true
  errorMsg.value = null
}

function cancelEdit() {
  Object.assign(settings, { ...snapshot })
  editing.value = false
  errorMsg.value = null
}

// ── Validation ────────────────────────────────────────────────────
function validateSettings(): string | null {
  if (!settings.school_name.trim()) return 'School Name is required.'
  if (!settings.building_title.trim()) return 'Building Title is required.'
  if (!settings.system_name.trim()) return 'System Name is required.'
  if (settings.max_capacity < 0) return 'Max Capacity cannot be negative.'
  return null
}

// ── Save ──────────────────────────────────────────────────────────
async function saveSection() {
  const validationError = validateSettings()
  if (validationError) {
    errorMsg.value = validationError
    return
  }

  saving.value = true
  errorMsg.value = null

  try {
    // Get current logged-in user → stored in edited_by
    const {
      data: { user },
    } = await supabase.auth.getUser()
    const now = new Date().toISOString()
    const formJson = JSON.stringify({ ...settings })

    if (rowId.value) {
      // UPDATE existing row
      const { error } = await supabase
        .from('attendance_page')
        .update({
          element_form: formJson,
          edited_at: now,
          edited_by: user?.id ?? null,
        })
        .eq('id', rowId.value)

      if (error) throw error
    } else {
      // INSERT new row
      const { data, error } = await supabase
        .from('attendance_page')
        .insert({
          element_name: 'school_info',
          element_form: formJson,
          edited_at: now,
          edited_by: user?.id ?? null,
        })
        .select('id')
        .single()

      if (error) throw error
      rowId.value = data.id
    }

    editedAt.value = now
    editedByEmail.value = user?.email ?? null
    editing.value = false
    showSuccess('Settings saved successfully!')
  } catch (err: any) {
    errorMsg.value = `Failed to save: ${err.message}`
  } finally {
    saving.value = false
  }
}

// ── Delete ────────────────────────────────────────────────────────
async function deleteSection() {
  deleting.value = true
  errorMsg.value = null

  try {
    if (rowId.value) {
      const { error } = await supabase.from('attendance_page').delete().eq('id', rowId.value)

      if (error) throw error

      rowId.value = null
      editedAt.value = null
      editedByEmail.value = null
    }

    Object.assign(settings, { ...defaultSettings })
    deleteTarget.value = false
    editing.value = false
    showSuccess('Settings deleted successfully.')
  } catch (err: any) {
    errorMsg.value = `Failed to delete: ${err.message}`
  } finally {
    deleting.value = false
  }
}

// ── Background image upload ───────────────────────────────────────
async function onBgFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  if (file.size > 5 * 1024 * 1024) {
    errorMsg.value = 'Image must be smaller than 5MB.'
    return
  }

  uploading.value = true
  errorMsg.value = null

  try {
    const ext = file.name.split('.').pop()
    const filePath = `backgrounds/bg_${Date.now()}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('app-assets')
      .upload(filePath, file, { upsert: true })

    if (uploadError) throw uploadError

    const { data: urlData } = supabase.storage.from('app-assets').getPublicUrl(filePath)

    settings.bg_path = urlData.publicUrl
    showSuccess('Background uploaded!')
  } catch (err: any) {
    errorMsg.value = `Upload failed: ${err.message}`
  } finally {
    uploading.value = false
    if (bgFileInput.value) bgFileInput.value.value = ''
  }
}

// ── Toast ─────────────────────────────────────────────────────────
function showSuccess(msg: string) {
  successMsg.value = msg
  setTimeout(() => {
    successMsg.value = null
  }, 3500)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;0,700;0,900;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');

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
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}

/* ── Shell ──────────────────────────────────────── */
.page-shell {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: #edefed;
  font-family: 'DM Sans', sans-serif;
}
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

/* ── Header ─────────────────────────────────────── */
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
.hero-word-gold {
  color: #e6a800;
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

/* ── Banners ─────────────────────────────────────── */
.error-banner,
.success-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  margin-bottom: 16px;
  font-size: 0.78rem;
  font-weight: 600;
  animation: slideDown 0.25s ease both;
}
.error-banner {
  background: #fff1f0;
  border: 1.5px solid #ffc9c9;
  color: #c0392b;
}
.success-banner {
  background: #f0fdf4;
  border: 1.5px solid #bbf7d0;
  color: #166534;
}
.error-banner svg,
.success-banner svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}
.banner-close {
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.78rem;
  opacity: 0.5;
  transition: opacity 0.15s;
}
.banner-close:hover {
  opacity: 1;
}

/* ── Loading ─────────────────────────────────────── */
.loading-state {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 40px;
  color: rgba(6, 32, 9, 0.4);
  font-size: 0.82rem;
}
.loading-spinner {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #e2e6e0;
  border-top-color: #062009;
  animation: spin 0.7s linear infinite;
}

/* ── Settings wrapper ────────────────────────────── */
.settings-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ── Card ────────────────────────────────────────── */
.settings-card {
  background: #fff;
  border: 1px solid rgba(6, 32, 9, 0.07);
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.04),
    0 8px 24px rgba(0, 0, 0, 0.05);
  animation: cardIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
  transition:
    box-shadow 0.2s,
    border-color 0.2s;
}
.settings-card:hover {
  box-shadow:
    0 2px 6px rgba(0, 0, 0, 0.05),
    0 12px 36px rgba(6, 32, 9, 0.09);
}
.settings-card--editing {
  border-color: rgba(200, 147, 10, 0.35);
}

.card-eyebrow-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: #fdfcf9;
  border-bottom: 1px solid #f5edda;
}
.card-eyebrow {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #c8930a;
}
.eyebrow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #c8930a;
  animation: pulse 2s ease infinite;
}
.card-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0.28rem 0.75rem;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s;
}
.action-btn svg {
  width: 12px;
  height: 12px;
}
.action-btn--edit {
  border: 1.5px solid #e2e6e0;
  background: #f7f8f5;
  color: #062009;
}
.action-btn--edit:hover {
  background: #eaede4;
  border-color: #c5ccbe;
  transform: translateY(-1px);
}
.action-btn--delete {
  border: 1.5px solid #ffc9c9;
  background: #fff5f5;
  color: #c0392b;
}
.action-btn--delete:hover {
  background: #ffe4e4;
  transform: translateY(-1px);
}

/* Fields */
.field-stack {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
}
.field-row {
  display: grid;
  gap: 12px;
}
.field-row--2 {
  grid-template-columns: 1fr 1fr;
}
.field-col {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field-label {
  font-size: 0.69rem;
  font-weight: 600;
  color: rgba(6, 32, 9, 0.4);
  letter-spacing: 0.02em;
}
.field-required {
  color: #c0392b;
  margin-left: 2px;
}
.field-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.field-icon {
  position: absolute;
  left: 10px;
  width: 14px;
  height: 14px;
  color: #b8c0b4;
  pointer-events: none;
}
.field-input {
  padding: 0.42rem 0.65rem 0.42rem 2rem;
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
    box-shadow 0.18s,
    background 0.18s;
}
.field-input::placeholder {
  color: #b8c4b4;
}
.field-input:focus {
  border-color: #c8930a;
  box-shadow: 0 0 0 3px rgba(200, 147, 10, 0.12);
  background: #fff;
}
.field-input:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
.field-input.w-full {
  width: 100%;
  box-sizing: border-box;
}
.field-input--sm {
  width: 100%;
  box-sizing: border-box;
}

/* Meta row */
.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding-top: 8px;
  border-top: 1px dashed #eef0ec;
  margin-top: 4px;
}
.meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.67rem;
  color: #9ba390;
}
.meta-item svg {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
}

/* BG Upload */
.bg-upload-area {
  border: 1.5px dashed #d4d8d0;
  border-radius: 10px;
  background: #f7f8f5;
  overflow: hidden;
  transition:
    border-color 0.18s,
    background 0.18s;
}
.bg-upload-area--active {
  border-color: #c8930a;
  background: #fffdf7;
}
.bg-empty-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: #9ba390;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.75rem;
  transition: color 0.15s;
}
.bg-empty-btn:not(:disabled):hover {
  color: #c8930a;
}
.bg-empty-btn:disabled {
  cursor: not-allowed;
}
.bg-preview {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
}
.bg-thumb {
  width: 54px;
  height: 40px;
  object-fit: cover;
  border-radius: 7px;
  border: 1px solid #e2e6e0;
  flex-shrink: 0;
}
.bg-preview-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.bg-filename {
  font-size: 0.75rem;
  font-weight: 600;
  color: #062009;
}
.bg-url {
  font-size: 0.63rem;
  color: #9ba390;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bg-change-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 0.25rem 0.7rem;
  border-radius: 7px;
  border: 1.5px solid #e2e6e0;
  background: #fff;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  color: #062009;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.15s;
}
.bg-change-btn:hover:not(:disabled) {
  background: #eaede4;
}
.bg-change-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

/* Inline actions */
.inline-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-top: 1px solid #f0f2ec;
  background: #fdfcf9;
  animation: fadeUp 0.2s ease both;
}
.inline-hint {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.67rem;
  color: #b8c4b4;
}
.inline-btns {
  display: flex;
  gap: 8px;
}
.inline-cancel {
  padding: 0.35rem 0.9rem;
  border-radius: 8px;
  border: 1.5px solid #e2e6e0;
  background: transparent;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  color: rgba(6, 32, 9, 0.4);
  cursor: pointer;
  transition: background 0.15s;
}
.inline-cancel:hover {
  background: #f0f2ec;
  color: #062009;
}
.inline-save {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 0.35rem 1rem;
  border-radius: 8px;
  border: none;
  background: #062009;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(6, 32, 9, 0.2);
  transition:
    background 0.15s,
    transform 0.12s;
}
.inline-save:hover:not(:disabled) {
  background: #1b5e20;
  transform: translateY(-1px);
}
.inline-save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Spinners */
.btn-spinner {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(6, 32, 9, 0.2);
  border-top-color: #062009;
  animation: spin 0.65s linear infinite;
  display: inline-block;
  flex-shrink: 0;
}
.btn-spinner--white {
  border-color: rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
}
.btn-spinner--gold {
  border-color: rgba(200, 147, 10, 0.2);
  border-top-color: #c8930a;
}

/* ── Modal ───────────────────────────────────────── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(6, 32, 9, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  backdrop-filter: blur(3px);
  animation: fadeUp 0.2s ease both;
}
.modal-box {
  background: #fff;
  border-radius: 20px;
  padding: 32px 28px;
  max-width: 380px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(6, 32, 9, 0.18);
  animation: cardIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) both;
}
.modal-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: #fff5f5;
  border: 1.5px solid #ffc9c9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c0392b;
  margin-bottom: 16px;
}
.modal-icon svg {
  width: 22px;
  height: 22px;
}
.modal-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #062009;
  margin: 0 0 8px;
}
.modal-desc {
  font-size: 0.8rem;
  color: #6b7280;
  line-height: 1.55;
  margin: 0 0 20px;
}
.modal-desc strong {
  color: #062009;
}
.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
.modal-cancel {
  padding: 0.55rem 1.1rem;
  border-radius: 10px;
  border: 1.5px solid #e2e6e0;
  background: transparent;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  color: rgba(6, 32, 9, 0.45);
  cursor: pointer;
  transition: background 0.15s;
}
.modal-cancel:hover {
  background: #f0f2ec;
}
.modal-confirm {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0.55rem 1.2rem;
  border-radius: 10px;
  border: none;
  background: #c0392b;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(192, 57, 43, 0.25);
  transition:
    background 0.15s,
    transform 0.12s;
}
.modal-confirm:hover:not(:disabled) {
  background: #a93226;
  transform: translateY(-1px);
}
.modal-confirm:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ── Responsive ──────────────────────────────────── */
@media (max-width: 680px) {
  .page-scroll {
    padding: 20px 16px 60px;
  }
  .field-row--2 {
    grid-template-columns: 1fr;
  }
  .inline-actions {
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
  }
  .inline-hint {
    display: none;
  }
  .meta-row {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
