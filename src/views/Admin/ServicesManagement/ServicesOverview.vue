<template>
  <div class="page-layout">
    <Sidebar :activeTab="'SERVICES'" />
    
    <main class="portal-root">
      <div class="glow-spot-left"></div>
      <div class="glow-spot-right"></div>

      <div class="dashboard-wrapper">
        <header class="dashboard-header">
          <div class="branding-group">
            <nav class="path-navigation">
              <span class="root-path">ADMIN</span>
              <svg class="path-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <path d="M9 18l6-6-6-6" />
              </svg>
              <span class="active-path">SERVICES</span>
            </nav>

            <h1 class="portal-main-title">
              <span class="word-forest word-underlined">Library</span>
              <span class="word-mustard"> Services</span>
            </h1>
            
            <p class="portal-subtitle">
              Comprehensive overview of institutional engagement and borrowing patterns
            </p>
          </div>

          <div class="header-actions-hub">
            <div class="system-pills">
              <div class="status-pill">
                <span class="online-indicator"></span>
                LIVE_DATA
              </div>
              <div class="date-pill">Wednesday, March 11, 2026</div>
            </div>
            <button class="nav-btn-primary" @click="navigateTo('settings')">
              <span>DASHBOARD SETTINGS</span>
              <div class="icon-wrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
            </button>
          </div>
        </header>

        <section class="nav-bento-grid">
          
          <div class="bento-card card-dark card-big">
            <div class="card-content">
              <div class="top-meta">
                <div class="micro-chart">
                  <div class="m-bar" style="height: 40%"></div>
                  <div class="m-bar" style="height: 80%"></div>
                  <div class="m-bar highlight" style="height: 60%"></div>
                </div>
              </div>

              <h2 class="card-h-title">Room<br /><span class="text-mustard">Reservation</span></h2>
              <p class="card-p-text">Control campus facility availability, approve pending requests, and manage hardware.</p>

              <button class="bento-btn-white" @click="navigateTo('reservations')">
                <span>MANAGE ROOMS</span>
                <svg class="arrow-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div class="bento-card card-white card-wide">
            <div class="metric-flex-box">
              <div class="metric-info">
                <span class="m-label">RECORDS</span>
                <div class="m-value">12,840 <span class="m-trend">↑ 2.4%</span></div>
                <div class="data-mini-viz">
                  <div class="viz-segment forest" style="width: 70%"></div>
                  <div class="viz-segment mustard" style="width: 20%"></div>
                  <div class="viz-segment gray" style="width: 10%"></div>
                </div>
              </div>
              <button class="fab-nav-btn" @click="navigateTo('borrowers')" title="View All Records">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l5 5v11a2 2 0 0 1-2 2z" />
                </svg>
              </button>
            </div>
          </div>

          <div class="bento-card card-gallery">
            <div class="gallery-overlay">
              <div class="nav-icon-box-forest">🖼</div>
              <h3 class="nav-title">Gallery Assets</h3>
              <p class="nav-subtitle">2.4k Digital Media</p>
              <button class="corner-btn-forest" @click="navigateTo('media')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </button>
            </div>
            <div class="shape s1"></div>
            <div class="shape s2"></div>
          </div>

          <div class="bento-card card-mustard">
            <div class="sq-nav-content">
              <div class="nav-icon-box">🗓</div>
              <h3 class="nav-title">Schedules</h3>
              <p class="nav-subtitle">12 Upcoming</p>
              <button class="corner-btn" @click="navigateTo('calendar')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
const navigateTo = (page) => console.log(`Routing to: ${page}`)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;900&display=swap');

