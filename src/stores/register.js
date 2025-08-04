import { defineStore } from "pinia";
import { apiBase } from "@/config";
import axios from "axios";

export const useRegisterStore = defineStore("registerStore", {
  state: () => ({
    isFetching: false,
  }),

  actions: {
    async registerUser(userData) {
      this.isFetching = true;
      try {
        const res = await axios.post(`${apiBase}/user/signup`, userData);
        this.isFetching = false;

        if (res?.status == 200) {
          console.log(res?.data);
          return res?.data;
        } else {
          console.log("Registration failed:", res?.data?.message);
          return null;
        }
      } catch (error) {
        this.isFetching = false;
        console.log("Error during registration:", error);
      }
    },
  },
});
