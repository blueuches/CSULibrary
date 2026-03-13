<template>
  <div class="page-shell">
    <Sidebar :activeTab="'ATTENDANCE'" @updateActiveTab="handleTabChange" />

    <div class="page-scroll">
      <!-- ══ HEADER ══ -->
      <header class="attn-header">
        <div class="space-y-4">
          <div class="relative group">
            <div class="header-breadcrumb !mb-2">
              <span>Admin</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M9 5l7 7-7 7" />
              </svg>
              <span>ATTENDANCE</span>
            </div>
            <h1 class="hero-title">
              <span class="hero-word-dark hero-underlined">Library</span>
              <span class="hero-word-gold"> Attendance</span>
            </h1>
            <p class="hero-subtitle">
              Comprehensive overview of institutional engagement and borrowing patterns
            </p>
          </div>
        </div>
      </header>

      <!-- ══ QUICK STAT STRIP ══ -->
      <div class="stat-strip">
        <div v-for="s in quickStats" :key="s.label" class="qstat">
          <div class="qstat-icon" v-html="s.icon"></div>
          <div>
            <p class="qstat-val">{{ s.val }}</p>
            <p class="qstat-label">{{ s.label }}</p>
          </div>
          <span class="qstat-badge" :class="s.up ? 'qstat-badge--up' : 'qstat-badge--dn'">{{
            s.delta
          }}</span>
        </div>
      </div>

      <!-- ══ MAIN GRID ══ -->
      <div class="main-grid">
        <!-- ── LEFT: Dial ── -->
        <div class="dial-card">
          <div class="dial-card__header">
            <span class="section-eyebrow">Live Occupancy</span>
            <span class="live-chip"><span class="live-dot"></span>LIVE</span>
          </div>

          <div class="gauge-wrap">
            <svg viewBox="0 0 320 320" class="gauge-svg">
              <circle
                cx="160"
                cy="160"
                r="148"
                fill="none"
                stroke="rgba(13,43,15,0.04)"
                stroke-width="1"
              />
              <g v-for="i in 72" :key="`t${i}`">
                <line
                  :x1="160 + 138 * Math.cos(((i * 5 - 90) * Math.PI) / 180)"
                  :y1="160 + 138 * Math.sin(((i * 5 - 90) * Math.PI) / 180)"
                  :x2="
                    160 +
                    (i % 6 === 0 ? 124 : i % 3 === 0 ? 129 : 133) *
                      Math.cos(((i * 5 - 90) * Math.PI) / 180)
                  "
                  :y2="
                    160 +
                    (i % 6 === 0 ? 124 : i % 3 === 0 ? 129 : 133) *
                      Math.sin(((i * 5 - 90) * Math.PI) / 180)
                  "
                  :stroke="
                    (i * 5) / 360 <= 0.94
                      ? i % 6 === 0
                        ? '#0d2b0f'
                        : 'rgba(249,168,37,0.45)'
                      : 'rgba(13,43,15,0.1)'
                  "
                  :stroke-width="i % 6 === 0 ? 2.5 : 1.5"
                  stroke-linecap="round"
                />
              </g>
              <circle
                cx="160"
                cy="160"
                r="110"
                fill="none"
                stroke="rgba(13,43,15,0.07)"
                stroke-width="18"
              />
              <circle
                cx="160"
                cy="160"
                r="88"
                fill="none"
                stroke="rgba(13,43,15,0.04)"
                stroke-width="1"
                stroke-dasharray="4 5"
              />
              <circle
                cx="160"
                cy="160"
                r="110"
                fill="none"
                stroke="url(#gaugeGrad)"
                stroke-width="18"
                stroke-dasharray="691.2"
                :stroke-dashoffset="691.2 - 691.2 * 0.94"
                stroke-linecap="round"
                transform="rotate(-90 160 160)"
                class="gauge-arc"
              />

              <defs>
                <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="100%" stop-color="#0d2b0f" />
                </linearGradient>
              </defs>
            </svg>

            <div class="gauge-center">
              <div class="gauge-num">
                <span class="gauge-pct">94</span>
                <span class="gauge-unit">%</span>
              </div>
              <span class="gauge-sublabel">OCCUPANCY</span>
              <span class="gauge-max">AT CAPACITY</span>
            </div>
          </div>

          <div class="flow-row">
            <div class="flow-col">
              <div class="flow-bar-wrap">
                <div class="flow-bar flow-bar--in" style="width: 72%"></div>
              </div>
              <div class="flow-info">
                <span class="flow-label flow-label--in">Incoming</span>
                <span class="flow-num flow-num--in">+24</span>
              </div>
            </div>
            <div class="flow-divider"></div>
            <div class="flow-col">
              <div class="flow-bar-wrap">
                <div class="flow-bar flow-bar--out" style="width: 38%"></div>
              </div>
              <div class="flow-info">
                <span class="flow-label">Outgoing</span>
                <span class="flow-num flow-num--out">−12</span>
              </div>
            </div>
          </div>
        </div>

        <!-- ── RIGHT: Controls ── -->
        <div class="controls-col">
          <div class="ctrl-header">
            <div>
              <p class="ctrl-eyebrow">Data Orchestration</p>
              <h3 class="ctrl-title">Attendance <em>Overview</em></h3>
              <p class="ctrl-sub">All export data</p>
            </div>
            <button class="sync-btn" @click="$router.push('/admin/attendance/logs')">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
              >
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              <span>Attendance Logs</span>
            </button>
            <button class="sync-btn" @click="$router.push('/admin/attendance/import')">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
              >
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              <span>Add Import Records</span>
            </button>
          </div>

          <!-- ══ EXPORT LOGS TABLE ══ -->
          <div class="export-table-card">
            <div class="etable-header">
              <div>
                <p class="etable-eyebrow">Export History</p>
                <h4 class="etable-title">Recent Exports</h4>
              </div>
              <span class="etable-count">{{ exportLogs.length }} records</span>
            </div>
            <div class="etable-wrap">
              <table class="etable">
                <thead>
                  <tr>
                    <th>
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <path d="M16 2v4M8 2v4M3 10h18" />
                      </svg>
                      Date Exported
                    </th>
                    <th>
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      File Type
                    </th>
                    <th>
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      Exported By
                    </th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(log, i) in exportLogs" :key="i" class="erow">
                    <td class="erow-date">
                      <span class="erow-date__main">{{ log.date }}</span>
                      <span class="erow-date__time">{{ log.time }}</span>
                    </td>
                    <td>
                      <span :class="['etype-badge', 'etype-badge--' + log.type.toLowerCase()]">{{
                        log.type
                      }}</span>
                    </td>
                    <td class="erow-user">
                      <div class="erow-avatar">{{ log.user.charAt(0) }}</div>
                      <span>{{ log.user }}</span>
                    </td>
                    <td>
                      <span :class="['estatus', 'estatus--' + log.status]">
                        <span class="estatus-dot"></span>{{ log.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'

const exportLogs = ref([
  { date: 'Mar 11, 2026', time: '09:42 AM', type: 'PDF', user: 'Maria Santos', status: 'success' },
  {
    date: 'Mar 10, 2026',
    time: '03:15 PM',
    type: 'CSV',
    user: 'Juan dela Cruz',
    status: 'success',
  },
  { date: 'Mar 09, 2026', time: '11:08 AM', type: 'XLSX', user: 'Ana Reyes', status: 'success' },
  { date: 'Mar 08, 2026', time: '02:30 PM', type: 'PDF', user: 'Jose Bautista', status: 'failed' },
  { date: 'Mar 07, 2026', time: '08:55 AM', type: 'CSV', user: 'Maria Santos', status: 'success' },
  { date: 'Mar 06, 2026', time: '04:20 PM', type: 'XLSX', user: 'Liza Garcia', status: 'pending' },
])

const quickStats = [
  {
    val: '2,112',
    label: 'Visitors Today',
    delta: '+8.4%',
    up: true,
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  },
  {
    val: '284',
    label: 'Active Borrowers',
    delta: '+3.2%',
    up: true,
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  },
  {
    val: '392',
    label: 'Books Loaned',
    delta: '−1.1%',
    up: false,
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`,
  },
  {
    val: '10 AM',
    label: 'Peak Hour',
    delta: 'Steady',
    up: true,
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  },
]

const handleTabChange = (name: string) => {
  console.log('tab:', name)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;0,700;0,900;1,700;1,900&family=DM+Sans:wght@400;500;600;700&display=swap');

/* ─── SHELL ─── */
.page-shell {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: #edefed;
  font-family: 'DM Sans', sans-serif;
}

.page-scroll {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 40px 48px 80px 48px;
  box-sizing: border-box;
}
.page-scroll::-webkit-scrollbar {
  width: 5px;
}
.page-scroll::-webkit-scrollbar-thumb {
  background: rgba(13, 43, 15, 0.1);
  border-radius: 5px;
}

/* ─── HERO TITLE ─── */
.hero-title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.02em;
  margin: 0 0 8px;
  display: inline-block;
}
.hero-word-dark {
  color: #0d2b0f;
}
.hero-word-gold {
  color: #e6a800;
}
.hero-underlined {
  position: relative;
  display: inline-block;
}
.hero-underlined::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(to right, #0d2b0f, #e6a800);
  border-radius: 3px;
}
.hero-subtitle {
  font-size: 0.88rem;
  font-weight: 400;
  color: #6b7280;
  margin-top: 20px;
}

/* ─── HEADER ─── */
.attn-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

/* ─── QUICK STAT STRIP ─── */
.stat-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 28px;
}
.qstat {
  background: white;
  border: 1px solid rgba(13, 43, 15, 0.07);
  border-radius: 18px;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 12px rgba(13, 43, 15, 0.04);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.qstat:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(13, 43, 15, 0.09);
}
.qstat-icon {
  width: 40px;
  height: 40px;
  border-radius: 11px;
  background: rgba(13, 43, 15, 0.05);
  color: #0d2b0f;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.qstat-val {
  font-size: 1.4rem;
  font-weight: 700;
  color: #0d2b0f;
  letter-spacing: -0.03em;
  line-height: 1;
  margin: 0 0 2px;
}
.qstat-label {
  font-size: 0.58rem;
  font-weight: 600;
  color: rgba(13, 43, 15, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
}
.qstat-badge {
  margin-left: auto;
  flex-shrink: 0;
  font-size: 0.58rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 7px;
}
.qstat-badge--up {
  background: rgba(27, 94, 32, 0.08);
  color: #1b5e20;
}
.qstat-badge--dn {
  background: rgba(198, 40, 40, 0.07);
  color: #c62828;
}

/* ─── MAIN GRID ─── */
.main-grid {
  display: grid;
  grid-template-columns: 380px minmax(0, 1fr);
  gap: 20px;
  align-items: start;
  width: 100%;
}

/* ─── DIAL CARD ─── */
.dial-card {
  background: white;
  border: 1px solid rgba(13, 43, 15, 0.07);
  border-radius: 28px;
  padding: 28px 24px 24px;
  box-shadow: 0 4px 24px rgba(13, 43, 15, 0.06);
}
.dial-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.section-eyebrow {
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: rgba(13, 43, 15, 0.35);
}
.live-chip {
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(46, 125, 50, 0.07);
  border: 1px solid rgba(46, 125, 50, 0.18);
  border-radius: 20px;
  padding: 3px 10px;
  font-size: 0.56rem;
  font-weight: 800;
  color: #2e7d32;
  letter-spacing: 0.18em;
}
.live-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #4caf50;
  animation: ping 2s infinite;
}

.gauge-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.gauge-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.gauge-arc {
  transition: stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.gauge-center {
  position: relative;
  z-index: 10;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.gauge-num {
  display: flex;
  align-items: flex-start;
  line-height: 1;
}
.gauge-pct {
  font-family: 'Poppins', sans-serif;
  font-size: 6rem;
  font-weight: 900;
  color: #0d2b0f;
  letter-spacing: -0.06em;
  line-height: 1;
}
.gauge-unit {
  font-size: 1.8rem;
  font-weight: 700;
  color: rgba(13, 43, 15, 0.25);
  margin-top: 8px;
  font-family: 'Poppins', sans-serif;
}
.gauge-sublabel {
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.32em;
  color: rgba(13, 43, 15, 0.3);
  text-transform: uppercase;
}
.gauge-max {
  background: #f9a825;
  color: #5a3400;
  font-size: 0.5rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  padding: 4px 12px;
  border-radius: 20px;
  margin-top: 4px;
  box-shadow: 0 3px 12px rgba(249, 168, 37, 0.3);
}

/* ─── FLOW ROW ─── */
.flow-row {
  display: flex;
  align-items: stretch;
  background: #f4f6f4;
  border-radius: 16px;
  padding: 14px 20px;
  margin-top: 12px;
}
.flow-col {
  flex: 1;
}
.flow-divider {
  width: 1px;
  background: rgba(13, 43, 15, 0.08);
  margin: 0 20px;
  align-self: stretch;
}
.flow-bar-wrap {
  height: 3px;
  background: rgba(13, 43, 15, 0.07);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 8px;
}
.flow-bar {
  height: 100%;
  border-radius: 2px;
  transition: width 1s ease;
}
.flow-bar--in {
  background: #f9a825;
}
.flow-bar--out {
  background: rgba(13, 43, 15, 0.2);
}
.flow-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.flow-label {
  font-size: 0.55rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: rgba(13, 43, 15, 0.35);
}
.flow-label--in {
  color: rgba(13, 43, 15, 0.5);
}
.flow-num {
  font-family: 'Poppins', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: rgba(13, 43, 15, 0.3);
}
.flow-num--in {
  color: #0d2b0f;
}
.flow-num--out {
  color: rgba(13, 43, 15, 0.3);
}

/* ─── CONTROLS COL ─── */
.controls-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.ctrl-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}
.ctrl-eyebrow {
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #c8930a;
  margin: 0 0 4px;
}
.ctrl-title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.6rem, 2.2vw, 2rem);
  font-weight: 900;
  color: #0d2b0f;
  letter-spacing: -0.03em;
  line-height: 0.95;
  margin: 0 0 4px;
}
.ctrl-title em {
  font-style: italic;
  color: #f9a825;
}
.ctrl-sub {
  font-size: 0.72rem;
  color: rgba(13, 43, 15, 0.4);
  font-weight: 400;
  margin: 0;
}

/* ─── SYNC BTN ─── */
.sync-btn {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 14px 24px;
  background: #0d2b0f;
  color: white;
  border: none;
  border-radius: 16px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  box-shadow: 0 6px 20px rgba(13, 43, 15, 0.2);
  position: relative;
  overflow: hidden;
  transition: all 0.2s;
}
.sync-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.06), transparent);
  transform: translateX(-100%);
  transition: transform 0.7s;
}
.sync-btn:hover {
  background: #1b5e20;
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(13, 43, 15, 0.25);
}
.sync-btn:hover::after {
  transform: translateX(100%);
}

/* ─── EXPORT LOGS TABLE ─── */
.export-table-card {
  background: white;
  border: 1px solid rgba(13, 43, 15, 0.07);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(13, 43, 15, 0.04);
}
.etable-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 22px 14px;
  border-bottom: 1px solid rgba(13, 43, 15, 0.06);
}
.etable-eyebrow {
  font-size: 0.55rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #c8930a;
  margin: 0 0 3px;
}
.etable-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 800;
  color: #0d2b0f;
  letter-spacing: -0.02em;
  margin: 0;
}
.etable-count {
  font-size: 0.6rem;
  font-weight: 700;
  color: rgba(13, 43, 15, 0.35);
  letter-spacing: 0.08em;
  background: rgba(13, 43, 15, 0.05);
  padding: 4px 10px;
  border-radius: 20px;
}
.etable-wrap {
  width: 100%;
  overflow-x: auto;
}
.etable {
  width: 100%;
  border-collapse: collapse;
  font-family: 'DM Sans', sans-serif;
}
.etable thead tr {
  background: rgba(13, 43, 15, 0.02);
  border-bottom: 1px solid rgba(13, 43, 15, 0.06);
}
.etable th {
  padding: 10px 16px;
  font-size: 0.58rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: rgba(13, 43, 15, 0.38);
  text-align: left;
  white-space: nowrap;
}
.etable th svg {
  display: inline;
  vertical-align: middle;
  margin-right: 5px;
  opacity: 0.6;
}
.erow {
  border-bottom: 1px solid rgba(13, 43, 15, 0.04);
  transition: background 0.15s;
}
.erow:last-child {
  border-bottom: none;
}
.erow:hover {
  background: rgba(13, 43, 15, 0.02);
}
.erow td {
  padding: 12px 16px;
  vertical-align: middle;
}
.erow-date {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.erow-date__main {
  font-size: 0.72rem;
  font-weight: 700;
  color: #0d2b0f;
}
.erow-date__time {
  font-size: 0.6rem;
  font-weight: 500;
  color: rgba(13, 43, 15, 0.35);
}
.etype-badge {
  display: inline-flex;
  align-items: center;
  font-size: 0.58rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  padding: 3px 10px;
  border-radius: 6px;
}
.etype-badge--pdf {
  background: rgba(198, 40, 40, 0.08);
  color: #c62828;
}
.etype-badge--csv {
  background: rgba(27, 94, 32, 0.08);
  color: #1b5e20;
}
.etype-badge--xlsx {
  background: rgba(13, 99, 176, 0.08);
  color: #0d63b0;
}
.erow-user {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.72rem;
  font-weight: 600;
  color: #0d2b0f;
}
.erow-avatar {
  width: 26px;
  height: 26px;
  border-radius: 8px;
  background: rgba(13, 43, 15, 0.08);
  color: #0d2b0f;
  font-size: 0.62rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  text-transform: uppercase;
}
.estatus {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: capitalize;
  padding: 3px 10px;
  border-radius: 20px;
}
.estatus-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  flex-shrink: 0;
}
.estatus--success {
  background: rgba(27, 94, 32, 0.08);
  color: #1b5e20;
}
.estatus--success .estatus-dot {
  background: #4caf50;
}
.estatus--failed {
  background: rgba(198, 40, 40, 0.08);
  color: #c62828;
}
.estatus--failed .estatus-dot {
  background: #ef5350;
}
.estatus--pending {
  background: rgba(249, 168, 37, 0.1);
  color: #c8930a;
}
.estatus--pending .estatus-dot {
  background: #f9a825;
  animation: ping 2s infinite;
}

/* ─── ANIMATIONS ─── */
@keyframes ping {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.8);
    opacity: 0;
  }
}

/* ─── RESPONSIVE ─── */
@media (max-width: 1200px) {
  .main-grid {
    grid-template-columns: 1fr;
  }
  .stat-strip {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 680px) {
  .page-scroll {
    padding: 20px 16px 60px;
  }
  .attn-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .stat-strip {
    grid-template-columns: 1fr;
  }
}
</style>