/* --- PAGE STRUCTURE (ORIGINAL SIZES) --- */
.page-layout { display: flex; height: 100vh; overflow: hidden; background-color: #f9fbfb; }
.portal-root { width: 100%; min-height: 100vh; position: relative; overflow-y: auto; font-family: 'Poppins', sans-serif; }
.dashboard-wrapper { width: 100%; max-width: 1400px; padding: 4rem 3rem; margin: 0 auto; z-index: 10; position: relative; }

/* --- BRANDING HEADER (MATCHED TO IMAGE/ORIGINAL) --- */
.dashboard-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 5rem; }
.path-navigation { display: flex; align-items: center; gap: 10px; margin-bottom: 1.2rem; }
.root-path { font-size: 11px; font-weight: 800; color: #94a3b8; letter-spacing: 0.15em; }
.path-chevron { width: 12px; height: 12px; color: #cbd5e1; }
.active-path { font-size: 11px; font-weight: 800; color: #0d2b0f; }

.portal-main-title { font-size: clamp(2rem, 4vw, 3rem); font-weight: 900; line-height: 1; letter-spacing: -0.02em; margin: 0; display: inline-block; }
.word-forest { color: #0d2b0f; }
.word-mustard { color: #e6a800; }
.word-underlined { position: relative; display: inline-block; }
.word-underlined::after {
  content: ''; position: absolute; bottom: -8px; left: 0; width: 100%; height: 5px;
  background: linear-gradient(to right, #0d2b0f, #e6a800); border-radius: 3px;
}
.portal-subtitle { font-size: 0.95rem; font-weight: 400; color: #6b7280; margin-top: 20px; }

/* Header Actions */
.header-actions-hub { display: flex; flex-direction: column; align-items: flex-end; gap: 20px; }
.system-pills { display: flex; gap: 12px; }
.status-pill, .date-pill { background: white; padding: 6px 14px; border-radius: 20px; font-size: 10px; font-weight: 800; border: 1px solid #f1f5f9; }
.status-pill { color: #16a34a; display: flex; align-items: center; gap: 8px; }
.online-indicator { width: 6px; height: 6px; background: #16a34a; border-radius: 50%; box-shadow: 0 0 10px #16a34a; }
.nav-btn-primary { background: #0d2b0f; color: white; border: none; padding: 0 6px 0 24px; height: 54px; border-radius: 18px; font-weight: 800; font-size: 12px; display: flex; align-items: center; gap: 15px; cursor: pointer; transition: 0.3s; }
.icon-wrap { width: 42px; height: 42px; background: rgba(255, 255, 255, 0.1); border-radius: 14px; display: flex; align-items: center; justify-content: center; }

/* --- ENHANCED BENTO GRID & CARDS (SAME SIZE, HIGHER QUALITY) --- */
.nav-bento-grid { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 240px; gap: 30px; }

.bento-card { 
  border-radius: 40px; 
  position: relative; 
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1); 
  overflow: hidden; 
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
}

.bento-card:hover { 
  transform: translateY(-8px); 
  box-shadow: 0 20px 40px rgba(13, 43, 15, 0.1);
}

/* Hero Dark Card */
.card-dark { 
  background: linear-gradient(135deg, #0d2b0f 0%, #1a3d1c 100%); 
  color: white; padding: 45px; grid-column: span 2; grid-row: span 2; display: flex; flex-direction: column; 
}
.card-h-title { font-size: 2.8rem; font-weight: 900; line-height: 1.1; margin-bottom: 1rem; }
.text-mustard { color: #facc15; }
.bento-btn-white { 
  margin-top: auto; background: white; color: #0d2b0f; border: none; height: 70px; 
  padding: 0 30px; border-radius: 22px; font-weight: 900; display: flex; 
  justify-content: space-between; align-items: center; cursor: pointer; transition: 0.3s;
}
.bento-btn-white:hover { background: #facc15; }

/* Metric Card */
.card-white { 
  background: rgba(255, 255, 255, 0.9); 
  backdrop-filter: blur(10px); 
  border: 1.5px solid #edf2f5; 
  padding: 40px; grid-column: span 2; 
}
.metric-flex-box { display: flex; justify-content: space-between; align-items: center; height: 100%; }
.m-value { font-size: 2.8rem; font-weight: 900; line-height: 1; margin: 10px 0; color: #0d2b0f; }
.m-trend { font-size: 14px; color: #16a34a; background: #f0fdf4; padding: 4px 10px; border-radius: 10px; margin-left: 8px; vertical-align: middle; }
.data-mini-viz { display: flex; height: 8px; gap: 4px; margin-top: 20px; border-radius: 10px; overflow: hidden; background: #f1f5f9; }
.viz-segment.forest { background: #0d2b0f; }
.viz-segment.mustard { background: #e6a800; }
.fab-nav-btn { 
  width: 70px; height: 70px; border-radius: 24px; background: #0d2b0f; 
  color: white; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.3s;
}
.fab-nav-btn:hover { background: #e6a800; transform: scale(1.05); }

/* Square Cards */
.card-gallery { background: white; }
.card-mustard { background: #facc15; }
.nav-icon-box-forest, .nav-icon-box { 
  width: 60px; height: 60px; border-radius: 50%; display: flex; 
  align-items: center; justify-content: center; font-size: 28px; margin-bottom: 15px; 
}
.nav-icon-box-forest { background: #0d2b0f; color: white; }
.nav-icon-box { background: white; }
.corner-btn, .corner-btn-forest { 
  position: absolute; top: 25px; right: 25px; width: 44px; height: 44px; 
  border: none; border-radius: 14px; cursor: pointer; display: flex; 
  align-items: center; justify-content: center; transition: 0.3s;
}
.corner-btn { background: #0d2b0f; color: white; }
.corner-btn-forest { background: #f1f5f9; color: #0d2b0f; }
.corner-btn:hover, .corner-btn-forest:hover { transform: rotate(90deg); }

/* Decoration */
.shape { position: absolute; background: rgba(226, 232, 240, 0.4); border-radius: 20px; z-index: 1; filter: blur(2px); }
.s1 { width: 100px; height: 100px; top: -20px; right: -20px; transform: rotate(15deg); }
.s2 { width: 80px; height: 80px; bottom: -10px; left: -10px; background: rgba(250, 204, 21, 0.2); }

/* Micro Chart */
.micro-chart { display: flex; align-items: flex-end; gap: 4px; height: 30px; margin-bottom: 15px; }
.m-bar { width: 6px; background: rgba(255,255,255,0.2); border-radius: 3px; }
.m-bar.highlight { background: #facc15; }

/* Glows */
.glow-spot-left { position: absolute; top: -100px; left: -100px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(13, 43, 15, 0.03), transparent); }
.glow-spot-right { position: absolute; bottom: -100px; right: -100px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(250, 204, 21, 0.05), transparent); }
</style>