import { defineStore } from "pinia";
import { apiBase } from "@/config";
import axios from "axios";

export const useCommonStore = defineStore("commonStore", {
  state: () => ({
    isLoading: false,
    header: {
      site_name: "",
    },
    footer: {
      site_name: "",
      meta_title: "",
      meta_description: "",
      copyright_text: "",
      phone: "",
      email: "",
      address_1: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      social: [],
      about: [],
      services: [],
    },
  }),

  actions: {
    async getCommon() {
      this.isLoading = true;
      try {
        const res = await axios.get(`${apiBase}/common`);
        this.isLoading = false;
        if (res?.status == 200) {
          this.header = {
            site_name: res?.data?.data?.site_setting?.site_name,
          };
          this.footer = {
            site_name: res?.data?.data?.site_setting?.site_name,
            meta_title: res?.data?.data?.site_setting?.meta_title,
            meta_description: res?.data?.data?.site_setting?.meta_description,
            copyright_text: res?.data?.data?.site_setting?.copyright_text,
            phone: res?.data?.data?.setting?.phone,
            email: res?.data?.data?.setting?.email,
            address_1: res?.data?.data?.setting?.address_1,
            city: res?.data?.data?.setting?.city,
            state: res?.data?.data?.setting?.state,
            zip: res?.data?.data?.setting?.zip,
            country: res?.data?.data?.setting?.country,
            social: res?.data?.data?.social,
            about: res?.data?.data?.about,
            services: res?.data?.data?.services,
          };
        }
      } catch (error) {
        this.isLoading = false;
        console.log(error);
        // showNotification("error", error?.message);
      }
    },
  },
});
