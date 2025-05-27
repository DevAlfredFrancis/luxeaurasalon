<template>
    <v-container style="background-color: #393D40;" fluid class="d-flex justify-center align-center"> 
      <v-row class="pa-0 ma-0 align-center justify-space-between">

        <v-col cols="12" md="3" sm="6" xs="6" class="align-center justify-center ma-0 pa-0">
          <v-text-field
            density="compact"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            style="max-height: 40px !important;">
          </v-text-field>
        </v-col>

        <v-col cols="12" md="9"  style="text-align: right !important;" class="d-none d-flex justify-end align-center pa-0" >
          <v-icon
          icon="mdi-bell"
          color="#F4DE9B"
          />
          <v-avatar image="../assets/olivia-rhye.png" style="color: #5D6679; border: 1px solid #F4DE9B; margin-left: 1%;"/>
          <v-label style="padding: 0% 1% 0% 0.5%;">Diana Dela Cruz</v-label>
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