<template>
  <div class="w-full min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-lg mx-auto px-6"> <!-- increased from md -> lg -->

      <!-- SIGN UP FORM -->
      <div class="bg-white p-8 md:p-10 rounded-3xl border border-green-200 shadow-sm">

        <h3 class="text-2xl font-bold text-gray-800 mb-8 text-center">
          Sign Up
        </h3>

        <form @submit.prevent="handleSignup" class="space-y-5">

          <!-- Full Name -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Juan Dela Cruz"
              class="w-full px-4 py-3 rounded-xl
                     border border-green-300
                     focus:ring-2 focus:ring-green-500
                     focus:border-green-500
                     outline-none transition"
              required
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@email.com"
              class="w-full px-4 py-3 rounded-xl
                     border border-green-300
                     focus:ring-2 focus:ring-green-500
                     focus:border-green-500
                     outline-none transition"
              required
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
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

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>
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

          <!-- Submit -->
          <button
            type="submit"
            class="w-full bg-green-600 hover:bg-green-700
                   text-white font-bold py-3 rounded-xl
                   shadow-lg transition duration-200"
          >
            Create Account
          </button>
        </form>

        <!-- Login Link -->
        <p class="mt-6 text-center text-gray-600">
          Already have an account?
          <RouterLink
            to="/admin/login"
            class="text-green-600 font-semibold hover:underline"
          >
            Log In
          </RouterLink>
        </p>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const handleSignup = () => {
  console.log('Nag-sign up na...')
}
</script>

<style scoped>
/* Tailwind handles all styling */
</style>