<template>
  <div class="w-full py-6 px-4 max-w-6xl mx-auto">
    <div class="mb-8 flex flex-col md:flex-row md:items-end gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
      <div class="flex-1">
        <label class="block text-sm font-semibold text-slate-700 mb-2">Create New Role Definition</label>
        <input 
          v-model="newRoleName"
          type="text" 
          placeholder="e.g. Editor, Moderator..." 
          class="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>
      <button 
        @click="addNewRoleDefinition"
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition shadow-sm"
      >
        Add Role to System
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div 
        v-for="user in users" 
        :key="user.id" 
        class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
      >
        <div class="flex items-center gap-4 mb-4">
          <div class="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
            {{ user.first_name?.[0] }}{{ user.last_name?.[0] }}
          </div>
          <div>
            <h3 class="font-bold text-slate-900">{{ user.first_name }} {{ user.last_name }}</h3>
            <p class="text-xs text-slate-500">{{ user.email }}</p>
          </div>
        </div>

        <div class="space-y-3">
          <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Assigned Role</label>
          <div class="flex gap-2">
            <select 
              v-model="user.role"
              @change="updateRole(user)"
              :disabled="updatingId === user.id"
              class="flex-1 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5"
            >
              <option v-for="role in availableRoles" :key="role" :value="role">
                {{ role.charAt(0).toUpperCase() + role.slice(1) }}
              </option>
            </select>
            
            <div v-if="updatingId === user.id" class="flex items-center">
              <div class="animate-spin h-5 w-5 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div class="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
          <span class="text-[10px] text-slate-400 italic">Last login: {{ user.last_login_at || 'Never' }}</span>
          <span v-if="successId === user.id" class="text-green-500 text-xs font-bold">Saved!</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { userService, type User } from '@/services/userService';

const users = ref<User[]>([]);
const availableRoles = ref(['admin', 'staff', 'user', 'guest']);
const newRoleName = ref('');
const updatingId = ref<string | null>(null);
const successId = ref<string | null>(null);

const loadData = async () => {
  users.value = await userService.getAllUsers();
};

const addNewRoleDefinition = () => {
  if (!newRoleName.value) return;
  const role = newRoleName.value.toLowerCase().trim();
  if (!availableRoles.value.includes(role)) {
    availableRoles.value.push(role);
    newRoleName.value = '';
  }
};

const updateRole = async (user: User) => {
  updatingId.value = user.id;
  successId.value = null;
  
  try {
    await userService.updateUserRole(user.id, user.role);
    successId.value = user.id;
    // Hide the "Saved!" message after 2 seconds
    setTimeout(() => { successId.value = null }, 2000);
  } catch (err) {
    alert('Failed to update role');
  } finally {
    updatingId.value = null;
  }
};

onMounted(loadData);
</script>