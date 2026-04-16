<template>
  <div class="w-full py-16 px-6" style="background-color: #f1f8f1;">
    <div class="max-w-7xl mx-auto">
      
      <div class="text-center mb-16">
        <h2 class="font-bold tracking-widest uppercase text-sm mb-3" style="color: #2e7d32;">Our Creative Team</h2>
        <h1 class="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight" style="color: #1b471d;">
          Behind the creative web
        </h1>
        <div class="w-20 h-2 mx-auto rounded-full mb-6" style="background-color: #2e7d32;"></div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="(member, index) in teamMembers" 
          :key="index" 
          @click="openModal(member)"
          class="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 text-center cursor-pointer overflow-hidden relative"
          style="--hover-color: #2e7d32;"
        >
          <div class="absolute inset-0 translate-y-full group-hover:translate-y-[92%] transition-transform duration-500" style="background-color: #2e7d32;"></div>

          <div class="relative mb-6 inline-block">
            <div class="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-30 transition duration-500 blur-md" style="background-color: #2e7d32;"></div>
            
            <img :src="member.image" class="relative w-32 h-32 rounded-full object-cover border-4 border-gray-50 shadow-md group-hover:border-[#2e7d32] transition-all duration-300" />
          </div>
          
          <h3 class="relative text-xl font-bold transition-colors uppercase tracking-tighter" style="color: #1b471d;">
            {{ member.name }}
          </h3>
          <p class="relative font-bold text-xs uppercase tracking-widest mt-1" style="color: #2e7d32;">{{ member.role }}</p>
        </div>
      </div>

      <Transition name="pop">
        <div v-if="selectedMember" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" @click.self="closeModal">
          <div class="bg-white rounded-[2rem] max-w-lg w-full overflow-hidden shadow-2xl relative border-b-[12px]" style="border-color: #2e7d32;">
            
            <button @click="closeModal" class="absolute top-6 right-6 text-gray-400 hover:text-[#2e7d32] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div class="p-10 text-center">
              <div class="mb-6 relative inline-block">
                 <div class="absolute -inset-4 rounded-full blur-xl opacity-20" style="background-color: #2e7d32;"></div>
                 <img :src="selectedMember.image" class="relative w-44 h-44 rounded-full mx-auto border-8 border-white shadow-2xl object-cover" />
              </div>

              <h2 class="text-3xl font-black leading-tight uppercase tracking-tighter" style="color: #1b471d;">{{ selectedMember.name }}</h2>
              <div class="mt-2 inline-block px-5 py-1 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em]" style="background-color: #2e7d32;">
                {{ selectedMember.role }}
              </div>
              
              <div class="mt-8 mb-6 flex items-center gap-3">
                <div class="h-[1px] bg-gray-100 flex-1"></div>
                <span class="font-bold text-sm tracking-widest uppercase" style="color: #2e7d32;">About the Creator</span>
                <div class="h-[1px] bg-gray-100 flex-1"></div>
              </div>
              
              <div class="text-left p-6 rounded-2xl border-l-4" style="background-color: #f1f8f1; border-color: #2e7d32;">
                <p class="leading-relaxed font-medium italic" style="color: #1b471d;">
                  "{{ selectedMember.bio }}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </Transition>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Member {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const selectedMember = ref<Member | null>(null);

const teamMembers = ref<Member[]>([
  { 
    name: "Eden Grace M. Bughao", 
    role: "Role Title", 
    image: "https://i.pravatar.cc/150?u=1", 
    bio: "4th Year BS Information Technology student with interests in web development and database systems. Dedicated to creating efficient and scalable solutions for real-world problems." 
  },
  { 
    name: "Omaimah K. Ameril", 
    role: "Role Title", 
    image: "https://i.pravatar.cc/150?u=2", 
    bio: "4th Year BS Information Technology student with interests in software development and system design. Passionate about building functional and user-friendly applications." 
  },
  { 
    name: "Pearl Janette G. Cacayan", 
    role: "Role Title", 
    image: "https://i.pravatar.cc/150?u=3", 
    bio: "4th Year BS Information Technology student with interest in backend development. Focused on building reliable and efficient applications."
  },
  { 
    name: "Dyanna Joy C. Castro", 
    role: "Role Title", 
    image: "https://i.pravatar.cc/150?u=4", 
    bio: "4th Year BS Information Technology student with interest in mobile and web development. Interested in building practical and innovative applications." 
  },
  { 
    name: "Jenny Mae De La Torre", 
    role: "Role Title", 
    image: "https://i.pravatar.cc/150?u=5", 
    bio: "4th Year BS Information Technology student with strong interest in backend development and system architecture. Focused on creating reliable and efficient systems." 
  },
  { 
    name: "Christine Mae L. Lagura", 
    role: "Role Title", 
    image: "https://i.pravatar.cc/150?u=6", 
    bio: "4th Year BS Information Technology student with interest in software engineering and project development. Interested in building real-world systems." 
  },
  { 
    name: "Reonest Arjayle Espina", 
    role: "Role Title", 
    image: "https://i.pravatar.cc/150?u=7", 
    bio: "4th Year BS Information Technology student with interest in backend development and system optimization. Focused on improving performance and reliability of systems." 
  },
  { 
    name: "Marry Joy L. Bersabal", 
    role: "Role Title", 
    image: "https://i.pravatar.cc/150?u=8", 
    bio: "4th Year BS Information Technology student with interest in UI/UX design and frontend development. Passionate about crafting clean, intuitive, and accessible user interfaces." 
  },
]);

const openModal = (member: Member) => {
  selectedMember.value = member;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  selectedMember.value = null;
  document.body.style.overflow = 'auto';
};
</script>

<style scoped>
.pop-enter-active { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.pop-leave-active { transition: all 0.2s ease-in; }
.pop-enter-from, .pop-leave-to { opacity: 0; transform: scale(0.8); }
</style>