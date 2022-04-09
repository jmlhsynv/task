import { ActionTypes } from "@mui/base";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.get("http://localhost:7000/products", {
      headers,
    });
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const res = await axios.delete(`http://localhost:7000/products/${id}`, {
      headers,
    });
    return {
      id: id,
      data: res.data,
    };
  }
);

export const editProduct = createAsyncThunk(
  "product/editProduct",
  async (edittedData) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const res = await axios.put(
      `http://localhost:7000/products/${edittedData.id}`,
      edittedData,
      { headers }
    );
    return {
      data: edittedData,
      success: res.data,
    };
  }
);

export const postProduct = createAsyncThunk(
  "products/postProduct",
  async (postedData) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const res = await axios.post("http://localhost:7000/products", postedData, {
      headers,
    });
    return {
      data: postedData,
      success: res.data,
    };
  }
);

const initialState = {
  pending: false,
  error: "",
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: {
    // get
    [getProducts.pending]: (state) => {
      return { ...state, pending: true };
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      return { ...state, pending: false, products: payload };
    },
    [getProducts.rejected]: (state, { payload }) => {
      return { ...state, pending: false, error: payload };
    },

    // post
    [postProduct.pending]: (state) => {
      return { ...state, pending: true };
    },
    [postProduct.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        pending: false,
        products: [...state.products, payload.success],
      };
    },
    [postProduct.rejected]: (state, { payload }) => {
      return { ...state, pending: false, error: payload };
    },
    // Delete
    [deleteProduct.pending]: (state) => {
      return { ...state, pending: true };
    },
    [deleteProduct.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        pending: false,
        products: [...state.products.filter((e) => e.id !== payload.id)],
      };
    },
    [deleteProduct.rejected]: (state, { payload }) => {
      return { ...state, pending: false, error: payload.data };
    },

    // EDIT
    [editProduct.pending]: (state) => {
      return { ...state, pending: true };
    },
    [editProduct.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        pending: false,
        products: [
          ...state.products.map((e) =>
            e.id === payload.data.id
              ? {
                  ...e,
                  title: payload.data.title,
                  price: payload.data.price,
                  description: payload.data.description,
                }
              : e
          ),
        ],
      };
    },
    [editProduct.rejected]: (state, { payload }) => {
      return { ...state, pending: payload.success };
    },
  },
});

export default productSlice.reducer;
