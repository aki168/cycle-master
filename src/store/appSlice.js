import { createSlice } from "@reduxjs/toolkit";
import { fetchApiData } from "./apiSlice";
import { useSelector } from "react-redux";

export const appSlice = createSlice({
  name: "initial",
  initialState: {
    startToUse: false,
    tempIndicator: [],
    graph: null,
  },
  reducers: {
    START_TO_USE: (state) => {
      state.startToUse = true;
    },
    SET_INDICATOR_INDEX: (state, action) => {
      state.indicatorIndex = action.payload;
    },
    // SET_TEMP_INDICATOR: (state, action) => {
    //   state.tempIndicator = action.payload;
    // },
    // SET_GRAPH: (state, params) => {
    //   fetchApiData({
    //     url: "http://dst-economic-index-api.dst.cathayholdings.internal.com.tw:8003/get/index_value",
    //     method: "POST",
    //     params,
    //   });
    //   const { data } = useSelector((state) => state.api);
    //   state.graph = data;
    // },
  },
});

export const { START_TO_USE, SET_INDICATOR_INDEX } = appSlice.actions;

export default appSlice.reducer;
