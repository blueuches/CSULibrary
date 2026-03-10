<template>
  <div
    class="w-full min-h-screen font-['Poppins'] bg-[#f7f5f0] pb-20 pt-[40px] relative overflow-hidden"
  >
    <!-- Decorative background -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#1b5e20]/5 blur-[120px] translate-x-1/3 -translate-y-1/3"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full bg-[#2e7d32]/4 blur-[100px] -translate-x-1/4 translate-y-1/4"
      ></div>
      <svg class="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
        <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1b5e20" stroke-width="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <div class="w-full px-4 sm:px-8 lg:px-12 relative z-10">
      <!-- Page Header -->
      <div class="page-header mb-10 text-center">
        <div class="flex mt-8 items-center justify-center gap-3">
          <div class="w-10 h-[2px] bg-[#f9a825]"></div>
          <span class="text-[10px] font-extrabold tracking-[0.32em] text-[#1a2e1a] uppercase"
            >Library Services Management</span
          >
          <div class="w-10 h-[2px] bg-[#f9a825]"></div>
        </div>
        <h1
          class="manage-heading text-[#1a2e1a] uppercase mb-2"
          style="font-family: 'Poppins', sans-serif; letter-spacing: -0.02em"
        >
          Manage Records
        </h1>
        <p class="text-[13px] text-[#888] leading-relaxed max-w-xl mx-auto font-normal tracking-wide">
          Update links, descriptions, and visibility for each digital record card shown on the Records page.
        </p>
      </div>

      <!-- Toast Notification -->
      <transition name="toast">
        <div
          v-if="toast.show"
          :class="[
            'fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-white text-[13px] font-semibold font-[\'Poppins\'] transition-all',
            toast.type === 'success' ? 'bg-[#1b5e20]' : 'bg-red-600'
          ]"
        >
          <CheckCircle v-if="toast.type === 'success'" class="w-4 h-4" />
          <XCircle v-else class="w-4 h-4" />
          {{ toast.message }}
        </div>
      </transition>

      <!-- Records CRUD Table/Cards -->
      <div class="grid grid-cols-1 gap-5">
        <div
          v-for="(record, index) in records"
          :key="record.id"
          class="manage-card bg-white rounded-xl border border-[#1b5e20]/10 shadow-sm overflow-hidden"
          :style="`animation-delay: ${0.1 + index * 0.08}s`"
        >
          <!-- Card Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-[#e8f5e9] bg-gradient-to-r from-[#f1f8e9] to-white">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg bg-[#1b5e20]/10 border border-[#1b5e20]/15">
                <component :is="record.icon" class="w-5 h-5 text-[#1b5e20]" />
              </div>
              <div>
                <h3 class="text-[13px] font-extrabold tracking-widest uppercase text-[#1b5e20]">
                  {{ record.title }}
                </h3>
                <span class="text-[11px] text-[#aaa] font-normal">Card #{{ index + 1 }} · Records Page</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <!-- Visibility toggle -->
              <button
                @click="toggleVisibility(record)"
                :title="record.visible ? 'Hide card' : 'Show card'"
                :class="[
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide transition-all duration-200 border',
                  record.visible
                    ? 'bg-[#e8f5e9] text-[#1b5e20] border-[#1b5e20]/20 hover:bg-[#c8e6c9]'
                    : 'bg-[#fafafa] text-[#aaa] border-[#ddd] hover:bg-[#f0f0f0]'
                ]"
              >
                <Eye v-if="record.visible" class="w-3.5 h-3.5" />
                <EyeOff v-else class="w-3.5 h-3.5" />
                {{ record.visible ? 'Visible' : 'Hidden' }}
              </button>
              <!-- Edit toggle -->
              <button
                @click="toggleEdit(record)"
                :class="[
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide transition-all duration-200 border',
                  record.editing
                    ? 'bg-[#fff3e0] text-[#e65100] border-[#f9a825]/40'
                    : 'bg-white text-[#555] border-[#ddd] hover:border-[#1b5e20]/30 hover:text-[#1b5e20]'
                ]"
              >
                <Pencil class="w-3.5 h-3.5" />
                {{ record.editing ? 'Editing...' : 'Edit' }}
              </button>
            </div>
          </div>

          <!-- Card Body: View mode -->
          <div v-if="!record.editing" class="px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p class="text-[10px] font-bold tracking-widest text-[#1b5e20]/60 uppercase mb-1">Button Label</p>
              <p class="text-[13px] text-[#333] font-medium">{{ record.btnLabel }}</p>
            </div>
            <div class="md:col-span-2">
              <p class="text-[10px] font-bold tracking-widest text-[#1b5e20]/60 uppercase mb-1">
                {{ record.linkType === 'route' ? 'Router Route Name' : 'Link / URL' }}
              </p>
              <p class="text-[13px] text-[#333] font-medium break-all">
                <span v-if="record.linkType === 'route'" class="text-[#1b5e20]">→ route: {{ record.link }}</span>
                <a v-else :href="record.link" target="_blank" class="text-[#1b5e20] underline underline-offset-2 hover:text-[#2e7d32]">
                  {{ record.link || '(no link set)' }}
                </a>
              </p>
            </div>
            <div class="md:col-span-3">
              <p class="text-[10px] font-bold tracking-widest text-[#1b5e20]/60 uppercase mb-1">Description</p>
              <p class="text-[13px] text-[#555] leading-relaxed font-light">{{ record.description }}</p>
            </div>
          </div>

          <!-- Card Body: Edit mode -->
          <div v-else class="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            <!-- Title -->
            <div>
              <label class="block text-[10px] font-bold tracking-widest text-[#1b5e20]/70 uppercase mb-1.5">Card Title</label>
              <input
                v-model="record.draft.title"
                type="text"
                class="w-full px-3.5 py-2.5 rounded-lg border border-[#1b5e20]/20 bg-[#f9fdf9] text-[13px] text-[#333] font-['Poppins'] focus:outline-none focus:ring-2 focus:ring-[#1b5e20]/30 focus:border-[#1b5e20]/40 transition"
                placeholder="e.g. CD-ROM"
              />
            </div>

            <!-- Button Label -->
            <div>
              <label class="block text-[10px] font-bold tracking-widest text-[#1b5e20]/70 uppercase mb-1.5">Button Label</label>
              <input
                v-model="record.draft.btnLabel"
                type="text"
                class="w-full px-3.5 py-2.5 rounded-lg border border-[#1b5e20]/20 bg-[#f9fdf9] text-[13px] text-[#333] font-['Poppins'] focus:outline-none focus:ring-2 focus:ring-[#1b5e20]/30 focus:border-[#1b5e20]/40 transition"
                placeholder="e.g. Download CD-ROM"
              />
            </div>

            <!-- Link Type -->
            <div>
              <label class="block text-[10px] font-bold tracking-widest text-[#1b5e20]/70 uppercase mb-1.5">Link Type</label>
              <div class="flex gap-2">
                <button
                  @click="record.draft.linkType = 'url'"
                  :class="[
                    'flex-1 py-2 rounded-lg text-[12px] font-semibold border transition-all',
                    record.draft.linkType === 'url'
                      ? 'bg-[#1b5e20] text-white border-[#1b5e20]'
                      : 'bg-white text-[#888] border-[#ddd] hover:border-[#1b5e20]/30'
                  ]"
                >
                  External URL
                </button>
                <button
                  @click="record.draft.linkType = 'route'"
                  :class="[
                    'flex-1 py-2 rounded-lg text-[12px] font-semibold border transition-all',
                    record.draft.linkType === 'route'
                      ? 'bg-[#1b5e20] text-white border-[#1b5e20]'
                      : 'bg-white text-[#888] border-[#ddd] hover:border-[#1b5e20]/30'
                  ]"
                >
                  Router Route
                </button>
              </div>
            </div>

            <!-- Link Value -->
            <div>
              <label class="block text-[10px] font-bold tracking-widest text-[#1b5e20]/70 uppercase mb-1.5">
                {{ record.draft.linkType === 'route' ? 'Route Name' : 'URL / Google Drive Link' }}
              </label>
              <input
                v-model="record.draft.link"
                type="text"
                class="w-full px-3.5 py-2.5 rounded-lg border border-[#1b5e20]/20 bg-[#f9fdf9] text-[13px] text-[#333] font-['Poppins'] focus:outline-none focus:ring-2 focus:ring-[#1b5e20]/30 focus:border-[#1b5e20]/40 transition"
                :placeholder="record.draft.linkType === 'route' ? 'e.g. eresources' : 'https://drive.google.com/...'"
              />
            </div>

            <!-- Description (full width) -->
            <div class="md:col-span-2">
              <label class="block text-[10px] font-bold tracking-widest text-[#1b5e20]/70 uppercase mb-1.5">Description</label>
              <textarea
                v-model="record.draft.description"
                rows="3"
                class="w-full px-3.5 py-2.5 rounded-lg border border-[#1b5e20]/20 bg-[#f9fdf9] text-[13px] text-[#555] font-['Poppins'] font-light leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#1b5e20]/30 focus:border-[#1b5e20]/40 transition resize-none"
                placeholder="Short description shown on the card..."
              ></textarea>
            </div>

            <!-- Action Buttons -->
            <div class="md:col-span-2 flex items-center justify-end gap-3 pt-1">
              <button
                @click="cancelEdit(record)"
                class="px-5 py-2 rounded-lg text-[12px] font-semibold text-[#888] border border-[#ddd] hover:border-[#bbb] hover:text-[#555] transition-all font-['Poppins']"
              >
                Cancel
              </button>
              <button
                @click="saveRecord(record)"
                class="save-btn flex items-center gap-2 px-5 py-2 rounded-lg text-[12px] font-semibold text-white bg-[#1b5e20] hover:bg-[#2e7d32] transition-all font-['Poppins'] shadow-sm"
              >
                <Save class="w-3.5 h-3.5" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Upload, Disc3, BookOpen, Database, Pencil, Save, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-vue-next'

