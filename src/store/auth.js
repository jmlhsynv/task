import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
  name: "auth",
  pending: false,
  initialState: {
    user: localStorage.getItem("token") ?? false,
    status: localStorage.getItem("user_id") == 1 ? true : false,
  },
  reducers: {
    login: (state, action) => {
      localStorage.setItem("token", action.payload.token.accessToken);
      localStorage.setItem("user_id", action.payload.token.user.id);
      state.user = action.payload.token.accessToken;
      state.status = action.payload.token.user.isAdmin;
    },
    logout: (state) => {
      state.user = false;
      state.status = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
    },
  },
});

export const { login, logout } = auth.actions;

export default auth.reducer;
