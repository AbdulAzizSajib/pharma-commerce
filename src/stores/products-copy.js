import { defineStore } from "pinia";
import { apiBase } from "@/config";
import axios from "axios";

export const useProductsStore = defineStore("productsStore", {
  state: () => ({
    isFetching: false,
    allProduct: [],
  }),

  actions: {
    async getProduct(id) {
      this.isFetching = true;
      try {
        const res = await axios.get(`${apiBase}/product/${id}`);
        this.isFetching = false;
        if (res?.status == 200) {
          return res?.data?.data;
          // this.slider = res?.data?.data?.slider;
        }
      } catch (error) {
        this.isFetching = false;
        console.log(error);
        // showNotification("error", error?.message);
      }
    },

    async getReview(id) {
      this.isFetching = true;
      try {
        const res = await axios.get(
          `${apiBase}/reviews/${id}?order_by=created_at&type=desc`
        );
        this.isFetching = false;
        if (res?.status == 200) {
          return res?.data?.data;
          // this.slider = res?.data?.data?.slider;
        }
      } catch (error) {
        this.isFetching = false;
        console.log(error);
        // showNotification("error", error?.message);
      }
    },
    async getAllProduct(
      page = 1,
      brand = "",
      category = "",
      sub_category = "",
      sortby = "asc",
      shipping = "",

      collection = "",
      rating = "",

      min = "",
      max = "",
      q = ""
    ) {
      this.isFetching = true;
      try {
        const res = await axios.get(
          `${apiBase}/all?page=${page}&category=${category}&sub_category=${sub_category}&sortby=${sortby}&shipping=${shipping}&brand=${brand}&collection=${collection}&rating=${rating}&max=${max}&min=${min}&q=${q}&&sidebar_data=true`
        );
        this.isFetching = false;
        if (res?.status == 200) {
          this.allProduct = res?.data?.data;
          // return res?.data?.data;
          // this.slider = res?.data?.data?.slider;
        }
      } catch (error) {
        this.isFetching = false;
        console.log(error);
        // showNotification("error", error?.message);
      }
    },
  },
});
