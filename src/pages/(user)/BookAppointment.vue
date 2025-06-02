<template> 
  <v-container class="app-bckground" style="padding: 1%; margin-top: 1%;" >
    <a
      v-if="step >= 1 && step <=3"
      style="color: #F4DE9B; display: block;  text-align: left !important; text-decoration: none; margin-left: 1%;"
      href='./'>
      <v-icon icon="mdi-close-circle-outline"></v-icon>
      Cancel
    </a>
    <v-row>
      <v-col cols="12" md="12" class="mx-auto pa-5 pb-2">
        <v-stepper v-model="step">
          <v-stepper-header>
              <v-stepper-item title="Select Services" :value="1" :complete="step > 1" :color="step > 1 ? 'stepperActive' : '#F4DE9B' "/>
              <v-stepper-item title="Select Date & Time" :value="2" :complete="step > 2" :color="step > 2 ? 'stepperActive' : '#F4DE9B'"/>
              <v-stepper-item title="Confirmation" :value="3" :complete="step > 3" :color="step > 3 ? 'stepperActive' : '#F4DE9B' " />
              <v-stepper-item title="Success"  :value="4" :complete="step === 4" :color="step === 4 ? 'stepperActive' : '#F4DE9B' " />
          </v-stepper-header>
          
          <v-row style="padding: 1%;">
            <v-col cols="12" :md="step === 4 ? 12 : 8">
              <v-stepper-window>
                <v-stepper-window-item :value="1" >
                    <!-- Service selection form -->
                    <v-tabs
                      v-model="selectedTab"
                      align-tabs="right"
                      color="#F4DE9B">
                      <v-tab v-for="tab in tabs" :key="tab">{{ tab }}</v-tab>
                    </v-tabs>

                    <v-tabs-window v-model="selectedTab" style="margin-bottom: 1%;">
                      <v-tabs-window-item
                        v-for="n in 4"
                        :key="n"
                        :value="n"
                      >
                        <div class="scrollable-tab-content">
                          <v-container fluid>
                            <v-row>
                              <v-col v-for="item in filteredServices" :key="item.id" cols="12" md="12">
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

                                    <!-- Right Column for Add Button -->
                                    <v-col cols="4" class="d-flex justify-center align-center">
                                      <v-btn
                                        v-if="!isServiceAdded(item.id) && selectedServices.length < MAX_SERVICES"
                                        size="small"
                                        prepend-icon="mdi-plus-circle"
                                        variant="outlined"
                                        color="#F4DE9B"
                                        @click="addService(item)"
                                        :disabled="selectedServices.length >= MAX_SERVICES"
                                      >
                                        Add
                                      </v-btn>

                                      <span v-else-if="isServiceAdded(item.id)" style="color: #F4DE9B;"><v-icon icon="mdi-check" size="x-small"></v-icon>Added</span>

                                      <v-btn
                                      v-else="!isServiceAdded(item.id) && selectedServices.length < MAX_SERVICES"
                                      size="small"
                                      prepend-icon="mdi-plus-circle"
                                      variant="outlined"
                                      color="#F4DE9B"
                                      @click="addService(item)"
                                      :disabled="selectedServices.length >= MAX_SERVICES"
                                    >
                                      Add
                                    </v-btn>

                                    </v-col>
                                  </v-row>
                                </v-card>
                              </v-col>
                            </v-row>
                          </v-container>
                        </div>
                      </v-tabs-window-item>
                    </v-tabs-window>
                    
                    <hr style="margin-bottom: 2%;"/>
                    <v-row class="mb-2">
                      <v-col cols="12">
                        <v-alert type="info" variant="tonal" color="amber-darken-1" class="text-body-2">
                          <strong>Note:</strong> You may select up to <strong>5 services</strong> per appointment. If you'd like to book more, please complete this booking first and create another appointment.
                        </v-alert>
                      </v-col>
                    </v-row>

                    <v-tooltip location="top"  v-if="selectedServices.length === 0">
                      <template #activator="{ props }">
                        <span v-bind="props">
                          <v-btn
                            variant="outlined"
                            color="#F4DE9B"
                            :disabled="selectedServices.length === 0"
                            @click="step++"
                          >
                            Continue
                          </v-btn>
                        </span>
                      </template>
                        Please select at least one service to continue
                    </v-tooltip>
                    <!-- When the button is enabled, no tooltip needed -->
                    <v-btn
                      v-else
                      variant="outlined"
                      color="#F4DE9B"
                      @click="step++"
                    >
                      Continue
                    </v-btn>
                </v-stepper-window-item>
                
                <!-- Date and time selection -->
                <v-stepper-window-item :value="2">
                  <div class="scrollable-tab-content">
                    
                    <v-container style="margin-bottom: 2%;">
                      <v-row justify="space-around" >
                        <v-date-picker
                          v-model="form.date"
                          color="primary"
                          :min="minDate"
                        ></v-date-picker>
                      </v-row>
                    </v-container>

                    <!-- Time selection buttons, morning -->
                    <h4>Morning</h4>
                    <hr style="margin-bottom: 2%;" />

                    <div class="time-slot-container">
                      <v-row class="mb-4">
                        <v-col
                          v-for="time in morningTimes"
                          :key="time"
                          cols="12"
                          sm="6"
                          md="3"
                        >
                          <v-btn
                            :class="['time-btn', { active: form.time === time, booked: bookedTimes.includes(time) }]"
                            variant="outlined"
                            color="primary"
                            :disabled="bookedTimes.includes(time)"
                            :title="bookedTimes.includes(time) ? 'Already booked' : ''"
                            @click="selectTime(time)"
                          >
                            {{ time }}
                          </v-btn>
                        </v-col>
                      </v-row>
                    </div>

                    <!-- Time selection buttons, afternoon -->
                    <h4>Afternoon</h4>
                    <hr style="margin-bottom: 2%;" />

                    <div class="time-slot-container">
                      <v-row class="mb-4">
                        <v-col
                          v-for="time in afternoonTimes"
                          :key="'afternoon-' + time"
                          cols="12"
                          sm="6"
                          md="3"
                        >
                          <v-btn
                            :class="['time-btn', { active: form.time === time, booked: bookedTimes.includes(time) }]"
                            variant="outlined"
                            color="primary"
                            :disabled="bookedTimes.includes(time)"
                            :title="bookedTimes.includes(time) ? 'Already booked' : ''"
                            @click="selectTime(time)"
                          >
                            {{ time }}
                          </v-btn>
                        </v-col>
                      </v-row>
                    </div>
                  </div>              

                  <hr style="margin-bottom: 2%;"/>
                  <v-row class="mb-2">
                    <v-col cols="12">
                      <v-alert type="info" variant="tonal" color="amber-darken-1" class="text-body-2">
                        <strong>Note:</strong> You can't book for today. Please choose another date. Select both the date and time to continue. 
                      </v-alert>
                    </v-col>
                  </v-row>
                  <v-btn variant="outlined" color="#F4DE9B" @click="step--" style="margin-right: 2%; !important">Back</v-btn>

                  <v-tooltip location="top" v-if="!form.date || !form.time">
                    <template #activator="{ props }">
                      <span v-bind="props">
                        <v-btn
                          variant="outlined"
                          color="#F4DE9B"
                          :disabled="!form.date || !form.time"
                          @click="step++"
                        >
                          Continue
                        </v-btn>
                      </span>
                    </template>
                    Please select both a date and time to continue.
                  </v-tooltip>
                  <!-- When the button is enabled, no tooltip needed -->
                  <v-btn
                    v-else
                    variant="outlined"
                    color="#F4DE9B"
                    @click="step++"
                  >
                    Continue
                  </v-btn>

                </v-stepper-window-item>
        
                <!-- Customer Info -->
                <v-stepper-window-item :value="3">
                  <h4>Customer Information</h4>
                  <hr style="margin-bottom: 2%;" />
                  <v-form ref="customerForm" v-model="valid">
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="12" class="mx-auto" >
       
                            <v-row>
                              <v-col cols="12" md="6" class="mx-auto">
                                <v-text-field
                                  class="mb-1"
                                  density="compact"
                                  v-model="firstName"
                                  :rules="[nameRule]"
                                  color="primary"
                                  label="First name"
                                  variant="outlined"
                                  @keypress="onlyLettersInput"
                                  required
                                ></v-text-field>
                              </v-col>

                              <v-col cols="12" md="6" class="mx-auto">
                                <v-text-field
                                  class="mb-1"
                                  density="compact"
                                  v-model="lastName"
                                  :rules="[nameRule]"
                                  color="primary"
                                  label="Last name"
                                  variant="outlined"
                                  @keypress="onlyLettersInput"
                                  required
                                ></v-text-field>
                              </v-col>
                            </v-row>

                            <v-text-field
                              class="mb-1"
                              density="compact"
                              v-model="rawMobile"
                              :rules="[mobileRule]"
                              color="primary"
                              label="Mobile Number"
                              variant="outlined"
                              prefix="+639"
                              maxlength="9"
                              type="tel"
                              persistent-hint
                            ></v-text-field>

                            <v-text-field
                              class="mb-1"
                              density="compact"
                              v-model="email"
                              :rules="[emailRule]"
                              placeholder="Enter your email address"
                              prepend-inner-icon="mdi-email-outline"
                              variant="outlined"
                            >
                            </v-text-field>

                            <v-row>
                              <v-col cols="12">
                                <v-alert type="info" variant="tonal" color="amber-darken-1" class="text-body-2">
                                  <strong>Notice:</strong> Online payment is not yet available. If you need to cancel your booking, please notify us in advance so we can offer the slot to another customer. Thank you!
                                </v-alert>
                              </v-col>
                            </v-row>

                            <v-checkbox
                              v-model="agreed"
                              :rules="[v => !!v || 'You must agree before confirming.']"
                              label="I have read and understood the notice above."
                              required
                            />

                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                  <hr style="margin-bottom: 2%;"/>
                  <v-btn variant="outlined" color="#F4DE9B" @click="step--" style="margin-right: 2%;">Back</v-btn>
                  <v-btn variant="outlined" color="#F4DE9B" @click="submitBooking">Confirm Booking</v-btn>
                </v-stepper-window-item>
              
                <!-- Success -->
                <v-stepper-window-item :value="4" style="padding: 1%; text-align: center;">                  
                  <h1 class="h_success">SUCCESS</h1>
                  <p class="p_success">Your booking reference number is <strong style="color: #F4DE9B">{{ bookingReference }}</strong>.</p>
                  <p class="p_success">You'll receive an email confirming your appointment.</p>
                  <p class="p_success">Thank you for choosing us!</p>
                  <v-icon color="#218838" icon="mdi-check-circle" size="200"></v-icon>
                  <hr style="margin-bottom: 2%;"/>
                  <v-btn variant="outlined" color="#F4DE9B" to="/">Back to Home</v-btn>
                </v-stepper-window-item>

              </v-stepper-window>
            </v-col>
            
            <!-- Appointment Summary -->
            <v-col v-if="step >= 1 && step <= 3" cols="12" md="4" style="margin-top: 1.7%;">
              <h4 style="text-align: center; padding-bottom: 1%;">Appointment Summary</h4>
              <hr />

              <v-row>               
                <v-col class="mx-auto pa-5 pb-2"> 

                  <!-- Appointment Date & Time Summary -->
                  <v-card
                    v-if="step > 2 && form.date && form.time"
                    style="margin-bottom: 2%; padding: 2%; box-shadow: none !important;"
                  >
                    <v-row>
                      <v-col cols="2" class="d-flex justify-center align-center">
                        <v-icon icon="mdi-calendar-clock-outline" size="x-large"></v-icon>
                      </v-col>
                      <v-col cols="10">
                        <p class="mb-0">{{ formatSelectedDate(form.date) }}</p>
                        <p class="mb-0">{{ form.time }}</p>
                      </v-col>
                    </v-row>

                  </v-card>

                  <v-card
                    v-for="service in selectedServices"
                    :key="service.id"
                    style="margin-bottom: 2%; padding: 2%; background-color: #404448;"
                  >
                    <v-row>
                      <!-- Left Column for Service Details -->
                      <v-col cols="8">
                        <div style="padding: 1%;">
                          <h4 >{{ service.services_name }}</h4>
                          <p style="font-size: 0.8em !important; color: #ccc;"> {{ service.duration_minutes }} mins</p>
                          <p style="font-size: 1em; ">{{ formatPrice(service.price) }}</p>
                        </div>
                      </v-col>

                      <!-- Right Column for Remove Button -->
                      <v-col cols="4" class="d-flex align-center justify-end">
                        <v-btn
                          v-if="step !== 2 && step !== 3 && step !== 4"
                          size="small"
                          prepend-icon="mdi-delete-outline"
                          variant="outlined"
                          color="#F4DE9B"
                          @click="removeService(service.id)"
                        >
                          Remove
                        </v-btn>
                      </v-col>
                    </v-row>
                    
                  </v-card>
                  <hr style="margin-bottom: 2%;" v-if="selectedServices.length >= 1"/>
                  <v-row class="mb-2" v-if="selectedServices.length >= 1">
                    <v-col cols="12">
                      <v-alert type="info" density="compact" variant="tonal" class="text-body-2 mb-2" color="amber-darken-1">
                        Note: Final price may vary based on promotions or service changes. This is an estimate only.
                      </v-alert>
                      <p class="text-h6 font-weight-bold">
                        Total: {{ totalPrice }}
                      </p>
                    </v-col>
                  </v-row>

                </v-col>
              </v-row>
            </v-col>

          </v-row>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
  <AppFooter />
