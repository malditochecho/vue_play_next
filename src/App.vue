<script setup>
import { RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
</script>

<template>
  <TheHeader />
  <main class="min-h-screen bg-gray-100">
    <RouterView class="container mx-auto max-w-lg" />
  </main>
</template>
