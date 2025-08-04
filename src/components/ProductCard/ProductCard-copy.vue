<template>
  <div class="overflow-hidden product-card">
    <div
      class="overflow-hidden relative border border-b-0 rounded rounded-bl-none rounded-br-none"
    >
      <router-link :to="{ name: 'product-details', params: { id: id || 0 } }">
        <img
          class="lg:w-full block"
          :src="imageSrc"
          :alt="title"
          @error="setDefaultImage"
        />
      </router-link>
      <div class="absolute top-1 left-1" v-if="stockStatus">
        <p
          class="bg-[#a5ffd9] text-center lg:px-5 lg:py-1 p-1 text-[8px] lg:text-base rounded-md"
        >
          {{ stockStatus }}
        </p>
      </div>
      <div v-if="discount" class="absolute top-1 right-1">
        <p
          class="border-2 text-[8px] bg-[#a5ffd9] border-[#34d08d] rounded-full text-center pt-2 w-10 h-10 lg:w-14 lg:h-14 font-semibold mb-0 lg:text-sm"
        >
          {{ discount }} ৳ Save
        </p>
      </div>
    </div>
    <div
      class="p-3 bg-[#e3fff3] border-2 border-t-0 border-[#00C36E] rounded rounded-tl-none rounded-tr-none"
    >
      <h2 class="lg:text-xl font-semibold" :title="title">
        {{ title?.length > 20 ? title?.slice(0, 15) + ".." : title }}
      </h2>
      <h2 class="lg:text-xl">
        <a-rate class="text-xs lg:text-2xl" disabled :value="rating" />
        {{ rating }}
        <span class="text-gray-400 lg:text-base">({{ reviews }} Reviews)</span>
      </h2>
      <div class="flex items-center gap-1">
        <h2 class="lg:text-3xl font-bold">{{ price }} ৳</h2>
        <h2 class="lg:text-lg text-red-600 my-1 line-through" v-if="oldPrice">
          {{ oldPrice }} ৳
        </h2>
      </div>
      <div class="mt-3">
        <button
          @click="handleAddToCart"
          type="button"
          class="w-full text-xs lg:text-xl btn btn-sm font-medium border-2 border-[#007C46] bg-[#007C46] text-white hover:text-[#007C46] hover:bg-transparent"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import Loader from "../Loader/Loader.vue";
import { imgDefault } from "@/config";

const props = defineProps([
  "id",
  "title",
  "price",
  "oldPrice",
  "imageSrc",
  "reviews",
  "stockStatus",
  "discount",
  "rating",
  "products",
]);

// cart
const cartStore = useCartStore();
const { getCart } = cartStore;
const { isLoading } = storeToRefs(cartStore);

// Add to cart with toast notification
const handleAddToCart = () => {
  getCart(props.id, props.title, props.price, props.imageSrc);

  toast.success(`${props.title} added to cart!`, {
    position: "top-center",
    autoClose: 2000,
  });
};

// Fallback for broken or missing images
const setDefaultImage = (event) => {
  event.target.src = `${imgDefault}`;
};
</script>
