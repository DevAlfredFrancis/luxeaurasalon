  <template>
    <v-container style="padding-top: 4%;">
      <v-row class="fluid d-flex align-center justify-center">
        <v-col cols="12" md="6"  class="d-none d-md-flex">
          <v-img
          class="mx-auto"
          width="100%"
          src="../../assets/favicon.png"
        >
        </v-img>
        </v-col>

        <v-col cols="12" md="6" lg="6">
          <v-card 
            class="pa-12 pb-8"  
            style="background-color: #393D40;"
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
              placeholder="Enter your email address"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
            ></v-text-field>

            <v-text-field
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              placeholder="Enter your password"
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
            
            <v-card
              class="mb-12"
              color="surface-variant"
              variant="tonal"
            >
              <v-card-text class="text-medium-emphasis text-caption">
                Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot password?" to reset the login password.
              </v-card-text>
            </v-card>

            <v-btn
              class="btn-login mb-5 "
              block
            >
              Login
            </v-btn>

            <v-card-text class="text-center text-caption">
              Don't have an account?
              <a
                class="text-decoration-none"
                style="color: #F4DE9B; padding-left: 0.5%;"
                href="./signup"
              >
              Sign Up
              </a>
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
