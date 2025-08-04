<!-- Main.vue -->
<script setup>
import { imgBase } from "@/config";
import ProductCard from "@/components/ProductCard/ProductCard.vue";

defineProps(["flash_sales"]);
</script>

<template>
  <div class="mb-3">
    <div class="grid gap-4 mt-4 px-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <ProductCard
        v-for="(product, index) in flash_sales?.public_products?.slice(0, 4)"
        :key="index"
        :id="product?.product_id"
        :title="product?.title"
        :price="product?.price"
        :oldPrice="product?.selling"
        :imageSrc="imgBase + product?.image"
        :reviews="product?.review_count"
        :stockStatus="product?.badge"
        :discount="Math.round(product?.selling - product?.price).toFixed(1)"
        :rating="product?.rating"
        :products="product"
      />
    </div>
  </div>
</template>
