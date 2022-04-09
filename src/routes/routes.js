import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";
import Admin from "../pages/Admin";
import { TryRounded } from "@mui/icons-material";
import AddProduct from "../pages/AddProduct";

export const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
    auth: false,
    admin: false,
  },
  {
    path: "/login",
    exact: true,
    component: Login,
    auth: false,
    admin: false,
  },
  {
    path: "/register",
    exact: true,
    component: Register,
    auth: false,
    admin: false,
  },
  {
    path: "/cart",
    exact: true,
    component: Cart,
    auth: true,
    admin: false,
  },
  {
    path: "/profile",
    exact: true,
    component: Profile,
    auth: true,
    admin: false,
  },
  {
    path: "/admin",
    exact: true,
    component: Admin,
    auth: true,
    admin: true,
  },
  {
    path: "/add-product",
    exact: true,
    component: AddProduct,
    auth: true,
    admin: true,
  },
];
