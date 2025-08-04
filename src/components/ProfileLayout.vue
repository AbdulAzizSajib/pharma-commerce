<template>
  <section class="wrapper relative">
    <div class="px-3 w-full">
      <!-- header -->
      <Header />
      <!-- content -->
      <div class="w-full p-2 mb-3">
        <div
          class="bot-container shadow-lg bg-white p-10 border-gradient-animation"
        >
          <div class="md:flex w-full">
            <!-- left -->
            <div class="lg:sticky lg:top-20 lg:self-start">
              <Menu></Menu>
            </div>
            <!-- right -->
            <div class="grow mt-14 ml-3">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Menu from "../components/Menu.vue";
</script>
