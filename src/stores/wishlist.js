import { defineStore } from "pinia";
import { apiBase } from "@/config";
import axios from "axios";

export const useWishlistStore = defineStore("wishlistStore", {
  state: () => ({
    isLoading: false,
    wishlistData: null,
  }),

  actions: {
    async addToWishlist(productId) {
      const token = localStorage.getItem("token");
      if (!token) {
        // ElNotification({
        //   message: "Please Login to continue",
        //   type: "warning",
        // });
        console.log("Please Login to continue");
        return;
      }
      this.isLoading = true;
      try {
        const response = await axios.post(
          `${apiBase}/user/wishlist/action`,
          { product_id: productId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.isLoading = false;
        if (response.data.status === 200) {
          //   ElNotification({
          //     message: response.data.message,
          //     type: "success",
          //   });
          console.log("success", response.data);
        } else {
          //   ElNotification({
          //     message: response.data.message,
          //     type: "error",
          //   });
          console.log("error", response.data);
        }
      } catch (error) {
        this.isLoading = false;
        // ElNotification({
        //   message: error.message,
        //   type: "error",
        // });
        console.log("error", error);
      }
    },
    async getWishlist() {
      const token = localStorage.getItem("token");
      this.isLoading = true;
      try {
        const response = await axios.get(
          `${apiBase}/user/wishlist/all?order_by=created_at&type=desc`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.isLoading = false;
        if (response.data.status === 200) {
          this.wishlistData = response.data?.data || [];
        }
      } catch (error) {
        this.isLoading = false;
        // ElNotification({
        //   message: error.message,
        //   type: "error",
        // });
        console.log("error", error);
      }
    },
  },
  persist: true,
});
