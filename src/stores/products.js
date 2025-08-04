import { defineStore } from "pinia";
import { apiBase, apiBasePharma } from "@/config";
import axios from "axios";

export const useProductsStore = defineStore("productsStore", {
  state: () => ({
    isFetching: false,
    allProduct: [],
    paginationInfo: null,
  }),

  actions: {
    async getProduct(id) {
      this.isFetching = true;
      try {
        const res = await axios.get(`${apiBasePharma}/product-show/${id}`);
        this.isFetching = false;
        if (res?.status == 200) {
          return res.data;
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
    async getAllProduct(page = 1, pageSize = 20) {
      this.isFetching = true;
      try {
        const res = await axios.get(
          `${apiBasePharma}/all-products-paginated?page=${page}&search=&paginate=${pageSize}`
        );
        this.isFetching = false;
        if (res?.status == 200) {
          this.allProduct = res?.data;
          this.paginationInfo = {
            total: res?.data?.total,
            perPage: res?.data?.per_page,
            currentPage: res?.data?.current_page,
          };
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
