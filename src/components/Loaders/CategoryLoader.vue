<template>
  <div class="grid grid-cols-12 gap-x-4">
    <template v-for="(item, index) in (1, 12)">
      <div class="w-[70px]">
        <a-skeleton-avatar active shape="circle" :size="70" />
        <p class="text-center">...</p>
      </div>
    </template>
  </div>
</template>
