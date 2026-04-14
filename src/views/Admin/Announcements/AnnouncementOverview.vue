<template>
  <div class="flex h-screen w-full overflow-hidden bg-[#f5f3ef]">
    <Sidebar />

    <transition name="toast">
      <div
        v-if="toast.show"
        :class="[
          'fixed left-1/2 top-6 z-[9999] -translate-x-1/2 px-6 py-4 rounded-2xl text-base font-bold text-white shadow-2xl',
          toast.type === 'success' ? 'bg-[#0d2b0f]' : 'bg-red-600',
        ]"
      >
        {{ toast.message }}
      </div>
    </transition>

    <transition name="toast">
      <div
        v-if="confirmToast.show"
        class="fixed left-1/2 top-1/2 z-[10000] w-[24rem] max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#c8d8ca] bg-white p-5 shadow-2xl"
      >
        <p class="text-base font-semibold text-[#0d2b0f]">{{ confirmToast.message }}</p>
        <div class="mt-3 flex justify-end gap-2">
          <button
            @click="confirmDelete"
            class="rounded-lg bg-[#0d2b0f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1b5e20]"
          >
            Yes
          </button>
          <button
            @click="cancelConfirm"
            class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
          >
            No
          </button>
        </div>
      </div>
    </transition>

    <main class="report-root flex-1 overflow-y-auto">
      <!-- HEADER -->
      <header class="report-header intro-header relative z-[60] overflow-visible">
        <div class="header-left">
          <div class="flex items-center justify-between gap-4 flex-wrap">
            <div class="header-breadcrumb !mb-0">
              <span>Admin</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M9 5l7 7-7 7" />
              </svg>
              <span>Announcement Management</span>
            </div>
          </div>
          <h1 class="header-title intro-title">
            Library <span class="text-yellow-500">Announcements</span>
          </h1>
          <p class="header-sub">Manage and review all event, general, and news posts.</p>
        </div>

        <!-- DROPDOWN NEW ANNOUNCEMENT -->
        <div class="header-right relative z-50">
          <div class="flex flex-col items-end gap-3">
            <div class="relative z-50 dropdown-wrapper" ref="dropdownRef">
              <button @click="dropdownOpen = !dropdownOpen" class="action-btn">
                <span class="plus-icon" :class="{ 'plus-icon--open': dropdownOpen }">+</span> New
                Announcement
              </button>
              <transition name="dropdown">
                <div v-if="dropdownOpen" class="dropdown-menu">
                  <RouterLink to="/admin/announcement/general" class="dropdown-item whitespace-nowrap" @click="dropdownOpen = false">
                    New General Announcement
                  </RouterLink>
                  <RouterLink to="/admin/announcement/event" class="dropdown-item whitespace-nowrap" @click="dropdownOpen = false">
                    New Event Announcement
                  </RouterLink>
                  <RouterLink to="/admin/announcement/news" class="dropdown-item whitespace-nowrap" @click="dropdownOpen = false">
                    News
                  </RouterLink>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </header>

      <!-- LOADING SPINNER -->
      <div v-if="isLoading" class="flex justify-center p-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1b5e20]"></div>
      </div>

      <!-- ANNOUNCEMENTS SECTION -->
      <section v-else class="relative z-0 grid grid-cols-1 items-start gap-6 lg:grid-cols-3 p-6">
        <!-- GENERAL ANNOUNCEMENTS -->
        <article class="rounded-2xl border border-[#dfe6dd] bg-white p-6 shadow-sm">
          <div class="mb-5 flex items-center justify-between">
            <h2 class="text-xl font-bold text-[#0d2b0f]">General Announcements</h2>
            <span class="rounded-full bg-[#ebf5ec] px-3 py-1 text-xs font-semibold text-[#1b5e20]">
              {{ generalAnnouncements.length }} posts
            </span>
          </div>

          <div v-if="generalAnnouncements.length === 0" class="empty-state">
            No general updates yet.
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="(announcement, index) in generalAnnouncements"
              :key="announcement.id"
              class="announcement-card group relative rounded-xl border border-[#e7ece7] bg-[#fbfdfb] p-4 hover:shadow-md transition-all"
              :style="{ animationDelay: `${index * 80}ms` }"
            >
              <div class="flex justify-between items-start gap-3">
                <h3 class="text-base font-bold text-[#0d2b0f]">{{ announcement.title }}</h3>
                <button
                  @click="deleteGeneralAnnouncement(announcement.id)"
                  class="text-gray-400 hover:text-red-500 transition-colors"
                  title="Delete General Update"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <img
                v-if="announcement.image_url"
                :src="announcement.image_url"
                class="w-full h-40 object-cover rounded-lg mt-3 mb-3"
              />

              <p class="mt-2 text-sm leading-6 text-[#3f5641]">{{ announcement.content }}</p>

              <div class="mt-3 flex justify-end text-xs font-medium text-[#5b725d]">
                <p><strong>Posted:</strong> {{ formatDate(announcement.created_at) }}</p>
              </div>

              <p class="mt-5 text-[10px] uppercase tracking-wider text-gray-400">ID: {{ announcement.id }}</p>
            </div>
          </div>
        </article>

        <!-- EVENT ANNOUNCEMENTS -->
        <article class="rounded-2xl border border-[#dfe6dd] bg-white p-6 shadow-sm">
          <div class="mb-5 flex items-center justify-between">
            <h2 class="text-xl font-bold text-[#0d2b0f]">Event Announcements</h2>
            <span class="rounded-full bg-[#fff5e5] px-3 py-1 text-xs font-semibold text-[#9a4b00]">
              {{ eventAnnouncements.length }} posts
            </span>
          </div>

          <div v-if="eventAnnouncements.length === 0" class="empty-state">
            No event announcements yet.
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="(event, index) in eventAnnouncements"
              :key="event.id"
              class="announcement-card group relative rounded-xl border border-[#e7ece7] bg-[#fbfdfb] p-4 hover:shadow-md transition-all"
              :style="{ animationDelay: `${index * 80}ms` }"
            >
             <!-- TITLE + EDIT/DELETE BUTTONS -->
              <div class="flex justify-between items-start">
                <h3 class="text-base font-bold text-[#0d2b0f]">{{ event.title }}</h3>
                <div class="flex gap-2">
                  <!-- EDIT BUTTON -->
                  <RouterLink
                    :to="`/admin/announcement/event?id=${event.id}`"
                    class="text-gray-400 hover:text-blue-500 transition-colors"
                    title="Edit Announcement"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </RouterLink>
                  <!-- DELETE BUTTON -->
                  <button @click="deleteAnnouncement(event.id)" class="text-gray-400 hover:text-red-500 transition-colors" title="Delete Announcement">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            <!-- IMAGE -->
              <img
                v-if="event.images"
                :src="event.images"
                class="w-full h-40 object-cover rounded-lg mt-3 mb-3"
              />

              <!-- DESCRIPTION -->
              <p class="mt-2 text-sm leading-6 text-[#3f5641]">{{ event.description }}</p>

              <!-- DETAILS -->
              <div class="mt-3 flex justify-between text-xs font-medium text-[#5b725d]">
                <p><strong>Event Date:</strong> {{ formatDate(event.start_date) }}</p>
                <p><strong>Location:</strong> {{ event.location }}</p>
              </div>

              <!-- ID -->
              <p class="mt-5 text-[10px] uppercase tracking-wider text-gray-400">ID: {{ event.id }}</p>
            </div>
          </div>
        </article>

        <!-- NEWS -->
        <article class="rounded-2xl border border-[#dfe6dd] bg-white p-6 shadow-sm">
          <div class="mb-5 flex items-center justify-between">
            <h2 class="text-xl font-bold text-[#0d2b0f]">News</h2>
            <span class="rounded-full bg-[#ebf5ec] px-3 py-1 text-xs font-semibold text-[#1b5e20]">
              {{ newsAnnouncements.length }} posts
            </span>
          </div>

          <div v-if="newsAnnouncements.length === 0" class="empty-state">
            No news yet.
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="(announcement, index) in newsAnnouncements"
              :key="announcement.id"
              class="announcement-card group relative rounded-xl border border-[#e7ece7] bg-[#fbfdfb] p-4 hover:shadow-md transition-all"
              :style="{ animationDelay: `${index * 80}ms` }"
            >
              <div class="flex justify-between items-start gap-3">
                <div>
                  <span
                    class="inline-flex mb-2 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase"
                    :style="getBadgeColor(extractNewsCategory(announcement.title).category)"
                  >
                    {{ getNewsTypeDisplay(extractNewsCategory(announcement.title).category) }}
                  </span>
                  <h3 class="text-base font-bold text-[#0d2b0f]">{{ extractNewsCategory(announcement.title).cleanTitle }}</h3>
                </div>
                <button
                  @click="deleteNewsAnnouncement(announcement.id)"
                  class="text-gray-400 hover:text-red-500 transition-colors"
                  title="Delete News"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <img
                v-if="announcement.image_url"
                :src="announcement.image_url"
                class="w-full h-40 object-cover rounded-lg mt-3 mb-3"
              />

              <p class="mt-2 text-sm leading-6 text-[#3f5641]">{{ announcement.content }}</p>

              <div class="mt-3 flex justify-end text-xs font-medium text-[#5b725d]">
                <p><strong>Posted:</strong> {{ formatDate(announcement.created_at) }}</p>
              </div>

              <p class="mt-5 text-[10px] uppercase tracking-wider text-gray-400">ID: {{ announcement.id }}</p>
            </div>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import { supabase } from '@/lib/supabase'

