<template>
  <Mainlayout>
    <!-- Breadcrumb -->
    <div class="relative hidden lg:block h-[100px] overflow-hidden">
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

    <!-- Page Title -->
    <h2 class="text-2xl lg:text-3xl border font-bold my-5 text-center">
      My Shopping Cart
    </h2>

    <!-- Main Grid Layout -->
    <div
      class="lg:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5 px-4 lg:px-0"
    >
      <!-- Left Column: Cart Products -->
      <div class="lg:col-span-2">
        <div class="border rounded-lg overflow-x-auto">
          <table class="table text-left w-full min-w-[600px]">
            <thead>
              <tr>
                <th class="py-2">Product</th>
                <th class="py-2 text-right">Price (BDT)</th>
                <th class="py-2 text-center">Quantity</th>
                <th class="py-2 text-right">Subtotal (BDT)</th>
                <th class="py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="cartProduct.length == 0">
                <td
                  class="text-lg text-red-600 font-semibold text-center"
                  colspan="5"
                >
                  Your Shopping Bag is Empty!
                </td>
              </tr>
              <tr v-for="(product, index) in cartProduct" :key="index">
                <td>
                  <div class="flex items-center gap-3">
                    <div class="avatar">
                      <div class="mask mask-squircle h-12 w-12">
                        <img :src="product.image" alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div :title="product?.title" class="font-bold">
                        {{
                          product?.title?.length > 20
                            ? product?.title?.slice(0, 20) + ".."
                            : product?.title
                        }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="text-right">
                  <span>{{ product.price }}</span>
                </td>
                <td>
                  <div class="flex justify-center items-center">
                    <button
                      @click="product.quantity++"
                      class="btn btn-outline btn-sm"
                    >
                      +
                    </button>
                    <input
                      class="w-12 mx-2 text-center rounded-md"
                      v-model="product.quantity"
                      type="number"
                      min="0"
                    />
                    <button
                      @click="product.quantity > 0 && product.quantity--"
                      class="btn btn-outline btn-sm"
                    >
                      -
                    </button>
                  </div>
                </td>
                <td class="text-right">
                  <span>{{
                    Number(product.price * product.quantity).toFixed(2)
                  }}</span>
                </td>
                <td class="text-right">
                  <button class="text-lg text-red-500">
                    <a-popconfirm
                      title="Are you sure delete?"
                      ok-text="Yes"
                      cancel-text="No"
                      @confirm="cartProduct.splice(index, 1)"
                    >
                      <DeleteOutlined />
                    </a-popconfirm>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Coupon Section -->
        <!-- <div
          class="border gap-2 rounded-lg flex flex-col lg:flex-row items-center justify-between mt-2 p-4"
        >
          <h1
            class="text-lg font-semibold tracking-wider text-center lg:text-left"
          >
            Coupon
          </h1>
          <div class="flex w-full lg:w-auto">
            <input
              type="text"
              placeholder="Enter coupon code"
              class="flex-grow lg:flex-shrink border rounded-l-lg p-2"
            />
            <button
              type="button"
              class="rounded-r-lg bg-zinc-900 text-white px-4"
            >
              Apply Coupon
            </button>
          </div>
        </div> -->
      </div>

      <!-- Right Column: Cart Summary -->
      <div class="border rounded-lg p-4 space-y-3">
        <h2 class="text-xl font-semibold mb-3">Cart Total</h2>
        <table class="w-full">
          <tbody>
            <tr class="border-b">
              <td class="py-2">Subtotal:</td>
              <td class="text-right py-2">{{ totalPrice }} BDT</td>
            </tr>
            <tr class="border-b">
              <td class="py-2">Coupon:</td>
              <td class="text-right py-2">-</td>
            </tr>
            <tr class="border-b">
              <td class="py-2">Shipping:</td>
              <td class="text-right py-2">-</td>
            </tr>
            <tr class="border-b">
              <td class="py-2 font-semibold">Total:</td>
              <td class="text-right py-2 font-semibold">
                {{ totalPrice }} BDT
              </td>
            </tr>
          </tbody>
        </table>

        <router-link to="/checkout">
          <button
            class="btn w-full rounded-full bg-green-600 text-white text-lg capitalize hover:bg-green-700 mt-4"
          >
            Proceed to Checkout
          </button>
        </router-link>
      </div>
    </div>
  </Mainlayout>
</template>

<script setup>
import { ref } from "vue";
import Mainlayout from "@/components/Layouts/Mainlayout.vue";
import { DeleteOutlined, HomeOutlined } from "@ant-design/icons-vue";
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";

const cartStore = useCartStore();
const { cartProduct, totalPrice } = storeToRefs(cartStore);
</script>

<style lang="scss" scoped></style>
