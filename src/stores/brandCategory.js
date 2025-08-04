import { defineStore } from "pinia";
import { apiBase } from "@/config";
import axios from "axios";

export const useBrandStore = defineStore("brandStore", {
  state: () => ({
    isFetching: false,
    featured_categories: [],
    brands: [],
  }),

  actions: {
    async getBrand() {
      this.isFetching = true;
      try {
        const res = await axios.get(`${apiBase}/brands`);
        this.isFetching = false;
        if (res?.status == 200) {
          this.brands = res?.data?.data?.data;
          // console.log(this.brands);
          // return res?.data?.data?.data;
        }
      } catch (error) {
        this.isFetching = false;
        console.log(error);
        // showNotification("error", error?.message);
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
          console.log(this.featured_categories);
        }
      } catch (error) {
        this.isFetching = false;
        this.featured_categories = [];
        console.log(error);
        // showNotification("error", error?.message);
      }
    },
  },
});
