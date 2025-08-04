<template>
  <Mainlayout>
    <div class="relative overflow-hidden">
      <!-- Breadcrumbs Image -->
      <img
        class="w-full"
        src="@/assets/images/Breadcrumbs.png"
        alt="Breadcrumbs Image"
      />
      <!-- Breadcrumb Navigation -->
      <div class="absolute inset-0 flex justify-center items-center text-white">
        <nav aria-label="breadcrumb" class="w-full p-4">
          <ol class="flex h-8 space-x-2">
            <!-- Home Icon -->
            <li class="flex items-center">
              <HomeOutlined />
            </li>
            <!-- Home Link -->
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
            <!-- Current Page (Profile) -->
            <li class="flex items-center space-x-2">Profile</li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- Profile Layout -->
    <ProfileLayout>
      <div
        class="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto my-8 p-6 bg-white shadow rounded-lg"
      >
        <!-- Profile Information Section -->
        <div>
          <h2 class="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            My Profile
          </h2>
          <div class="space-y-4 flex justify-between items-center">
            <div>
              <label class="text-sm font-medium text-gray-600">Email</label>
              <p class="text-gray-800">Email@gmail.com</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-600"
                >Logged in With</label
              >
              <p class="text-gray-800">Gmail</p>
            </div>
          </div>
          <!-- Update Profile Form -->
          <div class="mt-8">
            <h2 class="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
              Update Profile
            </h2>
            <form @submit.prevent="updateProfile(userName)">
              <label class="block text-sm font-medium text-gray-600"
                >Name</label
              >
              <input
                v-model="userName"
                type="text"
                class="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
              />
              <button
                type="submit"
                class="mt-4 w-full bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-700"
              >
                Update Name
              </button>
            </form>
          </div>
        </div>

        <!-- Update Password Section -->
        <div>
          <h2 class="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
            Update Password
          </h2>
          <form @submit.prevent="updatePassword(password)" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-600"
                >Current Password</label
              >
              <input
                v-model="password.current_password"
                type="password"
                class="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600"
                >New Password</label
              >
              <input
                v-model="password.new_password"
                type="password"
                class="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                required
              />
            </div>
            <button
              type="submit"
              class="mt-4 w-full bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-700"
            >
              Update Password
            </button>
          </form>
        </div>

        <!-- Update Address Section -->
        <div class="lg:col-span-2">
          <h2 class="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
            Update Address
          </h2>
          <form
            @submit.prevent="addressUpdate"
            class="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div>
              <label class="block text-sm font-medium text-gray-600"
                >Name</label
              >
              <input
                v-model="addressField.name"
                type="text"
                class="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600"
                >Phone</label
              >
              <input
                v-model="addressField.phone"
                type="tel"
                class="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600"
                >Address 1</label
              >
              <input
                v-model="addressField.address_1"
                type="text"
                class="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600"
                >Address 2</label
              >
              <input
                v-model="addressField.address_2"
                type="text"
                class="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600"
                >City</label
              >
              <select
                v-model="addressField.city"
                class="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                required
              >
                <option value="dhaka">Dhaka</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600"
                >Country</label
              >
              <input
                v-model="addressField.country"
                type="text"
                class="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                maxlength="2"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">Zip</label>
              <input
                v-model="addressField.zip"
                type="text"
                class="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                required
              />
            </div>
            <button
              type="submit"
              class="col-span-full w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 mt-4"
            >
              Update Address
            </button>
          </form>
        </div>
      </div>
    </ProfileLayout>
  </Mainlayout>
</template>

<script setup>
import Mainlayout from "@/components/Layouts/Mainlayout.vue";
import ProfileLayout from "@/components/ProfileLayout.vue";
import { useProfileStore } from "@/stores/profile";
import { HomeOutlined, RightOutlined } from "@ant-design/icons-vue";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const profileStore = useProfileStore();
const { isLoading, addressField } = storeToRefs(profileStore);
const { updateProfile, updatePassword, updateAddress, getAddress } =
  profileStore;

const userName = ref("");

const password = ref({
  current_password: "",
  new_password: "",
});

onMounted(async () => {
  await getAddress();
});

const addressUpdate = async () => {
  await updateAddress();
  await getAddress();
};
</script>

<style scoped></style>
