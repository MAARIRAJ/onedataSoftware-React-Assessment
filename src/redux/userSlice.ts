import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../types/User";

interface UserState {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserInfo>) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
    },
    signup: (state, action: PayloadAction<UserInfo>) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
  },
});

export const { login, logout, signup } = userSlice.actions;
export default userSlice.reducer;
