<template>
  <v-form v-model="valid">
    <v-container class="d-flex justify-content-center align-items-center">
      <v-row>
        <v-col cols="12" md="6" class="mx-auto pa-5 pb-8">
          <v-card 
            class="mx-auto pa-12 pb-8"
            style="background-color: #393D40;"
            elevation="8"
            rounded="lg">
            <a
                style="color: #F4DE9B; display: block; text-align: right;"
                href='./'
              >
              <v-icon icon="mdi-close-circle-outline"></v-icon>
            </a>
            <h1 style="margin: 4% 0% !important; font-size: 2em; text-align: center;">Creat an Account</h1>
            <v-btn prepend-icon="mdi-google"
              class="btn-login mb-8"
              block
            >
            Continue with Google
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
              v-model="firstName"
              color="primary"
              label="First name"
              variant="outlined"
            ></v-text-field>

            <v-text-field
              density="compact"
              v-model="lastName"
              color="primary"
              label="Last name"
              variant="outlined"
            ></v-text-field>

            <v-text-field
              density="compact"
              v-model="mobileNumber"
              color="primary"
              label="Phone Number"
              variant="outlined"
            ></v-text-field>

            <v-text-field
              density="compact"
              v-model="email"
              placeholder="Enter your email address"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
            >
            </v-text-field>

            <v-text-field
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              v-model="password"
              placeholder="Enter your password"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="visible = !visible"
            >
            </v-text-field>

            <v-text-field
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              v-model="confirmPassword"
              placeholder="Confirm your password"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="visible = !visible"
            >
            </v-text-field>

            <v-btn
              class="btn-login"
              block
            >
              Create account
            </v-btn>

            <v-card-text class="text-center">
              Already have an account?
              <a
                class="text-decoration-none"
                style="color: #F4DE9B; padding-left: 0.5%;"
                href="/login"
                rel="noopener noreferrer"
                target="_blank"
              >
              Login
              </a>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script setup>

  import { ref } from 'vue'
  const visible = ref(false)
  const firstName = ref('')
  const lastName = ref('')
  const mobileNumber = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')

</script>
<style>
  .template {
    background-color: green;
  }

  h1 { 
    font-family: "Barlow Condensed", sans-serif;
    font-weight: 700;
    font-style: normal;
  }

  .btn-login {
    background: linear-gradient(135deg, #f4de9b 0%, #c3a36f 100%) !important;
    border-radius: 9999px !important;
    color: #393D40 !important; 
    width: 150px;
    text-transform: unset !important;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 2px 20px 0 rgba(0,0,0,0.19) !important;
    font-weight: 600 !important;
    margin-right: 10% !important;
  }

</style>
