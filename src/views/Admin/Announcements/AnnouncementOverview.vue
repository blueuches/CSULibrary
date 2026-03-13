<template>
  <div class="flex h-screen w-full overflow-hidden bg-[#f5f3ef]">
    <Sidebar />

    <main class="report-root flex-1 overflow-y-auto">
      <!-- HEADER -->
      <header class="report-header intro-header">
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
          <h1 class="header-title intro-title">Library <span class="text-yellow-500">Announcements</span></h1>
          <p class="header-sub">Manage and review all general updates and event posts.</p>
        </div>

        <!-- DROPDOWN NEW ANNOUNCEMENT -->
        <div class="header-right">
          <div class="flex flex-col items-end gap-3">
            <div class="relative dropdown-wrapper" ref="dropdownRef">
              <button @click="dropdownOpen = !dropdownOpen" class="action-btn">
                <span class="plus-icon" :class="{ 'plus-icon--open': dropdownOpen }">+</span> New Announcement
              </button>
              <transition name="dropdown">
                <div v-if="dropdownOpen" class="dropdown-menu">
                  <RouterLink to="/admin/announcement/general" class="dropdown-item" @click="dropdownOpen = false">
                    New General Announcement
                  </RouterLink>
                  <RouterLink to="/admin/announcement/event" class="dropdown-item" @click="dropdownOpen = false">
                    New Event Announcement
                  </RouterLink>
                  <RouterLink to="/admin/announcement/news" class="dropdown-item" @click="dropdownOpen = false">
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
      <section v-else class="grid grid-cols-1 gap-6 lg:grid-cols-2 p-6">
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

        <!-- GENERAL UPDATES -->
        <article class="rounded-2xl border border-[#dfe6dd] bg-white p-6 shadow-sm">
          <div class="mb-5 flex items-center justify-between">
            <h2 class="text-xl font-bold text-[#0d2b0f]">General Updates</h2>
            <span class="rounded-full bg-[#ebf5ec] px-3 py-1 text-xs font-semibold text-[#1b5e20]">
              0 posts
            </span>
          </div>
          <div class="empty-state">
            Filter logic for general updates can be added here.
          </div>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
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

const eventAnnouncements = ref<EventAnnouncement[]>([])
const isLoading = ref(true)
const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

// --- FETCH ANNOUNCEMENTS ---
const fetchAnnouncements = async () => {
  try {
    isLoading.value = true
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('type', 'announcement')
      .order('created_at', { ascending: false })

    if (error) throw error
    eventAnnouncements.value = data || []
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    isLoading.value = false
  }
}

// --- DELETE ANNOUNCEMENT ---
const deleteAnnouncement = async (id: number) => {
  if (!confirm('Are you sure you want to delete this?')) return

  try {
    const { error } = await supabase.from('events').delete().eq('id', id)
    if (error) throw error

    eventAnnouncements.value = eventAnnouncements.value.filter(item => item.id !== id)
    alert('Deleted successfully!')
  } catch (error) {
    console.error('Error deleting:', error)
    alert('Failed to delete.')
  }
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
  border: 1px solid #1b5e20;
  background: #1b5e20;
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
  top: calc(100% + 0.4rem);
  z-index: 9999;
  min-width: 14rem;
  background: #ffffff;
  border: 1px solid #c8d8ca;
  border-radius: 0.75rem;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
}

.dropdown-item {
  display: block;
  padding: 0.65rem 1rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: #0d2b0f;
  text-decoration: none;
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
</style>