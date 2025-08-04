<template>
  <footer class="bg-slate-600 text-white py-7">
    <div class="container mx-auto">
      <div class="md:grid grid-cols-4 gap-3">
        <!-- Left Side: Logo, Title, Short Description, Address, and Contact -->
        <div class="col-span-2 mb-3">
          <!-- Logo and Title -->
          <div class="flex items-center justify-start md:justify-start gap-2">
            <h2 class="text-xl font-bold text-white">Pharma Ecommerce</h2>
          </div>
          <!-- Short Description -->
          <h2 class="text-lg font-semibold">
            Your Trusted Online Pharmacy in Bangladesh
          </h2>
          <p class="font-light text-justify text-gray-300 max-w-[500px]">
            Discover a wide range of high-quality medicines, wellness products,
            and healthcare essentials, all available at your fingertips. With
            fast home delivery and affordable prices, we bring the pharmacy to
            your door—making healthcare easier, more convenient, and more
            accessible for everyone in Bangladesh.
          </p>

          <!-- Address and Contact -->
          <div class="mt-3">
            <HomeOutlined class="align-baseline" />
            <span class="text-white leading-7 pl-2"> ACI Center, Tejgaon </span>
          </div>
          <div class="md:flex w-full">
            <div class="flex items-center mr-3 mt-1">
              <PhoneFilled />
              <span class="text-white leading-7 ml-2"> 01782521705 </span>
            </div>
            <div class="flex items-center mt-1">
              <MailFilled />
              <span class="text-white leading-7 ml-2">
                pharmaecommerce.com
              </span>
            </div>
          </div>
        </div>

        <!-- Right Side: Static Service and Help Links -->
        <div class="grid grid-cols-2 gap-4">
          <!-- Services Section -->
          <div class="mb-3 text-left">
            <h6 class="lg:text-xl font-bold text-white mb-4">Services</h6>
            <p class="mb-1">
              <router-link to="/service" class="text-gray-300 link link-hover">
                About Us
              </router-link>
            </p>
            <p class="mb-1">
              <router-link to="/service" class="text-gray-300 link link-hover">
                FAQ
              </router-link>
            </p>
            <p class="mb-1">
              <router-link to="/service" class="text-gray-300 link link-hover">
                Contact
              </router-link>
            </p>
          </div>

          <!-- Help Section -->
          <div class="mb-3 text-center md:text-left">
            <h6 class="lg:text-xl text-start font-bold text-white mb-4">
              Help
            </h6>

            <p class="mb-1">
              <router-link
                to="/refund-policy"
                class="text-gray-300 link link-hover"
              >
                Refund Policy
              </router-link>
            </p>
            <p class="mb-1">
              <router-link
                to="/privacy-policy"
                class="text-gray-300 link link-hover"
              >
                Privacy Policy
              </router-link>
            </p>
            <p class="mb-1">
              <router-link to="/sitemap" class="text-gray-300 link link-hover">
                Sitemap
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>

    <hr class="my-6 border-gray-500" />

    <!-- Footer Bottom: Copyright and Social Links -->
    <div class="container mx-auto">
      <div class="md:flex justify-between items-center">
        <!-- Copyright Text -->
        <div class="mt-3">
          <p class="text-white text-center md:text-left">
            &copy; 2025 Pharma Ecommerce. All Rights Reserved.
          </p>
        </div>

        <!-- Static Social Media Links -->
        <div class="mt-3">
          <div
            class="flex flex-wrap items-center justify-center md:justify-start"
          >
            <Icon class="size-6 mr-2" icon="logos:facebook" />
            <Icon class="size-6 mr-2" icon="logos:youtube-icon" />
            <Icon class="size-6 mr-2" icon="skill-icons:instagram" />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Static data is no longer required, no need to import dynamic props or variables
import { HomeOutlined, MailFilled, PhoneFilled } from "@ant-design/icons-vue";
</script>

<style scoped>
/* Optional custom styles for better styling */
footer {
  font-family: "Arial", sans-serif;
}
</style>
