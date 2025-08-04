<template>
  <Mainlayout>
    <section class="p-20">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center">
          <!-- Left Column: Order Tracking Form -->
          <div class="md:w-1/2 mb-8 md:mb-0 md:pr-10">
            <h1 class="text-3xl font-bold text-gray-800 mb-4">
              Track Your Order
            </h1>
            <p class="text-gray-600 mb-6">
              Have an order? Want to know where your order is now?
            </p>

            <form @submit.prevent="trackOrder()" class="space-y-4">
              <p class="text-gray-600">Enter the track code of your order</p>
              <input
                type="text"
                class="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none"
                placeholder="Your Order Tracking Number..."
                v-model="orderID"
                required
              />
              <button
                type="submit"
                class="w-full md:w-auto px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Submit
              </button>
            </form>

            <div class="order-status mt-6">
              <el-skeleton :rows="1" animated v-if="isLoading" />
              <template v-if="!isLoading && orderStatus">
                <h2 class="text-2xl font-semibold text-gray-800 mt-6">
                  Status of the Order
                </h2>
                <p><strong>Order ID:</strong> {{ orderStatus.order }}</p>
                <p>
                  <strong>Status:</strong>
                  {{ mapOrderStatus(orderStatus.status) }}
                </p>
                <p>
                  <strong>Total Amount:</strong> {{ orderStatus.total_amount }}
                  {{ orderStatus.currency }}
                </p>
                <p>
                  <strong>Order Date:</strong>
                  {{ formatDate(orderStatus.created_at) }}
                </p>
                <p>
                  <strong>Payment Done:</strong>
                  {{ orderStatus.payment_done ? "Yes" : "No" }}
                </p>

                <h3 class="mt-4 text-xl font-semibold">Products Ordered:</h3>
                <ul>
                  <li
                    v-for="product in orderStatus.ordered_products"
                    :key="product.product_id"
                  >
                    - Product ID: {{ product.product_id }}, Quantity:
                    {{ product.quantity }},
                  </li>
                </ul>
              </template>
            </div>
          </div>

          <!-- Right Column: Image -->
          <div class="md:w-1/2 flex justify-center">
            <img
              src="/src/assets/images/deli.jpg"
              alt="Delivery Image"
              class="w-full h-auto rounded"
            />
          </div>
        </div>
      </div>
    </section>
  </Mainlayout>
</template>

<script setup>
import Mainlayout from "@/components/Layouts/Mainlayout.vue";
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const cartStore = useCartStore();
const { isLoading } = storeToRefs(cartStore);
let orderID = ref(route.query.orderId || "");
let orderStatus = ref("");
let status = ref(false);

const trackOrder = async () => {
  orderStatus.value = await cartStore.getTrackOrder(orderID.value);
  status.value = true;
};

// Helper to map order status to human-readable form
const mapOrderStatus = (status) => {
  const statusMap = {
    0: "Pending",
    1: "Processing",
    2: "Shipped",
    3: "Delivered",
    4: "Cancelled",
  };
  return statusMap[status] || "Unknown";
};

// Helper to format date
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

onMounted(() => {
  if (orderID.value) {
    trackOrder();
  }
});
</script>
