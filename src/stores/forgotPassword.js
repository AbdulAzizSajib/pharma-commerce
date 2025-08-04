import { defineStore } from "pinia";
import { apiBase } from "@/config";
import axios from "axios";

export const useForgotPassStore = defineStore("forgotPassStore", {
  state: () => ({
    isFetching: false,
  }),

  actions: {
    async forgotPassword(email) {
      this.isFetching = true;

      try {
        const res = await axios.post(`${apiBase}/user/forgot-password`, {
          email,
        });
        this.isFetching = false;

        if (res?.status === 200) {
          return res.data;
        } else {
          return null;
        }
      } catch (error) {
        this.isFetching = false;
        console.log(error);
        return null;
      }
    },
  },
});
