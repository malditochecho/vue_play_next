<script setup>
import { RouterLink } from 'vue-router'
import useAuthUser from '@/composables/useAuthUser'
const { isLoggedIn } = useAuthUser()
</script>

<template>
  <nav class="mx-auto grid w-full max-w-lg grid-cols-3 items-center p-4">
    <p class="col-start-2 text-2xl font-black">PLAYNEXT</p>
    <RouterLink
      v-if="isLoggedIn"
      :to="{ name: 'logout' }"
      class="col-start-3 justify-self-end font-bold hover:underline"
    >
      logout
    </RouterLink>
  </nav>
</template>
