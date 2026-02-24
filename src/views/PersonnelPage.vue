<template>
  <div class="w-screen bg-white">
    <!-- Pattern Background Container -->
    <div class="relative w-full bg-gradient-to-b from-amber-50 via-white to-white overflow-hidden">
      
      <!-- Decorative Pattern SVG Background -->
      <svg class="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="decorPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="30" fill="none" stroke="#166534" stroke-width="2" opacity="0.3" />
            <rect x="20" y="20" width="60" height="60" fill="none" stroke="#166534" stroke-width="2" opacity="0.2" transform="rotate(45 50 50)" />
            <path d="M 50 20 Q 70 35 70 50 Q 70 65 50 80 Q 30 65 30 50 Q 30 35 50 20" fill="none" stroke="#166534" stroke-width="1.5" opacity="0.25" />
          </pattern>
        </defs>
        <rect width="1000" height="600" fill="url(#decorPattern)" />
      </svg>

      <!-- Content -->
      <div class="relative z-10 px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
        
        <!-- Header -->
        <div class="text-center pb-16">
          <h1 class="text-4xl sm:text-4xl font-bold text-gray-700">
            LIBRARY PERSONNEL
          </h1>

          <!-- Yellow Center Line -->
          <div class="h-1 w-15 bg-yellow-400 mx-auto rounded-full mt-3 mb-28 center"></div>
        </div>

        <!-- Featured Person (Top) -->
        <div v-if="staff.length > 0" class="max-w-4xl w-full mx-auto mb-16">
          <div class="flex flex-col items-center">

            <!-- Circular Image with Green Border -->
            <div class="relative mb-6">
              <div class="w-48 h-48 rounded-full border-8 border-green-700 overflow-hidden shadow-lg bg-white">
                <img
                  :src="staff[0].image"
                  :alt="staff[0].name"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- Decorative corner accents -->
              <div class="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-700 rounded-tl-lg"></div>
              <div class="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-700 rounded-tr-lg"></div>
              <div class="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-700 rounded-bl-lg"></div>
              <div class="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-700 rounded-br-lg"></div>
            </div>

            <!-- Info -->
            <div class="text-center">
              <h2 class="text-2xl font-bold text-gray-900 mb-1">{{ staff[0].name }}</h2>
              <p class="text-sm text-gray-600 italic mb-2">{{ staff[0].subtitle }}</p>
              <p class="text-base font-bold text-gray-900">{{ staff[0].position }}</p>
            </div>
          </div>

          <!-- Divider -->
          <div class="flex items-center justify-center my-12">
            <div class="flex-grow h-px bg-gray-300"></div>
            <div class="px-4 text-gray-400">•</div>
            <div class="flex-grow h-px bg-gray-300"></div>
          </div>
        </div>

        <!-- Grid for Other Staff -->
        <div class="max-w-6xl w-full mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <div
              v-for="person in staff.slice(1)"
              :key="person.id"
              class="flex flex-col items-center"
            >
              <!-- Circular Image -->
              <div class="relative mb-6">
                <div class="w-40 h-40 rounded-full border-8 border-green-700 overflow-hidden shadow-lg bg-white">
                  <img
                    :src="person.image"
                    :alt="person.name"
                    class="w-full h-full object-cover"
                  />
                </div>

                <!-- Decorative corner accents -->
                <div class="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-green-700 rounded-tl-lg"></div>
                <div class="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-green-700 rounded-tr-lg"></div>
                <div class="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-green-700 rounded-bl-lg"></div>
                <div class="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-green-700 rounded-br-lg"></div>
              </div>

              <!-- Info -->
              <div class="text-center">
                <h3 class="text-lg font-bold text-gray-900 mb-1">{{ person.name }}</h3>
                <p class="text-sm text-gray-600 italic mb-2">{{ person.subtitle }}</p>
                <p class="text-sm font-bold text-gray-900">{{ person.position }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalPage',
  data() {
    return {
      staff: [
        {
          id: 1,
          name: 'Maria Corazon L. Tercera',
          subtitle: 'University Librarian',
          position: 'Head, Library Services',
          image: '/public/tin.jpg'
        },
        {
          id: 2,
          name: 'Mercy G. Reyes',
          subtitle: 'College Librarian I',
          position: 'Member, Library Board',
          image: 'https://via.placeholder.com/300?text=Mercy'
        },
        {
          id: 3,
          name: 'Ann Marie Monte de Ramos',
          subtitle: 'Librarian I',
          position: 'Head, Reference Services',
          image: 'https://via.placeholder.com/300?text=Ann'
        },
        {
          id: 4,
          name: 'Staff Member 4',
          subtitle: 'Library Assistant',
          position: 'Circulation Services',
          image: 'https://via.placeholder.com/300?text=Staff4'
        },
        {
          id: 5,
          name: 'Staff Member 5',
          subtitle: 'Library Assistant',
          position: 'Cataloging Services',
          image: 'https://via.placeholder.com/300?text=Staff5'
        },
        {
          id: 6,
          name: 'Staff Member 6',
          subtitle: 'Library Assistant',
          position: 'Technical Services',
          image: 'https://via.placeholder.com/300?text=Staff6'
        }
      ]
    }
  }
}
</script>

<style scoped>
img {
  transition: transform 0.3s ease;
}

div:has(img):hover img {
  transform: scale(1.05);
}
</style>