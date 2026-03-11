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
            <div class="date-badge">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {{ currentDate }}
            </div>
            <div class="flex gap-3">
            <RouterLink to="/admin/announcement/general" class="action-btn">
              New General Announcement
            </RouterLink>
            <RouterLink to="/admin/announcement/event" class="action-btn action-btn--alt">
              New Event Announcement
            </RouterLink>
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
              v-for="announcement in generalAnnouncements"
              :key="announcement.id"
              class="rounded-xl border border-[#e7ece7] bg-[#fbfdfb] p-4"
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
              v-for="event in eventAnnouncements"
              :key="event.id"
              class="rounded-xl border border-[#e7ece7] bg-[#fbfdfb] p-4"
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
import { computed, ref } from 'vue'
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

const currentDate = computed(() =>
  new Date().toLocaleDateString('en-PH', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
)
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
</style>
