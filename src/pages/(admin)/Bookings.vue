<template>
  <v-container fluid style="padding: 0% 1%;">
    <AppAdminHeader style="position: sticky; top: 0; z-index: 9; border-radius: 12px; margin: 1% 0% !important;"/>
    <v-row class="fill-height">
      <v-col cols="12" md="8">
        <v-sheet style="padding: 2%; border-radius: 12px;">
          <v-row class="pa-2" align-center>
            <v-col cols="auto" class="d-flex align-center">
              <div class="legend-box bg-scheduled"></div>
              <span class="ml-2">Scheduled</span>
            </v-col>
            <v-col cols="auto" class="d-flex align-center">
              <div class="legend-box bg-cancelled"></div>
              <span class="ml-2">Cancelled</span>
            </v-col>
            <v-col cols="auto" class="d-flex align-center">
              <div class="legend-box bg-completed"></div>
              <span class="ml-2">Completed</span>
            </v-col>
          </v-row>
          <vue-cal  class="pb-10"
            style="height: 80vh;"
            :events="events"
            :disable-views="['years','year']"
            :time-from="9 * 60"
            :time-to="20.5 * 60"
            :time-step="30"
            default-view="week"
            time="12"
            @event-click="handleEventClick"
          />
        </v-sheet>
      </v-col>

      <v-col cols="12" md="4">
        <v-card elevation="2" class="pa-4" style="height: 100%; border-radius: 12px;">
          <template v-if="selectedBooking">
            <v-card-title class="text-h6 font-weight-bold">
              {{ selectedBooking.title }}
            </v-card-title>

            <v-divider class="my-2" />

            <v-list dense>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="primary">mdi-calendar</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ new Date(selectedBooking.start).toLocaleString() }}
                  </v-list-item-title>
                  <v-list-item-subtitle>Start Time</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="primary">mdi-clock-end</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ new Date(selectedBooking.end).toLocaleString() }}
                  </v-list-item-title>
                  <v-list-item-subtitle>End Time</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="primary">mdi-tag</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ selectedBooking.class || 'Scheduled' }}
                  </v-list-item-title>
                  <v-list-item-subtitle>Status</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider class="my-2" />

            <v-chip
              class="ma-1"
              color="deep-purple lighten-4"
              v-for="service in selectedBooking.services || []"
              :key="service"
            >
              {{ service }}
            </v-chip>

            <v-btn class="mt-4" color="success" block>
              Mark as Completed
            </v-btn>
          </template>

          <template v-else>
            <div class="text-center">
              <v-icon size="48" color="grey lighten-1">mdi-calendar-alert</v-icon>
              <p class="text-subtitle-1 mt-2">No booking selected</p>
              <p class="text-caption">Click a booking on the calendar to view details</p>
            </div>
          </template>
        </v-card>
      </v-col>

    </v-row>  
  </v-container>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import VueCal from 'vue-cal'
  import 'vue-cal/dist/vuecal.css'

  const events = ref([])
  const selectedBooking = ref(null)
  const todaysBookings = ref([])

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings')
      events.value = response.data.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end)
      }))
      selectedBooking.value = todaysBookings.value[0] || null
    } catch (error) {
      console.error('Error fetching bookings:', error)
    }
  }

  onMounted(() => {
    fetchBookings()
  })

  function handleEventClick(event) {
    selectedBooking.value = event
  }

</script>

<style>
   /* Main title (e.g., "May 2025") */
  .vuecal__title-bar {
    color: #F4DE9B;
    font-weight: bold;
  }

  /* Weekday names (e.g., Mon, Tue...) */
  .vuecal__weekdays .vuecal__weekday {
    color: #F4DE9B;
    font-weight: 500;
  }

  /* Unselected tabs */
  .vuecal__view-btn {
    background-color: transparent;
    color: #F4DE9B;
  }

  /* Active tab */
  .vuecal__view-btn--active {
    background-color: #F4DE9B; 
    color: #393D40; 
  }


  .vuecal__cell-events-count {
    background-color: #f4de9b; 
    color: #393d40;            
    font-weight: bold;
  }

  .vuecal__event {
    padding: 0.5rem;
    margin: 0.2rem;
    max-width: 95% !important;
    max-height: 7.8vh !important;
    box-sizing: border-box; /* Ensures padding doesn't overflow */
    border-radius: 6px;
  }


  .vuecal__event.Completed {
    background-color: #a5d6a7;
    border-radius: 4px;
    color: #2e7d32;;
  }

  .vuecal__event.Cancelled {
    background-color: #fce1b3;
    border-radius: 4px;
    color: #757575;
    text-decoration: line-through;
  }

  .vuecal__event.Scheduled {
    background-color: #f8b6b6;
    border-radius: 4px;
    color: #b71c1c;
  }

  .vuecal__event:hover {
    transform: scale(1.03);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: 0.2s ease;
  }

  .legend-box {
    width: 16px;
    height: 16px;
    border-radius: 4px;
  }

  .bg-scheduled {
    background-color: #ffd5d5;
  }
  .bg-completed {
    background-color: #d5f5d5;
  }
  .bg-cancelled {
    background-color: #fce1b3;
  }

</style>

<route lang="json">
  {
    "meta": {
      "layout": "AdminLayout"
    }
  }
</route>
