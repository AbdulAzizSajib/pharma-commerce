<script setup>
import { imgBase, imgDefault } from "@/config";
import ProductCard from "@/components/ProductCard/ProductCard.vue";
import Loader from "../Loader/Loader.vue";

defineProps(["collections", "isFetching"]);
</script>

<template>
  <div class="mb-3">
    <div class="grid gap-4 mt-4 px-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
      <Loader v-if="isFetching" />
      <Loader v-if="isFetching" />
      <Loader v-if="isFetching" />
      <Loader v-if="isFetching" />
      <ProductCard
        v-for="(item, index) in collections?.product_collections?.slice(0, 4)"
        :key="index"
        :id="item?.product?.id"
        :title="item?.product?.title"
        :price="item?.product?.offered"
        :oldPrice="item?.product?.selling"
        :imageSrc="imgBase + item?.product?.image"
        :reviews="item?.product?.review_count"
        :stockStatus="item?.product?.badge"
        :discount="
          Math.round(item?.product?.selling - item?.product?.offered).toFixed(1)
        "
        :rating="item?.product?.rating"
        :products="item"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
