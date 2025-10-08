import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RegisterController } from '../controller/RegisterController';

interface RegisterState {
  isLoading: boolean;
  error: string | null;
  user: {
    fullName: string;
    email: string;
    taxFilingStatus: string;
    profileImage: string;
    phoneNumber: string;
    city: string;
  } | null;
}

const initialState: RegisterState = {
  isLoading: false,
  error: null,
  user: null,
};

export const createAccount = createAsyncThunk(
  'register/createAccount',
  async (
    data: { fullName: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await RegisterController.createAccount(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create account');
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'register/verifyEmail',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await RegisterController.verifyEmail(code);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to verify email');
    }
  }
);

export const resendVerificationCode = createAsyncThunk(
  'register/resendVerificationCode',
  async (_, { rejectWithValue }) => {
    try {
      const response = await RegisterController.resendVerificationCode();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to resend code');
    }
  }
);

export const updateTaxFilingStatus = createAsyncThunk(
  'register/updateTaxFilingStatus',
  async (status: string, { rejectWithValue }) => {
    try {
      const response = await RegisterController.updateTaxFilingStatus(status);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Failed to update tax filing status'
      );
    }
  }
);

export const createProfile = createAsyncThunk(
  'register/createProfile',
  async (
    data: {
      profileImage: string;
      phoneNumber: string;
      city: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await RegisterController.createProfile(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create profile');
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetRegister: () => initialState,
  },
  extraReducers: (builder) => {
    // Create Account
    builder
      .addCase(createAccount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload as any;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Verify Email
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Resend Verification Code
    builder
      .addCase(resendVerificationCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resendVerificationCode.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resendVerificationCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update Tax Filing Status
    builder
      .addCase(updateTaxFilingStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTaxFilingStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.user) {
          state.user.taxFilingStatus = (action.payload as any).taxFilingStatus;
        }
      })
      .addCase(updateTaxFilingStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Create Profile
    builder
      .addCase(createProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.user) {
          state.user = { ...state.user, ...(action.payload as any) };
        }
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, resetRegister } = registerSlice.actions;
export default registerSlice.reducer;
