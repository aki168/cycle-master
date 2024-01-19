import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "initial",
  initialState: {
    startToUse: false,
  },
  reducers: {
    START_TO_USE: (state) => {
      state.startToUse = true;
    },
  },
});

export const { START_TO_USE } = appSlice.actions;

export default appSlice.reducer;
