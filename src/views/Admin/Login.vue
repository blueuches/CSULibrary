<template>
 <div 
  class="w-full min-h-screen flex items-center justify-center py-6 bg-cover bg-center bg-no-repeat relative"
  style="background-image: url('/Gemini_Generated_Image_sx9k3lsx9k3lsx9k.png');"
>
    <div class="absolute inset-0 bg-black/10"></div>

    <div class="w-full max-w-md mx-auto relative z-10 p-4">
      <div class="bg-white/20 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/30 shadow-2xl">
        <div class="mb-10 text-center">
          <h2 class="text-3xl font-bold text-white">Login</h2>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          
          <div>
            <label class="block text-sm font-semibold text-white mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              class="w-full px-4 py-3 rounded-xl
                     border border-white/40 bg-white/10
                     text-white placeholder-white/60
                     focus:ring-2 focus:ring-green-400
                     focus:border-green-400
                     outline-none transition"
              required
            />
          </div>

          <div>
              <div class="flex justify-between items-center mb-2">
                <label class="text-sm font-semibold text-white">
                  Password
                </label>
                <a href="#" class="text-sm text-white/80 hover:text-white hover:underline">
                  Forgot Password?
                </a>
              </div>

              <input
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="w-full px-4 py-3 rounded-xl
                      border border-white/40 bg-white/10
                      text-white placeholder-white/60
                      focus:ring-2 focus:ring-green-400
                      focus:border-green-400
                      outline-none transition"
                required
              />
            </div>

          <button
            type="submit"
            class="w-full bg-green-600 hover:bg-green-500
                   text-white font-bold py-3 rounded-xl
                   shadow-lg transition duration-200"
          >
            Log In
          </button>
        </form>

        <div class="mt-8 text-center">
          <p class="text-white/80">
              No Account?
              <RouterLink
                to="/admin/signin"
                class="text-green-400 font-semibold hover:underline"
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