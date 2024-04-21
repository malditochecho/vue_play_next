<script setup>
import { computed, onMounted } from 'vue'
import useSupabaseTodos from '@/composables/useSupabaseTodos'

// add a new game
import { ref } from 'vue'
const newGame = ref('')
const handleAddGame = () => {
  addRecord({ name: newGame.value })
  newGame.value = ''
}

// set focus on the input field
const newGameRef = ref(null)
onMounted(() => {
  if (newGameRef.value) newGameRef.value.focus()
})

// delete games
const handleDelete = () => {
  deleteRecords(selectedGames.value.map((g) => g.id))
  selectedGames.value = []
}

// fetch games from the database
const { data, error, loading, fetchRecords, addRecord, deleteRecords } = useSupabaseTodos('games')
onMounted(() => fetchRecords())

// list of games: sort
const sortedGames = computed(() =>
  [...data.value].sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }))
)

// list of games: checkbox
const selectedGames = ref([])
const handleCheckbox = (game) => {
  if (selectedGames.value.includes(game)) {
    const index = selectedGames.value.findIndex((g) => g.id === game.id)
    selectedGames.value.splice(index, 1)
  } else {
    selectedGames.value.push(game)
  }
}
</script>

<template>
  <main class="min-h-screen w-full py-8">
    <div class="container mx-auto max-w-xl space-y-8 px-4">
      <!-- title -->
      <h1 class="text-2xl font-bold">What to play next?</h1>

      <!-- new game form -->
      <form @submit.prevent="handleAddGame" class="flex">
        <input
          class="w-full border p-4"
          type="text"
          v-model="newGame"
          ref="newGameRef"
          placeholder="e.g. GTA VI"
        />
        <button class="bg-blue-500 px-4 py-2 text-white" type="submit">add</button>
        <button
          v-if="selectedGames.length"
          @click.stop="handleDelete"
          class="ml-1 bg-red-500 px-4 py-2 text-white"
          type="submit"
        >
          delete
        </button>
      </form>

      <!-- list of games -->
      <p v-if="error">{{ error }}</p>
      <ul v-else class="w-full space-y-1">
        <p v-if="loading">loading</p>
        <li
          v-else
          v-for="game in sortedGames"
          :key="game"
          class="flex items-center space-x-2 bg-white p-4"
        >
          <input type="checkbox" class="h-5 w-5" @change="handleCheckbox(game)" />
          <p>{{ game?.name || 'No name' }}</p>
        </li>
      </ul>
    </div>
  </main>
</template>
