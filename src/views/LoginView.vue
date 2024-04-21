<script setup>
import { ref } from 'vue'
import useAuthUser from '@/composables/useAuthUser'
import { useRouter } from 'vue-router'

const router = useRouter()
const { login } = useAuthUser()

const loading = ref(false)
const form = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  loading.value = true
  try {
    await login(form.value)
    router.push('/')
  } catch (error) {
    loading.value = false
    alert(error.message)
  }
}
</script>

<template>
  <form @submit.prevent="handleLogin" class="flex min-h-screen max-w-xs flex-col space-y-4 py-8">
    <h1 class="text-center text-2xl font-medium">Welcome back!</h1>
    <input
      v-model="form.email"
      type="text"
      placeholder="email"
      class="rounded border px-4 py-2 text-center shadow-inner"
    />
    <input
      v-model="form.password"
      type="password"
      placeholder="password"
      class="rounded border px-4 py-2 text-center shadow-inner"
    />
    <button
      :disabled="loading"
      :class="{ 'cursor-progress': loading }"
      class="rounded bg-violet-500 py-2 text-white shadow-inner hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 disabled:opacity-50"
      @click.stop="signInWithEmail"
    >
      Login
    </button>
  </form>
</template>
