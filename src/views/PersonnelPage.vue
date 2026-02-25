<template>
  <div class="w-full bg-white">

    <!-- TOP FULL DIVIDER -->
    <div class="w-full h-px bg-gray-400"></div>

    <!-- GREEN RIBBON HEADER -->
    <div 
  class="w-full flex justify-center py-6"
  style="background-color:#2e7d32;"
>
      <h1
        style="font-size:1.5rem; font-weight:750; color:#ffffff;"
        class="text-center"
      >
        LIBRARY PERSONNEL
      </h1>
    </div>

    <!-- Patterned Featured Section -->
    <div class="featured-section w-full py-20">

      <div class="px-4 sm:px-6 lg:px-8 flex flex-col items-center">

        <!-- Featured Person -->
        <div v-if="staff.length > 0" class="max-w-4xl w-full mx-auto">

          <div class="flex flex-col items-center text-center">

            <!-- Circle -->
            <div class="relative w-44 h-44 mb-20 rounded-full overflow-visible">

              <div class="absolute inset-0 rounded-full bg-green-800 border-4 border-green-600 shadow-md"></div>

              <img
                :src="staff[0].image"
                :alt="staff[0].name"
                class="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-56 object-cover rounded-full transition-transform duration-300 hover:scale-105"
              />

            </div>

            <!-- Info -->
            <div class="mt-4">
              <h2 style="font-size:1rem; font-weight:800; color:#1b5e20">
                {{ staff[0].name }}
              </h2>

              <p class="text-sm text-gray-600 italic mt-2">
                {{ staff[0].subtitle }}
              </p>

              <p
                v-if="staff[0].position"
                style="font-size:1rem; font-weight:800; color:#1b5e20"
                class="mt-2"
              >
                {{ staff[0].position }}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>

    <!-- BOTTOM FULL DIVIDER -->
    <div class="w-full h-px bg-gray-400"></div>

    <!-- Other Staff Section -->
    <div class="px-4 sm:px-6 lg:px-8 py-20">

      <div class="class=max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 justify-items-center items-start">

        <div
          v-for="person in staff.slice(1)"
          :key="person.id"
          class="flex flex-col items-center text-center w-full max-w-sm"
        >

          <div class="relative w-44 h-44 mb-16 rounded-full overflow-visible">

            <div class="absolute inset-0 rounded-full bg-green-800 border-4 border-green-600 shadow-md"></div>

            <img
              :src="person.image"
              :alt="person.name"
              class="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-56 object-cover rounded-full transition-transform duration-300 hover:scale-105"
            />

          </div>

          <div>
            <h3 style="font-size:1rem; font-weight:800; color:#1b5e20">
              {{ person.name }}
            </h3>

            <p class="text-sm text-gray-600 italic mt-2">
              {{ person.subtitle }}
            </p>

            <p
              v-if="person.position"
              class="text-sm font-semibold text-gray-900 mt-2"
            >
              {{ person.position }}
            </p>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      staff: [
        {
          id: 1,
          name: "MARIA CORAZON L. TERCERA, RL",
          subtitle: "University Librarian",
          position: "Head, Library Services",
          image: "/cora.png"
        },
        {
          id: 2,
          name: "MERCY G. REYES, RL",
          subtitle: "Technical Librarian I",
          image: "mercy.png"
        },
        {
          id: 3,
          name: "ANN MARIE MONTE DE RAMOS, RL",
          subtitle: "Readers Services Librarian",
          image: "marie.png"
        },
        {
          id: 4,
          name: "JEHOVENN T. BERONGOY",
          subtitle: "Audio-Visual Technician",
          image: "berongoy.png"
        },
        {
          id: 5,
          name: "JORGE V. BAUTISTA",
          subtitle: "Public Assistance & Complaints Desk Officer",
          image: "jorge.png"
        },
        {
          id: 6,
          name: "JOHN WARREN S. BATONDO, LPT",
          subtitle: "Administrative Aide VI Clerk III",
          image: "warren.png"
        },
        {
          id: 7,
          name: "MALYN C. TRAYA",
          subtitle: "Technical Service Staff",
          image: "malyn.png"
        },
        {
          id: 8,
          name: "SABRENA MAE ELLEVERA",
          subtitle: "Periodical Service Staff",
          image: "sabrena.png"
        },
        {
          id: 9,
          name: "JASMIN D. PADILLA",
          subtitle: "Library Learning Spaces Staff",
          image: "jasmin.png"
        },
        {
          id: 10,
          name: "JHOGIE A. LAGARAS",
          subtitle: "Circulation Services Staff",
          image: "lagaras.png"
        }
      ]
    };
  }
};
</script>

<style scoped>
.featured-section {
  background-color: #f4f6f5;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(27,94,32,0.08) 0%, transparent 40%),
    radial-gradient(circle at 75% 75%, rgba(183,148,79,0.08) 0%, transparent 40%);
  background-size: 300px 300px;
}

img {
  transition: transform 0.3s ease;
}
</style>