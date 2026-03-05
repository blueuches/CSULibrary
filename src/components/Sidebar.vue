<template>
  <aside 
    @mouseenter="isCollapsed = false"
    @mouseleave="isCollapsed = true"
    :class="[isCollapsed ? 'w-20' : 'w-72']"
    class="bg-[#062009] h-screen flex flex-col shadow-2xl z-20 transition-all duration-300 ease-in-out relative shrink-0"
  >
    <div class="p-6 border-b border-white/5 flex items-center overflow-hidden h-24">
      <div 
        class="min-w-[40px] h-10 rounded flex items-center text-xl shadow-lg cursor-pointer hover:scale-110 transition-transform" 
        @click="$emit('updateActiveTab', 'DASHBOARD')"
      >
        📚
      </div>
      <transition name="fade-fast">
        <h1 v-if="!isCollapsed" class="ml-3 text-white font-black tracking-widest text-sm uppercase truncate">
          Library Admin
        </h1>
      </transition>
    </div>

    <nav class="flex-1 px-3 py-10 space-y-4 overflow-y-auto">
      <button 
        v-for="item in menuItems" 
        :key="item.name"
        @click="$emit('updateActiveTab', item.name)"
        :class="[
          activeTab === item.name 
          ? 'bg-white text-[#062009] font-black shadow-xl scale-105' 
          : 'text-white hover:bg-white hover:text-[#062009]'
        ]"
        class="w-full flex items-center px-4 py-4 rounded-xl transition-all duration-200 group outline-none"
      >
        <span class="text-xl min-w-[32px]">{{ item.icon }}</span>
        
        <transition name="fade-fast">
          <span v-if="!isCollapsed" class="ml-2 whitespace-nowrap uppercase tracking-widest text-[11px] font-bold">
            {{ item.name }}
          </span>
        </transition>
      </button>
    </nav>

    <div class="p-4 bg-black/20 border-t border-white/5 h-24 flex items-center">
      <div class="flex items-center gap-3">
        <div class="min-w-[40px] h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs text-white font-bold">
          ADM
        </div>
        <transition name="fade-fast">
          <div v-if="!isCollapsed" class="overflow-hidden text-white uppercase">
            <p class="text-[10px] font-black tracking-tight">Administrator</p>
            <p class="text-[9px] text-[#FFB32C] font-bold italic opacity-90">Session Active</p>
          </div>
        </transition>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  activeTab: string;
  menuItems: Array<{ name: string; icon: string }>;
}>();

defineEmits(['updateActiveTab']);

const isCollapsed = ref(true);
</script>

<style scoped>
.transition-all { transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1); }
.fade-fast-enter-active { transition: opacity 0.3s ease 0.2s; }
.fade-fast-leave-active { transition: opacity 0.1s ease; }
.fade-fast-enter-from, .fade-fast-leave-to { opacity: 0; }

/* Custom scrollbar para dili hugaw tan-awon ang dark bg */
nav::-webkit-scrollbar {
  width: 4px;
}
nav::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
</style>