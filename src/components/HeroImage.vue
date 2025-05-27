<template>
    <v-container style="margin: auto; background-color: transparent; border-radius: 12px; padding: 1% 1% 0% 1% !important; max-width: 100%;">
        <v-row class="fluid d-flex justify-center align-center">
            <v-col cols="12" md="8" >

                <v-card class="hero-vcard" style="background-color: transparent !important; box-shadow: none !important;">
                    <h1 class="hero-title">Experience Pure Luxury at Affordable Prices</h1>
                    <p class="hero-text">Pamper yourself at Luxe Aura Salon and Spa with personalized beauty and wellness services.<br> Book now for a rejuvenating escape.</p>
                    <v-btn size="x-large" class="btn-book-now" to="/BookAppointment"> Book An Appointment   <v-icon icon="mdi-arrow-right" style="margin-left: 2%"></v-icon>
                    </v-btn>
                </v-card>

            </v-col>
        </v-row>
    </v-container>
    
</template> 
<script>

</script>
<style>

    .btn-book-now {
        background: linear-gradient(135deg, #f4de9b 0%, #c3a36f 100%) !important;
        border-radius: 9999px !important;
        color: #393D40 !important;
        text-transform: unset !important;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 2px 20px 0 rgba(0,0,0,0.19) !important;
        font-size: 1.2rem !important;
        padding: 1% 2% !important;
        border-radius: 9999px !important;
        margin: 0 auto;
    }

    /* Mobile override */
  @media (max-width: 768px) {
    .btn-book-now {
        font-size: 1rem !important;
        padding: 1% 3.5% !important;
    }
  }
    
</style>