<template>
  <div class="w-full py-6 px-4">
    <div class="flex flex-col gap-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800">System Users</h1>
        <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          {{ users.length }} Total
        </span>
      </div>

      <div class="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ user.first_name }} {{ user.last_name }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ user.email }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span class="capitalize">{{ user.role }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
                  {{ user.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ new Date(user.created_at).toLocaleDateString() }}
              </td>
            </tr>
            <tr v-if="users.length === 0">
              <td colspan="5" class="px-6 py-10 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { userService, type User } from '@/services/userService';

const users = ref<User[]>([]);
const isLoading = ref(true);

const fetchUsers = async () => {
  try {
    users.value = await userService.getAllUsers();
  } catch (error) {
    console.error('Failed to load users:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
/* Scoped styles are kept empty as Tailwind handles the UI. */
</style>