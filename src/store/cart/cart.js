import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCart = createAsyncThunk("cart/getCart", async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  const response = await axios.get(
    `http://localhost:7000/600/users/${localStorage.getItem("user_id")}`,
    { headers }
  );
  return response.data;
});

export const postCart = createAsyncThunk(
  "cart/postCart",
  async (postedData) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const res = await axios.patch(
      `http://localhost:7000/600/users/${localStorage.getItem("user_id")}`,
      { cart: postedData },
      { headers }
    );
    return res.data;
  }
);

export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (postedData) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const res = await axios.patch(
      `http://localhost:7000/600/users/${localStorage.getItem("user_id")}`,
      { cart: postedData },
      { headers }
    );
    return res.data;
  }
);

const initialState = {
  pending: false,
  error: "",
  localItems: 0,
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getLocalItems: (state) => {
      state.localItems = 
      localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).length :
      0;
    },
  },
  extraReducers: {
    // GET
    [getCart.pending]: (state) => {
      return { ...state, pending: true };
    },
    [getCart.fulfilled]: (state, { payload }) => {
      return { ...state, pending: false, cart: payload.cart };
    },
    [getCart.rejected]: (state, { payload }) => {
      return { ...state, pending: false, error: payload };
    },

    // POST
    [postCart.pending]: (state) => {
      return { ...state, pending: true };
    },
    [postCart.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        pending: false,
        cart: payload.cart,
      };
    },
    [postCart.rejected]: (state, { payload }) => {
      return { ...state, pending: false, error: payload };
    },

    // Delete
    [deleteCart.pending]: (state) => {
      return { ...state, pending: true };
    },
    [deleteCart.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        pending: false,
        cart: payload.cart,
      };
    },
    [deleteCart.rejected]: (state, { payload }) => {
      return { ...state, pending: false, error: payload };
    },
  },
});

export const { getLocalItems } = cartSlice.actions;

export default cartSlice.reducer;
