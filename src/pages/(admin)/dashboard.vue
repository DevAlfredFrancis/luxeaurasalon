<template>
  <v-container fluid style="padding: 0% 1%;">
    <AppAdminHeader style="position: sticky; top: 0; z-index: 9; border-radius: 12px; margin-top: 1% !important;"/>
    <h1>Hello, Admin</h1>
    <v-row cols="12">
      <v-col cols="12" md="8">
        <v-card class="pa-5" elevation="1" rounded="lg" style=" box-shadow: none !important; padding-bottom: 3.7% !important;">
          <v-row>
            <div class="text-h6 font-weight-medium">Sales Overview</div>
          </v-row>
          <v-row>
            <v-col cols="12" md="3" sm="12" style="border-right: #F4DE9B 2px solid;">
              <v-img src="../../assets/dashboard_img/Sales_Img.png" style="max-width: 20%; margin: auto;"></v-img>
              <div style="padding-left: 15%; margin-top: 5%;">
                <div class="text-h6 font-weight-bold" style="display: inline-block; vertical-align: middle; margin-right: 30%;">₹ 832</div>
                <div style="display: inline-block; font-size: 1em;">Sales</div>
              </div>
            </v-col>
            <v-col cols="12" md="3" style="border-right: #F4DE9B 2px solid;">
              <v-img src="../../assets/dashboard_img/Revenue.png" style="max-width: 20%; margin: auto;"></v-img>
              <div style="padding-left: 15%; margin-top: 5%;">
                <div class="text-h6 font-weight-bold" style="display: inline-block; vertical-align: middle; margin-right: 20%;">₹ 18,300</div>
                <div style="display: inline-block; font-size: 1em;">Revenue</div>                
              </div>  
            </v-col>  
            <v-col cols="12" md="3" style="border-right: #F4DE9B 2px solid;">
              <v-img src="../../assets/dashboard_img/Profit.png" style="max-width: 20%; margin: auto;"></v-img>
              <div style="padding-left: 15%; margin-top: 5%;">
                <div class="text-h6 font-weight-bold" style="display: inline-block; vertical-align: middle; margin-right: 20%;">₹ 868</div>
                <div style="display: inline-block; font-size: 1em;">Profit</div>                
              </div>
            </v-col>
            <v-col cols="12" md="3">
              <v-img src="../../assets/dashboard_img/Cost.png" style="max-width: 20%; margin: auto;"></v-img>
              <div style="padding-left: 15%; margin-top: 5%;">
                <div class="text-h6 font-weight-bold" style="display: inline-block; vertical-align: middle; margin-right: 20%;">Cost</div>
                <div style="display: inline-block; font-size: 1em;">₹17,432</div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-5" elevation="1" rounded="lg" style=" box-shadow: none !important;">
          <v-row>
            <div class="text-h6 mb-2">Inventory Summary</div>
          </v-row>        
          <v-row>
            <v-col cols="6" class="text-center" style="border-right: #F4DE9B 2px solid;">
              <v-img src="../../assets/dashboard_img/Quantity.png" style="max-width: 20%; margin: auto;"></v-img>
              <div class="text-h6 font-weight-bold">868</div>
              <div style="font-size: 1em;">Quantity in Hand</div>              
            </v-col>
            <v-col cols="6" class="text-center" >
              <v-img src="../../assets/dashboard_img/ToBeReceived.png" style="max-width: 20%; margin: auto;"></v-img>
              <div class="text-h6 font-weight-bold">200</div>
              <div style="font-size: 1em;">To be received</div>              
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card class="pa-5" elevation="1" rounded="lg" style=" box-shadow: none !important; padding-bottom: 3.7% !important;">
          <v-row>
            <div class="text-h6 font-weight-medium">Purchase Overview</div>
          </v-row>
          <v-row>
            <v-col cols="12" md="3" sm="12" style="border-right: #F4DE9B 2px solid;">
              <v-img src="../../assets/dashboard_img/Purchase.png" style="max-width: 20%; margin: auto;"></v-img>
              <div style="padding-left: 15%; margin-top: 5%;">
                <div class="text-h6 font-weight-bold" style="display: inline-block; vertical-align: middle; margin-right: 30%;">82</div>
                <div style="display: inline-block; font-size: 1em;">Purchase</div>
              </div>
            </v-col>
            <v-col cols="12" md="3" style="border-right: #F4DE9B 2px solid;">
              <v-img src="../../assets/dashboard_img/Cost.png" style="max-width: 20%; margin: auto;"></v-img>
              <div style="padding-left: 15%; margin-top: 5%;">
                <div class="text-h6 font-weight-bold" style="display: inline-block; vertical-align: middle; margin-right: 20%;">₹ 13,573</div>
                <div style="display: inline-block; font-size: 1em;">Cost</div>                
              </div>  
            </v-col>  
            <v-col cols="12" md="3" style="border-right: #F4DE9B 2px solid;">
              <v-img src="../../assets/dashboard_img/Cancel.png" style="max-width: 20%; margin: auto;"></v-img>
              <div style="padding-left: 15%; margin-top: 5%;">
                <div class="text-h6 font-weight-bold" style="display: inline-block; vertical-align: middle; margin-right: 20%;">5</div>
                <div style="display: inline-block; font-size: 1em;">Cancel</div>                
              </div>
            </v-col>
            <v-col cols="12" md="3">
              <v-img src="../../assets/dashboard_img/Profit.png" style="max-width: 20%; margin: auto;"></v-img>
              <div style="padding-left: 15%; margin-top: 5%;">
                <div class="text-h6 font-weight-bold" style="display: inline-block; vertical-align: middle; margin-right: 20%;">₹17,432</div>
                <div style="display: inline-block; font-size: 1em;">Return</div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>  

      <v-col cols="12" md="4">
        <v-card class="pa-5" elevation="1" rounded="lg" style=" box-shadow: none !important;">
          <v-row>
            <div class="text-h6 mb-2">Product Summary</div>
          </v-row>        
          <v-row>
            <v-col cols="6" class="text-center" style="border-right: #F4DE9B 2px solid;">
              <v-img src="../../assets/dashboard_img/Suppliers.png" style="max-width: 20%; margin: auto;"></v-img>
              <div class="text-h6 font-weight-bold">31</div>
              <div style="font-size: 1em;">Number of Suppliers</div>              
            </v-col>
            <v-col cols="6" class="text-center" >
              <v-img src="../../assets/dashboard_img/Categories.png" style="max-width: 20%; margin: auto;"></v-img>
              <div class="text-h6 font-weight-bold">21</div>
              <div style="font-size: 1em;">Number of Categories</div>              
            </v-col>
          </v-row>
        </v-card>
      </v-col>

    </v-row>  
  </v-container>
</template>

<script setup>

</script>

<style>

</style>

<route lang="json">
  {
    "meta": {
        "layout": "AdminLayout"
    }
  }
</route>