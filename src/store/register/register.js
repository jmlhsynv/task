import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postRegister = createAsyncThunk(
  "register/postRegister",
  async (postedData) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const res = await axios.post("http://localhost:7000/users", postedData, {
      headers,
    });
    return res.data;
  }
);

const initialState = {
  pending: false,
  error: "",
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  extraReducers: {
    // POST
    [postRegister.pending]: (state) => {
      return { ...state, pending: true };
    },
    [postRegister.fulfilled]: (state) => {
      return { ...state, pending: false };
    },
    [postRegister.rejected]: (state, { payload }) => {
      return { ...state, pending: false, error: payload };
    },
  },
});

export default registerSlice.reducer;
