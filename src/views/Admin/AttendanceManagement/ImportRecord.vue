<template>
<div class="app-wrapper">
  <Sidebar :activeTab="activeTab" @updateActiveTab="handleTabChange" />

  <div class="page-container">

    <!-- HEADER -->
    <header class="page-header">

      <div class="header-badge">
        <span class="badge-dot"></span>
        CSU STUDENT MANAGEMENT
      </div>

      <h1 class="page-title">
        Import <span class="title-accent">Student Records</span>
      </h1>

      <p class="page-subtitle">
        Upload a student dataset and synchronize it with the CSU student database
      </p>

    </header>


    <!-- STEPS -->
    <div class="stepper">

      <div
        v-for="(step,i) in steps"
        :key="i"
        class="step"
        :class="{active:currentStep===i}"
      >

        <div class="step-circle">{{ i+1 }}</div>

        <div class="step-text">
          <span class="step-title">{{ step.title }}</span>
          <span class="step-sub">{{ step.sub }}</span>
        </div>

      </div>

    </div>



    <!-- MAIN CARD -->
    <div class="main-card">

      <!-- Upload -->
      <div v-if="currentStep===0">

        <div class="section-header">
          <span class="step-number">STEP 01</span>
          <h2 class="section-title">Upload Student Dataset</h2>
        </div>


        <label class="upload-zone">

          <input
            type="file"
            hidden
            @change="handleFileUpload"
          >

          <div class="upload-icon">
            ⬆
          </div>

          <p class="upload-main">
            <strong>Drag & drop</strong> Excel file here
          </p>

          <p class="upload-sub">
            Supported formats: .xlsx, .xls
          </p>

          <button class="browse-btn">
            Browse File
          </button>

        </label>

      </div>



      <!-- Validation -->
      <div v-if="currentStep===1">

        <div class="section-header">
          <span class="step-number">STEP 02</span>
          <h2 class="section-title">Validate Dataset</h2>
        </div>


        <div class="dataset-summary">

          <div class="summary-item">
            <span class="summary-label">File Name</span>
            <span class="summary-value">{{ fileName }}</span>
          </div>

          <div class="summary-item">
            <span class="summary-label">Detected Records</span>
            <span class="summary-value">{{ recordCount }}</span>
          </div>

          <div class="summary-item">
            <span class="summary-label">Status</span>
            <span class="status success">Ready for Import</span>
          </div>

        </div>

      </div>



      <!-- Import -->
      <div v-if="currentStep===2">

        <div class="section-header">
          <span class="step-number">STEP 03</span>
          <h2 class="section-title">Sync with Database</h2>
        </div>


        <p class="import-description">
          This will update the <strong>students</strong> table with the records
          from the uploaded dataset.
        </p>

        <button
          class="import-btn"
          @click="importStudents"
        >
          Import Students
        </button>

      </div>


      <!-- NAVIGATION -->
      <div class="step-controls">

        <button
          v-if="currentStep>0"
          class="nav-btn"
          @click="currentStep--"
        >
          Back
        </button>

        <button
          v-if="currentStep<2"
          class="nav-btn primary"
          @click="currentStep++"
        >
          Continue
        </button>

      </div>

    </div>

  </div>

</div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'
import Sidebar from '@/components/Sidebar.vue'

const activeTab = ref('DASHBOARD')

const handleTabChange = (name: string) => {
  activeTab.value = name
}

const currentStep = ref(0)

const steps = [
  { title:"Upload", sub:"Select dataset" },
  { title:"Validate", sub:"Check records" },
  { title:"Sync", sub:"Update database" }
]

const fileName = ref("")
const recordCount = ref(0)

function handleFileUpload(e:any){
  const file = e.target.files[0]

  if(!file) return

  fileName.value = file.name
  recordCount.value = 420 // placeholder
}

function importStudents(){
  console.log("Importing students to database")
}
</script>


<style scoped>

