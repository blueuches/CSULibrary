<template>
  <div class="w-full min-h-screen flex items-center justify-center py-6">
    <div class="w-full max-w-md mx-auto">

      <div class="bg-white p-8 md:p-12 rounded-3xl border border-green-200 shadow-sm">
        <div class="mb-10 text-center">
          <h2 class="text-3xl font-bold text-gray-800">Login</h2>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          
          <!-- Email -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              class="w-full px-4 py-3 rounded-xl
                     border border-green-300
                     focus:ring-2 focus:ring-green-500
                     focus:border-green-500
                     outline-none transition"
              required
            />
          </div>

          <!-- Password with Show Icon -->
          <div>
              <div class="flex justify-between items-center mb-2">
                <label class="text-sm font-semibold text-gray-700">
                  Password
                </label>
                <a href="#" class="text-sm text-gray-700 hover:underline">
                  Forgot Password?
                </a>
              </div>

              <input
                type="password"
                placeholder="••••••••"
                class="w-full px-4 py-3 rounded-xl
                      border border-green-300
                      focus:ring-2 focus:ring-green-500
                      focus:border-green-500
                      outline-none transition"
                required
              />
            </div>

          <!-- Login Button -->
          <button
            type="submit"
            class="w-full bg-green-600 hover:bg-green-700
                   text-white font-bold py-3 rounded-xl
                   shadow-lg transition duration-200"
          >
            Log In
          </button>
        </form>

        <div class="mt-8 text-center">
          <p class="text-gray-600">
              No Account?
              <RouterLink
                to="/admin/signin"
                class="text-green-600 font-semibold hover:underline"
              >
                Register Here
              </RouterLink>
            </p>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = () => {
  console.log("Nag-login na...");
}
</script>

<style scoped>
/* Tailwind handles all styling */
</style>