<template>
  <div class="w-1/3" v-loading.fullscreen.lock="fullscreenLoading">
    <el-input @keyup.enter="fetchMovies" v-model="searchValue" size="large" placeholder="Search...">
      <template #append>
        <el-button :icon="Search" @click="fetchMovies" />
      </template>
    </el-input>
  </div>
</template>
<script setup>
import { Search } from "@element-plus/icons-vue"
import { useMoviesStore } from "~/stores/movies"

const props = defineProps({
  isMovieExist: {
    type: Boolean,
    default: false,
  },
})
const {
  public: { baseUrl, apiKey },
} = useRuntimeConfig()
const url = `${baseUrl}?apiKey=${apiKey}`
const { isMovieExist } = props

const searchValue = ref("")
const fullscreenLoading = ref(false)
const moviesStore = useMoviesStore()
const router = useRouter()

const fetchMovies = async () => {
  fullscreenLoading.value = true
  try {
    const params = {
      s: searchValue.value,
    }
    await moviesStore.fetchMovies(url, params)
    if (!isMovieExist) {
      router.push({ path: "/movies" })
    }
  } catch (error) {
    ElMessage.error(error.message)
  } finally {
    fullscreenLoading.value = false
  }
}
</script>
