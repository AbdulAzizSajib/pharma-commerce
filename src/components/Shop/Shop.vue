<script setup>
import { useHomeStore } from "@/stores/home";
import Mainlayout from "@/components/Layouts/Mainlayout.vue";
import ProductCard from "../ProductCard/ProductCard.vue";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useBrandStore } from "@/stores/brandCategory";
import { useProductsStore } from "@/stores/products";
import { imgBase } from "@/config";

const homeStore = useHomeStore();
const brandStore = useBrandStore();
const { getBrand } = brandStore;
const { getHome } = homeStore;
const { featured_categories, collections } = storeToRefs(homeStore);
const { brands } = storeToRefs(brandStore);
const productsStore = useProductsStore();
const { getAllProduct } = productsStore;
const { allProduct, paginationInfo, isFetching } = storeToRefs(productsStore);

const backUp = ref([]);
onMounted(async () => {
  // await getHome();
  // await getBrand();
  await getAllProduct(current1.value, pageSize.value);
  backUp.value = allProduct?.value;
  allProduct.value = backUp.value.data;
  // pageSize.value = backUp?.value?.per_page;
  pageSize.value = paginationInfo?.value?.perPage; // Set the page size
  current1.value = paginationInfo?.value?.currentPage; // Set the current page
});

const current1 = ref(1);
const pageSize = ref(52);

const pagination = async (page) => {
  current1.value = page;

  ratingFilter.value = "";
  await getAllProduct(page, pageSize.value);
  backUp.value = allProduct?.value;
  allProduct.value = backUp.value;
};

//  filter
const ratingFilter = ref("");
const brandFilter = ref("");
const categoryFilter = ref("");

const minPriceRange = ref("");
const maxPriceRange = ref("");
const sortOrder = ref("A-Z");

// Watch sortOrder and apply sorting whenever it changes
watch(sortOrder, () => {
  allProduct.value = [...backUp.value]?.sort((a, b) => {
    if (sortOrder.value === "A-Z") {
      return a.title.localeCompare(b.title);
    } else if (sortOrder.value === "Z-A") {
      return b.title.localeCompare(a.title);
    }
  });
});

// Function to handle rating filter changes
const filterByRating = () => {
  allProduct.value = backUp.value?.result?.data?.filter((product) => {
    return product?.rating == ratingFilter.value;
  });
};

const filterByBrand = async (event) => {
  console.log("Click", event.target.value);
  await getAllProduct("", event.target.value);

  allProduct.value = allProduct.value?.result?.data;
};

const filterByCategory = async (cat) => {
  const categorySlug = cat.slug;
  console.log("Slug:", categorySlug);

  await getAllProduct("", "", categorySlug);

  allProduct.value = allProduct.value?.result?.data;
  console.log(allProduct.value);
};

const filterByPrice = async () => {
  await getAllProduct(
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    Number(minPriceRange.value),
    Number(maxPriceRange.value)
  );
  allProduct.value = allProduct.value?.result?.data;
};
</script>

