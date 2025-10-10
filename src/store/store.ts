import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../login/store/loginSlice';
import forgotPasswordReducer from '../forgot/store/forgotPasswordSlice';
import registerReducer from '../register/store/registerSlice';
import invoiceReducer from '../home/store/invoiceSlice';
import profileReducer from '../profile/store/profileSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    forgotPassword: forgotPasswordReducer,
    register: registerReducer,
    invoice: invoiceReducer,
    profile: profileReducer,
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