</template>
  
<script setup>
  import { ref, computed, onMounted } from 'vue';
  import axios from 'axios';
  
  const step = ref(1);
  const selectedTab = ref(0)

  const tabs = ['All Services', 'Hair', 'Nails', 'Spa', 'Other']
  const services = ref([])

  //for dynamically updating appointment summary
  const selectedServices = ref([])
  const MAX_SERVICES = 5;

  //disable add button if selected services max
  function addService(service) {
    const exists = selectedServices.value.find(s => s.id === service.id)
    if (!exists && selectedServices.value.length < MAX_SERVICES) { //limit selected services to 5
      selectedServices.value.push(service)  
    }
  }

  // Function to check if service is already added
  function isServiceAdded(serviceId) {
    return selectedServices.value.some(s => s.id === serviceId);
  }
  //Remove selected service
  function removeService(serviceId) {
    selectedServices.value = selectedServices.value.filter(s => s.id !== serviceId)
  }

  //Function to compute total service duration
  const totalServiceDuration = computed(() => {
    return selectedServices.value.reduce((sum, service) => sum + Number(service.duration_minutes || 0), 0);
  });


  //axios
  onMounted(async () => {
  // Fetch data from the backend API
    try {
      // Fetch services
      const response = await axios.get('http://localhost:5000/api/services');
      services.value = response.data; // Store the response data in the ref

      // Fetch bookings
      await fetchBookings();
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

  // Update Tab based on services category
  const filteredServices = computed(() => {
  const tab = tabs[selectedTab.value]

    if (tab === 'All Services') return services.value
    return services.value.filter(service =>
      service.category.toLowerCase() === tab.toLowerCase()
    )
  })

  //calendar and time picker
  const form = ref({
    service: '',
    datetime: '',
    time: '',
    date: '',
  });

  const morningTimes = generateTimeSlots(9, 11.5, 'AM');  // 9:00 AM - 11:30 AM
  const afternoonTimes = generateTimeSlots(12, 18.5, 'PM'); // 12:00 PM - 6:30 PM

  // Store selected date
  const selectedDate = ref(null)

  //Disable past dates and present date,Get tomorrows date in YYYY-MM-DD format
  const today = new Date()
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0]

  // Generate time slots based on a given start and end time
  function generateTimeSlots(startHour, endHour) {
    const times = [];
    let startTime = startHour;

    while (startTime <= endHour) {
      const hours = Math.floor(startTime);
      const minutes = (startTime % 1) * 60;
      const formattedTime = formatTime(hours, minutes);
      times.push(formattedTime);
      startTime += 0.5; // 30-minute interval
    }

    return times;
  }

  // Format time to 12-hour format with AM/PM
  function formatTime(hours24, minutes) {
    const period = hours24 < 12 ? 'AM' : 'PM';
    let hours12 = hours24 % 12;
    if (hours12 === 0) hours12 = 12; // midnight or noon fix

    const formattedMinutes = minutes === 0 ? '00' : minutes.toString().padStart(2, '0');
    return `${hours12}:${formattedMinutes} ${period}`;
  }

  // Set the selected time to the form
  function selectTime(time) {
    form.value.time = time;
  }

  //format Date
  function formatSelectedDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  //get data from bookings table
  const bookings = ref([]);
  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/bookings');
      bookings.value = res.data.map(b => ({
        ...b,
        start: new Date(b.start),
        end: new Date(b.end)
      }));
    } catch (err) {
      console.error('Error loading bookings:', err);
    }
  };

  //disable time slot based on total duration successfully booked by client
  const bookedTimes = computed(() => {
    if (!form.value.date) return [];

    const selectedDateStr = new Date(form.value.date).toDateString();
    const disabled = new Set();

    bookings.value.forEach(event => {
      const start = new Date(event.start);
      const end = new Date(event.end);

      if (start.toDateString() !== selectedDateStr) return;

      let current = new Date(start);
      while (current < end) {
        disabled.add(formatTime(current.getHours(), current.getMinutes()));
        current.setMinutes(current.getMinutes() + 30);
      }
    });

    return Array.from(disabled);
  });

  //customer form validation
  const firstName = ref('');
  const lastName = ref('');
  const email = ref('');
  const valid = ref(false);
  const rawMobile = ref(''); // only 9 digits from user
  const customerForm = ref();

  // name validation
  const nameRule = (v) => {
    if (!v) return 'This is required.';
    if (!/^[A-Za-z\s'-]+$/.test(v)) return 'Only letters, spaces, hyphens, or apostrophes are allowed.';
    return true;
  };

  //only letters to input in name validation
  function onlyLettersInput(event) {
    const char = String.fromCharCode(event.charCode);
    if (!/^[A-Za-z\s'-]$/.test(char)) {
      event.preventDefault();
    }
  }

  //mobile validation 
  const mobileRule = (v) => {
    if (!v) return 'Mobile number is required.';
    if (!/^\d{9}$/.test(v)) return 'Enter a valid mobile number';
    return true;
  };

  //email validation
  const emailRule = (v) => {
    if (!v) return 'Email is required.';
    // Stricter email pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(v) ? true : 'Enter a valid email address.';
  };

  // Combine +639 and raw input for submission
  const mobileNumber = computed(() => '+639' + rawMobile.value);

  //checkbox notice
  const agreed = ref(false);

  //generate booking reference
  const bookingReference = ref('');

  function generateBookingReference() {
    const timestamp = Date.now().toString(36).toUpperCase(); // Encodes current time
    const random = Math.random().toString(36).substr(2, 4).toUpperCase(); // Adds randomness
    return `LUXE-${timestamp}-${random}`; // Example: LUXE-KT0XW4-3GH1
  }

  //compute total services selected by client
  const rawTotalPrice = computed(() => {
    return selectedServices.value.reduce((sum, service) => sum + Number(service.price), 0);
  });
  
  //compute total price of selected services
  const totalPrice = computed(() => {
    const total = selectedServices.value.reduce((sum, service) => sum + Number(service.price), 0);
    return total.toLocaleString('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
    });
  });

  //parse date and time before sending to database
  function parseDateTime(dateStr, timeStr) {
    const [hoursStr, minutesStr, period] = timeStr.match(/(\d+):(\d+)\s(AM|PM)/).slice(1);
    let hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr);

    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    const date = new Date(dateStr);
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  //get current date and time
  function getCurrentDateTimeInPH() {
    const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' });
    const [date, time] = now.split(', ');
    const [month, day, year] = date.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${time}`;
  }

  //submit booking
  const submitBooking = async () => {
    const { valid } = await customerForm.value.validate();
    const bookingRef = generateBookingReference();
    const status = 'Scheduled';
    bookingReference.value = bookingRef;
    
    const appointmentDateTime = parseDateTime(form.value.date, form.value.time);
    const appointment_datetime = appointmentDateTime.toISOString(); // or format manually if needed

    if (valid) {
      try {
        await axios.post('http://localhost:5000/api/bookings', {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          mobileNumber: mobileNumber.value,
          services: selectedServices.value,
          duration: totalServiceDuration.value,
          bookingReference: bookingRef,
          appointment_datetime,
          totalPrice: rawTotalPrice.value,
          status: status,
          createdAt: getCurrentDateTimeInPH()
        });
          console.log('Booking submitted!');
          console.log("Received duration:", totalServiceDuration.value);
          step.value++;
        } catch (error) {
          console.error('Failed to submit booking:', error);
      }
    } else {
        console.log('Validation failed');
      }
  };
  
</script>

<style scoped>
  .v-btn:hover {
    background-color: #F4DE9B;
    color: #393D40 !important;
  }
  .scrollable-tab-content {
    max-height: 50vh;
    overflow-y: auto;
    scroll-behavior: smooth !important; 
    scrollbar-width: thin; 
    scrollbar-color: #F4DE9B transparent;
    margin: 0px !important;
    white-space: nowrap;
  }
  .v-date-picker {
  min-width: 100% !important;
  background-color: white !important;
  color: #393D40;
  }
  .time-btn {
    width: 100%; 
    margin-bottom: 0.5%;
  }
  .time-btn.active {
    background-color: #F4DE9B;
    color: #393D40 !important;
  }
  .time-slot-container {
    max-height: 60vh;
    overflow-y: auto;
    padding: 1rem;
    scrollbar-width: none; /* Firefox - hide by default */
    scroll-behavior: smooth !important; /* Smooth scroll */
  }

  .h_success {
    font-family: "Barlow Condensed", sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 2.5em;
  }
  .p_success {
    font-family: "Abel", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 1.2rem;
  }

  /* Mobile override */
  @media (max-width: 768px) {
    .app-bckground {
      background-attachment: scroll; /* fixes mobile issues */
      background-position: center;
      background-size: cover;
      min-height: 132vh;
    }
  }
</style>