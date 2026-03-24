<template>
  <div class="flex h-screen w-full overflow-hidden bg-[#f5f3ef]">
    <Sidebar />

    <main class="reservation-root flex-1 overflow-y-auto">
      <!-- HEADER -->
      <header class="reservation-header intro-header">
        <div class="header-left">
          <div class="header-breadcrumb !mb-2">
            <span class="cursor-pointer hover:text-[#0d2b0f] transition-colors"
              @click="$router.push('/admin/services')">BACK</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 5l7 7-7 7" />
            </svg>
            <span>RESERVATION MANAGEMENT</span>
          </div>

          <h1 class="header-title intro-title">
            Room <span class="text-yellow-500"> Reservation</span>
          </h1>

          <p class="header-sub">
            Manage room occupancies, view schedules, and process faculty reservations.
          </p>
        </div>

        <div class="header-right">
          <div class="date-badge">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0
              002-2V7a2 2 0 00-2-2H5a2 2 0
              00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ currentDate }}
          </div>

          <button class="export-btn" @click="openModal('booking')">+ New Booking</button>
        </div>
      </header>

      <!-- KPI -->
      <div class="reservation-kpi-strip">
        <div v-for="(stat, i) in roomStats" :key="i" class="reservation-kpi-card flex items-center gap-3">
          <!-- ICON -->
          <div class="reservation-kpi-icon kpi-reservation-icon flex items-center justify-center"
            :style="{ background: stat.color + '18', color: stat.color }">
            <i :class="stat.icon"></i>
          </div>

          <!-- VALUE -->
          <div class="reservation-kpi-body">
            <div class="reservation-kpi-value">
              {{ stat.value }}
            </div>
            <span class="reservation-kpi-label">
              {{ stat.label }}
            </span>
          </div>
        </div>
      </div>

      <div class="main-grid">
        <!-- LEFT -->
        <div class="col-left">
          <!-- ROOMS -->
          <div class="panel">
            <div class="panel-head flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 class="panel-title font-black text-[#0d2b0f] uppercase text-sm tracking-tighter">Real-Time Occupancy
                </h2>
                <p class="panel-sub text-[10px] text-gray-400">Viewing: {{ activeFloor }} Floor | {{ activeWing }} Wing
                </p>
              </div>

              <div class="flex flex-wrap gap-2">
                <div class="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                  <button v-for="f in ['2nd Floor', '3rd Floor']" :key="f" @click="activeFloor = f"
                    :class="activeFloor === f ? 'bg-[#0d2b0f] text-white shadow-sm' : 'text-gray-500 hover:bg-gray-200'"
                    class="px-3 py-1 text-[10px] font-black rounded-md transition-all uppercase">
                    {{ f.replace(' Floor', '') }} </button>
                </div>

                <div class="flex bg-yellow-100 p-1 rounded-lg border border-yellow-200">
                  <button v-for="w in ['Left Wing', 'Right Wing']" :key="w" @click="activeWing = w"
                    :class="activeWing === w ? 'bg-yellow-500 text-[#0d2b0f] shadow-sm' : 'text-yellow-700 hover:bg-yellow-200'"
                    class="px-3 py-1 text-[10px] font-black rounded-md transition-all uppercase">
                    {{ w.replace(' Wing', '') }} Wing
                  </button>
                </div>
              </div>
            </div>

            <div class="overflow-y-auto pr-2 max-h-125 custom-scroll">
              <div v-if="filteredRooms.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="room in filteredRooms" :key="room.id" class="rounded-xl p-4 border transition-all"
                  :style="room.status === 'Occupied' ? 'border-color:#ffcdd2;background:#fff8f8' : 'border-color:#c8e6c9;background:#f9fdf9'">

                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <div class="flex items-center gap-2">
                        <i :class="getRoomIcon(room.room_type)"></i>
                        <h3 class="font-black text-[#0d2b0f]">{{ room.name }}</h3>
                      </div>
                      <p class="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">
                        {{ room.floor }} Floor • {{ room.wing }} Wing • {{ formatRoomType(room.room_type) }}
                      </p>
                    </div>
                    <span class="badge px-2 py-1 rounded text-[9px] font-black uppercase"
                      :class="room.status === 'Occupied' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'">
                      {{ room.status }}
                    </span>
                  </div>

                  <div v-if="room.status === 'Occupied'" class="mb-4 bg-white/50 p-2 rounded border border-red-100">
                    <p class="text-[10px] uppercase font-bold text-gray-400">Current Session</p>
                    <p class="text-xs font-bold text-[#1b5e20]">{{ room.currentSession?.title }}</p>
                    <p class="text-[10px] text-gray-500">{{ room.currentSession?.time }}</p>
                  </div>
                  <div v-else
                    class="empty-state mb-4 py-2 border border-dashed border-gray-200 rounded text-center text-[10px] text-gray-400 italic">
                    No Active Session</div>

                  <div class="flex gap-2 pt-3 border-t border-black/5">
                    <button class="btn-outline flex-1 border border-gray-300 py-1.5 rounded text-[10px] font-bold"
                      @click="openModal('schedule', room)">View Sched</button>
                    <button v-if="room.status === 'Occupied'"
                      class="btn-dark flex-1 bg-[#0d2b0f] text-white py-1.5 rounded text-[10px] font-bold"
                      @click="openModal('endSession', room)">End Session</button>
                    <button v-else
                      class="btn-yellow flex-1 bg-yellow-500 text-[#0d2b0f] py-1.5 rounded text-[10px] font-bold"
                      @click="openModal('quickBook', room)">Quick Book</button>
                  </div>
                </div>
              </div>

              <div v-else class="py-20 text-center border-2 border-dashed rounded-2xl">
                <p class="text-gray-400 font-bold uppercase text-xs tracking-widest text-balance">No rooms found in the
                  {{ activeWing }} Wing of the {{ activeFloor }} Floor.</p>
              </div>
            </div>
          </div>

          <div class="panel">
            <div class="panel-head flex justify-between items-center">
              <h2 class="panel-title text-sm">Recent & Upcoming Reservations</h2>
              <span class="text-[10px] text-gray-400">Total: {{ upcomingReservations.length }}</span>
            </div>

            <div class="table-container">
              <table class="report-table">
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>Activity / Purpose</th>
                    <th>Requester (ID)</th>
                    <th>Status</th>
                    <th class="text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="res in upcomingReservations" :key="res.id">
                    <td class="text-[11px]">
                      <div class="font-bold">{{ res.date }}</div>
                      <div class="text-gray-500">{{ res.time }}</div>
                    </td>

                    <td>
                      <div class="font-medium">{{ res.activity }}</div>
                      <div class="text-[10px] text-gray-400 italic">Room: {{ res.room_name }}</div>
                    </td>

                    <td class="text-[11px]">{{ res.requester }}</td>

                    <td>
                      <span :class="['badge', res.status.toLowerCase()]">
                        {{ res.status }}
                      </span>
                    </td>

                    <td class="text-right">
                      <div class="flex justify-end gap-3">

                        <button v-if="res.status === 'pending'" @click="updateStatus(res.id, 'reserved')"
                          class="btn-accept">
                          <i class="fas fa-check mr-1"></i> Accept
                        </button>

                        <button @click="deleteReservation(res.id)" class="btn-delete">
                          <i class="fas fa-trash-alt mr-1"></i> Delete
                        </button>

                      </div>
                    </td>



                  </tr>

                  <tr v-if="upcomingReservations.length === 0">
                    <td colspan="5" class="text-center py-10 text-gray-400">No reservations found.</td>
                  </tr>
                </tbody>
              </table>
            </div>


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

            <button class="btn-outline mt-3 w-full" @click="openModal('equipment')">
              Update Inventory
            </button>
          </div>
        </div>
      </div>
    </main>

    <div v-if="modals.booking" class="modal">
      <div class="modal-box max-w-2xl">
        <div class="flex justify-between items-center mb-6">
          <h2 class="modal-title text-2xl font-bold text-gray-800">New Reservation</h2>
          <div class="text-right">
            <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
              {{ selectedRoom?.name }}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div class="space-y-4">
            <div class="p-3 bg-gray-50 rounded-lg border border-gray-200 grid grid-cols-2 gap-2">
              <div>
                <label class="text-[10px] font-bold uppercase text-gray-400">Floor / Wing</label>
                <p class="text-sm font-semibold">{{ selectedRoom?.floor }} - {{ selectedRoom?.wing }}</p>
              </div>
              <div>
                <label class="text-[10px] font-bold uppercase text-gray-400">Room Type</label>
                <p class="text-sm font-semibold capitalize">{{ selectedRoom?.room_type?.replace('_', ' ') }}</p>
              </div>
            </div>

            <div>
              <label class="text-[10px] font-bold uppercase text-gray-500">Purpose of Use</label>
              <input v-model="bookingForm.activity" placeholder="e.g. Thesis Defense" class="input" />
            </div>

            <div>
              <label class="text-[10px] font-bold uppercase text-gray-500">Representative (Requester)</label>
              <input v-model="bookingForm.requester" list="student-ids" placeholder="Type ID Number" class="input" />
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="text-[10px] font-bold uppercase text-gray-400">College (Auto)</label>
                <input v-model="bookingForm.program" readonly class="input bg-gray-100 text-xs" />
              </div>
              <div>
                <label class="text-[10px] font-bold uppercase text-gray-400">Year (Auto)</label>
                <input v-model="bookingForm.year_level" readonly class="input bg-gray-100 text-xs" />
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div class="p-4 border rounded-lg bg-blue-50/50 border-blue-100">
              <label class="text-[10px] font-bold uppercase text-blue-600 block mb-2">Group Members
                (Participants)</label>
              <div class="flex gap-2">
                <input list="student-ids" id="participant-input" placeholder="Search by ID"
                  class="input flex-1 bg-white" />
                <button @click="handleAddParticipantFromInput('participant-input')"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm transition-colors">Add</button>
              </div>

              <div class="flex flex-wrap gap-2 mt-3 max-h-[100px] overflow-y-auto">
                <div v-for="p in selectedParticipants" :key="p.id_number"
                  class="bg-white border border-blue-200 text-blue-700 px-2 py-1 rounded text-[11px] flex items-center shadow-sm">
                  {{ p.last_name }}, {{ p.first_name[0] }}.
                  <button @click="removeParticipant(p.id_number)"
                    class="ml-2 text-red-500 font-bold hover:text-red-700">×</button>
                </div>
                <span v-if="selectedParticipants.length === 0" class="text-[10px] text-gray-400 italic">No members added
                  yet.</span>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-3">
              <div>
                <label class="text-[10px] font-bold uppercase text-gray-500">Date</label>
                <input v-model="bookingForm.date" type="date" class="input" />
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="text-[10px] font-bold uppercase text-gray-500">Start Time</label>
                  <input v-model="bookingForm.time" type="time" class="input" />
                </div>
                <div>
                  <label class="text-[10px] font-bold uppercase text-gray-500">End Time</label>
                  <input v-model="bookingForm.endTime" type="time" class="input" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-actions mt-8 pt-4 border-t border-gray-100">
          <button class="btn-cancel" @click="closeModals">Cancel</button>
          <button class="btn-confirm w-full md:w-auto px-10" @click="createBooking">Create Reservation</button>
        </div>
      </div>
    </div>

    <div v-if="modals.quickBook" class="modal">
      <div class="modal-box">
        <h2 class="modal-title text-xl font-bold mb-4">Quick Book: {{ selectedRoom?.name }}</h2>

        <div class="space-y-3">
          <label class="text-[10px] font-bold uppercase text-gray-500">Session Title</label>
          <input v-model="bookingForm.activity" placeholder="Walk-in Session" class="input" />

          <label class="text-[10px] font-bold uppercase text-gray-500">Requester ID</label>
          <input v-model="bookingForm.requester" list="student-ids" placeholder="Enter ID Number" class="input" />

          <div class="border-t pt-3 mt-3">
            <label class="text-[10px] font-bold uppercase text-gray-500">Add Companions</label>
            <div class="flex gap-2">
              <input list="student-ids" id="quick-part-input" placeholder="Search Member ID" class="input text-xs" />
              <button @click="handleAddParticipantFromInput('quick-part-input')"
                class="bg-gray-800 text-white px-3 py-1 rounded text-xs">Add</button>
            </div>
            <div class="flex flex-wrap gap-1 mt-2">
              <div v-for="p in selectedParticipants" :key="p.id_number"
                class="bg-gray-100 px-2 py-0.5 rounded text-[10px] flex items-center">
                {{ p.id_number }} <button @click="removeParticipant(p.id_number)" class="ml-1 text-red-500">×</button>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2 pt-2">
            <div>
              <label class="text-[10px] font-bold uppercase text-gray-500">Starts At</label>
              <input v-model="bookingForm.time" type="time" class="input" />
            </div>
            <div>
              <label class="text-[10px] font-bold uppercase text-gray-500">Ends At</label>
              <input v-model="bookingForm.endTime" type="time" class="input" />
            </div>
          </div>
        </div>

        <div class="modal-actions mt-6">
          <button class="btn-cancel" @click="closeModals">Cancel</button>
          <button class="btn-confirm" @click="confirmQuickBook">Start Session Now</button>
        </div>
      </div>
    </div>

    <datalist id="student-ids">
      <option v-for="std in studentsList" :key="std.id_number" :value="std.id_number">
        {{ std.last_name }}, {{ std.first_name }} ({{ std.program }})
      </option>
    </datalist>

    <!-- END SESSION -->
    <div v-if="modals.endSession" class="modal">
      <div class="modal-box text-center">
        <h2 class="modal-title">End Session?</h2>

        <p class="text-sm mb-4 p-5">This will free {{ selectedRoom?.name }}</p>

        <div class="modal-actions justify-center">
          <button class="btn-cancel" @click="closeModals">Cancel</button>
          <button class="btn-confirm-session bg-red-700 text-white font-semibold"
            style="padding: 10px; border-radius: 5px; font-size: 14px" @click="confirmEndSession">
            End Session
          </button>
        </div>
      </div>
    </div>

    <!-- SCHEDULE -->
    <div v-if="modals.schedule" class="modal">
      <div class="modal-box">
        <h2 class="modal-title">{{ selectedRoom?.name }} Schedule</h2>

        <p class="text-sm text-gray-500">Schedule preview will appear here.</p>

        <div class="modal-actions">
          <button class="btn-confirm" @click="closeModals">Close</button>
        </div>
      </div>
    </div>

    <!-- EQUIPMENT MODAL -->
    <div v-if="modals.equipment" class="modal">
      <div class="modal-box">
        <h2 class="modal-title">Update Equipment Inventory</h2>

        <!-- ADD EQUIPMENT -->
        <div class="flex gap-2 mb-4 items-center">
          <input v-model="newEquipment" placeholder="New equipment" class="input"
            style="height: 2.5rem; width: 80%; margin-bottom: 0" />
          <button class="btn-confirm-add" @click="addEquipment">Add</button>
        </div>

        <!-- EQUIPMENT LIST -->
        <div class="space-y-2 max-h-50 overflow-y-auto">
          <div v-for="(item, i) in amenities" :key="i" class="equipment-edit">
            <span>{{ item.name }}</span>

            <div class="flex gap-2">
              <button class="btn-cancel-inventory" @click="removeEquipment(i)">Delete</button>
            </div>
          </div>
        </div>

        <div class="btn-actions-inventory">
          <button class="btn-confirm" @click="closeModals">Done</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import { supabase } from '@/lib/supabase'
import '@/assets/styles/avr-reservation.css'
import { watch } from 'vue'

/* =====================================================
  TYPES
===================================================== */
interface Session {
  title: string
  time: string
}

interface Room {
  id: string
  name: string
  floor: string
  wing: string
  room_type: string
  capacity: number
  max_duration_minutes: number
  created_at: string

  // frontend-only
  status: 'Available' | 'Occupied'
  currentSession?: Session | null
}

interface Reservation {
  id: string
  date: string
  activity: string
  requester: string
  status: string
}

interface Equipment {
  name: string
  working: boolean
}

/* =====================================================
  VIEW STATE
===================================================== */
const activeFloor = ref('2nd Floor')
const activeWing = ref('Left Wing')
const studentsList = ref<any[]>([])
const selectedParticipants = ref<any[]>([])
const participantSearch = ref('')

/* =====================================================
  MODALS
===================================================== */
const modals = ref({
  booking: false,
  quickBook: false,
  endSession: false,
  schedule: false,
  equipment: false,
})

const selectedRoom = ref<Room | null>(null)

/* =====================================================
  FORMS
===================================================== */
const bookingForm = ref({
  room_id: null as string | null,
  requester: '',      // Student ID
  program: '',        // Automatic
  year_level: '',           // Automatic
  activity: '',       // Purpose
  date: '',
  time: '',
  endTime: '',
  status: 'reserved',
})

const newEquipment = ref('')


watch(() => bookingForm.value.requester, (newId) => {
  const student = studentsList.value.find(s => s.id_number === newId)

  console.log("Searching for ID:", newId)
  console.log("Found Student:", student)

  if (student) {
    bookingForm.value.program = student.program ?? 'N/A'
    bookingForm.value.year_level = student.year_level ?? 'N/A'
  } else {
    bookingForm.value.program = ''
    bookingForm.value.year_level = ''
  }
})
/* =====================================================
  DATA (FROM DB)
===================================================== */
const rooms = ref<Room[]>([])
const upcomingReservations = ref<Reservation[]>([])

const amenities = ref<Equipment[]>([
  { name: 'Projector', working: true },
  { name: 'Sound System', working: true },
  { name: 'Air Conditioning', working: true },
  { name: 'Wi-Fi Router', working: true },
  { name: '50 Chairs', working: true },
])

const steps = [
  'Verify faculty/student ID',
  'Check approved reservation form',
  'Inspect projector and audio system',
  'Log start time in the system',
  'Check room condition after use',
]

/* =====================================================
  FETCH ROOMS FROM DB
===================================================== */
async function fetchRooms() {
  const { data, error } = await supabase
    .from('rooms')
    .select(`
      *,
      room_reservations (
        status,
        purpose,
        start_time,
        end_time
      )
    `)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching rooms:', error)
    return
  }


  rooms.value = data.map((r: any) => {
    const activeRes = r.room_reservations?.find((res: any) => res.status === 'ongoing')
    const displayStatus = activeRes ? 'Occupied' : 'Available'

    return {
      id: r.id,
      name: r.name,
      floor: r.floor,
      wing: r.wing,
      room_type: r.room_type,
      capacity: r.capacity,
      max_duration_minutes: r.max_duration_minutes,
      created_at: r.created_at,
      status: displayStatus,


      currentSession: activeRes ? {
        title: activeRes.purpose,
        time: `${activeRes.start_time} - ${activeRes.end_time}`
      } : null
    }
  })
}

