<template>
<div class="flex h-screen w-full overflow-hidden bg-[#f5f3ef]">

  <Sidebar :activeTab="activeTab" @updateActiveTab="handleTabChange" />

  <main class="report-root flex-1 overflow-y-auto">

    <!-- HEADER -->
    <header class="report-header">

      <div>
        <div class="header-breadcrumb">
          <span>Admin</span>
          <span>•</span>
          <span>Students</span>
        </div>

        <h1 class="header-title">
          Import <span style="color:#f9a825">Student Records</span>
        </h1>

        <p class="header-sub">
          Upload a dataset and synchronize it with the CSU student database.
        </p>
      </div>

    </header>


    <!-- STEPPER -->
    <section class="panel">

      <div class="stepper">

        <div
          v-for="(step,i) in steps"
          :key="i"
          class="step"
          :class="{active:currentStep===i}"
        >

          <div class="step-circle">
            {{ i+1 }}
          </div>

          <div class="step-text">
            <span class="step-title">{{ step.title }}</span>
            <span class="step-sub">{{ step.sub }}</span>
          </div>

        </div>

      </div>

    </section>


    <!-- MAIN PANEL -->
    <section class="panel">

      <!-- STEP 1 -->
      <div v-if="currentStep===0">

        <div class="panel-head">
          <div>
            <h2 class="panel-title">Upload Student Dataset</h2>
            <p class="panel-sub">
              Upload XLSX or XLS file containing CSU students
            </p>
          </div>
        </div>

        <label class="drop-zone">

          <input
            type="file"
            hidden
            accept=".xlsx,.xls"
            @change="handleFileUpload"
          >

          <p class="upload-main">
            <strong>Click or drag</strong> Excel file here
          </p>

          <p class="upload-sub">
            Supported formats: .xlsx, .xls
          </p>

        </label>

      </div>



      <!-- STEP 2 -->
      <div v-if="currentStep===1">

        <div class="panel-head">
          <div>
            <h2 class="panel-title">Validate Dataset</h2>
            <p class="panel-sub">
              Confirm the records detected from the file
            </p>
          </div>
        </div>

        <table class="report-table">

          <tbody>

            <tr>
              <td>File Name</td>
              <td class="text-right">{{ fileName }}</td>
            </tr>

            <tr>
              <td>Detected Records</td>
              <td class="text-right">{{ recordCount }}</td>
            </tr>

            <tr>
              <td>Status</td>
              <td class="text-right" style="color:#16a34a">
                Ready for Import
              </td>
            </tr>

          </tbody>

        </table>

      </div>



      <!-- STEP 3 -->
      <div v-if="currentStep===2">

        <div class="panel-head">
          <div>
            <h2 class="panel-title">Sync with Database</h2>
            <p class="panel-sub">
              This will update the <strong>students</strong> table
              using the uploaded dataset.
            </p>
          </div>
        </div>

        <button
          class="import-btn"
          @click="importStudents"
        >
          Import Students
        </button>

      </div>



      <!-- CONTROLS -->
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

    </section>

  </main>

</div>
</template>


<script setup lang="ts">

import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'

const activeTab = ref('REPORTS')

const handleTabChange = (name:string)=>{
  activeTab.value=name
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

  const file = e.target.files?.[0]

  if(!file) return

  fileName.value = file.name

  // placeholder
  recordCount.value = 420

}

function importStudents(){
  console.log("Importing students to database")
}

</script>


<style src="@/assets/styles/report-analytics.css"></style>