<template>
  <Mainlayout>
    <section class="cart py-8">
      <div class="container mx-auto px-4">
        <!-- Skeleton Loader -->
        <el-skeleton :rows="3" animated v-if="isLoading" />

        <!-- Checkout Form and Summary -->
        <div class="flex flex-col lg:flex-row lg:gap-8" v-else>
          <!-- Billing Details Section -->
          <div class="w-full lg:w-2/3 mb-8 lg:mb-0">
            <h2 class="text-2xl font-semibold mb-4">Billing Details</h2>
            <p class="text-red-600 mb-4" v-if="!userId">
              *Please login to place an order
            </p>
            <form @submit.prevent="submitOrder()">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Name Field -->
                <div class="">
                  <label class="block text-sm font-medium mb-1"
                    >Your Name</label
                  >
                  <input
                    type="text"
                    class="w-full border rounded px-3 py-2"
                    placeholder="Your Name"
                    v-model="addressField.name"
                    :disabled="!userId ? false : true"
                    required
                  />
                </div>

                <!-- Mobile Number Field -->
                <div>
                  <label class="block text-sm font-medium mb-1"
                    >Mobile Number</label
                  >
                  <input
                    type="tel"
                    class="w-full border rounded px-3 py-2"
                    placeholder="Mobile Number"
                    v-model="addressField.phone"
                    :disabled="!userId ? false : true"
                    required
                  />
                </div>

                <!-- Address Field -->
                <div>
                  <label class="block text-sm font-medium mb-1">Address</label>
                  <input
                    type="text"
                    class="w-full border rounded px-3 py-2"
                    placeholder="Email Address"
                    v-model="addressField.address_1"
                    :disabled="!userId ? false : true"
                    required
                  />
                </div>

                <!-- City Field -->
                <div>
                  <label class="block text-sm font-medium mb-1">City</label>
                  <select
                    class="w-full border rounded px-3 py-2"
                    v-model="addressField.city"
                    required
                    :disabled="!userId ? false : true"
                  >
                    <option value="dhaka">Dhaka</option>
                    <option value="others">Others</option>
                  </select>
                </div>

                <!-- Country Field -->
                <div>
                  <label class="block text-sm font-medium mb-1">Country</label>
                  <input
                    type="text"
                    class="w-full border rounded px-3 py-2"
                    placeholder="Country"
                    maxlength="2"
                    v-model="addressField.country"
                    :disabled="!userId ? false : true"
                    required
                  />
                </div>

                <!-- Notes Field -->
                <div>
                  <label class="block text-sm font-medium mb-1">Notes</label>
                  <input
                    class="w-full border rounded px-3 py-2"
                    placeholder="Notes"
                    v-model="addressField.delivery_instruction"
                    :disabled="!userId ? false : true"
                  />
                </div>
              </div>

              <!-- Payment Options -->
              <div class="mt-6">
                <h6 class="text-lg font-semibold mb-3">
                  Choose Payment Method
                </h6>
                <div class="flex gap-4">
                  <label class="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      v-model="orderMethod"
                      value="2"
                      class="mr-2"
                    />
                    Cash on Delivery
                  </label>
                </div>
              </div>

              <!-- Submit Button -->
              <div class="mt-6">
                <button
                  class="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 disabled:bg-gray-300"
                  type="submit"
                  :disabled="!userId"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>

          <!-- Order Summary Section -->
          <div class="w-full lg:w-1/3">
            <h2 class="text-2xl font-semibold mb-4">Your Order</h2>
            <div class="border rounded p-4 bg-white shadow-md">
              <ul class="space-y-3">
                <li class="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>৳ {{ totalPrice }}</span>
                </li>
                <li class="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>৳ 0.00</span>
                </li>
                <li
                  class="flex justify-between text-lg font-semibold text-orange-500 mt-3"
                >
                  <span>Total</span>
                  <span>৳ {{ totalPrice }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Mainlayout>
</template>

<script setup>
import Mainlayout from "@/components/Layouts/Mainlayout.vue";
import { useCartStore } from "@/stores/cart";
// import { useLoginStore } from "@/stores/login";
import { useProfileStore } from "@/stores/profile";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const cartStore = useCartStore();
const profileStore = useProfileStore();
const router = useRouter();
// const loginStore = useLoginStore();

// const { user } = storeToRefs(loginStore);
let userId = ref(null);

const { isLoading, addressField } = storeToRefs(profileStore);
const { updateAddress, getAddress } = profileStore;
const { totalPrice, cuPon, isOrderDone, cartProduct } = storeToRefs(cartStore);

const { orderPlace } = cartStore;
userId.value = JSON.parse(localStorage.getItem("user"))?.id;
console.log("userId", userId.value);
let oderMethod = ref(2);

const submitOrder = async () => {
  if (!userId.value) {
    router.push("/login");
    // ElNotification({
    //   message: "Please Login to place an order",
    //   type: "error",
    // });
    console.log("error", "Please Login to place an order");
  } else {
    // await updateAddress();
    // await getAddress();
    orderPlace(
      cartProduct.value,
      oderMethod.value,
      addressField.value?.id,
      userId.value
    );
    if (isOrderDone?.value == true) {
      router.push("/myOrders");
      cartStore.$reset();
    }
  }
};
onMounted(async () => {
  if (userId.value) {
    await getAddress();
    console.log(addressField.value);
  }
});
</script>

<style lang="scss" scoped></style>
