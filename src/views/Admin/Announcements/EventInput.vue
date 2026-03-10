<template>
  <div class="w-full min-h-screen p-4 md:p-8" style="font-family: 'Poppins', sans-serif; background: linear-gradient(135deg, #0B2010 0%, #0D210E 50%, #1a4d1e 100%);">
    
    <div class="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div class="flex items-center gap-6">
        <button @click="goBack" class="p-4 bg-white/10 hover:bg-white/20 rounded-2xl backdrop-blur-md border border-white/10 transition-all group">
          <svg class="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 class="text-4xl font-bold text-white tracking-tight">
            {{ isEditing ? 'Edit Announcement' : 'New Event Announcement' }}
          </h1>
          <p class="text-green-200/70 mt-1">Compose and publish updates for the library community.</p>
        </div>
      </div>
      
      <div class="hidden lg:flex gap-4">
        <div class="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <p class="text-xs text-green-300 uppercase font-bold tracking-widest">Status</p>
          <p class="text-white font-medium">Drafting</p>
        </div>
        <div class="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <p class="text-xs text-orange-400 uppercase font-bold tracking-widest">Visibility</p>
          <p class="text-white font-medium">Public</p>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <div class="lg:col-span-7 space-y-6">
        <form @submit.prevent="submitForm" class="space-y-6">
          
          <div class="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Headline</label>
                <input
                  v-model="formData.title"
                  type="text"
                  placeholder="What's happening?"
                  class="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:outline-none transition-all focus:border-[#2D7231] text-lg font-semibold"
                />
              </div>

              <div>
                <label class="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Details</label>
                <textarea
                  v-model="formData.description"
                  placeholder="Provide the full story here..."
                  rows="6"
                  class="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:outline-none transition-all focus:border-[#2D7231] resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white/95 rounded-3xl p-6 shadow-xl border border-white/20">
              <label class="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase mb-4">
                <svg class="w-4 h-4 text-[#2D7231]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Publish Date
              </label>
              <input
                v-model="formData.datePublished"
                type="date"
                class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#2D7231]"
              />
            </div>

            <div class="bg-white/95 rounded-3xl p-6 shadow-xl border border-white/20">
              <label class="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase mb-4">
                <svg class="w-4 h-4 text-[#2D7231]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                Attachment
              </label>
              <div class="relative group">
                <input type="file" @change="handleFileUpload" class="hidden" id="file-upload" />
                <label for="file-upload" class="flex items-center justify-between px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer group-hover:border-[#2D7231] transition-colors">
                  <span class="text-sm text-gray-500 truncate max-w-[150px]">
                    {{ formData.attachment ? formData.attachment.name : 'Upload file...' }}
                  </span>
                  <span class="text-xs font-bold text-[#2D7231]">Browse</span>
                </label>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-4 pt-4">
            <button @click="goBack" type="button" class="flex-1 py-4 rounded-2xl font-bold text-white border border-white/20 hover:bg-white/10 transition-all">
              Discard
            </button>
            <button type="submit" class="flex-[2] py-4 rounded-2xl font-bold text-white shadow-lg shadow-orange-600/20 hover:scale-[1.02] active:scale-95 transition-all" style="background: linear-gradient(to right, #F28500, #FDBE33)">
              {{ isEditing ? 'Update Post' : 'Publish Announcement' }}
            </button>
          </div>
        </form>
      </div>

      <div class="lg:col-span-5 hidden lg:block">
        <div class="sticky top-8">
          <p class="text-xs font-bold text-green-300 uppercase tracking-[0.3em] mb-4 ml-2">Live Preview</p>
          <div class="bg-[#0B2010] rounded-[2rem] p-1 border-4 border-white/10 shadow-2xl overflow-hidden">
             <div class="bg-white rounded-[1.8rem] overflow-hidden min-h-[400px]">
                <div class="h-32 bg-gradient-to-br from-[#2D7231] to-[#0B2010] p-6 flex items-end">
                  <div class="h-10 w-10 bg-white/20 rounded-lg backdrop-blur-md"></div>
                </div>
                <div class="p-8">
                  <span class="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-400 text-[10px] font-bold uppercase mb-4 tracking-wider">Announcement</span>
                  <h3 class="text-2xl font-bold text-[#0B2010] leading-tight mb-4">
                    {{ formData.title || 'Your Title Here' }}
                  </h3>
                  <p class="text-gray-600 text-sm leading-relaxed line-clamp-6">
                    {{ formData.description || 'Start typing to see how your announcement will look to students and faculty...' }}
                  </p>
                  <div class="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-[#2D7231]">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" /></svg>
                      </div>
                      <span class="text-xs font-bold text-gray-400">CSU Admin</span>
                    </div>
                    <span class="text-[10px] font-bold text-gray-300 uppercase">{{ formData.datePublished }}</span>
                  </div>
                </div>
             </div>
          </div>
          <div class="mt-6 p-4 rounded-2xl bg-orange-400/10 border border-orange-400/20">
            <p class="text-xs text-orange-200 leading-relaxed">
              <strong>Tip:</strong> Keep titles under 50 characters for better visibility on mobile dashboards.
            </p>
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
const isEditing = ref(false)
const today = new Date().toISOString().split('T')[0]

const formData = ref({
  title: '',
  description: '',
  attachment: null as File | null,
  datePublished: today
})

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) formData.value.attachment = file
}

const submitForm = async () => {
  if (!formData.value.title.trim() || !formData.value.description.trim()) {
    alert('Headline and Details are required.')
    return
  }
  console.log('Publishing:', formData.value)
  router.push('/admin/announcement')
}

const goBack = () => router.push('/admin/announcement')
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

/* Smooth transitions for inputs */
input, textarea {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 6px;
}
textarea::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 10px;
}
</style>