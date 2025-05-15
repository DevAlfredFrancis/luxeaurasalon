<template>
  <div style="padding: 5% 0% !important; min-height: 100vh !important;">
    <h1 style="text-align: center; margin-bottom: 5%;">Our Services</h1>
    <v-card>
      
      <v-tabs
        v-model="selectedTab"
        align-tabs="center"
        color="#F4DE9B">
        <v-tab v-for="tab in tabs" :key="tab">{{ tab }}</v-tab>
      </v-tabs>
      <div class="scrollable-tab-content">
        <v-tabs-window v-model="selectedTab" style="margin-bottom: 1%;">
          <v-tabs-window-item
            v-for="n in 5"
            :key="n"
            :value="n"
          >
          
              <v-container fluid>
                <v-row>
                  <v-col v-for="item in filteredServices" :key="item.id" cols="12" md="6">
                    <v-card style="background-color: #404448;" class="pa-4">
                      <v-row>
                        <!-- Left Column for Service Details -->
                        <v-col cols="8">
                          <div>
                            <h3 style="font-size: 20px;">{{ item.services_name }}</h3>
                            <p style="font-size: 14px; color: #ccc;">{{ item.duration_minutes }} minutes</p>
                            <p style="font-size: 16px;">{{ formatPrice(item.price) }}</p>
                          </div>
                        </v-col>

                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
        
          </v-tabs-window-item>
        </v-tabs-window>
      </div>
    </v-card>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue';
  import axios from 'axios';
  
  const step = ref(1);
  const selectedTab = ref(0)

  const tabs = ['All Services', 'Hair', 'Nails', 'Spa', 'Other']
  const services = ref([])

  //axios
  onMounted(async () => {
  // Fetch data from the backend API
    try {
      const response = await axios.get('http://localhost:5000/api/data');
      services.value = response.data; // Store the response data in the ref
    } catch (error) {
      console.error("There was an error fetching the data:", error);
    }
  });

  //function to formatPrice
  function formatPrice(price) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const filteredServices = computed(() => {
  const tab = tabs[selectedTab.value]

    if (tab === 'All Services') return services.value
    return services.value.filter(service =>
      service.category.toLowerCase() === tab.toLowerCase()
    )
  })






</script>
<style>

  .scrollable-tab-content {
    max-height: 45vh;
    overflow-y: auto;
    scrollbar-width: none; 
    scroll-behavior: smooth !important; 
  }
  .scrollable-tab-content:hover {
    scrollbar-width: thin; 
    scrollbar-color: #F4DE9B transparent;
    margin: 0px !important;
    background-color: transparent !important;
    scroll-behavior: smooth !important;
    white-space: nowrap;
  }

</style>