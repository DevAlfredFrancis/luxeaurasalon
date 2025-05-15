<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer" app temporary style="position: absolute; top: 100px;">
      <v-list nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.link"
          :title="item.text"
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar class="app-bar">
      <template #prepend>
        <!-- Show burger button only on mobile -->  
        <v-app-bar-nav-icon
          v-if="display.smAndDown.value"
          @click="drawer = !drawer"
        />
      </template>

      <v-img
        style="background-color: aqua; padding: 0px !important; margin: 0px !important"
        src="../assets/logoFinal.jpg"
      />
      <!-- Desktop Navigation -->
      <template v-if="display.mdAndUp.value" >
        <v-btn 
          v-for="(item, i) in items"
          :key="i"
          :to="item.link"
          class="me-2 text-none"
          slim
          v-bind="item"
          color="white"
          style="text-transform: uppercase !important;"
        />
      </template>

      <v-spacer />
        <v-btn class="ms-1" icon >
          <v-avatar image="../assets/olivia-rhye.png" style="border: 0.5px solid #F4DE9B;"/>
          <v-menu activator="parent" origin="top">
            <v-list>
              <v-list-item link title="Update profile" />
              <v-list-item link title="View Bookings" />
              <v-list-item link title="Sign out" />
            </v-list>
          </v-menu>
        </v-btn>
        <v-label style="padding: 0% 1% 0% 0.5%;">Diana</v-label>
        <v-btn
          class="ms-1"
          color="#F4DE9B"
          icon="mdi-bell-outline"
        />
    </v-app-bar>

    <v-main>
      <!--  -->
    </v-main>
  </v-layout>
</template>
  
<script setup>
  import { shallowRef, watch } from 'vue'
  import { useDisplay } from 'vuetify';
  import HeroImage from './HeroImage.vue';

  const drawer = shallowRef(false)
  const display = useDisplay();

  watch(
    () => display.smAndDown.value,
    (isMobile) => {
      if (!isMobile) {
        drawer.value = false; // Close drawer when switching to desktop
      }
    },
    { immediate: true } // Run this on page load
  );

  const items = [
    {
      text: 'Home',
      link: './'
    },
    {
      text: 'Services',
      link: './services'
    },
    {
      text: 'About',
      link: './about'
    },
    {
      text: 'Contact',
      link: './contact'
    },
  ]
</script>

<style>
  .v-main {
    background-image: url('../assets/homePic.jpg');
    background-size: cover; 
    background-repeat: no-repeat; 
    height: 50vh; 
  }
  .app-bar {
    background-color: #393D40 !important; 
    height: 100px; 
    padding: 1% 10% 0% 10% !important;
    font-family: "Abel", sans-serif !important;
    font-size: 5em !important;
    font-style: normal !important;
  }

  .hero-image {
    width: 75%;   
    margin: auto;
    padding: 1% ;
    opacity: 50% !important;
  }
</style>