<template>
  <div class="flex h-screen w-full overflow-hidden bg-[#f5f3ef]">
    <Sidebar />

    <main class="reservation-root flex-1 overflow-y-auto">
      <!-- HEADER -->
      <header class="reservation-header intro-header">
        <div class="header-left">
          <div class="header-breadcrumb !mb-2">
            <span
              class="cursor-pointer hover:text-[#0d2b0f] transition-colors"
              @click="$router.push('/admin/services')"
              >BACK</span
            >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 5l7 7-7 7" />
            </svg>
            <span>RESERVATION MANAGEMENT</span>
          </div>

          <h1 class="header-title intro-title">
            AVR <span class="text-yellow-500"> Reservation</span>
          </h1>

          <p class="header-sub">
            Manage room occupancies, view schedules, and process faculty reservations.
          </p>
        </div>

        <div class="header-right">
          <div class="date-badge">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0
              002-2V7a2 2 0 00-2-2H5a2 2 0
              00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {{ currentDate }}
          </div>

          <button class="export-btn" @click="openBookingModal">+ New Booking</button>
        </div>
      </header>

      <!-- KPI -->
      <div class="reservation-kpi-strip">
        <div v-for="(stat, i) in roomStats" :key="i" class="reservation-kpi-card">
          <div
            class="reservation-kpi-icon"
            :style="{ background: stat.color + '18', color: stat.color }"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              v-html="stat.icon"
            ></svg>
          </div>

          <div class="reservation-kpi-body">
            <span class="reservation-kpi-label">{{ stat.label }}</span>
            <div class="reservation-kpi-value">{{ stat.value }}</div>
          </div>
        </div>
      </div>

      <div class="main-grid">
        <!-- LEFT -->
        <div class="col-left">
          <!-- ROOMS -->
          <div class="panel">
            <div class="panel-head">
              <div>
                <h2 class="panel-title">Real-Time Occupancy</h2>
                <p class="panel-sub">Current status of Audio-Visual facilities</p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="room in avrRooms"
                :key="room.id"
                class="rounded-xl p-4 border transition-all"
                :style="
                  room.status === 'Occupied'
                    ? 'border-color:#ffcdd2;background:#fff8f8'
                    : 'border-color:#c8e6c9;background:#f9fdf9'
                "
              >
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="font-black text-[#0d2b0f]">
                      {{ room.name }}
                    </h3>

                    <p class="text-xs text-gray-500">Capacity: {{ room.capacity }} pax</p>
                  </div>

                  <span
                    class="badge"
                    :class="room.status === 'Occupied' ? 'badge-red' : 'badge-green'"
                  >
                    {{ room.status }}
                  </span>
                </div>

                <div v-if="room.status === 'Occupied'" class="mb-4">
                  <p class="text-[10px] uppercase font-bold text-gray-400">Current Session</p>

                  <p class="text-xs font-bold text-[#1b5e20]">
                    {{ room.currentSession?.title }}
                  </p>

                  <p class="text-[10px] text-gray-500">
                    {{ room.currentSession?.time }}
                  </p>
                </div>

                <div v-else class="empty-state">No Active Session</div>

                <div class="flex gap-2 pt-3 border-t border-black/5">
                  <button class="btn-outline" @click="openScheduleModal(room)">View Sched</button>

                  <button
                    v-if="room.status === 'Occupied'"
                    class="btn-dark"
                    @click="openEndSessionModal(room)"
                  >
                    End Session
                  </button>

                  <button v-else class="btn-yellow" @click="openQuickBookModal(room)">
                    Quick Book
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- RESERVATIONS -->
          <div class="panel">
            <div class="panel-head">
              <h2 class="panel-title text-sm">Upcoming Reservations</h2>
            </div>

            <table class="report-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Activity</th>
                  <th>Requester</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="res in upcomingReservations" :key="res.id">
                  <td>{{ res.date }}</td>
                  <td>{{ res.activity }}</td>
                  <td>{{ res.requester }}</td>
                  <td>{{ res.status }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="col-right">
          <!-- STAFF CHECKLIST -->
          <div class="panel staff-panel">
            <h2 class="right-title font-bold mb-3 text-yellow-500" style="font-size: 1.1rem">
              Staff Checklist
            </h2>

            <ul class="staff-list">
              <li v-for="(step, i) in steps" :key="i">
                <span class="step-number">{{ i + 1 }}</span>
                {{ step }}
              </li>
            </ul>
          </div>

          <!-- AMENITIES / EQUIPMENT -->
          <div class="panel">
            <h2 class="panel-title text-sm">Equipment Check</h2>

            <div v-for="(item, i) in amenities" :key="i" class="equipment-row">
              <span class="equipment-name">
                {{ item.name }}
              </span>

              <span class="equipment-dot" :class="item.working ? 'dot-green' : 'dot-red'"> </span>
            </div>

            <button class="btn-outline mt-3 w-full" @click="openEquipmentModal">
              Update Inventory
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- NEW BOOKING MODAL -->
    <div v-if="showBookingModal" class="modal">
      <div class="modal-box">
        <h2 class="modal-title">New Reservation</h2>

        <input v-model="bookingForm.activity" placeholder="Activity" class="input" />
        <input v-model="bookingForm.requester" placeholder="Requester" class="input" />
        <input v-model="bookingForm.date" type="date" class="input" />
        <input v-model="bookingForm.time" placeholder="Time" class="input" />

        <div class="modal-actions">
          <button class="btn-cancel" @click="closeModal">Cancel</button>
          <button class="btn-confirm" @click="createBooking">Create</button>
        </div>
      </div>
    </div>

    <!-- QUICK BOOK MODAL -->
    <div v-if="showQuickBookModal" class="modal">
      <div class="modal-box">
        <h2 class="modal-title">Quick Book {{ selectedRoom?.name }}</h2>

        <input v-model="bookingForm.activity" placeholder="Session Title" class="input" />
        <input v-model="bookingForm.time" placeholder="Time" class="input" />

        <div class="modal-actions">
          <button class="btn-cancel" @click="closeModal">Cancel</button>
          <button class="btn-confirm" @click="confirmQuickBook">Start Session</button>
        </div>
      </div>
    </div>

    <!-- END SESSION -->
    <div v-if="showEndSessionModal" class="modal">
      <div class="modal-box text-center">
        <h2 class="modal-title">End Session?</h2>

        <p class="text-sm mb-4 p-5">This will free {{ selectedRoom?.name }}</p>

        <div class="modal-actions justify-center">
          <button class="btn-cancel" @click="closeModal">Cancel</button>
          <button
            class="btn-confirm-session bg-red-700 text-white font-semibold"
            style="padding: 10px; border-radius: 5px; font-size: 14px"
            @click="confirmEndSession"
          >
            End Session
          </button>
        </div>
      </div>
    </div>

    <!-- SCHEDULE -->
    <div v-if="showScheduleModal" class="modal">
      <div class="modal-box">
        <h2 class="modal-title">{{ selectedRoom?.name }} Schedule</h2>

        <p class="text-sm text-gray-500">Schedule preview will appear here.</p>

        <div class="modal-actions">
          <button class="btn-confirm" @click="closeModal">Close</button>
        </div>
      </div>
    </div>

    <!-- EQUIPMENT MODAL -->
    <div v-if="showEquipmentModal" class="modal">
      <div class="modal-box">
        <h2 class="modal-title">Update Equipment Inventory</h2>

        <!-- ADD EQUIPMENT -->
        <div class="flex gap-2 mb-4 items-center">
          <input
            v-model="newEquipment"
            placeholder="New equipment"
            class="input"
            style="height: 2.5rem; width: 80%; margin-bottom: 0"
          />
          <button class="btn-confirm-add" @click="addEquipment">Add</button>
        </div>

        <!-- EQUIPMENT LIST -->
        <div class="space-y-2 max-h-[200px] overflow-y-auto">
          <div v-for="(item, i) in amenities" :key="i" class="equipment-edit">
            <span>{{ item.name }}</span>

            <div class="flex gap-2">
              <button class="btn-cancel-inventory" @click="removeEquipment(i)">Delete</button>
            </div>
          </div>
        </div>

        <div class="btn-actions-inventory">
          <button class="btn-confirm" @click="showEquipmentModal = false">Done</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import '@/assets/styles/avr-reservation.css'
import Sidebar from '@/components/Sidebar.vue'

const showEquipmentModal = ref(false)
const newEquipment = ref('')

const currentDate = computed(() =>
  new Date().toLocaleDateString('en-PH', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
)

const avrRooms = ref([
  {
    id: 1,
    name: 'AVR Room 1',
    status: 'Occupied',
    capacity: 50,
    currentSession: {
      title: 'CSU Faculty Seminar',
      time: '8:00 AM - 12:00 PM',
    },
  },
  {
    id: 2,
    name: 'AVR Room 2',
    status: 'Available',
    capacity: 30,
    currentSession: null,
  },
])

const steps = [
  'Verify faculty/student ID',
  'Check approved reservation form',
  'Inspect projector and audio system',
  'Log start time in the system',
  'Check room condition after use',
]

const amenities = ref([
  { name: 'Projector', working: true },
  { name: 'Sound System', working: true },
  { name: 'Air Conditioning', working: true },
  { name: 'Wi-Fi Router', working: true },
  { name: '50 Chairs', working: true },
])

const roomStats = computed(() => {
  const available = avrRooms.value.filter((r) => r.status === 'Available').length
  const occupied = avrRooms.value.filter((r) => r.status === 'Occupied').length

  return [
    {
      label: 'Available Now',
      value: `${available} Rooms`,
      color: '#1b5e20',
      icon: '<path d="M5 13l4 4L19 7"/>',
    },
    { label: 'Occupied', value: `${occupied}`, color: '#c62828', icon: '<path d="M12 8v4l3 3"/>' },
    {
      label: "Today's Total",
      value: '8 Sessions',
      color: '#0277bd',
      icon: '<path d="M8 7V3m8 4V3"/>',
    },
    { label: 'Total Room', value: '2 Rooms', color: '#0277bd', icon: '<path d="M8 7V3m8 4V3"/>' },
  ]
})

const upcomingReservations = ref([
  {
    id: 101,
    date: 'March 24',
    activity: 'Thesis Defense',
    requester: 'BSIT-4',
    status: 'Confirmed',
  },
  { id: 102, date: 'March 25', activity: 'Seminar', requester: 'Faculty', status: 'Pending' },
])

const showBookingModal = ref(false)
const showQuickBookModal = ref(false)
const showEndSessionModal = ref(false)
const showScheduleModal = ref(false)

const selectedRoom = ref<any>(null)

const bookingForm = ref({
  activity: '',
  requester: '',
  date: '',
  time: '',
})

function openEquipmentModal() {
  showEquipmentModal.value = true
}

function addEquipment() {
  if (!newEquipment.value.trim()) return

  amenities.value.push({
    name: newEquipment.value,
    working: true,
  })

  newEquipment.value = ''
}

function removeEquipment(index: number) {
  amenities.value.splice(index, 1)
}

function openBookingModal() {
  showBookingModal.value = true
}

function openQuickBookModal(room: any) {
  selectedRoom.value = room
  showQuickBookModal.value = true
}

function openEndSessionModal(room: any) {
  selectedRoom.value = room
  showEndSessionModal.value = true
}

function openScheduleModal(room: any) {
  selectedRoom.value = room
  showScheduleModal.value = true
}

function closeModal() {
  showBookingModal.value = false
  showQuickBookModal.value = false
  showEndSessionModal.value = false
  showScheduleModal.value = false
}

function createBooking() {
  upcomingReservations.value.push({
    id: Date.now(),
    date: bookingForm.value.date,
    activity: bookingForm.value.activity,
    requester: bookingForm.value.requester,
    status: 'Pending',
  })

  closeModal()
}

function confirmQuickBook() {
  selectedRoom.value.status = 'Occupied'

  selectedRoom.value.currentSession = {
    title: bookingForm.value.activity || 'Walk-in Session',
    time: bookingForm.value.time || 'Now',
  }

  closeModal()
}

function confirmEndSession() {
  selectedRoom.value.status = 'Available'
  selectedRoom.value.currentSession = null

  closeModal()
}
</script>

<style scoped>
.col-left {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-box {
  background: white;
  padding: 35px;
  border-radius: 12px;
  width: 600px;
}

.modal-title {
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 16px;
}

.modal-actions {
  display: flex;
  gap: 10px;
  margin-top: 16px;
}

.input {
  width: 100%;
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 6px;
  margin-bottom: 10px;
  font-size: 13.5px;
}

.btn-confirm {
  background: #0d2b0f;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: bold;
}

.btn-cancel {
  background: #eee;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 13px;
}

.btn-outline {
  flex: 1;
  font-size: 13px;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 12px;
}

.btn-cancel-inventory {
  background-color: #c62828;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  transition: background 0.2s ease;
  border: none;
  cursor: pointer;
}

.btn-cancel-inventory:hover {
  background-color: #a50e0e;
}

.btn-confirm-add {
  background: #0d2b0f;
  color: white;
  height: 2.5rem;
  padding: 0 25px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.btn-confirm-add:hover {
  background: #1b5e20;
}

.btn-outline-inventory {
  margin-top: 0;
  font-size: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 8px 12px;
  background: white;
  cursor: pointer;
}

.btn-dark {
  flex: 1;
  font-size: 13px;
  background: #0d2b0f;
  color: white;
  border-radius: 6px;
  padding: 6px;
}

.btn-yellow {
  flex: 1;
  font-size: 13px;
  background: #f9a825;
  color: #0d2b0f;
  border-radius: 6px;
  padding: 6px;
}

.empty-state {
  text-align: center;
  border: 2px dashed #ddd;
  padding: 10px;
  font-size: 12px;
  color: #999;
}

.badge {
  font-size: 10px;
  padding: 4px 6px;
  border-radius: 4px;
  font-weight: bold;
}

.badge-red {
  background: #f8d7da;
  color: #721c24;
}

.badge-green {
  background: #d4edda;
  color: #155724;
}

.col-right {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.staff-panel {
  background: #0d2b0f;
  color: white;
}

.staff-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 12.5px;
}

.step-number {
  background: #f9a825;
  color: #0d2b0f;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 4px;
  margin-right: 6px;
}

.equipment-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #eee;
  font-size: 13.5px;
}

.equipment-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot-green {
  background: #2ecc71;
}

.dot-red {
  background: #e74c3c;
}

.equipment-edit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #eee;
  padding: 8px;
  border-radius: 6px;
  font-size: 12px;
}
</style>
