<template>
  <nav class="flex whitespace-nowrap justify-between items-center py-4">
    <!-- logo -->
    <div class="flex items-center">
      <div class="logo grow">
        <router-link
          class="xl:text-xl font-bold text-primary leading-none"
          :to="{ name: 'home' }"
        >
          <span> Pharma Ecommerce</span>
        </router-link>
      </div>
      <div class="shop mx-4 hidden md:block">
        <router-link :to="{ name: 'shop' }" class="text-md text-primary">
          <div class="flex items-center">
            <Icon class="size-9 mr-2" icon="stash:shop-solid" />

            <span class="hidden lg:block">Shop</span>
          </div>
        </router-link>
      </div>
      <div class="order-tracking hidden md:block">
        <router-link
          :to="{ name: 'order-tracking' }"
          class="text-md text-primary"
        >
          <div class="flex items-center">
            <Icon class="size-8 mr-2" icon="mdi:truck" />

            <span class="hidden lg:block">Order Tracking</span>
          </div>
        </router-link>
      </div>
    </div>

    <!-- <div class="grow mx-4 hidden md:block relative">
      <div class="relative w-full">
        <input
          type="text"
          v-model="q"
          @input="searchHandle"
          placeholder="Search..."
          class="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full outline-none"
        />
        <div
          class="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400"
        >
          <Icon class="size-6" icon="mdi:magnify" />
        </div>
      </div>

      <div
        v-if="q"
        class="absolute w-full bg-white rounded-lg shadow-lg mt-1 z-10"
      >
        <ul>
          <li
            v-for="item in searchData"
            :key="item.id"
            class="px-4 py-2 hover:bg-gray-200 bg-gray-50 border-b rounded-md cursor-pointer"
          >
            <router-link :to="`/product/${item.id}`">
              <div class="rounded-md">
                <h3 class="font-bold text-lg">{{ item.name }}</h3>

                <p class="text-sm text-gray-600">
                  Category: {{ item.category.name }}
                </p>

                <p class="text-sm text-gray-600">
                  Supplier: {{ item.supplier.company_name }}
                </p>

                <p class="text-sm text-gray-600">
                  Price: ${{ item.pack_size.selling_price }}
                </p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div> -->
    <div class="row mx-4 hidden md:block w-full">
      <a-select
        show-search
        :filterOption="false"
        @search="searchHandle($event)"
        class="w-full capitalize"
      >
        <a-select-option v-for="item in searchData" :key="item.id">
          <router-link :to="`/product/${item?.id}`">
            <div class="rounded-md capitalize">
              <h3 class="font-bold text-lg">{{ item?.name }}</h3>

              <p class="text-sm text-gray-600">
                Category: {{ item?.category?.name }}
              </p>

              <p class="text-sm text-gray-600">
                Supplier: {{ item?.supplier?.company_name }}
              </p>

              <p class="text-sm text-gray-600">
                Price:{{ item?.pack_size?.selling_price }}
              </p>
            </div>
          </router-link>
        </a-select-option>
      </a-select>
    </div>
    <!-- cart -->

    <div class="hidden md:flex space-x-4 items-center">
      <router-link
        :to="{ name: 'wishlist' }"
        class="p-2 rounded-full bg-primary hover:bg-primary-dark transition duration-300"
        title="Wishlist"
      >
        <HeartIcon class="w-5 h-5 text-white" />
      </router-link>

      <router-link :to="{ name: 'cart' }" class="relative" title="Cart">
        <a-badge :count="cartProduct?.length">
          <button
            class="p-2 rounded-full bg-primary hover:bg-primary-dark transition duration-300"
          >
            <ShoppingCartIcon class="w-5 h-5 text-white" />
          </button>
        </a-badge>
      </router-link>
    </div>

    <div class="dropdown hidden lg:block dropdown-end ml-2">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="../../assets/images/human.png"
          />
        </div>
      </div>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow border-2 space-y-1"
      >
        <li>
          <router-link to="/profile"> profile </router-link>
        </li>
        <li><a>Settings</a></li>
        <li>
          <template v-if="isLoggedIn">
            <button
              @click="handleLogout"
              class="p-3 flex items-center justify-center rounded-full bg-primary hover:bg-primary-dark transition duration-300"
              title="Logout"
            >
              <LogoutOutlined class="text-white text-center" />
            </button>
          </template>

          <template v-else>
            <!-- Signup/Login Button -->
            <router-link
              :to="{ name: 'login' }"
              class="flex text-white justify-center p-2 rounded-full bg-primary hover:bg-primary-dark transition duration-300"
              title="Signup"
            >
              <UserIcon class="w-5 h-5 text-white" />
              login
            </router-link>
          </template>
        </li>
      </ul>
    </div>
    <!-- Mobile Menu Button -->
    <div class="md:hidden">
      <button class="text-primary" @click="isMenuOpen = !isMenuOpen">
        <svg
          class="block h-5 w-5 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </button>
    </div>
  </nav>
  <!-- Mobile Menu  -->
  <div class="relative" v-show="isMenuOpen">
    <nav
      class="fixed top-0 left-0 h-screen p-5 z-50 bg-white border-r overflow-y-auto"
    >
      <div class="flex justify-between items-center mb-3">
        <p class="text-lg font-semibold">All Menu</p>
        <button class="navbar-close" @click="isMenuOpen = false">
          <svg
            class="h-6 w-6 text-black cursor-pointer hover:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <!-- Menus -->

      <ul class="list-none">
        <li class="mb-2">
          <!-- <a-dropdown>
            <a class="ant-dropdown-link">
              <a-input
                type="text"
                v-model:value="q"
                @input="searchHandle"
                placeholder="Search..."
                class="w-full py-2 border-gray-300 rounded-full outline-none"
              >
                <template #prefix>
                  <SearchOutlined />
                </template>
              </a-input>
            </a>

            <template #overlay>
              <a-menu>
                <a-menu-item v-for="item in searchData" :key="item.id">
                  <router-link :to="`/product/${item.id}`">
                    {{ item.name }}
                  </router-link>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown> -->
        </li>
        <li class="mb-2">
          <router-link class="block font-semibold" :to="{ name: 'home' }"
            >Home</router-link
          >
        </li>
        <li class="mb-2">
          <router-link class="block font-semibold" :to="{ name: 'shop' }"
            >Shop</router-link
          >
        </li>
        <li class="mb-2">
          <router-link
            class="block font-semibold"
            :to="{ name: 'order-tracking' }"
            >Order Tracking</router-link
          >
        </li>

        <li class="mb-2">
          <router-link class="block font-semibold" :to="{ name: 'wishlist' }"
            >Wishlist</router-link
          >
        </li>
        <li class="mb-2">
          <a-badge :count="cartProduct?.length">
            <router-link class="block font-semibold pr-4" :to="{ name: 'cart' }"
              >Cart</router-link
            >
          </a-badge>
        </li>
        <li class="mb-2">
          <router-link class="block font-semibold" :to="{ name: 'login' }"
            >Signup</router-link
          >
        </li>
      </ul>
      <!-- Categories -->
      <h2 class="font-bold text-base uppercase mt-5 mb-3">
        Product Categories
      </h2>
      <ul class="list-none">
        <li class="mb-2" v-for="cat in featured_categories">
          <router-link class="block font-semibold" :to="{ name: 'home' }">{{
            cat?.title
          }}</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";
