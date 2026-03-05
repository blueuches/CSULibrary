<template>
  <div class="w-full" style="font-family: 'Poppins', sans-serif; background: linear-gradient(135deg, #0B2010 0%, #0D210E 50%, #2D7231 100%); min-height: 100vh">
    <!-- Header Section -->
    <div class="relative py-16 px-4 text-white overflow-hidden">
      <!-- Decorative Background Elements -->
      <div class="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style="background: #FDBE33; filter: blur(80px); transform: translate(100px, -100px)"></div>
      <div class="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10" style="background: #F28500; filter: blur(80px); transform: translate(-80px, 80px)"></div>

      <!-- Header Content -->
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="flex justify-between items-start mb-8">
          <div>
            <div class="flex items-center gap-3 mb-4">
              <div style="width: 50px; height: 4px; background: #FDBE33; border-radius: 2px"></div>
              <span
                style="
                  font-size: 0.75rem;
                  font-weight: 700;
                  letter-spacing: 0.4em;
                  color: #FDBE33;
                  text-transform: uppercase;
                  font-family: 'Poppins', sans-serif;
                "
              >Announcement Management</span>
            </div>
            <h1 class="text-5xl font-bold mb-3" style="font-family: 'Poppins', sans-serif">
              Announcements
            </h1>
            <p class="text-gray-200 text-lg" style="font-family: 'Poppins', sans-serif">
              Manage and organize all your events and general announcements
            </p>
          </div>

          <!-- Dropdown Button -->
          <div class="relative">
            <button
              @click="showDropdown = !showDropdown"
              class="flex items-center gap-2 px-8 py-4 font-bold rounded-lg transition-all duration-300 shadow-2xl hover:shadow-xl transform hover:scale-105"
              style="background-color: #FDBE33; color: #0B2010"
            >
              <svg 
                class="w-6 h-6 plus-icon" 
                :class="{ 'rotate': showDropdown }"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Announcement</span>
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="showDropdown"
              class="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl z-50 overflow-hidden border-t-4"
              style="border-color: #2D7231"
            >
              <router-link
                to="/admin/announcement/general"
                class="block w-full text-left px-6 py-4 transition-all flex items-center gap-3 border-b dropdown-item hover:translate-x-1"
                style="border-color: #E8EAE6; color: #0B2010"
                @click="showDropdown = false"
              >
                <div class="p-2 rounded-lg" style="background: rgba(45, 114, 49, 0.1)">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: #2D7231">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div class="font-semibold" style="color: #0B2010">General Input</div>
                  <div class="text-xs text-gray-500">Create general announcements</div>
                </div>
              </router-link>
              <router-link
                to="/admin/announcement/event"
                class="block w-full text-left px-6 py-4 transition-all flex items-center gap-3 dropdown-item hover:translate-x-1"
                style="color: #0B2010"
                @click="showDropdown = false"
              >
                <div class="p-2 rounded-lg" style="background: rgba(45, 114, 49, 0.1)">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: #2D7231">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div class="font-semibold" style="color: #0B2010">Event Input</div>
                  <div class="text-xs text-gray-500">Create event announcements</div>
                </div>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="grid grid-cols-3 gap-4 mt-12">
          <div class="backdrop-blur-sm rounded-lg p-4" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2)">
            <div class="text-3xl font-bold" style="color: #FDBE33">{{ generalAnnouncements.length }}</div>
            <div class="text-sm text-gray-200 mt-1">General Announcements</div>
          </div>
          <div class="backdrop-blur-sm rounded-lg p-4" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2)">
            <div class="text-3xl font-bold" style="color: #FDBE33">{{ eventAnnouncements.length }}</div>
            <div class="text-sm text-gray-200 mt-1">Event Announcements</div>
          </div>
          <div class="backdrop-blur-sm rounded-lg p-4" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2)">
            <div class="text-3xl font-bold" style="color: #FDBE33">{{ generalAnnouncements.length + eventAnnouncements.length }}</div>
            <div class="text-sm text-gray-200 mt-1">Total Announcements</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Announcement Content -->
    <div class="max-w-7xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <!-- General Announcements Section -->
        <div class="flex flex-col gap-6 bg-white rounded-2xl p-8 shadow-lg">
          <!-- Section Header -->
          <div class="relative">
            <div class="flex items-center gap-4 mb-6">
              <div class="p-3 rounded-lg" style="background: linear-gradient(135deg, #2D7231, #0B2010)">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: #FDBE33">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold" style="color: #0B2010; font-family: 'Poppins', sans-serif">General Announcements</h2>
                <p class="text-sm text-gray-600 mt-1">Important updates and information</p>
              </div>
            </div>
            <div style="height: 3px; background: linear-gradient(to right, #2D7231, #FDBE33, transparent); border-radius: 2px"></div>
          </div>

          <!-- Empty State -->
          <div v-if="generalAnnouncements.length === 0" class="text-center py-16 rounded-xl border-2 border-dashed" style="border-color: #D0D0D0; background: linear-gradient(135deg, #FAFAFA, #F5F5F5)">
            <div class="flex justify-center mb-4">
              <div class="p-4 rounded-full" style="background: rgba(45, 114, 49, 0.1)">
                <svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: #2D7231">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <p class="text-gray-600 font-medium" style="font-family: 'Poppins', sans-serif">No general announcements yet</p>
            <p class="text-xs text-gray-400 mt-2" style="font-family: 'Poppins', sans-serif">Create your first announcement to get started</p>
          </div>

          <!-- Announcements List -->
          <div v-else class="space-y-4">
            <div
              v-for="(announcement, index) in generalAnnouncements"
              :key="index"
              class="group rounded-xl p-6 transition-all duration-300 announcement-card hover:shadow-xl"
              style="background: white; border-left: 4px solid #2D7231; border: 1px solid #E8EAE6; box-shadow: 0 2px 8px rgba(45, 114, 49, 0.1)"
            >
              <div class="flex justify-between items-start mb-3">
                <h3 class="font-bold text-lg" style="color: #0B2010; font-family: 'Poppins', sans-serif; flex: 1">{{ announcement.title }}</h3>
                <span class="text-xs font-semibold px-3 py-1 rounded-full" style="background: rgba(45, 114, 49, 0.1); color: #2D7231">General</span>
              </div>
              <p class="text-gray-700 text-sm mb-4" style="font-family: 'Poppins', sans-serif; line-height: 1.6">{{ announcement.content }}</p>
              <div class="flex items-center justify-between pt-4 border-t" style="border-color: #E8EAE6">
                <div class="flex items-center gap-4 text-xs text-gray-500">
                  <span style="font-family: 'Poppins', sans-serif">Published: {{ announcement.date }}</span>
                </div>
                <div class="w-2 h-2 rounded-full" style="background: #2D7231"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Event Announcements Section -->
        <div class="flex flex-col gap-6 bg-white rounded-2xl p-8 shadow-lg">
          <!-- Section Header -->
          <div class="relative">
            <div class="flex items-center gap-4 mb-6">
              <div class="p-3 rounded-lg" style="background: linear-gradient(135deg, #2D7231, #0B2010)">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: #FDBE33">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold" style="color: #0B2010; font-family: 'Poppins', sans-serif">Event Announcements</h2>
                <p class="text-sm text-gray-600 mt-1">Upcoming events and activities</p>
              </div>
            </div>
            <div style="height: 3px; background: linear-gradient(to right, #2D7231, #FDBE33, transparent); border-radius: 2px"></div>
          </div>

          <!-- Empty State -->
          <div v-if="eventAnnouncements.length === 0" class="text-center py-16 rounded-xl border-2 border-dashed" style="border-color: #D0D0D0; background: linear-gradient(135deg, #FAFAFA, #F5F5F5)">
            <div class="flex justify-center mb-4">
              <div class="p-4 rounded-full" style="background: rgba(45, 114, 49, 0.1)">
                <svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: #2D7231">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p class="text-gray-600 font-medium" style="font-family: 'Poppins', sans-serif">No event announcements yet</p>
            <p class="text-xs text-gray-400 mt-2" style="font-family: 'Poppins', sans-serif">Create your first event announcement to get started</p>
          </div>

          <!-- Events List -->
          <div v-else class="space-y-4">
            <div
              v-for="(event, index) in eventAnnouncements"
              :key="index"
              class="group rounded-xl p-6 transition-all duration-300 announcement-card hover:shadow-xl"
              style="background: white; border-left: 4px solid #2D7231; border: 1px solid #E8EAE6; box-shadow: 0 2px 8px rgba(45, 114, 49, 0.1)"
            >
              <div class="flex justify-between items-start mb-3">
                <h3 class="font-bold text-lg" style="color: #0B2010; font-family: 'Poppins', sans-serif; flex: 1">{{ event.title }}</h3>
                <span class="text-xs font-semibold px-3 py-1 rounded-full" style="background: rgba(242, 133, 0, 0.1); color: #F28500">Event</span>
              </div>
              <p class="text-gray-700 text-sm mb-4" style="font-family: 'Poppins', sans-serif; line-height: 1.6">{{ event.description }}</p>

              <!-- Event Details -->
              <div class="space-y-3 mb-4 py-4 border-y" style="border-color: #E8EAE6">
                <div class="flex items-center gap-3 text-sm" style="color: #0B2010">
                  <div class="w-2 h-2 rounded-full" style="background: #2D7231"></div>
                  <span style="font-family: 'Poppins', sans-serif">
                    <span style="font-weight: 600">Date:</span> {{ event.eventDate }}
                  </span>
                </div>
                <div class="flex items-center gap-3 text-sm" style="color: #0B2010">
                  <div class="w-2 h-2 rounded-full" style="background: #2D7231"></div>
                  <span style="font-family: 'Poppins', sans-serif">
                    <span style="font-weight: 600">Location:</span> {{ event.location }}
                  </span>
                </div>
              </div>

              <div class="flex items-center justify-between text-xs text-gray-500 pt-2">
                <span style="font-family: 'Poppins', sans-serif">Published: {{ event.createdDate }}</span>
                <div class="w-2 h-2 rounded-full" style="background: #2D7231"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showDropdown = ref(false)

