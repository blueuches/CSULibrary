<template>
  <div class="w-full bg-white">

    <!-- TOP FULL DIVIDER -->
    <div class="w-full h-px bg-[#c69214]"></div>

    <!-- Ribbon -->
    <div class="csu-ribbon-wrap">
      <div class="page-inner">
        <div class="csu-ribbon">
          <span class="csu-ribbon-title">
            LIBRARY PERSONNEL
          </span>
        </div>
      </div>
    </div>

    <!-- Patterned Featured Section -->
    <div class="featured-section w-full py-20">
      <div class="px-4 sm:px-6 lg:px-8 flex flex-col items-center">

        <div v-if="staff.length > 0" class="max-w-4xl w-full mx-auto">
          <div class="flex flex-col items-center text-center">

            <div class="relative w-40 h-40 mb-20 rounded-full overflow-visible">
              <div 
                class="absolute inset-0 rounded-full border-4 shadow-md"
                style="background-color:#0d2b0f; border-color:#66bb6a;"
              ></div>

              <img
                :src="staff[0].image"
                :alt="staff[0].name"
                class="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-56 object-cover rounded-full transition-transform duration-300 hover:scale-105"
              />
            </div>

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
    <div class="w-full h-px bg-[#c69214]"></div>

    <!-- Other Staff Section -->
    <div class="px-6 sm:px-8 lg:px-12 py-16 flex justify-center">
      <div class="w-full max-w-6xl bg-white rounded-xl shadow-md px-8 py-14 
                  flex flex-col justify-center items-center">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 justify-items-center w-full">

          <template v-for="(person, index) in staff.slice(1)" :key="person.id">

            <div class="flex flex-col items-center text-center w-full max-w-sm">

              <div class="relative w-40 h-40 mb-14 rounded-full overflow-visible">

                <div 
                  class="absolute inset-0 rounded-full border-4 shadow-md"
                  style="background-color:#0d2b0f; border-color:#66bb6a;"
                ></div>

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

            <div 
              v-if="(index + 1) % 2 === 0 && index !== staff.slice(1).length - 1"
              class="col-span-1 md:col-span-2 border-t bg-[#c69214] mt-8 w-full"
            ></div>

          </template>

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
          image: "/src/assets/images/personnelpage/cora.png"
        },
        {
          id: 2,
          name: "MERCY G. REYES, RL",
          subtitle: "Technical Librarian I",
          image: "/src/assets/images/personnelpage/mercy.png"
        },
        {
          id: 3,
          name: "ANN MARIE MONTE DE RAMOS, RL",
          subtitle: "Readers Services Librarian",
          image: "/src/assets/images/personnelpage/marie.png"
        },
        {
          id: 4,
          name: "JEHOVENN T. BERONGOY",
          subtitle: "Audio-Visual Technician",
          image: "/src/assets/images/personnelpage/berongoy.png"
        },
        {
          id: 5,
          name: "JORGE V. BAUTISTA",
          subtitle: "Public Assistance & Complaints Desk Officer",
          image: "/src/assets/images/personnelpage/jorge.png"
        },
        {
          id: 6,
          name: "JOHN WARREN S. BATONDO, LPT",
          subtitle: "Administrative Aide VI Clerk III",
          image: "/src/assets/images/personnelpage/warren.png"
        },
        {
          id: 7,
          name: "MALYN C. TRAYA",
          subtitle: "Technical Service Staff",
          image: "/src/assets/images/personnelpage/malyn.png"
        },
        {
          id: 8,
          name: "SABRENA MAE ELLEVERA",
          subtitle: "Periodical Service Staff",
          image: "/src/assets/images/personnelpage/sabrena.png"
        },
        {
          id: 9,
          name: "JASMIN D. PADILLA",
          subtitle: "Library Learning Spaces Staff",
          image: "/src/assets/images/personnelpage/jasmin.png"
        },
        {
          id: 10,
          name: "JHOGIE A. LAGARAS",
          subtitle: "Circulation Services Staff",
          image: "/src/assets/images/personnelpage/lagaras.png"
        }
      ]
    };
  }
};
</script>

<style>
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

/* =========================
   Ribbon (EXACT About Style)
========================= */

.page-inner {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 20px;
}

.csu-ribbon-wrap {
  width: 100%;
  padding: 12px 0 8px;
  position: relative;
}

.csu-ribbon {
  position: relative;
  width: 100%;
  height: 48px;
  background: #1f5e23;
  display: flex;
  align-items: center;
  justify-content: center;
}

.csu-ribbon::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 34px;
  height: 48px;
  background: #f4f6f5;
  clip-path: polygon(0 50%, 100% 0, 100% 100%);
}

.csu-ribbon::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 0;
  border-top: 10px solid #17491b;
  border-right: 12px solid transparent;
}

.csu-ribbon-title {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 2;
  margin: 0;
  text-align: center;
  color: #fff;
  font-weight: 800;
  font-size: 1.2rem;
  line-height: 48px;
  letter-spacing: 0.3px;
}
</style>