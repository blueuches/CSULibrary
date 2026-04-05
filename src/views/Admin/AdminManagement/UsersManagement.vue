<template>
  <div class="flex min-h-screen bg-gray-50">

    <!-- SIDEBAR (DO NOT FORCE WIDTH) -->
    <div class="sticky top-0 h-screen">
      <Sidebar 
        :activeTab="'PERSONNEL'" 
        @updateActiveTab="handleTabChange"
      />
    </div>

    <!-- MAIN CONTENT -->
    <div class="flex-1 py-6 px-6 md:pl-8 md:pr-16">

      <div v-if="isAuthorized">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          <!-- USER MANAGEMENT -->
          <div class="bg-white shadow rounded-2xl p-6">
            <h2 class="text-xl font-semibold mb-4">User Management</h2>

            <div class="space-y-3">
              <button class="w-full bg-blue-500 text-white py-2 rounded-lg">
                View All Users
              </button>

              <button class="w-full bg-green-500 text-white py-2 rounded-lg">
                Add New User
              </button>

              <button class="w-full bg-yellow-500 text-white py-2 rounded-lg">
                Activate / Deactivate User
              </button>
            </div>
          </div>

          <!-- RBAC MANAGEMENT -->
          <div class="bg-white shadow rounded-2xl p-6">
            <h2 class="text-xl font-semibold mb-4">Role & Access Control</h2>

            <div class="space-y-3">
              <button class="w-full bg-purple-500 text-white py-2 rounded-lg">
                Manage Roles
              </button>

              <button class="w-full bg-indigo-500 text-white py-2 rounded-lg">
                Assign Roles to Users
              </button>

              <button class="w-full bg-pink-500 text-white py-2 rounded-lg">
                Set Permissions
              </button>
            </div>
          </div>

          <!-- ADMIN SETTINGS -->
          <div class="bg-white shadow rounded-2xl p-6 lg:col-span-2">
            <h2 class="text-xl font-semibold mb-4">Admin Settings</h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button class="bg-gray-700 text-white py-2 rounded-lg">
                System Settings
              </button>

              <button class="bg-gray-600 text-white py-2 rounded-lg">
                Audit Logs
              </button>

              <button class="bg-gray-800 text-white py-2 rounded-lg">
                Backup & Restore
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- UNAUTHORIZED -->
      <div v-else class="text-center py-10 text-gray-500">
        You are not authorized to view this page.
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Sidebar from '@/components/Sidebar.vue'

const user = {
  role: 'admin'
}

const isAuthorized = computed(() => {
  return user.role === 'admin' || user.role === 'super_admin'
})

const handleTabChange = (tab: string) => {
  console.log('Switched to:', tab)
}
</script>

<style scoped>
</style>