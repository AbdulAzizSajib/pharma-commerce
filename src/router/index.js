import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/home.vue";
import Page from "@/views/Page.vue";
import ProductDetails from "@/components/ProductDetails/ProductDetails.vue";
import ShoppingCart from "@/components/ShoppingCart/ShoppingCart.vue";
import Shop from "@/components/Shop/Shop.vue";

import Wishlist from "@/components/Wishlist/Wishlist.vue";
import Login from "@/views/login.vue";
import Register from "@/views/Register.vue";
import Verify from "@/views/Verify.vue";
import ForgetPassword from "@/views/ForgetPassword.vue";
import UpdatePassword from "@/views/UpdatePassword.vue";
import Profile from "@/views/Profile.vue";
import MyAddressBook from "@/views/myAddressBook.vue";
import Checkout from "@/components/Checkout.vue";
import TrackOrder from "@/views/trackOrder.vue";
import MyOrder from "@/views/myOrder.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },

    {
      path: "/verify",
      name: "verify",
      component: Verify,
    },
    {
      path: "/forgotPassword",
      name: "forgotPassword",
      component: ForgetPassword,
    },
    {
      path: "/updatePassword",
      name: "updatePassword",
      component: UpdatePassword,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },

    {
      path: "/myOrders",
      name: "myOrders",
      component: MyOrder,
    },
    {
      path: "/myAddressBook",
      name: "myAddressBook",
      component: MyAddressBook,
    },

    {
      path: "/:page",
      name: "page",
      component: Page,
    },
    {
      path: "/cart",
      name: "cart",
      component: ShoppingCart,
    },
    {
      path: "/wishlist",
      name: "wishlist",
      component: Wishlist,
    },
    {
      path: "/product/:id",
      name: "product-details",
      component: ProductDetails,
    },
    {
      path: "/shop",
      name: "shop",
      component: Shop,
    },
    {
      path: "/order-tracking",
      name: "order-tracking",
      component: TrackOrder,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: Checkout,
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem("token");

//   if (!token && to.name !== "login") {
//     next({ name: "login" });
//   } else if (token && to.name === "login") {
//     next({ name: "home" });
//   } else {
//     next();
//   }
// });

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem("token");

//   if (!token && to.name !== "login" && to.name !== "register") {
//     next({ name: "login" });
//   } else if (token && (to.name === "login" || to.name === "register")) {
//     next({ name: "home" });
//   } else {
//     next();
//   }
// });

export default router;
