<template>
  <Mainlayout>
    <section class="py-10 bg-gray-50">
      <div class="container mx-auto px-4">
        <!-- Page Title -->
        <h2 class="text-2xl font-bold text-gray-800 mb-6">My Order</h2>

        <!-- Loading Skeleton -->
        <el-skeleton :rows="1" animated v-if="isLoading" />

        <!-- Order Table -->
        <div v-else class="overflow-x-auto bg-white shadow-md rounded-lg">
          <table
            class="min-w-full bg-white text-center border-collapse border border-gray-200"
          >
            <thead>
              <tr class="bg-gray-100">
                <th class="px-4 py-2 border border-gray-200 text-gray-700">
                  Order ID
                </th>
                <th class="px-4 py-2 border border-gray-200 text-gray-700">
                  Date
                </th>
                <th
                  class="px-4 py-2 border border-gray-200 text-gray-700"
                  colspan="2"
                >
                  Products
                </th>
                <th class="px-4 py-2 border border-gray-200 text-gray-700">
                  Total (BD)
                </th>
                <th class="px-4 py-2 border border-gray-200 text-gray-700">
                  Cancelled
                </th>
                <th class="px-4 py-2 border border-gray-200 text-gray-700">
                  Order Method
                </th>
                <th class="px-4 py-2 border border-gray-200 text-gray-700">
                  Payment Status
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(item, index) in orderData?.data"
                :key="item?.id"
                class="hover:bg-gray-50"
              >
                <td class="px-4 py-2 border border-gray-200">
                  <router-link
                    :to="{
                      path: `/order-tracking`,
                      query: { orderId: item?.order },
                    }"
                    class="text-green-600 font-medium"
                  >
                    {{ index + 1 }} P:{{ item?.id }}
                  </router-link>
                </td>
                <td class="px-4 py-2 border border-gray-200">
                  {{ formatDate(item?.created_at) }}
                </td>
                <td class="px-4 py-2 border border-gray-200 text-left">
                  <div
                    v-for="(productItem, index) in item?.ordered_products"
                    :key="index"
                    class="flex items-center mb-2"
                  >
                    <img
                      :src="`${imgBase}${productItem?.product?.image}`"
                      class="w-8 h-8 rounded mr-2"
                      alt="Product image"
                      @error="$event.target.src = `${defaultImage}`"
                    />
                  </div>
                </td>
                <td class="px-4 py-2 border border-gray-200 text-left">
                  <div
                    v-for="(productItem, index) in item?.ordered_products"
                    :key="index"
                    class="mb-2"
                  >
                    <span class="px-1">{{ productItem?.product?.title }}</span>
                  </div>
                </td>
                <td class="px-4 py-2 border border-gray-200">
                  {{ Math.round(item?.total_amount) }} BD
                </td>
                <td class="px-4 py-2 border border-gray-200">
                  <span
                    :class="
                      item?.cancelled == 0 ? 'text-gray-500' : 'text-red-500'
                    "
                  >
                    {{ item?.cancelled == 0 ? "No" : "Yes" }}
                  </span>
                </td>
                <td class="px-4 py-2 border border-gray-200">
                  {{ item?.order_method }}
                </td>
                <td class="px-4 py-2 border border-gray-200">
                  <span
                    :class="
                      item?.payment_done === 0
                        ? 'text-red-500'
                        : 'text-green-500'
                    "
                  >
                    {{ item?.payment_done === 0 ? "Unpaid" : "Paid" }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </Mainlayout>
</template>

<script setup>
import moment from "moment";
import { imgBase } from "@/config";
import { storeToRefs } from "pinia";
import { useOrderStore } from "@/stores/order";
// import { useLoginStore } from "@/stores/login";
import { onMounted, ref } from "vue";
import Mainlayout from "@/components/Layouts/Mainlayout.vue";

let userId = ref(null);
userId.value = JSON.parse(localStorage.getItem("user"))?.id;
console.log("userId", userId.value);

// const loginStore = useLoginStore();
const orderStore = useOrderStore();
const { orderData, isLoading } = storeToRefs(orderStore);
// const { userInfo } = storeToRefs(loginStore);

onMounted(async () => {
  await orderStore.getOrderData(userId.value);
});
const formatDate = (date) => {
  return moment(date).format("LL");
};
</script>
