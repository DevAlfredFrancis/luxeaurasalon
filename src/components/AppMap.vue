<template>
  <v-row>
    <v-col cols="12">
      <v-card class="pa-0" elevation="8" rounded="lg" >
        <div id="map" style="width: 100%; height: 29vh;"></div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { onMounted } from 'vue';

function initMap() {
  const luxeAuraLocation = { lat: 13.629383506329313, lng: 123.19392062700699 };

  const map = new google.maps.Map(document.getElementById('map'), {
    center: luxeAuraLocation,
    zoom: 16,
    styles: [ // Optional dark theme styling
      {
        "elementType": "geometry",
        "stylers": [{ "color": "#212121" }]
      },
      {
        "elementType": "labels.icon",
        "stylers": [{ "visibility": "off" }]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#757575" }]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [{ "color": "#212121" }]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{ "color": "#2e2e2e" }]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{ "color": "#383838" }]
      },
      {
        "featureType": "road.arterial",
        "stylers": [{ "color": "#4a4a4a" }]
      },
      {
        "featureType": "transit",
        "stylers": [{ "color": "#2f2f2f" }]
      },
      {
        "featureType": "water",
        "stylers": [{ "color": "#000000" }]
      }
    ]
  });

  // Custom marker (can use your logo or gold pin icon)
  new google.maps.Marker({
    position: luxeAuraLocation,
    map: map,
    title: "Luxe Aura Salon and Spa",
    icon: {
      url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
      scaledSize: new google.maps.Size(40, 40)
    }
  });
}


function waitForGoogleMaps() {
  return new Promise((resolve) => {
    const check = () => {
      if (window.google && window.google.maps) {
        resolve();
      } else {
        setTimeout(check, 100);
      }
    };
    check();
  });
}

onMounted(async () => {
  await waitForGoogleMaps();
  initMap();
});
</script>