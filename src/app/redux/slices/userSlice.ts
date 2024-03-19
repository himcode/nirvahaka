// src/redux/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  isLoggedin:false // Initial user state
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      
      return state;
    },
    loginSuccess: (state, action) => {
      state.userInfo = action.payload;
      state.isLoggedin = true;
      return state;
    },
    logout: (state, action) => {
      state.isLoggedin = false;
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
