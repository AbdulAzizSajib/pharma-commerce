<script setup>
import Mainlayout from "@/components/Layouts/Mainlayout.vue";
import Slider from "@/components/Home/Slider.vue";
import Category from "@/components/Home/Category.vue";
import Sale from "@/components/Home/Sale.vue";

import CategoryLoader from "../components/Loaders/CategoryLoader.vue";
import ImageLoader from "@/components/Loaders/ImageLoader.vue";
import { useHomeStore } from "@/stores/home";
import { onMounted, computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { imgBase } from "@/config";
import Collection from "@/components/Collection/Collection.vue";
import miniImgOne from "../assets/images/Banner/7.jpeg";
import miniImgTwo from "../assets/images/Banner/5.jpeg";

const homeStore = useHomeStore();
const { getHome } = homeStore;

const { collections, flash_sales, featured_categories, slider, isFetching } =
  storeToRefs(homeStore);

onMounted(async () => await getHome());
</script>

<template>
  <Mainlayout>
    <!-- Slider -->
    <div class="grid grid-cols-3 gap-x-4">
      <div class="col-span-2 mb-3">
        <ImageLoader v-if="isFetching" />
        <Slider :slider="slider" v-else />
      </div>
      <div>
        <ImageLoader v-if="isFetching" />
        <div v-else>
          <div class="mb-3 border">
            <img
              class="w-full h-1/2 object-cover"
              :src="miniImgOne"
              alt="img"
            />
          </div>
          <div class="mb-3 border">
            <img class="w-full object-cover" :src="miniImgTwo" alt="img" />
          </div>
        </div>
      </div>
    </div>
    <!--Categories -->
    <div class="hidden md:block my-5">
      <CategoryLoader v-if="isFetching" />
      <Category v-else />
    </div>
    <!-- Sale -->
    <!-- <template v-for="sale in flash_sales">
      <Sale :flash_sales="sale" />
    </template> -->
    <!-- Collection -->
    <template v-for="collection in collections">
      <div class="flex justify-between items-center px-4 mt-3">
        <div>
          <h2 class="lg:text-xl font-bold">
            {{ collection?.supplier?.company_name }}
          </h2>
        </div>
        <div>
          <!-- <button
            class="text-[9px] btn btn-xs bg-[#007c46] text-white lg:btn-md"
          >
            View All
          </button> -->
          <RouterLink :to="{ name: 'shop' }">
            <button class="btn-primary">View All</button>
          </RouterLink>
        </div>
      </div>
      <Collection :collections="collections" :isFetching="isFetching" />
    </template>
  </Mainlayout>
</template>
