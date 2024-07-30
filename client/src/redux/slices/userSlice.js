import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  error: false,
  currentUser: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinStart: (state) => {
      state.loading = true;
    },
    signinSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    signinFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { signinStart, signinSuccess, signinFailure } = userSlice.actions;
export default userSlice.reducer;