interface EventAnnouncement {
  id: number
  title: string
  description: string
  start_date: string
  location: string
  type: string
  images: string
}

interface GeneralAnnouncement {
  id: string
  title: string
  content: string
  type: string
  image_url: string | null
  created_at: string
}

const eventAnnouncements = ref<EventAnnouncement[]>([])
const generalAnnouncements = ref<GeneralAnnouncement[]>([])
const newsAnnouncements = ref<GeneralAnnouncement[]>([])
const isLoading = ref(true)
const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const toast = reactive({
  show: false,
  message: '',
  type: 'success' as 'success' | 'error',
})
const confirmToast = reactive({
  show: false,
  message: '',
})

let toastTimer: ReturnType<typeof setTimeout> | null = null
let pendingDeleteAction: (() => Promise<void>) | null = null

const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  toast.message = message
  toast.type = type
  toast.show = true

  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toast.show = false
  }, 2500)
}

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const maybeMessage = (error as { message?: unknown }).message
    if (typeof maybeMessage === 'string') return maybeMessage
  }
  return 'Unknown error'
}

const extractNewsCategory = (title?: string): { category: string; cleanTitle: string } => {
  if (!title) return { category: 'News', cleanTitle: title || '' }
  
  const match = title.match(/^\[([^\]]+)\]\s*(.*)$/)
  if (match) {
    const cat = match[1].trim()
    return {
      category: cat,
      cleanTitle: match[2]
    }
  }
  return { category: 'News', cleanTitle: title }
}