// ─── Types ───────────────────────────────────────────────────────────────────
interface RecordItem {
  id: string
  title: string
  description: string
  btnLabel: string
  link: string
  linkType: 'url' | 'route'
  icon: unknown
  visible: boolean
  editing: boolean
  draft: {
    title: string
    description: string
    btnLabel: string
    link: string
    linkType: 'url' | 'route'
  }
}

// ─── Toast ───────────────────────────────────────────────────────────────────
const toast = reactive({ show: false, message: '', type: 'success' as 'success' | 'error' })

function showToast(message: string, type: 'success' | 'error' = 'success') {
  toast.message = message
  toast.type = type
  toast.show = true
  setTimeout(() => (toast.show = false), 3000)
}

// ─── Records Data ─────────────────────────────────────────────────────────────
// In production, fetch these from your API / store. For now, seeded from the Records page values.
const records = ref<RecordItem[]>([
  {
    id: 'data-upload',
    title: 'Data Upload',
    description:
      'Access institutional records, research documents, and archived files shared by the library — organized for easy retrieval.',
    btnLabel: 'Go to Data Upload',
    link: 'https://drive.google.com/drive/folders/10VykxJ5P2C_OwVsF0Ym_ef4TUuFdq9I6',
    linkType: 'url',
    icon: Upload,
    visible: true,
    editing: false,
    draft: { title: '', description: '', btnLabel: '', link: '', linkType: 'url' },
  },
  {
    id: 'cdrom',
    title: 'CD-ROM',
    description:
      'Download digitized CD-ROM contents — archived theses, references, and multimedia resources from physical formats, now online.',
    btnLabel: 'Download CD-ROM',
    link: '',
    linkType: 'url',
    icon: Disc3,
    visible: true,
    editing: false,
    draft: { title: '', description: '', btnLabel: '', link: '', linkType: 'url' },
  },
  {
    id: 'ebooks',
    title: 'E-books GDrive',
    description:
      'Explore our collection of digital textbooks, references, and academic materials via Google Drive — available anytime, anywhere.',
    btnLabel: 'Go to E-books',
    link: 'https://drive.google.com/drive/folders/1-2P2uJiziZHND_8gH5-d20uDmAiPs5gt',
    linkType: 'url',
    icon: BookOpen,
    visible: true,
    editing: false,
    draft: { title: '', description: '', btnLabel: '', link: '', linkType: 'url' },
  },
  {
    id: 'eresources',
    title: 'E-Resources',
    description:
      'Access subscribed databases, journals, and research portals provided by the library to support learning, teaching, and inquiry.',
    btnLabel: 'Go to E-Resources',
    link: 'eresources',
    linkType: 'route',
    icon: Database,
    visible: true,
    editing: false,
    draft: { title: '', description: '', btnLabel: '', link: '', linkType: 'route' },
  },
])

