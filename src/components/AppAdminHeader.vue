<template>
    <v-container style="background-color: #393D40;" fluid class="d-flex justify-center align-center"> 
      <v-row class="pa-0 ma-0 align-center justify-space-between" no-gutters>

        <!-- Burger Icon (Mobile Only) -->
        <v-col cols="auto" class="d-md-none">
          <v-icon icon="mdi-menu" color="#F4DE9B" @click="toggleDrawer" />
        </v-col>

        <!-- Search Field -->
        <v-col cols="auto" class="flex-grow-1 px-1">
          <v-text-field
            density="compact"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            style="max-height: 40px !important;"
            hide-details
          />
        </v-col>

        <!-- Notification Icon -->
        <v-col cols="auto" class="px-1">
          <v-icon icon="mdi-bell" color="#F4DE9B" />
        </v-col>

        <!-- Avatar -->
        <v-col cols="auto" class="px-1">
          <v-avatar image="../assets/olivia-rhye.png" style="background-color: #F4DE9B;" />
        </v-col>

        <!-- Name (Desktop Only) -->
        <v-col cols="auto" class="d-none d-md-inline">
          <v-label style="padding: 0% 1% 0% 0.5%;">Diana Dela Cruz</v-label>
        </v-col>

      </v-row>
    </v-container>
</template>

<script setup>

  import { ref, inject } from 'vue'

  const toggleDrawer = inject('toggleDrawer')
  const showSearch = ref(false)

  const toggleSearch = () => {
  showSearch.value = !showSearch.value
}
    
</script>

<style>
 /* Show floating button only on mobile devices */
 @media (max-width: 768px) {
    /* .floating-btn {

    } */
  }

  /* Hide floating button on larger screens */
  @media (min-width: 769px) {
    
  }

  .logo-img {
    display: block;
  }

  @media (max-width: 600px) {
    .logo-img {
      display: none;
    }
  }
  
</style>