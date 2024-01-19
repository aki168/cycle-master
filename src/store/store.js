import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import apiReducer from './apiSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    api: apiReducer,
  },
});
