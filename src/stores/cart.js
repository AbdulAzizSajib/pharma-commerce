import { defineStore } from "pinia";
import { apiBase, imgBase } from "@/config";
import axios from "axios";

export const useCartStore = defineStore("cartStore", {
  state: () => ({
    isLoading: false,
    cartProduct: [],
    cuPon: 0,
    isOrderDone: false,
    totalPrice: 0,
  }),

  getters: {},

  actions: {
    calculateTotal() {
      this.totalPrice = this.cartProduct?.reduce((sum, product) => {
        return sum + (product?.total_price || 0);
      }, 0);
    },
    getCart(product) {
      let quantity = 1;
      let price = Number(product?.product_prices?.selling_price || 0);
      const index = this.cartProduct?.findIndex(
        (item) => item?.id == product?.id
      );
      if (index != -1) {
        this.cartProduct[index].quantity = this.cartProduct[index].quantity + 1;
        this.cartProduct[index].price =
          this.cartProduct[index].price * this.cartProduct[index].quantity;
      } else {
        this.cartProduct = [
          {
            ...product,
            quantity: quantity,
            total_quantity: quantity,
            price: price,
            total_price: price * quantity,
            pack_select: "1",
          },
          ...this.cartProduct,
        ];
      }
      this.calculateTotal();
    },
    //
    async clearCart() {
      this.cartProduct = []; // Reset cart items
      this.totalPrice = 0; // Reset total price
    },

    //
    async getTrackOrder(trackingId) {
      this.isLoading = true;

      try {
        const response = await axios.get(
          `${apiBase}/track-order?tracking_id=${trackingId}`
        );
        this.isLoading = false;
        if (response.data.status === 200) {
          this.orderStatus = response.data.data;

          return response.data.data;
        } else {
          this.orderStatus = null;
          ElNotification({
            message: response.data.message,
            type: "error",
          });
        }
      } catch (error) {
        this.isLoading = false;
        this.orderStatus = null;
        ElNotification({
          message: error.message,
          type: "error",
        });
      }
    },
  },
  persist: true,
});
