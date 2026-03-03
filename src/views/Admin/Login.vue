<template>
  <div class="w-full min-h-screen flex items-center justify-center py-6">
    <div class="w-full max-w-md mx-auto"> 
      
      <div class="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm">
        <div class="mb-10 text-center">
          <h2 class="text-3xl font-bold text-gray-800">Login</h2>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input type="email" placeholder="example@email.com" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition" required />
          </div>

          <div>
            <div class="flex justify-between mb-2">
              <label class="text-sm font-semibold text-gray-700">Password</label>
              <a href="#" class="text-sm text-blue-600 hover:underline">Forget Password?</a>
            </div>
            <input type="password" placeholder="••••••••" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition" required />
          </div>

          <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition duration-200">
            Sign In
          </button>
        </form>

        <div class="mt-8 text-center">
          <p class="text-gray-600">No Account? 
            <a href="#" class="text-blue-600 font-semibold hover:underline">Register Here</a>
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
const handleLogin = () => {
  // Logic para sa login diri
  console.log("Nag-login na...");
};
</script>

<style scoped>
/* Limpyo na ni, Tailwind na'y bahala sa tanan. */
</style>