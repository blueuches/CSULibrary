<template>
  <div class="w-full py-10 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        <!-- DATA UPLOAD -->
        <div
          class="bg-[#1b5e20] text-white rounded-2xl p-8 flex flex-col items-center justify-between shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
        >
          <h3 class="text-lg font-semibold mb-6 text-center">
            Data Upload
          </h3>

          <a
            href="https://drive.google.com/drive/folders/10VykxJ5P2C_OwVsF0Ym_ef4TUuFdq9I6"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-yellow-400 text-[#1b5e20] font-semibold px-6 py-2 rounded-full hover:bg-yellow-300 transition duration-300 inline-block text-center"
          >
            Go to Data Upload
          </a>
        </div>

        <!-- CD-ROM DOWNLOAD -->
        <div
          class="bg-[#1b5e20] text-white rounded-2xl p-8 flex flex-col items-center justify-between shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
        >
          <h3 class="text-lg font-semibold mb-6 text-center">
            CD-ROM Download
          </h3>

          <select
            class="bg-yellow-400 mb-4 w-full px-3 py-2 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option disabled selected>Select CD-ROM</option>
            <option>CD-ROM 1</option>
            <option>CD-ROM 2</option>
            <option>CD-ROM 3</option>
          </select>

          <button
            class="bg-yellow-400 text-[#1b5e20] font-semibold px-6 py-2 rounded-full hover:bg-yellow-300 transition duration-300"
          >
            Download Selected
          </button>
        </div>

        <!-- E-BOOKS -->
        <div
          class="bg-[#1b5e20] text-white rounded-2xl p-8 flex flex-col items-center justify-between shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
        >
          <h3 class="text-lg font-semibold mb-6 text-center">
            E-Books GDrive
          </h3>

          <a
            href="https://drive.google.com/drive/folders/1-2P2uJiziZHND_8gH5-d20uDmAiPs5gt"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-yellow-400 text-[#1b5e20] font-semibold px-6 py-2 rounded-full hover:bg-yellow-300 transition duration-300 inline-block text-center"
          >
            Access E-Books
          </a>
        </div>

        <!-- E-RESOURCES -->
        <div
          class="bg-[#1b5e20] text-white rounded-2xl p-8 flex flex-col items-center justify-between shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
        >
          <h3 class="text-lg font-semibold mb-6 text-center">
            E-Resources
          </h3>

          <RouterLink
            :to="{ name: 'eresources' }"
            class="bg-yellow-400 text-[#1b5e20] font-semibold px-6 py-2 rounded-full hover:bg-yellow-300 transition duration-300"
          >
            View E-Resources
          </RouterLink>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
/* Keep empty to avoid Tailwind conflicts */
</style>