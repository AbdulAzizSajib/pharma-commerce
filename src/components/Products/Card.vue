<template>
  <div class="overflow-hidden product-card">
    <div
      class="overflow-hidden relative border border-b-0 rounded rounded-bl-none rounded-br-none"
    >
      <router-link :to="{ name: 'product-details', params: { id: id || 0 } }">
        <img
          class="w-full block"
          :src="imageSrc"
          :alt="title"
          @error="setDefaultImage"
        />
      </router-link>
      <div class="absolute top-1 left-1" v-if="stockStatus">
        <p class="bg-[#a5ffd9] text-center px-5 py-1 rounded-md">
          {{ stockStatus }}
        </p>
      </div>
      <div v-if="discount" class="absolute top-1 right-1">
        <p
          class="border-2 bg-[#a5ffd9] border-[#34d08d] rounded-full text-center pt-2 w-14 h-14 font-semibold mb-0 text-sm"
        >
          {{ discount }} ৳ Save
        </p>
      </div>
    </div>
    <div
      class="p-3 bg-[#e3fff3] border-2 border-t-0 border-[#00C36E] rounded rounded-tl-none rounded-tr-none"
    >
      <h2 class="text-xl font-semibold" :title="title">
        {{ title?.length > 20 ? title?.slice(0, 15) + ".." : title }}
      </h2>
      <h2 class="text-xl">
        <a-rate disabled :value="rating" />
        {{ rating }}
        <span class="text-gray-400">({{ reviews }} Reviews)</span>
      </h2>
      <h2 class="text-lg text-red-600 my-1 line-through" v-if="oldPrice">
        {{ oldPrice }} ৳
      </h2>
      <h2 class="text-3xl font-bold">{{ price }} ৳</h2>
      <div class="mt-3">
        <button
          @click="handleAddToCart"
          type="button"
          class="w-full xl:text-lg font-medium tracking-widest uppercase rounded-full border-2 border-[#007C46] bg-[#007C46] py-3 px-10 text-white hover:text-[#007C46] hover:bg-transparent"
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
