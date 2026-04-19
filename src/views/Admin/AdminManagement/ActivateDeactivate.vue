<template>
  <div class="w-full py-6 px-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold mb-6 text-gray-800">Manage User Access</h1>
      
      <div class="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        <ul class="divide-y divide-gray-200">
          <li v-for="user in users" :key="user.id" class="p-4 hover:bg-gray-50 transition">
            <div class="flex items-center justify-between">
              <div class="flex flex-col">
                <span class="font-semibold text-gray-900">
                  {{ user.first_name }} {{ user.last_name }}
                </span>
                <span class="text-sm text-gray-500">{{ user.email }}</span>
              </div>

              <div class="flex items-center gap-4">
                <span 
                  :class="user.is_active ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'"
                  class="text-xs font-medium px-2.5 py-0.5 rounded-full border"
                >
                  {{ user.is_active ? 'Active' : 'Deactivated' }}
                </span>

                <button 
                  @click="handleToggle(user)"
                  :disabled="processingId === user.id"
                  :class="user.is_active 
                    ? 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border-red-200' 
                    : 'bg-green-50 text-green-600 hover:bg-green-600 hover:text-white border-green-200'"
                  class="px-4 py-2 text-sm font-medium border rounded-lg transition-all disabled:opacity-50"
                >
                  <span v-if="processingId === user.id">Updating...</span>
                  <span v-else>{{ user.is_active ? 'Deactivate' : 'Activate' }}</span>
                </button>
              </div>
            </div>
          </li>
        </ul>

        <div v-if="users.length === 0" class="p-8 text-center text-gray-500">
          No users found in the system.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { userService, type User } from '@/services/userService';

const users = ref<User[]>([]);
const processingId = ref<string | null>(null);

const loadUsers = async () => {
  try {
    users.value = await userService.getAllUsers();
  } catch (err) {
    alert('Failed to fetch users');
  }
};

const handleToggle = async (user: User) => {
  processingId.value = user.id;
  try {
    await userService.toggleUserStatus(user.id, user.is_active);
    
    // Optimistic Update: Update the local state so we don't have to reload everything
    user.is_active = !user.is_active;
    
  } catch (err: any) {
    alert('Error updating user: ' + err.message);
  } finally {
    processingId.value = null;
  }
};

onMounted(loadUsers);
</script>