const getBadgeColor = (category?: string) => {
  const normalizedType = category?.trim().toUpperCase() || 'NEWS'

  if (normalizedType === 'NBWC') {
    return {
      backgroundColor: '#dbeafe',
      color: '#1e40af',
    }
  }

  if (normalizedType === 'BSP') {
    return {
      backgroundColor: '#bbf7d0',
      color: '#14532d',
    }
  }

  if (normalizedType === 'STARBOOKS') {
    return {
      backgroundColor: '#fef3c7',
      color: '#92400e',
    }
  }

  return {
    backgroundColor: '#ebf5ec',
    color: '#1b5e20',
  }
}

const getNewsTypeDisplay = (category?: string): string => {
  if (!category) return 'News'
  return category
}

const requestDelete = (message: string, action: () => Promise<void>) => {
  pendingDeleteAction = action
  confirmToast.message = message
  confirmToast.show = true
}

const cancelConfirm = () => {
  pendingDeleteAction = null
  confirmToast.show = false
}

const confirmDelete = async () => {
  if (!pendingDeleteAction) {
    confirmToast.show = false
    return
  }

  const action = pendingDeleteAction
  pendingDeleteAction = null
  confirmToast.show = false
  await action()
}

// --- FETCH ANNOUNCEMENTS ---
const fetchAnnouncements = async () => {
  try {
    isLoading.value = true
    const [eventsResult, generalResult, newsResult] = await Promise.all([
      supabase
        .from('events')
        .select('*')
        .eq('type', 'announcement')
        .order('created_at', { ascending: false }),
      supabase
        .from('announcements')
        .select('id, title, content, type, image_url, created_at')
        .eq('type', 'general')
        .order('created_at', { ascending: false }),
      supabase
        .from('announcements')
        .select('id, title, content, type, image_url, created_at')
        .eq('type', 'news')
        .order('created_at', { ascending: false })
    ])

    if (eventsResult.error) throw eventsResult.error
    if (generalResult.error) throw generalResult.error
    if (newsResult.error) throw newsResult.error

    eventAnnouncements.value = eventsResult.data || []
    generalAnnouncements.value = generalResult.data || []
    newsAnnouncements.value = newsResult.data || []
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    isLoading.value = false
  }
}

