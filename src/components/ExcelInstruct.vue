<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-container">
      
      <!-- Header -->
      <div class="modal-header">
        <h2>Excel Upload Instructions</h2>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </div>

      <!-- Content -->
      <div class="modal-body">
        <p>
          Please make sure your Excel file follows the required column format 
          shown below. The column names and order must match to avoid errors 
          during import.
        </p>

        <img
          src="@/assets/images/others/excel-columns.png"
          alt="Excel Columns Format"
          class="instruction-image"
        />
      </div>

      <!-- Footer -->
      <div class="modal-footer">
        <button class="btn" @click="$emit('close')">Got it</button>
      </div>

    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: Boolean
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  background: white;
  width: 600px;
  max-width: 90%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
}

.modal-body {
  padding: 20px;
  text-align: center;
}

.modal-body p {
  margin-bottom: 15px;
}

.instruction-image {
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.modal-footer {
  padding: 15px 20px;
  text-align: right;
  border-top: 1px solid #eee;
}

.btn {
  padding: 8px 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.close-btn {
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
}
</style>