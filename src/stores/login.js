import { defineStore } from "pinia";
import { apiBase, apiBasePharma } from "@/config";
import axios from "axios";

export const useLoginStore = defineStore("loginStore", {
  state: () => ({
    isFetching: false,
    token: null,
    user: null,
  }),

  actions: {
    async LoginUser(userData) {
      this.isFetching = true;

      const res = await axios.post(`${apiBasePharma}/user-login`, userData);
      console.log("response ---> ", res);
      this.isFetching = false;

      if (res?.status === 200) {
        const { token, user } = res?.data;

        if (userData.email !== user.email) {
          return console.log("Invalid email");
        }

        this.token = token;
        this.user = user;
        console.log(this.user.id);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        return { token, user };
      } else {
        console.log("Login failed:", res?.data?.message);
        return null;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});
