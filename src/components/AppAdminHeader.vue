<template>
    <v-container style="background-color: #393D40;"> 
      <v-row>

        <v-col cols="12" md="2" class="d-flex justify-center align-center">
          
            <v-icon :icon="isDrawerOpen ? 'mdi-close' : 'mdi-menu'" size="large" class="floating-btn" color="#F4DE9B" @click="toggleDrawer"></v-icon>
      
          <v-img
            style="margin: auto; max-width: 50% !important;"
            src="../assets/luxeAuraHorizontalLogo.png"
          >
          </v-img>
        </v-col>

        <v-col cols="12" md="8" class="d-flex justify-center align-center pt-7">
          <v-text-field
            style=" width: 100%;"
            density="compact"
            placeholder="Search customer name, reference number, bookings"
            prepend-inner-icon="mdi-magnify"
            variant="outlined">
          </v-text-field>
        </v-col>

        <v-col cols="12" md="1" sm="2" class="d-none d-sm-flex d-flex justify-center align-center" style="text-align: left !important;" >
          <v-icon
          icon="mdi-bell-outline"
          style="color: #5D6679;"
        />
        <v-avatar image="../assets/olivia-rhye.png"
          style="color: #5D6679;"        />
        </v-col>

      </v-row>
    </v-container>
</template>

<script setup>

  import { inject, computed } from 'vue'

  const toggleDrawer = inject('toggleDrawer')
  const isDrawerOpen = inject('isDrawerOpen')
    
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