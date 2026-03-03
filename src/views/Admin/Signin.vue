<template>
  <div 
    class="w-full min-h-screen flex items-center justify-center py-6 bg-cover bg-center bg-no-repeat relative"
    style="background-image: url('/Gemini_Generated_Image_sx9k3lsx9k3lsx9k.png');"
  >
    <div class="absolute inset-0 bg-black/10"></div>

    <div class="w-full max-w-md mx-auto relative z-10 p-4">
      <div class="bg-white/20 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/30 shadow-2xl">
        <div class="mb-10 text-center">
          <h2 class="text-3xl font-bold text-white">Sign Up</h2>
        </div>

        <form @submit.prevent="handleSignup" class="space-y-6">
          
          <!-- Full Name -->
          <div>
            <label class="block text-sm font-semibold text-white mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Juan Dela Cruz"
              class="w-full px-4 py-3 rounded-xl
                     border border-white/40 bg-white/10
                     text-white placeholder-white/60
                     focus:ring-2 focus:ring-green-400
                     focus:border-green-400
                     outline-none transition"
              required
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-semibold text-white mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@email.com"
              class="w-full px-4 py-3 rounded-xl
                     border border-white/40 bg-white/10
                     text-white placeholder-white/60
                     focus:ring-2 focus:ring-green-400
                     focus:border-green-400
                     outline-none transition"
              required
            />
          </div>

          <!-- Password -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="text-sm font-semibold text-white">
                Password
              </label>
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

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-semibold text-white mb-2">
              Confirm Password
            </label>
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

          <!-- Submit -->
          <button
            type="submit"
            class="w-full bg-green-600 hover:bg-green-500
                   text-white font-bold py-3 rounded-xl
                   shadow-lg transition duration-200"
          >
            Create Account
          </button>
        </form>

        <div class="mt-8 text-center">
          <p class="text-white/80">
              Already have an account?
              <RouterLink
                to="/admin/login"
                class="text-green-400 font-semibold hover:underline"
              >
                Log In
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

const handleSignup = () => {
  console.log("Nag-sign up na...");
}
</script>

<style scoped>

</style>