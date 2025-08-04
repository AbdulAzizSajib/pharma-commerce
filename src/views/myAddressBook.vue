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
            <li class="flex items-center space-x-2">Profile</li>
          </ol>
        </nav>
      </div>
    </div>
    <ProfileLayout>
      <div>My Address Book</div>
    </ProfileLayout>
  </Mainlayout>
</template>

<script setup>
import Mainlayout from "@/components/Layouts/Mainlayout.vue";
import ProfileLayout from "@/components/ProfileLayout.vue";

import { HomeOutlined, RightOutlined } from "@ant-design/icons-vue";

import { useRouter } from "vue-router";
</script>

<style lang="scss" scoped></style>
