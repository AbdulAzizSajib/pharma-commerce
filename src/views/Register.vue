<template>
  <Mainlayout>
    <div class="relative overflow-hidden">
      <img
        class="w-full"
        src="@/assets/images/Breadcrumbs.png"
        alt="Breadcrumbs Image"
      />
      <div class="absolute inset-0 flex justify-center items-center text-white">
        <nav aria-label="breadcrumb" class="w-full p-4">
          <ol class="flex h-8 space-x-2">
            <li class="flex items-center">
              <HomeOutlined />
            </li>
            <li class="flex items-center space-x-2">
              <RightOutlined />
              <router-link
                to="/"
                class="flex items-center px-1 capitalize hover:underline"
              >
                Home
              </router-link>
              <RightOutlined />
            </li>
            <li class="flex items-center space-x-2">Register</li>
          </ol>
        </nav>
      </div>
    </div>
    <div>
      <section class="flex mt-28 justify-center items-center p-4">
        <div class="w-full">
          <form
            @submit.prevent="handleRegister"
            class="max-w-md mx-auto p-8 bg-white shadow-xl rounded-2xl space-y-6"
          >
            <h2 class="text-2xl font-bold text-center text-green-700">
              Create an Account
            </h2>

            <div class="space-y-5">
              <!-- Name -->
              <div>
                <label class="block mb-1 font-semibold text-gray-700"
                  >Name <span class="text-red-500">*</span></label
                >
                <input
                  v-model="formData.name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition"
                />
              </div>

              <!-- Email -->
              <div>
                <label class="block mb-1 font-semibold text-gray-700"
                  >Email <span class="text-red-500">*</span></label
                >
                <input
                  v-model="formData.email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition"
                />
              </div>

              <!-- Password -->
              <div>
                <label class="block mb-1 font-semibold text-gray-700"
                  >Password <span class="text-red-500">*</span></label
                >
                <input
                  v-model="formData.password"
                  type="password"
                  placeholder="Create a password"
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition"
                />
              </div>

              <!-- Phone -->
              <div>
                <label class="block mb-1 font-semibold text-gray-700"
                  >Phone</label
                >
                <input
                  v-model="formData.phone"
                  type="tel"
                  placeholder="Your phone number"
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition"
                />
              </div>
            </div>

            <!-- Button -->
            <div class="space-y-4">
              <button
                type="submit"
                class="w-full px-4 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-green-600 to-green-400 hover:from-green-500 hover:to-green-300 transition-all duration-300 shadow-lg hover:shadow-xl flex justify-center items-center gap-5"
              >
                <span>{{ isLoading ? "Processing ..." : "Register" }}</span>
                <Icon
                  v-if="isLoading"
                  class="size-5 animate-spin"
                  icon="icon-park-outline:loading"
                />
              </button>

              <p class="text-sm text-center text-gray-600">
                Have an account?
                <router-link
                  to="/login"
                  class="text-green-700 font-medium hover:underline"
                >
                  Login
                </router-link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  </Mainlayout>
</template>

<script setup>
import Mainlayout from "@/components/Layouts/Mainlayout.vue";
import { useRegisterStore } from "@/stores/register";

import { HomeOutlined, RightOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { showNotification } from "../../utilities/notification";
import axios from "axios";
import { apiBasePharma } from "@/config";
import { Icon } from "@iconify/vue";
const registerStore = useRegisterStore();
const { registerUser } = registerStore;
const router = useRouter();
const isLoading = ref(false);

const formData = ref({
  name: "",
  email: "",
  password: "",
  username: "",
  phone: "",
  dob: "",
  gender: "",
  address: "",
});

const handleRegister = async () => {
  try {
    if (!formData.value.name) {
      showNotification("warning", "Name is required");
      return;
    }
    if (!formData.value.email) {
      showNotification("warning", "Email is required");
      return;
    }
    if (!formData.value.password) {
      showNotification("warning", "Password is required");
      return;
    }
    isLoading.value = true;
    const res = await axios.post(
      `${apiBasePharma}/user-register`,
      formData.value
    );
    console.log(res.data);

    // Success flow
    if (res?.data?.status === "success") {
      showNotification("success", res.data.message);
      setTimeout(() => {
        router.push({ name: "login" });
      }, 1000);
    } else {
      showNotification("error", "Registration Failed");
    }
  } catch (error) {
    isLoading.value = false;
    console.log(error);

    if (error.response && error.response.data && error.response.data.message) {
      const messages = error.response.data.message;

      // Loop through each field (email, password, etc.)
      for (const field in messages) {
        if (Array.isArray(messages[field])) {
          messages[field].forEach((msg) => {
            showNotification("error", msg);
          });
        } else {
          showNotification("error", messages[field]);
        }
      }
    } else {
      showNotification("error", "Something went wrong");
    }
  }
};
</script>

<style lang="scss" scoped></style>
