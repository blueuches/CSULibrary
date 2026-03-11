<template>
  <aside
    @mouseenter="isCollapsed = false"
    @mouseleave="isCollapsed = true"
    :class="[isCollapsed ? 'w-20' : 'w-72']"
    class="bg-[#062009] h-screen flex flex-col shadow-2xl z-20 transition-all duration-300 ease-in-out relative shrink-0"
  >
    <!-- LOGO -->
    <div class="p-6 border-b border-white/5 flex items-center overflow-hidden h-24">
      <div
        class="min-w-[40px] h-10 rounded flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
        @click="goTo('/admin')"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f9a825"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      </div>

      <transition name="fade-fast">
        <h1
          v-if="!isCollapsed"
          class="ml-3 text-white font-black tracking-widest text-sm uppercase truncate"
        >
          Library Admin
        </h1>
      </transition>
    </div>

    <!-- NAVIGATION -->
    <nav class="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
      <button
        v-for="item in menuItems"
        :key="item.name"
        @click="goTo(item.route)"
        :class="[
          route.path === item.route
            ? 'bg-white font-black shadow-xl scale-105'
            : 'text-white/80 hover:bg-white/10 hover:text-white',
        ]"
        class="w-full flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 outline-none"
      >
        <!-- ICON -->
        <span
          class="min-w-[32px] flex items-center justify-center transition-colors duration-200"
          :class="route.path === item.route ? 'text-[#062009]' : 'text-[#f9a825]'"
          v-html="item.icon"
        ></span>

        <transition name="fade-fast">
          <span
            v-if="!isCollapsed"
            class="ml-2 whitespace-nowrap uppercase tracking-widest text-[11px] font-bold"
            :class="route.path === item.route ? 'text-[#062009]' : 'text-white'"
          >
            {{ item.label }}
          </span>
        </transition>
      </button>
    </nav>

    <!-- USER FOOTER -->
    <div class="p-4 bg-black/20 border-t border-white/5 h-24 flex items-center">
      <div class="flex items-center gap-3">
        <div
          class="min-w-[40px] h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs text-white font-bold"
        >
          ADM
        </div>

        <transition name="fade-fast">
          <div v-if="!isCollapsed" class="overflow-hidden text-white uppercase">
            <p class="text-[10px] font-black tracking-tight">Administrator</p>
            <p class="text-[9px] text-[#f9a825] font-bold italic opacity-90">Session Active</p>
          </div>
        </transition>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isCollapsed = ref(true)

function goTo(path: string) {
  router.push(path)
}

const menuItems = [
  {
    name: 'DASHBOARD',
    label: 'Dashboard',
    route: '/admin',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>`,
  },

  {
    name: 'ANNOUNCEMENTS',
    label: 'Announcements',
    route: '/admin/announcement',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>`,
  },

  {
    name: 'PERSONNEL',
    label: 'Personnel',
    route: '/admin/personnel',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>`,
  },

  {
    name: 'ANALYTICS',
    label: 'Analytics',
    route: '/admin/analytics',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
      <line x1="2" y1="20" x2="22" y2="20"/>
    </svg>`,
  },

  {
    name: 'ATTENDANCE',
    label: 'Attendance',
    route: '/admin/attendance',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <polyline points="16 11 18 13 22 9"/>
    </svg>`,
  },

  {
    name: 'SERVICES',
    label: 'Services',
    route: '/admin/services',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>`,
  },

  {
    name: 'WEBSITE',
    label: 'Website',
    route: '/admin/website',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>`,
  },
]
</script>

<style scoped>
.fade-fast-enter-active {
  transition: opacity 0.3s ease 0.2s;
}
.fade-fast-leave-active {
  transition: opacity 0.1s ease;
}
.fade-fast-enter-from,
.fade-fast-leave-to {
  opacity: 0;
}

nav::-webkit-scrollbar {
  width: 4px;
}
nav::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
</style>
