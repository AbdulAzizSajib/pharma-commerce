<template>
  <Mainlayout>
    <div class="relative h-[100px] overflow-hidden">
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
              <HomeOutlined />
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
          </ol>
        </nav>
      </div>
    </div>
    <h2 class="text-2xl font-bold my-5 text-center">My Wishlist</h2>
    <div class="lg:max-w-7xl mx-auto grid lg:grid-cols-1 gap-5">
      <div class="border rounded-lg">
        <table class="table text-left">
          <thead>
            <tr>
              <th class="py-2">Product</th>
              <th class="py-2 text-right">Price (BDT)</th>
              <!-- <th class="py-2 text-center">Stock Status</th> -->
              <th class="py-2 text-right"></th>
              <th class="py-2 text-right"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="wishlistData?.data.length === 0">
              <td
                class="text-lg text-red-600 font-semibold text-center"
                colspan="5"
              >
                Your Wishlist Bag is Empty!
              </td>
            </tr>
            <tr v-for="(item, index) in wishlistData?.data" :key="index">
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle h-12 w-12">
                      <img
                        :src="imgBase + item?.product?.image"
                        alt="Product Image"
                      />
                    </div>
                  </div>
                  <div>
                    <div :title="item?.product?.title" class="font-bold">
                      {{
                        item?.product?.title.length > 20
                          ? item?.product?.title.slice(0, 20) + ".."
                          : item?.product?.title
                      }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="text-right">{{ item?.product?.offered || "N/A" }}</td>
              <!-- <td class="text-center">
                <p class="border p-1 rounded-md bg-green-200">In Stock</p>
              </td> -->
              <td class="text-right">
                <button
                  @click="handleAddToCart(item?.product)"
                  class="btn bg-[#007c46] text-white hover:bg-[#007c46] hover:text-white"
                >
                  Add to cart
                </button>
              </td>
              <td class="text-right">
                <!-- delete btn -->
                <button class="text-lg text-red-500">
                  <a-popconfirm
                    title="Are you sure you want to delete?"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="handleAddToCart"
                  >
                    <DeleteOutlined />
                  </a-popconfirm>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Mainlayout>
</template>

<script setup>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { onMounted, ref } from "vue";
import Mainlayout from "@/components/Layouts/Mainlayout.vue";
import { DeleteOutlined, HomeOutlined } from "@ant-design/icons-vue";
import { useCommonStore } from "@/stores/common";
import { imgBase } from "@/config";
import { useWishlistStore } from "@/stores/wishlist";
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/cart";

const wishlistStore = useWishlistStore();
const { addToWishlist, getWishlist } = wishlistStore;
const { wishlistData, isLoading } = storeToRefs(wishlistStore);

// ..

const cartStore = useCartStore();
const { getCart } = cartStore;

console.log(wishlistData);

const commonStore = useCommonStore();
const { getCommon } = commonStore;
const { footer } = storeToRefs(commonStore);
onMounted(async () => {
  await getCommon();
  await getWishlist();
});

//....
const handleAddToCart = (product) => {
  getCart(
    product.id,
    product.title,
    product.offered,
    imgBase + product.image,
    1
  );

  toast.success(`${product.title} added to cart!`, {
    position: "top-center",
    autoClose: 2000,
  });
};
</script>

<style lang="scss" scoped></style>