// ─── Actions ─────────────────────────────────────────────────────────────────
function toggleEdit(record: RecordItem) {
  if (record.editing) {
    cancelEdit(record)
    return
  }
  // Populate draft with current values
  record.draft = {
    title: record.title,
    description: record.description,
    btnLabel: record.btnLabel,
    link: record.link,
    linkType: record.linkType,
  }
  record.editing = true
}

function cancelEdit(record: RecordItem) {
  record.editing = false
}

function saveRecord(record: RecordItem) {
  if (!record.draft.title.trim()) {
    showToast('Title cannot be empty.', 'error')
    return
  }
  if (!record.draft.btnLabel.trim()) {
    showToast('Button label cannot be empty.', 'error')
    return
  }
  // Apply draft to record
  record.title = record.draft.title
  record.description = record.draft.description
  record.btnLabel = record.draft.btnLabel
  record.link = record.draft.link
  record.linkType = record.draft.linkType
  record.editing = false

  showToast(`"${record.title}" updated successfully!`, 'success')

  // TODO: Persist to backend / Pinia store here
  // e.g. await recordsStore.update(record.id, { ...record })
}

function toggleVisibility(record: RecordItem) {
  record.visible = !record.visible
  showToast(
    `"${record.title}" is now ${record.visible ? 'visible' : 'hidden'} on the Records page.`,
    'success',
  )
  // TODO: Persist visibility to backend
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

.page-header {
  opacity: 0;
  animation: fadeUp 0.5s ease forwards;
}

.manage-card {
  opacity: 0;
  animation: fadeUp 0.45s ease forwards;
}

.manage-heading {
  font-weight: 900;
  font-size: clamp(1.6rem, 5vw, 3.3rem);
  line-height: 1.02;
  margin: 10px 0 8px;
}

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

.save-btn {
  position: relative;
  overflow: hidden;
}
.save-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%);
  transform: translateX(-100%);
  transition: transform 0.45s ease;
}
.save-btn:hover::after {
  transform: translateX(100%);
}

/* Toast animation */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>