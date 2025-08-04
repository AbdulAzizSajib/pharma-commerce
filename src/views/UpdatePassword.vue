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
            <li class="flex items-center space-x-2">Update Password</li>
          </ol>
        </nav>
      </div>
    </div>
    <div>
      <section class="flex mt-28 justify-center items-center p-4">
        <div
          class="w-full max-w-lg bg-white shadow-lg border rounded-lg p-6 md:p-8"
        >
          <div class="mb-6 text-center">
            <h1 class="text-xl font-bold mb-2 capitalize">Enter OTP</h1>
          </div>
          <form @submit.prevent="handleForgotPassword" class="space-y-6">
            <div class="space-y-4">
              <div>
                <input
                  v-model="formData.otp"
                  type="number"
                  name="otp"
                  placeholder="Enter OTP"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
                />
              </div>
              <div>
                <input
                  v-model="formData.email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
                />
              </div>
              <div>
                <input
                  v-model="formData.password"
                  type="password"
                  name="password"
                  placeholder="Enter New password"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
                />
              </div>
            </div>

            <div class="space-y-4">
              <button
                type="submit"
                class="w-full px-4 py-2 font-semibold text-white bg-green-700 rounded-lg hover:bg-green-600 transition-all"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  </Mainlayout>
</template>

<script setup>
import Mainlayout from "@/components/Layouts/Mainlayout.vue";
import { useForgotPassStore } from "@/stores/forgotPassword";
import { useUpdatePassStore } from "@/stores/updatePassword";

import { HomeOutlined, RightOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const updatePassStore = useUpdatePassStore();
const { UpdatePassword } = updatePassStore;

const router = useRouter();

const formData = ref({
  otp: "",
  email: "",
  password: "",
});

const handleForgotPassword = async () => {
  const res = await UpdatePassword({
    code: formData.value.otp,
    email: formData.value.email,
    password: formData.value.password,
  });

  console.log(res);

  if (res) {
    console.log("Password reset email sent:", res);
    router.push("/login");
  } else {
    console.error("Failed to send reset email:", errorMessage);
  }
};
</script>

<style lang="scss" scoped></style>
