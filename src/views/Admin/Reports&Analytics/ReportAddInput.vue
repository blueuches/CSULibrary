<template>
<div class="report-root">

  <!-- HEADER -->
  <header class="report-header">
    <div class="header-left">

      <div class="header-breadcrumb">
        <span>Admin</span>
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M9 5l7 7-7 7"/>
        </svg>
        <span>Reports & Analytics</span>
      </div>

      <h1 class="header-title">Create Analytics Report</h1>
      <p class="header-sub">
        Upload a dataset and configure how the analytics should be generated
      </p>

    </div>
  </header>


  <!-- STEPPER -->
  <div class="stepper-wrap">

    <div
      v-for="(step,i) in steps"
      :key="i"
      class="stepper-item"
      :class="{ active: activeStep === i }"
      @click="activeStep = i"
    >

      <div class="stepper-circle">
        {{ i + 1 }}
      </div>

      <div class="stepper-label">
        <span class="step-title">{{ step.title }}</span>
        <span class="step-sub">{{ step.sub }}</span>
      </div>

      <div
        v-if="i < steps.length-1"
        class="stepper-line"
      ></div>

    </div>

  </div>


  <!-- STEP PANEL -->
  <div class="rank-panel">

    <!-- STEP 1 -->
    <div v-if="activeStep === 0">

      <div class="panel-head">
        <div class="panel-icon">📂</div>

        <div>
          <h2 class="panel-title">Upload Dataset</h2>
          <p class="panel-sub">
            Import a CSV or Excel file containing the data for this report
          </p>
        </div>
      </div>

      <div class="upload-area">

        <label class="upload-box">

          <input
            type="file"
            @change="handleFileUpload"
            hidden
          />

          <div class="upload-content">
            <div class="upload-icon">⬆</div>
            <p class="upload-title">Upload CSV / Excel</p>
            <p class="upload-desc">Drag file or click to browse</p>
          </div>

        </label>

        <input
          v-model="reportName"
          class="field-input"
          placeholder="Report name"
        />

      </div>

    </div>



    <!-- STEP 2 -->
    <div v-if="activeStep === 1">

      <div class="panel-head">
        <div class="panel-icon">📊</div>

        <div>
          <h2 class="panel-title">Columns Configuration</h2>
          <p class="panel-sub">
            Select which dataset columns will be used for grouping and sorting
          </p>
        </div>
      </div>


      <div class="fields-grid">

        <div class="field-group">
          <label>Group By</label>
          <select v-model="groupBy">
            <option disabled value="">Select column</option>
            <option v-for="c in columns" :key="c">{{ c }}</option>
          </select>
        </div>

        <div class="field-group">
          <label>Unique By</label>
          <select v-model="uniqueBy">
            <option disabled value="">Select column</option>
            <option v-for="c in columns" :key="c">{{ c }}</option>
          </select>
        </div>

        <div class="field-group">
          <label>Sort By</label>
          <select v-model="sortBy">
            <option disabled value="">Select column</option>
            <option v-for="c in columns" :key="c">{{ c }}</option>
          </select>
        </div>

      </div>

    </div>



    <!-- STEP 3 -->
    <div v-if="activeStep === 2">

      <div class="panel-head">
        <div class="panel-icon">⚙</div>

        <div>
          <h2 class="panel-title">Filters & Ranking</h2>
          <p class="panel-sub">
            Define ranking logic and result limits
          </p>
        </div>
      </div>


      <div class="fields-grid">

        <div class="field-group">
          <label>Top N Results</label>
          <input
            type="number"
            v-model="limit"
          />
        </div>


        <div class="field-group">
          <label>Sort Direction</label>

          <div class="toggle-group">

            <button
              :class="{active:sortDirection==='desc'}"
              @click="sortDirection='desc'"
            >
              Descending
            </button>

            <button
              :class="{active:sortDirection==='asc'}"
              @click="sortDirection='asc'"
            >
              Ascending
            </button>

          </div>

        </div>

      </div>

    </div>



    <!-- STEP 4 -->
    <div v-if="activeStep === 3">

      <div class="panel-head">
        <div class="panel-icon">📈</div>

        <div>
          <h2 class="panel-title">Create Report</h2>
          <p class="panel-sub">
            Review your configuration and generate the analytics report
          </p>
        </div>
      </div>


      <button
        class="export-btn"
        @click="createReport"
      >
        Generate Report
      </button>

    </div>

  </div>

