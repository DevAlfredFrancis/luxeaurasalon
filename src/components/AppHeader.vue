<template>
  <v-navigation-drawer v-model="drawer" app temporary style="position: absolute; top: 72px;" persistent>
    <v-list nav>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.link"
        :title="item.text"
      />
    </v-list>
  </v-navigation-drawer>

  <v-app-bar>
    <!-- Show burger button only on mobile -->  
    <v-app-bar-nav-icon v-if="display.smAndDown.value"
      @click="drawer = !drawer"
    />

    <v-img src="../assets/favicon.png" class="header-logo" />

    <!-- Desktop Navigation -->
    <div class="nav-items">
      <template v-if="display.mdAndUp.value">
        <v-btn
          v-for="(item, i) in items"
          :key="i"
          :to="item.link"
          variant="text"
          class="nav-btns"
        >
          {{ item.text }}
        </v-btn>
      </template>
    </div>
    <v-btn class="btn-login" to="./login"> Login </v-btn>
    <v-btn class="btn-booknow" @click="goToBooking"> Book Now </v-btn>
  </v-app-bar>
</template>
  
<script setup>
  import { shallowRef, watch } from 'vue'
  import { useDisplay } from 'vuetify';
  import { useRouter } from 'vue-router'; 

  const drawer = shallowRef(false)
  const display = useDisplay();
  const route = useRouter();

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
      text: 'Services',
      link: '/'
    },
    {
      text: 'About Us',
      link: '/aboutus'
    },
    {
      text: 'Contact',
      link: '/contact'
    },
  ]

  function goToBooking() {
    route.push('/BookAppointment')
  }

</script>

<style>

</style>