// Sample data - replace with Firebase data later
const generalAnnouncements = ref<any[]>([
  {
    id: 1,
    title: 'Library Hours Extended',
    content: 'The library will now be open until 9 PM on weekdays to accommodate more students studying for exams.',
    date: 'March 5, 2024'
  },
  {
    id: 2,
    title: 'New Book Collection Available',
    content: 'We have just added 500 new books to our collection. Check them out in the New Acquisitions section!',
    date: 'March 4, 2024'
  }
])

const eventAnnouncements = ref<any[]>([
  {
    id: 1,
    title: 'Library Orientation Workshop',
    description: 'Learn how to use the library resources effectively. This workshop is open to all students.',
    eventDate: 'March 15, 2024',
    location: 'CSU Library Main Hall',
    createdDate: 'March 5, 2024'
  },
  {
    id: 2,
    title: 'Book Fair 2024',
    description: 'Annual book fair featuring local and international publications. Special discounts available!',
    eventDate: 'March 20, 2024',
    location: 'CSU Campus Grounds',
    createdDate: 'March 1, 2024'
  }
])

// Close dropdown when clicking outside
const closeDropdown = () => {
  showDropdown.value = false
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.dropdown-item:hover {
  background-color: rgba(45, 114, 49, 0.08);
}

.announcement-card {
  border-left: 4px solid #2D7231 !important;
  background: white !important;
  border: 1px solid #E8EAE6 !important;
}

.announcement-card:hover {
  transform: translateY(-4px);
  border-left-color: #FDBE33 !important;
  box-shadow: 0 20px 40px rgba(45, 114, 49, 0.15) !important;
}

.plus-icon {
  transition: transform 0.3s ease;
}

.plus-icon.rotate {
  transform: rotate(45deg);
}
</style>