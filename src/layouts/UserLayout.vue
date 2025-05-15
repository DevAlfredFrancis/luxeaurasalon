<template>
  <AppHeader></AppHeader>
  <v-main class="app-bckground">
    <router-view />
  </v-main>
  <AppFooter></AppFooter>
</template>

<script setup>
// You can add reusable logic or props here if needed

</script>

<style scoped>
/* Your layout styles here */
  .app-bckground {
    background-image: linear-gradient(rgba(0, 0, 0, 0.90), rgba(0, 0, 0, 0.85)), url('../src/assets/homePic.jpg');
    background-repeat: no-repeat, repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    width: 100vw;
    height: 100vh;
  }

  /* Mobile override */
  @media (max-width: 768px) {
    .app-bckground {
      background-attachment: scroll; /* fixes mobile issues */
      background-position: center;
      background-size: cover;
      min-height: 165vh;
    }
  }

</style>
  