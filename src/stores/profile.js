import { defineStore } from "pinia";
import { apiBase } from "@/config";
import axios from "axios";

export const useProfileStore = defineStore("profileStore", {
  state: () => ({
    isLoading: false,
    addressField: {
      name: null,
      email: null,
      phone: null,
      address_1: null,
      address_2: null,
      city: null,
      country: null,
      zip: null,
      delivery_instruction: null,
    },
  }),

  actions: {
    async updateProfile(name) {
      const token = localStorage.getItem("token");
      this.isLoading = true;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      try {
        const response = await axios.post(
          `${apiBase}/user/update-profile`,
          { name: name },
          config
        );
        const responseData = response?.data;
        this.isLoading = false;
        if (responseData?.status === 200) {
          //   ElNotification({
          //     message: response?.data?.message,
          //     type: "success",
          //   });
          console.log("success", responseData);
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
    async updatePassword(pass) {
      const token = localStorage.getItem("token");
      this.isLoading = true;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      try {
        const response = await axios.post(
          `${apiBase}/user/update-user-password`,
          pass,
          config
        );
        const responseData = response?.data;
        this.isLoading = false;
        if (responseData?.status === 200) {
          //   ElNotification({
          //     message: response?.data?.message,
          //     type: "success",
          //   });
          console.log("success", responseData);
        } else {
          //   ElNotification({
          //     message: data.data.form.at(0),
          //     type: "error",
          //   });
          console.log("error", responseData);
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
    async getAddress() {
      const token = localStorage.getItem("token");
      this.isLoading = true;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios.get(
          `${apiBase}/user/address/all?time_zone=Asia%2FDhaka&order_by=created_at&type=desc`,
          config
        );
        const responseData = response?.data;
        this.isLoading = false;
        if (responseData?.status === 200) {
          this.addressField = responseData?.data?.data?.at(0);
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

    async updateAddress() {
      const token = localStorage.getItem("token");
      this.isLoading = true;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios.post(
          `${apiBase}/user/address/action`,
          this.addressField,
          config
        );
        const responseData = response?.data;
        this.isLoading = false;
        if (responseData?.status === 200) {
          //   ElNotification({
          //     message: response?.data?.message,
          //     type: "success",
          //   });
          console.log("success", responseData);
        } else {
          //   ElNotification({
          //     message: response?.data?.data?.form.at(0),
          //     type: "error",
          //   });
          console.log("error", error);
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
