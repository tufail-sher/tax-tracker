import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../login/store/loginSlice';
import forgotPasswordReducer from '../forgot/store/forgotPasswordSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    forgotPassword: forgotPasswordReducer,
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
