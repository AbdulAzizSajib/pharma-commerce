<template>
  <Mainlayout>
    <div>
      <Loader v-if="isFetching" />
    </div>
    <div class="px-4">
      <div v-html="pageContent?.description"></div>
      <div v-if="route.params.page == 'sitemap'">
        <div class="grid grid-cols-4">
          <div
            class="mb-3"
            v-for="item in pageContent?.categories"
            :key="item?.id"
          >
            <h2 class="font-semibold text-lg">
              <router-link to="/">
                {{ item.title }}
              </router-link>
            </h2>
            <!-- {{ item?.public_sub_categories }} -->
            <ol class="list-disc list-inside">
              <li v-for="subcat in item?.public_sub_categories" :key="index">
                <router-link to="/"> {{ subcat?.title }}</router-link>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </Mainlayout>
</template>

<script setup>
import Loader from "@/components/Loader/Loader.vue";
import Mainlayout from "@/components/Layouts/Mainlayout.vue";
import { usePageStore } from "@/stores/page";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const pageContent = ref("");

const pageStore = usePageStore();
const { getPage } = pageStore;
const { isFetching } = storeToRefs(pageStore);
const fetchPageContent = async (page) => {
  pageContent.value = await getPage(page);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(async () => {
  fetchPageContent(route.params.page);
});

watch(
  () => route.params.page,
  async (newPage) => {
    if (newPage) {
      fetchPageContent(newPage);
    }
  }
);
// onMounted(async () => {
//   pageContent.value = await getPage(page);
// });
</script>

<style lang="scss" scoped></style>
