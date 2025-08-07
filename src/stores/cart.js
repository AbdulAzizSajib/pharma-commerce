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

  getters: {
    // totalPrice() {
    //   if (!Array.isArray(this.cartProduct)) {
    //     this.cartProduct = [];
    //   }
    //   return this.cartProduct.reduce((total, product) => {
    //     return total + product.quantity * product.price;
    //   }, 0);
    // },
  },

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

    // getCart(id, title, price, image, name, quantity = 1) {
    //   // let quantity = 1;
    //   const index = this.cartProduct.findIndex((data) => data?.id == id);
    //   if (index == -1) {
    //     this.cartProduct?.push({
    //       id: id,

    //       title: title,
    //       price: Number(price).toFixed(2),
    //       image: image,
    //       name: name,
    //       quantity: quantity,
    //     });
    //   } else {
    //     quantity++;
    //     this.cartProduct[index].quantity++;
    //   }
    // },

    async orderPlace(orderData, order_method, user_address_id, userid) {
      const token = localStorage.getItem("token");
      console.log(token);
      this.isLoading = true;

      const product_id = [];
      const quantity = [];
      const shipping_place_id = [];
      const shipping_type = [];
      console.log(orderData);
      for (let index in orderData) {
        product_id.push(orderData[index].id);
        quantity.push(orderData[index].quantity);
        shipping_place_id.push(1);
        shipping_type.push(1);
      }
      const data = {
        order_method: order_method,
        user_address_id: user_address_id,
        product_id: product_id,
        quantity: quantity,
        shipping_place_id: shipping_place_id,
        shipping_type: shipping_type,
        user_id: userid,
      };
      try {
        const response = await axios.post(`${apiBase}/order/action`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.isLoading = false;

        // ElNotification({
        //   message: response.data,
        //   type: "success",
        // });

        this.isOrderDone = true;
      } catch (error) {
        this.isLoading = false;
        // ElNotification({
        //   message: error.message,
        //   type: "error",
        // });
        console.log(error);
      }
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
