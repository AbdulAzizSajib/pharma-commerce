import { defineStore } from "pinia";
import { apiBase } from "@/config";
import axios from "axios";

export const useVerifyStore = defineStore("verifyStore", {
  state: () => ({
    isFetching: false,
    verificationStatus: null,
    errorMessage: null,
  }),

  actions: {
    async verifyUser({ email, verificationCode }) {
      this.isFetching = true;
      this.errorMessage = null;

      try {
        const res = await axios.post(`${apiBase}/user/verify`, {
          email,
          code: verificationCode,
        });

        this.isFetching = false;

        if (res?.status === 200) {
          this.verificationStatus = res.data.data.verified;
          return res.data;
        } else {
          this.errorMessage =
            "Verification failed: " + (res?.data?.message || "Unknown error");
          console.log("Verification failed:", this.errorMessage);
          return null;
        }
      } catch (error) {
        this.isFetching = false;
        this.errorMessage =
          error.response?.data?.message ||
          "An error occurred during verification.";
        console.log(this.errorMessage);
      }
    },
  },
});
