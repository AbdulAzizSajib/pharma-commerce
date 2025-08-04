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
        <div
          class="w-full max-w-lg bg-white shadow-lg border rounded-lg p-6 md:p-8"
        >
          <div class="mb-6 text-center">
            <h1 class="text-3xl font-bold mb-2 capitalize">
              verify your email address
            </h1>
          </div>
          <form @submit.prevent="handleVerification" class="space-y-6">
            <div class="space-y-4">
              <div>
                <input
                  v-model="formData.verificationCode"
                  type="text"
                  placeholder="Enter 4-digit verification code"
                  maxlength="4"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
                />
              </div>
            </div>

            <div class="space-y-4">
              <button
                type="submit"
                class="w-full px-4 py-2 font-semibold text-white bg-green-700 rounded-lg hover:bg-green-600 transition-all"
              >
                Verify
              </button>
            </div>
          </form>
        </div>
      </section>
      {{ formData }}
    </div>
  </Mainlayout>
</template>

<script setup>
import Mainlayout from "@/components/Layouts/Mainlayout.vue";
import { useVerifyStore } from "@/stores/verify";
import { HomeOutlined, RightOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const verifyStore = useVerifyStore();
const { verifyUser } = verifyStore;
const router = useRouter();

const formData = ref({
  email: localStorage.getItem("email") || "",
  verificationCode: "",
});

const handleVerification = async () => {
  const res = await verifyUser({
    email: formData.value.email,
    verificationCode: formData.value.verificationCode,
  });

  if (res) {
    if (res.data.code == formData.value.verificationCode) {
      console.log("Email verified successfully");
      router.push("/login");
    } else {
      console.error("Verification code does not match");
    }
  } else {
    console.error("Failed to verify email:", errorMessage.value);
  }
};
</script>

<style lang="scss" scoped></style>
