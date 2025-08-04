<template>
  <!-- Swiper component to display companies -->
  <swiper
    :slidesPerView="10"
    :spaceBetween="30"
    :freeMode="true"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="cat in companies" :key="cat?.id">
      <div class="w-full flex flex-col justify-center items-center">
        <div
          class="bg-[#61acf3] rounded-full w-16 h-16 flex justify-center items-center cursor-pointer text-white font-bold text-2xl uppercase"
        >
          {{
            cat?.company_name?.split(" ").length === 2
              ? cat?.company_name?.split(" ")[0].charAt(0) +
                cat?.company_name?.split(" ")[1].charAt(0)
              : cat?.company_name?.charAt()
          }}
        </div>

        <h2 class="mt-2 font-semibold text-base text-center">
          {{ cat?.company_name?.split(" ")?.at(0) }}
        </h2>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/free-mode";

// Import required modules
import { FreeMode, Pagination } from "swiper/modules";

// Axios and other imports
import { apiBasePharma } from "@/config";
import axios from "axios";
import { ref, onMounted } from "vue";

// State for storing companies
const companies = ref([]);
const loading = ref(false);

// Function to fetch companies
const getCompanies = async () => {
  loading.value = true;
  try {
    const res = await axios.get(`${apiBasePharma}/all-supplier`);
    loading.value = false;
    if (res.data) {
      companies.value = res.data;
    }
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
};

onMounted(async () => {
  console.log("Mounted called");
  await getCompanies();
});
</script>
