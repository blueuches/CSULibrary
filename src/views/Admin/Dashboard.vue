<template>
  <div class="flex h-screen bg-white overflow-hidden font-sans">
    
    <Sidebar 
      :activeTab="activeTab" 
      :menuItems="allMenuItems" 
      @updateActiveTab="handleTabChange" 
    />

    <main class="flex-1 relative overflow-hidden flex flex-col min-w-0">

      <header class="relative z-20 h-20 flex items-center justify-between px-12 bg-transparent">
        <div class="flex flex-col">
          <span class="font-bold text-sm uppercase tracking-widest text-[#1b5e20]">
            {{ activeTab }} VIEW
          </span>
        </div>
        
        <div class="flex items-center gap-6">
          <div class="text-right hidden md:block">
            <p class="text-xs font-medium text-[#1b5e20]">{{ currentDate }}</p>
          </div>
        </div>
      </header>

      <div class="flex-1 relative z-10 flex flex-col items-center justify-center text-center px-6 overflow-y-auto">
        
        <transition name="fade" mode="out-in">
          <div :key="activeTab" class="w-full max-w-6xl py-12">
            
            <div v-if="activeTab === 'DASHBOARD'" class="space-y-12">
              
              <div class="space-y-4">
                <div class="space-y-2">
                  <p class="text-[#1b5e20] uppercase tracking-[0.5em] text-sm font-bold animate-pulse">Operational</p>
                  <h2 class="text-[#1b5e20] text-6xl md:text-7xl font-black tracking-tighter">
                    Welcome, <span class="text-[#fbc02d]">Admin</span>.
                  </h2>
                </div>
                <div class="h-1 w-32 bg-[#1b5e20] mx-auto rounded-full shadow-sm"></div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                <div v-for="stat in quickStats" :key="stat.label" 
                     class="group bg-white border-2 border-[#1b5e20] p-6 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 hover:bg-[#1b5e20] hover:-translate-y-2 shadow-md hover:shadow-xl cursor-pointer">
                  
                  <span class="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">
                    {{ stat.icon }}
                  </span>
                  
                  <h3 class="text-[#1b5e20] text-3xl font-black tracking-tight transition-colors duration-300 group-hover:text-white">
                    {{ stat.value }}
                  </h3>
                  
                  <p class="text-[#1b5e20] text-[10px] uppercase font-bold tracking-[0.2em] mt-1 transition-colors duration-300 group-hover:text-white/90">
                    {{ stat.label }}
                  </p>
                </div>
              </div>

              <div class="relative py-4 max-w-2xl mx-auto">
                <p class="text-[#1b5e20] text-3xl md:text-2xl font-serif italic font-medium leading-tight px-6">
                  "{{ currentQuote.text }}"
                </p>
                <p class="mt-3 text-[#1b5e20] font-bold tracking-[0.3em] uppercase text-[11px] opacity-80">
                  — {{ currentQuote.author }}
                </p>
              </div>
            </div>

            <div v-else class="text-[#1b5e20] space-y-4">
              <h2 class="text-5xl font-black uppercase tracking-tighter">{{ activeTab }}</h2>
              <div class="h-1 w-16 bg-[#1b5e20] mx-auto"></div>
              <p class="text-[#1b5e20] font-light italic text-lg opacity-80">Accessing database records...</p>
            </div>

          </div>
        </transition>
      </div>

     <footer class="relative z-20 p-6 text-center">
        <p class="text-[#1b5e20] text-[10px] uppercase tracking-[0.5em] font-black">
          Caraga State University Library Management
        </p>
      </footer>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Sidebar from '@/components/Sidebar.vue';

const activeTab = ref('DASHBOARD');

const allMenuItems = [
  { name: 'DASHBOARD', icon: '📊' },
  { name: 'ANNOUNCEMENTS', icon: '📢' },
  { name: 'PERSONNEL', icon: '👥' },
  { name: 'REPORTS', icon: '📈' },
  { name: 'ATTENDANCE', icon: '📅' }
];

const quickStats = ref([
  { label: 'Total Books', value: '12,450', icon: '📚' },
  { label: 'Borrowed', value: '382', icon: '📖' },
  { label: 'Overdue', value: '12', icon: '⚠️' },
  { label: 'Active Visitors', value: '84', icon: '👤' }
]);

const currentQuote = ref({
  text: "A library is not a luxury but one of the necessities of life.",
  author: "Henry Ward Beecher"
});

const handleTabChange = (name: string) => {
  activeTab.value = name;
};

const currentDate = computed(() => {
  return new Date().toLocaleDateString('en-PH', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,600&display=swap');

.font-serif {
  font-family: 'Playfair Display', serif;
}

/* Inalis ang mabigat na text-shadow para mas malinis ang green-on-white text */
h2, h3 {
  letter-spacing: -0.02em;
}

/* Group hover cleanup: Alisin ang shadow effect pag naka-hover na sa dark background */
.group:hover h3, 
.group:hover p {
  text-shadow: none !important;
}

/* Scrollbar styling */
.flex-1::-webkit-scrollbar {
  width: 5px;
}
.flex-1::-webkit-scrollbar-thumb {
  background: #1b5e2033;
  border-radius: 10px;
}

/* Transition Animations */
.fade-enter-active, .fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from { 
  opacity: 0; 
  transform: translateY(15px); 
}
.fade-leave-to { 
  opacity: 0; 
  transform: translateY(-15px); 
}
</style>