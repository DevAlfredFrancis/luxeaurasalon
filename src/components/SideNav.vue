<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        theme="dark"
        permanent
      >
        <v-list color="transparent">
          <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" to="/admin/dashboard"></v-list-item>
          <v-list-item prepend-icon="mdi-account-box" title="Bookings" to="/admin/a_services"></v-list-item>
          <v-list-item prepend-icon="mdi-gavel" title="Sales"></v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn block>
              Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <v-main style="height: 100vh">
      </v-main>
    </v-layout>
  </v-card>
</template>

<style scoped>
    .nav-link {
      text-decoration: none;
      color: #5D6679; 
    }
    .router-link-exact-active {
        color: #1570EF !important;
        font-weight: bold !important;
    }
</style>