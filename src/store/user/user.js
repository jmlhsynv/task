import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk("cart/getUser", async () => {
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

export const editUser = createAsyncThunk(
  "user/editUser",
  async (postedData) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const res = await axios.patch(
      `http://localhost:7000/600/users/${localStorage.getItem("user_id")}`,
      {
        firstname: postedData.firstname,
        lastname: postedData.lastname,
        email: postedData.email,
        password: postedData.password
      },
      { headers }
    );
    return res.data;
  }
);

const initialState = {
  pending: false,
  error: "",
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    // GET
    [getUser.pending]: (state) => {
      return { ...state, pending: true };
    },
    [getUser.fulfilled]: (state, { payload }) => {
      return { ...state, pending: false, user: payload };
    },
    [getUser.rejected]: (state, { payload }) => {
      return { ...state, pending: false, error: payload };
    },

    // EDIT
    [editUser.pending]: (state) => {
      return { ...state, pending: true };
    },
    [editUser.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        pending: false,
        user: payload,
      };
    },
    [editUser.rejected]: (state, { payload }) => {
      return { ...state, pending: false, error: payload };
    },
  },
});

export default userSlice.reducer;
