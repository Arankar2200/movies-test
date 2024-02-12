<template>
  <div class="flex flex-col gap-10" v-if="movie">
    <el-button type="info" class="w-32" @click="router.push({ path: '/movies' })" round>back to movies</el-button>
    <div class="flex gap-10 h-full">
      <el-image class="h-96" :src="movie.Poster" />
      <div class="p-3 flex flex-col">
        <div class="text-2xl font-bold">{{ movie.Title }}</div>
        <div>Year: {{ movie.Year }}</div>
        <div>{{ movie.Director }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useMoviesStore } from "~/stores/movies"

const {
  public: { baseUrl, apiKey },
} = useRuntimeConfig()
const url = `${baseUrl}?apiKey=${apiKey}`
const {
  params: { id },
} = useRoute()

const router = useRouter()
const moviesStore = useMoviesStore()
const movie = ref(null)

const fetchMovie = async () => {
  try {
    await moviesStore.fetchMovieById(url, { i: id })
    movie.value = { ...moviesStore.currentMovie }
  } catch (error) {
    ElMessage.error(error.message)
  }
}
onMounted(() => {
  fetchMovie()
})
</script>
