<template>
  <div class="w-full py-6 px-4 max-w-7xl mx-auto">
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">System Permissions</h1>
      <p class="text-slate-500 mt-2">Define which roles have access to specific system functionalities.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
      <div class="lg:col-span-1 space-y-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 class="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-4">1. Select Role to Edit</h2>
          <div class="space-y-2">
            <button v-for="role in ['Admin', 'Staff', 'Librarian', 'Student']" :key="role"
              class="w-full flex items-center justify-between p-3 rounded-xl border transition-all"
              :class="role === 'Staff' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' : 'border-slate-100 hover:border-slate-300 text-slate-600'"
            >
              <span class="font-medium">{{ role }}</span>
              <div v-if="role === 'Staff'" class="h-2 w-2 rounded-full bg-indigo-600"></div>
            </button>
          </div>
          
          <button class="w-full mt-6 py-3 px-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-400 font-medium hover:border-indigo-300 hover:text-indigo-500 transition-all">
            + Create Custom Role
          </button>
        </div>

        <div class="bg-indigo-900 text-white p-6 rounded-2xl shadow-lg shadow-indigo-200">
          <h3 class="font-bold mb-2">Pro Tip</h3>
          <p class="text-indigo-100 text-sm leading-relaxed">
            Changes made here affect all users assigned to the <strong>Staff</strong> role immediately. Be careful when revoking "Delete" permissions.
          </p>
        </div>
      </div>

      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
            <h2 class="font-bold text-slate-800">Permissions for "Staff" Role</h2>
            <button class="bg-slate-900 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition">
              Save Changes
            </button>
          </div>

          <div class="divide-y divide-slate-100">
            <div class="p-6">
              <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Book Management</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="perm in ['View Books', 'Add New Books', 'Edit Details', 'Archive Records']" :key="perm"
                  class="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100"
                >
                  <span class="text-sm font-medium text-slate-700">{{ perm }}</span>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked class="sr-only peer">
                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div class="p-6">
              <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">User Controls</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="perm in ['View Profiles', 'Update Roles', 'Reset Passwords', 'Ban Users']" :key="perm"
                  class="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100"
                >
                  <span class="text-sm font-medium text-slate-700">{{ perm }}</span>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" :checked="perm === 'View Profiles'" class="sr-only peer">
                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>

             <div class="p-6">
              <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">System Reports</h3>
              <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span class="text-sm font-medium text-slate-700">Export Financial Logs</span>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
// Logic remains empty for now as requested.
</script>

<style scoped>
/* Tailwind handles the styling */
</style>