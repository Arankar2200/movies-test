export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@element-plus/nuxt", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
      apiKey: process.env.BASE_API_KEY,
    },
  },
})
