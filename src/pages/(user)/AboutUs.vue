<template>
    <v-container style="margin: auto; border-radius: 12px; padding-top: 8% !important;">
        <v-row class="fluid d-flex justify-center align-center mb-10">

            <v-col cols="12" md="9">
                <h1 class="hero-title">Meet our CEO</h1>
                <p class="hero-text">At the heart of LuxeAura Salon is our visionary CEO, a passionate leader dedicated to redefining beauty and self-care. With a strong commitment to excellence and innovation, she ensures every client experience reflects the salon’s core values of elegance, comfort, and personalized service.</p>
            </v-col>

            <v-col cols="12" md="3">
                <transition name="fade" mode="out-in">
                    <v-img
                        :src="currentImage"
                        :key="currentImage"
                        min-width="300"
                        min-height="450"
                        cover
                        style="background-color: antiquewhite; border-radius: 12px;">
                    </v-img>
                </transition>
            </v-col>
        </v-row>
    </v-container>

    <v-container fluid class="my-16" style="background-color: #212121;">
        <h2 class="text-center font-weight-bold mb-10">OUR TEAM</h2>
        <v-row dense>
            <v-col
                v-for="n in 6"
                :key="n"
                cols="12"
                sm="6"
                md="6"
                class="d-flex justify-center">
                <v-card width="500" height="450" elevation="2">
                    <v-row>
                        <v-col cols="12" md="6" >
                            <v-skeleton-loader type="image" style="max-height: 140vh !important;" cover/>
                        </v-col>

                        <v-col cols="12" md="6" >
                            <v-card-text>
                                <div class="font-weight-bold mb-2">NAME</div>
                                <div class="text-body-2">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry...
                                </div>
                            </v-card-text>
                        </v-col>

                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>

<script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue'

    const images = [
        new URL('@/assets/ceo_1.jpg', import.meta.url).href,
        new URL('@/assets/ceo_2.jpeg', import.meta.url).href,
    ]

    const currentIndex = ref(0)
    const currentImage = ref(images[currentIndex.value])
    let intervalId

    onMounted(() => {
    intervalId = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % images.length
        currentImage.value = images[currentIndex.value]
    }, 5000)
    })

    onBeforeUnmount(() => {
    clearInterval(intervalId)
    })
</script>

<style>

    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s ease;
    }

    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }
</style>

<route lang="json">
    {
        "meta": {
            "layout": "UserLayout"
        }
    }
</route>
