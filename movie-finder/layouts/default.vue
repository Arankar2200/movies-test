<template>
  <el-container class="h-screen">
    <el-container>
      <el-header class="bg-indigo-200 flex items-center justify-between">
        <NuxtLink to="/" class="font-black text-4xl text-sky-500">MovieFinder</NuxtLink>
        <NuxtLink to="/movies/create" class="font-black text-4xl text-sky-500"> <el-button type="primary" class="w-32" round>Create</el-button></NuxtLink>
      </el-header>
      <el-main class="bg-indigo-100"><slot /></el-main>
      <el-footer class="bg-indigo-200"></el-footer>
    </el-container>
  </el-container>
</template>
