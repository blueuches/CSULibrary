<script setup lang="ts">
import { computed, ref, watch } from 'vue'

type AttendanceStatus = 'Checked Out' | '---'

type AttendanceLog = {
  id: string
  name: string
  department: string
  date: string
  timeIn: string
  timeOut: string
  status: AttendanceStatus
  remarks: string
}

const logs = ref<AttendanceLog[]>([
  { id: '221-1000', name: 'Dyanna Joy Castro', department: 'BSIT', date: '2024-08-23', timeIn: '08:07', timeOut: '17:12', status: 'Checked Out', remarks: 'WFH' },
  { id: '221-0900', name: 'Reonest Arjayle Espina', department: 'BSIT', date: '2024-08-19', timeIn: '08:32', timeOut: '17:05', status: 'Checked Out', remarks: 'Traffic' },
  { id: '221-0800', name: 'Christine Mae Lagura', department: 'BSIT', date: '2024-09-04', timeIn: '08:03', timeOut: '17:21', status: 'Checked Out', remarks: '' },
  { id: '221-0700', name: 'Peral Janette Cacayan', department: 'BSIT', date: '2024-09-11', timeIn: '08:10', timeOut: '', status: '---', remarks: 'No time out recorded' },
  { id: '221-0600', name: 'Ramon Lim', department: 'BSCS', date: '2025-08-20', timeIn: '08:15', timeOut: '16:58', status: 'Checked Out', remarks: '' },
  { id: '221-0500', name: 'Juan Luna', department: 'BSCS', date: '2025-01-13', timeIn: '08:20', timeOut: '10:30', status: 'Checked Out', remarks: 'Vacation leave' },
  { id: '221-0400', name: 'Kenji San', department: 'BSCS', date: '2023-12-06', timeIn: '08:30', timeOut: '17:11', status: 'Checked Out', remarks: '' },
  { id: '221-0300', name: 'Lia Smith', department: 'BSCS', date: '2023-08-29', timeIn: '08:40', timeOut: '17:02', status: 'Checked Out', remarks: '' },
  { id: '221-0200', name: 'Noel Brown', department: 'BSIT', date: '2023-10-14', timeIn: '08:45', timeOut: '17:00', status: 'Checked Out', remarks: '' },
  { id: '221-0100', name: 'Paula Tan', department: 'BSIT', date: '2023-08-01', timeIn: '08:50', timeOut: '', status: '---', remarks: 'Missing time out' },

  // duplicates for sample
  { id: '221-1000', name: 'Dyanna Joy Castro', department: 'BSIT', date: '2024-08-23', timeIn: '08:07', timeOut: '17:12', status: 'Checked Out', remarks: 'WFH' },
  { id: '221-0900', name: 'Reonest Arjayle Espina', department: 'BSIT', date: '2024-08-19', timeIn: '08:32', timeOut: '17:05', status: 'Checked Out', remarks: 'Traffic' },
  { id: '221-0800', name: 'Christine Mae Lagura', department: 'BSIT', date: '2024-09-04', timeIn: '08:03', timeOut: '17:21', status: 'Checked Out', remarks: '' },
  { id: '221-0700', name: 'Peral Janette Cacayan', department: 'BSIT', date: '2024-09-11', timeIn: '08:10', timeOut: '', status: '---', remarks: 'No time out recorded' },
  { id: '221-0600', name: 'Ramon Lim', department: 'BSCS', date: '2025-08-20', timeIn: '08:15', timeOut: '16:58', status: 'Checked Out', remarks: '' },
  { id: '221-0500', name: 'Juan Luna', department: 'BSCS', date: '2025-01-13', timeIn: '08:20', timeOut: '10:30', status: 'Checked Out', remarks: 'Vacation leave' },
  { id: '221-0400', name: 'Kenji San', department: 'BSCS', date: '2023-12-06', timeIn: '08:30', timeOut: '17:11', status: 'Checked Out', remarks: '' },
  { id: '221-0300', name: 'Lia Smith', department: 'BSCS', date: '2023-08-29', timeIn: '08:40', timeOut: '17:02', status: 'Checked Out', remarks: '' },
  { id: '221-0200', name: 'Noel Brown', department: 'BSIT', date: '2023-10-14', timeIn: '08:45', timeOut: '17:00', status: 'Checked Out', remarks: '' },
  { id: '221-0100', name: 'Paula Tan', department: 'BSIT', date: '2023-08-01', timeIn: '08:50', timeOut: '', status: '---', remarks: 'Missing time out' },
])

