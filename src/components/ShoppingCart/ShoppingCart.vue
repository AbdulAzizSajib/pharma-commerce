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
                <th class="py-2 text-center">Pack/Pcs</th>
                <th class="py-2 text-center">Total quantity</th>
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
              <!-- <pre>
                {{ cartProduct[0] }}
            </pre
              > -->
              <tr v-for="(product, index) in cartProduct" :key="index">
                <td>
                  <div class="flex items-center gap-3">
                    <div class="avatar">
                      <div class="mask mask-squircle h-12 w-12">
                        <img :src="default_img" alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <h1 class="text-sm">
                        {{
                          product?.name?.length > 20
                            ? product?.name?.slice(0, 20)
                            : product?.name
                        }}
                      </h1>
                    </div>
                  </div>
                </td>
                <td class="text-right">
                  <span> {{ Number(product.price).toFixed(2) }}</span>
                </td>
                <td>
                  <div class="flex justify-center items-center">
                    <button
                      @click="
                        () => {
                          let stock = product?.stock_batches?.length
                            ? calculateStock(product?.stock_batches)
                            : 0;

                          if (product.quantity < stock) product.quantity++;
                          else {
                            showNotification('warning', 'Sorry! Stock Out');
                            product.quantity = stock;
                          }
                          updateQty(product);
                        }
                      "
                      class="btn btn-outline btn-sm"
                    >
                      +
                    </button>
                    <input
                      class="w-12 mx-2 text-center rounded-md"
                      v-model="product.quantity"
                      @focus="$event?.target?.select()"
                      @input="
                        () => {
                          if (product.quantity < 0) product.quantity = 0;
                          let stock = product?.stock_batches?.length
                            ? calculateStock(product?.stock_batches)
                            : 0;

                          if (product.quantity > stock) {
                            showNotification('warning', 'Sorry! Stock Out');
                            product.quantity = stock;
                          }

                          updateQty(product);
                        }
                      "
                      type="number"
                      min="0"
                    />
                    <button
                      @click="
                        () => {
                          if (product.quantity > 0) product.quantity--;
                          else product.quantity = 0;
                          updateQty(product);
                        }
                      "
                      class="btn btn-outline btn-sm"
                    >
                      -
                    </button>
                  </div>
                </td>
                <td class="">
                  <select
                    class="border rounded-sm"
                    v-model="product.pack_select"
                    @change="updateQty(product)"
                  >
                    <option value="1">Pcs (1)</option>
                    <option value="2">
                      Pack ({{ product?.pack_size?.quantity }})
                    </option>
                  </select>
                </td>

                <td class="text-right">
                  <span>{{ product.total_quantity }}</span>
                </td>
                <td class="text-right">
                  <span>{{ formatNumber(product?.total_price) }}</span>
                </td>
                <td class="text-right">
                  <button class="text-lg text-red-500">
                    <a-popconfirm
                      title="Are you sure delete?"
                      ok-text="Yes"
                      cancel-text="No"
                      @confirm="
                        cartProduct.splice(index, 1);
                        updateQty(product);
                      "
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

      <!-- Right Column: Cart Summary -->
      <div class="border rounded-lg p-4 space-y-3">
        <h2 class="text-xl font-semibold mb-3">Cart Total</h2>
        <table class="w-full">
          <tbody>
            <tr class="border-b">
              <td class="py-2">Subtotal:</td>
              <td class="text-right py-2">
                {{ formatNumber(totalPrice || 0) }} BDT
              </td>
            </tr>

            <tr class="border-b">
              <td class="py-2 font-semibold">Total:</td>
              <td class="text-right py-2 font-semibold">
                {{ formatNumber(totalPrice || 0) }} BDT
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
import default_img from "../../assets/images/Banner/default.jpg";
import { showNotification } from "../../../utilities/notification";
import { formatNumber } from "@/config";

const cartStore = useCartStore();
const { cartProduct, totalPrice } = storeToRefs(cartStore);

const calculateStock = (stockes) => {
  const total = stockes?.reduce((sum, batch) => {
    const balanced_quantity = parseFloat(batch?.balanced_quantity);
    return sum + (isNaN(balanced_quantity) ? 0 : balanced_quantity);
  }, 0);
  return Number(total).toFixed(2);
};
const pp = ref("psc"); // initial value

const totalQty = ref("");

const updateQty = (product) => {
  if (product?.pack_select == 2) {
    product.total_quantity =
      Number(product?.pack_size?.quantity || 0) * Number(product?.quantity);
  } else {
    product.total_quantity = Number(product?.quantity);
  }
  product.total_price = Math.round(
    Number(product.total_quantity || 0) * Number(product?.price || 0)
  );

  totalPrice.value = cartProduct.value?.reduce((sum, product) => {
    return sum + (product.total_price || 0);
  }, 0);
};
</script>

<style lang="scss" scoped></style>
