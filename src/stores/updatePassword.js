import { defineStore } from "pinia";
import { apiBase } from "@/config";
import axios from "axios";

export const useUpdatePassStore = defineStore("UpdatePassStore", {
  state: () => ({
    isFetching: false,
  }),

  actions: {
    async UpdatePassword({ code, email, password }) {
      this.isFetching = true;

      try {
        const res = await axios.post(`${apiBase}/user/update-password`, {
          code,
          email,
          password,
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
