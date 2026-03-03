<template>
  <div class="w-full bg-white">

    <!-- TOP DIVIDER -->
    <div class="w-full h-px bg-[#c69214]"></div>

    <!-- Ribbon Header -->
    <Ribbon>
      LIBRARY PERSONNEL
    </Ribbon>

    <!-- FEATURED STAFF SECTION -->
    <div class="featured-section w-full py-20 mt-3">
      <div class="px-4 sm:px-6 lg:px-8 flex flex-col items-center">

        <!-- Show only if featured staff exists -->
        <div v-if="featuredStaff" class="max-w-4xl w-full mx-auto">
          <div class="flex flex-col items-center text-center">

            <!-- Image Wrapper -->
            <div class="relative w-40 h-40 mb-1 rounded-full overflow-visible">
              <div
                class="absolute inset-0 rounded-full border-4 shadow-md"
                style="background-color:#0d2b0f; border-color:#66bb6a;"
              ></div>

              <img
                :src="featuredStaff.image"
                :alt="featuredStaff.name"
                class="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-56 object-cover rounded-full transition-transform duration-300 hover:scale-105"
              />
            </div>

            <!-- Staff Info -->
            <div class="mt-4">
              <h2 class="font-extrabold text-green-900 text-base">
                {{ featuredStaff.name }}
              </h2>

              <p class="text-sm text-gray-600 italic mt-2">
                {{ featuredStaff.subtitle }}
              </p>

              <p
                v-if="featuredStaff.position"
                class="font-extrabold text-green-900 text-base mt-2"
              >
                {{ featuredStaff.position }}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>

    <!-- BOTTOM DIVIDER -->
    <div class="w-full h-px bg-[#c69214]"></div>

    <!-- OTHER STAFF SECTION -->
    <div class="px-6 sm:px-8 lg:px-12 py-16 flex justify-center">
      <div class="w-full max-w-6xl bg-white rounded-xl shadow-md px-8 py-14">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 justify-items-center w-full">

          <!-- Simple v-for (NO template wrapper to avoid invalid end tag error) -->
          <div
            v-for="person in otherStaff"
            :key="person.id"
            class="flex flex-col items-center text-center w-full max-w-sm"
          >
            <div class="relative w-40 h-40 mb-1 rounded-full overflow-visible">
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

            <h3 class="font-extrabold text-green-900 text-base mt-2">
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

<script setup lang="ts">

// Import Vue core functions
import { ref, computed } from "vue";

// Import Ribbon component
import Ribbon from "@/components/Ribbon.vue";

// Import images correctly (Vite method)
import cora from "@/assets/images/personnelpage/cora.png";
import mercy from "@/assets/images/personnelpage/mercy.png";
import marie from "@/assets/images/personnelpage/marie.png";
import berongoy from "@/assets/images/personnelpage/berongoy.png";
import jorge from "@/assets/images/personnelpage/jorge.png";
import warren from "@/assets/images/personnelpage/warren.png";
import malyn from "@/assets/images/personnelpage/malyn.png";
import sabrena from "@/assets/images/personnelpage/sabrena.png";
import jasmin from "@/assets/images/personnelpage/jasmin.png";
import lagaras from "@/assets/images/personnelpage/lagaras.png";

/**
 * Interface defining the structure of a staff member.
 */
interface StaffMember {
  id: number;          // Unique identifier
  name: string;        // Full name
  subtitle: string;    // Job title
  position?: string;   // Optional higher role
  image: string;       // Image file path
}

/**
 * Reactive array of library staff.
 * First staff is displayed as featured.
 */
const staff = ref<StaffMember[]>([
  {
    id: 1,
    name: "MARIA CORAZON L. TERCERA, RL",
    subtitle: "University Librarian",
    position: "Head, Library Services",
    image: cora
  },
  { id: 2, name: "MERCY G. REYES, RL", subtitle: "Technical Librarian I", image: mercy },
  { id: 3, name: "ANN MARIE MONTE DE RAMOS, RL", subtitle: "Readers Services Librarian", image: marie },
  { id: 4, name: "JEHOVENN T. BERONGOY", subtitle: "Audio-Visual Technician", image: berongoy },
  { id: 5, name: "JORGE V. BAUTISTA", subtitle: "Public Assistance & Complaints Desk Officer", image: jorge },
  { id: 6, name: "JOHN WARREN S. BATONDO, LPT", subtitle: "Administrative Aide VI Clerk III", image: warren },
  { id: 7, name: "MALYN C. TRAYA", subtitle: "Technical Service Staff", image: malyn },
  { id: 8, name: "SABRENA MAE ELLEVERA", subtitle: "Periodical Service Staff", image: sabrena },
  { id: 9, name: "JASMIN D. PADILLA", subtitle: "Library Learning Spaces Staff", image: jasmin },
  { id: 10, name: "JHOGIE A. LAGARAS", subtitle: "Circulation Services Staff", image: lagaras }
]);

/**
 * Computed property returning the first staff member.
 * Used for the featured section.
 */
const featuredStaff = computed(() => staff.value[0]);

/**
 * Computed property returning all staff except the first.
 * Used for the other staff grid.
 */
const otherStaff = computed(() => staff.value.slice(1));

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
  max-width: 100%;
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