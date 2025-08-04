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
              <i class="fa-solid fa-angle-right"></i>
              <router-link
                to="/"
                class="flex items-center px-1 capitalize hover:underline"
              >
                Home
              </router-link>
            </li>
            <li class="flex items-center space-x-2">
              <RightOutlined />
              <span
                rel="noopener noreferrer"
                href="#"
                class="flex items-center px-1 capitalize"
                >{{ productDetail?.title }}</span
              >
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <section class="mt-8">
      <div class="px-4">
        <div></div>
        <div class="grid grid-cols-1 px-5 gap-12 lg:grid-cols-5 lg:gap-12">
          <div class="lg:col-span-3 lg:row-end-1">
            <div class="lg:flex">
              <div class="lg:order-2 lg:ml-5">
                <div class="overflow-hidden rounded-lg">
                  <Loader v-if="isFetching" />
                  <a-image
                    :src="imgBase + productDetail?.image"
                    class="w-full"
                  />
                </div>
              </div>

              <div class="mt-2 w-full lg:w-32 lg:flex-shrink-0">
                <div class="flex flex-row items-start lg:flex-col">
                  <template v-for="sideImge in productDetail?.images">
                    <button
                      type="button"
                      class="flex-0 border items-center w-full flex justify-center aspect-square mb-3 h-20 overflow-hidden rounded-lg text-center"
                    >
                      <a-image
                        class="object-cover border"
                        :src="imgBase + sideImge?.image"
                        alt=""
                      />
                    </button>
                  </template>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1
              class="flex items-center gap-2 font-bold text-gray-900 text-sm lg:text-xl"
            >
              {{ productDetail?.title }}
              <span class="text-sm border p-1 rounded-md bg-green-300">{{
                productDetail?.badge
              }}</span>
            </h1>

            <div class="mt-5 flex items-center">
              <div class="flex items-center">
                <i class="fa-solid fa-star text-yellow-500"></i>
                <i class="fa-solid fa-star text-yellow-500"></i>
                <i class="fa-solid fa-star text-yellow-500"></i>
                <i class="fa-solid fa-star text-yellow-500"></i>
                <i class="fa-solid fa-star text-yellow-500"></i>
              </div>
              <p class="ml-2 text-sm font-medium text-gray-500">
                {{ productDetail?.review_count }} Reviews
              </p>
            </div>

            <h2 class="mt-2 text-xl font-bold text-gray-900">
              {{ productDetail?.offered }} BDT
              <span class="line-through font-light text-base text-gray-500"
                >{{ productDetail?.selling }} BDT</span
              >
              <span class="px-2 ml-3 text-sm rounded-2xl bg-red-300"
                >{{
                  productDetail?.selling - productDetail?.offered > 0
                    ? productDetail?.selling - productDetail?.offered
                    : 0
                }}
                BDT</span
              >
            </h2>

            <hr class="border mt-3" />

            <div class="flex justify-between">
              <div>
                <h2 class="flex items-center">
                  Brand:
                  <span class="ml-2">
                    <i class="fa-solid fa-leaf text-primary"></i
                    >{{ productDetail?.brand?.title }}</span
                  >
                </h2>
              </div>
            </div>

            <div v-html="productDetail?.description"></div>
            <div v-html="productDetail?.overview"></div>

            <!-- <hr class="border mt-2"> -->

            <div
              class="mt-2 space-x-3 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0"
            >
              <div class="flex items-end rounded-lg">
                <div
                  class="flex justify-between space-x-5 items-center py-2 px-1 border"
                >
                  <button @click="quantity++" class="text-xl btn btn-outline">
                    +
                  </button>
                  <input
                    class="w-12 outline-none text-center text-xl"
                    v-model="quantity"
                    type="number"
                  />
                  <button
                    @click="quantity > 0 && quantity--"
                    class="text-xl btn btn-outline"
                  >
                    -
                  </button>
                </div>
              </div>

              <button
                @click="handleAddToCart"
                type="button"
                class="w-full xl:text-lg font-medium tracking-widest uppercase rounded-full border-2 border-[#007C46] bg-[#007C46] py-3 px-10 text-white hover:text-[#007C46] hover:bg-transparent"
              >
                Add to Cart
              </button>
              <button
                @click="handleAddWishlist"
                type="button"
                class="btn text-lg rounded-full"
              >
                <HeartOutlined />
              </button>
            </div>

            <ul class="mt-8 space-y-2">
              <li
                class="flex items-center text-left text-sm font-medium text-gray-600"
              >
                <span class="mr-2">Category :</span>
                {{ productDetail?.category?.title }}
              </li>
              <li
                class="flex items-center text-left text-sm font-medium text-gray-600"
              >
                <span class="mr-2">Tags :</span>

                <a-tag
                  v-for="(tag, index) in productDetail?.tags
                    ?.split(',')
                    .filter((tag) => tag.trim() !== '')"
                  :key="index"
                  class="capitalize"
                  color="green"
                >
                  {{ tag.trim() }}
                </a-tag>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="px-4">
      <div>
        <a-tabs tabPosition="top" v-model:activeKey="activeKey">
          <a-tab-pane key="1">
            <template #tab
              ><h2
                class="capitalize text-lg tracking-wider text-black font-medium"
              >
                Descriptions
              </h2></template
            >
            <div v-html="productDetail?.description"></div>
          </a-tab-pane>
          <a-tab-pane key="2" force-render>
            <template #tab
              ><h2
                class="capitalize text-lg tracking-wider text-black font-medium"
              >
                Customer Feedback
              </h2></template
            >

            <Loader v-if="isFetching" />
            <div v-if="reviewDetail?.all?.data?.length">
              <template
                v-for="review in reviewDetail?.all?.data"
                :key="review.id"
              >
                <div class="flex justify-between items-start border-b p-4">
                  <div class="w-10/12">
                    <h2 class="text-lg font-semibold text-gray-800">
                      {{ review.user.name }}
                    </h2>
                    <a-rate :value="review.rating" disabled class="mt-1" />
                    <p class="mt-2 text-gray-600">{{ review.review }}</p>
                  </div>

                  <div class="text-right text-gray-500 w-2/12">
                    <p class="text-sm">
                      {{ moment(review.created).format("LL") }}
                    </p>
                  </div>
                </div>
              </template>
            </div>
            <span v-else class="text-gray-500">No review</span>
          </a-tab-pane>
        </a-tabs>
      </div>
    </section>
  </Mainlayout>
