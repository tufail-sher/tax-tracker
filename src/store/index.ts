import { configureStore } from '@reduxjs/toolkit';
import taxSlice from './slices/taxSlice';

export const store = configureStore({
  reducer: {
    tax: taxSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;