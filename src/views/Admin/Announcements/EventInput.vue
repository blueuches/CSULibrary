<template>
  <div class="flex h-screen overflow-hidden bg-white">
    <Sidebar />

    <main
      class="flex-1 overflow-y-auto p-6 md:p-10 bg-gray-50"
      style="font-family: 'Poppins', sans-serif; color: #1a1a1a"
    >
      <div
        class="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div class="flex items-center gap-6">
          <div class="header-left">
             <div class="header-breadcrumb !mb-2">
            <span
              class="cursor-pointer hover:text-[#0d2b0f] transition-colors"
              @click="$router.push('/admin/announcement')"
              >BACK</span
            >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 5l7 7-7 7" />
            </svg>
            <span>EVENT ANNOUNCEMENT</span>
          </div>
            <h1 class="header-title">
              New Event <span class="text-yellow-500">Announcement</span>
            </h1>
            <p class="header-sub">Compose and publish updates for the library community.</p>
          </div>
        </div>

        <div class="hidden lg:flex gap-4">
          <div class="px-6 py-3 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <p class="text-xs text-green-700 uppercase font-bold tracking-widest">Status</p>
            <p class="text-gray-900 font-bold">Drafting</p>
          </div>

          <div class="px-6 py-3 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <p class="text-xs text-orange-600 uppercase font-bold tracking-widest">Visibility</p>
            <p class="text-gray-900 font-bold">Public</p>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div class="lg:col-span-7 space-y-6">
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
              <div class="space-y-6">
                <div>
                  <label
                    class="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1"
                  >
                    Headline
                  </label>
                  <input
                    v-model="formData.title"
                    type="text"
                    placeholder="What's happening?"
                    class="w-full px-6 py-4 bg-gray-50 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-[#2D7231] focus:bg-white text-gray-900 text-lg font-semibold transition-all"
                  />
                </div>

                <div>
                  <label
                    class="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1"
                  >
                    Details
                  </label>
                  <textarea
                    v-model="formData.description"
                    placeholder="Provide the full story here..."
                    rows="6"
                    class="w-full px-6 py-4 bg-gray-50 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-[#2D7231] focus:bg-white text-gray-900 resize-none transition-all"
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
                <label class="text-sm font-bold text-gray-700 uppercase mb-4 block">
                  Publish Date
                </label>
                <input
                  v-model="formData.datePublished"
                  type="date"
                  class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#2D7231] text-gray-900"
                />
              </div>

              <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
                <label class="text-sm font-bold text-gray-700 uppercase mb-4 block">
                  Attachment
                </label>
                <input
                  type="file"
                  @change="handleFileUpload"
                  class="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
              </div>
            </div>

            <div class="flex items-center gap-4 pt-4">
              <button
                @click="goBack"
                type="button"
                class="flex-1 py-4 rounded-2xl font-bold text-gray-600 border-2 border-gray-300 hover:bg-gray-100 transition-all"
              >
                Discard
              </button>

              <button
                type="submit"
                class="flex-[2] py-4 rounded-2xl font-bold text-white shadow-lg hover:brightness-110 active:scale-95 transition-all"
                style="background: linear-gradient(to right, #f28500, #fdbe33)"
              >
                {{ isEditing ? 'Update Post' : 'Publish Announcement' }}
              </button>
            </div>
          </form>
        </div>

        <div class="lg:col-span-5 hidden lg:block">
          <div class="sticky top-8">
            <p class="text-xs font-bold text-green-700 uppercase tracking-[0.3em] mb-4 ml-2">
              Live Preview
            </p>

            <div
              class="bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl overflow-hidden border-8 border-gray-200"
            >
              <div class="bg-white rounded-[1.8rem] overflow-hidden min-h-[450px]">
                <div class="h-32 bg-gradient-to-br from-[#2D7231] to-[#0B2010] p-6 flex items-end">
                  <div class="h-10 w-10 bg-white/20 rounded-lg backdrop-blur-md"></div>
                </div>

                <div class="p-8">
                  <span
                    class="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold uppercase mb-4 tracking-wider"
                  >
                    Announcement
                  </span>

                  <h3 class="text-2xl font-bold text-gray-900 leading-tight mb-4">
                    {{ formData.title || 'Your Title Here' }}
                  </h3>

                  <p class="text-gray-600 text-sm leading-relaxed line-clamp-6">
                    {{ formData.description || 'Start typing to see preview...' }}
                  </p>

                  <div class="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div
                        class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-[#2D7231]"
                      >
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                        </svg>
                      </div>
                      <span class="text-xs font-bold text-gray-500">CSU Admin</span>
                    </div>

                    <span class="text-[10px] font-bold text-gray-400 uppercase">
                      {{ formData.datePublished }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'

const router = useRouter()
const isEditing = ref(false)
const today = new Date().toISOString().split('T')[0]

const formData = ref({
  title: '',
  description: '',
  attachment: null as File | null,
  datePublished: today,
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

const goBack = () => {
  router.push('/admin/announcement')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

input,
textarea {
  transition: all 0.2s ease-in-out;
}

textarea::-webkit-scrollbar {
  width: 6px;
}

textarea::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 10px;
}
</style>
