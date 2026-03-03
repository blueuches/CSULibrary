<template>
    <div class="w-full py-6 ">
        <!-- ================= TOP BORROWERS ================= -->
        <section class="mt-5 px-6">

            <h2 class="text-3xl tracking-normal text-start ms-10 font-extrabold text-[#1B5E20] uppercase">
                Top Borrowers
            </h2>
            <div class="w-50 h-1 bg-yellow-500 mt-2 text-start mb-4 ms-10 rounded-full"></div>

            <!-- <p class="text-start ms-10 text-gray-600 text-sm mb-2">
                These are the most active readers this month.
            </p> -->

            <div class="flex flex-wrap justify-start ms-10 gap-2 mb-8">
                <!-- Month Oval Buttons -->
                <button v-for="month in months" :key="month" @click="selectedMonth = month" :class="buttonClass(month)">
                    {{ month }}
                </button>
            </div>

            <!-- Borrowers List -->
            <div class="space-y-4 mx-auto" style="width: 95%;">
                <div v-for="(borrower, index) in filteredBorrowers" :key="borrower.name + index" :class="[
                    'p-6 rounded-xl shadow flex justify-between items-center hover:shadow-lg transition border',
                    cardClass(index)
                ]">

                    <!-- LEFT SIDE -->
                    <div class="flex items-center gap-4">

                        <!-- Position Indicator -->
                        <div class="w-10 h-10 flex items-center justify-center font-semibold text-gray-500 text-lg outline-amber-400">
                            <template v-if="index === 0">
                                <i class="fas fa-trophy text-2xl text-yellow-500"></i>
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
                            class="ms-3 w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-[#1B5E20] font-semibold">
                            {{ getInitials(borrower.name) }}
                        </div>

                        <!-- Name + Details -->
                        <div class="ms-5">
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
                    <div class="flex flex-col items-center me-5">
                        <i class="fas fa-book-open text-2xl text-[#1B5E20] w-6 h-6 mb-1"></i>   
                        <span class="text-lg font-semibold text-[#1B5E20]">
                            {{ borrower.books }} Books
                        </span>
                    </div>

                </div>

                <p v-if="filteredBorrowers.length === 0" class="text-center text-gray-500">
                    No borrowers found.
                </p>

            </div>

        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { BookOpen, Trophy } from "lucide-vue-next"
import Ribbon from "@/components/Ribbon.vue"


const cardClass = (index: number) => {
  if (index === 0) {
    return "bg-yellow-50 border-l-4 border-yellow-400"
  } else if (index === 1) {
    return "bg-gray-100 border-l-4 border-gray-400"
  } else if (index === 2) {
    return "bg-white border-l-4 border-gray-400"
  } else {
    return "bg-white border-transparent"
  }
}

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
    {
        name: "Juan Dela Cruz",
        books: 25,
        month: "March",
        year: "2026",
        department: "CCIS",
        genre: "Science Fiction"
    },
    {
        name: "Maria Santos",
        books: 21,
        month: "March",
        year: "2026",
        department: "CEGS",
        genre: "Romance"
    },
    {
        name: "Carlos Reyes",
        books: 18,
        month: "Feb",
        year: "2026",
        department: "CED",
        genre: "History"
    },
    {
        name: "Jonh Cruz",
        books: 18,
        month: "March",
        year: "2026",
        department: "CED",
        genre: "History"
    },
    {
        name: "Kim Taehyung ",
        books: 18,
        month: "March",
        year: "2026",
        department: "CCIS",
        genre: "History"
    },
    {
        name: "Sample Student",
        books: 18,
        month: "March",
        year: "2026",
        department: "CHASS",
        genre: "History"
    },
    {
        name: "Xaiver Reyes",
        books: 18,
        month: "Feb",
        year: "2026",
        department: "CMNS",
        genre: "History"
    }
]

/* ================= COMPUTED FILTER ================= */
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
    "px-5 py-2 rounded-full border transition",
    selectedMonth.value === month
        ? "bg-[#1B5E20] text-white border-[#1B5E20]"
        : "bg-white text-gray-600 border-gray-300 hover:bg-green-100"
]

const getInitials = (name: string) => {
    return name
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase()
}
</script>

<style scoped></style>