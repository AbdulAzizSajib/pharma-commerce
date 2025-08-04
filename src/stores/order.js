import { defineStore } from "pinia";
import { apiBase } from "@/config";
import axios from "axios";

export const useOrderStore = defineStore("orderStore", {
  state: () => ({
    isLoading: false,
    orderData: null,
  }),

  actions: {
    async getOrderData(orderBy) {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      this.isLoading = true;
      try {
        const response = await axios.post(
          `${apiBase}/order/by-user`,
          { order_by: orderBy },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.isLoading = false;
        if (response.data.status === 200) {
          this.orderData = response?.data?.data;
        }
      } catch (error) {
        this.isLoading = false;
      }
    },
  },
  persist: true,
});
