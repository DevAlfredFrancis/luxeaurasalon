<template>
  <v-container fluid style="padding: 0% 1%;">

    <AppAdminHeader style="border-radius: 12px; margin: 1% 0% !important;"/>



    <v-row class="fill-height">
      <v-col cols="12" md="12">

        <v-card class="pt-5" elevation="1" rounded="lg">
          <v-card-title>
            <v-btn class="me-2" variant="outlined" color="primary" prepend-icon="mdi-plus-circle" @click="modal = true">Add Services</v-btn>
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="services"
            class="my-table m-1"
            :items-per-page="5"
            item-value="services_name"
          >
            <!-- HEADER SLOT -->
            <template #headers="{ columns }">
              <tr class="custom-header">
                <th v-for="column in columns" :key="column.key">
                  {{ column.title }}
                </th>
              </tr>
            </template>

            <!-- ROW SLOT -->
            <template #item="{ item }">
              <tr>
                <td>{{ item.services_name }}</td>
                <td>{{ item.category }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.duration_minutes }}</td>
                <td>₱ {{ Math.round(item.price) }}</td>
                <td>
                  <v-btn icon size="small" color="primary" variant="text" @click="editService(item)" style="margin-right: 5%;">
                    <v-icon>mdi-pencil-outline</v-icon>
                  </v-btn>
                  <v-btn icon size="small" variant="text" color="error" @click="deleteService(item)">
                    <v-icon>mdi-trash-can</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>

       </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="modal" max-width="600" persistent>
    <v-form ref="serviceForm">
      <v-card class="pa-1 rounded-lg" elevation="2">

        <v-card-title>
          {{ isEditMode ? 'Edit Salon Service' : 'Add Salon Service' }}
        </v-card-title>

        <v-divider class="my-2" />

        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Service Name</v-list-item-subtitle>
              <v-list-item-title>
                <v-text-field 
                  v-model="services_name"
                  density="compact" 
                  variant="outlined" />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Category</v-list-item-subtitle>
              <v-list-item-title>
                <v-select  
                  v-model="selectedCategory"
                  :items="serviceCategories"
                  variant="outlined"
                  density="compact" />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Description</v-list-item-subtitle>
              <v-list-item-title>
                <v-textarea
                  v-model="description"
                  density="compact"
                  variant="outlined"
                  auto-grow
                  rows="2" />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Duration (in minutes)</v-list-item-subtitle>
              <v-list-item-title>
                <v-text-field 
                  v-model="duration_minutes"
                  density="compact" 
                  variant="outlined" />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Price</v-list-item-subtitle>
              <v-list-item-title>
                <v-text-field 
                  v-model="price"
                  density="compact" 
                  variant="outlined" />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>

        <v-card-actions class="justify-end">
          <v-btn 
            variant="outlined" 
            text 
            @click="() => { resetForm(); modal = false }"
            style="text-transform: none; 
            font-weight: 400;color: #858D9D;">
            Discard
          </v-btn>
          <v-btn variant="outlined" color="primary" style="text-transform: none; font-weight: 400;" @click="submitService">Save</v-btn>
        </v-card-actions>

      </v-card>
    </v-form>
  </v-dialog>

  <!-- alert box once services added, updated or deleted -->
  <v-dialog
    v-model="showNotification"
    width="350"
    persistent
    hide-overlay
    transition="fade-transition"
    content-class="notification-dialog"
  >
    <v-card class="pa-4" color="success" dark>
      <v-card-text class="text-center">
        {{ notificationMessage }}
      </v-card-text>
    </v-card>
  </v-dialog>

</template>

<script setup>
import {ref, onMounted} from 'vue';
import axios from 'axios'

const modal = ref(false)
const services = ref([])
const serviceCategories = ref([])
const  services_name =  ref('');
const  selectedCategory =  ref('');
const  description =  ref('');
const  duration_minutes =  ref('');
const  price =  ref('');

//alert notifications for added, updated or deleted services 
const showNotification = ref(false)
const notificationMessage = ref('')
const notificationType = ref('success') // can be 'success' | 'error'

//function to trigger notification
const triggerNotification = (message, type = 'success') => {
  notificationMessage.value = message
  notificationType.value = type
  showNotification.value = true

  setTimeout(() => {
    showNotification.value = false
  }, 2000)
}


const headers = [
  { title: 'Services Name', key: 'services_name' },
  { title: 'Category', key: 'category' },
  { title: 'Description', key: 'description' },
  { title: 'Duration (Minutes)', key: 'duration_minutes' },
  { title: 'Price', key: 'price' },
  { title: 'Actions', key: 'actions', sortable: true },
];

//get category enum from services table
function extractUniqueCategory(services) {
  return [...new Set(services.map(event => event.category))]
}

// Fetch data from the backend API
const fetchServices = async () => {
  try {
    // Fetch services
    const response = await axios.get('http://localhost:5000/api/services');
    services.value = response.data; // Store the response data in the ref

    //extract service category
    serviceCategories.value = extractUniqueCategory(response.data)
    
  } catch (error) {
    console.error("There was an error fetching the data:", error);
  }
};

onMounted(() => {
  fetchServices();
});

const isEditMode = ref(false)
const editingServiceId = ref(null)

const resetForm = () => {
  services_name.value = ''
  selectedCategory.value = ''
  description.value = ''
  duration_minutes.value = ''
  price.value = ''
  editingServiceId.value = null
  isEditMode.value = false
}


//submit new service
const submitService = async () => {
  try {
    if (isEditMode.value && editingServiceId.value) {
      await axios.put(`http://localhost:5000/api/services/${editingServiceId.value}`, {
        services_name: services_name.value,
        category: selectedCategory.value,
        description: description.value,
        duration_minutes: duration_minutes.value,
        price: price.value,
      })
      triggerNotification('Service updated successfully')
    } else {
      await axios.post('http://localhost:5000/api/services', {
        services_name: services_name.value,
        category: selectedCategory.value,
        description: description.value,
        duration_minutes: duration_minutes.value,
        price: price.value,
      })
      triggerNotification('Service added successfully')
    }

    modal.value = false
    resetForm()
    fetchServices()

  } catch (error) {
    console.error("Error saving service:", error)
  }
};

//edit selected service
const editService = (service) => {
  services_name.value = service.services_name
  selectedCategory.value = service.category
  description.value = service.description
  duration_minutes.value = service.duration_minutes
  price.value = service.price
  editingServiceId.value = service.id
  isEditMode.value = true
  modal.value = true
};

//delete selected service
const deleteService = async (service) => {
  if (confirm(`Are you sure you want to delete "${service.services_name}"?`)) {
    try {
      await axios.delete(`http://localhost:5000/api/services/${service.id}`)
      fetchServices()
      triggerNotification('Service deleted successfully')
    } catch (error) {
      console.error("Error deleting service:", error)
    }
  }
}

</script>

<style scoped>

  /* Change color of header table */
  .custom-header {
    background-color: #393D40 !important;
    color: #F4DE9B !important;
    font-weight: 600;
  }

  /* Change color button on hover */
  .v-btn:hover {
    background-color: #F4DE9B;
    color: #393D40 !important;
  }

  .notification-dialog {
    max-width: 350px !important;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    text-align: center;
    font-weight: 600;
    font-size: 1.2rem;
  }


  /* transition for alert box */
  .fade-out {
    transition: opacity 0.8s ease-in-out;
  }
  .fade-out[v-cloak] {
    opacity: 0;
  }

</style>

<route lang="json">
  {
    "meta": {
        "layout": "AdminLayout"
    }
  }
</route>