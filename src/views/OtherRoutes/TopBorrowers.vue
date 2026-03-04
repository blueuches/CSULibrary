<template>
  <div class="w-full py-6 fade-in">

    <!-- ================= TOP BORROWERS ================= -->
    <section class="mt-5 px-6">

      <!-- Animated Title -->
      <transition appear name="fade">
        <h2 class="text-3xl tracking-normal text-center font-extrabold text-[#1B5E20] uppercase">
          Top Borrowers
        </h2>
      </transition>

      <div class="w-50 h-1 bg-yellow-500 mt-2 text-center mx-auto mb-6 rounded-full"></div>

      <!-- ================= MONTH FILTER ================= -->
      <div class="flex flex-wrap justify-center gap-2 mb-8">
        <button
          v-for="month in months"
          :key="month"
          @click="selectedMonth = month"
          :class="buttonClass(month)"
          class="month-btn"
        >
          {{ month }}
        </button>
      </div>

      <!-- ================= BORROWERS LIST ================= -->
      <transition-group
        name="rank"
        tag="div"
        class="space-y-4 mx-auto"
        style="width: 95%;"
      >
        <div
          v-for="(borrower, index) in filteredBorrowers"
          :key="borrower.name + index"
          :class="[
            'rank-card p-6 rounded-xl shadow flex justify-between items-center border',
            cardClass(index)
          ]"
          :style="{ animationDelay: index * 120 + 'ms' }"
        >

          <!-- LEFT SIDE -->
          <div class="flex items-center gap-4">

            <!-- Ranking Indicator -->
            <div class="w-10 h-10 flex items-center justify-center font-semibold text-lg">

              <template v-if="index === 0">
                <i class="fas fa-trophy text-2xl text-yellow-500 trophy-bounce"></i>
              </template>

              <template v-else-if="index === 1">
                <i class="fas fa-trophy text-2xl text-gray-400"></i>
              </template>

              <template v-else-if="index === 2">
                <i class="fas fa-trophy text-2xl text-gray-300"></i>
              </template>

              <template v-else>
                {{ index + 1 }}
              </template>

            </div>

            <!-- Initials -->
            <div
              class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-[#1B5E20] font-semibold avatar"
            >
              {{ getInitials(borrower.name) }}
            </div>

            <!-- Name + Details -->
            <div>
              <h3 class="font-semibold text-lg">
                {{ borrower.name }}
              </h3>

              <p class="text-sm text-gray-500">
                {{ borrower.department }}
              </p>

              <p class="text-sm text-gray-400">
                Favorite Genre: {{ borrower.genre }}
              </p>
            </div>

          </div>

          <!-- RIGHT SIDE -->
          <div class="flex flex-col items-center">
            <i class="fas fa-book-open text-2xl text-[#1B5E20] mb-1"></i>
            <span class="text-lg font-semibold text-[#1B5E20]">
              {{ borrower.books }} Books
            </span>
          </div>

        </div>
      </transition-group>

      <!-- Empty State -->
      <transition name="fade">
        <p v-if="filteredBorrowers.length === 0" class="text-center text-gray-500 mt-6">
          No borrowers found.
        </p>
      </transition>

    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

/* ================= FILTER DATA ================= */

const months = [
  "Jan", "Feb", "March", "April",
  "May", "June", "July", "Aug",
  "Sep", "Oct", "Nov", "Dec"
]

const selectedYear = ref("All")
const selectedMonth = ref("March")
const selectedDepartment = ref("All")

/* ================= BORROWERS DATA ================= */

const borrowers = [
  { name: "Juan Dela Cruz", books: 25, month: "March", year: "2026", department: "CCIS", genre: "Science Fiction" },
  { name: "Maria Santos", books: 21, month: "March", year: "2026", department: "CEGS", genre: "Romance" },
  { name: "Carlos Reyes", books: 18, month: "Feb", year: "2026", department: "CED", genre: "History" },
  { name: "Jonh Cruz", books: 18, month: "March", year: "2026", department: "CED", genre: "History" },
  { name: "Kim Taehyung", books: 18, month: "March", year: "2026", department: "CCIS", genre: "History" },
  { name: "Sample Student", books: 18, month: "March", year: "2026", department: "CHASS", genre: "History" },
  { name: "Xaiver Reyes", books: 18, month: "Feb", year: "2026", department: "CMNS", genre: "History" }
]

/* ================= FILTERED & SORTED ================= */

const filteredBorrowers = computed(() => {
  return borrowers
    .filter(b =>
      (selectedYear.value === "All" || b.year === selectedYear.value) &&
      (selectedMonth.value === "All" || b.month === selectedMonth.value) &&
      (selectedDepartment.value === "All" || b.department === selectedDepartment.value)
    )
    .sort((a, b) => b.books - a.books)
})

/* ================= HELPERS ================= */

const buttonClass = (month: string) => [
  "px-5 py-2 rounded-full border transition-all duration-300",
  selectedMonth.value === month
    ? "bg-[#1B5E20] text-white border-[#1B5E20] scale-105"
    : "bg-white text-gray-600 border-gray-300 hover:bg-green-100 hover:scale-105"
]

const cardClass = (index: number) => {
  if (index === 0) return "bg-yellow-50 border-l-4 border-yellow-400"
  if (index === 1) return "bg-gray-100 border-l-4 border-gray-400"
  if (index === 2) return "bg-white border-l-4 border-gray-300"
  return "bg-white border-transparent"
}

const getInitials = (name: string) =>
  name.split(" ").map(word => word[0]).join("").toUpperCase()
</script>

<style scoped>

/* ================= PAGE FADE ================= */

.fade-in {
  animation: pageFade 0.8s ease forwards;
}

@keyframes pageFade {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ================= TITLE FADE ================= */

.fade-enter-active {
  transition: opacity 0.8s ease;
}
.fade-enter-from {
  opacity: 0;
}

/* ================= LIST TRANSITION ================= */

.rank-enter-active,
.rank-leave-active {
  transition: all 0.4s ease;
}

.rank-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.rank-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ================= STAGGER CARD ================= */

.rank-card {
  animation: cardSlide 0.5s ease forwards;
  opacity: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

@keyframes cardSlide {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

.rank-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.15);
}

/* ================= TROPHY BOUNCE ================= */

.trophy-bounce {
  animation: bounce 1s infinite alternate;
}

@keyframes bounce {
  from { transform: translateY(0); }
  to { transform: translateY(-6px); }
}

/* ================= AVATAR HOVER ================= */

.avatar {
  transition: transform 0.3s ease;
}

.avatar:hover {
  transform: scale(1.1);
}

.month-btn {
  transition: all 0.3s ease;
}

</style>