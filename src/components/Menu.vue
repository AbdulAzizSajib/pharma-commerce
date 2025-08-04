<template>
  <div class="bg-white h-fit min-w-fit">
    <div class="pb-2 text-xl font-medium text-cyan-700">All Sections</div>
    <hr class="h-1 w-10 bg-cyan-600 mb-4" />

    <!-- Using flex layout with gap -->
    <div class="flex flex-col gap-3">
      <div v-for="(item, index) in menus" :key="index">
        <router-link
          class="text-gray-600 text-sm block w-full border border-cyan-600 px-4 py-2 rounded hover:bg-cyan-600 hover:text-white"
          :to="{ name: item.path }"
        >
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const menus = [
  { name: "My Profile", path: "profile" },
  {
    name: "My address book",
    path: "myAddressBook",
  },
  {
    name: "My Order",
    path: "myOrders",
  },
];
</script>

<style scoped></style>
