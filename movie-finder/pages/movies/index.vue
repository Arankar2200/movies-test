<template>
  <div class="flex flex-col gap-5 items-center flex-between justify-center h-full">
    <SearchBox additional-filters />
    <el-carousel class="w-2/3" type="card">
      <el-carousel-item class="bg-violet-300 rounded-lg" v-for="item of moviesStore.movies" :key="item.imdbID">
        <div class="flex justify-between h-full">
          <div class="p-3 flex flex-col justify-between">
            <div>
              <div class="text-2xl font-bold">{{ item.Title }}</div>
              <div>Year: {{ item.Year }}</div>
              <div>{{ item.Director }}</div>
            </div>
            <el-button @click="openMovie(item.imdbID)" type="info" class="w-32" round>open</el-button>
          </div>
          <el-image class="h-full w-1/3" :src="item.Poster" />
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="text-3xl">my movies</div>
    <el-carousel class="w-2/3" type="card">
      <el-carousel-item class="bg-violet-300 rounded-lg" v-for="item of moviesStore.customMovies" :key="item.imdbID">
        <div class="flex justify-between h-full">
          <div class="p-3 flex flex-col justify-between">
            <div>
              <div class="text-2xl font-bold">{{ item.Title }}</div>
              <div>Year: {{ item.Year }}</div>
              <div>{{ item.Director }}</div>
            </div>
          </div>
          <el-image class="h-full w-1/3" :src="item.Poster" />
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script setup>
import { useMoviesStore } from "~/stores/movies"

const router = useRouter()
const moviesStore = useMoviesStore()

const openMovie = (id) => router.push({ path: `/movies/${id}` })
</script>
