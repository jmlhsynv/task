import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import productReducer from "./products/products";
import cartReducer from "./cart/cart";
import userReducer from "./user/user";
export default configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    user: userReducer,
  },
});
