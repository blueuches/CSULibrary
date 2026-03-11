<template>
  <div class="w-full" style="font-family: 'Poppins', sans-serif; background: linear-gradient(135deg, #0B2010 0%, #0D210E 50%, #2D7231 100%); min-height: 100vh">
    <!-- Header Section -->
    <div class="relative py-16 px-4 text-white overflow-hidden">
      <!-- Decorative Background Elements -->
      <div class="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style="background: #FDBE33; filter: blur(80px); transform: translate(100px, -100px)"></div>
      <div class="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10" style="background: #F28500; filter: blur(80px); transform: translate(-80px, 80px)"></div>

      <!-- Header Content -->
      <div class="max-w-4xl mx-auto relative z-10">
        <div class="flex items-center gap-4 mb-6">
          <button
            @click="goBack"
            class="p-3 hover:bg-white/20 rounded-lg transition-all duration-300"
            style="color: white"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <div class="flex items-center gap-3 mb-3">
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
              >News Management</span>
            </div>
            <h1 class="text-5xl font-bold mb-2" style="font-family: 'Poppins', sans-serif">
              {{ isEditing ? 'Edit News Article' : 'News Article' }}
            </h1>
            <p class="text-gray-200 text-lg" style="font-family: 'Poppins', sans-serif">
              {{ isEditing ? 'Update your news information' : 'Create a new news article for BSP, NBWC, Starbooks, and more' }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Section -->
    <div class="max-w-4xl mx-auto px-4 py-12">
      <form @submit.prevent="submitForm" class="space-y-6">

        <!-- News Title -->
        <div class="bg-white rounded-2xl p-8 shadow-lg">
          <div class="flex items-center gap-3 mb-6">
            <div class="p-3 rounded-lg" style="background: linear-gradient(135deg, #2D7231, #0B2010)">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: #FDBE33">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold" style="color: #0B2010; font-family: 'Poppins', sans-serif">News Title</h2>
          </div>
          <div style="height: 2px; background: linear-gradient(to right, #2D7231, #FDBE33, transparent); margin-bottom: 24px; border-radius: 2px"></div>
          
          <input
            id="title"
            v-model="formData.title"
            type="text"
            placeholder="Enter news title (e.g., BSP Knowledge Resource Network)"
            class="w-full px-6 py-4 border-2 rounded-xl focus:outline-none transition-all input-field"
            style="
              border-color: #2D7231;
              background-color: #FAFAFA;
              color: #0B2010;
            "
            required
          />
          <p class="text-xs text-gray-500 mt-3" style="font-family: 'Poppins', sans-serif">
            Keep it concise and descriptive (max 100 characters)
          </p>
        </div>

        <!-- Description -->
        <div class="bg-white rounded-2xl p-8 shadow-lg">
          <div class="flex items-center gap-3 mb-6">
            <div class="p-3 rounded-lg" style="background: linear-gradient(135deg, #2D7231, #0B2010)">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: #FDBE33">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold" style="color: #0B2010; font-family: 'Poppins', sans-serif">Description</h2>
          </div>
          <div style="height: 2px; background: linear-gradient(to right, #2D7231, #FDBE33, transparent); margin-bottom: 24px; border-radius: 2px"></div>

          <textarea
            id="description"
            v-model="formData.description"
            placeholder="Write your news content here..."
            rows="8"
            class="w-full px-6 py-4 border-2 rounded-xl focus:outline-none transition-all resize-none input-field"
            style="
              border-color: #2D7231;
              background-color: #FAFAFA;
              color: #0B2010;
            "
            required
          ></textarea>
          <p class="text-xs text-gray-500 mt-3" style="font-family: 'Poppins', sans-serif">
            Provide detailed information about your news article (max 2000 characters)
          </p>
        </div>

        <!-- Attachment -->
        <div class="bg-white rounded-2xl p-8 shadow-lg">
          <div class="flex items-center gap-3 mb-6">
            <div class="p-3 rounded-lg" style="background: linear-gradient(135deg, #2D7231, #0B2010)">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: #FDBE33">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold" style="color: #0B2010; font-family: 'Poppins', sans-serif">Attachment (Optional)</h2>
          </div>
          <div style="height: 2px; background: linear-gradient(to right, #2D7231, #FDBE33, transparent); margin-bottom: 24px; border-radius: 2px"></div>

          <div class="relative border-2 border-dashed rounded-xl p-8 text-center transition-all attachment-zone" style="border-color: #2D7231; background-color: #FAFAFA">
            <input
              id="attachment"
              type="file"
              @change="handleFileUpload"
              class="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
            />
            <label for="attachment" class="cursor-pointer block">
              <svg class="w-12 h-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: #2D7231">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p class="font-medium" style="color: #0B2010; font-family: 'Poppins', sans-serif">
                {{ formData.attachment ? formData.attachment.name : 'Click to upload or drag and drop' }}
              </p>
              <p class="text-sm text-gray-500 mt-2" style="font-family: 'Poppins', sans-serif">
                PDF, DOC, DOCX, JPG, PNG, GIF (Max 10MB)
              </p>
            </label>
          </div>
        </div>

        <!-- Date Published -->
        <div class="bg-white rounded-2xl p-8 shadow-lg">
          <div class="flex items-center gap-3 mb-6">
            <div class="p-3 rounded-lg" style="background: linear-gradient(135deg, #2D7231, #0B2010)">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: #FDBE33">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold" style="color: #0B2010; font-family: 'Poppins', sans-serif">Publication Date</h2>
          </div>
          <div style="height: 2px; background: linear-gradient(to right, #2D7231, #FDBE33, transparent); margin-bottom: 24px; border-radius: 2px"></div>

          <input
            id="datePublished"
            v-model="formData.datePublished"
            type="date"
            class="w-full px-6 py-4 border-2 rounded-xl focus:outline-none transition-all input-field"
            style="
              border-color: #2D7231;
              background-color: #FAFAFA;
              color: #0B2010;
            "
            required
          />
          <p class="text-xs text-gray-500 mt-3" style="font-family: 'Poppins', sans-serif">
            When should this news article be published?
          </p>
        </div>

        <!-- Form Actions -->
        <div class="flex gap-4 pt-8">
          <button
            type="button"
            @click="goBack"
            class="flex-1 px-8 py-4 rounded-xl font-bold transition-all duration-300 btn-cancel"
            style="
              background-color: #FBFBFB;
              color: #0B2010;
              border: 2px solid #D0D0D0;
            "
          >
            Cancel
          </button>
          <button
            type="submit"
            class="flex-1 px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 btn-submit"
            style="background-color: #2D7231"
          >
            {{ isEditing ? 'Update News' : 'Publish News' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isEditing = ref(false)

const today = new Date().toISOString().split('T')[0] || ''

const formData = ref<{
  title: string
  description: string
  attachment: File | null
  datePublished: string
}>({
  title: '',
  description: '',
  attachment: null,
  datePublished: today
})

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    formData.value.attachment = file
  }
}

const submitForm = async () => {
  if (!formData.value.title.trim()) {
    alert('Please enter a title')
    return
  }
  if (!formData.value.description.trim()) {
    alert('Please enter description')
    return
  }

  console.log('Saving news:', formData.value)
  // TODO: Add Firebase/database logic here
  router.push('/admin/announcement')
}

const goBack = () => {
  router.push('/admin/announcement')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.input-field:focus {
  border-color: #F28500 !important;
  box-shadow: 0 0 0 3px rgba(242, 133, 0, 0.1);
}

input::placeholder,
textarea::placeholder {
  color: #BDBDBD;
}

.btn-cancel:hover {
  background-color: #F0F0F0 !important;
}

.btn-submit:hover {
  background-color: #FAA627 !important;
}

.attachment-zone:hover {
  border-color: #F28500;
  background-color: #FFF9E6 !important;
}
</style>