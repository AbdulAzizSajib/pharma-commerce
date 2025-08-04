import { defineStore } from "pinia";
import { apiBase } from "@/config";
import axios from "axios";

export const useHomeStore = defineStore("homeStore", {
  state: () => ({
    isFetching: false,
    isLoading: false,
    slider: null,
    featured_categories: [],
    flash_sales: [],
    collections: [],
  }),

  actions: {
    async getHome() {
      this.isLoading = true;
      try {
        const res = await axios.get(`${apiBase}/home`);
        this.isLoading = false;
        if (res?.status == 200) {
          this.slider = res?.data?.data?.slider;
          this.flash_sales = res?.data?.data?.flash_sales;
          this.collections = res?.data?.data?.collections;
          this.featured_categories = res?.data?.data?.featured_categories;
        }
      } catch (error) {
        this.isLoading = false;
        this.slider = null;
        this.flash_sales = [];
        this.collections = [];
        console.log(error);
      }
    },

    // get Categories

    async getCategories() {
      this.isFetching = true;
      try {
        const res = await axios.get(`${apiBase}/categories`);
        this.isFetching = false;
        if (res?.status == 200) {
          this.featured_categories = res?.data?.data?.data;
          // console.log(this.featured_categories);
        }
      } catch (error) {
        this.isFetching = false;
        this.featured_categories = [];
        console.log(error);
        // showNotification("error", error?.message);
      }
    },
  },
  persist: true,
});
