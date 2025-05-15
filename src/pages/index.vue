<template>
  <HeroImage style="margin-top: 8%;"></HeroImage>
  <div style="background-color: white; margin-top: 8%;">
    <v-carousel
      ref="carouselRef"
      height="400"
      show-arrows="hover"
      :cycle="autoplay"
      hide-delimiter-background
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
      >
        <v-sheet
          :color="colors[i]"
          :style="{ color: fontColor[i] }"
          height="100%"
        >
          <div class="d-flex fill-height justify-center align-center text-center px-6">
            <div>
              <h2 class="text-h4 font-weight-bold mb-4">{{ slide.title }}</h2>
              <p class="text-subtitle-1 pb-5">{{ slide.text }}</p>  
            </div>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
  <ListServices />
</template>

<script setup>
  import { ref, onMounted } from 'vue'

  //display carousel
  const carouselRef = ref(null)
  const autoplay = ref(true) // custom autoplay control

  const colors = [
    '#404448',      
    '#F4DE9B',      
    '#FFB300'
  ]

  const fontColor = [
    '#fff',
    '#2C2C2C',
    '#212121'
  ]

  const slides = [
    {
      title: 'Sign Up & Enjoy Exclusive Benefits!',
      text: 'Unlock discounts, track your service history, and get personalized recommendations based on your preferences.',
      btn: 'Sign Up Now'
    },
    {
      title: 'Celebrate Mom This May! ',
      text: 'Treat her to the gift of relaxation with our Mother’s Day Specials — exclusive packages, pampering treatments, and limited-time discounts all month long.',
    },
    {
      title: "You're in Expert Hands ",
      text: 'Our professionals deliver a premium, personalized experience every visit.',
    }
  ]

</script>

<style scoped>
  .main-bg {
    background-image: url('@/assets/homePic.jpg');
    background-repeat: no-repeat, repeat;
    background-size: cover;
    max-width: 100% !important;
    max-height: auto;
    padding: 2%;
  }
</style>

<route lang="json">
  {
      "meta": {
          "layout": "UserLayout"
      }
  }
</route>