import { defineStore } from "pinia";
import { apiBase } from "@/config";
import axios from "axios";

export const useShopStore = defineStore("shopStore", {
  state: () => ({
    isFetching: false,
  }),

  actions: {
    async getShop(id) {
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
  },
});