import { useHomeStore } from "@/stores/home";
import { LogoutOutlined, SearchOutlined } from "@ant-design/icons-vue";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import {
  HeartIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/vue/24/outline";
import { useLoginStore } from "@/stores/login";
import axios from "axios";
import { apiBasePharma } from "@/config";
import { Icon } from "@iconify/vue";

const loginStore = useLoginStore();
const { logout } = loginStore;

const searchData = ref([]);
let q = ref("");

defineProps(["header"]);
const isMenuOpen = ref(false);

// Home Store
const homeStore = useHomeStore();
const { getCategories } = homeStore;
const { featured_categories, isLoading } = storeToRefs(homeStore);
// onMounted(async () => await getCategories());

// Cart Store
const cartStore = useCartStore();
const { cartProduct } = storeToRefs(cartStore);

// logout
const isLoggedIn = ref(localStorage.getItem("token") !== null);

const handleLogout = () => {
  logout();
  // isLoggedIn.value = false;
  localStorage.removeItem("token");
};

const searchHandle = async (event) => {
  // console.log(event.target.value);
  try {
    const res = await axios.get(
      `${apiBasePharma}/products/search?term=${event}`
    );
    if (res?.data) {
      searchData.value = res.data.products;
      console.log(searchData.value);
    } else {
      searchData.value = [];
    }
  } catch (error) {
    searchData.value = [];
    console.error("Search error:", error);
  }
};
</script>
