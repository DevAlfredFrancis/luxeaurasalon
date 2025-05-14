<template>
  <AppAdminHeader style="min-width: 100%; padding: 1%;" />
  <v-card>
    <v-layout>
      <!-- Responsive navigation drawer -->
      <v-navigation-drawer
        v-model="drawer"
        :permanent="!isMobile"
        :temporary="isMobile"
        theme="light"
      >
        <v-list>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" to="/dashboard" />
          <v-list-item prepend-icon="mdi-account-box" title="Services" to="/a_services" />
          <v-list-item prepend-icon="mdi-gavel" title="Bookings" />
          <v-list-item prepend-icon="mdi-gavel" title="Customer" />
          <v-list-item prepend-icon="mdi-gavel" title="Sales" />
          <v-list-item prepend-icon="mdi-gavel" title="Inventory" />
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn block variant="outlined" color="#F4DE9B">
              Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>

      <v-main
        style="min-height: 88vh; background-color: #F0F1F3; border-radius: 4px !important;"
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

  const drawer = ref(true) // always visible by default on desktop

  const { mobile } = useDisplay()
  const isMobile = computed(() => mobile.value)

  // Provide a toggle function for children (like AppAdminHeader)
  provide('toggleDrawer', () => {
    drawer.value = !drawer.value
  })
</script>

<style scoped>
  .scrollable-tab-content {
    max-height: 45vh;
    overflow-y: auto;
    scrollbar-width: none; 
    scroll-behavior: smooth !important; 
  }

  .v-list-item--active {
    color: #F4DE9B !important;
    font-weight: 600 !important;
    
  }

  .v-list-item:hover {
    color: #F4DE9B !important;
    
  }

  .v-btn:hover {
    background-color: #F4DE9B;
    color: #393D40 !important;
  }

</style>
