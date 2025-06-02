<template>
  <v-container fluid style="padding: 0% 1%;">
    <AppAdminHeader style="border-radius: 12px; margin: 1% 0% !important;"/>
    <v-row class="fill-height">
      <v-col cols="12" md="8">
        <v-sheet style="padding: 2%; border-radius: 12px;">
          <v-row class="pa-2" align-center>
            <v-col cols="12" md="8" class="d-flex align-center">
              <div class="legend-box bg-scheduled"></div>
              <span class="ml-2 mr-4">Scheduled</span>
         
              <div class="legend-box bg-cancelled"></div>
              <span class="ml-2 mr-4">Cancelled</span>
       
              <div class="legend-box bg-completed"></div>
              <span class="ml-2 mr-4">Completed</span>
            </v-col>
            <v-col cols="12" md="4" style="text-align: right;">
              <v-btn variant="outlined" prepend-icon="mdi-plus-circle" color="primary">Add new booking</v-btn>
            </v-col>
          </v-row>
          <vue-cal
            class="pb-5"
            style="height: 77.5vh;"
            :events="events"
            :disable-views="['years','year']"
            :time-from="9 * 60"
            :time-to="20.5 * 60"
            :time-step="30"
            :snap-to-time="false"
            :default-view="week"
            time="12"
            @event-click="handleEventClick"
          />
        </v-sheet>
      </v-col>

      <v-col cols="12" md="4">
        <v-card elevation="2" class="pa-4" style="border-radius: 12px;">
          <template v-if="selectedBooking">
            <v-card-title>
              <v-icon color="primary">mdi-ticket-confirmation-outline</v-icon>
              {{ selectedBooking.bookingRef }}
            </v-card-title>

            <v-divider class="my-2" />

            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ selectedBooking.title }}
                  </v-list-item-title>
                  <v-list-item-subtitle>Customer Name</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ formattedDate }} , {{ formattedTime }}
                  </v-list-item-title>
                  <v-list-item-subtitle>Appointment Date and Time</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ formattedMobile }}
                  </v-list-item-title>
                  <v-list-item-subtitle>Mobile Number</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ selectedBooking.services }}
                  </v-list-item-title>
                  <v-list-item-subtitle>Selected Services</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    ₱ {{ Math.round(selectedBooking.totalPrice)  }}
                  </v-list-item-title>
                  <v-list-item-subtitle>Total Price</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>


              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title 
                  :style="{
                    color: selectedBooking.class === 'Completed'
                      ? '#d5f5d5'
                      : selectedBooking.class === 'Cancelled'
                      ? '#fce1b3'
                      : selectedBooking.class === 'Scheduled'
                      ? '#f8b6b6'
                      : 'gray'
                  }">
                    {{ selectedBooking.class || 'Scheduled' }}
                  </v-list-item-title>
                  <v-list-item-subtitle>Status</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider class="my-2" />

            <v-btn variant="outlined" class="mt-4" color="primary" @click="modal = true" block>
              Update Booking Status
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

  <v-dialog v-model="modal" max-width="600" persistent>
      <v-card class="pa-1 rounded-lg" elevation="2">
        <v-card-title>
          <v-icon color="primary">mdi-ticket-confirmation-outline</v-icon>
          {{ selectedBooking.bookingRef }}
        </v-card-title>

        <v-divider class="my-2" />

        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Customer Name</v-list-item-subtitle>
              <v-list-item-title>
                <v-text-field disabled :label="selectedBooking.title" density="compact" variant="outlined" />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Appointment Date and time</v-list-item-subtitle>
              <v-list-item-title>
                <v-text-field disabled :label="formattedDate + ` ` + formattedTime" density="compact" variant="outlined" />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Mobile Number</v-list-item-subtitle>
              <v-list-item-title>
                <v-text-field disabled :label="formattedMobile" density="compact" variant="outlined" />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Selected Services</v-list-item-subtitle>
              <v-list-item-title>
                <v-textarea disabled
                  :label="selectedBooking.services"
                  density="compact"
                  variant="outlined"
                  auto-grow
                  rows="2" />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title  style="padding-top: 2% !important;">
                <v-select  
                  v-model="selectedBooking.status"
                  :items="bookingStatuses"
                  label="Status"
                  variant="outlined"
                  density="compact" 
                  @change="updateBookingStatus(selectedBooking.id, selectedBooking.status)"/>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>

        <v-card-actions class="justify-end">
          <v-btn variant="outlined" text @click="modal = false" style="text-transform: none; font-weight: 400;color: #858D9D;">Discard</v-btn>
          <v-btn variant="outlined" color="primary" style="text-transform: none; font-weight: 400;" @click="saveStatus">Save</v-btn>
        </v-card-actions>

      </v-card>
  </v-dialog>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import VueCal from 'vue-cal'
  import 'vue-cal/dist/vuecal.css'

  const bookingStatuses = ref([]);
  const modal = ref(false)
  const events = ref([])
  const selectedBooking = ref(null)

  //extract unique statuses from bookings
  function extractUniqueStatus(bookings) {
    return [...new Set(bookings.map(event => event.status))]
  }

  //fetch all bookings
  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings')
      const data = response.data

      events.value = response.data.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }))

      //extract booking status
      bookingStatuses.value = extractUniqueStatus(response.data)

    } catch (error) {
      console.error('Error fetching bookings:', error)
    }
  }

  //update booking status by ID
  const updateBookingStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${id}/status`, {
        status: newStatus
      });
      await fetchBookings(); // Refresh data
    } catch (error) {
      console.error('Failed to update booking status:', error);
    }
  };

  // Save button action
  const saveStatus = async () => {
    if (!selectedBooking.value?.id || !selectedBooking.value?.status) {
      console.error('Missing booking ID or status')
      return
    }

    await updateBookingStatus(selectedBooking.value.id, selectedBooking.value.status)
    modal.value = false
  }

  // Open modal with cloned booking
  function handleEventClick(event) {
    selectedBooking.value = { ...event } // Clone to avoid direct mutation
  }

  //extract appointment date and time to display separately
  const formattedDate = computed(() =>
    selectedBooking.value?.start.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) || ''
  )

  //extract appointment date and time to display separately
  const formattedTime = computed(() =>
    selectedBooking.value
      ? `${selectedBooking.value.start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} - ${selectedBooking.value.end.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`
      : ''
  )

  //format contact for readability
  const formattedMobile = computed(() => {
    const raw = selectedBooking.value?.contact || '';
    const local = raw.replace('+63', '0');
    return local.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
  });

  onMounted(() => {
    fetchBookings()
  })

</script>

<style>
   /* Main title (e.g., "May 2025") */
  .vuecal__title-bar {
    color: #F4DE9B;
    font-weight: bold;
  }

  /* make bolder the  title of vue-cal event */
  .vuecal__event-title {
    font-weight: 500 !important;
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
    border-bottom: 2px solid #F4DE9B;
  }

  /* change color of events count */
  .vuecal__cell-events-count {
    background-color: #f4de9b; 
    color: #393d40;            
    font-weight: bold;
  }

  /* Resize event size to fit in calendar table */
  .vuecal__event {
    padding: 0.5rem;
    margin: 0.2rem;
    max-width: 96% !important;
    box-sizing: border-box;
    border-radius: 6px;
  }

  /* Set style for completed booking */
  .vuecal__event.Completed {
    background-color: #a5d6a7;
    border: 2px solid #2e7d32;
    border-radius: 4px;
    color: #2e7d32;;
  }

  /* Set style for cancelled booking */
  .vuecal__event.Cancelled {
    background-color: #fce1b3;
    border: 2px solid #757575;
    border-radius: 4px;
    color: #757575;
    text-decoration: line-through;
  }

  /* Set style for scheduled booking */
  .vuecal__event.Scheduled {
    background-color: #f8b6b6;
    border: 2px solid #b71c1c;
    border-radius: 4px;
    color: #b71c1c;
  }

  /* add zoom effects in event on hover */
  .vuecal__event:hover {
    transform: scale(1.03);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: 0.2s ease;
  }

  /* set size of legend boxes */
  .legend-box {
    width: 16px;
    height: 16px;
    border-radius: 4px;
  }

   /* Change color button on hover */
  .v-btn:hover {
    background-color: #F4DE9B;
    color: #393D40 !important;
  }

  /* Colors of legend*/
  .bg-scheduled {
    background-color: #ffd5d5;
  }
  .bg-completed {
    background-color: #d5f5d5;
  }
  .bg-cancelled {
    background-color: #fce1b3;
  }

  /* Change style of v-card title*/
  .v-card-title { 
      font-family: "Barlow Condensed", sans-serif;
      font-weight: 600 !important;
  }

  /* Change style of v-card title*/
  .v-list-item {
      font-family: "Abel", sans-serif;
      font-size: 1em;
      font-style: normal;
  }
  
</style>

<!-- Use Layout for Admin -->  
<route lang="json">
  {
    "meta": {
      "layout": "AdminLayout"
    }
  }
</route>
