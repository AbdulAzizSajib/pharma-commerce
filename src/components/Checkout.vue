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
            <p
              v-if="!userID"
              class="text-white mb-4 text-xl bg-red-600 p-2 rounded font-semibold text-center"
            >
              * * Please login to place an order * *
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Name Field -->
              <div class="">
                <label class="block text-sm font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  class="w-full border rounded px-3 py-2"
                  placeholder="Your Name"
                  v-model="address.full_name"
                  :disabled="!userID"
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
                  v-model="address.mobile"
                  :disabled="!userID"
                />
              </div>

              <!-- Address Field -->
              <div>
                <label class="block text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  class="w-full border rounded px-3 py-2"
                  placeholder="Email Address"
                  v-model="address.address"
                  :disabled="!userID"
                />
              </div>

              <div>
                <label class="block text-sm font-medium mb-1">Country</label>

                <a-select
                  :disabled="!userID"
                  v-model:value="seletedCounty"
                  show-search
                  :filterOption="false"
                  @search="searchCountry($event)"
                  class="w-full capitalize"
                >
                  <a-select-option v-for="item in countryData" :key="item.id">
                    <div class="rounded-md capitalize">
                      <h3 class="font-bold text-lg">{{ item?.name }}</h3>
                    </div>
                  </a-select-option>
                </a-select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">City</label>
                <a-select
                  :disabled="!userID"
                  v-model:value="address.city_id"
                  show-search
                  :filterOption="false"
                  @search="searchCity($event)"
                  class="w-full capitalize"
                >
                  <a-select-option v-for="item in cityData" :key="item.id">
                    <div class="rounded-md capitalize">
                      <h3 class="font-bold text-lg">{{ item?.name }}</h3>
                    </div>
                  </a-select-option>
                </a-select>
              </div>

              <!-- Notes Field -->
              <div>
                <label class="block text-sm font-medium mb-1">Notes</label>
                <input
                  :disabled="!userID"
                  class="w-full border rounded px-3 py-2"
                  placeholder="Notes"
                  v-model="address.note"
                />
              </div>
            </div>

            <!-- Payment Options -->
            <!-- Payment Options -->
            <div class="mt-6">
              <h6 class="text-lg font-semibold mb-3">Choose Payment Method</h6>
              <div class="flex gap-4">
                <div
                  v-for="method in paymentMethod"
                  :key="method.id"
                  class="flex items-center gap-2"
                >
                  <input
                    :disabled="!userID"
                    type="radio"
                    name="payment"
                    v-model="formData.payment_method_id"
                    :value="method.id"
                  />

                  <span>{{ method.name }}</span>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="mt-6">
              <button
                :disabled="!userID"
                type="submit"
                class="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 disabled:bg-gray-300"
                @click="submitPlaceOrder"
              >
                Place Order
              </button>
            </div>
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
            <!-- {{ cartProduct }} -->
          </div>
        </div>
      </div>
    </section>
  </Mainlayout>
</template>

<script setup>
import Mainlayout from "@/components/Layouts/Mainlayout.vue";
import { apiBasePharma } from "@/config";
import { useCartStore } from "@/stores/cart";
// import { useLoginStore } from "@/stores/login";
import { useProfileStore } from "@/stores/profile";
import axios from "axios";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { showNotification } from "../../utilities/notification";

const cartStore = useCartStore();
const profileStore = useProfileStore();
const router = useRouter();
// const loginStore = useLoginStore();

// const { user } = storeToRefs(loginStore);
let userId = ref(null);

const { isLoading, addressField } = storeToRefs(profileStore);
const { updateAddress, getAddress } = profileStore;
const { totalPrice, cartProduct } = storeToRefs(cartStore);

const countryData = ref([]);
const cityData = ref([]);
const seletedCounty = ref("");

import debounce from "lodash.debounce";

const searchCity = debounce(async (event) => {
  try {
    const res = await axios.get(
      `${apiBasePharma}/city/search?term=${event || ""}&country_id=${
        seletedCounty.value || ""
      }`
    );
    cityData.value = res?.data || [];
  } catch (error) {
    cityData.value = [];
    console.error("Search error:", error);
  }
}, 500);

const searchCountry = debounce(async (event) => {
  try {
    const res = await axios.get(
      `${apiBasePharma}/country/search?term=${event}`
    );
    countryData.value = res?.data || [];
  } catch (error) {
    countryData.value = [];
    console.error("Search error:", error);
  }
}, 500);

const paymentMethod = ref([]);
const loading = ref(false);
const getPaymentMethods = async () => {
  loading.value = true;
  try {
    const res = await axios.get(`${apiBasePharma}/all-payment-methods`);
    loading.value = false;
    if (res.data) {
      paymentMethod.value = res.data;
    }
  } catch (error) {
    console.log(error.message);
    loading.value = false;
  }
};

const userID = JSON.parse(localStorage.getItem("user"));

const address = ref({
  full_name: "",
  mobile: "",
  address: "",
  country_id: seletedCounty.value,
  city_id: "",
  note: "",
});

const formData = ref({
  sale_products: [],
  sub_total: totalPrice.value,
  total: totalPrice.value,
  shipping_cost: "",
  billing_address: address.value,
  payment_method_id: "",
  customer_id: userID?.id ? userID?.id : "",
});

const submitPlaceOrder = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axios.post(
      `${apiBasePharma}/sales`,
      {
        ...formData.value,
        sale_products: cartProduct.value.map((item) => ({
          product_id: item?.id || "",
          product_name: item?.name || "",
          price: item?.price || "",
          quantity: item?.quantity || "",
          pack_size_id: item?.pack_size?.id || "",
          pack_size_quantity: item?.pack_size?.quantity || "",
          total_quantity: item?.total_quantity || "",
          total: item?.total_price || "",
        })),
      },
      config
    );

    if (res.data?.status === "success") {
      cartStore.clearCart();
      router.push({ name: "home" });
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  if (userId.value) {
    await getAddress();
    console.log(addressField.value);
  }
  searchCountry("");
  getPaymentMethods();
});
</script>

<style lang="scss" scoped></style>
