<script setup>
import { RouterLink } from 'vue-router'
import useAuthUser from '@/composables/useAuthUser'
const { user } = useAuthUser()
</script>

<template>
  <nav class="mx-auto grid w-full max-w-lg grid-cols-2 items-center p-4">
    <!-- left column -->
    <div class="col-start-1 flex flex-col items-start justify-center justify-items-end">
      <RouterLink to="/">
        <p class="text-2xl font-black">PLAYNEXT</p>
      </RouterLink>
      <RouterLink to="/games">
        <p class="">Games</p>
      </RouterLink>
    </div>

    <!-- right column -->
    <div class="col-start-2 flex flex-col items-end justify-center justify-items-end">
      <span class="text-xs">{{ user?.email }}</span>
      <RouterLink
        v-if="user"
        to="/logout"
        class="col-start-3 justify-self-end font-bold hover:underline"
      >
        logout
      </RouterLink>
    </div>
  </nav>
</template>
