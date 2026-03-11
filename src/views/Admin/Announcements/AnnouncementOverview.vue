<template>
  <div class="flex h-screen w-full overflow-hidden bg-[#f5f3ef]">
    <Sidebar />

    <main class="report-root flex-1 overflow-y-auto">
      <header class="report-header intro-header">
        <div class="header-left">
          <div class="flex items-center justify-between gap-4 flex-wrap">
            <div class="header-breadcrumb !mb-0">
              <span>Admin</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 5l7 7-7 7" /></svg>
              <span>Announcement Management</span>
            </div>
          </div>
          <h1 class="header-title intro-title">Library <span class="text-yellow-500">Announcements</span></h1>
          <p class="header-sub">Manage and review all general updates and event posts.</p>
        </div>

        <div class="header-right">
          <div class="flex flex-col items-end gap-3">
            <div class="relative dropdown-wrapper" ref="dropdownRef">
              <button @click="dropdownOpen = !dropdownOpen" class="action-btn">
                <span class="plus-icon" :class="{ 'plus-icon--open': dropdownOpen }">+</span> New Announcement
              </button>
              <transition name="dropdown">
                <div v-if="dropdownOpen" class="dropdown-menu">
                  <RouterLink to="/admin/announcement/general" class="dropdown-item" @click="dropdownOpen = false">New General Announcement</RouterLink>
                  <RouterLink to="/admin/announcement/event" class="dropdown-item" @click="dropdownOpen = false">New Event Announcement</RouterLink>
                  <RouterLink to="/admin/announcement/news" class="dropdown-item" @click="dropdownOpen = false">News</RouterLink>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </header>

      <section class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <article class="rounded-2xl border border-[#dfe6dd] bg-white p-6 shadow-sm">
          <div class="mb-5 flex items-center justify-between">
            <h2 class="text-xl font-bold text-[#0d2b0f]">General Announcements</h2>
            <span class="rounded-full bg-[#ebf5ec] px-3 py-1 text-xs font-semibold text-[#1b5e20]">
              {{ generalAnnouncements.length }} posts
            </span>
          </div>

          <div v-if="generalAnnouncements.length === 0" class="empty-state">
            No general announcements yet.
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="(announcement, index) in generalAnnouncements"
              :key="announcement.id"
              class="announcement-card rounded-xl border border-[#e7ece7] bg-[#fbfdfb] p-4"
              :style="{ animationDelay: `${index * 80}ms` }"
            >
              <h3 class="text-base font-bold text-[#0d2b0f]">{{ announcement.title }}</h3>
              <p class="mt-2 text-sm leading-6 text-[#3f5641]">{{ announcement.content }}</p>
              <p class="mt-3 text-xs font-medium text-[#5b725d]">Published: {{ announcement.date }}</p>
            </div>
          </div>
        </article>

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
              class="announcement-card rounded-xl border border-[#e7ece7] bg-[#fbfdfb] p-4"
              :style="{ animationDelay: `${index * 80}ms` }"
            >
              <h3 class="text-base font-bold text-[#0d2b0f]">{{ event.title }}</h3>
              <p class="mt-2 text-sm leading-6 text-[#3f5641]">{{ event.description }}</p>
              <div class="mt-3 grid grid-cols-1 gap-1 text-xs font-medium text-[#5b725d] sm:grid-cols-2">
                <p>Date: {{ event.eventDate }}</p>
                <p>Location: {{ event.location }}</p>
              </div>
              <p class="mt-2 text-xs font-medium text-[#5b725d]">Published: {{ event.createdDate }}</p>
            </div>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import '@/assets/styles/report-analytics.css'

type GeneralAnnouncement = {
  id: number
  title: string
  content: string
  date: string
}

type EventAnnouncement = {
  id: number
  title: string
  description: string
  eventDate: string
  location: string
  createdDate: string
}

const generalAnnouncements = ref<GeneralAnnouncement[]>([
  {
    id: 1,
    title: 'Library Hours Extended',
    content: 'The library will now be open until 9 PM on weekdays to accommodate more students studying for exams.',
    date: 'March 5, 2024',
  },
  {
    id: 2,
    title: 'New Book Collection Available',
    content: 'We have just added 500 new books to our collection. Check them out in the New Acquisitions section!',
    date: 'March 4, 2024',
  },
])

const eventAnnouncements = ref<EventAnnouncement[]>([
  {
    id: 1,
    title: 'Library Orientation Workshop',
    description: 'Learn how to use the library resources effectively. This workshop is open to all students.',
    eventDate: 'March 15, 2024',
    location: 'CSU Library Main Hall',
    createdDate: 'March 5, 2024',
  },
  {
    id: 2,
    title: 'Book Fair 2024',
    description: 'Annual book fair featuring local and international publications. Special discounts available!',
    eventDate: 'March 20, 2024',
    location: 'CSU Campus Grounds',
    createdDate: 'March 1, 2024',
  },
])

const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

function handleClickOutside(e: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    dropdownOpen.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('mousedown', handleClickOutside))
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
  text-decoration: none;
  transition: 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
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

.action-btn:hover {
  background: #0d2b0f;
}

.action-btn--alt {
  background: #f9a825;
  border-color: #f9a825;
  color: #0d2b0f;
}

.action-btn--alt:hover {
  background: #f3b53f;
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

/* Give the header a stacking context above the cards section */
.intro-header {
  position: relative;
  z-index: 100;
}

/* Dropdown */
.dropdown-wrapper {
  position: relative;
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
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0, 0, 0, 0.08);
  transform-origin: top right;
  pointer-events: auto;
}

.dropdown-item {
  display: block;
  padding: 0.65rem 1rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: #0d2b0f;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.15s ease;
}

.dropdown-item:hover {
  background: #ebf5ec;
  color: #1b5e20;
}

/* Dropdown transition */
.dropdown-enter-active {
  animation: dropIn 0.18s ease;
}
.dropdown-leave-active {
  animation: dropIn 0.15s ease reverse;
}
@keyframes dropIn {
  from { opacity: 0; transform: scaleY(0.85) translateY(-6px); }
  to   { opacity: 1; transform: scaleY(1)   translateY(0); }
}

/* Card entrance animation */
.announcement-card {
  animation: cardFadeIn 0.35s ease both;
}

@keyframes cardFadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
