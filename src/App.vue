<template>
  <v-app style="
    background-image: linear-gradient(rgba(0, 0, 0, 0.90), rgba(0, 0, 0, 0.85)), url('../src/assets/homePic.jpg');
    background-repeat: no-repeat, repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    width: 100vw;
    height: 100vh;">
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