function deriveStatus(timeOut: string): AttendanceStatus {
  return timeOut && timeOut.trim() ? 'Checked Out' : '---'
}

function surnameOf(fullName: string): string {
  const cleaned = (fullName ?? '').trim()
  if (!cleaned) return ''
  const parts = cleaned.split(/\s+/)
  return parts[parts.length - 1] ?? '' 
}

const rows = computed(() =>
  logs.value.map((r, idx) => ({
    ...r,
    status: deriveStatus(r.timeOut),
    _rowKey: `${idx}-${r.id}-${r.date}-${r.timeIn}-${r.timeOut}`, // ✅ unique per row
  })),
)

const surnameLetter = ref<string>('') 
const alphabetOptions = computed(() => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))

const searchTerm = ref<string>('')

const surnameFiltered = computed(() => {
  const letter = surnameLetter.value.trim().toUpperCase()
  if (!letter) return rows.value
  return rows.value.filter((r) => surnameOf(r.name).toUpperCase().startsWith(letter))
})

const filteredRows = computed(() => {
  const q = searchTerm.value.trim().toLowerCase()
  if (!q) return surnameFiltered.value
  return surnameFiltered.value.filter((r) => {
    return r.id.toLowerCase().includes(q) || r.name.toLowerCase().includes(q)
  })
})

const emptyMessage = computed(() => {
  const hasLetter = !!surnameLetter.value
  const hasSearch = !!searchTerm.value.trim()

  if (!hasLetter && !hasSearch) return 'No attendance logs found.'
  if (hasLetter && !hasSearch) return `No results for surnames starting with “${surnameLetter.value.toUpperCase()}”.`
  if (!hasLetter && hasSearch) return `No results found for “${searchTerm.value.trim()}”.`
  return `No results match the current filters.`
})

const page = ref(1)
const pageSize = ref(10)

watch([surnameLetter, searchTerm], () => {
  page.value = 1
})

const total = computed(() => filteredRows.value.length)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))

watch(totalPages, () => {
  if (page.value > totalPages.value) page.value = totalPages.value
})

const paged = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filteredRows.value.slice(start, start + pageSize.value)
})

const showingText = computed(() => {
  if (total.value === 0) return 'Showing 0 of 0'
  const start = (page.value - 1) * pageSize.value + 1
  const end = Math.min(page.value * pageSize.value, total.value)
  return `Showing ${start}–${end} of ${total.value}`
})

function prevPage() {
  page.value = Math.max(1, page.value - 1)
}
function nextPage() {
  page.value = Math.min(totalPages.value, page.value + 1)
}

function removeRow(id: string) {
  const ok = confirm('Delete this attendance log?')
  if (!ok) return
  logs.value = logs.value.filter((x) => x.id !== id)
  if (page.value > totalPages.value) page.value = totalPages.value
}

