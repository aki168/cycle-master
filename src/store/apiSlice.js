import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const fetchApiData = createAsyncThunk(
  "api/fetchData",
  async ({ url, method = "GET", params }, { rejectWithValue }) => {
    try {
      const queryString = params
        ? `?${new URLSearchParams(params).toString()}`
        : "";
      const response = await fetch(`${url}${queryString}`, { method });
      if (!response.ok) {
        throw new Error("Server error");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
const initialState = {
  indicatorList: {
    data: null,
    loading: false,
    error: null,
  },
  pickedIndicator: {
    data: null,
    loading: false,
    error: null,
  },
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiData.pending, (state, action) => {
        const { target } = action.meta.arg;
        const targetState = state[target];
        if (targetState) {
          targetState.loading = true;
          targetState.error = null;
        }
      })
      .addCase(fetchApiData.fulfilled, (state, action) => {
        const { target } = action.meta.arg;
        const data = action.payload;
        const targetState = state[target];
        if (targetState) {
          targetState.data = data;
          targetState.loading = false;
        }
      })
      .addCase(fetchApiData.rejected, (state, action) => {
        const { target } = action.meta.arg;
        const targetState = state[target];
        if (targetState) {
          targetState.loading = false;
          targetState.error = action.payload;
        }
      });
  },
});


export default apiSlice.reducer;
