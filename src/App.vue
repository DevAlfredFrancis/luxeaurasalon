<template>
  <v-app >
    <router-view />
  </v-app>
</template>

<script setup>
  import { onMounted } from 'vue'
  import router from './router'

  onMounted(() => {
    console.log('--- ROUTES ---')
    console.log(router.getRoutes())
  })
</script>

<style>
  /* Mobile override */
  @media (max-width: 768px) {
    .v-app {
      background-attachment: scroll; /* fixes mobile issues */
      background-position: center;
      background-size: cover;
    }
  }
</style>