function exportCSV() {
  const exportRows = filteredRows.value
  const header = ['ID', 'Name', 'Department', 'Date', 'Time In', 'Time Out', 'Status', 'Remarks']
  const csv = [
    header.join(','),
    ...exportRows.map((r) =>
      [
        csvSafe(r.id),
        csvSafe(r.name),
        csvSafe(r.department),
        r.date,
        r.timeIn,
        r.timeOut || '',
        r.status,
        csvSafe(r.remarks),
      ].join(','),
    ),
  ].join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `attendance_logs_${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

function csvSafe(v: string) {
  const s = (v ?? '').replace(/"/g, '""')
  return `"${s}"`
}

function statusPillClass(s: AttendanceStatus) {
  if (s === 'Checked Out') return 'pill pill-info'
  return 'pill pill-danger'
}
</script>

<template>
  <div class="page">
    <div class="wrap">
      <div class="card">
        <!-- Header -->
        <div class="head">
          <div class="headLeft">
            <div class="filtersRow">
              <div class="filterGroup">
                <select v-model="surnameLetter" class="select">
                  <option value="">All</option>
                  <option v-for="ch in alphabetOptions" :key="ch" :value="ch">
                    {{ ch }}
                  </option>
                </select>
              </div>

              <!--  Search bar -->
              <div class="searchGroup">
                <span class="filterLabel">Search</span>
                <input
                  v-model="searchTerm"
                  class="searchInput"
                  type="text"
                  placeholder="Search ID or Name..."
                  autocomplete="off"
                />
                <button v-if="searchTerm" class="clearBtn" type="button" @click="searchTerm = ''" title="Clear search">
                  ✕
                </button>
              </div>

            </div>
          </div>

          <!-- Export -->
          <button class="btn btn-green" @click="exportCSV">
            <svg class="ico" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3v12m0 0l4-4m-4 4l-4-4"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path d="M5 21h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
            Export CSV
          </button>
        </div>

        <!-- Table -->
        <div class="tableShell">
          <div class="tableScroll">
            <table class="tbl">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Program</th>
                  <th>Date</th>
                  <th>Time In</th>
                  <th>Time Out</th>
                  <th>Status</th>
                  <th class="thActions">Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="row in paged" :key="row._rowKey">
                  <td class="muted" data-label="ID">{{ row.id }}</td>
                  <td class="strong" data-label="Name">{{ row.name }}</td>
                  <td class="muted" data-label="Program">{{ row.department }}</td>
                  <td class="muted" data-label="Date">{{ row.date }}</td>
                  <td class="muted" data-label="Time In">{{ row.timeIn }}</td>
                  <td class="muted" data-label="Time Out">{{ row.timeOut || '---' }}</td>
                  <td data-label="Status">
                    <span :class="statusPillClass(row.status)">{{ row.status }}</span>
                  </td>

                  <td class="actions" data-label="Actions">
                    <button class="iconBtn" title="Delete" @click="removeRow(row.id)">
                      <svg class="ico" viewBox="0 0 24 24" fill="none">
                        <path d="M3 6h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        <path d="M8 6V4h8v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        <path
                          d="M7 6l1 14h8l1-14"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path d="M10 11v6M14 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                      </svg>
                    </button>
                  </td>
                </tr>

                <tr v-if="paged.length === 0">
                  <td class="empty" colspan="8">
                    {{ emptyMessage }}
                    <div class="emptyHint">Try selecting a different letter, clear filters, or adjust your search.</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Footer -->
          <div class="foot">
            <div class="footText">{{ showingText }}</div>

            <div class="pager">
              <button class="btn btn-ghost" @click="prevPage" :disabled="page === 1">Prev</button>
              <button class="btn btn-ghost" @click="nextPage" :disabled="page === totalPages">Next</button>
            </div>
          </div>
        </div>
        <!-- /Table -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  --primary: #0d2b0f;
  --primary-2: #165b1b;

  --bg: #f7f2e8;
  --bg-strip: #efe7d9;
  --card: rgba(255, 255, 255, 0.92);

  --border: rgba(13, 43, 15, 0.09);
  --shadow: rgba(13, 43, 15, 0.07);

  --danger: #d32f2f;
  --info: #0288d1;

  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: clamp(10px, 2vw, 28px);
  background: linear-gradient(180deg, var(--bg) 0%, #ffffff 100%);
}

.wrap {
  width: 100%;
  height: 100%;
  margin: 0;
}

.card {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 22px;
  box-shadow: 0 14px 40px var(--shadow);
  overflow: hidden;
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 18px clamp(14px, 2vw, 24px);
  border-bottom: 1px solid var(--border);
  background: linear-gradient(180deg, #ffffff 0%, var(--bg-strip) 100%);
}

.filtersRow {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.filterGroup,
.searchGroup {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: #ffffff;
}

.filterLabel {
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(13, 43, 15, 0.6);
  white-space: nowrap;
}

.select {
  border: 0;
  outline: none;
  background: transparent;
  font-weight: 900;
  color: rgba(13, 43, 15, 0.85);
  cursor: pointer;
  padding: 2px 6px;
  min-width: 88px;
}

.searchInput {
  border: 0;
  outline: none;
  background: transparent;
  font-weight: 800;
  color: rgba(13, 43, 15, 0.85);
  padding: 2px 6px;
  width: min(260px, 55vw);
}

.searchInput::placeholder {
  color: rgba(13, 43, 15, 0.35);
  font-weight: 800;
}

.clearBtn {
  border: 0;
  background: transparent;
  cursor: pointer;
  font-weight: 900;
  color: rgba(13, 43, 15, 0.55);
  padding: 4px 6px;
  border-radius: 10px;
  transition: 160ms ease;
}

.clearBtn:hover {
  background: var(--bg-strip);
  color: rgba(13, 43, 15, 0.85);
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 14px;
  border: 1px solid var(--border);
  font-weight: 800;
  font-size: 13px;
  cursor: pointer;
  transition: 160ms ease;
  user-select: none;
  white-space: nowrap;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-green {
  background: var(--primary);
  color: #ffffff;
  border-color: rgba(13, 43, 15, 0.16);
}

.btn-green:hover {
  background: var(--primary-2);
}

.btn-ghost {
  background: #ffffff;
  color: rgba(13, 43, 15, 0.75);
}
.btn-ghost:hover {
  background: var(--bg-strip);
}

.ico {
  width: 16px;
  height: 16px;
}

.tableShell {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: clamp(10px, 1.6vw, 14px);
}

.tableScroll {
  flex: 1;
  min-height: 0;
  overflow: auto;
  border-radius: 18px;
  border: 1px solid var(--border);

  background:
    radial-gradient(900px circle at 18% 18%, rgba(34, 197, 94, 0.14), transparent 60%),
    radial-gradient(700px circle at 85% 35%, rgba(16, 185, 129, 0.10), transparent 62%),
    linear-gradient(180deg, #f4fbf6 0%, #eef8f1 55%, #ffffff 100%);

  scrollbar-width: none;
}

.tableScroll::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

.tbl {
  width: 100%;
  border-collapse: collapse;
    background: transparent;

}

.tbl tbody tr {
  background: #ffffff; 
}

.tbl thead tr {
  background: var(--primary);
}

.tbl th {
  text-align: left;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 14px 16px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 900;
  white-space: nowrap;
}

.tbl td {
  padding: 14px 16px;
  border-top: 1px solid var(--border);
  font-size: 14px;
  color: rgba(13, 43, 15, 0.85);
  vertical-align: middle;
  white-space: nowrap;
}

.tbl tbody tr:hover {
  background: rgba(239, 231, 217, 0.55);
}

.muted {
  color: rgba(13, 43, 15, 0.65);
}
.strong {
  font-weight: 900;
  color: rgba(13, 43, 15, 0.92);
}

.thActions,
.actions {
  text-align: center;
}

.iconBtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: #ffffff;
  color: rgba(13, 43, 15, 0.7);
  cursor: pointer;
  transition: 160ms ease;
  margin: 0 auto;
}

.iconBtn:hover {
  background: rgba(211, 47, 47, 0.08);
  color: var(--danger);
  border-color: rgba(211, 47, 47, 0.22);
}

.pill {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid transparent;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.02em;
}
.pill-info {
  background: rgba(2, 136, 209, 0.1);
  border-color: rgba(2, 136, 209, 0.22);
  color: #026caa;
}
.pill-danger {
  background: rgba(211, 47, 47, 0.1);
  border-color: rgba(211, 47, 47, 0.22);
  color: #b71c1c;
}

.empty {
  text-align: center;
  padding: 28px 16px;
  color: rgba(13, 43, 15, 0.55);
  font-weight: 800;
}

.emptyHint {
  margin-top: 8px;
  font-size: 12px;
  font-weight: 700;
  color: rgba(13, 43, 15, 0.45);
}

.foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 6px 2px;
}
.footText {
  font-size: 12px;
  color: rgba(13, 43, 15, 0.55);
  padding-left: 6px;
}
.pager {
  display: flex;
  gap: 8px;
}

@media (max-width: 520px) {
  .head {
    flex-direction: column;
    align-items: stretch;
  }
  .btn {
    width: 100%;
    justify-content: center;
  }
  .filtersRow {
    width: 100%;
  }
  .filterGroup,
  .searchGroup {
    width: 100%;
    justify-content: space-between;
  }
  .searchInput {
    width: 100%;
    text-align: right;
  }
  .select {
    width: 100%;
    text-align: right;
  }
}

@media (max-width: 640px) {
  .tbl thead {
    display: none;
  }

  .tbl,
  .tbl tbody,
  .tbl tr,
  .tbl td {
    display: block;
    width: 100%;
    white-space: normal;
  }

  .tbl tr {
    border-top: 1px solid var(--border);
    padding: 10px 10px 6px;
  }

  .tbl td {
    border: 0;
    padding: 8px 10px;
    display: flex;
    justify-content: space-between;
    gap: 12px;
  }

  .tbl td::before {
    content: attr(data-label);
    font-weight: 900;
    color: rgba(13, 43, 15, 0.6);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 10px;
    line-height: 1.2;
  }

  .actions,
  .thActions {
    text-align: left;
  }

  .iconBtn {
    width: 42px;
    height: 42px;
  }
}
</style>