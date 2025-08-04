<template>
  <div class="container mx-auto">
    <Navbar :header="header" />
    <main class="min-h-screen"><slot></slot></main>
  </div>
  <Footer :footer="footer" />
</template>

<script setup>
import Navbar from "@/components/Layouts/Navbar.vue";
import Footer from "@/components/Layouts/Footer.vue";
import { useCommonStore } from "@/stores/common";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

const commonStore = useCommonStore();
const { getCommon } = commonStore;
const { footer, header } = storeToRefs(commonStore);

// onMounted(async () => await getCommon());
</script>
