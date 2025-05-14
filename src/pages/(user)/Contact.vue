<template>
    <v-container style="padding: 4% 0%;">
        <v-row class="fluid d-flex">
            
            <v-col cols="12" md="6" lg="6">

                <v-card 
                    style="background-color: transparent; box-shadow: none !important; "
                    elevation="8"
                    rounded="lg">

                    <h1 class="h-get-touch" style="text-align: left; padding: 0% !important; margin: 0% !important;">Get in Touch</h1>  

                    <v-card-text class="p-get-touch text-left mb-6" style="padding: 0%;">
                        We’re here to help with bookings, questions, or anything else you need. Visit us in person or reach out online; we’ll respond promptly.   
                    </v-card-text> 
                    
                    <v-card-text class="text-left mb-4" style="padding: 0%; color: white;">

                        <div style="display: flex; align-items: center; margin-bottom: 1.5%;">
                            <v-icon icon="mdi-phone-outline" style="margin-right: 8px; color: #F4DE9B" />
                            0954-374-1435
                        </div>

                        <div style="display: flex; align-items: center; margin-bottom: 1.5%;">
                            <v-icon icon="mdi-email-outline" style="margin-right: 8px; color: #F4DE9B" />
                            ph.luxeaurasalon@gmail.com
                        </div>

                        <div style="display: flex; align-items: center; margin-bottom: 1.5%;">
                            <v-icon icon="mdi-store-clock-outline" style="margin-right: 8px; color: #F4DE9B" />
                            Open Daily (9:00 AM – 8:00 PM)
                        </div>

                        <div style="display: flex; align-items: center; margin-bottom: 1.5%;">
                            <v-icon icon="mdi-facebook" style="margin-right: 8px; color: #F4DE9B" />
                            Follow us on&nbsp;
                            <a
                            href="https://www.facebook.com/profile.php?id=61570291820939"
                            class="text-decoration-none"
                            style="color: #F4DE9B;"
                            target="_blank"
                            >
                            Facebook
                            </a>
                        </div>

                        <div style="display: flex; align-items: center; margin-bottom: 3%;">
                            <v-icon icon="mdi-map-marker-outline" style="margin-right: 8px; color: #F4DE9B" />
                            76 St. Dayangdang, Naga City, Camarines Sur, PH <br /> (Infront of Dayangdang Barangay Hall)
                        </div>

                        <AppMap />
                    </v-card-text>
                    
                </v-card>
            </v-col>
            
            <v-col cols="12" md="6" lg="6">
                <v-card 
                    class="pa-12 pb-8"  
                    style="background-color: #393D40;"
                    elevation="8"
                    rounded="lg">

                    <v-text-field
                        density="compact"
                        label="Name"
                        variant="outlined"
                        >
                    </v-text-field>    
                    
                    <v-text-field
                        density="compact"
                        label="Mobile Number"
                        variant="outlined"
                        >
                    </v-text-field>  
                    
                    <v-text-field
                        density="compact"
                        label="Email"
                        variant="outlined"
                        >
                    </v-text-field>   

                    <v-row>
                        <v-col cols="12">
                            <v-textarea
                                style="min-height: 20vh"
                                v-model="message"
                                :prepend-icon="icon"
                                clear-icon="mdi-close-circle"
                                label="Message"
                                type="text"
                                variant="outlined"
                                auto-grow
                                counter="00"
                                :maxlength="500"
                                clearable
                                @click:clear="clearMessage"
                            ></v-textarea>
                        </v-col>
                    </v-row>

                    <v-btn
                    class="btn-submit mb-5"
                    >
                    Submit
                    </v-btn>

                    <span class="text-left text-caption mb-4" style="padding: 0%; display: block;">
                        Never share sensitive information (credit card numbers, social security numbers, passwords) through this form.
                    </span>

                    <span class="text-left text-caption mb-4" style="padding: 0%;">
                        This site is protected by reCAPTCHA and the Google
                    <a
                        class="text-decoration-none"
                        style="color: #F4DE9B; padding-left: 0.5%;"
                        href="#"
                    >
                    Privacy Policy
                    </a>
                    and
                    <a
                        class="text-decoration-none"
                        style="color: #F4DE9B; padding-left: 0.5%;"
                        href="#"
                    >
                    Terms of Service apply
                    </a>
                    .
                </span>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template> 

<script setup>

    import { ref } from 'vue'
    const visible = ref(false)

    //form message
    const message = ref('')

    function clearMessage() {
        message.value = ''
    }
    
</script>

<style scoped>
    h1 { 
        font-family: "Barlow Condensed", sans-serif;
        font-weight: 600 !important;
        font-style: normal;
    }
    .btn-submit {
        background: linear-gradient(135deg, #f4de9b 0%, #c3a36f 100%) !important;
        border-radius: 9999px !important;
        color: #393D40 !important; 
        width: 150px;
        text-transform: unset;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 2px 20px 0 rgba(0,0,0,0.19) !important;
    }
    .v-card-text {
        font-family: "Abel", sans-serif;
        font-size: 1em;
        font-style: normal;
    }
    .p-get-touch {
        font-family: "Abel", sans-serif;
        font-size: 1.2em;
        font-weight: 500;
    }

    .h-get-touch {
        font-size: 3em;
    }

    @media (max-width : 960px) {
        .forgot-pass-on-mobile {
        text-align: left !important;
        margin-bottom: 2% !important;
        }
    }
</style>

<route lang="json">
    {
        "meta": {
            "layout": "UserLayout"
        }
    }
</route>