import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Types
export interface ForgotPasswordState {
  email: string | null;
  verificationCode: string | null;
  isLoading: boolean;
  error: string | null;
  step: 'email' | 'verify' | 'reset' | 'success';
  isCodeSent: boolean;
  isCodeVerified: boolean;
  isPasswordReset: boolean;
}

export interface SendCodePayload {
  email: string;
}

export interface VerifyCodePayload {
  email: string;
  code: string;
}

export interface ResetPasswordPayload {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
}

// Initial state
const initialState: ForgotPasswordState = {
  email: null,
  verificationCode: null,
  isLoading: false,
  error: null,
  step: 'email',
  isCodeSent: false,
  isCodeVerified: false,
  isPasswordReset: false,
};

// Async thunk for sending reset code
export const sendResetCode = createAsyncThunk(
  'forgotPassword/sendResetCode',
  async (payload: SendCodePayload, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock success - Replace with actual API call
      return { email: payload.email };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to send reset code');
    }
  }
);

// Async thunk for verifying code
export const verifyResetCode = createAsyncThunk(
  'forgotPassword/verifyResetCode',
  async (payload: VerifyCodePayload, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock validation - Replace with actual API call
      if (payload.code === '123456') {
        return { code: payload.code };
      } else {
        throw new Error('Invalid verification code');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to verify code');
    }
  }
);

// Async thunk for resetting password
export const resetPassword = createAsyncThunk(
  'forgotPassword/resetPassword',
  async (payload: ResetPasswordPayload, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock success - Replace with actual API call
      return { success: true };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to reset password');
    }
  }
);

// Forgot Password slice
const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    resetForgotPasswordState: () => initialState,
    clearError: (state) => {
      state.error = null;
    },
    setStep: (state, action: PayloadAction<'email' | 'verify' | 'reset' | 'success'>) => {
      state.step = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Send reset code
      .addCase(sendResetCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendResetCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload.email;
        state.isCodeSent = true;
        state.step = 'verify';
        state.error = null;
      })
      .addCase(sendResetCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Verify code
      .addCase(verifyResetCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyResetCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.verificationCode = action.payload.code;
        state.isCodeVerified = true;
        state.step = 'reset';
        state.error = null;
      })
      .addCase(verifyResetCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Reset password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isPasswordReset = true;
        state.step = 'success';
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetForgotPasswordState, clearError, setStep } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
