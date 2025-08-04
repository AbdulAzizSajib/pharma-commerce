<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import sliderImg_one from "../../assets/images/Banner/1.jpeg";
import sliderImg_two from "../../assets/images/Banner/4.jpeg";
// import sliderImg_one from "../../assets/images/Banner/slider_One.jpg";

const modules = [Autoplay, Navigation];

const sliders = [{ image: sliderImg_two }];
</script>

<template>
  <swiper :modules="modules" :navigation="true" class="w-full">
    <swiper-slide v-for="(slide, index) in sliders" :key="index">
      <img
        class="w-full h-[645PX] object-cover"
        :src="slide.image"
        alt="Slide Image"
      />
    </swiper-slide>
  </swiper>
</template>

<style>
.swiper-button-next,
.swiper-button-prev {
  color: #ffffff !important;
}

@media (max-width: 768px) {
  .swiper-button-next,
  .swiper-button-prev {
    transform: scale(0.5) !important;
  }
}
</style>