<template>
  <Mainlayout>
    <div class="relative h-[100px] hidden lg:block overflow-hidden">
      <img
        class="w-full"
        src="@/assets/images/Breadcrumbs.png"
        alt="Breadcrumbs Image"
      />
      <div class="absolute inset-0 flex justify-center items-center text-white">
        <nav
          aria-label="breadcrumb"
          class="w-full p-4 dark:bg-gray-100 dark:text-gray-800"
        >
          <ol class="flex h-8 space-x-2">
            <li class="flex items-center">
              <a
                rel="noopener noreferrer"
                href="#"
                title="Back to homepage"
                class="hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5 pr-1 dark:text-gray-600"
                >
                  <path
                    d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                  ></path>
                </svg>
              </a>
            </li>
            <li class="flex items-center space-x-2">
              <router-link
                to="/"
                class="flex items-center px-1 capitalize hover:underline"
              >
                Home
              </router-link>
            </li>
            <li class="flex items-center space-x-2">
              <i class="bi bi-chevron-right"></i>
            </li>
            <li class="flex items-center space-x-2">Shop</li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- category part -->
    <section class="w-full border">
      <div class="px-2 py-10 lg:px-10">
        <div class="lg:grid lg:grid-cols-12 lg:gap-x-6">
          <div class="hidden space-y-6 lg:col-span-3 lg:block">
            <div
              class="flex bg-green-700 text-white px-4 border py-2 rounded-3xl items-center justify-between"
            >
              <h2 class="text-xl tracking-wider">filter</h2>
            </div>
            <div class="">
              <h3 class="text-lg">All Category</h3>
              <ul class="mt-2">
                <li class="flex items-center justify-between">
                  <div class="flex items-center">
                    <ul>
                      <li v-for="(cat, index) in collections" :key="index">
                        <input
                          v-model="categoryFilter"
                          type="radio"
                          name="radio-1"
                          class=""
                          @change="filterByCategory(cat)"
                        />
                        {{ cat?.category?.name }}
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

            <div class="max-w-lg mx-auto bg-white">
              <h2 class="text-xl font-semibold mb-4 text-gray-800">Price</h2>
              <div class="flex items-center space-x-3">
                <input
                  v-model="minPriceRange"
                  type="number"
                  placeholder="Min Price"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-700"
                />
                <input
                  v-model="maxPriceRange"
                  type="number"
                  placeholder="Max Price"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-700"
                />
                <button
                  class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  @click="filterByPrice"
                >
                  Apply
                </button>
              </div>
            </div>

            <div class="pt-6">
              <h3 class="text-lg font-semibold text-gray-900">Rating</h3>

              <a-rate
                class="mr-2"
                :allowClear="true"
                v-model:value="ratingFilter"
                @change="filterByRating"
              />{{ ratingFilter }}
            </div>

            <div class="pt-6">
              <h3 class="text-lg font-semibold text-gray-900">Brand</h3>
              <ul>
                <li v-for="(brand, index) in brands" :key="index">
                  <a-radio-group v-model:value="brandFilter">
                    <a-radio :value="brand.id" @change="filterByBrand">{{
                      brand?.title
                    }}</a-radio>
                  </a-radio-group>
                </li>
              </ul>
            </div>
          </div>
          <div class="h-[400px] w-full rounded-lg px-2 lg:col-span-9 lg:h-full">
            <!-- tilte result etc -->
            <div class="p-2 flex justify-between items-center">
              <div class="flex gap-2 items-center">
                <h2>Sort By:</h2>
                <select v-model="sortOrder" class="border-2">
                  <option value="A-Z">A-Z</option>
                  <option value="Z-A">Z-A</option>
                </select>
              </div>
              <h2>
                <span class="font-semibold">
                  {{ allProduct.length }}
                </span>
                Results Found
              </h2>
            </div>
            <!-- prodcuts -->

            <div
              v-if="isFetching"
              class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5"
            >
              <a-skeleton />
              <a-skeleton />
              <a-skeleton />
              <a-skeleton />
              <a-skeleton />
              <a-skeleton />
              <a-skeleton />
              <a-skeleton />
              <a-skeleton />
              <a-skeleton />
              <a-skeleton />
              <a-skeleton />
            </div>

            <div
              class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5"
            >
              <template v-for="(item, index) in allProduct" :key="index">
                <ProductCard
                  :name="item?.name"
                  :id="item?.id"
                  :title="item?.category?.name"
                  :price="item?.product_prices?.selling_price"
                  :products="item"
                  :imageSrc="item"
                />
              </template>
            </div>
            <a-pagination
              class="mt-3"
              v-if="!isFetching"
              v-model:current="current1"
              :total="paginationInfo?.total"
              :show-size-changer="false"
              v-model:pageSize="pageSize"
              :show-total="(total) => `Total ${total} items`"
              @change="pagination"
            />
          </div>
        </div>
      </div>
    </section>
  </Mainlayout>
</template>

<style lang="scss" scoped></style>
