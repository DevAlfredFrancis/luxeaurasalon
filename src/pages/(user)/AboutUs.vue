<template>
    <v-container style="margin: auto; border-radius: 12px; padding-top: 8% !important;">
        <v-row class="fluid d-flex justify-center align-center">

            <v-col cols="12" md="9">
                <h1 class="hero-title">Meet our CEO</h1>
                <p class="hero-text">At the heart of LuxeAura Salon is our visionary CEO, a passionate leader dedicated to redefining beauty and self-care. With a strong commitment to excellence and innovation, she ensures every client experience reflects the salon’s core values of elegance, comfort, and personalized service.</p>
            </v-col>

            <v-col cols="12" md="3">
                <transition name="fade" mode="out-in">
                    <v-img
                        :src="currentImage"
                        :key="currentImage"
                        class="ceo-img">
                    </v-img>
                </transition>
                
            </v-col>

        </v-row>
    </v-container>
    <div style="padding: 5% 0% !important; min-height: 50vh;">
        <h1 style="text-align: center; margin-bottom: 5%; ">Our Team</h1>
        <p>test</p>
    </div>
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
