import { defineStore } from "pinia";
import { apiBase } from "@/config";
import axios from "axios";

export const usePageStore = defineStore("pageStore", {
  state: () => ({
    isFetching: false,
  }),

  actions: {
    async getPage(page) {
      this.isFetching = true;
      try {
        const res = await axios.get(`${apiBase}/page/${page}`);
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
