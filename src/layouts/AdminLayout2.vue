<template>
  <AppAdminHeader style="min-width: 100%; padding: 1%;" />
  <v-card> 
    <v-layout>
      <!-- Responsive navigation drawer -->
      <v-navigation-drawer
        v-model="drawer"
        :permanent="!isMobile"
        :temporary="isMobile"
        theme="#393D40"
      >
        <v-img
            style="margin: auto; max-width: 80% !important;"
            src="../assets/luxeAuraHorizontalLogo.png">
        </v-img>
        <v-list>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" to="/dashboard" />
          <v-list-item prepend-icon="mdi-list-box-outline" title="Salon Services" to="/services" />
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
        style="min-height: 88vh ; border-radius: 4px !important; background-color: #212121;"
        class="scrollable-tab-content"
      >
        <router-view />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useDisplay } from 'vuetify'

  const drawer = ref(false) // always visible by default on desktop

  const { mobile } = useDisplay()
  const isMobile = computed(() => mobile.value)

  // Provide a toggle function for children (like AppAdminHeader)
  provide('toggleDrawer', () => {
    drawer.value = !drawer.value
  })

  provide('isDrawerOpen', drawer)
</script>

<style scoped>
  .scrollable-tab-content {
    max-height: 45vh;
    overflow-y: auto;
    scrollbar-width: none; 
    scroll-behavior: smooth !important; 
  }

  .v-navigation-drawer {
    padding: 1%;
    font-family: "Abel", sans-serif !important;
    font-weight: normal !important;
  }

  .v-list-item--active {
    color: #F4DE9B !important;
    font-weight: 600 !important;
    background-color: #212121 !important;;
    
  }

  .v-list-item:hover {
    color: #F4DE9B !important;
  }

  .v-btn:hover {
    background-color: #F4DE9B;
    color: #393D40 !important;
  }

</style>
