<template>
  <div class="overflow-hidden border rounded product-card">
    <!-- Product Image -->
    <div class="relative border-b overflow-hidden rounded-t">
      <router-link :to="{ name: 'product-details', params: { id: id || 0 } }">
        <img
          :src="imageSrc"
          :alt="title"
          @error="setDefaultImage"
          class="w-full h-auto object-cover"
        />
      </router-link>
    </div>

    <!-- Product Content -->
    <div
      class="p-3 bg-[#e3fff3] border-t-0 border-2 border-[#00C36E] rounded-b"
    >
      <!-- Product Info -->
      <h2 class="text-sm lg:text-base font-semibold truncate" :title="title">
        {{ title }}
      </h2>
      <p class="text-xs text-gray-600">{{ name }}</p>

      <!-- Price -->
      <div class="flex items-center gap-2 mt-2">
        <span class="text-lg lg:text-2xl font-bold text-[#007C46]"
          >{{ price }} ৳</span
        >
      </div>

      <!-- Add to Cart Button -->
      <button
        @click="handleAddToCart"
        type="button"
        class="w-full mt-3 text-xs lg:text-sm font-medium border-2 border-[#007C46] bg-[#007C46] text-white hover:text-[#007C46] hover:bg-transparent transition duration-200 rounded px-4 py-2"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { imgDefault } from "@/config";

const props = defineProps([
  "id",
  "name",
  "title",
  "price",
  "imageSrc",
  "products",
]);

const cartStore = useCartStore();
const { getCart } = cartStore;

// Add to Cart with Toast
const handleAddToCart = () => {
  getCart(props.id, props.title, props.price, props.imageSrc, props.name, 1);
  toast.success(`${props.name} added to cart!`, {
    position: "top-center",
    autoClose: 2000,
  });
};

// Set fallback image
const setDefaultImage = (event) => {
  event.target.src = imgDefault;
};
</script>