</div>
</template>


<script setup lang="ts">
import { ref } from "vue"

const activeStep = ref(0)

const steps = [
  { title: "Upload", sub: "Import dataset" },
  { title: "Columns", sub: "Select fields" },
  { title: "Logic", sub: "Grouping & filters" },
  { title: "Create", sub: "Generate report" }
]

const reportName = ref("")
const groupBy = ref("")
const uniqueBy = ref("")
const sortBy = ref("")
const limit = ref(10)
const sortDirection = ref("desc")

const columns = ref([
  "student_name",
  "college",
  "year",
  "borrowed_books"
])

function handleFileUpload(e:any){
  console.log(e.target.files[0])
}

function createReport(){
  console.log("Creating report")
}
</script>


<style scoped>

.report-root{
  padding:40px;
  background:#f5f7fb;
  min-height:100vh;
  font-family:Inter, sans-serif;
}


/* HEADER */

.report-header{
  margin-bottom:40px;
}

.header-breadcrumb{
  display:flex;
  align-items:center;
  gap:8px;
  font-size:14px;
  color:#6b7280;
}

.header-breadcrumb svg{
  width:14px;
  stroke:#9ca3af;
  stroke-width:2;
}

.header-title{
  font-size:32px;
  font-weight:700;
  margin-top:10px;
}

.header-sub{
  margin-top:6px;
  color:#6b7280;
}


/* STEPPER */

.stepper-wrap{
  display:flex;
  align-items:center;
  margin-bottom:30px;
}

.stepper-item{
  display:flex;
  align-items:center;
  cursor:pointer;
}

.stepper-circle{
  width:34px;
  height:34px;
  border-radius:50%;
  background:#e5e7eb;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:600;
}

.stepper-item.active .stepper-circle{
  background:#2563eb;
  color:white;
}

.stepper-label{
  margin-left:10px;
}

.step-title{
  display:block;
  font-weight:600;
}

.step-sub{
  font-size:12px;
  color:#6b7280;
}

.stepper-line{
  width:60px;
  height:2px;
  background:#e5e7eb;
  margin:0 16px;
}



/* PANEL */

.rank-panel{
  background:white;
  border-radius:14px;
  padding:30px;
  box-shadow:0 10px 25px rgba(0,0,0,0.05);
}


/* PANEL HEADER */

.panel-head{
  display:flex;
  gap:16px;
  margin-bottom:25px;
}

.panel-icon{
  width:50px;
  height:50px;
  border-radius:10px;
  background:#eef2ff;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:22px;
}

.panel-title{
  font-size:22px;
  font-weight:600;
}

.panel-sub{
  font-size:14px;
  color:#6b7280;
}



/* UPLOAD */

.upload-area{
  display:flex;
  flex-direction:column;
  gap:20px;
}

.upload-box{
  border:2px dashed #d1d5db;
  border-radius:12px;
  padding:40px;
  text-align:center;
  cursor:pointer;
  transition:.2s;
}

.upload-box:hover{
  border-color:#2563eb;
  background:#f8fbff;
}

.upload-icon{
  font-size:32px;
  margin-bottom:10px;
}

.upload-title{
  font-weight:600;
}

.upload-desc{
  font-size:13px;
  color:#6b7280;
}



/* INPUTS */

.fields-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
  gap:20px;
}

.field-group{
  display:flex;
  flex-direction:column;
  gap:6px;
}

.field-group label{
  font-size:13px;
  font-weight:600;
}

.field-group select,
.field-group input{
  padding:10px;
  border-radius:8px;
  border:1px solid #d1d5db;
  font-size:14px;
}

.field-input{
  padding:12px;
  border-radius:8px;
  border:1px solid #d1d5db;
}



/* TOGGLE */

.toggle-group{
  display:flex;
  gap:10px;
}

.toggle-group button{
  padding:8px 14px;
  border-radius:6px;
  border:1px solid #d1d5db;
  background:white;
  cursor:pointer;
}

.toggle-group button.active{
  background:#2563eb;
  color:white;
  border:none;
}



/* BUTTON */

.export-btn{
  margin-top:20px;
  padding:14px 24px;
  background:#2563eb;
  color:white;
  border:none;
  border-radius:8px;
  font-weight:600;
  cursor:pointer;
}

.export-btn:hover{
  background:#1e40af;
}

</style>