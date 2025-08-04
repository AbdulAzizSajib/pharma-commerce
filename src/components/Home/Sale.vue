<script setup>
import VueCountdown from "@chenfengyuan/vue-countdown";
import ProductGrid from "@/components/Products/Grid.vue";
import { computed, ref } from "vue";

const props = defineProps(["flash_sales"]);
const endDate = computed(() => new Date(props.flash_sales?.end_time));
const currentDate = ref(new Date());

const timeInMs = computed(() => {
  if (endDate.value) {
    const timeDifference = endDate.value - currentDate.value;
    return timeDifference > 0 ? timeDifference : 0;
  }
  return 0;
});
</script>

<template>
  <!-- Title -->
  <div class="flex justify-between items-center mt-7 mb-5">
    <div>
      <div class="md:flex items-center">
        <h2 class="md:text-xl font-semibold">
          {{ props.flash_sales?.title }}
        </h2>
        <vue-countdown
          :time="timeInMs"
          v-slot="{ days, hours, minutes, seconds }"
          class="md:hidden"
        >
          <p class="text-primary font-medium">
            {{ String(days).padStart(2, "0") }}:
            {{ String(hours).padStart(2, "0") }}:
            {{ String(minutes).padStart(2, "0") }}:
            {{ String(seconds).padStart(2, "0") }}
          </p>
        </vue-countdown>
        <div class="md:block hidden ml-5">
          <vue-countdown
            :time="timeInMs"
            v-slot="{ days, hours, minutes, seconds }"
          >
            <div class="bg-[#ffd455] rounded-lg px-3">
              <div class="flex items-center gap-x-2">
                <div class="text-center">
                  <p class="font-medium md:text-2xl">
                    {{ String(days).padStart(2, "0") }}
                  </p>
                  <p class="text-sm">Days</p>
                </div>
                <div class="font-medium md:text-2xl">:</div>
                <div class="text-center">
                  <p class="font-medium md:text-2xl">
                    {{ String(hours).padStart(2, "0") }}
                  </p>
                  <p class="text-sm">Hrs</p>
                </div>
                <div class="font-medium md:text-2xl">:</div>
                <div class="text-center">
                  <p class="font-medium md:text-2xl">
                    {{ String(minutes).padStart(2, "0") }}
                  </p>
                  <p class="text-sm">Min</p>
                </div>
                <div class="font-medium md:text-2xl">:</div>
                <div class="text-center">
                  <p class="font-medium md:text-2xl">
                    {{ String(seconds).padStart(2, "0") }}
                  </p>
                  <p class="text-sm">Sec</p>
                </div>
              </div>
            </div>
          </vue-countdown>
        </div>
      </div>
    </div>
    <div>
      <button class="btn-primary">View All</button>
    </div>
  </div>
  <!-- Products -->
  <ProductGrid :products="flash_sales?.public_products" />
</template>

<style scoped></style>