// --- DELETE ANNOUNCEMENT ---
const deleteAnnouncement = async (id: number) => {
  requestDelete('Are you sure you want to delete this announcement?', async () => {
    try {
      const { error } = await supabase.from('events').delete().eq('id', id)
      if (error) throw error

      eventAnnouncements.value = eventAnnouncements.value.filter(item => item.id !== id)
      showToast('Announcement deleted successfully')
    } catch (error) {
      const message = getErrorMessage(error)
      console.error('Error deleting:', error)
      showToast(`Error: ${message}`, 'error')
    }
  })
}

const deleteGeneralAnnouncement = async (id: string) => {
  requestDelete('Are you sure you want to delete this general announcement?', async () => {
    try {
      const { error } = await supabase.from('announcements').delete().eq('id', id)
      if (error) throw error

      generalAnnouncements.value = generalAnnouncements.value.filter(item => item.id !== id)
      showToast('General announcement deleted successfully')
    } catch (error) {
      const message = getErrorMessage(error)
      console.error('Error deleting general update:', error)
      showToast(`Error: ${message}`, 'error')
    }
  })
}

const deleteNewsAnnouncement = async (id: string) => {
  requestDelete('Are you sure you want to delete this news item?', async () => {
    try {
      const { error } = await supabase.from('announcements').delete().eq('id', id)
      if (error) throw error

      newsAnnouncements.value = newsAnnouncements.value.filter(item => item.id !== id)
      showToast('News deleted successfully')
    } catch (error) {
      const message = getErrorMessage(error)
      console.error('Error deleting news:', error)
      showToast(`Error: ${message}`, 'error')
    }
  })
}

// --- FORMAT DATE ---
const formatDate = (dateStr: string) => {
  if (!dateStr) return 'N/A'
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

// --- CLOSE DROPDOWN ON CLICK OUTSIDE ---
function handleClickOutside(e: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  fetchAnnouncements()
  document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<style scoped>
.action-btn {
  border-radius: 0.75rem;
  border: 1px solid #0d2b0f;
  background: #0d2b0f;
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.7rem 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: 0.2s ease;
}

.plus-icon {
  display: inline-block;
  font-size: 1.1rem;
  line-height: 1;
  transition: transform 0.25s ease;
}

.plus-icon--open {
  transform: rotate(45deg);
}

.empty-state {
  border: 1px dashed #c7d5c8;
  border-radius: 0.75rem;
  background: #f8fbf8;
  color: #5b725d;
  font-size: 0.9rem;
  padding: 1rem;
  text-align: center;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 0.4rem;
  z-index: 9999;
  min-width: 14rem;
  width: max-content;
  max-width: calc(100vw - 2rem);
  background: #ffffff;
  border: 1px solid #c8d8ca;
  border-radius: 0.75rem;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
  padding: 0.25rem 0;
}

.dropdown-wrapper {
  position: relative;
  z-index: 50;
}

.dropdown-item {
  display: block;
  padding: 0.65rem 1rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: #0d2b0f;
  text-decoration: none;
  white-space: nowrap;
}

.dropdown-item:hover {
  background: #ebf5ec;
  color: #1b5e20;
}

.announcement-card {
  animation: cardFadeIn 0.35s ease both;
}

@keyframes cardFadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.2s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>