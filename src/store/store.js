// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './themeSlice.js';

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export default store;