/* =====================================================
  HELPERS
===================================================== */
function formatRoomType(type: string) {
  return type.replace('_', ' ').toUpperCase()
}

function getRoomIcon(type: string) {
  switch (type) {
    case 'discussion': return 'fas fa-users'
    case 'nap_pad': return 'fas fa-bed'
    case 'quiet_room': return 'fas fa-book'
    case 'multimedia': return 'fas fa-tv'
    default: return 'fas fa-door-open'
  }
}



/* =====================================================
  COMPUTED
===================================================== */
const filteredRooms = computed(() =>
  rooms.value.filter(
    (room) =>
      room.floor === activeFloor.value &&
      room.wing === activeWing.value
  )
)

const currentDate = computed(() =>
  new Date().toLocaleDateString('en-PH', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
)

async function fetchStudents() {
  const { data, error } = await supabase
    .from('students')
    .select('id_number, first_name, last_name, program, year_level')
    .order('last_name', { ascending: false })

  if (error) {
    console.error('Error:', error.message)
    return
  }

  studentsList.value = data || []
}

const roomStats = computed(() => {
  const total = rooms.value.length
  const occupied = rooms.value.filter(r => r.status === 'Occupied').length
  const available = total - occupied
  const rate = total ? Math.round((occupied / total) * 100) : 0

  return [
    {
      label: 'Available',
      value: available,
      color: '#1b5e20',
      icon: 'fas fa-door-open'
    },
    {
      label: 'Occupied',
      value: occupied,
      color: '#c62828',
      icon: 'fas fa-user-clock'
    },
    {
      label: 'Rate',
      value: rate + '%',
      color: '#0277bd',
      icon: 'fas fa-percentage'
    },
    {
      label: 'Total',
      value: total,
      color: '#f9a825',
      icon: 'fas fa-building'
    }
  ]
})

/* =====================================================
  MODALS
===================================================== */
function openModal(type: keyof typeof modals.value, room?: Room) {
  if (room) selectedRoom.value = room
  modals.value[type] = true
}



function closeModals() {
  Object.keys(modals.value).forEach(key => {
    modals.value[key as keyof typeof modals.value] = false
  })
  selectedParticipants.value = [];
}

/* =====================================================
  EQUIPMENT
===================================================== */
function addEquipment() {
  if (!newEquipment.value.trim()) return
  amenities.value.push({ name: newEquipment.value, working: true })
  newEquipment.value = ''
}

function removeEquipment(index: number) {
  amenities.value.splice(index, 1)
}

/* =====================================================
  BOOKINGS (DB)
===================================================== */
async function createBooking() {
  const { data: reservationData, error: resError } = await supabase
    .from('room_reservations')
    .insert([{
      room_id: selectedRoom.value?.id || null,
      representative_student_id: bookingForm.value.requester,
      booking_date: bookingForm.value.date,
      start_time: bookingForm.value.time,
      end_time: bookingForm.value.endTime,
      purpose: bookingForm.value.activity,
      status: 'pending',
      program: bookingForm.value.program,
      year_level: bookingForm.value.year_level
    }])
    .select()
    .single()

  if (resError) {
    alert("Error: " + resError.message)
    return
  }


  if (selectedParticipants.value.length > 0) {
    const participantsData = selectedParticipants.value.map(student => ({
      reservation_id: reservationData.id,
      student_id: student.id_number
    }))

    const { error: partError } = await supabase
      .from('room_reservation_participants')
      .insert(participantsData)

    if (partError) console.error('Error adding participants:', partError.message)
  }

  alert("Reservation with participants saved!")
  selectedParticipants.value = [] 
  await fetchRooms()
  await fetchUpcomingReservations()
  closeModals()
}


/* =====================================================
  SESSION (TEMP FRONTEND ONLY)
===================================================== */
async function confirmQuickBook() {
  if (!selectedRoom.value) return

  const now = new Date()
  const currentTime = now.toTimeString().split(' ')[0]
  const end = new Date(now.getTime() + (120 * 60000))
  const endTime = end.toTimeString().split(' ')[0]

  const { error } = await supabase
    .from('room_reservations')
    .insert([
      {
        room_id: selectedRoom.value.id,
        representative_student_id: bookingForm.value.requester,
        booking_date: now.toISOString().split('T')[0],
        start_time: currentTime,
        end_time: endTime,
        purpose: bookingForm.value.activity || 'Quick Session',
        status: 'ongoing',
        program: bookingForm.value.program,
        year_level: bookingForm.value.year_level
      }
    ])

  if (error) {
    alert("Error: " + error.message)
    return
  }

  await fetchRooms()
  await fetchUpcomingReservations()
  closeModals()
}

/* =====================================================
  PARTICIPANT LOGIC
===================================================== */
// Helper to handle the "Add" button click in modals
function handleAddParticipantFromInput(inputId: string) {
  const input = document.getElementById(inputId) as HTMLInputElement;
  const idValue = input.value;

  if (!idValue) return;

  const student = studentsList.value.find(s => s.id_number === idValue);

  if (student) {
    // Check if they are already the requester
    if (idValue === bookingForm.value.requester) {
      alert("This student is already the requester.");
      return;
    }
    // Check if already in participants list
    if (!selectedParticipants.value.find(p => p.id_number === idValue)) {
      selectedParticipants.value.push(student);
    }
    input.value = '';
  } else {
    alert("Student ID not found.");
  }
}

function removeParticipant(id: string) {
  selectedParticipants.value = selectedParticipants.value.filter(p => p.id_number !== id);
}


/* =====================================================
  FETCH RESERVATIONS
===================================================== */
async function fetchUpcomingReservations() {
  const { data, error } = await supabase
    .from('room_reservations')
    .select(`
      id,
      booking_date,
      start_time,
      purpose,
      representative_student_id,
      status,
      rooms ( name )
    `)
    .order('booking_date', { ascending: false })
    .order('start_time', { ascending: false })
    .limit(10)

  if (error) {
    console.error('Error:', error.message)
    return
  }

  upcomingReservations.value = data.map((r: any) => ({
    id: r.id,
    date: r.booking_date,
    time: r.start_time,
    activity: r.purpose,
    requester: r.representative_student_id,
    status: r.status,
    room_name: r.rooms?.name || 'Unknown'
  }))
}

/* =====================================================
  UPDATE STATUS (For Accepting)
===================================================== */
async function updateStatus(id: string, newStatus: string) {
  const { error } = await supabase
    .from('room_reservations')
    .update({ status: newStatus })
    .eq('id', id)

  if (error) {
    alert("Update failed: " + error.message)
  } else {
    // Refresh both the table and the room cards
    await fetchUpcomingReservations()
    await fetchRooms()
  }
}

/* =====================================================
  DELETE RESERVATION (For Rejecting/Removing)
===================================================== */
async function deleteReservation(id: string) {
  if (!confirm("Are you sure you want to delete or reject this reservation?")) return

  const { error } = await supabase
    .from('room_reservations')
    .delete()
    .eq('id', id)

  if (error) {
    alert("Delete failed: " + error.message)
  } else {
    // Refresh the data
    await fetchUpcomingReservations()
    await fetchRooms()
  }
}

function confirmEndSession() {
  if (!selectedRoom.value) return

  selectedRoom.value.status = 'Available'
  selectedRoom.value.currentSession = null

  closeModals()
}

/* =====================================================
  LIFECYCLE
===================================================== */
onMounted(() => {
  fetchRooms()
  fetchStudents()
  fetchUpcomingReservations()
})
</script>


<style scoped>
.table-container {
  max-height: 400px;
  overflow-y: auto;
  position: relative;
  border: 1px solid #eee;
}


.report-table thead th {
  position: sticky;
  top: 0;
  background-color: #f8f9fa;
  z-index: 10;
  box-shadow: inset 0 -1px 0 #eee;
}

.table-container::-webkit-scrollbar {
  width: 6px;
}

.table-container::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 10px;
}

.custom-scroll {
  height: calc(100vh - 300px);
}

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