</template>

<script setup>
import Mainlayout from "@/components/Layouts/Mainlayout.vue";
import { imgBase } from "@/config";
import { useProductsStore } from "@/stores/products";
import { HeartOutlined, RightOutlined } from "@ant-design/icons-vue";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Loader from "../Loader/Loader.vue";
import moment from "moment";
import { useCartStore } from "@/stores/cart";

const productStore = useProductsStore();
const { getProduct, getReview } = productStore;
const { isFetching } = storeToRefs(productStore);
const productDetail = ref("");
const reviewDetail = ref("");
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useWishlistStore } from "@/stores/wishlist";

const route = useRoute();

onMounted(async () => {
  productDetail.value = await getProduct(route?.params?.id);
  reviewDetail.value = await getReview(route?.params?.id);
});

const activeKey = ref("1", "2");

// cart

const cartStore = useCartStore();
const { getCart } = cartStore;
const quantity = ref(1);

const handleAddToCart = () => {
  getCart(
    productDetail.value?.id,
    productDetail.value?.title,
    productDetail.value?.offered,
    imgBase + productDetail.value?.imageSrc,
    quantity.value
  );

  toast.success(`${productDetail.value?.title} added to cart!`, {
    position: "top-center",
    autoClose: 2000,
  });
};

// Wishlist product

const wishlistStore = useWishlistStore();
const { addToWishlist } = wishlistStore;

const handleAddWishlist = () => {
  addToWishlist(productDetail.value?.id);
  toast.success(`${productDetail.value?.title} added to wishlist!`, {
    position: "top-center",
    autoClose: 2000,
  });
};
</script>

<style lang="scss" scoped></style>
