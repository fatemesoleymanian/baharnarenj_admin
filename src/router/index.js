import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Profile from "@/views/Profile.vue";
import SignIn from "@/views/SignIn.vue";
import Products from "@/views/Products.vue";
import Users from "@/views/Users.vue";
import Orders from "@/views/Orders.vue";
import UserDetails from "../views/UserDetails";
import OrderDetails from "../views/OrderDetails";
import ProductDetails from "../views/ProductDetails";
import AddProduct from "../views/AddProduct";
import Tags from "../views/Tags";
import Categories from "../views/Categories";
import Blogs from "../views/Blogs";
import AddPost from "../views/AddPost";
import PostDetails from "../views/PostDetails";
import Admins from "../views/Admins";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/products",
    name: "محصولات",
    component: Products,
  },
  {
    path: "/posts",
    name: "پست ها",
    component: Blogs,
  },
  {
    path: "/categories",
    name: "دسته بندی ها",
    component: Categories,
  },
  {
    path: "/tags",
    name: "تگ ها",
    component: Tags,
  },
  {
    path: "/product/new",
    name: "افزودن محصول جدید",
    component: AddProduct,
  },
  {
    path: "/product/details:id",
    name: "مشخصات محصول",
    component: ProductDetails,
  },
  {
    path: "/post/new",
    name: "افزودن پست جدید",
    component: AddPost,
  },
  {
    path: "/post/details:id",
    name: "جزئیات پست",
    component: PostDetails,
  },
  {
    path: "/users",
    name: "کاربران",
    component: Users,
  },
  {
    path: "/users/details:id",
    name: "جزئیات اطلاعات کاربر",
    component: UserDetails,
  },
  {
    path: "/orders/details:order",
    name: "جزئیات سفارش کاربر",
    component: OrderDetails,
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
  },
  {
    path: "/profile",
    name: "پروفایل",
    component: Profile,
  },
  {
    path: "/admins",
    name: "ادمین ها",
    component: Admins,
  },
  {
    path: "/sign-in",
    name: "Sign In",
    component: SignIn,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});
// router.beforeEach((to, from, next) => {
//   if ( !localStorage.getItem('vqmgp')) {
//     next({ name : 'Sign In'});
//   }
// });
export default router;