.app-wrapper{
  min-height:100vh;
  background:#0b1f13;
  font-family:'Syne',sans-serif;

  display:flex; /* IMPORTANT */
}

/* container for page content */
.page-container{
  max-width:900px;
  margin:auto;

  padding:60px 24px;

  margin-left:260px; /* adjust if sidebar width differs */
  width:100%;
}



/* HEADER */

.page-header{
  margin-bottom:40px;
}

.header-badge{
  display:inline-flex;
  align-items:center;
  gap:8px;
  font-size:11px;
  letter-spacing:.12em;
  color:#d4af37;
  border:1px solid rgba(212,175,55,.3);
  padding:6px 12px;
  border-radius:40px;
}

.badge-dot{
  width:6px;
  height:6px;
  border-radius:50%;
  background:#d4af37;
}

.page-title{
  font-size:40px;
  font-weight:800;
  color:#f3efe4;
  margin:12px 0 8px;
}

.title-accent{
  color:#d4af37;
}

.page-subtitle{
  color:rgba(255,255,255,.4);
}



/* STEPPER */

.stepper{
  display:flex;
  gap:30px;
  margin-bottom:30px;
}

.step{
  display:flex;
  gap:10px;
  align-items:center;
  opacity:.4;
}

.step.active{
  opacity:1;
}

.step-circle{
  width:34px;
  height:34px;
  border-radius:50%;
  background:#1d3a27;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#d4af37;
  font-weight:700;
}

.step-title{
  display:block;
  font-size:14px;
  color:#f0ede4;
}

.step-sub{
  font-size:12px;
  color:rgba(255,255,255,.4);
}



/* CARD */

.main-card{
  background:#0f2a1a;
  border-radius:18px;
  padding:36px;
  border:1px solid rgba(255,255,255,.06);
  box-shadow:0 20px 60px rgba(0,0,0,.4);
}



/* SECTION */

.section-header{
  margin-bottom:20px;
}

.step-number{
  font-size:11px;
  letter-spacing:.08em;
  color:#d4af37;
}

.section-title{
  font-size:20px;
  font-weight:700;
  color:#f3efe4;
}



/* UPLOAD */

.upload-zone{
  border:2px dashed rgba(255,255,255,.1);
  border-radius:14px;
  padding:50px;
  text-align:center;
  cursor:pointer;
  transition:.2s;
}

.upload-zone:hover{
  border-color:#d4af37;
}

.upload-icon{
  font-size:34px;
  margin-bottom:10px;
  color:#d4af37;
}

.upload-main{
  color:#f3efe4;
}

.upload-sub{
  font-size:13px;
  color:rgba(255,255,255,.4);
}

.browse-btn{
  margin-top:12px;
  background:#d4af37;
  border:none;
  color:#1c1c1c;
  padding:10px 18px;
  border-radius:8px;
  font-weight:700;
}



/* SUMMARY */

.dataset-summary{
  display:grid;
  gap:16px;
}

.summary-item{
  display:flex;
  justify-content:space-between;
  border-bottom:1px solid rgba(255,255,255,.06);
  padding-bottom:10px;
}

.summary-label{
  color:rgba(255,255,255,.5);
}

.summary-value{
  color:#f3efe4;
}

.status.success{
  color:#22c55e;
}



/* BUTTON */

.import-btn{
  margin-top:20px;
  background:#d4af37;
  border:none;
  color:#1a1a1a;
  padding:14px 26px;
  border-radius:10px;
  font-weight:700;
  cursor:pointer;
}

.import-btn:hover{
  opacity:.9;
}



/* NAV */

.step-controls{
  display:flex;
  justify-content:flex-end;
  gap:10px;
  margin-top:30px;
}

.nav-btn{
  background:transparent;
  border:1px solid rgba(255,255,255,.15);
  color:#f3efe4;
  padding:10px 18px;
  border-radius:8px;
}

.nav-btn.primary{
  background:#d4af37;
  color:#1c1c1c;
  border:none;
}

</style>