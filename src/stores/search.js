import { defineStore } from "pinia";
import { apiBase } from "@/config";
import axios from "axios";

export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    isSearchLoading: true,
  }),

  actions: {
    async getSearchingData(q) {
      this.isSearchLoading = true;
      try {
        const res = await axios.get(`${apiBase}/search?q=${q}`);
        this.isSearchLoading = false;
        if (res?.data?.status === 200) {
          console.log(this.searchData);
          return res?.data?.data;
        } else {
          this.searchData = [];
        }
      } catch (error) {
        this.isSearchLoading = false;
        this.searchData = [];
        console.log("Search error:", error);
      }
    },
  },
  persist: true,
});
