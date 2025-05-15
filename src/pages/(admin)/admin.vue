<template>
  <v-container class="align-center">
    <v-img
      src="../../assets/favicon.png"
      width="228"
      class="mx-auto mb-4"
    ></v-img>
    <v-row class="fluid d-flex justify-center align-center">
      <v-col cols="12" lg="4" md="6">
        <v-card 
          style="background-color: #393D40; padding: 5%;"
          elevation="8"
          rounded="lg">
          <a
            style="color: #F4DE9B;display: block;  text-align: right !important;"
            href='./'>
            <v-icon icon="mdi-close-circle-outline"></v-icon>
          </a>
          <h1 style="margin: 4% 0% !important; text-align: center;">Welcome Back!</h1>

          <v-btn prepend-icon="mdi-google"
            class="btn-login mb-8"
            block
          >
          Login with Google
          </v-btn>

          <v-row style="margin-bottom: 5%;" class="mx-auto">
            <v-col class="d-flex align-center justify-center">
              <hr style="display: inline-block; width: 45%; vertical-align: middle;"/>
              <p style="display: inline-block; padding: 0% 3%">OR</p>
              <hr style="display: inline-block; width: 45%; vertical-align: middle; "/>
            </v-col>
          </v-row>

          <v-text-field
            density="compact"
            placeholder="User Name"
            prepend-inner-icon="mdi-account-outline"
            variant="outlined"
          ></v-text-field>

          <v-text-field
            style="margin-bottom: 0%; max-height: 5vh !important;"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
          ></v-text-field>

          <v-row class="pa-0 ma-0 align-center justify-space-between" no-gutters style="margin-bottom: 5% !important;">
            <v-col cols="6" class="d-flex align-center pa-0">
              <v-checkbox
                density="compact"
                hide-details
                class="ma-0"
                color="#F4DE9B"
              >
                <template v-slot:label>
                  <span class="text-caption" style="color: #F4DE9B;">Remember Me</span>
                </template>
              </v-checkbox>
            </v-col>

            <v-col cols="6" class="d-flex justify-end align-center pa-0">
              <a
                class="text-decoration-none text-caption"
                style="color: #F4DE9B;"
                href="#"
              >
                Forgot password?
              </a>
            </v-col>
          </v-row>

          <v-btn
            class="btn-login mb-2"
            block
            href="/dashboard"
          >
            Login
          </v-btn>

          <v-card-text class="text-center text-caption">
            Don't have an account?
            <span
              class="text-decoration-none"
              style="color: #F4DE9B; padding-left: 0.5%; display: block;"
            >
            Contact us at ph.devaf@gmail.com and we will take care of everything!
          </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>

  import { ref } from 'vue'
  const visible = ref(false)
  
</script>
<style scoped>
  h1 { 
    font-family: "Barlow Condensed", sans-serif;
    font-weight: 600 !important;
    font-style: normal;
  }
  .btn-login {
    background: linear-gradient(135deg, #f4de9b 0%, #c3a36f 100%) !important;
    border-radius: 9999px !important;
    color: #393D40 !important; 
    text-transform: unset;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 2px 20px 0 rgba(0,0,0,0.19) !important;
    font-weight: 600 !important;
    margin-right: 10% !important;
  }

  @media (max-width : 960px) {
    .forgot-pass-on-mobile {
      text-align: left !important;
      margin-bottom: 2% !important;
    }
  }
</style>