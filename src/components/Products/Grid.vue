<script setup>
import { imgBase } from "@/config";
import ProductCard from "@/components/Products/Card.vue";
defineProps(["products"]);
</script>

<template>
  <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
    <ProductCard
      v-for="(item, index) in products"
      :key="index"
      :id="item?.product_id"
      :title="item?.title"
      :price="item?.price"
      :oldPrice="item?.selling"
      :imageSrc="imgBase + item?.image"
      :reviews="item?.review_count"
      :stockStatus="item?.badge"
      :discount="Math.round(item?.selling - item?.price).toFixed(1)"
      :rating="item?.rating"
      :products="item"
    />
  </div>
</template>
