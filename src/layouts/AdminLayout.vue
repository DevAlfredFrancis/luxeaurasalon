<template>
  <v-layout>
    <!-- Responsive navigation drawer -->
    <v-navigation-drawer
      v-model="drawer"
      :permanent="!isMobile"
      :temporary="isMobile"
    >
      <v-img
          style="margin: auto; width: 90%;"
          src="../assets/favicon2.png">
      </v-img>
      <p style="text-align: center; margin: 5% 0%;">Management System</p>
      <hr />
      <v-list style="margin-top: 15%;">
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" to="/dashboard" />
        <v-list-item prepend-icon="mdi-list-box-outline" title="Salon Services" to="/adminservices" />
        <v-list-item prepend-icon="mdi-calendar-account-outline" title="Bookings" to="/bookings"/>
        <v-list-item prepend-icon="mdi-account-box" title="Customer" to="/customers"/>
        <v-list-item prepend-icon="mdi-chart-bar" title="Sales" to="/sales"/>
      </v-list> 

      <template v-slot:append>
        <div class="pa-2">
          <v-list-item prepend-icon="mdi-cog-outline" title="Settings"></v-list-item>
          <v-list-item prepend-icon="mdi-logout" title="Log out"></v-list-item>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main
      style="min-height: 100vh ; background-color: #212121;"
    >
      <router-view />
    </v-main>
  </v-layout>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useDisplay } from 'vuetify'

  const drawer = ref(true) // always visible by default on desktop

  const { mobile } = useDisplay()
  const isMobile = computed(() => mobile.value)

  // Provide a toggle function for children (like AppAdminHeader)
  provide('toggleDrawer', () => {
    drawer.value = !drawer.value
  })

  provide('isDrawerOpen', drawer)
</script>

<style scoped>

  .v-navigation-drawer {
    padding: 1%;
    font-family: "Abel", sans-serif !important;
    font-weight: normal !important;
  }

  .v-list-item--active {
    color: #F4DE9B !important;
    border-radius: 12px !important;
  }

  .v-list-item:hover {
    color: #F4DE9B !important;
    border-radius: 12px !important;
  }

  .v-btn:hover {
    background-color: #F4DE9B;
    color: #393D40 !important;
  }

</style>
