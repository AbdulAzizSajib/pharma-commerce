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
            <li class="flex items-center space-x-2">login</li>
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
            <h1 class="text-3xl font-bold mb-2">Login</h1>
          </div>
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div class="space-y-4">
              <!-- Email -->
              <div>
                <input
                  v-model="email"
                  type="email"
                  name="email"
                  placeholder="Email "
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
                />
              </div>

              <!-- Password -->
              <div>
                <input
                  v-model="password"
                  type="password"
                  name="password"
                  placeholder=" password"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
                />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex justify-center items-center gap-1">
                  <input type="checkbox" id="remember" name="remember" />
                  <label
                    for="remember"
                    class="lg:ml-2 lg:text-sm text-xs text-gray-600"
                  >
                    Remember me
                  </label>
                </div>
                <router-link
                  to="/forgotPassword"
                  class="text-xs text-green-700 hover:underline"
                  >Forgot password?</router-link
                >
              </div>
            </div>

            <div class="space-y-4">
              <button
                type="submit"
                class="w-full px-4 py-2 font-semibold text-white bg-green-700 rounded-lg hover:bg-green-600 transition-all flex justify-center gap-2"
              >
                <span>{{ isLoading ? "Processing ..." : "Login" }}</span>
                <Icon
                  v-if="isLoading"
                  class="size-5 animate-spin"
                  icon="icon-park-outline:loading"
                />
              </button>
              <p class="text-sm text-center text-gray-600">
                Don't have an account yet?
                <router-link
                  to="/register"
                  class="items-center px-1 text-green-700 capitalize hover:underline"
                >
                  Register
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
import { useLoginStore } from "@/stores/login";
import { HomeOutlined, RightOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { showNotification } from "../../utilities/notification";
import axios from "axios";
import { apiBasePharma } from "@/config";
import { Icon } from "@iconify/vue";
const loginStore = useLoginStore();
const { LoginUser } = loginStore;
const router = useRouter();
const isLoading = ref(false);

const email = ref("");
const password = ref("");

const handleLogin = async () => {
  if (!email.value) {
    return showNotification("warning", "email required");
  }
  if (!password.value) {
    return showNotification("warning", "email required");
  }
  isLoading.value = true;
  try {
    const res = await axios.post(`${apiBasePharma}/user-login`, {
      email: email.value,
      password: password.value,
    });

    // console.log("res.data", res?.data?.message);
    isLoading.value = false;
    if (res?.data?.status === "success") {
      localStorage.setItem("token", res?.data?.token);
      localStorage.setItem("user", JSON.stringify(res?.data?.user));
      showNotification("success", res?.data?.message);
      setTimeout(() => {
        router.push("/");
      }, 500);
    } else {
      showNotification("error", "Email or Password is incorrect");
    }
  } catch (error) {
    // isLoading.value = false;
    console.log(error);
  }
};
</script>

<style lang="scss" scoped></style>
